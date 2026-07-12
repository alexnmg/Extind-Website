import { useState } from 'react'
import SectionHeader from './SectionHeader'
import chevronUp from '../assets/figma/chevron-up.svg'
import chevronDown from '../assets/figma/chevron-down.svg'

const defaultItems = [
  {
    q: "What's included in a Flex membership?",
    a: 'Flex membership includes access to hot desks, meeting room credits, and all shared amenities. You can book desks on demand and scale your usage month to month.',
  },
  {
    q: 'Can I bring clients or guests to the space?',
    a: 'Yes — members can host clients and guests in the shared areas and meeting rooms. Just check them in at reception when they arrive.',
  },
  {
    q: 'How does billing and cancellation work?',
    a: 'Memberships are billed monthly and can be paused or cancelled with 30 days notice. Day passes are one-off purchases with no commitment.',
  },
]

export default function Faq({
  eyebrow = 'FAQ',
  title = 'Questions? Answered.',
  note = 'The principles that shape every space, interaction, and decision at Extind.',
  items = defaultItems,
}) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section faq">
      <SectionHeader eyebrow={eyebrow} title={title} note={note} />
      <div className="faq__column">
        {items.map(({ q, a }, i) => {
          const open = openIndex === i
          return (
            <div key={q} className="faq-item">
              <button
                type="button"
                className="faq-item__question"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? -1 : i)}
              >
                <span className="faq-item__question-text">{q}</span>
                <img className="faq-item__chevron" src={open ? chevronUp : chevronDown} alt="" />
              </button>
              {open && <p className="faq-item__answer">{a}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
