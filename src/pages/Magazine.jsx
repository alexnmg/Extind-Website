import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { posts, categories } from '../data/community'

function ArticleCard({ post }) {
  return (
    <Link className="blog-card" to={`/magazine/${post.slug}`} viewTransition>
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

export default function Magazine() {
  const [activeCat, setActiveCat] = useState('All')

  useEffect(() => {
    const prev = document.title
    document.title = 'Extind Magazine — Extind'
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
        eyebrow="Extind Magazine"
        title="Guides for choosing your workspace"
        description="Practical, no-nonsense reading on private offices, coworking and meeting spaces in Iași — what things cost, what’s included, and how to choose."
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
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
