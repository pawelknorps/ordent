# GBP LAUNCH — Google Business Profile, ready to fill in

Owner-only document. Everything here is copy-paste. The GBP outranks the website for local
queries — treat it as the primary channel, not the afterthought
(`docs/MEASUREMENT.md` §4).

Source of every price, service and hour below: `app/src/data/services.ts` and
`app/src/data/site.ts`. **Change the site first, the GBP second — same week.** A price or an
hour that disagrees between site and GBP is a trust cost and a common local-pack complaint.

---

## 1. Categories

| Field | Value |
|---|---|
| **Primary category** | **Protezy** |
| Secondary category | Laboratorium protetyczne |

**The primary category is the one that matters.** It is the strongest single signal for which
queries the profile can rank in. **Changing it after launch can reset visibility** — Google
re-evaluates the profile from scratch. Pick it once, correctly, and leave it.

---

## 2. Services with prices

GBP → Edit profile → **Usługi**. Enter each row as its own service. Prices exactly as the
site has them; where the site has no price, write **`do ustalenia`** and leave the GBP price
field **empty** until the owner sets one.

| Service (GBP „Usługi”) | Price |
|---|---|
| Protezy akrylowe | 800 – 1500 zł |
| Protezy elastyczne | 1500 – 2500 zł |
| Protezy szkieletowe | 2200 – 3400 zł |
| Korony i mosty | do ustalenia |
| Szyny na bruksizm | 500 zł |
| Szyny do wybielania zębów | 500 zł |
| Ortodoncja | do ustalenia |
| Naprawy, podścielenia i wymiana klamer na elastyczne | wg pozycji poniżej |

`Korony i mosty` i `Ortodoncja` **nie mają jeszcze ceny w `services.ts`** — nie
zgaduj liczby, wpisz `do ustalenia`.

### Naprawy — szczegółowe pozycje (osobne usługi w GBP)

Each row below is its own GBP service. The last two lines are the notes that sit under the
price list in the site modal; the „+50%” note applies to every row above it.

| Service (GBP „Usługi”) | Price |
|---|---|
| Pęknięcie protezy | 150 – 250 zł |
| Dostawienie zęba / klamry metalowej | 200 zł |
| Wzmocnienie | +50 zł |
| Podścielenie | 300 zł |
| Wymiana klamer na elastyczne | 120 zł za pierwszą, 60 zł za każdą kolejną |
| Samo czyszczenie | 50 zł |

- **Czas naprawy to z reguły 2–4 h.**
- **Jeśli trzeba zrobić coś „na już”, doliczamy 50% ceny.**

---

## 3. Hours

Copy exactly what `app/src/data/site.ts` holds.

| Field | Value |
|---|---|
| `hours` (site, displayed) | **Pon–pt 10–17** |
| `openingHours` (structured) | Pon–pt (Monday–Friday) **10:00–17:00** |
| Saturday / Sunday | closed |

**Rule:** change the site first, then the GBP in the same week. If the two ever disagree the
profile looks unmaintained and users lose trust. Do not enter hours the site does not show.

---

## 4. Photos — shot list (target 42)

**Real photos of your own work beat stock every time, and photos are the strongest correlated
local-pack factor with no ceiling.** 40 is a floor, not a ceiling — keep adding. Shoot in
landscape and square where you can; phone camera is fine with good light.

| Group | Target | Concrete shots |
|---|---|---|
| Before / after of real work | **12** (6 pairs) | One „before” and one „after” of the same case, same angle, same light, mouth closed and a work-in-hand shot. Cover: proteza akrylowa, proteza elastyczna, szkielet, korona/most. Keep the pair together in the upload order. |
| The laboratory | **8** | Wide shot of the room, the bench with a piece mid-work, the plaster/models shelf, the polishing station, the oven/polymeriser, a hands-at-work close-up, a finished work laid on the bench, the clean-up/casting area. |
| Materials and equipment | **7** | Tubs of acrylic, elastic-material pellets/samples, metal framework blanks, denture teeth shade box, the label of the material you use, a tool flat-lay, a clean close-up of a clasp being bent. |
| The team | **5** | Dariusz Orłowski at the bench, Marek Orłowski at the bench, both together, a hands-detail shot, a portrait at the storefront/entrance. Faces build trust — get consent from each person shown. |
| Storefront / entrance | **4** | The building facade with the sign, the entrance door from the street, a street-context shot so the pin is findable, the sign/plate close-up. |
| Elastic-clasp detail | **6** | Macro of an elastic clasp on a model, the clasp colour-matched to the gum, the clasp on a finished denture (in-hand), the same denture worn, a metal vs. elastic clasp side by side, a full elastic denture top-down. |

