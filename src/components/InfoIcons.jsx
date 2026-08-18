/* Line icons for the white-pill feature lists (InfoGrid). Same drawing system
 * as PillIcons — 24×24 grid, 1.5 stroke, round caps — so a page can mix both.
 * Each list item maps to the icon whose meaning fits it; the map at the bottom
 * is the lookup used by InfoGrid. */
import { ClockIcon, ChairIcon, MeetingIcon, DeskIcon } from './PillIcons'

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const Dot = ({ cx, cy, r = 0.9 }) => (
  <circle cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />
)

/** Broadcast arcs — internet / Wi-Fi. */
function Wifi() {
  return (
    <svg {...base}>
      <path d="M4 9.2a12 12 0 0 1 16 0" />
      <path d="M6.9 12.5a8 8 0 0 1 10.2 0" />
      <path d="M9.7 15.7a4 4 0 0 1 4.6 0" />
      <Dot cx="12" cy="18.5" />
    </svg>
  )
}

/** Cup with steam — coffee, tea and water service. */
function Coffee() {
  return (
    <svg {...base}>
      <path d="M5 9h11v4.4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z" />
      <path d="M16 10.2h1.6a2.2 2.2 0 0 1 0 4.4H16" />
      <path d="M8 3.4c-.6.8-.6 1.6 0 2.4M11.5 3.4c-.6.8-.6 1.6 0 2.4" />
    </svg>
  )
}

/** Shield with a check — NDAs, confidentiality, discretion. */
function Shield() {
  return (
    <svg {...base}>
      <path d="M12 3.2 19 6v5.2c0 4.3-3 7.4-7 9-4-1.6-7-4.7-7-9V6l7-2.8Z" />
      <path d="m9 11.6 2.1 2.1L15 9.8" />
    </svg>
  )
}

/** Video camera — access monitoring. */
function Camera() {
  return (
    <svg {...base}>
      <rect x="3.2" y="8" width="12.4" height="8" rx="1.6" />
      <path d="M15.6 10.6 20.8 8v8l-5.2-2.6" />
      <Dot cx="7" cy="12" r="1.3" />
    </svg>
  )
}

/** Access card with a keyhole — controlled / named entry. */
function Key() {
  return (
    <svg {...base}>
      <rect x="3.4" y="5.6" width="17.2" height="12.8" rx="2" />
      <circle cx="8.6" cy="12" r="2.1" />
      <path d="M10.7 12H17M14.4 12v2.3" />
    </svg>
  )
}

/** Three connected nodes — a separate VLAN / network segment. */
function Network() {
  return (
    <svg {...base}>
      <circle cx="12" cy="5.2" r="2.1" />
      <circle cx="5.6" cy="18.4" r="2.1" />
      <circle cx="18.4" cy="18.4" r="2.1" />
      <path d="M10.7 6.8 7 16.4M13.3 6.8 17 16.4M7.7 18.4h8.6" />
    </svg>
  )
}

/** Glazed panel with a frosted diagonal — privacy film. */
function Privacy() {
  return (
    <svg {...base}>
      <rect x="4" y="4" width="16" height="16" rx="1.6" />
      <path d="M9 4 4 9M15 4 4 15M20 6 6 20M20 12 12 20" />
    </svg>
  )
}

/** Clipboard with rules — access logging & windows. */
function Log() {
  return (
    <svg {...base}>
      <rect x="5" y="4.5" width="14" height="16" rx="1.8" />
      <path d="M9 4.5v-1h6v1M8.5 9.5h7M8.5 12.5h7M8.5 15.5h4.5" />
    </svg>
  )
}

/** Doorway with an inbound arrow — receiving visitors / guests. */
function Visitor() {
  return (
    <svg {...base}>
      <path d="M14 4h4a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 18 20h-4" />
      <path d="M4 12h8M9 8.5 12.5 12 9 15.5" />
    </svg>
  )
}

/** Bookmark — space reserved exclusively. */
function Reserved() {
  return (
    <svg {...base}>
      <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.6L6 20V5.5a1 1 0 0 1 1-1Z" />
    </svg>
  )
}

