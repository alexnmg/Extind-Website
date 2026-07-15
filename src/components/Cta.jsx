export default function Cta({
  title = 'Ready to see how Extind works?',
  description = 'The best way to understand Extind is to spend time here. Book a visit, meet the team and discover the environment behind the business.',
  ctaLabel = 'Visit us',
}) {
  return (
    <section className="cta" data-reveal>
      <h2 className="cta__title">{title}</h2>
      <p className="cta__sub">{description}</p>
      <div className="cta__buttons">
        <button type="button" className="btn btn--outline">
          {ctaLabel}
        </button>
      </div>
    </section>
  )
}