**Note:** your unique selling point — „Jako jedyni w mieście robimy protezy elastyczne”
(`site.ts` → `usp`) — deserves its own photos: that is the group most worth over-shooting.

---

## 5. Weekly posts — 8 ready-to-paste templates

GBP → Publikuj post → photo-led, 1–3 short sentences, no hashtag spam, no link needed (the
profile already carries the site and the call button). Rotate them; reuse freely.

1. **Zdjęcie:** proteza elastyczna in-hand.
   „Protezy elastyczne bez widocznych metalowych klamer — estetyka akrylu i wytrzymałość
   metalu. Robimy je jako jedyni w mieście. Zadzwoń: 601 594 229.”
2. **Zdjęcie:** work in-hand at the bench.
   „Zepsuta proteza? Większość napraw robimy w 2–4 h. Wyłamany ząb, pęknięcie, nowa klamra —
   wpadnij do pracowni w Brodnicy.”
3. **Zdjęcie:** denture being cleaned.
   „Do każdej naprawy dorzucamy gratis czyszczenie protezy z kamienia i nalotów. Samo
   czyszczenie — 50 zł.”
4. **Zdjęcie:** denture fitted, comfortable.
   „Podścielenie 300 zł — proteza znów leży jak ulał. Nie czekaj, aż zacznie uwierać.”
5. **Zdjęcie:** metal vs. elastic clasp side by side.
   „Metalowe klamry widoczne? Wymieniamy je na elastyczne: 120 zł za pierwszą, 60 zł za każdą
   kolejną.”
6. **Zdjęcie:** szyna relaksacyjna.
   „Zgrzytanie zębami niszczy zęby i staw skroniowo-żuchwowy. Szyna relaksacyjna chroni jedno
   i drugie. Zapytaj o nią telefonicznie.”
7. **Zdjęcie:** korona/most case.
   „Korony i mosty — także na implantach i z dowieszką. Odbudowa na własnych zębach,
   dopasowana w pracowni. Zadzwoń: 603 053 437.”
8. **Zdjęcie:** storefront / open badge.
   „Pon–pt 10–17 przy ul. Karola Szymanowskiego 33 w Brodnicy. W nagłych wypadkach możliwe
   przyjęcie poza godzinami pracy — zadzwoń.”

**Cadence:** **one post per week, every week.** A short photo post beats a rare long one;
cadence beats polish here. Call in a quick „what did we finish this week” photo on Monday and
post it. Never let three weeks pass without a post.

---

## 6. Review requests

Send this to **every patient after fitting** (SMS or WhatsApp), with the GBP review link (copy
it from the profile → „Poproś o opinie”).

> **Dziękujemy za wizytę w ORDENT! Jeśli proteza leży jak ulał, będziemy wdzięczni za krótką
> opinię w Google — pomaga innym pacjentom z Brodnicy nas znaleźć. Wystarczy jedno zdanie.
> Pozdrawiamy, pracownia ORDENT.**

**Reply to ALL reviews — positive and negative.** For negative ones, reply politely, stay
factual, and invite the person to call; do not argue in public.

**Honest warning:** review **volume and recency** both move local rank. A profile with ten
recent reviews beats one with thirty old ones. Keep asking, every patient, every week.

---

## 7. Weekly checklist

- [ ] One post published this week (§5).
- [ ] At least 2 new photos uploaded (§4).
- [ ] Review asked after every fitting this week (§6).
- [ ] Every new review answered, positive or negative (§6).
- [ ] Hours and prices still match `site.ts` / `services.ts` — if the site changed, the GBP changed the same week (§3).
