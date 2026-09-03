# Poster images

One still per video, matching the video's filename with a `.jpg` extension:

```
01-hero.jpg
02-system-open.jpg
03-filtration.jpg
04-water-flow.jpg
05-tankless.jpg
06-mineralization.jpg
07-lifestyle.jpg
08-final.jpg
```

The poster is what the reader sees before the video decodes its first frame,
and it is what stands in on a connection too slow to start playback. Export
the first frame of each clip:

```sh
ffmpeg -i ../videos/01-hero.mp4 -frames:v 1 -q:v 3 01-hero.jpg
```

`01-hero.jpg` is preloaded from `index.html` because it is the page's largest
contentful paint — keep it well compressed (under ~150 KB).

A missing poster is not an error: the section's placeholder is shown instead.
