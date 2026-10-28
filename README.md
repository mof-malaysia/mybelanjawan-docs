# MyBelanjawan Docs

User guide for MyBelanjawan, built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).
Ported from the Fumadocs/Next.js site in `../mybelanjawan-docs`.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

- Pages live in `src/content/docs/docs/` (served at `/docs/...`), with images in an `images/` folder next to each section.
- The former `/start/*` pages are now under `docs/permulaan/`; old URLs redirect (see `astro.config.mjs`).
- The sidebar is defined by hand in `astro.config.mjs`.
- Starlight has no built-in Malay UI strings; they are in `src/content/i18n/ms.json`.
- Styling follows MYDS (Malaysia Government Design System): `src/styles/myds.css` maps the MYDS colour, type and radius tokens (from `../myds/packages/style` and `../budgetmaster`) onto Starlight's CSS variables. Fonts are self-hosted via Fontsource (Inter for all text; Poppins only for the page title, h1, h2 and the MyBelanjawan wordmark; Roboto Mono for code).
- Header: `src/components/SiteTitle.astro` replaces the default title with a lockup — Jata Negara, a divider, then "MyBelanjawan" over "Panduan Pengguna" — so readers can tell the docs from the app.
- Light theme only: `src/components/ThemeProvider.astro` always sets `data-theme="light"` and `ThemeSelect.astro` instead renders a "Buka MyBelanjawan" link to https://app.mybelanjawan.gov.my (both registered under `components` in `astro.config.mjs`).
- Callouts: `note` = info (blue), `tip` = success (green), `caution` = warning (yellow), `danger` = danger (red).
- "Outcome" callouts use `<Outcome>` (`src/components/Outcome.astro`): the green success callout, with its title kept out of search.
- Search (Pagefind):
  - `src/components/Head.astro` tags each page with its sidebar section, shown on results as "Bahagian: …" so pages with the same title (e.g. OE vs DE "Semakan BRO") can be told apart.
  - Malay search strings are the `pagefind.*` keys in `src/content/i18n/ms.json`.
  - `src/plugins/search-ignore-headings.mjs` (a Sätteri hast plugin registered in `astro.config.mjs`) keeps the generic "Panduan Bertulis" / "Panduan Video" headings out of results.
  - The `redirect/` hub pages set `pagefind: false`.
  - Styles are in the Search section of `src/styles/myds.css`.
