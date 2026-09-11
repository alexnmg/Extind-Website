import { useEffect } from 'react'
import { Link } from 'react-router-dom'

/* Shared layout for the legal pages (privacy, cookies).
 *
 * The content arrives as plain data so each page stays readable as a document
 * rather than as markup: a section is { h, p?[], ul?[], note?[], links?[] } — note
 * being the paragraphs that belong AFTER the list — and a link
 * is either { label, to } (internal) or { label, href } (external). Nothing
 * here is clever on purpose — legal copy should be easy to amend. */
export default function LegalPage({ docTitle, eyebrow, title, updatedLabel, sections }) {
  useEffect(() => {
    const prev = document.title
    document.title = docTitle
    return () => {
      document.title = prev
    }
  }, [docTitle])

  return (
    <div className="section legal">
      <header className="legal__head" data-reveal>
        <p className="legal__eyebrow">{eyebrow}</p>
        <h1 className="legal__title">{title}</h1>
        <p className="legal__updated">{updatedLabel}</p>
      </header>

      <div className="legal__body">
        {sections.map((s, i) => (
          <section className="legal__section" key={i} data-reveal>
            <h2 className="legal__heading">{s.h}</h2>
            {s.p?.map((para, j) => (
              <p className="legal__para" key={j}>
                {para}
              </p>
            ))}
            {s.ul && (
              <ul className="legal__list">
                {s.ul.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
            {s.note?.map((para, j) => (
              <p className="legal__para" key={j}>
                {para}
              </p>
            ))}
            {s.links && (
              <p className="legal__links">
                {s.links.map((link, j) => (
                  <span key={link.to ?? link.href}>
                    {j > 0 && <span className="legal__links-sep">·</span>}
                    {link.to ? (
                      <Link to={link.to} viewTransition>
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    )}
                  </span>
                ))}
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
