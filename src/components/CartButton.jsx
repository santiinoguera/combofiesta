import { useCart } from '../cart/CartContext'
import { CartIcon } from './Icons'

/** Botón del carrito con contador; rebota cada vez que se agrega algo. */
export default function CartButton({ className = '' }) {
  const { count, openCart, pulse } = useCart()
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Abrir carrito, ${count} ${count === 1 ? 'producto' : 'productos'}`}
      className={`relative grid size-11 place-items-center rounded-full bg-rojo text-white shadow-[0_10px_24px_-10px_rgb(229_57_69/0.7)] transition-transform hover:scale-105 ${className}`}
    >
      <span key={pulse} className={pulse ? 'animate-cart-bump' : ''}>
        <CartIcon className="size-6" />
      </span>
      {count > 0 && (
        <span key={`c${pulse}`} className="absolute -top-1 -right-1 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-navy px-1 text-[0.7rem] font-extrabold text-white ring-2 ring-white">
          {count}
        </span>
      )}
    </button>
  )
}
