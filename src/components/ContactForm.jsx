import { useEffect, useRef, useState } from 'react'
import { Link } from '../lib/LocaleLink'
import { useLang } from '../lib/i18n'

const T = {
  en: {
    heading: 'Send us a message',
    messageLabel: 'How can we help?',
    submitLabel: 'Send message',
    name: 'Name',
    namePlaceholder: 'Enter your full name',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    company: 'Company',
    companyPlaceholder: 'Enter text...',
    phone: 'Phone number',
    messagePlaceholder: 'Your message here...',
    consentBefore: 'I agree to the ',
    consentLink: 'Privacy Policy',
    sending: 'Sending…',
    retry: 'Try again',
    errorTitle: "That didn't send",
    errorBody: 'Something went wrong at our end. Please try again, or write to us directly at office@extind.ro.',
    errorValidation: 'Please check the highlighted fields and try again.',
    errorRateLimit: 'That is a lot of messages at once. Please wait a minute and try again.',
    thanksTitle: (name) => `Thank you, ${name}!`,
    thanksFallbackName: 'friend',
    thanksBody: (email) => `Thanks for reaching out. We'll reply at ${email} within one business day.`,
    thanksFallbackEmail: 'your email',
  },
  ro: {
    heading: 'Trimite-ne un mesaj',
    messageLabel: 'Cu ce te putem ajuta?',
    submitLabel: 'Trimite mesajul',
    name: 'Nume',
    namePlaceholder: 'Numele tău complet',
    email: 'Email',
    emailPlaceholder: 'tu@exemplu.com',
    company: 'Companie',
    companyPlaceholder: 'Introdu textul...',
    phone: 'Număr de telefon',
    messagePlaceholder: 'Mesajul tău aici...',
    consentBefore: 'Sunt de acord cu ',
    consentLink: 'Politica de confidențialitate',
    sending: 'Se trimite…',
    retry: 'Încearcă din nou',
    errorTitle: 'Mesajul nu a fost trimis',
    errorBody: 'Ceva nu a funcționat la noi. Te rugăm să încerci din nou sau scrie-ne direct la office@extind.ro.',
    errorValidation: 'Verifică te rugăm câmpurile marcate și încearcă din nou.',
    errorRateLimit: 'Sunt prea multe mesaje trimise într-un timp scurt. Așteaptă un minut și încearcă din nou.',
    thanksTitle: (name) => `Mulțumim, ${name}!`,
    thanksFallbackName: 'prietene',
    thanksBody: (email) => `Îți mulțumim că ne-ai scris. Îți răspundem la ${email} în cel mult o zi lucrătoare.`,
    thanksFallbackEmail: 'adresa ta',
  },
}

/* Single-step contact form. Reuses the shared field / checkbox / button
 * styles from the booking flow (see .field, .checkbox-row, .btn--primary in
 * App.css) so the two forms stay visually identical.
 *
 * Submits to POST /api/contact (worker/index.js), which mails office@extind.ro
 * and sends the visitor an acknowledgement. `source` distinguishes an enquiry
 * from Contact from one from Events — the same component serves both. */
