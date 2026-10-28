# DESIGN SPEC — ORDENT (pracownia protetyczna, Brodnica)

Rebuild of the one-page site as **React + Vite + TypeScript**, **plain CSS** (one `styles/tokens.css` + one `styles/app.css`, or CSS Modules per component — either is fine, tokens are shared), **no UI library, no Tailwind, no CDN, self-hosted fonts, no icon fonts**.

Fixed by the user: **gallery = grid (no carousel)**, **FAQ = native `<details>`**.
Two more mechanisms locked by this spec: **service detail = native `<dialog>`**, **gallery zoom = the same `<dialog>` component**. One modal primitive for the whole site, zero libraries.

Source of truth for copy: `index.html`. Nothing is rewritten unless listed in §8 (Invented strings).

---

## 0. Content inventory (verified against source)

| Item | Reality in `index.html` |
|---|---|
| Services | **8** cards (`#services`) — *built site renders **7** (Szynoprotezy dropped), §11* |
| Prices on card | 3 of 8: akrylowe 200–600 zł, szkieletowe 700–1400 zł, elastyczne 600–1200 zł. Naprawy carries a full price list inside its detail. — *built cards: 800–1500 / 1500–2500 / 2200–3400 zł, §11* |
| FAQ | **8** items (`#collapse0` … `#collapse7`), not 7 — see §8 note |
| NAP | ORDENT; ul. Karola Szymanowskiego 33, 87-300 Brodnica; 601 594 229 / 603 053 437 |
| Hours | Pon–pt 10–17; sobota usunięta na życzenie klienta (patrz §11); „POGOTOWIE PROTETYCZNE” poza godzinami |
| People | Dariusz i Marek Orłowscy |
| USP | „Jako jedyni w mieście robimy protezy elastyczne” |
| Lorem ipsum | 2 places: gallery intro, contact intro — must be replaced (§8) |
| Existing ids | `banner`, `services`, `content-3-10`, `gallery`, `FAQ`, `contact` — **reuse verbatim** so old inbound links keep working |

---

## 1. Design tokens

### 1.1 Palette (roles, AA verified)

| Token | Hex | Role |
|---|---|---|
| `--c-ink` | `#10201F` | Headings, body text |
| `--c-ink-muted` | `#55666A` | Secondary text, captions, meta |
| `--c-paper` | `#FBFAF7` | Page background (warm white, not blue-white) |
| `--c-surface` | `#FFFFFF` | Cards, dialog, header sheet |
| `--c-line` | `#E3E1DA` | Hairline borders, dividers |
| `--c-teal-700` | `#0B4F4A` | Primary dark: header CTA bg, footer, dialog titles |
| `--c-teal-600` | `#0E6A62` | Primary: links, buttons, icons, focus ring |
| `--c-teal-100` | `#E6F0EE` | Tint background: open FAQ row, callout, active nav pill |
| `--c-gold-700` | `#7A5B22` | Accent **text** only (eyebrows, „POGOTOWIE”) |
| `--c-gold-500` | `#A8834A` | Accent **rules/borders/icons only** (3:1 non-text), never text |
| `--c-scrim` | `rgba(6,20,20,.82)` | Hero/image gradient scrim |

Verified contrast ratios (WCAG 2.2):

| Pair | Ratio | Use |
|---|---|---|
| `#10201F` on `#FBFAF7` | 16.1:1 | body — AAA |
| `#55666A` on `#FBFAF7` | 5.8:1 | secondary text — AA |
| `#FFFFFF` on `#0B4F4A` | 9.4:1 | CTA labels — AAA |
| `#FFFFFF` on `#0E6A62` | 6.5:1 | button labels — AA |
| `#0E6A62` on `#FBFAF7` | 6.2:1 | links, icons — AA |
| `#0B4F4A` on `#E6F0EE` | 8.1:1 | tint surfaces — AAA |
| `#7A5B22` on `#FBFAF7` | 6.0:1 | accent eyebrow — AA |
| `#A8834A` on `#FBFAF7` | 3.4:1 | rules/icons only (needs ≥3:1) |

Rule: never place `--c-ink-muted` on `--c-teal-100` (≈4.2:1 over a tinted card) — use `--c-ink` there.

### 1.2 Typography

- **Body/UI: Inter** (self-hosted, variable woff2, `latin-ext` subset — required for ą ć ę ł ń ó ś ź ż, `font-display: swap`).
- **Wordmark only: BebasNeue** — already in `fonts/` (`.woff`). Brand continuity, one weight, uppercased, `letter-spacing: .12em`. Do not use it for anything else.

| Token | Value |
|---|---|
| `--fs-xs` | `0.8125rem` / 1.5 |
| `--fs-sm` | `0.9375rem` / 1.55 |
| `--fs-base` | `1.0625rem` / 1.65 |
| `--fs-lg` | `1.25rem` / 1.5 |
| `--fs-h3` | `clamp(1.25rem, 1rem + 1vw, 1.5rem)` / 1.3 |
| `--fs-h2` | `clamp(1.75rem, 1.2rem + 2.2vw, 2.5rem)` / 1.15 |
| `--fs-h1` | `clamp(2.25rem, 1.2rem + 5vw, 3.75rem)` / 1.05 |
| `--fs-eyebrow` | `0.8125rem` uppercase, `letter-spacing: .08em`, weight 600 |

Weights: **400 / 500 / 600** only. Tracking: h1 `-.02em`, h2 `-.015em`, body `0`, eyebrow `+.08em`. Body measure capped at `--w-prose: 68ch`.

### 1.3 Spacing / geometry

```
--space-1..10 = 4 8 12 16 24 32 48 64 96 128 px
--r-sm 6px   --r-md 12px   --r-lg 18px   --r-pill 999px
--sh-1 0 1px 2px rgba(16,32,31,.05)
--sh-2 0 2px 4px rgba(16,32,31,.04), 0 10px 24px -12px rgba(16,32,31,.18)
--sh-3 0 24px 60px -20px rgba(16,32,31,.35)      /* dialog only */
--w-content 1120px   --w-wide 1280px   --w-prose 68ch
--header-h 60px  (>=900px: 72px)
```

Breakpoints (min-width, mobile-first): **640 / 900 / 1120**.
Section rhythm: `padding-block: clamp(56px, 9vw, 112px)`. Content columns `padding-inline: 20px` (mobile) / `24px`.

---

## 2. Section order, `<h1>`, heading hierarchy

Order = source order (old anchors preserved).

| # | Section | id | `<h2>` (exact copy) |
|---|---|---|---|
| — | Sticky header | — | none (wordmark is a link, not a heading) |
| 1 | Hero | `#banner` | **`<h1>`: „Pracownia protetyczna”** |
| 2 | O pracowni | `#content-3-10`… (use `#o-nas`? **no** — keep `content-3-10`) | „Laboratorium protetyczne z wieloletnim doświadczeniem” |
| 3 | Usługi | `#services` | „Co robimy” |
| 4 | Dlaczego my | `#dlaczego-my` | „Dlaczego my?” |
| 5 | Galeria | `#gallery` | „Galeria” |
| 6 | FAQ | `#FAQ` | „Pytania i odpowiedzi” |
| 7 | Opinie | `#opinie` | „Opinie” |
| 8 | Kontakt | `#contact` | „Skontaktuj się” |
| 9 | Footer | — | none |

