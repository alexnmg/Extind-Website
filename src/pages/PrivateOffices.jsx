import { useEffect } from 'react'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import ServicesSlider from '../components/ServicesSlider'
import BenefitsGroups from '../components/BenefitsGroups'
import Comparison from '../components/Comparison'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import BookVisit from '../components/BookVisit'
import InfoGrid from '../components/InfoGrid'
import { useLang } from '../lib/i18n'
import { privateOfficeFaq } from '../data/faq'
import {
  ClockIcon,
  ChairIcon,
  MeetingIcon,
  KitchenIcon,
  DeskIcon,
  VistaIcon,
} from '../components/PillIcons'
const vistaImg = 'lounge'
const meetingImg = 'meeting-room'
const mask1 = 'corridor'
const mask4 = 'open-office'

/* Hero slider photographs, in the order they appear. The client picked these
 * eight out of the September 2026 shoot — the trailing comment on each line is
 * its number in the Figma photo library, so a slide can be traced back to the
 * original file.
 *
 * The order is shared by both languages rather than repeated in each, because
 * the two caption lists below are matched to it by position: repeating eight
 * filenames twice is exactly how a Romanian caption ends up on an English
 * slide's photograph. */
const HERO_PHOTOS = [
  'private-office-glass', // Foto_033 — glass walls, Palatul Culturii beyond
  'private-office-room', // Foto_029 — the full room, park view
  'private-office-art', // Foto_017 — desks, monitors, artwork
  'private-office-desks', // Foto_009 — desks and city view
  'private-office-palas', // Foto_034 — desk facing Palatul Culturii
  'private-office-storage', // Foto_027 — artwork above the storage unit
  'private-office-screen', // Foto_011 — presentation screen
  'private-office-detail', // Foto_012 — vase and lamp, close up
]

/* Pairs each caption with the photo at the same index. */
const heroSlides = (captions) => captions.map((c, i) => ({ src: HERO_PHOTOS[i], ...c }))

const PILL_ICONS = [<ClockIcon key="c" />, <ChairIcon key="ch" />, <MeetingIcon key="m" />, <KitchenIcon key="k" />]
const SLIDE_ICONS = [<DeskIcon key="d" />, <ClockIcon key="c" />, <ChairIcon key="ch" />, <MeetingIcon key="m" />, <VistaIcon key="v" />]
/* The background of the block under the hero. It is a crossfade, not a single
   image — one photograph per benefit slide — so only the first is swapped: that
   is the one on screen when the section arrives, and the other four still belong
   to the slides they illustrate. */
const SLIDE_IMAGES = ['private-office-wide', mask1, mask4, meetingImg, vistaImg]
const SLIDE_VARIANTS = ['light', 'cream', 'dark', 'light', 'cream']

