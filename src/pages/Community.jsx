import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { featuredEvent, upcomingEvents, posts, categories } from '../data/community'

function EventCard({ event, index }) {
  return (
    <Link
      className="event-card"
      to={`/community/events/${event.slug}`}
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

function BlogCard({ post }) {
  return (
    <Link className="blog-card" to={`/community/blog/${post.slug}`} viewTransition>
      <div className="blog-card__media">
        <img src={post.image} alt="" loading="lazy" />
        <span className="blog-card__cat">{post.category}</span>
      </div>
      <div className="blog-card__body">
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <p className="blog-card__meta">
          {post.author} · {post.dateLabel} · {post.readingTime}
        </p>
      </div>
    </Link>
  )
}

export default function Community() {
  const [activeCat, setActiveCat] = useState('All')

  useEffect(() => {
    const prev = document.title
    document.title = 'Community & Events — Extind'
    return () => {
      document.title = prev
    }
  }, [])

  const filtered = useMemo(
    () => (activeCat === 'All' ? posts : posts.filter((p) => p.category === activeCat)),
    [activeCat]
  )
  const filters = ['All', ...categories]

  return (
    <>
      <section className="section">
        <SectionHeader
          eyebrow="Community & Events"
          title="Where the Extind community comes together"
          description="Talks, breakfasts and evenings hosted at Palas Campus — plus stories, guides and the occasional strong opinion from our journal."
        />

        {/* Featured event */}
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
                  to={`/community/events/${featuredEvent.slug}`}
                  viewTransition
                >
                  View details →
                </Link>
              </div>
            </div>
          </article>
        )}
      </section>

      {/* Upcoming events */}
      <section className="section">
        <SectionHeader
          eyebrow="Events"
          title="Upcoming events"
          description="Free to attend and open to members and guests alike. Follow the link on each event to sign up."
        />
        <div className="events-grid">
          {upcomingEvents.map((event, i) => (
            <EventCard key={event.slug} event={event} index={i} />
          ))}
        </div>
      </section>

      {/* Blog / journal */}
      <section className="section">
        <SectionHeader
          eyebrow="Journal"
          title="From the Extind journal"
          description="News, community updates, workspace know-how and where work is heading next."
        />
        <div className="blog-filter" role="tablist" aria-label="Filter articles by category">
          {filters.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCat === cat}
              className={`blog-filter__chip${activeCat === cat ? ' blog-filter__chip--active' : ''}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="blog-grid">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}
