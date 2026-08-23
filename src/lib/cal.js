import { getCalApi } from '@calcom/embed-react'

/* Cal.com booking config — the single place the account lives.
 *
 * The public booking page is cal.com/<CAL_USER>/<CAL_EVENT>. Handing the
 * account to the client later is done by changing the *email* on the Cal.com
 * account, which leaves the username and every link untouched.
 *
 * Do NOT rename the Cal.com username to "fix" anything: Cal.com does not
 * redirect old usernames — every existing link (including this embed) 404s.
 */
export const CAL_USER = 'extind'
export const CAL_EVENT = 'programeaza-o-vizita'
export const CAL_LINK = `${CAL_USER}/${CAL_EVENT}`

/* Extind palette mapped onto Cal's theme variables. Keys are written without
 * the leading `--`. Fonts can't be themed — the booker renders in a
 * cross-origin iframe, so it keeps Cal's own typeface. */
const UI = {
  theme: 'light',
  layout: 'month_view',
  cssVarsPerTheme: {
    light: {
      'cal-brand': '#465248',
      'cal-brand-emphasis': '#374039',
      'cal-brand-text': '#ffffff',
      'cal-bg': '#ffffff',
      'cal-bg-emphasis': '#f6f2ef',
      'cal-bg-subtle': '#f6f2ef',
      'cal-text': '#1f2326',
      'cal-text-emphasis': '#1f2326',
      'cal-text-subtle': '#999c9e',
      'cal-border': '#d1ccc4',
      'cal-border-subtle': '#e4ded8',
      'cal-border-emphasis': '#999c9e',
      radius: '8px',
    },
    dark: {
      'cal-brand': '#465248',
      'cal-brand-text': '#ffffff',
    },
  },
}

/** Apply Extind theming to a Cal embed instance. Safe to call more than once. */
export async function initCal(namespace) {
  const cal = await getCalApi({ namespace })
  cal('ui', UI)
  return cal
}
