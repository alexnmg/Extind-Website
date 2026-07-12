import { useState } from 'react'

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
  const [index, setIndex] = useState(0)

  return (
    <div className={className}>
      <div className="slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map(({ src, alt }) => (
          <img key={src} className="slider-slide" src={src} alt={alt} />
        ))}
      </div>
      <div className="slider-bottom-row">
        <span className="caption-pill">{slides[index].caption}</span>
        <div className="slider-arrows">
          <button
            type="button"
            className="slider-arrow"
            aria-label="Previous image"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            className="slider-arrow"
            aria-label="Next image"
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
