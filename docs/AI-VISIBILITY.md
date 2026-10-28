# AI VISIBILITY — what ORDENT does (and refuses to do) about AI answers

Late-2026 research pass into how AI search surfaces — AI Overviews, ChatGPT Search, Perplexity,
Copilot — pick and cite a small local business. Every claim below is one that was actually
sourced in that pass; nothing else is asserted. The point of writing it down is so the
decisions are not re-litigated, and so the honest ones are not overwritten by folklore.

Sibling records: `docs/ADR-001-content-architecture.md` (crawlability, schema policy),
`docs/MEASUREMENT.md` (what to read), `docs/DOMAIN-CUTOVER.md` (the `SITE_URL` cutover).

---

## 1. robots.txt is the one lever with provider-confirmed citation consequences

Crawler tokens fall into two groups that are **not** interchangeable:

- **Search / index bots** fetch the page so a provider *can* show and cite it.
- **Training bots** fetch it so a provider can train on it. That is a **data-use choice only**:
  blocking a training bot does **not** remove the site from answers, and allowing one buys no
  citation. Cite-ability and train-ability are different decisions.

**Decision — name the search/index bots, leave the training bots to `*`.** `app/seo-plugin.ts`
emits `robots.txt`; it lists `Allow: /` for `OAI-SearchBot`, `ChatGPT-User`,
`Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Meta-WebIndexer`, `Amzn-SearchBot`,
`Googlebot`, `Bingbot` and `Applebot`. The training tokens — `GPTBot`, `ClaudeBot`,
`Google-Extended`, `Applebot-Extended`, `CCBot`, `Amazonbot`, `Bytespider` — are **not named**;
they fall through to the `*` group, which also allows, so **nothing is blocked**. We take no
position against training here; we simply decline to make a crawl-blocking decision that buys
no citation.

The tokens `anthropic-ai` and `Claude-Web` are **retired** — do not add them back.

## 2. `llms.txt` — tested in the research pass, deliberately NOT added

Recorded so it is not re-proposed without new evidence:

- Google states plainly that `llms.txt` **neither helps nor hurts** and that it **ignores** the
  file.
- An Ahrefs study of **~137,000 domains** found **97%** of `llms.txt` files received **zero
  requests** in May 2026.

**Decision — do not add `llms.txt`.** Revisit only on a change of one condition: **a major
provider confirms it consumes the file.** Until then it is a file nobody fetches with a
maintenance cost attached.

## 3. Structured data — kept, but not sold as an AI lever

The JSON-LD stays (`LocalBusiness`, `FAQPage`, `Service`, `Article`, `BreadcrumbList`) because
it earns **rich results in classic Search**. It is not an AI-citation lever: there is **no
demonstrated lift**, and Ahrefs' controlled **1,885-page** test found none. The dates now
emitted on `Article` nodes are real — `datePublished` is the day the eight articles were
written — not fabricated to look fresh.

**Expectation to set:** nobody should expect the markup — or the dates on it — to move an AI
answer. It is kept for Search, and it is kept honest for its own sake.

## 4. What we deliberately refuse to build — and why

This is the risk section; it matters most, because each of these is a plausible-sounding idea
that would damage the site.

- **Bot-only markdown / JSON page variants** (alternate content served only to AI crawlers) —
  **rejected by Google (John Mueller) and by Bing as cloaking.** Serving a different document
  to a bot than to a user is the definition of the thing being avoided. Do not build it.
- **Hidden summary blocks** ("AI summary" text present in the DOM but not visible to a reader) —
  violates the **hidden-text policy**. Hidden text is spam, whether its audience is a model or a
  crawler.
- **Separate content per query permutation** (one page per phrasing of the same question) —
  **scaled-content-abuse policy**. It manufactures near-duplicates instead of answering better.

And Google's own stated position, recorded as a decision not to chase:

- there is **no separate AI index** to optimise for;
- there is **no requirement to rewrite content for AI**;
- there is **no chunking requirement** — content does not need to be split into model-sized
  pieces.

## 5. What actually moves the needle — labelled by evidence quality

Nobody should be promised AI citations. What follows is ranked by how well it is actually
backed. The first item is documented by the provider; the rest are **practitioner consensus**,
not measured, and are held with corresponding modesty.

- **Provider-documented: relevance and position inside the retrieval set.** AI answers are
  grounded in ordinary search results, so the strongest input is still ranking well for the
  query. This is why the crawlability work (ADR-001) is the real AI-visibility work.
- **Practitioner consensus: self-contained, extractable passages.** A passage a model can lift
  without the rest of the page tends to be usable. **Not provider-documented.**
- **Practitioner consensus: answer-first structure.** Lead with the answer, then the detail.
  **Not provider-documented.**
- **Practitioner consensus: genuinely local specifics.** The things only this lab in this town
  can say. **Not provider-documented.**
- **Freshness — a _visible_ date beats hidden markup.** A date a reader can see is the honest
  form; putting freshness only in metadata is the kind of thing §4 rules out. **Practitioner
  consensus.**

## 6. Deployment caveat — the generated `robots.txt` is inert until the cutover

The site is served today from the GitHub Pages **project subpath**
(`https://pawelknorps.github.io/ordent/`). Crawlers read `robots.txt` **only at the domain
root**, and `pawelknorps.github.io` is not our domain — so the generated `robots.txt` and the
`Sitemap:` line inside it are **inert** at the current URL. That is harmless: nothing is blocked
today either way, because the `*` group allows. On the `ordent.pl` cutover the file becomes
authoritative at its root and the policy in §1 takes effect.

The cutover itself is **blocked** — no DNS yet. Per `docs/DOMAIN-CUTOVER.md`, **`SITE_URL` must
not change until `ordent.pl` resolves**, because flipping it early makes the live github.io site
advertise canonicals and a sitemap on a domain that does not resolve.

## 7. How to measure it

Use the signals that actually map to this business:

- **Google Search Console → Generative AI performance report.**
- The existing local metrics: local-pack impressions, calls, direction requests, `tel:` taps —
  see `docs/MEASUREMENT.md` §2/§4.

Do **not** trust third-party "AI visibility" scores. They measure whether a provider's crawler
was seen on your site, not whether a patient in Brodnica found you — and they are not the
north-star (qualified `tel:` calls).