/** Two-seat sofa — lounge / coffee point. */
function Lounge() {
  return (
    <svg {...base}>
      <path d="M5 10V8.2A2.2 2.2 0 0 1 7.2 6h9.6A2.2 2.2 0 0 1 19 8.2V10" />
      <path d="M4.6 10A1.6 1.6 0 0 0 3 11.6V15h18v-3.4A1.6 1.6 0 0 0 19.4 10a1.6 1.6 0 0 0-1.6 1.6V13H6.2v-1.4A1.6 1.6 0 0 0 4.6 10Z" />
      <path d="M5.8 15v2M18.2 15v2" />
    </svg>
  )
}

/** Two people — shared areas. */
function Users() {
  return (
    <svg {...base}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.6 19a5.4 5.4 0 0 1 10.8 0" />
      <path d="M16 5.4a3 3 0 0 1 0 5.2M17.6 13.7A5.4 5.4 0 0 1 20.4 18.4" />
    </svg>
  )
}

/** Star — the EXTIND community and its events. */
function Community() {
  return (
    <svg {...base}>
      <path d="m12 3.6 2.3 4.8 5.2.8-3.8 3.6.9 5.2L12 15.8l-4.7 2.5.9-5.2-3.8-3.6 5.2-.8L12 3.6Z" />
    </svg>
  )
}

/** Calendar with a marked day — booking / reservation. */
function Calendar() {
  return (
    <svg {...base}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="1.8" />
      <path d="M4 9.5h16M8 3.5v3M16 3.5v3" />
      <rect x="8.4" y="12.6" width="2.4" height="2.4" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Door — access to your contracted space. */
function Door() {
  return (
    <svg {...base}>
      <path d="M6 20V4.8A.8.8 0 0 1 6.9 4l9 .1a.8.8 0 0 1 .8.8V20" />
      <path d="M4.5 20h15" />
      <Dot cx="13.7" cy="12" />
    </svg>
  )
}

/** Ticket with a perforation — events. */
function Ticket() {
  return (
    <svg {...base}>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h13A1.5 1.5 0 0 1 20 8.5v1.6a1.9 1.9 0 0 0 0 3.8v1.6A1.5 1.5 0 0 1 18.5 17h-13A1.5 1.5 0 0 1 4 15.5v-1.6a1.9 1.9 0 0 0 0-3.8V8.5Z" />
      <path d="M14 7.4v9.2" strokeDasharray="1.4 2" />
    </svg>
  )
}

/** Headset — communication & operational support. */
function Support() {
  return (
    <svg {...base}>
      <path d="M5 13v-1a7 7 0 0 1 14 0v1" />
      <rect x="3.3" y="12.6" width="3.6" height="5.6" rx="1.4" />
      <rect x="17.1" y="12.6" width="3.6" height="5.6" rx="1.4" />
      <path d="M18.9 18.2v.5a2.6 2.6 0 0 1-2.6 2.6H12.5" />
    </svg>
  )
}

/** Membership card with chip & stripe — Palas partner card. */
function Card() {
  return (
    <svg {...base}>
      <rect x="3.2" y="5.6" width="17.6" height="12.8" rx="2" />
      <path d="M3.2 9.4h17.6" />
      <rect x="6" y="12.2" width="3.4" height="2.6" rx="0.6" />
      <path d="M12.6 14h5" />
    </svg>
  )
}

/** Clasped hands — partner / client visits, networking. */
function Handshake() {
  return (
    <svg {...base}>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  )
}

/** Briefcase — CEO / management presence. */
function Briefcase() {
  return (
    <svg {...base}>
      <rect x="3.5" y="7.5" width="17" height="11.5" rx="1.8" />
      <path d="M8.5 7.5V6a1.6 1.6 0 0 1 1.6-1.6h3.8A1.6 1.6 0 0 1 15.5 6v1.5" />
      <path d="M3.5 12.5h17" />
    </svg>
  )
}

/** Magnifier — audits & due diligence. */
function Search() {
  return (
    <svg {...base}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </svg>
  )
}

/** Person with a speech bubble — interviews. */
function Interview() {
  return (
    <svg {...base}>
      <circle cx="8.5" cy="8" r="3" />
      <path d="M3.5 19a5 5 0 0 1 10 0" />
      <path d="M14.5 4.5h5A1.5 1.5 0 0 1 21 6v3a1.5 1.5 0 0 1-1.5 1.5H18l-2 1.9V10.5h-1.5A1.5 1.5 0 0 1 13 9V6a1.5 1.5 0 0 1 1.5-1.5Z" />
    </svg>
  )
}

/** Globe — board meetings, international delegations. */
function Globe() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M3.8 12h16.4" />
      <path d="M12 3.8c2.4 2.3 3.7 5.2 3.7 8.2s-1.3 5.9-3.7 8.2c-2.4-2.3-3.7-5.2-3.7-8.2S9.6 6.1 12 3.8Z" />
    </svg>
  )
}

