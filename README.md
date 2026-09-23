# extind.ro

Website for **EXTIND** — private offices, coworking, meeting rooms and the
Vista Lounge at Palas Campus, Iași. Romanian at `/`, English at `/en`.

## Editing

The site is edited with **Claude Code**. Its standing instructions — the design
rules, both-languages rule and what not to touch — are in [`CLAUDE.md`](CLAUDE.md)
and are loaded automatically. The step-by-step guide for the EXTIND team is
delivered separately, outside this repository.

## Commands

```bash
npm install          # once, after cloning
npm run dev          # local preview at http://localhost:5173
npm run build        # production build + prerender of all 26 pages
npm run lint         # code checks
npm run images       # regenerate photo sizes after adding to src/assets/photos
npm run test:worker  # contact form / newsletter backend tests
```

## Publishing

Every push to `main` is built and deployed to extind.ro automatically by
Cloudflare Workers Builds, usually within a minute or two. There is no manual
deploy step.

## Where things are

- `src/pages/` — one file per page; copy lives in the `T` table at the top
- `src/components/` — shared sections (hero, sliders, FAQ, footer, …)
- `src/data/` — FAQ and community content
- `src/lib/seo.js` — page titles, descriptions and social images
- `src/assets/photos/` — photo sources (1600px); `public/photos/` is generated
- `worker/` — contact form and newsletter backend (Gmail API + Mailchimp)
- `public/_headers` — security headers and caching
- `docs/` — deploy, DNS and mail-backend runbooks for developers
