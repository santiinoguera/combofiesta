import collage from '../assets/img/hero-collage.webp'
import Logo from './Logo'
import Reveal from './Reveal'
import { ArrowIcon, WhatsAppIcon, TruckIcon } from './Icons'
import { whatsappLink } from '../lib/whatsapp'
import { categories } from '../data/combos'
import { site } from '../data/site'
import { usePointerTilt, useScrollParallax } from '../hooks/useParallax'

/* Texto circular giratorio */
function SpinBadge() {
  const text = `Envíos a domicilio · ${site.city} · `
  return (
    <div className="relative grid size-28 place-items-center rounded-full bg-rojo text-white shadow-lift sm:size-32">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="circle" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
        </defs>
        <text className="fill-white text-[10.5px] font-bold tracking-[0.18em] uppercase">
          <textPath href="#circle">{text + text}</textPath>
        </text>
      </svg>
      <TruckIcon className="size-9" />
    </div>
  )
}

export default function Hero() {
  const tiltRef = usePointerTilt()
  const scrollRef = useScrollParallax()
  return (
    <section ref={tiltRef} id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden bg-crema pt-[4.5rem]">
      <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 text-navy/[0.05]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-8 pb-20 sm:px-6 sm:pt-12 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:pt-10 lg:pb-24">
        {/* Marca + mensaje */}
        <div className="lg:col-span-6">
          <Reveal>
            <Logo className="h-36 w-auto -rotate-2 drop-shadow-[0_14px_20px_rgb(23_38_56/0.18)] sm:h-48 lg:h-56" />
          </Reveal>

          <Reveal delay={80}>
            <h1 id="hero-title" className="display mt-8 text-[clamp(2.9rem,7.4vw,5.6rem)] !leading-[1.14] text-navy">
              Todo lo que buscás,{' '}
              <span className="relative inline-block text-rojo">
                en un solo lugar
                <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-1 left-0 h-[0.14em] w-full text-celeste">
                  <path d="M3 14 C 60 3, 120 3, 170 10 S 260 17, 297 6" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-navy/75 sm:text-xl">
              Combos de hamburguesas, panchos y choris con pan y aderezos, snacks, congelados y frutas. Pedí por
              WhatsApp con envío a domicilio en {site.city}.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#catalogo" className="btn btn-navy group !py-4 text-base">
              Ver catálogo
              <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-red !py-4 text-base">
              <WhatsAppIcon className="size-5" />
              Pedir ahora
            </a>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-9 flex flex-wrap gap-2" aria-label="Categorías">
              {categories.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#cat-${c.id}`}
                    className="inline-block rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-navy/75 shadow-soft ring-1 ring-navy/5 transition-colors hover:bg-navy hover:text-white"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Composición de productos (capas con parallax de scroll + inclinación con el mouse) */}
        <div ref={scrollRef} className="relative lg:col-span-6">
          <Reveal delay={150} className="relative mx-auto max-w-xl lg:max-w-none">
           <div className="plx-tilt relative">
            <div
              aria-hidden="true"
              className="plx absolute inset-x-[4%] top-[6%] bottom-[2%]"
              style={{ '--plx-y': '36px', '--plx-x': '-10px', '--plx-z': '-40px' }}
            >
              <div className="absolute inset-0 rotate-3 rounded-[2.5rem] bg-celeste">
                <div className="dots absolute inset-0 rounded-[2.5rem] text-white/35" />
              </div>
            </div>
            <div className="plx relative" style={{ '--plx-y': '-18px', '--plx-x': '12px', '--plx-z': '20px' }}>
            <img
              src={collage}
              alt="Productos de Combo Fiesta: pan de hamburguesa, hamburguesas La Muñeca, salchichas Paladini, ketchup, mayonesa, snacks y congelados"
              width="1300"
              height="930"
              fetchPriority="high"
              decoding="async"
              className="relative w-full drop-shadow-[0_24px_30px_rgb(23_38_56/0.22)]"
            />
            </div>
            <div
              className="plx absolute -top-6 -right-1 sm:-right-4"
              style={{ '--plx-y': '-56px', '--plx-x': '22px', '--plx-z': '70px' }}
            >
              <SpinBadge />
            </div>
           </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
