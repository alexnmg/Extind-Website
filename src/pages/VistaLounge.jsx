import { useEffect, useRef } from 'react'
import { Link } from '../lib/LocaleLink'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import { VistaIcon, ClockIcon, MeetingIcon } from '../components/PillIcons'
import { useLang } from '../lib/i18n'
import Photo from '../components/Photo'
const vistaImg = 'lounge-intro'
const lounge2Img = 'lounge-2'
const lounge3Img = 'lounge-3'
const heroImg = 'vista-hero'
// import pillarsImg from '../assets/photos/meeting-room.jpg' // only used by the hidden magazine block

// Extra line icons in the shared 24×24 / 1.5-weight style.
const iconBase = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

function CoffeeIcon() {
  return (
    <svg {...iconBase}>
      <path d="M5 8.5h11v4.4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8.5Z" />
      <path d="M16 9.6h1.6a2.1 2.1 0 0 1 0 4.2H16" />
      <path d="M8 3.2c-.6 1 .6 1.6 0 2.8M11.4 3.2c-.6 1 .6 1.6 0 2.8" />
    </svg>
  )
}

function SofaIcon() {
  return (
    <svg {...iconBase}>
      <path d="M4 10.5V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2.5" />
      <rect x="3" y="10.5" width="18" height="6" rx="2" />
      <path d="M3 14h18" />
      <path d="M6 16.5v2M18 16.5v2" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg {...iconBase}>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
    </svg>
  )
}

const FEATURE_ICONS = [
  <VistaIcon key="v" />,
  <CoffeeIcon key="c" />,
  <SofaIcon key="s" />,
  <MeetingIcon key="m" />,
  <ClockIcon key="cl" />,
  <SunIcon key="su" />,
]

const T = {
  en: {
    docTitle: 'Vista Lounge — Extind',
    heroTitle: 'A panoramic event space above the city.',
    heroLede:
      'Six floors up, overlooking the Palace of Culture — the home of the Extind community, and the best seat in the building for a coffee, a catch-up, or an evening event.',
    primaryLabel: 'Book a visit',
    secondaryLabel: 'Explore the lounge →',
    slides: [
      { src: lounge2Img, caption: 'Room for events & gatherings', alt: 'Vista Lounge event space' },
      { src: vistaImg, caption: 'Panoramic Lounge · 6th floor', alt: 'Vista Lounge overlooking the city' },
      { src: lounge3Img, caption: 'Coffee point & social area', alt: 'Vista Lounge coffee point' },
    ],
    featEyebrow: 'The space',
    featTitle: 'Designed for the moments between focused work',
    featDesc:
      'Vista is where the community gathers — for a change of scene during the day, and for the talks and evenings that bring everyone together after hours.',
    features: [
      {
        title: 'Panoramic views',
        desc: 'Floor-to-ceiling windows framing the old town and the river. The kind of view that makes a long call feel shorter.',
      },
      {
        title: 'Serious coffee',
        desc: 'A specialty coffee bar, tea and refreshments through the day — the unofficial engine room of the community.',
      },
      {
        title: 'Room to breathe',
        desc: 'Soft seating, quiet corners and warm light. Somewhere to think, read, or take a call away from your desk.',
      },
      {
        title: 'Built for gatherings',
        desc: 'By evening the lounge becomes an event space, hosting talks, breakfasts and community nights above the city.',
      },
      {
        title: 'Open to every member',
        desc: 'Vista is part of every Extind membership. Come up whenever you need a change of scene — no booking required.',
      },
      {
        title: 'Golden hour, every evening',
        desc: 'The west-facing glass turns the whole room amber at sunset. Time a break for it; it’s worth the trip up.',
      },
    ],
    eventsEyebrow: 'Events',
    eventsTitle: 'Something on, most weeks',
    eventsDesc:
      'Founders’ breakfasts, meetups, panels and pitch nights — the lounge is where the Extind community actually meets. Most events are free and open to guests, so there’s always a reason to come up.',
    eventsCta: 'See upcoming events →',
    magEyebrow: 'Extind Magazine',
    magTitle: 'Guides for choosing your workspace',
    magDesc:
      'Practical, no-nonsense reading on private offices, coworking and meeting spaces in Iași — what things cost, what’s included, and how to choose.',
    magCta: 'Read the magazine →',
  },
  ro: {
    docTitle: 'Vista Lounge — Extind',
    heroTitle: 'Un lounge cu vedere spre oraș, creat pentru întâlniri memorabile ale comunității',
    heroLede:
      'La etajul 6, cu vedere spre Palatul Culturii, Vista Lounge este locul potrivit pentru o cafea, o conversație relaxată sau un eveniment de business. Un spațiu primitor, care aduce oamenii împreună, iar orașul completează atmosfera.',
    primaryLabel: 'Programează o vizită',
    secondaryLabel: 'Explorează lounge-ul →',
    slides: [
      { src: lounge2Img, caption: 'Spațiu pentru evenimente și întâlniri', alt: 'Spațiul de evenimente din Vista Lounge' },
      { src: vistaImg, caption: 'Lounge panoramic · etajul 6', alt: 'Vista Lounge cu vedere asupra orașului' },
      { src: lounge3Img, caption: 'Coffee point & zonă socială', alt: 'Coffee point-ul din Vista Lounge' },
    ],
    featEyebrow: 'Vista Lounge',
    featTitle: 'Spațiul dintre o ședință și următoarea idee',
    featDesc:
      'Pe parcursul zilei, Vista Lounge este spațiul potrivit pentru o cafea, o discuție sau câteva momente de respiro. Seara, devine cadrul ideal pentru evenimente, conversații și relații profesionale care continuă dincolo de o simplă întâlnire.',
    features: [
      {
        title: 'Priveliște panoramică',
        desc: 'Suprafețe vitrate generoase care transformă vederea spre oraș în sursa ta de inspirație.',
      },
      {
        title: 'Cafea de specialitate',
        desc: 'Cafea de specialitate, ceai și apă filtrată.',
      },
      {
        title: 'Loc să respiri',
        desc: 'Canapele confortabile, colțuri liniștite și lumină naturală, pentru momentele în care vrei să schimbi ritmul: să gândești, să citești sau să porți o conversație departe de birou.',
      },
      {
        title: 'Creat pentru întâlniri și evenimente',
        desc: 'Pe parcursul zilei și seara, Vista Lounge găzduiește conferințe, brunch-uri de business, întâlniri private și evenimente de comunitate, într-un cadru panoramic deasupra orașului.',
      },
      {
        title: 'Inclus în fiecare abonament',
        desc: 'Accesul la Vista Lounge este inclus în toate abonamentele EXTIND. Vino aici pentru o cafea, o conversație sau o pauză care îți limpezește ideile.',
      },
      {
        title: 'Cadre care nu au nevoie de filtru',
        desc: 'Lumina naturală, designul interior și priveliștea spre Palatul Culturii fac din Vista Lounge un decor „instagramabil” pentru ședințe foto, evenimente și conținut de brand.',
      },
    ],
    eventsEyebrow: 'Evenimente',
    eventsTitle: 'Mereu un motiv să participi',
    eventsDesc:
      'Meetupuri, paneluri, seri de pitch și întâlniri de comunitate. Aici, profesioniștii, antreprenorii și companiile se întâlnesc, fac schimb de idei și construiesc relații care continuă dincolo de eveniment.',
    eventsCta: 'Vezi evenimentele viitoare →',
    magEyebrow: 'Extind Magazine',
    magTitle: 'Ghiduri pentru alegerea spațiului de lucru',
    magDesc:
      'Ghiduri clare despre birouri private, coworking și săli de întâlniri în Iași. În ce spațiu să învestești, vezi ce este inclus și cum alegi.',
    magCta: 'Citește revista →',
  },
}

