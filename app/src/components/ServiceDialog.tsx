import type { CSSProperties, MouseEvent } from 'react'
import type { Service } from '../data/services'
import { asset } from '../lib/asset'

// One native <dialog> per service, driven by Services.tsx's delegated click listener.
export default function ServiceDialog({ service }: { service: Service }) {
  const dialogId = `d-${service.id}`
  const titleId = `${dialogId}-t`

  // Backdrop click: the dialog itself is the target only when the padding area is hit.
  function handleBackdrop(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) e.currentTarget.close()
  }

  return (
    <dialog className="sheet sheet--svc" id={dialogId} aria-labelledby={titleId} onClick={handleBackdrop}>
      <div className="sheet__head">
        <span className="sheet__chip">
          <span
            className="icon sheet__chip-icon"
            aria-hidden="true"
            style={{ '--i': `url(${asset(`/img/icons/${service.icon}`)})` } as CSSProperties}
          />
        </span>
        <h3 id={titleId}>{service.title}</h3>
        <button
          type="button"
          className="sheet__close"
          aria-label="Zamknij"
          onClick={(e) => e.currentTarget.closest('dialog')?.close()}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="sheet__body">
        {service.detail.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {service.detail.priceList && (
          <dl className="price-list">
            {service.detail.priceList.map((row) => (
              <div className="price-list__row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.price}</dd>
              </div>
            ))}
          </dl>
        )}
        {service.detail.notes && (
          <div className="sheet__notes">
            {service.detail.notes.map((n, i) => (
              <p key={`n${i}`}>{n}</p>
            ))}
          </div>
        )}
      </div>
    </dialog>
  )
}
