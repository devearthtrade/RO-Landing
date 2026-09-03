/**
 * Objection handling.
 *
 * RULE: an answer is either traceable to a confirmed product fact or it is
 * `null`. A `null` answer is a question we know shoppers ask and cannot yet
 * answer truthfully — it is held out of the rendered FAQ entirely rather than
 * answered with a guess, and counted in development so the gap stays visible.
 *
 * Every live answer below traces to `specs.ts` / `trust.ts`.
 */

export interface FaqItem {
  id: string
  question: string
  /** `null` means: not yet verified. Do not write a plausible answer here. */
  answer: string | null
  /** Groups the question by the objection it defuses. */
  topic: 'water' | 'system' | 'owning'
}

export const FAQ: FaqItem[] = [
  // ---- What comes out of the tap -----------------------------------------
  {
    id: 'removes',
    topic: 'water',
    question: 'What does the system actually remove?',
    answer:
      'Up to 98% of common tap-water contaminants, including many heavy metals and chemicals. Water passes through sediment and carbon pre-filtration, then a reverse osmosis membrane.',
  },
  {
    id: 'minerals',
    topic: 'water',
    question: 'Reverse osmosis strips minerals. Does this put them back?',
    answer:
      'Yes. That is the last stage. After the membrane, calcium, magnesium and potassium are reintroduced, which brings the water to roughly pH 8–9. It is the difference between water that is merely pure and water that tastes like something.',
  },
  {
    id: 'alkaline',
    topic: 'water',
    question: 'How alkaline is the water?',
    answer:
      'Up to pH 8–9, set by the mineralization stage after purification.',
  },

  // ---- The system itself ---------------------------------------------------
  {
    id: 'tankless',
    topic: 'system',
    question: 'Is there a storage tank?',
    answer:
      'No. The system is tankless and filters on demand, so there is no pressurized tank to fit into the cabinet, sanitize or replace.',
  },
  {
    id: 'where',
    topic: 'system',
    question: 'Where does it go?',
    answer:
      'Under the counter, out of sight, plumbed to a dedicated drinking-water faucet at the sink.',
  },
  {
    id: 'stages',
    topic: 'system',
    question: 'How many filtration stages are there?',
    answer:
      'Five, in sequence: sediment and carbon pre-filtration, the reverse osmosis membrane, then the mineral finish.',
  },

  // ---- Living with it ------------------------------------------------------
  {
    id: 'filter-life',
    topic: 'owning',
    question: 'How often do the filters need changing?',
    answer:
      'About every 6 months for a household of four, and about every 12 months for one or two people.',
  },
  {
    id: 'warranty',
    topic: 'owning',
    question: 'What does the warranty cover?',
    answer:
      'The system carries a lifetime warranty when you register the product after installation. See the warranty terms for the full details.',
  },
  {
    id: 'not-happy',
    topic: 'owning',
    question: 'What if it is not right for my home?',
    answer:
      'It is covered by a 100% satisfaction guarantee, with your money back.',
  },
  {
    id: 'shipping',
    topic: 'owning',
    question: 'How much is shipping?',
    answer:
      'Free to the contiguous 48 states. Alaska and Hawaii ship at a reduced rate.',
  },

  // ---- Known questions we cannot answer yet -------------------------------
  // These stay in the data so the gap is tracked, and stay OUT of the page so
  // no shopper is told something unverified. Fill the answer in to publish.
  {
    id: 'gpd',
    topic: 'system',
    question: 'How fast does it produce water?',
    // TODO_VERIFY: rated gallons per day of the membrane.
    answer: null,
  },
  {
    id: 'certification',
    topic: 'water',
    question: 'Is it certified?',
    // TODO_VERIFY: certifying body and standard (e.g. NSF/ANSI 58, 42, 372).
    // Do not publish any certification claim until confirmed in writing.
    answer: null,
  },
  {
    id: 'efficiency',
    topic: 'system',
    question: 'How much water goes to drain?',
    // TODO_VERIFY: pure-to-drain ratio.
    answer: null,
  },
  {
    id: 'install',
    topic: 'system',
    question: 'Can I install it myself?',
    // TODO_VERIFY: DIY vs. plumber, and whether an outlet is needed under the sink.
    answer: null,
  },
  {
    id: 'dimensions',
    topic: 'system',
    question: 'Will it fit under my sink?',
    // TODO_VERIFY: H x W x D of the unit.
    answer: null,
  },
  {
    id: 'return-window',
    topic: 'owning',
    question: 'How long do I have to return it?',
    // TODO_VERIFY: return window in days, who pays return freight.
    answer: null,
  },
]

export const FAQ_TOPICS: { id: FaqItem['topic']; title: string }[] = [
  { id: 'water', title: 'The water' },
  { id: 'system', title: 'The system' },
  { id: 'owning', title: 'Owning it' },
]

/** Only questions we can answer truthfully reach the page. */
export const answeredFaq = (topic: FaqItem['topic']): FaqItem[] =>
  FAQ.filter((item) => item.topic === topic && item.answer !== null)

/** Questions shoppers ask that are still blocked on verification. */
export const UNANSWERED_FAQ = FAQ.filter((item) => item.answer === null)
