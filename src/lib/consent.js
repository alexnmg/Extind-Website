/* Consent for Microsoft Clarity, and the only thing this site stores in a
 * visitor's browser.
 *
 * The rule the cookie policy commits us to: Clarity is NEVER loaded until
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

/* Clarity's own first-party cookies, cleared when consent is withdrawn. */
const CLARITY_COOKIES = ['_clck', '_clsk']

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

let loaded = false

/* The official Clarity snippet, minus the inline <script> wrapper. Injecting it
 * from the bundle rather than inlining it in index.html is deliberate: the
 * site's CSP has no 'unsafe-inline' for scripts and is not getting one. The
 * injected <script src> is checked against script-src, where clarity.ms is
 * allowed explicitly. */
function loadClarity() {
  if (loaded || typeof window === 'undefined' || window.clarity) return
  loaded = true
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
}

/** Deletes what Clarity left behind. Best effort — see withdrawConsent. */
function clearClarityStorage() {
  if (typeof document === 'undefined') return
  for (const name of CLARITY_COOKIES) {
    // Clarity sets these first-party, so clearing on the current host is enough;
    // the leading-dot variant covers the cookie set against the registrable domain.
    document.cookie = `${name}=; Max-Age=0; path=/`
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}`
  }
  try {
    for (const k of Object.keys(localStorage)) {
      if (k.startsWith('_cl')) localStorage.removeItem(k)
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
  if (value === 'granted') loadClarity()
  else clearClarityStorage()
  for (const fn of listeners) fn()
}

/* Run on every page load. Loads Clarity only for a visitor who has already
 * said yes; does nothing at all for everyone else. */
export function applyStoredConsent() {
  if (readConsent() === 'granted') loadClarity()
}

/* Withdrawing mid-session: the script is already running on this page, and
 * Clarity exposes no documented way to unload it. Clearing its storage and
 * reloading is the honest way to stop it — after the reload applyStoredConsent
 * sees 'denied' and never injects the tag again. The cookie page offers this. */
export function withdrawConsent() {
  safeWrite('denied')
  clearClarityStorage()
  if (typeof location !== 'undefined') location.reload()
}
