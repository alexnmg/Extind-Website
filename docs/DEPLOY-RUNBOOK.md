# Deploy runbook — EXTIND website

**How this site gets to `extind.ro`.** Read alongside
[`SESSION-HANDOFF.md`](./SESSION-HANDOFF.md), which is the general
cross-session record; this file covers hosting only. Keep it current — when a
step is done, mark it done here in the same commit.

_Last updated 2026-08-31. Status: **repo prepared, nothing deployed yet.**_

---

## The decision

**Cloudflare Pages, in a Cloudflare account that belongs to the client, free
tier.** Decided 2026-08-31.

- **Vercel's Hobby plan cannot legally host this.** Vercel restricts Hobby to
  non-commercial personal use and counts a paid consultant writing the code as
  commercial usage. That puts Vercel at **$20/user/month** for a purely static
  build that needs none of what the money buys.
- **Cloudflare Pages permits commercial use on the free tier**, unmetered
  bandwidth and requests. Limits that could ever bind: 500 builds/month, 1
  concurrent build, 20,000 files, 25 MiB per file, 100 custom domains. Nowhere
  near any of them.
- **A fresh Cloudflare account per client is free, and is the correct shape.**
  Do **not** put `extind.ro` into Alex's existing Cloudflare account: scoping a
  member to selected domains is an Enterprise capability, so on a free account
  any member the client is given sees **every domain in that account**. An
  account holding only `extind.ro` makes per-domain access automatic, and
  leaves the client owning their own infrastructure rather than renting a
  corner of the agency's. Register it on the **client's** email; Alex joins as
  Administrator.
- The build is **plain static output** — no SSR, no functions, no image
  optimisation API. `vercel.json` stays in the tree because portability costs
  nothing.

## Who controls what — confirmed 2026-08-31

| Asset | Holder | Status |
|---|---|---|
| **Email** — Google Workspace, all `@extind.ro` | **Alex has admin** | ✅ no dependency |
| **Current site + server** — Hetzner `157.90.32.237`, cPanel | **Alex has cPanel** | ✅ no dependency |
| **Cloudflare zone** — nameservers `alex.ns` / `lisa.ns` | **Sigmatic's account** | ⚠️ rebuild elsewhere, don't negotiate |
| **Domain registration** — ROTLD, `ICI - Registrar` | **UNKNOWN** | 🔴 **the only real blocker** |

The domain is registered **directly with ROTLD**, not through a reseller. So if
the client's company is the registered *deținător*, they can change nameservers
themselves at rotld.ro and **Sigmatic is never involved at all**. That single
question — does the client hold the ROTLD account — is what gates the launch.

Nothing else needs to be requested from Sigmatic. The zone is reconstructable
from the audit below, and the one record that is not (`ftp`) is recoverable
from cPanel's Zone Editor, which Alex can reach.

## Launch plan — Wednesday 2026-09-02

**Standing constraint until Wednesday: do nothing that affects the live
`extind.ro`.** Everything below in Phase A is safe under that rule, because a
newly added Cloudflare zone sits in **Pending Nameserver Update** and answers
only on its own newly assigned nameservers — which nothing on the internet
points at. ROTLD still delegates to `alex.ns` / `lisa.ns`, so the current site
keeps being served from Sigmatic's zone throughout.

### Phase A — build it all in advance (no effect on the live site)

1. Create the Cloudflare account **on the client's email address**; Alex joins
   as Administrator. Not Alex's existing account — see the decision section.
2. Add `extind.ro` and **select the Free plan**. This step is not optional:
   a zone left in *Finish setup* (Initializing) gets **no nameservers
   assigned**, and the assigned pair is exactly what ROTLD needs on Wednesday.
   **Record the pair.**
3. **Let Cloudflare import the records automatically, then correct them** —
   this is safer than creating them by hand, because hand-entry means
   transcribing two 2048-bit DKIM keys and one wrong character there is a
   silent deliverability failure. After the import:
   - **Delete three records:** the apex `A` → `157.90.32.237` (the old site),
     `CNAME www` → apex, and `CNAME ftp` → apex (vestigial).
   - **Verify both `_domainkey` records arrived.** An automatic scan often
     misses them, because DKIM selectors sit at arbitrary names that cannot be
     enumerated from DNS. If absent, paste them from
     [`dns-audit-extind-ro.txt`](./dns-audit-extind-ro.txt).
   - Diff the result against the target spec in that file before moving on.
