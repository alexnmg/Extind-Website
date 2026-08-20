import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const aboutItems = [
  { label: 'About Extind', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]
const officesItems = [
  { label: 'Private offices', to: '/private-offices' },
  { label: 'Executive Day Office', to: '/executive-day-office' },
]
const communityItems = [
  { label: 'Vista Lounge', to: '/vista-lounge' },
  { label: 'Events', to: '/events' },
  { label: 'Extind Magazine', to: '/magazine' },
]
// Standalone desktop links (no dropdown), sitting between the dropdowns.
const links = [
  { label: 'Coworking', to: '/coworking' },
  { label: 'Conference Rooms', to: '/conference-rooms' },
]
// The mobile menu is a drill-down: parents open a sub-panel, leaves navigate.
const mobileNav = [
  { label: 'About us', children: aboutItems },
  { label: 'Offices', children: officesItems },
  { label: 'Coworking', to: '/coworking' },
  { label: 'Conference Rooms', to: '/conference-rooms' },
  { label: 'Community & Events', children: communityItems },
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

function ChevronRight() {
  return (
    <svg viewBox="0 0 8 14" width="8" height="14" fill="none" aria-hidden="true">
      <path
        d="M1 1L7 7L1 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 8 14" width="8" height="14" fill="none" aria-hidden="true">
      <path
        d="M7 1L1 7L7 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// A single navbar dropdown that owns its open state and closes on Escape or an
// outside click. Used for "About us", "Offices" and "Community & Events".
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
  // Which parent's sub-panel is open in the mobile drill-down (null = root).
  const [mobileSub, setMobileSub] = useState(null)
  const navRef = useRef(null)

  const closeMobile = () => setMobileOpen(false)

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

  // Reset the drill-down whenever the menu closes.
  useEffect(() => {
    if (!mobileOpen) setMobileSub(null)
  }, [mobileOpen])

  // Close the expanding mobile menu on Escape or an outside click/tap.
  useEffect(() => {
    if (!mobileOpen) return
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMobileOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (mobileSub) setMobileSub(null)
        else setMobileOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen, mobileSub])

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
              <NavDropdown label="Offices" items={officesItems} />
              {links.map(({ label, to }) => (
                <Link key={label} className="navbar__link" to={to} viewTransition>
                  {label}
                </Link>
              ))}
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
            <div className={`navbar__mobile-panels${mobileSub ? ' is-sub' : ''}`}>
              {/* Root level */}
              <nav className="navbar__mobile-links">
                {mobileNav.map((item) =>
                  item.children ? (
                    <button
                      key={item.label}
                      type="button"
                      className="navbar__mobile-link navbar__mobile-link--parent"
                      onClick={() => setMobileSub(item)}
                    >
                      <span>{item.label}</span>
                      <ChevronRight />
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      className="navbar__mobile-link"
                      to={item.to}
                      onClick={closeMobile}
                      viewTransition
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </nav>

              {/* Sub-panel — slides in from the right */}
              <nav className="navbar__mobile-sub" aria-hidden={!mobileSub}>
                <button
                  type="button"
                  className="navbar__mobile-back"
                  onClick={() => setMobileSub(null)}
                >
                  <ChevronLeft />
                  <span>{mobileSub?.label ?? 'Back'}</span>
                </button>
                <div className="navbar__mobile-sub-links">
                  {(mobileSub?.children ?? []).map((child) => (
                    <Link
                      key={child.label}
                      className="navbar__mobile-link"
                      to={child.to}
                      onClick={closeMobile}
                      viewTransition
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>

            <div className="navbar__mobile-footer">
              <Link
                className="btn btn--primary navbar__mobile-cta"
                to="/book-a-visit"
                onClick={closeMobile}
                viewTransition
              >
                <span>Book a visit</span>
                <span aria-hidden="true">→</span>
              </Link>
              <p className="navbar__mobile-email">office@extind.ro</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
