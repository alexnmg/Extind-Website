/* Per-route SEO metadata, and the single source for what the build bakes into
 * static HTML.
 *
 * Plain data — no JSX, no asset imports — so both Vite and bare Node can import
 * it. scripts/build-seo.mjs reads this at build time and writes one real HTML
 * file per route with the head block filled in.
 *
 * Why static and not runtime: Google renders JavaScript, but the crawlers that
 * build link previews — Facebook, WhatsApp, LinkedIn, Slack, iMessage, X — do
 * not. A title or og:image set in a useEffect exists only in the browser and
 * would pass a DevTools check while every share still rendered blank.
 *
 * Both languages ship. Every entry carries { ro, en } and the build writes two
 * HTML files per route — Romanian at the bare path with <html lang="ro">,
 * English under /en with <html lang="en"> — plus the hreflang pair that ties
 * the two addresses together.
 */

export const SITE = {
  origin: 'https://extind.ro',
  name: 'EXTIND',
  locale: 'ro_RO',
}

/* Nine images cover fourteen routes — /faq, /privacy and /cookies share the
 * home image, /contact and /book-a-visit share the visit one. Filenames are
 * versioned: every platform caches scrapes by image URL, so a new name is a
 * guaranteed cache bust with no debugger round-trip. */
const og = (key) => `/og/extind-${key}-v1.jpg`

