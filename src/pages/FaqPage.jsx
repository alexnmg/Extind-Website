import { useEffect } from 'react'
import Faq from '../components/Faq'
import BookVisit from '../components/BookVisit'
import { useLang } from '../lib/i18n'
import { faqItems } from '../data/faq'

const T = {
  en: {
    docTitle: 'FAQ — Extind',
    eyebrow: 'FAQ',
    title: 'Everything you might ask',
    description:
      "Spaces, pricing, access and the practical details — the questions we hear most, answered in full. If yours isn't here, send us a message and we'll come back within one business day.",
  },
  ro: {
    docTitle: 'Întrebări frecvente — Extind',
    eyebrow: 'Întrebări frecvente',
    title: 'Tot ce ai putea întreba',
    description:
      'Spații, prețuri, acces și detalii practice — întrebările pe care le auzim cel mai des, cu răspunsuri complete. Dacă a ta nu se află aici, trimite-ne un mesaj și revenim într-o zi lucrătoare.',
  },
}

export default function FaqPage() {
  const { lang } = useLang()
  const t = T[lang]

  useEffect(() => {
    const prev = document.title
    document.title = t.docTitle
    return () => {
      document.title = prev
    }
  }, [t.docTitle])

  return (
    <>
      <Faq
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        items={faqItems}
        columns={2}
      />
      <BookVisit />
    </>
  )
}
