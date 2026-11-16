/**
 * CATÁLOGO — único lugar donde se editan categorías, productos, precios y promociones.
 *
 * Cada producto/combo tiene:
 *  - id:        identificador único (sin espacios). Lo usan las promociones.
 *  - category:  id de una categoría de `categories` (abajo).
 *  - name:      nombre que se muestra y que viaja en el mensaje de WhatsApp.
 *  - brand:     marca principal (etiqueta sobre la foto).
 *  - weight:    gramaje (opcional).
 *  - description: una línea de venta.
 *  - includes:  lista de lo que trae el combo (opcional).
 *  - tiers:     opciones de cantidad. `qty` = unidades, `price` = precio en pesos (número, sin puntos).
 *               Si `qty` es null, tiene un precio único (ej. snacks).
 *               Si `tiers` es null, el producto todavía no tiene precio cargado: se muestra
 *               "Consultá precio" y el botón consulta por WhatsApp. Para ponerle precio:
 *               tiers: [{ qty: null, price: 12345 }]
 *  - variants:  sabores/variedades para elegir (opcional, ej. maní Landy).
 *  - unitLabel: cómo se llaman las unidades ('hamburguesas', 'panchos', 'choris').
 *  - image:     foto (1200x900 .webp con fondo, o paquete recortado con `pack: true`).
 *               Choris todavía usa el recorte del flyer: REEMPLAZAR cuando haya foto.
 *  - pack:      true si la foto es solo el paquete (se muestra centrada, sin recortar).
 *  - addon:     agregado opcional con precio (ej. cheddar +$1.000). Ver `CHEDDAR`.
 *  - extra:     agregado incluido destacado con sticker (ej. papas pay). Ver `PAPAS_PAY`.
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
import landyMani from '../assets/img/landy-mani.webp'
import catCongelados from '../assets/img/cat-congelados.webp'
import catDulces from '../assets/img/cat-dulces.webp'
import catSalados from '../assets/img/cat-salados.webp'
import cheddarImg from '../assets/img/promo/cheddar.svg'
import papasPayImg from '../assets/img/promo/papas-pay.svg'
import glVeggies from '../assets/img/products/gl-veggies.webp'
import glAcelga from '../assets/img/products/gl-acelga.webp'
import glChoclo from '../assets/img/products/gl-choclo.webp'
import glEspinaca from '../assets/img/products/gl-espinaca.webp'
import glPrimavera from '../assets/img/products/gl-primavera.webp'
import simplotPapas from '../assets/img/products/simplot-papas.webp'
import swiftBocaditos from '../assets/img/products/swift-bocaditos.webp'
import glFrutillas from '../assets/img/products/gl-frutillas.webp'
import glFrambuesas from '../assets/img/products/gl-frambuesas.webp'
import glArandanos from '../assets/img/products/gl-arandanos.webp'
import glMixBerries from '../assets/img/products/gl-mixberries.webp'
import glMoras from '../assets/img/products/gl-moras.webp'
import oasisPapasTradicional from '../assets/img/products/oasis-papas-tradicional.webp'

/**
 * CATEGORÍAS — el orden de este array es el orden del catálogo en la web.
 *  - label: nombre corto (menú y pestañas). title: título grande de la sección.
 *  - tagline: bajada de la sección. cover: imagen de portada de la categoría.
 */
export const categories = [
  {
    id: 'hamburguesas',
    label: 'Hamburguesas',
    title: 'Combos de hamburguesas',
    tagline: 'Medallones de las mejores marcas con pan artesanal y aderezos. Sumales cheddar por $1.000 más.',
    cover: burgerMuneca120,
  },
  {
    id: 'panchos',
    label: 'Panchos',
    title: 'Combos de panchos',
    tagline: 'Salchichas, pan y aderezos para armar la panchada. Los super panchos vienen con papas pay.',
    cover: superPanchosPaladini,
  },
  {
    id: 'choris',
    label: 'Choris',
    title: 'Combos de choris',
    tagline: 'Choripanes Paladini con panes y aderezos, por encargo.',
    cover: choripan,
  },
  {
    id: 'salados',
    label: 'Salados',
    title: 'Salados',
    tagline: 'Combos de snacks y maní para picar en la previa.',
    cover: catSalados,
  },
  {
    id: 'congelados',
    label: 'Congelados',
    title: 'Congelados',
    tagline: 'Verduras, papas y bocaditos listos para el freezer.',
    cover: catCongelados,
  },
  {
    id: 'dulces',
    label: 'Dulces',
    title: 'Dulces',
    tagline: 'Frutas congeladas Green Life, listas para postres, licuados y desayunos.',
    cover: catDulces,
  },
]

