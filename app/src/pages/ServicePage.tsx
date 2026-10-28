import CallBar from '../components/CallBar'
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
    <main className="section">
      <div className="container">
        <nav aria-label="Główna">
          <a className="wordmark" href={asset('/')}>ORDENT</a>
        </nav>

        <div className="section__head">
          <h1>{service.title}</h1>
          <p className="services__lead">{service.tagline}</p>
        </div>

        <article className="svc-card">
          {service.detail.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <PriceList service={service} />
          <a className="btn btn--primary" href={phones[0].href}>Zadzwoń: {phones[0].display}</a>
        </article>

        <nav className="nav" aria-label="Cennik i pozostałe usługi">
          <h2>Cennik i pozostałe usługi</h2>
          <ul className="nav__list">
            <li>
              <a href={asset(CENNIK_PATH)}>Pełny cennik</a>
            </li>
            {others.map((other) => (
              <li key={other.id}>
                <a href={asset(servicePath(other))}>{other.title}</a>
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
