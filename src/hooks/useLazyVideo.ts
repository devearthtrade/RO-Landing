import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { useReducedMotion } from './useReducedMotion'

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
   * How far outside the viewport the video starts loading. Generous enough
   * that playback has begun by the time the section is read, tight enough
   * that we never have all eight files in flight at once.
   */
  loadMargin?: string
  /** Load and play immediately — used only by the hero. */
  eager?: boolean
  /** Keep the video paused; the caller drives `currentTime` itself. */
  scrub?: boolean
  loop?: boolean
  /**
   * Lets a parent share the same element — the pinned reveal needs to seek
   * the video that this hook is managing.
   */
  externalVideoRef?: RefObject<HTMLVideoElement | null>
}

interface LazyVideo {
  videoRef: RefObject<HTMLVideoElement | null>
  /** Wrapper element that is observed. */
  wrapperRef: RefObject<HTMLDivElement | null>
  state: VideoState
  /** Only true once we have decided to fetch; drives the `src` attribute. */
  armed: boolean
  /** Reduced motion is on, so playback is user-initiated. */
  manualPlayback: boolean
  isPlaying: boolean
  togglePlayback: () => void
}

/**
 * Loading and playback policy for every video on the page.
 *
 * The rules this enforces:
 *   - no `src` is attached until the section is near the viewport, so the page
 *     never pulls eight files at load;
 *   - playback is paused whenever the section leaves the viewport, so an
 *     off-screen video never burns battery or decoder memory;
 *   - a missing file resolves to `unavailable` and the section still renders;
 *   - `prefers-reduced-motion` suppresses autoplay entirely and exposes a
 *     play control instead.
 */
export function useLazyVideo({
  loadMargin = '60% 0px',
  eager = false,
  scrub = false,
  loop = true,
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

  // Reduced motion means the user asks for playback explicitly.
  const manualPlayback = reducedMotion && !scrub
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
      { threshold: 0.15 },
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

  // --- Track readiness ------------------------------------------------------
  useEffect(() => {
    const video = videoRef.current
    if (!video || !armed) return

    const onReady = () => setState('ready')
    const onError = () => setState('unavailable')
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    // The element may already have data by the time the listener attaches.
    if (video.readyState >= 2) setState('ready')

    video.addEventListener('loadeddata', onReady)
    video.addEventListener('error', onError)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    return () => {
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('error', onError)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [armed])

  // --- Play / pause against viewport visibility -----------------------------
  useEffect(() => {
    const video = videoRef.current
    if (!video || state !== 'ready') return
    // Scrubbed videos are positioned by ScrollTrigger, never played.
    if (scrub) return

    const wantsPlayback = visible && (manualPlayback ? userRequestedPlay : true)

    if (wantsPlayback) {
      // Autoplay can still be refused (low power mode); failure is not fatal.
      void video.play().catch(() => setIsPlaying(false))
    } else if (!video.paused) {
      video.pause()
    }
  }, [visible, state, scrub, manualPlayback, userRequestedPlay])

  // Free the decoder when the tab is hidden.
  useEffect(() => {
    const onVisibilityChange = () => {
      const video = videoRef.current
      if (!video) return
      if (document.hidden && !video.paused) video.pause()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  // Keep the loop flag in sync without re-rendering the element.
  useEffect(() => {
    const video = videoRef.current
    if (video) video.loop = loop && !scrub
  }, [loop, scrub, armed])

  const togglePlayback = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      setUserRequestedPlay(true)
      void video.play().catch(() => setIsPlaying(false))
    } else {
      setUserRequestedPlay(false)
      video.pause()
    }
  }, [])

  return {
    videoRef,
    wrapperRef,
    state,
    armed,
    manualPlayback,
    isPlaying,
    togglePlayback,
  }
}
