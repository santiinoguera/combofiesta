import { useEffect, useRef } from 'react'

const prefersReduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Parallax de scroll: escribe `--p` (de -1 a 1) en el elemento según dónde está
 * respecto del centro de la pantalla. Los hijos con `.plx` lo usan para moverse.
 * Se mide el contenedor (que no se mueve) para no realimentar la posición.
 * Con reduce-motion no hace nada y todo queda quieto.
 */
export function useScrollParallax() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduce() || !('IntersectionObserver' in window)) return
    let raf = 0
    let visible = false
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const half = window.innerHeight / 2
      const p = (r.top + r.height / 2 - half) / (half + r.height / 2)
      el.style.setProperty('--p', Math.max(-1, Math.min(1, p)).toFixed(3))
    }
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update)
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      onScroll()
    })
    io.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return ref
}

/**
 * Inclinación con el mouse: escribe `--mx` / `--my` (de -1 a 1) en el elemento.
 * Solo en dispositivos con mouse (en celulares no hay hover) y sin reduce-motion.
 */
export function usePointerTilt() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduce() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let raf = 0
    let last = null
    const apply = () => {
      raf = 0
      if (!last) return
      const r = el.getBoundingClientRect()
      const mx = ((last.x - r.left) / r.width) * 2 - 1
      const my = ((last.y - r.top) / r.height) * 2 - 1
      el.style.setProperty('--mx', mx.toFixed(3))
      el.style.setProperty('--my', my.toFixed(3))
    }
    const onMove = (e) => {
      last = { x: e.clientX, y: e.clientY }
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      last = null
      el.style.setProperty('--mx', '0')
      el.style.setProperty('--my', '0')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])
  return ref
}