4. Create the Pages project — build `npm run build`, output `dist`,
   `VITE_STORYBLOK_TOKEN` left unset — and verify on `*.pages.dev`.
5. Add `extind.ro` and `www` as Pages custom domains. They sit pending
   alongside the zone, which reduces Wednesday to a single action.
6. Claude verifies: SPA fallback on hard-loaded `/faq` and `/magazine/:slug`,
   the Cal.com booker, and a diff of the new zone against the target spec.

**Blocker that would surface here:** a *zone hold* on Sigmatic's side would
refuse the domain with _"the zone name provided is subject to a hold"_. Zone
holds are **Enterprise-only**, so this is unlikely for a small agency — but
finding out on Monday instead of Wednesday morning is the entire reason Phase A
happens early.

### Phase B — Wednesday, the only action that changes anything

7. **Change the nameservers at ROTLD** to the assigned pair.

That is the whole cutover. Two hazards attach to it:

- **Hand ROTLD the pair assigned to the _client's_ zone.** `extind.ro` also
  exists in Sigmatic's account, and Cloudflare expressly permits the same zone
  in more than one account — it responds by assigning each copy a **different**
  pair. So the client's zone will **not** be given `alex.ns` / `lisa.ns`, and
  two valid-looking pairs exist on the day. Read the pair off the client zone's
  Overview page at the moment of the change; do not work from notes.
- **Replace both nameservers; do not mix.** Cloudflare's activation check
  requires that *only* the assigned pair is listed at the registrar. Any
  leftover third-party nameserver causes activation to fail.
- **Never preset the nameservers at ROTLD before the zone exists.** Cloudflare
  treats that as a hijacking signal: _"If you preset your nameservers and then
  add the domain, your domain will be assigned a new set of nameservers."_ The
  pair you were given would silently stop being the right one. Zone first,
  registrar second — and note that a zone's assigned nameservers can never be
  changed afterwards, not even by Cloudflare Support.
- **Sigmatic must leave their zone running for at least 72 hours afterwards.**
  The `NS` records carry an 86400 TTL, so resolvers may keep using `alex.ns` /
  `lisa.ns` for up to a day. If that zone is deleted at the moment of cutover,
  those resolvers get SERVFAIL — site *and* mail down for whoever is still
  pointed there. It costs Sigmatic nothing to leave it up.

### Why the propagation window is low-risk

Both zones answer `MX 1 smtp.google.com` and carry identical SPF and DKIM, so
**email cannot break during propagation** regardless of which nameserver a
given resolver is using. The only visible effect is that some visitors see the
old site for a few hours while others see the new one — a non-event for a
marketing site.

DNSSEC is confirmed off (no `DS` at ROTLD), so the change carries none of the
"domain becomes unreachable" risk that an active DS record would introduce.

### Still open as of 2026-08-31

**Does the client hold the ROTLD account for `extind.ro`?** Alex is chasing the
answer and expects it before Wednesday. If they do, nobody needs Sigmatic for
the cutover. If Sigmatic holds it, the nameserver change becomes a request to
them — which is why the question is being asked days ahead rather than on the
day.

### Abort

Nothing in Phase A is destructive, so aborting before step 7 costs nothing —
the pending zone can simply be left or removed. After step 7, rollback is
pointing the nameservers back at `alex.ns` / `lisa.ns`, which is why Sigmatic's
zone is rebuilt-around rather than taken over.

## What was measured on 2026-08-31 — re-verify before cutover

- `extind.ro` and `www` resolve to `188.114.96.8` / `188.114.97.8` (+ AAAA
  `2a06:98c1:3120::8` / `3121::8`) — Cloudflare anycast, so the records are
  **proxied** and the true origin is hidden.
- **What is live at `extind.ro` today is not this repo.** It is a separate
  hand-written one-page site (`style.css`, `script.js`, anchor nav
  `#about #fac #spaces #events #contact`). `/faq` and `/magazine` return real
  404s — which is how we know the SPA has never been deployed there.
