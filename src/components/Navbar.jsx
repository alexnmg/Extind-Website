import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const aboutItems = [
  { label: 'About Extind', to: '/about' },
  { label: 'FAQ', to: '#' },
  { label: 'Contact', to: '/contact' },
]
const communityItems = [
  { label: 'Vista Lounge', to: '/vista-lounge' },
  { label: 'Events', to: '/events' },
  { label: 'Journal', to: '/journal' },
]
const links = [
  { label: 'Private offices', to: '/private-offices' },
  { label: 'Meeting rooms', to: '#' },
  { label: 'Coworking', to: '#' },
]
// Mobile menu keeps its own order per the Figma "Mobile Menu" component; the
// Community dropdown flattens into its three destinations here.
const mobileLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Coworking', to: '#' },
  { label: 'Private offices', to: '/private-offices' },
  { label: 'Meeting rooms', to: '#' },
  { label: 'Vista Lounge', to: '/vista-lounge' },
  { label: 'Events', to: '/events' },
  { label: 'Journal', to: '/journal' },
]

function Chevron() {
  return (
    <svg viewBox="0 0 8 7" width="8" height="7" fill="none" aria-hidden="true">
      <path
        d="M1 1.5L4 5L7 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// A single navbar dropdown that owns its open state and closes on Escape or an
// outside click. Used for both "About us" and "Community & Events".
function NavDropdown({ label, items }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="navbar__dropdown-wrap" ref={ref}>
      <button
        type="button"
        className={`navbar__link${open ? ' is-active' : ''}`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <Chevron />
      </button>
      <div className={`navbar__dropdown${open ? ' navbar__dropdown--open' : ''}`}>
        {items.map(({ label: itemLabel, to }) =>
          to.startsWith('/') ? (
            <Link
              key={itemLabel}
              className="navbar__link"
              to={to}
              onClick={() => setOpen(false)}
              viewTransition
            >
              {itemLabel}
            </Link>
          ) : (
            <a key={itemLabel} className="navbar__link" href={to} onClick={() => setOpen(false)}>
              {itemLabel}
            </a>
          )
        )}
      </div>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)

  // Hide on scroll down, reveal on scroll up (the CSS only applies the
  // hidden transform at mobile/tablet widths, so desktop never hides).
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      if (y > lastY + 4 && y > 120) setHidden(true)
      else if (y < lastY - 4 || y <= 120) setHidden(false)
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the expanding mobile menu on Escape or an outside click/tap.
  useEffect(() => {
    if (!mobileOpen) return
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMobileOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen])

  return (
    <div
      className={`navbar-container${hidden && !mobileOpen ? ' navbar-container--hidden' : ''}${
        mobileOpen ? ' navbar-container--open' : ''
      }`}
    >
      <header
        ref={navRef}
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}${mobileOpen ? ' navbar--open' : ''}`}
      >
        <div className="navbar__bar">
          <Link to="/" aria-label="Extind home" viewTransition>
            <Logo />
          </Link>
          {/* Grouped right-hand side: pinned to the right edge so the logo's
              expand animation never shifts the menu */}
          <div className="navbar__right">
            <nav className="navbar__links">
              <NavDropdown label="About us" items={aboutItems} />
              {links.map(({ label, to }) =>
                to.startsWith('/') ? (
                  <Link key={label} className="navbar__link" to={to} viewTransition>
                    {label}
                  </Link>
                ) : (
                  <a key={label} className="navbar__link" href={to}>
                    {label}
                  </a>
                )
              )}
              <NavDropdown label="Community & Events" items={communityItems} />
            </nav>
            <Link className="btn btn--primary navbar__cta" to="/book-a-visit" viewTransition>
              Book a visit
            </Link>
            <button
              type="button"
              className="navbar__burger"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="navbar__burger-box" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        <div className="navbar__mobile">
          <div className="navbar__mobile-inner">
            <nav className="navbar__mobile-links">
              {mobileLinks.map(({ label, to }) =>
                to.startsWith('/') ? (
                  <Link
                    key={label}
                    className="navbar__mobile-link"
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    viewTransition
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    key={label}
                    className="navbar__mobile-link"
                    href={to}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </a>
                )
              )}
            </nav>
            <div className="navbar__mobile-footer">
              <Link
                className="btn btn--primary navbar__mobile-cta"
                to="/book-a-visit"
                onClick={() => setMobileOpen(false)}
                viewTransition
              >
                <span>Book a visit</span>
                <span aria-hidden="true">→</span>
              </Link>
              <p className="navbar__mobile-email">hello@extind.com</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
