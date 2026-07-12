const defaultButtons = ['Find the right space', 'Discover our spaces', "Let's connect"]

export default function Cta({
  title = 'Spaces that support ambition.',
  subtitle = 'Less friction. More focus.',
  buttons = defaultButtons,
}) {
  return (
    <section className="cta">
      <h2 className="cta__title">{title}</h2>
      <p className="cta__sub">{subtitle}</p>
      <div className="cta__buttons">
        {buttons.map((label) => (
          <button key={label} type="button" className="btn btn--outline">
            {label}
          </button>
        ))}
      </div>
    </section>
  )
}
