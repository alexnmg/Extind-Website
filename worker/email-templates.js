/* On-brand HTML for the two transactional emails.
 *
 * The acknowledgement deliberately does NOT quote the sender's message back.
 * /api/contact is public and unauthenticated, so echoing arbitrary text into a
 * mail that is SPF-aligned and DKIM-signed as extind.ro turns the contact form
 * into a way for anyone to send convincing mail from the client's domain to any
 * address they choose. Confirming receipt does not require repeating content.
 *
 * Email is a hostile target and the rules below are not stylistic — each one
 * exists because a named client breaks without it:
 *
 *  - Nested tables at 600px, no divs for structure. Classic Outlook's Word
 *    engine has no flex, grid, max-width, float or position, and Microsoft
 *    supports it until at least 2029.
 *  - Every visual style inlined. The one <style> block carries only the mobile
 *    media query, which Outlook Windows, Thunderbird and Gmail-with-a-
 *    non-Google-account never see — so the inline desktop rendering must be
 *    correct on its own.
 *  - No @font-face. Almost no client loads one, so the brand faces are named
 *    first and the layout is designed against Georgia, which is what most
 *    recipients actually see (Libre Baskerville sets ~18% wider).
 *  - Light-only, engineered to survive forced inversion rather than fighting
 *    it. Gmail's apps and every Outlook ignore prefers-color-scheme, so a dark
 *    palette would only serve clients that were never broken.
 *  - Nothing is pure #ffffff or #000000. That single choice is what stops
 *    Apple Mail — the largest client by open share — from inverting anything.
 *  - Every container and every run of text declares its own colour. Undeclared
 *    colours are what produce the half-transformed patchwork look.
 */

const C = {
  charcoal: '#1f2326',
  cream: '#f6f2ef',
  surface: '#fffdfb', // not #ffffff, deliberately — see above
  forest: '#465248',
  border: '#d1ccc4',
}

/* #999c9e on cream is 2.48:1 and fails WCAG AA, so forest carries every label
 * and secondary line instead of the brand's mid-grey. */
const LABEL = C.forest

const SANS = "'Instrument Sans','Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"
// Never bare 'Baskerville': Apple ships one, and it is the worst metric match
// of any candidate (x-height/cap 60% against Libre Baskerville's 69%).
const SERIF = "'Libre Baskerville',Georgia,'Noto Serif','Times New Roman',serif"

const ORIGIN = 'https://extind.tight-sunset-f416.workers.dev'
const LOGO = `${ORIGIN}/brand/extind-wordmark-email.png`

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

/* Outlook's Word engine supports neither max-width nor overflow-wrap, so a
 * pasted URL would stretch the 600px table and break the layout for everyone.
 * CSS cannot fix it there — the break opportunities have to be in the markup.
 * A zero-width space every 30 chars of an unbroken run is invisible, survives
 * copy-paste as nothing, and lets every client wrap. */
const breakLongTokens = (html) =>
  html.replace(/\S{31,}/g, (run) => run.replace(/(.{30})/g, '$1​'))

const escBody = (s) => breakLongTokens(esc(s)).replace(/\r?\n/g, '<br>')

/* Hidden preheader: what shows in the inbox list after the subject. display:none
 * does not inherit into nested tables and does nothing on an <img>, hence
 * mso-hide:all as well. The zero-width joiners stop the client padding the
 * preview with the first words of the visible body. */
const preheader = (text) =>
  `<div style="display:none;mso-hide:all;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${esc(
    text
  )}${'&zwnj;&nbsp;'.repeat(60)}</div>`

function shell({ lang, preview, inner }) {
  return `<!doctype html>
<html lang="${lang}" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>EXTIND</title>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<style>
  @media only screen and (max-width:620px){
    .wrap{width:100%!important}
    .pad{padding-left:20px!important;padding-right:20px!important}
    .stack{display:block!important;width:100%!important}
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${C.cream};">
${preheader(preview)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.cream}" style="background-color:${C.cream};margin:0;padding:0;">
  <tr><td align="center" style="padding:32px 12px;background-color:${C.cream};">
    <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="width:600px;max-width:600px;margin:0 auto;">
${inner}
    </table>
  </td></tr>
</table>
</body>
</html>`
}

const logoRow = (alt) => `      <tr><td align="left" bgcolor="${C.cream}" style="background-color:${C.cream};padding:0 0 24px 0;">
        <img src="${LOGO}" width="144" height="40" alt="${esc(alt)}" style="display:block;border:0;outline:none;text-decoration:none;width:144px;height:40px;background-color:${C.cream};">
      </td></tr>`

const card = (body) => `      <tr><td bgcolor="${C.surface}" style="background-color:${C.surface};border:1px solid ${C.border};border-radius:12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="pad" style="padding:28px 32px;">
${body}
        </td></tr></table>
      </td></tr>`

const footRow = (lines) => `      <tr><td class="pad" align="left" bgcolor="${C.cream}" style="background-color:${C.cream};padding:20px 4px 0 4px;">
${lines
  .map(
    (l) =>
      `        <p style="margin:0 0 4px 0;font-family:${SANS};font-size:12px;line-height:18px;color:${LABEL};">${l}</p>`
  )
  .join('\n')}
      </td></tr>`

// ---------------------------------------------------------------- email 1

const NOTIF_LABELS = { name: 'Nume', email: 'Email', company: 'Companie', phone: 'Telefon', source: 'Pagina', lang: 'Limba' }

/* Internal notification. Staff triage from the inbox list, so the subject
 * carries the name and company rather than a generic line. Reply-To is the
 * enquirer, so Reply just works. */
