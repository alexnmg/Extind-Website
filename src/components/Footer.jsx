import iconEmail from '../assets/figma/icon-email.svg'

const menuLinks = ['About us', 'Coworking', 'Private offices', 'Meeting rooms', 'Vista Lounge']

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <p className="footer__logo">EXTIND</p>
        <p className="footer__tagline">Spaces to grow</p>
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
          <p className="footer__col-title">Contact</p>
          <p className="footer__link">Palas Campus, Iași</p>
          <p className="footer__link">Instagram · LinkedIn</p>
        </div>
        <div className="footer__col">
          <p className="footer__col-title">Book a Tour</p>
          <button type="button" className="btn btn--primary">
            Book a tour
          </button>
        </div>
        <div className="footer__col footer__newsletter">
          <p className="footer__col-title">Subscribe to our newsletter</p>
          <form className="email-row" onSubmit={(e) => e.preventDefault()}>
            <label className="email-field">
              <img src={iconEmail} alt="" />
              <input type="email" placeholder="Your email address" aria-label="Email address" />
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
