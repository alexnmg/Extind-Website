# Storyblok CMS Setup

The site is wired for Storyblok: every page is a `page` story whose `body` is a list of
section blocks (hero, pricing, FAQ, …) that editors can reorder and edit. **Until a token
is configured, the site renders its built-in content** — nothing breaks without the CMS.

## 1. Create the space

1. Sign up / log in at [app.storyblok.com](https://app.storyblok.com)
2. Create a new space (e.g. **Extind Website**) — the free Community plan is fine
3. Note the **space ID** (visible in Settings or the URL)

## 2. Connect the token

1. In Storyblok: **Settings → Access tokens** → copy the **Preview** token
2. In the project: copy `.env.example` to `.env` and paste the token:
   ```
   VITE_STORYBLOK_TOKEN=your-preview-token
   ```
3. Restart the dev server (`npm run dev`)

## 3. Push the component schemas

Instead of creating ~17 block types by hand, push them with the Storyblok CLI:

```bash
npm install -g storyblok
storyblok login
storyblok push-components ./storyblok/components.schema.json --space YOUR_SPACE_ID
```

## 4. Create the homepage story

1. **Content → Create new → Story**, name it `Home`, slug **`home`**, content type **page**
2. In the `body` field, add the sections in order:
   `hero`, `central_idea`, `pillars`, `vista_lounge`, `memberships`, `values_section`, `faq_section`, `book_visit`, `cta_section`
3. Fill the fields and **Save** — any text field left empty falls back to the built-in content,
   so you can migrate copy gradually
4. Upload photos to slides / pillars via their `image` asset fields

New pages: create more `page` stories — the app routes any URL path to the story with the
matching slug (e.g. `/about` → story with slug `about`).

## 5. Visual editor (optional but recommended)

Storyblok's visual editor loads your site in an iframe over HTTPS.

1. In Storyblok: **Settings → Visual Editor** → set location to `https://localhost:5173/`
2. Run the dev server with HTTPS enabled: `npm run dev:https`
   (first run: accept the self-signed certificate warning in the browser)
3. Open the `Home` story — you get live preview and click-to-edit on every section

## Notes

- The app currently loads **draft** content (`version: 'draft'`) with the Preview token —
  right for development and the visual editor. For a public production deployment, switch to
  a Public token and `version: 'published'` in `src/components/storyblok/StoryblokPage.jsx`.
- Navbar and Footer are code-owned for now (not CMS blocks). Moving them to a global story
  is a natural follow-up.
- Empty **text** fields fall back to built-in copy; empty **lists** (cards, plans, FAQ items)
  also fall back — to intentionally show fewer items, add the ones you want rather than none.