- **Exactly one `<h1>`** — the hero.
- `<h3>` used for: 8 service card titles, 8 FAQ questions (inside `<summary>`), the two bio names in „Dlaczego my?”.
- Service **dialog title is `<h3>`** (continuation of the card), wired via `aria-labelledby`.
- „Zadzwoń:”, „Godziny otwarcia:” in the original were `<h6>` — **demote to `<dt>`/label text**, they are not headings.
- Every `<section>` gets `aria-labelledby` pointing at its `<h2 id>`. Add `scroll-margin-top: calc(var(--header-h) + 16px)` to all section ids (WCAG 2.4.11).
- Nav labels: reuse the original six — Start, Co robimy, O nas, Galeria, FAQ, Kontakt („O nas” → `#content-3-10`).

---

## 3. Per-section layout

Legend: M = ≤639, T = 640–899, D = ≥900.

| Section | Mobile | Tablet | Desktop |
|---|---|---|---|
| **Header** | 60px bar: wordmark left, 44×44 menu button right. Menu opens a full-viewport sheet (`--c-surface`) with 6 links at `--fs-lg` + phone CTA pinned bottom. | same as M | 72px bar: wordmark, inline nav (gap 28), CTA „Zadzwoń” right. Sheet never renders. |
| **Hero** | `min-height: 72vh`, `1.jpg` `object-fit: cover; object-position: 50% 40%`, scrim `linear-gradient(to top, var(--c-scrim) 0%, rgba(6,20,20,.35) 55%, rgba(6,20,20,.10))`. Content bottom-stacked: h1 → lede → CTA „Skontaktuj się” (full width) → CTA „Zobacz, co robimy” (ghost). | same, `min-height: 66vh` | `min-height: 78vh; max-height: 720px`, content left, `max-width: 640px`, lede `--fs-lg`, CTAs inline. |
| **O pracowni** (`content-3-10`) | 1 col: `3.jpg` 4:3 cover → h2 → paragraph → **NAP card** (phone `tel:` buttons full-width, hours, pogotowie callout). | 1 col, image 16:9, paragraph capped `--w-prose` | 2 cols `1fr / 1.05fr` gap 64: text left, image right `aspect-ratio: 4/3; --r-lg`; NAP card sits under the paragraph, max-width 420px. |
| **Usługi** | 1 col, gap 16 | 2 cols, gap 20 | 3 cols, gap 24 (8 items → last row 2, left-aligned) |
| **Dlaczego my** | video 16:9 (`--r-md`) → USP strong → bio paragraphs | same | 2 cols `1.1fr / 1fr` gap 64, video left, text right |
| **Galeria** | 2 cols, gap 8, 3:2 tiles | 3 cols, gap 10 | 4 cols, gap 12 |
| **FAQ** | 1 col, centered `max-width: 800px` | same | same |
| **Opinie** | 1 col: lede → lista kart opartych na `data/reviews.ts` (2 kol. od 640 px) → link do wizytówki Google. Tylko prawdziwe opinie — 5 z 13, reszta za logowaniem. | same | same, `max-width: 800px` |
| **Kontakt** | stacked: `<address>` → 2 full-width `tel:` buttons → hours → map facade 360px | 2 cols `1fr / 1.2fr`, gap 40, map 360px | same, map 420px |
| **Footer** | 1 col, centered, `--c-teal-700` bg, `--c-paper` text | same | 3 cols: wordmark / NAP / hours + credit |

---

## 4. Component specs

### 4.1 Sticky header + mobile menu
- `position: sticky; top: 0; z-index: 50`. Transparent over the hero, swaps to `background: rgba(251,250,247,.86); backdrop-filter: blur(10px); border-bottom: 1px solid var(--c-line)` once scrolled past `--header-h` (one `IntersectionObserver` on a 1px sentinel above the header — no scroll listener).
- Mobile trigger: `<button aria-expanded aria-controls="nav-panel" aria-label="Menu">` with a 2-bar CSS icon (no icon font, no SVG sprite). Panel is a sibling `<nav id="nav-panel" hidden>`.
- Open: remove `hidden`, lock `document.documentElement.style.overflow = 'hidden'`, move focus to the first link, `Escape` closes, focus returns to the trigger, every anchor click closes. Do **not** hand-roll a focus trap — the panel is the only content while open.
- Desktop: panel is always visible via media query (the `hidden` attribute is overridden by `display: flex` at ≥900px), trigger hidden.

### 4.2 Service card
```
white surface · 1px var(--c-line) · radius var(--r-lg) · padding clamp(20px, 4vw, 28px) · flex column, gap 12
  chip 48×48 (radius --r-md, --c-teal-100 bg, --c-teal-700 icon at 26×26, see §7.2)
  <h3>
  tagline (existing copy, --fs-sm, --c-ink-muted, max-width 36ch)
  footer hairline (1px --c-line, margin-top: auto), flex space-between:
    price line (only when the source has one): "Cena: 200 – 600 zł", --c-teal-700, tabular-nums
    link-style <button aria-haspopup="dialog" aria-controls="d-…">Szczegóły →</button>
```
Every card gets the footer hairline, so the 3-of-8 price presence reads as deliberate. Hover/focus-within: `border-color: color-mix(in srgb, var(--c-teal-600) 35%, transparent)`, shadow `--sh-2`, `translateY(-3px)`, and the chip inverts to `--c-teal-700` bg + white icon. The trigger is a real `<button>`, restyled as a teal link (no `btn` classes) with a `→` that slides 4px on hover/focus; global 2px `:focus-visible` ring. Cards stay equal height via `margin-top: auto` on the footer. The delegated `[aria-haspopup="dialog"]` listener on `#services` is unchanged.

### 4.3 Service detail — **native `<dialog>`** (the one mechanism)
Chosen over inline `<details>` because the detail copy is long-form (up to ~1 400 characters) and must be readable at `--w-prose`; `<dialog>.showModal()` gives ESC, focus trap, inert background and `::backdrop` **for free** with ~15 lines of JS, while an inline expander would reflow the whole 3-column row on every open. FAQ keeps `<details>` because its answers are short and meant to be scanned in place.

