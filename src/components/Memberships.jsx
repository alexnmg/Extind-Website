import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import checkDark from '../assets/figma/check-dark.svg'
import checkLight from '../assets/figma/check-light.svg'

const standardFeatures = [
  'Standard access (Flex P1, Flex P2, OMA)',
  'Office supplies & hotel-like amenities',
  'Flexible days',
  'Printing & scanning',
  'WiFi',
  'Phone booth',
]

const defaultPlans = [
  {
    plan: 'Day Pass',
    sub: 'One-day access',
    price: '€25',
    period: '/day',
    features: standardFeatures,
    cta: 'Get a Day Pass',
    accent: false,
  },
  {
    plan: '8 Day Pass',
    sub: '8 days per month',
    price: '€150',
    period: '/month',
    features: standardFeatures,
    cta: 'Get Flex B',
    accent: false,
  },
  {
    plan: 'Resident',
    sub: 'Monthly pass',
    price: '€250',
    period: '/month',
    features: [
      'Fixed desk',
      'Locker',
      'Members only app',
      '40% Extind discount',
      'Food & beverage service',
      'Networking events',
      'Extind card (benefits to our partners)',
    ],
    cta: 'Become a Resident',
    accent: true,
  },
]

const defaultOffice = {
  title: 'Private office',
  description:
    'Lockable, customisable offices with 24/7 access, fixed or sit-stand desks, storage, and custom internet.',
  cta: 'Book a visit',
  ctaTo: '/book-a-visit',
  benefitsLeft: [
    'Fully furnished private offices',
    'Smart lockable offices with customizable layouts',
    '24/7 secure access for private office members',
    'Ergonomic desks and premium task chairs',
    'Height-adjustable desks available on request',
    'Specialty coffee, tea, milk and filtered water',
    'Fresh fruit and refreshments throughout the week',
    'Unlimited printing',
  ],
  benefitsMid: [
    'Fully equipped shared kitchen',
    'Complimentary meeting room hours',
    'Beautifully designed coworking spaces',
    'Vista Lounge access',
    'Community events and networking evenings',
    'Workshop and event space discounts',
    'High-speed Wi-Fi',
    'Dedicated internet options for private offices',
  ],
  benefitsRight: [
    'Phone booths for private calls',
    'Reception and guest welcome',
    'Mail and package handling',
    'Personal storage options',
    'Pet-friendly environment',
    'Balcony and terrace access',
    'Premium restroom amenities',
    'Daily cleaning and maintenance',
    'On-site support throughout the day',
  ],
}

function Benefit({ text, light }) {
  return (
    <li className="benefit">
      <img className="benefit__icon" src={light ? checkLight : checkDark} alt="" />
      <span className="benefit__text">{text}</span>
    </li>
  )
}

function PricingCard({ plan, sub, price, period, features, cta, accent, revealDelay = 0 }) {
  return (
    <article
      className={`pricing-card${accent ? ' pricing-card--accent' : ''}`}
      data-reveal
      style={{ '--reveal-delay': `${revealDelay}ms` }}
    >
      <div className="pricing-card__top">
        <header className="pricing-card__header">
          <p className="pricing-card__plan">{plan}</p>
          <p className="pricing-card__sub">{sub}</p>
          <div className="price-row">
            <span className="price-row__price">{price}</span>
            <span className="price-row__period">{period}</span>
          </div>
        </header>
        <hr className="pricing-card__divider" />
        <ul className="feature-list">
          {features.map((text) => (
            <Benefit key={text} text={text} light={accent} />
          ))}
        </ul>
      </div>
      <button type="button" className="btn btn--outline pricing-card__btn">
        {cta}
      </button>
    </article>
  )
}

export default function Memberships({
  eyebrow = 'Pricing',
  title = 'Memberships',
  description = 'Prices exclude VAT',
  plans = defaultPlans,
  office = defaultOffice,
}) {
  return (
    <section className="section">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="memberships__cards">
        <div className="pricing-grid">
          {plans.map((p, i) => (
            <PricingCard key={p.plan} {...p} revealDelay={i * 80} />
          ))}
        </div>
        {office && (
          <article className="private-office" data-reveal>
            <div className="private-office__left">
              <div className="private-office__intro">
                <h3 className="private-office__title">{office.title}</h3>
                <p className="private-office__desc">{office.description}</p>
              </div>
              <Link className="text-button text-button--dark private-office__btn" to={office.ctaTo} viewTransition>
                <span>{office.cta}</span>
                <span className="text-button__arrow" aria-hidden="true" />
              </Link>
            </div>
            <div className="private-office__right">
              {[office.benefitsLeft, office.benefitsMid, office.benefitsRight].filter(Boolean).map((column, i) => (
                <ul key={i} className="private-office__col">
                  {column.map((text) => (
                    <Benefit key={text} text={text} />
                  ))}
                </ul>
              ))}
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
