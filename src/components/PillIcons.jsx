/* Line icons for hero pills. Drawn on a 24×24 grid at the wordmark's line
 * weight (1.5, round caps) so they sit with the rest of the UI's iconography. */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

/** Clock face with a reset arrow — round-the-clock access. */
export function ClockIcon() {
  return (
    <svg {...base}>
      <path d="M20.5 10.5a8.5 8.5 0 1 0-.36 4.2" />
      <path d="M15.6 3.9 20.8 5.6 19.1 10.8" />
      <path d="M12 6.9v5.4l3.4 2" />
    </svg>
  )
}

/** Task chair in profile — ergonomic seating. */
export function ChairIcon() {
  return (
    <svg {...base}>
      <path d="M8.5 3.8h7l.7 5.4H7.8l.7-5.4Z" />
      <path d="M6.2 12.2h11.6" />
      <path d="M8.6 9.2v3M15.4 9.2v3" />
      <path d="M12 12.2v4.4" />
      <path d="M12 16.6 8 20.2M12 16.6l4 3.6" />
    </svg>
  )
}

/** Three figures around a table — meeting rooms. */
export function MeetingIcon() {
  return (
    <svg {...base}>
      <circle cx="12" cy="4.9" r="1.9" />
      <circle cx="5.4" cy="16.4" r="1.9" />
      <circle cx="18.6" cy="16.4" r="1.9" />
      <path d="M8.4 20.1a3.9 3.9 0 0 0-6 0M21.6 20.1a3.9 3.9 0 0 0-6 0" />
      <path d="M10.4 8.2 6.6 12.6M13.6 8.2l3.8 4.4" />
    </svg>
  )
}

/** Shelving unit — fully equipped kitchen. */
export function KitchenIcon() {
  return (
    <svg {...base}>
      <rect x="3.6" y="4.2" width="16.8" height="4.6" rx="1" />
      <rect x="3.6" y="15.2" width="16.8" height="4.6" rx="1" />
      <path d="M9.4 8.8v6.4M14.6 8.8v6.4" />
      <path d="M9.4 12h5.2" />
    </svg>
  )
}
