import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import ComboCard from './ComboCard'
import { categories, byCategory } from '../data/combos'

/* Navegación fija entre categorías con indicador de sección activa */
function CategoryNav({ active }) {
  const listRef = useRef(null)
  useEffect(() => {
    // Mantiene visible la pestaña activa en mobile
    // (solo scroll horizontal de la barra: scrollIntoView cortaría el scroll de la página)
    const list = listRef.current
    const el = list?.querySelector(`[data-cat="${active}"]`)
    if (list && el && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' })
    }
  }, [active])

  return (
    <nav aria-label="Categorías del catálogo" className="sticky top-[4.5rem] z-30 mt-10 border-y border-navy/5 bg-white/90 backdrop-blur-md">
      <ul ref={listRef} className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-6 lg:px-8">
        {categories.map((cat) => {
          const on = cat.id === active
          return (
            <li key={cat.id} data-cat={cat.id} className="shrink-0">
              <a
                href={`#cat-${cat.id}`}
                aria-current={on ? 'true' : undefined}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.95rem] font-bold transition-colors ${
                  on ? 'bg-navy text-white' : 'bg-crema text-navy/75 hover:bg-crema-deep hover:text-navy'
                }`}
              >
                {cat.label}
                <span className={`grid min-w-6 place-items-center rounded-full px-1.5 text-xs ${on ? 'bg-rojo text-white' : 'bg-white text-navy/60'}`}>
                  {byCategory(cat.id).length}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function CategorySection({ cat, index }) {
  const items = byCategory(cat.id)
  const priced = items.filter((i) => i.tiers).length
  return (
    <section id={`cat-${cat.id}`} aria-labelledby={`title-${cat.id}`} className="scroll-mt-36 pt-16 first:pt-10 sm:pt-20">
      {/* Cabecera de la categoría */}
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-navy text-white">
        <div className="grid items-center sm:grid-cols-12">
          <div className="relative z-10 p-7 sm:col-span-6 sm:p-10 lg:col-span-5">
            <p className="display text-6xl text-celeste/90">{String(index + 1).padStart(2, '0')}</p>
            <h3 id={`title-${cat.id}`} className="display mt-3 text-[clamp(2.4rem,5vw,3.8rem)]">
              {cat.title}
            </h3>
            <p className="mt-3 max-w-md text-white/75">{cat.tagline}</p>
            <p className="mt-5 text-sm font-bold text-white/60">
              {items.length} {items.length === 1 ? 'opción' : 'opciones'}
              {priced === 0 && ' · precios a consultar'}
            </p>
          </div>
          <div className="relative h-52 sm:col-span-6 sm:h-72 lg:col-span-7">
            <img src={cat.cover} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy via-navy/10 to-transparent sm:bg-gradient-to-r" />
          </div>
        </div>
      </Reveal>

      {(cat.groups ?? [null]).map((g) => {
        const list = g ? items.filter((it) => it.group === g) : items
        if (!list.length) return null
        return (
          <div key={g ?? 'all'}>
            {g && (
              <h4 className="display mt-10 flex items-center gap-3 text-3xl text-navy">
                <span className={`h-1.5 w-10 rounded-full ${g === 'Dulce' ? 'bg-rojo' : 'bg-celeste'}`} />
                {g}
                <span className="font-sans text-sm font-bold text-navy/40">{list.length}</span>
              </h4>
            )}
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {list.map((combo, i) => (
                <Reveal key={combo.id} delay={(i % 3) * 80} className="h-full">
                  <ComboCard combo={combo} />
                </Reveal>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default function Catalog() {
  const [active, setActive] = useState(categories[0].id)

  // Scrollspy: marca la categoría visible
  useEffect(() => {
    const sections = categories.map((c) => document.getElementById(`cat-${c.id}`)).filter(Boolean)
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id.replace('cat-', ''))
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <section id="catalogo" aria-labelledby="catalog-title" className="relative bg-white pt-24 pb-24 sm:pt-28 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-rojo">
              <span className="h-0.5 w-8 bg-rojo" /> Catálogo completo
            </p>
            <h2 id="catalog-title" className="display mt-4 text-[clamp(3rem,8vw,6rem)] text-navy">
              Todo el <span className="text-celeste">catálogo</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-navy/70">
              Tocá un producto para verlo en grande, elegí cantidad o sabor y sumalo al carrito. Al finalizar, el
              pedido completo te llega armado a WhatsApp.
            </p>
          </Reveal>
        </div>
      </div>

      <CategoryNav active={active} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {categories.map((cat, i) => (
          <CategorySection key={cat.id} cat={cat} index={i} />
        ))}
      </div>
    </section>
  )
}
