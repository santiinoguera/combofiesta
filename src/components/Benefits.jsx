import Reveal from './Reveal'
import { GridIcon, PeopleIcon, TapIcon, ChatIcon, WhatsAppIcon } from './Icons'
import { whatsappLink } from '../lib/whatsapp'
import { combos } from '../data/combos'

const BENEFITS = [
  {
    icon: GridIcon,
    title: 'Variedad de combos',
    text: `${combos.length} combos entre hamburguesas, panchos, choris y snacks de marcas conocidas.`,
    tone: 'bg-white text-navy',
    iconTone: 'bg-celeste text-white',
  },
  {
    icon: PeopleIcon,
    title: 'Soluciones para reuniones',
    text: 'Cantidades de 12 a 60 unidades: del cumple chico al evento grande, con pan y aderezos.',
    tone: 'bg-celeste text-navy',
    offset: true,
    iconTone: 'bg-white text-celeste-deep',
  },
  {
    icon: TapIcon,
    title: 'Compra sencilla',
    text: 'Elegís el combo, tocás el botón y el pedido te llega escrito a WhatsApp. Sin registros ni formularios.',
    tone: 'bg-rojo text-white',
    iconTone: 'bg-white text-rojo',
  },
  {
    icon: ChatIcon,
    title: 'Atención personalizada',
    text: 'Te respondemos por WhatsApp para armar el pedido a tu medida y coordinar el envío.',
    tone: 'bg-navy text-white',
    offset: true,
    iconTone: 'bg-celeste text-navy',
  },
]

const STEPS = [
  { n: '01', title: 'Elegí tu combo', text: 'Mirá el catálogo y seleccioná la cantidad.' },
  { n: '02', title: 'Escribinos', text: 'El botón abre WhatsApp con tu pedido listo.' },
  { n: '03', title: 'Recibilo', text: 'Coordinamos el envío a domicilio.' },
]

export default function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="bg-crema py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-rojo">
            <span className="h-0.5 w-8 bg-rojo" /> Por qué Combo Fiesta
          </p>
          <h2 id="benefits-title" className="display mt-4 text-[clamp(2.6rem,7vw,5rem)] text-navy">
            Vos poné la gente. <span className="text-celeste">Nosotros, el combo.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:pb-10">
          {BENEFITS.map(({ icon: Icon, title, text, tone, iconTone, offset }, i) => (
            <Reveal key={title} delay={i * 90} className={offset ? 'lg:translate-y-10' : ''}>
              <article className={`flex h-full flex-col rounded-[1.75rem] p-7 shadow-soft transition-transform duration-300 hover:-rotate-1 ${tone}`}>
                <span className={`grid size-16 place-items-center rounded-2xl ${iconTone}`}>
                  <Icon className="size-9" />
                </span>
                <h3 className="display mt-8 text-3xl">{title}</h3>
                <p className="mt-3 leading-relaxed opacity-80">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Cómo pedir */}
        <Reveal className="mt-20 overflow-hidden rounded-[2rem] bg-white shadow-soft">
          <div className="grid lg:grid-cols-12">
            <div className="flex flex-col justify-between gap-6 bg-celeste p-8 sm:p-10 lg:col-span-4">
              <h3 className="display text-5xl text-navy">Cómo pedir</h3>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-navy w-fit">
                <WhatsAppIcon className="size-5" /> Empezar pedido
              </a>
            </div>
            <ol className="grid divide-y divide-navy/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:col-span-8">
              {STEPS.map((s) => (
                <li key={s.n} className="p-8 sm:p-10">
                  <span className="display text-6xl text-rojo">{s.n}</span>
                  <p className="mt-4 text-xl font-bold">{s.title}</p>
                  <p className="mt-2 text-navy/65">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
