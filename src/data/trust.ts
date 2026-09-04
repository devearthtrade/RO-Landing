/**
 * Section 9 — trust and ownership.
 *
 * Policy text is deliberately thin. Anything not confirmed on the store's
 * policy pages is `null` and renders as a clearly-marked pending item rather
 * than as an invented promise.
 */

import { RETURN_POLICY_URL, WARRANTY_URL } from './product'

export interface TrustItem {
  id: string
  title: string
  body: string
  /** Optional link to the authoritative policy page on the storefront. */
  href?: string
  /** Label for the link, when one is present. */
  hrefLabel?: string
  /** True when `body` carries a `{Required data: ...}` placeholder. */
  pending?: boolean
}

export const TRUST_ITEMS: TrustItem[] = [
  {
    id: 'warranty',
    title: 'Lifetime warranty',
    body: 'The system is covered by a lifetime warranty when you register your product after installation.',
    href: WARRANTY_URL,
    hrefLabel: 'Register your product',
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
    // No window is printed here on purpose. The only figure ever found was a
    // 30-day guarantee on the alkaline water PITCHER pages, which is a
    // different product. The store policy is the authority, so we link it.
    body: 'Return terms, the return window and who covers return shipping are set out in the store return policy.',
    href: RETURN_POLICY_URL,
    hrefLabel: 'Read the return policy',
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
    // Do not invent channels or hours.
    body: '{Required data: support channels and hours}',
    pending: true,
  },
]
