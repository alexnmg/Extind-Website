import { storyblokEditable, StoryblokComponent } from '@storyblok/react'
import Hero from '../Hero'
import CentralIdea from '../CentralIdea'
import ServicesSlider from '../ServicesSlider'
import VistaLounge from '../VistaLounge'
import Memberships from '../Memberships'
import Values from '../Values'
import Faq from '../Faq'
import BookVisit from '../BookVisit'
import Cta from '../Cta'

// Empty Storyblok text fields come back as '' — coerce to undefined so the
// component's built-in default content kicks in for anything left unfilled.
const t = (value) => value || undefined

const mapSlides = (slides) =>
  slides?.length
    ? slides.map((s) => ({
        src: s.image?.filename,
        caption: s.caption,
        alt: s.image?.alt || s.caption,
      }))
    : undefined

export function PageBlok({ blok }) {
  return blok.body?.map((nested) => <StoryblokComponent blok={nested} key={nested._uid} />)
}

export function HeroBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <Hero
        eyebrow={t(blok.eyebrow)}
        title={t(blok.title)}
        lede={t(blok.lede)}
        primaryLabel={t(blok.primary_label)}
        secondaryLabel={t(blok.secondary_label)}
        slides={mapSlides(blok.slides)}
      />
    </div>
  )
}

export function CentralIdeaBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <CentralIdea
        eyebrow={t(blok.eyebrow)}
        title={t(blok.title)}
        note={t(blok.note)}
        cards={
          blok.cards?.length
            ? blok.cards.map((c) => ({
                number: c.number,
                title: c.title,
                desc: c.description,
                variant: c.variant || 'light',
              }))
            : undefined
        }
      />
    </div>
  )
}

export function PillarsBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <ServicesSlider
        slides={
          blok.slides?.length
            ? blok.slides.map((s) => ({
                image: s.image?.filename,
                caption: s.caption,
                title: s.title,
                description: s.description,
                ctaLabel: s.cta_label || 'Learn more',
              }))
            : undefined
        }
      />
    </div>
  )
}

export function VistaLoungeBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <VistaLounge
        eyebrow={t(blok.eyebrow)}
        title={t(blok.title)}
        note={t(blok.note)}
        cardTitle={t(blok.card_title)}
        cardSubtitle={t(blok.card_subtitle)}
        description={t(blok.description)}
        ctaLabel={t(blok.cta_label)}
        slides={mapSlides(blok.slides)}
      />
    </div>
  )
}

export function MembershipsBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <Memberships
        eyebrow={t(blok.eyebrow)}
        title={t(blok.title)}
        note={t(blok.note)}
        plans={
          blok.plans?.length
            ? blok.plans.map((p) => ({
                plan: p.name,
                sub: p.subtitle,
                price: p.price,
                period: p.period,
                features: p.features?.map((f) => f.text) ?? [],
                cta: p.cta_label,
                accent: Boolean(p.accent),
              }))
            : undefined
        }
        office={
          blok.office?.length
            ? {
                title: blok.office[0].title,
                description: blok.office[0].description,
                cta: blok.office[0].cta_label,
                benefitsLeft: blok.office[0].benefits_left?.map((b) => b.text) ?? [],
                benefitsRight: blok.office[0].benefits_right?.map((b) => b.text) ?? [],
              }
            : undefined
        }
      />
    </div>
  )
}

export function ValuesBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <Values
        eyebrow={t(blok.eyebrow)}
        title={t(blok.title)}
        note={t(blok.note)}
        cards={
          blok.cards?.length
            ? blok.cards.map((c) => ({ title: c.title, desc: c.description }))
            : undefined
        }
      />
    </div>
  )
}

export function FaqBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <Faq
        eyebrow={t(blok.eyebrow)}
        title={t(blok.title)}
        note={t(blok.note)}
        items={
          blok.items?.length
            ? blok.items.map((i) => ({ q: i.question, a: i.answer }))
            : undefined
        }
      />
    </div>
  )
}

export function BookVisitBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <BookVisit
        title={t(blok.title)}
        subtitle={t(blok.subtitle)}
        description={t(blok.description)}
        ctaLabel={t(blok.cta_label)}
      />
    </div>
  )
}

export function CtaBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <Cta
        title={t(blok.title)}
        subtitle={t(blok.subtitle)}
        buttons={blok.buttons?.length ? blok.buttons.map((b) => b.label) : undefined}
      />
    </div>
  )
}
