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
          This page describes the filtration and mineralization performed by the system. It makes
          no health, medical or therapeutic claims, and nothing here is intended to diagnose,
          treat, cure or prevent any condition.
        </p>
      </div>
    </footer>
  )
}
