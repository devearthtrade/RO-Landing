import { useRef } from 'react'
import { SPEC_GROUPS, SPECS, UNCONFIRMED_SPECS, isPending, specsByGroup } from '../data/specs'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { SectionHeading } from './SectionHeading'
import { SpecList } from './SpecList'
import styles from './SpecsSection.module.css'

/**
 * Section 8 — "Explore every detail".
 *
 * Entirely data-driven: the groups, the rows and their order all come from
 * `src/data/specs.ts`. Adding a verified spec is a one-line data change.
 */
export function SpecsSection() {
  const rootRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  useRevealOnScroll(rootRef, { disabled: reducedMotion, stagger: 0.04 })

  const pendingCount = SPECS.filter((spec) => isPending(spec.value)).length

  return (
    <section
      id="specifications"
      ref={rootRef}
      className={styles.section}
      aria-labelledby="specifications-heading"
    >
      <div className="shell">
        <SectionHeading
          id="specifications-heading"
          eyebrow="Specifications"
          title="Explore every detail"
          lead="Everything confirmed about the system, in one place."
          width="wide"
        />

        <div className={styles.groups}>
          {SPEC_GROUPS.map((group) => (
            <div className={styles.group} key={group.id}>
              <div className={styles.groupHeader} data-reveal>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <p className={styles.groupCaption}>{group.caption}</p>
              </div>
              <SpecList specs={specsByGroup(group.id)} />
            </div>
          ))}
        </div>

        {import.meta.env.DEV && UNCONFIRMED_SPECS.length > 0 ? (
          <p className={styles.disclosure} data-reveal>
            <svg className={styles.disclosureMark} viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 4.6v4.2M8 11.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span>
              <strong>Development note.</strong> {UNCONFIRMED_SPECS.length} published value
              {UNCONFIRMED_SPECS.length === 1 ? '' : 's'} on this page come from brand copy rather
              than the specification sheet and still need sign-off:{' '}
              {UNCONFIRMED_SPECS.map((spec) => spec.label).join(' · ')}.
            </span>
          </p>
        ) : null}

        {pendingCount > 0 ? (
          <p className={styles.disclosure} data-reveal>
            <svg className={styles.disclosureMark} viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 4.6v4.2M8 11.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span>
              {pendingCount} specification{pendingCount === 1 ? '' : 's'} on this page
              {pendingCount === 1 ? ' is' : ' are'} marked pending verification. Those figures are
              held back until they are confirmed against the manufacturer&rsquo;s documentation
              rather than estimated.
            </span>
          </p>
        ) : null}
      </div>
    </section>
  )
}
