/**
 * Imagen de producto en tres modos:
 *  - pack:  paquete recortado, centrado sobre un círculo celeste.
 *  - photo: foto real completa sobre su propio fondo desenfocado (sin recortar el paquete).
 *  - por defecto: composición 4:3 que ocupa todo el recuadro.
 * Si el producto tiene `addon` (cheddar / papas pay) muestra el sticker y la cinta de promo.
 */
export default function ProductImage({ combo, large = false, className = '' }) {
  const addon = combo.addon
  const anim = 'transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none'
  const loading = large ? 'eager' : 'lazy'
  return (
    <div className={`relative aspect-[4/3] overflow-hidden bg-crema ${className}`}>
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
            loading={loading}
            decoding="async"
            className={`absolute inset-0 m-auto h-[80%] w-auto max-w-[80%] -rotate-3 object-contain drop-shadow-[0_18px_22px_rgb(23_38_56/0.28)] group-hover:rotate-0 ${anim}`}
          />
        </>
      ) : combo.photo ? (
        <>
          <img src={combo.image} alt="" aria-hidden="true" loading={loading} decoding="async" className="absolute inset-0 size-full scale-125 object-cover opacity-80 blur-2xl" />
          <img
            src={combo.image}
            alt={combo.name}
            loading={loading}
            decoding="async"
            className={`absolute inset-0 m-auto h-full w-auto max-w-full object-contain drop-shadow-[0_10px_24px_rgb(23_38_56/0.3)] ${anim}`}
          />
        </>
      ) : (
        <img src={combo.image} alt={`Productos del ${combo.name}`} loading={loading} decoding="async" className={`size-full object-cover ${anim}`} />
      )}

      <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-navy shadow-soft">{combo.brand}</span>
      {combo.weight && (
        <span className="display absolute top-3 right-3 grid size-14 rotate-6 place-items-center rounded-full bg-celeste text-center text-[0.95rem] leading-none text-white shadow-sticker">
          {combo.weight.replace(' ', '')}
        </span>
      )}

      {addon && (
        <>
          <img
            src={addon.image}
            alt=""
            aria-hidden="true"
            className={`absolute bottom-10 left-2 -rotate-6 drop-shadow-[0_8px_10px_rgb(23_38_56/0.35)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-0 ${
              addon.id === 'cheddar' ? 'w-[21%]' : 'w-[18%]'
            }`}
          />
          <p className="promo-ribbon absolute inset-x-0 bottom-0 overflow-hidden bg-rojo px-3 py-1.5 text-center text-[0.8rem] font-extrabold tracking-wide text-white">
            {addon.tag}
          </p>
        </>
      )}
    </div>
  )
}
