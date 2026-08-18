import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import InfoGrid from '../components/InfoGrid'
import heroImg from '../assets/photos/coworking.jpg'
import vistaImg from '../assets/photos/lounge-2.jpg'
import pillarsImg from '../assets/photos/meeting-room-2.jpg'

const plans = [
  { name: 'Day Pass', price: '€40', unit: '+ VAT / day', note: 'One day on the coworking floor.' },
  { name: 'Explore EXTIND', price: '€400', unit: '+ VAT', note: '20 days at €20 + VAT/day.' },
  { name: 'Monthly', price: '€350', unit: '+ VAT / month', note: '12-month membership.' },
  { name: 'Day Office', price: 'On request', unit: '', note: 'A private office for the day, priced per office.' },
]

const amenities = [
  { icon: 'desk', text: 'A workstation in a premium space' },
  { icon: 'chair', text: 'Ergonomic furniture' },
  { icon: 'wifi', text: '1 Gbps internet' },
  { icon: 'coffee', text: 'Bean coffee, tea and filtered water' },
  { icon: 'lounge', text: 'Lounge and coffee-point access' },
  { icon: 'users', text: 'Use of the shared areas' },
  { icon: 'calendar', text: 'Room access by booking, per package' },
  { icon: 'community', text: 'The EXTIND community and applicable events' },
  { icon: 'clock', text: 'Access per your schedule or subscription' },
]

const memberBenefits = [
  { icon: 'door', text: 'Access to your contracted space and shared areas' },
  { icon: 'wifi', text: '1 Gbps internet' },
  { icon: 'chair', text: 'Ergonomic furniture' },
  { icon: 'coffee', text: 'Coffee, tea and filtered water' },
  { icon: 'calendar', text: 'Room booking per your package' },
  { icon: 'ticket', text: 'Access to EXTIND events, when included or open' },
  { icon: 'support', text: 'Direct communication and operational support' },
  { icon: 'visitor', text: 'Receive your guests in a professional setting' },
  { icon: 'card', text: 'Palas partner card — access to Palas complex partner discounts' },
]

const heroSlides = [
  { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Extind coworking space' },
  { src: pillarsImg, caption: 'Meeting & Focus Rooms', alt: 'Meeting room at Extind' },
  { src: vistaImg, caption: 'Panoramic Lounge · 6th floor', alt: 'Vista Lounge' },
]

export default function Coworking() {
  const pricingRef = useRef(null)

  useEffect(() => {
    const prev = document.title
    document.title = 'Coworking — Extind'
    return () => {
      document.title = prev
    }
  }, [])

  const scrollToPricing = () => {
    const target = pricingRef.current
    if (!target) return
    const navH = document.querySelector('.navbar-container')?.offsetHeight ?? 0
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      <Hero
        title="A premium base, on the days you need it."
        lede="Flexible desks in a thoughtfully designed shared space on the 6th floor of Palas Campus — with the coffee, the quiet and the community of people who care about their work. Come for a day, or make it your monthly base."
        primaryLabel="Book a visit"
        secondaryLabel="See pricing →"
        slides={heroSlides}
        onSecondaryClick={scrollToPricing}
      />

      <section className="section" ref={pricingRef}>
        <SectionHeader
          eyebrow="Pricing"
          title="Coworking that fits how you work"
          description="Prices exclude VAT. Not sure which fits? Book a visit and we’ll point you to the right one."
        />
        <div className="pricing-row" data-reveal>
          {plans.map((p) => (
            <article className="price-card" key={p.name}>
              <span className="price-card__name">{p.name}</span>
              <span className="price-card__price">
                {p.price}
                {p.unit && <span className="price-card__unit"> {p.unit}</span>}
              </span>
              <span className="price-card__note">{p.note}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow="Included" title="What every membership comes with" />
        <InfoGrid items={amenities} />
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Members"
          title="Membership benefits"
          description="Certain benefits at launch. Priority access and special event pricing are offered depending on the event."
        />
        <InfoGrid items={memberBenefits} />
        <div className="compare-cta" data-reveal>
          <Link className="btn btn--primary" to="/book-a-visit" viewTransition>
            Book a visit
          </Link>
        </div>
      </section>
    </>
  )
}
