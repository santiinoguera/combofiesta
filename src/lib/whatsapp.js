import { site } from '../data/site'
import { formatPrice } from './format'

/** Link de WhatsApp con mensaje precargado. */
export const whatsappLink = (message = site.whatsappGreeting) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`

/** Mensaje automático con el combo (y la cantidad elegida, si corresponde). */
export const comboMessage = (combo, tier) => {
  const qty = tier?.qty ? ` x${tier.qty}` : ''
  const price = tier ? ` (${formatPrice(tier.price)})` : ''
  return `¡Hola Combo Fiesta! Quiero pedir el *${combo.name}*${qty}${price}. ¿Me pasan info para coordinar la entrega?`
}

export const comboLink = (combo, tier) => whatsappLink(comboMessage(combo, tier))
