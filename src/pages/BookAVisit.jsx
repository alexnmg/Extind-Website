import { useEffect } from 'react'
import BookVisit from '../components/BookVisit'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'

export default function BookAVisit() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Book a visit — Extind'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <>
      <BookVisit />
      <Testimonials />
      <Faq />
    </>
  )
}
