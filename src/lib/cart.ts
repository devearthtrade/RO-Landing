import {
  PRICE_DISPLAY,
  PRODUCT_NAME,
  SHOPIFY_PRODUCT_URL,
  SHOPIFY_STORE_ORIGIN,
  SHOPIFY_VARIANT_ID,
  isVariantConfigured,
} from '../data/product'

export type AddToCartResult =
  | { status: 'added' }
  | { status: 'redirected'; url: string }
  | { status: 'error'; message: string }

/**
 * True when the page is being served from the Shopify storefront itself, in
 * which case Shopify's native AJAX Cart API is available on the same origin.
 */
function isOnStorefront(): boolean {
  if (typeof window === 'undefined') return false
  const storeHost = new URL(SHOPIFY_STORE_ORIGIN).hostname.replace(/^www\./, '')
  const host = window.location.hostname.replace(/^www\./, '')
  return host === storeHost || host.endsWith(`.${storeHost}`)
}

/** Permalink that adds the variant and lands the shopper in Shopify checkout. */
function cartPermalink(quantity: number): string {
  return `${SHOPIFY_STORE_ORIGIN}/cart/${SHOPIFY_VARIANT_ID}:${quantity}`
}

/**
 * Add the RO system to the cart.
 *
 * Three honest paths, in order of preference:
 *
 *  1. Served from the Shopify storefront and a real variant ID is configured →
 *     POST to Shopify's native `/cart/add.js`, then go to `/cart`.
 *  2. Real variant ID but hosted elsewhere → hand off to Shopify's cart
 *     permalink, which is a genuine add-to-cart on the store.
 *  3. Variant ID still a placeholder → send the shopper to the real product
 *     page. We never simulate a successful add.
 */
export async function addToCart(quantity = 1): Promise<AddToCartResult> {
  if (!isVariantConfigured()) {
    // No fake checkout: route to the canonical product page instead.
    const url = SHOPIFY_PRODUCT_URL
    window.location.assign(url)
    return { status: 'redirected', url }
  }

  if (isOnStorefront()) {
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          items: [{ id: Number(SHOPIFY_VARIANT_ID), quantity }],
        }),
      })

      if (!response.ok) {
        const body: unknown = await response.json().catch(() => null)
        const description =
          body && typeof body === 'object' && 'description' in body
            ? String((body as { description: unknown }).description)
            : `Cart request failed (${response.status})`
        return { status: 'error', message: description }
      }

      window.location.assign('/cart')
      return { status: 'added' }
    } catch {
      // Network failure on the storefront: fall through to the permalink.
      const url = cartPermalink(quantity)
      window.location.assign(url)
      return { status: 'redirected', url }
    }
  }

  const url = cartPermalink(quantity)
  window.location.assign(url)
  return { status: 'redirected', url }
}

/** Label used by screen readers on every Add to Cart control. */
export const addToCartAriaLabel = `Add ${PRODUCT_NAME}, ${PRICE_DISPLAY}, to cart`
