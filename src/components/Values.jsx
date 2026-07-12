import SectionHeader from './SectionHeader'

const defaultCards = [
  { title: 'Community', desc: 'The place where valuable interactions happen naturally.' },
  { title: 'Hospitality', desc: 'Our standard is that of luxury hotels, applied to your office.' },
  { title: 'Respect for time', desc: 'Infrastructure ready-to-use, with no administrative delays.' },
  { title: 'Purposeful design', desc: 'Every corner is designed to support productivity.' },
  { title: 'Clarity', desc: 'Total transparency in services and costs.' },
  { title: 'Authentic care', desc: "We are here to anticipate your team's needs." },
]

export default function Values({
  eyebrow = 'Our Values',
  title = 'What We Stand For',
  note = 'The principles that shape every space, interaction, and decision at Extind.',
  cards = defaultCards,
}) {
  return (
    <section className="section">
      <SectionHeader eyebrow={eyebrow} title={title} note={note} />
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
