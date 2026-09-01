import { useEffect, useRef, useState } from 'react'
import SectionHeader from './SectionHeader'
import { useLang } from '../lib/i18n'

/* The Romanian quotes are the clients' original words; English is the
 * translation. */
const T = {
  en: {
    eyebrow: 'Testimonials',
    title: 'Proven by the people who work here.',
    description:
      'Hear from the founders, teams and professionals who chose Extind as the place where they work, meet clients and grow their businesses.',
    stars: '5 out of 5 stars',
    goTo: (n) => `Go to slide ${n}`,
    listLabel: 'Testimonials',
    items: [
      {
        quote:
          '“The best coworking space in Iași. The atmosphere is extraordinary, the facilities are top-notch, and the community motivates you every day.”',
        name: 'Alexandru M.',
        role: 'Software Developer, Freelancer',
      },
      {
        quote:
          '“I moved my 8-person team to Extind six months ago. We haven’t looked back since — the private office boosted our productivity enormously.”',
        name: 'Ioana P.',
        role: 'CEO, Startup IT',
      },
      {
        quote:
          '“I ran two workshops at Extind. The room is perfect, the equipment works flawlessly, and their team is extremely professional.”',
        name: 'Radu D.',
        role: 'Trainer & Consultant',
      },
    ],
  },
  ro: {
    eyebrow: 'Testimoniale',
    title: 'Confirmat de oamenii care lucrează aici.',
    description:
      'Părerile fondatorilor, echipelor și profesioniștilor care au ales Extind ca locul unde lucrează, își întâlnesc clienții și își cresc afacerile.',
    stars: '5 din 5 stele',
    goTo: (n) => `Mergi la slide-ul ${n}`,
    listLabel: 'Testimoniale',
    items: [
      {
        quote:
          '„Cel mai bun spațiu de coworking din Iași. Atmosfera este extraordinară, facilitățile sunt top, iar comunitatea te motivează zilnic.”',
        name: 'Alexandru M.',
        role: 'Software Developer, Freelancer',
      },
      {
        quote:
          '„Am mutat echipa mea de 8 persoane la Extind acum 6 luni. Nu ne-am mai uitat înapoi. Spațiul privat ne-a crescut productivitatea enorm.”',
        name: 'Ioana P.',
        role: 'CEO, Startup IT',
      },
      {
        quote:
          '„Am organizat două workshopuri la Extind. Sala este perfectă, echipamentele funcționează impecabil, iar echipa lor este extrem de profesionistă.”',
        name: 'Radu D.',
        role: 'Trainer & Consultant',
      },
    ],
  },
}

// Two-letter monogram from a name, e.g. "Alexandru M." → "AM"
const initials = (name) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const GAP = 24

// Card width is responsive (2.5 cards on tablet, 1.5 on mobile), so the
// scroll step is measured from the first rendered card instead of hardcoded.
const getStep = (vp) => {
  const card = vp?.querySelector('.testimonial-card')
  return (card ? card.getBoundingClientRect().width : 420) + GAP
}

/* Inline rather than an <img>: an external SVG cannot read the page's custom
 * properties, so the file's own fallback colour always won. Drawn with
 * currentColor, the stars take their colour from CSS like every other icon here. */
