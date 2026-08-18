import { Link } from 'react-router-dom'
import { defaultSlides } from './ServicesSlider'

// Each service card links to its page.
const LINKS = {
  'Private offices': '/private-offices',
  Coworking: '/coworking',
  'Vista Lounge': '/vista-lounge',
}

/* The three homepage services as a scroll-stack: each card is sticky and the
 * next one scrolls up to rest on top of it, leaving a thin peek of the cards
 * beneath. Pure native scroll + position: sticky — no scroll hijacking. */
export default function ServicesStack({ slides = defaultSlides }) {
  return (
    <section className="svc-stack">
      {slides.map((s, i) => {
        const to = LINKS[s.title]
        return (
          <article
            key={s.title}
            className={`svc-stack__card svc-stack__card--${s.variant || 'light'}`}
            style={{ '--i': i }}
          >
            <img className="svc-stack__img" src={s.image} alt="" loading="lazy" />
            <span className="caption-pill svc-stack__caption">{s.caption}</span>
            <div className="svc-stack__panel">
              {s.icon ? (
                <span className="svc-stack__icon" aria-hidden="true">
                  {s.icon}
                </span>
              ) : (
                <p className="svc-stack__label">{s.label}</p>
              )}
              <h3 className="svc-stack__title">{s.title}</h3>
              <p className="svc-stack__desc">{s.description}</p>
              {s.ctaLabel && to && (
                <Link
                  className={`text-button${s.variant === 'dark' ? '' : ' text-button--dark'} svc-stack__cta`}
                  to={to}
                  viewTransition
                >
                  <span>{s.ctaLabel}</span>
                  <span className="text-button__arrow" aria-hidden="true" />
                </Link>
              )}
            </div>
          </article>
        )
      })}
    </section>
  )
}
