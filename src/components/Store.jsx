import frente from '../assets/img/local-frente.webp'
import cartel from '../assets/img/local-cartel.webp'
import vidriera from '../assets/img/local-vidriera.webp'
import Reveal from './Reveal'
import { ArrowIcon, ClockIcon, PinIcon, WhatsAppIcon } from './Icons'
import { whatsappLink } from '../lib/whatsapp'
import { site } from '../data/site'

const q = encodeURIComponent(site.mapsQuery)
const directions = `https://www.google.com/maps/dir/?api=1&destination=${q}`
const mapSrc = `https://maps.google.com/maps?q=${q}&z=16&output=embed`

/** Local físico: fotos del frente, dirección, horario, mapa y "Cómo llegar". */
export default function Store() {
  return (
    <section id="local" aria-labelledby="local-title" className="bg-crema py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-rojo">
              <span className="h-0.5 w-8 bg-rojo" /> Nuestro local
            </p>
            <h2 id="local-title" className="display mt-4 text-[clamp(2.8rem,7vw,5.2rem)] text-navy">
              Vení a <span className="text-celeste">visitarnos</span>
            </h2>
          </div>
          <p className="text-lg text-navy/70 lg:col-span-5">
            Retirá tu pedido en el local o pedilo por WhatsApp y te lo llevamos a domicilio en {site.city}.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-6">
          {/* Fotos: frente grande + dos detalles */}
          <Reveal className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
            <figure className="col-span-2 overflow-hidden rounded-xl sm:col-span-1 sm:row-span-2">
              <img src={frente} alt={`Frente del local de Combo Fiesta en ${site.address}, ${site.city}`} loading="lazy" decoding="async" className="aspect-[4/5] size-full object-cover sm:aspect-auto" />
            </figure>
            <figure className="overflow-hidden rounded-xl">
              <img src={cartel} alt="Cartel de Combo Fiesta sobre la pared roja del local" loading="lazy" decoding="async" className="aspect-[4/3] size-full object-cover" />
            </figure>
            <figure className="overflow-hidden rounded-xl">
              <img src={vidriera} alt="Vidriera con los combos de hamburguesas y panchos" loading="lazy" decoding="async" className="aspect-[4/3] size-full object-cover object-top" />
            </figure>
          </Reveal>

          {/* Datos + mapa */}
          <Reveal delay={100} className="flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-navy/8 lg:col-span-5">
            <div className="relative aspect-[16/10] bg-celeste-soft">
              <iframe
                title={`Mapa: ${site.address}, ${site.city}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
              />
            </div>
            <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
              <div className="flex gap-3">
                <PinIcon className="mt-0.5 size-6 shrink-0 text-rojo" />
                <div>
                  <p className="text-xl font-extrabold text-navy">{site.address}</p>
                  <p className="text-navy/60">
                    {site.city}, {site.region} · CP {site.postalCode}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <ClockIcon className="mt-0.5 size-6 shrink-0 text-rojo" />
                <div>
                  <p className="font-extrabold text-navy">{site.hours.days}</p>
                  <p className="text-navy/60">{site.hours.ranges.join(' y ')} hs</p>
                </div>
              </div>
              <div className="mt-auto grid gap-2 sm:grid-cols-2">
                <a href={directions} target="_blank" rel="noopener noreferrer" className="btn btn-navy group">
                  Cómo llegar
                  <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                  <WhatsAppIcon className="size-5" /> Consultar
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
