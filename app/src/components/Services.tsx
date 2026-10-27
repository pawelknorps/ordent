import type { CSSProperties, MouseEvent } from 'react'
import { services } from '../data/services'
import { ui } from '../data/site'
import { asset } from '../lib/asset'
import ServiceDialog from './ServiceDialog'

const LEAD =
  'Protezy to ruchome uzupełnienia protetyczne, które odtwarzają brakujące tkanki jamy ustnej — od jednego zęba po całe uzębienie. Inaczej niż prace stałe, osadzane trwale, protezę ruchomą pacjent sam wyjmuje i zakłada. Wracają estetyka uśmiechu oraz komfort gryzienia i mówienia.'

export default function Services() {
  // One delegated listener for every service dialog; the trigger points at its dialog via aria-controls.
  function handleClick(e: MouseEvent<HTMLElement>) {
    const trigger = (e.target as HTMLElement).closest<HTMLElement>('[aria-haspopup="dialog"]')
    if (!trigger) return
    const id = trigger.getAttribute('aria-controls')
    if (id) (document.getElementById(id) as HTMLDialogElement | null)?.showModal()
  }

  return (
    <section id="services" aria-labelledby="services-title" className="section services" onClick={handleClick}>
      <div className="container">
        <div className="section__head reveal">
          <h2 id="services-title" className="section__title">
            Co robimy
          </h2>
          <p className="services__lead">{LEAD}</p>
        </div>

        <div className="services__grid">
          {services.map((s) => (
            <article className={s.flag ? 'svc-card svc-card--flag reveal' : 'svc-card reveal'} key={s.id}>
              <span className="svc-card__chip">
                <span
                  className="icon svc-card__icon"
                  aria-hidden="true"
                  style={{ '--i': `url(${asset(`/img/icons/${s.icon}`)})` } as CSSProperties}
                />
              </span>
              {s.flag && <p className="svc-card__flag">{ui.flagBadge}</p>}
              <h3 className="svc-card__title">{s.title}</h3>
              <p className="svc-card__tagline">{s.tagline}</p>
              <div className="svc-card__foot">
                {s.price && <p className="svc-card__price">{s.price}</p>}
                <button
                  type="button"
                  className="svc-card__more"
                  aria-haspopup="dialog"
                  aria-controls={`d-${s.id}`}
                >
                  Szczegóły
                  <span className="svc-card__arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {services.map((s) => (
        <ServiceDialog key={s.id} service={s} />
      ))}
    </section>
  )
}
