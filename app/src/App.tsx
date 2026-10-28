import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Gallery from './components/Gallery'
import Faq from './components/Faq'
import Opinie from './components/Opinie'
import Contact from './components/Contact'
import CallBar from './components/CallBar'
import Footer from './components/Footer'
import './styles/tokens.css'
import './styles/app.css'
import './styles/sections.css'

export default function App() {
  return (
    <>
      <Header />
      {/* tabindex=-1 so the skip link moves real focus here (Safari/Firefox don't relocate it otherwise) */}
      <main id="content" tabIndex={-1}>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Gallery />
        <Faq />
        <Opinie />
        <Contact />
      </main>
      <Footer />
      <CallBar />
    </>
  )
}
