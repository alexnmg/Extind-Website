import { useEffect, useState } from 'react'

// Desktop = above the tablet breakpoint (max-width: 1024px), which is also the
// width below which the navbar hides on scroll. Scroll-scrub sliders only pin
// on desktop: on mobile/tablet the hiding navbar and the browser's own
// collapsing toolbar both change the usable viewport height mid-scroll, so a
// gapless full-height pin can't stay stable — those widths use the plain
// manual slider instead.
const QUERY = '(min-width: 1025px)'

export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(QUERY).matches : true
  )

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = () => setIsDesktop(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isDesktop
}
