# Deploy runbook — EXTIND website

**How this site gets to `extind.ro`.** Read alongside
[`SESSION-HANDOFF.md`](./SESSION-HANDOFF.md), which is the general
cross-session record; this file covers hosting only. Keep it current — when a
step is done, mark it done here in the same commit.

_Last updated 2026-08-31. Status: **repo prepared, nothing deployed yet.**_

---

## The decision

**Cloudflare Pages, on the client's own Cloudflare account, free tier.**

Decided 2026-08-31, over Vercel Pro and Romanian shared hosting:

- **Vercel's Hobby plan cannot legally host this.** Vercel restricts Hobby to
  non-commercial personal use, and defines commercial usage as any deployment
  serving the financial gain of anyone involved in producing it — explicitly
  including a paid consultant writing the code. Two independent triggers hit
  here. That puts Vercel at **$20/user/month** for a site that needs none of
  what the money buys.
- **Cloudflare Pages permits commercial use on the free tier**, with unmetered
  bandwidth and requests. Limits that could ever bind: 500 builds/month, 1
  concurrent build, 20,000 files, 25 MiB per file, 100 custom domains. This
  project is nowhere near any of them.
- **The domain's DNS is already on Cloudflare** (nameservers `alex.ns` /
  `lisa.ns.cloudflare.com`). Zone and Pages project in one account means the
  custom-domain step creates its own DNS records — no IP juggling, no
  proxy/certificate fight.
- The site is **pure static output** — no SSR, no functions, no image
  optimisation API. Nothing in the repo needs a specific host, which is why
  `vercel.json` stays in the tree: portability is free, so keep it.

## What was measured on 2026-08-31 — verify, don't trust, if time has passed

- `extind.ro` and `www` resolve to `188.114.96.8` / `188.114.97.8` — Cloudflare
  anycast, so the records are **proxied** (orange cloud) and the true origin IP
  is hidden.
- **What is live at `extind.ro` today is not this repo.** It is a separate
  hand-written one-page site (`style.css`, `script.js`,
  `public/logo-extind.PNG`, anchor nav `#about #fac #spaces #events #contact`,
  Inter / Montserrat / Space Grotesk). `/faq` and `/magazine` both return real
  404s, which is how we know the SPA has never been deployed there.
- Origin is `157.90.32.237` — **Hetzner Online GmbH** (AS24940, DE), reverse DNS
  `labs.sigmatic.ro`. Response headers carry `x-powered-by: WP Rocket/3.19.4`.
  **A third party (Sigmatic) very likely controls the Cloudflare zone**, not the
  client. Confirm before planning around it.
- `MX` → `mail.extind.ro` → the same `157.90.32.237`. Mail and web share that
  box.

---

## Trap 1 — SPA routing on Pages needs NO config, and the obvious config breaks it

Cloudflare Pages is **not** Netlify here, despite the shared `_redirects`
format.

- Pages' redirect docs: redirects are always followed, **regardless of whether
  an asset matches the incoming request**. So the reflexive SPA rule
  `/*  /index.html  200` intercepts `/assets/index-*.js` and `/favicon.svg` too,
  and the site renders a **white screen on every page**. Do not add it.
- Pages' serving docs: if a project has **no top-level `404.html`**, Pages
  treats the deployment as a single-page application and matches all incoming
  paths to `/`. That is exactly the behaviour this site needs, and it is on by
  default.

`npm run build` emits `assets/ favicon.svg icons.svg index.html` and no
`404.html`, so deep links work with zero configuration.

> **Never add a `404.html` to this project.** `SESSION-HANDOFF.md` notes the
> site has no 404 route — the catch-all renders `<Home />`. If anyone "fixes"
> that by dropping in a static `404.html`, it silently disables Pages' SPA
> fallback and **every deep link starts 404ing on hard load**. The fix for the
> missing-404 problem has to be a React route, never a static file.

This is documentation-verified, not yet empirically verified. **Confirm it on
the first `*.pages.dev` deploy** by hard-reloading `/faq` and a
`/magazine/:slug`. If Pages somehow does not do the fallback, the fix is a
`_redirects` file with explicit asset exclusions — never the naive catch-all.

## Trap 2 — mail lives on the old server, and breaking it breaks bookings

`hello@extind.ro` is the **Cal.com account address**. It is served from the
Hetzner box, not from anything we control. During the cutover, change **only**
the `@` and `www` records. Leave these exactly as they are:

