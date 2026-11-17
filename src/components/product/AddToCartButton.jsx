import { useEffect, useRef, useState } from 'react'
import { useCart, toCartItem } from '../../cart/CartContext'
import { formatPrice } from '../../lib/format'
import { CartIcon, CheckIcon } from '../Icons'

/**
 * Botón "Agregar al carrito". Muestra la cantidad y el precio elegidos
 * (salen de la selección actual de la tarjeta) y confirma con animación.
 */
export default function AddToCartButton({ combo, selection, count = 1, compact = false, className = '', onAdded }) {
  const { add } = useCart()
  const [done, setDone] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const { tier, addon } = selection
  const total = tier ? (tier.price + (addon?.price ?? 0)) * count : null

  const onClick = () => {
    add(toCartItem(combo, selection), count)
    setDone(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setDone(false), 1400)
    onAdded?.()
  }

  const label = `Agregar ${combo.name}${tier?.qty ? ` x${tier.qty}` : ''}${addon ? ` con ${addon.label}` : ''} al carrito`

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`btn-shine group/add relative flex w-full items-center justify-between gap-3 rounded-[10px] font-bold text-white transition-[background-color,transform] duration-200 active:scale-[0.98] ${
        compact ? 'px-3 py-2.5 text-sm' : 'px-4 py-3.5'
      } ${done ? 'bg-[#1faa53]' : 'bg-navy hover:bg-rojo'} ${className}`}
    >
      <span className="flex items-center gap-2">
        {done ? <CheckIcon className="size-5 animate-pop" /> : <CartIcon className="size-5 transition-transform group-hover/add:-rotate-12" />}
        {done ? '¡Agregado!' : compact ? 'Agregar' : 'Agregar al carrito'}
      </span>
      {!done && total != null && !compact && (
        <span className="rounded-md bg-white/15 px-2 py-0.5 text-sm">
          {tier.qty ? `x${tier.qty} · ` : ''}
          {formatPrice(total)}
        </span>
      )}
    </button>
  )
}
