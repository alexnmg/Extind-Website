import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import checkDark from '../assets/figma/check-dark.svg'

/* Every private-office benefit, sorted into themed cards.
 *
 * The pricing card on the homepage lists the same items as three flat columns —
 * useful as a scannable summary. Here they get room to breathe: grouped by what
 * they actually are, each group led by an icon and title so the list reads as an
 * argument rather than a wall of ticks.
 */

// Icons drawn on the same 24×24 / 1.5-weight grid as PillIcons so they sit with
// the rest of the UI's iconography.
const iconBase = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

/** Monitor on a desk — your own furnished workspace. */
function OfficeIcon() {
  return (
    <svg {...iconBase}>
      <rect x="6" y="3.5" width="12" height="8" rx="1" />
      <path d="M12 11.5v2.5" />
      <path d="M3.5 14h17" />
      <path d="M6 14v6.5M18 14v6.5" />
    </svg>
  )
}

/** Coffee cup with steam — the everyday comforts. */
function ComfortsIcon() {
  return (
    <svg {...iconBase}>
      <path d="M5 8.5h11v4.4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8.5Z" />
      <path d="M16 9.6h1.6a2.1 2.1 0 0 1 0 4.2H16" />
      <path d="M8 3.2c-.6 1 .6 1.6 0 2.8M11.4 3.2c-.6 1 .6 1.6 0 2.8" />
    </svg>
  )
}

/** Two figures — the community and spaces beyond your office. */
function CommunityIcon() {
  return (
    <svg {...iconBase}>
      <circle cx="8.5" cy="8" r="2.5" />
      <circle cx="16.2" cy="8.6" r="2" />
      <path d="M3.8 19a4.7 4.7 0 0 1 9.4 0" />
      <path d="M14.6 19a4 4 0 0 1 5.6-3.7" />
    </svg>
  )
}

const defaultGroups = [
  {
    title: 'Your office',
    icon: <OfficeIcon />,
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
    icon: <ComfortsIcon />,
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
    icon: <CommunityIcon />,
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
  ctaLabel,
  ctaTo = '/book-a-visit',
}) {
  return (
    <section className="section" id={id}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="benefit-groups">
        {groups.map(({ title: groupTitle, icon, items }, i) => (
          <article
            key={groupTitle}
            className="benefit-group"
            data-reveal
            style={{ '--reveal-delay': `${(i % 3) * 80}ms` }}
          >
            <header className="benefit-group__header">
              <span className="benefit-group__icon">{icon}</span>
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
      {ctaLabel && (
        <div className="benefit-groups__cta" data-reveal>
          <Link className="btn btn--primary" to={ctaTo} viewTransition>
            {ctaLabel}
          </Link>
        </div>
      )}
    </section>
  )
}
