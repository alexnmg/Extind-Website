import { useState } from 'react'

/* Single-step contact form. Reuses the shared field / checkbox / button
 * styles from the booking flow (see .field, .checkbox-row, .btn--primary in
 * App.css) so the two forms stay visually identical. On submit it swaps to a
 * lightweight thank-you state — no backend is wired yet. */
export default function ContactForm() {
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
          <h3 className="book-visit__heading">Thank you, {name || 'friend'}!</h3>
          <p className="book-visit__thanks">
            Thanks for reaching out. We&apos;ll reply at {email || 'your email'} within one
            business day.
          </p>
        </>
      ) : (
        <>
          <h3 className="book-visit__heading">Send us a message</h3>
          <div className="field-row field-row--wide">
            <label className="field">
              <span className="field__label">Name</span>
              <input
                className="field__input"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="field">
              <span className="field__label">Email</span>
              <input
                className="field__input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="field-row field-row--wide">
            <label className="field">
              <span className="field__label">Company</span>
              <input
                className="field__input"
                type="text"
                placeholder="Enter text..."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </label>
            <label className="field">
              <span className="field__label">Phone number</span>
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
            <span className="field__label">How can we help?</span>
            <textarea
              className="field__input"
              placeholder="Your message here..."
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
            <span className="checkbox-row__label">I agree to the Terms and Privacy Policy</span>
          </button>
          <div className="book-visit__footer">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={!agreed}
              style={!agreed ? { opacity: 0.45, cursor: 'default' } : undefined}
            >
              Send message
            </button>
          </div>
        </>
      )}
    </form>
  )
}
