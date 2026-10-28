import { hours, mapsLink, nap, phones, ui } from '../data/site'
import MapEmbed from './MapEmbed'
import OpenBadge from './OpenBadge'

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
              <strong>{nap.name}</strong>
              <br />
              {nap.street}
              <br />
              {`${nap.postalCode} ${nap.city}`}
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
              <a
                className="btn btn--ghost btn--block contact__directions"
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ui.directions}
              </a>
            </p>

            <p className="contact__hours">
              <span className="contact__label">{ui.hoursLabel}</span> {hours} <OpenBadge />
            </p>

            <p className="callout">
              <strong>{ui.emergencyLabel}</strong>
              {' – '}
              <a href={phones[0].href}>{ui.emergency}</a>
            </p>
          </div>

          <MapEmbed />
        </div>
      </div>
    </section>
  )
}