| Type | Name | Value |
|---|---|---|
| `MX` | `@` | `mail.extind.ro` (priority 0) |
| `A` | `mail` | `157.90.32.237` |
| `TXT` | `@` | `v=spf1 +mx +a +ip4:157.90.32.237 ~all` |
| `TXT` | `_dmarc` | `v=DMARC1; p=none;` |

---

## Steps — Alex

1. **Find out who owns the Cloudflare zone.** Ask the client: *"Who set up your
   Cloudflare — do you have the login, or does your previous web company?"*
   Given the `labs.sigmatic.ro` reverse DNS, Sigmatic is the likely holder. If
   so, the zone has to move to the client's account, or the DNS change has to be
   made through Sigmatic. **This is the only step that can genuinely stall the
   launch — do it first.**
2. **Deploy to your own Cloudflare account** as a staging proof, without waiting
   for access. Build command `npm run build`, output directory `dist`, and leave
   `VITE_STORYBLOK_TOKEN` unset (see `SESSION-HANDOFF.md` — the empty token is
   deliberate). Hand the resulting `*.pages.dev` URL to the client for review.
3. **Get invited to the client's account** — Manage Account → Members → Invite,
   which only their Super Administrator can do. Ask for **Administrator**; the
   cutover touches both Pages and DNS, and finer scoping only adds friction
   mid-flight.
4. **Decide how Pages gets the code.** Connecting the GitHub repo installs the
   Cloudflare Pages app on `alexnmg/Extind-Website` under *their* account. If
   you would rather not link your repo to the client's account before handover,
   use **Direct Upload** (`wrangler pages deploy dist`) instead — the repo stays
   yours and they still get the site.
5. **Recreate the project in their account** and confirm it works on
   `*.pages.dev` there **before touching any DNS**.
6. **Screenshot the existing DNS records first.** The public A records are
   Cloudflare proxy IPs, so the real origin is invisible from outside — without
   that screenshot there is no rollback.
7. **Agree a cutover time with the client.** Their current site goes dark the
   moment the records flip.
8. **Add the custom domains** `extind.ro` and `www.extind.ro` in the Pages
   project. Because the zone is in the same account, Cloudflare creates the
   records and prompts to replace the existing ones. Certificates are automatic.
9. **Send a real test email to `hello@extind.ro`** and confirm it arrives.

## Steps — Claude

- **Repo prep — done 2026-08-31.** `.node-version` pinned to `24` (Pages'
  build image defaults to 22.16.0). `_redirects` was created and then removed
  once the docs proved it harmful — see Trap 1. `vercel.json` deliberately kept.
- **On the first `*.pages.dev` URL:** drive it in a browser, hard-reload `/faq`
  and a `/magazine/:slug`, confirm the Cal.com booker mounts and shows slots,
  read the console for errors, and report measurements. Note the preview-pane
  quirks in `SESSION-HANDOFF.md` — `[data-reveal]` sits at `opacity: 0` and has
  to be forced visible before screenshotting.
- **Before cutover:** re-dump the externally visible DNS as a rollback
  reference.
- **After cutover:** verify the domain resolves to Pages, certificates are
  valid, every route hard-loads, and **the MX / SPF / DMARC records are
  byte-for-byte unchanged**.
- **On request:** run `wrangler pages deploy dist` once Wrangler is
  authenticated locally — Alex owns the auth, Claude runs the deploy.

---

## Rollback

The old site keeps running on the Hetzner box throughout; only DNS moves. To
revert, restore the `@` and `www` records from the screenshot taken in step 6.
Propagation is fast because the records are proxied, but **the screenshot is the
only copy of the origin IP** — without it, rollback means asking Sigmatic.

## Go-live verification checklist

- [ ] `https://extind.ro` and `https://www.extind.ro` both load over valid TLS
- [ ] `/faq` hard-loads (not a soft client-side navigation)
- [ ] `/magazine/:slug` hard-loads for a real slug from `src/data/community.js`
- [ ] A deliberately mistyped URL renders the homepage, not a Pages 404 —
      that confirms the SPA fallback rather than a stale cache
- [ ] The Cal.com booker mounts and shows bookable slots
- [ ] Language switching still works and persists (`extind-lang` in localStorage)
- [ ] A test email to `hello@extind.ro` arrives
