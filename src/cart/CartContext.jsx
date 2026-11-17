import { getCombo } from '../data/combos'
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
    if (!Array.isArray(data)) return []
    // Se recalcula cada línea con el catálogo vigente (precios actualizados; se descartan productos que ya no existen).
    return data
      .map((it) => {
        const combo = getCombo(it.id)
        if (!combo) return null
        const tier = combo.tiers?.find((t) => t.qty === it.tierQty) ?? combo.tiers?.[0] ?? null
        const ids = it.addonIds ?? (it.addonId ? [it.addonId] : [])
        const addons = (combo.addons ?? []).filter((a) => ids.includes(a.id))
        return { ...toCartItem(combo, { tier, addons, variant: it.variant }), count: it.count }
      })
      .filter(Boolean)
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
    case 'replace': {
      // Cambia la configuración de una línea (cantidad del combo o adicional) y la fusiona si ya existe.
      const old = items.find((it) => it.key === action.key)
      if (!old) return items
      const next = { ...action.item, count: old.count }
      const rest = items.filter((it) => it.key !== action.key)
      const j = rest.findIndex((it) => it.key === next.key)
      if (j !== -1) return rest.map((it, k) => (k === j ? { ...it, count: it.count + next.count } : it))
      const idx = items.findIndex((it) => it.key === action.key)
      rest.splice(idx, 0, next)
      return rest
    }
    case 'remove':
      return items.filter((it) => it.key !== action.key)
    case 'clear':
      return []
    default:
      return items
  }
}

/** Convierte la selección de una tarjeta en una línea del carrito. */
export function toCartItem(combo, { tier, addons = [], variant }) {
  const basePrice = tier ? tier.price : null
  const chosen = tier ? addons : []
  const addonPrice = chosen.reduce((n, a) => n + a.price, 0)
  const ids = chosen.map((a) => a.id)
  return {
    key: [combo.id, tier?.qty ?? '', ids.join('+'), variant ?? ''].join('|'),
    id: combo.id,
    name: combo.name,
    image: combo.image,
    pack: !!combo.pack,
    tierQty: tier?.qty ?? null,
    unitLabel: combo.unitLabel ?? null,
    addonIds: ids,
    addonLabel: chosen.length ? chosen.map((a) => a.label).join(' y ') : null,
    addonPrice,
    variant: variant ?? null,
    basePrice,
    unitPrice: basePrice != null ? basePrice + addonPrice : null,
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
    const addonsTotal = items.reduce((n, it) => n + (it.addonPrice ?? 0) * it.count, 0)
    const hasUnpriced = items.some((it) => it.unitPrice == null)
    return {
      items,
      count,
      total,
      addonsTotal,
      subtotal: total - addonsTotal,
      hasUnpriced,
      open,
      pulse,
      add,
      setCount: (key, n) => dispatch({ type: 'set', key, count: n }),
      remove: (key) => dispatch({ type: 'remove', key }),
      replace: (key, item) => dispatch({ type: 'replace', key, item }),
      clear: () => dispatch({ type: 'clear' }),
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
    }
  }, [items, open, pulse, add])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
