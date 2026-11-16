import { useState } from 'react'

/** Estado de selección de un producto: cantidad (tier), sabor (variant) y agregado (addon). */
export function useProductConfig(combo) {
  const [tierIdx, setTierIdx] = useState(0)
  const [variantIdx, setVariantIdx] = useState(0)
  const [withAddon, setWithAddon] = useState(false)

  const priced = Array.isArray(combo.tiers) && combo.tiers.length > 0
  const tier = priced ? combo.tiers[tierIdx] : null
  const addon = withAddon ? combo.addon : null
  const variant = combo.variants?.[variantIdx] ?? null
  const total = tier ? tier.price + (addon?.price ?? 0) : null
  const perUnit = tier?.qty ? Math.round(total / tier.qty) : null

  return {
    priced,
    tier,
    addon,
    variant,
    total,
    perUnit,
    tierIdx,
    setTierIdx,
    variantIdx,
    setVariantIdx,
    withAddon,
    setWithAddon,
    selection: { tier, addon, variant },
  }
}
