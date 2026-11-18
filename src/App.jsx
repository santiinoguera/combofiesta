import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Featured from './components/Featured'
import Catalog from './components/Catalog'
import Promotions from './components/Promotions'
import Benefits from './components/Benefits'
import Contact from './components/Contact'
import Store from './components/Store'
import About from './components/About'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import CartDrawer from './components/CartDrawer'
import { CartProvider } from './cart/CartContext'
import { useEffect } from 'react'
import { installHashLinks } from './lib/scrollToHash'

export default function App() {
  useEffect(() => installHashLinks(), [])
  return (
    <CartProvider>
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
        <About />
        <Store />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
    </CartProvider>
  )
}
