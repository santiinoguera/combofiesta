import Logo from './Logo'
import { NAV } from './Header'
import { socials } from './Contact'
import { WhatsAppIcon } from './Icons'
import { whatsappLink } from '../lib/whatsapp'
import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-28 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo className="h-20 w-auto" />
            <p className="mt-5 text-white/65">Combos para compartir en {site.city}. Hamburguesas, panchos, choris y snacks.</p>
          </div>

          <nav aria-label="Pie de página">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="font-semibold text-white/75 transition-colors hover:text-celeste">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid size-12 place-items-center rounded-full bg-white/10 transition-colors hover:bg-rojo"
            >
              <WhatsAppIcon className="size-6" />
            </a>
            {socials().map(({ url, label, Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-12 place-items-center rounded-full bg-white/10 transition-colors hover:bg-celeste hover:text-navy"
              >
                <Icon className="size-6" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name} {site.city}.</p>
          <p>Precios sujetos a disponibilidad. Consultá por WhatsApp.</p>
        </div>
      </div>
      <div aria-hidden="true" className="flex h-2">
        <span className="flex-1 bg-celeste" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-rojo" />
      </div>
    </footer>
  )
}
