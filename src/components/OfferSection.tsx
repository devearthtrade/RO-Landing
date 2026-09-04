import { useRef } from 'react'
import { KEY_BENEFITS } from '../data/content'
import { PRICE_DISPLAY, PRODUCT_NAME, RETURN_POLICY_URL } from '../data/product'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { AddToCartButton } from './AddToCartButton'
import { SectionHeading } from './SectionHeading'
import styles from './OfferSection.module.css'

/**
 * The offer.
 *
 * Everything a buyer needs to decide, in one place and above the FAQ: what it
 * does, what it costs, what is included, and what protects them if it turns
 * out to be wrong for their kitchen.
 *
 * The lifetime warranty leads here on purpose. It is the strongest verified
 * differentiator this product has — most systems in this category are covered
 * for a year or two — and it was previously buried at the bottom of the page.
 *
 * Every line traces to a confirmed value in `specs.ts` / `trust.ts`.
 */
export function OfferSection() {
  const rootRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  useRevealOnScroll(rootRef, { disabled: reducedMotion, stagger: 0.06 })

  return (
    <section
      id="offer"
      ref={rootRef}
      className={styles.section}
      data-theme="deep"
      data-seam="both"
      aria-labelledby="offer-heading"
    >
      <div className="shell">
        <SectionHeading
          id="offer-heading"
          eyebrow="The offer"
          title="One system. Covered for life."
          lead="Tankless reverse osmosis. Water rebalanced above 7.5 pH with calcium, magnesium and potassium. Chlorine reduced through carbon media certified to NSF/ANSI 42 and 61 — and a lifetime warranty behind all of it."
          width="wide"
        />

        <div className={styles.layout} style={{ marginTop: 'clamp(2.5rem, 6vh, 4rem)' }}>
          <ul className={styles.benefits} role="list">
            {KEY_BENEFITS.map((benefit) => (
              <li className={styles.benefit} key={benefit.id} data-reveal>
                <svg className={styles.tick} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 8.4 6.2 12 13.5 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitBody}>{benefit.body}</p>
              </li>
            ))}
          </ul>

          <div className={styles.panel} data-reveal>
            <span className={styles.panelLabel}>Complete system</span>
            <h3 className={styles.productName}>{PRODUCT_NAME}</h3>

            <div className={styles.priceRow}>
              <span className={styles.price}>{PRICE_DISPLAY}</span>
              <span className={styles.priceNote}>Free shipping</span>
            </div>

            <div className={styles.action}>
              <AddToCartButton variant="onDeep" block label="Add to cart" />
            </div>

            <ul className={styles.included} role="list">
              <li className={styles.includedItem}>
                <span className={styles.dot} aria-hidden="true" />
                <span>
                  <strong>Lifetime warranty</strong> with product registration
                </span>
              </li>
              <li className={styles.includedItem}>
                <span className={styles.dot} aria-hidden="true" />
                <span>
                  <strong>100% satisfaction guarantee</strong> — your money back if it is not right
                </span>
              </li>
              <li className={styles.includedItem}>
                <span className={styles.dot} aria-hidden="true" />
                <span>
                  <strong>Free shipping</strong> to the contiguous 48 states, reduced rate to Alaska
                  and Hawaii
                </span>
              </li>
              <li className={styles.includedItem}>
                <span className={styles.dot} aria-hidden="true" />
                <span>
                  <strong>Returns</strong> under the{' '}
                  <a className={styles.includedLink} href={RETURN_POLICY_URL}>
                    store return policy
                  </a>
                </span>
              </li>
              <li className={styles.includedItem}>
                <span className={styles.dot} aria-hidden="true" />
                <span>
                  <strong>Replaceable filters</strong>, available from Pitcher of Life
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
