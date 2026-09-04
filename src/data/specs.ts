/**
 * Product specifications — the single source of truth for every figure on
 * the page.
 *
 * Three states, and nothing in between:
 *
 *  1. VERIFIED. Confirmed against the supplied specification sheet: water
 *     rebalanced above 7.5 pH, enriched with calcium, magnesium and
 *     potassium, ORP -100 to -200 mV, carbon media certified to NSF/ANSI 42
 *     and NSF/ANSI 61, chlorine reduction, tankless, and the unit
 *     dimensions. Lifetime warranty, the satisfaction guarantee and free
 *     shipping to the contiguous 48 states come from published policy.
 *
 *  2. MANUFACTURER PENDING. Requested and not yet received. These render as
 *     a literal `{Required data: ...}` placeholder so a reviewer can see at
 *     a glance what is outstanding and it can never be mistaken for a real
 *     number: production rate (GPD) and water efficiency.
 *
 *  3. REMOVED. Claims that were on the page but are not supported by the
 *     specification sheet. A stage COUNT ("5-stage"), a reduction RATE
 *     ("up to 98%"), a contaminant list ("heavy metals and chemicals") and a
 *     filter service interval ("6-12 months") all came from brand marketing
 *     copy. The numbers are gone. What remains is either descriptive
 *     (multi-stage, replaceable filters) or an explicit placeholder.
 *
 * CERTIFICATION SCOPE. NSF/ANSI 42 and 61 apply to the CARBON MEDIA, not to
 * the assembled system. The two are separate rows below precisely so the
 * distinction cannot be collapsed by a reader skimming the table.
 * NSF/ANSI 58 is NOT claimed anywhere and must not be added without a
 * certification listing for this exact model.
 *
 * NO HEALTH CLAIMS. pH, mineral content and ORP are stated only as
 * measurements of the water. Nothing here asserts a physiological, medical
 * or health effect, and nothing may be added that does.
 */

export const TODO_VERIFY = 'TODO_VERIFY' as const

/**
 * Text shown in place of a value we have asked the manufacturer for and not
 * yet received. It is deliberately literal and bracketed so it is impossible
 * to mistake for a real figure, in the UI or in a screenshot sent for review.
 */
export type RequiredData = `{Required data: ${string}}`

export type SpecValue = string | typeof TODO_VERIFY

/** True when a value is an explicit manufacturer-pending placeholder. */
export const isRequiredData = (value: SpecValue): boolean =>
  value.startsWith('{Required data:')

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
    label: 'Filtration',
    // Was "5-stage reverse osmosis". The stage COUNT appears in brand copy
    // but not in the supplied specification sheet, so the number is gone and
    // only the sequence — which is descriptive, not a performance claim —
    // remains.
    value: 'Multi-stage reverse osmosis',
    note: 'Sediment and carbon pre-filtration, then the reverse osmosis membrane, then mineralization.',
  },
  {
    id: 'reduction',
    group: 'filtration',
    label: 'Contaminant reduction',
    // Was "Up to 98% ... including many heavy metals and chemicals". That
    // figure and that contaminant list come from brand copy, not from the
    // specification sheet, so neither is presented as fact. A reduction rate
    // is a performance claim and needs a test report behind it.
    value: '{Required data: verified contaminant reduction rate}',
    note: 'Held back until a reduction figure is confirmed against test data.',
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
    note: 'The core separation stage of the system.',
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
    //
    // Checked 2026-09-04: could not reach the NSF certified-products database
    // (nsf.org / listings.nsf.org / info.nsf.org) or WQA from this
    // environment. To confirm, search NSF's certified products listing for
    // the company and the exact model, and record the listing number here.
    // NSF/ANSI 42 and 61 on the carbon media is NOT evidence of 58 on the
    // system; 42 covers aesthetic effects, 61 covers material safety, and 58
    // is the reverse osmosis system standard. Confirm 58 for the exact model
    // or leave this pending.
    label: 'Whole-system certification',
    value: '{Required data: whole-system certification, if any}',
    note: 'Separate from the media certification above. NSF/ANSI 58 is not claimed and must not be added without a listing for this exact model.',
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
    //
    // Checked 2026-09-04: pitcheroflife.com is unreachable from this
    // environment. A likely authoritative page exists at
    // https://pitcheroflife.com/pages/filter-installation-guide — confirm
    // whether it covers this RO system specifically rather than the pitcher
    // product line before using anything from it.
    label: 'Installation',
    value: '{Required data: RO installation requirements}',
    note: 'Plumbing, drain and power requirements pending confirmation.',
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
    //
    // Checked 2026-09-04: no authoritative figure reachable. Must come from
    // the product spec sheet, manual or the membrane manufacturer. Do NOT
    // derive it from dimensions, pump size, filter count, model appearance
    // or any competitor's rating — none of those determine it.
    label: 'Production rate (GPD)',
    value: '{Required data: RO production capacity / GPD}',
  },
  {
    id: 'efficiency',
    group: 'water',
    // TODO_VERIFY: pure-to-drain ratio.
    //
    // Checked 2026-09-04: no authoritative figure reachable. Must come from
    // the product documentation. Do NOT fill this from a generic reverse
    // osmosis assumption — recovery varies by membrane, pressure and design.
    label: 'Water efficiency',
    value: '{Required data: RO water efficiency / recovery ratio}',
    note: 'Pure-to-drain ratio requested from the manufacturer.',
  },

  // ---- Ownership ----------------------------------------------------------
  {
    id: 'filter-life',
    group: 'ownership',
    label: 'Filter life',
    // Was "6-12 months". Published in brand copy but absent from the
    // specification sheet, and it is the figure an owner budgets against.
    value: '{Required data: filter replacement interval}',
    note: 'Replaceable filters. The service interval is pending confirmation.',
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

/** Specs still waiting on the manufacturer, rendered as placeholders. */
export const REQUIRED_DATA_SPECS = SPECS.filter((spec) => isRequiredData(spec.value))

export const specsByGroup = (group: SpecGroup): Spec[] =>
  SPECS.filter((spec) => spec.group === group)

/** True when a spec still needs sign-off and must render as a placeholder. */
export const isPending = (value: SpecValue): boolean =>
  value === TODO_VERIFY || isRequiredData(value)
