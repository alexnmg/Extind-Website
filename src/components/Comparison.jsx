import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'

const rows = [
  { feature: 'Move-in time', us: 'Days, into a ready space', trad: '4–12 weeks of search and fit-out' },
  { feature: 'Commitment', us: 'Flexible — adjusts as you grow', trad: 'Multi-year, rigid lease' },
  { feature: 'Furniture & fit-out', us: 'Included, configurable', trad: 'You source and pay' },
  { feature: 'Utilities & internet', us: 'Included, 1 Gbps', trad: 'You set up and manage' },
  { feature: 'Cleaning & maintenance', us: 'Included', trad: 'Arrange vendors' },
  { feature: 'Meeting rooms', us: 'Included, per package', trad: 'Extra cost' },
  { feature: 'On-site help', us: 'Team on site', trad: 'You hire admin' },
  { feature: 'Security & access', us: 'Controlled, up to 24/7', trad: 'Depends on the building' },
  { feature: 'Monthly cost', us: 'One predictable price', trad: 'Rent + utilities + maintenance + suppliers' },
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
              <th></th>
              <th className="compare__u">EXTIND</th>
              <th>A conventional office</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.feature}>
                <th scope="row">{r.feature}</th>
                <td className="compare__u">{r.us}</td>
                <td>{r.trad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="compare-cta" data-reveal>
        <Link className="btn btn--primary" to="/book-a-visit" viewTransition>
          Compare the right solution for your team
        </Link>
      </div>
    </section>
  )
}
