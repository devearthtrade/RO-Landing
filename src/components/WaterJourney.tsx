import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { WATER_JOURNEY_STEPS } from '../data/content'
import { VIDEO_MANIFEST } from '../data/videoManifest'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { CinematicVideo } from './CinematicVideo'
import { SectionHeading } from './SectionHeading'
import styles from './WaterJourney.module.css'

/**
 * Section 4 — "Follow the water".
 *
 * Five steps hung off one line, and the line fills as the reader descends it.
 * The animation is the explanation: no diagram, no jargon.
 */
export function WaterJourney() {
  const rootRef = useRef<HTMLElement | null>(null)
  const pathRef = useRef<HTMLDivElement | null>(null)
  const lineRef = useRef<HTMLSpanElement | null>(null)
  const reducedMotion = useReducedMotion()

  useRevealOnScroll(rootRef, { disabled: reducedMotion })

  useEffect(() => {
    const path = pathRef.current
    const line = lineRef.current
    if (!path || !line) return

    if (reducedMotion) {
      gsap.set(line, { scaleY: 1 })
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: path,
      start: 'top 72%',
      end: 'bottom 62%',
      scrub: 0.5,
      onUpdate: (self: ScrollTrigger) => gsap.set(line, { scaleY: self.progress }),
    })

    return () => trigger.kill()
  }, [reducedMotion])

  return (
    <section
      id="journey"
      ref={rootRef}
      className={styles.section}
      data-theme="deep"
      data-seam="out-of-deep"
      aria-labelledby="journey-heading"
    >
      <div className="shell">
        <div className={styles.header}>
          <SectionHeading
            id="journey-heading"
            eyebrow="04 — The path"
            title="Follow the water"
            lead="See the journey from your home's water supply through the filtration system to your drinking-water faucet."
            width="wide"
          />
        </div>

        <div className={styles.layout}>
          <div className={styles.path} ref={pathRef}>
            {/* The rule lives outside the list so the <ol> keeps only <li>
                children and the sequence is announced correctly. */}
            <span className={styles.progressLine} ref={lineRef} aria-hidden="true" />
            <ol className={styles.steps}>
              {WATER_JOURNEY_STEPS.map((step) => (
                <li className={styles.step} key={step.id} data-reveal>
                  <span className={styles.index}>{step.step}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.media} data-reveal>
            <CinematicVideo video={VIDEO_MANIFEST.waterFlow} scrim="soft" />
          </div>
        </div>
      </div>
    </section>
  )
}
