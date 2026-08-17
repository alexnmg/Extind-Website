// Master FAQ list. Every question lives here once; pages pull a curated
// subset by id via pickFaq() so copy never gets duplicated or drifts.
export const faqItems = [
  {
    id: 'spaces',
    q: 'What kinds of space does EXTIND offer?',
    a: 'Private offices, coworking, day or short-term project offices, meeting rooms, a conference room, and spaces for business meetings and events.',
  },
  {
    id: 'who',
    q: 'Who is EXTIND for?',
    a: 'Professionals, companies and corporate teams looking for a premium, quiet, fully-managed environment in Iași.',
  },
  {
    id: 'where',
    q: 'Where is EXTIND?',
    a: 'On the 6th floor of Palas Campus, Iași — a Class A office building connected to the facilities of the Palas complex.',
  },
  {
    id: 'capacity',
    q: 'How many people do the private offices hold?',
    a: 'Standard configurations suit teams of 2–12. For larger teams we can design a custom solution.',
  },
  {
    id: 'day-office',
    q: 'Can I rent an office for a single day?',
    a: 'Yes. We offer both a Day Pass for individual coworking access and a Day Office for exclusive use of a private office. Availability and rate depend on the date, duration and number of people.',
  },
  {
    id: 'multi-day',
    q: 'Can I book a space for two or three days?',
    a: 'Yes. We can prepare a private office and rooms for teams visiting Iași, workshops or short projects.',
  },
  {
    id: 'whats-included',
    q: "What's included in the price?",
    a: 'Depending on the product, the rate can include ergonomic furniture, 1 Gbps internet, utilities, maintenance, cleaning, coffee, tea, water, access to shared areas and room use per package. No hidden costs.',
  },
  {
    id: 'access',
    q: 'Is access 24/7?',
    a: 'For certain subscriptions and private offices, access can be extended to 24/7, per the contracted package and building rules.',
  },
  {
    id: 'coffee',
    q: 'Is coffee free?',
    a: 'EXTIND offers all clients filtered water, coffee and tea, and periodically fruit, snacks and other treats.',
  },
  {
    id: 'booking',
    q: 'How are rooms booked?',
    a: 'Rooms are used by reservation. Terms, included hours and any additional rates depend on the package.',
  },
  {
    id: 'events',
    q: 'Can I run a workshop or a corporate event?',
    a: 'Yes. We have rooms and spaces for meetings, trainings, workshops, presentations and business events. The setup depends on the format and number of participants.',
  },
  {
    id: 'internet',
    q: 'Do you have high-speed internet?',
    a: 'Yes — a 1 Gbps connection.',
  },
  {
    id: 'parking',
    q: 'Is there parking?',
    a: "Palas Campus and the Palas area offer parking options. Availability and cost are checked separately; spaces aren't guaranteed simply by booking an EXTIND space.",
  },
  {
    id: 'customise',
    q: 'Can I customise an office?',
    a: 'We can look at adapting the furniture, number of desks, branding or configuration, depending on requirements and contract length. Any change is confirmed by offer.',
  },
  {
    id: 'security',
    q: 'Can you meet special IT or security requirements?',
    a: 'Yes — we review corporate requests individually and confirm in writing what can be provided directly, what needs configuration, the timeline and any additional cost.',
  },
  {
    id: 'request-offer',
    q: 'How do I request an offer?',
    a: 'Fill in the “Request an offer for your team” form with the number of people, date, duration and main requirements, and EXTIND comes back with a fitting proposal.',
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
