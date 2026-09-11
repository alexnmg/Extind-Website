import { useEffect, useRef, useState } from 'react'
import { Link } from '../lib/LocaleLink'
import SectionHeader from './SectionHeader'
import { useLang } from '../lib/i18n'

/* The Romanian rows are the client's original copy; the English rows are the
 * site translation of the same statements. */
const T = {
  en: {
    eyebrow: 'Comparison',
    title: 'Extind versus a conventional office',
    description:
      'A conventional office means upfront investment, separate contracts, furniture, utilities, maintenance and daily administration. At EXTIND, your team walks into a fully operational space and gets to focus on the work.',
    us: 'With EXTIND',
    them: 'In a conventional office',
    cta: 'Book a visit',
    rows: [
      { us: 'Move in quickly to a ready space', trad: 'You search, negotiate, fit out and wait' },
      { us: 'Ergonomic furniture and infrastructure included', trad: 'You invest separately in furniture and equipment' },
      { us: 'Clear, predictable costs', trad: 'Rent, utilities, maintenance, supplies and vendors, all separate' },
      { us: 'Adjust the solution as your team changes', trad: 'You stay locked into a fixed area and a rigid contract' },
      { us: 'Use meeting rooms and shared areas when you need them', trad: 'You pay permanently for space used only occasionally' },
      { us: 'Work in a premium location, in Palas Campus', trad: 'Access to a premium building demands bigger investment and commitment' },
      { us: 'EXTIND manages the space', trad: 'Your team has to run the premises every day' },
      { us: 'You can request special configurations', trad: 'Any change means vendors, cost and implementation time' },
    ],
  },
  ro: {
    eyebrow: 'Comparație',
    title: 'Extind versus un birou convențional',
    description:
      'Un birou convențional presupune investiții în amenajare și mobilier, contracte separate pentru internet, utilități, curățenie și mentenanță, plus timp alocat administrării zilnice. La EXTIND, toate acestea sunt deja rezolvate. Echipa ta vine, se instalează și se poate concentra, din prima zi, pe ceea ce are de făcut.',
    us: 'Cu EXTIND',
    them: 'Într-un birou clasic',
    cta: 'Programează o vizită',
    rows: [
      { us: 'Te muți imediat într-un spațiu premium ready-to-use', trad: 'Cauți spațiul, negociezi, amenajezi și aștepți' },
      { us: 'Mobilier ergonomic și infrastructură incluse', trad: 'Investești separat în mobilier și echipamente' },
      { us: 'Costuri predictibile, fixe, fără fluctuații', trad: 'Chirie, utilități, mentenanță, consumabile și furnizori separați. Costuri fluctuante și nepredictibile.' },
      { us: 'Ajustezi soluția când echipa se schimbă', trad: 'Rămâi blocat într-o anumită suprafață și într-un contract rigid' },
      { us: 'Folosești săli și zone comune când ai nevoie', trad: 'Plătești permanent pentru spații utilizate doar ocazional' },
      { us: 'Lucrezi într-o locație premium, în Palas Campus', trad: 'Accesul la o clădire premium presupune investiții și angajamente costisitoare pe perioade îndelungate' },
      { us: 'EXTIND administrează spațiul', trad: 'Echipa ta trebuie să administreze zilnic sediul' },
      { us: 'Poți solicita configurații speciale', trad: 'Orice modificare presupune negocieri cu furnizori, costuri și timpi mari de implementare' },
    ],
  },
}

export default function Comparison() {
  const { lang } = useLang()
  const t = T[lang]
  const scrollRef = useRef(null)
  // True while there's more table to the right — drives the fade hint.
  const [canScroll, setCanScroll] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      setCanScroll(el.scrollLeft < max - 1)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section className="section">
      <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <div className={`compare-wrap${canScroll ? ' is-end' : ''}`} data-reveal>
        <div className="compare-scroll" ref={scrollRef}>
          <table className="compare">
            <thead>
              <tr>
                <th className="compare__u" scope="col">{t.us}</th>
                <th scope="col">{t.them}</th>
              </tr>
            </thead>
            <tbody>
              {t.rows.map((r, i) => (
                <tr key={i}>
                  <td className="compare__u">{r.us}</td>
                  <td>{r.trad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="compare-cta" data-reveal>
        <Link className="btn btn--primary" to="/book-a-visit" viewTransition>
          {t.cta}
        </Link>
      </div>
    </section>
  )
}
