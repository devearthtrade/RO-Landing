/**
 * VIDEO MANIFEST
 *
 * Measured directly from the MP4 headers of the files in `public/videos`
 * (2026-09-04). Nothing here is estimated.
 *
 * ── The finding that drives everything below ──────────────────────────────
 *
 * Every one of the eight files contains exactly ONE keyframe: its first
 * frame. 192 frames in the hero, 124 in the rest, one I-frame each.
 *
 * That makes frame-accurate scroll scrubbing unusable. Seeking to 60% of a
 * clip forces the decoder to replay every frame from the start, so a
 * scroll-scrubbed section stutters badly — worst on the phones where the
 * effect matters least. None of the eight is scroll-scrubbed as a result,
 * including 02 and 03. They can be, once re-exported with `-g 5`; the
 * `scrubEligible` flag records that.
 *
 * ── What could NOT be measured here ───────────────────────────────────────
 *
 * This environment has no H.264 decoder (Playwright's bundled ffmpeg has no
 * mp4 demuxer, no system ffmpeg, PyPI blocked), so not a single frame could
 * be rendered. Two things therefore need a human eye and are `null` below,
 * not guessed: whether each clip's OPENING frame sits well against the
 * preceding section, and whether its CLOSING frame sits well against the
 * next. `playback` values are chosen to be safe under either answer — see
 * the note on each entry.
 */

export type Playback =
  /** Loops continuously while on screen. Only for clips that read as ambient. */
  | 'loop'
  /** Plays once on entry and holds its final frame. Never looks broken. */
  | 'once'

export interface VideoManifestEntry {
  id: string
  src: string
  poster: string | null
  /** Short description of the shot, for the accessible label. */
  description: string

  // ---- Measured ----------------------------------------------------------
  durationSeconds: number
  width: number
  height: number
  /** width / height, used to reserve layout space and stop shift. */
  ratio: number
  aspectLabel: string
  fileSizeMB: number
  frames: number
  keyframes: number
  fps: number
  /** All eight carry an audio track despite being played muted. */
  hasAudioTrack: boolean

  // ---- Behaviour ---------------------------------------------------------
  playback: Playback
  /** Load and play immediately rather than waiting for the viewport. */
  eager: boolean
  /** True only once the clip is re-exported with frequent keyframes. */
  scrubEligible: boolean
  /** `object-position` on wide screens. */
  focalPointDesktop: string
  /** `object-position` on portrait screens, where the crop is severe. */
  focalPointMobile: string

  // ---- Needs a human eye -------------------------------------------------
  /** Does the first frame sit well against the previous section? */
  openingFrameFits: boolean | null
  /** Does the last frame sit well against the next section? */
  closingFrameFits: boolean | null
}

/**
 * Sources are 1.75:1 and 1.78:1 landscape. A phone viewport is roughly
 * 0.46:1, so any full-height portrait crop discards more than half the
 * frame. Contained sections therefore use a 3:2 box on mobile rather than a
 * tall one — see `VideoSection.module.css`. Only the hero and the closing
 * section crop to full bleed, where the focal points below pull the crop
 * toward the product rather than the empty edges.
 */
