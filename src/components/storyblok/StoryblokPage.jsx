import { useStoryblok, StoryblokComponent } from '@storyblok/react'
import { useLocation } from 'react-router-dom'
import { basePath } from '../../lib/paths'
import NotFound from '../../pages/NotFound'

/* The catch-all route when Storyblok is enabled.
 *
 * Two things this has to get right, both of which it previously did not:
 *
 * The /en prefix is a language marker, not part of the slug. Without stripping
 * it, an English URL asks Storyblok for a story literally called
 * 'en/something', which does not exist — so every English page under a
 * Storyblok deployment would have failed to resolve.
 *
 * A story that resolves to nothing is a 404, not a loading state. The old code
 * returned the spinner for both "still fetching" and "no such story", so an
 * unknown URL sat on a permanent aria-busy placeholder. That also silently
 * removed the real 404 page — and its noindex — the moment a Storyblok token
 * was set, which is the documented next step for this project.
 */
export default function StoryblokPage() {
  const location = useLocation()
  const slug = basePath(location.pathname).replace(/^\/+|\/+$/g, '') || 'home'
  const story = useStoryblok(slug, { version: 'draft' })

  // undefined = the request has not resolved yet; null = resolved to nothing.
  if (story === undefined) {
    return <div className="page-loading" aria-busy="true" />
  }

  if (!story?.content) {
    return <NotFound />
  }

  return <StoryblokComponent blok={story.content} />
}
