import { useState } from 'react'
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
    consent: 'I agree to the Terms and Privacy Policy',
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
    consent: 'Sunt de acord cu Termenii și Politica de confidențialitate',
    thanksTitle: (name) => `Mulțumim, ${name}!`,
    thanksFallbackName: 'prietene',
    thanksBody: (email) => `Îți mulțumim că ne-ai scris. Îți răspundem la ${email} în cel mult o zi lucrătoare.`,
    thanksFallbackEmail: 'adresa ta',
  },
}

/* Single-step contact form. Reuses the shared field / checkbox / button
 * styles from the booking flow (see .field, .checkbox-row, .btn--primary in
 * App.css) so the two forms stay visually identical. On submit it swaps to a
 * lightweight thank-you state — no backend is wired yet. */
export default function ContactForm({ heading, messageLabel, submitLabel }) {
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
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <form className="contact__form" data-reveal onSubmit={handleSubmit}>
      {submitted ? (
        <>
          <h3 className="book-visit__heading">{t.thanksTitle(name || t.thanksFallbackName)}</h3>
          <p className="book-visit__thanks">{t.thanksBody(email || t.thanksFallbackEmail)}</p>
        </>
      ) : (
        <>
          <h3 className="book-visit__heading">{heading}</h3>
          <div className="field-row field-row--wide">
            <label className="field">
              <span className="field__label">{t.name}</span>
              <input
                className="field__input"
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
                className="field__input"
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
              className="field__input"
              placeholder={t.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          <button
            type="button"
            className={`checkbox-row${agreed ? ' checkbox-row--checked' : ''}`}
            onClick={() => setAgreed((v) => !v)}
            role="checkbox"
            aria-checked={agreed}
          >
            <span className="checkbox-row__box">
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
            <span className="checkbox-row__label">{t.consent}</span>
          </button>
          <div className="book-visit__footer">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={!agreed}
              style={!agreed ? { opacity: 0.45, cursor: 'default' } : undefined}
            >
              {submitLabel}
            </button>
          </div>
        </>
      )}
    </form>
  )
}
