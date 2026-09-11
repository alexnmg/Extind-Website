/* Contact form endpoint.
 *
 * The site is Cloudflare Workers Static Assets with no Worker script; this adds
 * exactly one server-side route. `run_worker_first: ["/api/*"]` in wrangler.jsonc
 * is what gets a request here at all — without it the SPA fallback serves
 * index.html for /api/contact and this file never runs.
 *
 * Mail goes out through the Gmail API as office@extind.ro (see gmail.js), which
 * needs no Cloudflare paid plan and adds no new data processor — extind.ro's
 * mail already lives in Google Workspace.
 *
 * The auto-acknowledgement is the abuse surface: it goes to whoever filled the
 * form, so a compromised endpoint could mail strangers as EXTIND. Everything
 * below — honeypot, dwell time, rate limit — exists to protect it, and its body
 * carries no attacker-supplied text beyond a stripped, length-capped first name.
 */

import { sendMail } from './gmail.js'
import { subscribe } from './mailchimp.js'

const MAX = { name: 120, email: 254, company: 160, phone: 40, message: 5000 }

// Deliberately permissive: this rejects the obviously-not-an-address, and the
// CR/LF check below is what actually matters, since this value becomes a header.
const EMAIL_RE = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]{2,}$/

// A human takes at least a few seconds to fill in a form. Bots post instantly.
const MIN_DWELL_MS = 3000
const MAX_DWELL_MS = 12 * 60 * 60 * 1000

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

/* Anything that reaches a mail header must not carry line breaks. */
const oneLine = (s, max) => String(s ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max)

const T = {
  ro: {
    subject: 'Am primit mesajul tău — EXTIND',
    greeting: (n) => (n ? `Salut, ${n},` : 'Salut,'),
    body: 'Îți mulțumim că ne-ai scris. Am primit mesajul tău și îți răspundem în cel mult o zi lucrătoare.',
    copy: 'Mai jos ai o copie a mesajului trimis:',
    signoff: 'O zi bună,\nEchipa EXTIND',
    addr: 'Strada Sfântul Andrei 39A, Palas Campus (clădirea B2), etaj 6, Iași',
  },
  en: {
    subject: 'We received your message — EXTIND',
    greeting: (n) => (n ? `Hi ${n},` : 'Hi,'),
    body: "Thanks for reaching out. We've received your message and will reply within one business day.",
    copy: 'Here is a copy of what you sent:',
    signoff: 'Best,\nThe EXTIND team',
    addr: 'Strada Sfântul Andrei 39A, Palas Campus (building B2), 6th floor, Iași',
  },
}

function validate(d) {
  const errors = []
  const name = oneLine(d.name, MAX.name)
  const email = oneLine(d.email, MAX.email)
  const company = oneLine(d.company, MAX.company)
  const phone = oneLine(d.phone, MAX.phone)
  const message = String(d.message ?? '').trim().slice(0, MAX.message)

  if (!name) errors.push('name')
  if (!email || !EMAIL_RE.test(email)) errors.push('email')
  if (!message) errors.push('message')
  if (d.consent !== true) errors.push('consent')

  return { errors, value: { name, email, company, phone, message } }
}

function notificationBody(v, meta) {
  const rows = [
    ['Nume', v.name],
    ['Email', v.email],
    ['Companie', v.company || '—'],
    ['Telefon', v.phone || '—'],
    ['Pagina', meta.source],
    ['Limba', meta.lang],
  ]
  const text =
    rows.map(([k, val]) => `${k}: ${val}`).join('\n') + `\n\n---\n\n${v.message}\n`
  const html =
    `<table style="border-collapse:collapse;font:14px/1.5 system-ui,sans-serif">` +
    rows
      .map(
        ([k, val]) =>
          `<tr><td style="padding:2px 12px 2px 0;color:#666">${esc(k)}</td><td style="padding:2px 0"><strong>${esc(val)}</strong></td></tr>`
      )
      .join('') +
    `</table><hr style="border:none;border-top:1px solid #ddd;margin:16px 0">` +
    `<div style="font:14px/1.6 system-ui,sans-serif;white-space:pre-wrap">${esc(v.message)}</div>`
  return { text, html }
}

function autoReplyBody(v, lang) {
  const t = T[lang] ?? T.ro
  const first = v.name.split(' ')[0]
  const text = `${t.greeting(first)}\n\n${t.body}\n\n${t.copy}\n\n---\n${v.message}\n---\n\n${t.signoff}\n${t.addr}\n`
  const html =
    `<div style="font:15px/1.6 system-ui,sans-serif;color:#1f2326">` +
    `<p>${esc(t.greeting(first))}</p><p>${esc(t.body)}</p><p style="color:#666">${esc(t.copy)}</p>` +
    `<blockquote style="margin:0;padding:12px 16px;border-left:3px solid #d1ccc4;color:#555;white-space:pre-wrap">${esc(v.message)}</blockquote>` +
    `<p style="white-space:pre-line">${esc(t.signoff)}</p>` +
    `<p style="color:#999;font-size:13px">${esc(t.addr)}</p></div>`
  return { subject: t.subject, text, html }
}

