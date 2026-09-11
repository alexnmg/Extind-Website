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
 * This FAILS the build rather than warning: a missing og image or an untabled
 * route would otherwise ship silently and only show up as a blank share
 * preview weeks later.
 */
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { SITE, ROUTES, ORGANIZATION_JSONLD } from '../src/lib/seo.js'

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

const errors = []

function head(route, meta) {
  const url = `${SITE.origin}${route === '/' ? '/' : route}`
  const img = `${SITE.origin}${meta.image}`

  const file = path.join(ROOT, 'public', meta.image)
  if (!existsSync(file)) errors.push(`${route}: og image missing — public${meta.image}`)
  else if (statSync(file).size > MAX_OG_BYTES)
    errors.push(`${route}: og image over ${MAX_OG_BYTES} bytes — public${meta.image}`)

  const tags = [
    `<title>${esc(meta.title.ro)}</title>`,
    `<meta name="description" content="${esc(meta.description.ro)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(meta.ogTitle.ro)}" />`,
    `<meta property="og:description" content="${esc(meta.description.ro)}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(meta.imageAlt.ro)}" />`,
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
  const html = shell.replace(/<title>[^<]*<\/title>/, head(route, meta))
  const name = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  writeFileSync(path.join(DIST, name), html)
  written++
}

// ---- robots.txt ------------------------------------------------------------
writeFileSync(
  path.join(DIST, 'robots.txt'),
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE.origin}/sitemap.xml`, ''].join('\n')
)

// ---- sitemap.xml -----------------------------------------------------------
const today = new Date().toISOString().slice(0, 10)
const urls = Object.keys(ROUTES)
  .map(
    (r) =>
      `  <url><loc>${SITE.origin}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`
  )
  .join('\n')
writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
)

if (errors.length) {
  console.error('\nbuild-seo FAILED:')
  for (const e of errors) console.error(`  ${e}`)
  process.exit(1)
}

console.log(`build-seo: ${written} route pages, robots.txt, sitemap.xml (${Object.keys(ROUTES).length} urls)`)
