import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import StoryblokPage from './components/storyblok/StoryblokPage'
import { isStoryblokEnabled } from './lib/storyblok'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <Navbar />
        <Routes>
          <Route path="*" element={isStoryblokEnabled ? <StoryblokPage /> : <Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
