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
(lub wpisać domenę w ustawieniach Pages), zmienić `base` z powrotem na `'/'`
i podmienić adres GitHub Pages na `https://ordent.pl/` we wszystkich miejscach
z listy niżej.

## Gdzie co jest

| Ścieżka | Co |
|---|---|
| `app/src/data/site.ts` | dane firmy: nazwa, adres, telefony, godziny |
| `app/src/data/services.ts` | 8 usług + treść okien „Szczegóły" + cennik |
| `app/src/data/faq.ts` | 8 pytań FAQ |
| `app/src/data/gallery.ts` | 12 zdjęć galerii + podpisy |
| `app/src/data/reviews.ts` | opinie z Google (na razie pusta lista — tylko link) |
| `app/src/components/` | sekcje strony |
| `app/index.html` | `<head>` (meta, OG, JSON-LD) + awaryjna treść `<noscript>` |
| `app/src/styles/` | `tokens.css` (zmienne), `app.css`, `sections.css` |
| `tools/build-assets.py` | generator obrazów/filmów/ikon do `app/public/` |
| `DESIGN-SPEC.md` | specyfikacja + §11 ze zmianami wprowadzonymi w trakcie |

Tekst edytuje się w plikach `src/data/*.ts` — nie ma CMS-a.

Dwa wyjątki, o których łatwo zapomnieć:

- **FAQ jest zduplikowane.** Te same 8 pytań i odpowiedzi leżą w `faq.ts`
  **oraz** w `app/index.html`, w drugim bloku JSON-LD `FAQPage`. Po edycji
  `faq.ts` popraw też `index.html` — `index.html` jest statyczny i nie może
  zaimportować pliku `.ts`, a nic w repo nie sprawdza, czy kopie się zgadzają.
- **`<noscript>` w `app/index.html`** powtarza NAP (adres, telefony, godziny).
  Zmieniając dane firmy, zaktualizuj też ten blok — inaczej rozjedzie się
  z `site.ts`.

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

- **Domena** — `ordent.pl` **nie jest podłączone**, więc wszystkie adresy
  absolutne wskazują na `https://pawelknorps.github.io/ordent/`: `canonical`,
  `og:url`, `og:image`, JSON-LD (`@id`, `url`, `image`), `Sitemap:`
  w `robots.txt` i `<loc>` w `sitemap.xml`. Nad `canonical` w `app/index.html`
  jest `<!-- TODO -->` przypominający o podmianie. Po podłączeniu domeny zmień
  je wszystkie **plus** `base` w `vite.config.ts`.
- **Opinie z Google** — sekcja „Opinie" to na razie tylko link do wizytówki.
  Profil ma **5,0 · 13 opinii** (Google oznacza je jako „niezweryfikowane").
  `app/src/data/reviews.ts` ma celowo pustą tablicę; po wklejeniu prawdziwych
  opinii (autor, ocena 1–5, treść, data) sekcja sama się rozwinie w listę.
  Nie wpisujemy opinii wymyślonych. Oceny nie pokazujemy na stronie, żeby nie
  musieć jej odświeżać — sam link wystarcza.
- **Wizytówka Google** — zweryfikowany adres to
  https://maps.google.com/?cid=5880031631405622190 (ten sam `ludocid`, co
  w mapie). Leży w `MAPS_LINK` i w `sameAs` danych strukturalnych.
  Dwie rzeczy do zrobienia ręcznie w wizytówce: **dodaj stronę** (Google jej
  nie zna — panel pokazuje „Dodaj witrynę") i **ustal kod pocztowy**:
  wizytówka ma `87-300 Brodnica`, strona `87-301 Brodnica`.
- **Współrzędne** w danych strukturalnych (`geo`) pochodzą ze środka widoku
  mapy, nie z pomiaru pinu. Warto sprawdzić na miejscu.
- **Teksty** — interpunkcja i sklejenia poprawione (podwójne kropki/spacje,
  przecinek po cudzysłowie, myślniki `-` → `–`), a także trzy sklejenia na
  poziomie słów: „Tzw. Protezy" → „Tzw. protezy", „teżdroższe" → „też droższe",
  „Siudo mówienia" → „się do mówienia". Świadomie **nie** ruszono „peloty" —
  czekamy na potwierdzenie klienta, że to literówka, a nie nazwa własna.
  Reszta drobnicy („dostawianie", listy typu „Porcelanowe.", numeracja „ad. ")
  zostawiona dosłownie. Do korekty redakcyjnej, jeśli ma być.
- **Karty usług** — na życzenie klienta przepisane na nowo (klucz w leadzie
  sekcji i 8 `tagline` w `services.ts` + rozbite na zdania „Korony i mosty"),
  żeby były krótsze i mówiły korzyścią, a nie cechą. Ceny i długie akapity
  techniczne w oknach „Szczegóły" zostały jak w źródle — żadnych nowych
  twierdzeń. Dla usług, gdzie nie znamy ceny, karta nie pokazuje ceny.
- **Atrybucja ikon** w stopce („Ikony: Freepik (flaticon.com)") — zostawiona,
  bo tak było oryginalnie i tak wymaga licencja Flaticon.