export const ROUTES = {
  '/': {
    title: { ro: 'Extind — Spaces to grow', en: 'Extind — Spaces to grow' },
    ogTitle: { ro: 'Birouri private și coworking în Palas Campus, Iași', en: 'Private offices and coworking at Palas Campus, Iași' },
    description: {
      ro: 'Birouri private, coworking și săli de conferințe în Palas Campus, Iași. Acces 24/7, comunitate activă și un lounge panoramic la etajul 6.',
      en: 'Private offices, coworking and conference rooms at Palas Campus, Iași. 24/7 access, an active community and a panoramic lounge on the 6th floor.',
    },
    image: og('home'),
    imageAlt: { ro: 'Spațiul de lucru deschis EXTIND din Palas Campus, Iași', en: 'The EXTIND open workspace at Palas Campus, Iași' },
  },
  '/about': {
    title: { ro: 'Despre — Extind', en: 'About — Extind' },
    ogTitle: { ro: 'Despre EXTIND', en: 'About EXTIND' },
    description: {
      ro: 'Cine suntem și de ce am construit EXTIND: un spațiu de lucru în Palas Campus, Iași, făcut pentru oameni care au nevoie de liniște și de comunitate deopotrivă.',
      en: 'Who we are and why we built EXTIND: a workspace at Palas Campus, Iași, made for people who need quiet and community in equal measure.',
    },
    image: og('about'),
    imageAlt: { ro: 'Recepția EXTIND cu logoul pe perete', en: 'The EXTIND reception with the logo on the wall' },
  },
  '/private-offices': {
    title: { ro: 'Birouri private — Extind', en: 'Private Offices — Extind' },
    ogTitle: { ro: 'Birouri private pentru echipe de 2–12', en: 'Private offices for teams of 2–12' },
    description: {
      ro: 'Birouri private compartimentate pentru echipe de 2–12 persoane, în Palas Campus, Iași. Abonament lunar, acces controlat 24/7, toate utilitățile incluse.',
      en: 'Partitioned private offices for teams of 2–12, at Palas Campus, Iași. Monthly membership, controlled 24/7 access, all utilities included.',
    },
    image: og('private-offices'),
    imageAlt: { ro: 'Birou privat EXTIND cu birouri și lumină naturală', en: 'An EXTIND private office with desks and natural light' },
  },
  '/executive-day-office': {
    title: { ro: 'Executive Day Office — Extind', en: 'Executive Day Office — Extind' },
    ogTitle: { ro: 'Executive Day Office', en: 'Executive Day Office' },
    description: {
      ro: 'Un birou privat cu ziua, pentru zilele în care ai nevoie de un spațiu serios: întâlniri cu clienții, interviuri sau muncă fără întreruperi.',
      en: 'A private office by the day, for the days you need a serious space: client meetings, interviews, or work without interruption.',
    },
    image: og('executive-day-office'),
    imageAlt: { ro: 'Birou executiv EXTIND pregătit pentru o întâlnire', en: 'An EXTIND executive office set up for a meeting' },
  },
  '/coworking': {
    title: { ro: 'Coworking — Extind', en: 'Coworking — Extind' },
    ogTitle: { ro: 'Coworking în Palas Campus, Iași', en: 'Coworking at Palas Campus, Iași' },
    description: {
      ro: 'Birou în spațiul comun EXTIND, cu abonament lunar sau acces cu ziua. Internet rapid, cafea de specialitate și acces la Vista Lounge.',
      en: 'A desk in the EXTIND shared space, monthly or by the day. Fast internet, specialty coffee and access to Vista Lounge.',
    },
    image: og('coworking'),
    imageAlt: { ro: 'Zona de coworking EXTIND cu birouri comune', en: 'The EXTIND coworking area with shared desks' },
  },
  '/conference-rooms': {
    title: { ro: 'Săli de conferințe — Extind', en: 'Conference Rooms — Extind' },
    ogTitle: { ro: 'Săli de conferințe și întâlniri', en: 'Conference and meeting rooms' },
    description: {
      ro: 'Săli de conferințe și de întâlniri în Palas Campus, Iași, cu rezervare la oră. Echipate pentru prezentări, training-uri și întâlniri cu clienții.',
      en: 'Conference and meeting rooms at Palas Campus, Iași, bookable by the hour. Equipped for presentations, training and client meetings.',
    },
    image: og('conference-rooms'),
    imageAlt: { ro: 'Sală de conferințe EXTIND cu masă lungă și ecran', en: 'An EXTIND conference room with a long table and screen' },
  },
  '/vista-lounge': {
    title: { ro: 'Vista Lounge — Extind', en: 'Vista Lounge — Extind' },
    ogTitle: { ro: 'Vista Lounge — etajul 6, cu vedere spre oraș', en: 'Vista Lounge — 6th floor, overlooking the city' },
    description: {
      ro: 'Lounge panoramic la etajul 6, cu vedere spre Palatul Culturii. Cafea, conversații și evenimente de comunitate, incluse în orice abonament EXTIND.',
      en: 'A panoramic lounge on the 6th floor, overlooking the Palace of Culture. Coffee, conversation and community events, included in every EXTIND membership.',
    },
    image: og('vista-lounge'),
    imageAlt: { ro: 'Vedere panoramică spre Iași din Vista Lounge', en: 'The panoramic view over Iași from Vista Lounge' },
  },
  '/events': {
    title: { ro: 'Evenimente — Extind', en: 'Events — Extind' },
    ogTitle: { ro: 'Evenimentele comunității EXTIND', en: 'EXTIND community events' },
    description: {
      ro: 'Meetupuri, paneluri și întâlniri de comunitate în Vista Lounge. Majoritatea sunt gratuite și deschise și celor din afara EXTIND.',
      en: 'Meetups, panels and community gatherings in Vista Lounge. Most are free and open to guests as well as members.',
    },
    image: og('events'),
    imageAlt: { ro: 'Spațiul de evenimente din Vista Lounge', en: 'The event space in Vista Lounge' },
  },
  '/contact': {
    title: { ro: 'Contact — Extind', en: 'Contact — Extind' },
    ogTitle: { ro: 'Contact', en: 'Contact' },
    description: {
      ro: 'Scrie-ne sau treci pe la noi: Strada Sfântul Andrei 39A, Palas Campus (clădirea B2), etajul 6, Iași. Răspundem în cel mult o zi lucrătoare.',
      en: 'Write to us or drop in: Strada Sfântul Andrei 39A, Palas Campus (building B2), 6th floor, Iași. We reply within one business day.',
    },
    image: og('visit'),
    imageAlt: { ro: 'Holul de la intrarea în EXTIND', en: 'The entrance corridor at EXTIND' },
  },
  '/book-a-visit': {
    title: { ro: 'Programează o vizită — Extind', en: 'Book a visit — Extind' },
    ogTitle: { ro: 'Programează o vizită', en: 'Book a visit' },
    description: {
      ro: 'Vino să vezi spațiul. Alege-ți un interval și îți arătăm birourile, sălile de conferințe și Vista Lounge, fără nicio obligație.',
      en: 'Come and see the space. Pick a slot and we will show you the offices, the conference rooms and Vista Lounge, with no obligation.',
    },
    image: og('visit'),
    imageAlt: { ro: 'Holul de la intrarea în EXTIND', en: 'The entrance corridor at EXTIND' },
  },
  '/faq': {
    title: { ro: 'Întrebări frecvente — Extind', en: 'FAQ — Extind' },
    ogTitle: { ro: 'Întrebări frecvente', en: 'Frequently asked questions' },
    description: {
      ro: 'Spații, prețuri, acces și detalii practice — întrebările pe care le auzim cel mai des despre EXTIND, cu răspunsuri complete.',
      en: 'Spaces, pricing, access and practical details — the questions we hear most about EXTIND, answered in full.',
    },
    image: og('home'),
    imageAlt: { ro: 'Spațiul de lucru deschis EXTIND din Palas Campus, Iași', en: 'The EXTIND open workspace at Palas Campus, Iași' },
  },
  '/privacy': {
    title: { ro: 'Politica de confidențialitate — Extind', en: 'Privacy Policy — Extind' },
    ogTitle: { ro: 'Politica de confidențialitate', en: 'Privacy Policy' },
    description: {
      ro: 'Ce date colectăm prin acest site, de ce, cui le transmitem și ce drepturi ai. Fără analiză de trafic, fără publicitate, fără urmărire.',
      en: 'What data we collect through this site, why, who receives it and what rights you have. No analytics, no advertising, no tracking.',
    },
    image: og('home'),
    imageAlt: { ro: 'Spațiul de lucru deschis EXTIND din Palas Campus, Iași', en: 'The EXTIND open workspace at Palas Campus, Iași' },
  },
  '/cookies': {
    title: { ro: 'Politica de cookie-uri — Extind', en: 'Cookie Policy — Extind' },
    ogTitle: { ro: 'Politica de cookie-uri', en: 'Cookie Policy' },
    description: {
      ro: 'Acest site nu folosește cookie-uri de analiză, urmărire sau publicitate și nu stochează absolut nimic în browserul tău. De aceea nu vezi niciun banner.',
      en: 'This site uses no analytics, tracking or advertising cookies and stores nothing at all in your browser — not one cookie. That is why you see no banner.',
    },
    image: og('home'),
    imageAlt: { ro: 'Spațiul de lucru deschis EXTIND din Palas Campus, Iași', en: 'The EXTIND open workspace at Palas Campus, Iași' },
  },
}

/* LocalBusiness, not a coworking-specific type — schema.org has none for shared
 * workspaces. Details come from the 2026 coworking contract. */
export const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE.origin}/#organization`,
  name: 'EXTIND',
  legalName: 'EXTIND BUSINESS SRL',
  url: SITE.origin,
  email: 'office@extind.ro',
  telephone: '+40722523102',
  image: `${SITE.origin}${og('home')}`,
  logo: `${SITE.origin}/brand/extind-wordmark-charcoal-256.png`,
  vatID: 'RO24027429',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Strada Sfântul Andrei 39A, Palas Campus, clădirea B2, etaj 6',
    addressLocality: 'Iași',
    addressCountry: 'RO',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 47.1566, longitude: 27.5885 },
  sameAs: [
    'https://www.facebook.com/extind',
    'https://www.linkedin.com/company/extind/',
    'https://www.instagram.com/extind.ro/',
  ],
}
