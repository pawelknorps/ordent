// The only place holding the public site address: vite `base`, canonical/og, the JSON-LD
// `@id`/`url`/`image`, robots.txt and sitemap.xml are all derived from it at build time.
// Change it here (and nothing else) when the domain is connected.
export const SITE_URL = 'https://pawelknorps.github.io/ordent/'

export const nav = [
  { label: 'Start', href: '#banner' },
  { label: 'Co robimy', href: '#services' },
  { label: 'O nas', href: '#content-3-10' },
  { label: 'Galeria', href: '#gallery' },
  { label: 'FAQ', href: '#FAQ' },
  { label: 'Kontakt', href: '#contact' },
]

export const phones = [
  { display: '601 594 229', href: 'tel:+48601594229' },
  { display: '603 053 437', href: 'tel:+48603053437' },
]

export const hours = 'Pon–pt 10–17'

/** Structured mirror of `hours` for the generated JSON-LD (the two must agree). */
export const openingHours = [
  { day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '17:00' },
]

/** Single source of the postal address for the components, the map facade and JSON-LD. */
export const nap = {
  name: 'ORDENT',
  street: 'ul. Karola Szymanowskiego 33',
  postalCode: '87-300',
  city: 'Brodnica',
  region: 'kujawsko-pomorskie',
  country: 'PL',
}

/** Coordinates taken from the original Google embed — never verified against the pin. */
export const geo = { latitude: 53.270098, longitude: 19.394949 }

/** Verified Google Business Profile (ludocid) of the same place as the map embed. */
export const mapsLink = 'https://maps.google.com/?cid=5880031631405622190'

export const usp = 'Jako jedyni w mieście robimy protezy elastyczne'

/** Invented microcopy (DESIGN-SPEC §8) — the only strings not lifted verbatim. */
export const ui = {
  menu: 'Menu',
  closeMenu: 'Zamknij menu',
  skip: 'Przejdź do treści',
  call: 'Zadzwoń',
  heroSecondary: 'Zobacz, co robimy',
  videoPlay: 'Odtwórz film',
  videoPause: 'Wstrzymaj film',
  videoLabel: 'Film: proteza elastyczna wykonana w pracowni ORDENT',
  copyright: '© 2026 ORDENT – pracownia protetyczna, Brodnica.',
  iconsCredit: 'Ikony: Freepik (flaticon.com)',
  emergencyLabel: 'POGOTOWIE PROTETYCZNE',
  emergency: 'w nagłych wypadkach możliwe przyjęcie poza godzinami pracy.',
  phoneLabel: 'Zadzwoń:',
  hoursLabel: 'Godziny otwarcia:',
  flagBadge: 'Robimy je jako jedyni',
}
