import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'

const aboutItems = ['About Extind', 'FAQ', 'Contact']
const links = ['Private offices', 'Meeting rooms', 'Coworking', 'Community & Events']
// Mobile menu keeps its own order per the Figma "Mobile Menu" component.
const mobileLinks = ['About us', 'Coworking', 'Private offices', 'Meeting rooms', 'Community & Events']

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
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
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
    <div className="navbar-container">
      <header
        ref={navRef}
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}${mobileOpen ? ' navbar--open' : ''}`}
      >
        <div className="navbar__bar">
          <a href="/" aria-label="Extind home">
            <Logo />
          </a>
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
                {aboutItems.map((label) => (
                  <a key={label} className="navbar__link" href="#" onClick={() => setAboutOpen(false)}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
            {links.map((label) => (
              <a key={label} className="navbar__link" href="#">
                {label}
              </a>
            ))}
          </nav>
          <button type="button" className="btn btn--primary navbar__cta">
            Book a visit
          </button>
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

        <div className="navbar__mobile">
          <div className="navbar__mobile-inner">
            <nav className="navbar__mobile-links">
              {mobileLinks.map((label) => (
                <a
                  key={label}
                  className="navbar__mobile-link"
                  href="#"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              ))}
            </nav>
            <div className="navbar__mobile-footer">
              <button type="button" className="btn btn--primary navbar__mobile-cta">
                <span>Book a Tour</span>
                <span aria-hidden="true">→</span>
              </button>
              <p className="navbar__mobile-email">hello@extind.com</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
