/* Generates the social sharing images in public/og/.
 *
 * Run with `npm run og`. Committed output, not a build step — these change only
 * when the photography or the brand does, and regenerating them on every build
 * would churn 9 binaries for nothing.
 *
 * One spec covers every platform: 1200x630 JPEG. That clears LinkedIn's
 * 1200x627 minimum (1200x600 would miss it by 27px), sits on Meta's 1.91:1,
 * clears Apple's 900px width and WhatsApp's 300px/4:1 floor, and is well inside
 * X's 4096 ceiling. X centre-crops to 2:1, costing 15px top and bottom, which
 * the composition absorbs.
 *
 * Composition is deliberately text-free: a photo band above a full-bleed cream
 * strip carrying the wordmark. The words live in og:title, og:description and
 * og:image:alt, where each platform renders them in its own UI at its own size
 * and a screen reader can actually read them. A full-bleed strip rather than a
 * corner plate because it survives both the centre-square crop some clients
 * apply and X's 2:1 — the mark is present in every context.
 */
import { spawnSync } from 'node:child_process'
import { mkdirSync, existsSync, statSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const PHOTOS = path.join(ROOT, 'src/assets/photos')
const OUT = path.join(ROOT, 'public/og')

const W = 1200, H = 630, BAND = 129, PHOTO_H = H - BAND, RULE = 3
const CREAM = '#f6f2ef', FOREST = '#465248'
const MAX_BYTES = 600_000 // WhatsApp's ceiling; we aim far below

/* Portrait sources lose ~65% of their height to a 1.91:1 crop, so they are
 * avoided here. Anchors are a first pass — adjusting one is a one-word change. */
const MANIFEST = [
  { key: 'home',                  src: 'open-office.jpg',        anchor: 'center' },
  { key: 'about',                 src: 'about-logohero.jpg',     anchor: 'center' },
  { key: 'private-offices',       src: 'private-office.jpg',     anchor: 'center' },
  { key: 'executive-day-office',  src: 'exec-slide-1.jpg',       anchor: 'center' },
  { key: 'coworking',             src: 'coworking.jpg',          anchor: 'center' },
  { key: 'conference-rooms',      src: 'conference-slide-1.jpg', anchor: 'center' },
  { key: 'vista-lounge',          src: 'panorama.jpg',           anchor: 'center' },
  { key: 'visit',                 src: 'corridor.jpg',           anchor: 'center' },
  { key: 'events',                src: 'lounge-2.jpg',           anchor: 'center' },
]

const VERSION = 'v1'

mkdirSync(OUT, { recursive: true })

const py = `
import sys
from PIL import Image
src, wordmark, out, anchor = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
W, H, BAND, RULE = ${W}, ${H}, ${BAND}, ${RULE}
PHOTO_H = H - BAND

photo = Image.open(src).convert('RGB')
# cover-crop to the photo band's aspect, keeping the chosen anchor
tw, th = W, PHOTO_H
scale = max(tw / photo.width, th / photo.height)
nw, nh = round(photo.width * scale), round(photo.height * scale)
photo = photo.resize((nw, nh), Image.LANCZOS)
x = (nw - tw) // 2
y = {'center': (nh - th) // 2, 'north': 0, 'south': nh - th}[anchor]
photo = photo.crop((x, y, x + tw, y + th))

canvas = Image.new('RGB', (W, H), '${CREAM}')
canvas.paste(photo, (0, 0))
canvas.paste(Image.new('RGB', (W, RULE), '${FOREST}'), (0, PHOTO_H - RULE))

mark = Image.open(wordmark).convert('RGBA')
mw = 236
mark = mark.resize((mw, round(mark.height * mw / mark.width)), Image.LANCZOS)
canvas.paste(mark, (72, PHOTO_H + (BAND - mark.height) // 2), mark)

# 4:4:4 chroma keeps the cream/charcoal wordmark edges clean
canvas.save(out, 'JPEG', quality=82, subsampling=0, optimize=True, progressive=True)
`

const wordmark = path.join(ROOT, 'public/brand/extind-wordmark-charcoal-256.png')
let failed = 0

for (const { key, src, anchor } of MANIFEST) {
  const input = path.join(PHOTOS, src)
  if (!existsSync(input)) {
    console.error(`MISSING SOURCE  ${src} for ${key}`)
    failed++
    continue
  }
  const out = path.join(OUT, `extind-${key}-${VERSION}.jpg`)
  const r = spawnSync('python3', ['-c', py, input, wordmark, out, anchor], { encoding: 'utf8' })
  if (r.status !== 0) {
    console.error(`FAILED  ${key}\n${r.stderr}`)
    failed++
    continue
  }
  const bytes = statSync(out).size
  const over = bytes > MAX_BYTES
  if (over) failed++
  console.log(
    `${over ? 'TOO BIG ' : 'ok      '}extind-${key}-${VERSION}.jpg  ${W}x${H}  ${(bytes / 1024).toFixed(0)}KB  <- ${src}`
  )
}

if (failed) {
  console.error(`\n${failed} image(s) failed`)
  process.exit(1)
}
console.log(`\n${MANIFEST.length} images written to public/og/`)
