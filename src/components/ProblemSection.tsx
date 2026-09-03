import { useRef } from 'react'
import { PROBLEM_POINTS } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useRevealOnScroll } from '../hooks/useVideoScrub'
import { SectionHeading } from './SectionHeading'
import styles from './ProblemSection.module.css'

/**
 * Section 2 — the problem, stated before the product.
 *
 * The hero sells the object; this sells the reason. It is deliberately
 * typographic and quiet: no video, no data, just the situation the reader
 * already recognises, and then the turn into the system.
 *
 * Nothing here claims anything about a specific water supply, and nothing
 * here is a health claim.
 */
export function ProblemSection() {
  const rootRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  useRevealOnScroll(rootRef, { disabled: reducedMotion, stagger: 0.07 })

  return (
    <section id="why" ref={rootRef} className={styles.section} aria-labelledby="why-heading">
      <div className="shell">
        <div className={styles.layout}>
          <SectionHeading
            id="why-heading"
            eyebrow="The problem"
            title="Good water should not be this much work."
            lead="Every kitchen solves drinking water somehow. Most of the solutions are compromises you stopped noticing."
          />

          <div>
            <ul className={styles.points} role="list">
              {PROBLEM_POINTS.map((point) => (
                <li className={styles.point} key={point.id} data-reveal>
                  <h3 className={styles.pointTitle}>{point.title}</h3>
                  <p className={styles.pointBody}>{point.body}</p>
                </li>
              ))}
            </ul>

            <p className={styles.turn} data-reveal>
              This is reverse osmosis, plumbed in and out of sight —{' '}
              <em>with the minerals put back.</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
