import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { VIDEOS } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { useVideoScrub, useRevealOnScroll } from '../hooks/useVideoScrub'
import { CinematicVideo } from './CinematicVideo'
import type { VideoState } from '../hooks/useLazyVideo'
import styles from './SystemReveal.module.css'

/**
 * Section 2 — "What's happening inside?".
 *
 * The section pins and the reader's scroll drives the video's playhead, so
 * the system appears to open under their own hand. Where scrubbing is a bad
 * idea — reduced motion, or a phone where seeking a large file stutters — the
 * same footage plays as an ambient loop in a normal, unpinned section. The
 * story survives either way.
 */
export function SystemReveal() {
  const introRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const fillRef = useRef<HTMLSpanElement | null>(null)

  const reducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const [videoState, setVideoState] = useState<VideoState>('idle')

  // Scrubbing seeks a video file on every frame. That is fine on a desktop
  // with the file buffered and wrong on a phone, so pinning is desktop-only.
  const scrubEnabled = isDesktop && !reducedMotion

  // The <video> is not mounted until the section nears the viewport, and a
  // missing file never becomes ready at all. Pin only once there is something
  // to scrub — otherwise the section stays a normal, scrollable panel.
  const pinned = scrubEnabled && videoState === 'ready'

  const handleVideoState = useCallback((next: VideoState) => setVideoState(next), [])

  useRevealOnScroll(introRef, { disabled: reducedMotion })

  useVideoScrub({
    videoRef,
    triggerRef: stageRef,
    distance: 2.4,
    disabled: !pinned,
  })

  // Progress bar, driven by the same scroll range as the scrub.
  useEffect(() => {
    const stage = stageRef.current
    const fill = fillRef.current
    if (!stage || !fill) return

    const trigger = ScrollTrigger.create({
      trigger: stage,
      start: pinned ? 'top top' : 'top 80%',
      end: pinned ? () => `+=${window.innerHeight * 2.4}` : 'bottom 40%',
      onUpdate: (self: ScrollTrigger) => gsap.set(fill, { scaleX: self.progress }),
    })

    return () => trigger.kill()
  }, [pinned])

  return (
    <>
      <section className={styles.intro} ref={introRef} aria-labelledby="system-intro-heading">
        <div className="shell">
          <div className={styles.introInner}>
            <span className="eyebrow" data-reveal>
              The system
            </span>
            <p className={styles.introStatement} id="system-intro-heading" data-reveal>
              Five filtration stages, a reverse osmosis membrane and a mineral finish —
              <em> in a unit that hides under your sink.</em>
            </p>
          </div>
        </div>
      </section>

      <section
        id="inside"
        className={styles.stage}
        ref={stageRef}
        aria-labelledby="inside-heading"
      >
        <div className={styles.media}>
          <CinematicVideo
            asset={VIDEOS.systemOpen}
            scrub={scrubEnabled}
            videoRef={videoRef}
            onStateChange={handleVideoState}
            scrim={isDesktop ? 'left' : 'bottom'}
            focalPoint={isDesktop ? '50% 50%' : '55% 42%'}
          />
        </div>

        <div className={styles.overlay}>
          <div className="shell">
            <div className={styles.copy}>
              <h2 id="inside-heading">What&rsquo;s happening inside?</h2>
              <p>Take a closer look at the technology behind your drinking water.</p>
            </div>
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span>Opening</span>
          <span className={styles.track}>
            <span className={styles.fill} ref={fillRef} />
          </span>
        </div>
      </section>
    </>
  )
}
