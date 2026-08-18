import { useEffect } from 'react'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import ServicesSlider from '../components/ServicesSlider'
import BenefitsGroups from '../components/BenefitsGroups'
import Comparison from '../components/Comparison'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import { privateOfficeFaq } from '../data/faq'
import BookVisit from '../components/BookVisit'
import InfoGrid from '../components/InfoGrid'
import {
  ClockIcon,
  ChairIcon,
  MeetingIcon,
  KitchenIcon,
  DeskIcon,
  VistaIcon,
} from '../components/PillIcons'
import heroImg from '../assets/figma/hero.png'
import pillarsImg from '../assets/figma/pillars.png'
import vistaImg from '../assets/figma/vista.png'
import mask1 from '../assets/logo-anim/mask-1.jpg'
import mask4 from '../assets/logo-anim/mask-4.jpg'

const heroPills = [
  { icon: <ClockIcon />, label: '24/7 access' },
  { icon: <ChairIcon />, label: 'Ergonomic chairs & adjustable desks' },
  { icon: <MeetingIcon />, label: 'Meeting rooms' },
  { icon: <KitchenIcon />, label: 'Fully equipped kitchen' },
]

const securityMeasures = [
  { icon: 'privacy', text: 'Privacy film on glazed surfaces' },
  { icon: 'key', text: 'Controlled access and, where needed, named entry' },
  { icon: 'network', text: 'A separate VLAN or network segment, after technical validation' },
  { icon: 'camera', text: 'Video monitoring of access to the office area' },
  { icon: 'log', text: 'Access logging and configured access windows' },
  { icon: 'visitor', text: 'Dedicated rules for receiving visitors' },
  { icon: 'reserved', text: 'Space reserved exclusively for your team' },
  { icon: 'shield', text: 'NDAs, confidentiality procedures or compliance requirements, reviewed case by case' },
]

const heroSlides = [
  { src: pillarsImg, caption: 'Private offices · Palas Campus', alt: 'Private office at Extind' },
  { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Extind coworking space' },
  { src: vistaImg, caption: 'Panoramic Lounge · 6th floor', alt: 'Vista Lounge' },
]

// Five benefits drawn from the private office pricing card. No ctaLabel, so
// the slider renders without a button; an icon stands in for the text label.
const benefitSlides = [
  {
    image: pillarsImg,
    caption: 'Private offices · Palas Campus',
    icon: <DeskIcon />,
    title: 'Fully furnished, ready to work',
    description:
      'Smart lockable offices with customisable layouts, delivered fully furnished. Move in with your laptop and start working the same morning.',
    variant: 'light',
  },
  {
    image: mask1,
    caption: 'Secure access · Any hour',
    icon: <ClockIcon />,
    title: '24/7 secure access',
    description:
      'Your team sets its own hours. Private office members come and go around the clock with secure access to the building and their office.',
    variant: 'cream',
  },
  {
    image: mask4,
    caption: 'Ergonomic workstations',
    icon: <ChairIcon />,
    title: 'Desks and chairs built for long days',
    description:
      'Ergonomic desks and premium task chairs as standard, with height-adjustable desks available on request for anyone who prefers to stand.',
    variant: 'dark',
  },
  {
    image: heroImg,
    caption: 'Meeting & Focus Rooms',
    icon: <MeetingIcon />,
    title: 'Complimentary meeting room hours',
    description:
      'Every private office includes meeting room hours each month, plus phone booths for private calls and reception to welcome your clients.',
    variant: 'light',
  },
  {
    image: vistaImg,
    caption: 'Panoramic Lounge · 6th floor',
    icon: <VistaIcon />,
    title: 'Vista Lounge and a business community',
    description:
      'Step away from your office into a panoramic lounge, beautifully designed coworking spaces, and a calendar of community and networking evenings.',
    variant: 'cream',
  },
]

export default function PrivateOffices() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Private Offices — Extind'
    return () => {
      document.title = prev
    }
  }, [])

  // The navbar is sticky, so offset the target by its height plus a margin
  const scrollToIncluded = () => {
    const target = document.getElementById('included')
    if (!target) return
    const navH = document.querySelector('.navbar-container')?.offsetHeight ?? 0
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      <Hero
        title="Private offices for teams with something to build."
        lede="Nine lockable, fully serviced private offices on the 6th floor of Palas Campus — configured for teams of 2–12, in around 400 sqm of work, meeting and relaxation space. Designed for focus, built for collaboration, and ready for the clients you want to impress."
        primaryLabel="Book a visit"
        secondaryLabel="See what's included →"
        pills={heroPills}
        slides={heroSlides}
        onSecondaryClick={scrollToIncluded}
      />
      <ServicesSlider slides={benefitSlides} />
      <BenefitsGroups id="included" />
      <section className="section">
        <SectionHeader
          eyebrow="Security & confidentiality"
          title="Shaped around your company"
          description="For confidential projects, corporate teams or work with special requirements, we can configure additional privacy, access and connectivity measures. Every request is reviewed with your team, and the technical solution, timeline and any additional cost are confirmed before we contract."
        />
        <InfoGrid items={securityMeasures} />
      </section>
      <Comparison />
      <Testimonials />
      <Faq items={privateOfficeFaq} moreHref="/faq" />
      <BookVisit />
    </>
  )
}
