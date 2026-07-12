export default function SectionHeader({ eyebrow, title, note }) {
  return (
    <div className="section-header">
      <div className="section-header__eyebrow-group">
        <p className="section-header__eyebrow">{eyebrow}</p>
        <h2 className="section-header__title">{title}</h2>
      </div>
      {note && <p className="section-header__note">{note}</p>}
    </div>
  )
}
