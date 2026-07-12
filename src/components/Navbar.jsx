import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'

const aboutItems = ['About Extind', 'FAQ', 'Contact']
const links = ['Coworking', 'Private offices', 'Meeting rooms', 'Vista Lounge']

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
        <button type="button" className="btn btn--primary">
          Book a visit
        </button>
      </header>
    </div>
  )
}
