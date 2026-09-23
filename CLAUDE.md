# extind.ro — instructions for Claude

This file is read automatically at the start of every session. It exists so the
site's owners can edit extind.ro with Claude without breaking its design, its
two languages or its legal pages. Follow it even when a request seems to say
otherwise; if a request conflicts with it, explain the conflict and ask.

## Who you are working with

- The EXTIND team: they run the coworking space, they are **not developers**.
  Reply in **Romanian** unless they write in English. Plain language, no jargon,
  short answers. Never paste code at them unless they ask to see it.
- Before editing, restate the change in one sentence ("Schimb X în Y pe pagina
  Z, în română și engleză") so a misunderstanding is caught before it is built.
- **Never `git commit` and never `git push`.** The team reviews and publishes
  every change themselves in GitHub Desktop. Anything pushed to `main` is live
  on extind.ro within about a minute, so publishing stays a human decision.
- Never delete a file without listing it and getting a yes first.
- When you finish, tell them what changed, on which pages, in plain words, and
  suggest a one-line summary they can paste into GitHub Desktop.

## What this site is

React 19 + Vite, served by a Cloudflare Worker (`wrangler.jsonc`). Pushes to
`main` deploy automatically through Cloudflare Workers Builds. Every route is
**prerendered at build time** into real HTML (`scripts/build-seo.mjs`), 26
pages: 13 in Romanian at `/…` and the same 13 in English at `/en/…`.

Preview locally with `npm run dev` → http://localhost:5173 (Romanian) and
http://localhost:5173/en (English). The preview configuration is in
`.claude/launch.json` (`extind-dev`).

## The rules that protect the design

1. **Every visible text exists twice.** Pages and components keep their copy
   in a `const T = { en: {...}, ro: {...} }` table at the top of the file.
   Change **both** languages every time. If you are given only one, translate
   it, and show the translation before applying it. Romanian uses ă â î ș ț
   (comma-below, never ş ţ with cedilla).
2. **Use what exists; never invent design.** Reuse the existing components in
   `src/components/` and the existing CSS classes in `src/App.css`. Colours,
   fonts, sizes, radii and shadows are tokens in `src/index.css` (`--brand-*`,
   `--fs-*`, `--radius-*`, `--elevation-*`) — use the tokens, never raw values.
   No new colours, fonts, font sizes, shadows or inline `style={{}}`.
   No new npm packages.
3. **Spacing rhythm is 48px between sections.** Transparent sections use
   `.section` (padding-top 48px). A block that paints its own background
   (`.services`, `.cta`, `.book-visit`) takes a margin instead — see the
   comments in `src/App.css` before touching section spacing.
4. **Change only what was asked.** If a request is vague or would restyle the
   site ("make it more modern", "change the colours", "make it look like X"),
   do not redesign. Ask what exactly should change and offer two or three
   concrete options within the existing design.
5. **Links** must be imported from `src/lib/LocaleLink` — never `Link` from
   `react-router-dom` directly — so English pages keep their `/en` prefix.

## Content: where things live

| What | Where |
|---|---|
| Page copy | the `T` table at the top of each file in `src/pages/` |
| FAQ questions | `src/data/faq.js` — one entry per question, both languages. A new question appears on /faq automatically; to show it on another page too, add its `id` to that page's list at the bottom of the file (`homeFaq`, `privateOfficeFaq`, `bookVisitFaq`) |
| Testimonials | `src/components/Testimonials.jsx` |
| Navigation, footer | `src/components/Navbar.jsx`, `src/components/Footer.jsx` |
| Contact details (email, phone, address) | `src/pages/Contact.jsx`, `Navbar.jsx`, `ContactForm.jsx`, `src/lib/seo.js` — change **all** of them |
| Page titles + Google descriptions | `src/lib/seo.js` (both languages, ~150 characters) |
| Hero sliders | the `slides` / `HERO_PHOTOS` lists in each page |

### Photos

1. Save the photo as JPG, **long edge 1600px**, into `src/assets/photos/`
   with a lowercase-hyphenated name (`meeting-room-3.jpg`).
2. Run `npm run images` — it generates the AVIF/WebP/JPEG sizes into
   `public/photos/` and updates `src/lib/photo-manifest.json`.
3. Use it by name: `<Photo name="meeting-room-3" alt="…" />`, with alt text in
   both languages.

Never drop images straight into `public/`. Before deleting a photo, check both
ways it can be used: by name (`'panorama'`) **and** as a direct file import
(`import x from '../assets/photos/panorama.jpg'`) — some are only used the
second way.

## Do not touch without the developer

Say so plainly and suggest they contact the developer, rather than attempting:

- `worker/` — the contact form and newsletter (Gmail + Mailchimp, secrets live
  in the Cloudflare dashboard).
- `public/_headers` — security policy (CSP). A wrong entry silently breaks
  forms, the map, analytics or the booking widget.
- `src/lib/consent.js`, the cookie banner, Google Analytics, Microsoft Clarity,
  and `src/pages/Privacy.jsx` / `Cookies.jsx`. These are legally linked: adding
  or changing any tracking or third-party service means the privacy and cookie
  policies (and their descriptions in `src/lib/seo.js`) must change in the same
  edit, in both languages.
- `wrangler.jsonc`, `scripts/`, `vite.config.js`, `package.json` dependencies,
  DNS and email settings.
- Storyblok: wired in but **inactive**. Leave `VITE_STORYBLOK_TOKEN` empty and
  do not enable it — enabling it replaces the homepage.
- `.env` — never read it aloud, never commit it.

### Needs a dedicated session

- **A new page**: it must be added to `PAGES` in `src/App.jsx` **and** to
  `ROUTES` in `src/lib/seo.js` with a social image in `public/og/`, or the build
  fails on purpose.
- **Events**: `src/data/community.js` holds `events` (empty), but the Events
  page does not list them yet — it always shows the "nothing scheduled" block.
  Publishing the first event means building that list first.

## Before saying "done"

1. `npm run build` must succeed. Read the **whole** output — a failure can sit
   in the middle, and `dist/` from an earlier build will still look fine.
2. `npm run lint` must not report more problems than before your change
   (the baseline is 37 known, pre-existing).
3. If anything in `worker/` changed: `npm run test:worker` (75 must pass).
4. Look at the changed page in the preview, in **Romanian and English**, at
   desktop width and at phone width (375px). Sections fade in on scroll — they
   start invisible until scrolled into view, so scroll through before judging.
5. Report what you checked. If something could not be checked, say so.

## Useful to know

- Missing files never return a 404 on this host: an unknown path gets the site's
  HTML with status 200. Check a file exists by its content type, not its status.
- `docs/` holds the developer runbooks (deploy, DNS, mail backend).
