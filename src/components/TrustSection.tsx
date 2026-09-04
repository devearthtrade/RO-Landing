import { useRef } from 'react'
import { TRUST_ITEMS } from '../data/trust'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { SectionHeading } from './SectionHeading'
import styles from './TrustSection.module.css'

/**
 * Section 9 — "Built for the long run."
 *
 * The lifetime warranty is stated because Pitcher of Life publishes it as the
 * current warranty for this system. Everything not yet confirmed — the return
 * window, certification, support hours — renders as an explicit pending item
 * rather than a plausible-sounding policy.
 */
export function TrustSection() {
  const rootRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  useRevealOnScroll(rootRef, { disabled: reducedMotion, stagger: 0.05 })

  return (
    <section id="warranty" ref={rootRef} className={styles.section} aria-labelledby="warranty-heading">
      <div className="shell">
        <div className={styles.layout}>
          <SectionHeading
            id="warranty-heading"
            eyebrow="Ownership"
            title="Built for the long run."
            lead="A lifetime warranty, a satisfaction guarantee, and filters you change once or twice a year."
          />

          <div className={styles.items}>
            {TRUST_ITEMS.map((item) => (
              <div className={styles.item} key={item.id} data-reveal>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                {item.body ? (
                  <p className={styles.itemBody}>{item.body}</p>
                ) : (
                  <p className={styles.pending}>
                    <span className={styles.pendingDot} aria-hidden="true" />
                    Details pending verification
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
