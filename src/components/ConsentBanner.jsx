import { useEffect, useSyncExternalStore } from 'react'
import { Link } from '../lib/LocaleLink'
import { useLang } from '../lib/i18n'
import { readConsent, setConsent, applyStoredConsent, subscribeConsent } from '../lib/consent'

/* Deliberately names no tool. The banner states what happens — cookies, for
 * measurement, nothing before you accept — and the cookie policy behind the link
 * carries the detail: which tools, which cookies, how long they last. That way
 * adding or swapping a measurement tool is a change to one page, not to the
 * sentence every visitor reads. */
const T = {
  en: {
    label: 'Cookie consent',
    body: 'We use cookies to measure how this site is used, so we can make it better. Nothing is loaded until you accept, and refusing changes nothing about how the site works.',
    accept: 'Accept',
    decline: 'Refuse',
    more: 'Cookie policy',
  },
  ro: {
    label: 'Acord pentru cookie-uri',
    body: 'Folosim cookie-uri ca să măsurăm cum este folosit site-ul și să îl putem îmbunătăți. Nu se încarcă nimic până nu accepți, iar dacă refuzi site-ul funcționează exact la fel.',
    accept: 'Accept',
    decline: 'Refuz',
    more: 'Politica de cookie-uri',
  },
}

/* Asks before Microsoft Clarity is allowed to load — see lib/consent.js.
 *
 * Accept and Refuse are the same size, weight and colour on purpose. A banner
 * where refusing is a faded link is not consent, and the cookie policy tells the
 * reader that refusing costs one click. */
export default function ConsentBanner() {
  const { lang } = useLang()
  const t = T[lang]

  /* Every route here is prerendered, and localStorage does not exist at build
     time. The server snapshot is deliberately a value that renders NOTHING, so
     the banner is absent from the static HTML and cannot flash at a visitor who
     accepted months ago; React swaps to the real snapshot after hydration.
     useSyncExternalStore rather than an effect because reading browser-only
     state during render is exactly what it is for. */
  const choice = useSyncExternalStore(subscribeConsent, readConsent, () => 'unanswered-on-server')

  useEffect(() => {
    applyStoredConsent()
  }, [])

  if (choice !== null) return null // 'granted' | 'denied' | the server snapshot

  const answer = (value) => setConsent(value)

  return (
    <div className="consent" role="region" aria-label={t.label}>
      <p className="consent__text">
        {t.body}{' '}
        <Link className="consent__link" to="/cookies" viewTransition>
          {t.more}
        </Link>
      </p>
      <div className="consent__actions">
        <button type="button" className="btn btn--ghost consent__btn" onClick={() => answer('denied')}>
          {t.decline}
        </button>
        <button type="button" className="btn btn--primary consent__btn" onClick={() => answer('granted')}>
          {t.accept}
        </button>
      </div>
    </div>
  )
}