export function notificationEmail(v, meta) {
  const rows = [
    [NOTIF_LABELS.name, v.name],
    [NOTIF_LABELS.email, v.email],
    [NOTIF_LABELS.company, v.company || '—'],
    [NOTIF_LABELS.phone, v.phone || '—'],
    [NOTIF_LABELS.source, meta.source],
    [NOTIF_LABELS.lang, meta.lang],
  ]

  const subjectBits = [v.name, v.company].filter(Boolean).join(' · ')
  const subject = `Mesaj nou de pe site — ${subjectBits}${meta.source !== 'contact' ? ` (${meta.source})` : ''}`

  const text =
    rows.map(([k, val]) => `${k}: ${val}`).join('\n') +
    `\n\n${'-'.repeat(58)}\n\n${v.message}\n\n${'-'.repeat(58)}\nRăspunde direct la acest email — pleacă la ${v.email}.\n`

  const detailRows = rows
    .map(
      ([k, val]) => `          <tr>
            <td style="padding:0 16px 10px 0;font-family:${SANS};font-size:12px;line-height:18px;color:${LABEL};text-transform:uppercase;letter-spacing:0.6px;white-space:nowrap;vertical-align:top;">${esc(k)}</td>
            <td style="padding:0 0 10px 0;font-family:${SANS};font-size:15px;line-height:20px;color:${C.charcoal};font-weight:600;vertical-align:top;">${breakLongTokens(esc(val))}</td>
          </tr>`
    )
    .join('\n')

  const inner = [
    logoRow('EXTIND'),
    card(`          <p style="margin:0 0 4px 0;font-family:${SANS};font-size:12px;line-height:18px;color:${LABEL};text-transform:uppercase;letter-spacing:0.8px;">Mesaj nou de pe site</p>
          <h1 style="margin:0 0 24px 0;font-family:${SANS};font-size:22px;line-height:28px;color:${C.charcoal};font-weight:700;">${esc(v.name)}</h1>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
${detailRows}
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:18px 0 0 0;border-top:1px solid ${C.border};">
            <p style="margin:0;font-family:${SERIF};font-size:15px;line-height:25px;color:${C.charcoal};">${escBody(v.message)}</p>
          </td></tr></table>`),
    footRow([`Răspunde direct la acest email — pleacă la <span style="color:${C.charcoal};">${esc(v.email)}</span>.`]),
  ].join('\n')

  return { subject, text, html: shell({ lang: 'ro', preview: `${v.name} · ${v.email}`, inner }) }
}

// ---------------------------------------------------------------- email 2

const ACK = {
  ro: {
    subject: 'Am primit mesajul tău — EXTIND',
    preview: 'Îți răspundem în cel mult o zi lucrătoare.',
    eyebrow: 'Mesaj primit',
    greeting: (n) => (n ? `Salut, ${n}` : 'Salut'),
    body: 'Îți mulțumim că ne-ai scris. Am primit mesajul tău și îți răspundem în cel mult o zi lucrătoare.',
    received: 'Mesajul tău a ajuns la noi în întregime — nu îl repetăm aici din motive de securitate.',
    signoff: 'O zi bună,<br>Echipa EXTIND',
    signoffText: 'O zi bună,\nEchipa EXTIND',
    addr: 'Strada Sfântul Andrei 39A, Palas Campus (clădirea B2), etaj 6, Iași',
    auto: 'Acesta este un mesaj automat — dar îl citim pe al tău.',
  },
  en: {
    subject: 'We received your message — EXTIND',
    preview: 'We’ll reply within one business day.',
    eyebrow: 'Message received',
    greeting: (n) => (n ? `Hi ${n}` : 'Hi'),
    body: 'Thanks for reaching out. We’ve received your message and will reply within one business day.',
    received: 'Your message reached us in full — we do not repeat it here, for security reasons.',
    signoff: 'Best,<br>The EXTIND team',
    signoffText: 'Best,\nThe EXTIND team',
    addr: 'Strada Sfântul Andrei 39A, Palas Campus (building B2), 6th floor, Iași',
    auto: 'This is an automatic message — but a person reads yours.',
  },
}

export function acknowledgementEmail(v, lang) {
  const t = ACK[lang] ?? ACK.ro
  const first = String(v.name || '').split(' ')[0]

  const text = `${t.greeting(first)},\n\n${t.body}\n\n${t.received}\n\n${t.signoffText}\n${t.addr}\n`

  const inner = [
    logoRow('EXTIND'),
    card(`          <p style="margin:0 0 4px 0;font-family:${SANS};font-size:12px;line-height:18px;color:${LABEL};text-transform:uppercase;letter-spacing:0.8px;">${esc(t.eyebrow)}</p>
          <h1 style="margin:0 0 16px 0;font-family:${SANS};font-size:24px;line-height:30px;color:${C.charcoal};font-weight:700;">${esc(t.greeting(first))},</h1>
          <p style="margin:0 0 24px 0;font-family:${SERIF};font-size:16px;line-height:27px;color:${C.charcoal};">${esc(t.body)}</p>
          <p style="margin:0 0 24px 0;font-family:${SANS};font-size:13px;line-height:20px;color:${LABEL};">${esc(t.received)}</p>
          <p style="margin:0;font-family:${SERIF};font-size:16px;line-height:27px;color:${C.charcoal};">${t.signoff}</p>`),
    footRow([esc(t.addr), esc(t.auto)]),
  ].join('\n')

  return { subject: t.subject, text, html: shell({ lang, preview: t.preview, inner }) }
}
