import SectionHeader from './SectionHeader'
import checkDark from '../assets/figma/check-dark.svg'

/* Every private-office benefit, sorted into themed cards.
 *
 * The pricing card on the homepage lists the same 25 items as three flat
 * columns — useful as a scannable summary next to a price. Here they get
 * room to breathe: grouped by what they actually are, each group numbered
 * and titled so the list reads as an argument rather than a wall of ticks.
 */

const defaultGroups = [
  {
    title: 'Your office',
    items: [
      'Fully furnished private offices',
      'Smart lockable offices with customizable layouts',
      '24/7 secure access for private office members',
      'Ergonomic desks and premium task chairs',
      'Height-adjustable desks available on request',
      'Personal storage options',
      'High-speed Wi-Fi',
      'Dedicated internet options for private offices',
      'Daily cleaning and maintenance',
    ],
  },
  {
    title: 'Everyday comforts',
    items: [
      'Specialty coffee, tea, milk and filtered water',
      'Fresh fruit and refreshments throughout the week',
      'Fully equipped shared kitchen',
      'Unlimited printing',
      'Phone booths for private calls',
      'Balcony and terrace access',
      'Premium restroom amenities',
      'Pet-friendly environment',
    ],
  },
  {
    title: 'Beyond your office',
    items: [
      'Complimentary meeting room hours',
      'Beautifully designed coworking spaces',
      'Vista Lounge access',
      'Community events and networking evenings',
      'Workshop and event space discounts',
      'Reception and guest welcome',
      'Mail and package handling',
      'On-site support throughout the day',
    ],
  },
]

export default function BenefitsGroups({
  id,
  eyebrow = 'Included',
  title = 'Everything that comes with your office',
  description = 'One monthly price. No setup costs, no surprises.',
  groups = defaultGroups,
}) {
  return (
    <section className="section" id={id}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="benefit-groups">
        {groups.map(({ title: groupTitle, items }, i) => (
          <article
            key={groupTitle}
            className="benefit-group"
            data-reveal
            style={{ '--reveal-delay': `${(i % 3) * 80}ms` }}
          >
            <header className="benefit-group__header">
              <span className="benefit-group__number">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="benefit-group__title">{groupTitle}</h3>
            </header>
            <hr className="benefit-group__divider" />
            <ul className="benefit-group__list">
              {items.map((text) => (
                <li key={text} className="benefit">
                  <img className="benefit__icon" src={checkDark} alt="" />
                  <span className="benefit__text">{text}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
