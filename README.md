# Pitcher of Life — RO System Landing Page

A cinematic, scroll-driven product page for the **Pitcher of Life Alkaline
Reverse Osmosis Water System** ($697). React + TypeScript + Vite, with GSAP
ScrollTrigger driving the scroll story. No UI framework, no CSS framework, no
animation library beyond GSAP.

---

## Run it

```sh
npm install
npm run dev        # http://localhost:5173
```

The page runs with **no video files present** — every section falls back to a
composed placeholder. Add the films whenever they are ready.

Other scripts:

```sh
npm run typecheck  # tsc, no emit
npm run build      # tsc -b && vite build  → dist/
npm run preview    # serve the production build locally
```

---

## 1. The videos

All eight files are present in `public/videos/` and integrated.
`src/data/videoManifest.ts` is the single source of truth for each clip's
measured properties and its playback behaviour, and is the only place to
change how a video behaves.

Measured from the file headers:

| File | Duration | Resolution | Aspect | Size | Frames | Keyframes | Playback |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `01-hero.mp4` | 8.00s | 1280×720 | 16:9 | 2.31 MB | 192 | 1 | loop (eager) |
| `02-system-open.mp4` | 5.17s | 1344×768 | 7:4 | 1.37 MB | 124 | 1 | once + hold |
| `03-filtration.mp4` | 5.17s | 1344×768 | 7:4 | 1.58 MB | 124 | 1 | once + hold |
| `04-water-flow.mp4` | 5.17s | 1344×768 | 7:4 | 1.94 MB | 124 | 1 | loop |
| `05-tankless.mp4` | 5.17s | 1344×768 | 7:4 | 1.54 MB | 124 | 1 | once + hold |
| `06-mineralization.mp4` | 5.17s | 1344×768 | 7:4 | 1.89 MB | 124 | 1 | once + hold |
| `07-lifestyle.mp4` | 5.17s | 1344×768 | 7:4 | 1.60 MB | 124 | 1 | loop |
| `08-final.mp4` | 5.17s | 1344×768 | 7:4 | 1.48 MB | 124 | 1 | once + hold |

All are H.264 at 24 fps with faststart applied.

### Why nothing is scroll-scrubbed

Every file holds exactly **one keyframe**. Seeking to any point forces the
decoder to replay from frame zero, so scrubbing a clip against scroll
position stutters — badly on phones. No section scrubs as a result,
including sections 02 and 03 where it was originally planned.

To enable scrubbing, re-export with frequent keyframes and flip
`scrubEligible` in the manifest:

```sh
ffmpeg -i source.mov -an -c:v libx264 -crf 22 -g 5 \
  -pix_fmt yuv420p -movflags +faststart 02-system-open.mp4
```

The scrub implementation was removed rather than left as dead code; it is
recoverable from git history (`src/hooks/useVideoScrub.ts`, removed in the
video-integration commit).

### Two things worth fixing at the source

1. **Keyframes** — as above, for section 02.
2. **Audio** — all eight carry an `mp4a` track and all play muted. `-an`
   removes bytes nobody will ever hear.

### Mobile framing

Sources are 1.75:1 landscape; a phone viewport is roughly 0.46:1. A tall
portrait crop would discard more than half of every frame, so contained
sections use a 3:2 box on phones (widening to 4:5 and then 3:4 on larger
screens). Only the hero and the closing section crop to full bleed, where
per-breakpoint focal points in the manifest pull the crop toward the product.
Nothing is ever stretched — `object-fit: cover` throughout.

## 2. Poster images — still outstanding

Put one still per video in **`public/posters/`**, same name with `.jpg`:

```
01-hero.jpg  02-system-open.jpg  …  08-final.jpg
```

**None of the eight posters exist yet**, and they could not be generated in
the build environment — it has no H.264 decoder. Until they are added, each
section falls back to its composed placeholder, which is a designed state
rather than a broken one, so nothing is visibly wrong. Generate them locally
with the command above and set the `poster` field for each entry in
`src/data/videoManifest.ts` (all eight are currently `null`).

`01-hero.jpg` is preloaded from `index.html` (it is the largest contentful
paint) — keep it under about 150 KB.

## 3. Where the Shopify variant ID goes

**`src/data/product.ts`** — one line:

```ts
export const SHOPIFY_VARIANT_ID = 'TODO_VERIFY_VARIANT_ID'
```

Replace it with the numeric variant ID for the RO system. You can find it in
Shopify admin under the product's variant, or by opening
`https://pitcheroflife.com/products/ro-system.js` in a browser and reading
`variants[0].id`.

Until a real numeric ID is set, **Add to Cart does not fake a purchase** — it
sends the shopper to the live product page. Once the ID is in place,
`src/lib/cart.ts` picks the right path automatically:

