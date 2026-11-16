import { site } from '../data/site'
import { formatPrice } from './format'

/** Link de WhatsApp con mensaje precargado. */
export const whatsappLink = (message = site.whatsappGreeting) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`

/**
 * Mensaje automático con el producto elegido.
 * opts: { tier, addon (si el cliente lo sumó), variant (sabor) }
 */
export const comboMessage = (combo, { tier, addon, variant } = {}) => {
  const name = `*${combo.name}*${variant ? ` sabor ${variant}` : ''}`
  if (!tier) {
    return `¡Hola Combo Fiesta! Quiero consultar por ${name}. ¿Qué precio y disponibilidad tiene?`
  }
  const qty = tier.qty ? ` x${tier.qty}` : ''
  const extra = addon ? ` con ${addon.label}` : ''
  const total = tier.price + (addon?.price ?? 0)
  return `¡Hola Combo Fiesta! Quiero pedir el ${name}${qty}${extra} (${formatPrice(total)}). ¿Me pasan info para coordinar la entrega?`
}

export const comboLink = (combo, opts) => whatsappLink(comboMessage(combo, opts))
