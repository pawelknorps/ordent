// Build-time SEO. None of this ships to the browser: the JSON-LD, the <noscript> fallback,
// robots.txt and sitemap.xml are all derived from the same data the page renders from, so the
// two cannot drift. SEO-only copy lives here on purpose — the config bundle costs nothing.
// The site address itself lives only in `src/data/site.ts`; `__SITE_URL__` in index.html is
// replaced below.
//
// `injectHead` is exported because vite-react-ssg reuses one index.html for every prerendered
// URL and re-applies it per route (see `ssgOptions.onBeforePageRender` in vite.config.ts).
import type { Plugin } from 'vite'
import { SITE_URL, geo, hours, mapsLink, nap, openingHours, phones } from './src/data/site.ts'
import { faq } from './src/data/faq.ts'
import { pages } from './src/data/pages.ts'
import { articles, type Article } from './src/data/poradnik.ts'
import { services, type Service } from './src/data/services.ts'
import {
  CENNIK_PATH,
  PORADNIK_PATH,
  ROUTES,
  articleByPath,
  articlePath,
  headFor,
  servicePath,
} from './src/pages/meta.ts'

const DESCRIPTION =
  'Pracownia protetyczna w Brodnicy. Protezy elastyczne, akrylowe i szkieletowe, korony i mosty, szyny, naprawy protez. Jako jedyni w mieście robimy protezy elastyczne.'

// The day the eight poradnik articles were written. Publish dates never move: do not bump this.
const ARTICLE_PUBLISHED = '2026-10-28'

// Bump whenever any page's copy changes: every sitemap <url> carries this as its <lastmod>, and
// article nodes use it as `dateModified`.
const CONTENT_UPDATED = '2026-10-28'

// Explicitly allowed so this site can be surfaced/cited in AI answers. Training-only crawlers
// (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot, Amazonbot, Bytespider) stay
// governed by `*` on purpose: blocking them is a data-use choice that does not affect whether
// the site is cited. The retired tokens anthropic-ai / Claude-Web must not be emitted.
const AI_CRAWLERS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Meta-WebIndexer',
  'Amzn-SearchBot',
  'Googlebot',
  'Bingbot',
  'Applebot',
]

// „Cena: 200 – 600 zł" → { minPrice: 200, maxPrice: 600 }. An unexpected format fails the build
// rather than silently dropping the offer from the structured data.
function priceSpec(price: string) {
  const m = /^Cena: (\d+) – (\d+) zł$/.exec(price)
  if (!m) throw new Error(`seo-plugin: unrecognised price "${price}"`)
  return {
    '@type': 'PriceSpecification',
    priceCurrency: 'PLN',
    minPrice: Number(m[1]),
    maxPrice: Number(m[2]),
  }
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}#ordent`,
  name: `${nap.name} – Pracownia protetyczna`,
  description: DESCRIPTION,
  url: SITE_URL,
  sameAs: mapsLink,
  image: `${SITE_URL}og.jpg`,
  telephone: phones.map((p) => p.href.replace('tel:', '')),
  priceRange: '50–3400 PLN',
  address: {
    '@type': 'PostalAddress',
    streetAddress: nap.street,
    postalCode: nap.postalCode,
    addressLocality: nap.city,
    addressRegion: nap.region,
    addressCountry: nap.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: geo.latitude, longitude: geo.longitude },
  openingHoursSpecification: openingHours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.day,
    opens: h.opens,
    closes: h.closes,
  })),
  founder: [
    { '@type': 'Person', name: 'Dariusz Orłowski' },
    { '@type': 'Person', name: 'Marek Orłowski' },
  ],
  areaServed: { '@type': 'City', name: nap.city },
  // Only the services carrying a price become offers — same three as before.
  makesOffer: services.flatMap((s) =>
    s.price
      ? [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title },
            priceCurrency: 'PLN',
            priceSpecification: priceSpec(s.price),
          },
        ]
      : [],
  ),
}

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

// A literal `<` in the data would close the script element early.
const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

// Marks the scripts this plugin injects, so a second pass over an already-injected document
// replaces them instead of stacking a duplicate block.
const LD_ATTR = ' data-ordent-ld'

// `@id` reference back to the LocalBusiness node declared on `/`. No `AggregateRating`, and the
// type stays `Service` — see the schema policy in ADR-001.
function serviceLd(s: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.seo.description,
    url: `${SITE_URL}${servicePath(s).slice(1)}`,
    areaServed: { '@type': 'City', name: nap.city },
    provider: { '@type': 'LocalBusiness', '@id': `${SITE_URL}#ordent`, name: nap.name },
    ...(s.price
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'PLN',
            priceSpecification: priceSpec(s.price),
          },
        }
      : {}),
  }
}

// The article page's own node. `publisher` points back at the `#ordent` @id declared on `/`;
// no `author` — the lab owner writes these, and inventing one would be untrue. No
// `AggregateRating`, per the schema policy in ADR-001.
function articleLd(a: Article) {
  const url = `${SITE_URL}${articlePath(a).slice(1)}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.seo.description,
    url,
    datePublished: ARTICLE_PUBLISHED,
    dateModified: CONTENT_UPDATED,
    inLanguage: 'pl',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    publisher: { '@type': 'LocalBusiness', '@id': `${SITE_URL}#ordent`, name: nap.name },
  }
}

