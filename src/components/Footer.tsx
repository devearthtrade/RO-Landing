import { PRODUCT_NAME, SHOPIFY_PRODUCT_URL } from '../data/product'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer} data-theme="deep">
      <div className="shell">
        <div className={styles.inner}>
          <span>{PRODUCT_NAME}</span>
          <a href={SHOPIFY_PRODUCT_URL}>View on pitcheroflife.com</a>
        </div>

        <p className={styles.disclaimer}>
          NSF/ANSI 42 and NSF/ANSI 61 certification applies to the carbon filtration media used in
          this system. It is not a certification of the assembled system, and no whole-system
          certification is claimed.
        </p>

        <p className={styles.disclaimer}>
          This page describes the filtration and mineralization performed by the system, and states
          pH, mineral content and oxidation reduction potential as measurements of the water. It
          makes no health, medical or therapeutic claims, and nothing here is intended to diagnose,
          treat, cure or prevent any condition.
        </p>
      </div>
    </footer>
  )
}
