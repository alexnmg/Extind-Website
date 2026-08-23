import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { useLang } from '../lib/i18n'
import { posts, categories, CATEGORY_LABELS, AUTHOR } from '../data/community'

const T = {
  en: {
    docTitle: 'Extind Magazine — Extind',
    eyebrow: 'Extind Magazine',
    title: 'Guides for choosing your workspace',
    description:
      'Practical, no-nonsense reading on private offices, coworking and meeting spaces in Iași — what things cost, what’s included, and how to choose.',
    all: 'All',
    filterAria: 'Filter articles by category',
    minRead: 'min read',
  },
  ro: {
    docTitle: 'Extind Magazine — Extind',
    eyebrow: 'Extind Magazine',
    title: 'Ghiduri pentru alegerea spațiului de lucru',
    description:
      'Lecturi practice, la obiect, despre birouri private, coworking și săli de întâlniri în Iași — ce costă, ce este inclus și cum alegi.',
    all: 'Toate',
    filterAria: 'Filtrează articolele după categorie',
    minRead: 'min de citit',
  },
}

function ArticleCard({ post, lang, minRead }) {
  return (
    <Link className="blog-card" to={`/magazine/${post.slug}`} viewTransition>
      <div className="blog-card__media">
        <img src={post.image} alt="" loading="lazy" />
        <span className="blog-card__cat">{CATEGORY_LABELS[lang][post.category]}</span>
      </div>
      <div className="blog-card__body">
        <h3 className="blog-card__title">{post.title[lang]}</h3>
        <p className="blog-card__excerpt">{post.excerpt[lang]}</p>
        <p className="blog-card__meta">
          {AUTHOR[lang]} · {post.dateLabel[lang]} · {post.readingTime} {minRead}
        </p>
      </div>
    </Link>
  )
}

export default function Magazine() {
  const { lang } = useLang()
  const t = T[lang]
  const [activeCat, setActiveCat] = useState('all')

  useEffect(() => {
    const prev = document.title
    document.title = t.docTitle
    return () => {
      document.title = prev
    }
  }, [t.docTitle])

  const filtered = useMemo(
    () => (activeCat === 'all' ? posts : posts.filter((p) => p.category === activeCat)),
    [activeCat]
  )

  return (
    <section className="section">
      <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <div className="blog-filter" role="tablist" aria-label={t.filterAria}>
        {['all', ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeCat === cat}
            className={`blog-filter__chip${activeCat === cat ? ' blog-filter__chip--active' : ''}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat === 'all' ? t.all : CATEGORY_LABELS[lang][cat]}
          </button>
        ))}
      </div>
      <div className="blog-grid">
        {filtered.map((post) => (
          <ArticleCard key={post.slug} post={post} lang={lang} minRead={t.minRead} />
        ))}
      </div>
    </section>
  )
}
