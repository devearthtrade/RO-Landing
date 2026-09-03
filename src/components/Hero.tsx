import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { VIDEOS } from '../data/content'
import { PRICE_DISPLAY } from '../data/product'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { AddToCartButton } from './AddToCartButton'
import { CinematicVideo } from './CinematicVideo'
import { LinkButton } from './LinkButton'
import styles from './Hero.module.css'

/**
 * Section 1. The film is the hero; the type sits in the lower corner where it
 * covers the least of the product.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null)
  const mediaRef = useRef<HTMLDivElement | null>(null)
  const reducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()

  // Above the fold, so the entrance state must land before first paint.
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('[data-hero-line]', { opacity: 1, y: 0 })
        return
      }

      // Entrance: the copy settles in after the first frame has painted.
      gsap.fromTo(
        '[data-hero-line]',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.11,
          delay: 0.25,
        },
      )

      // Departure: the frame drifts and dims as the reader leaves, so the
      // hero hands off to the next section instead of cutting.
      gsap.to(mediaRef.current, {
        yPercent: 12,
        scale: 1.14,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('[data-hero-content]', {
        opacity: 0,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '60% top',
          scrub: true,
        },
      })
    }, root)

    return () => context.revert()
  }, [reducedMotion])

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.media} ref={mediaRef}>
        <CinematicVideo
          asset={VIDEOS.hero}
          eager
          scrim={isDesktop ? 'left' : 'bottom'}
          focalPoint={isDesktop ? '50% 50%' : '62% 46%'}
        />
      </div>

      <div className={['shell', styles.content].join(' ')} data-hero-content>
        <div className={styles.inner}>
          <span className={[styles.eyebrow, 'eyebrow'].join(' ')} data-hero-line>
            Pitcher of Life
          </span>

          <h1 id="hero-heading" className={styles.headline} data-hero-line>
            <span>Pure water.</span>
            <span>Reimagined.</span>
          </h1>

          <p className={styles.subhead} data-hero-line>
            Tankless reverse osmosis + alkaline mineralization.
          </p>

          <div className={styles.priceRow} data-hero-line>
            <span className={styles.price}>{PRICE_DISPLAY}</span>
            <span className={styles.priceNote}>Free shipping · 48 states</span>
          </div>

          <div className={styles.actions} data-hero-line>
            {/* The buy path is available from the first screen; exploring
                the story is the secondary action. */}
            <AddToCartButton variant="onDeep" label="Add to cart" />
            <LinkButton href="#inside" variant="ghost">
              Explore the system
            </LinkButton>
          </div>
        </div>
      </div>

      <div className={styles.cue} aria-hidden="true">
        Scroll
        <span className={styles.cueLine} />
      </div>
    </section>
  )
}
