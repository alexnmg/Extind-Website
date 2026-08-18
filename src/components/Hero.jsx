import { Fragment, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ImageCardSlider from './ImageCardSlider'
import heroImg from '../assets/photos/coworking.jpg'
import pillarsImg from '../assets/photos/meeting-room.jpg'
import vistaImg from '../assets/photos/lounge.jpg'

const defaultHeroSlides = [
  { src: vistaImg, caption: 'Vista Lounge Panoramic View', alt: 'Panoramic view from Vista Lounge' },
  { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Extind coworking space at Palas Campus' },
  { src: pillarsImg, caption: 'Meeting & Focus Rooms', alt: 'Meeting room at Extind' },
]

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

export default function Hero({
  eyebrow = null,
  title = 'Thoughtfully designed environments for business growth.',
  lede = 'Private offices and business community for companies and professionals looking for growth, collaboration and friction-free workdays.',
  primaryLabel = 'Book a visit',
  primaryTo = '/book-a-visit',
  secondaryLabel = 'Discover our community →',
  slides = defaultHeroSlides,
  pills = null,
  onSecondaryClick,
}) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  /* Entrance choreography: the title rises line-by-line from behind a mask,
   * then the lede, pills and buttons fade up in sequence (see [data-animate]
   * in App.css). Words are grouped into lines by their rendered offsetTop so
   * every word in a line shares one delay — a layout effect, so grouping and
   * the animate flag land before first paint (no flash of static content).
   * The flag is a DOM attribute rather than state: no second render, and
   * reduced motion simply never sets it, leaving the hero static. */
  useLayoutEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const words = titleRef.current?.querySelectorAll('.hero__word') ?? []
    let lastTop = null
    let line = -1
    words.forEach((w) => {
      if (w.offsetTop !== lastTop) {
        line += 1
        lastTop = w.offsetTop
      }
      w.style.setProperty('--line', line)
    })
    sectionRef.current?.setAttribute('data-animate', '')
  }, [title])

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero__content">
        {eyebrow && (
          <p className="hero__eyebrow">
            <PinIcon />
            <span>{eyebrow}</span>
          </p>
        )}
        <h1 className="hero__title" ref={titleRef}>
          {title.split(' ').map((word, i) => (
            <Fragment key={i}>
              {i > 0 && ' '}
              <span className="hero__word">
                <span className="hero__word-inner">{word}</span>
              </span>
            </Fragment>
          ))}
        </h1>
        <p className="hero__lede">{lede}</p>
        <div className="hero__buttons">
          <Link className="btn btn--primary" to={primaryTo} viewTransition>
            {primaryLabel}
          </Link>
          <button type="button" className="btn btn--ghost" onClick={onSecondaryClick}>
            {secondaryLabel}
          </button>
        </div>
      </div>
      <ImageCardSlider className="hero__media" slides={slides} />
      {pills?.length > 0 && (
        <ul className="hero__pills">
          {pills.map(({ icon, label }) => (
            <li key={label} className="hero-pill">
              <span className="hero-pill__icon">{icon}</span>
              <span className="hero-pill__label">{label}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
