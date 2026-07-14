import { useEffect, useState } from 'react'
import {
  IMAGES,
  VB_W,
  VB_H,
  BAR_XL,
  BAR_XR_MAX,
  CAP,
  barPath,
  M_XLEFT,
  M_E,
  M_LETTER,
  M_N,
  X_LEFT,
  X_RIGHT,
  LETTER_E,
  LETTER_T,
  LETTER_I,
  LETTER_D,
  LETTER_N,
} from './logoGeometry'

/* Static hero variant of the EXTIND wordmark: the shape sits at a much wider
 * expansion than the animated navbar logo and never moves — only the photos
 * inside it crossfade. Same geometry module, same rigid end caps. */

// Extra viewBox units beyond the standard expanded logo
const EXTRA = 700
const W = VB_W + EXTRA
const CYCLE = 5000

function Chain({ children }) {
  return (
    <g transform="matrix(1,0,0,1,-11678.570484,-2454.435015)">
      <g transform="matrix(1,0,0,1,10807.022134,0)">
        <g transform="matrix(0.741053,0,0,3.896194,374.59915,-1289.85389)">{children}</g>
      </g>
    </g>
  )
}

export default function LogoHero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setIdx((i) => (i + 1) % IMAGES.length), CYCLE)
    return () => clearInterval(timer)
  }, [])

  const xR = BAR_XR_MAX + EXTRA

  return (
    <svg
      className="logo-hero"
      viewBox={`0 0 ${W} ${VB_H}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      role="img"
      aria-label="Extind"
      style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
    >
      <defs>
        <clipPath id="extind-hero-clip">
          <path d={barPath(xR)} />
        </clipPath>
      </defs>

      {/* E and the left half of the X */}
      <Chain>
        <g transform={M_XLEFT}>
          <path d={X_LEFT} />
        </g>
        <g transform={M_E}>
          <path d={LETTER_E} />
        </g>
      </Chain>

      {/* All photos stay mounted inside the shape and crossfade */}
      <g clipPath="url(#extind-hero-clip)">
        {IMAGES.map((src, i) => (
          <image
            key={src}
            className={`logo-hero__img${i === idx ? ' logo-hero__img--active' : ''}`}
            href={src}
            x={BAR_XL - CAP}
            y={0}
            width={xR + CAP - (BAR_XL - CAP)}
            height={VB_H}
            preserveAspectRatio="xMidYMid slice"
          />
        ))}
      </g>

      {/* Right half of the X + TIND, shifted out by the wider shape */}
      <g transform={`translate(${EXTRA},0)`}>
        <Chain>
          <g transform={M_LETTER}>
            <path d={X_RIGHT} />
          </g>
          <g transform={M_LETTER}>
            <path d={LETTER_T} />
          </g>
          <g transform={M_LETTER}>
            <path d={LETTER_I} />
          </g>
          <g transform={M_LETTER}>
            <path d={LETTER_D} />
          </g>
          <g transform={M_N}>
            <path d={LETTER_N} />
          </g>
        </Chain>
      </g>
    </svg>
  )
}
