import MapEmbed from './MapEmbed'

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section contact-section">
      <div className="container">
        <div className="section__head reveal">
          <h2 id="contact-title" className="section__title">
            Skontaktuj się
          </h2>
          <p>Zapraszamy do kontaktu telefonicznego lub wizyty w pracowni.</p>
        </div>

        <div className="contact">
          <div className="contact__info reveal">
            <address className="contact__address">
              <strong>ORDENT</strong>
              <br />
              ul. Karola Szymanowskiego 33
              <br />
              87-301 Brodnica
            </address>

            <p className="contact__phones">
              <a className="btn btn--primary btn--block" href="tel:+48603053437">
                603 053 437
              </a>
              <a className="btn btn--primary btn--block" href="tel:+48601594229">
                601 594 229
              </a>
            </p>

            <p className="contact__hours">
              <span className="contact__label">Godziny otwarcia:</span> Pon–pt 10–17 · sob 10–13
            </p>

            <p className="callout">
              <strong>POGOTOWIE PROTETYCZNE</strong> – w nagłych wypadkach możliwe przyjęcie poza
              godzinami pracy.
            </p>
          </div>

          <MapEmbed />
        </div>
      </div>
    </section>
  )
}
