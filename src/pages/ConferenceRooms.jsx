import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import InfoGrid from '../components/InfoGrid'
import pillarsImg from '../assets/figma/pillars.png'
import vistaImg from '../assets/figma/vista.png'
import heroImg from '../assets/figma/hero.png'

const hostable = [
  { icon: 'meeting', text: 'Management meetings and board sessions' },
  { icon: 'lightbulb', text: 'Workshops and strategy sessions' },
  { icon: 'presentation', text: 'Trainings and presentations' },
  { icon: 'handshake', text: 'Client and partner meetings' },
  { icon: 'interview', text: 'Interviews and hiring days' },
  { icon: 'coffee', text: 'Networking and business breakfasts' },
]

const included = [
  { icon: 'wifi', text: '1 Gbps internet' },
  { icon: 'presentation', text: 'Screen and presentation setup' },
  { icon: 'sun', text: 'Natural light and a quiet, considered setting' },
  { icon: 'layout', text: 'Flexible layouts for the format you need' },
  { icon: 'coffee', text: 'Coffee, tea and filtered water' },
  { icon: 'support', text: 'Setup support from the team on site' },
  { icon: 'catering', text: 'Catering, on request' },
  { icon: 'calendar', text: 'Booking by reservation, per your package' },
]

const heroSlides = [
  { src: pillarsImg, caption: 'Meeting & Focus Rooms', alt: 'Meeting room at Extind' },
  { src: vistaImg, caption: 'Panoramic Lounge · 6th floor', alt: 'Vista Lounge' },
  { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Coworking space at Extind' },
]

export default function ConferenceRooms() {
  const detailsRef = useRef(null)

  useEffect(() => {
    const prev = document.title
    document.title = 'Conference Rooms — Extind'
    return () => {
      document.title = prev
    }
  }, [])

  const scrollToDetails = () => {
    const target = detailsRef.current
    if (!target) return
    const navH = document.querySelector('.navbar-container')?.offsetHeight ?? 0
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      <Hero
        title="Rooms for the meetings that matter."
        lede="Meeting rooms and a conference room on the 6th floor of Palas Campus — bookable by the hour, matched to your format, and ready for the conversations you can’t leave to chance. For larger gatherings, the panoramic Vista Lounge is available too."
        primaryLabel="Book a visit"
        secondaryLabel="See what's included →"
        slides={heroSlides}
        onSecondaryClick={scrollToDetails}
      />

      <section className="section">
        <SectionHeader
          eyebrow="What you can host"
          title="Built for corporate conversations"
          description="From a focused four-person session to a full board meeting — we match the room to the meeting, not the other way round."
        />
        <InfoGrid items={hostable} />
      </section>

      <section className="section" ref={detailsRef}>
        <SectionHeader eyebrow="Included" title="Everything the room needs" />
        <InfoGrid items={included} />
        <div className="compare-cta" data-reveal>
          <Link className="btn btn--primary" to="/book-a-visit" viewTransition>
            Book a room
          </Link>
        </div>
      </section>
    </>
  )
}
