import { useEffect, useState } from 'react'
import { WhatsAppIcon } from './Icons'
import { whatsappLink } from '../lib/whatsapp'

/* Botón flotante: aparece después del hero */
export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir por WhatsApp"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-[#1faa53] p-4 text-white shadow-lift transition-[opacity,transform] duration-300 hover:scale-105 sm:right-6 sm:bottom-6 sm:px-5 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <WhatsAppIcon className="size-7" />
      <span className="hidden font-bold sm:inline">Pedí ahora</span>
    </a>
  )
}