- **Mail is on Google Workspace** (`MX 1 smtp.google.com`), *not* on the
  Hetzner box. An earlier reading of this runbook said the opposite; it was
  wrong. The `A mail → 157.90.32.237` record and the `ip4:157.90.32.237` term
  in SPF are leftovers from the previous mail setup.
- **A first query returned `MX 0 mail.extind.ro`, which was wrong** — a stale
  answer from a local resolver. Sigmatic's zone export, taken at 08:28 that
  morning and so *before* the session began, already showed Google. The zone
  was not being edited; the resolver was lying. **Always audit against the
  zone's own nameserver, never a local resolver**, which is what caught it.
- **DNSSEC is off** (no `DS` at ROTLD) and there are **no CAA records** — the
  nameserver change needs no DS coordination, and nothing blocks certificate
  issuance.

### The captured zone

[`dns-audit-extind-ro.txt`](./dns-audit-extind-ro.txt) holds the authoritative
capture, including both **full DKIM public keys**. Regenerate it with a query
against the zone's own nameserver, never against a local resolver — that is how
the stale-MX mistake above happened.

**Must be recreated verbatim in the new zone (8 records):**

| Type | Name | Note |
|---|---|---|
| `MX` | `@` | `1 smtp.google.com` — Google Workspace |
| `TXT` | `@` | SPF — `v=spf1 include:_spf.google.com +a +ip4:157.90.32.237 ~all` |
| `TXT` | `@` | `google-site-verification=zfXc_0NN_…` |
| `TXT` | `@` | `v=DMARC1; p=none;` — see note below |
| `TXT` | `default._domainkey` | DKIM, 2048-bit — full key in the audit file |
| `TXT` | `google._domainkey` | DKIM, Google — full key in the audit file |
| `A` | `mail` | `157.90.32.237` — legacy, but preserve; **DNS-only, grey cloud** |

**Replaced by Pages at cutover:** apex and `www`. In the source zone the apex
is a **proxied `A` to `157.90.32.237`** — the old site, on the same box as the
old mail — and **`www` and `ftp` are proxied `CNAME`s to the apex**, not `A`
records. An external query returns `A` records for them because the proxy
flattens CNAMEs; only the export shows the truth. `ftp` is vestigial (FTP does
not work through an HTTP proxy) and should simply be dropped.

> **Do not bulk-import the BIND export into the new zone.** It would recreate
> the apex `A` pointing at the **old site**, plus the `www`/`ftp` CNAMEs, which
> then collide with the Pages custom domain. Create the seven records listed in
> the audit by hand, and let Pages create the apex and `www` itself.

> **DMARC is misconfigured.** `v=DMARC1; p=none;` sits on the apex, where it
> does nothing — a policy is only read at `_dmarc.extind.ro`, which is empty.
> **Carry it over as-is.** Fixing it during a migration means two variables
> moving at once; raise it afterwards as its own email-hygiene item.

> Dropping a DKIM record does not bounce mail. It quietly degrades
> deliverability until messages start landing in spam — a failure nobody
> notices for weeks. Verify both `_domainkey` records resolve from the new zone
> before considering the cutover done.

---

## Trap — SPA routing on Pages needs NO config, and the obvious config breaks it

Cloudflare Pages is **not** Netlify here, despite the shared `_redirects`
format.

- Pages' redirect docs: redirects are always followed, **regardless of whether
  an asset matches the incoming request**. So the reflexive SPA rule
  `/*  /index.html  200` intercepts `/assets/index-*.js` and `/favicon.svg`
  too, and the site renders a **white screen on every page**. Do not add it.
- Pages' serving docs: if a project has **no top-level `404.html`**, Pages
  treats the deployment as a single-page application and matches all incoming
  paths to `/`. That is exactly what this site needs, and it is on by default.

`npm run build` emits `assets/ favicon.svg icons.svg index.html` and no
`404.html`, so deep links work with zero configuration.

> **Never add a `404.html` to this project.** `SESSION-HANDOFF.md` notes the
> site has no 404 route — the catch-all renders `<Home />`. If anyone "fixes"
> that by dropping in a static `404.html`, it silently disables Pages' SPA
> fallback and **every deep link starts 404ing on hard load**. The fix has to
> be a React route, never a static file.

