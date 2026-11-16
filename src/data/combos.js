/**
 * CATÁLOGO DE COMBOS — único lugar donde se editan productos y precios.
 *
 * Cada combo tiene:
 *  - id:        identificador único (sin espacios). Lo usan las promociones.
 *  - category:  'hamburguesas' | 'panchos' | 'choris' | 'snacks'
 *  - name:      nombre que se muestra y que viaja en el mensaje de WhatsApp.
 *  - brand:     marca principal (etiqueta sobre la foto).
 *  - weight:    gramaje de cada unidad (opcional).
 *  - description: una línea de venta.
 *  - includes:  lista de lo que trae el combo.
 *  - tiers:     opciones de cantidad. `qty` = unidades, `price` = precio en pesos (número, sin puntos).
 *               Si `qty` es null, el combo tiene un precio único (ej. snacks).
 *  - unitLabel: cómo se llaman las unidades ('hamburguesas', 'panchos', 'choris').
 *  - image:     foto. Sugarosa, La Muñeca 83 g con soja, Snacks N°1 y Super Panchos Paladini usan fotos
 *               de producto en alta calidad; el resto son recortes de los flyers de Combo Fiesta:
 *               REEMPLAZAR por fotos profesionales del producto cuando estén disponibles
 *               (importarlas arriba y asignarlas acá; formato .webp recomendado, ~900px de ancho).
 *  - pack:      true si la foto es solo el paquete (se muestra centrada, sin recortar).
 *  - note:      aviso corto opcional (ej. "Encargalo de un día para otro").
 *
 * Precios cargados según las publicaciones vigentes de Combo Fiesta.
 */
import burgerMuneca120 from '../assets/img/burger-muneca-120.webp'
import burgerMuneca83 from '../assets/img/burger-muneca-83.webp'
import burgerMunecaSoja from '../assets/img/burger-muneca-soja.webp'
import burgerSwift from '../assets/img/burger-swift.webp'
import burgerPaladini from '../assets/img/burger-paladini.webp'
import burgerPaty from '../assets/img/burger-paty.webp'
import burgerSugarosa from '../assets/img/burger-sugarosa.webp'
import burgerCampoGrande from '../assets/img/burger-campo-grande.webp'
import laMuneca198 from '../assets/img/la-muneca-198.webp'
import panchosPaladini from '../assets/img/panchos-paladini.webp'
import superPanchosPaladini from '../assets/img/super-panchos-paladini.webp'
import superPanchosSugarosa from '../assets/img/super-panchos-sugarosa.webp'
import choripan from '../assets/img/choripan.webp'
import snacks1 from '../assets/img/snacks-1.webp'
import snacks2 from '../assets/img/snacks-2.webp'
import snacks3 from '../assets/img/snacks-3.webp'
import snacks4 from '../assets/img/snacks-4.webp'
import snacks5 from '../assets/img/snacks-5.webp'
import snacks6 from '../assets/img/snacks-6.webp'

export const categories = [
  { id: 'hamburguesas', label: 'Hamburguesas', short: 'Burgers' },
  { id: 'panchos', label: 'Panchos', short: 'Panchos' },
  { id: 'choris', label: 'Choris', short: 'Choris' },
  { id: 'snacks', label: 'Snacks', short: 'Snacks' },
]

const BURGER_INCLUDES = ['Medallones', 'Pan artesanal', 'Aderezos']
const tiers = (prices) => [12, 24, 36, 48, 60].map((qty, i) => ({ qty, price: prices[i] }))

