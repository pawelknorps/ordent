// Metadata for the non-service routes (ADR-001). The H1 is kept separate from the
// <title> so a page can lead with a heading that reads differently from the SERP title.
// Plain data, no framework imports.

export type PageMeta = {
  title: string
  description: string
  h1: string
}

export const pages: Record<string, PageMeta> = {
  '/': {
    title: 'Pracownia protetyczna Brodnica – ORDENT',
    description:
      'Protezy akrylowe, elastyczne i szkieletowe, korony, szyny, naprawy i ortodoncja. Pracownia protetyczna w Brodnicy — zadbaj o zęby z ORDENT.',
    h1: 'Pracownia protetyczna ORDENT w Brodnicy',
  },
  '/cennik/': {
    title: 'Cennik protez i napraw – ORDENT Brodnica',
    description:
      'Ile kosztują protezy akrylowe, elastyczne i szkieletowe? Sprawdź ceny pracowni ORDENT w Brodnicy i napraw wykonywanych zwykle w 2–4 h.',
    h1: 'Cennik',
  },
  '/poradnik/': {
    title: 'Poradnik pacjenta – ORDENT Brodnica',
    description:
      'Praktyczne porady o protezach: jak je myć i kleić, czy spać w protezach, co ile lat je wymieniać i kiedy należy się do nas zgłosić.',
    h1: 'Poradnik',
  },
}
