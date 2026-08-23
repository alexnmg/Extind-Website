import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import InfoGrid from '../components/InfoGrid'
import { useLang } from '../lib/i18n'
import heroImg from '../assets/photos/coworking.jpg'
import vistaImg from '../assets/photos/lounge-2.jpg'
import pillarsImg from '../assets/photos/meeting-room-2.jpg'

const T = {
  en: {
    docTitle: 'Coworking — Extind',
    heroTitle: 'A premium base, on the days you need it.',
    heroLede:
      'Flexible desks in a thoughtfully designed shared space on the 6th floor of Palas Campus — with the coffee, the quiet and the community of people who care about their work. Come for a day, or make it your monthly base.',
    primaryLabel: 'Book a visit',
    secondaryLabel: 'See pricing →',
    heroSlides: [
      { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Extind coworking space' },
      { src: pillarsImg, caption: 'Meeting & Focus Rooms', alt: 'Meeting room at Extind' },
      { src: vistaImg, caption: 'Panoramic Lounge · 6th floor', alt: 'Vista Lounge' },
    ],
    priceEyebrow: 'Pricing',
    priceTitle: 'Coworking that fits how you work',
    priceDesc:
      'Prices exclude VAT. Not sure which fits? Book a visit and we’ll point you to the right one.',
    plans: [
      { name: 'Day Pass', price: '€40', unit: '+ VAT / day', note: 'One day on the coworking floor.' },
      { name: 'Explore EXTIND', price: '€400', unit: '+ VAT', note: '20 days at €20 + VAT/day.' },
      { name: 'Monthly', price: '€350', unit: '+ VAT / month', note: '12-month membership.' },
      { name: 'Day Office', price: 'On request', unit: '', note: 'A private office for the day, priced per office.' },
    ],
    inclEyebrow: 'Included',
    inclTitle: 'What every membership comes with',
    amenities: [
      { icon: 'desk', text: 'A workstation in a premium space' },
      { icon: 'chair', text: 'Ergonomic furniture' },
      { icon: 'wifi', text: '1 Gbps internet' },
      { icon: 'coffee', text: 'Bean coffee, tea and filtered water' },
      { icon: 'lounge', text: 'Lounge and coffee-point access' },
      { icon: 'users', text: 'Use of the shared areas' },
      { icon: 'calendar', text: 'Room access by booking, per package' },
      { icon: 'community', text: 'The EXTIND community and applicable events' },
      { icon: 'clock', text: 'Access per your schedule or subscription' },
    ],
    memEyebrow: 'Members',
    memTitle: 'Membership benefits',
    memDesc:
      'Certain benefits at launch. Priority access and special event pricing are offered depending on the event.',
    memberBenefits: [
      { icon: 'door', text: 'Access to your contracted space and shared areas' },
      { icon: 'wifi', text: '1 Gbps internet' },
      { icon: 'chair', text: 'Ergonomic furniture' },
      { icon: 'coffee', text: 'Coffee, tea and filtered water' },
      { icon: 'calendar', text: 'Room booking per your package' },
      { icon: 'ticket', text: 'Access to EXTIND events, when included or open' },
      { icon: 'support', text: 'Direct communication and operational support' },
      { icon: 'visitor', text: 'Receive your guests in a professional setting' },
      { icon: 'card', text: 'Palas partner card — access to Palas complex partner discounts' },
    ],
    cta: 'Book a visit',
  },
  ro: {
    docTitle: 'Coworking — Extind',
    heroTitle: 'O bază premium, în zilele în care ai nevoie de ea.',
    heroLede:
      'Birouri flexibile într-un spațiu comun atent proiectat, la etajul 6 din Palas Campus — cu cafeaua, liniștea și comunitatea oamenilor cărora le pasă de munca lor. Vino pentru o zi sau fă din el baza ta lunară.',
    primaryLabel: 'Programează o vizită',
    secondaryLabel: 'Vezi prețurile →',
    heroSlides: [
      { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Spațiul de coworking Extind' },
      { src: pillarsImg, caption: 'Săli de întâlniri & focus', alt: 'Sală de întâlniri la Extind' },
      { src: vistaImg, caption: 'Lounge panoramic · etajul 6', alt: 'Vista Lounge' },
    ],
    priceEyebrow: 'Prețuri',
    priceTitle: 'Coworking potrivit felului în care lucrezi',
    priceDesc:
      'Prețurile nu includ TVA. Nu știi care ți se potrivește? Programează o vizită și te îndrumăm noi.',
    plans: [
      { name: 'Day Pass', price: '40 €', unit: '+ TVA / zi', note: 'O zi pe etajul de coworking.' },
      { name: 'Explore EXTIND', price: '400 €', unit: '+ TVA', note: '20 de zile la 20 € + TVA/zi.' },
      { name: 'Abonament lunar', price: '350 €', unit: '+ TVA / lună', note: 'Abonament pe 12 luni.' },
      { name: 'Day Office', price: 'La cerere', unit: '', note: 'Un birou privat pentru o zi, tarifat per birou.' },
    ],
    inclEyebrow: 'Incluse',
    inclTitle: 'Ce include fiecare abonament',
    amenities: [
      { icon: 'desk', text: 'Un loc de lucru într-un spațiu premium' },
      { icon: 'chair', text: 'Mobilier ergonomic' },
      { icon: 'wifi', text: 'Internet 1 Gbps' },
      { icon: 'coffee', text: 'Cafea boabe, ceai și apă filtrată' },
      { icon: 'lounge', text: 'Acces la lounge și coffee point' },
      { icon: 'users', text: 'Utilizarea zonelor comune' },
      { icon: 'calendar', text: 'Acces la săli pe bază de rezervare, conform pachetului' },
      { icon: 'community', text: 'Comunitatea EXTIND și evenimentele aplicabile' },
      { icon: 'clock', text: 'Acces conform programului sau abonamentului tău' },
    ],
    memEyebrow: 'Membri',
    memTitle: 'Beneficiile membrilor',
    memDesc:
      'Anumite beneficii la lansare. Accesul prioritar și tarifele speciale se oferă în funcție de eveniment.',
    memberBenefits: [
      { icon: 'door', text: 'Acces la spațiul contractat și la zonele comune' },
      { icon: 'wifi', text: 'Internet 1 Gbps' },
      { icon: 'chair', text: 'Mobilier ergonomic' },
      { icon: 'coffee', text: 'Cafea, ceai și apă filtrată' },
      { icon: 'calendar', text: 'Rezervarea sălilor conform pachetului' },
      { icon: 'ticket', text: 'Acces la evenimentele EXTIND, când sunt incluse sau deschise' },
      { icon: 'support', text: 'Comunicare directă și suport operațional' },
      { icon: 'visitor', text: 'Primește-ți oaspeții într-un cadru profesional' },
      { icon: 'card', text: 'Card de partener Palas — acces la reducerile partenerilor din ansamblul Palas' },
    ],
    cta: 'Programează o vizită',
  },
}

export default function Coworking() {
  const { lang } = useLang()
  const t = T[lang]
  const pricingRef = useRef(null)

  useEffect(() => {
    const prev = document.title
    document.title = t.docTitle
    return () => {
      document.title = prev
    }
  }, [t.docTitle])

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
        title={t.heroTitle}
        lede={t.heroLede}
        primaryLabel={t.primaryLabel}
        secondaryLabel={t.secondaryLabel}
        slides={t.heroSlides}
        onSecondaryClick={scrollToPricing}
      />

      <section className="section" ref={pricingRef}>
        <SectionHeader eyebrow={t.priceEyebrow} title={t.priceTitle} description={t.priceDesc} />
        <div className="pricing-row" data-reveal>
          {t.plans.map((p) => (
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
        <SectionHeader eyebrow={t.inclEyebrow} title={t.inclTitle} />
        <InfoGrid items={t.amenities} />
      </section>

      <section className="section">
        <SectionHeader eyebrow={t.memEyebrow} title={t.memTitle} description={t.memDesc} />
        <InfoGrid items={t.memberBenefits} />
        <div className="compare-cta" data-reveal>
          <Link className="btn btn--primary" to="/book-a-visit" viewTransition>
            {t.cta}
          </Link>
        </div>
      </section>
    </>
  )
}
