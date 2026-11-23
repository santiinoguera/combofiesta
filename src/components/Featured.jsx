import Reveal from './Reveal'
import { ArrowIcon } from './Icons'
import { categories, byCategory } from '../data/combos'
import { useScrollParallax } from '../hooks/useParallax'

/* Tarjeta con la foto en parallax: se desplaza dentro del marco al scrollear */
function CategoryCard({ cat }) {
  const ref = useScrollParallax()
  return (
    <a
      ref={ref}
      href={`#cat-${cat.id}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-crema shadow-soft ring-1 ring-navy/5 sm:rounded-[2rem]"
    >
      <img
        src={cat.cover}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ '--plx-y': '-14px' }}
        className="plx absolute inset-0 size-full scale-110 object-cover transition-[scale] duration-700 group-hover:scale-[1.16]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-6">
        <div>
          <p className="text-[0.7rem] font-bold tracking-[0.16em] text-white/70 uppercase sm:text-xs">
            {byCategory(cat.id).length} opciones
          </p>
          <h3 className="display mt-1 text-[1.35rem] leading-[0.95] text-white sm:text-4xl">{cat.title}</h3>
        </div>
        <span className="hidden size-12 shrink-0 place-items-center rounded-full bg-white text-navy transition-[transform,background-color,color] duration-300 group-hover:-rotate-45 group-hover:bg-rojo group-hover:text-white sm:grid">
          <ArrowIcon className="size-5" />
        </span>
      </div>
    </a>
  )
}

/* Secciones destacadas: acceso directo a cada categoría del catálogo */
export default function Featured() {
  return (
    <section aria-labelledby="featured-title" className="bg-white pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-rojo">
              <span className="h-0.5 w-8 bg-rojo" /> Categorías
            </p>
            <h2 id="featured-title" className="display mt-4 text-[clamp(2.6rem,7vw,5rem)] text-navy">
              ¿Qué estás <span className="text-celeste">buscando?</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg text-navy/70">Entrá directo a la sección que necesitás.</p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal as="li" key={cat.id} delay={(i % 3) * 80}>
              <CategoryCard cat={cat} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
