# Sofi Olona — Portfolio Site

Static multi-page site for theatre director Sofi Olona. Vanilla HTML/CSS/JS, hosted on GitHub Pages, content sourced client-side from a public Google Sheet via the Sheets API.

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
  show-one.html         Show sub-page (black background)
  show-two.html         Show sub-page (black background)

partials/               Shared header/footer, injected at runtime by js/include.js
css/
  variables.css          Design tokens (color, type, spacing)
  base.css               Reset + base typography
  layout.css              Structural layout
  components.css          Reusable UI pieces (nav, buttons, cards)
  show-page.css           Black-background theme for show sub-pages
js/
  config.js               Sheet ID / API key / tab ranges
  sheets-api.js            fetchSheetRange() — wraps the Sheets API v4 values.get endpoint
  include.js               Fetches and injects partials/header.html and partials/footer.html
  nav.js                   Mobile nav toggle, active-link highlighting
  main.js                  Bootstraps every page (loads partials, inits nav, fires "app:ready")
  pages/                   One file per page; each fetches its own sheet range on "app:ready"
assets/
  images/                  shows/show-one, shows/show-two, headshots, press
  fonts/                   (unused — fonts load from Google Fonts CDN)
```

## Wiring a page together

Every page loads `css/variables.css` → `base.css` → `layout.css` → `components.css` (plus `show-page.css` for the two show pages), then `js/main.js` as a module, then its own `js/pages/*.js` module.

`main.js` fetches `partials/header.html` and `partials/footer.html` into the `#site-header` / `#site-footer` divs, replacing the `{{ROOT}}` token with `window.SITE_ROOT` (set inline per page: `'./'` at the top level, `'../'` inside `shows/`). Once partials are in the DOM it fires `app:ready`, which each page script listens for before requesting its sheet data.

## Google Sheet setup

Fill in `js/config.js`:

```js
export const SHEETS_CONFIG = {
  spreadsheetId: 'YOUR_SPREADSHEET_ID',
  apiKey: 'YOUR_API_KEY',
  ranges: { ... }
};
```

The sheet must be shared as "Anyone with the link — Viewer". The API key should be restricted (HTTP referrers) to this site's GitHub Pages domain in the Google Cloud Console, since it will be visible in client-side code.

## Local development

ES modules and `fetch()` of local partials require a real HTTP server (not `file://`). From the repo root:

```
npx serve .
```

## Deploying

GitHub Pages → Settings → Pages → Deploy from branch → `main` / root. `.nojekyll` is included so Pages serves the site as-is.
