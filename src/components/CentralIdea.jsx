import SectionHeader from './SectionHeader'
import { useLang } from '../lib/i18n'

const T = {
  en: {
    eyebrow: 'Why Extind',
    title: 'Spaces to grow',
    description:
      'Extind combines thoughtfully designed workspaces, hospitality and a curated business community into one ecosystem that helps companies perform, build relationships and grow.',
    cards: [
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
        desc: 'A professional community that’s there when you look for it, and discreet when you need to focus — connections happen naturally, with no forced networking and no obligation to take part.',
        variant: 'dark',
      },
    ],
  },
  ro: {
    eyebrow: 'De ce Extind',
    title: 'Spaces to grow',
    description:
      'Extind combină spații de lucru atent proiectate, ospitalitate și o comunitate de business selectă într-un ecosistem care ajută companiile să performeze, să construiască relații și să crească.',
    cards: [
      {
        number: '01',
        title: 'Mediul potrivit',
        desc: 'Locul în care lucrezi influențează felul în care echipele colaborează, felul în care clienții îți percep afacerea și starea cu care oamenii vin zilnic la birou.',
        variant: 'light',
      },
      {
        number: '02',
        title: 'Suportul potrivit',
        desc: 'Ospitalitatea, serviciile și operațiunile de zi cu zi funcționează discret în fundal, lăsând echipei tale mai mult timp pentru ceea ce contează cu adevărat.',
        variant: 'forest',
      },
      {
        number: '03',
        title: 'Conexiunile potrivite',
        desc: 'O comunitate profesională prezentă atunci când o cauți și discretă atunci când ai nevoie de concentrare — conexiunile apar natural, fără networking forțat și fără obligația de a participa.',
        variant: 'dark',
      },
    ],
  },
}

export default function CentralIdea({ eyebrow, title, description, cards }) {
  const { lang } = useLang()
  const t = T[lang]
  eyebrow = eyebrow ?? t.eyebrow
  title = title ?? t.title
  description = description ?? t.description
  cards = cards ?? t.cards
  return (
    <section className="section">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="cards-row-3">
        {cards.map(({ number, title: cardTitle, desc, variant }, i) => (
          <article
            key={number}
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
