/* Consent for the measurement tools, and the only thing this site stores in a
 * visitor's browser.
 *
 * The rule the cookie policy commits us to: NOTHING here is loaded until
 * someone has actively accepted. There is no implied consent, no "by continuing
 * you agree", and refusing is one click, same as accepting. If you change how
 * this works, change src/pages/Cookies.jsx in the same commit — that page
 * describes this behaviour to the reader in two languages.
 *
 * Storing the answer is itself a stored value, which is why the policy says so.
 * It is exempt from consent (remembering a consent decision is what makes the
 * decision meaningful), but it is not invisible and should not be described as
 * if the site still stores nothing.
 */

const KEY = 'extind:consent'
const CLARITY_ID = 'ygp9qhgzzo'
const GA_ID = 'G-15BNVZTPHC'

/* First-party cookies the two tools set, cleared when consent is withdrawn.
   GA4 uses _ga plus one per measurement id; the prefix catches both. */
const TOOL_COOKIES = ['_clck', '_clsk', '_ga', `_ga_${GA_ID.replace(/^G-/, '')}`]
const TOOL_COOKIE_PREFIXES = ['_cl', '_ga']

/* Every storage call is guarded: Safari in private mode and browsers set to
 * block site data throw on access rather than returning null. */
function safeRead() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

function safeWrite(value) {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* A browser that will not store the answer will ask again next visit.
       That is the correct failure: it never silently upgrades to "granted". */
  }
}

/** 'granted' | 'denied' | null (never asked, or storage unavailable). */
export function readConsent() {
  const v = safeRead()
  return v === 'granted' || v === 'denied' ? v : null
}

let clarityLoaded = false
let gaLoaded = false

/* The official Clarity snippet, minus the inline <script> wrapper. Injecting it
 * from the bundle rather than inlining it in index.html is deliberate: the
 * site's CSP has no 'unsafe-inline' for scripts and is not getting one. The
 * injected <script src> is checked against script-src, where clarity.ms is
 * allowed explicitly. */
function loadClarity() {
  if (clarityLoaded || typeof window === 'undefined' || window.clarity) return
  clarityLoaded = true
  window.clarity =
    window.clarity ||
    function () {
      ;(window.clarity.q = window.clarity.q || []).push(arguments)
    }
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.async = true
  s.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
  document.head.appendChild(s)

  /* Clarity keeps itself cookieless until it is told consent was given, so
   * without this it records but cannot recognise a returning visit. The call is
   * queued on window.clarity above and runs once the library arrives. We only
   * ever reach here after an explicit accept, so signalling it is honest —
   * and it is what makes the two cookies the cookie policy names actually
   * appear. Withdrawing calls the same API with false before clearing. */
  window.clarity('consent')
}

/* Google Analytics 4. Same gate as Clarity: this function is only ever reached
 * from an explicit accept. The official snippet is two <script> elements, one
 * remote and one inline; the inline half is written as ordinary module code
 * here because the CSP has no 'unsafe-inline' for scripts and is not getting
 * one.
 *
 * NOTE on this being a single-page app: gtag sends one page_view when it loads,
 * and route changes afterwards are picked up only by GA4's enhanced measurement
 * ("Page changes based on browser history events", on by default in the GA
 * admin). If that is ever switched off, every visit will report as one page —
 * send page_view manually on navigation at that point rather than wondering why
 * the numbers look flat. */
function loadGa() {
  if (gaLoaded || typeof window === 'undefined') return
  gaLoaded = true
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
  gtag('js', new Date())
  gtag('config', GA_ID)
}

/* Both tools, in the order the page benefits from. */
function loadMeasurement() {
  loadClarity()
  loadGa()
}

/** Deletes what the measurement tools left behind. See withdrawConsent. */
function clearMeasurementStorage() {
  if (typeof document === 'undefined') return
  // Tell Clarity first, so it stops writing before we delete what it wrote.
  try {
    window.clarity?.('consent', false)
  } catch {
    /* library never loaded — nothing to tell */
  }
  const present = document.cookie
    .split(';')
    .map((c) => c.trim().split('=')[0])
    .filter((n) => TOOL_COOKIE_PREFIXES.some((pre) => n.startsWith(pre)))
  for (const name of new Set([...TOOL_COOKIES, ...present])) {
    // Clarity sets these first-party, so clearing on the current host is enough;
    // the leading-dot variant covers the cookie set against the registrable domain.
    document.cookie = `${name}=; Max-Age=0; path=/`
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}`
  }
  try {
    for (const k of Object.keys(localStorage)) {
      if (TOOL_COOKIE_PREFIXES.some((pre) => k.startsWith(pre))) localStorage.removeItem(k)
    }
  } catch {
    /* storage blocked — nothing of Clarity's to remove either */
  }
}

/* The banner subscribes so it can hide itself the moment an answer is given,
 * without the component owning a second copy of the value. */
const listeners = new Set()

export function subscribeConsent(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/** Records the answer and acts on it. Call on the banner's two buttons. */
export function setConsent(value) {
  safeWrite(value)
  if (value === 'granted') loadMeasurement()
  else clearMeasurementStorage()
  for (const fn of listeners) fn()
}

/* Run on every page load. Loads Clarity only for a visitor who has already
 * said yes; does nothing at all for everyone else. */
export function applyStoredConsent() {
  if (readConsent() === 'granted') loadMeasurement()
}

/* Withdrawing mid-session: the script is already running on this page, and
 * Clarity exposes no documented way to unload it. Clearing its storage and
 * reloading is the honest way to stop it — after the reload applyStoredConsent
 * sees 'denied' and never injects the tag again. The cookie page offers this. */
export function withdrawConsent() {
  safeWrite('denied')
  clearMeasurementStorage()
  if (typeof location !== 'undefined') location.reload()
}
