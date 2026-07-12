import { useStoryblok, StoryblokComponent } from '@storyblok/react'
import { useLocation } from 'react-router-dom'

export default function StoryblokPage() {
  const location = useLocation()
  const slug = location.pathname.replace(/^\/+|\/+$/g, '') || 'home'
  const story = useStoryblok(slug, { version: 'draft' })

  if (!story?.content) {
    return <div className="page-loading" aria-busy="true" />
  }

  return <StoryblokComponent blok={story.content} />
}
