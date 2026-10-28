// Cookieless, provider-agnostic analytics. Default provider: Plausible (use Umami the same way —
// swap the script URL and it also reads `data-domain`). Cookieless ⇒ no cookies, no personal data,
// no consent banner: state it once here and never add one.
// Configuration lives in the Vite env: VITE_ANALYTICS_SRC (script URL) and VITE_ANALYTICS_DOMAIN.
// With VITE_ANALYTICS_SRC unset the module is completely inert — no script, no listener, no noise.
const src: string | undefined = import.meta.env.VITE_ANALYTICS_SRC
const domain: string | undefined = import.meta.env.VITE_ANALYTICS_DOMAIN

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void
  }
}

let started = false

// The number from a `tel:` href, or undefined for anything else. Pure.
export function phoneFromHref(href: string): string | undefined {
  return href.startsWith('tel:') ? href.slice(4) : undefined
}

export function track(event: string, props?: Record<string, string | number>): void {
  if (typeof window === 'undefined') return
  try {
    window.plausible?.(event, props ? { props } : undefined)
  } catch {
    // A third-party script must never break the page.
  }
}

function onClick(e: MouseEvent): void {
  if (!(e.target instanceof Element)) return
  const href = e.target.closest('a[href]')?.getAttribute('href')
  if (!href) return
  const phone = phoneFromHref(href)
  if (phone) {
    track('Call', { phone })
  } else if (href.includes('maps.google') || href.includes('google.com/maps')) {
    track('Directions')
  }
}

export function initAnalytics(): void {
  if (started || typeof document === 'undefined') return
  started = true
  if (!src) return
  const script = document.createElement('script')
  script.defer = true
  script.src = src
  if (domain) script.dataset.domain = domain
  document.head.appendChild(script)
  document.addEventListener('click', onClick)
}