export const combos = [
  // ─────────────── HAMBURGUESAS ───────────────
  {
    id: 'la-muneca-120',
    category: 'hamburguesas',
    name: 'Hamburguesas La Muñeca 120 g',
    brand: 'La Muñeca',
    weight: '120 g',
    description: 'Las más grandes de la carta: medallón de carne vacuna de 120 g.',
    includes: BURGER_INCLUDES,
    unitLabel: 'hamburguesas',
    tiers: tiers([32900, 60900, 87500, 111500, 133900]),
    image: burgerMuneca120,
    pack: true,
  },
  {
    id: 'paladini-80',
    category: 'hamburguesas',
    name: 'Hamburguesas Paladini Clásicas 80 g',
    brand: 'Paladini',
    weight: '80 g',
    description: 'La clásica de siempre, lista para la parrilla o la plancha.',
    includes: BURGER_INCLUDES,
    unitLabel: 'hamburguesas',
    tiers: tiers([27900, 52900, 76900, 97900, 119900]),
    image: burgerPaladini,
    pack: true,
  },
  {
    id: 'swift-80',
    category: 'hamburguesas',
    name: 'Hamburguesas Swift Clásica 80 g',
    brand: 'Swift',
    weight: '80 g',
    description: 'Medallón Swift clásico, un infaltable para cualquier reunión.',
    includes: BURGER_INCLUDES,
    unitLabel: 'hamburguesas',
    tiers: tiers([24900, 47900, 69900, 88900, 105900]),
    image: burgerSwift,
    pack: true,
  },
  {
    id: 'paty-80',
    category: 'hamburguesas',
    name: 'Hamburguesas Paty Clásico 80 g',
    brand: 'Paty',
    weight: '80 g',
    description: 'El sabor Paty que todos conocen, en cantidad para compartir.',
    includes: BURGER_INCLUDES,
    unitLabel: 'hamburguesas',
    tiers: tiers([24000, 44500, 63900, 81900, 97900]),
    image: burgerPaty,
    pack: true,
  },
  {
    id: 'campo-grande-80',
    category: 'hamburguesas',
    name: 'Hamburguesas Campo Grande 80 g',
    brand: 'Campo Grande',
    weight: '80 g',
    description: 'Hamburguesa de carne vacuna Campo Grande, rendidora y sabrosa.',
    includes: BURGER_INCLUDES,
    unitLabel: 'hamburguesas',
    tiers: tiers([23500, 43500, 62900, 79900, 95900]),
    image: burgerCampoGrande,
    pack: true,
  },
  {
    id: 'la-muneca-83',
    category: 'hamburguesas',
    name: 'Hamburguesas La Muñeca 83 g',
    brand: 'La Muñeca',
    weight: '83 g',
    description: 'Hamburguesa de carne vacuna La Muñeca, tamaño clásico.',
    includes: BURGER_INCLUDES,
    unitLabel: 'hamburguesas',
    tiers: tiers([22900, 42900, 61900, 78900, 94900]),
    image: burgerMuneca83,
    pack: true,
  },
  {
    id: 'la-muneca-83-soja',
    category: 'hamburguesas',
    name: 'Medallones La Muñeca 83 g',
    brand: 'La Muñeca',
    weight: '83 g',
    description: 'Medallones de carne vacuna con soja. La opción más económica por docena.',
    includes: BURGER_INCLUDES,
    unitLabel: 'hamburguesas',
    tiers: tiers([17500, 31900, 46500, 58900, 70900]),
    image: burgerMunecaSoja,
    pack: true,
  },
  {
    id: 'sugarosa-70',
    category: 'hamburguesas',
    name: 'Medallones Sugarosa 70 g',
    brand: 'Sugarosa',
    weight: '70 g',
    description: 'Medallones de carne vacuna con soja. Pensado para eventos grandes.',
    includes: BURGER_INCLUDES,
    unitLabel: 'hamburguesas',
    tiers: [{ qty: 60, price: 56000 }],
    image: burgerSugarosa,
    pack: true,
  },
  {
    id: 'la-muneca-198',
    category: 'hamburguesas',
    name: 'Combo La Muñeca XXL 198 g',
    brand: 'La Muñeca',
    weight: '198 g',
    description: 'Hamburguesas XXL de 198 g para una cena que no se olvida.',
    includes: ['Hamburguesas XXL', 'Pan de hamburguesa', 'Ketchup Dánica'],
    unitLabel: 'hamburguesas',
    tiers: [{ qty: 4, price: 14900 }],
    image: laMuneca198,
  },

  // ─────────────── PANCHOS ───────────────
  {
    id: 'panchos-paladini',
    category: 'panchos',
    name: 'Combo Panchos Paladini',
    brand: 'Paladini',
    description: 'Salchichas Paladini con pan para panchos, mayonesa y ketchup.',
    includes: ['Salchichas Paladini', 'Pan para panchos', 'Mayonesa Fiesta', 'Ketchup Dánica'],
    unitLabel: 'panchos',
    tiers: [
      { qty: 24, price: 20900 },
      { qty: 36, price: 30900 },
      { qty: 48, price: 38900 },
      { qty: 60, price: 44900 },
    ],
    image: panchosPaladini,
  },
  {
    id: 'super-panchos-paladini',
    category: 'panchos',
    name: 'Super Panchos Paladini +Largas',
    brand: 'Paladini',
    description: 'Salchichas Paladini +Largas con pan para super panchos.',
    includes: ['Salchichas +Largas', 'Pan para super panchos', 'Aderezos'],
    unitLabel: 'panchos',
    tiers: tiers([22900, 45500, 65500, 83900, 99900]),
    image: superPanchosPaladini,
  },
  {
    id: 'super-panchos-sugarosa',
    category: 'panchos',
    name: 'Super Panchos Sugarosa',
    brand: 'Sugarosa',
    description: 'Salchichas Sugarosa con pan para super panchos y aderezos.',
    includes: ['Salchichas Sugarosa', 'Pan para super panchos', 'Aderezos'],
    unitLabel: 'panchos',
    tiers: tiers([16900, 33300, 48900, 61900, 73900]),
    image: superPanchosSugarosa,
  },

  // ─────────────── CHORIS ───────────────
  {
    id: 'combo-especial-choris',
    category: 'choris',
    name: 'Combo Especial Choris Paladini',
    brand: 'Paladini',
    description: 'Choripanes Paladini para la previa, el asado o el cumple.',
    includes: ['Chorizos Paladini', 'Panes', 'Aderezos'],
    unitLabel: 'choris',
    tiers: [
      { qty: 12, price: 28000 },
      { qty: 24, price: 52000 },
      { qty: 36, price: 76000 },
    ],
    note: 'Encargalo de un día para otro',
    image: choripan,
  },

  // ─────────────── SNACKS ───────────────
  {
    id: 'snacks-1',
    category: 'snacks',
    name: 'Combo Snacks N°1',
    brand: 'Pehuamar',
    description: 'El trío Pehuamar de siempre para picar en la previa.',
    includes: ['450 g Papas acanaladas', '265 g Maicitos', '620 g Palitos salados'],
    tiers: [{ qty: null, price: 23500 }],
    image: snacks1,
    pack: true,
  },
  {
    id: 'snacks-2',
    category: 'snacks',
    name: 'Combo Snacks N°2',
    brand: 'Craker',
    description: 'Un kilo y medio de snacks Craker para compartir.',
    includes: ['500 g Papas fritas', '500 g Chizitos', '500 g Palitos salados'],
    tiers: [{ qty: null, price: 14000 }],
    image: snacks2,
  },
  {
    id: 'snacks-3',
    category: 'snacks',
    name: 'Combo Snacks N°3',
    brand: 'Oasis',
    description: 'Papas estilo americano, chizitos y palitos Oasis.',
    includes: ['700 g Papas fritas', '500 g Chizitos', '500 g Palitos salados'],
    tiers: [{ qty: null, price: 17500 }],
    image: snacks3,
  },
  {
    id: 'snacks-4',
    category: 'snacks',
    name: 'Combo Snacks N°4',
    brand: 'Craker · Landy · Orita’s',
    description: 'El combo más grande: 2,5 kg de snacks para la fiesta.',
    includes: ['1 kg Papas Craker', '500 g Chizitos Landy', '1 kg Palitos Orita’s'],
    tiers: [{ qty: null, price: 25900 }],
    image: snacks4,
  },
  {
    id: 'snacks-5',
    category: 'snacks',
    name: 'Combo Snacks N°5',
    brand: 'Craker · Landy',
    description: 'Kilo de papas acanaladas con copos de maíz y palitos.',
    includes: ['1 kg Papas Craker', '500 g Chizitos Landy', '500 g Palitos Craker'],
    tiers: [{ qty: null, price: 23500 }],
    image: snacks5,
  },
  {
    id: 'snacks-6',
    category: 'snacks',
    name: 'Combo Snacks N°6',
    brand: 'Craker',
    description: 'Todo Craker: kilo de papas, chizitos y palitos.',
    includes: ['1 kg Papas Craker', '500 g Chizitos Craker', '500 g Palitos Craker'],
    tiers: [{ qty: null, price: 21900 }],
    image: snacks6,
  },
]

/**
 * PROMOCIONES DESTACADAS — referencian combos del catálogo por `id`.
 *  - tierQty: qué cantidad mostrar (debe existir en `tiers` del combo; null para precio único).
 *  - tag:     etiqueta llamativa. Usar solo datos reales (gramaje, cantidad, condición).
 *  - headline: título grande de la tarjeta.
 *  - featured: true para la tarjeta grande.
 */
export const promotions = [
  {
    comboId: 'la-muneca-198',
    tierQty: 4,
    tag: 'XXL · 198 g',
    headline: 'Cuatro hamburguesas XXL',
    featured: true,
  },
  {
    comboId: 'combo-especial-choris',
    tierQty: 12,
    tag: 'Por encargo',
    headline: 'Choripanes para la previa',
  },
  {
    comboId: 'sugarosa-70',
    tierQty: 60,
    tag: '60 unidades',
    headline: 'El combo para eventos',
  },
  {
    comboId: 'snacks-2',
    tierQty: null,
    tag: '1,5 kg',
    headline: 'Snacks para picar',
  },
]

export const getCombo = (id) => combos.find((c) => c.id === id)
