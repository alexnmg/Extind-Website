/* Newsletter subscription via the Mailchimp Marketing API.
 *
 * Uses PUT /lists/{id}/members/{subscriber_hash} ("add or update"), not POST,
 * which Mailchimp itself recommends when you don't know whether the address is
 * already on the list. POST 400s on an existing member, and surfacing that to
 * the visitor would turn the footer field into an oracle for who is subscribed.
 *
 * The hash MUST be the MD5 of the same lowercased string sent as email_address
 * — a mismatch between the two is the one way PUT still raises "Member Exists".
 * Both are derived from one normalised value below, so they cannot drift.
 *
 * The body carries nothing but the address and status_if_new. PUT updates an
 * existing member, so any extra field (language, tags, merge fields) would let
 * a stranger submitting someone else's address rewrite that person's record.
 *
 * Everything happens server-side. Mailchimp must never be embedded in the page
 * — their Connected Sites snippet, popup forms and ad integrations all set
 * browser storage, which would falsify the published cookie policy. */

const TIMEOUT_MS = 8000

const hex = (buf) =>
  [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')

/* MD5 is not in the WebCrypto standard, but Cloudflare exposes it deliberately
 * for exactly this kind of legacy interop. */
const md5 = async (s) => hex(await crypto.subtle.digest('MD5', new TextEncoder().encode(s)))

/* Outcomes:
 *   'ok'       — on the list, or already was, or a per-address condition we
 *                deliberately do not reveal
 *   'invalid'  — Mailchimp rejected the address itself
 * Anything else throws, and the caller reports a generic failure. */
export async function subscribe(env, rawEmail) {
  const email = String(rawEmail).trim().toLowerCase()
  const url = `https://${env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${env.MAILCHIMP_LIST_ID}/members/${await md5(email)}`

  // AbortSignal.timeout() is not documented for the Workers runtime; this is
  // the spelled-out equivalent.
  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS)

  let res, body
  try {
    res = await fetch(url, {
      method: 'PUT',
      signal: ac.signal,
      headers: {
        authorization: `Basic ${btoa(`key:${env.MAILCHIMP_API_KEY}`)}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: env.MAILCHIMP_STATUS ?? 'subscribed',
      }),
    })
    body = await res.json().catch(() => ({}))
  } finally {
    clearTimeout(timer)
  }

  if (res.ok) return 'ok'

  /* Only these titles describe ONE address's membership state. Answering
   * differently for them would let anyone type addresses into the public footer
   * and learn who is on the list, so they answer exactly like success. */
  const MEMBERSHIP_TITLES = new Set([
    'member exists',
    'member in compliance state',
    'forgotten email not subscribed',
  ])

  if (res.status === 400) {
    const title = String(body.title ?? '').trim().toLowerCase()
    // Never log or return `detail` — Mailchimp echoes the submitted address into it.
    console.warn('newsletter: mailchimp 400', { title: body.title, instance: body.instance || 'none' })

    if (MEMBERSHIP_TITLES.has(title)) return 'ok'
    if (title === 'invalid resource') return 'invalid'

    /* Anything else is a problem with our request or our configuration, not a
     * fact about this address. An earlier version treated every 400 as success,
     * which meant a misconfigured audience told visitors they were subscribed
     * while Mailchimp silently refused every one. Fail loudly instead. */
    const err = new Error(`mailchimp rejected the request: ${body.title ?? 'unknown'}`)
    err.code = 'mc_rejected'
    err.title = body.title
    throw err
  }

  const err = new Error(`mailchimp ${res.status}`)
  err.code = `http_${res.status}`
  err.title = body.title
  throw err
}
