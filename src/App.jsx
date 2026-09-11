import { useEffect } from 'react'
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
import StoryblokPage from './components/storyblok/StoryblokPage'
import { isStoryblokEnabled } from './lib/storyblok'
import { LanguageProvider } from './lib/i18n'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // 'instant' bypasses the html scroll-behavior:smooth — page changes jump
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <LanguageProvider>
    <BrowserRouter>
      <ScrollToTop />
      <ScrollReveal />
      <div className="page">
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/private-offices" element={<PrivateOffices />} />
          <Route path="/executive-day-office" element={<ExecutiveDayOffice />} />
          <Route path="/coworking" element={<Coworking />} />
          <Route path="/conference-rooms" element={<ConferenceRooms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vista-lounge" element={<VistaLounge />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          {/* Extind Magazine is hidden for now at the client's request (Sept 2026) — the pages and
              content are kept intact. Re-enable by restoring these two routes and the navbar entry
              in Navbar.jsx, plus the magazine block on the Vista Lounge page. */}
          {/* <Route path="/magazine" element={<Magazine />} /> */}
          {/* <Route path="/magazine/:slug" element={<BlogPost />} /> */}
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/book-a-visit" element={<BookAVisit />} />
          <Route path="*" element={isStoryblokEnabled ? <StoryblokPage /> : <Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
    </LanguageProvider>
  )
}