function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M7.8143 1.38595C7.75835 1.42068 7.71322 1.47037 7.684 1.5294L6.14467 4.64873C6.04314 4.85424 5.89319 5.03201 5.70772 5.16672C5.52226 5.30143 5.30684 5.38906 5.08 5.42206L1.63667 5.9254C1.57114 5.93466 1.50952 5.96215 1.45885 6.00472C1.40818 6.04729 1.37048 6.10324 1.35005 6.16619C1.32962 6.22914 1.32729 6.29656 1.34331 6.36078C1.35933 6.42499 1.39306 6.48342 1.44067 6.5294L3.93133 8.95406C4.09574 9.11416 4.21873 9.31186 4.28969 9.53009C4.36066 9.74833 4.37746 9.98055 4.33867 10.2067L3.75133 13.6327C3.73991 13.6979 3.74699 13.7649 3.77177 13.8262C3.79656 13.8875 3.83805 13.9406 3.89153 13.9795C3.94501 14.0184 4.00834 14.0415 4.0743 14.0462C4.14026 14.0509 4.20622 14.037 4.26467 14.0061L7.34267 12.3874C7.54552 12.2809 7.77121 12.2252 8.00033 12.2252C8.22945 12.2252 8.45514 12.2809 8.658 12.3874L11.7367 14.0061C11.7951 14.0372 11.8612 14.0513 11.9272 14.0467C11.9933 14.0421 12.0568 14.019 12.1104 13.9801C12.164 13.9411 12.2055 13.8879 12.2303 13.8265C12.2551 13.7651 12.2622 13.698 12.2507 13.6327L11.6627 10.2061C11.624 9.97999 11.6409 9.74791 11.7119 9.52981C11.7828 9.31172 11.9057 9.11413 12.07 8.95406L14.5607 6.52873C14.6079 6.4827 14.6413 6.42437 14.6571 6.36035C14.6728 6.29633 14.6704 6.22917 14.65 6.16647C14.6296 6.10376 14.5921 6.04801 14.5417 6.00553C14.4912 5.96304 14.4299 5.93552 14.3647 5.92606L10.9207 5.42206C10.6941 5.3888 10.479 5.30106 10.2937 5.16636C10.1085 5.03167 9.95879 4.85404 9.85733 4.64873L8.31733 1.5294C8.28812 1.47037 8.24299 1.42068 8.18703 1.38595C8.13108 1.35121 8.06653 1.3328 8.00067 1.3328C7.93481 1.3328 7.87026 1.35121 7.8143 1.38595Z" />
    </svg>
  )
}

function TestimonialCard({ quote, name, role, starsLabel }) {
  return (
    <article className="testimonial-card">
      <div className="testimonial-card__stars" aria-label={starsLabel}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p className="testimonial-card__quote">{quote}</p>
      <div className="testimonial-card__author">
        <span className="testimonial-card__avatar" aria-hidden="true">{initials(name)}</span>
        <div className="testimonial-card__meta">
          <p className="testimonial-card__name">{name}</p>
          <p className="testimonial-card__role">{role}</p>
        </div>
      </div>
    </article>
  )
}

