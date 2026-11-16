/* Íconos SVG propios (sin dependencias). Todos heredan `currentColor`. */
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const WhatsAppIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path
      fill="currentColor"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z"
    />
  </svg>
)

export const InstagramIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
  </svg>
)

export const TikTokIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.12V9.77a5.68 5.68 0 0 0-.77-.05 5.68 5.68 0 1 0 5.68 5.68V9.01a7.33 7.33 0 0 0 4.29 1.38V7.3a4.28 4.28 0 0 1-3.23-1.48Z" />
  </svg>
)

export const FacebookIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.5V4.46A20 20 0 0 0 14.3 4.3c-2.2 0-3.7 1.34-3.7 3.8v2.4H8.1v3h2.5V21h2.9Z" />
  </svg>
)

export const ArrowIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const MenuIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
)

export const CloseIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const CheckIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} strokeWidth={2.6} {...p}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </svg>
)

export const ClockIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const PinIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M12 21s-7-6.1-7-11.5a7 7 0 1 1 14 0C19 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

export const TruckIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M3 6h11v10H3zM14 9h4l3 3.5V16h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17.5" cy="17.5" r="1.8" />
  </svg>
)

/* Íconos ilustrados de beneficios: trazos gruesos, estilo sticker */
export const GridIcon = (p) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...base} strokeWidth={3} {...p}>
    <rect x="6" y="6" width="15" height="15" rx="4" />
    <rect x="27" y="6" width="15" height="15" rx="4" />
    <rect x="6" y="27" width="15" height="15" rx="4" />
    <circle cx="34.5" cy="34.5" r="7.5" />
  </svg>
)

export const PeopleIcon = (p) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...base} strokeWidth={3} {...p}>
    <circle cx="17" cy="16" r="6" />
    <circle cx="33" cy="18" r="5" />
    <path d="M5 40c1.5-7 6-11 12-11s10.5 4 12 11M28 30.5c1.5-.9 3.2-1.5 5-1.5 5 0 8.5 3.5 10 9" />
  </svg>
)

export const TapIcon = (p) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...base} strokeWidth={3} {...p}>
    <rect x="12" y="4" width="24" height="40" rx="6" />
    <path d="M21 37h6M19 18l4 4 7-8" />
  </svg>
)

export const ChatIcon = (p) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...base} strokeWidth={3} {...p}>
    <path d="M8 10h32v22H22l-9 8v-8H8z" />
    <path d="M16 19h16M16 25h10" />
  </svg>
)

export const CartIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M3 4h2.2l2.1 10.2a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.2L20.5 8H6.1" />
    <circle cx="9.5" cy="19.5" r="1.4" />
    <circle cx="17" cy="19.5" r="1.4" />
  </svg>
)

export const PlusIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} strokeWidth={2.4} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const MinusIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} strokeWidth={2.4} {...p}>
    <path d="M5 12h14" />
  </svg>
)

export const TrashIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
  </svg>
)

export const ExpandIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
  </svg>
)
