/**
 * Section 10 — reviews.
 *
 * PLACEHOLDER CONTENT. These are not real customer reviews. They exist to
 * prove out the layout and are flagged as placeholders in the UI whenever
 * `REVIEWS_ARE_PLACEHOLDER` is true.
 *
 * To go live: set `REVIEWS_ARE_PLACEHOLDER` to false and replace `REVIEWS`
 * with data from your review provider (Judge.me, Loox, Okendo, Shopify
 * Product Reviews). The `Review` shape below is intentionally close to what
 * those APIs return, so swapping in a fetch is a data-layer change only.
 */

export interface Review {
  id: string
  rating: 1 | 2 | 3 | 4 | 5
  title: string
  body: string
  author: string
  /** ISO date string. */
  date: string
  verifiedPurchase: boolean
}

/** Flip to `false` only when `REVIEWS` holds real, attributable reviews. */
export const REVIEWS_ARE_PLACEHOLDER: boolean = true

export const REVIEWS: Review[] = [
  {
    id: 'placeholder-1',
    rating: 5,
    title: 'Placeholder review title',
    body: 'Placeholder review body. Replace this with real customer copy from your review platform before launch.',
    author: 'Placeholder Name',
    date: '2026-01-01',
    verifiedPurchase: true,
  },
  {
    id: 'placeholder-2',
    rating: 5,
    title: 'Placeholder review title',
    body: 'Placeholder review body. Replace this with real customer copy from your review platform before launch.',
    author: 'Placeholder Name',
    date: '2026-01-01',
    verifiedPurchase: true,
  },
  {
    id: 'placeholder-3',
    rating: 4,
    title: 'Placeholder review title',
    body: 'Placeholder review body. Replace this with real customer copy from your review platform before launch.',
    author: 'Placeholder Name',
    date: '2026-01-01',
    verifiedPurchase: false,
  },
]

/**
 * TODO_VERIFY: aggregate rating and review count. Leave `null` until the real
 * numbers are wired up — an invented star average is a compliance risk.
 */
export const AGGREGATE_RATING: { value: number; count: number } | null = null
