import ImageCardSlider from './ImageCardSlider'
import heroImg from '../assets/figma/hero.png'
import pillarsImg from '../assets/figma/pillars.png'
import vistaImg from '../assets/figma/vista.png'

const defaultHeroSlides = [
  { src: heroImg, caption: 'Coworking · Palas Campus', alt: 'Extind coworking space at Palas Campus' },
  { src: pillarsImg, caption: 'Meeting & Focus Rooms', alt: 'Meeting room at Extind' },
  { src: vistaImg, caption: 'Panoramic Lounge · 7th floor', alt: 'Panoramic view from Vista Lounge' },
]

export default function Hero({
  eyebrow = 'Coworking - private offices - Meeting rooms',
  title = 'Thoughtfully designed places for people who care about their work.',
  lede = 'Thoughtfully designed workspaces, genuine hospitality and a community built around people who enjoy what they do—all in the heart of Iași.',
  primaryLabel = 'Find the right space',
  secondaryLabel = 'Discover our spaces →',
  slides = defaultHeroSlides,
}) {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">{eyebrow}</p>
        <h1 className="hero__title">{title}</h1>
        <p className="hero__lede">{lede}</p>
        <div className="hero__buttons">
          <button type="button" className="btn btn--primary">
            {primaryLabel}
          </button>
          <button type="button" className="btn btn--ghost">
            {secondaryLabel}
          </button>
        </div>
      </div>
      <ImageCardSlider className="hero__media" slides={slides} />
    </section>
  )
}
