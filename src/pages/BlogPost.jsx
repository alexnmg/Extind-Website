import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPost } from '../data/community'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  useEffect(() => {
    const prev = document.title
    document.title = post ? `${post.title} — Extind` : 'Article not found — Extind'
    return () => {
      document.title = prev
    }
  }, [post])

  if (!post) {
    return (
      <section className="section detail">
        <Link className="back-link" to="/journal" viewTransition>
          ← All articles
        </Link>
        <h1 className="detail__title">Article not found</h1>
        <p className="detail__lede">This article may have moved. Head back to the journal.</p>
      </section>
    )
  }

  return (
    <article className="section detail">
      <Link className="back-link" to="/journal" viewTransition>
        ← All articles
      </Link>

      <div className="detail__hero">
        <img src={post.image} alt="" />
        <span className="blog-card__cat detail__cat">{post.category}</span>
      </div>

      <div className="detail__head">
        <h1 className="detail__title">{post.title}</h1>
        <p className="detail__eyebrow">
          {post.author} · {post.dateLabel} · {post.readingTime}
        </p>
      </div>

      <div className="detail__body">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="detail__cta">
        <Link className="btn btn--primary" to="/book-a-visit" viewTransition>
          Book a visit
        </Link>
        <span className="detail__cta-note">See the space that made the story.</span>
      </div>
    </article>
  )
}
