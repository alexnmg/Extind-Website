import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { getPost, CATEGORY_LABELS, AUTHOR } from '../data/community'

const T = {
  en: {
    back: '← All articles',
    notFoundDoc: 'Article not found — Extind',
    notFoundTitle: 'Article not found',
    notFoundLede: 'This article may have moved. Head back to the magazine.',
    minRead: 'min read',
    cta: 'Book a visit',
    ctaNote: 'See the space that made the story.',
  },
  ro: {
    back: '← Toate articolele',
    notFoundDoc: 'Articol negăsit — Extind',
    notFoundTitle: 'Articolul nu a fost găsit',
    notFoundLede: 'Este posibil ca articolul să se fi mutat. Întoarce-te la revistă.',
    minRead: 'min de citit',
    cta: 'Programează o vizită',
    ctaNote: 'Vezi spațiul din spatele articolului.',
  },
}

export default function BlogPost() {
  const { lang } = useLang()
  const t = T[lang]
  const { slug } = useParams()
  const post = getPost(slug)

  useEffect(() => {
    const prev = document.title
    document.title = post ? `${post.title[lang]} — Extind` : t.notFoundDoc
    return () => {
      document.title = prev
    }
  }, [post, lang, t.notFoundDoc])

  if (!post) {
    return (
      <section className="section detail">
        <Link className="back-link" to="/magazine" viewTransition>
          {t.back}
        </Link>
        <h1 className="detail__title">{t.notFoundTitle}</h1>
        <p className="detail__lede">{t.notFoundLede}</p>
      </section>
    )
  }

  return (
    <article className="section detail">
      <Link className="back-link" to="/magazine" viewTransition>
        {t.back}
      </Link>

      <div className="detail__hero">
        <img src={post.image} alt="" />
        <span className="blog-card__cat detail__cat">{CATEGORY_LABELS[lang][post.category]}</span>
      </div>

      <div className="detail__head">
        <h1 className="detail__title">{post.title[lang]}</h1>
        <p className="detail__eyebrow">
          {AUTHOR[lang]} · {post.dateLabel[lang]} · {post.readingTime} {t.minRead}
        </p>
      </div>

      <div className="detail__body">
        {post.body[lang].map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="detail__cta">
        <Link className="btn btn--primary" to="/book-a-visit" viewTransition>
          {t.cta}
        </Link>
        <span className="detail__cta-note">{t.ctaNote}</span>
      </div>
    </article>
  )
}
