import PageShell from '../components/PageShell'
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
    <PageShell
      trail={[
        { name: 'Start', href: asset('/') },
        { name: page.h1, href: asset(CENNIK_PATH) },
      ]}
    >
      <div className="page-head">
        <h1>{page.h1}</h1>
        <p className="lead">{page.description}</p>
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

      <section className="others" aria-labelledby="see-also-title">
        <h2 id="see-also-title">Zobacz też</h2>
        <div className="services__grid">
          <a className="svc-card" href={asset(PORADNIK_PATH)}>
            <h3 className="svc-card__title">Poradnik pacjenta</h3>
            <p className="svc-card__tagline">{pages[PORADNIK_PATH].description}</p>
          </a>
        </div>
      </section>
    </PageShell>
  )
}
