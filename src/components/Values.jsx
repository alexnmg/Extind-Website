import SectionHeader from './SectionHeader'
import { useLang } from '../lib/i18n'
import icon1 from '../assets/figma/value-1.svg'
import icon2 from '../assets/figma/value-2.svg'
import icon3 from '../assets/figma/value-3.svg'
import icon4 from '../assets/figma/value-4.svg'
import icon5 from '../assets/figma/value-5.svg'
import icon6 from '../assets/figma/value-6.svg'

const ICONS = [icon1, icon2, icon3, icon4, icon5, icon6]

const T = {
  en: {
    eyebrow: 'Benefits',
    title: 'Why Companies Choose Extind',
    cards: [
      {
        title: 'Business-First Hospitality',
        desc: 'Everything behind the scenes is designed to support the way your business works, from welcoming clients to preparing meeting rooms and taking care of the details that keep your day running smoothly.',
      },
      {
        title: 'Workspace Tailored To Your Needs',
        desc: "Whether you're working on your own today or expanding your team tomorrow, Extind offers flexible workspace options that adapt as your business evolves.",
      },
      {
        title: '24/7 Secure Access',
        desc: 'Your workspace should fit your schedule, not the other way around. Enjoy secure round-the-clock access whenever your business needs it.',
      },
      {
        title: 'Professional Meeting Spaces',
        desc: 'Host client meetings, presentations and workshops in fully equipped spaces designed to help every conversation start with confidence.',
      },
      {
        title: 'Prime Palas Campus Location',
        desc: "Located in the heart of Iași's business district, Extind places your team close to leading companies, excellent amenities and one of the city's best-connected locations.",
      },
      {
        title: 'Business Community',
        desc: 'Join a growing network of entrepreneurs, professionals and companies through curated events, Vista Lounge and everyday opportunities to build meaningful business relationships.',
      },
    ],
  },
  ro: {
    eyebrow: 'Beneficii',
    title: 'De ce companiile aleg Extind',
    cards: [
      {
        title: 'Ospitalitate orientată spre business',
        desc: 'Tot ce se întâmplă în culise este gândit să susțină felul în care lucrează afacerea ta — de la primirea clienților la pregătirea sălilor de întâlniri și grija pentru detaliile care îți țin ziua în mișcare.',
      },
      {
        title: 'Spațiu de lucru adaptat nevoilor tale',
        desc: 'Fie că astăzi lucrezi pe cont propriu, fie că mâine îți extinzi echipa, Extind îți oferă opțiuni flexibile de spațiu care se adaptează pe măsură ce afacerea ta evoluează.',
      },
      {
        title: 'Acces securizat 24/7',
        desc: 'Spațiul tău de lucru ar trebui să se potrivească programului tău, nu invers. Bucură-te de acces securizat non-stop, oricând are nevoie afacerea ta.',
      },
      {
        title: 'Spații profesionale pentru întâlniri',
        desc: 'Găzduiește întâlniri cu clienții, prezentări și workshopuri în spații complet echipate, gândite astfel încât fiecare conversație să înceapă cu încredere.',
      },
      {
        title: 'Locație premium în Palas Campus',
        desc: 'În inima districtului de business al Iașului, Extind îți aduce echipa aproape de companii importante, de facilități excelente și de una dintre cele mai bine conectate zone ale orașului.',
      },
      {
        title: 'Comunitate de business',
        desc: 'Alătură-te unei rețele în creștere de antreprenori, profesioniști și companii, prin evenimente selecte, Vista Lounge și oportunități de zi cu zi de a construi relații de business autentice.',
      },
    ],
  },
}

export default function Values({ eyebrow, title, cards }) {
  const { lang } = useLang()
  const t = T[lang]
  eyebrow = eyebrow ?? t.eyebrow
  title = title ?? t.title
  cards = cards ?? t.cards
  return (
    <section className="section">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="values-grid">
        {cards.map(({ title: cardTitle, desc }, i) => (
          <article
            key={i}
            className="value-card"
            data-reveal
            style={{ '--reveal-delay': `${(i % 3) * 80}ms` }}
          >
            <span className="value-card__icon">
              <img src={ICONS[i]} alt="" width="22" height="22" />
            </span>
            <h3 className="value-card__title">{cardTitle}</h3>
            <p className="value-card__desc">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
