# DOMAIN CUTOVER — connecting `ordent.pl`

The site currently deploys to `https://pawelknorps.github.io/ordent/` and **`SITE_URL` in
`app/src/data/site.ts` points there**. That one constant drives everything: `vite.config.ts`'s
`base` (`new URL(SITE_URL).pathname`), the canonical and `og:url` in `index.html`, the JSON-LD
`@id`/`url`/`image` in `seo-plugin.ts`, `robots.txt`'s sitemap line, and the `sitemap.xml`
`<loc>`.

**Do not change it before the DNS is live.** Doing so makes the currently-live github.io site
advertise canonicals and a sitemap on a domain that does not resolve yet — which can get the
pages dropped from the index that we are trying to build.

---

## Preconditions

- [ ] `ordent.pl` DNS resolves to GitHub Pages.
- [ ] HTTPS certificates have been issued (GitHub takes minutes to hours after the domain is
      saved; wait for it before touching `SITE_URL`).

---

## Cutover steps (one commit, in this order)

1. **`app/public/CNAME`** — create it containing exactly one line: `ordent.pl`.
   (Absent today; the workflow uploads `app/dist`, so the file must live in `public/` to be
   copied through. GitHub also writes this file itself when the custom domain is set in the
   UI — having it in the repo keeps deploys from wiping the setting.)
2. **`app/src/data/site.ts`** — change `SITE_URL` to `'https://ordent.pl/'`.
   Nothing else in the repo needs editing; `base` becomes `/` on its own.
3. **GitHub → Settings → Pages** — set the custom domain to `ordent.pl`, then enable
   **Enforce HTTPS**. Configure the `www` → apex redirect if `www.ordent.pl` is also to work.
4. Commit and let the deploy workflow run.

## Verify on the live site (not on the local build)

- [ ] `https://ordent.pl/` loads over HTTPS with no certificate warning.
- [ ] `https://ordent.pl/robots.txt` → `Sitemap: https://ordent.pl/sitemap.xml`.
- [ ] `https://ordent.pl/sitemap.xml` → every `<loc>` uses the apex domain.
- [ ] View source: `<link rel="canonical">` and `og:url` are `https://ordent.pl/`.
- [ ] View source: the JSON-LD block's `@id`, `url` and `image` use the apex domain.
- [ ] CSS, JS and `/img/*` requests are **not** 404 — i.e. they resolve from `/`, not from
      `/ordent/`. This is the failure mode a wrong `base` produces.
- [ ] `http://ordent.pl` and `https://www.ordent.pl` both land on `https://ordent.pl/`.
- [ ] **Verify the `geo` coordinates** in `site.ts` against the GBP pin on the map before
      trusting them — they were taken from the original embed and never checked.

## Immediately after

- [ ] Google Search Console: add the **domain property** for `ordent.pl`, submit the sitemap,
      request indexing for `/` (see `docs/MEASUREMENT.md`). Remove/ignore any leftover
      `github.io` property so the reports are clean.
- [ ] Google Business Profile: set the website to `https://ordent.pl/` (it is empty today).
- [ ] Citations: make the URL and NAP identical on Panorama Firm, PKT.pl, Aleo, Bing Places
      and Apple Business Connect.
- [ ] Analytics: set `VITE_ANALYTICS_SRC` / `VITE_ANALYTICS_DOMAIN` to the live domain and
      redeploy, so hits are attributed to `ordent.pl` from day one.

## Rollback

Revert `SITE_URL` to `https://pawelknorps.github.io/ordent/`, delete `app/public/CNAME`,
redeploy. The github.io site is unaffected throughout, so this is always available.

## One-line summary

`SITE_URL` + `CNAME` + the Pages custom-domain setting. If you find yourself editing a second
place for the address, the single-source rule has been broken — fix that instead.
