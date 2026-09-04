import { useRef } from 'react'
import {
  AGGREGATE_RATING,
  REVIEWS,
  REVIEWS_ARE_PLACEHOLDER,
  type Review,
} from '../data/reviews'
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
 * Section 10 — reviews.
 *
 * The cards below are placeholders and say so, loudly, while
 * `REVIEWS_ARE_PLACEHOLDER` is true. The `Review` shape mirrors what the
 * common Shopify review apps return, so going live is a data-layer swap:
 * fetch into `REVIEWS`, flip the flag, and this component is unchanged.
 */
export function ReviewsSection() {
  const rootRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  useRevealOnScroll(rootRef, { disabled: reducedMotion, stagger: 0.06 })

  return (
    <section id="reviews" ref={rootRef} className={styles.section} aria-labelledby="reviews-heading">
      <div className="shell">
        <SectionHeading
          id="reviews-heading"
          eyebrow="Owners"
          title="What owners say"
          lead={
            AGGREGATE_RATING
              ? `${AGGREGATE_RATING.value.toFixed(1)} average from ${AGGREGATE_RATING.count} reviews.`
              : undefined
          }
          width="wide"
        />

        {REVIEWS_ARE_PLACEHOLDER ? (
          <p className={styles.banner} data-reveal>
            <strong>Placeholder content.</strong> These are not real customer reviews. Connect a
            review source in <code>src/data/reviews.ts</code> before launch.
          </p>
        ) : null}

        <div className={styles.grid}>
          {REVIEWS.map((review) => (
            <article
              key={review.id}
              data-reveal
              className={[styles.card, REVIEWS_ARE_PLACEHOLDER ? styles.placeholderCard : '']
                .filter(Boolean)
                .join(' ')}
            >
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
      </div>
    </section>
  )
}
