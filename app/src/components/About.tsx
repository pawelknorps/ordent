import { phones, hours, ui } from '../data/site'
import { asset } from '../lib/asset'

export default function About() {
  return (
    <section id="content-3-10" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        {/* stock clinical photo (slides/3.jpg), not our own work → decorative */}
        <img
          className="about__img reveal"
          src={asset('/img/about.jpg')}
          alt=""
          width="1200"
          height="900"
          loading="lazy"
        />
        <div className="about__body">
          <h2 id="about-title" className="section__title reveal">
            {'Laboratorium protetyczne z wieloletnim doświadczeniem'}
          </h2>
          <p className="reveal">{'Witamy na stronie naszego laboratorium. Cieszymy się, że z nami jesteś.'}</p>
          <div className="nap reveal">
            <dl className="nap__list">
              <dt>{ui.phoneLabel}</dt>
              <dd>
                {phones.map((phone, index) => (
                  <span key={phone.href}>
                    {index > 0 && ' lub '}
                    <a href={phone.href}>{phone.display}</a>
                  </span>
                ))}
              </dd>
              <dt>{ui.hoursLabel}</dt>
              <dd>{hours}</dd>
            </dl>
            <p className="callout">
              <strong>{ui.emergencyLabel}</strong>
              {` – ${ui.emergency}`}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
