import type { ReactNode } from 'react'
import styles from './Button.module.css'

interface Props {
  href: string
  children: ReactNode
  variant?: 'solid' | 'onDeep' | 'ghost'
  block?: boolean
}

/** An anchor that carries the same weight as the primary CTA. */
export function LinkButton({ href, children, variant = 'solid', block = false }: Props) {
  return (
    <a
      href={href}
      className={[
        styles.button,
        variant === 'onDeep' ? styles.onDeep : '',
        variant === 'ghost' ? styles.ghost : '',
        block ? styles.block : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </a>
  )
}