```
<dialog class="sheet sheet--svc" id="d-akrylowe" aria-labelledby="d-akrylowe-t">
  <div class="sheet__head">
    <span class="sheet__chip">…26px mask icon, teal on --c-teal-100…</span>
    <h3 id="d-akrylowe-t">Protezy Akrylowe</h3>
    <button class="sheet__close" aria-label="Zamknij">×</button>
  </div>
  <div class="sheet__body">…verbatim modal copy…</div>
</dialog>
```
- The `sheet--svc` modifier scopes all new detail-dialog rules, so the gallery Lightbox (`sheet sheet--lightbox`) is untouched.
- Head: chip + `flex: 1` h3 + close button, vertically centred. Body padding `--space-5`, widening to `24/32/32` at ≥640px. Below 480px the head stacks (chip + close on one row, full-width h3 under it) — at 320px the 3-up row starves the long „Naprawy…” title to ~160px and 5 sticky lines.
- One delegated listener on `#services`: `[aria-haspopup="dialog"]` → `document.getElementById(id).showModal()`.
- `::backdrop { background: rgba(16,32,31,.55) }`. Panel `max-width: 640px; max-height: 85dvh; overflow: auto; --r-lg; --sh-3`.
- Close on ESC (native), on backdrop click (`e.target === dialog`), on the × button.
- The price list inside „Naprawy” becomes a real `<dl>` (6 rows) with top+bottom hairlines and `--space-5` vertical margins; `dt` at weight 500, `dd` teal + tabular-nums.
- The two timing lines become a `.sheet__notes` block: dashed top hairline, `--fs-sm`, `--c-ink-muted`.

### 4.4 FAQ — native `<details>`
```
<details name="faq">                          ← exclusive accordion, no JS (2024 baseline)
  <summary><h3>Jak długo trzeba czekać na protezę?</h3></summary>
  <p>…verbatim…</p>
</details>
```
- `summary` styled with `list-style: none`, a 20×20 +/− chevron drawn as a CSS-rotated `<span aria-hidden>`.
- Open state: `--c-teal-100` background, hairline top/bottom, `--r-md`.
- If `name` is unsupported the accordion simply allows several open at once — acceptable degradation, no JS.
- All 8 questions kept verbatim.

### 4.5 Gallery grid + lightbox
- 12 tiles, square (`aspect-ratio: 1/1`), `object-fit: cover`, `<picture>` AVIF → WebP → JPEG at 480/960 w, `loading="lazy"` except the first 4, explicit `width`/`height` (kills CLS).
- Tile = `<button class="tile">`, `aria-label` = the caption. Hover: image `scale(1.03)` inside `overflow: hidden`, 180 ms.
- Click opens **the same `<dialog>`** with `prev` / `next` / close buttons and the caption. Arrow-key handlers on the dialog (`ArrowLeft`, `ArrowRight`), ESC native, focus restored by the browser.
- No infinite scroll, no pagination, no filtering.

### 4.6 Contact block
- `<address>` with the NAP verbatim, `<strong>ORDENT</strong>`.
- Two real links, never `href="#"`:
  - `<a href="tel:+48601594229">601 594 229</a>`
  - `<a href="tel:+48603053437">603 053 437</a>`
- Hours: `Pon–pt 10–17` next to a `<time>`-free label; the „POGOTOWIE PROTETYCZNE” sentence in a `--c-teal-100` callout with a `--c-gold-500` left rule and `--c-gold-700` label.
- Uses en dashes, not the source's mixed `-`/`–`.

### 4.7 Video
- Re-encode `images/elastyczna2.mp4` (17 MB) to `elastyczna2-720.mp4` (~1.5 MB) + `elastyczna2.webm`; extract a poster frame to `elastyczna2-poster.webp` (mandatory — the source has no poster).
- `<video muted loop playsinline preload="none" poster="…" aria-label="Film: proteza elastyczna wykonana w pracowni ORDENT">` with `<source>` order webm → mp4.
- **Autoplay only if motion and data allow**: an `IntersectionObserver` at `threshold: 0.5` calls `play()` once the clip is half in view, but only when `prefers-reduced-motion: reduce` is absent **and** `navigator.connection` reports neither `saveData` nor 2g; a manual pause sets a `userPaused` ref the observer cannot override. Visible `Pauza` / `Odtwórz` labels (WCAG 2.2.2).
- A 44×44 overlay button toggles play/pause with visible `Pauza` / `Odtwórz` labels — required, because the loop runs > 5 s.
- No audio track → no captions required (WCAG 1.2.2 covers audio only).

### 4.8 Map embed (click-to-load facade)
Third-party iframe = the page's only non-self-hosted request, and it sets Google cookies. Load it on demand:
```
<button class="btn btn--primary">Pokaż mapę</button>  → mounts the <iframe> once
<iframe class="map__frame" title="Mapa — ORDENT, ul. Karola Szymanowskiego 33, Brodnica"
        loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen>
```
Static facade = `.map__facade`, a locally hosted OpenStreetMap raster
(`app/public/img/map.jpg` — 15 tiles at z=16 → 1024×512; the only `public/` file the
generator does not produce) painted `center / cover` over `--c-teal-100`. On it sit
`.map__panel` (pin glyph, the address, plus a plain
`<a href="{mapsLink}">Otwórz w Google Maps</a>` that works without JS), the
„Pokaż mapę" button and a „© OpenStreetMap contributors" credit. Keeps the original
embed URL. → no third-party request at rest, so no cookie banner needed.

---

## 5. Motion policy

```
--dur-1 120ms   /* hover, colour, icon */
--dur-2 180ms   /* card lift, details marker, focus */
--dur-3 260ms   /* dialog + backdrop */
--dur-4 500ms   /* hero / section reveal, max */
--ease-out    cubic-bezier(.16,1,.3,1)
--ease-inout  cubic-bezier(.4,0,.2,1)
```

- Allowed: colour/border transitions, ≤2px lifts, image scale ≤1.03, opacity+`translateY(12px)` reveals, dialog/backdrop fade.
- Banned: parallax, autoscrolling, looping decorative animation, animated numbers, hero image zoom on load.
- Reveals: **one** shared `IntersectionObserver`, class `.reveal` → `.is-in`, stagger 60 ms within a section, `rootMargin: 0px 0px -10% 0px`, unobserve after firing. No `animate.css`, no `WOW.js`.
- `@media (prefers-reduced-motion: reduce)`: `* { transition-duration: .01ms !important; animation-duration: .01ms !important; scroll-behavior: auto !important }`, `.reveal { opacity:1; transform:none }`, video does not autoplay, smooth-scroll for anchor links disabled.

---

## 6. SEO / a11y checklist

