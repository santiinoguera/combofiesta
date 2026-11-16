import { useId, useState } from 'react'
import { CheckIcon, ClockIcon, ExpandIcon } from './Icons'
import ProductImage from './product/ProductImage'
import ProductOptions from './product/ProductOptions'
import AddToCartButton from './product/AddToCartButton'
import ProductModal from './product/ProductModal'
import { useProductConfig } from './product/useProductConfig'

export default function ComboCard({ combo }) {
  const uid = useId()
  const cfg = useProductConfig(combo)
  const [detail, setDetail] = useState(false)
  const displayName = combo.name.replace(/ (\d+(?:,\d+)?) (g|kg|ml)$/, ' $1 $2')

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-navy/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-lift motion-reduce:transition-none">
      <button type="button" onClick={() => setDetail(true)} className="relative block w-full text-left" aria-label={`Ver detalle de ${combo.name}`}>
        <ProductImage combo={combo} />
        <span className="absolute top-14 right-3 grid size-10 translate-y-2 place-items-center rounded-full bg-white/95 text-navy opacity-0 shadow-soft transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ExpandIcon className="size-5" />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="display text-[1.6rem] text-balance text-navy">
          <button type="button" onClick={() => setDetail(true)} className="text-left transition-colors hover:text-rojo">
            {displayName}
          </button>
        </h3>
        <p className="mt-2 text-[0.95rem] leading-snug text-navy/70">{combo.description}</p>

        {combo.includes && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Incluye">
            {combo.includes.map((item) => (
              <li key={item} className="inline-flex items-center gap-1 rounded-full bg-crema px-2.5 py-1 text-xs font-semibold text-navy/80">
                <CheckIcon className="size-3.5 text-celeste-deep" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {combo.note && (
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-rojo">
            <ClockIcon className="size-4" />
            {combo.note}
          </p>
        )}

        <div className="mt-auto space-y-4 pt-5">
          <ProductOptions combo={combo} cfg={cfg} uid={uid} />
          <AddToCartButton combo={combo} selection={cfg.selection} />
        </div>
      </div>

      {detail && <ProductModal combo={combo} onClose={() => setDetail(false)} />}
    </article>
  )
}
