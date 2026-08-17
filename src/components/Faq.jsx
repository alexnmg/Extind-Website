import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import { faqItems } from '../data/faq'
import chevronDown from '../assets/figma/chevron-down.svg'

export default function Faq({
  eyebrow = 'FAQ',
  title = 'Questions? Answered.',
  description,
  items = faqItems,
  columns = 1,
  moreHref,
  moreLabel = 'See all questions →',
}) {
  const [openIndex, setOpenIndex] = useState(-1)

  const renderItem = ({ q, a }, i) => {
    const open = openIndex === i
    return (
      <div
        key={q}
        className={`faq-item${open ? ' faq-item--open' : ''}`}
        data-reveal
        style={{ '--reveal-delay': `${i * 60}ms` }}
      >
        <button
          type="button"
          className="faq-item__question"
          aria-expanded={open}
          onClick={() => setOpenIndex(open ? -1 : i)}
        >
          <span className="faq-item__question-text">{q}</span>
          <img className="faq-item__chevron" src={chevronDown} alt="" />
        </button>
        <div className="faq-item__answer-wrap">
          <div className="faq-item__answer-inner">
            <p className="faq-item__answer">{a}</p>
          </div>
        </div>
      </div>
    )
  }

  // Two-column layout splits the list down the middle, keeping each item's
  // global index so open state and reveal delays stay consistent.
  const body =
    columns === 2 ? (
      (() => {
        const mid = Math.ceil(items.length / 2)
        const groups = [
          { items: items.slice(0, mid), start: 0 },
          { items: items.slice(mid), start: mid },
        ]
        return (
          <div className="faq__columns">
            {groups.map((group, g) => (
              <div className="faq__column" key={g}>
                {group.items.map((item, j) => renderItem(item, group.start + j))}
              </div>
            ))}
          </div>
        )
      })()
    ) : (
      <div className="faq__column">{items.map(renderItem)}</div>
    )

  return (
    <section className="section faq">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      {body}
      {moreHref && (
        <Link className="faq__more" to={moreHref} viewTransition data-reveal>
          {moreLabel}
        </Link>
      )}
    </section>
  )
}
