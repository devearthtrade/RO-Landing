import { useEffect, type CSSProperties, type RefObject } from 'react'
import { useLazyVideo, type VideoState } from '../hooks/useLazyVideo'
import type { VideoAsset } from '../data/content'
import styles from './CinematicVideo.module.css'

export type Scrim = 'bottom' | 'left' | 'soft' | 'none'

interface Props {
  asset: VideoAsset
  /** Hero only: skip the IntersectionObserver and load straight away. */
  eager?: boolean
  /** The caller drives `currentTime`; do not autoplay. */
  scrub?: boolean
  scrim?: Scrim
  /** `object-position`, so portrait crops can favour the product. */
  focalPoint?: string
  className?: string
  /**
   * Share the video element with a parent that needs to drive it — the pinned
   * reveal seeks this element as the reader scrolls.
   */
  videoRef?: RefObject<HTMLVideoElement | null>
  /**
   * Notified as the video moves through idle → loading → ready/unavailable.
   * A parent driving the element itself needs this: the `<video>` is not in
   * the DOM until the section is near the viewport, so a ref alone is not
   * enough to know when it can be used.
   */
  onStateChange?: (state: VideoState) => void
}

const scrimClass: Record<Scrim, string> = {
  bottom: styles.scrimBottom,
  left: styles.scrimLeft,
  soft: styles.scrimSoft,
  none: styles.scrimNone,
}

function placeholderCopy(state: VideoState): string | null {
  if (state === 'unavailable') {
    // Development affordance: the section is intact, the file simply is not
    // in /public/videos yet.
    return import.meta.env.DEV ? 'Video not found in /public/videos' : null
  }
  return null
}

/**
 * The single video primitive used by every section.
 *
 * It never fails loudly: while the file is loading, and permanently if the
 * file is missing, a composed placeholder stands in its place and the section
 * around it continues to work.
 */
export function CinematicVideo({
  asset,
  eager = false,
  scrub = false,
  scrim = 'none',
  focalPoint,
  className,
  videoRef: externalVideoRef,
  onStateChange,
}: Props) {
  const { videoRef, wrapperRef, state, armed, manualPlayback, isPlaying, togglePlayback } =
    useLazyVideo({ eager, scrub, externalVideoRef })

  useEffect(() => {
    onStateChange?.(state)
  }, [state, onStateChange])

  const ready = state === 'ready'
  const note = placeholderCopy(state)

  return (
    <div
      ref={wrapperRef}
      className={[styles.frame, className].filter(Boolean).join(' ')}
      style={{ '--video-position': focalPoint } as CSSProperties}
    >
      <div
        className={[
          styles.placeholder,
          state !== 'unavailable' ? styles.placeholderPending : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      >
        {note ? (
          <p className={styles.placeholderNote}>
            <svg className={styles.placeholderMark} viewBox="0 0 28 34" fill="none">
              <path
                d="M14 1.5c7 8.4 11.5 14.2 11.5 19.7a11.5 11.5 0 0 1-23 0C2.5 15.7 7 9.9 14 1.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
            {note}
          </p>
        ) : null}
      </div>

      {armed ? (
        <video
          ref={videoRef}
          className={[styles.video, ready ? styles.videoReady : ''].filter(Boolean).join(' ')}
          src={asset.src}
          poster={asset.poster}
          // Scrubbed video needs buffered frames to seek into; ambient video
          // only needs enough to start.
          preload={scrub ? 'auto' : 'metadata'}
          muted
          playsInline
          disablePictureInPicture
          // Decorative: the surrounding copy carries the meaning.
          aria-hidden="true"
          tabIndex={-1}
        />
      ) : null}

      <div className={[styles.scrim, scrimClass[scrim]].join(' ')} aria-hidden="true" />

      {manualPlayback && ready ? (
        <button type="button" className={styles.playToggle} onClick={togglePlayback}>
          {isPlaying ? 'Pause' : 'Play'}
          <span className="visually-hidden"> video: {asset.description}</span>
        </button>
      ) : null}
    </div>
  )
}
