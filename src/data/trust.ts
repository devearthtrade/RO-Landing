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
    title: 'Certified carbon media',
    // Scope is deliberate: NSF/ANSI 42 and 61 certify the carbon media. The
    // assembled system is NOT certified as far as we can confirm, so this
    // must not be reworded into a whole-system claim.
    body: 'The carbon filtration media is certified to NSF/ANSI 42 and NSF/ANSI 61. This covers the media itself, not the assembled system.',
  },
  {
    id: 'support',
    title: 'Customer support',
    // TODO_VERIFY: support channels and hours.
    body: null,
  },
]
