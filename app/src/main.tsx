import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import { initAnalytics } from './lib/analytics'

// `basename` must be the deploy sub-path. vite-react-ssg defaults it to "/" — it does not read
// Vite's base — so on GitHub Pages (/ordent/) the client router would match no route, log a
// hydration mismatch and replace the prerendered page with React Router's 404 boundary.
export const createRoot = ViteReactSSG(
  { routes, basename: import.meta.env.BASE_URL },
  ({ isClient }) => {
    if (!isClient) return
    initAnalytics()
    // App-wide behaviours, applied after render (DESIGN-SPEC §4.1 / §5).
    // Skipped entirely for visitors who ask for reduced motion.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.scrollBehavior = 'smooth'

      let tries = 0
      const start = () => {
        const reveals = document.querySelectorAll<HTMLElement>('.reveal')
        // React may not have committed the tree yet — wait a few frames.
        if (!reveals.length && ++tries < 30) {
          requestAnimationFrame(start)
          return
        }
        const io = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const el = entry.target as HTMLElement
            const scope = el.closest('section, footer, header') ?? document.body
            const index = Array.from(scope.querySelectorAll<HTMLElement>('.reveal')).indexOf(el)
            el.style.transitionDelay = `${Math.min(index, 10) * 60}ms`
            el.classList.add('is-in')
            io.unobserve(el)
          }
        }, { rootMargin: '0px 0px -10% 0px' })
        reveals.forEach((el) => io.observe(el))
      }
      requestAnimationFrame(start)
    }
  },
)
