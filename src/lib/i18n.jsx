import { createContext, useContext, useEffect, useState } from 'react'

/* Site language. A lightweight context rather than an i18n library: each
 * component keeps its own co-located { en, ro } dictionary and picks with
 * useLang(). Romanian is the site's primary language: new visitors get RO,
 * and a returning visitor's choice is restored from localStorage. The <html
 * lang> attribute tracks it, which also lets CSS target a language
 * (html[lang='ro']) where copy runs longer. */

const STORAGE_KEY = 'extind-lang'
export const LANGS = ['en', 'ro']
export const DEFAULT_LANG = 'ro'

const LangContext = createContext({ lang: DEFAULT_LANG, setLang: () => {} })

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (LANGS.includes(saved)) return saved
  } catch {
    /* storage blocked — fall through to the default */
  }
  return DEFAULT_LANG
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage blocked — the choice just won't persist */
    }
    document.documentElement.lang = lang
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
