# ordent

Strona pracowni protetycznej ORDENT w Brodnicy. Przebudowa ze statycznego HTML
na React + Vite + TypeScript. Treść i zdjęcia przeniesione 1:1 ze starej strony
(`index.html` w katalogu głównym — źródło prawdy dla wszystkich tekstów).

## Uruchomienie

```sh
cd app
npm install
npm run dev       # http://localhost:5173
npm run build     # -> app/dist (statyczne pliki do wgrania na hosting)
npm run preview   # podgląd zbudowanej wersji, http://localhost:4173
```

Hosting: `app/dist` to zwykłe pliki statyczne — wystarczy dowolny serwer
(Nginx, Apache, hosting współdzielony). Nie ma backendu ani SSR.

## Publikacja (GitHub Pages)

Repozytorium: https://github.com/pawelknorps/ordent
Strona: https://pawelknorps.github.io/ordent/

`.github/workflows/deploy.yml` po każdym pushu na `main` buduje `app/dist`
i publikuje je jako GitHub Pages. Ręczne uruchomienie: zakładka *Actions* →
*Deploy to GitHub Pages* → *Run workflow*.

Strona jest serwowana z podkatalogu, dlatego `vite.config.ts` ma
`base: '/ordent/'`. Vite sam dokleja base do ścieżek w `index.html` i w CSS,
ale **nie** do ścieżek sklejanych w kodzie TSX — te muszą przechodzić przez
`asset()` z `app/src/lib/asset.ts`. Nowa ścieżka absolutna bez `asset()`
działa w dev, a na Pages zwróci 404.

Przy podłączaniu domeny `ordent.pl` do Pages trzeba dodać plik `CNAME`
(lub wpisać domenę w ustawieniach Pages) i zmienić `base` z powrotem na `'/'`.

## Gdzie co jest

| Ścieżka | Co |
|---|---|
| `app/src/data/site.ts` | dane firmy: nazwa, adres, telefony, godziny |
| `app/src/data/services.ts` | 8 usług + treść okien „Szczegóły" + cennik |
| `app/src/data/faq.ts` | 8 pytań FAQ |
| `app/src/data/gallery.ts` | 12 zdjęć galerii + podpisy |
| `app/src/components/` | sekcje strony |
| `app/src/styles/` | `tokens.css` (zmienne), `app.css`, `sections.css` |
| `tools/build-assets.py` | generator obrazów/filmów/ikon do `app/public/` |
| `DESIGN-SPEC.md` | specyfikacja + §11 ze zmianami wprowadzonymi w trakcie |

Tekst edytuje się w plikach `src/data/*.ts` — nie ma CMS-a.

## Wymiana zdjęć lub filmu

`app/public/` jest w całości generowane. Po podmianie pliku źródłowego
(hero → `images/slides/`, galeria → `images/gallery/`, zdjęcie o pracowni,
film) uruchom ponownie:

```sh
python3 tools/build-assets.py     # wymaga Pillow + ffmpeg
cd app && npm run build
```

Zdjęcia galerii są kadrowane do proporcji 3:2. Podmieniając zdjęcie, wybierz
taki kadr, żeby nie obcinał skrzydeł protezy.

## Do potwierdzenia przed publikacją

- **Domena** — `https://ordent.pl` wpisane w canonical, OG/Twitter, JSON-LD,
  `robots.txt` i `sitemap.xml`. Jeśli się zmieni, podmień we wszystkich tych
  miejscach **oraz** w `public/sitemap.xml`. Dopóki `ordent.pl` nie jest
  podłączone, `canonical` i `og:image` (`https://ordent.pl/og.jpg`) wskazują na
  nieistniejący host — udostępniając link `pawelknorps.github.io/ordent/`
  w komunikatorze, nie zobaczysz miniatury.
- **Współrzędne** w danych strukturalnych (`geo`) pochodzą ze środka widoku
  mapy, nie z pomiaru pinu. Warto sprawdzić na miejscu.
- **Teksty** — interpunkcja i sklejenia poprawione (podwójne kropki/spacje,
  przecinek po cudzysłowie, myślniki `-` → `–`). Literówki na poziomie słów
  zostawione dosłownie: „teżdroższe" (→ też droższe), „Siudo" (zdanie
  nieczytelne), „peloty", „Tzw. Protezy tradycyjne." (wielka litera w środku
  zdania). Do korekty redakcyjnej, jeśli ma być.
- **Atrybucja ikon** w stopce („Ikony: Freepik (flaticon.com)") — zostawiona,
  bo tak było oryginalnie i tak wymaga licencja Flaticon.
