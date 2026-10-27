import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { nav, phones, ui } from '../data/site'
import { asset } from '../lib/asset'

const mask = (file: string) => ({ '--i': `url(${asset(`/img/icons/${file}`)})` }) as CSSProperties

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sentinel = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    document.documentElement.style.overflow = 'hidden'
    const behind = [document.querySelector('main'), document.querySelector('footer')]
    behind.forEach((el) => el?.setAttribute('inert', ''))
    panel.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      behind.forEach((el) => el?.removeAttribute('inert'))
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function close() {
    setOpen(false)
    trigger.current?.focus()
  }

  return (
    <>
      <div ref={sentinel} className="header-sentinel" aria-hidden="true" />
      <header className={'site-header' + (scrolled || open ? ' is-scrolled' : '')}>
        <div className="container site-header__inner">
          <a className="skip-link" href="#content">{ui.skip}</a>
          <a className="wordmark" href="#banner">
            <span className="icon wordmark__tooth" style={mask('040-tooth.svg')} aria-hidden="true" />
            ORDENT
          </a>
          <button
            ref={trigger}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-panel"
            aria-label={open ? ui.closeMenu : ui.menu}
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span className="nav-toggle__box" aria-hidden="true"><span /><span /></span>
          </button>
          <nav ref={panel} id="nav-panel" className="nav site-nav" aria-label="Główna" hidden={!open}>
            <ul className="nav__list">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={close}>{item.label}</a>
                </li>
              ))}
            </ul>
            <a className="btn btn--primary" href={phones[0].href} onClick={close}>
              <span className="icon" style={mask('007-appointment.svg')} aria-hidden="true" />
              {ui.call}
            </a>
          </nav>
        </div>
      </header>
    </>
  )
}
