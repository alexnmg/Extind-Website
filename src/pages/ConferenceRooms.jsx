import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import InfoGrid from '../components/InfoGrid'
import { useLang } from '../lib/i18n'
import pillarsImg from '../assets/photos/meeting-room.jpg'
import vistaImg from '../assets/photos/lounge.jpg'
import heroImg from '../assets/photos/coworking.jpg'

const T = {
  en: {
    docTitle: 'Conference Rooms — Extind',
    heroTitle: 'Rooms for the meetings that matter.',
    heroLede:
      'Meeting rooms and a conference room on the 6th floor of Palas Campus — bookable by the hour, matched to your format, and ready for the conversations you can’t leave to chance. For larger gatherings, the panoramic Vista Lounge is available too.',
    primaryLabel: 'Book a visit',
    secondaryLabel: "See what's included →",
    heroSlides: [
      { src: pillarsImg, caption: 'Meeting & Focus Rooms', alt: 'Meeting room at Extind' },
      { src: vistaImg, caption: 'Panoramic Lounge · 6th floor', alt: 'Vista Lounge' },
      { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Coworking space at Extind' },
    ],
    hostEyebrow: 'What you can host',
    hostTitle: 'Built for corporate conversations',
    hostDesc:
      'From a focused four-person session to a full board meeting — we match the room to the meeting, not the other way round.',
    hostable: [
      { icon: 'meeting', text: 'Management meetings and board sessions' },
      { icon: 'lightbulb', text: 'Workshops and strategy sessions' },
      { icon: 'presentation', text: 'Trainings and presentations' },
      { icon: 'handshake', text: 'Client and partner meetings' },
      { icon: 'interview', text: 'Interviews and hiring days' },
      { icon: 'coffee', text: 'Networking and business breakfasts' },
    ],
    inclEyebrow: 'Included',
    inclTitle: 'Everything the room needs',
    included: [
      { icon: 'wifi', text: '1 Gbps internet' },
      { icon: 'presentation', text: 'Screen and presentation setup' },
      { icon: 'sun', text: 'Natural light and a quiet, considered setting' },
      { icon: 'layout', text: 'Flexible layouts for the format you need' },
      { icon: 'coffee', text: 'Coffee, tea and filtered water' },
      { icon: 'support', text: 'Setup support from the team on site' },
      { icon: 'catering', text: 'Catering, on request' },
      { icon: 'calendar', text: 'Booking by reservation, per your package' },
    ],
    cta: 'Book a room',
  },
  ro: {
    docTitle: 'Săli de conferințe — Extind',
    heroTitle: 'Săli pentru întâlnirile care contează.',
    heroLede:
      'Săli de întâlniri și o sală de conferințe la etajul 6 din Palas Campus — rezervabile cu ora, adaptate formatului tău și pregătite pentru conversațiile pe care nu le poți lăsa la voia întâmplării. Pentru evenimente mai mari, ai la dispoziție și Vista Lounge, spațiul panoramic.',
    primaryLabel: 'Programează o vizită',
    secondaryLabel: 'Vezi ce este inclus →',
    heroSlides: [
      { src: pillarsImg, caption: 'Săli de întâlniri & focus', alt: 'Sală de întâlniri la Extind' },
      { src: vistaImg, caption: 'Lounge panoramic · etajul 6', alt: 'Vista Lounge' },
      { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Spațiul de coworking Extind' },
    ],
    hostEyebrow: 'Ce poți găzdui',
    hostTitle: 'Construite pentru conversații corporate',
    hostDesc:
      'De la o sesiune concentrată de patru persoane la o ședință de board completă — potrivim sala cu întâlnirea, nu invers.',
    hostable: [
      { icon: 'meeting', text: 'Ședințe de management și board' },
      { icon: 'lightbulb', text: 'Workshopuri și sesiuni de strategie' },
      { icon: 'presentation', text: 'Traininguri și prezentări' },
      { icon: 'handshake', text: 'Întâlniri cu clienți și parteneri' },
      { icon: 'interview', text: 'Interviuri și zile de recrutare' },
      { icon: 'coffee', text: 'Networking și mic-dejunuri de business' },
    ],
    inclEyebrow: 'Incluse',
    inclTitle: 'Tot ce are nevoie sala',
    included: [
      { icon: 'wifi', text: 'Internet 1 Gbps' },
      { icon: 'presentation', text: 'Ecran și echipare pentru prezentări' },
      { icon: 'sun', text: 'Lumină naturală și un cadru liniștit, îngrijit' },
      { icon: 'layout', text: 'Configurații flexibile pentru formatul de care ai nevoie' },
      { icon: 'coffee', text: 'Cafea, ceai și apă filtrată' },
      { icon: 'support', text: 'Suport la instalare din partea echipei de la fața locului' },
      { icon: 'catering', text: 'Catering, la cerere' },
      { icon: 'calendar', text: 'Rezervare conform pachetului tău' },
    ],
    cta: 'Rezervă o sală',
  },
}

export default function ConferenceRooms() {
  const { lang } = useLang()
  const t = T[lang]
  const detailsRef = useRef(null)

  useEffect(() => {
    const prev = document.title
    document.title = t.docTitle
    return () => {
      document.title = prev
    }
  }, [t.docTitle])

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
        title={t.heroTitle}
        lede={t.heroLede}
        primaryLabel={t.primaryLabel}
        secondaryLabel={t.secondaryLabel}
        slides={t.heroSlides}
        onSecondaryClick={scrollToDetails}
      />

      <section className="section">
        <SectionHeader eyebrow={t.hostEyebrow} title={t.hostTitle} description={t.hostDesc} />
        <InfoGrid items={t.hostable} />
      </section>

      <section className="section" ref={detailsRef}>
        <SectionHeader eyebrow={t.inclEyebrow} title={t.inclTitle} />
        <InfoGrid items={t.included} />
        <div className="compare-cta" data-reveal>
          <Link className="btn btn--primary" to="/book-a-visit" viewTransition>
            {t.cta}
          </Link>
        </div>
      </section>
    </>
  )
}
