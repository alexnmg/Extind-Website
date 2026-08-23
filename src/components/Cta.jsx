import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'

const T = {
  en: {
    title: 'Ready to see how Extind works?',
    description: 'The best way to understand Extind is to spend time here. Book a visit, meet the team and discover the environment behind the business.',
    ctaLabel: 'Visit us',
  },
  ro: {
    title: 'Vrei să vezi cum funcționează Extind?',
    description: 'Cel mai bun mod de a înțelege Extind este să petreci timp aici. Programează o vizită, cunoaște echipa și descoperă mediul din spatele afacerii.',
    ctaLabel: 'Vizitează-ne',
  },
}

export default function Cta({ title, description, ctaLabel }) {
  const { lang } = useLang()
  const t = T[lang]
  title = title ?? t.title
  description = description ?? t.description
  ctaLabel = ctaLabel ?? t.ctaLabel
  return (
    <section className="cta" data-reveal>
      <h2 className="cta__title">{title}</h2>
      <p className="cta__sub">{description}</p>
      <div className="cta__buttons">
        <Link className="btn btn--outline" to="/book-a-visit" viewTransition>
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
}
