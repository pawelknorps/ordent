// g01..g12 map to IMG_7005, 7006, 7008, 7009, 7012, 7141, 7142, 7148, 7766, 7768, 8211, 8212.
// Captions describe what each photo actually shows; the tile aria-label and <img alt> both use them.

export type GalleryItem = { id: string; caption: string }

export const gallery: GalleryItem[] = [
  { id: 'g01', caption: 'Proteza częściowa akrylowa z klamrami – widok z boku' },
  { id: 'g02', caption: 'Proteza akrylowa całkowita górna – widok od przodu' },
  { id: 'g03', caption: 'Proteza akrylowa – detal ustawienia zębów' },
  { id: 'g04', caption: 'Uzupełnienie protetyczne na modelu gipsowym – widok zgryzowy' },
  { id: 'g05', caption: 'Proteza akrylowa – widok od strony podniebienia' },
  { id: 'g06', caption: 'Proteza częściowa na modelu gipsowym' },
  { id: 'g07', caption: 'Proteza częściowa – widok od strony wewnętrznej na modelu' },
  { id: 'g08', caption: 'Proteza akrylowa całkowita – powierzchnia przylegania na modelu gipsowym' },
  { id: 'g09', caption: 'Proteza częściowa akrylowa – próba na modelu gipsowym' },
  { id: 'g10', caption: 'Proteza częściowa górna – powierzchnia płyty na modelu' },
  { id: 'g11', caption: 'Uzupełnienie protetyczne w trakcie wykańczania' },
  { id: 'g12', caption: 'Proteza akrylowa na modelu gipsowym – widok z boku' },
]
