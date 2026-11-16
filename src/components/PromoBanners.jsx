import Reveal from './Reveal'
import { ArrowIcon } from './Icons'
import { CHEDDAR, PAPAS_PAY, getCombo } from '../data/combos'
import { formatPrice } from '../lib/format'

/* Banners de las promociones de agregados: cheddar (hamburguesas) y papas pay (super panchos) */
function Banner({ tone, sticker, eyebrow, title, text, cta, href, image, stickerSide }) {
  return (
    <article className={`group relative grid h-full overflow-hidden rounded-[2rem] shadow-lift sm:grid-cols-2 ${tone}`}>
      <div className="relative z-10 flex flex-col p-7 sm:p-9">
        <span className="w-fit -rotate-2 rounded-lg bg-white px-3 py-1 text-xs font-extrabold tracking-wide text-rojo uppercase shadow-sticker">
          {eyebrow}
        </span>
        <h3 className="display mt-5 text-[clamp(2.2rem,4.5vw,3.4rem)]">{title}</h3>
        <p className="mt-3 max-w-sm opacity-85">{text}</p>
        <div className="mt-auto pt-6">
          <a href={href} className="btn btn-white group/btn !py-3.5">
            {cta}
            <ArrowIcon className="size-5 transition-transform group-hover/btn:translate-x-1" />
          </a>
        </div>
      </div>
      <div className="relative min-h-56">
        <img src={image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover sm:rounded-l-[1.5rem]" />
        <img
          src={sticker}
          alt=""
          aria-hidden="true"
          className={`absolute bottom-3 w-[34%] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-0 ${
            stickerSide === 'left' ? 'left-3 -rotate-6' : 'right-3 rotate-6'
          }`}
        />
      </div>
    </article>
  )
}

export default function PromoBanners() {
  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
      <Reveal>
        <Banner
          tone="bg-[#FFC233] text-navy"
          sticker={CHEDDAR.image}
          stickerSide="left"
          eyebrow="Combos de hamburguesas"
          title={CHEDDAR.tag}
          text={`Cualquier combo de hamburguesas, con cheddar por ${formatPrice(CHEDDAR.price)} más. Activalo en la tarjeta del combo.`}
          cta="Ver hamburguesas"
          href="#cat-hamburguesas"
          image={getCombo('la-muneca-120').image}
        />
      </Reveal>
      <Reveal delay={100}>
        <Banner
          tone="bg-celeste text-navy"
          sticker={PAPAS_PAY.image}
          eyebrow="Combos de super panchos"
          title={PAPAS_PAY.tag}
          text="Los combos de super panchos Paladini y Sugarosa vienen con papas pay."
          cta="Ver panchos"
          href="#cat-panchos"
          image={getCombo('super-panchos-paladini').image}
        />
      </Reveal>
    </div>
  )
}
