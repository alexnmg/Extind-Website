import { useEffect } from 'react'
import SectionHeader from '../components/SectionHeader'
import Cta from '../components/Cta'
import vistaImg from '../assets/figma/vista.png'
import social1 from '../assets/logo-anim/mask-1.jpg'
import social2 from '../assets/logo-anim/mask-2.jpg'
import social3 from '../assets/logo-anim/mask-3.jpg'
import social4 from '../assets/logo-anim/mask-4.jpg'
import social5 from '../assets/logo-anim/mask-5.jpg'

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

// Placeholder roster — swap in the real team when ready
const team = [
  { name: 'Ana Popescu', role: 'Community Manager' },
  { name: 'Mihai Ionescu', role: 'Operations Lead' },
  { name: 'Ioana Marin', role: 'Member Experience' },
  { name: 'Andrei Stancu', role: 'Founder' },
]

const socials = [social1, social2, social3, social4, social5]

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
        <p className="about-hero__eyebrow">About Extind</p>
        <h1 className="about-hero__title">Better workdays, one desk at a time.</h1>
        <p className="about-hero__lede">
          Extind was created for companies and professionals who care about where and how they
          work. From Palas Campus, Iași, we combine thoughtfully designed offices, genuine
          hospitality and a curated business community — so teams can focus on the work that
          matters.
        </p>
      </section>

      <div className="about-media">
        <img src={vistaImg} alt="Vista Lounge overlooking the Palace of Culture" />
        <span className="caption-pill about-media__caption">Palas Campus · Iași</span>
      </div>

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
          {team.map(({ name, role }) => (
            <article key={name} className="team-card">
              <span className="team-card__avatar" aria-hidden="true">
                {name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
              </span>
              <div className="team-card__meta">
                <p className="team-card__name">{name}</p>
                <p className="team-card__role">{role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow="Community" title="Life at Extind" />
        <div className="social-grid">
          {socials.map((src, i) => (
            <a key={i} className="social-grid__item" href="#" aria-label="Extind on Instagram">
              <img src={src} alt="" loading="lazy" />
              <span className="caption-pill social-grid__pill">@extind</span>
            </a>
          ))}
        </div>
      </section>

      <Cta />
    </>
  )
}
