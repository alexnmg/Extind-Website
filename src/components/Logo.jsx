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

/* EXTIND wordmark as a scroll indicator (navbar).
 *
 * Page progress scrubs a single motion: the X's right half and TIND travel
 * outward while a horizontal line elongates to fill the gap they leave. At
 * the top it's the standard collapsed logo; at the end of the page the
 * letters sit at the expanded logo's exact geometry.
 *
 * Unlike the brand shape (which has rigid caps and a ~62-unit floor), a
 * line can start at zero width — so it tracks the letters from the very
 * first pixel of scroll with no empty gap.
 *
 * Desktop only: below 1024px the navbar hides on scroll, so the mark would
 * animate out of sight. There it stays the standard collapsed logo.
 */

// Widths above which the navbar stays put (see the 1024px block in App.css)
const DESKTOP_QUERY = '(min-width: 1025px)'

// Measured from the wordmark itself, in viewBox units
const LETTER_STROKE = 14.53 // the I's stem — the wordmark's stroke weight
// A long horizontal bar reads heavier than a vertical stem of the same
// measure, so trim 10% to match the letters optically rather than literally.
const LINE_STROKE = LETTER_STROKE * 0.9
const INK_CENTER_Y = 48.15
const X_LEFT_INK_R = 121.1 // right edge of the X's left half (fixed)
const X_RIGHT_INK_L = 130.9 // left edge of the X's right half, collapsed
const LINE_GAP = 9.8 // breathing room between the line and each X half

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
    const mq = window.matchMedia(DESKTOP_QUERY)
    // Scroll events are already frame-coalesced by the browser, so a direct
    // (passive) handler is enough — no extra rAF throttling needed.
    const update = () => {
      if (!mq.matches) {
        setProgress(0)
        return
      }
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? clamp01(window.scrollY / max) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    mq.addEventListener('change', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      mq.removeEventListener('change', update)
    }
  }, [])

  // One motion, linear in scroll: the letters travel and the line's right
  // end rides with them, holding a constant gap to the X's right half.
  const gap = SHIFT * (1 - progress)
  const contentW = VB_W - gap
  const lineL = X_LEFT_INK_R + LINE_GAP
  const lineW = Math.max(0, X_RIGHT_INK_L + SHIFT * progress - LINE_GAP - lineL)

  return (
    /* Sized from CSS: .logo sets the height, the aspect ratio gives the width,
       and the SVG is a percentage of that — so the mark scales per breakpoint
       without a pixel constant duplicated between here and the stylesheet. */
    <span className="logo" style={{ aspectRatio: contentW / VB_H }}>
      <svg
        className="logo__svg"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        role="img"
        aria-label="Extind"
        style={{
          height: '100%',
          width: `${(VB_W / contentW) * 100}%`,
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

        {/* The line, elongating with scroll progress. No fill attribute, so
            it inherits the wordmark's own charcoal via currentColor. */}
        {lineW > 0 && (
          <rect x={lineL} y={INK_CENTER_Y - LINE_STROKE / 2} width={lineW} height={LINE_STROKE} />
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
