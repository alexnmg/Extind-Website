import { useEffect, useState } from 'react'
import {
  VB_W,
  VB_H,
  SHIFT,
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

/* EXTIND wordmark with a scroll progress bar (navbar).
 *
 * At the top of the page the mark is the standard collapsed logo. As the
 * user starts scrolling, the X opens over the first ~160px of scroll and a
 * thin progress bar appears in the gap where the image mask used to sit.
 * The bar's fill tracks overall page progress — full at the end of scroll —
 * and everything collapses back when scrolling returns to the top.
 */

const LOGO_H = 24 // px — matches .logo height in CSS

// Scroll distance over which the mark opens up
const OPEN_DISTANCE = 160

// Track geometry (viewBox units). The opening between the X halves spans
// from ~121 (left X ink edge) to 130.9 + SHIFT·e (right X ink edge).
const TRACK_L = 133
const X_RIGHT_START = 130.9
const TRACK_PAD = 12
const BAR_H = 9 // ≈2px at the rendered 24px height

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
  const [state, setState] = useState({ open: 0, fill: 0 })

  useEffect(() => {
    // Scroll events are already frame-coalesced by the browser, so a direct
    // (passive) handler is enough — no extra rAF throttling needed.
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setState({
        open: easeOut(clamp01(y / OPEN_DISTANCE)),
        fill: max > 0 ? clamp01(y / max) : 0,
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

  const { open, fill } = state
  const gap = SHIFT * (1 - open)
  const contentW = VB_W - gap

  // Progress track sits in the opening; fades in as the X separates
  const trackR = X_RIGHT_START + SHIFT * open - TRACK_PAD
  const trackW = Math.max(0, trackR - TRACK_L)
  const barOpacity = clamp01((open - 0.25) / 0.35)
  const trackY = VB_H / 2 - BAR_H / 2

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

        {/* Scroll progress bar in the opening between the X halves */}
        {barOpacity > 0 && trackW > 0 && (
          <g opacity={barOpacity}>
            <rect
              x={TRACK_L}
              y={trackY}
              width={trackW}
              height={BAR_H}
              rx={BAR_H / 2}
              fill="currentColor"
              opacity="0.15"
            />
            {fill > 0 && (
              <rect
                x={TRACK_L}
                y={trackY}
                width={Math.max(BAR_H, trackW * fill)}
                height={BAR_H}
                rx={BAR_H / 2}
                fill="var(--accent)"
              />
            )}
          </g>
        )}

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
