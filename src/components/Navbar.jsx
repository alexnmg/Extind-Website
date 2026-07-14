import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const aboutItems = [
  { label: 'About Extind', to: '/about' },
  { label: 'FAQ', to: '#' },
  { label: 'Contact', to: '#' },
]
const links = [
  { label: 'Private offices', to: '/private-offices' },
  { label: 'Meeting rooms', to: '#' },
  { label: 'Coworking', to: '#' },
  { label: 'Community & Events', to: '#' },
]
// Mobile menu keeps its own order per the Figma "Mobile Menu" component.
const mobileLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Coworking', to: '#' },
  { label: 'Private offices', to: '/private-offices' },
  { label: 'Meeting rooms', to: '#' },
  { label: 'Community & Events', to: '#' },
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

export default function Navbar() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef(null)
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

  useEffect(() => {
    if (!aboutOpen) return
    const onPointerDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAboutOpen(false)
      }
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setAboutOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [aboutOpen])

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
    <div className={`navbar-container${hidden && !mobileOpen ? ' navbar-container--hidden' : ''}`}>
      <header
        ref={navRef}
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}${mobileOpen ? ' navbar--open' : ''}`}
      >
        <div className="navbar__bar">
          <Link to="/" aria-label="Extind home">
            <Logo />
          </Link>
          {/* Grouped right-hand side: pinned to the right edge so the logo's
              expand animation never shifts the menu */}
          <div className="navbar__right">
            <nav className="navbar__links">
              <div className="navbar__dropdown-wrap" ref={dropdownRef}>
                <button
                  type="button"
                  className={`navbar__link${aboutOpen ? ' is-active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={aboutOpen}
                  onClick={() => setAboutOpen((v) => !v)}
                >
                  About us
                  <Chevron />
                </button>
                <div className={`navbar__dropdown${aboutOpen ? ' navbar__dropdown--open' : ''}`}>
                  {aboutItems.map(({ label, to }) =>
                    to.startsWith('/') ? (
                      <Link key={label} className="navbar__link" to={to} onClick={() => setAboutOpen(false)}>
                        {label}
                      </Link>
                    ) : (
                      <a key={label} className="navbar__link" href={to} onClick={() => setAboutOpen(false)}>
                        {label}
                      </a>
                    )
                  )}
                </div>
              </div>
              {links.map(({ label, to }) =>
                to.startsWith('/') ? (
                  <Link key={label} className="navbar__link" to={to}>
                    {label}
                  </Link>
                ) : (
                  <a key={label} className="navbar__link" href={to}>
                    {label}
                  </a>
                )
              )}
            </nav>
            <Link className="btn btn--primary navbar__cta" to="/book-a-visit">
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
