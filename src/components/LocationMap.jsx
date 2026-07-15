import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Palas Campus, Iași
const LAT = 47.1566
const LON = 27.5885

// Brand pin: a filled charcoal teardrop (colour via .map-pin currentColor) with
// a cream dot. Rendered through a Leaflet divIcon so it's plain DOM/SVG we style.
const PIN_SVG = `
<svg viewBox="0 0 32 42" width="32" height="42" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M16 1C8.27 1 2 7.27 2 15c0 9.75 12.02 24.02 13.03 25.2a1.28 1.28 0 0 0 1.94 0C17.98 39.02 30 24.75 30 15 30 7.27 23.73 1 16 1Z" fill="currentColor"/>
  <circle cx="16" cy="15" r="5.2" fill="var(--brand-white)"/>
</svg>`

/* Minimal, brand-styled interactive map (Leaflet + CARTO Positron tiles).
 * Scroll-wheel zoom is off so the map never hijacks page scrolling — zoom is via
 * the styled controls or pinch. The zoom buttons, attribution and pin are all
 * restyled in App.css to match the site. */
export default function LocationMap() {
  const containerRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || mapRef.current) return

    const map = L.map(el, {
      center: [LAT, LON],
      zoom: 16,
      scrollWheelZoom: false,
      attributionControl: true,
    })
    mapRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map)

    const icon = L.divIcon({
      className: 'map-pin',
      html: PIN_SVG,
      iconSize: [32, 42],
      iconAnchor: [16, 42],
    })
    L.marker([LAT, LON], { icon, keyboard: false }).addTo(map)

    // The flex container may size after this effect runs; nudge Leaflet once
    // layout settles and whenever the container resizes.
    const raf = requestAnimationFrame(() => map.invalidateSize())
    const ro = new ResizeObserver(() => map.invalidateSize())
    ro.observe(el)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      map.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="contact__map"
      aria-label="Map showing Extind at Palas Campus, Iași"
    />
  )
}
