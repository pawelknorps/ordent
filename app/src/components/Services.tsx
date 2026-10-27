import type { CSSProperties, MouseEvent } from 'react'
import { services } from '../data/services'
import { asset } from '../lib/asset'
import ServiceDialog from './ServiceDialog'

const LEAD =
  'Protezy – to ruchome uzupełnienia protetyczne, odtwarzające brakujące tkanki jamy ustnej pacjenta. Proteza może zastąpić jednego zęba, jak również całe uzębienie. W przeciwieństwie do protez stałych, gdzie odbudowa zęba polega na zacementowaniu na stałe pracy protetycznej, protezy ruchome są wyciągane z jamy ustnej przez samego pacjenta. Pełnią funkcję estetyczną oraz funkcjonalną, dając piękny uśmiech i umożliwiając gryzienie i przeżuwanie pokarmów.'

export default function Services() {
  // One delegated listener for all 8 dialogs; the trigger points at its dialog via aria-controls.
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
            <article className="svc-card reveal" key={s.id}>
              <span
                className="icon svc-card__icon"
                aria-hidden="true"
                style={{ '--i': `url(${asset(`/img/icons/${s.icon}`)})` } as CSSProperties}
              />
              <h3 className="svc-card__title">{s.title}</h3>
              <p className="svc-card__tagline">{s.tagline}</p>
              {s.price && <p className="svc-card__price">{s.price}</p>}
              <button
                type="button"
                className="btn btn--ghost svc-card__more"
                aria-haspopup="dialog"
                aria-controls={`d-${s.id}`}
              >
                Szczegóły
              </button>
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