async function handleContact(request, env) {
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405)
  if (!(request.headers.get('content-type') || '').includes('application/json'))
    return json({ ok: false, error: 'bad_request' }, 400)

  let data
  try {
    data = await request.json()
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400)
  }

  /* Honeypot and dwell time both answer 200. Telling a bot why it failed only
   * helps it try again; a human never sees either branch. */
  if (typeof data.website === 'string' && data.website.trim() !== '') {
    console.log('contact: honeypot', { source: data.source })
    return json({ ok: true })
  }

  const dwell = Date.now() - Number(data.renderedAt || 0)
  if (!Number.isFinite(dwell) || dwell < MIN_DWELL_MS || dwell > MAX_DWELL_MS) {
    console.log('contact: dwell', { dwell, source: data.source })
    return json({ ok: true })
  }

  const { errors, value } = validate(data)
  if (errors.length) return json({ ok: false, error: 'validation', fields: errors }, 400)

  if (env.CONTACT_LIMITER) {
    const ip = request.headers.get('cf-connecting-ip') || 'unknown'
    const { success } = await env.CONTACT_LIMITER.limit({ key: ip })
    if (!success) return json({ ok: false, error: 'rate_limited' }, 429)
  }

  const lang = data.lang === 'en' ? 'en' : 'ro'
  const source = oneLine(data.source, 32) || 'contact'
  const note = notificationBody(value, { source, lang })

  /* The notification is the one that must not fail — it is the actual enquiry. */
  try {
    await sendMail(env, {
      to: env.CONTACT_TO,
      replyTo: value.email,
      subject: `Mesaj nou de pe site — ${value.name}`,
      text: note.text,
      html: note.html,
    })
  } catch (err) {
    console.error('contact: notification failed', err?.code, err?.message)
    return json({ ok: false, error: 'send_failed' }, 502)
  }

  /* The acknowledgement is best-effort: the enquiry is already safe, and
   * failing the request here would make the visitor send it twice. */
  try {
    const reply = autoReplyBody(value, lang)
    await sendMail(env, {
      to: value.email,
      replyTo: env.CONTACT_TO,
      subject: reply.subject,
      text: reply.text,
      html: reply.html,
    })
  } catch (err) {
    console.error('contact: auto-reply failed', err?.code, err?.message)
  }

  return json({ ok: true })
}


/* Newsletter signup from the footer. Same defences as the contact form, and
 * the same deliberate silence: a bot learns nothing from the response, and
 * neither does someone probing whether an address is already on the list. */
async function handleNewsletter(request, env) {
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405)
  if (!(request.headers.get('content-type') || '').includes('application/json'))
    return json({ ok: false, error: 'bad_request' }, 400)

  let data
  try {
    data = await request.json()
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400)
  }

  if (typeof data.website === 'string' && data.website.trim() !== '') {
    console.log('newsletter: honeypot')
    return json({ ok: true })
  }

  const dwell = Date.now() - Number(data.renderedAt || 0)
  if (!Number.isFinite(dwell) || dwell < MIN_DWELL_MS || dwell > MAX_DWELL_MS) {
    console.log('newsletter: dwell', { dwell })
    return json({ ok: true })
  }

  const email = oneLine(data.email, MAX.email)
  if (!email || !EMAIL_RE.test(email)) return json({ ok: false, error: 'validation', fields: ['email'] }, 400)

  if (env.CONTACT_LIMITER) {
    const ip = request.headers.get('cf-connecting-ip') || 'unknown'
    const { success } = await env.CONTACT_LIMITER.limit({ key: `nl:${ip}` })
    if (!success) return json({ ok: false, error: 'rate_limited' }, 429)
  }

  try {
    const outcome = await subscribe(env, email)
    if (outcome === 'invalid') return json({ ok: false, error: 'validation', fields: ['email'] }, 400)
    return json({ ok: true })
  } catch (err) {
    console.error('newsletter: subscribe failed', err?.code, err?.title)
    return json({ ok: false, error: 'send_failed' }, 502)
  }
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)
    if (pathname === '/api/contact') return handleContact(request, env)
    if (pathname === '/api/newsletter') return handleNewsletter(request, env)
    /* run_worker_first routes all of /api/* here; anything else we did not
     * define is not an endpoint. Hand the rest back to the asset server so the
     * SPA keeps behaving exactly as before. */
    if (pathname.startsWith('/api/')) return json({ ok: false, error: 'not_found' }, 404)
    return env.ASSETS.fetch(request)
  },
}
