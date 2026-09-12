import { useState } from 'react'
import { useLang } from '../lib/i18n'
import Photo from './Photo'

const ARIA = {
  en: { prev: 'Previous image', next: 'Next image' },
  ro: { prev: 'Imaginea anterioară', next: 'Imaginea următoare' },
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

export default function ImageCardSlider({ slides, className }) {
  const { lang } = useLang()
  const aria = ARIA[lang]
  const [index, setIndex] = useState(0)

  return (
    <div className={className}>
      <div className="slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {/* Each slide clips its own image so the Ken Burns zoom can't bleed
            into the neighbouring slide inside the track */}
        {slides.map(({ src, alt }, i) => (
          <div key={src} className="slider-slide">
            {/* The slider only ever runs as a hero (Hero.jsx is its one caller),
                so the first slide is the largest thing above the fold on every
                page — the LCP element. Without the hints the browser finds it in
                the markup readily enough and then queues it behind the
                stylesheet, the bundle and eight fonts.

                The other slides sit off to the side INSIDE the viewport rect, so
                loading="lazy" never defers them — only a low priority hint keeps
                them from racing the one slide anybody can see. */}
            <Photo
              className="slider-slide__img"
              name={src}
              alt={alt}
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'low'}
            />
          </div>
        ))}
      </div>
      <div className="slider-bottom-row">
        <span className="caption-pill">{slides[index].caption}</span>
        <div className="slider-arrows">
          <button
            type="button"
            className="slider-arrow"
            aria-label={aria.prev}
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            className="slider-arrow"
            aria-label={aria.next}
            disabled={index === slides.length - 1}
            onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </div>
  )
}
