import type { ReactNode } from 'react'
import { useRef } from 'react'
import type { VideoAsset } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useRevealOnScroll } from '../hooks/useVideoScrub'
import { CinematicVideo, type Scrim } from './CinematicVideo'
import styles from './VideoSection.module.css'

interface Props {
  id: string
  asset: VideoAsset
  children: ReactNode
  /** Optional block placed under the copy — a list, a table, a comparison. */
  extras?: ReactNode
  mediaSide?: 'left' | 'right'
  tone?: 'paper' | 'sunk' | 'deep'
  focalPoint?: string
  scrim?: Scrim
  labelledBy: string
}

/**
 * The workhorse layout: a film panel beside a column of copy.
 *
 * On desktop the panel is sticky, so the footage holds while the reader moves
 * through the text — a camera hold rather than a pin, which keeps the page
 * scrollable and avoids stacking pinned sections on top of each other.
 */
export function VideoSection({
  id,
  asset,
  children,
  extras,
  mediaSide = 'right',
  tone = 'paper',
  focalPoint,
  scrim = 'none',
  labelledBy,
}: Props) {
  const rootRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  useRevealOnScroll(rootRef, { disabled: reducedMotion })

  return (
    <section
      id={id}
      ref={rootRef}
      aria-labelledby={labelledBy}
      className={[
        styles.section,
        tone === 'deep' ? styles.deep : '',
        tone === 'sunk' ? styles.sunk : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-theme={tone === 'deep' ? 'deep' : undefined}
    >
      <div className="shell">
        <div
          className={[styles.grid, mediaSide === 'left' ? styles.mediaLeft : '']
            .filter(Boolean)
            .join(' ')}
        >
          <div className={styles.body}>
            {children}
            {extras ? <div className={styles.extras}>{extras}</div> : null}
          </div>

          <div className={styles.media} data-reveal>
            <CinematicVideo asset={asset} focalPoint={focalPoint} scrim={scrim} />
          </div>
        </div>
      </div>
    </section>
  )
}
