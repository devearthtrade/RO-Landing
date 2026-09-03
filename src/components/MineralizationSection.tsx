import { VIDEOS, MINERALS } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { VideoSection } from './VideoSection'
import styles from './MineralizationSection.module.css'

/**
 * Section 6 — "Purified. Then remineralized."
 *
 * Descriptive only. The copy says what the stage does to the water and stops
 * there: no health, medical or wellness claims of any kind.
 */
export function MineralizationSection() {
  return (
    <VideoSection
      id="mineralization"
      asset={VIDEOS.mineralization}
      labelledBy="mineralization-heading"
      mediaSide="left"
      tone="paper"
      focalPoint="50% 50%"
      extras={
        <ul className={styles.minerals} role="list">
          {MINERALS.map((mineral) => (
            <li className={styles.mineral} key={mineral.symbol} data-reveal>
              <span className={styles.symbol} aria-hidden="true">
                {mineral.symbol}
              </span>
              <span className={styles.name}>{mineral.name}</span>
              <span className={styles.note}>{mineral.note}</span>
            </li>
          ))}
        </ul>
      }
    >
      <SectionHeading
        id="mineralization-heading"
        eyebrow="Mineralization"
        title="Purified. Then remineralized."
        lead="Reverse osmosis strips water down to almost nothing — including the minerals that give it taste. The final stage puts calcium, magnesium and potassium back, bringing the water to roughly pH 8–9."
      />
    </VideoSection>
  )
}
