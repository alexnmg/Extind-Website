import { useState } from 'react'
import SectionHeader from './SectionHeader'
import vistaImg from '../assets/photos/lounge.jpg'
import heroImg from '../assets/photos/coworking.jpg'
import pillarsImg from '../assets/photos/meeting-room.jpg'

const defaultVistaSlides = [
  { src: vistaImg, caption: 'Panoramic Lounge · 6th floor', alt: 'Panoramic view over the Palace of Culture from Vista Lounge' },
  { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Extind coworking space at Palas Campus' },
  { src: pillarsImg, caption: 'Meeting & Focus Rooms', alt: 'Meeting room at Extind' },
]

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
  eyebrow = 'Vista Lounge',
  title = 'Community & Events',
  cardLabel = 'Vista Lounge',
  cardTitle = 'A panoramic event space above the city',
  description = 'More than a lounge, Vista is where the Extind community comes together. Host informal meetings, connect with other professionals or attend curated business events—all overlooking the Palace of Culture.',
  ctaLabel = 'Discover Vista Lounge',
  slides = defaultVistaSlides,
}) {
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
          <button type="button" className="text-button">
            <span>{ctaLabel}</span>
            <span className="text-button__arrow" aria-hidden="true" />
          </button>
        </div>
        <div className="slider-arrows vista__arrows">
          <button
            type="button"
            className="slider-arrow"
            aria-label="Previous image"
            disabled={index === 0}
            onClick={() => goTo(Math.max(0, index - 1))}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            className="slider-arrow"
            aria-label="Next image"
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
