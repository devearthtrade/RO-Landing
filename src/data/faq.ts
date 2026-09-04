/**
 * Objection handling.
 *
 * Two states only. An answer is either traceable to a confirmed product fact,
 * or it is an explicit `{Required data: ...}` placeholder naming exactly what
 * is missing. Nothing is written to sound plausible.
 *
 * Every question is rendered, including the pending ones. A visible, labelled
 * gap is more honest than a short FAQ that quietly omits the questions a
 * shopper actually has, and it shows a reviewer precisely what to chase.
 *
 * Return policy: no window is stated anywhere. The FAQ links to the store's
 * own policy page instead. The only figure ever found was a 30-day guarantee
 * on the alkaline water PITCHER pages, which is a different product.
 */

export interface FaqItem {
  id: string
  question: string
  /**
   * A verified answer, or a `{Required data: ...}` placeholder naming what is
   * missing. Never a plausible-sounding guess.
   */
  answer: string
  /** True when `answer` is a placeholder rather than a real answer. */
  pending?: boolean
  /** Groups the question by the objection it defuses. */
  topic: 'water' | 'system' | 'owning'
}

export const FAQ: FaqItem[] = [
  // ---- What comes out of the tap -----------------------------------------
  {
    id: 'removes',
    topic: 'water',
    question: 'What does the system actually remove?',
    // A reduction rate and a contaminant list are performance claims. Both
    // were removed pending test data; the process itself is descriptive.
    answer:
      'Water passes through sediment and carbon pre-filtration, then a reverse osmosis membrane, then the mineral stage. The carbon stage is what reduces chlorine. A verified contaminant reduction figure is {Required data: verified contaminant reduction rate}.',
    pending: true,
  },
  {
    id: 'minerals',
    topic: 'water',
    question: 'Reverse osmosis strips minerals. Does this put them back?',
    answer:
      'Yes. That is the last stage. After the membrane, calcium, magnesium and potassium are reintroduced, which rebalances the water to above 7.5 pH. It is the difference between water that is merely pure and water that tastes like something.',
  },
  {
    id: 'alkaline',
    topic: 'water',
    question: 'How alkaline is the water?',
    answer:
      'Above 7.5 pH. The mineralization stage rebalances it after purification.',
  },
  {
    id: 'orp',
    topic: 'water',
    question: 'What is the ORP of the water?',
    // A measured electrochemical property, stated as such. Do not add a
    // claim about what it does for a person -- that would be a health claim.
    answer:
      'The oxidation reduction potential measures between −100 and −200 mV. It is a property of the water, measured in millivolts.',
  },

  // ---- The system itself ---------------------------------------------------
  {
    id: 'chlorine',
    topic: 'water',
    question: 'Does it deal with chlorine?',
    answer:
      'Yes. Chlorine reduction is handled by the carbon stage before water reaches the reverse osmosis membrane. It is the stage most responsible for how the water tastes.',
  },
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
    question: 'How is the water filtered?',
    answer:
      'In sequence: sediment and carbon pre-filtration, then the reverse osmosis membrane, then the mineral finish that rebalances the water above 7.5 pH.',
  },

  // ---- Living with it ------------------------------------------------------
  {
    id: 'filter-life',
    topic: 'owning',
    question: 'How often do the filters need changing?',
    answer:
      'The filters are replaceable. {Required data: filter replacement interval} — we are confirming the service interval with the manufacturer rather than publishing an estimate.',
    pending: true,
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
      'The system is covered by a 100% satisfaction guarantee. Return terms and the return window are set out in the store return policy, linked below.',
  },
  {
    id: 'shipping',
    topic: 'owning',
    question: 'How much is shipping?',
    answer:
      'Free to the contiguous 48 states. Alaska and Hawaii ship at a reduced rate.',
  },

  {
    id: 'operation',
    topic: 'system',
    question: 'How does it work day to day?',
    answer:
      'You draw water from a dedicated faucet at the sink. Because the system is tankless it filters on demand rather than refilling a reserve, so there is nothing to wait for and no tank taking up the cabinet.',
  },
  {
    id: 'replacements',
    topic: 'owning',
    question: 'Where do I get replacement filters?',
    answer:
      'Replacement filters for the system are sold by Pitcher of Life — see the link below.',
  },
  {
    id: 'maintenance',
    topic: 'owning',
    question: 'Is there any upkeep beyond changing filters?',
    // Do not invent sanitising, flushing or servicing requirements.
    answer: '{Required data: routine maintenance requirements}',
    pending: true,
  },

  // ---- Known questions we still cannot answer -----------------------------
  // These stay in the data so the gap is tracked, and stay OUT of the page so
  // no shopper is told something unverified. Fill the answer in to publish.
  {
    id: 'gpd',
    topic: 'system',
    question: 'How fast does it produce water?',
    // Requested from the manufacturer. Do NOT derive from dimensions, pump
    // size, filter count or any competitor's rating.
    answer:
      'The system is tankless, so it filters on demand rather than drawing from a stored reserve. {Required data: RO production capacity / GPD}',
    pending: true,
  },
  {
    id: 'certification',
    topic: 'water',
    question: 'Is it certified?',
    // Scope matters: the certification covers the carbon media only. Do not
    // reword this into a claim about the assembled system.
    answer:
      'The carbon filtration media is certified to NSF/ANSI 42 and NSF/ANSI 61. That certification covers the media, not the assembled system — we do not claim a whole-system certification, and will not until one is confirmed.',
  },
  {
    id: 'efficiency',
    topic: 'system',
    question: 'How much water goes to drain?',
    // Requested from the manufacturer. Do NOT fill from a generic reverse
    // osmosis assumption — recovery varies by membrane, pressure and design.
    answer: '{Required data: RO water efficiency / recovery ratio}',
    pending: true,
  },
  {
    id: 'install',
    topic: 'system',
    question: 'Can I install it myself?',
    // Do not invent plumbing, drain, electrical or pressure requirements.
    answer:
      'The system installs under the counter and feeds a dedicated drinking-water faucet. {Required data: RO installation requirements}',
    pending: true,
  },
  {
    id: 'dimensions',
    topic: 'system',
    question: 'Will it fit under my sink?',
    answer:
      'The unit measures 10.24 in long by 20.5 in wide by 23.62 in high. Cabinets vary, so measure the space under your sink — including the trap and any disposal — against those figures before ordering.',
  },
  {
    id: 'return-window',
    topic: 'owning',
    question: 'How long do I have to return it?',
    // TODO_VERIFY: return window in days, who pays return freight.
    //
    // Checked 2026-09-04: pitcheroflife.com is unreachable from this
    // environment. CAUTION: a "30-day money-back guarantee" is associated
    // with the alkaline water PITCHER product pages, which is a different
    // product from this RO system. Do not carry that number over without
    // confirming it applies to the RO system — the same scope error as
    // reading carbon-media certification as whole-system certification.
    // The page links to the store policy instead of restating a window.
    answer:
      'The return window and conditions are set out in the store return policy — see the link below. We do not restate a period here, because the figure that circulates online belongs to a different Pitcher of Life product.',
  },
]

export const FAQ_TOPICS: { id: FaqItem['topic']; title: string }[] = [
  { id: 'water', title: 'The water' },
  { id: 'system', title: 'The system' },
  { id: 'owning', title: 'Owning it' },
]

/** Every question in a topic. Pending ones are shown, clearly labelled. */
export const faqByTopic = (topic: FaqItem['topic']): FaqItem[] =>
  FAQ.filter((item) => item.topic === topic)

/** Questions still carrying a manufacturer placeholder. */
export const PENDING_FAQ = FAQ.filter((item) => item.pending)
