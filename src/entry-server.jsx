import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppShell } from './App.jsx'
import './index.css'

/* Build-time rendering. scripts/prerender.mjs imports this from the SSR bundle
 * and calls it once per route, so every page ships with its body copy already
 * in the HTML instead of arriving via JavaScript.
 *
 * Why it matters even though Google renders JS: the crawlers that build link
 * previews do not, several search engines do not, and neither do most of the
 * AI crawlers. Before this, all 26 URLs served an empty <div id="root">.
 *
 * StaticRouter rather than BrowserRouter — same tree, no history API. The
 * language provider derives from the location either way, so /en routes render
 * English here exactly as they do in the browser.
 */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>
  )
}
