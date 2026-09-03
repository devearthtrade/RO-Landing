import { useEffect, useState } from 'react'
import { PRICE_DISPLAY, PRODUCT_NAME_SHORT } from '../data/product'
import { AddToCartButton } from './AddToCartButton'
import styles from './StickyAddToCart.module.css'

/**
 * The persistent purchase bar.
 *
 * It stays out of the way through the hero — the product film should have the
 * screen to itself — then rides along for the rest of the page. It hides again
 * over the final CTA, where a full-size Add to Cart is already on screen.
 */
export function StickyAddToCart() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9

      const finalCta = document.getElementById('buy')
      const overFinalCta = finalCta
        ? finalCta.getBoundingClientRect().top < window.innerHeight * 0.62
        : false

      setVisible(pastHero && !overFinalCta)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className={[styles.bar, visible ? styles.visible : ''].filter(Boolean).join(' ')}
      // Hidden from assistive tech while off-screen so the CTA is not
      // announced twice in the tab order.
      aria-hidden={!visible}
      inert={!visible ? true : undefined}
    >
      <div className={['shell', styles.inner].join(' ')}>
        <div className={styles.identity}>
          <span className={styles.name}>{PRODUCT_NAME_SHORT}</span>
          <span className={styles.price}>{PRICE_DISPLAY}</span>
          <span className={styles.note}>Free shipping to the contiguous 48 states</span>
        </div>

        <div className={styles.action}>
          <AddToCartButton />
        </div>
      </div>
    </div>
  )
}
