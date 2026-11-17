import Reveal from './Reveal'
import { WhatsAppIcon, InstagramIcon, TikTokIcon, FacebookIcon, ClockIcon, PinIcon, TruckIcon, ArrowIcon } from './Icons'
import { whatsappLink } from '../lib/whatsapp'
import { site } from '../data/site'

export const socials = () =>
  [
    site.instagram && { ...site.instagram, label: 'Instagram', Icon: InstagramIcon },
    site.tiktok && { ...site.tiktok, label: 'TikTok', Icon: TikTokIcon },
    site.facebook && { ...site.facebook, label: 'Facebook', Icon: FacebookIcon },
  ].filter(Boolean)

export default function Contact() {
  return (
    <section id="contacto" aria-labelledby="contact-title" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-celeste px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
          <div aria-hidden="true" className="dots absolute inset-0 text-white/25" />
          <div aria-hidden="true" className="absolute -right-24 -bottom-24 size-80 rounded-full bg-white/20" />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow text-navy/70">
                <span className="h-0.5 w-8 bg-navy/70" /> Contacto
              </p>
              <h2 id="contact-title" className="display mt-4 text-[clamp(3rem,8vw,6.5rem)] text-navy">
                ¿Armamos <br />
                <span className="text-white [text-shadow:4px_4px_0_var(--color-navy)]">tu pedido?</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg text-navy/80">
                Escribinos por WhatsApp y te ayudamos a elegir el combo justo para tu juntada.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-red group !py-4 text-lg">
                  <WhatsAppIcon className="size-6" />
                  {site.whatsappDisplay}
                  <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
                </a>
                {socials().map(({ url, user, label, Icon }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="btn btn-white !py-4 text-lg">
                    <Icon className="size-6" />@{user}
                    <span className="sr-only"> en {label}</span>
                  </a>
                ))}
              </div>
            </div>

            <ul className="grid gap-4 lg:col-span-5">
              <li className="flex gap-4 rounded-2xl bg-white p-6 shadow-soft">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy text-white">
                  <ClockIcon className="size-6" />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-[0.16em] text-navy/50 uppercase">Horarios</p>
                  <p className="mt-1 text-lg font-bold">{site.hours.days}</p>
                  {site.hours.ranges.map((r) => (
                    <p key={r} className="text-navy/75">{r} hs</p>
                  ))}
                </div>
              </li>
              <li className="flex gap-4 rounded-2xl bg-white p-6 shadow-soft">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-rojo text-white">
                  <TruckIcon className="size-6" />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-[0.16em] text-navy/50 uppercase">Entregas</p>
                  <p className="mt-1 text-lg font-bold">{site.deliveryNote}</p>
                  <p className="text-navy/75">Consultá zona y costo al hacer tu pedido.</p>
                </div>
              </li>
              <li className="flex gap-4 rounded-2xl bg-white p-6 shadow-soft">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-celeste-deep text-white">
                  <PinIcon className="size-6" />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-[0.16em] text-navy/50 uppercase">Dónde estamos</p>
                  <p className="mt-1 text-lg font-bold">{site.address ?? `${site.city}, ${site.region}`}</p>
                  <a href="#local" className="text-sm font-bold text-rojo underline-offset-4 hover:underline">Ver mapa y fotos</a>
                  <p className="text-navy/75">{site.country}</p>
                </div>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
