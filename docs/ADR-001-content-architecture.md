# ADR-001 — Content architecture: prerendered per-page HTML

- **Status:** Accepted — first slice landed 2026-10-28: `vite-react-ssg` 0.9.2 on Vite 8.3 /
  React 19.3 prerenders 10 routes; per-route `<head>` + JSON-LD are injected through its
  `ssgOptions.onBeforePageRender`, so no hand-rolled prerender was needed.
- **Date:** 2026-10-28
- **Deciders:** ORDENT site maintainers

## Context

The site is a React 19 + Vite SPA built to `app/dist` and deployed to GitHub Pages. A real
domain (`ordent.pl`) connects within ~1 day; `SITE_URL` currently points at the github.io
subpath.

The problem is indexability, not polish. `app/index.html`'s body is an empty
`<div id="root">`. All service copy, price lists and FAQ answers are rendered by client JS
and the per-service detail lives inside native `<dialog>` elements. `seo-plugin.ts` emits
correct JSON-LD, a `noscript` stub, robots.txt and sitemap.xml — but the sitemap contains a
single `<loc>`, and crawlers that do not execute JS see no service text. A single anchored
URL also cannot rank separately for distinct queries such as "protezy elastyczne Brodnica"
vs "naprawa protezy".

Constraints: the owner edits TypeScript data files (`site.ts`, `services.ts`, `faq.ts`,
`gallery.ts`, `reviews.ts`) and rebuilds; hosting is static (GitHub Pages); explicit YAGNI
on CMS, contact form, analytics, blog-first, cookie banner, i18n, dark mode.

## Decision

**Adopt prerendering with `vite-react-ssg` for Weeks 2–5.** Keep React 19, all existing
components, design tokens and data files. Add routes and per-route data so the build emits
real static HTML per URL. Do **not** hand-roll a Vite MPA (multiple `index.html` entries) —
it yields URLs but still ships empty roots, solving half the problem for more config.

Work packages:
- Per-service pages at `/uslugi/<slug>/` (trailing slash, no city segment — the city stays
  in `<title>`/H1 only), plus a `/cennik/` page and a `/poradnik/` index.
- Sitemap grows **1 → ~9+ URLs**.
- Each page gets a unique `<title>`, `<meta description>`, `<h1>` and canonical.
- `Service` + `BreadcrumbList` JSON-LD per service page.

**Retiring anchor navigation for service content.** Homepage service cards stay, but their
`<dialog>` now shows only a one-line `teaser` plus a "Pełny opis i cennik" link; the full copy
moves to its own canonical URL to avoid duplicate-content dilution between the homepage and the
service pages. The teaser is a stored field on each `Service`, not `paragraphs.slice(0, 1)`:
three of the seven opening paragraphs run 87–119 words, so a "first paragraph" rule left the
page and the homepage largely identical. The link sits **above** the price table — the
`naprawy` dialog is 717 px tall in an 844 px viewport, and a link below the prices would never
be seen without scrolling. Measured effect: homepage 1969 → 1491 words; shared prose per
service page fell to the footer NAP, the price tables, and two ~10-word opening sentences.

**Single source of truth.** `SITE_URL` in `src/data/site.ts` stays the only place the public
address is written; canonical, og:url, robots.txt and sitemap all derive from it.

**`asset()` must survive.** `app/src/lib/asset.ts` (`import.meta.env.BASE_URL` join) exists to
support the GitHub Pages base path. Every migrated page must keep routing asset URLs through
it; a hardcoded `/img/...` breaks the Pages subpath.

**Schema policy.** Stay `LocalBusiness`. Do **not** add `AggregateRating` (self-serving
markup risks a Google penalty; reviews are already shown honestly). Do **not** use `Dentist`
or `MedicalClinic` — ORDENT is a prosthetics laboratory, not a patient-facing provider, and
mislabeling is both wrong and risky.

## Consequences

- Crawlers see service copy, prices and FAQ without executing JS; each service is
  independently indexable and internally linked.
- Faster first paint on content pages (no waiting on hydration for text).
- New build step and route layer to maintain; the owner's edit workflow (edit TS, rebuild)
  is unchanged.

Risks to actively re-test after the route split:
- **Anchor-scroll regressions** — deep links and in-page jumps must still resolve.
- **Dialog-focus regressions** — re-verify `focus-visible` and the reduced-motion policy on
  the teaser dialogs and lightbox.
- **Prerender/hydration mismatch** for anything time-dependent (opening-hours "open now"
  logic, dates) — deterministic build output or client-only rendering is required.

## Alternatives considered

- **Hand-rolled Vite MPA** — URLs without HTML; rejected as more work for less gain.
- **Astro** — best long-term answer (zero-JS content pages, Content Collections, ecosystem)
  but rewrites every section to `.astro`. Kept as the documented upgrade path.
- **Status quo SPA** — rejected: cannot rank per service, JS-only content.
- **CMS now** — rejected under YAGNI; git-based editing is already the owner's workflow.

## Revisit trigger

Re-assessed 2026-10-28 against the built output; **not migrating**. The two wins Astro is
normally bought for are already banked or empty: the image pipeline already exists
(`<picture>` + WebP `<source>` + JPEG fallback, 480/960/1440 variants, `srcset`/`sizes`,
explicit dimensions, lazy loading — 81 raster variants, 35 SVGs, mp4/webm sources), and
Content Collections have nothing to collect while `/poradnik/` is empty. The only real
gain is the client JS: a content page ships 6.8 KB of prerendered HTML plus ~109 KB gz of
JS (`app.js` 45 KB gz; a *dynamic* `import("./client-*.js")` adding 64 KB gz of React DOM +
router) to run four interactive things (call bar, open badge, 7 dialogs, lightbox). Because
that import is dynamic it is not render-blocking — the prerendered copy paints first — so it
costs TBT/INP and mobile data, not LCP, and moves none of the tracked metrics (local-pack
impressions, calls, direction requests, `tel:` taps).

Switch to Astro when **any** holds:
1. Poradnik articles are actually being written (Content Collections stop being theoretical), **or**
2. A non-technical editor must publish without git — at which point also adopt Sveltia/Decap
   CMS and move hosting to Cloudflare Pages (free built-in OAuth; GitHub Pages cannot broker
   git-based CMS auth), **or**
3. Field Core Web Vitals (Search Console, not lab) show TBT/INP failing for this site.

Review otherwise at the next quarterly content audit. Do not re-litigate before then.
