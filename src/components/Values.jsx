import SectionHeader from './SectionHeader'
import icon1 from '../assets/figma/value-1.svg'
import icon2 from '../assets/figma/value-2.svg'
import icon3 from '../assets/figma/value-3.svg'
import icon4 from '../assets/figma/value-4.svg'
import icon5 from '../assets/figma/value-5.svg'
import icon6 from '../assets/figma/value-6.svg'

const defaultCards = [
  {
    icon: icon1,
    title: 'Business-First Hospitality',
    desc: 'Everything behind the scenes is designed to support the way your business works, from welcoming clients to preparing meeting rooms and taking care of the details that keep your day running smoothly.',
  },
  {
    icon: icon2,
    title: 'Workspace That Grows With You',
    desc: "Whether you're working on your own today or expanding your team tomorrow, Extind offers flexible workspace options that adapt as your business evolves.",
  },
  {
    icon: icon3,
    title: '24/7 Secure Access',
    desc: 'Your workspace should fit your schedule, not the other way around. Enjoy secure round-the-clock access whenever your business needs it.',
  },
  {
    icon: icon4,
    title: 'Professional Meeting Spaces',
    desc: 'Host client meetings, presentations and workshops in fully equipped spaces designed to help every conversation start with confidence.',
  },
  {
    icon: icon5,
    title: 'Prime Palas Campus Location',
    desc: "Located in the heart of Iași's business district, Extind places your team close to leading companies, excellent amenities and one of the city's best-connected locations.",
  },
  {
    icon: icon6,
    title: 'Business community',
    desc: 'Join a growing network of entrepreneurs, professionals and companies through curated events, Vista Lounge and everyday opportunities to build meaningful business relationships.',
  },
]

export default function Values({
  eyebrow = 'Benefits',
  title = 'Why Companies Choose Extind',
  cards = defaultCards,
}) {
  return (
    <section className="section">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="values-grid">
        {cards.map(({ icon, title: cardTitle, desc }) => (
          <article key={cardTitle} className="value-card">
            <span className="value-card__icon">
              {icon && <img src={icon} alt="" width="22" height="22" />}
            </span>
            <h3 className="value-card__title">{cardTitle}</h3>
            <p className="value-card__desc">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
