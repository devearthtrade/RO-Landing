import { useEffect, type CSSProperties, type RefObject } from 'react'
import { useLazyVideo, type VideoState } from '../hooks/useLazyVideo'
import type { VideoManifestEntry } from '../data/videoManifest'
import styles from './CinematicVideo.module.css'

export type Scrim = 'bottom' | 'left' | 'soft' | 'none'

interface Props {
  /** The manifest entry drives source, dimensions, playback and framing. */
  video: VideoManifestEntry
  scrim?: Scrim
  className?: string
  videoRef?: RefObject<HTMLVideoElement | null>
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
    return import.meta.env.DEV ? 'Video not found in /public/videos' : null
  }
  return null
}

/**
 * The single video primitive used by every section.
 *
 * It never fails loudly: while a clip loads, and permanently if the file is
 * missing, a composed placeholder stands in and the section around it keeps
 * working. Because the manifest carries each clip's real dimensions, the box
 * is reserved before any bytes arrive, so nothing shifts when it paints.
 */
export function CinematicVideo({
  video,
  scrim = 'none',
  className,
  videoRef: externalVideoRef,
  onStateChange,
}: Props) {
  const { videoRef, wrapperRef, state, armed, manualPlayback, isPlaying, togglePlayback } =
    useLazyVideo({
      eager: video.eager,
      playback: video.playback,
      externalVideoRef,
    })

  useEffect(() => {
    onStateChange?.(state)
  }, [state, onStateChange])

  const ready = state === 'ready'
  const note = placeholderCopy(state)

  return (
    <div
      ref={wrapperRef}
      className={[styles.frame, className].filter(Boolean).join(' ')}
      style={
        {
          '--video-position-desktop': video.focalPointDesktop,
          '--video-position-mobile': video.focalPointMobile,
        } as CSSProperties
      }
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
          src={video.src}
          {...(video.poster ? { poster: video.poster } : null)}
          // Real pixel dimensions, so the intrinsic ratio is known even
          // before metadata arrives.
          width={video.width}
          height={video.height}
          // Nothing is scrubbed, so metadata is all that is needed up front;
          // the hero is the exception because it paints first.
          preload={video.eager ? 'auto' : 'metadata'}
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
          <span className="visually-hidden"> video: {video.description}</span>
        </button>
      ) : null}
    </div>
  )
}
