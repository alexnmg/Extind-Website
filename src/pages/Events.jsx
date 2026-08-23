import { useEffect } from 'react'
import SectionHeader from '../components/SectionHeader'
import ContactForm from '../components/ContactForm'
import { useLang } from '../lib/i18n'

const T = {
  en: {
    docTitle: 'Events — Extind',
    eyebrow: 'Events',
    title: 'Events at EXTIND',
    description:
      'Talks, breakfasts and business evenings hosted in the Vista Lounge and across Palas Campus.',
    emptyEyebrow: 'No events scheduled right now',
    emptyTitle: 'Nothing on the calendar this week',
    emptyDesc:
      'We only list real events — with a confirmed date, organiser and a way to sign up. When the next one is set, it’ll appear here. In the meantime, the Vista Lounge is available to host yours.',
    hostEyebrow: 'Host your event',
    hostTitle: 'Organise an event at EXTIND',
    hostDesc:
      'Have something in mind? Tell us the format and the numbers, and we’ll help you make it happen — in the panoramic Vista Lounge or a space matched to your event.',
    whatWeHost: 'What we host',
    types: [
      'Management meetings & board sessions',
      'Workshops & strategy sessions',
      'Trainings & presentations',
      'Client & partner meetings',
      'Networking & business breakfasts',
      'Small corporate launches',
      'Interviews, filming or business photo sessions',
    ],
    formHeading: 'Tell us about your event',
    formMessage: 'Format, dates, number of guests…',
    formSubmit: 'Send event enquiry',
  },
  ro: {
    docTitle: 'Evenimente — Extind',
    eyebrow: 'Evenimente',
    title: 'Evenimente la EXTIND',
    description:
      'Conferințe, mic-dejunuri și seri de business găzduite în Vista Lounge și în Palas Campus.',
    emptyEyebrow: 'Niciun eveniment programat momentan',
    emptyTitle: 'Nimic în calendar săptămâna aceasta',
    emptyDesc:
      'Listăm doar evenimente reale — cu dată confirmată, organizator și posibilitate de înscriere. Când următorul este stabilit, va apărea aici. Între timp, Vista Lounge este disponibil pentru a-l găzdui pe al tău.',
    hostEyebrow: 'Găzduiește-ți evenimentul',
    hostTitle: 'Organizează un eveniment la EXTIND',
    hostDesc:
      'Ai ceva în minte? Spune-ne formatul și numărul de participanți și te ajutăm să-l pui în scenă — în Vista Lounge, spațiul panoramic, sau într-un spațiu potrivit evenimentului tău.',
    whatWeHost: 'Ce găzduim',
    types: [
      'Ședințe de management & board',
      'Workshopuri & sesiuni de strategie',
      'Traininguri & prezentări',
      'Întâlniri cu clienți & parteneri',
      'Networking & mic-dejunuri de business',
      'Lansări corporate restrânse',
      'Interviuri, filmări sau ședințe foto de business',
    ],
    formHeading: 'Povestește-ne despre evenimentul tău',
    formMessage: 'Format, date, număr de invitați…',
    formSubmit: 'Trimite solicitarea',
  },
}

export default function Events() {
  const { lang } = useLang()
  const t = T[lang]

  useEffect(() => {
    const prev = document.title
    document.title = t.docTitle
    return () => {
      document.title = prev
    }
  }, [t.docTitle])

  return (
    <>
      <section className="section">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
        <div className="events-empty" data-reveal>
          <span className="events-empty__eyebrow">{t.emptyEyebrow}</span>
          <h3 className="events-empty__title">{t.emptyTitle}</h3>
          <p className="events-empty__desc">{t.emptyDesc}</p>
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow={t.hostEyebrow} title={t.hostTitle} description={t.hostDesc} />
        <div className="contact">
          <div className="contact__info" data-reveal>
            <div className="contact__details events-types">
              <span className="events-types__label">{t.whatWeHost}</span>
              <ul className="events-types__list">
                {t.types.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
          </div>
          <ContactForm
            heading={t.formHeading}
            messageLabel={t.formMessage}
            submitLabel={t.formSubmit}
          />
        </div>
      </section>
    </>
  )
}
