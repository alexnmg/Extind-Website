import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import InfoGrid from '../components/InfoGrid'
import pillarsImg from '../assets/photos/private-office-2.jpg'
import vistaImg from '../assets/photos/lounge.jpg'
import heroImg from '../assets/photos/coworking.jpg'

const useCases = [
  { icon: 'handshake', text: 'Strategic partner, investor or key-client visits' },
  { icon: 'briefcase', text: 'Temporary CEO or management presence' },
  { icon: 'search', text: 'Audits and due diligence' },
  { icon: 'interview', text: 'Interviews for senior roles' },
  { icon: 'globe', text: 'Board meetings, negotiations or international delegations' },
  { icon: 'shield', text: 'Projects that need discretion and a representative setting' },
]

const configurable = [
  { icon: 'desk', text: 'A private office prepared exclusively for you' },
  { icon: 'meeting', text: 'A dedicated meeting room' },
  { icon: 'key', text: 'Controlled access' },
  { icon: 'config', text: 'Furniture configuration' },
  { icon: 'coffee', text: 'Water, coffee, tea and hospitality service' },
  { icon: 'catering', text: 'Catering, on request' },
  { icon: 'visitor', text: 'Support for receiving your guests' },
  { icon: 'parking', text: 'Parking, subject to availability and confirmation' },
  { icon: 'sign', text: 'Temporary signage, where permitted' },
  { icon: 'network', text: 'Additional confidentiality or connectivity requirements' },
]

const heroSlides = [
  { src: pillarsImg, caption: 'Private office · Palas Campus', alt: 'Private office at Extind' },
  { src: vistaImg, caption: 'Panoramic Lounge · 6th floor', alt: 'Vista Lounge' },
  { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Coworking space at Extind' },
]

export default function ExecutiveDayOffice() {
  const detailsRef = useRef(null)

  useEffect(() => {
    const prev = document.title
    document.title = 'Executive Day Office — Extind'
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
        title="A premium office for corporate visits."
        lede="When your company hosts an important partner, an international delegation or your management team, the space becomes part of the impression you make. For one to three days, EXTIND prepares a private, representative and fully functional office — with meeting-room access, hospitality and a setup matched to your schedule."
        primaryLabel="Prepare a corporate visit"
        secondaryLabel="See what's included →"
        slides={heroSlides}
        onSecondaryClick={scrollToDetails}
      />

      <section className="section">
        <SectionHeader
          eyebrow="When you'd use it"
          title="For the moments that matter most"
          description="Not a day pass, and not a lease — a representative office prepared for the days your company can’t leave to chance."
        />
        <InfoGrid items={useCases} />
      </section>

      <section className="section" ref={detailsRef}>
        <SectionHeader
          eyebrow="What we prepare"
          title="Configured around your visit"
          description="Every request is confirmed before your dates — tell us the occasion and we build the setup around it."
        />
        <InfoGrid items={configurable} />
      </section>

      <section className="section">
        <div className="callout" data-reveal>
          <span className="callout__label">What we actually offer</span>
          <p className="callout__text">
            We don’t sell the temporary use of a room. We sell the certainty that an important
            meeting takes place in a flawless setting — without your company permanently renting and
            running an HQ of this calibre.
          </p>
          <Link className="btn btn--primary" to="/book-a-visit" viewTransition>
            Prepare a corporate visit
          </Link>
        </div>
      </section>
    </>
  )
}
