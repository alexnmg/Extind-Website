# Session handoff — EXTIND website

**Read this first when picking the project up in a new session.** It is the
cross-session record of how this site is built, which decisions are already
settled, and what is still open. Keep it current: when a round changes
something described here, update it in the same commit.

_Last updated 2026-08-31, on top of commit `0abaa9f`._

---

## The project

EXTIND is a premium coworking / private-office brand at Palas Campus, Iași,
Romania. This repo is its marketing site.

- **Repo:** `github.com/alexnmg/Extind-Website` — local clone at
  `~/Documents/Claude/Extind-Website`
- **Branch:** `main`, pushed straight to `origin/main`.
- **Stack:** React 19, Vite 8, react-router-dom v7 (`BrowserRouter`,
  `<Link viewTransition>`). Node v24.18.0 via nvm.
- **Scripts:** `npm run dev` (5173), `npm run build`, `npm run lint`. There is
  **no test suite** — verification is building plus driving the site in a
  browser.
- **`npm run lint` is red on a clean tree — 38 pre-existing errors.** 32 are
  `react-refresh/only-export-components` from `InfoIcons.jsx`, 2 more from
  `i18n.jsx`, 1 `set-state-in-effect` in `Navbar.jsx`, and **3
  `react-hooks/immutability` flagging the site-wide `prop = prop ?? t.default`
  i18n pattern that every component uses deliberately — do not "fix" that to
  satisfy the rule.** Lint is a smoke test here, not a gate. `npm run build` is
  the check that must stay clean (~250ms).
- **Dev server:** use the preview tool with the `extind-dev` config in
  `.claude/launch.json`. Never start dev servers through Bash.
- **Deployment: Cloudflare Pages, on the client's Cloudflare account, free
  tier** — decided 2026-08-31. **[`DEPLOY-RUNBOOK.md`](./DEPLOY-RUNBOOK.md) is
  the file to read before touching hosting**; it carries the cutover steps, the
  do-not-touch DNS records, and the rollback. Nothing is deployed yet, and the
  site currently live at `extind.ro` is a **different, older one-page site** on
  a Hetzner box — not this repo.
  - This is a client-rendered SPA with `BrowserRouter`, so **every host needs a
    catch-all rewrite** or each non-root URL (`/faq`, `/magazine/:slug`, …)
    404s on a hard load while working perfectly in dev. `vercel.json` provides
    it via `/(.*)` → `/index.html` and is **kept deliberately** — the build is
    plain static output, so portability costs nothing.
  - **On Cloudflare Pages that rewrite must NOT be restated in a `_redirects`
    file.** Pages follows redirects regardless of whether an asset matches, so
    `/* /index.html 200` swallows `/assets/*.js` and white-screens the site.
    Pages instead does SPA fallback natively whenever a project has **no
    top-level `404.html`** — which is why one must never be added here. See
    the runbook's Trap 1.
  - `.node-version` pins the build to Node 24 (Pages' image defaults to
    22.16.0). `.env` is gitignored, so any future Storyblok token goes in the
    host's env, not the repo.

## Conventions — follow these, don't re-litigate them

- **Design tokens live in `src/index.css`** — that is the only `:root` block:
  `--brand-charcoal #1F2326`, `--brand-cream #f6f2ef`, `--accent #465248`
  (forest, aliased from `--brand-forest`), `--border #d1ccc4` (aliased from
  `--brand-warm-gray`), the `--fs-*` type scale and the `--radius-*` set. Fonts
  are Instrument Sans (`--font-sans`) and Libre Baskerville (`--font-serif`).
  **`src/App.css` defines no tokens** — it only consumes them via `var()`.
- **All sizing is token-driven and rescales in one place.** `src/index.css`
  redefines the whole `--fs-*` / `--radius-*` set on `:root` inside
  `@media (max-width: 1024px)` (≈0.9×) and `@media (max-width: 600px)` (≈0.8×).
  That is the site's responsive strategy — not per-component media queries.
  **The token names are historical Figma steps, not values:** `--fs-10` is 12px,
  `--fs-48` is 55px, `--fs-96` is 104px. Never hardcode a px font-size or
  radius; pick the nearest token and it scales everywhere for free.
