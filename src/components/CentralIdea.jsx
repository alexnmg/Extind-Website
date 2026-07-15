import SectionHeader from './SectionHeader'

const defaultCards = [
  {
    number: '01',
    title: 'The Right Environment',
    desc: 'The workplace influences how teams collaborate, how clients perceive your business and how people feel about coming to work every day.',
    variant: 'light',
  },
  {
    number: '02',
    title: 'The Right Support',
    desc: 'Hospitality, service and day-to-day operations work quietly in the background, giving your team more time to focus on what matters most.',
    variant: 'forest',
  },
  {
    number: '03',
    title: 'The Right Connections',
    desc: 'Meaningful business relationships rarely happen by accident. We create places and moments where companies, ideas and people naturally come together.',
    variant: 'dark',
  },
]

export default function CentralIdea({
  eyebrow = 'Why Extind',
  title = 'Spaces to grow',
  description = 'Extind combines thoughtfully designed workspaces, hospitality and a curated business community into one ecosystem that helps companies perform, build relationships and grow.',
  cards = defaultCards,
}) {
  return (
    <section className="section">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="cards-row-3">
        {cards.map(({ number, title: cardTitle, desc, variant }, i) => (
          <article
            key={number + cardTitle}
            className={`idea-card idea-card--${variant}`}
            data-reveal
            style={{ '--reveal-delay': `${i * 80}ms` }}
          >
            <p className="idea-card__number">{number}</p>
            <h3 className="idea-card__title">{cardTitle}</h3>
            <p className="idea-card__desc">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
