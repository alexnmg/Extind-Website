import { infoIcons } from './InfoIcons'

/* White-pill feature list. `items` is an array of { icon, text }, where `icon`
 * is a key into infoIcons. Each pill reveals with a gentle stagger. */
export default function InfoGrid({ items }) {
  return (
    <ul className="info-grid">
      {items.map(({ icon, text }, i) => {
        const Icon = infoIcons[icon] ?? infoIcons.shield
        return (
          <li
            key={text}
            className="info-pill"
            data-reveal
            style={{ '--reveal-delay': `${Math.min(i, 9) * 45}ms` }}
          >
            <span className="info-pill__icon">
              <Icon />
            </span>
            <span className="info-pill__text">{text}</span>
          </li>
        )
      })}
    </ul>
  )
}
