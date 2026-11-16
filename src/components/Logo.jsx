import logo from '../assets/img/logo-combo-fiesta.webp'

export default function Logo({ className = 'h-12 w-auto' }) {
  return <img src={logo} alt="Combo Fiesta" width="328" height="245" className={className} decoding="async" />
}
