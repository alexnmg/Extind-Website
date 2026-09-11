# Mail backend — contact form and newsletter

**Read this before changing anything under `worker/`, or before touching the
Cloudflare or Google configuration behind it.** This is the most operationally
fragile part of the site and none of it is visible from the repo alone.

_Last updated 2026-09-11, on top of commit `64e3822`._

---

## What exists

The site is Cloudflare Workers Static Assets with **one** Worker script,
`worker/index.js`, reached only on `/api/*`. Everything else is served as a
static file and costs nothing.

| Endpoint | Does |
|---|---|
| `POST /api/contact` | Emails the enquiry to `office@extind.ro`, then sends the visitor an acknowledgement |
| `POST /api/newsletter` | Adds the address to the Mailchimp audience |

Both live behind the same defences, applied cheapest-first: a honeypot field, a
dwell-time check (anything submitted within 3 s of the form rendering is
dropped), strict validation, then a rate limit of 3 per 60 s per IP.

**Honeypot and dwell-time rejections answer `200 {ok:true}`.** That is
deliberate — telling a bot why it failed only helps it try again, and no human
ever sees either branch.

---

## Mail goes out through the Gmail API, as `office@extind.ro`

`worker/gmail.js`. A Google **service account** with **domain-wide delegation**
impersonates `office@extind.ro`, scoped to `https://www.googleapis.com/auth/gmail.send`
and nothing else. The Worker mints an RS256 JWT, trades it for an access token
(cached in module scope for the hour it lasts) and posts the message.

### Why not SMTP, and why not Cloudflare Email Service

Both look obvious and both are wrong here. Do not re-propose them without
reading this.

- **SMTP.** A Worker is not a server with a socket. Outbound port 25 is blocked
  outright, and `startTls()` on 587 — what WP Mail SMTP would use — has an open,
  unacknowledged bug in Cloudflare's own runtime (`cloudflare/workerd#2712`,
  filed September 2024). The Google Workspace SMTP relay's IP-allowlist mode is
  also unusable: Cloudflare documents that `connect()` does not use dedicated
  egress IPs, so there is no stable address to allowlist.
- **Cloudflare Email Service.** Requires the Workers **Paid** plan. Its pricing
  page advertises free sending "to verified destination addresses on all plans",
  which is a trap for this domain: that path needs a *routing domain*, i.e. MX
  pointed at Cloudflare, which would replace Google Workspace and break the
  client's email.

The Gmail API needs no paid plan, inherits the SPF and `google._domainkey` DKIM
already live on `extind.ro` (so no DNS changes and no domain reputation to warm
up), puts sent mail in `office@extind.ro`'s Sent folder, and adds **no new data
processor** — the mail already lives in Google Workspace.

### The Google Cloud project is in the AGENCY's account, not the client's

Project `extind-mail`, service account `extind-contact-form@extind-mail.iam.gserviceaccount.com`,
in **alex@namogo.com's** Google Cloud account. This is deliberate and is what
Google's own production-readiness guidance recommends — the project belongs to
the developer. Domain-wide delegation is keyed on the service account's numeric
client ID, with no project or organisation field, so it works across accounts.

Extind's Workspace **super admin** authorised it at
Admin console → Security → Access and data control → API controls →
Domain-wide delegation. **They can revoke it there in one click**, which is the
client's protection and should stay that way.

Two things that will bite whoever rebuilds this:

- A Workspace account **cannot create a Google Cloud project outside an
  organisation**. That is why the project is not in the client's account.
- Google Cloud organisations created on or after **3 May 2024** block
  service-account JSON key creation by default
  (`constraints/iam.managed.disableServiceAccountKeyCreation`). Expect to need
  an org-policy exception before you can download a key at all.

---

## Newsletter goes to Mailchimp

`worker/mailchimp.js`. Server prefix `us3`, audience `f418861d6f`, **single
opt-in** by the client's choice — `MAILCHIMP_STATUS` in `wrangler.jsonc` flips
it to `pending` for double opt-in and nothing else needs to change.

