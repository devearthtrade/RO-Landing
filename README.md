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

## 1. Where the videos go

Put the eight `.mp4` files in **`public/videos/`** using these exact names:

| File | Section |
| --- | --- |
| `01-hero.mp4` | Hero |
| `02-system-open.mp4` | What's happening inside? |
| `03-filtration.mp4` | Engineered filtration |
| `04-water-flow.mp4` | Follow the water |
| `05-tankless.mp4` | More technology. Less space. |
| `06-mineralization.mp4` | Purified. Then remineralized. |
| `07-lifestyle.mp4` | Better water belongs in your home. |
| `08-final.mp4` | Your water. Upgraded. |

The eight files are committed to this repo (~14 MB total).
`public/videos/README.md` has the encoding recipe and the measured state of
the current files. Two things matter most:

- Encode with `-movflags +faststart` so playback can begin before the whole
  file arrives. Without it, `preload="metadata"` has to fetch the entire
  video just to read its duration, which defeats the lazy-loading below.
- `02-system-open.mp4` is **scrubbed by scroll position**, which means the
  browser seeks it constantly. Give it dense keyframes (`-g 5`), or the
  scrub will stutter. The current export has a single keyframe; the page
  detects slow seeking and falls back to playback, but the scroll-driven
  reveal needs a re-export to work as designed.

## 2. Where the poster images go

Put one still per video in **`public/posters/`**, same name with `.jpg`:

```
01-hero.jpg  02-system-open.jpg  …  08-final.jpg
```

The poster is what shows before the video decodes and on slow connections.
`01-hero.jpg` is preloaded from `index.html` (it is the largest contentful
paint) — keep it under about 150 KB. Missing posters are not an error.

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
