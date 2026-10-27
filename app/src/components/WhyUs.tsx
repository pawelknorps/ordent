import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { usp, ui } from '../data/site'
import { asset } from '../lib/asset'

const mask = (file: string) => ({ '--i': `url(${asset(`/img/icons/${file}`)})` }) as CSSProperties

export default function WhyUs() {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function toggle() {
    const el = video.current
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }

  return (
    <section id="dlaczego-my" className="section whyus" aria-labelledby="whyus-title">
      <div className="container whyus__grid">
        <div className="whyus__video reveal">
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="none"
            poster={asset('/video/elastyczna-poster.jpg')}
            aria-label={ui.videoLabel}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            {/* mp4 first: Safari may claim webm support and fail to decode; H.264 is universal and only 210 kB here */}
            <source src={asset('/video/elastyczna-720.mp4')} type="video/mp4" />
            <source src={asset('/video/elastyczna-720.webm')} type="video/webm" />
          </video>
          <button type="button" className="video__toggle" onClick={toggle}>
            {playing ? ui.videoPause : ui.videoPlay}
          </button>
        </div>
        <div className="whyus__body">
          <h2 id="whyus-title" className="section__title reveal">{'Dlaczego my?'}</h2>
          <p className="whyus__usp reveal">
            <span className="icon" style={mask('011-dental-care.svg')} aria-hidden="true" />
            <strong>{usp}</strong>
          </p>
          <div className="whyus__bio reveal">
            <h3>{'Dariusz i Marek Orłowscy'}</h3>
            <p>
              {'Lata praktyki i liczne kursy pozwoliły nam wypracować sposoby na jak najlepsze wykonywanie naszej pracy. Jesteśmy profesjonalistami. Podejmując z nami współpracę nie ma mowy o niezadowoleniu. Doszliśmy do perfekcji w dziedzinie estetyki i funkcjonalności naszych prac i używamy tylko najlepszych materiałów na rynku.'}
            </p>
          </div>
          <div className="whyus__bio reveal">
            <h3>{'Dariusz Orłowski'}</h3>
            <p>
              {'Technik dentystyczny od ponad 40 lat. W latach 1992 – 2000 kierownik dawnej protezowni. Z momentem zamknięcia placówki otworzył własną pracownię, którą rozwija wraz z synem do dziś.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
