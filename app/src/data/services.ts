// Copy transcribed from index.html. Runs of whitespace and punctuation spacing were
// normalised; word-level typos were corrected, except „peloty", which is left as in the
// source pending confirmation.
// The card-facing copy (taglines, the „Korony i mosty" detail) was rewritten on the
// client's request for clearer, benefit-first text. Prices and the long-form technical
// paragraphs stay as in the source; no new claims were added.
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
  icon: string
  detail: ServiceDetail
}

export const services: Service[] = [
  {
    id: 'akrylowe',
    title: 'Protezy akrylowe',
    tagline: 'Sprawdzona estetyka w przystępnej cenie.',
    price: 'Cena: 200 – 600 zł',
    icon: '003-tooth-13.svg',
    detail: {
      paragraphs: [
        'Tzw. protezy tradycyjne. Proteza składa się z różowego akrylu imitującego podniebienie/dziąsła, w którym znajdują się zęby akrylowe o odpowiedniej barwie.',
        'Cechują się dobrą estetyką, łatwą i tanią naprawą i niską ceną. Mają jednak kilka wad, takich jak podatność na uszkodzenia i złamania, oraz mało estetyczne metalowe klamry. Z doświadczenia jednak wiemy gdzie i jak umieszczać owe klamry, by nie rzucały się w oczy. Opracowaliśmy nawet własny sposób ich doginania, pozwalający na zmniejszenie sił tarcia na ząb, co w rezultacie tradycyjnego doginania doprowadzało dość szybko do starcia szkliwa z filarowych zębów własnych. Dodatkowo, jeśli jest możliwość, zamiast klamer metalowych dodajemy peloty poprawiające utrzymanie.',
        'Dla wzmocnienia protezy przed pękaniem możliwe jest zatopienie w protezie siatki metalowej lub z włókien szklanych. W przypadku uczulenia na monomer znajdujący się w różowym akrylu, możliwe jest wykonanie samego podniebienia bądź całych protez z nieuczulającego przezroczystego akrylu.',
      ],
    },
  },
  {
    id: 'szkieletowe',
    title: 'Protezy szkieletowe',
    tagline: 'Lekkie, mocne i komfortowe na co dzień.',
    price: 'Cena: 700 – 1400 zł',
    icon: '004-tooth-12.svg',
    detail: {
      paragraphs: [
        'Proteza szkieletowa składa się z elementów metalowych pokrytych akrylem. Jest to rozwiązanie wygodniejsze, ale też droższe niż proteza akrylowa. Użycie metalu sprawia, że „szkielety” mają mniejsze rozmiary i są bardziej komfortowe w użytkowaniu. Mają też większą stabilność, dzięki czemu mówienie i spożywanie posiłków jest zdecydowanie łatwiejsze. Prawidłowo wykonana i dopasowana proteza szkieletowa jest też łatwiejsza do utrzymania w czystości niż proteza akrylowa, co zmniejsza ryzyko infekcji w jamie ustnej. Ogromną jej zaletą jest możliwość stworzenia bardzo cienkiej konstrukcji płyty protezy oraz podparć. Jej twardość jest jednocześnie zaletą jak i wadą, gdyż w sytuacji zaniknięcia wyrostka, możliwe jest wyważanie protezy, co skutkuje rozchwianiem zębów filarowych.',
        'Do wad tych protez należą metalowe klamry i elementy podpierające tzw. ciernie – niektóre z nich mogą być widoczne, co ma wpływ na estetykę i wygląd pacjenta. Na szczęście istnieje możliwość wymiany takowych klamer na niewidoczne klamry elastyczne w kolorze zęba bądź tkanki dziąsła.',
      ],
    },
  },
  {
    id: 'elastyczne',
    title: 'Protezy elastyczne',
    tagline: 'Estetyka akrylu i wytrzymałość metalu, bez widocznych klamer.',
    price: 'Cena: 600 – 1200 zł',
    icon: '010-protection.svg',
    detail: {
      paragraphs: [
        'Nowoczesne protezy sprężyste (zwane elastycznymi), są połączeniem estetyki protez akrylowych oraz zasięgu i utrzymania protez metalowych. Dużo łatwiej przystosować się do mówienia i jedzenia ze względu na podparcia występujące w szkieletach i mały zasięg płyt. Używany przez nas materiał jest również wytrzymały jak metal a przy tym sprężysty, dzięki czemu nie występuje sytuacja wyważania zębów filarowych – oklamrowanych. Sama płyta protezy jest również bardziej śliska dla języka i nie pozostawia metalicznego smaku jak w przypadku szkieletów metalowych. Ze względu na jakość stosowanego przez nas materiału, możliwym jest zaszynowanie zębów paradontycznych. Protezy te również nie pękają i są odporne na upadki. W przypadku pojedynczych zębów lub mikroprotez, zasięg płyty oraz utrzymanie jest wystarczające by zapomnieć o tym że nosi się protezę.',
        'Jednak największym atutem tego typu prac są klamry. Dzięki możliwości odkształcenia się do 40% bez zmiany parametrów utrzymania, pozwalają na oklamrowanie zębów, które niemożliwe byłoby z zastosowaniem metalowych klamer. W dodatku są niewidoczne i co ważne opierają się na zębie, a nie tak jak w przypadku niektórych materiałów – na tkankach miękkich, które podczas osiadania protez wbijają się tworząc anemizację – zasinienie dziąsła.',
      ],
    },
  },
  {
    id: 'szynoprotezy',
    title: 'Szynoprotezy',
    tagline: 'Stabilizacja rozchwianych zębów przy chorobach przyzębia.',
    icon: '008-tooth-11.svg',
    detail: {
      paragraphs: [
        'Są protezami szkieletowymi stosowanymi w przypadku Pacjentów z chorobami przyzębia, które często prowadzą do pojawienia się ruchomości zębów.',
        'Szynowanie to zabieg polegający na łączeniu zębów w blok, który wzmacnia rozchwiane zęby, zapobiegając ich przesunięciu lub wyważeniu. Zęby mogą być szynowane na pewien okres np. po zabiegach chirurgicznych lub na stałe. Szynoprotezy mają bardziej rozbudowane klamry, które obejmując zęby „trzymają” je i nie pozwalają na nadmierne, niefizjologiczne ruchy boczne lub przednio-tylne tych zębów. Szynoprotezy spowalniają (a czasem nawet zapobiegają) procesowi utraty zębów zaatakowanych przez paradontozę lub wieloletni kamień nazębny.',
        'Szynoprotezy są dobrym rozwiązaniem przy znacznej redukcji podparcia tkankowego w resztkowym uzębieniu, kiedy podparcie ozębnowe nie jest silnie zredukowane, ale występują liczne braki zębowe, przy których zastosowanie innego rozwiązania protetycznego nie pozwoliłoby osiągnąć zadowalających rezultatów, przy stabilizowaniu reszty istniejącego uzębienia i w leczeniu protetycznym.',
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
        'Szyna relaksacyjna zalecana jest osobom zmagającym się z bruksizmem. Zgrzytanie zębami czy nadmierne zaciskanie szczęki to zaburzenia, które nierzadko prowadzą do upośledzenia funkcjonowania stawu skroniowo-żuchwowego. Uszkodzenie tego stawu z kolei może prowadzić do bólów głowy, karku, kręgosłupa, stawów skroniowo-żuchwowych, a także ścierania się i rozchwiania zębów. Na szynę relaksacyjną najczęściej decydują się osoby, które w swoim codziennym życiu narażone są na stres, który jest przyczyną zgrzytania zębami lub szczękościsku. Szyna relaksacyjna sprawdza się zwłaszcza w nocy, kiedy to zaciskanie zębów uniemożliwia spokojny sen, a nierzadko prowadzi do bezsenności.',
      ],
    },
  },
  {
    id: 'naprawy',
    title: 'Naprawy, podścielenia i wymiana klamer na elastyczne',
    tagline: 'Naprawa zwykle w 2–2,5 h, czyszczenie w cenie.',
    icon: '006-tooth-pliers.svg',
    detail: {
      paragraphs: [
        'Oferujemy ekspresową naprawę, uszczelnianie, wzmacnianie, protez zębowych całkowitych, częściowych, szkieletów metalowych czy protez elastycznych. Wyłamane zęby, dostawianie zębów czy klamer, wymiana klamer metalowych na elastyczne i nowe protezy z najlepszych materiałów na rynku. W gratisie czyścimy każdą protezę z osadów kamienia i wszelkich nalotów np. po dymie papierosowym.',
      ],
      priceList: [
        { label: 'Pęknięcie protezy', price: '40 – 60 zł' },
        { label: 'Wklejenie siatki / wzmocnienia', price: '30 zł' },
        { label: 'Dostawienie zęba / klamry metalowej', price: '40 zł za element' },
        { label: 'Podścielenie', price: '50 – 80 zł' },
        { label: 'Wymiana klamer na elastyczne', price: '120 zł za pierwszą, 60 zł za każdą kolejną' },
        { label: 'Samo czyszczenie', price: '20 zł' },
      ],
      notes: [
        'Czas naprawy to z reguły 2 – 2,5h.',
        'Jeśli potrzeba zrobić coś „na już”, doliczamy 50% ceny.',
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
        'Aparaty ortodontyczne i retainery, czyli utrzymywacze po leczeniu ortodontycznym. Również naprawa aparatu leży w naszych kompetencjach – pęknięta płyta, klamra czy łuk.',
      ],
    },
  },
]
