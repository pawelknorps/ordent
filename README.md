# ordent

Strona pracowni protetycznej ORDENT w Brodnicy. Przebudowa ze statycznego HTML
na React + Vite + TypeScript. Treść i zdjęcia przeniesione ze starej strony
(`index.html` w katalogu głównym — źródło prawdy dla wszystkich tekstów), a
następnie zmieniane na życzenie klienta: ceny i kolejność usług, usunięte
szynoprotezy, kolejność telefonów (601 pierwszy) i usunięta sobota. Każdą taką
zmianę opisuje `DESIGN-SPEC.md` §11.

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

Strona jest serwowana z podkatalogu, dlatego `vite.config.ts` wyprowadza `base`
ze `SITE_URL` (patrz niżej). Vite sam dokleja base do ścieżek w `index.html`
i w CSS, ale **nie** do ścieżek sklejanych w kodzie TSX — te muszą przechodzić
przez `asset()` z `app/src/lib/asset.ts`. Nowa ścieżka absolutna bez `asset()`
działa w dev, a na Pages zwróci 404.

Adres publiczny i katalog wdrożenia wynikają z jednej stałej `SITE_URL`
w `app/src/data/site.ts`. Przy podłączaniu domeny `ordent.pl` do Pages dodaj
plik `CNAME` (lub wpisz domenę w ustawieniach Pages) i zmień `SITE_URL` na
`https://ordent.pl/` — `base`, `canonical`, `og:url`, `og:image`, JSON-LD,
`robots.txt` i `sitemap.xml` wyliczy z niej build.

## Gdzie co jest

| Ścieżka | Co |
|---|---|
| `app/src/data/site.ts` | dane firmy: nazwa, adres, telefony, godziny, `geo`, link do wizytówki |
| `app/src/data/services.ts` | 7 usług + treść okien „Szczegóły" + cennik |
| `app/src/data/faq.ts` | 8 pytań FAQ |
| `app/src/data/gallery.ts` | 12 zdjęć galerii + podpisy |
| `app/src/data/reviews.ts` | opinie z Google (5 z 13 — resztę Google pokazuje tylko po zalogowaniu) |
| `app/src/components/` | sekcje strony |
| `app/src/components/MapEmbed.tsx` | mapa: statyczny `map.jpg` + iframe Google ładowany po kliknięciu |
| `app/public/img/map.jpg` | ręcznie złożona mapa z kafli OSM — jedyny plik w `public/` spoza generatora |
| `app/index.html` | `<head>` (meta, OG); adres wstawia build z `SITE_URL` |
| `app/seo-plugin.ts` | generator JSON-LD, `<noscript>`, `robots.txt`, `sitemap.xml` |
| `app/src/styles/` | `tokens.css` (zmienne), `app.css`, `sections.css` |
| `tools/build-assets.py` | generator obrazów/filmów/ikon do `app/public/` |
| `DESIGN-SPEC.md` | specyfikacja + §11 ze zmianami wprowadzonymi w trakcie |

Tekst edytuje się w plikach `src/data/*.ts` — nie ma CMS-a.

Dane firmy i adres publiczny żyją tylko w `src/data/site.ts`. JSON-LD, awaryjny
`<noscript>`, `robots.txt` i `sitemap.xml` powstają przy buildzie w
`app/seo-plugin.ts`, z tych samych danych, które renderuje strona. Nie ma już
drugiej kopii FAQ ani NAP do pilnowania — zmieniasz `site.ts`, przebudowujesz,
i wszystkie kopie idą za tobą.

## Wymiana zdjęć lub filmu

`app/public/` jest prawie w całości generowane — jedynym wyjątkiem jest
`app/public/img/map.jpg` (opis niżej). Po podmianie pliku źródłowego
(hero → `images/slides/`, galeria → `images/gallery/`, zdjęcie o pracowni,
film) uruchom ponownie:

```sh
python3 tools/build-assets.py     # wymaga Pillow + ffmpeg
cd app && npm run build
```

Zdjęcia galerii są kadrowane do proporcji 3:2. Podmieniając zdjęcie, wybierz
taki kadr, żeby nie obcinał skrzydeł protezy.

## Mapa (bez ciasteczek)

Mapa startuje jako statyczny obrazek — `app/public/img/map.jpg` — z pinem,
adresem i linkiem do Google Maps, a iframe Google ładuje się dopiero po
kliknięciu (`app/src/components/MapEmbed.tsx`). Dzięki temu strona nie wysyła
na start żadnego żądania do Google i **nie potrzebuje banera zgody na
ciasteczka**.

`map.jpg` jest **jedynym plikiem w `app/public/`, którego nie generuje
`tools/build-assets.py`** — to ręcznie złożone kafle OpenStreetMap (15 kafli
z=16 → 1024×512, JPEG q0.72), więc jest zapisany w repozytorium. Kafle są
© OpenStreetMap contributors (ODbL) i dlatego atrybucja jest wyświetlana
w prawym dolnym rogu; obrazek to migawka, więc po zmianie w terenie podmień go
razem ze źródłem kafli. Podmieniając go, zrób kadr wyśrodkowany na adresie:
obrazek jest przycinany przez `cover`, a pin i panel leżą na nim w HTML, nie
w obrazku. Podmieniając sam adres albo współrzędne, zaktualizuj też
`nap`/`geo`/`mapsLink` w `app/src/data/site.ts`.

## Do potwierdzenia przed publikacją

- **Domena** — `ordent.pl` **nie jest podłączone**, więc wszystkie adresy
  absolutne (`canonical`, `og:url`, `og:image`, JSON-LD, `Sitemap:`
  w `robots.txt`, `<loc>` w `sitemap.xml`) wskazują na
  `https://pawelknorps.github.io/ordent/`. Trzyma je jedna stała `SITE_URL`
  w `app/src/data/site.ts` — po podłączeniu domeny zmień tylko ją.
- **Opinie z Google** — profil ma **5,0 · 13 opinii** (Google oznacza je jako
  „niezweryfikowane"). `app/src/data/reviews.ts` zawiera **5 prawdziwych opinii**
  przepisanych dosłownie z wizytówki — tyle Google pokazuje bez logowania;
  pozostałe 8 jest za ścianą logowania. Sekcja renderuje listę i zawsze link do
  wizytówki. Nie wpisujemy opinii wymyślonych. Oceny zbiorczej (5,0 / 13) nie
  pokazujemy na stronie, żeby nie musieć jej odświeżać.
- **Wizytówka Google** — zweryfikowany adres to
  https://maps.google.com/?cid=5880031631405622190 (ten sam `ludocid`, co
  w mapie). Leży w `mapsLink` (`app/src/data/site.ts`) i w `sameAs` danych
  strukturalnych.
  Jedna rzecz do zrobienia ręcznie w wizytówce: **dodaj stronę** (Google jej
  nie zna — panel pokazuje „Dodaj witrynę"). Kod pocztowy to `87-300 Brodnica`
  — zgodny ze stroną po potwierdzeniu przez klienta.
- **Współrzędne** w danych strukturalnych (`geo`) sprawdzone względem Nominatim
  (zgodność ~5 m) — zostały bez zmian. Ostatecznie warto potwierdzić pomiarem
  pinu na miejscu.
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
