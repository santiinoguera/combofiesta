// Logo oficial de Combo Fiesta (con borde blanco, fondo transparente).
import logo from '../assets/img/logo-combo-fiesta.webp'

export default function Logo({ className = 'h-12 w-auto' }) {
  return <img src={logo} alt="Combo Fiesta" width="900" height="663" className={className} decoding="async" />
}
