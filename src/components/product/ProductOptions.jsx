import { formatPrice } from '../../lib/format'
import QuantitySelector from './QuantitySelector'
import { CheckIcon, PlusIcon } from '../Icons'

/* Chips accesibles (sabores) */
function Chips({ legend, name, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[0.68rem] font-extrabold tracking-[0.16em] text-navy/45 uppercase">{legend}</legend>
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

/**
 * Agregados opcionales (cheddar, papas pay): botones que se activan/desactivan.
 * Cada uno suma su precio al combo.
 */
export function AddonPicker({ addons, selected, onToggle, legend = 'Sumale', grid = false }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[0.68rem] font-extrabold tracking-[0.16em] text-navy/45 uppercase">{legend}</legend>
      <div className={grid ? 'grid grid-cols-2 gap-1.5' : 'flex flex-wrap gap-2'}>
        {addons.map((a) => {
          const on = selected.includes(a.id)
          return (
            <label key={a.id} className="cursor-pointer">
              <input type="checkbox" checked={on} onChange={(e) => onToggle(a.id, e.target.checked)} className="peer sr-only" />
              <span
                className={`flex items-center gap-2 rounded-full border py-1 pr-2 pl-1 text-sm font-bold transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rojo ${
                  on ? 'border-rojo bg-rojo text-white' : 'border-navy/15 bg-white text-navy hover:border-navy/40'
                }`}
              >
                <img src={a.image} alt="" aria-hidden="true" className="size-7 rounded-full bg-crema object-cover" />
                <span className="inline-block flex-1 whitespace-nowrap first-letter:uppercase">{a.short ?? a.label}</span>
                {grid ? <span className="sr-only">+{formatPrice(a.price)}</span> : <span className={`text-xs ${on ? 'text-white/80' : 'text-navy/50'}`}>+{formatPrice(a.price)}</span>}
                <span className={`grid size-5 place-items-center rounded-full ${on ? 'bg-white text-rojo' : 'bg-crema text-navy/60'}`}>
                  {on ? <CheckIcon className="size-3" /> : <PlusIcon className="size-3" />}
                </span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

/** Aderezo a elección (incluido, sin costo). */
export function SaucePicker({ sauces, value, onChange, name }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[0.68rem] font-extrabold tracking-[0.16em] text-navy/45 uppercase">Elegí el aderezo · incluido</legend>
      <div className="grid grid-cols-4 gap-1.5">
        {sauces.map((sc, i) => (
          <label key={sc.id} className="cursor-pointer">
            <input type="radio" name={name} checked={i === value} onChange={() => onChange(i)} className="peer sr-only" />
            <span className="flex flex-col items-center gap-1 rounded-lg border-2 border-navy/10 bg-white px-1 py-1.5 text-center text-[0.7rem] leading-tight font-bold text-navy/70 transition-colors peer-checked:border-navy peer-checked:text-navy peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rojo hover:border-navy/40">
              <img src={sc.image} alt="" aria-hidden="true" className="h-9 w-auto object-contain" />
              {sc.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** Precio grande + detalle (cantidad, por unidad, agregados). */
export function PriceBlock({ combo, cfg, size = 'md' }) {
  const { priced, tier, total, perUnit, addons } = cfg
  if (!priced) return <p className="display text-[1.8rem] leading-none text-navy/60">Consultá precio</p>
  return (
    <div className="flex items-end justify-between gap-3" aria-live="polite">
      <p className="min-w-0">
        <span className="sr-only">Precio: </span>
        <span key={total} className={`display block animate-price-pop leading-none text-rojo ${size === 'lg' ? 'text-[3.2rem]' : 'text-[2.5rem]'}`}>
          {formatPrice(total)}
        </span>
        {tier.qty && (
          <span className="mt-1.5 block truncate text-xs font-semibold text-navy/55">
            {tier.qty} {combo.unitLabel ?? 'unidades'}
            {addons.length > 0 && ` + ${addons.map((a) => a.label).join(' + ')}`}
          </span>
        )}
      </p>
      {perUnit && (
        <p className="shrink-0 pb-0.5 text-right leading-tight">
          <span className="block text-sm font-extrabold text-navy">{formatPrice(perUnit)}</span>
          <span className="text-[0.65rem] font-bold tracking-wide text-navy/45 uppercase">c/u</span>
        </p>
      )}
    </div>
  )
}

/** Opciones de compra de un producto. `cfg` viene de useProductConfig. */
export default function ProductOptions({ combo, cfg, uid, size = 'md' }) {
  return (
    <div className="space-y-5">
      {combo.variants && <Chips legend="Sabor" name={`${uid}-v`} options={combo.variants} value={cfg.variantIdx} onChange={cfg.setVariantIdx} />}

      {cfg.priced && combo.tiers.length > 1 && (
        <QuantitySelector tiers={combo.tiers} value={cfg.tierIdx} onChange={cfg.setTierIdx} unitLabel={combo.unitLabel} size={size} />
      )}
      {cfg.priced && combo.tiers.length === 1 && cfg.tier.qty && (
        <p className="inline-block rounded-md bg-crema px-2.5 py-1 text-xs font-extrabold tracking-[0.12em] text-navy/70 uppercase">
          Combo x{cfg.tier.qty} {combo.unitLabel}
        </p>
      )}

      {combo.sauces && <SaucePicker sauces={combo.sauces} value={cfg.sauceIdx} onChange={cfg.setSauceIdx} name={`${uid}-s`} />}

      {cfg.priced && combo.addons?.some((a) => a.kind === 'sauce') && (
        <AddonPicker
          legend="Sumá más aderezos · $1.000 c/u"
          grid
          addons={combo.addons.filter((a) => a.kind === 'sauce')}
          selected={cfg.addonIds}
          onToggle={cfg.toggleAddon}
        />
      )}

      {cfg.priced && combo.addons?.some((a) => a.kind !== 'sauce') && (
        <AddonPicker addons={combo.addons.filter((a) => a.kind !== 'sauce')} selected={cfg.addonIds} onToggle={cfg.toggleAddon} />
      )}

      <PriceBlock combo={combo} cfg={cfg} size={size} />
    </div>
  )
}
