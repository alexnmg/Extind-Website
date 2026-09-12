/* Bakes per-route metadata into real HTML files, and writes robots.txt and
 * sitemap.xml. Runs after `vite build`.
 *
 * The site is a client-rendered SPA, so without this every route serves the
 * same 785-byte shell. Google renders JS and would cope, but the crawlers that
 * build link previews — Facebook, WhatsApp, LinkedIn, Slack, iMessage, X — do
 * not execute JavaScript, and neither do several search engines. They see the
 * shell.
 *
 * Cloudflare Workers Static Assets serves /coworking from dist/coworking.html
 * before falling back to index.html, so writing flat files is all that is
 * needed. Asset URLs in index.html are absolute, so a copy at any path works.
 *
 * FLAT FILES ONLY — the English homepage included: dist/en.html, never
 * dist/en/index.html. Under the default html_handling ("auto-trailing-slash")
 * a directory index is not served at its bare path: GET /en would answer 307
 * to /en/. And /en is the URL every hreflang on all 26 pages, the English
 * canonical, its og:url and two sitemap entries point at, so a directory index
 * would make every one of those a redirect.
 *
 * This FAILS the build rather than warning: a missing og image, or a route
 * added to the PAGES table in src/App.jsx with no entry in ROUTES, would
 * otherwise ship silently — the first as a blank share preview, the second as
 * a real page wearing the homepage's title and canonical — and surface weeks
 * later.
 */
import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { SITE, ROUTES, ORGANIZATION_JSONLD } from '../src/lib/seo.js'
import { localePath } from '../src/lib/paths.js'
import { render } from '../dist-ssr/entry-server.js'

const ROOT = path.resolve(import.meta.dirname, '..')
const DIST = path.join(ROOT, 'dist')
const MAX_OG_BYTES = 600_000 // WhatsApp's documented ceiling

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

const shell = readFileSync(path.join(DIST, 'index.html'), 'utf8')
if (!shell.includes('<title>')) {
  console.error('build-seo: dist/index.html has no <title> to replace')
  process.exit(1)
}
if (!shell.includes('<div id="root"></div>')) {
  console.error('build-seo: dist/index.html has no empty <div id="root"></div> to prerender into')
  process.exit(1)
}

const errors = []

/* ---- inline the stylesheet ------------------------------------------------
 * Left as a <link> it is render-blocking, so nothing paints until a second
 * round trip completes. Measured on a throttled 4G profile, inlining it halves
 * First Contentful Paint (1.6s -> 0.85s): the document already costs one round
 * trip, and this rides along in it.
 *
 * Worth it here and not everywhere: one stylesheet serves the whole site, the
 * pages are SPA-navigated after the first one (so a second HTML response is
 * rare), and 11 kB gzipped is small enough that carrying it per page beats
 * waiting for it. Every URL in the file is absolute (/fonts/...), so it needs
 * no rebasing.
 *
 * Fails the build if the link is missing: silently reverting to a blocking
 * stylesheet is exactly the regression this would otherwise hide. */
const cssLink = shell.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/)
if (!cssLink) {
  console.error('build-seo: no stylesheet <link> found in dist/index.html to inline')
  process.exit(1)
}
const cssFile = path.join(DIST, cssLink[1])
if (!existsSync(cssFile)) {
  console.error(`build-seo: stylesheet ${cssLink[1]} is linked but not in dist`)
  process.exit(1)
}
const inlined = shell.replace(cssLink[0], `<style>${readFileSync(cssFile, 'utf8')}</style>`)

/* ---- hero image preload ---------------------------------------------------
 * The hero photograph is the Largest Contentful Paint element on every page
 * that has one, and ImageCardSlider is the only thing that marks an image
 * fetchpriority="high" — so reading the choice back out of the prerendered body
 * keeps this in step with what the page actually rendered, rather than adding a
 * second table to keep in sync.
 *
 * Needed because of the inlining above: without it the browser's preload
 * scanner only reaches the <img> after 65 kB of stylesheet has streamed past,
 * which costs the image most of what the stylesheet just saved. Typed AVIF, so
 * a browser without AVIF ignores it and fetches the WebP or JPEG as usual —
 * the srcset and sizes are copied verbatim from the <source> the picture would
 * pick, so a browser that honours it downloads the same bytes once. */
