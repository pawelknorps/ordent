import { phones, hours, ui } from '../data/site'
import { asset } from '../lib/asset'
import OpenBadge from './OpenBadge'

export default function About() {
  return (
    <section id="content-3-10" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        {/* stock clinical photo (slides/3.jpg), not our own work → decorative.
            Variants come from tools/build-assets.py (ABOUT_WIDTHS); the <picture> carries the
            grid placement so the <img> inside it keeps the box rules. */}
        <picture className="about__media">
          <source
            type="image/webp"
            srcSet={`${asset('/img/about-480.webp')} 480w, ${asset('/img/about-960.webp')} 960w, ${asset('/img/about-1200.webp')} 1200w`}
            sizes="(min-width: 900px) 48vw, 100vw"
          />
          <img
            className="about__img reveal"
            src={asset('/img/about-960.jpg')}
            srcSet={`${asset('/img/about-480.jpg')} 480w, ${asset('/img/about-960.jpg')} 960w, ${asset('/img/about-1200.jpg')} 1200w`}
            sizes="(min-width: 900px) 48vw, 100vw"
            width={1200}
            height={900}
            alt=""
            loading="lazy"
          />
        </picture>
        <div className="about__body">
          <h2 id="about-title" className="section__title reveal">
            {'Laboratorium protetyczne z wieloletnim doświadczeniem'}
          </h2>
          <p className="reveal">{'Wykonujemy protezy zębowe, korony i mosty, szyny oraz naprawy protez.'}</p>
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
              <dd>
                {hours} <OpenBadge />
              </dd>
            </dl>
            <p className="callout">
              <strong>{ui.emergencyLabel}</strong>
              {' – '}
              <a href={phones[0].href}>{ui.emergency}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
