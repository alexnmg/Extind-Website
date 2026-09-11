import { useEffect } from 'react'
import { Link } from '../lib/LocaleLink'
import { useLang } from '../lib/i18n'

/* Previously every unknown URL rendered the homepage at a 200, so a typo'd or
 * dead link produced a plausible page under the wrong address and no broken
 * link could ever be noticed. The Worker cannot set a 404 status here — the
 * asset router answers before it — so the noindex tag is what keeps these out
 * of the index, which is Google's documented workaround for exactly this
 * architecture. */
const T = {
  ro: {
    docTitle: 'Pagina nu a fost găsită — Extind',
    eyebrow: '404',
    title: 'Pagina asta nu există',
    body: 'Poate a fost mutată, sau poate linkul avea o greșeală de tipar. Hai să te ducem înapoi.',
    home: 'Mergi la pagina principală',
    contact: 'Scrie-ne →',
  },
  en: {
    docTitle: 'Page not found — Extind',
    eyebrow: '404',
    title: 'This page doesn’t exist',
    body: 'It may have moved, or the link may have had a typo in it. Let’s get you back.',
    home: 'Go to the homepage',
    contact: 'Write to us →',
  },
}

export default function NotFound() {
  const { lang } = useLang()
  const t = T[lang]

  useEffect(() => {
    const prev = document.title
    document.title = t.docTitle

    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.appendChild(meta)

    /* The head this renders into always describes some other page. On a hard
     * load it is dist/index.html — the SPA fallback — whose canonical and
     * hreflang set point at the homepage pair; on a client-side navigation it
     * is whatever the previous route baked in. noindex alongside a canonical
     * pointing elsewhere is a conflicting pair of signals, and Google resolves
     * it by carrying the noindex to the canonical target, which here would be
     * the homepage — from every unknown URL on the site. So the inherited
     * annotations come out for as long as this page is mounted. Removed nodes
     * are kept, not recreated, so cleanup restores the exact head the next
     * route expects (and so a StrictMode mount/unmount/mount is a no-op). */
    const inherited = [
      ...document.head.querySelectorAll(
        'link[rel="canonical"], link[rel="alternate"][hreflang]'
      ),
    ]
    for (const link of inherited) link.remove()

    return () => {
      document.title = prev
      meta.remove()
      for (const link of inherited) document.head.appendChild(link)
    }
  }, [t.docTitle])

  return (
    <section className="section legal">
      <header className="legal__head" data-reveal>
        <p className="legal__eyebrow">{t.eyebrow}</p>
        <h1 className="legal__title">{t.title}</h1>
        <p className="legal__updated">{t.body}</p>
      </header>
      <div className="book-visit__footer" style={{ justifyContent: 'flex-start', gap: '12px' }}>
        <Link className="btn btn--primary" to="/" viewTransition>
          {t.home}
        </Link>
        <Link className="btn btn--ghost" to="/contact" viewTransition>
          {t.contact}
        </Link>
      </div>
    </section>
  )
}
