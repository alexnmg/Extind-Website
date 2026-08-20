import { useState } from 'react'
import { Link } from 'react-router-dom'
import pillarsImg from '../assets/photos/private-office.jpg'
import execImg from '../assets/photos/private-office-2.jpg'
import heroImg from '../assets/photos/coworking.jpg'
import vistaImg from '../assets/photos/lounge.jpg'

const defaultSlides = [
  {
    image: pillarsImg,
    caption: 'Private offices · Palas Campus',
    label: 'FOCUS',
    title: 'Private offices',
    description:
      'Designed for businesses that need more than an office. Fully serviced private workspaces that support focus, team collaboration and a professional environment for welcoming clients as your business grows.',
    ctaLabel: 'Private offices overview',
    to: '/private-offices',
    variant: 'light',
  },
  {
    image: execImg,
    caption: 'Executive Day Office · Palas Campus',
    label: 'HOST',
    title: 'Executive Day Office',
    description:
      'A premium, representative office prepared for corporate visits — one to three days, with meeting-room access, hospitality and a setup matched to your schedule.',
    ctaLabel: 'Executive Day Office overview',
    to: '/executive-day-office',
    variant: 'dark',
  },
  {
    image: heroImg,
    caption: 'Coworking · Palas Campus',
    label: 'FLEX',
    title: 'Coworking',
    description:
      'Flexible desks in a thoughtfully designed shared space, surrounded by a community of people who care about their work.',
    ctaLabel: 'Coworking overview',
    to: '/coworking',
    variant: 'cream',
  },
  {
    image: vistaImg,
    caption: 'Panoramic Lounge · 6th floor',
    label: 'CONNECT',
    title: 'Vista Lounge',
    description:
      'A panoramic workspace above the city — the backdrop for focus, conversation, events, and professional relationships.',
    ctaLabel: 'Vista Lounge overview',
    to: '/vista-lounge',
    variant: 'dark',
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
  const goTo = setIndex
  const slide = slides[index]
  const variant = slide.variant || 'light'

  return (
    <section className="services" data-reveal>
      {/* All images stay mounted and crossfade via opacity */}
      {slides.map((s, i) => (
        <img
          key={s.image + i}
          className={`services__img${i === index ? ' services__img--active' : ''}`}
          src={s.image}
          alt=""
        />
      ))}
      <span className="caption-pill services__caption">{slide.caption}</span>
      <div className={`services__card services__card--${variant}`}>
        {/* key remount replays the fade/slide-in animation on slide change */}
        <div key={index} className="services__card-content">
          {/* Slides carry either an icon or a text label, never both */}
          {slide.icon ? (
            <span className="services__icon" aria-hidden="true">
              {slide.icon}
            </span>
          ) : (
            <p className="services__label">{slide.label}</p>
          )}
          <h3 className="services__title">{slide.title}</h3>
          <p className="services__desc">{slide.description}</p>
          {/* Slides without a ctaLabel (e.g. the Private Offices benefits
              slider) simply render no button. */}
          {slide.ctaLabel &&
            (slide.to ? (
              <Link
                className={`text-button${variant === 'dark' ? '' : ' text-button--dark'}`}
                to={slide.to}
                viewTransition
              >
                <span>{slide.ctaLabel}</span>
                <span className="text-button__arrow" aria-hidden="true" />
              </Link>
            ) : (
              <button
                type="button"
                className={`text-button${variant === 'dark' ? '' : ' text-button--dark'}`}
              >
                <span>{slide.ctaLabel}</span>
                <span className="text-button__arrow" aria-hidden="true" />
              </button>
            ))}
        </div>
        <div className="slider-arrows services__arrows">
          <button
            type="button"
            className="slider-arrow"
            aria-label="Previous service"
            disabled={index === 0}
            onClick={() => goTo(Math.max(0, index - 1))}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            className="slider-arrow"
            aria-label="Next service"
            disabled={index === slides.length - 1}
            onClick={() => goTo(Math.min(slides.length - 1, index + 1))}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  )
}
