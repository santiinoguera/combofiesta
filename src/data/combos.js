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
 *  - addons:    agregados opcionales con precio (cheddar / papas pay, +$1.000 c/u). Se asignan por categoría al final del archivo.
 *  - group:     subgrupo dentro de la categoría (ej. 'Salado' / 'Dulce' en Congelados).
 *  - photo:     true si la imagen es una foto real (se muestra completa sobre su propio fondo desenfocado).
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
import catSalados from '../assets/img/cat-salados.webp'
import cheddarImg from '../assets/img/promo/cheddar-danica.webp'
import promoCheddar from '../assets/img/promo/promo-cheddar.webp'
import promoPapasPay from '../assets/img/promo/promo-papas-pay.webp'
import papasPayImg from '../assets/img/promo/papas-pay.webp'
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
import bembrasilNoisette from '../assets/img/products/bembrasil-noisette.webp'
import bembrasilCarinhas from '../assets/img/products/bembrasil-carinhas.webp'
import mccainSmiles from '../assets/img/products/mccain-smiles.webp'
import mccainClasicas from '../assets/img/products/mccain-clasicas.webp'
import mccainNoisette from '../assets/img/products/mccain-noisette.webp'
import oasisConitos from '../assets/img/products/oasis-conitos.webp'
import oasisChalitas from '../assets/img/products/oasis-chalitas.webp'
import vegetalexBurger from '../assets/img/products/vegetalex-burger.webp'
import paladiniMedallonesPollo from '../assets/img/products/paladini-medallones-pollo.webp'
import paladiniPapasBaston from '../assets/img/products/paladini-papas-baston.webp'
import swiftCrunchies from '../assets/img/products/swift-crunchies.webp'
import swiftPalitosPollo from '../assets/img/products/swift-palitos-pollo.webp'
import glArvejas from '../assets/img/products/gl-arvejas.webp'
import glBrocoli from '../assets/img/products/gl-brocoli.webp'
import simplotPapas11 from '../assets/img/products/simplot-papas-11.webp'
import oasisPapasTradicional from '../assets/img/products/oasis-papas-tradicional.webp'

/**
 * CATEGORÍAS — el orden de este array es el orden del catálogo en la web.
 *  - label: nombre corto (menú y pestañas). title: título grande de la sección.
 *  - highlight: id del producto que se muestra en grande al comienzo de la sección (opcional).
 *  - tagline: bajada de la sección. cover: imagen de portada de la categoría.
 */
export const categories = [
  {
    id: 'hamburguesas',
    label: 'Hamburguesas',
    title: 'Combos de hamburguesas',
    tagline: 'Medallones de las mejores marcas con pan artesanal y aderezos. Sumales cheddar por $1.000 más.',
    highlight: 'la-muneca-120', // producto destacado (tarjeta grande)
    cover: burgerMuneca120,
  },
  {
    id: 'panchos',
    label: 'Panchos',
    title: 'Combos de panchos',
    tagline: 'Salchichas, pan y aderezos para armar la panchada. Sumale papas pay o cheddar por $1.000 más cada uno.',
    highlight: 'super-panchos-paladini', // producto destacado (tarjeta grande)
    cover: superPanchosPaladini,
  },
  {
    id: 'choris',
    label: 'Choris',
    title: 'Combos de choris',
    tagline: 'Choripanes Paladini con panes y aderezos, por encargo.',
    highlight: 'combo-especial-choris', // producto destacado (tarjeta grande)
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
    tagline: 'Papas, pollo, vegetales y frutas congeladas. Salado y dulce, listos para el freezer.',
    groups: ['Salado', 'Dulce'],
    cover: catCongelados,
  },
]

/** PROMO: cheddar en los combos de hamburguesas. Para cambiar el precio, editá `price`. */
export const CHEDDAR = {
  id: 'cheddar',
  label: 'cheddar',
  price: 1000,
  image: cheddarImg, // ícono del agregado (salsa cheddar Dánica)
  promo: promoCheddar, // placa promocional que se muestra sobre la foto del combo
  tag: 'Por $1.000 más te llevás un cheddar',
}

