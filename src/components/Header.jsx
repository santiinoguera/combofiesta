import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import CartButton from './CartButton'
import { WhatsAppIcon, MenuIcon, CloseIcon } from './Icons'
import { whatsappLink } from '../lib/whatsapp'
import { site } from '../data/site'

export const NAV = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#promociones', label: 'Promociones' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#local', label: 'Local' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menú mobile: bloquea scroll, cierra con Escape y devuelve el foco.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('a')?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      toggleRef.current?.focus()
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open ? 'bg-white/90 shadow-[0_1px_0_rgb(23_38_56/0.08)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" onClick={close} className="shrink-0 transition-transform hover:-rotate-3" aria-label="Combo Fiesta, ir al inicio">
          <Logo className="h-12 w-auto sm:h-14" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative rounded-full px-4 py-2 text-[0.95rem] font-semibold text-navy/80 transition-colors hover:text-navy"
                >
                  {item.label}
                  <span className="absolute inset-x-4 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-rojo transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-red hidden !px-5 !py-2.5 sm:inline-flex"
          >
            <WhatsAppIcon className="size-5" />
            Pedí por WhatsApp
          </a>
          <CartButton />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="grid size-11 place-items-center rounded-full bg-navy text-white transition-colors hover:bg-navy-soft lg:hidden"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {/* Panel mobile */}
      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto bg-white px-4 pb-8 sm:px-6 lg:hidden"
      >
        <nav aria-label="Menú mobile" className="pt-4">
          <ul className="divide-y divide-navy/10 border-y border-navy/10">
            {NAV.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="display flex items-center justify-between py-5 text-4xl text-navy transition-colors hover:text-rojo"
                >
                  {item.label}
                  <span className="font-sans text-sm font-bold text-navy/30">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" onClick={close} className="btn btn-red mt-8 w-full !py-4 text-lg">
          <WhatsAppIcon className="size-6" />
          Pedí por WhatsApp
        </a>
        <p className="mt-4 text-center text-sm text-navy/60">
          {site.hours.days} · {site.hours.ranges.join(' y ')}
        </p>
      </div>
    </header>
  )
}
