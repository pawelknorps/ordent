// Route paths and per-route <head> copy for the prerendered URLs (ADR-001). Pure data: both
// the browser bundle (routes.tsx, pages/**) and the build-time SEO plugin import it, so it
// must stay free of React and of `import.meta.env`.
//
// Imports carry explicit `.ts` extensions because tsconfig.node.json compiles this file under
// `module: nodenext` as part of the Vite config program.
import { pages } from '../data/pages.ts'
import { services, type Service } from '../data/services.ts'
import { nap, SITE_URL } from '../data/site.ts'

export const CENNIK_PATH = '/cennik/'
export const PORADNIK_PATH = '/poradnik/'

type Extras = { slug?: string; seo?: { title?: string; description?: string } }
// `slug`/`seo` live on `Service` today; the optional reads keep a mid-flight data edit from
// breaking the build.
const extras = (s: Service) => s as Service & Extras

export const serviceSlug = (s: Service) => extras(s).slug ?? s.id
export const servicePath = (s: Service) => `/uslugi/${serviceSlug(s)}/`

/** Every URL the build emits, in sitemap order. */
export const ROUTES = ['/', CENNIK_PATH, ...services.map(servicePath), PORADNIK_PATH]

export type Head = { path: string; title: string; description: string; canonical: string }

const BASE = new URL(SITE_URL).pathname

/** `/ordent/uslugi/x/`, `/uslugi/x/index.html` and `/uslugi/x` all resolve to `/uslugi/x/`. */
export function normalizePath(path: string): string {
  let p = path.replace(/[?#].*$/, '')
  if (BASE !== '/' && p.startsWith(BASE)) p = '/' + p.slice(BASE.length)
  if (p.endsWith('index.html')) p = p.slice(0, -'index.html'.length)
  const slashed = p.startsWith('/') ? p : `/${p}`
  return slashed === '/' || slashed.endsWith('/') ? slashed : `${slashed}/`
}

export function serviceByPath(path: string): Service | undefined {
  const route = normalizePath(path)
  return services.find((s) => servicePath(s) === route)
}

export function headFor(path: string): Head {
  const route = normalizePath(path)
  const canonical = `${SITE_URL}${route.slice(1)}`

  const service = serviceByPath(route)
  if (service) {
    const seo = extras(service).seo
    return {
      path: route,
      canonical,
      title: seo?.title ?? `${service.title} – ${nap.city} | ORDENT`,
      description:
        seo?.description ?? `${service.tagline} — pracownia protetyczna ORDENT w ${nap.city}.`,
    }
  }

  const page = pages[route] ?? pages['/']
  return { path: route, canonical, title: page.title, description: page.description }
}
