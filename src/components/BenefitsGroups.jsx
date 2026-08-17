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
      'Height-adjustable desks',
      'Premium ergonomic chairs',
      '1 Gbps internet',
      'Controlled access, extendable to 24/7',
      'Natural light and city views',
      'Personal storage',
      'Daily cleaning and maintenance',
    ],
  },
  {
    title: 'Everyday comforts',
    image: comfortsImg,
    items: [
      'Lounge and relaxation area',
      'Coffee point',
      'Bean coffee, tea and filtered water',
      'Fresh fruit and periodic treats',
      'Shared areas for focused solo work, subject to availability',
      'Access to Palas Campus facilities',
    ],
  },
  {
    title: 'Beyond your office',
    image: communityImg,
    items: [
      'Meeting rooms',
      'Conference room',
      'Meeting-room access by booking, per package',
      'Guest reception and guidance',
      'Daily administration and operational support',
      'Flexibility in setup and duration',
      'Access to the EXTIND community and events',
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
