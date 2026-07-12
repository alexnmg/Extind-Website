import { storyblokInit, apiPlugin } from '@storyblok/react'
import {
  PageBlok,
  HeroBlok,
  CentralIdeaBlok,
  PillarsBlok,
  VistaLoungeBlok,
  MembershipsBlok,
  ValuesBlok,
  FaqBlok,
  BookVisitBlok,
  CtaBlok,
} from '../components/storyblok/bloks'

export const storyblokToken = import.meta.env.VITE_STORYBLOK_TOKEN

/** True once a Preview token is set in .env — until then the site renders its built-in content. */
export const isStoryblokEnabled = Boolean(storyblokToken)

export function initStoryblok() {
  if (!isStoryblokEnabled) return
  storyblokInit({
    accessToken: storyblokToken,
    use: [apiPlugin],
    components: {
      page: PageBlok,
      hero: HeroBlok,
      central_idea: CentralIdeaBlok,
      pillars: PillarsBlok,
      vista_lounge: VistaLoungeBlok,
      memberships: MembershipsBlok,
      values_section: ValuesBlok,
      faq_section: FaqBlok,
      book_visit: BookVisitBlok,
      cta_section: CtaBlok,
    },
  })
}
