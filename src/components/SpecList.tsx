import { isPending, type Spec } from '../data/specs'
import styles from './SpecList.module.css'

interface Props {
  specs: Spec[]
}

/**
 * Renders specifications as a scannable label/value table.
 *
 * A spec whose value is still `TODO_VERIFY` renders as "Pending verification"
 * — never as a plausible-looking number. That is the whole point of routing
 * every figure through the data layer.
 */
export function SpecList({ specs }: Props) {
  return (
    <dl className={styles.list}>
      {specs.map((spec) => {
        const pending = isPending(spec.value)
        return (
          <div className={styles.row} key={spec.id} data-reveal>
            <dt className={styles.label}>{spec.label}</dt>
            <dd className={styles.value}>
              {pending ? (
                // The literal placeholder is shown rather than a vague
                // "pending" label, so a reviewer can see exactly which value
                // is outstanding and it can never read as a real figure.
                <span className={styles.pending}>
                  <span className={styles.pendingDot} aria-hidden="true" />
                  {spec.value}
                </span>
              ) : (
                spec.value
              )}
              {spec.note ? <span className={styles.note}>{spec.note}</span> : null}
            </dd>
          </div>
        )
      })}
    </dl>
  )
}
