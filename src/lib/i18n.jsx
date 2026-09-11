import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { DEFAULT_LANG, langFromPath } from './paths'

/* Site language. A lightweight context rather than an i18n library: each
 * component keeps its own co-located { en, ro } dictionary and picks with
 * useLang().
 *
 * Language is derived from the URL, not from state. Romanian lives at the bare
 * paths (/coworking) and English under /en (/en/coworking). Before this, the
 * language was localStorage state shared across one set of URLs, which meant
 * the English half of the site had no address at all: it could not be crawled,
 * linked, bookmarked or shared, and hreflang was impossible because hreflang
 * annotates URLs.
 *
 * Deriving from the path also removed the only thing this site stored in a
 * visitor's browser. It now stores nothing — see /cookies, which says so.
 *
 * Note there is deliberately NO automatic redirect based on a remembered
 * preference. An auto-redirect bounces crawlers between language versions and
 * makes the indexed copy disagree with the served one.
 */

const LangContext = createContext({ lang: DEFAULT_LANG })

export function LanguageProvider({ children }) {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)

  // Keeps <html lang> honest, which screen readers use to pick a voice and
  // which CSS can target (html[lang='ro']) where the copy runs longer.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  /* One-time cleanup of the key the old localStorage language switch wrote.
   * Dropping the write was not enough: every visitor who used the site before
   * 11 September 2026 still carries 'extind-lang' in their browser, which makes
   * /cookies ("stores nothing at all in your browser") false for exactly the
   * people most likely to have read the old version of that page. Nothing reads
   * the key any more, so this only has to remove it.
   *
   * Safe to delete once returning visitors have cycled through — say a year,
   * September 2027. Deleting it earlier only means a few stale keys linger. */
  useEffect(() => {
    try {
      localStorage.removeItem('extind-lang')
    } catch {
      /* storage blocked — in private mode and under some lockdown settings
         even reading localStorage throws, and there is nothing stored to
         clean up in that case anyway */
    }
  }, [])

  return <LangContext.Provider value={{ lang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
