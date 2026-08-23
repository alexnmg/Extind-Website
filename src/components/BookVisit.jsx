import { useEffect, useRef, useState } from 'react'
import Cal from '@calcom/embed-react'
import { CAL_LINK, initCal } from '../lib/cal'
import { useLang } from '../lib/i18n'

const NS = 'extind-visit'

const T = {
  en: {
    title: 'Book a visit',
    subtitle: 'Visit Extind',
    description:
      'Schedule a guided visit to explore the spaces with our host. Pick a date and time that suits you — coffee is on us!',
    ctaLabel: 'Book a visit',
  },
  ro: {
    title: 'Programează o vizită',
    subtitle: 'Vizitează Extind',
    description:
      'Programează o vizită ghidată pentru a explora spațiile alături de gazda noastră. Alege data și ora care ți se potrivesc — cafeaua e din partea noastră!',
    ctaLabel: 'Programează o vizită',
  },
}

/* Booking section, backed by Cal.com.
 *
 * mode="inline" (default) — the booker embedded beside the branded card.
 *   Cal's script and iframe are only loaded once the section comes near the
 *   viewport, so pages that carry this section further down (the homepage,
 *   Private offices, the FAQ) don't pay for a third-party iframe on load.
 * mode="cta" — just the card, with a button that opens Cal in an overlay.
 */
export default function BookVisit({ title, subtitle, description, ctaLabel, mode = 'inline' }) {
  const { lang } = useLang()
  const t = T[lang]
  title = title ?? t.title
  subtitle = subtitle ?? t.subtitle
  description = description ?? t.description
  ctaLabel = ctaLabel ?? t.ctaLabel
  const inline = mode === 'inline'

  const embedRef = useRef(null)
  // Inline waits until it's scrolled near; the popup has to be armed upfront
  // or the first click does nothing.
  const [near, setNear] = useState(!inline)

  useEffect(() => {
    if (!inline) return
    const el = embedRef.current
    if (!el) {
      setNear(true)
      return
    }
    /* A scroll-position check rather than IntersectionObserver: IO callbacks
     * are paused in hidden/background tabs, and a booker that silently never
     * mounts is a far worse failure than loading it a little early. The
     * immediate call also covers the section already being in view on load. */
    let done = false
    const check = () => {
      if (done) return
      const r = el.getBoundingClientRect()
      const lead = 400 // start loading before it reaches the screen
      if (r.top < window.innerHeight + lead && r.bottom > -lead) {
        done = true
        setNear(true)
        window.removeEventListener('scroll', check)
        window.removeEventListener('resize', check)
      }
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [inline])

  // Themes the embed. On CTA pages this also primes the overlay so the popup
  // opens already branded.
  useEffect(() => {
    if (near) initCal(NS)
  }, [near])

  return (
    <section className={`book-visit${inline ? '' : ' book-visit--cta'}`} data-reveal>
      <div className="vista__card book-visit__card">
        <p className="vista__card-label">{subtitle}</p>
        <h3 className="vista__card-title">{title}</h3>
        <p className="vista__card-desc">{description}</p>
        {!inline && (
          <button
            type="button"
            className="btn btn--outline book-visit__trigger"
            data-cal-namespace={NS}
            data-cal-link={CAL_LINK}
            data-cal-config='{"layout":"month_view"}'
          >
            {ctaLabel}
          </button>
        )}
      </div>

      {inline && (
        <div className="book-visit__form book-visit__embed" ref={embedRef}>
          {near ? (
            <Cal
              namespace={NS}
              calLink={CAL_LINK}
              className="cal-embed"
              config={{ layout: 'month_view' }}
            />
          ) : (
            /* Reserves the booker's height so nothing shifts when it mounts */
            <div className="cal-embed" aria-hidden="true" />
          )}
        </div>
      )}
    </section>
  )
}
