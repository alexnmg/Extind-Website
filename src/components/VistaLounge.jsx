import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import { useLang } from '../lib/i18n'
import vistaImg from '../assets/photos/lounge.jpg'
import lounge2Img from '../assets/photos/lounge-2.jpg'
import lounge3Img from '../assets/photos/lounge-3.jpg'

const T = {
  en: {
    eyebrow: 'Vista Lounge',
    title: 'Community & Events',
    cardLabel: 'Vista Lounge',
    cardTitle: 'A panoramic event space above the city',
    description:
      'More than a lounge, Vista is where the Extind community comes together. Host informal meetings, connect with other professionals or attend curated business events—all overlooking the Palace of Culture.',
    ctaLabel: 'Discover Vista Lounge',
    prev: 'Previous image',
    next: 'Next image',
    slides: [
      { src: vistaImg, caption: 'Panoramic Lounge · 6th floor', alt: 'Vista Lounge with panoramic city view' },
      { src: lounge2Img, caption: 'Room for events & gatherings', alt: 'Vista Lounge event and gathering space' },
      { src: lounge3Img, caption: 'Coffee point & social area', alt: 'Vista Lounge coffee point and social area' },
    ],
  },
  ro: {
    eyebrow: 'Vista Lounge',
    title: 'Comunitate & Evenimente',
    cardLabel: 'Vista Lounge',
    cardTitle: 'Un spațiu panoramic de evenimente deasupra orașului',
    description:
      'Mai mult decât un lounge, Vista este locul unde comunitatea Extind se întâlnește. Găzduiește întâlniri informale, cunoaște alți profesioniști sau participă la evenimente de business selecte — toate cu vedere spre Palatul Culturii.',
    ctaLabel: 'Descoperă Vista Lounge',
    prev: 'Imaginea anterioară',
    next: 'Imaginea următoare',
    slides: [
      { src: vistaImg, caption: 'Lounge panoramic · etajul 6', alt: 'Vista Lounge cu vedere panoramică asupra orașului' },
      { src: lounge2Img, caption: 'Spațiu pentru evenimente și întâlniri', alt: 'Spațiul de evenimente din Vista Lounge' },
      { src: lounge3Img, caption: 'Coffee point & zonă socială', alt: 'Coffee point-ul și zona socială din Vista Lounge' },
    ],
  },
}

function ArrowIcon({ direction }) {
  return (
    <svg viewBox="0 0 7.5 11.5" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M6.75 0.75L0.75 5.75L6.75 10.75' : 'M0.75 0.75L6.75 5.75L0.75 10.75'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function VistaLounge({
  eyebrow,
  title,
  cardLabel,
  cardTitle,
  description,
  ctaLabel,
  slides,
}) {
  const { lang } = useLang()
  const t = T[lang]
  eyebrow = eyebrow ?? t.eyebrow
  title = title ?? t.title
  cardLabel = cardLabel ?? t.cardLabel
  cardTitle = cardTitle ?? t.cardTitle
  description = description ?? t.description
  ctaLabel = ctaLabel ?? t.ctaLabel
  slides = slides ?? t.slides
  const [index, setIndex] = useState(0)
  const goTo = setIndex
  const slide = slides[index]

  const vistaEl = (
    <div className="vista" data-reveal>
        {/* All images stay mounted and crossfade via opacity */}
        {slides.map((s, i) => (
          <img
            key={s.src + i}
            className={`vista__img${i === index ? ' vista__img--active' : ''}`}
            src={s.src}
            alt={i === index ? s.alt : ''}
          />
        ))}
        <span className="caption-pill vista__caption">{slide.caption}</span>
        <div className="vista__panel">
          <p className="vista__card-label">{cardLabel}</p>
          <h3 className="vista__card-title">{cardTitle}</h3>
          <p className="vista__card-desc">{description}</p>
          <Link className="text-button" to="/vista-lounge" viewTransition>
            <span>{ctaLabel}</span>
            <span className="text-button__arrow" aria-hidden="true" />
          </Link>
        </div>
        <div className="slider-arrows vista__arrows">
          <button
            type="button"
            className="slider-arrow"
            aria-label={t.prev}
            disabled={index === 0}
            onClick={() => goTo(Math.max(0, index - 1))}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            className="slider-arrow"
            aria-label={t.next}
            disabled={index === slides.length - 1}
            onClick={() => goTo(Math.min(slides.length - 1, index + 1))}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
    </div>
  )

  return (
    <section className="section">
      <SectionHeader eyebrow={eyebrow} title={title} />
      {vistaEl}
    </section>
  )
}
