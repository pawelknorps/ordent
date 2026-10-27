import { useState } from 'react'
import { gallery } from '../data/gallery'
import { asset } from '../lib/asset'
import Lightbox from './Lightbox'

// Tiles are 3:2, matching the generated derivatives; first four load eagerly to paint the row without waiting.
const SIZES = '(min-width: 900px) 25vw, (min-width: 640px) 33vw, 50vw'

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section gallery">
      <div className="container">
        <div className="section__head reveal">
          <h2 id="gallery-title" className="section__title">
            Galeria
          </h2>
          <p>Wybrane prace wykonane w naszej pracowni w Brodnicy.</p>
        </div>

        <ul className="gallery__grid">
          {gallery.map((item, i) => (
            <li className="reveal" key={item.id}>
              <button
                type="button"
                className="tile"
                aria-haspopup="dialog"
                onClick={() => setOpenIndex(i)}
              >
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${asset(`/img/gallery/${item.id}-480.webp`)} 480w, ${asset(`/img/gallery/${item.id}-960.webp`)} 960w`}
                    sizes={SIZES}
                  />
                  <img
                    src={asset(`/img/gallery/${item.id}-960.jpg`)}
                    srcSet={`${asset(`/img/gallery/${item.id}-480.jpg`)} 480w, ${asset(`/img/gallery/${item.id}-960.jpg`)} 960w`}
                    sizes={SIZES}
                    width={960}
                    height={640}
                    alt=""
                    loading={i < 4 ? 'eager' : 'lazy'}
                  />
                </picture>
                <span className="tile__caption">{item.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {openIndex !== null && (
        <Lightbox index={openIndex} onIndex={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  )
}
