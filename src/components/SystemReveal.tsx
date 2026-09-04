import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { VIDEO_MANIFEST } from '../data/videoManifest'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { CinematicVideo } from './CinematicVideo'
import type { VideoState } from '../hooks/useLazyVideo'
import styles from './SystemReveal.module.css'

/**
 * Section 3 — "What's happening inside?".
 *
 * This section was built to scrub the clip against scroll position. The
 * delivered file makes that impossible: it holds a single keyframe, so every
 * seek replays from frame zero and the reveal stutters. Instead the clip
 * plays a single pass when the section arrives and holds the system open,
 * which reads the same to a customer and costs nothing in smoothness.
 *
 * The progress rail now tracks the reader's travel through the section
 * rather than the video's playhead, so it still ties the section together.
 */
export function SystemReveal() {
  const introRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLElement | null>(null)
  const fillRef = useRef<HTMLSpanElement | null>(null)

  const reducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const [videoState, setVideoState] = useState<VideoState>('idle')

  const handleVideoState = useCallback((next: VideoState) => setVideoState(next), [])

  useRevealOnScroll(introRef, { disabled: reducedMotion })

  useEffect(() => {
    const stage = stageRef.current
    const fill = fillRef.current
    if (!stage || !fill) return

    if (reducedMotion) {
      gsap.set(fill, { scaleX: 1 })
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: stage,
      start: 'top 85%',
      end: 'bottom 45%',
      scrub: 0.5,
      onUpdate: (self: ScrollTrigger) => gsap.set(fill, { scaleX: self.progress }),
    })

    return () => trigger.kill()
  }, [reducedMotion])

  return (
    <>
      <section
        className={styles.intro}
        ref={introRef}
        data-seam="into-deep"
        aria-labelledby="system-intro-heading"
      >
        <div className="shell">
          <div className={styles.introInner}>
            <span className="eyebrow" data-reveal>
              02 — The system
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
        data-video-state={videoState}
        aria-labelledby="inside-heading"
      >
        <div className={styles.media}>
          <CinematicVideo
            video={VIDEO_MANIFEST.systemOpen}
            onStateChange={handleVideoState}
            scrim={isDesktop ? 'left' : 'bottom'}
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
