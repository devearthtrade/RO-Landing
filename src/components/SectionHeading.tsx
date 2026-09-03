import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

interface Props {
  id?: string
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  align?: 'start' | 'center'
  width?: 'default' | 'wide'
  /** Heading level, so the document outline stays correct. */
  as?: 'h2' | 'h3'
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = 'start',
  width = 'default',
  as: Tag = 'h2',
}: Props) {
  return (
    <div
      className={[
        styles.block,
        width === 'wide' ? styles.wide : '',
        align === 'center' ? styles.centered : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow ? <span className={['eyebrow', styles.eyebrow].join(' ')} data-reveal>{eyebrow}</span> : null}
      <Tag id={id} className={styles.title} data-reveal>
        {title}
      </Tag>
      {lead ? (
        <p className={['lead', styles.lead].join(' ')} data-reveal>
          {lead}
        </p>
      ) : null}
    </div>
  )
}
