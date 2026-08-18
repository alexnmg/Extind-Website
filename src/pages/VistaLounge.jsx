import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import { VistaIcon, ClockIcon, MeetingIcon } from '../components/PillIcons'
import vistaImg from '../assets/photos/lounge.jpg'
import lounge2Img from '../assets/photos/lounge-2.jpg'
import lounge3Img from '../assets/photos/lounge-3.jpg'
import heroImg from '../assets/photos/coworking.jpg'
import pillarsImg from '../assets/photos/meeting-room.jpg'

// Extra line icons in the shared 24×24 / 1.5-weight style.
const iconBase = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

function CoffeeIcon() {
  return (
    <svg {...iconBase}>
      <path d="M5 8.5h11v4.4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8.5Z" />
      <path d="M16 9.6h1.6a2.1 2.1 0 0 1 0 4.2H16" />
      <path d="M8 3.2c-.6 1 .6 1.6 0 2.8M11.4 3.2c-.6 1 .6 1.6 0 2.8" />
    </svg>
  )
}

function SofaIcon() {
  return (
    <svg {...iconBase}>
      <path d="M4 10.5V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2.5" />
      <rect x="3" y="10.5" width="18" height="6" rx="2" />
      <path d="M3 14h18" />
      <path d="M6 16.5v2M18 16.5v2" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg {...iconBase}>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
    </svg>
  )
}

const features = [
  {
    icon: <VistaIcon />,
    title: 'Panoramic views',
    desc: 'Floor-to-ceiling windows framing the old town and the river. The kind of view that makes a long call feel shorter.',
  },
  {
    icon: <CoffeeIcon />,
    title: 'Serious coffee',
    desc: 'A specialty coffee bar, tea and refreshments through the day — the unofficial engine room of the community.',
  },
  {
    icon: <SofaIcon />,
    title: 'Room to breathe',
    desc: 'Soft seating, quiet corners and warm light. Somewhere to think, read, or take a call away from your desk.',
  },
  {
    icon: <MeetingIcon />,
    title: 'Built for gatherings',
    desc: 'By evening the lounge becomes an event space, hosting talks, breakfasts and community nights above the city.',
  },
  {
    icon: <ClockIcon />,
    title: 'Open to every member',
    desc: 'Vista is part of every Extind membership. Come up whenever you need a change of scene — no booking required.',
  },
  {
    icon: <SunIcon />,
    title: 'Golden hour, every evening',
    desc: 'The west-facing glass turns the whole room amber at sunset. Time a break for it; it’s worth the trip up.',
  },
]

const heroSlides = [
  { src: vistaImg, caption: 'Panoramic Lounge · 6th floor', alt: 'Vista Lounge with panoramic city view' },
  { src: lounge2Img, caption: 'Room for events & gatherings', alt: 'Vista Lounge event and gathering space' },
  { src: lounge3Img, caption: 'Coffee point & social area', alt: 'Vista Lounge coffee point and social area' },
]

export default function VistaLounge() {
  const featuresRef = useRef(null)

  useEffect(() => {
    const prev = document.title
    document.title = 'Vista Lounge — Extind'
    return () => {
      document.title = prev
    }
  }, [])

  const scrollToFeatures = () => {
    const target = featuresRef.current
    if (!target) return
    const navH = document.querySelector('.navbar-container')?.offsetHeight ?? 0
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      <Hero
        title="A panoramic event space above the city."
        lede="Six floors up, overlooking the Palace of Culture — the home of the Extind community, and the best seat in the building for a coffee, a catch-up, or an evening event."
        primaryLabel="Book a visit"
        secondaryLabel="Explore the lounge →"
        slides={heroSlides}
        onSecondaryClick={scrollToFeatures}
      />

      <section className="section" ref={featuresRef}>
        <SectionHeader
          eyebrow="The space"
          title="Designed for the moments between focused work"
          description="Vista is where the community gathers — for a change of scene during the day, and for the talks and evenings that bring everyone together after hours."
        />
        <div className="lounge-features">
          {features.map((f, i) => (
            <article
              className="lounge-feature"
              key={f.title}
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 80}ms` }}
            >
              <span className="lounge-feature__icon">{f.icon}</span>
              <h3 className="lounge-feature__title">{f.title}</h3>
              <p className="lounge-feature__desc">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <article className="lounge-intro" data-reveal>
          <div className="lounge-intro__media">
            <img src={heroImg} alt="" />
          </div>
          <div className="lounge-intro__body">
            <p className="lounge-intro__eyebrow">Events</p>
            <h3 className="lounge-intro__title">Something on, most weeks</h3>
            <p className="lounge-intro__desc">
              Founders’ breakfasts, meetups, panels and pitch nights — the lounge is where the
              Extind community actually meets. Most events are free and open to guests, so there’s
              always a reason to come up.
            </p>
            <Link className="btn btn--primary" to="/events" viewTransition>
              See upcoming events →
            </Link>
          </div>
        </article>
      </section>

      <section className="section">
        <article className="lounge-intro lounge-intro--reverse" data-reveal>
          <div className="lounge-intro__media">
            <img src={pillarsImg} alt="" />
          </div>
          <div className="lounge-intro__body">
            <p className="lounge-intro__eyebrow">Extind Magazine</p>
            <h3 className="lounge-intro__title">Guides for choosing your workspace</h3>
            <p className="lounge-intro__desc">
              Practical, no-nonsense reading on private offices, coworking and meeting spaces in
              Iași — what things cost, what’s included, and how to choose.
            </p>
            <Link className="btn btn--primary" to="/magazine" viewTransition>
              Read the magazine →
            </Link>
          </div>
        </article>
      </section>
    </>
  )
}
