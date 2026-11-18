import frente from '../assets/img/local-frente.webp'
import Reveal from './Reveal'

/** ¿Quiénes somos? — texto provisto por Combo Fiesta. */
export default function About() {
  return (
    <section id="nosotros" aria-labelledby="about-title" className="bg-white py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <Reveal className="relative lg:col-span-5">
          <div aria-hidden="true" className="absolute -inset-3 -rotate-2 rounded-2xl bg-celeste" />
          <img
            src={frente}
            alt="Frente del local de Combo Fiesta en la zona sur de Rosario"
            loading="lazy"
            decoding="async"
            className="relative aspect-[4/5] w-full rounded-xl object-cover shadow-soft"
          />
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7">
          <p className="eyebrow text-rojo">
            <span className="h-0.5 w-8 bg-rojo" /> Nosotros
          </p>
          <h2 id="about-title" className="display mt-4 text-[clamp(2.8rem,7vw,5.2rem)] text-navy">
            ¿Quiénes <span className="text-celeste">somos?</span>
          </h2>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-navy/75">
            <p>
              <strong className="text-navy">Somos Combo Fiesta</strong>, un emprendimiento nacido en el corazón de la zona más comercial
              de la zona sur de Rosario.
            </p>
            <p>
              Creemos que las mejores comidas se disfrutan compartiendo buenos momentos. Por eso, trabajamos para ofrecerte productos de
              calidad, variedad y opciones para cada ocasión.
            </p>
            <p>
              Desde hamburguesas y panchos hasta frutas y verduras congeladas, buscamos que encuentres todo lo que necesitás en un solo
              lugar.
            </p>
            <p>
              Detrás de Combo Fiesta hay esfuerzo, dedicación y muchas ganas de crecer, siempre manteniendo algo que nos identifica: la
              cercanía con nuestros clientes y el compromiso de ofrecerles lo mejor.
            </p>
          </div>

          <p className="display mt-10 border-l-4 border-rojo pl-5 text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-navy">
            Combo Fiesta: buenos momentos, buenos sabores y la comodidad de encontrar todo en un solo lugar.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
