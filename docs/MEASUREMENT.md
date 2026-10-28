# MEASUREMENT — analytics, Search Console, Google Business Profile

Everything here is **cookieless**. There is no cookie, no personal data, no cross-site
tracking, and therefore **no consent banner** — do not add one.

---

## 1. Site analytics (Plausible / Umami)

The plumbing already exists in `app/src/lib/analytics.ts` and is started once by
`app/src/main.tsx`. With no environment set the module is **completely inert**: no script,
no listener. Nothing breaks if you never configure it.

Enable it by setting two build-time variables (GitHub → Settings → Secrets and variables →
Actions → Variables):

| Variable | Value at cutover | Meaning |
|---|---|---|
| `VITE_ANALYTICS_SRC` | e.g. `https://plausible.io/js/script.js` | Script URL. Umami works the same way — swap the URL. |
| `VITE_ANALYTICS_DOMAIN` | `ordent.pl` | The `data-domain` the provider is told to attribute to. |

Then rebuild/redeploy. Until **both** the domain is live and the variables are set, leave them
unset — attributing hits to `pawelknorps.github.io` is worse than having no data.

### Events

There is no per-link instrumentation and there must not be: `analytics.ts` delegates a single
`click` listener on `document` and derives the event from the `href`.

| Event | Fires when | Props |
|---|---|---|
| `Call` | any `a[href^="tel:"]` is clicked | `phone` (number from the href) |
| `Directions` | any link to `maps.google…` / `google.com/maps` is clicked | — |
| `pageview` | automatically, by the provider script | — |

Consequence: **every new `tel:` or maps link is measured for free.** Never hand-wire tracking
into a component.

### Constraints worth remembering

- A third-party script must never break the page — the tracking call is wrapped in `try`.
- If a **contact form** is ever added, this posture must be re-checked: a form collects
  personal data and changes the consent story.
- Do not add `AggregateRating` markup to make review numbers visible in search. See ADR-001.

---

## 2. Baseline (fill this in before asking anyone to "improve" anything)

Record one row per week. Without the first row, no later claim of improvement is checkable.

| Date | GSC impressions | GSC clicks | Avg. position | Rank "protezy elastyczne Brodnica" | GBP calls | GBP directions | GBP site clicks | `tel:` taps | Local-pack impressions |
|---|---|---|---|---|---|---|---|---|---|
| 2026-10-28 | | | | | | | | n/a (analytics not yet configured) | |

Notes on the columns:

- **Rank + local-pack impressions** are only visible in **Google Business Profile →
  Performance** (searches, and "places searched from"). There is no API for this small a
  business; read the dashboard weekly and type the numbers in.
- `tel:` taps stay blank until analytics is configured (section 1).

---

## 3. Google Search Console

One-time, owner actions:

1. Add a **Domain property** for `ordent.pl` (DNS TXT verification — covers apex, `www`,
   http and https at once, so it keeps working after the cutover).
2. Submit `https://ordent.pl/sitemap.xml` (`seo-plugin.ts` generates it at build time).
3. Use **URL Inspection → Request indexing** for the homepage once, after the cutover.
4. Re-check that exactly **one** property exists — a leftover `github.io` property competes
   with the new one and hides the real numbers.

Weekly: Queries report → the two queries that matter are `protezy elastyczne Brodnica` and
`naprawa protezy Brodnica cena`. Watch impressions *first*, position second: impressions move
before rank on a small local site.

Pages report → after Weeks 2–3 confirm that `/uslugi/*` URLs are indexed **individually**.
A single indexed homepage URL means the prerender did not take effect.

---

## 4. Google Business Profile

The GBP outranks the website for essentially every local query. Treat it as the primary
channel, not the afterthought.

- **Categories:** primary **Protezy**, secondary **Laboratorium protetyczne**.
- **Services with prices:** every one of the seven services, matching the site's `/cennik/`
  and the Week 1 completion of the price list. Mismatched prices across site/GBP are a trust
  cost and a common local-pack complaint.
- **Hours:** must match `hours` / `openingHours` in `app/src/data/site.ts`. Change the site
  first, then the GBP in the same week.
- **Photos:** **40+** is the strongest correlated local-pack factor with no ceiling. Aim for
  40 real photos of real work (before/after, the lab, the team) rather than stock.
- **Website:** currently **empty** — attach `https://ordent.pl/` at cutover.
- **Posts:** weekly. A short post with a photo is enough; cadence beats quality here.
- **Reviews:** send the review-request link to every patient; reply to **all** reviews,
  positive and negative. Volume and recency of reviews move local rank.

---

## 5. What to look at when

| Cadence | Look at | Act on |
|---|---|---|
| Weekly | GBP: calls, directions, site clicks, searches | If searches rise but calls do not, the conversion UI (Week 1) is the suspect. |
| Weekly | GSC: impressions for the two key queries | Impressions first; do not panic at position. |
| Weekly | Analytics: `Call` / `Directions` counts | Which page the clicks come from tells you where to put the next CTA. |
| Monthly | Photo count, review count, post count on the GBP | Push both toward the next threshold. |
| Monthly | Sitemap coverage in GSC | Any URL not indexed is a prerender or metadata defect, not an SEO one. |

---

## 6. Honest limits

- Cookieless analytics gives pageviews and event counts, **not** funnels or user journeys.
  Attribution from "someone saw the page" to "someone called" is a phone call you cannot see.
- GBP's own numbers (calls, directions) are the more trustworthy signal for this business and
  should be read as the primary source.
- Small-sample noise: at this traffic level a week is not a trend. Compare four weeks, not one.