function heroPreload(route, body) {
  const picture = body.match(/<picture>(?:(?!<picture>)[\s\S])*?fetchPriority="high"[\s\S]*?<\/picture>/)
  if (!picture) return '' // legal: the legal pages and /contact have no hero photo
  const avif = picture[0].match(/<source type="image\/avif" srcSet="([^"]+)" sizes="([^"]+)"\s*\/>/)
  if (!avif) {
    errors.push(`${route}: hero image is marked high priority but its AVIF <source> did not parse`)
    return ''
  }
  return (
    `<link rel="preload" as="image" type="image/avif" fetchpriority="high"` +
    ` imagesrcset="${avif[1]}" imagesizes="${avif[2]}" />\n    `
  )
}
let preloaded = 0

const OG_LOCALE = { ro: 'ro_RO', en: 'en_GB' }

/* ---- route cross-check ----------------------------------------------------
 * src/App.jsx's PAGES table is JSX, so Node cannot import it; this reads it as
 * text. Entries are one per line and commented-out routes (the magazine) must
 * not count, so comment lines are dropped before matching. Returns null when
 * the table cannot be found, which is itself reported — a silently skipped
 * check is worse than no check. */
function routedPaths() {
  const src = readFileSync(path.join(ROOT, 'src', 'App.jsx'), 'utf8')
  const table = src.match(/const PAGES = \[([\s\S]*?)\n\s*\]/)
  if (!table) {
    errors.push('src/App.jsx: no `const PAGES = [ … ]` table found — route cross-check could not run')
    return null
  }
  const paths = []
  for (const line of table[1].split('\n')) {
    if (/^\s*(\/\/|\/\*|\*)/.test(line)) continue
    const m = line.match(/path:\s*'([^']*)'/)
    if (m) paths.push(m[1])
  }
  return paths
}

const routed = routedPaths()
if (routed) {
  const tabled = new Set(Object.keys(ROUTES))
  for (const r of routed) {
    // '/events/:slug' is dynamic — one static head cannot describe every event,
    // and those pages are reached from /events, which is tabled.
    if (r.includes(':')) continue
    if (!tabled.has(r)) errors.push(`${r}: routed in src/App.jsx but has no ROUTES entry in src/lib/seo.js`)
  }
  for (const r of tabled) {
    if (!routed.includes(r))
      errors.push(`${r}: has a ROUTES entry but no route in src/App.jsx — it would be baked, linked from the sitemap, and render the 404`)
  }
}

function head(route, meta, lang) {
  const href = localePath(route, lang)
  const url = `${SITE.origin}${href === '/' ? '/' : href}`
  const img = `${SITE.origin}${meta.image}`

  /* Both versions of a page must point at each other AND at themselves, or
   * Google ignores the annotation entirely. x-default goes to Romanian, which
   * is the site's primary language and the URL that was live first. */
  const roUrl = `${SITE.origin}${route === '/' ? '/' : route}`
  const enUrl = `${SITE.origin}${localePath(route, 'en')}`

  const file = path.join(ROOT, 'public', meta.image)
  if (!existsSync(file)) errors.push(`${route}: og image missing — public${meta.image}`)
  else if (statSync(file).size > MAX_OG_BYTES)
    errors.push(`${route}: og image over ${MAX_OG_BYTES} bytes — public${meta.image}`)

  const tags = [
    `<title>${esc(meta.title[lang])}</title>`,
    `<meta name="description" content="${esc(meta.description[lang])}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="ro" href="${roUrl}" />`,
    `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${roUrl}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    `<meta property="og:locale:alternate" content="${OG_LOCALE[lang === 'ro' ? 'en' : 'ro']}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(meta.ogTitle[lang])}" />`,
    `<meta property="og:description" content="${esc(meta.description[lang])}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(meta.imageAlt[lang])}" />`,
    // The only twitter:* tag needed — X falls back to the og:* values for the rest.
    `<meta name="twitter:card" content="summary_large_image" />`,
  ]

  // JSON-LD only on the homepage: one Organization statement per site is what
  // Google wants, and repeating it on 13 pages adds nothing.
  if (route === '/') {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(ORGANIZATION_JSONLD).replace(/</g, '\\u003c')}</script>`
    )
  }
  return tags.join('\n    ')
}

