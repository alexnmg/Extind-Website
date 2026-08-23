import { useEffect } from 'react'
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
 * mode="cta" (default) — the branded card with a button that opens Cal in an
 *   overlay. Nothing from Cal loads until the button is clicked, so the
 *   marketing pages stay light.
 * mode="inline" — the full booker embedded beside the card, for /book-a-visit.
 */
export default function BookVisit({ title, subtitle, description, ctaLabel, mode = 'cta' }) {
  const { lang } = useLang()
  const t = T[lang]
  title = title ?? t.title
  subtitle = subtitle ?? t.subtitle
  description = description ?? t.description
  ctaLabel = ctaLabel ?? t.ctaLabel
  const inline = mode === 'inline'

  // Themes the embed. On the CTA pages this also primes the overlay so the
  // popup opens already branded.
  useEffect(() => {
    initCal(NS)
  }, [])

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
        <div className="book-visit__form book-visit__embed">
          <Cal
            namespace={NS}
            calLink={CAL_LINK}
            className="cal-embed"
            config={{ layout: 'month_view' }}
          />
        </div>
      )}
    </section>
  )
}
