import SectionHeader from './SectionHeader'

const defaultCards = [
  {
    title: 'Business-First Hospitality',
    desc: 'Everything behind the scenes is designed to support the way your business works, from welcoming clients to preparing meeting rooms and taking care of the details that keep your day running smoothly.',
  },
  {
    title: 'Workspace That Grows With You',
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
        {cards.map(({ title: cardTitle, desc }) => (
          <article key={cardTitle} className="value-card">
            <span className="value-card__icon" />
            <h3 className="value-card__title">{cardTitle}</h3>
            <p className="value-card__desc">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
