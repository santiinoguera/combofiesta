import Reveal from './Reveal'
import PromoBanners from './PromoBanners'
import { ClockIcon } from './Icons'
import { promotions, getCombo } from '../data/combos'
import { formatPrice } from '../lib/format'
import { useCart, toCartItem } from '../cart/CartContext'
import { CartIcon } from './Icons'

function AddButton({ p, className, label, children }) {
  const { add, openCart } = useCart()
  return (
    <button
      type="button"
      aria-label={label}
      className={className}
      onClick={() => {
        add(toCartItem(p.combo, { tier: p.tier }))
        openCart()
      }}
    >
      {children}
    </button>
  )
}

function resolve(promo) {
  const combo = getCombo(promo.comboId)
  if (!combo) return null
  const tier = combo.tiers.find((t) => t.qty === promo.tierQty) ?? combo.tiers[0]
  return { ...promo, combo, tier }
}

function FeaturedPromo({ p }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-rojo text-white shadow-lift">
      <div aria-hidden="true" className="dots absolute inset-0 text-white/10" />
      <div className="relative p-6 sm:p-9">
        <span className="inline-block -rotate-2 rounded-lg bg-white px-3 py-1 text-sm font-extrabold tracking-wide text-rojo uppercase shadow-sticker">
          {p.tag}
        </span>
        <h3 className="display mt-5 text-[clamp(2.6rem,6vw,4.5rem)]">{p.headline}</h3>
        <p className="mt-3 max-w-md text-white/85">{p.combo.description}</p>
      </div>
      <div className="relative mx-6 overflow-hidden rounded-[1.5rem] bg-crema sm:mx-9">
        {/* REEMPLAZAR por foto profesional del combo */}
        <img
          src={p.combo.image}
          alt={`Productos del ${p.combo.name}`}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="relative mt-auto flex flex-wrap items-end justify-between gap-4 p-6 sm:p-9">
        <div>
          {p.tier.qty && <p className="text-sm font-bold tracking-[0.16em] text-white/80 uppercase">Combo x{p.tier.qty}</p>}
          <p className="display text-6xl sm:text-7xl">{formatPrice(p.tier.price)}</p>
        </div>
        <AddButton p={p} className="btn btn-white btn-shine !py-4">
          <CartIcon className="size-5 text-rojo" />
          Agregar al carrito
        </AddButton>
      </div>
    </article>
  )
}

function PromoTile({ p, tone }) {
  const tones = {
    celeste: 'bg-celeste text-navy',
    white: 'bg-white text-navy',
    crema: 'bg-crema text-navy',
  }
  return (
    <article className={`group relative flex h-full overflow-hidden rounded-[2rem] shadow-soft ${tones[tone]}`}>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="w-fit rounded-full bg-rojo px-3 py-1 text-xs font-extrabold tracking-wide text-white uppercase">{p.tag}</span>
        <h3 className="display mt-4 text-3xl sm:text-[2.2rem]">{p.headline}</h3>
        <p className="mt-1 text-sm font-semibold opacity-70">{p.combo.name}</p>
        {p.combo.note && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-rojo">
            <ClockIcon className="size-4" /> {p.combo.note}
          </p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p>
            {p.tier.qty && <span className="block text-xs font-bold tracking-[0.14em] uppercase opacity-60">x{p.tier.qty}</span>}
            <span className="display text-5xl text-rojo">{formatPrice(p.tier.price)}</span>
          </p>
          <AddButton
            p={p}
            className="grid size-14 shrink-0 place-items-center rounded-full bg-navy text-white transition-[transform,background-color] duration-300 hover:scale-110 hover:bg-rojo"
            label={`Agregar ${p.combo.name}${p.tier.qty ? ` x${p.tier.qty}` : ''} al carrito`}
          >
            <CartIcon className="size-6" />
          </AddButton>
        </div>
      </div>
      <div className="relative hidden w-[42%] shrink-0 sm:block">
        <img
          src={p.combo.image}
          alt=""
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 size-full transition-transform duration-700 group-hover:scale-105 ${
            p.combo.pack ? 'object-contain p-5 -rotate-3 drop-shadow-[0_14px_18px_rgb(23_38_56/0.25)]' : 'object-cover object-[62%_50%]'
          }`}
        />
      </div>
    </article>
  )
}

export default function Promotions() {
  const items = promotions.map(resolve).filter(Boolean)
  const featured = items.find((p) => p.featured) ?? items[0]
  const rest = items.filter((p) => p !== featured)
  const tones = ['white', 'crema', 'white']

  return (
    <section id="promociones" aria-labelledby="promos-title" className="relative overflow-hidden bg-celeste pt-32 pb-36 text-navy sm:pt-40 sm:pb-44">
      {/* transición suave con la sección blanca de arriba y de abajo: onda + difuminado */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/40 to-transparent" />
      <svg aria-hidden="true" viewBox="0 0 1440 90" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 -top-px h-12 w-full text-white sm:h-20">
        <path fill="currentColor" d="M0 0h1440v38c-120 28-260 46-420 40-190-7-300-48-500-46C330 34 150 70 0 58Z" />
      </svg>
      <div aria-hidden="true" className="dots absolute inset-0 text-white/30 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]" />
      <svg aria-hidden="true" viewBox="0 0 1440 90" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 -bottom-px h-12 w-full rotate-180 text-white sm:h-20">
        <path fill="currentColor" d="M0 0h1440v38c-120 28-260 46-420 40-190-7-300-48-500-46C330 34 150 70 0 58Z" />
      </svg>
      <div aria-hidden="true" className="absolute -top-40 -right-40 size-[32rem] rounded-full bg-white/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <p className="eyebrow text-rojo">
              <span className="h-0.5 w-8 bg-rojo" /> Destacados
            </p>
            <h2 id="promos-title" className="display mt-4 text-[clamp(3rem,8vw,6rem)] text-navy">
              Promo<span className="text-white [text-shadow:3px_3px_0_var(--color-rojo)]">ciones</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-sm text-lg leading-relaxed text-navy/80">
              Los combos que más rinden para cada tipo de juntada. Precios vigentes, consultá disponibilidad por WhatsApp.
            </p>
          </Reveal>
        </div>

        <div className="mt-12">
          <PromoBanners />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-6 lg:row-span-3">
            <FeaturedPromo p={featured} />
          </Reveal>
          {rest.map((p, i) => (
            <Reveal key={p.comboId} delay={80 * (i + 1)} className="lg:col-span-6">
              <PromoTile p={p} tone={tones[i % tones.length]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
