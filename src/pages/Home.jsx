import Hero from '../components/Hero'
import CentralIdea from '../components/CentralIdea'
import ServicesSlider from '../components/ServicesSlider'
import VistaLounge from '../components/VistaLounge'
import Testimonials from '../components/Testimonials'
import BenefitsGroups from '../components/BenefitsGroups'
import Values from '../components/Values'
import Faq from '../components/Faq'
import BookVisit from '../components/BookVisit'

/** Static homepage — the built-in content used until Storyblok is connected. */
export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Palas Campus, Iași"
        title="Premium workspaces designed for business growth."
      />
      <CentralIdea />
      <ServicesSlider />
      <Values />
      <BenefitsGroups ctaLabel="Book a visit" />
      <VistaLounge />
      <Testimonials />
      <Faq />
      <BookVisit />
    </>
  )
}
