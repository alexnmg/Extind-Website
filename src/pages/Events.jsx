import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { featuredEvent, upcomingEvents } from '../data/community'

function EventCard({ event, index }) {
  return (
    <Link
      className="event-card"
      to={`/events/${event.slug}`}
      data-reveal
      style={{ '--reveal-delay': `${(index % 3) * 80}ms` }}
      viewTransition
    >
      <div className="event-card__media">
        <img src={event.image} alt="" loading="lazy" />
      </div>
      <div className="event-card__body">
        <p className="event-card__meta">
          {event.organiser} · {event.dateLabel}
        </p>
        <h3 className="event-card__title">{event.name}</h3>
        <p className="event-card__desc">{event.blurb}</p>
        <span className="event-card__more">View details →</span>
      </div>
    </Link>
  )
}

export default function Events() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Events — Extind'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <>
      <section className="section">
        <SectionHeader
          eyebrow="Events"
          title="What’s on at Extind"
          description="Founders’ breakfasts, meetups, panels and pitch nights — hosted in the Vista Lounge and across Palas Campus. Most are free and open to guests."
        />

        {featuredEvent && (
          <article className="featured-event" data-reveal>
            <div className="featured-event__media">
              <img src={featuredEvent.image} alt="" />
              <span className="featured-event__tag">Featured event</span>
            </div>
            <div className="featured-event__body">
              <p className="featured-event__meta">
                {featuredEvent.organiser} · {featuredEvent.dateLabel} · {featuredEvent.time}
              </p>
              <h3 className="featured-event__title">{featuredEvent.name}</h3>
              <p className="featured-event__desc">{featuredEvent.blurb}</p>
              <p className="featured-event__where">{featuredEvent.location}</p>
              <div className="featured-event__actions">
                <a
                  className="btn btn--primary"
                  href={featuredEvent.joinUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {featuredEvent.joinLabel}
                </a>
                <Link
                  className="btn btn--ghost"
                  to={`/events/${featuredEvent.slug}`}
                  viewTransition
                >
                  View details →
                </Link>
              </div>
            </div>
          </article>
        )}
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Upcoming"
          title="Upcoming events"
          description="Follow the link on each event to sign up. New dates are added every month."
        />
        <div className="events-grid">
          {upcomingEvents.map((event, i) => (
            <EventCard key={event.slug} event={event} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
