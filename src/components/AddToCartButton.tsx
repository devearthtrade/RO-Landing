import { useState } from 'react'
import { addToCart, addToCartAriaLabel } from '../lib/cart'
import styles from './Button.module.css'

interface Props {
  label?: string
  variant?: 'solid' | 'onDeep' | 'ghost'
  block?: boolean
  quantity?: number
  className?: string
}

/**
 * The one place an add-to-cart is triggered. Every CTA on the page routes
 * through it so the purchase path stays identical wherever it is pressed.
 */
export function AddToCartButton({
  label = 'Add to cart',
  variant = 'solid',
  block = false,
  quantity = 1,
  className,
}: Props) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    if (busy) return
    setBusy(true)
    setError(null)

    const result = await addToCart(quantity)
    if (result.status === 'error') {
      setError(result.message)
      setBusy(false)
      return
    }
    // On success the browser is already navigating; leave the button busy so
    // it cannot be double-submitted during the handoff.
  }

  return (
    <div className={block ? styles.block : undefined}>
      <button
        type="button"
        onClick={handleClick}
        aria-label={addToCartAriaLabel}
        aria-busy={busy}
        className={[
          styles.button,
          variant === 'onDeep' ? styles.onDeep : '',
          variant === 'ghost' ? styles.ghost : '',
          block ? styles.block : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {busy ? 'Adding…' : label}
      </button>

      <p role="status" aria-live="polite">
        {error ? (
          <span
            className={[styles.error, variant === 'onDeep' ? styles.onDeepError : '']
              .filter(Boolean)
              .join(' ')}
          >
            {error}
          </span>
        ) : null}
      </p>
    </div>
  )
}
