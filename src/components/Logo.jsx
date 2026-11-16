// Logo oficial de Combo Fiesta en SVG: nítido en cualquier tamaño y pantalla.
import logo from '../assets/img/logo-combo-fiesta.svg'

export default function Logo({ className = 'h-12 w-auto' }) {
  return <img src={logo} alt="Combo Fiesta" width="868" height="698" className={className} decoding="async" />
}
