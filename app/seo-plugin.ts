// Build-time SEO. None of this ships to the browser: the JSON-LD, the <noscript> fallback,
// robots.txt and sitemap.xml are all derived from the same data the page renders from, so the
// two cannot drift. SEO-only copy lives here on purpose — the config bundle costs nothing.
// The site address itself lives only in `src/data/site.ts`; `__SITE_URL__` in index.html is
// replaced below.
import type { Plugin } from 'vite'
import { SITE_URL, geo, hours, mapsLink, nap, openingHours, phones } from './src/data/site.ts'
import { faq } from './src/data/faq.ts'
import { services } from './src/data/services.ts'

const DESCRIPTION =
  'Pracownia protetyczna w Brodnicy. Protezy elastyczne, akrylowe i szkieletowe, korony i mosty, szyny, naprawy protez. Jako jedyni w mieście robimy protezy elastyczne.'

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

const NOSCRIPT = `<h1>${nap.name} – pracownia protetyczna w Brodnicy</h1>
<p>${nap.street}<br />${nap.postalCode} ${nap.city}</p>
<p>${phones.map((p) => `<a href="${p.href}">${p.display}</a>`).join('<br />')}</p>
<p>${hours}</p>
<p>Pełna treść strony wymaga włączonego JavaScriptu.</p>`

export default function seo(): Plugin {
  return {
    name: 'ordent-seo',
    transformIndexHtml(html) {
      return {
        html: html.replaceAll('__SITE_URL__', SITE_URL),
        tags: [
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: jsonLd(localBusiness),
            injectTo: 'head',
          },
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: jsonLd(faqPage),
            injectTo: 'head',
          },
          { tag: 'noscript', children: NOSCRIPT, injectTo: 'body-prepend' },
        ],
      }
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${SITE_URL}</loc>\n    <changefreq>yearly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
      })
    },
  }
}