export default function Testimonials({ eyebrow, title, description, items }) {
  const { lang } = useLang()
  const t = T[lang]
  eyebrow = eyebrow ?? t.eyebrow
  title = title ?? t.title
  description = description ?? t.description
  items = items ?? t.items
  const viewportRef = useRef(null)
  const rafRef = useRef(0)
  const animatingRef = useRef(false)
  const dragRef = useRef(null)
  const hoverRef = useRef(false)
  const chipRef = useRef(null)
  const [active, setActive] = useState(0)
  const [pages, setPages] = useState(1)
  const [dragging, setDragging] = useState(false)
  const [chipVisible, setChipVisible] = useState(false)

  /* Idle drift: the carousel creeps sideways (~18px/s) whenever nobody is
   * hovering, dragging or mid dot-animation, reversing at the ends. Subtle
   * enough to go unnoticed consciously; it reads as "this thing moves". */
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let raf
    let dir = 1
    const tick = () => {
      const vp = viewportRef.current
      if (vp && !hoverRef.current && !dragRef.current && !animatingRef.current) {
        const max = vp.scrollWidth - vp.clientWidth
        if (max > 0) {
          vp.scrollLeft += 0.3 * dir
          if (vp.scrollLeft >= max - 1) dir = -1
          else if (vp.scrollLeft <= 1) dir = 1
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Pages = number of scroll stops = cards that can't all fit at once.
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const measure = () => {
      // Cards are aligned to the content column, so page off the content width
      // (viewport minus the track's inline padding), not the full bleed width.
      const track = vp.firstElementChild
      const cs = track ? getComputedStyle(track) : null
      const pad = cs ? parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) : 48
      const visible = Math.max(1, Math.floor((vp.clientWidth - pad + GAP) / getStep(vp)))
      setPages(Math.max(1, items.length - visible + 1))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [items.length])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  // With just a few testimonials there's nothing to cycle through — show a
  // plain static grid instead of the drag/scroll carousel.
  const isStatic = items.length <= 3
  const isCarousel = pages > 1
  const activeDot = Math.min(active, pages - 1)

  const syncActive = () => {
    const vp = viewportRef.current
    if (!vp) return
    const maxScroll = vp.scrollWidth - vp.clientWidth
    const idx =
      vp.scrollLeft >= maxScroll - 4
        ? pages - 1
        : Math.min(pages - 1, Math.round(vp.scrollLeft / getStep(vp)))
    setActive(Math.max(0, idx))
  }

  const onScroll = () => {
    // Skip while a dot animation is driving the scroll (avoids flicker)
    if (!animatingRef.current) syncActive()
  }

  const goTo = (i) => {
    const vp = viewportRef.current
    if (!vp) return
    cancelAnimationFrame(rafRef.current)
    setActive(i)
    const maxScroll = vp.scrollWidth - vp.clientWidth
    // Last dot always lands on the true end so the final card is fully shown
    const target = i >= pages - 1 ? maxScroll : Math.min(i * getStep(vp), maxScroll)
    const start = vp.scrollLeft
    const distance = target - start
    if (Math.abs(distance) < 1) return
    // Manual easing — native smooth scroll is unreliable on this overflow
    // container in Chrome, so we tween scrollLeft ourselves.
    const duration = 450
    let startTs = null
    animatingRef.current = true
    const stepFn = (ts) => {
      if (startTs === null) startTs = ts
      const t = Math.min(1, (ts - startTs) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      vp.scrollLeft = start + distance * eased
      if (t < 1) {
        rafRef.current = requestAnimationFrame(stepFn)
      } else {
        animatingRef.current = false
      }
    }
    rafRef.current = requestAnimationFrame(stepFn)
  }

  // Mouse drag-to-scroll (touch uses native scrolling)
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return
    const vp = viewportRef.current
    cancelAnimationFrame(rafRef.current)
    animatingRef.current = false
    dragRef.current = { x: e.clientX, scroll: vp.scrollLeft }
    setDragging(true)
    vp.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    // The chip rides the cursor; position via the ref so no re-render per move
    if (chipRef.current) {
      chipRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
    }
    if (!dragRef.current) return
    const vp = viewportRef.current
    vp.scrollLeft = dragRef.current.scroll - (e.clientX - dragRef.current.x)
  }

  const onPointerEnter = (e) => {
    if (e.pointerType !== 'mouse') return
    hoverRef.current = true
    if (isCarousel) setChipVisible(true)
  }

  const onPointerLeave = () => {
    hoverRef.current = false
    setChipVisible(false)
  }

  const endDrag = (e) => {
    if (!dragRef.current) return
    dragRef.current = null
    setDragging(false)
    viewportRef.current?.releasePointerCapture?.(e.pointerId)
    syncActive()
  }

  if (isStatic) {
    return (
      <section className="section testimonials">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="testimonials__grid" data-reveal>
          {items.map((item, i) => (
            <TestimonialCard key={item.name + i} {...item} starsLabel={t.stars} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="section testimonials">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div
        className={`testimonials__viewport${dragging ? ' is-dragging' : ''}`}
        data-reveal
        ref={viewportRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <div className="testimonials__track">
          {items.map((item, i) => (
            <TestimonialCard key={item.name + i} {...item} starsLabel={t.stars} />
          ))}
        </div>
      </div>
      <div ref={chipRef} className={`drag-chip${chipVisible ? ' drag-chip--visible' : ''}`} aria-hidden="true">
        {/* Drag affordance: a double-headed arrow at the UI's 1.5 stroke */}
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 8l-4 4 4 4" />
          <path d="M17 8l4 4-4 4" />
          <path d="M3 12h18" />
        </svg>
      </div>
      {isCarousel && (
        <div className="testimonials__indicator" role="tablist" aria-label={t.listLabel}>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`testimonials__dot${i === activeDot ? ' testimonials__dot--active' : ''}`}
              aria-label={t.goTo(i + 1)}
              aria-selected={i === activeDot}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
