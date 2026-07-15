export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="section-header" data-reveal>
      <div className="section-header__eyebrow-group">
        <p className="section-header__eyebrow">{eyebrow}</p>
        <h2 className="section-header__title">{title}</h2>
      </div>
      {description && <p className="section-header__desc">{description}</p>}
    </div>
  )
}
