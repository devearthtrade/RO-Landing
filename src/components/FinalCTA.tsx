import { useRef } from 'react'
import { VIDEOS } from '../data/content'
import { PRICE_DISPLAY, PRODUCT_NAME } from '../data/product'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { useRevealOnScroll } from '../hooks/useVideoScrub'
import { AddToCartButton } from './AddToCartButton'
import { CinematicVideo } from './CinematicVideo'
import styles from './FinalCTA.module.css'

/**
 * Section 11 — the close.
 *
 * Assurances here repeat only what is stated verbatim elsewhere on the page
 * and confirmed in the data layer. Nothing new is claimed at the point of
 * sale.
 */
const ASSURANCES = [
  'Lifetime warranty with registration',
  '100% satisfaction guarantee',
  'Free shipping to the contiguous 48 states',
]

export function FinalCTA() {
  const rootRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()

  useRevealOnScroll(rootRef, { disabled: reducedMotion })

  return (
    <section id="buy" ref={rootRef} className={styles.section} aria-labelledby="buy-heading">
      <div className={styles.media}>
        <CinematicVideo
          asset={VIDEOS.final}
          scrim={isDesktop ? 'left' : 'bottom'}
          focalPoint={isDesktop ? '50% 50%' : '58% 45%'}
        />
      </div>

      <div className={['shell', styles.content].join(' ')}>
        <div className={styles.inner}>
          <span className="eyebrow" data-reveal>
            Pitcher of Life
          </span>

          <h2 id="buy-heading" className={styles.headline} data-reveal>
            Your water. Upgraded.
          </h2>

          <p className={styles.product} data-reveal>
            {PRODUCT_NAME}
          </p>

          <div className={styles.priceRow} data-reveal>
            <span className={styles.price}>{PRICE_DISPLAY}</span>
          </div>

          <div className={styles.actions} data-reveal>
            <AddToCartButton variant="onDeep" label="Add to cart" />
          </div>

          <ul className={styles.assurances} data-reveal>
            {ASSURANCES.map((item) => (
              <li className={styles.assurance} key={item}>
                <svg className={styles.tick} viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M2 7.4 5.4 11 12 3.4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
