// Master FAQ list. Every question lives here once, in both languages; pages
// pull a curated subset by id via pickFaq() so copy never gets duplicated or
// drifts. Components resolve q[lang] / a[lang] at render time.
export const faqItems = [
  {
    id: 'spaces',
    q: {
      en: 'What kinds of space does EXTIND offer?',
      ro: 'Ce tipuri de spații oferă EXTIND?',
    },
    a: {
      en: 'Private offices, coworking, day or short-term project offices, meeting rooms, a conference room, and spaces for business meetings and events.',
      ro: 'Birouri private, coworking, birouri pentru o zi sau pentru proiecte pe termen scurt, săli de întâlniri, o sală de conferințe și spații pentru întâlniri de business și evenimente.',
    },
  },
  {
    id: 'who',
    q: {
      en: 'Who is EXTIND for?',
      ro: 'Cui i se adresează EXTIND?',
    },
    a: {
      en: 'Professionals, companies and corporate teams looking for a premium, quiet, fully-managed environment in Iași.',
      ro: 'Profesioniștilor, companiilor și echipelor corporate care caută un mediu premium, liniștit și complet administrat în Iași.',
    },
  },
  {
    id: 'where',
    q: {
      en: 'Where is EXTIND?',
      ro: 'Unde se află EXTIND?',
    },
    a: {
      en: 'On the 6th floor of Palas Campus, Iași — a Class A office building connected to the facilities of the Palas complex.',
      ro: 'La etajul 6 din Palas Campus, Iași — o clădire de birouri clasa A, conectată la facilitățile ansamblului Palas.',
    },
  },
  {
    id: 'capacity',
    q: {
      en: 'How many people do the private offices hold?',
      ro: 'Câte persoane încap în birourile private?',
    },
    a: {
      en: 'Standard configurations suit teams of 2–12. For larger teams we can design a custom solution.',
      ro: 'Configurațiile standard sunt potrivite pentru echipe de 2–12 persoane. Pentru echipe mai mari putem gândi o soluție personalizată.',
    },
  },
  {
    id: 'day-office',
    q: {
      en: 'Can I rent an office for a single day?',
      ro: 'Pot închiria un birou pentru o singură zi?',
    },
    a: {
      en: 'Yes. We offer both a Day Pass for individual coworking access and a Day Office for exclusive use of a private office. Availability and rate depend on the date, duration and number of people.',
      ro: 'Da. Oferim atât Day Pass, pentru acces individual la zona de coworking, cât și Day Office, pentru utilizarea exclusivă a unui birou privat. Disponibilitatea și tariful depind de dată, durată și numărul de persoane.',
    },
  },
  {
    id: 'multi-day',
    q: {
      en: 'Can I book a space for two or three days?',
      ro: 'Pot rezerva un spațiu pentru două sau trei zile?',
    },
    a: {
      en: 'Yes. We can prepare a private office and rooms for teams visiting Iași, workshops or short projects.',
      ro: 'Da. Putem pregăti un birou privat și săli pentru echipe aflate în vizită la Iași, workshopuri sau proiecte scurte.',
    },
  },
  {
    id: 'whats-included',
    q: {
      en: "What's included in the price?",
      ro: 'Ce este inclus în preț?',
    },
    a: {
      en: 'Depending on the product, the rate can include ergonomic furniture, 1 Gbps internet, utilities, maintenance, cleaning, coffee, tea, water, access to shared areas and room use per package. No hidden costs.',
      ro: 'În funcție de produs, tariful poate include mobilier ergonomic, internet 1 Gbps, utilități, mentenanță, curățenie, cafea, ceai, apă, acces la zonele comune și utilizarea sălilor conform pachetului. Fără costuri ascunse.',
    },
  },
  {
    id: 'access',
    q: {
      en: 'Is access 24/7?',
      ro: 'Accesul este 24/7?',
    },
    a: {
      en: 'For certain subscriptions and private offices, access can be extended to 24/7, per the contracted package and building rules.',
      ro: 'Pentru anumite abonamente și pentru birourile private, accesul poate fi extins la 24/7, conform pachetului contractat și regulilor clădirii.',
    },
  },
  {
    id: 'coffee',
    q: {
      en: 'Is coffee free?',
      ro: 'Cafeaua este gratuită?',
    },
    a: {
      en: 'EXTIND offers all clients filtered water, coffee and tea, and periodically fruit, snacks and other treats.',
      ro: 'EXTIND oferă tuturor clienților apă filtrată, cafea și ceai, iar periodic fructe, gustări și alte mici atenții.',
    },
  },
  {
    id: 'booking',
    q: {
      en: 'How are rooms booked?',
      ro: 'Cum se rezervă sălile?',
    },
    a: {
      en: 'Rooms are used by reservation. Terms, included hours and any additional rates depend on the package.',
      ro: 'Sălile se folosesc pe bază de rezervare. Condițiile, orele incluse și eventualele tarife suplimentare depind de pachet.',
    },
  },
  {
    id: 'events',
    q: {
      en: 'Can I run a workshop or a corporate event?',
      ro: 'Pot organiza un workshop sau un eveniment corporate?',
    },
    a: {
      en: 'Yes. We have rooms and spaces for meetings, trainings, workshops, presentations and business events. The setup depends on the format and number of participants.',
      ro: 'Da. Avem săli și spații pentru întâlniri, traininguri, workshopuri, prezentări și evenimente de business. Configurarea depinde de format și de numărul de participanți.',
    },
  },
  {
    id: 'internet',
    q: {
      en: 'Do you have high-speed internet?',
      ro: 'Aveți internet de mare viteză?',
    },
    a: {
      en: 'Yes — a 1 Gbps connection.',
      ro: 'Da — o conexiune de 1 Gbps.',
    },
  },
  {
    id: 'parking',
    q: {
      en: 'Is there parking?',
      ro: 'Există parcare?',
    },
    a: {
      en: "Palas Campus and the Palas area offer parking options. Availability and cost are checked separately; spaces aren't guaranteed simply by booking an EXTIND space.",
      ro: 'Palas Campus și zona Palas oferă opțiuni de parcare. Disponibilitatea și costul se verifică separat; locurile nu sunt garantate automat prin rezervarea unui spațiu EXTIND.',
    },
  },
  {
    id: 'customise',
    q: {
      en: 'Can I customise an office?',
      ro: 'Pot personaliza un birou?',
    },
    a: {
      en: 'We can look at adapting the furniture, number of desks, branding or configuration, depending on requirements and contract length. Any change is confirmed by offer.',
      ro: 'Putem analiza adaptarea mobilierului, a numărului de birouri, a brandingului sau a configurației, în funcție de cerințe și de durata contractului. Orice modificare se confirmă prin ofertă.',
    },
  },
  {
    id: 'security',
    q: {
      en: 'Can you meet special IT or security requirements?',
      ro: 'Puteți răspunde unor cerințe speciale de IT sau securitate?',
    },
    a: {
      en: 'Yes — we review corporate requests individually and confirm in writing what can be provided directly, what needs configuration, the timeline and any additional cost.',
      ro: 'Da — analizăm individual solicitările corporate și confirmăm în scris ce putem oferi direct, ce necesită configurare, termenul și eventualele costuri suplimentare.',
    },
  },
  {
    id: 'request-offer',
    q: {
      en: 'How do I request an offer?',
      ro: 'Cum solicit o ofertă?',
    },
    a: {
      en: 'Fill in the “Request an offer for your team” form with the number of people, date, duration and main requirements, and EXTIND comes back with a fitting proposal.',
      ro: 'Completează formularul „Cere o ofertă pentru echipa ta” cu numărul de persoane, data, durata și cerințele principale, iar EXTIND revine cu o propunere potrivită.',
    },
  },
]

const byId = Object.fromEntries(faqItems.map((item) => [item.id, item]))

/** Pull a curated, ordered subset of questions by id. */
export const pickFaq = (...ids) => ids.map((id) => byId[id])

// Homepage: the six broadest, top-of-funnel questions (what / who / where /
// capacity / trying it for a day / what the price covers).
export const homeFaq = pickFaq(
  'spaces',
  'who',
  'where',
  'capacity',
  'day-office',
  'whats-included',
)

// Private offices: capacity, what's included, access, and the corporate
// concerns that come up when a team is choosing a lockable office.
export const privateOfficeFaq = pickFaq(
  'capacity',
  'whats-included',
  'access',
  'customise',
  'security',
  'request-offer',
)

// Book a visit: the practical, logistical questions someone asks right before
// they come in — trying it out, multi-day stays, booking, parking, offers.
export const bookVisitFaq = pickFaq(
  'day-office',
  'multi-day',
  'booking',
  'events',
  'parking',
  'request-offer',
)