const T = {
  en: {
    docTitle: 'Private Offices — Extind',
    heroTitle: 'Private offices for teams with something to build.',
    heroLede:
      'Nine lockable, fully serviced private offices on the 6th floor of Palas Campus — configured for teams of 2–12, in around 400 sqm of work, meeting and relaxation space. Designed for focus, built for collaboration, and ready for the clients you want to impress.',
    primaryLabel: 'Book a visit',
    secondaryLabel: "See what's included →",
    pills: ['24/7 access', 'Ergonomic chairs & adjustable desks', 'Meeting rooms', 'Fully equipped kitchen'],
    heroSlides: heroSlides([
      { caption: 'Private offices · 6th floor', alt: 'A glass-walled private office with the Palace of Culture beyond' },
      { caption: 'Private offices · Palas Campus', alt: 'A furnished Extind private office looking out over the park' },
      { caption: 'Private offices · Palas Campus', alt: 'Desks, monitors and a painting in an Extind private office' },
      { caption: 'Private offices · Palas Campus', alt: 'Desks with table lamps beside a window over Iași' },
      { caption: 'View of the Palace of Culture · 6th floor', alt: 'A desk facing the Palace of Culture in Iași' },
      { caption: 'Private offices · Palas Campus', alt: 'A painting above the storage unit in a private office' },
      { caption: 'Meetings & presentations · 6th floor', alt: 'A private office with a wall-mounted presentation screen' },
      { caption: 'Details · Palas Campus', alt: 'A ceramic vase and a table lamp on a wooden ledge' },
    ]),
    benefitSlides: [
      {
        caption: 'Private offices · Palas Campus',
        title: 'Fully furnished, ready to work',
        description:
          'Smart lockable offices with customisable layouts, delivered fully furnished. Move in with your laptop and start working the same morning.',
      },
      {
        caption: 'Secure access · Any hour',
        title: '24/7 secure access',
        description:
          'Your team sets its own hours. Private office members come and go around the clock with secure access to the building and their office.',
      },
      {
        caption: 'Ergonomic workstations',
        title: 'Desks and chairs built for long days',
        description:
          'Ergonomic desks and premium task chairs as standard, with height-adjustable desks available on request for anyone who prefers to stand.',
      },
      {
        caption: 'Meeting & Focus Rooms',
        title: 'Complimentary meeting room hours',
        description:
          'Every private office includes meeting room hours each month, plus phone booths for private calls and reception to welcome your clients.',
      },
      {
        caption: 'Panoramic Lounge · 6th floor',
        title: 'Vista Lounge and a business community',
        description:
          'Step away from your office into a panoramic lounge, beautifully designed coworking spaces, and a calendar of community and networking evenings.',
      },
    ],
    secEyebrow: 'Security & confidentiality',
    secTitle: 'Shaped around your company',
    secDesc:
      'For confidential projects, corporate teams or work with special requirements, we can configure additional privacy, access and connectivity measures. Every request is reviewed with your team, and the technical solution, timeline and any additional cost are confirmed before we contract.',
    securityMeasures: [
      { icon: 'privacy', text: 'Privacy film on glazed surfaces' },
      { icon: 'key', text: 'Controlled access and, where needed, named entry' },
      { icon: 'network', text: 'A separate VLAN or network segment, after technical validation' },
      { icon: 'camera', text: 'Video monitoring of access to the office area' },
      { icon: 'log', text: 'Access logging and configured access windows' },
      { icon: 'visitor', text: 'Dedicated rules for receiving visitors' },
      { icon: 'reserved', text: 'Space reserved exclusively for your team' },
      { icon: 'shield', text: 'NDAs, confidentiality procedures or compliance requirements, reviewed case by case' },
    ],
  },
  ro: {
    docTitle: 'Birouri private — Extind',
    heroTitle: 'Birouri private gândite pentru focus și colaborare',
    heroLede:
      '9 birouri private, securizate individual, complet administrate, la etajul 6 din Palas Campus. Configurate pentru echipe de 2–12 persoane, în peste 400 mp de spații de lucru, întâlniri și relaxare, gândite pentru productivitate și construite pentru colaborare.',
    primaryLabel: 'Programează o vizită',
    secondaryLabel: 'Vezi ce este inclus →',
    pills: ['Acces 24/7', 'Mobilier ergonomic', 'Săli de întâlniri', 'Bucătărie complet echipată'],
    heroSlides: heroSlides([
      { caption: 'Birouri private · etajul 6', alt: 'Birou privat cu pereți de sticlă și Palatul Culturii în fundal' },
      { caption: 'Birouri private · Palas Campus', alt: 'Birou privat Extind, mobilat, cu vedere spre parc' },
      { caption: 'Birouri private · Palas Campus', alt: 'Birouri, monitoare și o lucrare de artă într-un birou privat Extind' },
      { caption: 'Birouri private · Palas Campus', alt: 'Birouri cu veioze, lângă fereastra cu vedere spre Iași' },
      { caption: 'Vedere spre Palatul Culturii · etajul 6', alt: 'Birou cu vedere spre Palatul Culturii din Iași' },
      { caption: 'Birouri private · Palas Campus', alt: 'Lucrare de artă deasupra dulapului dintr-un birou privat' },
      { caption: 'Întâlniri & prezentări · etajul 6', alt: 'Birou privat cu ecran de prezentare montat pe perete' },
      { caption: 'Detalii · Palas Campus', alt: 'Vază ceramică și veioză pe un raft de lemn' },
    ]),
    benefitSlides: [
      {
        caption: 'Birouri private · Palas Campus',
        title: 'Complet mobilat, gata de lucru',
        description:
          'Birouri private, cu acces controlat, mobilier inclus și configurații adaptabile nevoilor echipei tale. Vii cu laptopul și poți începe lucrul chiar din prima zi.',
      },
      {
        caption: 'Acces securizat · La orice oră',
        title: 'Acces securizat 24/7',
        description:
          'Echipa ta își stabilește singură programul. Membrii birourilor private intră și ies oricând, cu acces securizat în clădire și în biroul lor.',
      },
      {
        caption: 'Stații de lucru ergonomice',
        title: 'Birouri și scaune făcute pentru zile lungi',
        description:
          'Birouri ergonomice și scaune premium în dotarea standard, cu birouri reglabile pe înălțime disponibile la cerere pentru cei care preferă să lucreze în picioare.',
      },
      {
        caption: 'Săli de întâlniri & focus',
        title: 'Ore incluse în sălile de întâlniri',
        description:
          'Fiecare birou privat include lunar ore în sălile de întâlniri, plus cabine pentru apeluri private și recepție pentru primirea clienților tăi.',
      },
      {
        caption: 'Lounge panoramic · etajul 6',
        title: 'Vista Lounge și o comunitate de business',
        description:
          'Ieși din birou într-un lounge panoramic, spații de coworking atent amenajate și un calendar de seri de comunitate și networking.',
      },
    ],
    secEyebrow: 'Securitate & confidențialitate',
    secTitle: 'Când cerințele sunt stricte, spațiul trebuie să țină pasul',
    secDesc:
      'Unele proiecte au nevoie de mai mult decât un birou. Pentru echipele care lucrează cu informații sensibile, proceduri interne sau cerințe tehnice speciale, putem configura măsuri suplimentare de control al accesului, confidențialitate și conectivitate.\n\nAnalizăm solicitarea împreună cu echipa ta și îți prezentăm, înainte de contract, o soluție clară, cu măsurile disponibile, termenul de implementare și costurile aferente.',
    securityMeasures: [
      { icon: 'privacy', text: 'Folie de intimitate pe suprafețele vitrate' },
      { icon: 'key', text: 'Acces controlat și, unde este necesar, acces nominal' },
      { icon: 'network', text: 'VLAN sau segment de rețea separat, după validare tehnică' },
      { icon: 'camera', text: 'Monitorizare video a accesului în zona de birouri' },
      { icon: 'log', text: 'Jurnalizarea accesului și intervale de acces configurate' },
      { icon: 'visitor', text: 'Reguli dedicate pentru primirea vizitatorilor' },
      { icon: 'reserved', text: 'La cerere, configurații pregătite pentru audituri și certificări ISO' },
      { icon: 'shield', text: 'NDA-uri, proceduri de confidențialitate, analizate de la caz la caz' },
    ],
  },
}

