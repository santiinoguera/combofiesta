import { useEffect, useRef, useState } from 'react'
import { useCart, toCartItem } from '../../cart/CartContext'
import { CartIcon, CheckIcon } from '../Icons'

/** Botón "Agregar al carrito" con brillo animado y confirmación. */
export default function AddToCartButton({ combo, selection, count = 1, className = '', onAdded }) {
  const { add } = useCart()
  const [done, setDone] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const onClick = () => {
    add(toCartItem(combo, selection), count)
    setDone(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setDone(false), 1400)
    onAdded?.()
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn btn-shine w-full ${done ? '!bg-[#1faa53] text-white' : 'btn-navy hover:!bg-rojo'} ${className}`}
    >
      {done ? (
        <>
          <CheckIcon className="size-5 animate-pop" />
          ¡Agregado!
        </>
      ) : (
        <>
          <CartIcon className="size-5" />
          Agregar al carrito
        </>
      )}
      <span className="sr-only">: {combo.name}</span>
    </button>
  )
}