- **`.page` container** is `max-width: 1600px` with 24px padding, so **1552px is
  the widest content width the site ever has**. Layout maths depends on it, and
  it is also hardcoded as a bare literal at `src/App.css:989-990` (the
  full-bleed testimonials rail) — change it in both places.
- **Scroll-entry animation** is `[data-reveal]`, driven by
  `src/components/ScrollReveal.jsx` (IntersectionObserver, gated on
  `prefers-reduced-motion: no-preference`). Its effect depends on `lang` —
  without that, text swapped by a language change stays at `opacity: 0`.
- **i18n is custom, no library.** `src/lib/i18n.jsx` exposes `LanguageProvider`
  and `useLang()`, persists to the localStorage key `extind-lang`, syncs
  `<html lang>`, and sets `DEFAULT_LANG = 'ro'` — **Romanian is the site
  default.** Every component carries a co-located
  `const T = { en: {...}, ro: {...} }`.
- **The language switcher shows the _inactive_ language** — the one you would
  switch to. It sits to the right of the Book CTA in the bar, and inside the
  mobile menu rather than the mobile bar.
- **"Spaces to grow." is the tagline and stays in English** in both languages.
- **Contact email** is `hello@extind.ro`. Socials: `facebook.com/extind`,
  `instagram.com/extindcowork`, `linkedin.com/company/extind`.
- **Photos** are `src/assets/photos/*.jpg` — real location photography, all
  ≤1600px (16 room shots at 1600×1067 plus `founder.jpg` at 800×1200). Every
  Figma placeholder **photo** has been deleted. Optimise new ones with
  `sips -Z 1600 -s formatOptions 78`.
  **`src/assets/figma/` is _not_ placeholder material** — despite the folder
  name it is the live icon set (14 SVGs: chevrons, checks, star, email, the six
  Values icons) imported by `Faq`, `Footer`, `Testimonials`, `Values`,
  `BenefitsGroups` and `Memberships`. Do not delete it. Only
  `arrow-left.svg`, `arrow-right.svg` and `chevron-up.svg` are unreferenced.
- **Burger breakpoint is 1310px**, measured against the bar's actual contents.
  It has been re-measured four times as the bar changed — measure, don't guess,
  if you touch the nav.
- **Nav** has an "Offices" dropdown (Private Offices + Executive Day Office).
  The mobile menu drills down to the right, with the back button **above** the
  menu items.
- **Content data:** `src/data/faq.js` (bilingual Q&As plus `pickFaq()` and the
  `homeFaq` / `privateOfficeFaq` / `bookVisitFaq` subsets) and
  `src/data/community.js` (bilingual magazine articles, slugs stable across
  languages).
- **Commit style:** imperative sentence subject, a body explaining the *why*,
  and the `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>` trailer.
  Commit only when asked.

## Architecture traps

- **`src/App.css` is one ~4,300-line global sheet, and components deliberately
  wear each other's classes.** It is *ordered* by component, which invites the
  assumption that a block belongs to one — it doesn't. `BookVisit.jsx` renders
  the booking card with `.vista__card`, so restyling the Vista Lounge card
  changes the booker on four pages. `ContactForm.jsx` renders
  `.book-visit__heading`, `.field-row` and `.checkbox-row`. `.contact__form` is
  a hand-maintained mirror of `.book-visit__form` (its own comment says so), so
  their padding must be changed together at all three breakpoints.
  `.slider-arrow` and `.text-button` are shared by all three sliders.
  **Grep the class across `src/` before editing any rule.**
- **There is no 404 route.** The catch-all renders `<Home />`, so any dead or
  mistyped URL silently shows the homepage under the wrong path — broken
  internal links produce no visible symptom, and a sweep for them was already
  needed once (commit `406c50e`). Check links by clicking, not by "the page
  rendered." Setting a Storyblok token swaps that catch-all to `StoryblokPage`,
  which renders a permanent empty `aria-busy` div for any unknown slug.