export default function VistaLounge() {
  const { lang } = useLang()
  const t = T[lang]
  const featuresRef = useRef(null)

  useEffect(() => {
    const prev = document.title
    document.title = t.docTitle
    return () => {
      document.title = prev
    }
  }, [t.docTitle])

  const scrollToFeatures = () => {
    const target = featuresRef.current
    if (!target) return
    const navH = document.querySelector('.navbar-container')?.offsetHeight ?? 0
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      <Hero
        title={t.heroTitle}
        lede={t.heroLede}
        primaryLabel={t.primaryLabel}
        secondaryLabel={t.secondaryLabel}
        slides={t.slides}
        onSecondaryClick={scrollToFeatures}
      />

      <section className="section" ref={featuresRef}>
        <SectionHeader eyebrow={t.featEyebrow} title={t.featTitle} description={t.featDesc} />
        <div className="lounge-features">
          {t.features.map((f, i) => (
            <article
              className="lounge-feature"
              key={i}
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 80}ms` }}
            >
              <span className="lounge-feature__icon">{FEATURE_ICONS[i]}</span>
              <h3 className="lounge-feature__title">{f.title}</h3>
              <p className="lounge-feature__desc">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <article className="lounge-intro" data-reveal>
          <div className="lounge-intro__media">
            <Photo name={heroImg} sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="lounge-intro__body">
            <p className="lounge-intro__eyebrow">{t.eventsEyebrow}</p>
            <h3 className="lounge-intro__title">{t.eventsTitle}</h3>
            <p className="lounge-intro__desc">{t.eventsDesc}</p>
            <Link className="btn btn--primary" to="/events" viewTransition>
              {t.eventsCta}
            </Link>
          </div>
        </article>
      </section>

      {/* Extind Magazine block hidden for now at the client's request (Sept 2026). The magTitle /
          magDesc / magCta strings are kept in T above so this can be restored by uncommenting,
          together with the /magazine routes in App.jsx and the navbar entry. */}
      {/* <section className="section">
        <article className="lounge-intro lounge-intro--reverse" data-reveal>
          <div className="lounge-intro__media">
            <img src={pillarsImg} alt="" />
          </div>
          <div className="lounge-intro__body">
            <p className="lounge-intro__eyebrow">{t.magEyebrow}</p>
            <h3 className="lounge-intro__title">{t.magTitle}</h3>
            <p className="lounge-intro__desc">{t.magDesc}</p>
            <Link className="btn btn--primary" to="/magazine" viewTransition>
              {t.magCta}
            </Link>
          </div>
        </article>
      </section> */}
    </>
  )
}
