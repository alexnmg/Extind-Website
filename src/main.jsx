import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initStoryblok } from './lib/storyblok'

initStoryblok()

const root = document.getElementById('root')

const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

/* Every route is prerendered at build time (scripts/build-seo.mjs), so the
 * markup is already here and hydrating adopts it rather than throwing it away
 * and rendering again.
 *
 * The empty-root branch is not dead code: an unknown URL is answered with the
 * SPA fallback, whose body is the prerendered HOMEPAGE, and React would then be
 * asked to reconcile a 404 page against it. Checking for children is not enough
 * to catch that, so React's own mismatch recovery handles the rare case — it
 * discards the server markup for that subtree and client-renders, which is
 * exactly the old behaviour. The branch covers a genuinely empty shell, which
 * is what `vite dev` serves.
 */
if (root.firstChild) {
  hydrateRoot(root, tree)
} else {
  createRoot(root).render(tree)
}
