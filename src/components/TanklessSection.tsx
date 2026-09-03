import { useRef } from 'react'
import { VIDEOS, TANKLESS_COMPARISON } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useRevealOnScroll } from '../hooks/useVideoScrub'
import { CinematicVideo } from './CinematicVideo'
import { SectionHeading } from './SectionHeading'
import styles from './TanklessSection.module.css'

interface ComparisonColumn {
  id: string
  title: string
  points: readonly string[]
}

/** Widened from the const-asserted source so both columns share one type. */
const COLUMNS: ComparisonColumn[] = [
  TANKLESS_COMPARISON.conventional,
  TANKLESS_COMPARISON.tankless,
]

/**
 * Section 5 — "More technology. Less space."
 *
 * A factual side-by-side. The left column describes how tank-based reverse
 * osmosis is arranged, not how badly some other brand performs: no
 * competitor is named and no comparative performance claim is made.
 */
export function TanklessSection() {
  const rootRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  useRevealOnScroll(rootRef, { disabled: reducedMotion })

  return (
    <section
      id="tankless"
      ref={rootRef}
      className={styles.section}
      aria-labelledby="tankless-heading"
    >
      <div className="shell">
        <SectionHeading
          id="tankless-heading"
          eyebrow="Tankless"
          title="More technology. Less space."
          lead="Conventional reverse osmosis stores treated water in a pressurized tank. This system filters on demand, so the tank — and the cabinet space it needs — is simply not part of the install."
          width="wide"
        />

        <div className={styles.layout}>
          <div className={styles.media} data-reveal>
            <CinematicVideo asset={VIDEOS.tankless} focalPoint="50% 50%" scrim="soft" />
          </div>

          <div className={styles.compare}>
            {COLUMNS.map((column) => {
              const isProduct = column.id === 'tankless'
              return (
                <div
                  key={column.id}
                  data-reveal
                  data-theme={isProduct ? 'deep' : undefined}
                  className={[styles.column, isProduct ? styles.highlight : '']
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className={styles.columnLabel}>
                    {isProduct ? 'This system' : 'Conventional approach'}
                  </span>
                  <h3 className={styles.columnTitle}>{column.title}</h3>
                  <ul className={styles.points} role="list">
                    {column.points.map((point) => (
                      <li className={styles.point} key={point}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        <p className={styles.footnote} data-reveal>
          Comparison describes the two system architectures in general terms. It is not a
          performance comparison against any specific product.
        </p>
      </div>
    </section>
  )
}
