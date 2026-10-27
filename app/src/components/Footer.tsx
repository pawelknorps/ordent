import { phones, hours, ui } from '../data/site'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <a className="wordmark" href="#banner">ORDENT</a>
          <p>{ui.copyright}</p>
        </div>
        <address>
          <strong>ORDENT</strong>
          <span>ul. Karola Szymanowskiego 33</span>
          <span>87-301 Brodnica</span>
          {phones.map((phone) => (
            <a key={phone.href} href={phone.href}>{phone.display}</a>
          ))}
        </address>
        <div>
          <p>{hours}</p>
          <p>{`${ui.emergencyLabel} – ${ui.emergency}`}</p>
        </div>
      </div>
      <div className="container site-footer__credit">
        <p>{'Ikony: '}<a href="https://www.flaticon.com">{'Freepik (flaticon.com)'}</a></p>
      </div>
    </footer>
  )
}
