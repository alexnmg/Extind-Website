import { Fragment, useEffect, useLayoutEffect, useRef } from 'react'
import SectionHeader from '../components/SectionHeader'
import LogoHero from '../components/LogoHero'
import CentralIdea from '../components/CentralIdea'
import Cta from '../components/Cta'
import { useLang } from '../lib/i18n'
import social1 from '../assets/photos/social-1.jpg'
import social2 from '../assets/photos/vista-hero.jpg'
import social3 from '../assets/photos/hero-main.jpg'
import founderImg from '../assets/photos/founder-2.jpg'
import social4 from '../assets/photos/social-4.jpg'
import social5 from '../assets/photos/social-5.jpg'
import social6 from '../assets/photos/lounge-intro.jpg'

// Until a live feed is wired, the gallery tiles open the profile itself
const INSTAGRAM_URL = 'https://www.instagram.com/extind.ro/'

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
    lede: 'EXTIND a fost creat pentru companiile și profesioniștii cărora le pasă unde și cum lucrează. La noi găsești birouri atent amenajate, servicii care îți fac ziua mai ușoară și un mediu în care apar idei, colaborări și oportunități. Un loc în care echipele lucrează bine, clienții sunt primiți impecabil, iar tu simți că ești exact unde trebuie.',
    centralIdeaTitle: 'Design care susține conexiunile',
    founderEyebrow: 'Fondator',
    founderTitle: 'Omul din spatele Extind',
    founderQuote:
      'Sunt economistă, MBA, și am peste 25 de ani de experiență în banking, management și business. Lucrând de-a lungul anilor cu organizații, antreprenori și echipe, am înțeles cât de mult contează spațiul în care lucrezi: pentru felul în care gândești, pentru energia echipei și pentru impresia pe care o lași clienților.\n\nAm creat EXTIND pentru companiile și profesioniștii cărora le pasă unde și cum lucrează. Un spațiu premium, flexibil și atent administrat, în care să-ți poți construi afacerea cu liniște, să-ți primești impecabil clienții și să simți, în fiecare zi că ești exact unde trebuie.',
    founderName: 'Catrinel Gradu',
    founderRole: 'Fondatoare, Extind',
    founderAlt: 'Catrinel Gradu, fondatoarea Extind',
    igEyebrow: 'Instagram',
    igTitle: 'Din viața Extind. Spații, oameni și momente',
    igDesc: 'Urmărește-ne pe Instagram @extind.ro',
    igAria: 'Deschide postarea pe Instagram',
    igPill: 'Vezi pe Instagram',
  },
}

// Latest-posts gallery — placeholder tiles until a live Instagram feed is wired
const posts = [social1, social2, social3, social4, social5, social6]

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
        <SectionHeader eyebrow={t.igEyebrow} title={t.igTitle} description={t.igDesc} />
        <div className="social-grid">
          {posts.map((src, i) => (
            <a
              key={i}
              className="social-grid__item"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
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
