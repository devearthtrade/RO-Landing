import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from '../lib/gsap'

/**
 * The reveal animation used across sections: content rises and fades in once,
 * as its trigger crosses into view. A no-op when motion is reduced.
 */
export function useRevealOnScroll(
  scopeRef: RefObject<HTMLElement | null>,
  options: { selector?: string; disabled?: boolean; stagger?: number } = {},
): void {
  const { selector = '[data-reveal]', disabled = false, stagger = 0.09 } = options

  // useLayoutEffect, not useEffect: the hidden starting state has to be in
  // place before first paint, otherwise every reveal flashes visible first.
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return

    const targets = Array.from(scope.querySelectorAll<HTMLElement>(selector))
    if (targets.length === 0) return

    if (disabled) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: scope,
            start: 'top 78%',
            once: true,
          },
        },
      )
    }, scope)

    return () => context.revert()
  }, [scopeRef, selector, disabled, stagger])
}