| Where the page is served | What Add to Cart does |
| --- | --- |
| On `pitcheroflife.com` | `POST /cart/add.js` (Shopify's native AJAX Cart API), then `/cart` |
| Anywhere else | Shopify cart permalink `/cart/<variant>:<qty>` |
| Variant ID not set | Redirect to the product page |

Price, product name and store URLs also live in `src/data/product.ts`. Nothing
else in the app hardcodes them.

## 4. Build for production

```sh
npm run build      # → dist/
npm run preview
```

`dist/` is a static bundle — deploy it to any static host, or serve it from
the Shopify domain (a proxy route or a theme page) to get the native cart
path above.

---

## Product data rules

Every figure on the page comes from the data layer, never from markup:

| File | Holds |
| --- | --- |
| `src/data/product.ts` | Name, price, Shopify identifiers |
| `src/data/specs.ts` | All specifications, grouped |
| `src/data/content.ts` | Section copy, video map, journey steps, minerals |
| `src/data/trust.ts` | Warranty, shipping, returns, support |
| `src/data/reviews.ts` | Reviews (currently placeholders) |
| `src/data/faq.ts` | FAQ questions and answers |

**Unverified values are never invented.** A spec whose value is `TODO_VERIFY`
renders as "Pending verification" in the UI, and the specifications section
prints a count of how many are outstanding. Currently pending:

- Certifications (NSF/ANSI or equivalent — do not publish a certification
  claim until confirmed in writing)
- Dimensions
- Installation requirements
- Production rate (GPD)
- Water efficiency / pure-to-drain ratio
- Return window, support channels

Verified and in use: 5-stage reverse osmosis, up to 98% contaminant
reduction, calcium/magnesium/potassium mineralization, pH 8–9, tankless
under-counter design, 6–12 month filter life, lifetime warranty, 100%
satisfaction guarantee, free shipping to the contiguous 48 states.

The page makes **no health, medical or therapeutic claims**, and the footer
says so explicitly. Keep it that way.

The FAQ follows the same rule in a stricter form: a question whose `answer`
is `null` is **not rendered at all**. A shopper is never shown "we don't
know" — the question stays in `src/data/faq.ts` so the gap is tracked, and a
development-only note on the page lists what is still withheld. Six questions
are currently held back: production rate (GPD), certification, water
efficiency, self-installation, dimensions, and the return window.

Reviews in `src/data/reviews.ts` are **placeholders** and are labelled as such
on the page while `REVIEWS_ARE_PLACEHOLDER` is `true`. The `Review` type
mirrors what Judge.me / Loox / Okendo return, so going live is a data-layer
swap — no component changes.

---

## Page structure

The sections run as one sales narrative, in this order:

| # | Section | Component |
| --- | --- | --- |
| 1 | Hero | `Hero` |
| 2 | Problem | `ProblemSection` |
| 3 | Purification | `SystemReveal` |
| 4 | RO technology | `FiltrationSection`, `WaterJourney` |
| 5 | Why this system | `TanklessSection`, `MineralizationSection` |
| 6 | Product experience | `LifestyleSection` |
| 7 | Proof | `SpecsSection`, `TrustSection`, `ReviewsSection` |
| 8 | Offer | `OfferSection` |
| 9 | FAQ | `FaqSection` |
| 10 | Final CTA | `FinalCTA` |

Purchase points: the hero, the offer panel, the final CTA, and the sticky bar
that rides from the end of the hero to the offer. The sticky bar stands down
whenever a full-size Add to Cart is already on screen, so the two never
compete.

## Architecture

```
src/
├── components/     one component + one CSS module per section
├── data/           product facts — the only place values are defined
├── hooks/          scroll and video behaviour
├── lib/            cart.ts (Shopify), gsap.ts (plugin registration)
└── styles/         tokens.css (design system), global.css
```

### The video pipeline

All eight videos go through one primitive, `CinematicVideo`, backed by
`useLazyVideo`:

- **No `src` is attached** until the section is within 60% of a viewport
  height. The page never pulls eight files at load; the hero is the only
  eager one.
- Playback **pauses** when a section leaves the viewport, and when the tab is
  hidden — off-screen video never burns battery or decoder memory.
- A **missing file** resolves to `unavailable` and the section renders its
  placeholder. Nothing breaks.
- `prefers-reduced-motion` **suppresses autoplay entirely** and shows a
  Play/Pause control instead.

### Motion

`useVideoScrub` pins section 2 and maps scroll progress onto the video's
`currentTime`, throttled to one seek per animation frame. It is deliberately
**desktop-only and gated on the video being ready** — on phones, and when the
file is absent, the same section degrades to a normal scrollable panel with an
ambient loop. `useRevealOnScroll` handles the quieter fade-and-rise used
everywhere else, and is a no-op under reduced motion.

### Accessibility

Semantic landmarks and heading order, a skip link, visible focus rings on
every interactive element (never removed), `aria-label` on the cart controls,
decorative videos hidden from assistive tech, the sticky bar marked `inert`
while off-screen, and full reduced-motion support in both JS and CSS.
