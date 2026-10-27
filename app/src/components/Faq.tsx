import { faq } from '../data/faq'

// Exclusive accordion via the native `name` attribute — no JS.
export default function Faq() {
  return (
    <section id="FAQ" aria-labelledby="faq-title" className="section faq-section">
      <div className="container">
        <div className="section__head reveal">
          <h2 id="faq-title" className="section__title">
            Pytania i odpowiedzi
          </h2>
        </div>

        <div className="faq">
          {faq.map((item) => (
            <details className="faq__item reveal" name="faq" key={item.q}>
              <summary>
                <h3>{item.q}</h3>
                <span className="faq__glyph" aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