export default function ContactForm({ heading, messageLabel, submitLabel, source = 'contact' }) {
  const { lang } = useLang()
  const t = T[lang]
  heading = heading ?? t.heading
  messageLabel = messageLabel ?? t.messageLabel
  submitLabel = submitLabel ?? t.submitLabel
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [website, setWebsite] = useState('') // honeypot — a human never fills this
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorKey, setErrorKey] = useState('errorBody')
  const [badFields, setBadFields] = useState([])

  // The server rejects anything submitted within a few seconds of the form
  // appearing. Bots post instantly; people do not. Stamped in an effect rather
  // than at render: Date.now() is impure, and mount is the moment we want.
  const renderedAt = useRef(0)
  const resultRef = useRef(null)

  useEffect(() => {
    renderedAt.current = Date.now()
  }, [])

  // Move focus to the result so a screen reader lands on it rather than on
  // whatever happened to follow the form in the document.
  useEffect(() => {
    if (status === 'sent') resultRef.current?.focus()
  }, [status])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return // duplicate-submit guard

    setStatus('sending')
    setBadFields([])

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          message,
          consent: agreed,
          lang,
          source,
          website,
          renderedAt: renderedAt.current,
        }),
      })

      let body = {}
      try {
        body = await res.json()
      } catch {
        /* a non-JSON response is a failure whatever it says */
      }

      if (res.ok && body.ok) {
        setStatus('sent')
        return
      }

      if (res.status === 429) setErrorKey('errorRateLimit')
      else if (body.error === 'validation') {
        setErrorKey('errorValidation')
        setBadFields(Array.isArray(body.fields) ? body.fields : [])
      } else setErrorKey('errorBody')
      setStatus('error')
    } catch {
      // Offline, DNS failure, request blocked — indistinguishable from here.
      setErrorKey('errorBody')
      setStatus('error')
    }
  }

  const sending = status === 'sending'
  const invalid = (f) => (badFields.includes(f) ? ' field__input--invalid' : '')

  return (
    <form className="contact__form" data-reveal onSubmit={handleSubmit}>
      {status === 'sent' ? (
        <div role="status" aria-live="polite" ref={resultRef} tabIndex={-1} className="form-result">
          <h3 className="book-visit__heading">{t.thanksTitle(name || t.thanksFallbackName)}</h3>
          <p className="book-visit__thanks">{t.thanksBody(email || t.thanksFallbackEmail)}</p>
        </div>
      ) : (
        <>
          <h3 className="book-visit__heading">{heading}</h3>
          <div className="field-row field-row--wide">
            <label className="field">
              <span className="field__label">{t.name}</span>
              <input
                className={`field__input${invalid('name')}`}
                type="text"
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="field">
              <span className="field__label">{t.email}</span>
              <input
                className={`field__input${invalid('email')}`}
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="field-row field-row--wide">
            <label className="field">
              <span className="field__label">{t.company}</span>
              <input
                className="field__input"
                type="text"
                placeholder={t.companyPlaceholder}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </label>
            <label className="field">
              <span className="field__label">{t.phone}</span>
              <input
                className="field__input"
                type="tel"
                placeholder="+40 ..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>
          <label className="field" style={{ width: '100%' }}>
            <span className="field__label">{messageLabel}</span>
            <textarea
              className={`field__input${invalid('message')}`}
              placeholder={t.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          {/* A real checkbox inside a label, rather than the button+role this
              used to be: the consent text now contains a link, and a link
              cannot live inside a button. Link calls preventDefault before
              navigating, which also cancels the label's toggle. */}
          <label className={`checkbox-row${agreed ? ' checkbox-row--checked' : ''}`}>
            <input
              className="checkbox-row__input"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span className="checkbox-row__box" aria-hidden="true">
              {agreed && (
                <svg viewBox="0 0 16 20" width="12" height="15" fill="none" aria-hidden="true">
                  <path
                    d="M13.333 6.3335L6 13.6665L2.667 10.3335"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="checkbox-row__label">
              {t.consentBefore}
              <Link className="checkbox-row__link" to="/privacy" viewTransition>
                {t.consentLink}
              </Link>
            </span>
          </label>
          {/* Honeypot. Hidden from people and from assistive tech, skipped by
              tab order, and excluded from autofill — anything that fills it in
              is a bot, and the server silently discards the submission. */}
          <div className="form-hp" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div role="alert" aria-live="assertive">
            {status === 'error' && (
              <p className="form-error">
                <strong>{t.errorTitle}.</strong> {t[errorKey]}
              </p>
            )}
          </div>

          <div className="book-visit__footer">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={!agreed || sending}
              aria-busy={sending}
              style={!agreed || sending ? { opacity: 0.45, cursor: 'default' } : undefined}
            >
              {sending ? t.sending : status === 'error' ? t.retry : submitLabel}
            </button>
          </div>
        </>
      )}
    </form>
  )
}
