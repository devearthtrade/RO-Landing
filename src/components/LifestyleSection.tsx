import { VIDEO_MANIFEST } from '../data/videoManifest'
import { SectionHeading } from './SectionHeading'
import { VideoSection } from './VideoSection'

/**
 * Section 7 — the turn from engineering to aspiration.
 *
 * Deliberately the quietest section on the page: one line of copy, one film,
 * no data. It is a breath before the specifications.
 */
export function LifestyleSection() {
  return (
    <VideoSection
      id="home"
      video={VIDEO_MANIFEST.lifestyle}
      labelledBy="lifestyle-heading"
      mediaSide="right"
      tone="sunk"
    >
      <SectionHeading
        id="lifestyle-heading"
        eyebrow="07 — At home"
        title="Better water belongs in your home."
        lead="Installed out of sight, drawn from a faucet of its own. The system does its work under the counter and leaves the kitchen to you."
      />
    </VideoSection>
  )
}