/** PROMO: papas pay en los combos de panchos y super panchos. Para cambiar el precio, editá `price`. */
export const PAPAS_PAY = {
  id: 'papas-pay',
  label: 'papas pay',
  price: 1000,
  image: papasPayImg, // ícono del agregado (papas pay Oasis)
  promo: promoPapasPay, // placa promocional que se muestra sobre la foto del combo
  tag: 'Por $1.000 más te llevás unas papas pay',
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
    group: 'Salado',
    name: 'Bocaditos de Pollo Swift 400 g',
    brand: 'Swift',
    weight: '400 g',
    description: 'Formados de carne de pollo rebozados, supercongelados.',
    tiers: [{ qty: null, price: 5900 }],
    image: swiftBocaditos,
    pack: true,
  },
  {
    id: 'simplot-papas-tradicional',
    category: 'congelados',
    group: 'Salado',
    name: 'Papas Simplot Corte Tradicional 700 g',
    brand: 'Simplot',
    weight: '700 g',
    description: 'Papas prefritas supercongeladas, corte tradicional.',
    tiers: [{ qty: null, price: 5900 }],
    image: simplotPapas,
    pack: true,
  },
  {
    id: 'simplot-papas-11',
    category: 'congelados',
    group: 'Salado',
    name: 'Papas Simplot Corte Tradicional 1,1 kg',
    brand: 'Simplot',
    weight: '1,1 kg',
    description: 'Papas prefritas supercongeladas, corte tradicional. Sin gluten.',
    tiers: [{ qty: null, price: 7900 }],
    image: simplotPapas11,
    pack: true,
  },
  {
    id: 'green-life-veggies',
    category: 'congelados',
    group: 'Salado',
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
    group: 'Salado',
    name: 'Espinaca Green Life 550 g',
    brand: 'Green Life',
    weight: '550 g',
    description: 'Sin conservantes, fuente de fibra y bajo en sodio.',
    tiers: [{ qty: null, price: 5000 }],
    image: glEspinaca,
    pack: true,
  },
  {
    id: 'green-life-acelga',
    category: 'congelados',
    group: 'Salado',
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
    group: 'Salado',
    name: 'Choclo Green Life 350 g',
    brand: 'Green Life',
    weight: '350 g',
    description: 'Choclo amarillo en granos. Sin conservantes y bajo en sodio.',
    tiers: [{ qty: null, price: 4000 }],
    image: glChoclo,
    pack: true,
  },
  {
    id: 'green-life-mix-primavera',
    category: 'congelados',
    group: 'Salado',
    name: 'Mix Primavera Green Life 350 g',
    brand: 'Green Life',
    weight: '350 g',
    description: 'Arvejas, chauchas, choclo y zanahorias.',
    tiers: [{ qty: null, price: 4300 }],
    image: glPrimavera,
    pack: true,
  },
  {
    id: 'green-life-arvejas',
    category: 'congelados',
    group: 'Salado',
    name: 'Arvejas Green Life 300 g',
    brand: 'Green Life',
    weight: '300 g',
    description: 'Sin conservantes y fuente de fibra.',
    tiers: [{ qty: null, price: 4500 }],
    image: glArvejas,
    pack: true,
  },
  {
    id: 'green-life-brocoli',
    category: 'congelados',
    group: 'Salado',
    name: 'Brócoli Green Life 400 g',
    brand: 'Green Life',
    weight: '400 g',
    description: 'Sin conservantes, fuente de fibra y bajo en sodio.',
    tiers: [{ qty: null, price: 5900 }],
    image: glBrocoli,
    pack: true,
  },

  // ─────────────── DULCES (frutas congeladas, precio a consultar) ───────────────
  {
    id: 'green-life-frutillas',
    category: 'congelados',
    group: 'Dulce',
    name: 'Frutillas Green Life 550 g',
    brand: 'Green Life',
    weight: '550 g',
    description: 'Frutillas enteras, listas para consumir.',
    tiers: [{ qty: null, price: 6900 }],
    image: glFrutillas,
    pack: true,
  },
  {
    id: 'green-life-frambuesas',
    category: 'congelados',
    group: 'Dulce',
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
    category: 'congelados',
    group: 'Dulce',
    name: 'Mix Berries Green Life 550 g',
    brand: 'Green Life',
    weight: '550 g',
    description: 'Frutillas, moras y frambuesas enteras.',
    tiers: [{ qty: null, price: 9900 }],
    image: glMixBerries,
    pack: true,
  },
  {
    id: 'green-life-arandanos',
    category: 'congelados',
    group: 'Dulce',
    name: 'Arándanos Green Life 400 g',
    weight: '400 g',
    brand: 'Green Life',
    description: 'Arándanos listos para consumir.',
    tiers: [{ qty: null, price: 6900 }],
    image: glArandanos,
    pack: true,
  },
  {
    id: 'green-life-moras',
    category: 'congelados',
    group: 'Dulce',
    name: 'Moras Green Life 550 g',
    weight: '550 g',
    brand: 'Green Life',
    description: 'Moras listas para consumir.',
    tiers: null,
    image: glMoras,
    pack: true,
  },

  // ─────────────── NUEVOS (fotos del local) ───────────────
  {
    id: 'oasis-conitos-pizza',
    category: 'salados',
    name: 'Conitos 3D Oasis sabor Pizza 400 g',
    brand: 'Oasis',
    weight: '400 g',
    description: 'Conitos de maíz sabor pizza, bolsa grande.',
    tiers: null,
    image: oasisConitos,
    photo: true,
  },
  {
    id: 'oasis-chalitas-queso',
    category: 'salados',
    name: 'Chalitas Oasis sabor Queso 400 g',
    brand: 'Oasis',
    weight: '400 g',
    description: 'Chalitas de maíz sabor queso.',
    tiers: null,
    image: oasisChalitas,
    photo: true,
  },
  {
    id: 'paladini-papas-baston',
    category: 'congelados',
    group: 'Salado',
    name: 'Papas Bastón Paladini 1,1 kg',
    brand: 'Paladini',
    weight: '1,1 kg',
    description: 'Papas prefritas bastón, aptas air fryer. Sin gluten.',
    tiers: [{ qty: null, price: 7900 }],
    image: paladiniPapasBaston,
    pack: true,
  },
  {
    id: 'mccain-clasicas',
    category: 'congelados',
    group: 'Salado',
    name: 'Papas McCain Clásicas Corte Tradicional 400 g',
    brand: 'McCain',
    weight: '400 g',
    description: 'Papas prefritas bastón, pack XS. Libres de gluten.',
    tiers: [{ qty: null, price: 3900 }],
    image: mccainClasicas,
    pack: true,
  },
  {
    id: 'mccain-smiles',
    category: 'congelados',
    group: 'Salado',
    name: 'McCain Smiles 400 g',
    brand: 'McCain',
    weight: '400 g',
    description: 'Croquetas de papa con caritas, ideales para air fryer.',
    tiers: [{ qty: null, price: 5000 }],
    image: mccainSmiles,
    pack: true,
  },
  {
    id: 'mccain-noisette',
    category: 'congelados',
    group: 'Salado',
    name: 'McCain Horneables Noisette 600 g',
    brand: 'McCain',
    weight: '600 g',
    description: 'Croquetas de papa noisette para horno. Sin T.A.C.C.',
    tiers: null,
    image: mccainNoisette,
    pack: true,
  },
  {
    id: 'bembrasil-noisette',
    category: 'congelados',
    group: 'Salado',
    name: 'Papa Noisette BemBrasil 1,05 kg',
    brand: 'BemBrasil',
    weight: '1,05 kg',
    description: 'Bolitas de puré de papa prefritas, aptas air fryer.',
    tiers: [{ qty: null, price: 7900 }],
    image: bembrasilNoisette,
    pack: true,
  },
  {
    id: 'bembrasil-carinhas',
    category: 'congelados',
    group: 'Salado',
    name: 'Batatas Carinhas BemBrasil 1,05 kg',
    brand: 'BemBrasil',
    weight: '1,05 kg',
    description: 'Papas con caritas, las preferidas de los chicos.',
    tiers: [{ qty: null, price: 7900 }],
    image: bembrasilCarinhas,
    pack: true,
  },
  {
    id: 'swift-crunchies-pollo',
    category: 'congelados',
    group: 'Salado',
    name: 'Crunchies de Pollo Swift 380 g',
    brand: 'Swift',
    weight: '380 g',
    description: 'Formados de carne de pollo rebozados, supercongelados.',
    tiers: [{ qty: null, price: 5900 }],
    image: swiftCrunchies,
    pack: true,
  },
  {
    id: 'swift-palitos-pollo',
    category: 'congelados',
    group: 'Salado',
    name: 'Palitos de Pollo Swift 260 g',
    brand: 'Swift',
    weight: '260 g',
    description: 'Formados de carne de pollo rebozados.',
    tiers: [{ qty: null, price: 4200 }],
    image: swiftPalitosPollo,
    pack: true,
  },
  {
    id: 'paladini-medallones-pollo',
    category: 'congelados',
    group: 'Salado',
    name: 'Medallones de Pollo Paladini x2',
    brand: 'Paladini',
    weight: '150 g',
    description: 'Dos medallones de pollo rebozados, al horno o fritos.',
    tiers: [{ qty: null, price: 2900 }],
    image: paladiniMedallonesPollo,
    pack: true,
  },
  {
    id: 'vegetalex-burger',
    category: 'congelados',
    group: 'Salado',
    name: 'Vegetalex Burger x2',
    brand: 'Vegetalex',
    weight: '226 g',
    description: 'Hamburguesas con ingredientes de origen vegetal, 2 de 113 g.',
    tiers: [{ qty: null, price: 6900 }],
    image: vegetalexBurger,
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

for (const c of combos) {
  if (c.category === 'hamburguesas') c.addons = [CHEDDAR]
  if (c.category === 'panchos') c.addons = [PAPAS_PAY, CHEDDAR]
}

export const getCombo = (id) => combos.find((c) => c.id === id)
export const byCategory = (id) => combos.filter((c) => c.category === id)
