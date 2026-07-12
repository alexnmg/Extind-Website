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
    price: '€35',
    period: '/day',
    features: standardFeatures,
    cta: 'Get a Day Pass',
    accent: false,
  },
  {
    plan: 'Flex B',
    sub: '8 days per month',
    price: '€250',
    period: '/month',
    features: standardFeatures,
    cta: 'Get Flex B',
    accent: false,
  },
  {
    plan: 'Resident',
    sub: 'Monthly price',
    price: '€350',
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
  cta: 'Book a Tour',
  benefitsLeft: [
    'Smart lockable and customizable private office',
    '24/7 access Monday to Sunday',
    'Fully functional with ergonomic chairs and desks (option for height-adjustable)',
    'Specialty coffee, milk, water, bar of unlimited snacks, fruits, cocktails, depending on the selected plan',
    'Meeting rooms access (2-3 hours depending on availability, no additional costs)',
  ],
  benefitsRight: [
    'Restroom amenities: Thoughtfully stocked with hand cream, dental floss, and other hygiene essentials for your comfort',
    'Kitchen amenities: Fully equipped office kitchen and pantry area buffet for all utensils you need for everyday use',
    'Coworking area access',
    'Flexible access during other co-locations depending on availability',
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

function PricingCard({ plan, sub, price, period, features, cta, accent }) {
  return (
    <article className={`pricing-card${accent ? ' pricing-card--accent' : ''}`}>
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
  eyebrow = 'Memberships',
  title = 'One membership, many perks & benefits',
  note = 'Prices exclude VAT',
  plans = defaultPlans,
  office = defaultOffice,
}) {
  return (
    <section className="section">
      <SectionHeader eyebrow={eyebrow} title={title} note={note} />
      <div className="memberships__cards">
        <div className="pricing-grid">
          {plans.map((p) => (
            <PricingCard key={p.plan} {...p} />
          ))}
        </div>
        {office && (
          <article className="private-office">
            <div className="private-office__left">
              <div className="private-office__intro">
                <h3 className="private-office__title">{office.title}</h3>
                <p className="private-office__desc">{office.description}</p>
              </div>
              <button type="button" className="btn btn--primary private-office__btn">
                {office.cta}
              </button>
            </div>
            <div className="private-office__right">
              {[office.benefitsLeft, office.benefitsRight].map((column, i) => (
                <ul key={i} className="private-office__col">
                  {column.map((text) => (
                    <Benefit key={text} text={text} light />
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
