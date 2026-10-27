import { mapsLink } from '../data/site'
import { reviews } from '../data/reviews'

export default function Opinie() {
  return (
    <section id="opinie" aria-labelledby="opinie-title" className="section opinie">
      <div className="container">
        <div className="section__head reveal">
          <h2 id="opinie-title" className="section__title">
            Opinie
          </h2>
          <p>Zachęcamy do zapoznania się z opiniami o naszej pracowni w Google.</p>
        </div>

        {reviews.length > 0 && (
          <ul className="opinie__list">
            {reviews.map((r) => (
              <li className="opinie__item reveal" key={`${r.author}-${r.date}`}>
                <blockquote>{r.text}</blockquote>
                <p className="opinie__meta">
                  <span className="opinie__author">{r.author}</span>
                  <span className="opinie__rating">
                    <span aria-hidden="true">{'★'.repeat(r.rating)}</span>
                    <span className="visually-hidden">{r.rating} na 5</span>
                  </span>
                  <span className="opinie__date">{r.date}</span>
                </p>
              </li>
            ))}
          </ul>
        )}

        {/* Google pokazuje anonimowo tylko część opinii — link zostaje także przy wypełnionej liście. */}
        <p className="opinie__more reveal">
          <a className="btn btn--ghost" href={mapsLink} target="_blank" rel="noopener noreferrer">
            Zobacz opinie w Google
          </a>
        </p>
      </div>
    </section>
  )
}
