import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getEvent } from '../data/community'

export default function EventDetail() {
  const { slug } = useParams()
  const event = getEvent(slug)

  useEffect(() => {
    const prev = document.title
    document.title = event ? `${event.name} — Extind` : 'Event not found — Extind'
    return () => {
      document.title = prev
    }
  }, [event])

  if (!event) {
    return (
      <section className="section detail">
        <Link className="back-link" to="/community" viewTransition>
          ← Community &amp; Events
        </Link>
        <h1 className="detail__title">Event not found</h1>
        <p className="detail__lede">
          This event may have wrapped up or moved. Head back to see what’s coming up next.
        </p>
      </section>
    )
  }

  return (
    <article className="section detail">
      <Link className="back-link" to="/community" viewTransition>
        ← Community &amp; Events
      </Link>

      <div className="detail__hero">
        <img src={event.image} alt="" />
      </div>

      <div className="detail__head">
        <p className="detail__eyebrow">Event · organised by {event.organiser}</p>
        <h1 className="detail__title">{event.name}</h1>
        <p className="detail__lede">{event.blurb}</p>
      </div>

      <dl className="event-meta">
        <div className="event-meta__row">
          <dt>Date</dt>
          <dd>{event.dateLabel}</dd>
        </div>
        <div className="event-meta__row">
          <dt>Time</dt>
          <dd>{event.time}</dd>
        </div>
        <div className="event-meta__row">
          <dt>Where</dt>
          <dd>{event.location}</dd>
        </div>
        <div className="event-meta__row">
          <dt>Organised by</dt>
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
        <span className="detail__cta-note">Opens the sign-up page in a new tab.</span>
      </div>
    </article>
  )
}
