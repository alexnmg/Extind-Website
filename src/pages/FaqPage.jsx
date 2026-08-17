import { useEffect } from 'react'
import Faq from '../components/Faq'
import BookVisit from '../components/BookVisit'
import { faqItems } from '../data/faq'

export default function FaqPage() {
  useEffect(() => {
    const prev = document.title
    document.title = 'FAQ — Extind'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <>
      <Faq
        eyebrow="FAQ"
        title="Everything you might ask"
        description="Spaces, pricing, access and the practical details — the questions we hear most, answered in full. If yours isn't here, send us a message and we'll come back within one business day."
        items={faqItems}
        columns={2}
      />
      <BookVisit />
    </>
  )
}
