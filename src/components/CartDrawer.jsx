import { useEffect, useRef, useState } from 'react'
import { useCart, toCartItem } from '../cart/CartContext'
import { getCombo } from '../data/combos'
import { cartLink } from '../lib/whatsapp'
import { formatPrice } from '../lib/format'
import { CartIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon, WhatsAppIcon } from './Icons'

/* Una línea del carrito: producto, cantidad del combo (editable), adicional (editable), unidades y subtotal */
function CartLine({ it }) {
  const cart = useCart()
  const combo = getCombo(it.id)
  const tiers = combo?.tiers?.length > 1 ? combo.tiers : null
  const addon = combo?.addon

  const reconfigure = (changes) => {
    if (!combo) return
    const tier = combo.tiers?.find((t) => t.qty === (changes.tierQty ?? it.tierQty)) ?? null
    const withAddon = changes.addon ?? !!it.addonLabel
    cart.replace(it.key, toCartItem(combo, { tier, addon: withAddon ? addon : null, variant: it.variant }))
  }

  return (
    <li className="grid grid-cols-[4.5rem_1fr] gap-3 py-4">
      <div className="size-[4.5rem] overflow-hidden rounded-md bg-crema">
        <img src={it.image} alt="" className={`size-full ${it.pack ? 'object-contain p-1.5' : 'object-cover'}`} />
      </div>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="leading-tight font-extrabold">
            {it.name}
            {it.variant && <span className="block text-xs font-semibold text-navy/60">Sabor {it.variant}</span>}
          </p>
          <button type="button" onClick={() => cart.remove(it.key)} aria-label={`Quitar ${it.name}`} className="-mt-1 -mr-1 grid size-8 shrink-0 place-items-center rounded-md text-navy/40 hover:bg-rojo/10 hover:text-rojo">
            <TrashIcon className="size-4" />
          </button>
        </div>

        {/* Detalle editable */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
          {tiers ? (
            <label className="relative">
              <span className="sr-only">Cantidad del combo</span>
              <select
                value={it.tierQty ?? ''}
                onChange={(e) => reconfigure({ tierQty: Number(e.target.value) })}
                className="appearance-none rounded-md bg-navy py-1 pr-6 pl-2 font-bold text-white"
              >
                {tiers.map((t) => (
                  <option key={t.qty} value={t.qty}>
                    x{t.qty} {it.unitLabel} — {formatPrice(t.price)}
                  </option>
                ))}
              </select>
              <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[0.6rem] text-white">▼</span>
            </label>
          ) : (
            it.tierQty && <span className="rounded-md bg-navy px-2 py-1 font-bold text-white">x{it.tierQty} {it.unitLabel}</span>
          )}
          {addon && it.unitPrice != null && (
            <label className={`flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 font-bold ${it.addonLabel ? 'bg-rojo text-white' : 'bg-crema text-navy/60'}`}>
              <input type="checkbox" checked={!!it.addonLabel} onChange={(e) => reconfigure({ addon: e.target.checked })} className="size-3 accent-white" />
              {addon.label} +{formatPrice(addon.price)}
            </label>
          )}
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center rounded-md bg-crema" role="group" aria-label={`Unidades de ${it.name}`}>
            <button type="button" onClick={() => cart.setCount(it.key, it.count - 1)} aria-label="Restar uno" className="grid size-8 place-items-center rounded-md hover:bg-white">
              <MinusIcon className="size-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-extrabold">{it.count}</span>
            <button type="button" onClick={() => cart.setCount(it.key, it.count + 1)} aria-label="Sumar uno" className="grid size-8 place-items-center rounded-md hover:bg-white">
              <PlusIcon className="size-3.5" />
            </button>
          </div>
          <p className="text-right">
            {it.unitPrice != null ? (
              <>
                <span className="display block text-xl leading-none text-rojo">{formatPrice(it.unitPrice * it.count)}</span>
                {it.count > 1 && <span className="text-[0.7rem] font-semibold text-navy/50">{formatPrice(it.unitPrice)} c/u</span>}
              </>
            ) : (
              <span className="text-sm font-bold text-navy/50">Precio a consultar</span>
            )}
          </p>
        </div>
      </div>
    </li>
  )
}

/** Panel lateral del carrito. "Finalizar pedido" abre WhatsApp con el pedido completo. */
export default function CartDrawer() {
  const cart = useCart()
  const ref = useRef(null)
  const [name, setName] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (cart.open && !d.open) {
      d.showModal()
      document.body.style.overflow = 'hidden'
    } else if (!cart.open && d.open) d.close()
    if (!cart.open) document.body.style.overflow = ''
  }, [cart.open])

  const href = cartLink(cart.items, { total: cart.total, hasUnpriced: cart.hasUnpriced, name, note })

  return (
    <dialog
      ref={ref}
      onClose={cart.closeCart}
      onClick={(e) => e.target === ref.current && cart.closeCart()}
      aria-labelledby="cart-title"
      className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-full max-w-md bg-white p-0 text-navy shadow-lift backdrop:bg-navy/50 backdrop:backdrop-blur-sm open:animate-drawer-in"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between bg-navy px-5 py-4 text-white">
          <h2 id="cart-title" className="display flex items-center gap-2.5 text-3xl">
            <CartIcon className="size-7 text-celeste" /> Tu pedido
            {cart.count > 0 && <span className="rounded-md bg-rojo px-2 py-0.5 font-sans text-sm font-extrabold">{cart.count}</span>}
          </h2>
          <button type="button" onClick={cart.closeCart} aria-label="Cerrar carrito" className="grid size-10 place-items-center rounded-md bg-white/10 hover:bg-white hover:text-navy">
            <CloseIcon className="size-5" />
          </button>
        </header>

        {cart.items.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div>
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-celeste-soft text-celeste-deep">
                <CartIcon className="size-10" />
              </div>
              <p className="display mt-5 text-3xl">Tu carrito está vacío</p>
              <p className="mt-2 text-navy/65">Elegí un combo, la cantidad y sumalo.</p>
              <a href="#catalogo" onClick={cart.closeCart} className="btn btn-navy mt-6">
                Ver catálogo
              </a>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-navy/10 overflow-y-auto px-5">
              {cart.items.map((it) => (
                <CartLine key={it.key} it={it} />
              ))}
            </ul>

            <footer className="space-y-3 border-t-4 border-celeste bg-crema px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-navy/60">Productos</dt>
                  <dd className="font-bold">{formatPrice(cart.subtotal)}</dd>
                </div>
                {cart.addonsTotal > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-navy/60">Adicionales</dt>
                    <dd className="font-bold">{formatPrice(cart.addonsTotal)}</dd>
                  </div>
                )}
                <div className="flex items-end justify-between border-t border-dashed border-navy/20 pt-2">
                  <dt className="font-extrabold">Total</dt>
                  <dd className="display text-4xl leading-none text-rojo">{cart.total > 0 ? formatPrice(cart.total) : 'A consultar'}</dd>
                </div>
              </dl>
              {cart.hasUnpriced && <p className="text-xs text-navy/60">Algunos productos no tienen precio publicado: te lo confirmamos por WhatsApp.</p>}

              <details className="group text-sm">
                <summary className="cursor-pointer font-bold text-navy/70 select-none hover:text-navy">Agregar nombre o comentarios (opcional)</summary>
                <div className="mt-2 grid gap-2">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" aria-label="Tu nombre" className="w-full rounded-md border border-navy/15 bg-white px-3 py-2 text-base text-navy" />
                  <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Zona, horario…" aria-label="Comentarios" className="w-full rounded-md border border-navy/15 bg-white px-3 py-2 text-base text-navy" />
                </div>
              </details>

              <a href={href} target="_blank" rel="noopener noreferrer" className="btn-shine flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#1faa53] py-4 text-lg font-bold text-white transition-colors hover:bg-[#178a43]">
                <WhatsAppIcon className="size-6" /> Finalizar pedido por WhatsApp
              </a>
              <button type="button" onClick={cart.clear} className="w-full text-sm font-semibold text-navy/50 underline-offset-4 hover:text-rojo hover:underline">
                Vaciar carrito
              </button>
            </footer>
          </>
        )}
      </div>
    </dialog>
  )
}
