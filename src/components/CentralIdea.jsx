import SectionHeader from './SectionHeader'

const defaultCards = [
  {
    number: '01',
    title: 'Space is the infrastructure.',
    desc: 'The physical environment shapes how people think, collaborate, and produce.',
    variant: 'light',
  },
  {
    number: '02',
    title: 'Services are the support.',
    desc: 'Seamless logistics, hospitality, and operations let teams focus on what matters.',
    variant: 'forest',
  },
  {
    number: '03',
    title: 'Relationships are the catalyst.',
    desc: 'Community and proximity create serendipitous connections that accelerate growth.',
    variant: 'dark',
  },
]

export default function CentralIdea({
  eyebrow = 'Memberships',
  title = 'Spaces to grow',
  note = 'Prices exclude VAT',
  cards = defaultCards,
}) {
  return (
    <section className="section">
      <SectionHeader eyebrow={eyebrow} title={title} note={note} />
      <div className="cards-row-3">
        {cards.map(({ number, title: cardTitle, desc, variant }) => (
          <article key={number + cardTitle} className={`idea-card idea-card--${variant}`}>
            <p className="idea-card__number">{number}</p>
            <h3 className="idea-card__title">{cardTitle}</h3>
            <p className="idea-card__desc">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
