import { useEffect } from 'react'
import BookVisit from '../components/BookVisit'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import { useLang } from '../lib/i18n'
import { bookVisitFaq } from '../data/faq'

const DOC = { en: 'Book a visit — Extind', ro: 'Programează o vizită — Extind' }

/* The page opened at an h3 emitted by BookVisit, with no h1 anywhere — a screen
 * reader navigating by heading landed mid-hierarchy with nothing to anchor to.
 * Visually hidden rather than displayed, because the booker's own heading is
 * the right thing to SEE; this is the one to HEAR and to index. */
const H1 = { en: 'Book a visit to Extind', ro: 'Programează o vizită la Extind' }

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
      <h1 className="sr-only">{H1[lang]}</h1>
      <BookVisit mode="inline" />
      <Testimonials />
      <Faq items={bookVisitFaq} moreHref="/faq" />
    </>
  )
}
