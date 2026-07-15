import { useCallback, useEffect, useRef, useState } from 'react'

const clamp01 = (v) => Math.min(1, Math.max(0, v))

/* Scroll-scrubbed step index for pinned sliders.
 *
 * Attach `ref` to a tall wrapper whose child is position: sticky. As the
 * page scrolls through the wrapper, progress divides evenly into `steps`
 * slices and `index` reports the active one — scrolling scrubs the slider.
 * `scrollToStep` drives the page to the centre of a slice, so prev/next
 * arrows keep working by moving the scroll position itself.
 *
 * `enabled: false` leaves everything inert (index 0, no listeners) so the
 * same component can run as a plain manual slider elsewhere.
 */
export default function useScrollScrub(steps, enabled = true) {
  const ref = useRef(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!enabled) return
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const p = clamp01(-el.getBoundingClientRect().top / scrollable)
      setIndex(Math.min(steps - 1, Math.floor(p * steps)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [steps, enabled])

  const scrollToStep = useCallback(
    (i) => {
      const el = ref.current
      if (!el) return
      const scrollable = el.offsetHeight - window.innerHeight
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: Math.round(top + ((i + 0.5) / steps) * scrollable),
        behavior: 'smooth',
      })
    },
    [steps]
  )

  return { ref, index, scrollToStep }
}
