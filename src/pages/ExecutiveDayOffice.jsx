import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import InfoGrid from '../components/InfoGrid'
import { useLang } from '../lib/i18n'
import pillarsImg from '../assets/photos/exec-slide-1.jpg'
import vistaImg from '../assets/photos/lounge.jpg'
import heroImg from '../assets/photos/coworking.jpg'

const T = {
  en: {
    docTitle: 'Executive Day Office — Extind',
    heroTitle: 'A premium office for corporate visits.',
    heroLede:
      'When your company hosts an important partner, an international delegation or your management team, the space becomes part of the impression you make. For one to three days, EXTIND prepares a private, representative and fully functional office — with meeting-room access, hospitality and a setup matched to your schedule.',
    primaryLabel: 'Prepare a corporate visit',
    secondaryLabel: "See what's included →",
    heroSlides: [
      { src: pillarsImg, caption: 'Private office · Palas Campus', alt: 'Private office at Extind' },
      { src: vistaImg, caption: 'Panoramic Lounge · 6th floor', alt: 'Vista Lounge' },
      { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Coworking space at Extind' },
    ],
    useEyebrow: "When you'd use it",
    useTitle: 'For the moments that matter most',
    useDesc:
      "Not a day pass, and not a lease — a representative office prepared for the days your company can't leave to chance.",
    useCases: [
      { icon: 'handshake', text: 'Strategic partner, investor or key-client visits' },
      { icon: 'briefcase', text: 'Temporary CEO or management presence' },
      { icon: 'search', text: 'Audits and due diligence' },
      { icon: 'interview', text: 'Interviews for senior roles' },
      { icon: 'globe', text: 'Board meetings, negotiations or international delegations' },
      { icon: 'shield', text: 'Projects that need discretion and a representative setting' },
    ],
    prepEyebrow: 'What we prepare',
    prepTitle: 'Configured around your visit',
    prepDesc:
      'Every request is confirmed before your dates — tell us the occasion and we build the setup around it.',
    configurable: [
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
    ],
    calloutLabel: 'What we actually offer',
    calloutText:
      'We don’t sell the temporary use of a room. We sell the certainty that an important meeting takes place in a flawless setting — without your company permanently renting and running an HQ of this calibre.',
    calloutCta: 'Prepare a corporate visit',
  },
  ro: {
    docTitle: 'Executive Day Office — Extind',
    heroTitle: 'Un birou premium pentru zilele care contează',
    heroLede:
      'Vizita unui partener important, o delegație internațională, o întâlnire a echipei de management sau un eveniment intern merită un cadru pe măsură.\n\nPentru o zi sau pentru întreaga durată a vizitei ori a proiectului, EXTIND îți pregătește un birou privat, reprezentativ și complet funcțional, cu acces la săli de întâlniri, servicii de ospitalitate și o configurație adaptată programului companiei tale. Ai imaginea și funcționalitatea unui sediu corporate premium, exact atunci când ai nevoie de ele.',
    primaryLabel: 'Pregătește o vizită corporate',
    secondaryLabel: 'Vezi ce este inclus →',
    heroSlides: [
      { src: pillarsImg, caption: 'Birou privat · Palas Campus', alt: 'Birou privat la Extind' },
      { src: vistaImg, caption: 'Lounge panoramic · etajul 6', alt: 'Vista Lounge' },
      { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Spațiul de coworking Extind' },
    ],
    useEyebrow: 'Când îl folosești',
    useTitle: 'Workshopuri, sesiuni de strategie și evenimente interne',
    useDesc:
      'Mai mult decât un Day Pass: un birou privat, pregătit în detaliu pentru întâlnirile și vizitele importante ale companiei tale.',
    useCases: [
      { icon: 'handshake', text: 'Vizite ale partenerilor strategici, investitorilor sau clienților-cheie' },
      { icon: 'briefcase', text: 'Evenimente interne sau lucru de la birou pentru cei în regim hybrid' },
      { icon: 'search', text: 'Audituri și due diligence' },
      { icon: 'interview', text: 'Interviuri pentru roluri senior' },
      { icon: 'globe', text: 'Ședințe de board, negocieri sau delegații internaționale' },
      { icon: 'shield', text: 'Proiecte care cer discreție și un cadru reprezentativ' },
    ],
    prepEyebrow: 'Ce pregătim',
    prepTitle: 'Configurat în jurul vizitei tale',
    prepDesc:
      'Fiecare solicitare se confirmă înainte de datele vizitei. Spune-ne ocazia și construim soluția în jurul ei.',
    configurable: [
      { icon: 'desk', text: 'Un birou privat pregătit exclusiv pentru tine' },
      { icon: 'meeting', text: 'O sală de întâlniri dedicată' },
      { icon: 'key', text: 'Acces controlat' },
      { icon: 'config', text: 'Configurarea mobilierului' },
      { icon: 'coffee', text: 'Apă, cafea, ceai și servicii de ospitalitate' },
      { icon: 'catering', text: 'Catering, la cerere' },
      { icon: 'visitor', text: 'Suport pentru primirea oaspeților' },
      { icon: 'parking', text: 'Parcare, în funcție de disponibilitate și confirmare' },
      { icon: 'sign', text: 'Semnalistică temporară, unde este permis' },
      { icon: 'network', text: 'Cerințe suplimentare de confidențialitate sau conectivitate' },
    ],
    calloutLabel: 'Ce oferim de fapt',
    calloutText:
      'Primești un birou pregătit în detaliu pentru compania și invitații tăi, fără să închiriezi și să administrezi permanent un sediu propriu.',
    calloutCta: 'Rezervă o vizită',
  },
}

export default function ExecutiveDayOffice() {
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
        <SectionHeader eyebrow={t.useEyebrow} title={t.useTitle} description={t.useDesc} />
        <InfoGrid items={t.useCases} />
      </section>

      <section className="section" ref={detailsRef}>
        <SectionHeader eyebrow={t.prepEyebrow} title={t.prepTitle} description={t.prepDesc} />
        <InfoGrid items={t.configurable} />
      </section>

      <section className="section">
        <div className="callout" data-reveal>
          <span className="callout__label">{t.calloutLabel}</span>
          <p className="callout__text">{t.calloutText}</p>
          <Link className="btn btn--primary" to="/book-a-visit" viewTransition>
            {t.calloutCta}
          </Link>
        </div>
      </section>
    </>
  )
}
