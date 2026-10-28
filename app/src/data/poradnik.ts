// Patient-guide articles, one per FAQ entry in `faq.ts` (ADR-001). Plain data, no framework
// imports.
//
// Traceability is the point: `sourceQuestion` is the exact `q` from faq.ts (the test asserts
// it), `opening` reuses that entry's answer, and the sections may only add framing already
// stated in the answer or in `services.ts`. No price, no guarantee and no clinical fact that
// is not in those two files may appear here.

export type Article = {
  slug: string
  /** Exact `q` from faq.ts — the owner-written source this article expands. */
  sourceQuestion: string
  title: string
  seo: { title: string; description: string }
  /** One-line teaser for the /poradnik/ index; deliberately not the FAQ answer. */
  summary: string
  /** The FAQ answer, lightly smoothed, rendered as the article's opening paragraph. */
  opening: string
  /** Slugs from services.ts offered as further reading on the article page. */
  related: string[]
  /** Same-topic sibling articles surfaced as further reading — curated by hand, not derived. */
  relatedArticles: string[]
  sections: { heading: string; body: string[] }[]
}

export const articles: Article[] = [
  {
    slug: 'jak-dlugo-czeka-sie-na-proteze',
    sourceQuestion: 'Jak długo trzeba czekać na protezę?',
    title: 'Jak długo trzeba czekać na protezę?',
    seo: {
      title: 'Jak długo czeka się na protezę? – ORDENT',
      description:
        'Od czego zależy termin wykonania protezy, kiedy udaje się zamknąć pracę w 2–3 dniach i dlaczego kolor zębów bywa tu kluczowy. Poradnik ORDENT.',
    },
    summary:
      'Od czego zależy termin wykonania protezy i kiedy udaje się zamknąć pracę w 2–3 dniach.',
    opening:
      'Z reguły jesteśmy w stanie zmieścić się w ciągu tygodnia. Termin uzależniony jest od dostępności koloru zębów, potrzeby wykonania wzornika oraz ewentualnej poprawy ustawienia zębów w wosku. Jesteśmy też w stanie wykonać uzupełnienie protetyczne w 2 lub 3 dni, za niedużą opłatą.',
    related: ['protezy-akrylowe', 'protezy-elastyczne'],
    relatedArticles: ['jak-czesto-wymieniac-protezy', 'refundacja-nfz'],
    sections: [
      {
        heading: 'Co wpływa na termin',
        body: [
          'Zanim powiemy ci, kiedy proteza będzie gotowa, musimy znać kolor zębów. Dostępność konkretnej barwy bywa różna, a to wpływa na to, jak szybko możemy zacząć pracę.',
          'Drugi etap to wzornik oraz ewentualna poprawa ustawienia zębów w wosku. Dopiero gdy te elementy się zgadzają, proteza może zostać ukończona.',
          'Jeśli wybranej barwy nie ma od ręki, poczekasz na nią dłużej — dlatego pytaj o termin, mając już wybrany kolor zębów.',
        ],
      },
      {
        heading: 'Kiedy udaje się szybciej',
        body: [
          'Standardowo mieszczymy się w ciągu tygodnia. Jeżeli zależy ci na czasie, uzupełnienie protetyczne możemy wykonać także w 2 lub 3 dni.',
          'Taki skrócony termin oznacza pracę poza zwykłym rytmem pracowni, dlatego wiąże się z niedużą opłatą. Jeśli zależy ci na konkretnej dacie — wyjeździe, ślubie, ważnym spotkaniu — powiedz o tym na początku, a sprawdzimy, co da się zrobić.',
        ],
      },
      {
        heading: 'Jaki rodzaj protezy wybierasz',
        body: [
          'Na czas pracy wpływa też to, po jaką protezę sięgasz. Protezy akrylowe to sprawdzone rozwiązanie o dobrej estetyce i łatwej naprawie. Protezy elastyczne łączą estetykę akrylu z wytrzymałością i utrzymaniem metalu, a protezy szkieletowe są mniejsze, lżejsze i bardziej stabilne.',
          'O rodzaju protezy najlepiej porozmawiać jeszcze przed rozpoczęciem pracy. Wtedy termin i zakres prac są jasne od początku, a ty nie tracisz czasu na zmiany w trakcie.',
        ],
      },
    ],
  },
  {
    slug: 'bol-rana-i-odruch-wymiotny',
    sourceQuestion: 'Co robić, gdy pojawi się ból, rana lub odruch wymiotny?',
    title: 'Co robić, gdy pojawi się ból, rana lub odruch wymiotny?',
    seo: {
      title: 'Ból, rana lub odruch wymiotny – co robić?',
      description:
        'Przy bólu, ranie lub odruchu wymiotnym zdejmij protezę i zgłoś się do pracowni — odciążymy bolące miejsca. Kiedy sięgnąć po Sachol.',
    },
    summary:
      'Gdy proteza uwiera, zdejmij ją i zgłoś się do pracowni — noszenia na siłę lepiej nie próbować.',
    opening:
      'W przypadku pojawienia się bólu, ran lub odruchu wymiotnego zalecamy zdjęcie protezy i wizytę w naszym laboratorium, celem odciążenia bolących miejsc poprzez odjęcie materiału protezy. Nie polecamy próbowania na siłę noszenia „bo może przejdzie”, gdyż tylko wydłużymy okres rekonwalescencji. Z reguły nasze protezy leżą jak ulał, niekiedy jednak potrzeba kilku bezpłatnych wizyt korekcyjnych. W razie czego można zaopatrzyć się w aptece w Sachol.',
    related: ['naprawy-protez', 'protezy-akrylowe'],
    relatedArticles: ['czy-spac-w-protezach', 'jak-kleic-protezy'],
    sections: [
      {
        heading: 'Dlaczego nie warto nosić na siłę',
        body: [
          'Noszenie uwierającej protezy „bo może przejdzie” obraca się przeciwko tobie. Podrażnione miejsce nie przyzwyczai się w ten sposób, a okres rekonwalescencji tylko się wydłuży.',
          'Zdejmij protezę i daj tkankom odpocząć, zamiast sprawdzać, ile jeszcze wytrzymają. Znacznie szybciej wrócisz do komfortu, gdy pozwolisz nam odciążyć bolące miejsca.',
        ],
      },
      {
        heading: 'Na czym polega wizyta korekcyjna',
        body: [
          'Korekta polega na odjęciu materiału protezy w miejscu, które uciska. To drobna zmiana, ale potrafi zdecydowanie poprawić komfort noszenia.',
          'Po odebraniu gotowej pracy czasem wystarczy jedna wizyta, a czasem potrzeba ich kilku — dopóki proteza nie będzie leżeć jak ulał. Takie wizyty korekcyjne są bezpłatne. Jeśli po korekcie coś jeszcze uwiera, wróć do nas — materiał można odjąć kolejny raz.',
        ],
      },
      {
        heading: 'Ból, rana i odruch wymiotny',
        body: [
          'Ból, rana i odruch wymiotny to sygnały, że proteza wymaga korekty w pracowni. W każdym z tych przypadków zdejmij protezę i zgłoś się do nas — sprawdzimy, w którym miejscu trzeba odjąć materiał.',
          'Wizytę korekcyjną umów telefonicznie, żebyśmy mogli poświęcić ci czas. Nie zwlekaj z nią — im szybciej odciążymy bolące miejsce, tym szybciej wrócisz do komfortu.',
          'W razie potrzeby możesz też zaopatrzyć się w aptece w Sachol.',
        ],
      },
    ],
  },
  {
    slug: 'jak-kleic-protezy',
    sourceQuestion: 'Czy i jak kleić protezy?',
    title: 'Czy i jak kleić protezy?',
    seo: {
      title: 'Jak kleić protezy? – ile kleju i gdzie',
      description:
        'Kiedy klej do protez ma sens i ile go nakładać: 3 kleksy w protezie górnej, 2 w dolnej. Praktyczna porada pracowni ORDENT w Brodnicy.',
    },
    summary:
      'Kiedy klej do protez ma sens i ile go nakładać: 3 kleksy w protezie górnej, 2 w dolnej.',
    opening:
      'W przypadku niedostatecznych warunków wewnątrzustnych — niskich wyrostków lub braku możliwości zassania protezy — warto stosować klej do protez. Ważna jest jednak ilość nakładana jednorazowo na protezę. Na protezie górnej od strony podniebiennej nałóż 3 nieduże „kleksy” po bokach i z przodu, a w protezie dolnej 2 nieduże „kleksy” po bokach. Dopiero wtedy klej do protez pomoże w lepszym utrzymaniu.',
    related: ['protezy-akrylowe', 'protezy-elastyczne'],
    relatedArticles: ['bol-rana-i-odruch-wymiotny', 'pielegnacja-protez', 'czy-spac-w-protezach'],
    sections: [
      {
        heading: 'Kiedy klej do protez ma sens',
        body: [
          'Klej nie jest rozwiązaniem dla każdego. Sięgnij po niego wtedy, gdy warunki wewnątrzustne są niedostateczne — gdy wyrostki są niskie i proteza nie ma się jak zassać w jamie ustnej.',
          'W takiej sytuacji klej pomaga w lepszym utrzymaniu protezy. Pamiętaj jednak, że wspiera on utrzymanie, a nie zastępuje protezy dopasowanej do twojej jamy ustnej.',
        ],
      },
      {
        heading: 'Ile kleju i gdzie go nałożyć',
        body: [
          'Cała sztuka polega na ilości. Najczęstszy błąd to nałożenie zbyt dużej porcji kleju — nadmiar nie poprawia utrzymania, liczy się nałożenie punktowe.',
          'W protezie górnej zrób 3 nieduże „kleksy” od strony podniebiennej: po bokach i z przodu. W protezie dolnej nałóż 2 nieduże „kleksy” po bokach. Dopiero tak nałożony klej poprawia utrzymanie.',
          'Klej stosuj tylko wtedy, gdy proteza nie trzyma się sama — nie na wszelki wypadek.',
        ],
      },
      {
        heading: 'Kiedy proteza nie trzyma się mimo kleju',
        body: [
          'O utrzymaniu decyduje przede wszystkim dopasowanie protezy. Jeśli proteza nosi się inaczej niż na początku, zadzwoń do nas — sprawdzimy, jak się trzyma i co można poprawić.',
        ],
      },
    ],
  },
  {
    slug: 'pielegnacja-protez',
    sourceQuestion: 'Jak dbać o protezy?',
    title: 'Jak dbać o protezy?',
    seo: {
      title: 'Jak dbać o protezy? – higiena | ORDENT',
      description:
        'Jak często myć protezę, czym ją czyścić i dlaczego warto wypłukać ją przed założeniem. Poradnik higieny protez od ORDENT w Brodnicy.',
    },
    summary:
      'Jak często myć protezę, czym ją czyścić i dlaczego warto wypłukać ją przed założeniem.',
    opening:
      'Protezę należy myć tak często jak zęby własne, czyli 2 razy dziennie. Po każdym posiłku powinna być oczyszczona z resztek pokarmowych. Do czyszczenia używa się szczoteczki do zębów, najlepiej z miękkiego włosia, oraz pasty o niskim współczynniku ścieralności albo specjalnych środków do czyszczenia protez. Przed założeniem dokładnie wypłucz protezę pod bieżącą wodą.',
    related: ['protezy-szkieletowe', 'protezy-akrylowe'],
    relatedArticles: ['czy-spac-w-protezach', 'jak-myc-zeby', 'jak-czesto-wymieniac-protezy'],
    sections: [
      {
        heading: 'Jak często czyścić protezę',
        body: [
          'Proteza wymaga takiej samej dyscypliny jak własne zęby. Myj ją 2 razy dziennie, a po każdym posiłku oczyść z resztek pokarmowych.',
          'Traktuj to jak codzienny nawyk, a nie jednorazową czynność. Regularność jest tu ważniejsza niż siła szorowania.',
          'Protezę myj również wtedy, gdy wydaje się czysta — resztki pokarmowe bywają niewidoczne.',
        ],
      },
      {
        heading: 'Czym czyścić protezę',
        body: [
          'Do mycia używaj szczoteczki do zębów — najlepiej z miękkiego włosia. Pasta powinna mieć niski współczynnik ścieralności.',
          'Równie dobrze sprawdzają się specjalne środki do czyszczenia protez. Oba rozwiązania są przewidziane, więc wybierz to, które jest dla ciebie wygodniejsze.',
        ],
      },
      {
        heading: 'Przed założeniem protezy',
        body: [
          'Zanim włożysz protezę, dokładnie wypłucz ją pod bieżącą wodą. To ostatni krok codziennej higieny, a zarazem najprostszy — nie pomijaj go.',
        ],
      },
      {
        heading: 'Higiena a rodzaj protezy',
        body: [
          'Nie każda proteza utrzymuje czystość tak samo łatwo. Prawidłowo wykonana proteza szkieletowa jest łatwiejsza do utrzymania w czystości niż proteza akrylowa, co zmniejsza ryzyko infekcji w jamie ustnej.',
          'Jeśli zależy ci na tym, żeby codzienne czyszczenie było prostsze, powiedz o tym przy doborze protezy. Higiena to codzienny nawyk, niezależnie od tego, jaki rodzaj protezy nosisz.',
        ],
      },
    ],
  },
  {
    slug: 'czy-spac-w-protezach',
    sourceQuestion: 'Czy spać w protezach?',
    title: 'Czy spać w protezach?',
    seo: {
      title: 'Czy spać w protezach? – ORDENT Brodnica',
      description:
        'W pierwszych dniach protezę warto zdejmować na noc, później zalecamy spanie w niej. Wyjaśniamy dlaczego. Poradnik pracowni ORDENT w Brodnicy.',
    },
    summary:
      'W pierwszych dniach protezę warto zdejmować na noc, później zalecamy spanie w niej.',
    opening:
      'Niektórzy twierdzą, że protezy powinno się zdejmować na noc i przechowywać w zamkniętym pudełeczku, na sucho. My mamy inne spostrzeżenia. W pierwszych dniach od otrzymania gotowych protez warto zdejmować je na noc — to pomaga przyzwyczaić tkanki wewnątrzustne i uniknąć ewentualnych ran, których przyczyną bywa np. za długa proteza, wymagająca lekkiego przycięcia. Z reguły nasze protezy leżą jak ulał, niekiedy jednak potrzeba kilku wizyt korekcyjnych, żeby odjąć materiał w bolących miejscach. Po okresie przystosowawczym zalecamy spanie w protezach, gdyż tkanki nieuciskane zanikają, co powoduje obkurczanie wyrostków zębodołowych. W efekcie powstaje przestrzeń między protezą a tkanką pacjenta i proteza trzyma się gorzej.',
    related: ['protezy-akrylowe', 'protezy-elastyczne'],
    relatedArticles: ['pielegnacja-protez', 'bol-rana-i-odruch-wymiotny', 'jak-czesto-wymieniac-protezy'],
    sections: [
      {
        heading: 'Pierwsze dni po odebraniu protezy',
        body: [
          'Na początku warto zdejmować protezę na noc. Dzięki temu tkanki wewnątrzustne przyzwyczajają się do nowego uzupełnienia, a ty unikasz ewentualnych ran — na przykład wtedy, gdy proteza jest za długa i trzeba ją lekko przyciąć.',
          'Nie musisz od razu spać w niej na siłę — to czas na przyzwyczajenie, a nie na próbę sił.',
        ],
      },
      {
        heading: 'Wizyty korekcyjne',
        body: [
          'Z reguły nasze protezy leżą jak ulał, ale czasem potrzeba kilku wizyt korekcyjnych, żeby odjąć materiał w bolących miejscach. Drobny dyskomfort po odebraniu pracy to normalny etap przystosowania.',
          'Jeśli po korekcie coś jeszcze uwiera, wróć do nas — materiał można odjąć kolejny raz.',
        ],
      },
      {
        heading: 'Po okresie przystosowawczym',
        body: [
          'Kiedy minie okres przystosowania, zalecamy spanie w protezach. Tkanki, które nie są uciskane, zanikają, a wyrostki zębodołowe się obkurczają.',
          'Powstaje wtedy przestrzeń między protezą a twoją tkanką, przez co proteza trzyma się gorzej.',
        ],
      },
    ],
  },
  {
    slug: 'jak-myc-zeby',
    sourceQuestion: 'Jak myć własne zęby?',
    title: 'Jak myć własne zęby?',
    seo: {
      title: 'Jak myć własne zęby? – ORDENT Brodnica',
      description:
        'Dwa razy dziennie, pod kątem 45 stopni, w przestrzenie międzyzębowe — jak prawidłowo szczotkować własne zęby. Poradnik ORDENT w Brodnicy.',
    },
    summary:
      'Dwa razy dziennie, pod kątem 45 stopni, w przestrzenie międzyzębowe — jak szczotkować własne zęby.',
    opening:
      'Zęby własne powinno się myć 2 razy dziennie szczoteczką średniotwardą lub twardą, przez około 2 minuty. Mycie zębów nie polega jednak na robieniu okrężnych ruchów po zębach, a na czyszczeniu przestrzeni międzyzębowych. To tam gromadzą się pozostałości po jedzeniu oraz bakterie niszczące zęby i przyzębie. Wchodź więc włosiem szczoteczki w przestrzenie międzyzębowe pod kątem 45 stopni i ruchem wymiatającym usuwaj to, co z reguły się omija. Przez pierwsze dni pojawi się ból i krew, ale to dobrze. Po tygodniu lub dwóch objawy znikną, a ty będziesz cieszyć się długimi latami zdrowych i mocnych zębów.',
    related: ['protezy-elastyczne', 'szyny'],
    relatedArticles: ['pielegnacja-protez', 'czy-spac-w-protezach'],
    sections: [
      {
        heading: 'Dlaczego przestrzenie międzyzębowe są najważniejsze',
        body: [
          'Większość z nas myje zęby ruchem okrężnym po ich powierzchni. Tymczasem to przestrzenie międzyzębowe gromadzą pozostałości po jedzeniu i bakterie, które niszczą zęby oraz przyzębie.',
          'Właśnie tam trzeba dotrzeć szczoteczką. Zmiana przyzwyczajenia bywa trudna, ale to najważniejsza część codziennej higieny.',
        ],
      },
      {
        heading: 'Jak prawidłowo szczotkować',
        body: [
          'Myj 2 razy dziennie, przez około 2 minuty, szczoteczką średniotwardą lub twardą.',
          'Włosie prowadź w przestrzenie międzyzębowe pod kątem 45 stopni i ruchem wymiatającym usuwaj resztki. Nie omijaj miejsc, do których szczoteczka zwykle nie dociera.',
        ],
      },
      {
        heading: 'Ból i krew na początku',
        body: [
          'Przez pierwsze dni możesz zauważyć ból i krew. To dobrze — oznacza, że docierasz tam, gdzie wcześniej szczoteczka nie sięgała.',
          'Nie przerywaj wtedy szczotkowania. Po tygodniu lub dwóch objawy znikną, a ty będziesz cieszyć się zdrowymi i mocnymi zębami przez długie lata.',
        ],
      },
    ],
  },
  {
    slug: 'jak-czesto-wymieniac-protezy',
    sourceQuestion: 'Co ile lat powinno się zmieniać uzupełnienia protetyczne?',
    title: 'Co ile lat powinno się zmieniać uzupełnienia protetyczne?',
    seo: {
      title: 'Co ile lat zmieniać protezę? – reguła 5 lat',
      description:
        'Reguła to 5 lat, ale protezę wymienia się czasem wcześniej — a czasem można nosić ją dużo dłużej. Wyjaśniamy, od czego to zależy.',
    },
    summary:
      'Reguła to 5 lat, ale protezę wymienia się czasem wcześniej — a czasem można nosić ją dużo dłużej.',
    opening:
      'To zależy od każdego przypadku, jednak reguła to 5 lat. Co tyle zresztą NFZ refunduje wykonanie nowych protez zębowych powyżej 5 zębów. Czasami protezę trzeba wymienić prędzej, gdyż zbyt dużo straciliśmy zębów albo zbyt mocno zmieniły się warunki zewnątrzustne — nawet różnica wagi pacjenta wynosząca 5 kg potrafi sprawić, że proteza przestaje pasować. Jeśli jednak zęby sztuczne nie uległy zbytniemu starciu, proteza dobrze się trzyma i odpowiednio dbamy o jej higienę, można nawet — znamy takie przypadki — nosić jedną protezę przez 15 lat.',
    related: ['naprawy-protez', 'protezy-elastyczne'],
    relatedArticles: ['jak-dlugo-czeka-sie-na-proteze', 'refundacja-nfz', 'pielegnacja-protez'],
    sections: [
      {
        heading: 'Dlaczego reguła to 5 lat',
        body: [
          'Pięć lat to punkt odniesienia, a nie sztywny termin. Co tyle zresztą NFZ refunduje wykonanie nowych protez zębowych powyżej 5 zębów, dlatego ten rytm jest wygodny.',
          'O dokładnym momencie wymiany decyduje jednak stan twojej jamy ustnej. Protezę oceniamy indywidualnie, więc termin jest zawsze dopasowany do twojej sytuacji.',
        ],
      },
      {
        heading: 'Kiedy wymiana jest potrzebna wcześniej',
        body: [
          'Protezę trzeba czasem wymienić szybciej — gdy straciliśmy zbyt dużo zębów albo gdy mocno zmieniły się warunki zewnątrzustne.',
          'Zmiany potrafią być subtelne: nawet różnica wagi pacjenta wynosząca 5 kg może sprawić, że proteza przestanie pasować. Jeśli zaczynasz odczuwać, że proteza nie leży jak dawniej, to sygnał, żeby się jej przyjrzeć.',
        ],
      },
      {
        heading: 'Kiedy proteza posłuży dłużej',
        body: [
          'Nie każda proteza wymaga wymiany po pięciu latach. Jeśli zęby sztuczne nie uległy zbytniemu starciu, proteza dobrze się trzyma, a higiena jest odpowiednia, można nosić jedną protezę znacznie dłużej — znamy przypadki 15 lat użytkowania.',
          'Kluczowe są dwa warunki: dobry stan protezy i dbałość o nią.',
        ],
      },
      {
        heading: 'Od czego zależy trwałość',
        body: [
          'Na to, jak długo posłuży proteza, wpływa też materiał. Protezy akrylowe są podatne na uszkodzenia i złamania, a protezy elastyczne nie pękają i są odporne na upadki.',
          'Wybierając protezę, warto więc pomyśleć nie tylko o wyglądzie, ale i o tym, jak długo ma ci służyć.',
        ],
      },
    ],
  },
  {
    slug: 'refundacja-nfz',
    sourceQuestion: 'Czy protezy są refundowane przez NFZ?',
    title: 'Czy protezy są refundowane przez NFZ?',
    seo: {
      title: 'Refundacja protez NFZ – jak to działa',
      description:
        'Kiedy NFZ refunduje protezy i od czego zależy indywidualna refundacja. Szczegółowych informacji udzielamy telefonicznie. Poradnik ORDENT.',
    },
    summary:
      'Refundacja zależy od indywidualnego przypadku — reguła to 5 lat. Szczegóły podajemy telefonicznie.',
    opening:
      'Refundacja zależy od indywidualnego przypadku — reguła to 5 lat. W celu uzyskania szczegółowych informacji prosimy o kontakt telefoniczny.',
    related: ['protezy-akrylowe', 'protezy-elastyczne'],
    relatedArticles: ['jak-czesto-wymieniac-protezy', 'jak-dlugo-czeka-sie-na-proteze'],
    sections: [
      {
        heading: 'Co mówi reguła 5 lat',
        body: [
          'Reguła to 5 lat — co tyle NFZ refunduje wykonanie nowych protez zębowych powyżej 5 zębów.',
          'Pięcioletni rytm warto mieć z tyłu głowy, planując wymianę protezy. To jednak ogólna zasada, a nie obietnica dla każdego przypadku.',
          'Dlatego o refundację najlepiej zapytać z odpowiednim wyprzedzeniem, jeszcze przed planowaną wymianą.',
        ],
      },
      {
        heading: 'Od czego zależy twoja refundacja',
        body: [
          'Refundacja zależy od indywidualnego przypadku i nie da się jej potwierdzić z góry bez rozmowy. Zadzwoń do nas i opowiedz o swojej sytuacji, a wyjaśnimy, jak wygląda ona w twoim przypadku i co dalej.',
        ],
      },
      {
        heading: 'Jakie protezy wykonujemy',
        body: [
          'W naszej pracowni wykonujemy protezy akrylowe, elastyczne i szkieletowe. Protezy akrylowe to sprawdzone rozwiązanie o dobrej estetyce, elastyczne łączą estetykę akrylu z wytrzymałością metalu, a szkieletowe są mniejsze i bardziej stabilne.',
          'Jeśli nie wiesz, który rodzaj jest dla ciebie, powiedz o tym podczas rozmowy — pomożemy ci wybrać.',
        ],
      },
      {
        heading: 'Jak się z nami skontaktować',
        body: [
          'Szczegółowych informacji o refundacji udzielamy telefonicznie. Zadzwoń do naszego laboratorium w Brodnicy.',
          'Numer telefonu znajdziesz na tej stronie oraz w cenniku. To najszybsza droga, bo każdą sytuację omawiamy indywidualnie.',
        ],
      },
    ],
  },
]
