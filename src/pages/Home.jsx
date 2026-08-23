import { useEffect } from 'react'
import Hero from '../components/Hero'
import CentralIdea from '../components/CentralIdea'
import ServicesSlider from '../components/ServicesSlider'
import VistaLounge from '../components/VistaLounge'
import Testimonials from '../components/Testimonials'
import BenefitsGroups from '../components/BenefitsGroups'
import Comparison from '../components/Comparison'
import Values from '../components/Values'
import Faq from '../components/Faq'
import { homeFaq } from '../data/faq'
import BookVisit from '../components/BookVisit'
import { useLang } from '../lib/i18n'

const T = {
  en: {
    docTitle: 'Extind — Spaces to grow',
    heroTitle: 'Premium workspaces designed for business growth.',
    centralIdea:
      'EXTIND gives you the experience of a premium corporate HQ — without the investment, rigidity and administration of a conventional office. A work-ready space in Palas Campus, adaptable for confidential projects, high-level visits and special security requirements, in a community that’s present but never intrusive.',
    benefitsCta: 'Book a visit',
  },
  ro: {
    docTitle: 'Extind — Spaces to grow',
    heroTitle: 'Spații de lucru premium, create pentru creșterea afacerii tale.',
    centralIdea:
      'EXTIND îți oferă experiența unui sediu corporate premium — fără investițiile, rigiditatea și administrarea unui birou convențional. Un spațiu gata de lucru în Palas Campus, adaptabil pentru proiecte confidențiale, vizite la nivel înalt și cerințe speciale de securitate, într-o comunitate prezentă, dar niciodată intruzivă.',
    benefitsCta: 'Programează o vizită',
  },
}

/** Static homepage — the built-in content used until Storyblok is connected. */
export default function Home() {
  const { lang } = useLang()
  const t = T[lang]
  useEffect(() => {
    document.title = t.docTitle
  }, [t.docTitle])
  return (
    <>
      <Hero eyebrow="Palas Campus, Iași" title={t.heroTitle} secondaryTo="/vista-lounge" />
      <CentralIdea description={t.centralIdea} />
      <ServicesSlider />
      <Values />
      <Comparison />
      <BenefitsGroups ctaLabel={t.benefitsCta} />
      <VistaLounge />
      <Testimonials />
      <Faq items={homeFaq} columns={2} moreHref="/faq" />
      <BookVisit />
    </>
  )
}
