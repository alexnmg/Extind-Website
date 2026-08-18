import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'

// Paired statements: the EXTIND experience vs. running a conventional office.
const rows = [
  {
    us: 'Move in quickly to a ready space',
    trad: 'You search, negotiate, fit out and wait',
  },
  {
    us: 'Ergonomic furniture and infrastructure included',
    trad: 'You invest separately in furniture and equipment',
  },
  {
    us: 'Clear, predictable costs',
    trad: 'Rent, utilities, maintenance, supplies and vendors, all separate',
  },
  {
    us: 'Adjust the solution as your team changes',
    trad: 'You stay locked into a fixed area and a rigid contract',
  },
  {
    us: 'Use meeting rooms and shared areas when you need them',
    trad: 'You pay permanently for space used only occasionally',
  },
  {
    us: 'Work in a premium location, in Palas Campus',
    trad: 'Access to a premium building demands bigger investment and commitment',
  },
  {
    us: 'EXTIND manages the space',
    trad: 'Your team has to run the premises every day',
  },
  {
    us: 'You can request special configurations',
    trad: 'Any change means vendors, cost and implementation time',
  },
]

export default function Comparison() {
  return (
    <section className="section">
      <SectionHeader
        eyebrow="Comparison"
        title="Why EXTIND, not a conventional office"
        description="A conventional office means upfront investment, separate contracts, furniture, utilities, maintenance and daily administration. At EXTIND, your team walks into a fully operational space and gets to focus on the work."
      />
      <div className="compare-wrap" data-reveal>
        <table className="compare">
          <thead>
            <tr>
              <th className="compare__u" scope="col">With EXTIND</th>
              <th scope="col">In a conventional office</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.us}>
                <td className="compare__u">{r.us}</td>
                <td>{r.trad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="compare-cta" data-reveal>
        <Link className="btn btn--primary" to="/book-a-visit" viewTransition>
          Book a visit
        </Link>
      </div>
    </section>
  )
}
