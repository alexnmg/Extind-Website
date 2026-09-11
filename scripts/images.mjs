/* Generates responsive, modern-format variants of the photography.
 *
 * Run with `npm run images`. Committed output, not a build step: the photos
 * change rarely, and regenerating ~200 binaries on every build would churn the
 * repo for nothing.
 *
 * The originals stay in src/assets/photos as the masters. Variants go to
 * public/photos/ so they are served at a stable path with a long cache, and are
 * referenced by <Photo> rather than imported — an <img srcset> needs real URLs,
 * not module identifiers.
 *
 * Widths are the ones the layout actually renders at, not a generic ladder:
 * 1600 for full-bleed banners, 1200 for hero panels, 800 for cards and the
 * two-up sliders. A width larger than the source is skipped rather than
 * upscaled.
 */
import { spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync, readdirSync, statSync, rmSync, existsSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'src/assets/photos')
const OUT = path.join(ROOT, 'public/photos')
const MANIFEST = path.join(ROOT, 'src/lib/photo-manifest.json')

const WIDTHS = [800, 1200, 1600]

if (existsSync(OUT)) rmSync(OUT, { recursive: true })
mkdirSync(OUT, { recursive: true })

const py = `
import sys, json, os
from PIL import Image
import PIL.AvifImagePlugin  # noqa: registers the AVIF codec

src, out_dir, widths = sys.argv[1], sys.argv[2], [int(w) for w in sys.argv[3].split(',')]
name = os.path.splitext(os.path.basename(src))[0]

im = Image.open(src).convert('RGB')
made = []
for w in widths:
    if w > im.width:          # never upscale
        continue
    h = round(im.height * w / im.width)
    r = im.resize((w, h), Image.LANCZOS)
    # AVIF first: it is the smallest by a wide margin and every current browser
    # that matters supports it. WebP is the fallback for the tail.
    r.save(os.path.join(out_dir, f'{name}-{w}.avif'), 'AVIF', quality=50)
    r.save(os.path.join(out_dir, f'{name}-{w}.webp'), 'WEBP', quality=76, method=6)
    made.append(w)

# One JPEG fallback at the largest available width, for anything that supports
# neither format.
fb = made[-1] if made else im.width
r = im.resize((fb, round(im.height * fb / im.width)), Image.LANCZOS) if fb != im.width else im
r.save(os.path.join(out_dir, f'{name}-{fb}.jpg'), 'JPEG', quality=80, optimize=True, progressive=True)

print(json.dumps({'name': name, 'w': im.width, 'h': im.height, 'widths': made, 'fallback': fb}))
`

const before = readdirSync(SRC)
  .filter((f) => f.endsWith('.jpg'))
  .reduce((n, f) => n + statSync(path.join(SRC, f)).size, 0)

const manifest = {}
let failed = 0

for (const file of readdirSync(SRC).filter((f) => f.endsWith('.jpg')).sort()) {
  const r = spawnSync('python3', ['-c', py, path.join(SRC, file), OUT, WIDTHS.join(',')], {
    encoding: 'utf8',
  })
  if (r.status !== 0) {
    console.error(`FAILED ${file}\n${r.stderr}`)
    failed++
    continue
  }
  const m = JSON.parse(r.stdout.trim())
  manifest[m.name] = { w: m.w, h: m.h, widths: m.widths, fallback: m.fallback }
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

const after = readdirSync(OUT).reduce((n, f) => n + statSync(path.join(OUT, f)).size, 0)
const avif = readdirSync(OUT).filter((f) => f.endsWith('.avif'))
const avifBytes = avif.reduce((n, f) => n + statSync(path.join(OUT, f)).size, 0)

const mb = (b) => (b / 1024 / 1024).toFixed(2)
console.log(`\nsources      ${Object.keys(manifest).length} jpg, ${mb(before)} MB`)
console.log(`variants     ${readdirSync(OUT).length} files, ${mb(after)} MB total on disk`)
console.log(`what a modern browser actually downloads (avif only): ${mb(avifBytes)} MB across all widths`)
if (failed) {
  console.error(`\n${failed} file(s) failed`)
  process.exit(1)
}
