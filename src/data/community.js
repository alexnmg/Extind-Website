import heroImg from '../assets/photos/coworking.jpg'
import vistaImg from '../assets/photos/panorama.jpg'
import pillarsImg from '../assets/photos/private-office.jpg'
import mask1 from '../assets/photos/open-office.jpg'
import mask2 from '../assets/photos/meeting-room.jpg'
import mask4 from '../assets/photos/focus-room.jpg'

/* Community content — events and the Extind Magazine.
 *
 * Events are intentionally empty at launch: only real events (with a confirmed
 * date, organiser, format and registration) are ever listed. The Events page
 * shows a placeholder and an "organise an event" form until real ones exist.
 *
 * Imagery reuses the site's existing photography; swap the `image` field for a
 * bespoke image per item.
 */

export const events = []

// Commercial-intent articles — the SEO/consideration core the client asked to
// launch first, in place of a journal of generic posts.
export const categories = ['Guides', 'Costs', 'Location']

export const posts = [
  {
    slug: 'coworking-or-private-office-team-of-5-20',
    title: 'Coworking or a private office: what to choose for a 5–20 person team',
    category: 'Guides',
    author: 'The Extind Team',
    dateLabel: '4 August 2026',
    readingTime: '5 min read',
    image: heroImg,
    excerpt:
      'The honest trade-offs between a coworking membership and a private office for a growing team — and how to tell which one you’ve outgrown.',
    body: [
      'Somewhere around five people, a coworking membership starts to strain. What worked beautifully for one or two founders — the flexibility, the buzz, the pay-as-you-go simplicity — becomes a daily negotiation for desks, a scramble for a room to take a call, and a quiet worry about who’s sitting next to your screens.',
      'Coworking is the right answer when your headcount moves week to week, when being around other people is a feature rather than a distraction, and when you’d rather not commit. A private office is the right answer when your team needs to concentrate together, when confidentiality matters, and when “our space” starts to shape how you work and how you’re seen.',
      'For a 5–20 person team, the tipping points are usually three: you’re paying for more coworking desks than a private room would cost; you’re losing real time to finding space for calls and meetings; or you’ve started handling information you’d rather keep behind a door. Any one of them is a signal.',
      'At EXTIND you don’t have to guess in advance. Our private offices are configured for teams of 2–12, and you can start smaller and grow into more space as you hire — without a rigid lease. If you’re on the fence, book a visit; twenty minutes in the space usually settles it.',
    ],
  },
  {
    slug: 'how-much-does-a-private-office-cost-in-iasi',
    title: 'How much does a private office cost in Iași?',
    category: 'Costs',
    author: 'The Extind Team',
    dateLabel: '22 July 2026',
    readingTime: '4 min read',
    image: pillarsImg,
    excerpt:
      'What actually goes into the price of a private office in Iași — and why a fully managed office and a conventional lease aren’t the same number.',
    body: [
      'It’s the first question every team asks, and the honest answer is: it depends on how many people you are, how long you stay, and what “office” includes. But the more useful question is what you’re comparing it against.',
      'A conventional lease in Iași looks cheaper per square metre — until you add it up. Rent is only the start: fit-out and furniture, utilities, internet, cleaning, maintenance, consumables, and the time someone on your team spends managing all of it. Those line items don’t appear on the lease, but they land on your budget every month.',
      'A fully managed private office folds all of that into one predictable figure. At EXTIND, a private office comes furnished, wired with 1 Gbps internet, cleaned and maintained, with meeting-room access and a team on site — one price, no surprises, no separate suppliers to chase.',
      'Because the right number depends on your team, we quote per office rather than publish a single rate. Tell us how many people, for how long, and what you need, and we come back with a clear proposal. Start with the “Request an offer” form, or book a visit to see the space first.',
    ],
  },
  {
    slug: 'office-for-a-day-in-iasi-whats-included',
    title: 'An office for a day in Iași: what’s included?',
    category: 'Guides',
    author: 'The Extind Team',
    dateLabel: '9 July 2026',
    readingTime: '4 min read',
    image: mask4,
    excerpt:
      'Day Pass, Day Office, Executive Day Office — the short-term options in Iași, and exactly what you get with each.',
    body: [
      'Not every need is a year-long commitment. Sometimes you want a professional base for a single day — a quiet place to work between meetings, a room to host a client, or a representative office for an important visit.',
      'At EXTIND there are three short-term options. A Day Pass gives one person access to the coworking floor for the day — a workstation, 1 Gbps internet, coffee and the shared areas. A Day Office gives you exclusive use of a private office, priced per office rather than per person, for a team that needs its own room for the day.',
      'And for the moments that matter most, the Executive Day Office prepares a private, representative office for one to three days — with meeting-room access, hospitality and a setup matched to your schedule — for hosting partners, investors, a board meeting or a management visit.',
      'All of them come with the essentials handled: furniture, internet, coffee, tea and filtered water, and a team on site. What’s included scales with the product; tell us the occasion and we’ll point you to the right one.',
    ],
  },
  {
    slug: 'how-to-choose-a-meeting-room-for-a-corporate-team',
    title: 'How to choose a meeting room for a corporate team',
    category: 'Guides',
    author: 'The Extind Team',
    dateLabel: '25 June 2026',
    readingTime: '5 min read',
    image: mask2,
    excerpt:
      'The practical checklist for picking a meeting or conference room your team — and your clients — will actually be comfortable in.',
    body: [
      'A meeting room is easy to book and easy to get wrong. The wrong size, the wrong tech, or the wrong setting can quietly undermine an important conversation before it starts. Here’s what actually matters.',
      'Capacity and layout first: match the room to the meeting, not the other way round. A four-person working session and a twelve-person board meeting want very different rooms. Then the essentials — reliable, fast internet; a screen you can share to without a fight; and a setup you can rearrange for the format you need.',
      'Setting matters more than teams expect. For client meetings, board sessions and interviews, the room is part of the impression you make — natural light, a considered space and a quiet environment do real work. So does discretion: a room where confidential conversations stay confidential.',
      'At EXTIND you can book meeting rooms and a conference room by reservation, per your package, with 1 Gbps internet and setup support — and, for the bigger occasions, the panoramic Vista Lounge. Tell us the format and the numbers, and we’ll match you to the right space.',
    ],
  },
  {
    slug: 'what-costs-are-included-in-a-fully-managed-office',
    title: 'What costs are included in a fully managed office?',
    category: 'Costs',
    author: 'The Extind Team',
    dateLabel: '11 June 2026',
    readingTime: '4 min read',
    image: mask1,
    excerpt:
      'The line items a fully managed office rolls into one price — and the ones a conventional lease leaves on your plate.',
    body: [
      '“Fully managed” is one of those phrases that sounds good and means little until you see the itemised version. Here’s what it actually covers at EXTIND, and what a conventional office asks you to handle yourself.',
      'Rolled into one price: the furnished office itself; 1 Gbps internet; utilities; cleaning; day-to-day maintenance; the usual coffee-point consumables; meeting-room access per your package; guest reception; and a team on site to keep it all running. You get one invoice and one point of contact.',
      'In a conventional lease, most of those are separate: you fit out and furnish the space, set up and manage utilities and internet, arrange cleaning and maintenance vendors, buy the consumables, and either hire or become the person who administers it all. The rent is the smallest part of the real number.',
      'The point of a managed office isn’t only cost — it’s attention. Every hour your team doesn’t spend running the office is an hour it spends on the work. If you want the full breakdown for your team size, request an offer and we’ll lay it out.',
    ],
  },
  {
    slug: 'advantages-of-an-office-in-palas-campus-iasi',
    title: 'The advantages of an office in Palas Campus, Iași',
    category: 'Location',
    author: 'The Extind Team',
    dateLabel: '28 May 2026',
    readingTime: '4 min read',
    image: vistaImg,
    excerpt:
      'Why the address matters — what a Palas Campus office gives your team, your clients and your day beyond the four walls.',
    body: [
      'Where your office sits shapes more than your commute. In Iași, few addresses do as much work as Palas Campus — and for a growing business, that matters in ways that go well beyond prestige.',
      'Palas puts you in the heart of the city’s business district, a short walk from restaurants, hotels, shops and the amenities that make a workday — and a client visit — easier. It’s connected, central and easy to reach, which quietly removes friction from everything from lunch to logistics.',
      'For clients and partners, the address is reassurance. A Class A office building in a landmark complex signals a business that’s established and serious — the kind of first impression you can’t fake and don’t have to explain.',
      'EXTIND sits on the 6th floor, with the panoramic Vista Lounge above the old town and full access to the wider Palas facilities. You get the location without the overhead of holding it yourself. Book a visit and take in the view.',
    ],
  },
]

export const featuredEvent = events.find((e) => e.featured)
export const upcomingEvents = events.filter((e) => !e.featured)
export const getEvent = (slug) => events.find((e) => e.slug === slug)
export const getPost = (slug) => posts.find((p) => p.slug === slug)
