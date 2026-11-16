import { useRef, useState } from 'react'
import Reveal from './Reveal'
import ComboCard from './ComboCard'
import { categories, combos } from '../data/combos'

export default function CombosSection() {
  const [active, setActive] = useState(categories[0].id)
  const tabRefs = useRef([])
  const list = combos.filter((c) => c.category === active)

  // Navegación con flechas entre pestañas (patrón WAI-ARIA tabs)
  const onKeyDown = (e, i) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (i + dir + categories.length) % categories.length
    setActive(categories[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="combos" aria-labelledby="combos-title" className="relative bg-white pt-24 pb-24 sm:pt-32 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-rojo">
              <span className="h-0.5 w-8 bg-rojo" /> El catálogo
            </p>
            <h2 id="combos-title" className="display mt-4 text-[clamp(3rem,8vw,6rem)] text-navy">
              Nuestros <span className="text-celeste">combos</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-navy/70">
              Elegí la categoría y la cantidad: el precio se actualiza al instante y el pedido te llega armado a
              WhatsApp. Hamburguesas, panchos y choris incluyen pan y aderezos.
            </p>
          </Reveal>
        </div>

        {/* Pestañas */}
        <Reveal delay={150} className="sticky top-[4.5rem] z-20 -mx-4 mt-12 bg-white/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-full sm:px-0">
          <div role="tablist" aria-label="Categorías de combos" className="flex gap-2 overflow-x-auto [scrollbar-width:none] sm:justify-start">
            {categories.map((cat, i) => {
              const selected = cat.id === active
              const count = combos.filter((c) => c.category === cat.id).length
              return (
                <button
                  key={cat.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={selected}
                  aria-controls="panel-combos"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(cat.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[0.95rem] font-bold transition-colors ${
                    selected ? 'bg-navy text-white' : 'bg-crema text-navy/75 hover:bg-crema-deep hover:text-navy'
                  }`}
                >
                  {cat.label}
                  <span
                    className={`grid min-w-6 place-items-center rounded-full px-1.5 text-xs ${
                      selected ? 'bg-rojo text-white' : 'bg-white text-navy/60'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <div
          id="panel-combos"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {list.map((combo, i) => (
            <Reveal key={combo.id} delay={(i % 3) * 80} className="h-full">
              <ComboCard combo={combo} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
