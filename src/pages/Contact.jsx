import { useEffect } from 'react'
import SectionHeader from '../components/SectionHeader'
import ContactForm from '../components/ContactForm'
import LocationMap from '../components/LocationMap'
import { useLang } from '../lib/i18n'

const T = {
  en: {
    docTitle: 'Contact — Extind',
    eyebrow: 'Contact',
    title: "Let's talk",
    description:
      'Questions about spaces, pricing or a visit? Send us a message or reach us directly — we usually reply within one business day.',
    emailLabel: 'Email',
    visitLabel: 'Visit us',
  },
  ro: {
    docTitle: 'Contact — Extind',
    eyebrow: 'Contact',
    title: 'Hai să vorbim',
    description:
      'Întrebări despre spații, prețuri sau o vizită? Trimite-ne un mesaj sau contactează-ne direct — de obicei răspundem într-o zi lucrătoare.',
    emailLabel: 'Email',
    visitLabel: 'Vizitează-ne',
  },
}

// The "Visit us" detail opens the campus on the full OpenStreetMap site.
const MAP_LINK = 'https://www.openstreetmap.org/?mlat=47.1566&mlon=27.5885#map=17/47.1566/27.5885'

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

export default function Contact() {
  const { lang } = useLang()
  const t = T[lang]

  const details = [
    { label: t.emailLabel, value: 'office@extind.ro', href: 'mailto:office@extind.ro', Icon: EmailIcon },
    {
      label: t.visitLabel,
      value: 'Strada Sfântul Andrei 39A, Palas Campus (clădirea B2), etaj 6, Iași',
      href: MAP_LINK,
      Icon: PinIcon,
    },
  ]

  useEffect(() => {
    const prev = document.title
    document.title = t.docTitle
    return () => {
      document.title = prev
    }
  }, [t.docTitle])

  return (
    <section className="section">
      <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <div className="contact">
        <div className="contact__info" data-reveal>
          <div className="contact__details">
            {details.map(({ label, value, href, Icon }) => {
              const external = href.startsWith('http')
              return (
                <a
                  key={label}
                  className="contact__detail"
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                >
                  <span className="contact__detail-icon">
                    <Icon />
                  </span>
                  <span className="contact__detail-text">
                    <span className="contact__detail-label">{label}</span>
                    <span className="contact__detail-value">{value}</span>
                  </span>
                </a>
              )
            })}
          </div>
          <LocationMap />
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
