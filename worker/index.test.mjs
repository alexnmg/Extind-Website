import worker from './index.js'
import { __resetTokenCache } from './gmail.js'
import { createHash } from 'node:crypto'

/* MD5 is a deliberate Cloudflare extension to WebCrypto — Workers supports it,
 * Node does not, and mailchimp.js needs it for the subscriber hash. Shim it
 * here so these tests can exercise the real hashing path. Production never
 * touches this: only crypto.subtle.digest('MD5', ...) inside workerd.
 * NOTE: that it passes here is NOT evidence it works in workerd. */
const realDigest = crypto.subtle.digest.bind(crypto.subtle)
crypto.subtle.digest = (alg, data) => {
  const name = typeof alg === 'string' ? alg : alg?.name
  if (String(name).toUpperCase() === 'MD5') {
    return Promise.resolve(createHash('md5').update(Buffer.from(data)).digest().buffer)
  }
  return realDigest(alg, data)
}

let pass = 0, fail = 0
const ok = (name, cond, extra = '') => {
  if (cond) { pass++; console.log(`  PASS  ${name}`) }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`) }
}

/* A throwaway service account. Generating a real RSA key means the tests
 * exercise the actual importKey('pkcs8') -> sign path rather than mocking it,
 * which is the step whose support in workerd is least documented. */
const kp = await crypto.subtle.generateKey(
  { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
  true,
  ['sign', 'verify']
)
const pkcs8 = new Uint8Array(await crypto.subtle.exportKey('pkcs8', kp.privateKey))
const pem =
  '-----BEGIN PRIVATE KEY-----\n' +
  btoa(String.fromCharCode(...pkcs8)).match(/.{1,64}/g).join('\n') +
  '\n-----END PRIVATE KEY-----\n'

const SA = JSON.stringify({
  type: 'service_account',
  project_id: 'test-project',
  private_key: pem,
  client_email: 'test-sa@test-project.iam.gserviceaccount.com',
  client_id: '000000000000000000000',
  token_uri: 'https://oauth2.googleapis.com/token',
})

const realFetch = globalThis.fetch

/* Stub Google. Captures every outbound call so tests can assert on the real
 * JWT and the real MIME the Worker produced. */
function mkEnv({ limit = true, tokenStatus = 200, sendStatus = 200, sendFailOn = null, mcStatus = 200, mcBody = {} } = {}) {
  const calls = { token: [], send: [], mc: [] }
  globalThis.fetch = async (url, opts) => {
    const u = String(url)
    if (u.includes('oauth2.googleapis.com/token')) {
      calls.token.push(Object.fromEntries(new URLSearchParams(opts.body)))
      if (tokenStatus !== 200) {
        return new Response(JSON.stringify({ error: 'unauthorized_client', error_description: 'Client is unauthorized' }), { status: tokenStatus })
      }
      return new Response(JSON.stringify({ access_token: 'tok-123', expires_in: 3600 }), { status: 200 })
    }
    if (u.includes('api.mailchimp.com')) {
      calls.mc.push({ url: u, method: opts.method, auth: opts.headers.authorization, body: JSON.parse(opts.body) })
      return new Response(JSON.stringify(mcStatus === 200 ? { id: 'abc' } : mcBody), { status: mcStatus })
    }
    if (u.includes('gmail.googleapis.com')) {
      const body = JSON.parse(opts.body)
      const mime = new TextDecoder().decode(
        Uint8Array.from(atob(body.raw.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))
      )
      calls.send.push({ mime, auth: opts.headers.authorization })
      const n = calls.send.length
      if (sendStatus !== 200 || sendFailOn === n) {
        return new Response(JSON.stringify({ error: { status: 'PERMISSION_DENIED', message: 'nope' } }), { status: sendStatus === 200 ? 403 : sendStatus })
      }
      return new Response(JSON.stringify({ id: `msg-${n}` }), { status: 200 })
    }
    throw new Error(`unexpected fetch to ${u}`)
  }
  __resetTokenCache()
  return {
    calls,
    env: {
      GOOGLE_SERVICE_ACCOUNT_KEY: SA,
      CONTACT_FROM: 'office@extind.ro',
      CONTACT_FROM_NAME: 'EXTIND',
      CONTACT_TO: 'office@extind.ro',
      MAILCHIMP_API_KEY: 'test-key',
      MAILCHIMP_SERVER_PREFIX: 'us3',
      MAILCHIMP_LIST_ID: 'f418861d6f',
      MAILCHIMP_STATUS: 'subscribed',
      CONTACT_LIMITER: { limit: async () => ({ success: limit }) },
      ASSETS: { fetch: async () => new Response('asset', { status: 200 }) },
    },
  }
}

const post = (body, headers = { 'content-type': 'application/json' }) =>
  new Request('https://extind.ro/api/contact', { method: 'POST', headers, body: JSON.stringify(body) })

const good = (over = {}) => ({
  name: 'Ana Popescu', email: 'ana@example.com', company: 'Acme', phone: '+40 722 000 000',
  message: 'Aș vrea un tur al spațiului.', consent: true, lang: 'ro', source: 'contact',
  website: '', renderedAt: Date.now() - 10_000, ...over,
})

/* Pull one MIME part's decoded body out: skip to the blank line after the part
 * headers, stop at the next boundary, and unwrap the 76-char base64 folding. */
function decodePart(mime, contentType) {
  const after = mime.split(`Content-Type: ${contentType}`)[1]
  const body = after.split('\r\n\r\n')[1].split('\r\n--')[0]
  const b64 = body.replace(/\s+/g, '')
  return new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)))
}

const headerOf = (mime, name) =>
  (mime.split('\r\n\r\n')[0].split('\r\n').find((l) => l.toLowerCase().startsWith(name.toLowerCase() + ':')) ?? '').slice(name.length + 2)

console.log('\n--- auth: real RS256 over a real PKCS#8 key ---')
{
  const { env, calls } = mkEnv()
  const res = await worker.fetch(post(good()), env)
  ok('200 + ok:true', res.status === 200 && (await res.json()).ok === true)
  ok('exchanged a JWT for a token', calls.token.length === 1 && calls.token[0].grant_type === 'urn:ietf:params:oauth:grant-type:jwt-bearer')

  const [h, p, sig] = calls.token[0].assertion.split('.')
  const dec = (s) => JSON.parse(atob(s.replace(/-/g, '+').replace(/_/g, '/')))
  ok('JWT header is RS256', dec(h).alg === 'RS256')
  const claims = dec(p)
  ok('iss is the service account', claims.iss === 'test-sa@test-project.iam.gserviceaccount.com')
  ok('sub impersonates the mailbox', claims.sub === 'office@extind.ro', claims.sub)
  ok('scope is gmail.send ONLY', claims.scope === 'https://www.googleapis.com/auth/gmail.send', claims.scope)
  ok('aud is the token endpoint', claims.aud === 'https://oauth2.googleapis.com/token')
  ok('exp is within Google’s 1 hour cap', claims.exp - claims.iat <= 3600)

  // The decisive one: does the signature actually verify against the public key?
  const sigBytes = Uint8Array.from(atob(sig.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))
  const verified = await crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5', kp.publicKey, sigBytes, new TextEncoder().encode(`${h}.${p}`)
  )
  ok('signature verifies against the public key', verified)
  ok('bearer token used on the send', calls.send[0].auth === 'Bearer tok-123')
}

console.log('\n--- token caching ---')
{
  const { env, calls } = mkEnv()
  await worker.fetch(post(good()), env)
  await worker.fetch(post(good()), env)
  ok('token fetched once across two requests', calls.token.length === 1, `got ${calls.token.length}`)
  ok('four messages sent from two submissions', calls.send.length === 4, `got ${calls.send.length}`)
}

console.log('\n--- the message itself ---')
{
  const { env, calls } = mkEnv()
  await worker.fetch(post(good()), env)
  const note = calls.send[0].mime
  ok('notification goes to the mailbox', headerOf(note, 'To') === 'office@extind.ro')
  ok('From carries the brand name', headerOf(note, 'From') === 'EXTIND <office@extind.ro>')
  ok('Reply-To is the enquirer', headerOf(note, 'Reply-To') === 'ana@example.com')
  ok('multipart/alternative', /multipart\/alternative; boundary="/.test(headerOf(note, 'Content-Type')))
  ok('has a plain-text part', /Content-Type: text\/plain; charset="UTF-8"/.test(note))
  ok('has an HTML part', /Content-Type: text\/html; charset="UTF-8"/.test(note))
  ok('subject with diacritics is RFC 2047 encoded', /^=\?UTF-8\?B\?/.test(headerOf(note, 'Subject')), headerOf(note, 'Subject'))

  const ack = calls.send[1].mime
  ok('acknowledgement goes to the enquirer', headerOf(ack, 'To') === 'ana@example.com')
  ok('acknowledgement replies back to Extind', headerOf(ack, 'Reply-To') === 'office@extind.ro')
}

console.log('\n--- header injection ---')
{
  const { env, calls } = mkEnv()
  await worker.fetch(post(good({ name: 'Ana\r\nBcc: victim@example.com' })), env)
  const head = calls.send[0].mime.split('\r\n\r\n')[0]
  ok('no Bcc smuggled into the headers', !/bcc:/i.test(head), head.slice(0, 200))
  ok('header block still well formed', head.split('\r\n').every((l) => /^[A-Za-z-]+: /.test(l)))
}
{
  const { env, calls } = mkEnv()
  const res = await worker.fetch(post(good({ email: 'a@b.com\r\nBcc: victim@example.com' })), env)
  ok('CRLF in the email address is rejected', res.status === 400 && calls.send.length === 0)
}

console.log('\n--- honeypot / dwell / validation (unchanged behaviour) ---')
{
  const { env, calls } = mkEnv()
  const res = await worker.fetch(post(good({ website: 'http://spam.example' })), env)
  ok('honeypot: 200 but nothing sent', (await res.json()).ok === true && calls.send.length === 0)
}
{
  const { env, calls } = mkEnv()
  await worker.fetch(post(good({ renderedAt: Date.now() })), env)
  ok('instant submit dropped', calls.send.length === 0)
}
{
  const { env, calls } = mkEnv()
  await worker.fetch(post(good({ renderedAt: 'nope' })), env)
  ok('non-numeric renderedAt dropped', calls.send.length === 0)
}
for (const [label, over, field] of [
  ['missing name', { name: '' }, 'name'],
  ['missing message', { message: '   ' }, 'message'],
  ['bad email', { email: 'not-an-email' }, 'email'],
  ['no consent', { consent: false }, 'consent'],
]) {
  const { env, calls } = mkEnv()
  const res = await worker.fetch(post(good(over)), env)
  const body = await res.json()
  ok(`${label} -> 400 naming the field`, res.status === 400 && body.fields.includes(field))
  ok(`${label} -> nothing sent`, calls.send.length === 0)
}

console.log('\n--- HTML escaping ---')
{
  const { env, calls } = mkEnv()
  await worker.fetch(post(good({ name: '<img src=x onerror=alert(1)>', company: '"onload="evil()', message: '<script>bad()</script>' })), env)
  // The templates legitimately author a full HTML document now, so the
  // interesting assertion is not "which tags exist" but "did anything the
  // visitor typed become markup, and is the only image ours".
  const AUTHORED = new Set([
    'html', 'head', 'meta', 'title', 'style', 'body', 'div', 'table', 'tbody',
    'tr', 'td', 'p', 'h1', 'span', 'img', 'br', 'strong', 'blockquote', 'hr',
    'xml', 'o', 'v', // VML / Office namespace blocks for Outlook
  ])
  const decoded = decodePart(calls.send[0].mime, 'text/html')
  const stray = [...decoded.matchAll(/<\/?([a-z][a-z0-9]*)/gi)].map((m) => m[1].toLowerCase()).filter((t) => !AUTHORED.has(t))
  ok('no injected tags in the HTML part', stray.length === 0, stray.join(','))
  ok('escaped instead', /&lt;script&gt;/.test(decoded))
  ok('no script tag anywhere', !/<script/i.test(decoded))
  ok('no anchor smuggled in', !/<a[\s>]/i.test(decoded))
  const imgs = [...decoded.matchAll(/<img[^>]+src="([^"]*)"/gi)].map((m) => m[1])
  ok('every image is our own logo', imgs.length > 0 && imgs.every((u) => u.startsWith('https://extind.tight-sunset-f416.workers.dev/brand/')), imgs.join(','))
}

console.log('\n--- rate limit & failures ---')
{
  const { env, calls } = mkEnv({ limit: false })
  const res = await worker.fetch(post(good()), env)
  ok('429 when limited', res.status === 429 && calls.send.length === 0)
}
{
  const { env } = mkEnv({ tokenStatus: 400 })
  const res = await worker.fetch(post(good()), env)
  ok('delegation not authorised -> 502, not a crash', res.status === 502 && (await res.json()).error === 'send_failed')
}
{
  const { env, calls } = mkEnv({ sendFailOn: 2 })
  const res = await worker.fetch(post(good()), env)
  ok('acknowledgement failure does NOT fail the request', res.status === 200 && calls.send.length === 2)
}
{
  const { env } = mkEnv()
  env.GOOGLE_SERVICE_ACCOUNT_KEY = 'not json'
  const res = await worker.fetch(post(good()), env)
  ok('missing/!JSON credentials -> 502, no crash', res.status === 502)
}

console.log('\n--- routing ---')
{
  const { env } = mkEnv()
  ok('GET -> 405', (await worker.fetch(new Request('https://extind.ro/api/contact'), env)).status === 405)
  ok('non-JSON -> 400', (await worker.fetch(post(good(), { 'content-type': 'text/plain' }), env)).status === 400)
  ok('unknown /api/* -> 404', (await worker.fetch(new Request('https://extind.ro/api/nope', { method: 'POST' }), env)).status === 404)
  const assets = await worker.fetch(new Request('https://extind.ro/faq'), env)
  ok('non-API falls through to ASSETS', assets.status === 200 && (await assets.text()) === 'asset')
  ok('malformed JSON -> 400', (await worker.fetch(new Request('https://extind.ro/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{oops' }), env)).status === 400)
}


console.log('\n--- newsletter ---')
const nl = (body) =>
  new Request('https://extind.ro/api/newsletter', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
  })
const goodNl = (over = {}) => ({ email: 'Ana@Example.COM ', website: '', renderedAt: Date.now() - 10_000, ...over })

{
  const { env, calls } = mkEnv()
  const res = await worker.fetch(nl(goodNl()), env)
  ok('subscribes -> 200 ok', res.status === 200 && (await res.json()).ok === true)
  ok('one call to Mailchimp', calls.mc.length === 1)
  ok('uses PUT (add-or-update), not POST', calls.mc[0].method === 'PUT', calls.mc[0].method)
  ok('Basic auth header', calls.mc[0].auth === `Basic ${btoa('key:test-key')}`)
  ok('hits the right list', calls.mc[0].url.includes('/lists/f418861d6f/members/'))
  ok('server prefix in the host', calls.mc[0].url.startsWith('https://us3.api.mailchimp.com/'))

  // The trap: hash and body must come from the SAME normalised string.
  const sentHash = calls.mc[0].url.split('/members/')[1]
  const expected = [...new Uint8Array(await crypto.subtle.digest('MD5', new TextEncoder().encode('ana@example.com')))]
    .map((b) => b.toString(16).padStart(2, '0')).join('')
  ok('hash is MD5 of the lowercased address', sentHash === expected, `${sentHash} vs ${expected}`)
  ok('body address matches the hash exactly', calls.mc[0].body.email_address === 'ana@example.com', calls.mc[0].body.email_address)

  ok('status_if_new honours the configured mode', calls.mc[0].body.status_if_new === 'subscribed')
  ok('sends NOTHING else (PUT would overwrite an existing member)',
    Object.keys(calls.mc[0].body).sort().join(',') === 'email_address,status_if_new', Object.keys(calls.mc[0].body).join(','))
}
{
  const { env, calls } = mkEnv()
  const res = await worker.fetch(nl(goodNl({ website: 'spam' })), env)
  ok('honeypot: 200, no Mailchimp call', (await res.json()).ok === true && calls.mc.length === 0)
}
{
  const { env, calls } = mkEnv()
  await worker.fetch(nl(goodNl({ renderedAt: Date.now() })), env)
  ok('instant submit dropped', calls.mc.length === 0)
}
{
  const { env, calls } = mkEnv()
  const res = await worker.fetch(nl(goodNl({ email: 'nope' })), env)
  ok('bad address -> 400 before Mailchimp', res.status === 400 && calls.mc.length === 0)
}
{
  const { env, calls } = mkEnv({ limit: false })
  const res = await worker.fetch(nl(goodNl()), env)
  ok('rate limited -> 429, no call', res.status === 429 && calls.mc.length === 0)
}
{
  // Already on the list: must look identical to a fresh signup, or the form
  // becomes an oracle for who is subscribed.
  const { env } = mkEnv({ mcStatus: 400, mcBody: { title: 'Member Exists', detail: 'ana@example.com is already a list member', instance: '' } })
  const res = await worker.fetch(nl(goodNl()), env)
  ok('"Member Exists" -> indistinguishable 200 ok', res.status === 200 && (await res.json()).ok === true)
}
{
  const { env } = mkEnv({ mcStatus: 400, mcBody: { title: 'Member In Compliance State', instance: '' } })
  const res = await worker.fetch(nl(goodNl()), env)
  ok('compliance state -> also indistinguishable 200', res.status === 200 && (await res.json()).ok === true)
}
{
  // The regression that shipped: an earlier version answered 200 to EVERY 400,
  // so a misconfigured audience reported success while nothing was ever added.
  const { env } = mkEnv({ mcStatus: 400, mcBody: { title: 'Bad Request', detail: 'something is misconfigured', instance: '' } })
  const res = await worker.fetch(nl(goodNl()), env)
  const body = await res.json()
  ok('an UNKNOWN 400 now fails loudly instead of faking success', res.status === 502 && body.ok !== true, JSON.stringify(body))
  ok('and the 502 names the cause', body.reason === 'Bad Request', JSON.stringify(body))
}
{
  const { env } = mkEnv({ mcStatus: 400, mcBody: { title: 'Invalid Resource', detail: 'looks fake', instance: '' } })
  const res = await worker.fetch(nl(goodNl()), env)
  const body = await res.json()
  ok('"Invalid Resource" -> 400 validation (the one case worth telling them)', res.status === 400 && body.error === 'validation')
}
{
  const { env } = mkEnv({ mcStatus: 401 })
  const res = await worker.fetch(nl(goodNl()), env)
  ok('bad API key -> 502, not a crash', res.status === 502 && (await res.json()).error === 'send_failed')
}
{
  const { env } = mkEnv()
  ok('GET /api/newsletter -> 405', (await worker.fetch(new Request('https://extind.ro/api/newsletter'), env)).status === 405)
}

globalThis.fetch = realFetch
console.log(`\n${pass} passed, ${fail} failed\n`)
process.exit(fail ? 1 : 0)
