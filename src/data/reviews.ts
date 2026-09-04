/**
 * Customer reviews.
 *
 * There are no reviews in this file, and that is deliberate. Inventing a
 * name, a rating or a sentence of praise would be fabricating a customer,
 * which is not something this project does — so until a real review source is
 * connected, the section renders an honest empty state instead of card
 * skeletons that look like testimonials.
 *
 * TO GO LIVE: point `fetchReviews` at your provider (Judge.me, Loox, Okendo,
 * Shopify Product Reviews), set `REVIEWS_AVAILABLE` to true, and the section
 * switches to the real list. The `Review` shape below is intentionally close
 * to what those APIs return, so this stays a data-layer change.
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

/** Flip to true once `REVIEWS` is fed by a real review source. */
export const REVIEWS_AVAILABLE = false

/** Real, attributable customer reviews. Empty until a source is connected. */
export const REVIEWS: Review[] = []

/**
 * Aggregate rating. Stays `null` until it comes from the review provider —
 * an invented star average is both a trust problem and a compliance one.
 */
export const AGGREGATE_RATING: { value: number; count: number } | null = null
