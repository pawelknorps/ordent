import PageShell from '../components/PageShell'
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
    <PageShell
      trail={[
        { name: 'Start', href: asset('/') },
        { name: page.h1, href: asset(PORADNIK_PATH) },
      ]}
    >
      <div className="page-head">
        <h1>{page.h1}</h1>
        <p className="lead">{page.description}</p>
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

      <section className="others" aria-labelledby="see-also-title">
        <h2 id="see-also-title">Zobacz też</h2>
        <div className="services__grid">
          <a className="svc-card" href={asset(CENNIK_PATH)}>
            <h3 className="svc-card__title">Pełny cennik</h3>
            <p className="svc-card__tagline">{pages[CENNIK_PATH].description}</p>
          </a>
        </div>
      </section>
    </PageShell>
  )
}
