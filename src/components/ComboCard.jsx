import { useId, useState } from 'react'
import { ClockIcon, ExpandIcon } from './Icons'
import ProductImage from './product/ProductImage'
import ProductOptions from './product/ProductOptions'
import { formatPrice } from '../lib/format'
import AddToCartButton from './product/AddToCartButton'
import ProductModal from './product/ProductModal'
import { useProductConfig } from './product/useProductConfig'

const nbsp = (name) => name.replace(/ (\d+(?:,\d+)?) (g|kg|ml)$/, ' $1 $2')

/* Marca · gramaje: información secundaria */
function Meta({ combo, light = false }) {
  return (
    <p className={`text-[0.7rem] font-extrabold tracking-[0.18em] uppercase ${light ? 'text-celeste' : 'text-rojo'}`}>
      {combo.brand}
      {combo.weight && <span className={light ? 'text-white/50' : 'text-navy/40'}> · {combo.weight}</span>}
    </p>
  )
}

/* Etiquetas chicas de contenido */
function Tags({ items }) {
  if (!items) return null
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1" aria-label="Incluye">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-1.5 text-xs font-semibold text-navy/60">
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-celeste" />
          {t}
        </li>
      ))}
    </ul>
  )
}

function Note({ text }) {
  if (!text) return null
  return (
    <p className="inline-flex items-center gap-1.5 text-sm font-bold text-rojo">
      <ClockIcon className="size-4" /> {text}
    </p>
  )
}

/**
 * Tarjeta de producto en tres variantes:
 *  - default: foto arriba, datos y compra abajo.
 *  - feature: horizontal y grande (producto destacado de la categoría).
 *  - compact: chica, para productos sueltos (congelados, snacks sueltos).
 */
export default function ComboCard({ combo, variant = 'default', badge }) {
  const uid = useId()
  const cfg = useProductConfig(combo)
  const [detail, setDetail] = useState(false)
  const open = () => setDetail(true)

  const imageButton = (cls, large = false) => (
    <button type="button" onClick={open} className={`group/img relative block w-full text-left ${cls}`} aria-label={`Ver detalle de ${combo.name}`}>
      <ProductImage combo={combo} large={large} badge={badge} className="w-full" />
      <span className="absolute bottom-3 left-3 grid size-10 translate-y-2 place-items-center rounded-full bg-white/95 text-navy opacity-0 shadow-soft transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ExpandIcon className="size-5" />
      </span>
    </button>
  )

  const modal = detail && <ProductModal combo={combo} onClose={() => setDetail(false)} />

  if (variant === 'compact') {
    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-md bg-white ring-1 ring-navy/10 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none">
        {imageButton('')}
        <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
          <Meta combo={combo} />
          <h4 className="text-[0.95rem] leading-snug font-extrabold text-navy sm:text-base">
            <button type="button" onClick={open} className="text-left hover:text-rojo">
              {nbsp(combo.name)}
            </button>
          </h4>
          <div className="mt-auto space-y-2.5 pt-2">
            {cfg.priced ? (
              <p className="display text-[1.7rem] leading-none text-rojo">
                <span className="sr-only">Precio: </span>
                {formatPrice(cfg.total)}
              </p>
            ) : (
              <p className="text-sm font-extrabold text-navy/50">Consultá precio</p>
            )}
            <AddToCartButton combo={combo} selection={cfg.selection} compact />
          </div>
        </div>
        {modal}
      </article>
    )
  }

  if (variant === 'feature') {
    return (
      <article className="group grid overflow-hidden rounded-md bg-white shadow-soft ring-1 ring-navy/10 lg:grid-cols-12">
        {imageButton('bg-crema lg:col-span-7 lg:flex lg:items-center', true)}
        <div className="flex flex-col gap-4 p-6 sm:p-8 lg:col-span-5">
          <Meta combo={combo} />
          <h3 className="display text-[clamp(2.2rem,4vw,3.2rem)] text-balance text-navy">
            <button type="button" onClick={open} className="text-left hover:text-rojo">
              {nbsp(combo.name)}
            </button>
          </h3>
          <p className="text-navy/70">{combo.description}</p>
          <Tags items={combo.includes} />
          <Note text={combo.note} />
          <div className="mt-auto space-y-4 border-t border-navy/10 pt-5">
            <ProductOptions combo={combo} cfg={cfg} uid={uid} size="lg" />
            <AddToCartButton combo={combo} selection={cfg.selection} />
          </div>
        </div>
        {modal}
      </article>
    )
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md bg-white ring-1 ring-navy/10 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none">
      {imageButton('')}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Meta combo={combo} />
        <h3 className="display -mt-1 text-[1.65rem] text-balance text-navy">
          <button type="button" onClick={open} className="text-left hover:text-rojo">
            {nbsp(combo.name)}
          </button>
        </h3>
        <p className="line-clamp-2 text-sm leading-snug text-navy/65">{combo.description}</p>
        <Tags items={combo.includes} />
        <Note text={combo.note} />
        <div className="mt-auto space-y-4 pt-3">
          <ProductOptions combo={combo} cfg={cfg} uid={uid} />
          <AddToCartButton combo={combo} selection={cfg.selection} />
        </div>
      </div>
      {modal}
    </article>
  )
}

