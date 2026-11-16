import { useId, useState } from 'react'
import { WhatsAppIcon, CheckIcon, ClockIcon } from './Icons'
import { formatPrice } from '../lib/format'
import { comboLink } from '../lib/whatsapp'

export default function ComboCard({ combo }) {
  const uid = useId()
  const [tierIdx, setTierIdx] = useState(0)
  const tier = combo.tiers[tierIdx]
  const multi = combo.tiers.length > 1
  const perUnit = tier.qty ? Math.round(tier.price / tier.qty) : null

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-navy/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none">
      {/* Foto */}
      <div className="relative aspect-[4/3] overflow-hidden bg-crema">
        {combo.pack ? (
          <>
            <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
              <div className="size-[78%] max-h-[92%] rounded-full bg-celeste-soft">
                <div className="dots size-full rounded-full text-celeste/40" />
              </div>
            </div>
            <img
              src={combo.image}
              alt={`Paquete de ${combo.name}`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 m-auto h-[78%] w-auto -rotate-3 rounded-md object-contain shadow-lift transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105"
            />
          </>
        ) : (
          <img
            src={combo.image}
            alt={`Productos del ${combo.name}`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-navy shadow-soft">
          {combo.brand}
        </span>
        {combo.weight && (
          <span className="display absolute top-3 right-3 grid size-14 rotate-6 place-items-center rounded-full bg-celeste text-center text-lg leading-none text-white shadow-sticker">
            {combo.weight.replace(' ', '')}
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="display text-[1.65rem] text-balance text-navy">{combo.name.replace(/ (\d+) g$/, ' $1\u00a0g')}</h3>
        <p className="mt-2 text-[0.95rem] leading-snug text-navy/70">{combo.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Incluye">
          {combo.includes.map((item) => (
            <li key={item} className="inline-flex items-center gap-1 rounded-full bg-crema px-2.5 py-1 text-xs font-semibold text-navy/80">
              <CheckIcon className="size-3.5 text-celeste-deep" />
              {item}
            </li>
          ))}
        </ul>

        {combo.note && (
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-rojo">
            <ClockIcon className="size-4" />
            {combo.note}
          </p>
        )}

        <div className="mt-auto pt-5">
          {multi ? (
            <fieldset>
              <legend className="mb-2 text-xs font-bold tracking-[0.14em] text-navy/50 uppercase">Cantidad</legend>
              <div className="flex flex-wrap gap-1.5">
                {combo.tiers.map((t, i) => (
                  <label key={t.qty} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name={uid}
                      value={t.qty}
                      checked={i === tierIdx}
                      onChange={() => setTierIdx(i)}
                      className="peer sr-only"
                    />
                    <span className="block rounded-xl border-2 border-navy/10 px-3 py-1.5 text-sm font-bold text-navy/70 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rojo hover:border-navy/40">
                      x{t.qty}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ) : (
            tier.qty && (
              <p className="text-xs font-bold tracking-[0.14em] text-navy/50 uppercase">
                Combo x{tier.qty} {combo.unitLabel}
              </p>
            )
          )}

          <div className="mt-4 flex items-end justify-between gap-3 border-t border-dashed border-navy/15 pt-4">
            <p aria-live="polite">
              <span className="sr-only">Precio: </span>
              <span className="display block text-[2.6rem] text-rojo">{formatPrice(tier.price)}</span>
            </p>
            {perUnit && (
              <p className="pb-1 text-right text-xs leading-tight font-semibold text-navy/55">
                {formatPrice(perUnit)}
                <br />
                por unidad
              </p>
            )}
          </div>

          <a
            href={comboLink(combo, tier)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-navy mt-4 w-full hover:!bg-rojo"
          >
            <WhatsAppIcon className="size-5" />
            Pedir por WhatsApp
            <span className="sr-only">: {combo.name}{tier.qty ? ` x${tier.qty}` : ''}</span>
          </a>
        </div>
      </div>
    </article>
  )
}
