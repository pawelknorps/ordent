import { useState } from 'react'

// Original embed URL from index.html — kept as-is.
const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9544.339697570467!2d19.394949!3d53.270098!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x519a119d71fe23ae!2sPracownia%20Protetyki%20Stomatologicznej%20Dariusz%20Or%C5%82owski!5e0!3m2!1spl!2spl!4v1587213900104!5m2!1spl!2spl'

const MAPS_LINK =
  'https://maps.google.com/?q=Pracownia%20Protetyki%20Stomatologicznej%20Dariusz%20Or%C5%82owski%2C%20ul.%20Karola%20Szymanowskiego%2033%2C%2087-301%20Brodnica'

// Click-to-load facade: the Google iframe (and its cookies) only appears on demand.
export default function MapEmbed() {
  const [shown, setShown] = useState(false)

  return (
    <div className="map reveal">
      {shown ? (
        <iframe
          className="map__frame"
          title="Mapa — ORDENT, ul. Karola Szymanowskiego 33, Brodnica"
          src={MAP_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="map__facade">
          <svg className="map__pin" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
            />
          </svg>
          <p className="map__address">
            ul. Karola Szymanowskiego 33
            <br />
            87-301 Brodnica
          </p>
          <a className="map__link" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
            Otwórz w Google Maps
          </a>
          <button type="button" className="btn btn--primary" onClick={() => setShown(true)}>
            Pokaż mapę
          </button>
        </div>
      )}
    </div>
  )
}
