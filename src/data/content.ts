/**
 * Narrative copy for the scroll story, kept out of the components so the
 * sequence can be re-ordered or re-written without touching layout code.
 */

export interface VideoAsset {
  /** Path under /public/videos. May not exist yet — the player handles that. */
  src: string
  /** Path under /public/posters. Optional; drawn before the video decodes. */
  poster?: string
  /** Short description of the shot, used for the accessible label. */
  description: string
}

const video = (n: string, description: string): VideoAsset => ({
  src: `/videos/${n}.mp4`,
  poster: `/posters/${n}.jpg`,
  description,
})

export const VIDEOS = {
  hero: video('01-hero', 'The Pitcher of Life reverse osmosis system in a modern kitchen'),
  systemOpen: video('02-system-open', 'The system opening to reveal its internal filter stack'),
  filtration: video('03-filtration', 'Close detail of the filtration stages'),
  waterFlow: video('04-water-flow', 'Water travelling through the system to the faucet'),
  tankless: video('05-tankless', 'The tankless unit compared with a tank-based system'),
  mineralization: video('06-mineralization', 'Minerals being reintroduced to purified water'),
  lifestyle: video('07-lifestyle', 'The system in everyday use at home'),
  final: video('08-final', 'The finished system and drinking-water faucet'),
} as const

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
    body: 'The membrane removes up to 98% of common tap-water contaminants.',
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
