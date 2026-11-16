import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'

/**
 * Carrito de compras. Se guarda en el navegador del cliente (localStorage) para que no se pierda
 * al recargar. Al finalizar, el pedido completo se envía por WhatsApp (ver lib/whatsapp.js).
 */
const CartContext = createContext(null)
const STORAGE_KEY = 'combofiesta-cart-v1'

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const data = raw ? JSON.parse(raw) : []
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const i = items.findIndex((it) => it.key === action.item.key)
      if (i === -1) return [...items, { ...action.item, count: action.count }]
      return items.map((it, j) => (j === i ? { ...it, count: it.count + action.count } : it))
    }
    case 'set':
      return items
        .map((it) => (it.key === action.key ? { ...it, count: action.count } : it))
        .filter((it) => it.count > 0)
    case 'remove':
      return items.filter((it) => it.key !== action.key)
    case 'clear':
      return []
    default:
      return items
  }
}

/** Convierte la selección de una tarjeta en una línea del carrito. */
export function toCartItem(combo, { tier, addon, variant }) {
  const unitPrice = tier ? tier.price + (addon?.price ?? 0) : null
  return {
    key: [combo.id, tier?.qty ?? '', addon?.id ?? '', variant ?? ''].join('|'),
    id: combo.id,
    name: combo.name,
    image: combo.image,
    pack: !!combo.pack,
    tierQty: tier?.qty ?? null,
    unitLabel: combo.unitLabel ?? null,
    addonLabel: addon?.label ?? null,
    variant: variant ?? null,
    unitPrice,
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load)
  const [open, setOpen] = useState(false)
  const [pulse, setPulse] = useState(0) // dispara la animación del ícono del carrito

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* navegación privada o almacenamiento bloqueado: el carrito funciona igual en memoria */
    }
  }, [items])

  const add = useCallback((item, count = 1) => {
    dispatch({ type: 'add', item, count })
    setPulse((p) => p + 1)
  }, [])

  const value = useMemo(() => {
    const count = items.reduce((n, it) => n + it.count, 0)
    const total = items.reduce((n, it) => n + (it.unitPrice ?? 0) * it.count, 0)
    const hasUnpriced = items.some((it) => it.unitPrice == null)
    return {
      items,
      count,
      total,
      hasUnpriced,
      open,
      pulse,
      add,
      setCount: (key, n) => dispatch({ type: 'set', key, count: n }),
      remove: (key) => dispatch({ type: 'remove', key }),
      clear: () => dispatch({ type: 'clear' }),
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
    }
  }, [items, open, pulse, add])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
