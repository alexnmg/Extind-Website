import { useEffect } from 'react'
import SectionHeader from '../components/SectionHeader'
import ContactForm from '../components/ContactForm'

const eventTypes = [
  'Management meetings & board sessions',
  'Workshops & strategy sessions',
  'Trainings & presentations',
  'Client & partner meetings',
  'Networking & business breakfasts',
  'Small corporate launches',
  'Interviews, filming or business photo sessions',
]

export default function Events() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Events — Extind'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <>
      <section className="section">
        <SectionHeader
          eyebrow="Events"
          title="Events at EXTIND"
          description="Talks, breakfasts and business evenings hosted in the Vista Lounge and across Palas Campus."
        />
        <div className="events-empty" data-reveal>
          <span className="events-empty__eyebrow">No events scheduled right now</span>
          <h3 className="events-empty__title">Nothing on the calendar this week</h3>
          <p className="events-empty__desc">
            We only list real events — with a confirmed date, organiser and a way to sign up. When
            the next one is set, it’ll appear here. In the meantime, the Vista Lounge is available to
            host yours.
          </p>
        </div>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Host your event"
          title="Organise an event at EXTIND"
          description="Have something in mind? Tell us the format and the numbers, and we’ll help you make it happen — in the panoramic Vista Lounge or a space matched to your event."
        />
        <div className="contact">
          <div className="contact__info" data-reveal>
            <div className="contact__details events-types">
              <span className="events-types__label">What we host</span>
              <ul className="events-types__list">
                {eventTypes.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <ContactForm
            heading="Tell us about your event"
            messageLabel="Format, dates, number of guests…"
            submitLabel="Send event enquiry"
          />
        </div>
      </section>
    </>
  )
}