export const VIDEO_MANIFEST: Record<string, VideoManifestEntry> = {
  hero: {
    id: '01-hero',
    src: '/videos/01-hero.mp4',
    poster: null, // TODO: no decoder available here — see README.
    description: 'The Pitcher of Life reverse osmosis system in a modern kitchen',
    durationSeconds: 8.0,
    width: 1280,
    height: 720,
    ratio: 1280 / 720,
    aspectLabel: '16:9',
    fileSizeMB: 2.31,
    frames: 192,
    keyframes: 1,
    fps: 24,
    hasAudioTrack: true,
    // Ambient establishing shot: looping is the right read, and the only
    // clip loaded eagerly because it is the largest contentful paint.
    playback: 'loop',
    eager: true,
    scrubEligible: false,
    focalPointDesktop: '50% 50%',
    focalPointMobile: '62% 46%',
    openingFrameFits: null,
    closingFrameFits: null,
  },

  systemOpen: {
    id: '02-system-open',
    src: '/videos/02-system-open.mp4',
    poster: null,
    description: 'The system opening to reveal its internal filter stack',
    durationSeconds: 5.17,
    width: 1344,
    height: 768,
    ratio: 1344 / 768,
    aspectLabel: '7:4',
    fileSizeMB: 1.37,
    frames: 124,
    keyframes: 1,
    fps: 24,
    hasAudioTrack: true,
    // A reveal has a start state and an end state. Looping it would snap the
    // system shut again on every cycle, so it plays once and holds open.
    // This is also the clip the brief suggested scrubbing; see the header.
    playback: 'once',
    eager: false,
    scrubEligible: false,
    focalPointDesktop: '50% 50%',
    focalPointMobile: '55% 45%',
    openingFrameFits: null,
    closingFrameFits: null,
  },

  filtration: {
    id: '03-filtration',
    src: '/videos/03-filtration.mp4',
    poster: null,
    description: 'Close detail of the filtration stages',
    durationSeconds: 5.17,
    width: 1344,
    height: 768,
    ratio: 1344 / 768,
    aspectLabel: '7:4',
    fileSizeMB: 1.58,
    frames: 124,
    keyframes: 1,
    fps: 24,
    hasAudioTrack: true,
    // Reads as a process with a destination. Held rather than looped, which
    // is safe whether it ends on a resolved frame or mid-motion.
    playback: 'once',
    eager: false,
    scrubEligible: false,
    focalPointDesktop: '50% 45%',
    focalPointMobile: '50% 45%',
    openingFrameFits: null,
    closingFrameFits: null,
  },

  waterFlow: {
    id: '04-water-flow',
    src: '/videos/04-water-flow.mp4',
    poster: null,
    description: 'Water travelling through the system to the faucet',
    durationSeconds: 5.17,
    width: 1344,
    height: 768,
    ratio: 1344 / 768,
    aspectLabel: '7:4',
    fileSizeMB: 1.94,
    frames: 124,
    keyframes: 1,
    fps: 24,
    hasAudioTrack: true,
    // Flowing water is continuous by nature, so a loop reads correctly even
    // if the cut point is not seamless.
    playback: 'loop',
    eager: false,
    scrubEligible: false,
    focalPointDesktop: '50% 50%',
    focalPointMobile: '50% 50%',
    openingFrameFits: null,
    closingFrameFits: null,
  },

  tankless: {
    id: '05-tankless',
    src: '/videos/05-tankless.mp4',
    poster: null,
    description: 'The tankless unit compared with a tank-based system',
    durationSeconds: 5.17,
    width: 1344,
    height: 768,
    ratio: 1344 / 768,
    aspectLabel: '7:4',
    fileSizeMB: 1.54,
    frames: 124,
    keyframes: 1,
    fps: 24,
    hasAudioTrack: true,
    // A comparison resolves to a state worth holding on.
    playback: 'once',
    eager: false,
    scrubEligible: false,
    focalPointDesktop: '50% 50%',
    focalPointMobile: '50% 50%',
    openingFrameFits: null,
    closingFrameFits: null,
  },

  mineralization: {
    id: '06-mineralization',
    src: '/videos/06-mineralization.mp4',
    poster: null,
    description: 'Minerals being reintroduced to purified water',
    durationSeconds: 5.17,
    width: 1344,
    height: 768,
    ratio: 1344 / 768,
    aspectLabel: '7:4',
    fileSizeMB: 1.89,
    frames: 124,
    keyframes: 1,
    fps: 24,
    hasAudioTrack: true,
    // A transformation: water goes from stripped to remineralized. Holding
    // the finished state is the point.
    playback: 'once',
    eager: false,
    scrubEligible: false,
    focalPointDesktop: '50% 50%',
    focalPointMobile: '50% 50%',
    openingFrameFits: null,
    closingFrameFits: null,
  },

  lifestyle: {
    id: '07-lifestyle',
    src: '/videos/07-lifestyle.mp4',
    poster: null,
    description: 'The system in everyday use at home',
    durationSeconds: 5.17,
    width: 1344,
    height: 768,
    ratio: 1344 / 768,
    aspectLabel: '7:4',
    fileSizeMB: 1.6,
    frames: 124,
    keyframes: 1,
    fps: 24,
    hasAudioTrack: true,
    // Ambient domestic scene — the quietest section on the page, and the one
    // place a gentle loop is the right texture.
    playback: 'loop',
    eager: false,
    scrubEligible: false,
    focalPointDesktop: '55% 50%',
    focalPointMobile: '55% 50%',
    openingFrameFits: null,
    closingFrameFits: null,
  },

  final: {
    id: '08-final',
    src: '/videos/08-final.mp4',
    poster: null,
    description: 'The finished system and drinking-water faucet',
    durationSeconds: 5.17,
    width: 1344,
    height: 768,
    ratio: 1344 / 768,
    aspectLabel: '7:4',
    fileSizeMB: 1.48,
    frames: 124,
    keyframes: 1,
    fps: 24,
    hasAudioTrack: true,
    // Plays once and holds, so the closing frame sits still behind the price
    // and the Add to Cart rather than moving under them.
    playback: 'once',
    eager: false,
    scrubEligible: false,
    focalPointDesktop: '50% 50%',
    focalPointMobile: '58% 45%',
    openingFrameFits: null,
    closingFrameFits: null,
  },
}

export const ALL_VIDEOS = Object.values(VIDEO_MANIFEST)

/** Total bytes if every clip were fetched. The page never does this. */
export const TOTAL_PAYLOAD_MB = Number(
  ALL_VIDEOS.reduce((sum, v) => sum + v.fileSizeMB, 0).toFixed(2),
)

/** Clips whose encode still blocks scroll scrubbing. */
export const NOT_SCRUB_ELIGIBLE = ALL_VIDEOS.filter((v) => !v.scrubEligible)

/** Clips shipping without a poster image. */
export const MISSING_POSTERS = ALL_VIDEOS.filter((v) => v.poster === null)
