/**
 * Single source of truth for commerce configuration.
 *
 * Everything the Add to Cart flow needs lives here. Nothing else in the app
 * should hardcode a price, a product name, or a Shopify identifier.
 */

export const PRODUCT_NAME = 'Pitcher of Life Alkaline Reverse Osmosis Water System'

/** Short name used in tight spaces (sticky bar, header). */
export const PRODUCT_NAME_SHORT = 'Pitcher of Life RO'

/** Price in minor units (cents) so we never do float math on money. */
export const PRICE_CENTS = 69700
export const CURRENCY = 'USD'

/** Display price, formatted once and reused everywhere. */
export const PRICE_DISPLAY = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: CURRENCY,
  minimumFractionDigits: 0,
}).format(PRICE_CENTS / 100)

/**
 * TODO_VERIFY: replace with the real numeric Shopify variant ID for the RO
 * system (Shopify admin → Products → Reverse Osmosis Alkaline Water
 * Purification System → Variants, or `/products/ro-system.js` in a browser).
 *
 * While this is left as the placeholder, `addToCart()` will not fabricate a
 * cart request — it sends the shopper to the real product page instead.
 */
export const SHOPIFY_VARIANT_ID = 'TODO_VERIFY_VARIANT_ID'

/** Canonical product page. Used as the fallback purchase path. */
export const SHOPIFY_PRODUCT_URL = 'https://pitcheroflife.com/products/ro-system'

/** Storefront origin, used to detect whether we are running on the shop. */
export const SHOPIFY_STORE_ORIGIN = 'https://pitcheroflife.com'

/**
 * Official policy pages on the storefront.
 *
 * The page LINKS to these rather than restating them. No return window is
 * printed anywhere in this project: the only figure we ever found was a
 * 30-day guarantee attached to the alkaline water PITCHER product pages,
 * which is a different product from this RO system, and carrying it across
 * would be the same scope error as reading carbon-media certification as
 * whole-system certification.
 *
 * TODO_VERIFY: confirm these two paths resolve on the live storefront. They
 * follow Shopify's standard `/policies/` routing, and `/policies/` is known
 * to be in use on this store, but neither was reachable from the build
 * environment to check.
 */
export const RETURN_POLICY_URL = `${SHOPIFY_STORE_ORIGIN}/policies/refund-policy`
export const SHIPPING_POLICY_URL = `${SHOPIFY_STORE_ORIGIN}/policies/shipping-policy`
export const WARRANTY_URL = `${SHOPIFY_STORE_ORIGIN}/pages/warranty-form`

/** Replacement RO membrane filter on the storefront. */
// TODO_VERIFY: confirm this handle, and whether the other RO stages are sold
// separately or only as a set.
export const REPLACEMENT_FILTER_URL = `${SHOPIFY_STORE_ORIGIN}/products/ro-membrane-filter`

/** True once a real variant ID has been supplied above. */
export const isVariantConfigured = (): boolean =>
  /^\d+$/.test(SHOPIFY_VARIANT_ID.trim())
