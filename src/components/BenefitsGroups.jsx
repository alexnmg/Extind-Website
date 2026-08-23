import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import { useLang } from '../lib/i18n'
import checkDark from '../assets/figma/check-dark.svg'
import officeImg from '../assets/photos/private-office.jpg'
import comfortsImg from '../assets/photos/lounge.jpg'
import beyondImg from '../assets/photos/kitchen.jpg'

/* Every private-office benefit, sorted into themed cards. Each group is led by
 * a relevant photo with its title set over the image, then the benefits list. */
const IMAGES = [officeImg, comfortsImg, beyondImg]

const T = {
  en: {
    eyebrow: 'Included',
    title: 'Everything that comes with your office',
    description: 'One monthly price. No setup costs, no surprises.',
    groups: [
      {
        title: 'Your office',
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
    ],
  },
  ro: {
    eyebrow: 'Incluse',
    title: 'Tot ce vine împreună cu biroul tău',
    description: 'Un singur preț lunar. Fără costuri de amenajare, fără surprize.',
    groups: [
      {
        title: 'Biroul tău',
        items: [
          'Birouri private complet mobilate',
          'Birouri cu înălțime reglabilă',
          'Scaune ergonomice premium',
          'Internet 1 Gbps',
          'Acces controlat, extensibil la 24/7',
          'Lumină naturală și priveliște asupra orașului',
          'Spații personale de depozitare',
          'Curățenie și mentenanță zilnică',
        ],
      },
      {
        title: 'Confortul de zi cu zi',
        items: [
          'Lounge și zonă de relaxare',
          'Coffee point',
          'Cafea boabe, ceai și apă filtrată',
          'Fructe proaspete și mici atenții periodice',
          'Zone comune pentru lucru individual concentrat, în funcție de disponibilitate',
          'Acces la facilitățile Palas Campus',
        ],
      },
      {
        title: 'Dincolo de biroul tău',
        items: [
          'Săli de întâlniri',
          'Sală de conferințe',
          'Acces la săli pe bază de rezervare, conform pachetului',
          'Primirea și îndrumarea oaspeților',
          'Administrare zilnică și suport operațional',
          'Flexibilitate în configurare și durată',
          'Acces la comunitatea și evenimentele EXTIND',
        ],
      },
    ],
  },
}

export default function BenefitsGroups({ id, ctaLabel, ctaTo = '/book-a-visit' }) {
  const { lang } = useLang()
  const t = T[lang]
  return (
    <section className="section" id={id}>
      <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <div className="benefit-groups">
        {t.groups.map(({ title: groupTitle, items }, i) => (
          <article
            key={i}
            className="benefit-group"
            data-reveal
            style={{ '--reveal-delay': `${(i % 3) * 80}ms` }}
          >
            <div className="benefit-group__banner">
              <img className="benefit-group__img" src={IMAGES[i]} alt="" loading="lazy" />
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
