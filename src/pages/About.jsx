import { Fragment, useEffect, useLayoutEffect, useRef } from 'react'
import SectionHeader from '../components/SectionHeader'
import LogoHero from '../components/LogoHero'
import CentralIdea from '../components/CentralIdea'
import Cta from '../components/Cta'
import vistaImg from '../assets/figma/vista.png'
import heroImg from '../assets/figma/hero.png'
import pillarsImg from '../assets/figma/pillars.png'
import mask1 from '../assets/logo-anim/mask-1.jpg'
import mask2 from '../assets/logo-anim/mask-2.jpg'
import mask3 from '../assets/logo-anim/mask-3.jpg'
import mask4 from '../assets/logo-anim/mask-4.jpg'
import mask5 from '../assets/logo-anim/mask-5.jpg'

const HERO_TITLE = 'Spaces to grow.'

// Placeholder roster and photos — swap in the real team when ready
const team = [
  { name: 'Ana Popescu', role: 'Community Manager', photo: mask1 },
  { name: 'Mihai Ionescu', role: 'Operations Lead', photo: mask2 },
  { name: 'Ioana Marin', role: 'Member Experience', photo: mask3 },
  { name: 'Andrei Stancu', role: 'Founder', photo: mask4 },
]

// Latest-posts gallery — placeholder tiles until a live Instagram feed is wired
const posts = [heroImg, mask2, pillarsImg, mask5, vistaImg, mask3]

export default function About() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const prev = document.title
    document.title = 'About — Extind'
    return () => {
      document.title = prev
    }
  }, [])

  /* Same entrance treatment as the homepage hero: title words rise from
   * behind per-line masks, then the label and paragraph fade up (see
   * [data-animate] rules in App.css). The LogoHero above runs its own
   * mask-expansion at the same time. */
  useLayoutEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const words = titleRef.current?.querySelectorAll('.hero__word') ?? []
    let lastTop = null
    let line = -1
    words.forEach((w) => {
      if (w.offsetTop !== lastTop) {
        line += 1
        lastTop = w.offsetTop
      }
      w.style.setProperty('--line', line)
    })
    heroRef.current?.setAttribute('data-animate', '')
  }, [])

  return (
    <>
      <section className="about-hero" ref={heroRef}>
        <LogoHero />
        <div className="about-hero__bottom">
          <h1 className="about-hero__title" ref={titleRef}>
            {HERO_TITLE.split(' ').map((word, i) => (
              <Fragment key={i}>
                {i > 0 && ' '}
                <span className="hero__word">
                  <span className="hero__word-inner">{word}</span>
                </span>
              </Fragment>
            ))}
          </h1>
          <div className="about-hero__text">
            <p className="about-hero__eyebrow">About Extind</p>
            <p className="about-hero__lede">
              Extind was created for companies and professionals who care about where and how they
              work. From Palas Campus, Iași, we combine thoughtfully designed offices, genuine
              hospitality and a curated business community — so teams can focus on the work that
              matters.
            </p>
          </div>
        </div>
      </section>

      <CentralIdea title="Design that supports connections" />

      <section className="section">
        <SectionHeader eyebrow="The Team" title="The people behind Extind" />
        <div className="team-grid">
          {team.map(({ name, role, photo }, i) => (
            <article
              key={name}
              className="team-card"
              data-reveal
              style={{ '--reveal-delay': `${i * 70}ms` }}
            >
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
            <a
              key={i}
              className="social-grid__item"
              href="#"
              aria-label="Open post on Instagram"
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 80}ms` }}
            >
              <img src={src} alt="" loading="lazy" />
              <span className="social-grid__overlay" aria-hidden="true">
                <span className="social-grid__pill">View on Instagram</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <Cta />
    </>
  )
}
