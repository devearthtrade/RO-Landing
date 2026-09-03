# Videos

Drop the eight product films here, using these exact filenames:

| File | Section |
| --- | --- |
| `01-hero.mp4` | Hero |
| `02-system-open.mp4` | What's happening inside? (scroll-scrubbed) |
| `03-filtration.mp4` | Engineered filtration |
| `04-water-flow.mp4` | Follow the water |
| `05-tankless.mp4` | More technology. Less space. |
| `06-mineralization.mp4` | Purified. Then remineralized. |
| `07-lifestyle.mp4` | Better water belongs in your home. |
| `08-final.mp4` | Your water. Upgraded. |

The page renders correctly with any or all of these missing — each section
falls back to a composed placeholder rather than a broken frame.

## Encoding

- H.264 (High profile) in an MP4 container, AAC or no audio track. Every
  video is muted, so an audio track is dead weight — strip it.
- Put the `moov` atom at the front so playback can start before the whole
  file arrives: `-movflags +faststart`.
- `02-system-open.mp4` is scrubbed by scroll position. Seeking is only smooth
  with frequent keyframes — encode it with a keyframe interval of about 1–5
  frames (`-g 5`), and keep it short (4–8 seconds) and modest in bitrate.
- Target roughly 1080p and a few MB per file. These are ambient loops, not
  feature films, and the page loads several of them.

Example:

```sh
ffmpeg -i source.mov -an -c:v libx264 -profile:v high -crf 23 \
  -pix_fmt yuv420p -movflags +faststart 01-hero.mp4

# scrubbed video: dense keyframes
ffmpeg -i source.mov -an -c:v libx264 -profile:v high -crf 22 -g 5 \
  -pix_fmt yuv420p -movflags +faststart 02-system-open.mp4
```

## Status of the committed files

Measured directly from the MP4 headers of the eight files in this directory:

| Property | State |
| --- | --- |
| Container / codec | MP4, H.264 (`avc1`) — correct |
| Duration | 8.0s (hero), 5.17s (all others) |
| `moov` position | **Fixed.** Was after `mdat` on all eight; losslessly remuxed so the header loads first |
| Keyframes | **1 per file.** Needs re-export — see below |
| Audio track | An `mp4a` track is present on all eight |

Two things are worth correcting at the source, in whatever exports these:

1. **Keyframes.** Every file currently contains exactly one keyframe (its
   first frame). For the seven clips that simply loop, that is harmless. For
   `02-system-open.mp4`, which is scrubbed by scroll position, it means the
   decoder replays from frame 0 on every seek. The page detects this at
   runtime and falls back to ordinary playback rather than stuttering, but
   the scroll-driven reveal only works as designed once the clip is
   re-exported with `-g 5`.

2. **Audio.** Every video on the page is muted, so the `mp4a` track is
   bytes nobody will ever hear. `-an` removes it.

Both are single flags on the export — see the commands above. Re-exporting
also restores `+faststart`, which the remux applied by hand this time.
