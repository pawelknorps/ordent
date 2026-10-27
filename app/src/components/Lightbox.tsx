import { useEffect, useRef } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import { gallery } from '../data/gallery'
import { asset } from '../lib/asset'

type Props = {
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}

// Reuses the site's single <dialog> primitive. ESC/backdrop close are native; the browser restores focus.
export default function Lightbox({ index, onIndex, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    // Guard keeps StrictMode's double effect from calling showModal twice on an open dialog.
    if (d && !d.open) d.showModal()
  }, [])

  const total = gallery.length
  const item = gallery[index]
  const prev = gallery[(index - 1 + total) % total]
  const next = gallery[(index + 1) % total]
  const go = (step: number) => onIndex((index + step + total) % total)

  function handleKeyDown(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === 'ArrowLeft') go(-1)
    else if (e.key === 'ArrowRight') go(1)
  }

  function handleBackdrop(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) e.currentTarget.close()
  }

  return (
    <dialog
      ref={ref}
      className="sheet sheet--lightbox"
      aria-labelledby="lightbox-caption"
      onKeyDown={handleKeyDown}
      onClose={onClose}
      onClick={handleBackdrop}
    >
      <img
        className="lightbox__img"
        src={asset(`/img/gallery/${item.id}-1440.jpg`)}
        srcSet={asset(`/img/gallery/${item.id}-1440.webp`)}
        width={1440}
        height={960}
        alt={item.caption}
      />
      <p className="lightbox__caption" id="lightbox-caption">
        {item.caption}
      </p>
      <div className="lightbox__controls">
        <button type="button" className="btn btn--ghost" onClick={() => go(-1)}>
          Poprzednie zdjęcie
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => go(1)}>
          Następne zdjęcie
        </button>
        <button type="button" className="btn btn--primary" onClick={() => ref.current?.close()}>
          Zamknij galerię
        </button>
      </div>
      {/* Off-screen neighbours start downloading so arrow-key paging feels instant. */}
      <img className="lightbox__preload" src={asset(`/img/gallery/${prev.id}-1440.jpg`)} alt="" aria-hidden="true" />
      <img className="lightbox__preload" src={asset(`/img/gallery/${next.id}-1440.jpg`)} alt="" aria-hidden="true" />
    </dialog>
  )
}
