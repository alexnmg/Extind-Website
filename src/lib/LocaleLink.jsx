import { Link as RouterLink } from 'react-router-dom'
import { useLang } from './i18n'
import { localePath } from './paths'

/* Every internal link in the app imports Link from here rather than from
 * react-router-dom, so the /en prefix is applied in exactly one place. Editing
 * 32 call sites would have meant 32 chances to miss one, and a missed one is
 * silent: the link still works, it just drops the reader back into Romanian. */
export function Link({ to, ...rest }) {
  const { lang } = useLang()
  return <RouterLink to={localePath(to, lang)} {...rest} />
}
