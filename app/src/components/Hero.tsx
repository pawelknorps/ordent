import { pages } from '../data/pages'
import { ui } from '../data/site'
import { asset } from '../lib/asset'

export default function Hero() {
  return (
    <section id="banner" className="hero" aria-labelledby="hero-title">
      {/* stock clinical photo (slides/1.jpg), not our own work → decorative.
          Variants come from tools/build-assets.py (HERO_WIDTHS); this is the LCP image, so it is
          eager with high priority and its crop matches the old CSS background (object-position 50% 30%). */}
      <picture className="hero__media">
        <source
          type="image/webp"
          srcSet={`${asset('/img/hero-480.webp')} 480w, ${asset('/img/hero-960.webp')} 960w, ${asset('/img/hero-1900.webp')} 1900w`}
          sizes="100vw"
        />
        <img
          className="hero__img"
          src={asset('/img/hero-960.jpg')}
          srcSet={`${asset('/img/hero-480.jpg')} 480w, ${asset('/img/hero-960.jpg')} 960w, ${asset('/img/hero-1900.jpg')} 1900w`}
          sizes="100vw"
          width={1900}
          height={750}
          alt=""
          loading="eager"
          fetchPriority="high"
        />
      </picture>
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 id="hero-title">{pages['/'].h1}</h1>
          {/* source hero slide 2 copy — survives nowhere else; About's <h2> owns the display-5 line */}
          <p className="hero__lede">{'Protezy elastyczne, akrylowe i szkieletowe – pracownia protetyczna w Brodnicy.'}</p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#contact">{'Skontaktuj się'}</a>
            <a className="btn btn--ghost" href="#services">{ui.heroSecondary}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
