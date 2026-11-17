import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import ComboCard from './ComboCard'
import { categories, byCategory, getCombo } from '../data/combos'

/* Navegación fija entre categorías con indicador de sección activa */
function CategoryNav({ active }) {
  const listRef = useRef(null)
  useEffect(() => {
    // solo scroll horizontal de la barra (scrollIntoView cortaría el scroll de la página)
    const list = listRef.current
    const el = list?.querySelector(`[data-cat="${active}"]`)
    if (list && el && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' })
    }
  }, [active])

  return (
    <nav aria-label="Categorías del catálogo" className="sticky top-[4.5rem] z-30 border-y border-navy/10 bg-white/95 backdrop-blur-md">
      <ul ref={listRef} className="mx-auto flex max-w-7xl overflow-x-auto px-2 [scrollbar-width:none] sm:px-6 lg:px-8">
        {categories.map((cat, i) => {
          const on = cat.id === active
          return (
            <li key={cat.id} data-cat={cat.id} className="shrink-0">
              <a
                href={`#cat-${cat.id}`}
                aria-current={on ? 'true' : undefined}
                className={`relative flex items-baseline gap-2 px-4 py-4 text-[0.95rem] font-extrabold transition-colors ${on ? 'text-navy' : 'text-navy/45 hover:text-navy'}`}
              >
                <span className="font-display text-xs text-rojo">{String(i + 1).padStart(2, '0')}</span>
                {cat.label}
                <span className={`absolute inset-x-3 bottom-0 h-[3px] origin-left bg-rojo transition-transform duration-300 ${on ? 'scale-x-100' : 'scale-x-0'}`} />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/* Cabecera editorial de cada categoría: número grande, título y portada recortada en diagonal */
function CategoryHeader({ cat, index, count, dark }) {
  return (
    <Reveal className="grid items-end gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className={`flex items-center gap-3 text-xs font-extrabold tracking-[0.2em] uppercase ${dark ? 'text-celeste' : 'text-rojo'}`}>
          <span className="display text-5xl leading-none tracking-normal">{String(index + 1).padStart(2, '0')}</span>
          <span className={`h-px w-10 ${dark ? 'bg-celeste' : 'bg-rojo'}`} />
          {count} {count === 1 ? 'opción' : 'opciones'}
        </p>
        <h3 id={`title-${cat.id}`} className={`display mt-3 text-[clamp(2.6rem,6.5vw,5rem)] ${dark ? 'text-white' : 'text-navy'}`}>
          {cat.title}
        </h3>
        <p className={`mt-3 max-w-xl text-lg ${dark ? 'text-white/70' : 'text-navy/65'}`}>{cat.tagline}</p>
      </div>
      <div className="relative hidden h-40 overflow-hidden lg:col-span-5 lg:block [clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]">
        <img src={cat.cover} alt="" aria-hidden="true" loading="lazy" decoding="async" className="size-full object-cover" />
      </div>
    </Reveal>
  )
}

function Grid({ items, compact, highlight }) {
  return (
    <div
      className={`grid ${
        compact
          ? 'grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8'
          : 'gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12'
      }`}
    >
      {items.map((combo, i) => (
        <Reveal key={combo.id} delay={(i % (compact ? 4 : 3)) * 70} className="h-full">
          <ComboCard combo={combo} variant={compact ? 'compact' : 'default'} badge={combo.id === highlight ? 'Más pedido' : undefined} />
        </Reveal>
      ))}
    </div>
  )
}

/* Combos (con contenido) en tarjeta completa; productos sueltos en grilla compacta */
function Products({ items, highlight }) {
  const combos = items.filter((c) => c.includes)
  const loose = items.filter((c) => !c.includes)
  return (
    <div className="space-y-14">
      {combos.length > 0 && <Grid items={combos} highlight={highlight} />}
      {loose.length > 0 && <Grid items={loose} compact />}
    </div>
  )
}

const BG = ['bg-white', 'bg-crema']

function CategorySection({ cat, index }) {
  const all = byCategory(cat.id)
  // el destacado va primero en la grilla, con su etiqueta
  const hl = cat.highlight ? getCombo(cat.highlight) : null
  const rest = hl ? [hl, ...all.filter((c) => c !== hl)] : all
  const dark = false

  return (
    <section id={`cat-${cat.id}`} aria-labelledby={`title-${cat.id}`} className={`relative scroll-mt-32 py-16 sm:py-24 ${BG[index % BG.length]}`}>
      {dark && <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 text-white/[0.04]" />}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CategoryHeader cat={cat} index={index} count={all.length} dark={dark} />


        <div className="mt-12">
          {cat.groups ? (
            cat.groups.map((g) => {
              const list = rest.filter((it) => it.group === g)
              if (!list.length) return null
              return (
                <div key={g} className="mt-10 first:mt-0">
                  <h4 className={`mb-5 flex items-center gap-3 text-sm font-extrabold tracking-[0.18em] uppercase ${dark ? 'text-white' : 'text-navy'}`}>
                    <span className={`h-[3px] w-8 ${g === 'Dulce' ? 'bg-rojo' : 'bg-celeste'}`} />
                    {g}
                    <span className={dark ? "text-white/40" : "text-navy/40"}>{list.length}</span>
                  </h4>
                  <Products items={list} highlight={cat.highlight} />
                </div>
              )
            })
          ) : (
            <Products items={rest} highlight={cat.highlight} />
          )}
        </div>
      </div>
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
    <section id="catalogo" aria-labelledby="catalog-title" className="relative bg-white pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-rojo">
              <span className="h-0.5 w-8 bg-rojo" /> Catálogo completo
            </p>
            <h2 id="catalog-title" className="display mt-4 text-[clamp(3rem,8vw,6rem)] text-navy">
              Armá tu <span className="text-celeste">pedido</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5">
            <ol className="grid grid-cols-3 gap-3 text-sm">
              {['Elegí el combo', 'Marcá la cantidad', 'Sumalo y pedí'].map((t, i) => (
                <li key={t} className="border-t-2 border-navy pt-2 font-bold text-navy/80">
                  <span className="display block text-2xl text-rojo">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>

      <CategoryNav active={active} />

      {categories.map((cat, i) => (
        <CategorySection key={cat.id} cat={cat} index={i} />
      ))}
    </section>
  )
}
