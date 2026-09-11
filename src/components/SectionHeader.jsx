/* `as` exists so a page whose first section IS the page can render an h1.
 * Four routes had no h1 at all — /contact, /faq, /events and /book-a-visit —
 * which leaves screen-reader users navigating by heading with nothing to
 * anchor to, and gives search engines no primary topic. */
export default function SectionHeader({ eyebrow, title, description, as: Heading = 'h2' }) {
  return (
    <div className="section-header" data-reveal>
      <div className="section-header__eyebrow-group">
        <p className="section-header__eyebrow">{eyebrow}</p>
        <Heading className="section-header__title">{title}</Heading>
      </div>
      {description && <p className="section-header__desc">{description}</p>}
    </div>
  )
}
