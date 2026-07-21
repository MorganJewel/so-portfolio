# Sofi Olona — Portfolio Site

Static multi-page site for theatre director Sofi Olona. Vanilla HTML/CSS/JS, hosted on GitHub Pages.

Text content is currently hardcoded directly into each HTML page. The `js/config.js` + `js/sheets-api.js` layer is scaffolded to pull from a public Google Sheet, and one field is wired up already: the footer email, sourced from a "Sofi Olona Site Settings" sheet (see "Google Sheet setup" below). Everything else is still hardcoded HTML.

## Structure

```
index.html            Home
about.html             About
directing.html         Directing
devised.html           Devised
writing.html           Writing
resume.html            Resumé
press.html              Press
shows/
  mutually-assured-self-destruction.html   Show sub-page (black background)
  chicago-pope.html                         Show sub-page (black background)

partials/               Shared header/footer, injected at runtime by js/include.js
css/
  variables.css          Design tokens (color, type, spacing)
  base.css               Reset + base typography
  layout.css              Structural layout
  components.css          Reusable UI pieces (nav, buttons, cards, entries, placeholders)
  show-page.css           Black-background theme for show sub-pages
js/
  config.js               Sheet ID / API key / tab ranges (unused until wired to a page)
  sheets-api.js            fetchSheetRange() — wraps the Sheets API v4 values.get endpoint
  include.js               Fetches and injects partials/header.html and partials/footer.html
  nav.js                   Mobile nav toggle, active-link highlighting
  main.js                  Bootstraps every page (loads partials, inits nav, fires "app:ready")
  pages/                   One file per page; stubs currently call fetchSheetRange() but nothing renders it
assets/
  images/                  shows/mutually-assured-self-destruction, shows/chicago-pope, headshots, press
  fonts/                   (unused — fonts load from Google Fonts CDN)
```

## Known placeholders

- All photos (headshot, personal photo strip, show carousels, press header images) are dashed-border placeholder boxes — swap in `<img>` tags once assets are ready.
- Script/resumé PDF links point to `#` — need real Drive/hosted links.
- Footer email shows a placeholder until the Sheet's `footer_email` row is filled in and an API key is set (see below).

## Wiring a page together

Every page loads `css/variables.css` → `base.css` → `layout.css` → `components.css` (plus `show-page.css` for the two show pages), then `js/main.js` as a module, then its own `js/pages/*.js` module.

`main.js` fetches `partials/header.html` and `partials/footer.html` into the `#site-header` / `#site-footer` divs, replacing the `{{ROOT}}` token with `window.SITE_ROOT` (set inline per page: `'./'` at the top level, `'../'` inside `shows/`). Once partials are in the DOM it fires `app:ready`, which each page script listens for before requesting its sheet data.

## Google Sheet setup

`js/config.js` already points at a spreadsheet called **"Sofi Olona Site Settings"** (in Morgan's Drive — share it with Sofi as an editor so she can update it herself: `key` / `value` / `notes` columns, one row per setting, currently just `footer_email`).

What's still needed before it actually shows up on the site:

1. **Share the sheet** so it's viewable by anyone with the link (File → Share → General access → Anyone with the link — Viewer). It can stay editable only by specific people; it just needs to be publicly *readable* for the client-side fetch to work.
2. **Get a Google API key**: Google Cloud Console → create a project (if needed) → enable the "Google Sheets API" → Credentials → Create API key. Restrict it by HTTP referrer to the site's domain, since the key will be visible in client-side code.
3. Paste that key into `js/config.js` as `apiKey`.

Once that's done, Sofi can edit the `value` column in the sheet and it'll appear on the live site (may take a minute to reflect, no redeploy needed). The same pattern (add a row to Settings, or a new tab + range in `SHEETS_CONFIG.ranges`) can be extended to other fields later.

## Local development

ES modules and `fetch()` of local partials require a real HTTP server (not `file://`). From the repo root:

```
npx serve .
```

## Deploying

GitHub Pages → Settings → Pages → Deploy from branch → `main` / root. `.nojekyll` is included so Pages serves the site as-is.
