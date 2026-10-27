// Copy transcribed from index.html, then proofread: punctuation, spacing and awkward
// constructions were fixed; no factual claim and no price was changed. „peloty" is left
// as in the source pending confirmation that it is not a proper name. The card-facing
// copy (taglines, the section lead in Services.tsx and the „Korony i mosty" detail) was
// rewritten on the client's request for clearer, benefit-first text. Prices and the
// long-form technical paragraphs otherwise stay as in the source.
// `notes` holds the two timing lines that sit after the price list in the source modal.

export type ServiceDetail = {
  paragraphs: string[]
  priceList?: { label: string; price: string }[]
  notes?: string[]
}

export type Service = {
  id: string
  title: string
  tagline: string
  price?: string
  flag?: boolean
  icon: string
  detail: ServiceDetail
}

export const services: Service[] = [
  {
    id: 'akrylowe',
    title: 'Protezy akrylowe',
    tagline: 'Sprawdzona estetyka w przystępnej cenie.',
    price: 'Cena: 800 – 1500 zł',
    icon: '003-tooth-13.svg',
    detail: {
      paragraphs: [
        'Tzw. protezy tradycyjne. Proteza składa się z różowego akrylu imitującego podniebienie/dziąsła, w którym znajdują się zęby akrylowe o odpowiedniej barwie.',
        'Cechują się dobrą estetyką, łatwą i tanią naprawą oraz niską ceną. Mają jednak kilka wad, takich jak podatność na uszkodzenia i złamania, oraz mało estetyczne metalowe klamry. Z doświadczenia jednak wiemy, gdzie i jak umieszczać owe klamry, by nie rzucały się w oczy. Opracowaliśmy nawet własny sposób ich doginania, pozwalający na zmniejszenie sił tarcia na ząb – tradycyjne doginanie prowadziło bowiem dość szybko do starcia szkliwa z filarowych zębów własnych. Dodatkowo, jeśli to możliwe, zamiast klamer metalowych dodajemy peloty poprawiające utrzymanie.',
        'Aby wzmocnić protezę przed pękaniem, można zatopić w niej siatkę metalową lub z włókien szklanych. W przypadku uczulenia na monomer znajdujący się w różowym akrylu możliwe jest wykonanie samego podniebienia bądź całych protez z nieuczulającego przezroczystego akrylu.',
      ],
    },
  },
  {
    id: 'elastyczne',
    title: 'Protezy elastyczne',
    tagline: 'Estetyka akrylu i wytrzymałość metalu, bez widocznych klamer.',
    price: 'Cena: 1500 – 2500 zł',
    flag: true,
    icon: '010-protection.svg',
    detail: {
      paragraphs: [
        'Nowoczesne protezy sprężyste (zwane elastycznymi) są połączeniem estetyki protez akrylowych oraz zasięgu i utrzymania protez metalowych. Dużo łatwiej przystosować się do mówienia i jedzenia ze względu na podparcia występujące w szkieletach i mały zasięg płyt. Używany przez nas materiał jest również wytrzymały jak metal, a przy tym sprężysty, dzięki czemu nie dochodzi do wyważania zębów filarowych – oklamrowanych. Sama płyta protezy jest też gładsza dla języka i nie pozostawia metalicznego smaku jak w przypadku szkieletów metalowych. Ze względu na jakość stosowanego przez nas materiału możliwe jest zaszynowanie zębów parodontycznych. Protezy te również nie pękają i są odporne na upadki. W przypadku pojedynczych zębów lub mikroprotez zasięg płyty oraz utrzymanie są wystarczające, by zapomnieć o tym, że nosi się protezę.',
        'Jednak największym atutem tego typu prac są klamry. Dzięki możliwości odkształcenia się do 40% bez zmiany parametrów utrzymania pozwalają na oklamrowanie zębów, których nie dałoby się objąć metalowymi klamrami. W dodatku są niewidoczne i, co ważne, opierają się na zębie, a nie, jak w przypadku niektórych materiałów, na tkankach miękkich, które podczas osiadania protezy wbijają się, tworząc anemizację – zasinienie dziąsła.',
      ],
    },
  },
  {
    id: 'szkieletowe',
    title: 'Protezy szkieletowe',
    tagline: 'Lekkie, mocne i komfortowe na co dzień.',
    price: 'Cena: 2200 – 3400 zł',
    icon: '004-tooth-12.svg',
    detail: {
      paragraphs: [
        'Proteza szkieletowa składa się z elementów metalowych pokrytych akrylem. Jest to rozwiązanie wygodniejsze, ale też droższe niż proteza akrylowa. Użycie metalu sprawia, że „szkielety” mają mniejsze rozmiary i są bardziej komfortowe w użytkowaniu. Mają też większą stabilność, dzięki czemu mówienie i spożywanie posiłków jest zdecydowanie łatwiejsze. Prawidłowo wykonana i dopasowana proteza szkieletowa jest też łatwiejsza do utrzymania w czystości niż proteza akrylowa, co zmniejsza ryzyko infekcji w jamie ustnej. Ogromną jej zaletą jest możliwość stworzenia bardzo cienkiej konstrukcji płyty protezy oraz podparć. Jej twardość jest jednocześnie zaletą, jak i wadą, gdyż w sytuacji zaniknięcia wyrostka możliwe jest wyważanie protezy, co skutkuje rozchwianiem zębów filarowych.',
        'Do wad tych protez należą metalowe klamry i elementy podpierające, tzw. ciernie – niektóre z nich mogą być widoczne, co ma wpływ na estetykę i wygląd pacjenta. Na szczęście istnieje możliwość wymiany takich klamer na niewidoczne klamry elastyczne w kolorze zęba bądź tkanki dziąsła.',
      ],
    },
  },
  {
    id: 'korony',
    title: 'Korony i mosty',
    tagline: 'Odbudowa na własnych zębach, także z dowieszką.',
    icon: '017-tooth-9.svg',
    detail: {
      paragraphs: [
        'Prace protetyczne osadzane na oszlifowanych zębach własnych, uzupełniające luki dowieszką.',
        'Do wyboru: korony akrylowe (tańsze, ale odsłaniają szyjki zębów), porcelanowe, wkłady koronowo-korzeniowe oraz odbudowa na implantach.',
      ],
    },
  },
  {
    id: 'szyny',
    title: 'Szyny',
    tagline: 'Na bruksizm i wybielanie — ochrona zębów i stawu skroniowo-żuchwowego.',
    icon: '016-tooth-10.svg',
    detail: {
      paragraphs: [
        'Szyna relaksacyjna zalecana jest osobom zmagającym się z bruksizmem. Zgrzytanie zębami czy nadmierne zaciskanie szczęki to zaburzenia, które nierzadko prowadzą do upośledzenia funkcjonowania stawu skroniowo-żuchwowego. Uszkodzenie tego stawu z kolei może prowadzić do bólów głowy, karku, kręgosłupa, stawów skroniowo-żuchwowych, a także ścierania się i rozchwiania zębów. Na szynę relaksacyjną najczęściej decydują się osoby, które w swoim codziennym życiu narażone są na stres, będący przyczyną zgrzytania zębami lub szczękościsku. Szyna relaksacyjna sprawdza się zwłaszcza w nocy, kiedy to zaciskanie zębów uniemożliwia spokojny sen, a nierzadko prowadzi do bezsenności.',
      ],
    },
  },
  {
    id: 'naprawy',
    title: 'Naprawy, podścielenia i wymiana klamer na elastyczne',
    tagline: 'Naprawa zwykle w 2–4 h, czyszczenie w cenie.',
    icon: '006-tooth-pliers.svg',
    detail: {
      paragraphs: [
        'Oferujemy ekspresową naprawę, uszczelnianie i wzmacnianie protez zębowych całkowitych i częściowych, szkieletów metalowych oraz protez elastycznych. Dostawiamy wyłamane i brakujące zęby oraz klamry, wymieniamy klamry metalowe na elastyczne i wykonujemy nowe protezy z najlepszych materiałów na rynku. W gratisie czyścimy każdą protezę z osadów kamienia i wszelkich nalotów, np. po dymie papierosowym.',
      ],
      priceList: [
        { label: 'Pęknięcie protezy', price: '150 – 250 zł' },
        { label: 'Dostawienie zęba / klamry metalowej', price: '200 zł' },
        { label: 'Wzmocnienie', price: '+50 zł' },
        { label: 'Podścielenie', price: '300 zł' },
        { label: 'Wymiana klamer na elastyczne', price: '120 zł za pierwszą, 60 zł za każdą kolejną' },
        { label: 'Samo czyszczenie', price: '50 zł' },
      ],
      notes: [
        'Czas naprawy to z reguły 2–4 h.',
        'Jeśli trzeba zrobić coś „na już”, doliczamy 50% ceny.',
      ],
    },
  },
  {
    id: 'ortodoncja',
    title: 'Ortodoncja',
    tagline: 'Aparaty, retainery i naprawy — także opieka po leczeniu.',
    icon: '009-braces-1.svg',
    detail: {
      paragraphs: [
        'Wykonujemy aparaty ortodontyczne i retainery, czyli utrzymywacze zakładane po leczeniu ortodontycznym. Zajmujemy się również naprawą aparatów: pękniętej płyty, klamry czy łuku.',
      ],
    },
  },
]
