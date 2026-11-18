import Reveal from './Reveal'
import { ArrowIcon } from './Icons'
import { CHEDDAR, PAPAS_PAY } from '../data/combos'

/* Banners con las piezas promocionales de cheddar (hamburguesas) y papas pay (panchos) */
function Banner({ promo, title, text, cta, href, align }) {
  return (
    <a
      href={href}
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl bg-white text-navy shadow-soft ring-1 ring-navy/5 sm:flex-row ${align === 'right' ? 'sm:flex-row-reverse' : ''}`}
    >
      <img
        src={promo.promo}
        alt={promo.tag}
        loading="lazy"
        decoding="async"
        className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:w-3/5"
      />
      <div className="flex flex-1 flex-col justify-center gap-3 p-6 sm:p-8">
        <p className="text-xs font-extrabold tracking-[0.2em] text-rojo uppercase">{title}</p>
        <p className="text-navy/70">{text}</p>
        <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-rojo px-4 py-2 font-extrabold text-white transition-colors group-hover:bg-navy">
          {cta}
          <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  )
}

export default function PromoBanners() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Reveal>
        <Banner
          promo={CHEDDAR}
          title="Combos de hamburguesas"
          text="En cualquier combo de hamburguesas, activalo en la tarjeta y se suma al precio."
          cta="Ver hamburguesas"
          href="#cat-hamburguesas"
        />
      </Reveal>
      <Reveal delay={100}>
        <Banner
          promo={PAPAS_PAY}
          title="Combos de panchos y super panchos"
          text="Sumale papas pay Oasis o cheddar (o los dos) a cualquier combo de panchos, por $1.000 más cada uno."
          cta="Ver panchos"
          href="#cat-panchos"
        />
      </Reveal>
    </div>
  )
}
