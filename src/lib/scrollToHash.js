/**
 * Scroll a un ancla interna que se corrige mientras cargan imágenes y fuentes.
 * Sin esto, al tocar "Panchos" la página podía quedar arriba (en Promociones)
 * porque el contenido anterior cambia de alto después del salto.
 */
export function scrollToHash(hash, { smooth = true } = {}) {
  const el = hash && hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
  if (!el) return false
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: smooth && !reduce ? 'smooth' : 'auto', block: 'start' })

  // Durante ~2,5 s, si el destino se movió y el usuario no scrolleó, se reajusta.
  let userMoved = false
  const stop = () => (userMoved = true)
  window.addEventListener('wheel', stop, { passive: true, once: true })
  window.addEventListener('touchstart', stop, { passive: true, once: true })
  window.addEventListener('keydown', stop, { once: true })
  const offset = () => parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  let last = null
  const started = performance.now()
  const tick = () => {
    if (userMoved || performance.now() - started > 2500) return
    const top = el.getBoundingClientRect().top - offset()
    // espera a que termine el scroll suave (posición estable) antes de corregir
    if (last !== null && Math.abs(top - last) < 1 && Math.abs(top) > 4) {
      window.scrollBy({ top, behavior: 'auto' })
    }
    last = el.getBoundingClientRect().top - offset()
    setTimeout(tick, 120)
  }
  setTimeout(tick, 120)
  return true
}

/** Intercepta los clics en enlaces internos (#…) de toda la página. */
export function installHashLinks() {
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = e.target.closest?.('a[href^="#"]')
    if (!a) return
    const hash = a.getAttribute('href')
    if (hash.length < 2 || !document.getElementById(decodeURIComponent(hash.slice(1)))) return
    e.preventDefault()
    history.pushState(null, '', hash)
    // deja que se cierren menús/diálogos (que liberan el scroll del body) antes de desplazar
    requestAnimationFrame(() => scrollToHash(hash))
  }
  document.addEventListener('click', onClick)
  if (location.hash) setTimeout(() => scrollToHash(location.hash, { smooth: false }), 50)
  return () => document.removeEventListener('click', onClick)
}
