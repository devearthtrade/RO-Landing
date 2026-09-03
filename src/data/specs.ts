/**
 * Product specifications.
 *
 * RULE: never invent a value. Anything not confirmed is `TODO_VERIFY` and
 * renders as "Pending verification" in the UI rather than as a number a
 * customer could be misled by.
 *
 * PROVENANCE. Two tiers of fact appear here:
 *
 *  1. Values from the supplied specification sheet — treated as verified:
 *       - water rebalanced to over 7.5 pH
 *       - enriched with calcium, magnesium and potassium
 *       - ORP -100 to -200 mV
 *       - carbon media certified to NSF/ANSI 42 and NSF/ANSI 61
 *       - special features: chlorine reduction, tankless
 *       - dimensions 10.24"L x 20.5"W x 23.62"H
 *
 *  2. Values taken from published brand copy that the specification sheet
 *     does not cover. These carry `needsConfirmation` and are listed in the
 *     development note under the specifications section so they stay visible
 *     until someone signs them off: the 5-stage count, the "up to 98%"
 *     reduction figure, and the 6-12 month filter life.
 *
 * CERTIFICATION SCOPE. NSF/ANSI 42 and 61 apply to the CARBON MEDIA, not to
 * the assembled system. The two are separate rows below precisely so the
 * distinction cannot be collapsed by a reader skimming the table, and the
 * system-level row stays pending until certification is confirmed in writing.
 *
 * NO HEALTH CLAIMS. pH, mineral content and ORP are stated as measurements of
 * the water only. Nothing here asserts a physiological, medical or health
 * effect, and nothing should be added that does.
 */

export const TODO_VERIFY = 'TODO_VERIFY' as const

export type SpecValue = string | typeof TODO_VERIFY

export interface Spec {
  id: string
  /** Grouping used by the specification section's column layout. */
  group: SpecGroup
  label: string
  value: SpecValue
  /** Optional clarifying line shown under the value. */
  note?: string
  /**
   * Sourced from brand copy rather than the specification sheet. Renders
   * normally, but is counted in the development note so it stays on the
   * list of things to confirm.
   */
  needsConfirmation?: boolean
}

export type SpecGroup = 'filtration' | 'design' | 'water' | 'ownership'

export const SPEC_GROUPS: { id: SpecGroup; title: string; caption: string }[] = [
  {
    id: 'filtration',
    title: 'Filtration',
    caption: 'What the system removes, and how.',
  },
  {
    id: 'design',
    title: 'Design & installation',
    caption: 'How it lives under your counter.',
  },
  {
    id: 'water',
    title: 'The water itself',
    caption: 'What comes out of the faucet.',
  },
  {
    id: 'ownership',
    title: 'Ownership',
    caption: 'Maintenance, coverage and support.',
  },
]

export const SPECS: Spec[] = [
  // ---- Filtration ---------------------------------------------------------
  {
    id: 'stages',
    group: 'filtration',
    label: 'Filtration stages',
    value: '5-stage reverse osmosis',
    note: 'Sediment and carbon pre-filtration, RO membrane, then mineralization.',
    needsConfirmation: true,
  },
  {
    id: 'reduction',
    group: 'filtration',
    label: 'Contaminant reduction',
    value: 'Up to 98%',
    note: 'Of common tap-water contaminants, including many heavy metals and chemicals.',
    needsConfirmation: true,
  },
  {
    id: 'chlorine',
    group: 'filtration',
    label: 'Chlorine',
    value: 'Chlorine reduction',
    note: 'Handled by the carbon stage ahead of the membrane.',
  },
  {
    id: 'membrane',
    group: 'filtration',
    label: 'Membrane type',
    value: 'Reverse osmosis membrane',
  },
  {
    id: 'media-certification',
    group: 'filtration',
    label: 'Carbon media certification',
    value: 'NSF/ANSI 42 and NSF/ANSI 61',
    note: 'These certifications apply to the carbon filtration media, not to the assembled system.',
  },
  {
    id: 'system-certification',
    group: 'filtration',
    // TODO_VERIFY: whole-system certification (e.g. NSF/ANSI 58) and the
    // certifying body. Kept as its own row so the media certification above
    // is never read as covering the complete system.
    label: 'Whole-system certification',
    value: TODO_VERIFY,
    note: 'Separate from the media certification above, and not yet confirmed.',
  },

  // ---- Design & installation ---------------------------------------------
  {
    id: 'format',
    group: 'design',
    label: 'Format',
    value: 'Tankless',
    note: 'No pressurized storage tank to house or sanitize.',
  },
  {
    id: 'placement',
    group: 'design',
    label: 'Placement',
    value: 'Under counter',
    note: 'Installed out of sight, with a dedicated drinking-water faucet.',
  },
  {
    id: 'dimensions',
    group: 'design',
    label: 'Dimensions',
    value: '10.24 × 20.5 × 23.62 in',
    note: 'Length × width × height. Measure your cabinet before ordering.',
  },
  {
    id: 'installation',
    group: 'design',
    // TODO_VERIFY: DIY vs. plumber, and whether an outlet is required under
    // the sink for the booster pump.
    label: 'Installation',
    value: TODO_VERIFY,
  },

  // ---- The water itself ---------------------------------------------------
  {
    id: 'alkaline',
    group: 'water',
    label: 'Alkaline output',
    value: 'Above 7.5 pH',
    note: 'The mineralization stage rebalances pH after purification.',
  },
  {
    id: 'minerals',
    group: 'water',
    label: 'Minerals added',
    value: 'Calcium, magnesium, potassium',
  },
  {
    id: 'orp',
    group: 'water',
    label: 'Oxidation reduction potential',
    // Stated as a measured electrochemical property of the water. No claim
    // about what it does for anyone is made, or may be added.
    value: '−100 to −200 mV',
    note: 'A measurement of the water itself.',
  },
  {
    id: 'gpd',
    group: 'water',
    // TODO_VERIFY: rated gallons per day of the membrane.
    label: 'Production rate (GPD)',
    value: TODO_VERIFY,
  },
  {
    id: 'efficiency',
    group: 'water',
    // TODO_VERIFY: pure-to-drain ratio.
    label: 'Water efficiency',
    value: TODO_VERIFY,
    note: 'Pure-to-drain ratio pending confirmation.',
  },

  // ---- Ownership ----------------------------------------------------------
  {
    id: 'filter-life',
    group: 'ownership',
    label: 'Filter life',
    value: '6–12 months',
    note: 'About 6 months for a household of four; about 12 months for one or two.',
    needsConfirmation: true,
  },
  {
    id: 'warranty',
    group: 'ownership',
    label: 'Warranty',
    value: 'Lifetime warranty',
    note: 'With product registration. See warranty terms for full details.',
  },
  {
    id: 'guarantee',
    group: 'ownership',
    label: 'Guarantee',
    value: '100% satisfaction guarantee',
  },
  {
    id: 'shipping',
    group: 'ownership',
    label: 'Shipping',
    value: 'Free to the contiguous 48 states',
    note: 'Reduced-rate shipping available to Alaska and Hawaii.',
  },
]

/** Claims carried over from brand copy that still need sign-off. */
export const UNCONFIRMED_SPECS = SPECS.filter((spec) => spec.needsConfirmation)

export const specsByGroup = (group: SpecGroup): Spec[] =>
  SPECS.filter((spec) => spec.group === group)

/** True when a spec still needs sign-off and must render as pending. */
export const isPending = (value: SpecValue): boolean => value === TODO_VERIFY
