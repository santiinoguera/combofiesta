import { useId, useState } from 'react'
import { ClockIcon, ExpandIcon } from './Icons'
import ProductImage from './product/ProductImage'
import ProductOptions from './product/ProductOptions'
import AddToCartButton from './product/AddToCartButton'
import ProductModal from './product/ProductModal'
import { useProductConfig } from './product/useProductConfig'
import { formatPrice } from '../lib/format'

const nbsp = (name) => name.replace(/ (\d+(?:,\d+)?) (g|kg|ml)$/, ' $1 $2')

/**
 * Tarjeta de producto.
 *  - default: combos (foto, datos, selector de cantidad, agregados, precio y compra).
 *  - compact: productos sueltos (foto, nombre, precio y compra).
 * Jerarquía: marca/gramaje (chico) → nombre (grande) → descripción → incluye → compra.
 */
export default function ComboCard({ combo, variant = 'default', badge }) {
  const uid = useId()
  const cfg = useProductConfig(combo)
  const [detail, setDetail] = useState(false)
  const open = () => setDetail(true)
  const compact = variant === 'compact'

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-navy/8 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:ring-navy/20 hover:shadow-[0_18px_40px_-24px_rgb(23_38_56/0.35)] motion-reduce:transition-none">
      {/* Foto */}
      <button type="button" onClick={open} className="relative block w-full text-left" aria-label={`Ver detalle de ${combo.name}`}>
        <ProductImage combo={combo} badge={badge} className={compact ? 'w-full' : 'w-full max-sm:aspect-[16/11]'} />
        <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-white/95 text-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ExpandIcon className="size-4" />
        </span>
      </button>

      {/* Datos */}
      <div className={`flex flex-1 flex-col ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[0.68rem] font-extrabold tracking-[0.18em] text-rojo uppercase">{combo.brand}</p>
          {combo.weight && (
            <span className="shrink-0 rounded-full bg-celeste-soft px-2 py-0.5 text-[0.68rem] font-extrabold text-celeste-deep">{combo.weight}</span>
          )}
        </div>

        <h3 className={compact ? 'mt-2 text-[0.98rem] leading-snug font-extrabold text-navy' : 'display mt-2 text-[1.7rem] text-balance text-navy'}>
          <button type="button" onClick={open} className="text-left transition-colors hover:text-rojo">
            {nbsp(combo.name)}
          </button>
        </h3>

        {!compact && (
          <>
            <p className="mt-2 line-clamp-2 text-[0.92rem] leading-snug text-navy/60">{combo.description}</p>
            {combo.includes && (
              <p className="mt-3 text-xs leading-relaxed text-navy/55">
                <span className="font-extrabold text-navy/70">Incluye: </span>
                {combo.includes.join(' · ')}
              </p>
            )}
            {combo.note && (
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-rojo">
                <ClockIcon className="size-3.5" /> {combo.note}
              </p>
            )}
          </>
        )}

        {/* Compra */}
        {compact ? (
          <div className="mt-auto space-y-3 pt-4">
            {cfg.priced ? (
              <p className="display text-[1.7rem] leading-none text-rojo">
                <span className="sr-only">Precio: </span>
                {formatPrice(cfg.total)}
              </p>
            ) : (
              <p className="text-sm font-extrabold text-navy/45">Consultá precio</p>
            )}
            <AddToCartButton combo={combo} selection={cfg.selection} compact />
          </div>
        ) : (
          <div className="mt-auto pt-5">
            <div className="space-y-5 border-t border-navy/8 pt-5">
              <ProductOptions combo={combo} cfg={cfg} uid={uid} />
              <AddToCartButton combo={combo} selection={cfg.selection} />
            </div>
          </div>
        )}
      </div>

      {detail && <ProductModal combo={combo} onClose={() => setDetail(false)} />}
    </article>
  )
}
