import { useId } from 'react'

/**
 * Selector de cantidad (x12 · x24 · x36 · x48 · x60).
 * Los precios salen de `tiers` del catálogo: no se calcula nada multiplicando.
 * Control segmentado con indicador deslizante; radios nativos para teclado y lectores de pantalla.
 */
export default function QuantitySelector({ tiers, value, onChange, unitLabel = 'unidades', size = 'md' }) {
  const name = useId()
  const n = tiers.length
  const tall = size === 'lg' ? 'h-12' : 'h-11'
  return (
    <fieldset>
      <legend className="mb-2 text-[0.68rem] font-extrabold tracking-[0.16em] text-navy/45 uppercase">Cantidad de {unitLabel}</legend>
      <div className={`relative grid rounded-lg bg-crema p-1 ${tall}`} style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        <span
          aria-hidden="true"
          className="absolute top-1 bottom-1 left-1 rounded-md bg-navy transition-transform duration-300 ease-[cubic-bezier(0.3,0.9,0.3,1.2)] motion-reduce:transition-none"
          style={{ width: `calc((100% - 0.5rem) / ${n})`, transform: `translateX(${value * 100}%)` }}
        />
        {tiers.map((t, i) => {
          const on = i === value
          return (
            <label key={t.qty} className="relative z-10 grid cursor-pointer place-items-center">
              <input type="radio" name={name} checked={on} onChange={() => onChange(i)} className="peer sr-only" />
              <span
                className={`text-[0.95rem] font-extrabold tabular-nums transition-colors peer-focus-visible:rounded peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rojo ${
                  on ? 'text-white' : 'text-navy/60 hover:text-navy'
                }`}
              >
                <span className={`text-[0.7rem] ${on ? 'text-celeste' : 'text-navy/35'}`}>x</span>
                {t.qty}
              </span>
              <span className="sr-only"> {unitLabel}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
