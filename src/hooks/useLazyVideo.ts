import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { useReducedMotion } from './useReducedMotion'
import type { Playback } from '../data/videoManifest'

export type VideoState =
  /** Not close enough to the viewport to be worth a network request. */
  | 'idle'
  /** Source attached, bytes in flight. */
  | 'loading'
  /** Enough data buffered to paint a frame. */
  | 'ready'
  /** The file is missing or could not be decoded. Show the placeholder. */
  | 'unavailable'

interface Options {
  /**
   * How far outside the viewport the clip starts loading. Wide enough that
   * playback has begun by the time the section is read, tight enough that
   * the eight files are never in flight together.
   */
  loadMargin?: string
  /** Load and play immediately — the hero only. */
  eager?: boolean
  /** `loop` runs continuously; `once` plays a single pass and holds. */
  playback?: Playback
  externalVideoRef?: RefObject<HTMLVideoElement | null>
}

interface LazyVideo {
  videoRef: RefObject<HTMLVideoElement | null>
  wrapperRef: RefObject<HTMLDivElement | null>
  state: VideoState
  armed: boolean
  /** Reduced motion is on, so playback is user-initiated. */
  manualPlayback: boolean
  isPlaying: boolean
  /** A `once` clip has finished and is holding its last frame. */
  hasCompleted: boolean
  togglePlayback: () => void
}

/**
 * Loading and playback policy for every clip on the page.
 *
 *  - no `src` is attached until the section is near the viewport, so the page
 *    never pulls all eight files;
 *  - `once` clips play a single pass on entry and hold their final frame,
 *    replaying only if the reader leaves and comes back;
 *  - playback pauses when the section leaves the viewport and when the tab is
 *    hidden, so an off-screen clip never burns battery or decoder memory;
 *  - a missing file resolves to `unavailable` and the section still renders;
 *  - `prefers-reduced-motion` suppresses autoplay entirely and exposes a
 *    play control instead.
 */
export function useLazyVideo({
  loadMargin = '50% 0px',
  eager = false,
  playback = 'loop',
  externalVideoRef,
}: Options): LazyVideo {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const internalVideoRef = useRef<HTMLVideoElement | null>(null)
  const videoRef = externalVideoRef ?? internalVideoRef
  const reducedMotion = useReducedMotion()

  const [armed, setArmed] = useState(eager)
  const [visible, setVisible] = useState(eager)
  const [state, setState] = useState<VideoState>(eager ? 'loading' : 'idle')
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)

  const manualPlayback = reducedMotion
  const [userRequestedPlay, setUserRequestedPlay] = useState(false)

  // --- Decide when to fetch, and when the section is on screen -------------
  useEffect(() => {
    if (eager) return
    const element = wrapperRef.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setArmed(true)
      setVisible(true)
      return
    }

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setArmed(true)
          loadObserver.disconnect()
        }
      },
      { rootMargin: loadMargin },
    )

    const playObserver = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.2 },
    )

    loadObserver.observe(element)
    playObserver.observe(element)
    return () => {
      loadObserver.disconnect()
      playObserver.disconnect()
    }
  }, [eager, loadMargin])

  useEffect(() => {
    if (armed) setState((current) => (current === 'idle' ? 'loading' : current))
  }, [armed])

  // A `once` clip that the reader has scrolled away from is rearmed, so it
  // plays again if they come back rather than sitting on a stale last frame.
  useEffect(() => {
    if (!visible) setHasCompleted(false)
  }, [visible])

  // --- Track readiness ------------------------------------------------------
  useEffect(() => {
    const video = videoRef.current
    if (!video || !armed) return

    const onReady = () => setState('ready')
    const onError = () => setState('unavailable')
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => setHasCompleted(true)

    if (video.readyState >= 2) setState('ready')

    video.addEventListener('loadeddata', onReady)
    video.addEventListener('canplay', onReady)
    video.addEventListener('error', onError)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onEnded)
    return () => {
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('canplay', onReady)
      video.removeEventListener('error', onError)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onEnded)
    }
  }, [armed, videoRef])

  // --- Play / pause against viewport visibility -----------------------------
  useEffect(() => {
    const video = videoRef.current
    if (!video || state !== 'ready') return

    const wantsPlayback =
      visible && !hasCompleted && (manualPlayback ? userRequestedPlay : true)

    if (wantsPlayback) {
      // A finished `once` clip stays on its last frame until the reader
      // leaves and returns, which clears `hasCompleted`.
      if (playback === 'once' && video.ended) return
      void video.play().catch(() => setIsPlaying(false))
    } else if (!video.paused) {
      video.pause()
    }
  }, [visible, state, manualPlayback, userRequestedPlay, hasCompleted, playback, videoRef])

  // Free the decoder when the tab is hidden.
  useEffect(() => {
    const onVisibilityChange = () => {
      const video = videoRef.current
      if (!video) return
      if (document.hidden && !video.paused) video.pause()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [videoRef])

  // Keep the loop flag in sync without re-rendering the element.
  useEffect(() => {
    const video = videoRef.current
    if (video) video.loop = playback === 'loop'
  }, [playback, armed, videoRef])

  const togglePlayback = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      setUserRequestedPlay(true)
      setHasCompleted(false)
      if (video.ended) video.currentTime = 0
      void video.play().catch(() => setIsPlaying(false))
    } else {
      setUserRequestedPlay(false)
      video.pause()
    }
  }, [videoRef])

  return {
    videoRef,
    wrapperRef,
    state,
    armed,
    manualPlayback,
    isPlaying,
    hasCompleted,
    togglePlayback,
  }
}
