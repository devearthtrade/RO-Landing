import { MINERALS, WATER_CHEMISTRY } from '../data/content'
import { VIDEO_MANIFEST } from '../data/videoManifest'
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
      video={VIDEO_MANIFEST.mineralization}
      labelledBy="mineralization-heading"
      mediaSide="left"
      tone="paper"
      extras={
        <>
          <dl className={styles.chemistry}>
            {WATER_CHEMISTRY.map((row) => (
              <div className={styles.measure} key={row.id} data-reveal>
                <dt className={styles.measureLabel}>{row.label}</dt>
                <dd className={styles.measureValue}>{row.value}</dd>
                <dd className={styles.measureNote}>{row.note}</dd>
              </div>
            ))}
          </dl>
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
        </>
      }
    >
      <SectionHeading
        id="mineralization-heading"
        eyebrow="06 — Mineralization"
        title="Purified. Then remineralized."
        lead="Reverse osmosis strips water down to almost nothing — including the minerals that give it taste. The final stage puts calcium, magnesium and potassium back, rebalancing the water above 7.5 pH."
      />
    </VideoSection>
  )
}
