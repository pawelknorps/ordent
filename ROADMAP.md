# ROADMAP — ORDENT (ordent.pl)

A small-town dental-prosthetics laboratory in Brodnica selling **directly to patients**
(consumer prices, "pogotowie protetyczne", patient FAQ). Dentist referrals are real but
secondary. The site must therefore behave like a **local consumer services site**, not like
the big-city B2B remote labs it was modelled on (dentalscan.pl, hexdentlab.pl, yourlab.pl —
all pure B2B, no prices, no local pack).

**North-star metric:** qualified phone calls from the Brodnica area (`tel:` taps).
Supporting metrics: local-pack impressions, Google Business Profile actions (calls,
direction requests, website clicks), rank for "protezy elastyczne Brodnica".

Two lanes run in parallel and both are required:

- **Code lane** — this repository. Crawlability, per-service URLs, conversion UI.
- **Off-code lane** — Google Business Profile, citations, reviews, photos. The larger half of
  local-pack performance and **not doable from the repo**. Owner actions, listed per phase.

---

## Where we started (baseline, 2026-10-28)

| Fact | Consequence |
|---|---|
| `app/index.html` body is an empty `<div id="root">` | Crawlers that don't run JS see **no** service copy, prices or FAQ. |
| All content behind client JS; service detail inside `<dialog>` | Not indexable; single-URL site. |
| `sitemap.xml` has **one** `<loc>` | No per-service ranking surface. |
| Phone number reachable only via the hamburger menu | Highest-intent mobile action is buried. |
| Emergency callout is not a `tel:` link | POGOTOWIE PROTETYCZNE — the one differentiator — is not clickable. |
| Only 3 of 7 services priced | Price-shopping patients bounce. |
| Labs I compared against are B2B-only | Their information architecture is the wrong template; theirs is not the gap. |

Diagnosis: **the gap is not polish, it is the absence of crawlable content and of a phone
action on the first screen.** Everything in Weeks 1–5 follows from that.

---

## Week 1 — Conversion + local fundamentals

Highest ROI, smallest diff. Nothing here depends on the domain cutover.

**Code lane (this repo) — done**
- [x] Cookieless analytics plumbing (`app/src/lib/analytics.ts`, wired in `main.tsx`) —
      Plausible-shaped, inert with no env set, auto-fires `Call` / `Directions` from `href`.
      No cookie banner needed and none will be added.
- [x] Mobile **sticky call bar** (`app/src/components/CallBar.tsx`) — call + directions always
      one tap away; the number stops being behind the hamburger. Appears after the hero.
- [x] **Open-now / closed badge** (`app/src/components/OpenBadge.tsx`) computed from the
      existing `openingHours` data via `app/src/lib/openingHours.ts` (Europe/Warsaw,
      unit-tested), on the About and Contact hours lines.
- [x] **Emergency callout → real `tel:` link** in About and Contact; directions CTA in Contact.
- [x] **Complete the price list** — all 7 services on `/cennik/`. Three carry a price; three
      unpriced services (`korony-i-mosty`, `szyny`, `ortodoncja`) state **„Cena do ustalenia"**
      by the owner's decision. **No price was invented.** The owner still has to supply them.
- [x] Homepage `<h1>` now carries the city and the brand — `Pracownia protetyczna ORDENT w
      Brodnicy` instead of a bare `Pracownia protetyczna`. The intended string already sat
      unused in `data/pages.ts`; the strongest on-page element on the strongest page was
      missing the local keyword.

**Off-code lane (owner, not in the repo)**
- [ ] Google Business Profile: primary category **Protezy**, secondary **Laboratorium
      protetyczne**; every service listed **with prices**; hours exactly matching the site;
      attach the website (currently empty).
- [ ] **40+ photos** on the GBP — the strongest correlated local-pack factor and it has no
      ceiling. Post weekly.
- [ ] Review-request link used on every patient; reply to **all** reviews.
- [ ] Citations with identical NAP: Panorama Firm, PKT.pl, Aleo, Bing Places, Apple Business
      Connect.

**Exit criteria:** `tel:` taps and GBP actions are measurable (see `docs/MEASUREMENT.md`);
local pack shows for "protezy Brodnica"; every service is priced on the site and on the GBP.

---

## Weeks 2–3 — Content architecture

