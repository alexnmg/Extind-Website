import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* Scroll-entry reveals.
 *
 * Any element carrying `data-reveal` starts hidden (see the guarded rule in
 * index.css) and gets `.is-revealed` the first time it enters the viewport;
 * `--reveal-delay` staggers siblings. One observer per route render: keying
 * the effect on the pathname re-scans after navigation, when the new page's
 * elements exist. Reveals are one-shot — once seen, an element stays put.
 *
 * The hidden state only applies under prefers-reduced-motion: no-preference,
 * so reduced-motion users (or an element the observer misses) never end up
 * with invisible content.
 */
export default function ScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]:not(.is-revealed)')]
    if (!els.length) return

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      els.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            io.unobserve(entry.target)
          }
        })
      },
      // Fire once ~8% of the viewport's height remains below the element's
      // top edge, so things rise while still comfortably on screen.
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