- **Language has no URL, and the site has no SEO layer.** `useLang()` +
  `localStorage` only: EN and RO share one URL, so you cannot link to the
  English version and a crawler only ever sees the RO default. There are no meta
  descriptions, OG/canonical/hreflang tags, `robots.txt` or sitemap, and no
  SSR/prerender; `document.title` is set client-side per page. This matters
  because the `/magazine` posts were commissioned as commercial-intent SEO
  content. Adding `/en` `/ro` route prefixes or a prerender step is a real
  project, not a tweak — raise it before starting.
- **Storyblok is wired but out of date — treat `STORYBLOK.md` as historical.**
  It is intentionally unpopulated (empty `VITE_STORYBLOK_TOKEN`) so the static
  pages render; do not "fix" that. Its claim that any path resolves to a
  matching story is now false: the 13 explicit routes in `App.jsx` shadow the
  CMS, so only unmatched paths reach `StoryblokPage`. The blok registry covers
  homepage sections only; every other page is code-owned. And
  `src/components/Memberships.jsx` is reachable **only** via `MembershipsBlok` —
  dead in the live site, and the one content component with no `useLang()`, so
  enabling the CMS would render English-only pricing to Romanian visitors.
  Switching it on is a project, not a token paste.

## Cal.com booking — read before touching anything booking-related

- **`src/lib/cal.js` is the single place the account lives.** `CAL_USER='extind'`,
  `CAL_EVENT='programeaza-o-vizita'` (Cal auto-generated that slug from the
  Romanian event title). **Cal.com does not redirect old usernames or slugs** —
  renaming 404s every existing link, including the embed.
- **`theme: 'light'` must stay inside `CAL_CONFIG`**, not only in the `ui()`
  call. `ui()` is a postMessage that races the embed's mount (the `<Cal>`
  child's effect runs before the parent's), so a visitor whose OS is in dark
  mode would otherwise get a dark booker inside this light-only site.
- **`src/components/BookVisit.jsx`** has `mode="inline"` (embedded booker, the
  default) and `mode="cta"` (card plus popup). It lazy-mounts on a
  **scroll-position check, deliberately not IntersectionObserver**: IO callbacks
  are paused in hidden/background tabs, and a booker that silently never mounts
  is far worse than loading it a little early.
- The account is on `hello@extind.ro`, with Google Calendar connected.
- **The Cal.com watermark cannot be removed in code** — verified empirically,
  the iframe is cross-origin and throws `SecurityError`. Removing it needs Cal
  Teams (~$12/user/mo, ~$144/yr), which also unlocks custom reminder workflows.
  Do not cover it with an overlay: fragile, and it circumvents a paid gate.

### Booker geometry (commit `38f309c`)

Cal's booker is a grid of **fixed columns**, not a fluid layout. Measured:

| iframe width | what Cal does |
|---|---|
| `< 768` | drops to its stacked mobile layout |
| `≥ 768` | meta 240 + calendar 478 + slots 240 = 960 — it wants a **1008px** iframe |
| `≥ 1024` | its own breakpoint; outer columns widen to 280 — it wants **1088** |

Give it less than it wants at either step and **the shortfall comes straight out
of the calendar column**. The old CSS handed it 784px, leaving a 264px month grid.

Current CSS:

- `.book-visit__form` is `flex: 0 1 1056px` — 1008 plus 24 a side. Our 24px sits
  inside Cal's own 24px margin, so the two sum to the 48px the card is padded by.
- `.book-visit__card` is `flex: 1 0 380px` and takes the remainder, so it can no
  longer grow with the viewport.
- `@media (min-width: 601px)` sets the embed's side padding to 24 and its bottom
  padding to 0 — Cal leaves ~80px of branding space below the booker.

