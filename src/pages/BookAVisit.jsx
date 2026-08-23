import { useEffect } from 'react'
import BookVisit from '../components/BookVisit'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import { useLang } from '../lib/i18n'
import { bookVisitFaq } from '../data/faq'

const DOC = { en: 'Book a visit — Extind', ro: 'Programează o vizită — Extind' }

export default function BookAVisit() {
  const { lang } = useLang()
  useEffect(() => {
    const prev = document.title
    document.title = DOC[lang]
    return () => {
      document.title = prev
    }
  }, [lang])

  return (
    <>
      <BookVisit mode="inline" />
      <Testimonials />
      <Faq items={bookVisitFaq} moreHref="/faq" />
    </>
  )
}
