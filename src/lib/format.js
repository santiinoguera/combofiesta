/** $32.900 — formato argentino, sin decimales. */
export const formatPrice = (value) =>
  '$' + Math.round(value).toLocaleString('es-AR', { maximumFractionDigits: 0 })
