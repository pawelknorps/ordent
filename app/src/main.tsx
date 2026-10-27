import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

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