export default function PrivateOffices() {
  const { lang } = useLang()
  const t = T[lang]

  useEffect(() => {
    const prev = document.title
    document.title = t.docTitle
    return () => {
      document.title = prev
    }
  }, [t.docTitle])

  // The navbar is sticky, so offset the target by its height plus a margin
  const scrollToIncluded = () => {
    const target = document.getElementById('included')
    if (!target) return
    const navH = document.querySelector('.navbar-container')?.offsetHeight ?? 0
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const heroPills = t.pills.map((label, i) => ({ icon: PILL_ICONS[i], label }))

  // Five benefits drawn from the private office pricing card. No ctaLabel, so
  // the slider renders without a button; an icon stands in for the text label.
  const benefitSlides = t.benefitSlides.map((slide, i) => ({
    ...slide,
    image: SLIDE_IMAGES[i],
    icon: SLIDE_ICONS[i],
    variant: SLIDE_VARIANTS[i],
  }))

  return (
    <>
      <Hero
        title={t.heroTitle}
        lede={t.heroLede}
        primaryLabel={t.primaryLabel}
        secondaryLabel={t.secondaryLabel}
        pills={heroPills}
        slides={t.heroSlides}
        onSecondaryClick={scrollToIncluded}
      />
      <ServicesSlider slides={benefitSlides} />
      <BenefitsGroups id="included" />
      <section className="section">
        <SectionHeader eyebrow={t.secEyebrow} title={t.secTitle} description={t.secDesc} />
        <InfoGrid items={t.securityMeasures} />
      </section>
      <Comparison />
      <Testimonials />
      <Faq items={privateOfficeFaq} moreHref="/faq" />
      <BookVisit />
    </>
  )
}
