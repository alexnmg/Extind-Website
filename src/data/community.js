import heroImg from '../assets/figma/hero.png'
import vistaImg from '../assets/figma/vista.png'
import pillarsImg from '../assets/figma/pillars.png'
import mask1 from '../assets/logo-anim/mask-1.jpg'
import mask2 from '../assets/logo-anim/mask-2.jpg'
import mask4 from '../assets/logo-anim/mask-4.jpg'

/* Community & Events content.
 *
 * Imagery reuses the site's existing photography (no image generator was
 * available); each item is mapped by what its photo depicts, and can be swapped
 * for a bespoke image by changing the `image` field.
 */

export const events = [
  {
    slug: 'founders-breakfast',
    name: 'Extind Founders Breakfast',
    organiser: 'Extind',
    dateLabel: 'Thursday, 11 September 2026',
    time: '08:30 – 10:00',
    location: 'Vista Lounge · 7th floor, Palas Campus',
    image: vistaImg,
    joinUrl: 'https://lu.ma/extind-founders-breakfast',
    joinLabel: 'Save your seat',
    featured: true,
    blurb:
      'Start the day with founders and operators from across Iași. Good coffee, a short fireside chat, and the kind of unhurried conversation that turns into partnerships.',
    body: [
      'There’s a particular energy to a room full of founders before 9am — everyone’s optimistic, no one’s in back-to-backs yet, and the conversations actually go somewhere. That’s the whole idea behind the Founders Breakfast.',
      'Each edition opens with a short, honest fireside chat with someone building in Iași, followed by open networking over coffee and a proper breakfast in the Vista Lounge. No pitches, no slide decks — just the people you’d want in your corner.',
      'Seats are limited to keep the room conversational. Save yours below, and come hungry.',
    ],
  },
  {
    slug: 'design-systems-in-practice',
    name: 'Design Systems in Practice',
    organiser: 'Iași Product & Design',
    dateLabel: 'Wednesday, 24 September 2026',
    time: '18:30 – 21:00',
    location: 'Meeting & Focus Rooms · Palas Campus',
    image: pillarsImg,
    joinUrl: 'https://www.eventbrite.com/e/design-systems-in-practice-iasi',
    joinLabel: 'Register free',
    featured: false,
    blurb:
      'A hands-on evening on building and maintaining a design system that engineering actually uses — two talks and an open Q&A.',
    body: [
      'A design system is easy to start and hard to keep alive. This evening is about the second part.',
      'Two speakers share how they build systems that engineering actually adopts — from naming and tokens to the governance that stops things drifting — followed by an open Q&A where you can bring your own thorny questions.',
      'Pizza and drinks are on us. Come for the talks, stay for the arguments about spacing scales.',
    ],
  },
  {
    slug: 'startup-pitch-night-7',
    name: 'Startup Pitch Night #7',
    organiser: 'Tech Iași & Extind',
    dateLabel: 'Thursday, 9 October 2026',
    time: '19:00 – 22:00',
    location: 'Coworking floor · Palas Campus',
    image: heroImg,
    joinUrl: 'https://lu.ma/pitch-night-7',
    joinLabel: 'Get a ticket',
    featured: false,
    blurb:
      'Six early-stage teams, five minutes each, in a room full of the people who can help them grow. Stay for the networking.',
    body: [
      'Six early-stage teams. Five minutes each. One room full of the operators, mentors and fellow founders who can actually help them move faster.',
      'Pitch Night is deliberately low-stakes and high-signal: real feedback, warm introductions, and a bar afterwards where the useful conversations happen.',
      'Whether you’re pitching or just want a front-row seat to what’s being built in the region, you’re welcome.',
    ],
  },
  {
    slug: 'workspace-wellness',
    name: 'Focus & Flow: Workspace Wellness',
    organiser: 'Extind',
    dateLabel: 'Tuesday, 21 October 2026',
    time: '12:30 – 13:30',
    location: 'Vista Lounge · 7th floor',
    image: mask4,
    joinUrl: 'https://lu.ma/extind-focus-and-flow',
    joinLabel: 'Reserve a spot',
    featured: false,
    blurb:
      'A lunch-and-learn on desk ergonomics, movement, and protecting your focus in a shared space — practical, no jargon.',
    body: [
      'Working from a beautiful shared space is great — until your neck disagrees. This lunch-and-learn covers the unglamorous fundamentals that keep you comfortable and focused.',
      'We’ll walk through desk and chair setup, simple movement you can do between calls, and a few honest tactics for protecting deep focus when you don’t have four walls. Practical, quick, no wellness jargon.',
      'Lunch is included. Bring your questions.',
    ],
  },
  {
    slug: 'ai-future-of-work-panel',
    name: 'AI & the Future of Work — Panel',
    organiser: 'Bucharest AI',
    dateLabel: 'Thursday, 6 November 2026',
    time: '18:00 – 20:30',
    location: 'Community space · Palas Campus',
    image: mask2,
    joinUrl: 'https://www.eventbrite.com/e/ai-and-the-future-of-work-iasi',
    joinLabel: 'Join the panel',
    featured: false,
    blurb:
      'Four practitioners on what AI is really changing about knowledge work — and what it isn’t. Moderated, honest, hype-free.',
    body: [
      'The conversation about AI at work has plenty of noise and not much nuance. This panel is our attempt at the opposite.',
      'Four practitioners — builders, not pundits — talk through what’s genuinely changing about knowledge work, where the tools fall short, and how teams are actually adopting them day to day. Moderated, candid, and refreshingly hype-free.',
      'Doors open at 18:00 with drinks; the panel starts at 18:30, with audience questions to close.',
    ],
  },
]

