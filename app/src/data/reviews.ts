// Opinie z profilu Google (cid=5880031631405622190). Przepisane dosłownie — nie wolno
// wymyślać autorów, ocen ani treści. Google pokazuje anonimowo tylko 5 z 13 opinii;
// pozostałe 8 jest za logowaniem, więc sekcja renderuje listę i link do wizytówki.
// `date` to data względna taka, jak publikuje ją Google — starzeje się, odświeżaj przy okazji.

export type Review = { author: string; rating: 1 | 2 | 3 | 4 | 5; text: string; date: string }

export const reviews: Review[] = [
  {
    author: 'Witold Gurak',
    rating: 5,
    date: 'rok temu',
    text: 'Bardzo polecam tą pracownie. W sytuacji kryzysowej kiedy pękła klamra w mojej protezie została naprawiona w sposób perfekcyjny. Nie widać ani śladu naprawy a komfort użytkowania się nie zmienił. Pełen profesjonalizm',
  },
  {
    author: 'Teresa Burzyńska',
    rating: 5,
    date: 'rok temu',
    text: 'Bardzo miła profesjonalna obsługa, szybkie wykonanie zamówienia. Polecam',
  },
  {
    author: 'Hanna Durszlewicz',
    rating: 5,
    date: '2 lata temu',
    text: 'Polecam !!! Bardzo miła obsługa i szybka realizacja. Pozdrawiam serdecznie 😉😀',
  },
  {
    author: 'Anna Anna',
    rating: 5,
    date: '2 lata temu',
    text: 'Jestem bardzo zadowolona. Szybko i profesjonalnie. Baaardzo sympatyczny zespół.',
  },
  {
    author: 'Hanna Żmuda',
    rating: 5,
    date: '5 lat temu',
    text: 'Super fachowiec, świetna obsługa. Bardzo, bardzo dziękuję.',
  },
]
