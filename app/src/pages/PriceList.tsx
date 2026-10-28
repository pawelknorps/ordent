import type { Service } from '../data/services'

// The price presentation the service dialog and the prerendered pages share, so /cennik/ and the
// service pages cannot drift from the copy in services.ts.
//
// A price list speaks for itself; the "ask us" line is only for a service that has neither a
// stated price nor a list (no price is invented). Notes come back as siblings, not wrapped, so
// the parent's flex gap spaces them.
export default function PriceList({ service }: { service: Service }) {
  const { price, detail } = service

  return (
    <>
      {!price && !detail.priceList && <p className="svc-card__price">Cena do ustalenia</p>}
      {price && <p className="svc-card__price">{price}</p>}
      {detail.priceList && (
        <dl className="price-list">
          {detail.priceList.map((row) => (
            <div className="price-list__row" key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.price}</dd>
            </div>
          ))}
        </dl>
      )}
      {detail.notes?.map((note, i) => (
        <p key={i}>{note}</p>
      ))}
    </>
  )
}
