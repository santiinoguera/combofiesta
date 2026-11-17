import { useEffect, useId, useRef, useState } from 'react'
import ProductImage from './ProductImage'
import ProductOptions from './ProductOptions'
import AddToCartButton from './AddToCartButton'
import { useProductConfig } from './useProductConfig'
import { CheckIcon, ClockIcon, CloseIcon, MinusIcon, PlusIcon } from '../Icons'

/** Vista ampliada de un producto (dialog nativo: foco atrapado y Escape para cerrar). */
export default function ProductModal({ combo, onClose }) {
  const ref = useRef(null)
  const uid = useId()
  const cfg = useProductConfig(combo)
  const [count, setCount] = useState(1)

  useEffect(() => {
    ref.current?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      aria-labelledby={`${uid}-t`}
      className="m-auto max-h-[92dvh] w-[min(64rem,calc(100%-1.5rem))] overflow-hidden rounded-xl bg-white p-0 text-navy shadow-lift backdrop:bg-navy/60 backdrop:backdrop-blur-sm open:animate-dialog-in"
    >
      <div className="grid max-h-[92dvh] overflow-y-auto md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="group relative min-w-0 overflow-hidden">
          <ProductImage combo={combo} large className="md:h-full md:min-h-[30rem]" />
        </div>
        <div className="flex min-w-0 flex-col p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id={`${uid}-t`} className="display text-[2.2rem] text-balance">
              {combo.name}
            </h2>
            <button
              type="button"
              onClick={() => ref.current.close()}
              aria-label="Cerrar"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-crema transition-colors hover:bg-navy hover:text-white"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>
          <p className="mt-2 text-navy/70">{combo.description}</p>

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
              <ClockIcon className="size-4" /> {combo.note}
            </p>
          )}

          <div className="mt-6">
            <ProductOptions combo={combo} cfg={cfg} uid={uid} size="lg" />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex shrink-0 items-center rounded-full bg-crema p-1" role="group" aria-label="Unidades">
              <button type="button" onClick={() => setCount((c) => Math.max(1, c - 1))} aria-label="Restar uno" className="grid size-10 place-items-center rounded-full hover:bg-white">
                <MinusIcon className="size-4" />
              </button>
              <span className="w-8 text-center font-bold" aria-live="polite">
                {count}
              </span>
              <button type="button" onClick={() => setCount((c) => Math.min(99, c + 1))} aria-label="Sumar uno" className="grid size-10 place-items-center rounded-full hover:bg-white">
                <PlusIcon className="size-4" />
              </button>
            </div>
            <AddToCartButton combo={combo} selection={cfg.selection} count={count} className="!py-4" />
          </div>
        </div>
      </div>
    </dialog>
  )
}
