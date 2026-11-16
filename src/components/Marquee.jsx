import { categories } from '../data/combos'

/* Cinta en movimiento entre el hero y el catálogo */
export default function Marquee() {
  const words = [...categories.map((c) => c.label), 'Pan y aderezos incluidos', 'Envíos a domicilio']
  const row = (
    <ul className="flex shrink-0 items-center">
      {words.map((w) => (
        <li key={w} className="display flex items-center gap-6 px-6 text-3xl whitespace-nowrap sm:text-4xl">
          <span className="inline-block transition-transform duration-300 hover:scale-110 hover:text-celeste">{w}</span>
          <svg viewBox="0 0 24 24" className="size-6 animate-spin-slow text-celeste" aria-hidden="true">
            <path fill="currentColor" d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
          </svg>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="relative z-10 -my-6 overflow-hidden py-6" aria-hidden="true">
      <div className="-mx-4 animate-wiggle bg-gradient-to-r from-rojo via-[#f0505b] to-rojo bg-[length:200%_100%] py-4 text-white shadow-lift">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {row}
          {row}
          {row}
          {row}
        </div>
      </div>
    </div>
  )
}
