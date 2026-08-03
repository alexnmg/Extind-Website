import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import checkDark from '../assets/figma/check-dark.svg'
import officeImg from '../assets/figma/pillars.png'
import comfortsImg from '../assets/figma/vista.png'
import communityImg from '../assets/figma/hero.png'

/* Every private-office benefit, sorted into themed cards. Each group is led by a
 * relevant photo with its title set over the image, then the benefits list. */

const defaultGroups = [
  {
    title: 'Your office',
    image: officeImg,
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
    image: comfortsImg,
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
    image: communityImg,
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
        {groups.map(({ title: groupTitle, image, items }, i) => (
          <article
            key={groupTitle}
            className="benefit-group"
            data-reveal
            style={{ '--reveal-delay': `${(i % 3) * 80}ms` }}
          >
            <div className="benefit-group__banner">
              <img className="benefit-group__img" src={image} alt="" loading="lazy" />
              <h3 className="benefit-group__title">{groupTitle}</h3>
            </div>
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
