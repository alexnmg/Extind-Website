import { useEffect, useRef, useState } from 'react'
/* MapLibre locates its tile worker relative to its OWN module URL, expecting
 * maplibre-gl-worker.mjs (and the 500 kB maplibre-gl-shared.mjs it imports) to
 * sit next to the bundle. Vite emits neither, so that URL 404s — and because
 * Cloudflare answers an unknown /assets/* path with the SPA fallback, the worker
 * is handed index.html, fails to parse, and every tile request hangs with no
 * error: a blank map with a pin on it. Vite's ?worker&url bundles the worker
 * with its dependencies and hands back the real URL, which setWorkerUrl feeds
 * back to MapLibre. */
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import { useLang } from '../lib/i18n'

/* MapLibre and its CSS are ~250 kB and only this one route has a map, so they
 * are imported inside the effect rather than at module scope. Doing the split
 * here rather than with React.lazy on the component is deliberate: lazy()
 * creates a Suspense boundary, and on a prerendered page the build never
 * completes that boundary, so React logs error #419 on every hydration. This
 * way the chunk is still separate and there is no boundary at all.
 *
 * Tiles come from OpenFreeMap, which needs no account, no key and imposes no
 * quota. That is why it is here: this map ran on CARTO's Positron basemap until
 * CARTO began requiring an API key and started stamping "API KEY REQUIRED"
 * across every tile. OpenStreetMap's own tile servers are not an option either
 * — their usage policy rules out a commercial site's basemap, and they answer
 * one with a blocked-access tile. OpenFreeMap serves the same Positron styling,
 * so the map looks essentially as it did before. */

/* Extind Cowork+, Palas Campus, Iași — taken from the business's own Google
 * Maps listing. The previous pair put the pin 516 m east of the building, out
 * past the far side of Palas, because the longitude was wrong in the third
 * decimal. If these ever need changing, read them off the listing rather than
 * from a search result for the street. */
const LAT = 47.1568045
const LON = 27.5816947

const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron'

const ADDRESS = 'Strada Sfântul Andrei 39A, Palas Campus (clădirea B2), etaj 6, Iași'

const T = {
  en: { heading: 'Find us', action: 'Open in Maps →', zoomIn: 'Zoom in', zoomOut: 'Zoom out' },
  ro: {
    heading: 'Ne găsești aici',
    action: 'Deschide în Hărți →',
    zoomIn: 'Apropie harta',
    zoomOut: 'Depărtează harta',
  },
}

// Brand pin: a filled charcoal teardrop (colour via .map-pin currentColor) with
// a cream dot. Rendered as a plain DOM marker so it is ordinary SVG we style.
const PIN_SVG = `
<svg viewBox="0 0 32 42" width="32" height="42" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M16 1C8.27 1 2 7.27 2 15c0 9.75 12.02 24.02 13.03 25.2a1.28 1.28 0 0 0 1.94 0C17.98 39.02 30 24.75 30 15 30 7.27 23.73 1 16 1Z" fill="currentColor"/>
  <circle cx="16" cy="15" r="5.2" fill="var(--brand-white)"/>
</svg>`

/* Minimal, brand-styled interactive map. Scroll-wheel zoom is off so the map
 * never hijacks page scrolling — zoom is via the styled controls or pinch. The
 * zoom buttons, attribution and pin are restyled in App.css to match the site. */
export default function LocationMap() {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const { lang } = useLang()
  const [failed, setFailed] = useState(false)
  const t = T[lang]

  useEffect(() => {
    const el = containerRef.current
    if (!el || mapRef.current) return

    let cancelled = false
    let cleanup = () => {}

    // Effects cannot be async; this keeps the teardown contract intact.
    ;(async () => {
      /* Named imports, not a default: maplibre-gl v6 ships ESM with no default
         export, so `import maplibregl from 'maplibre-gl'` lands as undefined and
         the first property access throws. MapLibreMap is aliased because the
         export is called Map and would otherwise shadow the global. */
      const [{ Map: MapLibreMap, Marker, NavigationControl, AttributionControl, setWorkerUrl }] =
        await Promise.all([import('maplibre-gl'), import('maplibre-gl/dist/maplibre-gl.css')])
      setWorkerUrl(maplibreWorkerUrl)
      // The component may have unmounted while the chunk was in flight.
      if (cancelled || mapRef.current) return

      const map = new MapLibreMap({
        container: el,
        style: STYLE_URL,
        center: [LON, LAT], // MapLibre takes lng,lat — the opposite of Leaflet
        zoom: 15,
        scrollZoom: false,
        attributionControl: false,
      })
      mapRef.current = map

      map.addControl(new NavigationControl({ showCompass: false }), 'top-right')
      /* No customAttribution: the style's own sources already credit OpenFreeMap
         and OpenStreetMap, and adding ours printed "© OpenFreeMap" twice. */
      map.addControl(new AttributionControl({ compact: false }), 'bottom-right')

      const pin = document.createElement('div')
      pin.className = 'map-pin'
      pin.innerHTML = PIN_SVG
      new Marker({ element: pin, anchor: 'bottom' }).setLngLat([LON, LAT]).addTo(map)

      /* The style loads over the network after the constructor returns, so a
       * dead tile host would otherwise leave a blank box with no error. */
      map.on('error', (e) => {
        console.error('LocationMap: maplibre error', e?.error || e)
      })

      // The flex container may size after this runs; nudge the map once layout
      // settles and whenever the container resizes.
      const raf = requestAnimationFrame(() => map.resize())
      const ro = new ResizeObserver(() => map.resize())
      ro.observe(el)

      cleanup = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        map.remove()
        mapRef.current = null
      }
    })().catch((err) => {
      /* The chunk can genuinely fail to arrive: a tab left open across a deploy
       * asks for a hashed filename that no longer exists, and Cloudflare's SPA
       * fallback answers it with index.html, so the import rejects on HTML it
       * cannot parse. Blockers and a flaky connection do the same. Without this
       * the box just stayed empty and silent — the address below is the thing
       * the visitor actually came for, so render that instead. */
      if (cancelled) return
      console.error('LocationMap: maplibre failed to load', err)
      setFailed(true)
    })

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  if (failed) {
    return (
      <div className="contact__map contact__map--fallback">
        <p className="contact__map-heading">{t.heading}</p>
        <p className="contact__map-address">{ADDRESS}</p>
        <a
          className="contact__map-link"
          href={`https://www.google.com/maps/search/?api=1&query=${LAT},${LON}`}
          target="_blank"
          rel="noreferrer"
        >
          {t.action}
        </a>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="contact__map"
      aria-label="Map showing Extind at Palas Campus, Iași"
    />
  )
}
