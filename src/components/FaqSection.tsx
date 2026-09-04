import { useRef } from 'react'
import { FAQ_TOPICS, PENDING_FAQ, faqByTopic } from '../data/faq'
import { REPLACEMENT_FILTER_URL, RETURN_POLICY_URL, WARRANTY_URL } from '../data/product'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { SectionHeading } from './SectionHeading'
import styles from './FaqSection.module.css'

/**
 * Objection handling, immediately after the offer.
 *
 * Built on native <details>, so every answer is reachable, keyboard-operable
 * and expandable with JavaScript disabled — no accordion state to get wrong.
 *
 * Every question is rendered, including the ones still waiting on the
 * manufacturer. Those show a labelled `{Required data: ...}` placeholder
 * rather than a plausible-sounding answer: a visible gap is more honest than
 * a short FAQ that quietly omits what a shopper actually wants to know.
 *
 * No return window is stated. The section links to the store's own policy
 * pages instead.
 */
export function FaqSection() {
  const rootRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  useRevealOnScroll(rootRef, { disabled: reducedMotion, stagger: 0.04 })

  return (
    <section id="faq" ref={rootRef} className={styles.section} aria-labelledby="faq-heading">
      <div className="shell">
        <SectionHeading
          id="faq-heading"
          eyebrow="Questions"
          title="Before you decide"
          width="wide"
        />

        <div className={styles.layout}>
          {FAQ_TOPICS.map((topic) => {
            const items = faqByTopic(topic.id)
            if (items.length === 0) return null
            return (
              <div className={styles.group} key={topic.id}>
                <h3 className={styles.groupTitle} data-reveal>
                  {topic.title}
                </h3>
                {items.map((item) => (
                  <details className={styles.item} key={item.id} data-reveal>
                    <summary className={styles.question}>
                      {item.question}
                      <span className={styles.sign} aria-hidden="true" />
                    </summary>
                    <p
                      className={[styles.answer, item.pending ? styles.answerPending : '']
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            )
          })}
        </div>

        <div className={styles.policies}>
          <p className={styles.policiesLead}>
            Full terms live on the store, so they are always the current version:
          </p>
          <ul className={styles.policyLinks} role="list">
            <li>
              <a href={RETURN_POLICY_URL}>Return policy</a>
            </li>
            <li>
              <a href={WARRANTY_URL}>Warranty registration</a>
            </li>
            <li>
              <a href={REPLACEMENT_FILTER_URL}>Replacement filters</a>
            </li>
          </ul>
        </div>

        {import.meta.env.DEV && PENDING_FAQ.length > 0 ? (
          <p className={styles.gap}>
            <span>
              <strong>Development note.</strong> {PENDING_FAQ.length} answer
              {PENDING_FAQ.length === 1 ? '' : 's'} on this page{' '}
              {PENDING_FAQ.length === 1 ? 'is' : 'are'} a manufacturer placeholder:{' '}
              {PENDING_FAQ.map((item) => item.question).join(' · ')} — fill them in{' '}
              <code>src/data/faq.ts</code> once the data arrives.
            </span>
          </p>
        ) : null}
      </div>
    </section>
  )
}