It uses **`PUT /lists/{id}/members/{md5}`**, not `POST`. `POST` returns 400 when
the address already exists, and surfacing that would turn a public footer field
into an oracle for who is subscribed. `PUT` can *still* raise `Member Exists` if
the MD5 in the URL disagrees with the `email_address` in the body, so both are
derived from one normalised string and a test asserts they match.

The body carries **only** `email_address` and `status_if_new`. `PUT` updates an
existing member, so any extra field would let a stranger submitting someone
else's address rewrite that person's record.

**MD5 is a Cloudflare-only extension to WebCrypto.** `crypto.subtle.digest('MD5', …)`
works in workerd and throws in Node, so the test harness shims it. A green local
suite is not evidence the hashing works in production — a real signup is.

### Error handling is deliberately asymmetric

Only three titles — `Member Exists`, `Member In Compliance State`,
`Forgotten Email Not Subscribed` — are hidden behind a `200`, because each says
something about one specific address. **Everything else fails loudly and names
the cause.** An earlier version treated every 400 as success, which meant a
misconfiguration told visitors they were subscribed while Mailchimp refused
every one, undiagnosable from outside. There is a regression test for this.

---

## Secrets live in the Cloudflare DASHBOARD

**`wrangler secret put` from Alex's machine targets the wrong account.** The
local wrangler is authenticated to *Alex@namogo.com's Account* (`7b57552f…`),
while the `extind` Worker lives in *Office@extind.ro's Account* (`169c6710…`).

Set secrets at **Workers & Pages → extind → Settings → Variables and Secrets**,
type **Secret**:

| Name | What |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_KEY` | The whole service-account JSON, one line |
| `MAILCHIMP_API_KEY` | Mailchimp API key |

Non-secret configuration (`CONTACT_FROM`, `CONTACT_TO`, `MAILCHIMP_SERVER_PREFIX`,
`MAILCHIMP_LIST_ID`, `MAILCHIMP_STATUS`) lives in `wrangler.jsonc` `vars` and is
deployed from the repo.

---

## Transactional email templates

`worker/email-templates.js` builds both messages. The rules in that file are not
stylistic — each exists because a named client breaks without it. Tables at
600px because Outlook's Word engine has no flex, grid, max-width, float or
position; everything inlined because the one `<style>` block is invisible to
Outlook, Thunderbird and Gmail-with-a-non-Google-account; no `@font-face`
because almost nothing loads one.

Two decisions worth keeping:

- **The logo PNGs have the cream background baked in** (`public/brand/*-email.png`).
  No client inverts image pixels, but Gmail's apps and every Outlook rewrite the
  CSS background behind them in dark mode — charcoal artwork on a transparent
  PNG over a darkened ground is invisible.
- **The acknowledgement does NOT quote the sender's message back.** Echoing
  arbitrary text into a mail that is SPF-aligned and DKIM-signed as `extind.ro`
  turns the public contact form into a way to send convincing mail from the
  client's domain to any address. Confirming receipt does not require repeating
  content. Regression test covers it.

---

## Testing

`npm run test:worker` — 75 tests, plain Node, no dependencies. **This is the
only pre-deploy check**: `vite dev` has no Worker behind it, so the form's error
branch is all that can be exercised locally.

The suite stubs at the `fetch` layer and generates a throwaway RSA key, so it
exercises the real path — it builds an RS256 JWT and verifies the signature
against the public key, rather than asserting a mock was called.

## When something breaks

Read the Worker logs: **Workers & Pages → extind → Logs**, start the live
stream, then submit the form. The Worker logs the cause deliberately and never
logs the key or a submitted address. Expect one of:

| Log | Means |
|---|---|
| `E_NO_CREDENTIALS` | The secret is missing or not valid JSON |
| `unauthorized_client` | Delegation missing, still propagating (up to 24 h), or authorised for a different scope |
| `newsletter: mailchimp 400 {title}` | Mailchimp rejected it; the title says why |
| `newsletter: mailchimp ok {list_id, member_status}` | It worked — trust this over the dashboard |

**The Mailchimp dashboard can lag badly.** On 2026-09-11 it showed 1 contact
while the API reported 6. Trust `GET /3.0/lists/{id}` or *Export all contacts*
over the Contacts view.