const breadcrumb = (trail: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
})

const urlOf = (path: string) => `${SITE_URL}${path.slice(1)}`

// The two index pages' breadcrumb label is the same string they use as their H1, so the trail
// cannot drift from the page it describes.
const INDEX_TRAIL: Record<string, string> = {
  [CENNIK_PATH]: pages[CENNIK_PATH].h1,
  [PORADNIK_PATH]: pages[PORADNIK_PATH].h1,
}

// Home keeps the LocalBusiness + FAQ nodes it has always had. Service pages get Service +
// BreadcrumbList, whose `provider` points back at the `#ordent` @id declared on `/`. The two
// index pages get a two-item BreadcrumbList of their own; article pages get Article plus a
// three-item trail. No BreadcrumbList on `/` — a one-item trail is not a breadcrumb.
function structuredData(route: string): unknown[] {
  if (route === '/') return [localBusiness, faqPage]

  const index = INDEX_TRAIL[route]
  if (index)
    return [breadcrumb([{ name: 'Start', url: SITE_URL }, { name: index, url: urlOf(route) }])]

  const article = articles.find((a) => articlePath(a) === route)
  if (article)
    return [
      articleLd(article),
      breadcrumb([
        { name: 'Start', url: SITE_URL },
        { name: pages[PORADNIK_PATH].h1, url: urlOf(PORADNIK_PATH) },
        { name: article.title, url: urlOf(route) },
      ]),
    ]

  const service = services.find((s) => servicePath(s) === route)
  if (!service) return []

  return [
    serviceLd(service),
    breadcrumb([
      { name: 'Start', url: SITE_URL },
      { name: 'Cennik', url: urlOf(CENNIK_PATH) },
      { name: service.title, url: urlOf(route) },
    ]),
  ]
}

const attr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Replaces the template's `<title>`, description, canonical and og:* tags with the copy for
 * `path` and appends its JSON-LD. Idempotent: safe to run on a document a previous pass
 * already handled (the client build, the dev server, then every prerendered page).
 */
export function injectHead(html: string, path: string): string {
  const { path: route, title, description, canonical } = headFor(path)
  let out = html.replaceAll('__SITE_URL__', SITE_URL)
  const set = (re: RegExp, value: string) =>
    (out = out.replace(re, (_m, a: string, b: string) => a + attr(value) + b))

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${attr(title)}</title>`)
  set(/(<meta name="description" content=")[^"]*(")/, description)
  set(/(<meta property="og:title" content=")[^"]*(")/, title)
  set(/(<meta property="og:description" content=")[^"]*(")/, description)
  set(/(<meta name="twitter:title" content=")[^"]*(")/, title)
  set(/(<meta name="twitter:description" content=")[^"]*(")/, description)
  set(/(<link rel="canonical" href=")[^"]*(")/, canonical)
  set(/(<meta property="og:url" content=")[^"]*(")/, canonical)
  set(/(<meta property="og:type" content=")[^"]*(")/, articleByPath(route) ? 'article' : 'website')

  out = out.replace(/<script type="application\/ld\+json" data-ordent-ld>[\s\S]*?<\/script>/g, '')
  const nodes = structuredData(route)
  return nodes.length
    ? out.replace(
        '</head>',
        `${nodes.map((n) => `<script type="application/ld+json"${LD_ATTR}>${jsonLd(n)}</script>`).join('')}</head>`,
      )
    : out
}

// Every route now prerenders its own <h1>, so the stub is a contact fallback only.
const NOSCRIPT = `<p>${nap.name} – pracownia protetyczna w Brodnicy</p>
<p>${nap.street}<br />${nap.postalCode} ${nap.city}</p>
<p>${phones.map((p) => `<a href="${p.href}">${p.display}</a>`).join('<br />')}</p>
<p>${hours}</p>`

const priority = (path: string) =>
  path === '/'
    ? '1.0'
    : path === CENNIK_PATH
      ? '0.9'
      : path === PORADNIK_PATH
        ? '0.5'
        : path.startsWith(PORADNIK_PATH)
          ? '0.6'
          : '0.8'

export default function seo(): Plugin {
  return {
    name: 'ordent-seo',
    transformIndexHtml(html, ctx) {
      return {
        html: injectHead(html, ctx.path),
        tags: [{ tag: 'noscript', children: NOSCRIPT, injectTo: 'body-prepend' }],
      }
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\n${AI_CRAWLERS.map(
          (ua) => `User-agent: ${ua}\nAllow: /`,
        ).join('\n\n')}\n\nSitemap: ${SITE_URL}sitemap.xml\n`,
      })
      const urls = ROUTES.map(
        (path) =>
          `  <url>\n    <loc>${urlOf(path)}</loc>\n    <lastmod>${CONTENT_UPDATED}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>${priority(path)}</priority>\n  </url>`,
      ).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}
