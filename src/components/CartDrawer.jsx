import { useEffect, useRef, useState } from 'react'
import { useCart } from '../cart/CartContext'
import { cartLink, describeItem } from '../lib/whatsapp'
import { formatPrice } from '../lib/format'
import { CartIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon, WhatsAppIcon } from './Icons'

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
        <header className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
          <h2 id="cart-title" className="display flex items-center gap-2 text-3xl">
            <CartIcon className="size-7 text-rojo" /> Tu pedido
          </h2>
          <button type="button" onClick={cart.closeCart} aria-label="Cerrar carrito" className="grid size-11 place-items-center rounded-full bg-crema hover:bg-navy hover:text-white">
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
              <p className="mt-2 text-navy/65">Agregá combos y productos desde el catálogo.</p>
              <a href="#catalogo" onClick={cart.closeCart} className="btn btn-navy mt-6">
                Ver catálogo
              </a>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-navy/10 overflow-y-auto px-5">
              {cart.items.map((it) => (
                <li key={it.key} className="flex gap-3 py-4">
                  <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-crema">
                    <img src={it.image} alt="" className={`size-full ${it.pack ? 'object-contain p-1.5' : 'object-cover'}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="leading-tight font-bold">{describeItem(it)}</p>
                    <p className="mt-1 text-sm font-semibold text-rojo">
                      {it.unitPrice != null ? formatPrice(it.unitPrice * it.count) : 'Precio a consultar'}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full bg-crema p-0.5" role="group" aria-label={`Cantidad de ${it.name}`}>
                        <button type="button" onClick={() => cart.setCount(it.key, it.count - 1)} aria-label="Restar uno" className="grid size-8 place-items-center rounded-full hover:bg-white">
                          <MinusIcon className="size-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold">{it.count}</span>
                        <button type="button" onClick={() => cart.setCount(it.key, it.count + 1)} aria-label="Sumar uno" className="grid size-8 place-items-center rounded-full hover:bg-white">
                          <PlusIcon className="size-3.5" />
                        </button>
                      </div>
                      <button type="button" onClick={() => cart.remove(it.key)} aria-label={`Quitar ${it.name}`} className="grid size-9 place-items-center rounded-full text-navy/50 hover:bg-rojo/10 hover:text-rojo">
                        <TrashIcon className="size-4.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="space-y-3 border-t border-navy/10 bg-crema/60 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="text-xs font-bold text-navy/60">
                  Tu nombre (opcional)
                  <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-base font-medium text-navy" />
                </label>
                <label className="text-xs font-bold text-navy/60">
                  Comentarios (opcional)
                  <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Zona, horario…" className="mt-1 w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-base font-medium text-navy" />
                </label>
              </div>
              <div className="flex items-end justify-between">
                <span className="font-bold text-navy/70">Total</span>
                <span className="display text-4xl text-rojo">{cart.total > 0 ? formatPrice(cart.total) : 'A consultar'}</span>
              </div>
              {cart.hasUnpriced && <p className="text-xs text-navy/60">Algunos productos no tienen precio publicado: te lo confirmamos por WhatsApp.</p>}
              <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-shine w-full !bg-[#1faa53] !py-4 text-lg text-white hover:!bg-[#178a43]">
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