// Content-marketing categories. The first four cover the brief; Member Stories
// and Guides are recommended additions that give the journal reliable, evergreen
// content and a natural place to convert readers into visits.
export const categories = [
  'Extind News',
  'Community',
  'Workspace Know-how',
  'Trends',
  'Member Stories',
  'Guides',
]

export const posts = [
  {
    slug: 'vista-lounge-is-open',
    title: 'The Vista Lounge is open',
    category: 'Extind News',
    author: 'The Extind Team',
    dateLabel: '28 July 2026',
    readingTime: '2 min read',
    image: vistaImg,
    excerpt:
      'Our seventh-floor lounge — panoramic views, soft seating, and the best coffee in the building — is now open to all members.',
    body: [
      'After a few months of quiet work behind a taped-off door, the seventh floor is finally open. Say hello to the Vista Lounge.',
      'It’s the room we always wanted at the top of the building: floor-to-ceiling windows over the old town, soft seating you can actually sink into, and a coffee setup we may have over-engineered. It’s designed for the moments between focused work — a call that’s better taken by the window, a chat that runs long, a break that resets the afternoon.',
      'The Lounge is open to all members during building hours, and it doubles as the home for many of our community evenings. Come up, take in the view, and let us know what you think.',
    ],
  },
  {
    slug: 'businesses-growing-alongside-us',
    title: 'The businesses growing alongside us',
    category: 'Community',
    author: 'Ana Popescu',
    dateLabel: '15 July 2026',
    readingTime: '4 min read',
    image: heroImg,
    excerpt:
      'From solo founders to teams of twelve, here’s who’s building at Extind this season — and what they’re working on.',
    body: [
      'One of the quiet joys of running a workspace is watching businesses grow in real time — a second desk appears, then a third, then suddenly there’s a whole team where a solo founder used to sit.',
      'This season, that’s happened more than usual. We’ve welcomed a product studio, a pair of fintech teams, and a handful of independent consultants who’ve turned the coworking floor into an accidental brains-trust.',
      'We’ll be spotlighting some of them over the coming weeks. If you’re building something and looking for a room full of people who get it, you already know where to find us.',
    ],
  },
  {
    slug: 'ergonomic-desk-in-ten-minutes',
    title: 'Set up an ergonomic desk in ten minutes',
    category: 'Workspace Know-how',
    author: 'Mihai Ionescu',
    dateLabel: '2 July 2026',
    readingTime: '5 min read',
    image: mask4,
    excerpt:
      'Chair height, screen distance, and the two adjustments most people skip. A quick, practical setup you can do today.',
    body: [
      'Most desk discomfort comes down to a few centimetres in the wrong place. Here’s a ten-minute setup that fixes the majority of it.',
      'Start with the chair: feet flat, knees roughly level with your hips, and the backrest supporting the curve of your lower back. Then the screen — top of the display at eye level, about an arm’s length away, so you’re looking slightly down, not up.',
      'The two adjustments most people skip: getting your elbows to a relaxed 90 degrees at the keyboard, and raising a laptop onto a stand with an external keyboard rather than hunching over it. Do those two and your neck will thank you by Thursday.',
      'Every Extind desk is height-adjustable, and our team is always happy to help you dial it in.',
    ],
  },
  {
    slug: 'hybrid-work-2026',
    title: 'Hybrid work in 2026: what actually sticks',
    category: 'Trends',
    author: 'Ioana Marin',
    dateLabel: '20 June 2026',
    readingTime: '6 min read',
    image: mask2,
    excerpt:
      'Three years into the great reshuffle, the patterns are clearer. Here’s what’s becoming the norm — and what quietly faded.',
    body: [
      'Three years into the great reshuffle of where and how we work, the dust has mostly settled. The patterns that stuck are the ones that respected two things at once: focus and belonging.',
      'What’s become normal: deliberate in-person days for the work that benefits from a room, protected focus time that calendars actually defend, and third places — neither home nor headquarters — where independent workers find their people.',
      'What quietly faded: the fully-remote-forever absolutism, the theatre of being seen online, and the assumption that a bigger office signals a healthier company. Teams are optimising for the quality of time together, not the quantity of desks.',
      'It’s why flexible, well-run spaces are having a moment — and why we built Extind the way we did.',
    ],
  },
  {
    slug: 'nordic-ventures-story',
    title: 'From two desks to twelve: the Nordic Ventures story',
    category: 'Member Stories',
    author: 'Andrei Stancu',
    dateLabel: '5 June 2026',
    readingTime: '4 min read',
    image: mask1,
    excerpt:
      'How one founding team used a flexible private office to scale without ever signing a lease they’d regret.',
    body: [
      'When Nordic Ventures first walked in, they were two people and a whiteboard. Eighteen months later, they’re a team of twelve — and they’ve never signed a traditional lease.',
      'Their trick was refusing to over-commit. They started in a small private office, added desks as they hired, and moved to a larger room only when the growth was real. No dead space they were paying for, no cramped months waiting out a contract.',
      '“The freedom to resize without a negotiation every time changed how we hired,” their founder told us. “We could say yes to the right person without first solving a real-estate problem.”',
      'It’s the exact use case private offices at Extind are built for: room to grow, without betting the company on it.',
    ],
  },
  {
    slug: 'day-pass-flex-or-private-office',
    title: 'Day pass, flex, or private office — which fits you',
    category: 'Guides',
    author: 'The Extind Team',
    dateLabel: '22 May 2026',
    readingTime: '5 min read',
    image: pillarsImg,
    excerpt:
      'A plain-English guide to choosing the right Extind membership for how you actually work.',
    body: [
      'Extind memberships come in a few shapes, and the right one depends less on your budget than on how you actually work. Here’s the plain-English version.',
      'A Day Pass is for the occasional day out of the house — no commitment, just show up. Flex suits people who want a reliable base a few days a week, with a fixed desk and the perks that come with it. And a private office is for teams who need a lockable room that’s theirs, with the freedom to grow into more space as they hire.',
      'A simple rule of thumb: if you’re here occasionally, go Day Pass; if you’re here weekly, go Flex; if you’re a team, go private. And if you’re not sure, book a visit — twenty minutes in the space usually makes the choice obvious.',
    ],
  },
]

export const featuredEvent = events.find((e) => e.featured)
export const upcomingEvents = events.filter((e) => !e.featured)
export const getEvent = (slug) => events.find((e) => e.slug === slug)
export const getPost = (slug) => posts.find((p) => p.slug === slug)
