import { formatPrice } from '../../lib/format'

/* Selector accesible de opciones (cantidad o sabor) */
function Chips({ legend, name, options, value, onChange, render }) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-bold tracking-[0.14em] text-navy/50 uppercase">{legend}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt, i) => (
          <label key={i} className="relative cursor-pointer">
            <input type="radio" name={name} checked={i === value} onChange={() => onChange(i)} className="peer sr-only" />
            <span className="block rounded-xl border-2 border-navy/10 px-3 py-1.5 text-sm font-bold text-navy/70 transition-[color,background-color,border-color,transform] peer-checked:scale-105 peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rojo hover:border-navy/40 active:scale-95">
              {render(opt)}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** Opciones + precio de un producto. `cfg` viene de useProductConfig. */
export default function ProductOptions({ combo, cfg, uid }) {
  const { priced, tier, total, perUnit } = cfg
  return (
    <div className="space-y-4">
      {combo.variants && (
        <Chips legend="Sabor" name={`${uid}-v`} options={combo.variants} value={cfg.variantIdx} onChange={cfg.setVariantIdx} render={(v) => v} />
      )}

      {priced && combo.tiers.length > 1 && (
        <Chips legend="Cantidad" name={`${uid}-q`} options={combo.tiers} value={cfg.tierIdx} onChange={cfg.setTierIdx} render={(t) => `x${t.qty}`} />
      )}
      {priced && combo.tiers.length === 1 && tier.qty && (
        <p className="text-xs font-bold tracking-[0.14em] text-navy/50 uppercase">
          Combo x{tier.qty} {combo.unitLabel}
        </p>
      )}

      {combo.addon && (
        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl bg-[#FFF4D6] px-4 py-3 ring-1 ring-[#F5B400]/40 transition-colors hover:bg-[#FFEDBD]">
          <span className="flex items-center gap-2.5">
            <img src={combo.addon.image} alt="" aria-hidden="true" className="size-9 object-contain" />
            <span className="text-sm leading-tight font-bold text-navy">
              Sumale {combo.addon.label}
              <span className="block text-xs font-semibold text-navy/60">+{formatPrice(combo.addon.price)}</span>
            </span>
          </span>
          <input type="checkbox" checked={cfg.withAddon} onChange={(e) => cfg.setWithAddon(e.target.checked)} className="peer sr-only" />
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
            <span key={total} className="display block animate-price-pop text-[2.6rem] text-rojo">
              {formatPrice(total)}
            </span>
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
    </div>
  )
}
