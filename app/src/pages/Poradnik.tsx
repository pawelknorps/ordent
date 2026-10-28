import CallBar from '../components/CallBar'
import { pages } from '../data/pages'
import { asset } from '../lib/asset'
import { CENNIK_PATH, PORADNIK_PATH } from './meta'

// Honest empty state: there is no article data yet, and copying the FAQ here would duplicate
// the homepage copy the ADR warns against. Links out instead of promising what is not written.
export default function Poradnik() {
  const page = pages[PORADNIK_PATH]

  return (
    <main className="section">
      <div className="container">
        <nav aria-label="Główna">
          <a className="wordmark" href={asset('/')}>ORDENT</a>
        </nav>

        <div className="section__head">
          <h1>{page.h1}</h1>
          <p>{page.description}</p>
        </div>

        <p>Nie opublikowaliśmy jeszcze żadnego artykułu — pracujemy nad nimi.</p>
        <p>
          W międzyczasie zapraszamy do <a href={asset(CENNIK_PATH)}>cennika</a> i na stronę
          główną, gdzie odpowiadamy na najczęstsze pytania o protezy.
        </p>
      </div>
      {/* The sub-pages render no App shell, so the fixed call bar is mounted here; a small
          screen would otherwise reserve the call-bar padding (see sections.css) for nothing. */}
      <CallBar />
    </main>
  )
}
