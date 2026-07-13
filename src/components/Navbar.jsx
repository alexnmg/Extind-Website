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

function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

export default function Navbar() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef(null)

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

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen])

  return (
    <div className="navbar-container">
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
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
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <BurgerIcon />
        </button>
      </header>

      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mobile-menu__header">
            <Logo />
            <button
              type="button"
              className="mobile-menu__close"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <nav className="mobile-menu__links">
            {mobileLinks.map((label) => (
              <a key={label} className="mobile-menu__link" href="#" onClick={() => setMobileOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <button type="button" className="btn btn--primary mobile-menu__cta">
              <span>Book a Tour</span>
              <span aria-hidden="true">→</span>
            </button>
            <p className="mobile-menu__email">hello@extind.com</p>
          </div>
        </div>
      )}
    </div>
  )
}