/** Lightbulb — workshops & strategy. */
function Lightbulb() {
  return (
    <svg {...base}>
      <path d="M9 16.4a5.5 5.5 0 1 1 6 0c-.6.4-1 1-1 1.8v.3h-4v-.3c0-.8-.4-1.4-1-1.8Z" />
      <path d="M9.5 20.4h5M10 18.4h4" />
    </svg>
  )
}

/** Screen with a chart on a stand — presentations. */
function Presentation() {
  return (
    <svg {...base}>
      <rect x="3.5" y="4" width="17" height="11" rx="1.6" />
      <path d="M12 15v4M9 21l3-2 3 2" />
      <path d="M7.5 11 10 8.5l2 1.6 3-3.1" />
    </svg>
  )
}

/** Cloche — catering. */
function Catering() {
  return (
    <svg {...base}>
      <path d="M5 15.4a7 7 0 0 1 14 0" />
      <path d="M3.5 15.4h17" />
      <path d="M12 8.4V7" />
      <Dot cx="12" cy="6.2" />
      <path d="M4 18.4h16" />
    </svg>
  )
}

/** "P" plate — parking. */
function Parking() {
  return (
    <svg {...base}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9.6 16.5v-9h3.1a2.6 2.6 0 0 1 0 5.2H9.6" />
    </svg>
  )
}

/** Signpost with a flag — temporary signage. */
function Sign() {
  return (
    <svg {...base}>
      <path d="M12 4v16" />
      <path d="M6 6.5h9.5l2.4 2.2-2.4 2.2H6z" />
      <path d="M9 20h6" />
    </svg>
  )
}

/** Sun — natural light. */
function Sun() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
    </svg>
  )
}

/** Panels with an add mark — flexible layouts. */
function Layout() {
  return (
    <svg {...base}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
      <path d="M17 13.7v6.6M13.7 17h6.6" />
    </svg>
  )
}

/** Sliders — furniture configuration. */
function Config() {
  return (
    <svg {...base}>
      <path d="M4 7h9M17 7h3" />
      <circle cx="15" cy="7" r="2" />
      <path d="M4 12h3M11 12h9" />
      <circle cx="9" cy="12" r="2" />
      <path d="M4 17h11M19 17h1" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}

export const infoIcons = {
  // reused from the pill set
  clock: ClockIcon,
  chair: ChairIcon,
  meeting: MeetingIcon,
  desk: DeskIcon,
  // this set
  wifi: Wifi,
  coffee: Coffee,
  shield: Shield,
  camera: Camera,
  key: Key,
  network: Network,
  privacy: Privacy,
  log: Log,
  visitor: Visitor,
  reserved: Reserved,
  lounge: Lounge,
  users: Users,
  community: Community,
  calendar: Calendar,
  door: Door,
  ticket: Ticket,
  support: Support,
  card: Card,
  handshake: Handshake,
  briefcase: Briefcase,
  search: Search,
  interview: Interview,
  globe: Globe,
  lightbulb: Lightbulb,
  presentation: Presentation,
  catering: Catering,
  parking: Parking,
  sign: Sign,
  sun: Sun,
  layout: Layout,
  config: Config,
}
