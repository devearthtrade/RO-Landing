import { VIDEOS } from '../data/content'
import { SPECS } from '../data/specs'
import { SectionHeading } from './SectionHeading'
import { SpecList } from './SpecList'
import { VideoSection } from './VideoSection'

/** The technical specs surfaced alongside the filtration footage. */
const OVERLAY_SPEC_IDS = ['stages', 'chlorine', 'media-certification', 'reduction']

const overlaySpecs = OVERLAY_SPEC_IDS.map((id) => SPECS.find((spec) => spec.id === id)).filter(
  (spec): spec is (typeof SPECS)[number] => Boolean(spec),
)

/**
 * Section 3 — "Engineered filtration".
 *
 * Every figure here comes from `src/data/specs.ts`; nothing is written into
 * the markup, so a corrected value updates in one place.
 */
export function FiltrationSection() {
  return (
    <VideoSection
      id="filtration"
      asset={VIDEOS.filtration}
      labelledBy="filtration-heading"
      mediaSide="left"
      tone="deep"
      scrim="soft"
      focalPoint="50% 45%"
      extras={<SpecList specs={overlaySpecs} />}
    >
      <SectionHeading
        id="filtration-heading"
        eyebrow="Filtration"
        title="Engineered filtration"
        lead="Five stages, in sequence. Sediment and carbon first — where chlorine is reduced — then the reverse osmosis membrane, then the mineral finish that makes the water drinkable rather than merely pure."
      />
    </VideoSection>
  )
}
