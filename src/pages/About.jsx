import { useEffect } from 'react'
import SectionHeader from '../components/SectionHeader'
import LogoHero from '../components/LogoHero'
import Cta from '../components/Cta'
import vistaImg from '../assets/figma/vista.png'
import heroImg from '../assets/figma/hero.png'
import pillarsImg from '../assets/figma/pillars.png'
import mask1 from '../assets/logo-anim/mask-1.jpg'
import mask2 from '../assets/logo-anim/mask-2.jpg'
import mask3 from '../assets/logo-anim/mask-3.jpg'
import mask4 from '../assets/logo-anim/mask-4.jpg'
import mask5 from '../assets/logo-anim/mask-5.jpg'

const values = [
  {
    number: '01',
    title: 'Business-first hospitality',
    desc: 'We anticipate the needs of our members — from welcoming clients at reception to preparing rooms before meetings — so every workday runs smoothly.',
    variant: 'light',
  },
  {
    number: '02',
    title: 'Co-creation & growth',
    desc: 'We grow together with our community: events, introductions and shared knowledge that help companies build meaningful business relationships.',
    variant: 'forest',
  },
  {
    number: '03',
    title: 'Kind by default',
    desc: 'We keep the space mindful and respectful. Great work needs calm, consideration and people who genuinely enjoy being here.',
    variant: 'dark',
  },
]

// Placeholder roster and photos — swap in the real team when ready
const team = [
  { name: 'Ana Popescu', role: 'Community Manager', photo: mask1 },
  { name: 'Mihai Ionescu', role: 'Operations Lead', photo: mask2 },
  { name: 'Ioana Marin', role: 'Member Experience', photo: mask3 },
  { name: 'Andrei Stancu', role: 'Founder', photo: mask4 },
]

// Latest-posts gallery — placeholder tiles until a live Instagram feed is wired
const posts = [heroImg, mask2, pillarsImg, mask5, vistaImg, mask3]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.25 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.36.47 2.43.05 1.07.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43-.25.66-.6 1.22-1.15 1.77-.55.55-1.11.9-1.77 1.15-.64.25-1.36.42-2.43.47-1.07.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.25-.66.6-1.22 1.15-1.77.55-.55 1.11-.9 1.77-1.15.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68Zm5.34-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
    </svg>
  )
}

export default function About() {
  useEffect(() => {
    const prev = document.title
    document.title = 'About — Extind'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <>
      <section className="about-hero">
        <LogoHero />
        <div className="about-hero__bottom">
          <div className="about-hero__text">
            <p className="about-hero__eyebrow">About Extind</p>
            <p className="about-hero__lede">
              Extind was created for companies and professionals who care about where and how they
              work. From Palas Campus, Iași, we combine thoughtfully designed offices, genuine
              hospitality and a curated business community — so teams can focus on the work that
              matters.
            </p>
          </div>
          <div className="about-media">
            <img src={vistaImg} alt="Vista Lounge overlooking the Palace of Culture" />
            <span className="caption-pill about-media__caption">Palas Campus · Iași</span>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow="Our Values" title="What we stand for" />
        <div className="cards-row-3">
          {values.map(({ number, title, desc, variant }) => (
            <article key={number} className={`idea-card idea-card--${variant}`}>
              <p className="idea-card__number">{number}</p>
              <h3 className="idea-card__title">{title}</h3>
              <p className="idea-card__desc">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow="The Team" title="The people behind Extind" />
        <div className="team-grid">
          {team.map(({ name, role, photo }) => (
            <article key={name} className="team-card">
              <img className="team-card__photo" src={photo} alt={name} loading="lazy" />
              <div className="team-card__meta">
                <p className="team-card__name">{name}</p>
                <p className="team-card__role">{role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow="Instagram" title="Latest from @extind" />
        <div className="social-grid">
          {posts.map((src, i) => (
            <a key={i} className="social-grid__item" href="#" aria-label="Open post on Instagram">
              <img src={src} alt="" loading="lazy" />
              <span className="social-grid__overlay" aria-hidden="true">
                <InstagramIcon />
              </span>
            </a>
          ))}
        </div>
      </section>

      <Cta />
    </>
  )
}
