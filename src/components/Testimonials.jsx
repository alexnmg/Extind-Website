import { useEffect, useRef, useState } from 'react'
import SectionHeader from './SectionHeader'
import starIcon from '../assets/figma/star.svg'
import avatarImg from '../assets/figma/avatar.png'

const defaultItems = [
  {
    quote:
      '“Having a diverse team creates a dynamic and interesting place to work for our colleagues and visitors alike. Extind offers a thoughtful workspace which I like to think helps them be more productive.”',
    name: 'Charlie Harris',
    role: 'Managing Partner, MSO Project',
  },
  {
    quote:
      '“The community at Extind coworking gathers and nurtures so organically. The people I met here are a gold standard of collaboration, knowledge, opportunities and fun stories shared.”',
    name: 'Oana Modrescu',
    role: 'AI Partnerships, Tech Companies',
  },
  {
    quote:
      '“Of Startup Studio in Bucharest is an excellent meeting space. It is professional yet cozy, making it ideal for client meetings. The staff is warm and welcoming, and the location is convenient.”',
    name: 'Monica Zara',
    role: 'Partner & Head of Confidence, Rise to Web',
  },
  {
    quote:
      '“It is a great place to work from - you will love the vibe and the great coffee options around. Its recommended to any freelancer or entrepreneur who is looking for more than just a workspace.”',
    name: 'Vlad Andrei',
    role: 'Co-founder, Bucharest AI',
  },
  {
    quote:
      '“Extind offers a fantastic space for creative professionals. The natural light and like-minded makers around every project feel grounded.”',
    name: 'Ana Ionescu',
    role: 'Product Designer, CreativLab',
  },
  {
    quote:
      '“Extind gave our small team a professional base without the overhead of a traditional office. From day one, clients took us more seriously and the team genuinely felt at home.”',
    name: 'Radu Petrescu',
    role: 'Founder, Nordic Ventures',
  },
  {
    quote:
      '“What surprised me most was how much time we got back. The space, the coffee, the meeting rooms—everything just works, so we can focus entirely on the business.”',
    name: 'Elena Barbu',
    role: 'Operations Lead, Delta Systems',
  },
]

const GAP = 24

// Card width is responsive (2.5 cards on tablet, 1.5 on mobile), so the
// scroll step is measured from the first rendered card instead of hardcoded.
const getStep = (vp) => {
  const card = vp?.querySelector('.testimonial-card')
  return (card ? card.getBoundingClientRect().width : 420) + GAP
}

function TestimonialCard({ quote, name, role }) {
  return (
    <article className="testimonial-card">
      <div className="testimonial-card__stars" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, i) => (
          <img key={i} src={starIcon} alt="" width="16" height="16" />
        ))}
      </div>
      <p className="testimonial-card__quote">{quote}</p>
      <div className="testimonial-card__author">
        <img className="testimonial-card__avatar" src={avatarImg} alt="" width="48" height="48" />
        <div className="testimonial-card__meta">
          <p className="testimonial-card__name">{name}</p>
          <p className="testimonial-card__role">{role}</p>
        </div>
      </div>
    </article>
  )
}

export default function Testimonials({
  eyebrow = 'Testimonials',
  title = 'Proven by the people who work here.',
  description = 'Hear from the founders, teams and professionals who chose Extind as the place where they work, meet clients and grow their businesses.',
  items = defaultItems,
}) {
  const viewportRef = useRef(null)
  const rafRef = useRef(0)
  const animatingRef = useRef(false)
  const dragRef = useRef(null)
  const [active, setActive] = useState(0)
  const [pages, setPages] = useState(1)
  const [dragging, setDragging] = useState(false)

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
    if (!dragRef.current) return
    const vp = viewportRef.current
    vp.scrollLeft = dragRef.current.scroll - (e.clientX - dragRef.current.x)
  }

  const endDrag = (e) => {
    if (!dragRef.current) return
    dragRef.current = null
    setDragging(false)
    viewportRef.current?.releasePointerCapture?.(e.pointerId)
    syncActive()
  }

  return (
    <section className="section testimonials">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div
        className={`testimonials__viewport${dragging ? ' is-dragging' : ''}`}
        ref={viewportRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="testimonials__track">
          {items.map((t, i) => (
            <TestimonialCard key={t.name + i} {...t} />
          ))}
        </div>
      </div>
      <div className="testimonials__indicator" role="tablist" aria-label="Testimonials">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`testimonials__dot${i === activeDot ? ' testimonials__dot--active' : ''}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === activeDot}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  )
}
