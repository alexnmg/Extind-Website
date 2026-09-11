/* Sending mail as office@extind.ro through the Gmail API.
 *
 * Why the Gmail API and not SMTP: a Worker is not a server with a socket. Port
 * 25 is blocked outright, and STARTTLS on 587 has an open, unacknowledged bug
 * in workerd (cloudflare/workerd#2712). HTTPS always works, so the REST API is
 * the reliable transport.
 *
 * Auth is a service account with domain-wide delegation, impersonating
 * office@extind.ro with the single scope gmail.send. The Worker mints an RS256
 * JWT, trades it for an access token, and posts the message. No Cloudflare
 * Email Service, no Workers Paid plan, and no new data processor — mail already
 * lives in Google Workspace.
 *
 * The service-account JSON arrives whole as the GOOGLE_SERVICE_ACCOUNT_KEY
 * secret. Nothing in this file logs it, and errors deliberately carry only
 * Google's status and message. */

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SEND_URL = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send'
const SCOPE = 'https://www.googleapis.com/auth/gmail.send'

const enc = new TextEncoder()

/* base64url over bytes. Gmail wants the whole RFC 5322 message in this form,
 * and JWT segments use it too. */
function b64url(bytes) {
  let bin = ''
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  for (let i = 0; i < arr.length; i += 0x8000) {
    bin += String.fromCharCode.apply(null, arr.subarray(i, i + 0x8000))
  }
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const b64urlString = (s) => b64url(enc.encode(s))

/* PEM -> PKCS#8 DER. importKey('pkcs8', ...) is the one step whose support in
 * workerd is documented only by the algorithm table, not by format, so a failure
 * here is the first thing to check on a fresh deploy. */
function pemToDer(pem) {
  const body = pem
    .replace(/-----BEGIN [^-]+-----/, '')
    .replace(/-----END [^-]+-----/, '')
    .replace(/\s+/g, '')
  const raw = atob(body)
  const der = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) der[i] = raw.charCodeAt(i)
  return der
}

async function signJwt(creds, subject, nowSec) {
  const header = { alg: 'RS256', typ: 'JWT' }
  const claims = {
    iss: creds.client_email,
    sub: subject, // the user being impersonated
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: nowSec,
    exp: nowSec + 3600, // Google caps impersonation assertions at one hour
  }
  const payload = `${b64urlString(JSON.stringify(header))}.${b64urlString(JSON.stringify(claims))}`
  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToDer(creds.private_key),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, enc.encode(payload))
  return `${payload}.${b64url(sig)}`
}

/* Access tokens last an hour. A Worker isolate often survives between requests,
 * so caching one here saves a round trip without ever persisting it anywhere. */
let cachedToken = null

async function getAccessToken(creds, subject) {
  const nowSec = Math.floor(Date.now() / 1000)
  if (cachedToken && cachedToken.expiresAt > nowSec + 60 && cachedToken.subject === subject) {
    return cachedToken.token
  }
  const assertion = await signJwt(creds, subject, nowSec)
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    /* 'unauthorized_client' here almost always means the domain-wide delegation
     * is missing, still propagating, or authorised for a different scope. */
    const err = new Error(`token exchange failed: ${body.error ?? res.status}`)
    err.code = body.error ?? `http_${res.status}`
    err.description = body.error_description
    throw err
  }
  cachedToken = {
    token: body.access_token,
    expiresAt: nowSec + (body.expires_in ?? 3600),
    subject,
  }
  return body.access_token
}

/* RFC 2047 encoded-word. Subjects carry Romanian diacritics, which are not
 * legal raw in a header. */
const encodeHeader = (s) => (/^[\x20-\x7E]*$/.test(s) ? s : `=?UTF-8?B?${b64url(enc.encode(s))}?=`)

/* A display name containing a comma, quote or non-ASCII has to be quoted or
 * encoded, or it splits the address list. */
function formatAddress(email, name) {
  if (!name) return email
  return `${encodeHeader(name)} <${email}>`
}

function buildMime({ from, fromName, to, replyTo, subject, text, html }) {
  const boundary = `b${b64url(crypto.getRandomValues(new Uint8Array(12)))}`
  const headers = [
    `From: ${formatAddress(from, fromName)}`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: ${encodeHeader(subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].filter(Boolean)

  const part = (type, body) =>
    [
      `--${boundary}`,
      `Content-Type: ${type}; charset="UTF-8"`,
      'Content-Transfer-Encoding: base64',
      '',
      // base64 bodies must be wrapped; 76 chars is the RFC 2045 limit
      b64url(enc.encode(body))
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .replace(/(.{76})/g, '$1\r\n'),
      '',
    ].join('\r\n')

  return (
    headers.join('\r\n') +
    '\r\n\r\n' +
    part('text/plain', text) +
    part('text/html', html) +
    `--${boundary}--\r\n`
  )
}

/* Send one message as `subject` (the impersonated mailbox). Resolves to the
 * Gmail message id; throws with a `code` on failure. */
export async function sendMail(env, { to, replyTo, subject, text, html }) {
  let creds
  try {
    creds = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_KEY)
  } catch {
    const err = new Error('GOOGLE_SERVICE_ACCOUNT_KEY is missing or not valid JSON')
    err.code = 'E_NO_CREDENTIALS'
    throw err
  }

  const sender = env.CONTACT_FROM
  const token = await getAccessToken(creds, sender)
  const raw = b64url(
    enc.encode(
      buildMime({
        from: sender,
        fromName: env.CONTACT_FROM_NAME,
        to,
        replyTo,
        subject,
        text,
        html,
      })
    )
  )

  const res = await fetch(SEND_URL, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ raw }),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(`gmail send failed: ${body.error?.message ?? res.status}`)
    err.code = body.error?.status ?? `http_${res.status}`
    throw err
  }
  return body.id
}

/* Test seam: the token cache is module state, which would leak between cases. */
export function __resetTokenCache() {
  cachedToken = null
}
