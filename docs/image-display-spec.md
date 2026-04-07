# ArtyParty — Image Display Design Specification
**Version:** 1.0  
**Date:** 2026-04-07  
**Author:** Web Designer  
**Status:** Ready for implementation

---

## Executive Summary

After reviewing every photo in the library and every image container on the site, the problem is clear and consistent: almost all ArtyParty photos are portrait orientation (taller than wide, roughly 3:4 or narrower). The site currently forces all of them into fixed-height landscape containers with `object-fit: cover`, which crops out the majority of each photo.

The damage is severe:
- Hero slideshow images lose their top and bottom — children's faces are cropped
- Service cards show a sliver of the image center — the creative work is invisible
- Gallery grids crop away 40–60% of each portrait photo
- About/founder photo: the person's body is sliced away

**Core principle for all solutions:** Never fight the photos. Design containers that respect portrait geometry. It is always better to show the full photo with neutral background fill than to crop out the subject.

---

## Photo Orientation Audit

Based on direct review of the actual image files:

| Photo set | Orientation | Approx. ratio | Notes |
|---|---|---|---|
| Hero slideshow (12 slides) | Portrait | ~3:4 | All portrait; overhead/action shots |
| Service card: Art Class | Portrait | ~3:4 | Overhead of drawing table |
| Service card: Birthday Workshop | Square-ish | ~1:1 | Terrarium jar — nearly square |
| Service card: Holiday Camp | Portrait | ~3:4 | Girls in aprons, portrait |
| Service card: Fun Day | Portrait | ~3:4 | Group at outdoor table |
| Birthday: Cabin main image | Portrait | ~3:4 | Miniature house, close-up |
| Birthday: Magic Forest main | Square | ~1:1 | Terrarium jar — square |
| Birthday: Nookbook main | Portrait | ~2:5 | Very tall — book nook between books |
| Art Class main image | Portrait | ~3:4 | Overhead of class table |
| Gallery: Camps | Portrait | ~3:4 | Nearly all portrait |
| Gallery: Fun Days | Portrait | ~3:4 | Nearly all portrait |
| Studio photos | Mixed | ~3:4 and some landscape | Studio interior shots, mostly portrait |
| Owner photo (About page) | Portrait | ~3:4 | Full-body street photo |
| Owner photo (Homepage teaser) | Portrait | ~3:4 | Same photo |

**Key insight:** The Nookbook main image is extremely tall (roughly 2:5 ratio). The Magic Forest main is nearly square. Everything else is standard portrait. No solution can assume landscape.

---

## Solution 1 — Hero Slideshow (Homepage)

