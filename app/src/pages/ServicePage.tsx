import type { CSSProperties } from 'react'
import PageShell from '../components/PageShell'
import type { Service } from '../data/services'
import { services } from '../data/services'
import { phones } from '../data/site'
import { asset } from '../lib/asset'
import { CENNIK_PATH, servicePath } from './meta'
import PriceList from './PriceList'

// Full service copy on its own indexable URL. The city lives in the <title> (service.seo), not
// in the path, per ADR-001.
export default function ServicePage({ service }: { service: Service }) {
  const others = services.filter((s) => s.id !== service.id)

  return (
    <PageShell
      trail={[
        { name: 'Start', href: asset('/') },
        { name: 'Cennik', href: asset(CENNIK_PATH) },
        { name: service.title, href: asset(servicePath(service)) },
      ]}
    >
      <div className="page-head">
        <h1>{service.title}</h1>
        <p className="lead">{service.tagline}</p>
      </div>

      <div className="svc-page">
        <article className="svc-page__body">
          {service.detail.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>
        <aside className="svc-page__aside">
          <div className="price-box">
            <PriceList service={service} />
            <a className="btn btn--primary btn--block" href={phones[0].href}>Zadzwoń: {phones[0].display}</a>
            <a className="btn btn--ghost btn--block" href={asset(CENNIK_PATH)}>Pełny cennik</a>
          </div>
        </aside>
      </div>

      <section className="others" aria-labelledby="others-title">
        <h2 id="others-title">Pozostałe usługi</h2>
        <div className="services__grid">
          {others.map((other) => (
            <a className="svc-card" key={other.id} href={asset(servicePath(other))}>
              <span className="svc-card__chip">
                <span
                  className="icon svc-card__icon"
                  aria-hidden="true"
                  style={{ '--i': `url(${asset(`/img/icons/${other.icon}`)})` } as CSSProperties}
                />
              </span>
              <h3 className="svc-card__title">{other.title}</h3>
              <p className="svc-card__tagline">{other.tagline}</p>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
