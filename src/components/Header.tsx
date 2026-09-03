import { useEffect, useState } from 'react'
import { PRODUCT_NAME_SHORT } from '../data/product'
import styles from './Header.module.css'

const NAV = [
  { href: '#filtration', label: 'Filtration' },
  { href: '#tankless', label: 'Tankless' },
  { href: '#specifications', label: 'Specifications' },
  { href: '#warranty', label: 'Warranty' },
]

/**
 * Sits over the hero as bare type, then resolves into a solid bar once the
 * hero video is behind the reader.
 */
export function Header() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={[styles.header, solid ? styles.solid : ''].filter(Boolean).join(' ')}>
      <div className={['shell', styles.inner].join(' ')}>
        <a className={styles.brand} href="#top">
          <svg className={styles.mark} viewBox="0 0 28 34" fill="none" aria-hidden="true">
            <path
              d="M14 1.5c7 8.4 11.5 14.2 11.5 19.7a11.5 11.5 0 0 1-23 0C2.5 15.7 7 9.9 14 1.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          {PRODUCT_NAME_SHORT}
        </a>

        <nav className={styles.nav} aria-label="Sections">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
