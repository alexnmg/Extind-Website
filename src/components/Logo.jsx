import { useEffect, useState } from 'react'
import {
  VB_W,
  VB_H,
  BAR_XL,
  BAR_XR_MAX,
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

/* EXTIND wordmark as a scroll progress indicator (navbar).
 *
 * Page progress scrubs a single motion: the X's right half and TIND travel
 * outward while the brand's own vector shape grows to fill the gap they
 * leave — rigid end caps, no track, no fill. At the top it's the standard
 * collapsed logo; at the end of the page it's exactly the expanded logo.
 *
 * The shape can't be narrower than its two caps (~62 units), so it stays
 * hidden until the letters have parted far enough to clear it.
 */

const LOGO_H = 24 // px — matches .logo height in CSS

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

  useEffect(() => {
    // Scroll events are already frame-coalesced by the browser, so a direct
    // (passive) handler is enough — no extra rAF throttling needed.
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? clamp01(window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // One motion, linear in scroll: letters travel and the shape's right edge
  // rides just ahead of them, landing on the expanded logo at the bottom.
  const gap = SHIFT * (1 - progress)
  const contentW = VB_W - gap
  const xR = Math.max(BAR_XL, BAR_XR_MAX - gap)
  const shapeOpacity = clamp01((progress - 0.14) / 0.14)

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
        {/* E and the left half of the X — always fixed */}
        <Chain>
          <g transform={M_XLEFT}>
            <path d={X_LEFT} />
          </g>
          <g transform={M_E}>
            <path d={LETTER_E} />
          </g>
        </Chain>

        {/* The brand shape, growing with scroll progress */}
        {shapeOpacity > 0 && <path d={barPath(xR)} fill="var(--accent)" opacity={shapeOpacity} />}

        {/* Right half of the X + TIND — travel as the mark opens */}
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
