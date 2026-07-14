import { useEffect, useRef, useState } from 'react'
import {
  IMAGES,
  VB_W,
  VB_H,
  BAR_XL,
  BAR_XR_MAX,
  CAP,
  SHIFT,
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

/* Animated EXTIND wordmark (navbar).
 *
 * The mark is drawn in the "expanded" geometry (viewBox 885×98) where the two
 * halves of the X are pushed apart by a shape. Collapsing that gap by SHIFT
 * reproduces the standard logo exactly, so a single SVG covers both states:
 *
 *   progress 0 → standard logo (shape hidden, X closed)
 *   progress 1 → expanded logo (shape at full width)
 *
 * The shape's end caps are rigid: only its right edge travels, in lockstep
 * with the trailing letters, so the caps never stretch.
 */

const LOGO_H = 24 // px — matches .logo height in CSS

// Timing
const CYCLE = 7000
const EXPAND = 700
const HOLD = 2200
const COLLAPSE = 600

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const clamp01 = (v) => Math.min(1, Math.max(0, v))

// The three outer transforms every letter sits inside (straight from the file)
function Chain({ children }) {
  return (
    <g transform="matrix(1,0,0,1,-11678.570484,-2454.435015)">
      <g transform="matrix(1,0,0,1,10807.022134,0)">
        <g transform="matrix(0.741053,0,0,3.896194,374.59915,-1289.85389)">{children}</g>
      </g>
    </g>
  )
}

export default function Logo() {
  const [progress, setProgress] = useState(0)
  const [imgIdx, setImgIdx] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let cancelled = false

    const play = () => {
      const start = performance.now()
      const step = (now) => {
        if (cancelled) return
        const t = now - start
        if (t >= EXPAND + HOLD + COLLAPSE) {
          setProgress(0)
          return
        }
        let p
        if (t < EXPAND) p = easeInOut(t / EXPAND)
        else if (t < EXPAND + HOLD) p = 1
        else p = 1 - easeInOut((t - EXPAND - HOLD) / COLLAPSE)
        setProgress(p)
        rafRef.current = requestAnimationFrame(step)
      }
      rafRef.current = requestAnimationFrame(step)
    }

    const timer = setInterval(() => {
      setImgIdx((i) => (i + 1) % IMAGES.length)
      play()
    }, CYCLE)

    return () => {
      cancelled = true
      clearInterval(timer)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const gap = SHIFT * (1 - progress)
  const xR = Math.max(BAR_XL, BAR_XR_MAX - gap)
  // Shape only fits once the X has opened far enough for both caps
  const barOpacity = clamp01((progress - 0.14) / 0.14)
  const contentW = VB_W - gap

  return (
    <span className="logo" style={{ width: `${(contentW / VB_H) * LOGO_H}px` }}>
      <svg
        className="logo__svg"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        role="img"
        aria-label="Extind"
        style={{
          height: `${LOGO_H}px`,
          width: `${(VB_W / VB_H) * LOGO_H}px`,
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        }}
      >
        <defs>
          <clipPath id="extind-bar-clip">
            <path d={barPath(xR)} />
          </clipPath>
        </defs>

        {/* E and the left half of the X — always fixed */}
        <Chain>
          <g transform={M_XLEFT}>
            <path d={X_LEFT} />
          </g>
          <g transform={M_E}>
            <path d={LETTER_E} />
          </g>
        </Chain>

        {/* The shape — a window onto the current image */}
        {barOpacity > 0 && (
          <g clipPath="url(#extind-bar-clip)" opacity={barOpacity}>
            <image
              href={IMAGES[imgIdx]}
              x={BAR_XL - CAP}
              y={0}
              width={BAR_XR_MAX + CAP - (BAR_XL - CAP)}
              height={VB_H}
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        )}

        {/* Right half of the X + TIND — travel with the shape */}
        <g transform={`translate(${-gap},0)`}>
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
    </span>
  )
}
