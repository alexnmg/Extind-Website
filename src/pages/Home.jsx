import Hero from '../components/Hero'
import CentralIdea from '../components/CentralIdea'
import ServicesSlider from '../components/ServicesSlider'
import VistaLounge from '../components/VistaLounge'
import Testimonials from '../components/Testimonials'
import Memberships from '../components/Memberships'
import Values from '../components/Values'
import Faq from '../components/Faq'
import BookVisit from '../components/BookVisit'

/** Static homepage — the built-in content used until Storyblok is connected. */
export default function Home() {
  return (
    <>
      <Hero />
      <CentralIdea />
      <ServicesSlider scrub />
      <Values />
      <Memberships />
      <VistaLounge scrub />
      <Testimonials />
      <Faq />
      <BookVisit />
    </>
  )
}
