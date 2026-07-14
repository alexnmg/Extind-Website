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
 * At the top of the page the mark is the standard collapsed logo. Once the
 * user starts scrolling the X opens over OPEN_DISTANCE, and the brand's own
 * vector shape becomes the progress indicator: it appears in the gap and
 * grows rightward — rigid end caps, no track, no fill — reaching its full
 * expanded-logo width exactly at the end of the page. Scrolling back to the
 * top collapses everything into the standard logo again.
 */

const LOGO_H = 24 // px — matches .logo height in CSS

// Scroll distance over which the X opens up
const OPEN_DISTANCE = 320

const easeOut = (t) => 1 - Math.pow(1 - t, 3)
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
  const [state, setState] = useState({ open: 0, progress: 0 })

  useEffect(() => {
    // Scroll events are already frame-coalesced by the browser, so a direct
    // (passive) handler is enough — no extra rAF throttling needed.
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setState({
        open: easeOut(clamp01(y / OPEN_DISTANCE)),
        progress: max > 0 ? clamp01(y / max) : 0,
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const { open, progress } = state
  const gap = SHIFT * (1 - open)
  const contentW = VB_W - gap

  // The shape itself is the progress bar: its right edge travels with page
  // progress, landing on the expanded logo's exact geometry at the bottom.
  const xR = BAR_XL + (BAR_XR_MAX - BAR_XL) * progress
  // Only fades in once the X has parted far enough to clear both caps
  const shapeOpacity = clamp01((open - 0.25) / 0.35)

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
