import manifest from '../lib/photo-manifest.json'

/* Responsive photography. Renders <picture> with AVIF, WebP and a JPEG
 * fallback at the widths the layout actually uses.
 *
 * Takes a NAME, not an import: an <img srcset> needs real URLs, and Vite gives
 * you a module identifier. The variants live in public/photos/ (stable paths,
 * immutable cache) and src/lib/photo-manifest.json — written by
 * scripts/images.mjs — carries each photo's intrinsic size so width and height
 * can be set and the layout does not shift while the image loads.
 *
 * `sizes` matters more than it looks: without it the browser assumes the image
 * fills the viewport and picks the largest variant, which throws away most of
 * the benefit. Pass the width this image is actually rendered at.
 */
export default function Photo({
  name,
  alt = '',
  sizes = '100vw',
  className,
  loading = 'lazy',
  fetchPriority,
  style,
}) {
  const meta = manifest[name]
  if (!meta) {
    // Loud in development, harmless in production — a typo'd name would
    // otherwise render an invisible broken image.
    if (import.meta.env.DEV) throw new Error(`Photo: unknown image "${name}"`)
    return null
  }

  const set = (ext) => meta.widths.map((w) => `/photos/${name}-${w}.${ext} ${w}w`).join(', ')
  const ratio = meta.h / meta.w

  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`/photos/${name}-${meta.fallback}.jpg`}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        width={meta.fallback}
        height={Math.round(meta.fallback * ratio)}
        style={style}
      />
    </picture>
  )
}
