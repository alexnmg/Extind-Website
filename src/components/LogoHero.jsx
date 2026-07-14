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

/* Extra viewBox units beyond the standard expanded logo. The mark renders at
 * the container's full width, so this width *is* the aspect ratio: a narrower
 * shape means fewer viewBox units across, and therefore a taller mark. Small
 * screens get a much narrower shape so the wordmark doesn't shrink to a hair.
 *
 * Negative values pull the shape in tighter than the expanded logo; the floor
 * is about -308, where the two end caps meet and the shape can go no narrower. */
const EXTRA_DESKTOP = 700
const EXTRA_TABLET = 150
// Mobile's shape is ~237 units wide — double the width -250 would give.
const EXTRA_MOBILE = -134

const CYCLE = 5000

const MOBILE_Q = '(max-width: 600px)'
const TABLET_Q = '(max-width: 1024px)'

const extraFor = () => {
  if (typeof window === 'undefined') return EXTRA_DESKTOP
  if (window.matchMedia(MOBILE_Q).matches) return EXTRA_MOBILE
  if (window.matchMedia(TABLET_Q).matches) return EXTRA_TABLET
  return EXTRA_DESKTOP
}

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
  const [extra, setExtra] = useState(extraFor)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setIdx((i) => (i + 1) % IMAGES.length), CYCLE)
    return () => clearInterval(timer)
  }, [])

  // Only breakpoint crossings can change the shape's width, so listen to the
  // queries themselves rather than every resize frame.
  useEffect(() => {
    const queries = [MOBILE_Q, TABLET_Q].map((q) => window.matchMedia(q))
    const update = () => setExtra(extraFor())
    update()
    queries.forEach((mq) => mq.addEventListener('change', update))
    return () => queries.forEach((mq) => mq.removeEventListener('change', update))
  }, [])

  const xR = BAR_XR_MAX + extra
  const W = VB_W + extra

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
      <g transform={`translate(${extra},0)`}>
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
