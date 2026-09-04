import { useRef } from 'react'
import { FAQ_TOPICS, UNANSWERED_FAQ, answeredFaq } from '../data/faq'
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
 * Only questions with a verified answer are rendered. Questions we know
 * shoppers ask but cannot yet answer truthfully stay in `faq.ts` with a null
 * answer and are surfaced here only in development, so the gap is visible to
 * the team and never to a customer.
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
            const items = answeredFaq(topic.id)
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
                    <p className={styles.answer}>{item.answer}</p>
                  </details>
                ))}
              </div>
            )
          })}
        </div>

        {import.meta.env.DEV && UNANSWERED_FAQ.length > 0 ? (
          <p className={styles.gap}>
            <span>
              <strong>Development note.</strong> {UNANSWERED_FAQ.length} question
              {UNANSWERED_FAQ.length === 1 ? '' : 's'} shoppers ask{' '}
              {UNANSWERED_FAQ.length === 1 ? 'is' : 'are'} withheld from this page because the
              answer is not verified:{' '}
              {UNANSWERED_FAQ.map((item) => item.question).join(' · ')} — fill in{' '}
              <code>src/data/faq.ts</code> to publish them.
            </span>
          </p>
        ) : null}
      </div>
    </section>
  )
}
