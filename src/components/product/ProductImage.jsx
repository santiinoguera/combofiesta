/**
 * Imagen de producto en tres modos:
 *  - pack:  paquete recortado, centrado sobre un círculo celeste.
 *  - photo: foto real completa sobre su propio fondo desenfocado (sin recortar el paquete).
 *  - por defecto: composición del combo que ocupa todo el recuadro.
 * Si el producto tiene `addon` con `promo` (cheddar / papas pay), muestra la placa promocional
 * chica en la esquina superior derecha, sobre la zona libre de la composición.
 */
export default function ProductImage({ combo, large = false, className = '', badge }) {
  const anim = 'transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none'
  const loading = large ? 'eager' : 'lazy'
  const promo = combo.addon?.promo
  return (
    <div className={`relative aspect-[4/3] overflow-hidden bg-crema ${className}`}>
      {combo.pack ? (
        <>
          <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
            <div className="size-[76%] max-h-[90%] rounded-full bg-celeste-soft">
              <div className="dots size-full rounded-full text-celeste/40" />
            </div>
          </div>
          <img
            src={combo.image}
            alt={`Paquete de ${combo.name}`}
            loading={loading}
            decoding="async"
            className={`absolute inset-0 m-auto h-[80%] w-auto max-w-[80%] object-contain drop-shadow-[0_18px_22px_rgb(23_38_56/0.28)] ${anim}`}
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

      {badge && (
        <span className="absolute top-0 left-0 bg-rojo px-3 py-1.5 text-[0.7rem] font-extrabold tracking-[0.14em] text-white uppercase">{badge}</span>
      )}

      {promo && (
        <img
          src={promo}
          alt={combo.addon.tag}
          loading={loading}
          decoding="async"
          className={`promo-badge absolute top-2 right-2 rotate-3 rounded-md shadow-[0_10px_24px_-8px_rgb(23_38_56/0.6)] ring-2 ring-white transition-transform duration-300 group-hover:rotate-0 ${
            large ? 'w-[30%]' : 'w-[33%]'
          }`}
        />
      )}
    </div>
  )
}
