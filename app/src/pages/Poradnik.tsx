import CallBar from '../components/CallBar'
import { pages } from '../data/pages'
import { articles } from '../data/poradnik'
import { asset } from '../lib/asset'
import { CENNIK_PATH, PORADNIK_PATH, articlePath } from './meta'

// Index of the published articles, each linking to its own prerendered URL. The cards lead with
// the short summary rather than the FAQ answer, so this page does not duplicate the homepage
// copy the ADR warns against.
export default function Poradnik() {
  const page = pages[PORADNIK_PATH]

  return (
    <main className="section">
      <div className="container">
        <nav aria-label="Główna">
          <a className="wordmark" href={asset('/')}>ORDENT</a>
        </nav>

        <div className="section__head">
          <h1>{page.h1}</h1>
          <p>{page.description}</p>
        </div>

        <div className="services__grid">
          {articles.map((article) => (
            <article className="svc-card" key={article.slug}>
              <h2 className="svc-card__title">
                <a href={asset(articlePath(article))}>{article.title}</a>
              </h2>
              <p className="svc-card__tagline">{article.summary}</p>
            </article>
          ))}
        </div>

        <p>
          <a href={asset(CENNIK_PATH)}>Pełny cennik</a>
        </p>
      </div>
      {/* The sub-pages render no App shell, so the fixed call bar is mounted here; a small
          screen would otherwise reserve the call-bar padding (see sections.css) for nothing. */}
      <CallBar />
    </main>
  )
}
