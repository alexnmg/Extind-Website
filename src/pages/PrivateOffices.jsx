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
import heroImg from '../assets/photos/coworking.jpg'
import pillarsImg from '../assets/photos/private-office.jpg'
import vistaImg from '../assets/photos/lounge.jpg'
import meetingImg from '../assets/photos/meeting-room.jpg'
import mask1 from '../assets/photos/corridor.jpg'
import mask4 from '../assets/photos/open-office.jpg'

const PILL_ICONS = [<ClockIcon key="c" />, <ChairIcon key="ch" />, <MeetingIcon key="m" />, <KitchenIcon key="k" />]
const SLIDE_ICONS = [<DeskIcon key="d" />, <ClockIcon key="c" />, <ChairIcon key="ch" />, <MeetingIcon key="m" />, <VistaIcon key="v" />]
const SLIDE_IMAGES = [pillarsImg, mask1, mask4, meetingImg, vistaImg]
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
    heroSlides: [
      { src: pillarsImg, caption: 'Private offices · Palas Campus', alt: 'Private office at Extind' },
      { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Extind coworking space' },
      { src: vistaImg, caption: 'Panoramic Lounge · 6th floor', alt: 'Vista Lounge' },
    ],
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
    heroTitle: 'Birouri private pentru echipe care construiesc ceva.',
    heroLede:
      'Nouă birouri private cu ușă încuiabilă, complet administrate, la etajul 6 din Palas Campus — configurate pentru echipe de 2–12 persoane, în aproximativ 400 mp de spații de lucru, întâlniri și relaxare. Gândite pentru concentrare, construite pentru colaborare și pregătite pentru clienții pe care vrei să îi impresionezi.',
    primaryLabel: 'Programează o vizită',
    secondaryLabel: 'Vezi ce este inclus →',
    pills: ['Acces 24/7', 'Scaune ergonomice & birouri reglabile', 'Săli de întâlniri', 'Bucătărie complet echipată'],
    heroSlides: [
      { src: pillarsImg, caption: 'Birouri private · Palas Campus', alt: 'Birou privat la Extind' },
      { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Spațiul de coworking Extind' },
      { src: vistaImg, caption: 'Lounge panoramic · etajul 6', alt: 'Vista Lounge' },
    ],
    benefitSlides: [
      {
        caption: 'Birouri private · Palas Campus',
        title: 'Complet mobilat, gata de lucru',
        description:
          'Birouri inteligente, cu ușă încuiabilă și configurații personalizabile, livrate complet mobilate. Mută-te cu laptopul și începe lucrul chiar din prima dimineață.',
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
    secTitle: 'Adaptat companiei tale',
    secDesc:
      'Pentru proiecte confidențiale, echipe corporate sau activități cu cerințe speciale, putem configura măsuri suplimentare de confidențialitate, acces și conectivitate. Fiecare solicitare este analizată împreună cu echipa ta, iar soluția tehnică, termenul și eventualele costuri suplimentare se confirmă înainte de contract.',
    securityMeasures: [
      { icon: 'privacy', text: 'Folie de intimitate pe suprafețele vitrate' },
      { icon: 'key', text: 'Acces controlat și, unde este necesar, acces nominal' },
      { icon: 'network', text: 'VLAN sau segment de rețea separat, după validare tehnică' },
      { icon: 'camera', text: 'Monitorizare video a accesului în zona de birouri' },
      { icon: 'log', text: 'Jurnalizarea accesului și intervale de acces configurate' },
      { icon: 'visitor', text: 'Reguli dedicate pentru primirea vizitatorilor' },
      { icon: 'reserved', text: 'Spațiu rezervat exclusiv echipei tale' },
      { icon: 'shield', text: 'NDA-uri, proceduri de confidențialitate sau cerințe de conformitate, analizate de la caz la caz' },
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