Results: at the 1552 container → card 472, iframe 1008, calendar 478. At 1440 →
card 380, iframe 940. At ~1280 it is **still tight** (iframe 780, calendar ~250);
fixing that means stacking the section around 1300 instead of the current 1024,
which was deliberately **not** done — ask before changing it.

> **Do not remove** the `@media (max-width: 1024px)` reset
> `.book-visit__card, .book-visit__form { flex: initial }`. In the stacked column
> direction that 1056px basis would otherwise become a **height**.

The Cal-side figures above were measured through the live embed; re-measure
rather than trusting them if Cal ships a redesign.

## Open decisions — only Alex can answer these

1. The **real visiting hours** for the Cal.com Availability schedule (it is still
   on Cal's defaults).
2. Whether bookings should **require confirmation** or auto-confirm.
3. Optional: rename the event slug `programeaza-o-vizita` to a neutral `visit`
   (flip `CAL_EVENT`; remember there is no redirect from the old slug).
4. Whether to pay for **Cal Teams** to drop the watermark and get reminder
   workflows.
5. ~~Where the site is deployed.~~ **Answered 2026-08-31: Cloudflare Pages, in
   a Cloudflare account belonging to the client** — see
   [`DEPLOY-RUNBOOK.md`](./DEPLOY-RUNBOOK.md). One question still gates the
   launch: **does the client hold the ROTLD account for `extind.ro`?** Alex
   already controls the Google Workspace (all `@extind.ro` mail) and the
   current server's cPanel, and the Cloudflare zone is being rebuilt from an
   external audit rather than negotiated out of Sigmatic — so the registrar is
   the only remaining dependency.

## Known blockers, still open

- **Both forms discard submissions.** `ContactForm.jsx` (used on `/contact` and
  `/events`) shows a thank-you state promising a reply within one business day,
  then throws the data away. The **footer newsletter form** is worse —
  `onSubmit={(e) => e.preventDefault()}` on an uncontrolled, unnamed input with
  no feedback at all, and it is on every page.
- **The consent checkbox names Terms and a Privacy Policy that do not exist —
  and does not even link to them.** The consent strings in `ContactForm.jsx` are
  plain unlinked text, and there are no `/privacy` or `/terms` routes. Note the
  catch-all: if you link the text before creating the pages, those URLs will
  render the **homepage**, not a 404.
- The **About founder quote is an invented placeholder** awaiting Catrinel
  Gradu's real words. About's Instagram tiles link to the profile until a live
  feed exists.
- A **custom booking system** (secure admin panel, email plus push/SMS
  notifications) was fully analysed and costed, then parked on the backlog in
  favour of Cal.com. Don't restart that analysis unless asked.

## Working method that has been earning its keep

- **Verify in the browser yourself and show measurements**; never ask Alex to
  check manually.
- **The preview pane fights back.** `document.visibilityState` is `'hidden'`, so
  IntersectionObserver never fires and `[data-reveal]` elements sit at
  `opacity: 0`. Inject
  `[data-reveal]{opacity:1!important;transform:none!important}` before
  screenshotting; front the tab with `tabs_select` or `innerWidth` reads 0; and
  re-read after a delay, because the first read can land pre-hydration.
  Screenshots sometimes freeze — trust DOM measurements over a stale image.
- **You cannot read into the Cal iframe.** To measure Cal's internals, load the
  embed URL **top-level**
  (`app.cal.com/extind/programeaza-o-vizita?embed=…&layout=month_view&theme=light`)
  where it becomes same-origin, and resize the viewport to find its breakpoints.
- **Beware circular reasoning when compensating for a third-party embed.**
  Measure, derive the governing relationship, then move one lever — trimming the
  padding once just widened the iframe and moved nothing.
- **Alex's rhythm:** short specific requests, often with a screenshot. Verify,
  report the numbers, then he says "yes" or "commit and push".
- **Standing preferences:** recommend a model tier at each new task/round
  boundary, and end every run with the decision surface / next steps rather than
  a narrative recap.
