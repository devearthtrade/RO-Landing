/**
 * Narrative copy for the scroll story, kept out of the components so the
 * sequence can be re-ordered or re-written without touching layout code.
 */

/**
 * Video metadata now lives in `videoManifest.ts`, measured from the files
 * themselves. This file carries narrative copy only.
 */

/** Section 4 — the path water takes, kept deliberately simple. */
export const WATER_JOURNEY_STEPS = [
  {
    id: 'supply',
    step: '01',
    title: 'Your home supply',
    body: 'Cold water is taken from the existing line under your sink.',
  },
  {
    id: 'pre',
    step: '02',
    title: 'Pre-filtration',
    body: 'Sediment and carbon stages capture particles and reduce chlorine.',
  },
  {
    id: 'ro',
    step: '03',
    title: 'Reverse osmosis',
    body: 'The reverse osmosis membrane is the core separation stage.',
  },
  {
    id: 'mineral',
    step: '04',
    title: 'Mineralization',
    body: 'Calcium, magnesium and potassium are reintroduced.',
  },
  {
    id: 'faucet',
    step: '05',
    title: 'Your faucet',
    body: 'Purified, remineralized water arrives at a dedicated faucet.',
  },
] as const

/** Section 5 — a factual side-by-side, no competitor claims. */
export const TANKLESS_COMPARISON = {
  conventional: {
    id: 'conventional',
    title: 'Reverse osmosis with a storage tank',
    points: [
      'A pressurized tank stores treated water until you draw it.',
      'The tank occupies part of the cabinet alongside the filter housing.',
      'The tank is a serviceable component in its own right.',
    ],
  },
  tankless: {
    id: 'tankless',
    title: 'Pitcher of Life tankless',
    points: [
      'Water is filtered on demand, so there is no storage tank.',
      'A more compact footprint under the counter.',
      'Fewer components to house, and a cleaner install.',
    ],
  },
} as const

/** Section 6 — minerals. Descriptive only; no health or medical claims. */
export const MINERALS = [
  {
    symbol: 'Ca',
    name: 'Calcium',
    note: 'Reintroduced after the membrane stage.',
  },
  {
    symbol: 'Mg',
    name: 'Magnesium',
    note: 'Part of the alkaline mineral blend.',
  },
  {
    symbol: 'K',
    name: 'Potassium',
    note: 'Completes the mineralization stage.',
  },
] as const

/**
 * Section 2 — the problem, before the product.
 *
 * Deliberately general and non-medical. These describe the category and the
 * everyday experience of tap water, not claims about any particular supply
 * and not health claims of any kind.
 */
export const PROBLEM_POINTS = [
  {
    id: 'taste',
    title: 'It tastes like treatment',
    body: 'Municipal water is treated so it arrives safe. Chlorine is part of how that is done — and it is also part of what you taste.',
  },
  {
    id: 'bottled',
    title: 'So you buy around it',
    body: 'Cases of bottled water in the garage, a jug in the fridge, a pitcher filter that needs refilling before every glass.',
  },
  {
    id: 'pitcher',
    title: 'A pitcher is not reverse osmosis',
    body: 'Carbon pitchers improve taste. They do not do what a reverse osmosis membrane does, and they never stop needing your attention.',
  },
] as const

/**
 * The verified benefits, consolidated for the offer block. Every line here
 * must trace to a confirmed value in `specs.ts` — no new claims.
 */
export const KEY_BENEFITS = [
  {
    id: 'alkaline',
    title: 'Alkaline, above 7.5 pH',
    body: 'Purified first, then rebalanced above 7.5 pH and enriched with calcium, magnesium and potassium.',
  },
  {
    id: 'chlorine',
    title: 'Chlorine reduction through certified media',
    body: 'The carbon stage reduces chlorine ahead of the membrane. That media is certified to NSF/ANSI 42 and NSF/ANSI 61.',
  },
  {
    id: 'tankless',
    title: 'Tankless, under the counter',
    body: 'Filtered on demand, so no pressurized storage tank takes up the cabinet.',
  },
  {
    id: 'warranty',
    title: 'Covered for life',
    body: 'A lifetime warranty with product registration, backed by a 100% satisfaction guarantee.',
  },
  {
    id: 'measured',
    title: 'Measured, not asserted',
    body: 'Every figure on this page traces to the specification sheet. Where a number is still coming from the manufacturer, we show the gap instead of an estimate.',
  },
] as const

/**
 * The measured chemistry of the finished water, for the mineralization
 * section.
 *
 * These are measurements, and the copy treats them as nothing else. No
 * physiological, medical or health effect is claimed for pH, for the minerals
 * or for ORP, and none may be added.
 */
export const WATER_CHEMISTRY = [
  {
    id: 'ph',
    label: 'pH',
    value: 'Above 7.5',
    note: 'Rebalanced after purification.',
  },
  {
    id: 'minerals',
    label: 'Minerals',
    value: 'Ca · Mg · K',
    note: 'Calcium, magnesium and potassium.',
  },
  {
    id: 'orp',
    label: 'ORP',
    value: '−100 to −200 mV',
    note: 'Oxidation reduction potential, measured in millivolts.',
  },
] as const
