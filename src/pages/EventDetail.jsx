import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { getEvent } from '../data/community'

const T = {
  en: {
    back: '← All events',
    notFoundDoc: 'Event not found — Extind',
    notFoundTitle: 'Event not found',
    notFoundLede: 'This event may have wrapped up or moved. Head back to see what’s coming up next.',
    organisedBy: 'organised by',
    event: 'Event',
    date: 'Date',
    time: 'Time',
    where: 'Where',
    organiser: 'Organised by',
    note: 'Opens the sign-up page in a new tab.',
  },
  ro: {
    back: '← Toate evenimentele',
    notFoundDoc: 'Eveniment negăsit — Extind',
    notFoundTitle: 'Evenimentul nu a fost găsit',
    notFoundLede: 'Este posibil ca acest eveniment să se fi încheiat sau mutat. Întoarce-te să vezi ce urmează.',
    organisedBy: 'organizat de',
    event: 'Eveniment',
    date: 'Data',
    time: 'Ora',
    where: 'Unde',
    organiser: 'Organizat de',
    note: 'Deschide pagina de înscriere într-o filă nouă.',
  },
}

export default function EventDetail() {
  const { lang } = useLang()
  const t = T[lang]
  const { slug } = useParams()
  const event = getEvent(slug)

  useEffect(() => {
    const prev = document.title
    document.title = event ? `${event.name} — Extind` : t.notFoundDoc
    return () => {
      document.title = prev
    }
  }, [event, t.notFoundDoc])

  if (!event) {
    return (
      <section className="section detail">
        <Link className="back-link" to="/events" viewTransition>
          {t.back}
        </Link>
        <h1 className="detail__title">{t.notFoundTitle}</h1>
        <p className="detail__lede">{t.notFoundLede}</p>
      </section>
    )
  }

  return (
    <article className="section detail">
      <Link className="back-link" to="/events" viewTransition>
        {t.back}
      </Link>

      <div className="detail__hero">
        <img src={event.image} alt="" />
      </div>

      <div className="detail__head">
        <p className="detail__eyebrow">
          {t.event} · {t.organisedBy} {event.organiser}
        </p>
        <h1 className="detail__title">{event.name}</h1>
        <p className="detail__lede">{event.blurb}</p>
      </div>

      <dl className="event-meta">
        <div className="event-meta__row">
          <dt>{t.date}</dt>
          <dd>{event.dateLabel}</dd>
        </div>
        <div className="event-meta__row">
          <dt>{t.time}</dt>
          <dd>{event.time}</dd>
        </div>
        <div className="event-meta__row">
          <dt>{t.where}</dt>
          <dd>{event.location}</dd>
        </div>
        <div className="event-meta__row">
          <dt>{t.organiser}</dt>
          <dd>{event.organiser}</dd>
        </div>
      </dl>

      <div className="detail__body">
        {event.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="detail__cta">
        <a className="btn btn--primary" href={event.joinUrl} target="_blank" rel="noreferrer">
          {event.joinLabel}
        </a>
        <span className="detail__cta-note">{t.note}</span>
      </div>
    </article>
  )
}
