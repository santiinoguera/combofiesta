import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Featured from './components/Featured'
import Catalog from './components/Catalog'
import Promotions from './components/Promotions'
import Benefits from './components/Benefits'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  return (
    <>
      <a
        href="#catalogo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white"
      >
        Saltar al catálogo
      </a>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Featured />
        <Promotions />
        <Catalog />
        <Benefits />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
