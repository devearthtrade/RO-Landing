/**
 * Product specifications.
 *
 * RULE: never invent a value. Anything not confirmed against the product page
 * or the manufacturer is `TODO_VERIFY` and renders as "Pending verification"
 * in the UI rather than as a number a customer could be misled by.
 *
 * Verified entries below are sourced from Pitcher of Life product/FAQ copy:
 *   - 5-filter reverse osmosis system producing alkaline drinking water
 *   - removes up to 98% of common tap-water contaminants
 *   - adds calcium, magnesium and potassium
 *   - raises pH to roughly 8–9
 *   - tankless, installed discreetly under the counter
 *   - filter life: ~6 months for a 4-person household, ~12 months for 1–2
 *   - lifetime warranty with product registration
 *   - free shipping to the contiguous 48 states
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
  },
  {
    id: 'reduction',
    group: 'filtration',
    label: 'Contaminant reduction',
    value: 'Up to 98%',
    note: 'Of common tap-water contaminants, including many heavy metals and chemicals.',
  },
  {
    id: 'membrane',
    group: 'filtration',
    label: 'Membrane type',
    value: 'Reverse osmosis membrane',
  },
  {
    id: 'certifications',
    group: 'filtration',
    // TODO_VERIFY: confirm NSF/ANSI 58 / 42 / 372 or WQA certification and
    // exact certifying body before publishing any certification claim.
    label: 'Certifications',
    value: TODO_VERIFY,
    note: 'Certification marks are only shown once confirmed in writing.',
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
    // TODO_VERIFY: measure or confirm H x W x D of the main unit.
    label: 'Dimensions',
    value: TODO_VERIFY,
  },
  {
    id: 'installation',
    group: 'design',
    // TODO_VERIFY: confirm DIY vs. plumber, and whether an electrical outlet
    // under the sink is required for the booster pump.
    label: 'Installation',
    value: TODO_VERIFY,
  },

  // ---- The water itself ---------------------------------------------------
  {
    id: 'alkaline',
    group: 'water',
    label: 'Alkaline output',
    value: 'Up to pH 8–9',
    note: 'The mineralization stage raises pH after purification.',
  },
  {
    id: 'minerals',
    group: 'water',
    label: 'Minerals added',
    value: 'Calcium, magnesium, potassium',
  },
  {
    id: 'gpd',
    group: 'water',
    // TODO_VERIFY: confirm the rated gallons-per-day of the membrane.
    label: 'Production rate (GPD)',
    value: TODO_VERIFY,
  },
  {
    id: 'efficiency',
    group: 'water',
    // TODO_VERIFY: confirm the pure-to-drain ratio.
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

export const specsByGroup = (group: SpecGroup): Spec[] =>
  SPECS.filter((spec) => spec.group === group)

/** True when a spec still needs sign-off and must render as pending. */
export const isPending = (value: SpecValue): boolean => value === TODO_VERIFY
