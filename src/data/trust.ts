/**
 * Section 9 — trust and ownership.
 *
 * Policy text is deliberately thin. Anything not confirmed on the store's
 * policy pages is `null` and renders as a clearly-marked pending item rather
 * than as an invented promise.
 */

export interface TrustItem {
  id: string
  title: string
  /** `null` means: not yet verified. Do not fill this in with a guess. */
  body: string | null
  /** Optional link to the authoritative policy page. */
  href?: string
}

export const TRUST_ITEMS: TrustItem[] = [
  {
    id: 'warranty',
    title: 'Lifetime warranty',
    body: 'The system is covered by a lifetime warranty when you register your product after installation.',
    // TODO_VERIFY: link the warranty registration / terms page.
  },
  {
    id: 'guarantee',
    title: '100% satisfaction guarantee',
    body: 'If the system is not right for your home, it is covered by a money-back guarantee.',
    // TODO_VERIFY: confirm the exact return window in days and any conditions.
  },
  {
    id: 'shipping',
    title: 'Free shipping',
    body: 'Free shipping to the contiguous 48 states, with reduced-rate shipping to Alaska and Hawaii.',
  },
  {
    id: 'returns',
    title: 'Returns',
    // TODO_VERIFY: return window, who pays return freight, restocking fee.
    body: null,
  },
  {
    id: 'certification',
    title: 'Certification',
    // TODO_VERIFY: certifying body and standard (e.g. NSF/ANSI) before any
    // certification claim appears on this page.
    body: null,
  },
  {
    id: 'support',
    title: 'Customer support',
    // TODO_VERIFY: support channels and hours.
    body: null,
  },
]