### Current problem
`.hero-split__image` has `height: 72vw; max-height: 340px; min-height: 260px` on mobile, and `height: auto` but constrained by `min-height: 520px` flexbox on tablet/desktop. The image inside uses `object-fit: cover` with `object-position: center 15%`. Portrait photos display only the center band — top of the frame (which often contains children's faces and creative work) is clipped.

### Design approach: Flexible-height image panel that follows the photo's natural ratio

The split layout (text panel + image panel side by side on tablet/desktop, stacked on mobile) should remain. The change is that the image panel must no longer enforce a fixed height. Instead, it respects the natural portrait ratio of the slides.

**On mobile (< 768px):**
- The image panel sits ABOVE the text panel (current order is correct)
- Remove `max-height: 340px` — it is the main culprit on mobile
- Change height to `auto` with `aspect-ratio: 3 / 4` on the image panel itself
- Set `min-height: none` — no minimum
- The image inside: `width: 100%; height: 100%; object-fit: contain; background-color: #FFF0ED;`
- Using `object-fit: contain` means the photo shows in full, pillarboxed or letterboxed against the Light Coral BG (#FFF0ED). This is the correct trade-off: a warm background color is visible on the sides or top/bottom, but the PHOTO is fully visible.
- On mobile, this panel will be approximately 375px wide × 500px tall — a tall panel that feels immersive and natural for portrait photos.

**On tablet (768px–1023px):**
- Side-by-side layout: text 52%, image 48%
- Image panel: `height: auto; min-height: none; align-self: stretch`
- The image panel stretches to match the text panel's height (flex default)
- Since text panel is typically 520px+ tall, the image panel is also 520px tall
- A 3:4 portrait image inside a roughly square/slightly-portrait panel looks excellent with `object-fit: contain` — very little letterboxing, photo shown in full
- Use `object-fit: contain; background-color: #FFF0ED;`

**On desktop (1024px+):**
- Same as tablet but text panel is taller (min-height: 580px)
- Image panel: `flex: 0 0 45%; align-self: stretch`
- `object-fit: contain; background-color: #FFF0ED`
- The image fills the panel naturally, the portrait fits well into the ~500–600px tall panel

**Special case — the Nookbook image (extremely tall ~2:5):**
This image is used inside the slideshow (it is `main.PNG` for the Cabin in the forest — actually it appears in the hero slides). With `object-fit: contain` it will have significant background fill on the sides, which is acceptable given the warm coral background. The alternative — `object-fit: cover` — destroys the photo entirely. `contain` wins.

**CSS approach — exact properties to change:**

```
/* Mobile */
.hero-split__image {
  height: auto;
  aspect-ratio: 3 / 4;
  min-height: none;
  max-height: none;
}

.hero-split__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  background-color: #FFF0ED;
}

/* Tablet+ — image panel stretches with flex, no forced height */
@media (min-width: 768px) {
  .hero-split__image {
    aspect-ratio: unset;
    height: auto;
    align-self: stretch;
  }
}
```

**Remove the `.hero-split__img--center` exception class** — it is no longer needed when using `contain`.

**Dot navigation:** Dots remain positioned at `inset-block-end: 12px` — no change needed. The dots sit over the image with their semi-transparent pill background, visible regardless of which part of the image is showing.

**Background color of image panel:** Keep `#FFF0ED` (Light Coral BG). This creates a soft warm backdrop for portrait images. When a portrait image has the `contain` letterboxing, the warm coral tint shows — matching the brand, not jarring.

**RTL notes:** No change to RTL logic. The image panel is the reading-end (left) side in RTL. The background fill color is the same on both sides.

**Hover animation:** Remove `transform: scale()` zoom on the slideshow images — since we are now showing the full photo, zooming in on hover would re-introduce cropping. The crossfade transition between slides is sufficient animation.

---

## Solution 2 — Service Cards (Homepage)

### Current problem
`.card__img` uses `height: 200px` (mobile), `height: 220px` (tablet), with `object-fit: cover`. Portrait photos are cropped to a landscape strip. The art class photo (overhead) shows only pencils. The fun day photo (group at table) shows only people's torsos.

### Design approach: Aspect-ratio containers, `object-fit: contain` with warm background

Replace fixed pixel heights with an `aspect-ratio` container that is portrait-friendly.

**Recommended aspect ratio:** 4:3 (landscape, but shallower than current)? No — since photos are 3:4 portrait, we should use a 3:4 container.

However, a fully portrait card image area creates very tall cards, which may look awkward in a 4-column grid on desktop. The right compromise is:

**Use `aspect-ratio: 3 / 4` on the image container, with `object-fit: contain` and a warm background.**

This means:
- On mobile (single column, card is full width): image area is 375px wide × ~500px tall. Card feels tall but this is correct for portrait photos.
- On tablet (2 columns): card is ~560px wide / 2 = ~270px wide (minus gap). Image area is 270px × 360px. Good.
- On desktop (4 columns): card is ~(1200px - 3×24px) / 4 = ~270px wide. Image area is 270px × 360px. Good — cards are tall but the content below (heading, body, CTA) still fits.

**Object-fit strategy for service cards:**
- `object-fit: contain` — the photo shows in full, any exposed background is the card's `background-color`
- Set `background-color: #FFF0ED` (Light Coral BG) on the image container for coral-accent cards, `background-color: #E8F6F6` (Light Teal BG) for the teal B2B card
- This uses brand colors as the fill, so it feels intentional rather than empty

**Magic Forest terrarium photo (nearly square 1:1):** In a 3:4 container with `object-fit: contain`, the square image will have strips of background at top and bottom. This is acceptable — the terrarium photo is the entire subject; showing it fully matters more than filling the frame.

**CSS approach — exact properties to change:**

```
/* Remove fixed heights from .card__img */
/* Remove: height: 200px; height: 220px; (all breakpoints) */

.card__image-wrap {
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background-color: #FFF0ED; /* warm background for portrait fill */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* B2B card (teal variant) */
.card--teal .card__image-wrap {
  background-color: #E8F6F6;
}

.card__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  display: block;
  border-radius: var(--radius-image) var(--radius-image) 0 0;
  /* Remove: height: 200px (and all breakpoint overrides) */
}
```

**No responsive overrides needed** for the image area once `aspect-ratio` is used — the ratio is maintained automatically at every width.

**RTL notes:** No change needed. `border-radius` on the top corners works identically in RTL.

---

## Solution 3 — Birthday Workshop Cards (birthday-workshops.html)

### Current problem
`.workshop-card__img` uses `height: 220px` (mobile), `260px` (desktop), with `object-fit: cover`. The Cabin in the Forest main image (portrait, close-up of a miniature house) and the Nookbook main image (extremely tall, 2:5) are heavily cropped. The Nookbook photo especially: at 220px height, you see only a tiny slice of the bookshelf scene.

### Design approach: Taller aspect-ratio container, `object-fit: contain`

Workshop cards are larger and more prominent than service cards. They sit 1 per column on mobile, 2 on tablet, 3 on desktop.

**Recommended approach:** `aspect-ratio: 3 / 4` with `object-fit: contain`

This gives the Nookbook image room to breathe. Even with the extremely tall ratio of the actual photo, `contain` will show the full scene within the 3:4 container with subtle background fill visible on the sides.

**Background fill:** `background-color: #FFF0ED` (Light Coral BG) for all workshop cards — consistent with the birthday page's coral tone.

**The gallery-hint badge:** Stays positioned `inset-block-end: 12px; inset-inline-start: 12px` — bottom corner of the image, visible regardless of what the photo shows.

**CSS approach — exact properties to change:**

```
/* Remove fixed heights from .workshop-card__img at all breakpoints */

.workshop-card__image-wrap {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 3 / 4;
  background-color: #FFF0ED;
  display: flex;
  align-items: center;
  justify-content: center;
}

.workshop-card__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  display: block;
  transition: transform 400ms ease;
  /* Remove: height: 220px; height: 260px; height: 160px; height: 200px; (all breakpoints) */
}
```

**Hover zoom:** `transform: scale(1.03)` on hover — keep this, but it now zooms slightly into the full photo without cropping.

**On mobile at 375px width with 1 column:** Card is full width. Image area is 375px × 500px. For the Nookbook photo (2:5 ratio), inside a 3:4 container, the photo fills the container height (500px) with the width shown at ~200px, leaving fill on both sides. This still fully reveals the bookshelf scene which is the entire point of the photo.

**Desktop 3-column layout:** Card is ~(1200px - 2×24px)/3 = ~384px wide. Image area is 384px × 512px. Still excellent for portrait photos.

---

## Solution 3b — Art Class Cards (art-classes.html)

### Current problem
Same as birthday workshop cards — `.workshop-card__img` with fixed heights. The art class main photo (overhead table shot, portrait) and drawing class photos (portrait) are cropped.

### Design approach
Identical to Solution 3. Apply the same `aspect-ratio: 3 / 4` with `object-fit: contain` and `background-color: #FFF0ED`.

The art classes page uses `.workshop-cards` with `--max-cols: 2` (2 cards, side by side on tablet+). With a 3:4 image area, this is fine — each card will be ~580px wide (half of 1200px minus gap), image area ~580px × 773px. That is a large, generous, beautiful portrait display.

**No additional changes** beyond what Solution 3 specifies.

---

## Solution 4 — Gallery Grids (Camps, Fun Days pages)

### Current problem
`.gallery-grid` uses `grid-template-columns: repeat(2, 1fr)` on mobile, 3 on tablet, and `.gallery-item img` has fixed `height: 160px` (mobile), `200px` (tablet), `220px` (desktop) with `object-fit: cover`. Portrait photos are heavily cropped — at 160px height for a 3:4 photo, you are seeing approximately 30% of the image.

### Design approach: Masonry-style layout using CSS Grid `grid-auto-rows` + `aspect-ratio`

There are two valid approaches for gallery grids with portrait photos. I recommend Approach A (simpler, more consistent) but describe both.

**Approach A (Recommended): Fixed portrait-ratio grid items**

Remove fixed heights from `gallery-item img`. Instead, give each `gallery-item` a consistent `aspect-ratio: 3 / 4`. Images fill their container with `object-fit: contain` and a warm background.

The grid remains `repeat(2, 1fr)` on mobile and `repeat(3, 1fr)` on tablet/desktop. All cells are tall (portrait). The layout is uniform, organized, and shows every photo completely.

```
.gallery-item {
  border-radius: var(--radius-image);
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background-color: #FFF0ED; /* warm fill behind portrait photos */
  aspect-ratio: 3 / 4;       /* consistent portrait container */
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  display: block;
  transition: transform 400ms ease;
  /* Remove: height: 160px; height: 200px; height: 220px; */
}
```

**Sizing on mobile (375px, 2 columns, 12px gap):**
- Each cell: (375px - 24px - 12px) / 2 ≈ 170px wide × 227px tall
- This is a reasonable cell size — compact but showing full portrait photos
- 10 camp photos in this layout = 5 rows × 2 columns

**Sizing on tablet (768px, 3 columns, 12px gap):**
- Each cell: (768px - 48px - 24px) / 3 ≈ 232px wide × 309px tall
- Much better — portrait photos display beautifully

**Sizing on desktop (1024px, 3 columns, 12px gap):**
- Each cell: (1200px - 24px×2 sides / wait, use container max) ≈ (1152px - 24px) / 3 ≈ 376px wide × 501px tall
- Full portrait photos at nearly full size — extremely effective for showcasing the creative work

**Approach B (Alternative): True masonry — only if JS-driven masonry is already in the codebase**
Since the current implementation uses pure CSS grid and no masonry JS library, Approach B would require adding a dependency. This is not recommended for now. Approach A gives consistent, clean results without extra JavaScript.

**Fun Days gallery:** Apply identical styles. The background color for the Fun Days gallery items should be `#E8F6F6` (Light Teal BG) since Fun Days is a B2B page with teal accent tone.

```
/* Fun Days page — teal-tinted gallery */
.gallery-grid--fundays .gallery-item {
  background-color: #E8F6F6;
}
```

This can be set inline on the HTML element or via a modifier class on the gallery-grid container.

**Hover effect:** Keep `transform: scale(1.04)` on hover for `gallery-item img`. With `object-fit: contain`, zooming a portrait photo slightly into its frame looks intentional. Do NOT increase scale above 1.05 or it introduces visible cropping at the edges.

---

## Solution 4b — Studio Gallery Grid (our-studio.html)

### Current problem
Same gallery-item fixed height issue. Studio photos include a mix: two landscape/wide shots and three portrait shots. The landscape-ish shots (321798f0 — the wide kitchen/studio interior, and 50c950e7 — the main studio room shot) render acceptably in landscape containers. The portrait shots (f0185b3b — two women at table, 0352d955 — overhead of table, 7ebcf202 — shelf with jars) are cropped.

### Design approach: `aspect-ratio: 3 / 4` with `object-fit: contain`

The studio gallery uses `.gallery-grid--studio` which is max-width 900px centered, 2-column. The 5th item uses `.gallery-item--centered-half` (spans full width, displayed at 50% width centered).

For the studio gallery specifically:
- Use `aspect-ratio: 3 / 4` on all gallery items (same as Solution 4)
- Background fill: `#FFFBF8` (Warm White) for the studio gallery — the studio is bright and clean, warm white feels right and matches the actual studio walls
- The landscape studio shots (the two wide/horizontal room photos) will have significant top/bottom letterboxing inside the 3:4 container — this is acceptable; the full room is visible

**The `.gallery-item--centered-half` 5th item (shelf photo):**
This is the tall shelf/jar photo — already portrait. In a 3:4 container at 50% of 900px max = 450px wide × 600px tall, it displays beautifully. No change needed to the centering behavior.

```
/* Studio gallery — white background fill */
.gallery-grid--studio .gallery-item {
  background-color: #FFFBF8;
}
```

---

## Solution 5 — Inner Page Hero Images (page-hero__image)

### Current problem
`.page-hero__image img` uses `height: 240px` (mobile), `height: 320px` (tablet) with `object-fit: cover`. This appears on birthday-workshops.html (hero image: a portrait photo of children at a party), art-classes.html (hero image: portrait drawing photo), holiday-camps.html (hero image: portrait group photo), our-studio.html (hero image: semi-landscape room photo), and fun-days.html (hero image: portrait group).

The page hero sits in a split layout: text takes 55% width, image takes 45% on tablet+. On mobile they are stacked.

### Design approach: `aspect-ratio` on the image container, `object-fit: contain`

**Mobile (< 768px):**
- Image sits below the text (current order)
- `aspect-ratio: 3 / 4` on `.page-hero__image`
- Image inside: `width: 100%; height: 100%; object-fit: contain;`
- Background: inherit from the section's background color (Light Coral or Light Teal) — no separate fill needed since the hero section background already provides color context

**Tablet/Desktop (768px+):**
- Side-by-side: `.page-hero__text` is 55%, `.page-hero__image` is `flex: 1` (remaining 45%)
- The image container stretches to fill the panel height
- `height: 100%; object-fit: contain` — the portrait photo shows in full, any gaps are the hero section's own background color
- Remove fixed pixel heights at all breakpoints

**CSS approach — exact properties:**

```
.page-hero__image {
  width: 100%;
  border-radius: var(--radius-image);
  overflow: hidden;
  aspect-ratio: 3 / 4; /* mobile */
}

.page-hero__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  display: block;
  border-radius: var(--radius-image);
  /* Remove: height: 240px; height: 320px; */
}

@media (min-width: 768px) {
  .page-hero__image {
    aspect-ratio: unset;  /* let flex height drive it */
    height: 100%;         /* fill the flex row height */
    align-self: stretch;
  }
}
```

**Studio page exception:** The main studio room photo (50c950e7) is slightly landscape. With `object-fit: contain` inside a tall panel, it will letterbox (show background top and bottom). The studio page hero background is `#FFF0ED` — the warm coral letterbox is fine. Consider using `object-fit: cover` as a page-specific override for the studio page hero only, since this is one of the few actual landscape-ish photos. Document this in the HTML as a modifier class:

```html
<img class="page-hero__img page-hero__img--landscape" ... />
```

```css
.page-hero__img--landscape {
  object-fit: cover;
  object-position: center center;
}
```

---

## Solution 6 — Single Feature / Founder Photos

### 6a. About Teaser on Homepage (index.html)

**Component:** `.about-teaser__photo`

**Current state:** Already uses `aspect-ratio: 3 / 4` with `object-fit: cover; object-position: top center`. This is an improvement over fixed heights, BUT `object-fit: cover` on a portrait photo inside a 3:4 container still causes cropping when the container is constrained by `max-height: 440px`.

**The photo:** Owner (Lior) standing on a London street. Full-body portrait, 3:4 ratio. The important content — her face and outfit — runs the full height of the photo.

**Correct approach:**

```css
.about-teaser__photo {
  width: 100%;
  aspect-ratio: 3 / 4;
  height: auto;
  max-height: none;       /* remove the 440px max-height */
  object-fit: contain;
  object-position: center center;
  border-radius: var(--radius-image);
  display: block;
  background-color: #E8F6F6; /* Light Teal BG — the about section is warm white, this creates slight distinction */
}
```

On desktop where the photo wrap is `flex: 0 0 40%`, the photo will be approx 460px wide × 613px tall (at 3:4). The text column beside it is `flex: 1`. This is generous and portrait-correct.

Remove `max-height: 440px` at all breakpoints.

### 6b. About Page Story Photo (about.html)

**Component:** `.story-photo img` inside `.story-layout--side`

**Current state:** Fixed `height: 320px` (mobile) / `height: 400px` (tablet), `object-fit: cover; object-position: top center`.

**The photo:** Same owner portrait. The same face-crop problem applies.

**Correct approach:** Replace fixed heights with `aspect-ratio` on the wrapper:

```css
.story-photo {
  border-radius: var(--radius-image);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  aspect-ratio: 3 / 4;  /* add this */
}

.story-photo img {
  width: 100%;
  height: 100%;           /* fill the aspect-ratio container */
  object-fit: contain;
  object-position: center center;
  display: block;
  background-color: #E8F6F6;
  /* Remove: height: 320px; height: 400px; */
}
```

On the about page side layout (`.story-layout--side`), the photo takes `flex: 0 0 35%`. At 35% of 1200px max = 420px. The 3:4 container is 420px × 560px. Full portrait photo visible.

---

## Solution 7 — Lightbox Modal (all pages)

### Current state
The existing lightbox modal displays images with a max-width/max-height approach. Since images open in a fixed overlay that covers the full screen, portrait images likely display well in the lightbox already. However, the lightbox image should explicitly use:

```css
.lightbox__img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;  /* already should be using this — verify */
  width: auto;
  height: auto;
}
```

No changes needed if `object-fit: contain` is already set. If it is using `cover` or `fill`, switch to `contain` immediately.

---

## Summary Table — All Changes

| Container | Current | Change to | Background fill |
|---|---|---|---|
| `.hero-split__image` (mobile) | `max-height: 340px; height: 72vw` | `aspect-ratio: 3/4; height: auto; max-height: none` | #FFF0ED (already set) |
| `.hero-split__img` | `object-fit: cover; object-position: center 15%` | `object-fit: contain; object-position: center center` | #FFF0ED on image panel |
| `.card__img` | `height: 200px; object-fit: cover` | remove height; `object-fit: contain` | #FFF0ED on `.card__image-wrap` |
| `.card__image-wrap` | no background | add `background-color: #FFF0ED; aspect-ratio: 3/4; display: flex; align-items/justify-content: center` | — |
| `.card--teal .card__image-wrap` | — | add `background-color: #E8F6F6` | — |
| `.workshop-card__img` | `height: 220px; object-fit: cover` (+ breakpoints) | remove height; `object-fit: contain` | — |
| `.workshop-card__image-wrap` | no aspect-ratio, no bg | add `aspect-ratio: 3/4; background-color: #FFF0ED; display: flex; align-items/justify-content: center` | — |
| `.gallery-item img` | `height: 160px; object-fit: cover` (+ breakpoints) | remove height; `object-fit: contain; width/height: 100%` | — |
| `.gallery-item` | no aspect-ratio | add `aspect-ratio: 3/4; display: flex; align-items/justify-content: center; background-color: #FFF0ED` | — |
| `.gallery-grid--fundays .gallery-item` | — | override `background-color: #E8F6F6` | — |
| `.gallery-grid--studio .gallery-item` | — | override `background-color: #FFFBF8` | — |
| `.page-hero__image img` | `height: 240px; object-fit: cover` (+ breakpoints) | remove height; `object-fit: contain; height: 100%` | inherit section bg |
| `.page-hero__image` | no aspect-ratio | add `aspect-ratio: 3/4` (mobile only; remove at 768px+) | — |
| `.about-teaser__photo` | `aspect-ratio: 3/4; object-fit: cover; max-height: 440px` | keep `aspect-ratio: 3/4`; change to `object-fit: contain`; remove `max-height` | #E8F6F6 |
| `.story-photo` | no aspect-ratio | add `aspect-ratio: 3/4` | — |
| `.story-photo img` | `height: 320px/400px; object-fit: cover` | remove height; `object-fit: contain; height: 100%; background-color: #E8F6F6` | — |

---

## CSS Removal Checklist

The developer should specifically REMOVE or replace these lines that cause the cropping problem:

1. `.hero-split__image` — remove `max-height: 340px`, `min-height: 260px`, `height: 72vw`
2. `.hero-split__img` — change `object-fit: cover` to `object-fit: contain`; remove `object-position: center 15%`
3. `.hero-split__img--center` — remove this class entirely (no longer needed)
4. `.card__img` — remove `height: 200px`; change `object-fit: cover` to `object-fit: contain`
5. `.card__img` at `@media (min-width: 768px)` — remove `height: 220px`
6. `.workshop-card__img` — remove `height: 220px`; change `object-fit: cover` to `object-fit: contain`
7. `.workshop-card__img` at `@media (min-width: 1024px)` — remove `height: 260px`
8. `.workshop-card__img` in small-screen breakpoints — remove `height: 160px; height: 200px`
9. `.gallery-item img` — remove `height: 160px`; change `object-fit: cover` to `object-fit: contain`
10. `.gallery-item img` at `@media (min-width: 768px)` — remove `height: 200px`
11. `.gallery-item img` at `@media (min-width: 1024px)` — remove `height: 220px`
12. `.gallery-item img` at small-screen breakpoints — remove all fixed heights
13. `.page-hero__image img` — remove `height: 240px`; change `object-fit: cover` to `object-fit: contain`
14. `.page-hero__image img` at `@media (min-width: 768px)` — remove `height: 320px`
15. `.about-teaser__photo` — change `object-fit: cover` to `object-fit: contain`; remove `max-height: 440px` (and all breakpoint overrides); remove `object-position: top center`
16. `.story-photo img` — remove `height: 320px`; change `object-fit: cover` to `object-fit: contain`
17. `.story-photo img` at `@media (min-width: 768px)` — remove `height: 400px`

---

## Background Fill Color Logic

The background fill color (visible when a portrait photo does not fill a landscape/square container) must be a brand color, not transparent or white. Rules:

| Context | Fill color | Reasoning |
|---|---|---|
| Hero slideshow | `#FFF0ED` (Light Coral BG) | Already the image panel background; warm, branded |
| Homepage service cards | `#FFF0ED` (Light Coral BG) for coral cards; `#E8F6F6` (Light Teal BG) for B2B card | Matches card accent color |
| Birthday workshop cards | `#FFF0ED` (Light Coral BG) | Birthday is B2C, coral-accented page |
| Art class cards | `#FFF0ED` (Light Coral BG) | Art classes is B2C, coral-accented |
| Camps gallery | `#FFF0ED` (Light Coral BG) | Camps is B2C |
| Fun Days gallery | `#E8F6F6` (Light Teal BG) | Fun Days is B2B, teal-accented |
| Studio gallery | `#FFFBF8` (Warm White) | Studio = clean, neutral, professional |
| Owner photo (about teaser) | `#E8F6F6` (Light Teal BG) | The about section is on warm white — teal provides gentle contrast |
| About page story photo | `#E8F6F6` (Light Teal BG) | Same reasoning |
| Page hero images | Inherit section background | Page hero bg (#FFF0ED or #E8F6F6) already provides the fill naturally |

---

## Responsive Behavior Summary

### Mobile (375px)
- Hero slideshow image panel: 375px wide × 500px tall (3:4), full portrait shown with `contain`
- Service cards (1 column): full width × ~500px tall image area — large, impactful
- Workshop cards (1 column): same proportions
- Gallery (2 columns): ~170px × 227px each — compact cells, all content visible
- Page hero image: stacked below text, full width × ~500px (3:4)
- Owner/story photos: full width with 3:4 aspect-ratio

### Tablet (768px)
- Hero: 48% panel width × ~520px tall — portrait fills the panel beautifully
- Service cards (2 columns): ~560px/2 = ~270px wide × 360px tall image area
- Workshop cards (2 columns): same proportions
- Gallery (3 columns): ~232px × 309px — excellent portrait display
- Page hero image: 45% width × ~400px tall (flex height)

### Desktop (1024px+)
- Hero: 45% panel width × ~580px tall — one of the best portrait displays
- Service cards (4 columns): ~270px × 360px each
- Workshop cards (3 columns): ~370px × 493px — large, beautiful
- Gallery (3 columns): ~376px × 501px — poster-sized portrait cells
- Page hero image: 45% width, flex-stretched

---

## Interactions & Animations

**Retain (safe with `contain`):**
- Crossfade transition between hero slides (opacity based, no layout change)
- `translateY(-2px)` hover lift on cards
- Gallery item hover overlay (the `::after` darkening overlay)

**Modify:**
- Remove `transform: scale(1.03/1.04)` on zoom hover for hero slides — zooming a `contain` image re-introduces cropping at edges
- Keep `scale(1.03/1.04)` on workshop-card and gallery items — the zoom is subtle enough that minimal edge cropping occurs and the effect adds depth

**Keep unchanged:**
- Lightbox open/close transitions
- Dot navigation in hero
- Arrow buttons in hero (desktop)
- All button and link hover states

---

## Accessibility Notes

- `object-fit: contain` does not change the image's `alt` text requirements — all existing alt attributes remain
- The brand-color background fills (#FFF0ED, #E8F6F6) pass against white and each other — no WCAG contrast issue since they are decorative fill, not text backgrounds
- Larger image areas (taller gallery cells) increase touch target for the gallery items — this improves accessibility
- No changes to keyboard navigation or ARIA attributes

---

## RTL Notes

All solutions are RTL-neutral:
- `aspect-ratio` is direction-agnostic
- `object-fit: contain` is direction-agnostic
- Background fill colors are symmetric
- The only RTL-specific element (hero split layout order, gallery-hint badge positioning) remains unchanged

---

## Implementation Order (Priority)

1. **Hero slideshow** — highest impact, first thing visitors see. Fix immediately.
2. **Service cards (homepage)** — above the fold on desktop. Fix immediately.
3. **Workshop cards (birthday page)** — primary service page. Fix next.
4. **Gallery grids (camps, fun days, studio)** — multiple pages affected. Fix next.
5. **Page hero images** — inner page heroes. Fix after galleries.
6. **Owner/story photos** — fix last (already partially improved with `aspect-ratio`).

---

## Notes and Assumptions

1. **Assumption:** All photos in the library are their final photos. The developer should not assume any photos will be replaced with landscape versions.
2. **Assumption:** The lightbox is already using `object-fit: contain` or equivalent `max-width/max-height` with `width: auto; height: auto`. If not, add `object-fit: contain` to the lightbox image.
3. **Note:** The Magic Forest terrarium photo and Birthday terrarium photo (both nearly square, ~1:1) will display with modest top/bottom letterboxing in the 3:4 containers. This is fine — the product (the terrarium) is shown in full.
4. **Note:** The studio interior landscape shots (321798f0) will have top/bottom letterboxing in portrait containers. Given that the studio gallery is specifically about showing the space, consider a `page-specific override` that uses `object-fit: cover` for studio landscape images only. The developer can apply this selectively via a modifier class on the specific `gallery-item` elements.
5. **No JavaScript changes required.** All solutions are pure CSS. The lightbox JS does not need changes.
6. **Performance:** `object-fit: contain` does not affect image loading performance vs `object-fit: cover`. No additional optimization needed.
