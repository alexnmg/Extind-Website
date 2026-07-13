import Logo from './Logo'
import iconEmail from '../assets/figma/icon-email.svg'

const menuLinks = ['Private Offices', 'Meeting Rooms', 'Coworking', 'Day Pass', 'Community & Events']
const companyLinks = ['About Us', 'Community & Events']

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <Logo />
        <p className="footer__copyright">© 2026 Extind. All rights reserved.</p>
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
        <div className="footer__col">
          <p className="footer__col-title">Contact</p>
          <button type="button" className="btn btn--primary">
            Book a tour
          </button>
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
    </footer>
  )
}