Governed by **ADR-001** (`docs/ADR-001-content-architecture.md`, Accepted).

- [x] Adopt **`vite-react-ssg`** prerendering. Keep React 19, every component, all design tokens
  and all data files. Reject the hand-rolled Vite MPA; keep Astro as the documented upgrade
  path with its revisit trigger. *(Landed on `vite-react-ssg@0.9.2`; no fallback needed.)*
- [x] Per-service pages at `/uslugi/<slug>/` (trailing slash, **no city in the path** — the city
  lives in `<title>`/H1 only), plus `/cennik/` and a `/poradnik/` index.
- [x] Sitemap grows **1 → 10 URLs**. Unique `<title>`, `<meta description>`, `<h1>`, canonical
  per page. `Service` + `BreadcrumbList` JSON-LD per service page; `BreadcrumbList` on
  `/cennik/` and `/poradnik/` too.
- [x] Homepage service cards become **teasers** to their pages; the full copy moves to its own
  canonical URL to prevent the homepage and the service pages diluting each other.
  **Shipped as a stored `teaser` field on each `Service`** (not `paragraphs.slice(0, 1)` —
  three opening paragraphs are 87–119 words, so a first-paragraph rule left the page and the
  homepage largely identical). The `<dialog>` shows the teaser plus a "Pełny opis i cennik"
  link to `/uslugi/<slug>/`, placed **above** the price table so it is reachable without
  scrolling even in the 717 px `naprawy` dialog. Homepage **1969 → 1491 words**; the residual
  overlap per service page is the footer NAP (must match), the price tables, and two ~10-word
  opening sentences. All 7 dialogs re-verified in Arc at 390×844: one link each, visible with
  no scroll, correct hrefs, no console errors.
- [x] `asset()` (`app/src/lib/asset.ts`) must survive the migration — a hardcoded `/img/...`
  breaks the GitHub Pages subpath.

**Exit criteria met**, verified from the built files with JS uninvolved: 10 `index.html`
prerendered, each with the real copy, exactly one `<title>`/`<h1>`/canonical, 10 distinct
titles, sitemap listing all 10 URLs, no `AggregateRating`/`Dentist`/`MedicalClinic` markup.

---

## Weeks 4–5 — Authority and internal linking

- [ ] Turn FAQ entries into **poradnik** articles (they already answer real patient questions).
  **(OPEN — no article data yet; `/poradnik/` ships an honest empty state** that links to the
  cennik and the homepage FAQ rather than duplicating them.)
- [x] Internal linking between service pages, cennik and poradnik; breadcrumbs on every page
  (every service page and both index pages carry `BreadcrumbList`; no orphan pages).
- [ ] Per-page schema and unique metadata for the new articles. **(Blocked on the articles.)**

**Exit criteria:** poradnik index live and orphan pages = 0 — met. First articles not yet
written; that is the remaining item in this phase.

---

## Ongoing (never finishes)

Reviews requested from every patient and every review replied to; weekly GBP posts; photos
added monthly; prices, hours and NAP kept identical across site, GBP and all citations.

---

## Decisions on record

| Decision | Where | Rationale |
|---|---|---|
| Prerender with `vite-react-ssg`; Astro deferred | `docs/ADR-001-...` | Indexability first; Astro rewrites every section. **Re-assessed 2026-10-28 and confirmed — image pipeline already exists, Content Collections empty, JS gain is a non-blocking dynamic import.** |
| `/uslugi/<slug>/`, trailing slash, no city segment | `docs/ADR-001-...` | One URL per query; city stays in metadata. |
| Cookieless analytics, no consent banner | `docs/MEASUREMENT.md` | No cookies ⇒ no personal data ⇒ no banner. |
| Stay `LocalBusiness`; no `AggregateRating`; no `Dentist`/`MedicalClinic` | `docs/ADR-001-...` | We are a lab, not a provider; self-serving rating markup risks a penalty. |
| No contact form | this file | Phone-first business; a form adds a lead drop-off, not a lead. |
| `SITE_URL` is the single source of the public address | `docs/DOMAIN-CUTOVER.md` | Canonical/og/robots/sitemap/JSON-LD/base all derive from it. |

---

## Necessary vs refused

