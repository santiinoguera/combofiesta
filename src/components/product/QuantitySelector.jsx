import { useId } from 'react'

/**
 * Selector de cantidad (12 · 24 · 36 · 48 · 60).
 * Los precios salen de `tiers` del catálogo: no se calcula nada multiplicando.
 * Control segmentado con indicador deslizante; radios nativos para teclado y lectores de pantalla.
 */
export default function QuantitySelector({ tiers, value, onChange, unitLabel = 'unidades', size = 'md' }) {
  const name = useId()
  const n = tiers.length
  const tall = size === 'lg' ? 'h-14' : 'h-12'
  return (
    <fieldset>
      <legend className="mb-2 flex w-full items-baseline justify-between text-[0.7rem] font-extrabold tracking-[0.16em] text-navy/50 uppercase">
        <span>Cantidad de {unitLabel}</span>
      </legend>
      <div className={`relative grid rounded-[10px] bg-crema p-1 ${tall}`} style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {/* indicador */}
        <span
          aria-hidden="true"
          className="absolute top-1 bottom-1 left-1 rounded-[8px] bg-navy shadow-[0_6px_14px_-6px_rgb(23_38_56/0.6)] transition-transform duration-300 ease-[cubic-bezier(0.3,0.9,0.3,1.2)] motion-reduce:transition-none"
          style={{ width: `calc((100% - 0.5rem) / ${n})`, transform: `translateX(${value * 100}%)` }}
        />
        {tiers.map((t, i) => {
          const on = i === value
          return (
            <label key={t.qty} className="relative z-10 grid cursor-pointer place-items-center">
              <input type="radio" name={name} checked={on} onChange={() => onChange(i)} className="peer sr-only" />
              <span
                className={`flex flex-col items-center leading-none transition-colors peer-focus-visible:rounded-md peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rojo ${
                  on ? 'text-white' : 'text-navy/70 hover:text-navy'
                }`}
              >
                <span className="display text-xl sm:text-[1.35rem]">{t.qty}</span>
                <span className={`mt-0.5 text-[0.6rem] font-bold tracking-wide uppercase ${on ? 'text-celeste' : 'text-navy/40'}`}>u.</span>
              </span>
              <span className="sr-only">
                {t.qty} {unitLabel}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
