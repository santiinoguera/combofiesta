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
  const [view, setView] = useState('combo')

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
        <div className="group relative flex min-w-0 flex-col overflow-hidden bg-crema">
          {view === 'bread' && combo.bread ? (
            <figure className="relative aspect-[4/3] md:aspect-auto md:min-h-[26rem] md:flex-1">
              <img src={combo.bread.image} alt={combo.bread.caption} className="absolute inset-0 size-full animate-price-pop object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent px-4 pt-10 pb-3 text-sm font-bold text-white">
                Así es el pan que te llevás · {combo.bread.caption}
              </figcaption>
            </figure>
          ) : (
            <ProductImage combo={combo} large className="md:aspect-auto md:min-h-[26rem] md:flex-1" />
          )}

          {combo.bread && (
            <div className="flex gap-2 border-t border-navy/10 bg-white p-3" role="group" aria-label="Fotos del producto">
              {[
                { id: 'combo', label: 'El combo', src: combo.image, cover: !combo.pack },
                { id: 'bread', label: 'Así es el pan', src: combo.bread.image, cover: true },
              ].map((t) => {
                const on = view === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setView(t.id)}
                    aria-pressed={on}
                    className={`flex flex-1 items-center gap-2 rounded-lg border-2 p-1.5 pr-3 text-left text-sm font-extrabold transition-colors ${
                      on ? 'border-navy bg-navy text-white' : 'border-navy/10 text-navy hover:border-navy/40'
                    }`}
                  >
                    <img src={t.src} alt="" className={`size-11 shrink-0 rounded-md bg-crema ${t.cover ? 'object-cover' : 'object-contain'}`} />
                    {t.label}
                  </button>
                )
              })}
            </div>
          )}
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
