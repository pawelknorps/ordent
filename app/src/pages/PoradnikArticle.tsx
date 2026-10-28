import { Fragment } from 'react'
import CallBar from '../components/CallBar'
import type { Article } from '../data/poradnik'
import { services } from '../data/services'
import { asset } from '../lib/asset'
import { CENNIK_PATH, PORADNIK_PATH, servicePath } from './meta'

// Full article copy on its own indexable URL, one per /poradnik/<slug>/ (ADR-001). Everything
// here comes from the article data — the owner-written FAQ answer plus the service paragraphs;
// the page adds only the framing, never a new fact.
export default function PoradnikArticle({ article }: { article: Article }) {
  const related = services.filter((s) => article.related.includes(s.slug))

  return (
    <main className="section">
      <div className="container">
        <nav aria-label="Główna">
          <a className="wordmark" href={asset('/')}>ORDENT</a>
        </nav>

        <div className="section__head">
          <h1>{article.title}</h1>
          <p className="services__lead">{article.summary}</p>
        </div>

        <article className="svc-card">
          <p>{article.opening}</p>
          {article.sections.map((section) => (
            <Fragment key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </Fragment>
          ))}
        </article>

        <nav className="nav" aria-label="Cennik, poradnik i powiązane usługi">
          <h2>Zobacz też</h2>
          <ul className="nav__list">
            <li>
              <a href={asset(PORADNIK_PATH)}>Wszystkie artykuły poradnika</a>
            </li>
            <li>
              <a href={asset(CENNIK_PATH)}>Pełny cennik</a>
            </li>
            {related.map((service) => (
              <li key={service.id}>
                <a href={asset(servicePath(service))}>{service.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* The sub-pages render no App shell, so the fixed call bar is mounted here; a small
          screen would otherwise reserve the call-bar padding (see sections.css) for nothing. */}
      <CallBar />
    </main>
  )
}
