import choripan from '../assets/img/choripan.webp'
import Reveal from './Reveal'
import { ArrowIcon, WhatsAppIcon, TruckIcon } from './Icons'
import { whatsappLink, comboLink } from '../lib/whatsapp'
import { formatPrice } from '../lib/format'
import { combos, categories, getCombo, promotions } from '../data/combos'
import { site } from '../data/site'

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
  const featured = promotions.find((p) => p.featured) ?? promotions[0]
  const fCombo = getCombo(featured.comboId)
  const fTier = fCombo.tiers.find((t) => t.qty === featured.tierQty) ?? fCombo.tiers[0]
  const chori = getCombo('combo-especial-choris')

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden bg-crema pt-[4.5rem]">
      {/* Fondo: palabra gigante en contorno */}
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-6 left-0 right-0 select-none overflow-hidden">
        <p className="display whitespace-nowrap text-[28vw] leading-none text-transparent [-webkit-text-stroke:2px_rgb(23_38_56/0.06)]">
          Fiesta Fiesta
        </p>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-16">
        {/* Columna texto */}
        <div className="lg:col-span-7 lg:pt-6">
          <Reveal>
            <p className="eyebrow text-navy/70">
              <span className="inline-block size-2 rounded-full bg-rojo" />
              {site.city}, {site.region}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 id="hero-title" className="display mt-5 text-[clamp(3.4rem,11vw,8.4rem)] text-navy">
              Tu <span className="relative inline-block text-rojo">fiesta
                <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-1 left-0 h-[0.14em] w-full text-celeste">
                  <path d="M3 14 C 60 3, 120 3, 170 10 S 260 17, 297 6" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              arranca con
              <br />
              un buen{' '}
              <span className="inline-block -rotate-2 rounded-2xl bg-celeste px-3 pb-1 text-white shadow-sticker">combo</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-navy/75 sm:text-xl">
              Todo lo que necesitás para compartir, disfrutar y hacer de cada encuentro un momento especial.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#combos" className="btn btn-navy group !py-4 text-base">
              Ver combos
              <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-red !py-4 text-base">
              <WhatsAppIcon className="size-5" />
              Pedir ahora
            </a>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-navy/15 border-t border-navy/15 pt-6">
              <div className="pr-4">
                <dt className="text-xs font-semibold text-navy/60 sm:text-sm">Combos</dt>
                <dd className="display mt-1 text-4xl text-navy">{combos.length}</dd>
              </div>
              <div className="px-4">
                <dt className="text-xs font-semibold text-navy/60 sm:text-sm">Categorías</dt>
                <dd className="display mt-1 text-4xl text-navy">{categories.length}</dd>
              </div>
              <div className="pl-4">
                <dt className="text-xs font-semibold text-navy/60 sm:text-sm">Hasta</dt>
                <dd className="display mt-1 text-4xl text-navy">
                  x60<span className="sr-only"> unidades por combo</span>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Columna visual */}
        <div className="relative lg:col-span-5">
          <Reveal delay={150} className="relative mx-auto mt-6 max-w-md lg:mt-10 lg:max-w-none">
            {/* Bloque celeste con "sésamo" */}
            <div aria-hidden="true" className="absolute -inset-x-2 top-8 bottom-10 rotate-3 rounded-[2.5rem] bg-celeste">
              <div className="dots absolute inset-0 rounded-[2.5rem] text-white/35" />
            </div>

            {/* Foto principal — REEMPLAZAR por fotografía profesional en src/assets/img/choripan.webp */}
            <figure className="relative -rotate-2 overflow-hidden rounded-[2rem] bg-white p-3 shadow-lift transition-transform duration-500 hover:rotate-0">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-[#f7f7f7]">
                <img
                  src={choripan}
                  alt="Choripán Paladini con chimichurri y lechuga, junto a un pan francés"
                  width="713"
                  height="451"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover object-[40%_60%]"
                />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#f7f7f7] to-transparent" />
              </div>
              <figcaption className="flex items-end justify-between gap-3 px-2 pb-1 pt-4">
                <div>
                  <p className="text-xs font-bold tracking-[0.18em] text-rojo uppercase">Combo especial</p>
                  <p className="display mt-1 text-2xl text-navy">Choris Paladini</p>
                </div>
                <a
                  href={comboLink(chori, chori.tiers[0])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full bg-navy px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-rojo"
                  aria-label={`Pedir ${chori.name} x${chori.tiers[0].qty} por WhatsApp`}
                >
                  x{chori.tiers[0].qty} {formatPrice(chori.tiers[0].price)}
                </a>
              </figcaption>
            </figure>

            {/* Sticker producto destacado */}
            <a
              href={comboLink(fCombo, fTier)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--r': '-5deg' }}
              className="group absolute -top-12 -left-3 w-36 animate-float rounded-2xl bg-white p-2 shadow-lift ring-1 ring-navy/5 sm:-left-10 sm:w-48"
              aria-label={`Pedir ${fCombo.name} x${fTier.qty} por ${formatPrice(fTier.price)} en WhatsApp`}
            >
              <img src={fCombo.image} alt="" width="726" height="424" loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-xl bg-crema object-cover" />
              <div className="flex items-center justify-between px-1.5 pb-1 pt-2">
                <span className="text-[0.62rem] leading-tight font-bold whitespace-nowrap text-navy/70 uppercase sm:text-[0.7rem]">
                  {featured.tag}
                  <br />x{fTier.qty}
                </span>
                <span className="display rounded-lg bg-rojo px-2 py-1 text-xl text-white">{formatPrice(fTier.price)}</span>
              </div>
            </a>

            <div className="absolute -top-8 -right-2 sm:-right-6">
              <SpinBadge />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
