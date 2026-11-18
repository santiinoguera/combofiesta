import { useState } from 'react'

/** Estado de selección de un producto: cantidad (tier), sabor (variant) y agregados (addons). */
export function useProductConfig(combo) {
  const [tierIdx, setTierIdx] = useState(0)
  const [variantIdx, setVariantIdx] = useState(0)
  const [addonIds, setAddonIds] = useState([])
  const [sauceIdx, setSauceIdx] = useState(0)

  const priced = Array.isArray(combo.tiers) && combo.tiers.length > 0
  const tier = priced ? combo.tiers[tierIdx] : null
  const addons = (combo.addons ?? []).filter((a) => addonIds.includes(a.id))
  const variant = combo.variants?.[variantIdx] ?? null
  const sauce = combo.sauces?.[sauceIdx]?.label ?? null
  const addonsPrice = addons.reduce((n, a) => n + a.price, 0)
  const total = tier ? tier.price + addonsPrice : null
  const perUnit = tier?.qty ? Math.round(total / tier.qty) : null

  const toggleAddon = (id, on) => setAddonIds((ids) => (on ? [...new Set([...ids, id])] : ids.filter((x) => x !== id)))

  return {
    priced,
    tier,
    addons,
    variant,
    total,
    perUnit,
    tierIdx,
    setTierIdx,
    variantIdx,
    setVariantIdx,
    addonIds,
    toggleAddon,
    sauce,
    sauceIdx,
    setSauceIdx,
    selection: { tier, addons, variant, sauce },
  }
}
