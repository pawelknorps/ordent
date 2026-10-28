import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { mapsLink, phones, ui } from '../data/site'
import { asset } from '../lib/asset'

const mask = (file: string) => ({ '--i': `url(${asset(`/img/icons/${file}`)})` }) as CSSProperties

export default function CallBar() {
  const [visible, setVisible] = useState(false)

  // Header's observer switch, but watching the hero element itself: a 1px sentinel cannot be
  // pinned to the hero's bottom without editing Hero.tsx, and its height is viewport-relative.
  // Sub-pages have no hero to scroll past, so there the bar is simply always shown.
  useEffect(() => {
    const hero = document.getElementById('banner')
    // oxlint-disable-next-line react/set-state-in-effect -- DOM presence is only knowable in an effect
    setVisible(!hero)
    if (!hero) return
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting))
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <div className={'callbar' + (visible ? ' is-visible' : '')}>
      <a className="btn btn--primary" href={phones[0].href}>
        <span className="icon" style={mask('007-appointment.svg')} aria-hidden="true" />
        {ui.call}
      </a>
      <a className="btn btn--ghost" href={mapsLink} target="_blank" rel="noopener noreferrer">
        {ui.directions}
      </a>
    </div>
  )
}
