import { useRef } from 'react'
import { AGGREGATE_RATING, REVIEWS, REVIEWS_AVAILABLE, type Review } from '../data/reviews'
import { WARRANTY_URL } from '../data/product'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { SectionHeading } from './SectionHeading'
import styles from './ReviewsSection.module.css'

function Stars({ rating }: { rating: Review['rating'] }) {
  return (
    <span className={styles.stars} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((index) => (
        <svg
          key={index}
          className={[styles.star, index > rating ? styles.starEmpty : ''].filter(Boolean).join(' ')}
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 .8 10.1 5.5l5.1.5-3.8 3.4 1.1 5L8 11.8 3.5 14.4l1.1-5L.8 6l5.1-.5L8 .8Z" />
        </svg>
      ))}
    </span>
  )
}

/**
 * Proof.
 *
 * With no review source connected, this renders a composed empty state rather
 * than placeholder cards dressed up as testimonials. It says plainly that
 * reviews are not published yet and points at the guarantees that are real,
 * which is the honest way to hold this position in the page.
 */
export function ReviewsSection() {
  const rootRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  useRevealOnScroll(rootRef, { disabled: reducedMotion, stagger: 0.06 })

  const hasReviews = REVIEWS_AVAILABLE && REVIEWS.length > 0

  return (
    <section id="reviews" ref={rootRef} className={styles.section} aria-labelledby="reviews-heading">
      <div className="shell">
        <SectionHeading
          id="reviews-heading"
          eyebrow="Proof"
          title={hasReviews ? 'What owners say' : 'Buy it on the guarantee, not the reviews'}
          lead={
            hasReviews
              ? AGGREGATE_RATING
                ? `${AGGREGATE_RATING.value.toFixed(1)} average from ${AGGREGATE_RATING.count} reviews.`
                : undefined
              : 'We have not published customer reviews for this system yet. Rather than fill the space with something we cannot stand behind, here is what actually backs the purchase.'
          }
          width="wide"
        />

        {hasReviews ? (
          <div className={styles.grid}>
            {REVIEWS.map((review) => (
              <article key={review.id} data-reveal className={styles.card}>
                <Stars rating={review.rating} />
                <h3 className={styles.cardTitle}>{review.title}</h3>
                <p className={styles.cardBody}>{review.body}</p>
                <p className={styles.meta}>
                  <span>{review.author}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={review.date}>
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </time>
                  {review.verifiedPurchase ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className={styles.verified}>Verified purchase</span>
                    </>
                  ) : null}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.assurances}>
            <div className={styles.assurance} data-reveal>
              <h3 className={styles.assuranceTitle}>A lifetime warranty</h3>
              <p className={styles.assuranceBody}>
                Registered after installation, the system is covered for life — a longer commitment
                than this category usually makes.
              </p>
              <a className={styles.assuranceLink} href={WARRANTY_URL}>
                Warranty registration
              </a>
            </div>
            <div className={styles.assurance} data-reveal>
              <h3 className={styles.assuranceTitle}>A satisfaction guarantee</h3>
              <p className={styles.assuranceBody}>
                If the system is not right for your kitchen, it is covered by a 100% satisfaction
                guarantee.
              </p>
            </div>
            <div className={styles.assurance} data-reveal>
              <h3 className={styles.assuranceTitle}>Figures you can check</h3>
              <p className={styles.assuranceBody}>
                Every specification on this page traces to the manufacturer&rsquo;s sheet. Where a
                number is still outstanding, the page says so rather than estimating.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
