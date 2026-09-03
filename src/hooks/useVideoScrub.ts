import { useEffect, useLayoutEffect, type RefObject } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

interface Options {
  videoRef: RefObject<HTMLVideoElement | null>
  /** Element that gets pinned for the duration of the scrub. */
  triggerRef: RefObject<HTMLElement | null>
  /** Scroll distance the scrub is spread over, as a multiple of viewport height. */
  distance?: number
  /** Skip the scrub entirely (reduced motion, small screens, missing file). */
  disabled?: boolean
}

/**
 * Maps scroll progress onto a video's `currentTime` while its section is
 * pinned, so the product appears to open under the reader's control.
 *
 * Seeking is throttled to one write per animation frame: writing
 * `currentTime` on every scroll event makes the decoder thrash and the
 * playhead stutter, especially on mobile Safari.
 */
export function useVideoScrub({
  videoRef,
  triggerRef,
  distance = 2.2,
  disabled = false,
}: Options): void {
  useEffect(() => {
    const video = videoRef.current
    const trigger = triggerRef.current
    if (!video || !trigger || disabled) return

    let scrollTrigger: ScrollTrigger | null = null
    let frame = 0
    let targetTime = 0

    const seek = () => {
      frame = 0
      if (!Number.isFinite(targetTime)) return
      // Guard against seeking while a previous seek is still resolving.
      if (video.seeking) {
        frame = requestAnimationFrame(seek)
        return
      }
      video.currentTime = targetTime
    }

    const setup = () => {
      const duration = video.duration
      if (!Number.isFinite(duration) || duration <= 0) return

      video.pause()

      scrollTrigger = ScrollTrigger.create({
        trigger,
        start: 'top top',
        end: () => `+=${window.innerHeight * distance}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self: ScrollTrigger) => {
          // Stop a hair short of the end: some encoders leave the final
          // frame unseekable, which reads as a stall.
          targetTime = self.progress * (duration - 0.05)
          if (!frame) frame = requestAnimationFrame(seek)
        },
      })

      ScrollTrigger.refresh()
    }

    if (video.readyState >= 1) {
      setup()
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true })
    }

    return () => {
      video.removeEventListener('loadedmetadata', setup)
      if (frame) cancelAnimationFrame(frame)
      scrollTrigger?.kill()
    }
  }, [videoRef, triggerRef, distance, disabled])
}

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
