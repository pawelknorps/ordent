import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import PageShell from '../components/PageShell'
import { pages } from '../data/pages'
import { articles, type Article } from '../data/poradnik'
import { services } from '../data/services'
import { phones } from '../data/site'
import { asset } from '../lib/asset'
import { CENNIK_PATH, PORADNIK_PATH, articlePath, servicePath } from './meta'

// Full article copy on its own indexable URL, one per /poradnik/<slug>/ (ADR-001). Everything
// here comes from the article data — the owner-written FAQ answer plus the service paragraphs;
// the page adds only the framing, never a new fact.
export default function PoradnikArticle({ article }: { article: Article }) {
  const related = services.filter((s) => article.related.includes(s.slug))
  const relatedArticles = article.relatedArticles.map(
    (slug) => articles.find((a) => a.slug === slug)!,
  )

  return (
    <PageShell
      trail={[
        { name: 'Start', href: asset('/') },
        { name: pages[PORADNIK_PATH].h1, href: asset(PORADNIK_PATH) },
        { name: article.title, href: asset(articlePath(article)) },
      ]}
    >
      <div className="page-head">
        <h1>{article.title}</h1>
        <p className="lead">{article.summary}</p>
      </div>

      <div className="svc-page">
        <article className="svc-page__body">
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
        <aside className="svc-page__aside">
          <div className="price-box">
            <a className="btn btn--primary btn--block" href={phones[0].href}>Zadzwoń: {phones[0].display}</a>
            <a className="btn btn--ghost btn--block" href={asset(CENNIK_PATH)}>Pełny cennik</a>
          </div>
        </aside>
      </div>

      <section className="others" aria-labelledby="see-also-title">
        <h2 id="see-also-title">Zobacz też</h2>
        <div className="services__grid">
          <a className="svc-card" href={asset(PORADNIK_PATH)}>
            <h3 className="svc-card__title">Wszystkie artykuły poradnika</h3>
          </a>
          <a className="svc-card" href={asset(CENNIK_PATH)}>
            <h3 className="svc-card__title">Pełny cennik</h3>
          </a>
          {relatedArticles.map((a) => (
            <a className="svc-card" key={a.slug} href={asset(articlePath(a))}>
              <h3 className="svc-card__title">{a.title}</h3>
              <p className="svc-card__tagline">{a.summary}</p>
            </a>
          ))}
          {related.map((service) => (
            <a className="svc-card" key={service.id} href={asset(servicePath(service))}>
              <span className="svc-card__chip">
                <span
                  className="icon svc-card__icon"
                  aria-hidden="true"
                  style={{ '--i': `url(${asset(`/img/icons/${service.icon}`)})` } as CSSProperties}
                />
              </span>
              <h3 className="svc-card__title">{service.title}</h3>
              <p className="svc-card__tagline">{service.tagline}</p>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
