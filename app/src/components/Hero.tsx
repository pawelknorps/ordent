import { ui } from '../data/site'

export default function Hero() {
  return (
    <section id="banner" className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 id="hero-title">{'Pracownia protetyczna'}</h1>
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
