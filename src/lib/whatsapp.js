import { site } from '../data/site'
import { formatPrice } from './format'

/** Link de WhatsApp con mensaje precargado. */
export const whatsappLink = (message = site.whatsappGreeting) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`

/** Descripción de una línea del carrito: "Combo X x12 con cheddar (sabor Pizza)". */
export const describeItem = (it) =>
  [
    it.name,
    it.tierQty ? `x${it.tierQty}` : null,
    it.addonLabel ? `con ${it.addonLabel}` : null,
    it.variant ? `(sabor ${it.variant})` : null,
  ]
    .filter(Boolean)
    .join(' ')

/** Mensaje con el pedido completo del carrito. */
export function cartMessage(items, { total, hasUnpriced, name, note }) {
  const lines = items.map((it) => {
    const price = it.unitPrice != null ? formatPrice(it.unitPrice * it.count) : 'precio a consultar'
    return `• ${it.count} × ${describeItem(it)} — ${price}`
  })
  const totalLine = total > 0 ? `*Total: ${formatPrice(total)}*${hasUnpriced ? ' (+ productos a consultar)' : ''}` : '*Total: a consultar*'
  return [
    '¡Hola Combo Fiesta! Quiero hacer este pedido:',
    '',
    ...lines,
    '',
    totalLine,
    name?.trim() ? `Nombre: ${name.trim()}` : null,
    note?.trim() ? `Comentarios: ${note.trim()}` : null,
    '',
    '¿Me confirman disponibilidad y la entrega?',
  ]
    .filter((l) => l !== null)
    .join('\n')
}

export const cartLink = (items, opts) => whatsappLink(cartMessage(items, opts))
