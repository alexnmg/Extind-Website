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
  eyebrow = 'Spaces',
  title = 'Vista Lounge',
  note = 'A panoramic workspace above the city — designed for focus, conversation, and community.',
  cardTitle = 'Vista Lounge',
  cardSubtitle = 'The heart of the community',
  description = 'The panorama over the Palace of Culture becomes the backdrop for conversations, events, and professional relationships.',
  ctaLabel = 'Discover Vista Lounge',
  slides = defaultVistaSlides,
}) {
  return (
    <section className="section">
      <SectionHeader eyebrow={eyebrow} title={title} note={note} />
      <div className="vista__row">
        <div className="vista__card">
          <h3 className="vista__card-title">{cardTitle}</h3>
          <p className="vista__card-sub">{cardSubtitle}</p>
          <p className="vista__card-desc">{description}</p>
          <button type="button" className="text-button">
            <span>{ctaLabel}</span>
            <span>→</span>
          </button>
        </div>
        <ImageCardSlider className="vista__media" slides={slides} />
      </div>
    </section>
  )
}
