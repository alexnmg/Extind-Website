/* Pure path helpers, no JSX and no React — so components, the language
 * provider and the Node build script can all share one definition of where a
 * language lives. Romanian is at the bare paths; English is under /en.
 */

export const LANGS = ['en', 'ro']
export const DEFAULT_LANG = 'ro'

const EN = '/en'

/* Is this URL under the English prefix?
 *
 * Case-INSENSITIVE on purpose. React Router matches route paths without regard
 * to case, so /EN/coworking reaches the English routes no matter what this file
 * believes. While this comparison was case-sensitive the two disagreed: the
 * English page rendered with Romanian copy, and the language switcher offered
 * /en/EN/coworking, which matches nothing.
 *
 * All three helpers below are expressed in terms of this one predicate, so the
 * question "is this English?" has a single answer that cannot drift between
 * deriving the language, adding the prefix and taking it off again.
 *
 * '/en' has to be a whole segment — '/english' is a Romanian path.
 */
const isEnPath = (p) => {
  if (p.slice(0, EN.length).toLowerCase() !== EN) return false
  const next = p.charAt(EN.length)
  return next === '' || next === '/'
}

export const langFromPath = (pathname) => (isEnPath(pathname) ? 'en' : 'ro')

/* Prefix an in-app path for a language. Anything that is not an absolute
 * in-app path — an external URL, a router location object, undefined — passes
 * through untouched. */
export function localePath(path, lang) {
  if (lang !== 'en') return path
  if (typeof path !== 'string' || !path.startsWith('/')) return path
  if (isEnPath(path)) return path
  return path === '/' ? EN : `${EN}${path}`
}

/* The Romanian path for any URL — the inverse of localePath. */
export function basePath(pathname) {
  if (!isEnPath(pathname)) return pathname
  return pathname.slice(EN.length) || '/'
}