Documentation-verified, not yet empirically verified. **Confirm on the first
`*.pages.dev` deploy** by hard-reloading `/faq` and a `/magazine/:slug`. If
Pages does not do the fallback, the fix is a `_redirects` with explicit asset
exclusions — never the naive catch-all.

---

## Steps — Alex

1. **Ask the client one question: do they hold the ROTLD account for
   `extind.ro`?** Everything else is unblocked; this is not. If they do, nobody
   needs to contact Sigmatic at all.
2. **Take a full site + database backup from cPanel** while you still have it.
   The DNS side is already settled — Sigmatic supplied the zone export on
   2026-08-31 and it is reconciled into the audit.
3. **In Google Workspace admin**, confirm no additional DNS records are
   expected beyond the four already captured, and note any aliases or routing
   rules — so nothing is discovered missing after the nameservers move.
4. **Create the new Cloudflare account on the client's email address**, add
   yourself as Administrator, and add `extind.ro` to it. Cloudflare assigns a
   **new nameserver pair** — the launch depends on that pair reaching ROTLD.
5. **Recreate every record** from the table above, then have Claude diff the
   new zone against the audit before anything moves.
6. **Deploy Pages into that account** and verify on `*.pages.dev`.
7. **Change the nameservers at ROTLD** to the new pair. Web and mail cut over
   together. Agree the moment with the client — the current site goes dark then.
8. **Send a real test email to `hello@extind.ro`** and confirm it arrives.

## Steps — Claude

- **Repo prep — done 2026-08-31.** `.node-version` pinned to `24` (Pages'
  build image defaults to 22.16.0). No `_redirects` — see the Trap.
  `vercel.json` deliberately kept.
- **DNS audit — done 2026-08-31**, in `dns-audit-extind-ro.txt`. Re-run
  immediately before cutover; the zone was being edited during capture.
- **On the new zone:** diff it against the audit and name every missing record
  before the nameservers move.
- **On the first `*.pages.dev` URL:** hard-reload `/faq` and a
  `/magazine/:slug`, confirm the Cal.com booker mounts and shows slots, read
  the console, report measurements. Note the preview-pane quirks in
  `SESSION-HANDOFF.md` — `[data-reveal]` sits at `opacity: 0` and must be
  forced visible before screenshotting.
- **After cutover:** verify the domain resolves to Pages, certificates are
  valid, every route hard-loads, and **both DKIM records plus SPF and MX
  resolve identically to the audit**.
- **On request:** run `wrangler pages deploy dist` once Wrangler is
  authenticated locally.

---

## Rollback

The old site keeps running on the Hetzner box throughout, and Sigmatic's zone
is untouched — so rollback is simply **pointing the nameservers back to
`alex.ns` / `lisa.ns.cloudflare.com`** at ROTLD. That is the whole reason for
rebuilding the zone elsewhere rather than asking Sigmatic to hand theirs over:
the old configuration stays intact and reversible until the client chooses to
retire it.

## After the launch — not before

- **Trim SPF.** It currently ends `+a +ip4:157.90.32.237 ~all`. The `+a` term
  authorises whatever the apex `A` resolves to — which, after cutover, is
  Cloudflare Pages' shared anycast range. Those addresses do not send mail, so
  the practical risk is low, but the term becomes meaningless and should go.
- Decommission the Hetzner box once nothing depends on it. **Then** remove the
  `A mail` record and the `ip4:157.90.32.237` term from SPF — not during the
  cutover.
- Fix DMARC properly at `_dmarc.extind.ro`.

## Go-live verification checklist

- [ ] `https://extind.ro` and `https://www.extind.ro` both load over valid TLS
- [ ] `/faq` hard-loads (not a soft client-side navigation)
- [ ] `/magazine/:slug` hard-loads for a real slug from `src/data/community.js`
- [ ] A mistyped URL renders the homepage, not a Pages 404 — confirms SPA
      fallback rather than a stale cache
- [ ] The Cal.com booker mounts and shows bookable slots
- [ ] Language switching works and persists (`extind-lang` in localStorage)
- [ ] `MX`, SPF, and **both** `_domainkey` records match the audit exactly
- [ ] A test email to `hello@extind.ro` arrives