let written = 0
for (const [route, meta] of Object.entries(ROUTES)) {
  for (const lang of ['ro', 'en']) {
    const p = localePath(route, lang)

    /* Prerender the page body. Without this every URL shipped an empty
     * <div id="root">: fine for Google, which renders JavaScript, and useless
     * for the preview crawlers, several search engines and most AI crawlers,
     * which do not. A render that throws fails the build rather than silently
     * shipping an empty shell — that is the whole failure mode this guards. */
    let body
    try {
      body = render(p)
    } catch (err) {
      errors.push(`${p}: prerender threw — ${err.message}`)
      body = ''
    }

    const preload = heroPreload(p, body)
    if (preload) preloaded++

    const html = inlined
      // The preload goes in front of the title, so it is inside the first
      // kilobyte of every response rather than behind the inlined stylesheet.
      .replace(/<title>[^<]*<\/title>/, preload + head(route, meta, lang))
      .replace('<html lang="ro">', `<html lang="${lang}">`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    // '/' -> index.html, '/en' -> en.html, '/en/coworking' -> en/coworking.html
    const name = p === '/' ? 'index.html' : `${p.slice(1)}.html`
    const file = path.join(DIST, name)
    mkdirSync(path.dirname(file), { recursive: true })
    writeFileSync(file, html)
    written++
  }
}

/* Builds before this one wrote the English homepage to dist/en/index.html.
 * `vite build` empties dist, but this script is also runnable on its own, and a
 * leftover directory index either wins the /en lookup — putting the redirect
 * back — or serves the same page at a second address nothing links to. */
rmSync(path.join(DIST, 'en', 'index.html'), { force: true })

// ---- robots.txt ------------------------------------------------------------
writeFileSync(
  path.join(DIST, 'robots.txt'),
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE.origin}/sitemap.xml`, ''].join('\n')
)

// ---- sitemap.xml -----------------------------------------------------------
/* No <lastmod>. It used to carry the build date on every entry, which told
 * Google that all 26 pages changed each time anything was deployed — a CSS
 * tweak, a typo fix. Google's documented response to a lastmod it finds
 * unreliable is to ignore the field site-wide, so a date that is always "today"
 * spends the signal instead of sending it. The honest per-page alternative is a
 * real content-changed date, which nothing in this repo tracks: the build knows
 * when it ran, not when the copy last changed. Omitting the field is a valid
 * sitemap and leaves Google on its own crawl heuristics, which is where a
 * fabricated date leaves it anyway — only without the mistrust. Add it back the
 * day a route's copy carries its own date. */
const urls = Object.keys(ROUTES)
  .flatMap((r) => {
    const ro = `${SITE.origin}${r === '/' ? '/' : r}`
    const en = `${SITE.origin}${localePath(r, 'en')}`
    // Each entry carries the full alternate set, which is what Google expects
    // in a sitemap and saves annotating the same pair twice by hand.
    const alts = [
      `    <xhtml:link rel="alternate" hreflang="ro" href="${ro}"/>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${ro}"/>`,
    ].join('\n')
    return [ro, en].map((loc) => `  <url>\n    <loc>${loc}</loc>\n${alts}\n  </url>`)
  })
  .join('\n')
writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
)

if (errors.length) {
  console.error('\nbuild-seo FAILED:')
  for (const e of errors) console.error(`  ${e}`)
  process.exit(1)
}

const emptyShells = written === 0 ? 0 : null
console.log(
  `build-seo: ${written} route pages (ro + en, prerendered, css inlined, ${preloaded} hero preloads), ` +
    `robots.txt, sitemap.xml (${Object.keys(ROUTES).length * 2} urls)`
)
