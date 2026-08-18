import Hero from '../components/Hero'
import CentralIdea from '../components/CentralIdea'
import ServicesStack from '../components/ServicesStack'
import VistaLounge from '../components/VistaLounge'
import Testimonials from '../components/Testimonials'
import BenefitsGroups from '../components/BenefitsGroups'
import Comparison from '../components/Comparison'
import Values from '../components/Values'
import Faq from '../components/Faq'
import { homeFaq } from '../data/faq'
import BookVisit from '../components/BookVisit'

/** Static homepage — the built-in content used until Storyblok is connected. */
export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Palas Campus, Iași"
        title="Premium workspaces designed for business growth."
      />
      <CentralIdea description="EXTIND gives you the experience of a premium corporate HQ — without the investment, rigidity and administration of a conventional office. A work-ready space in Palas Campus, adaptable for confidential projects, high-level visits and special security requirements, in a community that’s present but never intrusive." />
      <ServicesStack />
      <Values />
      <Comparison />
      <BenefitsGroups ctaLabel="Book a visit" />
      <VistaLounge />
      <Testimonials />
      <Faq items={homeFaq} columns={2} moreHref="/faq" />
      <BookVisit />
    </>
  )
}
