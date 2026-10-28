import type { ReactNode } from 'react'
import CallBar from './CallBar'
import Footer from './Footer'
import Header from './Header'

export type Crumb = { name: string; href: string }

// The header/footer shell the homepage owns, for the four sub-page routes. `trail` must match
// the BreadcrumbList seo-plugin.ts emits for the same route, so the trail a reader sees and the
// trail a crawler reads cannot drift.
export default function PageShell({ trail, children }: { trail: Crumb[]; children: ReactNode }) {
  return (
    <>
      <Header subpage />
      <main id="content" tabIndex={-1} className="section">
        <div className="container">
          <nav className="crumbs" aria-label="Ścieżka nawigacji">
            <ol>
              {trail.map((crumb, i) => (
                <li key={crumb.href}>
                  {i === trail.length - 1 ? <span aria-current="page">{crumb.name}</span> : <a href={crumb.href}>{crumb.name}</a>}
                </li>
              ))}
            </ol>
          </nav>
          {children}
        </div>
      </main>
      <Footer subpage />
      <CallBar />
    </>
  )
}
