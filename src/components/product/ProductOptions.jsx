import { formatPrice } from '../../lib/format'
import QuantitySelector from './QuantitySelector'

/* Chips accesibles (sabores) */
function Chips({ legend, name, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[0.7rem] font-extrabold tracking-[0.16em] text-navy/50 uppercase">{legend}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt, i) => (
          <label key={opt} className="cursor-pointer">
            <input type="radio" name={name} checked={i === value} onChange={() => onChange(i)} className="peer sr-only" />
            <span className="block rounded-md border border-navy/15 px-2.5 py-1.5 text-sm font-bold text-navy/70 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rojo hover:border-navy/50">
              {opt}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** Aviso de promo con interruptor: "Por $1.000 más te llevás un cheddar". */
export function AddonToggle({ addon, checked, onChange }) {
  return (
    <label
      className={`group/addon flex cursor-pointer items-center gap-3 border-l-4 py-2.5 pr-3 pl-3 transition-colors ${
        checked ? 'border-rojo bg-rojo/10' : 'border-[#F5B400] bg-[#FFF6DB] hover:bg-[#FFEFC2]'
      }`}
    >
      <img src={addon.image} alt="" aria-hidden="true" className="size-10 shrink-0 rounded-md object-cover" />
      <span className="min-w-0 flex-1 text-sm leading-tight font-bold text-navy">
        {addon.tag}
        <span className="block text-xs font-semibold text-navy/60">{checked ? 'Agregado a este combo' : 'Tocá para sumarlo'}</span>
      </span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span
        aria-hidden="true"
        className="relative h-7 w-12 shrink-0 rounded-full bg-navy/20 transition-colors peer-checked:bg-rojo peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rojo after:absolute after:top-1 after:left-1 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5"
      />
    </label>
  )
}

/** Precio grande + detalle (cantidad, por unidad, adicional). */
export function PriceBlock({ combo, cfg, size = 'md' }) {
  const { priced, tier, total, perUnit, addon } = cfg
  if (!priced) return <p className="display text-[1.8rem] leading-none text-navy/70">Consultá precio</p>
  return (
    <div className="flex items-end justify-between gap-3" aria-live="polite">
      <p>
        <span className="sr-only">Precio: </span>
        <span key={total} className={`display block animate-price-pop leading-none text-rojo ${size === 'lg' ? 'text-[3.4rem]' : 'text-[2.6rem]'}`}>
          {formatPrice(total)}
        </span>
        {tier.qty && (
          <span className="mt-1 block text-xs font-bold text-navy/60">
            {tier.qty} {combo.unitLabel ?? 'unidades'}
            {addon && ` + ${addon.label}`}
          </span>
        )}
      </p>
      {perUnit && (
        <p className="pb-0.5 text-right leading-tight">
          <span className="block text-base font-extrabold text-navy">{formatPrice(perUnit)}</span>
          <span className="text-[0.7rem] font-bold tracking-wide text-navy/50 uppercase">por unidad</span>
        </p>
      )}
    </div>
  )
}

/** Opciones de compra de un producto. `cfg` viene de useProductConfig. */
export default function ProductOptions({ combo, cfg, uid, size = 'md' }) {
  return (
    <div className="space-y-4">
      {combo.variants && <Chips legend="Sabor" name={`${uid}-v`} options={combo.variants} value={cfg.variantIdx} onChange={cfg.setVariantIdx} />}

      {cfg.priced && combo.tiers.length > 1 && (
        <QuantitySelector tiers={combo.tiers} value={cfg.tierIdx} onChange={cfg.setTierIdx} unitLabel={combo.unitLabel} size={size} />
      )}
      {cfg.priced && combo.tiers.length === 1 && cfg.tier.qty && (
        <p className="inline-block bg-crema px-2.5 py-1 text-xs font-extrabold tracking-[0.12em] text-navy/70 uppercase">
          Combo x{cfg.tier.qty} {combo.unitLabel}
        </p>
      )}

      {combo.addon && <AddonToggle addon={combo.addon} checked={cfg.withAddon} onChange={cfg.setWithAddon} />}

      <PriceBlock combo={combo} cfg={cfg} size={size} />
    </div>
  )
}
