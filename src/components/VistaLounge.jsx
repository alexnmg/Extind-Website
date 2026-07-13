import SectionHeader from './SectionHeader'
import ImageCardSlider from './ImageCardSlider'
import vistaImg from '../assets/figma/vista.png'
import heroImg from '../assets/figma/hero.png'
import pillarsImg from '../assets/figma/pillars.png'

const defaultVistaSlides = [
  { src: vistaImg, caption: 'Panoramic Lounge · 7th floor', alt: 'Panoramic view over the Palace of Culture from Vista Lounge' },
  { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Extind coworking space at Palas Campus' },
  { src: pillarsImg, caption: 'Meeting & Focus Rooms', alt: 'Meeting room at Extind' },
]

export default function VistaLounge({
  eyebrow = 'Vista Lounge',
  title = 'Community & Events',
  cardLabel = 'Vista Lounge',
  cardTitle = 'A panoramic event space above the city',
  description = 'More than a lounge, Vista is where the Extind community comes together. Host informal meetings, connect with other professionals or attend curated business events—all overlooking the Palace of Culture.',
  ctaLabel = 'Discover Vista Lounge',
  slides = defaultVistaSlides,
}) {
  return (
    <section className="section">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="vista__row">
        <div className="vista__card">
          <p className="vista__card-label">{cardLabel}</p>
          <h3 className="vista__card-title">{cardTitle}</h3>
          <p className="vista__card-desc">{description}</p>
          <button type="button" className="text-button">
            <span>{ctaLabel}</span>
            <span className="text-button__arrow" aria-hidden="true" />
          </button>
        </div>
        <ImageCardSlider className="vista__media" slides={slides} />
      </div>
    </section>
  )
}
