import { useState } from 'react'
import pillarsImg from '../assets/figma/pillars.png'
import heroImg from '../assets/figma/hero.png'
import vistaImg from '../assets/figma/vista.png'

const defaultSlides = [
  {
    image: pillarsImg,
    caption: 'Meeting & Focus Rooms',
    label: 'FOCUS',
    title: 'Private offices',
    description:
      'Designed for businesses that need more than an office. Fully serviced private workspaces that support focus, team collaboration and a professional environment for welcoming clients as your business grows.',
    ctaLabel: 'Private offices overview',
  },
  {
    image: heroImg,
    caption: 'Coworking · Palas Campus',
    label: 'FLEX',
    title: 'Coworking',
    description:
      'Flexible desks in a thoughtfully designed shared space, surrounded by a community of people who care about their work.',
    ctaLabel: 'Coworking overview',
  },
  {
    image: vistaImg,
    caption: 'Panoramic Lounge · 7th floor',
    label: 'CONNECT',
    title: 'Vista Lounge',
    description:
      'A panoramic workspace above the city — the backdrop for focus, conversation, events, and professional relationships.',
    ctaLabel: 'Vista Lounge overview',
  },
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

export default function ServicesSlider({ slides = defaultSlides }) {
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  return (
    <section className="services">
      <img className="services__img" src={slide.image} alt="" />
      <span className="caption-pill services__caption">{slide.caption}</span>
      <div className="services__card">
        <p className="services__label">{slide.label}</p>
        <h3 className="services__title">{slide.title}</h3>
        <p className="services__desc">{slide.description}</p>
        <button type="button" className="text-button text-button--dark">
          <span>{slide.ctaLabel}</span>
          <span className="text-button__arrow" aria-hidden="true" />
        </button>
        <div className="slider-arrows services__arrows">
          <button
            type="button"
            className="slider-arrow"
            aria-label="Previous service"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            className="slider-arrow"
            aria-label="Next service"
            disabled={index === slides.length - 1}
            onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  )
}
