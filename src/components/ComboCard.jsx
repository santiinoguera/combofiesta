import { useId, useState } from 'react'
import { WhatsAppIcon, CheckIcon, ClockIcon } from './Icons'
import { formatPrice } from '../lib/format'
import { comboLink } from '../lib/whatsapp'

/* Selector de opciones (cantidades o sabores) con radios accesibles */
function Chips({ legend, name, options, value, onChange, render }) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-bold tracking-[0.14em] text-navy/50 uppercase">{legend}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt, i) => (
          <label key={i} className="relative cursor-pointer">
            <input type="radio" name={name} checked={i === value} onChange={() => onChange(i)} className="peer sr-only" />
            <span className="block rounded-xl border-2 border-navy/10 px-3 py-1.5 text-sm font-bold text-navy/70 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rojo hover:border-navy/40">
              {render(opt)}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default function ComboCard({ combo }) {
  const uid = useId()
  const [tierIdx, setTierIdx] = useState(0)
  const [variantIdx, setVariantIdx] = useState(0)
  const [withAddon, setWithAddon] = useState(false)

  const priced = Array.isArray(combo.tiers) && combo.tiers.length > 0
  const tier = priced ? combo.tiers[tierIdx] : null
  const addon = combo.addon
  const variant = combo.variants?.[variantIdx]
  const total = tier ? tier.price + (withAddon && addon ? addon.price : 0) : null
  const perUnit = tier?.qty ? Math.round(total / tier.qty) : null
  const displayName = combo.name.replace(/ (\d+) (g|kg)$/, ' $1 $2')

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
              className="absolute inset-0 m-auto h-[80%] w-auto max-w-[80%] -rotate-3 object-contain drop-shadow-[0_18px_22px_rgb(23_38_56/0.28)] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105"
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

        {/* Promo cheddar: sticker abajo a la izquierda + cinta inferior */}
        {addon && (
          <>
            <img
              src={addon.image}
              alt=""
              aria-hidden="true"
              className="absolute bottom-9 left-2 w-[21%] -rotate-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-0"
            />
            <p className="absolute inset-x-0 bottom-0 bg-rojo/95 px-3 py-1.5 text-center text-[0.8rem] font-extrabold tracking-wide text-white">
              {addon.tag}
            </p>
          </>
        )}

        {/* Agregado incluido (papas pay): sticker arriba a la derecha + etiqueta */}
        {combo.extra && (
          <>
            <img
              src={combo.extra.image}
              alt=""
              aria-hidden="true"
              className="absolute top-2 right-3 w-[22%] rotate-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-0"
            />
            <p className="absolute inset-x-0 bottom-0 bg-rojo/95 px-3 py-1.5 text-center text-[0.8rem] font-extrabold tracking-wide text-white">
              {combo.extra.tag}
            </p>
          </>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="display text-[1.6rem] text-balance text-navy">{displayName}</h3>
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
          {combo.variants && (
            <Chips legend="Sabor" name={`${uid}-v`} options={combo.variants} value={variantIdx} onChange={setVariantIdx} render={(v) => v} />
          )}

          {priced && combo.tiers.length > 1 && (
            <Chips legend="Cantidad" name={`${uid}-q`} options={combo.tiers} value={tierIdx} onChange={setTierIdx} render={(t) => `x${t.qty}`} />
          )}
          {priced && combo.tiers.length === 1 && tier.qty && (
            <p className="text-xs font-bold tracking-[0.14em] text-navy/50 uppercase">
              Combo x{tier.qty} {combo.unitLabel}
            </p>
          )}

          {addon && (
            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl bg-[#FFF4D6] px-4 py-3 ring-1 ring-[#F5B400]/40 transition-colors hover:bg-[#FFEDBD]">
              <span className="flex items-center gap-2.5">
                <img src={addon.image} alt="" aria-hidden="true" className="size-8" />
                <span className="text-sm leading-tight font-bold text-navy">
                  Sumale {addon.label}
                  <span className="block text-xs font-semibold text-navy/60">+{formatPrice(addon.price)}</span>
                </span>
              </span>
              <input type="checkbox" checked={withAddon} onChange={(e) => setWithAddon(e.target.checked)} className="peer sr-only" />
              <span
                aria-hidden="true"
                className="relative h-7 w-12 shrink-0 rounded-full bg-navy/15 transition-colors peer-checked:bg-rojo peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rojo after:absolute after:top-1 after:left-1 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5"
              />
            </label>
          )}

          <div className="flex items-end justify-between gap-3 border-t border-dashed border-navy/15 pt-4">
            {priced ? (
              <p aria-live="polite">
                <span className="sr-only">Precio: </span>
                <span className="display block text-[2.6rem] text-rojo">{formatPrice(total)}</span>
              </p>
            ) : (
              <p className="display text-[2rem] text-navy/80">Consultá precio</p>
            )}
            {perUnit && (
              <p className="pb-1 text-right text-xs leading-tight font-semibold text-navy/55">
                {formatPrice(perUnit)}
                <br />
                por unidad
              </p>
            )}
          </div>

          <a
            href={comboLink(combo, { tier, addon: withAddon ? addon : null, variant })}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn w-full ${priced ? 'btn-navy hover:!bg-rojo' : 'btn-ghost'}`}
          >
            <WhatsAppIcon className="size-5" />
            {priced ? 'Pedir por WhatsApp' : 'Consultar por WhatsApp'}
            <span className="sr-only">: {combo.name}</span>
          </a>
        </div>
      </div>
    </article>
  )
}
