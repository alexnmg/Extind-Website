import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { useLang } from '../lib/i18n'

/* All navbar copy, per language. Product names (Executive Day Office, Vista
 * Lounge, Extind Magazine, Coworking) stay untranslated by design. */
const T = {
  en: {
    aboutLabel: 'About us',
    officesLabel: 'Offices',
    communityLabel: 'Community & Events',
    about: [
      { label: 'About Extind', to: '/about' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Contact', to: '/contact' },
    ],
    offices: [
      { label: 'Private offices', to: '/private-offices' },
      { label: 'Executive Day Office', to: '/executive-day-office' },
    ],
    community: [
      { label: 'Vista Lounge', to: '/vista-lounge' },
      { label: 'Events', to: '/events' },
      { label: 'Extind Magazine', to: '/magazine' },
    ],
    links: [
      { label: 'Coworking', to: '/coworking' },
      { label: 'Conference Rooms', to: '/conference-rooms' },
    ],
    cta: 'Book a visit',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    home: 'Extind home',
    switchTo: 'Comută în română',
  },
  ro: {
    aboutLabel: 'Despre noi',
    officesLabel: 'Birouri',
    communityLabel: 'Comunitate & Evenimente',
    about: [
      { label: 'Despre Extind', to: '/about' },
      { label: 'Întrebări frecvente', to: '/faq' },
      { label: 'Contact', to: '/contact' },
    ],
    offices: [
      { label: 'Birouri private', to: '/private-offices' },
      { label: 'Executive Day Office', to: '/executive-day-office' },
    ],
    community: [
      { label: 'Vista Lounge', to: '/vista-lounge' },
      { label: 'Evenimente', to: '/events' },
      { label: 'Extind Magazine', to: '/magazine' },
    ],
    links: [
      { label: 'Coworking', to: '/coworking' },
      { label: 'Săli de conferințe', to: '/conference-rooms' },
    ],
    cta: 'Programează o vizită',
    openMenu: 'Deschide meniul',
    closeMenu: 'Închide meniul',
    home: 'Pagina principală Extind',
    switchTo: 'Switch to English',
  },
}

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

/* Language toggle. Shows the language you'd get by clicking — so on the
 * Romanian site the button reads "EN". Label and tooltip agree, and both are
 * written in the language you'd land in.
 * Rendered twice: in the bar (hidden on phones) and inside the mobile menu. */
function LangSwitch({ variant }) {
  const { lang, setLang } = useLang()
  const other = lang === 'ro' ? 'en' : 'ro'
  const tip = T[lang].switchTo
  return (
    <button
      type="button"
      className={`lang-switch lang-switch--${variant}`}
      onClick={() => setLang(other)}
      aria-label={tip}
      data-tip={tip}
    >
      {other.toUpperCase()}
    </button>
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
        {items.map(({ label: itemLabel, to }) => (
          <Link
            key={to}
            className="navbar__link"
            to={to}
            onClick={() => setOpen(false)}
            viewTransition
          >
            {itemLabel}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Navbar() {
  const { lang } = useLang()
  const t = T[lang]
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  // Which parent's sub-panel is open in the mobile drill-down (null = root).
  const [mobileSub, setMobileSub] = useState(null)
  const navRef = useRef(null)

  const closeMobile = () => setMobileOpen(false)

  // The mobile drill-down: parents open a sub-panel, leaves navigate.
  const mobileNav = [
    { label: t.aboutLabel, children: t.about },
    { label: t.officesLabel, children: t.offices },
    ...t.links,
    { label: t.communityLabel, children: t.community },
  ]

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
          <Link to="/" aria-label={t.home} viewTransition>
            <Logo />
          </Link>
          {/* Grouped right-hand side: pinned to the right edge so the logo's
              expand animation never shifts the menu */}
          <div className="navbar__right">
            <nav className="navbar__links">
              <NavDropdown label={t.aboutLabel} items={t.about} />
              <NavDropdown label={t.officesLabel} items={t.offices} />
              {t.links.map(({ label, to }) => (
                <Link key={to} className="navbar__link" to={to} viewTransition>
                  {label}
                </Link>
              ))}
              <NavDropdown label={t.communityLabel} items={t.community} />
            </nav>
            <LangSwitch variant="bar" />
            <Link className="btn btn--primary navbar__cta" to="/book-a-visit" viewTransition>
              {t.cta}
            </Link>
            <button
              type="button"
              className="navbar__burger"
              aria-label={mobileOpen ? t.closeMenu : t.openMenu}
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
                      key={item.to}
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
                  <span>{mobileSub?.label ?? ''}</span>
                </button>
                <div className="navbar__mobile-sub-links">
                  {(mobileSub?.children ?? []).map((child) => (
                    <Link
                      key={child.to}
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
              <LangSwitch variant="menu" />
              <Link
                className="btn btn--primary navbar__mobile-cta"
                to="/book-a-visit"
                onClick={closeMobile}
                viewTransition
              >
                <span>{t.cta}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <p className="navbar__mobile-email">hello@extind.ro</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
