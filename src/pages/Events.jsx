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
      'Conferințe, brunch-uri și seri de business găzduite în Vista Lounge și în Palas Campus.',
    emptyEyebrow: 'Niciun eveniment programat momentan',
    emptyTitle: 'Nimic în calendar săptămâna aceasta',
    hostEyebrow: 'Găzduiește-ți evenimentul',
    hostTitle: 'Organizează evenimentul tău la EXTIND',
    hostDesc:
      'Spune-ne ce pregătești, câți participanți ai și cum vrei să se desfășoare. Îți recomandăm spațiul potrivit și îl configurăm pentru evenimentul tău, fie că alegi Vista Lounge, sala de conferințe sau una dintre sălile de întâlniri.',
    whatWeHost: 'Ce poți organiza',
    types: [
      'Ședințe de management & board',
      'Workshopuri & sesiuni de strategie',
      'Traininguri, prezentări și evenimente interne',
      'Întâlniri cu clienți, parteneri sau investitori',
      'Evenimente de networking și brunch-uri de business',
      'Lansări de produs și evenimente corporate restrânse',
      'Interviuri, filmări și ședințe foto profesionale',
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
        <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} as="h1"
          />
        <div className="events-empty" data-reveal>
          <span className="events-empty__eyebrow">{t.emptyEyebrow}</span>
          <h3 className="events-empty__title">{t.emptyTitle}</h3>
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
            source="events"
          />
        </div>
      </section>
    </>
  )
}