**Necessary** (and must not be cut for convenience): crawlable HTML for service content;
`tel:` links everywhere the phone number appears; identical NAP across site, GBP and
citations; accurate opening hours; unique metadata per URL; the price list complete.

**Refused (YAGNI for now, stated so it is not re-litigated):** CMS, blog-first strategy,
cookie banner, i18n, dark mode, contact form, `AggregateRating` markup, `Dentist` schema, a
visual redesign, a booking system. Each is either wrong for a phone-first local lab or
premature; ADR-001 records the triggers that would reopen the first two.

---

## Risks

| Risk | Mitigation |
|---|---|
| `SITE_URL` flipped before DNS resolves → live github.io site serves wrong canonicals | Change it in the same commit as the cutover, after `ordent.pl` resolves. See `docs/DOMAIN-CUTOVER.md`. |
| Base-path breakage after routing | Every asset URL keeps going through `asset()`. |
| Prerender/hydration mismatch on time-dependent UI | Open-now badge renders neutral first and computes in `useEffect` — never during render. |
| Anchor deep links break when service content moves to its own URL | Re-tested after the route split: all 7 dialogs open cleanly at 390×844, one teaser each, link to `/uslugi/<slug>/` visible without scrolling. Re-check if the price tables or teaser copy grow. |
| GBP hours/NAP drift from the site | One source (`site.ts`); GBP updated by hand in the same week. |
| `geo` coordinates in `site.ts` are the map-view centre, never verified against the pin | Verify against the GBP pin at cutover before trusting them in JSON-LD. |
| Two CSS-background stills ship un-resized: `hero.jpg` 67 KB / 1900×750 (`<link rel="preload">`ed, likely the mobile LCP element at ~5× oversize) and `map.jpg` 74 KB / 1024×512 | `about.jpg` was fixed 2026-10-28. `hero.jpg` is the one that matters; fixing it means moving the hero background to a responsive `<picture>`/`image-set`, not just re-encoding. `og.jpg` (1200×630) is correctly sized — leave it. |

---

## Lessons recorded

- **JS-only content is invisible content.** The site looked complete in a browser and was
  empty to a crawler. Verify indexability with JS disabled, not by looking at the page.
- **The comparables were the wrong comparables.** Big-city labs are B2B with no prices and no
  local pack; copying their structure would have optimised the wrong thing. Check the business
  model, not the vertical.
- **Trust artifacts, not summaries.** A research pass misread the repository as a legacy
  Bootstrap page (it read the repo-root `index.html`, not `app/`); its repo claims were
  discarded and only its external findings kept, spot-verified by hand.
- **Prefer the smallest complete change.** The Week 1 conversion wins are three small edits
  against data that already exists (`openingHours`, `phones`, `mapsLink`) — not new systems.
- **Measure duplication before deciding how to fix it.** The obvious "keep the first paragraph
  in the dialog" rule was wrong: three of the seven opening paragraphs are 87–119 words. Only
  counting the shared words showed that the rule left the homepage and the page identical, and
  that an explicit one-line teaser per service was the change that actually worked.
- **Price the rewrite against what it actually buys.** "Is this state of the art?" invites a
  rewrite; the built output answered it instead. Astro (re-assessed 2026-10-28, ADR-001): the
  image pipeline it is usually bought for already exists, Content Collections have no content
  while `/poradnik/` is empty, and the only real gain — ~109 KB gz of JS on a 6.8 KB page — is
  a *dynamic* import, so it is not render-blocking and moves none of the tracked metrics.
  Cheap to measure, expensive to assume.
- **A variant-choice alarm is usually just DPR.** The About photo serves `about-1200` at a
  390 px viewport — correct, not a bug: `sizes` is 100vw, the emulated device is 3×, so the
  browser needs 1170 px. Check `devicePixelRatio` before "fixing" a `srcset` selection, and
  note Chrome reports `naturalWidth` density-corrected, not intrinsic.
- **A non-matching zsh glob aborts the whole command.** `grep -rn … app/.env* 2>/dev/null`
  never ran: zsh expands the glob *before* the command starts, and with no match it exits
  `no matches found` — the `2>/dev/null` never gets a chance. The empty output read as
  "analytics is unimplemented" when it was already built. Guard the glob (`(N)` in zsh,
  `shopt -s nullglob` in bash) or test the file exists first; never read an empty result as
  evidence when a glob was in the command.