**`<head>`**
```html
<html lang="pl">
<title>ORDENT – pracownia protetyczna w Brodnicy | protezy elastyczne, akrylowe i szkieletowe</title>
<meta name="description" content="ORDENT – pracownia protetyczna w Brodnicy. Protezy elastyczne, akrylowe i szkieletowe, korony, szyny i naprawy. Jako jedyni w mieście robimy protezy elastyczne.">
<link rel="canonical" href="https://DOMAIN/">
<meta name="theme-color" content="#0B4F4A">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:locale" content="pl_PL">
<meta property="og:site_name" content="ORDENT">
<meta property="og:title" content="ORDENT – pracownia protetyczna w Brodnicy">
<meta property="og:description" content="Protezy elastyczne, akrylowe i szkieletowe. Jako jedyni w mieście robimy protezy elastyczne.">
<meta property="og:url" content="https://DOMAIN/">
<meta property="og:image" content="https://DOMAIN/og.jpg">          <!-- 1200×630, crop of slides/1.jpg -->
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
```
`DOMAIN` jest już ustalona: `https://pawelknorps.github.io/ordent/` — domena `ordent.pl` **nie jest podłączona**. Ten sam adres trafia do `canonical`, `og:url`, `og:image`, JSON-LD (`@id`, `url`, `image`), `Sitemap:` w `robots.txt` i `<loc>` w `sitemap.xml`. W `app/index.html` nad `<link rel="canonical">` stoi `<!-- TODO -->` przypominający o podmianie na `ordent.pl` po podłączeniu domeny.

**JSON-LD — dwa skrypty**, oba w `<head>`: `LocalBusiness` (poniżej) oraz `FAQPage`, którego `mainEntity` odwzorowuje 8 wpisów z `app/src/data/faq.ts`:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "<q>", "acceptedAnswer": { "@type": "Answer", "text": "<a, czysty tekst>" } }
  ]
}
```
Treść FAQ istnieje więc **w dwóch kopiach** — `faq.ts` i `index.html`. `index.html` jest statyczny i nie może zaimportować `.ts`, więc po każdej edycji `faq.ts` trzeba ręcznie poprawić `FAQPage`. Nic w repo tego nie pilnuje.
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://DOMAIN/#ordent",
  "name": "ORDENT – Pracownia protetyczna",
  "description": "Pracownia protetyczna w Brodnicy. Protezy elastyczne, akrylowe i szkieletowe, korony i mosty, szyny, naprawy protez. Jako jedyni w mieście robimy protezy elastyczne.",
  "url": "https://DOMAIN/",
  "image": "https://DOMAIN/og.jpg",
  "telephone": ["+48601594229", "+48603053437"],
  "priceRange": "20–1400 PLN",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Karola Szymanowskiego 33",
    "postalCode": "87-300",
    "addressLocality": "Brodnica",
    "addressRegion": "kujawsko-pomorskie",
    "addressCountry": "PL"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 53.270098, "longitude": 19.394949 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "10:00", "closes": "17:00" }
  ],
  "founder": [
    { "@type": "Person", "name": "Dariusz Orłowski" },
    { "@type": "Person", "name": "Marek Orłowski" }
  ],
  "areaServed": { "@type": "City", "name": "Brodnica" },
  "makesOffer": [
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Protezy akrylowe" }, "priceCurrency": "PLN", "priceSpecification": { "@type": "PriceSpecification", "minPrice": 200, "maxPrice": 600, "priceCurrency": "PLN" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Protezy szkieletowe" }, "priceCurrency": "PLN", "priceSpecification": { "@type": "PriceSpecification", "minPrice": 700, "maxPrice": 1400, "priceCurrency": "PLN" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Protezy elastyczne" }, "priceCurrency": "PLN", "priceSpecification": { "@type": "PriceSpecification", "minPrice": 600, "maxPrice": 1200, "priceCurrency": "PLN" } }
  ]
}
```
Notes: geo is taken from the map embed's view centre, not a surveyed marker — **verify the map pin before shipping**. Use `"@type": "Dentist"` instead of `LocalBusiness` only if the owner wants the tighter dental-lab signal; `LocalBusiness` is the safe default.

**Accessibility**
- Landmarks: `<header>`, `<nav aria-label="Główna">`, `<main>`, `<footer>`. Sections use `aria-labelledby`.
- Skip link „Przejdź do treści” as first focusable, visible on focus.
- **No-JS fallback:** `<noscript>` w `app/index.html` przed `#root` powtarza NAP (h1, adres, oba linki `tel:`, godziny) — bez JavaScriptu `#root` zostaje pusty, więc to jedyna treść, jaką zobaczy użytkownik.
- Global focus: `:focus-visible { outline: 2px solid var(--c-focus); outline-offset: 2px; border-radius: inherit }`. `--c-focus` to domyślnie `--c-teal-600`, a `#fff` na ciemnych powierzchniach (`.site-footer`, `.hero`, `.whyus__video`) i na `.skip-link`. Never `outline: none` without a replacement.
- Hover ≠ focus: every hover effect has a focus-visible twin.
- Target size ≥ 44×44 for header trigger, buttons, tel links, gallery tiles (exceeds WCAG 2.5.8).
- Keyboard: menu (Esc + return focus), dialogs (native), gallery z-order (Tab), details (native), map facade (Enter/click).
- `alt` strategy:
  - hero `1.jpg` → CSS background → no alt (decorative).
  - `3.jpg` in „O pracowni” → meaningful alt.
  - gallery + portfolio tiles → descriptive Polish, one per work type (§7.1/§7.3).
  - icons (CSS mask) → `aria-hidden="true"`; when an icon carries meaning, add a visually hidden text label next to it.
  - map iframe → `title`; video → `aria-label`.
- No colour-only signalling: the open FAQ row changes background **and** border **and** the +/− glyph.
- `<html lang="pl">`, all copy in Polish including `aria-label`s.

---

## 7. Asset mapping

### 7.1 Gallery grid — 12 of 26 `images/gallery/*.jpg`
`IMG_7005, 7006, 7008, 7009, 7012, 7141, 7142, 7148, 7766, 7768, 8211, 8212` (`-min.jpg`) in that order.
Superseded/broken references in the old markup to drop or fix: `IMG_7766` was linked with an `IMG_7768` `<img>`, and four tiles pointed `href="images/portfolio/04.jpg"` while showing a gallery `<img>` — the rewrite removes both bugs.
The other 14 files (`7739, 7742, 7747, 7749, 7751, 7765, 7770, 8192, 8194, 8196, 8204, 8207, 8216, 9876`) are an unused spare pool — swap one in if a tile looks weak. Note `IMG_7751` is portrait (4000×6000); the 3:2 crop handles it.

