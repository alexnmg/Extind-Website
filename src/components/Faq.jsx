import { useState } from 'react'
import SectionHeader from './SectionHeader'
import chevronDown from '../assets/figma/chevron-down.svg'

const defaultItems = [
  {
    q: 'What kinds of space does EXTIND offer?',
    a: 'Private offices, coworking, day or short-term project offices, meeting rooms, a conference room, and spaces for business meetings and events.',
  },
  {
    q: 'Who is EXTIND for?',
    a: 'Professionals, companies and corporate teams looking for a premium, quiet, fully-managed environment in Iași.',
  },
  {
    q: 'Where is EXTIND?',
    a: 'On the 6th floor of Palas Campus, Iași — a Class A office building connected to the facilities of the Palas complex.',
  },
  {
    q: 'How many people do the private offices hold?',
    a: 'Standard configurations suit teams of 2–12. For larger teams we can design a custom solution.',
  },
  {
    q: 'Can I rent an office for a single day?',
    a: 'Yes. We offer both a Day Pass for individual coworking access and a Day Office for exclusive use of a private office. Availability and rate depend on the date, duration and number of people.',
  },
  {
    q: 'Can I book a space for two or three days?',
    a: 'Yes. We can prepare a private office and rooms for teams visiting Iași, workshops or short projects.',
  },
  {
    q: "What's included in the price?",
    a: 'Depending on the product, the rate can include ergonomic furniture, 1 Gbps internet, utilities, maintenance, cleaning, coffee, tea, water, access to shared areas and room use per package. No hidden costs.',
  },
  {
    q: 'Is access 24/7?',
    a: 'For certain subscriptions and private offices, access can be extended to 24/7, per the contracted package and building rules.',
  },
  {
    q: 'Is coffee free?',
    a: 'EXTIND offers all clients filtered water, coffee and tea, and periodically fruit, snacks and other treats.',
  },
  {
    q: 'How are rooms booked?',
    a: 'Rooms are used by reservation. Terms, included hours and any additional rates depend on the package.',
  },
  {
    q: 'Can I run a workshop or a corporate event?',
    a: 'Yes. We have rooms and spaces for meetings, trainings, workshops, presentations and business events. The setup depends on the format and number of participants.',
  },
  {
    q: 'Do you have high-speed internet?',
    a: 'Yes — a 1 Gbps connection.',
  },
  {
    q: 'Is there parking?',
    a: "Palas Campus and the Palas area offer parking options. Availability and cost are checked separately; spaces aren't guaranteed simply by booking an EXTIND space.",
  },
  {
    q: 'Can I customise an office?',
    a: 'We can look at adapting the furniture, number of desks, branding or configuration, depending on requirements and contract length. Any change is confirmed by offer.',
  },
  {
    q: 'Can you meet special IT or security requirements?',
    a: 'Yes — we review corporate requests individually and confirm in writing what can be provided directly, what needs configuration, the timeline and any additional cost.',
  },
  {
    q: 'How do I request an offer?',
    a: 'Fill in the “Request an offer for your team” form with the number of people, date, duration and main requirements, and EXTIND comes back with a fitting proposal.',
  },
]

export default function Faq({
  eyebrow = 'FAQ',
  title = 'Questions? Answered.',
  items = defaultItems,
}) {
  const [openIndex, setOpenIndex] = useState(-1)

  return (
    <section className="section faq">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="faq__column">
        {items.map(({ q, a }, i) => {
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
        })}
      </div>
    </section>
  )
}
