import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollReveal from './components/ScrollReveal'
import Home from './pages/Home'
import About from './pages/About'
import PrivateOffices from './pages/PrivateOffices'
import Contact from './pages/Contact'
import ExecutiveDayOffice from './pages/ExecutiveDayOffice'
import Coworking from './pages/Coworking'
import ConferenceRooms from './pages/ConferenceRooms'
import VistaLounge from './pages/VistaLounge'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
// Magazine + BlogPost are hidden for now — imports commented out with their routes so the
// unused-import lint stays quiet. Restore both lines when the magazine goes live.
// import Magazine from './pages/Magazine'
// import BlogPost from './pages/BlogPost'
import FaqPage from './pages/FaqPage'
import BookAVisit from './pages/BookAVisit'
import Privacy from './pages/Privacy'
import Cookies from './pages/Cookies'
import NotFound from './pages/NotFound'
import StoryblokPage from './components/storyblok/StoryblokPage'
import { isStoryblokEnabled } from './lib/storyblok'
import { LanguageProvider, useLang } from './lib/i18n'
import { basePath, localePath } from './lib/paths'
import './App.css'

/* Rendered inside the provider so it can read the language. */
function SkipLabel() {
  const { lang } = useLang()
  return lang === 'en' ? 'Skip to content' : 'Sari la conținut'
}

function ScrollToTop() {
  const { pathname } = useLocation()
  // null until the first navigation: the initial render is a document load,
  // not a move between pages, and the old behaviour there is left alone.
  const prev = useRef(null)

  useEffect(() => {
    const from = prev.current
    prev.current = pathname

    /* A language switch is not a new page — /en/contact and /contact are one
     * document in two languages, and the switcher sits at the top of a page the
     * reader may be deep inside. Scrolling to top there loses their place in
     * the very act of asking to read the same thing in the other language. */
    if (from !== null && basePath(from) === basePath(pathname)) return

    // 'instant' bypasses the html scroll-behavior:smooth — page changes jump
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

/* One table, rendered twice: Romanian at the bare paths and English under /en.
 * The mirroring is localePath's job — including the homepage, the one
 * asymmetric case ('/' mirrors to '/en', not '/en/') — so that this table, the
 * links, the switcher and the build script all agree by construction.
 *
 * Home is listed explicitly rather than relying on the catch-all, so that an
 * unknown path is genuinely unmatched instead of silently rendering the
 * homepage under whatever URL was typed. */
const PAGES = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/private-offices', element: <PrivateOffices /> },
  { path: '/executive-day-office', element: <ExecutiveDayOffice /> },
  { path: '/coworking', element: <Coworking /> },
  { path: '/conference-rooms', element: <ConferenceRooms /> },
  { path: '/contact', element: <Contact /> },
  { path: '/vista-lounge', element: <VistaLounge /> },
  { path: '/events', element: <Events /> },
  { path: '/events/:slug', element: <EventDetail /> },
  /* Extind Magazine is hidden for now at the client's request (Sept 2026) — the pages and
     content are kept intact. Re-enable by restoring these two entries and the navbar entry
     in Navbar.jsx, plus the magazine block on the Vista Lounge page. */
  // { path: '/magazine', element: <Magazine /> },
  // { path: '/magazine/:slug', element: <BlogPost /> },
  { path: '/faq', element: <FaqPage /> },
  { path: '/book-a-visit', element: <BookAVisit /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/cookies', element: <Cookies /> },
]

/* Everything inside the router, so the same tree can be rendered by
 * BrowserRouter in the browser and StaticRouter at build time. entry-server.jsx
 * is the other caller — keep this free of anything router-implementation
 * specific. */
export function AppShell() {
  return (
    <>
      {/* The provider reads the language off the pathname. */}
      <LanguageProvider>
        <ScrollToTop />
        <ScrollReveal />
        <div className="page">
          {/* First focusable thing on every page. Without it a keyboard user
              traverses ~14 nav controls before reaching content. */}
          <a className="skip-link" href="#main">
            <SkipLabel />
          </a>
          <Navbar />
          <main id="main" tabIndex={-1}>
            <Routes>
              {PAGES.filter((p) => !(isStoryblokEnabled && p.path === '/')).map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
              {PAGES.filter((p) => !(isStoryblokEnabled && p.path === '/')).map(({ path, element }) => (
                <Route
                  key={localePath(path, 'en')}
                  path={localePath(path, 'en')}
                  element={element}
                />
              ))}
              {/* With Storyblok enabled the CMS owns '/' and '/en' too, so those explicit
                  routes are dropped — otherwise the Storyblok-authored homepage could
                  never render. */}
              <Route path="*" element={isStoryblokEnabled ? <StoryblokPage /> : <NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
