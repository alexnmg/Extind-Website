import brandMark from '../assets/brand-mark.svg'
import iconEmail from '../assets/figma/icon-email.svg'

// Mirrors the navbar's menu order
const menuLinks = ['About us', 'Private offices', 'Meeting rooms', 'Coworking', 'Community & Events']
const companyLinks = ['FAQ', 'Contact']

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.66c0-1.35-.03-3.09-1.9-3.09-1.9 0-2.2 1.47-2.2 2.99V21h-4V9Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.25 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.36.47 2.43.05 1.07.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43-.25.66-.6 1.22-1.15 1.77-.55.55-1.11.9-1.77 1.15-.64.25-1.36.42-2.43.47-1.07.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.25-.66.6-1.22 1.15-1.77.55-.55 1.11-.9 1.77-1.15.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.98.04-1.5.2-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.3.88-.34 1.86-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.98.2 1.5.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.88.3 1.86.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.98-.04 1.5-.2 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.3-.88.34-1.86.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.98-.2-1.5-.34-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.36-.14-.88-.3-1.86-.34-1.05-.05-1.37-.06-4.04-.06Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68Zm5.34-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
    </svg>
  )
}

const socials = [
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'LinkedIn', Icon: LinkedInIcon },
  { label: 'Instagram', Icon: InstagramIcon },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__brand">
          <img className="footer__mark" src={brandMark} alt="Extind" width="56" height="56" />
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <p className="footer__col-title">Menu</p>
            {menuLinks.map((label) => (
              <a key={label} className="footer__link" href="#">
                {label}
              </a>
            ))}
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Company</p>
            {companyLinks.map((label) => (
              <a key={label} className="footer__link" href="#">
                {label}
              </a>
            ))}
          </div>
          <div className="footer__col footer__newsletter">
            <p className="footer__col-title">Join our newsletter</p>
            <form className="email-row" onSubmit={(e) => e.preventDefault()}>
              <label className="email-field">
                <img src={iconEmail} alt="" />
                <input type="email" placeholder="Iași, Romania" aria-label="Email address" />
              </label>
              <button type="submit" className="btn btn--outline">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="divider footer__divider" role="separator" />

      <div className="footer__bottom">
        <p className="footer__copyright">© 2026 Extind. All rights reserved.</p>
        <div className="footer__socials">
          {socials.map(({ label, Icon }) => (
            <a
              key={label}
              className="footer__social"
              href="#"
              aria-label={`Extind on ${label}`}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
