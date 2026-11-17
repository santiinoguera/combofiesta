/**
 * DATOS DEL NEGOCIO — editá este archivo para cambiar contacto, horarios y redes.
 * Todo lo que figura acá salió de las piezas publicadas por Combo Fiesta.
 * Los campos en `null` todavía no tienen dato real: si los completás, aparecen solos en la web.
 */
export const site = {
  name: 'Combo Fiesta',
  city: 'Rosario',
  region: 'Santa Fe',
  country: 'Argentina',

  // WhatsApp en formato internacional, sin "+", espacios ni guiones (54 9 + área + número).
  whatsappNumber: '5493413231964',
  // Cómo se muestra el número en pantalla.
  whatsappDisplay: '341 323-1964',
  // Mensaje genérico (botones que no corresponden a un combo puntual).
  whatsappGreeting: '¡Hola Combo Fiesta! Quiero hacer un pedido. ¿Me pasan info?',

  instagram: { user: 'combo.fiestaa', url: 'https://www.instagram.com/combo.fiestaa/?hl=es' },
  // PENDIENTE: completar con la cuenta real, ej. { user: 'combofiesta', url: 'https://www.tiktok.com/@combofiesta' }
  tiktok: null,
  facebook: null,

  hours: {
    days: 'Lunes a sábado',
    ranges: ['09:30 a 13:00', '16:30 a 20:00'],
  },

  // Local físico
  address: 'Regimiento 11 1066',
  postalCode: '2000',
  // Link de Google Maps (búsqueda por dirección). Se usa en "Cómo llegar" y en el mapa.
  mapsQuery: 'Combo Fiesta, Regimiento 11 1066, Rosario, Santa Fe',
  // PENDIENTE: zonas y costo de envío.
  deliveryNote: 'Envíos a domicilio en Rosario.',
}
