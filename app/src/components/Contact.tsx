import { hours, phones, ui } from '../data/site'
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
              {phones.map((phone, i) => (
                <a
                  key={phone.href}
                  className={i === 0 ? 'btn btn--primary btn--block' : 'btn btn--ghost btn--block'}
                  href={phone.href}
                >
                  {phone.display}
                </a>
              ))}
            </p>

            <p className="contact__hours">
              <span className="contact__label">{ui.hoursLabel}</span> {hours}
            </p>

            <p className="callout">
              <strong>{ui.emergencyLabel}</strong> – {ui.emergency}
            </p>
          </div>

          <MapEmbed />
        </div>
      </div>
    </section>
  )
}
