import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import StoryblokPage from './components/storyblok/StoryblokPage'
import { isStoryblokEnabled } from './lib/storyblok'
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
    <BrowserRouter>
      <ScrollToTop />
      <div className="page">
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="*" element={isStoryblokEnabled ? <StoryblokPage /> : <Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