### 7.2 Services ↔ icon ↔ portfolio photo
**Source order, kept for reference.** The built site renders **7** services in the client's
order (akrylowe → elastyczne → szkieletowe → korony i mosty → szyny → naprawy → ortodoncja);
**Szynoprotezy (#4) was dropped on request**, and the `images/portfolio/` column is **not used
by the rewrite at all** — the service sheets carry copy and prices, no photo. So
`008-tooth-11.svg` and `04.jpg` are now unused (see §11).
| # | Service (copy verbatim) | Icon (`images/svg/`) | Dialog photo (`images/portfolio/`) |
|---|---|---|---|
| 1 | Protezy akrylowe | `003-tooth-13.svg` | `01.jpg` |
| 2 | Protezy szkieletowe | `004-tooth-12.svg` | `02.jpg` |
| 3 | Protezy elastyczne | `010-protection.svg` | `03.jpg` |
| 4 | Szynoprotezy | `008-tooth-11.svg` | `04.jpg` |
| 5 | Korony i mosty | `017-tooth-9.svg` | `05.jpg` (16:9 — handled by `object-fit: cover`) |
| 6 | Szyny | `016-tooth-10.svg` | `06.jpg` |
| 7 | Naprawy, podścielenia, wymiana klamer | `006-tooth-pliers.svg` | `07.jpg` (portrait 1632×2048) |
| 8 | Ortodoncja | `009-braces-1.svg` | `08.jpg` |

Icons are used as **CSS masks**, not inlined SVG and not `<img>`:
```css
.icon { --i: url(/images/svg/003-tooth-13.svg);
        mask: var(--i) center/contain no-repeat;
        background-color: var(--c-teal-600); width: 32px; height: 32px; }
```
→ colourable on hover, no 512×512 paths in the JS bundle, no icon font. 34 files exist; **10 are used** (7 services + `007-appointment.svg` for phone CTA + `001-dentist.svg` for the bios + `011-dental-care.svg` for the USP bullet). `008-tooth-11.svg` is still listed in `ICONS_USED` but no longer referenced by `services.ts`. The rest stay unused.
**Verify each portfolio photo actually depicts its service before publishing** — the mapping is positional, not confirmed by content. *(Moot for the rewrite: none are rendered.)*

### 7.3 Everything else
| File | Slot |
|---|---|
| `images/slides/1.jpg` (1900×750) | Hero background (≥641 px) |
| `images/slides/3.jpg` (1900×750) | „O pracowni” section image (4:3 cover) |
| `images/slides/2.jpg` | unused (killed with the carousel) |
| `images/gallery/*.jpg` (26) | 12 tiles (§7.1) + 14 spares |
| `images/portfolio/01..08.jpg` | unused — the rewrite renders no dialog photos (§7.2) |
| `images/elastyczna2.mp4` | „Dlaczego my?” — re-encoded + poster (§4.7) |
| `images/elastyczna.mp4` | unused |
| `images/svg/*.svg` (34) | 10 used via CSS mask (§7.2) |
| `images/banner1.jpg`, `banner3.jpg`, `images/IMG_*.jpg`, `images/06.jpg`, `images/icons/*` | unused |
| `fonts/BebasNeue-webfont.woff` | wordmark only |
| `fonts/Inter*.woff2` | **new** — self-hosted, latin-ext subset |
| `fonts/flaticon.*`, `fonts/elegant-theme-line.*`, `glyphicons-*` | delete (icon fonts) |

**Processing pipeline (required, not optional):** the gallery JPEGs are 4 800–6 000 px and several MB each despite the `-min` suffix. Add `vite-imagetools` (dev-only) and emit AVIF/WebP/JPEG at `480w` + `960w` + `1600w` for gallery/portfolio, `1920w` for the hero. One `ffmpeg` pass for the video, one crop for `og.jpg` (1200×630) and `favicon.svg`.

---

## 8. Invented strings (review each)

Everything below is **new** writing. All other copy is lifted verbatim from `index.html`.

| # | String | Where |
|---|---|---|
| 1 | „Zadzwoń” | header CTA button (desktop) |
| 2 | „Zamknij menu” | mobile menu `aria-label` when open („Menu” is reused from source) |
| 3 | „Przejdź do treści” | skip link |
| 4 | „Zobacz, co robimy” | hero secondary CTA („Skontaktuj się” is from source) |
| 5 | „Zamknij” | dialog close `aria-label` |
| 6 | „Poprzednie zdjęcie” / „Następne zdjęcie” / „Zamknij galerię” | lightbox controls |
| 7 | „Odtwórz film” / „Wstrzymaj film” | video toggle |
| 8 | „Pokaż mapę” | map facade button |
| 9 | „Otwórz w Google Maps” | map facade link |
| 10 | „Wybrane prace wykonane w naszej pracowni w Brodnicy.” | gallery intro (replaces lorem ipsum) |
| 11 | „Zapraszamy do kontaktu telefonicznego lub wizyty w pracowni.” | contact intro (replaces lorem ipsum) |
| 12 | „Film: proteza elastyczna wykonana w pracowni ORDENT” | video `aria-label` |
| 13 | „Pracownia protetyczna ORDENT w Brodnicy” | alt of `slides/3.jpg` |
| 14 | „Proteza elastyczna – realizacja ORDENT” | lightbox caption #1 |
| 15 | „Proteza akrylowa – widok od strony podniebienia” | caption #2 |
| 16 | „Proteza szkieletowa z klamrami elastycznymi” | caption #3 |
| 17 | „Proteza częściowa na modelu gipsowym” | caption #4 |
| 18 | „Proteza akrylowa – detal ustawienia zębów” | caption #5 |
| 19 | „Uzupełnienie protetyczne w trakcie wykańczania” | caption #6 |
| 20 | „Proteza elastyczna – detal płyty” | caption #7 |
| 21 | „Realizacja ORDENT – praca własna” | captions #8–#12 (shared fallback; the source only had two captions, both placeholder „Proteza jakaś”) |
| 22 | „© 2026 ORDENT – pracownia protetyczna, Brodnica.” | footer (source had „© 2020 Copyright” + a „made by” credit dropped from the design) |
| 23 | `<title>` + `meta description` + OG copy | §6 |
| 24 | „Dariusz Orłowski – technik dentystyczny, 40+ lat praktyki” style `<h3>` for bio 1 | optional; the source has the name as `<strong>` only — if you want a real `<h3>`, this label is new |
| 25 | „Opinie” (h2) + „Zachęcamy do zapoznania się z opiniami o naszej pracowni w Google.” + lista opinii + „Zobacz opinie w Google” | sekcja „Opinie" (`Opinie.tsx`). The review texts themselves are **not** invented — `data/reviews.ts` holds the 5 real Google reviews that the profile exposes anonymously. |
| 26 | 8 artykułów poradnika — tytuły, `summary`, `seo.description`, nagłówki sekcji i zdania łączące fakty | `/poradnik/<slug>/` (`data/poradnik.ts`). Fakty są wyłącznie z `faq.ts` (własne pytanie i odpowiedź) oraz `services.ts`; nowa jest proza, która je łączy. |

Uncertain / flag to the owner:
- **Poradnik article framing — owner review requested.** The articles add no clinical fact, price, guarantee or statistic: each `opening` is its `faq.ts` answer, and the derived claims trace to `faq.ts` or `services.ts` (e.g. „podatność na uszkodzenia i złamania", „nie pękają i są odporne na upadki", „zmniejsza ryzyko infekcji" are the source's own words). Two sentences, however, are **added framing** rather than lifted copy and should be read as the writer's voice, not the lab's promise: article 3 (`jak-kleic-protezy`) — „nadmiar nie poprawia utrzymania" and „Dla wielu osób to…", and article 5 (`czy-spac-w-protezach`) — „Drobny dyskomfort… to normalny etap przystosowania". Both are hedged, non-clinical and consistent with the FAQ's own „z reguły" tone; keep or drop on your read. Authorship is Claude's, on the owner's `faq.ts` answers. Two articles are thin because their source answers are (`refundacja-nfz`, 19 words, reuses the 5-year fact from `jak-czesto-wymieniac-protezy`; `jak-kleic-protezy`) — the fix is more owner-supplied detail, not more invention.
- **FAQ count:** the source has **8** questions, not 7. Spec keeps all 8. Confirm one isn't meant to be dropped.
- **„Ikony: Freepik (flaticon.com)”** — the `images/svg/` set mirrors the Flaticon/Freepik naming scheme. If that licence requires attribution, the footer credit must stay (it was in the original). Legal, not design — verify.
- **Domain, geo coordinates** — see §6.
- Service-copy typos: the copy pass corrected three word-level joins — „Tzw. Protezy” → „Tzw. protezy”, „teżdroższe” → „też droższe”, „Siudo mówienia” → „się do mówienia” — and nothing else. Still verbatim: „peloty” (pending client confirmation; carries a header comment in `services.ts`), „dostawianie”, the „Porcelanowe.”-style price-list items and „ad. ” numbering. Say the word if you want a fuller proofread pass — that would be additional invented content.

---

## 9. Explicitly not building (YAGNI)

No dark mode, no i18n, no CMS, no contact form (phone-first business), no cookie banner (map facade removes the third-party cookie), no scroll-spy nav, no carousel, no animated counters, no review widget, no blog, no page transitions, no analytics, no service worker.

---

## 10. Build order for the implementer

1. `tokens.css` (§1) + `app.css` base (reset, type, container, focus, reduced-motion).
2. Static markup for all 8 sections with verbatim copy → verify hierarchy and keyboard order before styling.
3. Header + anchor navigation (mobile panel).
4. Hero + „O pracowni” + NAP card.
5. Service grid + `<dialog>` + delegated handler.
6. FAQ `<details>`.
7. Gallery grid + lightbox dialog reuse.
8. Contact + map facade + footer.
9. Asset pipeline (imagetools + ffmpeg) and wire `<picture>`.
10. Motion (reveal observer) last, then the reduced-motion branch.
11. Self-check pass: keyboard-only run through every interactive element, 320 px viewport width, 200 % zoom, `prefers-reduced-motion: reduce`, and the AA pairs in §1.1.

---

## 11. Supersessions recorded during implementation

The spec text above is left as written; these are the decisions taken while building that override it.

- **§7.3 `vite-imagetools` — dropped.** All derivatives are pre-computed and committed by `tools/build-assets.py` (PIL + ffmpeg). No image plugin in the Vite config.
- **§4.5 square tiles — dropped.** Gallery derivatives are 3:2 (960×640), so `.tile` is `aspect-ratio: 3 / 2`. A 1:1 crop clipped the arch ends off g01/g02/g05/g10. No AVIF; `<picture>` WebP → JPEG at 480/960, lightbox 1440.
- **§7.2 "Dialog photo" and §8 captions #14/#16/#20 — invalid.** `images/portfolio/01–08.jpg` are stock band/festival/street photos, so service dialogs carry no photo.
- **§3 „O pracowni" figure — shipped as a responsive `<picture>`, not a single still.** Source `images/slides/3.jpg` → `about-{480,960,1200}.{jpg,webp}` from `tools/build-assets.py` (`ABOUT_WIDTHS`), WebP `<source>` + JPEG fallback, `sizes="(min-width: 900px) 48vw, 100vw"`. Ratios: `4/3` base, `16/9` from 640 px, back to `4/3` in the ≥900 px two-column box — the desktop column is unchanged from the spec. `<picture class="about__media">` carries the grid placement (`grid-column: 2; grid-row: 1` at ≥900 px) so `<img class="about__img">` keeps its box rules. A 390 px 3× phone legitimately picks the **1200** variant (`100vw × 3 = 1170 px`) — not a bug.
- **`dialog` centring:** `* { margin: 0 }` in the reset beat the UA's `dialog:modal { margin: auto }`, so `.sheet` sets `margin: auto` explicitly.
- **`img, video` reset** carries `height: auto` so markup `height="900"` cannot stretch `.about__img`.
- **Skip-link focus target:** `<main id="content" tabIndex={-1}>` — Safari/Firefox do not relocate focus to a non-focusable fragment target. Safe because every focus style is `:focus-visible`-only.
- **Domain:** `ordent.pl` is **not connected**. Every absolute address (`canonical`, `og:url`, `og:image`, JSON-LD `@id`/`url`/`image`, `robots.txt` `Sitemap:`, `sitemap.xml` `<loc>`) derives from the single `SITE_URL` constant in `src/data/site.ts`, and `base` is `new URL(SITE_URL).pathname`. Pointing `SITE_URL` at `https://ordent.pl/` moves the whole site; connect the domain (CNAME) at the same time.
- **„Naprawy" price list is 6 rows**, not 7 — the source has 6.
- **Header tooth mark restored:** the old `#header i` (a 32×32 `background: url(images/040-tooth.svg)`) is back, as `<span class="icon wordmark__tooth" aria-hidden>` inside the wordmark link, so it masks in `currentColor` and follows the transparent/scrolled header states. Validated: link accessible name stays „ORDENT", header tab order unchanged, no overlap at 320 px, stroke contrast on the hero 4.58:1.
- **Copy pass:** punctuation and whitespace (double periods/spaces, space before comma, `-` → `–`), **plus three word-level joins**: „Tzw. Protezy” → „Tzw. protezy”, „teżdroższe” → „też droższe”, „Siudo mówienia” → „się do mówienia”. Everything else stays verbatim, including „peloty” pending client confirmation; see `README.md`.
- **Lighthouse `color-contrast` is flaky (1 run in ~3):** the `.reveal` fade is 0.5 s of real opacity, so a capture taken mid-fade measures text at ~50 %. Verified all 43 `.reveal` elements reach `is-in` with computed `opacity: 1`; nothing stays faded. With the fade settled the audit is 1.00/1.00/1.00. Re-run before treating a sub-1.00 score as real.
- **New section „Opinie" (§2 order):** added between `<Faq />` and `<Contact />`, `id="opinie"`. `app/src/data/reviews.ts` holds the **5 real reviews** the Google profile exposes anonymously (the other 8 are behind a sign-in wall), transcribed verbatim — no invented authors, ratings, dates or aggregates. The section renders the list (`.opinie__list`, 2 cols from 640 px, `max-width: 800px`) and always shows „Zobacz opinie w Google" → `mapsLink`. The relative dates Google publishes („rok temu") drift; refresh them when the file is edited. Aggregate 5,0/13 deliberately not rendered. Not added to the nav.
- **Google Business Profile — verified, and linked.** The profile is „Pracownia Protetyki Stomatologicznej Dariusz Orłowski", `ludocid=5880031631405622190` (the same place as the map embed), rated **5,0 with 13 reviews**, which Google labels „Opinie nie są zweryfikowane". `mapsLink` now points at `https://maps.google.com/?cid=5880031631405622190` instead of a name/address search query, and the same URL is in the LocalBusiness `sameAs`. The rating is deliberately **not** rendered (it would drift out of date for no gain). One manual profile task remains: **no website is attached** in the profile (Google shows „Dodaj witrynę"). The postal code is now `87-300` on the site too, matching the profile.
- **§9 „no analytics" — re-decided, still not built.** Revisited during this pass and deliberately left out; no analytics script, no counter, no consent banner. Read §9 as current.
- **Deleted in this pass (contradicts §1.2/§1.3/§4):** tokens `--fs-xs`, `--fs-eyebrow`, `--w-wide`, `--sh-1`, `--space-9`, `--space-10` and the `.eyebrow` rule had no consumer. Added `--c-focus` (default `var(--c-teal-600)`), overridden to `#fff` on `.site-footer`, `.hero` and `.whyus__video` where the surface is dark.
- **FAQPage JSON-LD duplicates `faq.ts`.** *(Superseded — see the `seo-plugin.ts` entry below.)*
- **§4.5 caption + `aria-label` — dropped.** The tile is no longer `<button aria-label="<caption>">`; the caption is visible text in `<span class="tile__caption">` and the tile image is `alt=""` (the text next to it already names the work). `.tile` is a grid so the caption can sit under the image, and the aspect ratio moved to `.tile img`. Tiles are therefore taller than 3:2.
- **§4.6 CTA hierarchy — second `tel:` demoted.** Both numbers shipped before as equal-weight full-width buttons; the first is now `btn--primary btn--block` and the second `btn--ghost btn--block`, so the primary phone is visually the lead action. Address and hours come from `site.ts`, but the address is still hard-coded in `Contact.tsx` (it is not exported from `site.ts`).
- **§4.7 autoplay — dropped entirely.** *(Superseded — see the „gated autoplay" entry below.)*
- **Gallery captions are now visible text**, so §6's alt strategy „gallery + portfolio tiles → descriptive Polish, one per work type" no longer applies to gallery tiles (see the §4.5 bullet above).
- **SEO blocks are generated, not duplicated (`app/seo-plugin.ts`).** The JSON-LD (`LocalBusiness`, `FAQPage`), the `<noscript>` fallback, `robots.txt` and `sitemap.xml` are all emitted at build time from `src/data/{site,faq,services}.ts`, so the duplicate-FAQ hazard noted above is gone. `SITE_URL` is the single source for every absolute address; `__SITE_URL__` placeholders in `index.html` are filled by the plugin. SEO-only copy (JSON-LD `description`, `founder`, `priceRange`) lives in the plugin on purpose — the config bundle never reaches the browser. `makesOffer` parses the `services.ts` price strings with `/^Cena: (\d+) – (\d+) zł$/` and **fails the build** on an unrecognised format instead of silently dropping the offer.
- **Home-screen / PWA icons and manifest.** `index.html` carries `apple-touch-icon` and `site.webmanifest`; the PNGs (`apple-touch-icon.png` 180, `icon-192.png`, `icon-512.png`) are generated by `build_app_icons()` in `tools/build-assets.py` — the favicon's mark on a full-bleed `#0B4F4A` square, drawn at 4× and downscaled. Full bleed with no alpha, because iOS/Android apply their own mask. `site.webmanifest` is a hand-written file in `public/` with relative paths (`start_url: "."`).
- **Flagship service highlighted.** `services.ts` gained `flag?: boolean` (set on `elastyczne`), `Services.tsx` renders a `ui.flagBadge` label („Nasza specjalność"), and `sections.css` adds `.svc-card--flag` / `.svc-card__flag` — a gold badge, `#fff` on `--c-gold-700` (6,27:1). One card only, per the owner's differentiator.
- **§4.7 autoplay — gated autoplay shipped.** *(Supersedes the „dropped entirely" entry above.)* `WhyUs.tsx` autoplays once the clip is half in view, but only when `prefers-reduced-motion: reduce` is absent **and** the connection is not metered (`saveData` / 2g), and a manual pause sticks (`userPaused` ref). The poster + 44×44 toggle remains the WCAG 2.2.2 pause control, so §4.7/§5's intent holds. The legacy root `index.html` still autoplays its `images/elastyczna2.mp4` at rest (it is not deployed; left as in the original source).
- **Price list and service order — client request.** Protezy: akrylowe **800–1500 zł**, elastyczne **1500–2500 zł**, szkieletowe **2200–3400 zł**, rendered in that order. Naprawy keeps 6 rows (pęknięcie 150–250, dostawienie zęba 200, wzmocnienie +50, podścielenie 300, wymiana klamer 120 / 60, samo czyszczenie 50) plus the „2–4 h" and „+50 % za »na już«" notes. **Szynoprotezy removed** (card, detail copy, legacy modal). §0's card prices are the **source** site's and no longer match the built cards.
- **Phone order + Saturday hours — client request.** Numbers reordered to **601 594 229 first, 603 053 437 second** in `site.ts`, which drives header „Zadzwoń", About, Contact, footer and JSON-LD; `Header.tsx` now takes its `tel:` from `phones[0].href` instead of a hard-coded string. Saturday dropped from `hours` (`Pon–pt 10–17`) and from `openingHours`/`openingHoursSpecification`; §6 and the legacy `index.html` mirror follow. Note the Saturday came from the original site („Pon-pt: 10 - 17, sob 10 – 13"); the old contact block there never showed hours.
- **§4.8 map facade — self-hosted OSM raster.** The facade carried no map at first; it is now `app/public/img/map.jpg` — 15 OpenStreetMap tiles at z=16 composed to 1024×512 (74 251 B), committed and **not** produced by `tools/build-assets.py` (one of only **two** `public/` files outside the generator — the other is `site.webmanifest`). It is centred on the address so `cover`'s crop keeps the pin aligned; the pin, address, „Pokaż mapę" button and the „© OpenStreetMap contributors" credit are HTML on top. Still zero third-party requests at rest → still no cookie banner. The legacy `index.html` mirror keeps its iframe source on `data-src`, so a `display:none` iframe never fires the request.
- **Service grid is 7 cards, not 8.** Szynoprotezy removed on request (see the price-list entry above); §7.2 keeps the source table but marks row 4, `008-tooth-11.svg` and `04.jpg` unused, and notes the rewrite renders no `images/portfolio/` dialog photos at all.
- **Prerendered routes — the site is 10 documents, not one.** *(Supersedes §2's „old anchors preserved", §6's single-page `<head>`, and §10's build order.)* `vite-react-ssg@0.9.2` prerenders `/`, `/cennik/`, `/poradnik/` and `/uslugi/<slug>/` × 7; `routes.tsx` is the one route table. `main.tsx` exports `createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL })` — **`basename` must be passed explicitly**, vite-react-ssg does not read Vite's `base` (`const BASE_URL = routerOptions.basename ?? "/"`), and omitting it silently replaces the prerendered tree with a 404 after hydration. Service copy now lives at its own canonical URL; the homepage keeps teasers. Section ids and homepage anchors are unchanged, but a `#d-…` dialog deep link is only valid on `/`. `sitemap.xml` is 10 `<loc>`. Full reasoning in `docs/ADR-001-content-architecture.md`.
- **Service dialogs are teasers, not the full copy.** *(Supersedes §4.3's „the detail copy is long-form and must be readable at `--w-prose`".)* Each `Service` carries an explicit `teaser`; `ServiceDialog.tsx` renders it plus a „Pełny opis i cennik" link (`ui.fullDetails`) to `/uslugi/<slug>/`, placed **above** the price table — the `naprawy` dialog is 717 px in an 844 px viewport, so a link below the table is unreachable without scrolling. An explicit field was chosen over `paragraphs.slice(0, 1)`: three of the seven opening paragraphs run 87–119 words, so the first-paragraph rule left the homepage and the service page largely identical. Measured effect: homepage copy 1969 → 1491 words. The native `<dialog>` mechanism itself is untouched.
- **Week 1 conversion UI — not in this spec at all.** `CallBar.tsx`: sticky bottom bar with a `tel:` action on mobile, shown once the hero `#banner` is out of view, and `visible = true` on pages with no hero — which is why it is mounted in `Cennik.tsx`, `ServicePage.tsx` and `Poradnik.tsx` as well as `App`. `OpenBadge.tsx` + `lib/openingHours.ts` (`warsawNow`, `isOpenAt`, `nextOpeningAt`) render „Otwarte" / „Zamknięte – otwieramy dziś" / „– otwieramy w poniedziałek", computed **only** in `useEffect`, so the prerendered HTML ships a neutral state and hydration cannot mismatch; the opening text is deliberately absent from every built `index.html`. The emergency callout in `About`/`Contact` is a real `tel:` link, and `Contact` gained a „Wyznacz trasę" ghost button to `mapsLink`. Strings in `ui` (`site.ts`), styles appended to `sections.css` (including `body { padding-bottom }` so the bar cannot cover the footer).
- **§9 „no analytics" — superseded: cookieless analytics shipped.** `app/src/lib/analytics.ts`, started once from `main.tsx`. With `VITE_ANALYTICS_SRC`/`VITE_ANALYTICS_DOMAIN` unset the module is **completely inert** — no script tag, no listener — so an unconfigured build is still a zero-third-party page. A single delegated `click` listener on `document` derives the `Call` and `Directions` events from the `href`, so a new `tel:` or maps link is measured with no per-component wiring; do not hand-instrument components. No cookie ⇒ §9 is right about the consent banner: **there is none, and none is needed.** See `docs/MEASUREMENT.md`.
- **Price list completed — and four services left deliberately unpriced.** Korony i mosty, szyny and ortodoncja have no price in the source and the client has not supplied one, so `/cennik/` renders „Cena do ustalenia" for them (`PriceList.tsx`: neither `price` nor `priceList` present) and the GBP handover says „do ustalenia". **No price was invented anywhere.** `seo-plugin.ts`'s `makesOffer` skips a service with no `price` string instead of failing, so unpriced is a supported shape — not a build error, and not a licence to invent one.
- **§6's `<head>` is per route and generated (`app/seo-plugin.ts`).** `injectHead` writes a unique `<title>`, `<meta description>`, `<h1>` and canonical per route, idempotently (guarded by `data-ordent-ld`). Per-service metadata lives on the `Service` record (`slug`, `seo`); non-service pages in `data/pages.ts`. JSON-LD: `LocalBusiness` + `FAQPage` on `/`; `Service` + 3-item `BreadcrumbList` on service pages; 2-item `BreadcrumbList` (`INDEX_TRAIL`) on `/cennik/` and `/poradnik/`. Still **no `AggregateRating`** and **no `Dentist`/`MedicalClinic`** (§9 holds). There is no `SeoHead` component on purpose: `npm run dev` serves client-rendered HTML, so per-route head exists **only in the build output** — read `dist/`, not the dev server, before trusting a metadata claim.
- **§7.3 stills — hero migrated off `background:`; only `map.jpg` left.** After the About figure moved to `<picture>` variants, the hero followed: `.hero`'s CSS `background` is gone and `Hero.tsx` opens with `<picture className="hero__media">` (webp `<source>` + `<img className="hero__img" loading="eager" fetchPriority="high">`, `sizes="100vw"`, `width`/`height` 1900×750). Variants come from `HERO_WIDTHS = (480, 960, 1900)` in `tools/build-assets.py`; the 1900 step is byte-identical to the old `hero.jpg`, and `object-position: 50% 30%` + `object-fit: cover` use the same spec math as the old `background-position 50% 30% / cover`, so the crop is provably unchanged. `.hero` gained `isolation: isolate` and `.hero__media` `z-index: -1`: without the isolation a negative-z child escapes to the root stacking context and paints under the whole page, whereas inside it the order is photo → `::before` scrim → `::after` top gradient → `.hero__inner`. The `<link rel="preload" as="image" href="/img/hero.jpg">` was deleted — the `<img>` is discovered during HTML parse, and a preload naming one candidate while `srcset` picks another double-downloads. `img/map.jpg` (1024×512, 74 KB, hand-composed OSM tiles — see the §4.8 entry) is now the **last** un-resized still; `og.jpg` (1200×630) is correctly sized for OG. Both are deliberate: a tile-composed facade and an OG crop have no responsive consumer.
- **Poradnik articles — 8 pages, one per FAQ entry.** *(Supersedes §2's „poradnik" placeholder and the previous entry's „sitemap.xml is 10 `<loc>`": it is now 18.)* `app/src/data/poradnik.ts` holds the 8 `Article`s (plain data, no imports) and `poradnik.test.ts` asserts both that each `sourceQuestion` is a verbatim `faq.ts` question and that `ROUTES` has 18 entries. `Article` extends the "three sections" idea with `opening` (the entry's answer, smoothed, rendered as the leading paragraph) and `related` (service slugs for further reading); `summary` stays a short index teaser so `/poradnik/` does not repeat the homepage FAQ copy — the ADR's own duplicate-content warning. Every article carries `Article` + a 3-item `BreadcrumbList` (Start / Poradnik / title) from `seo-plugin.ts`'s `articleLd()`, with `publisher` pointing at the `#ordent` @id and **no `author`/datePublished** — the owner writes these and inventing either would be untrue. The same rule binds the copy: no price, guarantee, statistic or clinical fact outside `faq.ts` and `services.ts`. Two articles are thin by construction (`refundacja-nfz`, `jak-kleic-protezy`) and should be strengthened when the owner adds detail.