/** PROMO: cheddar en los combos de hamburguesas. Para cambiar el precio, editá `price`. */
export const CHEDDAR = {
  id: 'cheddar',
  label: 'cheddar',
  price: 1000,
  image: cheddarImg, // REEMPLAZAR por foto real del cheddar si se dispone
  tag: '¡Por $1.000 más te lo llevás con cheddar!',
}

/** PROMO: papas pay incluidas en los combos de super panchos. */
export const PAPAS_PAY = {
  id: 'papas-pay',
  label: 'Papas pay',
  image: papasPayImg, // REEMPLAZAR por foto real de las papas pay si se dispone
  tag: '¡Ahora con papas pay!',
}

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
    includes: ['Salchichas +Largas', 'Pan para super panchos', 'Aderezos', 'Papas pay'],
    unitLabel: 'panchos',
    tiers: tiers([22900, 45500, 65500, 83900, 99900]),
    image: superPanchosPaladini,
    extra: PAPAS_PAY,
  },
  {
    id: 'super-panchos-sugarosa',
    category: 'panchos',
    name: 'Super Panchos Sugarosa',
    brand: 'Sugarosa',
    description: 'Salchichas Sugarosa con pan para super panchos y aderezos.',
    includes: ['Salchichas Sugarosa', 'Pan para super panchos', 'Aderezos', 'Papas pay'],
    unitLabel: 'panchos',
    tiers: tiers([16900, 33300, 48900, 61900, 73900]),
    image: superPanchosSugarosa,
    extra: PAPAS_PAY,
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
    category: 'salados',
    name: 'Combo Snacks N°1',
    brand: 'Pehuamar',
    description: 'El trío Pehuamar de siempre para picar en la previa.',
    includes: ['450 g Papas acanaladas', '265 g Maicitos', '620 g Palitos salados'],
    tiers: [{ qty: null, price: 23500 }],
    image: snacks1,
  },
  {
    id: 'snacks-2',
    category: 'salados',
    name: 'Combo Snacks N°2',
    brand: 'Craker',
    description: 'Un kilo y medio de snacks Craker para compartir.',
    includes: ['500 g Papas fritas', '500 g Chizitos', '500 g Palitos salados'],
    tiers: [{ qty: null, price: 14000 }],
    image: snacks2,
  },
  {
    id: 'snacks-3',
    category: 'salados',
    name: 'Combo Snacks N°3',
    brand: 'Oasis',
    description: 'Papas estilo americano, chizitos y palitos Oasis.',
    includes: ['700 g Papas fritas', '500 g Chizitos', '500 g Palitos salados'],
    tiers: [{ qty: null, price: 17500 }],
    image: snacks3,
  },
  {
    id: 'snacks-4',
    category: 'salados',
    name: 'Combo Snacks N°4',
    brand: 'Craker · Landy · Orita’s',
    description: 'El combo más grande: 2,5 kg de snacks para la fiesta.',
    includes: ['1 kg Papas Craker', '500 g Chizitos Landy', '1 kg Palitos Orita’s'],
    tiers: [{ qty: null, price: 25900 }],
    image: snacks4,
  },
  {
    id: 'snacks-5',
    category: 'salados',
    name: 'Combo Snacks N°5',
    brand: 'Craker · Landy',
    description: 'Kilo de papas acanaladas con copos de maíz y palitos.',
    includes: ['1 kg Papas Craker', '500 g Chizitos Landy', '500 g Palitos Craker'],
    tiers: [{ qty: null, price: 23500 }],
    image: snacks5,
  },
  {
    id: 'snacks-6',
    category: 'salados',
    name: 'Combo Snacks N°6',
    brand: 'Craker',
    description: 'Todo Craker: kilo de papas, chizitos y palitos.',
    includes: ['1 kg Papas Craker', '500 g Chizitos Craker', '500 g Palitos Craker'],
    tiers: [{ qty: null, price: 21900 }],
    image: snacks6,
  },

  // ─────────────── SALADOS (productos sueltos, precio a consultar) ───────────────
  {
    id: 'landy-mani',
    category: 'salados',
    name: 'Maní Crocante Landy 1 kg',
    brand: 'Landy',
    weight: '1 kg',
    description: 'Maní crocante en ocho sabores. Elegí el tuyo.',
    variants: ['Clásico', 'Chimichurri', 'Jamón', 'Queso', 'Pizza', 'Cebolla', 'Provenzal', 'Salame'],
    tiers: null,
    image: landyMani,
  },
  {
    id: 'oasis-papas-tradicional',
    category: 'salados',
    name: 'Papas Fritas Oasis Corte Tradicional 700 g',
    brand: 'Oasis',
    weight: '700 g',
    description: 'Bolsa grande de papas fritas corte tradicional.',
    tiers: null,
    image: oasisPapasTradicional,
    pack: true,
  },

  // ─────────────── CONGELADOS (precio a consultar) ───────────────
  {
    id: 'swift-bocaditos-pollo',
    category: 'congelados',
    name: 'Bocaditos de Pollo Swift 400 g',
    brand: 'Swift',
    weight: '400 g',
    description: 'Formados de carne de pollo rebozados, supercongelados.',
    tiers: null,
    image: swiftBocaditos,
    pack: true,
  },
  {
    id: 'simplot-papas-tradicional',
    category: 'congelados',
    name: 'Papas Simplot Corte Tradicional 700 g',
    brand: 'Simplot',
    weight: '700 g',
    description: 'Papas prefritas supercongeladas, corte tradicional.',
    tiers: null,
    image: simplotPapas,
    pack: true,
  },
  {
    id: 'green-life-veggies',
    category: 'congelados',
    name: 'Medallones Veggies Green Life Espinaca y Pimientos',
    brand: 'Green Life',
    weight: '190 g',
    description: 'Dos medallones vegetales, directo del freezer a la plancha o al horno.',
    tiers: null,
    image: glVeggies,
    pack: true,
  },
  {
    id: 'green-life-espinaca',
    category: 'congelados',
    name: 'Espinaca Green Life 550 g',
    brand: 'Green Life',
    weight: '550 g',
    description: 'Sin conservantes, fuente de fibra y bajo en sodio.',
    tiers: null,
    image: glEspinaca,
    pack: true,
  },
  {
    id: 'green-life-acelga',
    category: 'congelados',
    name: 'Acelga Green Life 500 g',
    brand: 'Green Life',
    weight: '500 g',
    description: 'Sin conservantes y fuente de fibra.',
    tiers: null,
    image: glAcelga,
    pack: true,
  },
  {
    id: 'green-life-choclo',
    category: 'congelados',
    name: 'Choclo Green Life 350 g',
    brand: 'Green Life',
    weight: '350 g',
    description: 'Choclo amarillo en granos. Sin conservantes y bajo en sodio.',
    tiers: null,
    image: glChoclo,
    pack: true,
  },
  {
    id: 'green-life-mix-primavera',
    category: 'congelados',
    name: 'Mix Primavera Green Life 350 g',
    brand: 'Green Life',
    weight: '350 g',
    description: 'Arvejas, chauchas, choclo y zanahorias.',
    tiers: null,
    image: glPrimavera,
    pack: true,
  },

  // ─────────────── DULCES (frutas congeladas, precio a consultar) ───────────────
  {
    id: 'green-life-frutillas',
    category: 'dulces',
    name: 'Frutillas Green Life 550 g',
    brand: 'Green Life',
    weight: '550 g',
    description: 'Frutillas enteras, listas para consumir.',
    tiers: null,
    image: glFrutillas,
    pack: true,
  },
  {
    id: 'green-life-frambuesas',
    category: 'dulces',
    name: 'Frambuesas Green Life 400 g',
    brand: 'Green Life',
    weight: '400 g',
    description: 'Frambuesas enteras, listas para consumir.',
    tiers: null,
    image: glFrambuesas,
    pack: true,
  },
  {
    id: 'green-life-mix-berries',
    category: 'dulces',
    name: 'Mix Berries Green Life 550 g',
    brand: 'Green Life',
    weight: '550 g',
    description: 'Frutillas, moras y frambuesas enteras.',
    tiers: null,
    image: glMixBerries,
    pack: true,
  },
  {
    id: 'green-life-arandanos',
    category: 'dulces',
    name: 'Arándanos Green Life',
    brand: 'Green Life',
    description: 'Arándanos listos para consumir.',
    tiers: null,
    image: glArandanos, // REEMPLAZAR: la foto disponible es chica
    pack: true,
  },
  {
    id: 'green-life-moras',
    category: 'dulces',
    name: 'Moras Green Life',
    brand: 'Green Life',
    description: 'Moras listas para consumir.',
    tiers: null,
    image: glMoras, // REEMPLAZAR: la foto disponible es chica
    pack: true,
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

for (const c of combos) if (c.category === 'hamburguesas') c.addon = CHEDDAR

export const getCombo = (id) => combos.find((c) => c.id === id)
export const byCategory = (id) => combos.filter((c) => c.category === id)
