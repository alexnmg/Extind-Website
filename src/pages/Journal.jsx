import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { posts, categories } from '../data/community'

function BlogCard({ post }) {
  return (
    <Link className="blog-card" to={`/journal/${post.slug}`} viewTransition>
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

export default function Journal() {
  const [activeCat, setActiveCat] = useState('All')

  useEffect(() => {
    const prev = document.title
    document.title = 'Journal — Extind'
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
    <section className="section">
      <SectionHeader
        eyebrow="Journal"
        title="From the Extind journal"
        description="News from the building, community updates, practical workspace know-how, and honest takes on where work is heading next."
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
  )
}
