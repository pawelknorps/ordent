import CallBar from '../components/CallBar'
import { pages } from '../data/pages'
import { services } from '../data/services'
import { phones } from '../data/site'
import { asset } from '../lib/asset'
import { CENNIK_PATH, PORADNIK_PATH, servicePath } from './meta'
import PriceList from './PriceList'

// The whole price sheet on one indexable URL (ADR-001). Every row comes from services.ts; a
// service without a price states that instead of inventing one.
export default function Cennik() {
  const page = pages[CENNIK_PATH]

  return (
    <main className="section">
      <div className="container">
        <nav aria-label="Główna">
          <a className="wordmark" href={asset('/')}>ORDENT</a>
        </nav>

        <div className="section__head">
          <h1>{page.h1}</h1>
          <p>{page.description}</p>
          <p>
            Cennik obowiązuje w pracowni w Brodnicy. Zadzwoń, żeby potwierdzić termin:{' '}
            <a href={phones[0].href}>{phones[0].display}</a>.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service) => (
            <article className="svc-card" key={service.id}>
              <h2 className="svc-card__title">{service.title}</h2>
              <p className="svc-card__tagline">{service.tagline}</p>
              <PriceList service={service} />
              <a className="btn btn--ghost" href={asset(servicePath(service))}>
                {service.title} — szczegóły
              </a>
            </article>
          ))}
        </div>

        <p>
          <a href={asset(PORADNIK_PATH)}>Poradnik pacjenta</a>
        </p>
      </div>
      {/* The sub-pages render no App shell, so the fixed call bar is mounted here; a small
          screen would otherwise reserve the call-bar padding (see sections.css) for nothing. */}
      <CallBar />
    </main>
  )
}
