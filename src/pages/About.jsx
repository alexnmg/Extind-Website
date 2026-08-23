import { Fragment, useEffect, useLayoutEffect, useRef } from 'react'
import SectionHeader from '../components/SectionHeader'
import LogoHero from '../components/LogoHero'
import CentralIdea from '../components/CentralIdea'
import Cta from '../components/Cta'
import { useLang } from '../lib/i18n'
import vistaImg from '../assets/photos/lounge.jpg'
import heroImg from '../assets/photos/coworking.jpg'
import pillarsImg from '../assets/photos/private-office.jpg'
import founderImg from '../assets/photos/founder.jpg'
import mask2 from '../assets/photos/library.jpg'
import mask3 from '../assets/photos/wellness.jpg'
import mask5 from '../assets/photos/kitchen.jpg'

const T = {
  en: {
    docTitle: 'About — Extind',
    heroTitle: 'Spaces to grow.',
    eyebrow: 'About Extind',
    lede: 'Extind was created for companies and professionals who care about where and how they work. From Palas Campus, Iași, we combine thoughtfully designed offices, genuine hospitality and a curated business community — so teams can focus on the work that matters.',
    centralIdeaTitle: 'Design that supports connections',
    founderEyebrow: 'Founder',
    founderTitle: 'The person behind Extind',
    founderQuote:
      'I opened EXTIND because I kept meeting people in Iași doing serious, ambitious work from places that didn’t match it. Where you work shapes how a team thinks, how clients see you, and how it feels to walk in on a Monday morning. We built the place I would want to bring my own clients to — and then made it easy to belong to.',
    founderName: 'Catrinel Gradu',
    founderRole: 'Founder, Extind',
    founderAlt: 'Catrinel Gradu, founder of Extind',
    igEyebrow: 'Instagram',
    igTitle: 'Latest from @extind',
    igAria: 'Open post on Instagram',
    igPill: 'View on Instagram',
  },
  ro: {
    docTitle: 'Despre — Extind',
    heroTitle: 'Spaces to grow.',
    eyebrow: 'Despre Extind',
    lede: 'Extind a fost creat pentru companiile și profesioniștii cărora le pasă unde și cum lucrează. Din Palas Campus, Iași, combinăm birouri atent proiectate, ospitalitate autentică și o comunitate de business selectă — astfel încât echipele să se poată concentra pe munca ce contează.',
    centralIdeaTitle: 'Design care susține conexiunile',
    founderEyebrow: 'Fondator',
    founderTitle: 'Omul din spatele Extind',
    founderQuote:
      'Am deschis EXTIND pentru că întâlneam mereu, în Iași, oameni care fac o muncă serioasă și ambițioasă din spații care nu erau pe măsura ei. Locul în care lucrezi modelează felul în care gândește o echipă, felul în care te văd clienții și starea cu care intri pe ușă luni dimineața. Am construit spațiul în care aș vrea să-mi aduc propriii clienți — și în care e ușor să te simți parte din comunitate.',
    founderName: 'Catrinel Gradu',
    founderRole: 'Fondatoare, Extind',
    founderAlt: 'Catrinel Gradu, fondatoarea Extind',
    igEyebrow: 'Instagram',
    igTitle: 'Ultimele de la @extind',
    igAria: 'Deschide postarea pe Instagram',
    igPill: 'Vezi pe Instagram',
  },
}

// Latest-posts gallery — placeholder tiles until a live Instagram feed is wired
const posts = [heroImg, mask2, pillarsImg, mask5, vistaImg, mask3]

export default function About() {
  const { lang } = useLang()
  const t = T[lang]
  const heroRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const prev = document.title
    document.title = t.docTitle
    return () => {
      document.title = prev
    }
  }, [t.docTitle])

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
  }, [lang])

  return (
    <>
      <section className="about-hero" ref={heroRef}>
        <LogoHero />
        <div className="about-hero__bottom">
          <h1 className="about-hero__title" ref={titleRef}>
            {t.heroTitle.split(' ').map((word, i) => (
              <Fragment key={i}>
                {i > 0 && ' '}
                <span className="hero__word">
                  <span className="hero__word-inner">{word}</span>
                </span>
              </Fragment>
            ))}
          </h1>
          <div className="about-hero__text">
            <p className="about-hero__eyebrow">{t.eyebrow}</p>
            <p className="about-hero__lede">{t.lede}</p>
          </div>
        </div>
      </section>

      <CentralIdea title={t.centralIdeaTitle} />

      <section className="section">
        <SectionHeader eyebrow={t.founderEyebrow} title={t.founderTitle} />
        <article className="founder" data-reveal>
          <div className="founder__media">
            <img src={founderImg} alt={t.founderAlt} loading="lazy" />
          </div>
          <div className="founder__body">
            <blockquote className="founder__quote">{t.founderQuote}</blockquote>
            <div className="founder__meta">
              <p className="founder__name">{t.founderName}</p>
              <p className="founder__role">{t.founderRole}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="section">
        <SectionHeader eyebrow={t.igEyebrow} title={t.igTitle} />
        <div className="social-grid">
          {posts.map((src, i) => (
            <a
              key={i}
              className="social-grid__item"
              href="#"
              aria-label={t.igAria}
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 80}ms` }}
            >
              <img src={src} alt="" loading="lazy" />
              <span className="social-grid__overlay" aria-hidden="true">
                <span className="social-grid__pill">{t.igPill}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <Cta />
    </>
  )
}
