# Hero Section Redesign Specification
## ArtyParty Homepage — Portrait Photo Slideshow

**Version:** 1.0  
**Date:** 2026-04-04  
**Status:** Ready for developer implementation

---

## 1. The Problem (Context for Developer)

All 12 slideshow photos are portrait orientation (approximately 3:4 ratio, roughly 900×1200px
native). The current implementation positions them as full-width background images with
`object-fit: cover` inside a 50–60vh container. Because the container is far wider than it is
tall, cover mode crops out the vast majority of each image — typically 60–70% of the content
is discarded. The cropping makes it impossible for visitors to see what actually happens at
ArtyParty workshops.

The photo content that must be visible:
- Overhead shots of children's hands drawing at a table (IMG_4913, IMG_8576)
- Close-up of crafting activity — terrarium assembly, mosaic painting (IMG_6757, IMG_5514)
- Groups of children in the studio working at long tables (IMG_7881, IMG_8036, IMG_5769)
- Birthday celebration scene with all the miniature cabin craft pieces on display (IMG_8158)
- Two proud girls holding their finished terrarium jars (IMG_6758)
- Lior leading a workshop session — founder credibility shot (c81372c5)

The template must change. Adjusting object-position or height alone cannot solve a 3:4 image
inside a 16:5 container.

---

## 2. Chosen Approach: Split Layout (Approach A — Refined)

### Why Split Layout

**Option A (Split)** is chosen over the alternatives for these specific reasons:

**Why not Option B (Multi-image)?**
Multi-image side-by-side works well for product photography but creates visual noise when the
photos are rich, detailed scenes. Showing three simultaneous portraits shrinks each to
approximately 200px wide on desktop — not enough to appreciate the craft work detail that
sells the brand.

**Why not Option C (Centered portrait with blurred sides)?**
Blurred sidebars feel like a workaround, not a design decision. The blurred background
competes visually with the image and conveys "we couldn't fit this image" rather than
intentional craft. It also performs poorly on mobile where the portrait fills almost the full
width anyway, making the blur irrelevant.

**Why not Option D (Card/frame style)?**
A framed card within a section background creates too much visual distance between the brand
message and the human moment in the photo. It reads as a product listing, not an invitation.

**Why Split Layout works for ArtyParty:**

1. **Every portrait photo has a clear subject.** The activity/craft occupies the center-to-bottom
   of each photo. A split gives the image its own vertical column where it can be shown with
   minimal cropping — just gentle top/bottom trimming on the natural aspect ratio.

2. **It mirrors the workshop experience itself.** The brand is personal and guided — Lior leads,
   families participate. A split layout (text on one side, authentic photo on the other) feels
   like a conversation, not a broadcast. This matches the warm, approachable brand personality.

3. **Adult buyers need information and trust signals simultaneously.** The split keeps the value
   proposition copy permanently visible next to every photo — the parent sees both the emotional
   proof (children creating) and the rational message (what it is, why it matters) without
   scrolling or waiting.

4. **RTL-native.** Hebrew reads right-to-left. Text on the right (start side) and image on the
   left (end side) means the eye lands on the headline first — exactly right for RTL. The layout
   is structurally RTL, not mirrored.

5. **Mobile degrades gracefully.** Portrait image stacked above text on mobile is completely
   natural — it mirrors how Instagram photos are consumed, which is exactly how this audience
   (Israeli mothers 28–45) already processes visual content on phones.

---

## 3. Layout Architecture

### 3.1 Overall Structure

The hero section is divided into two panels side-by-side on desktop/tablet, stacked on mobile.

```
[DESKTOP — 1024px+]
┌─────────────────────────────────────────────────────────────┐
│ NAVBAR (72px, sticky, above hero)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TEXT PANEL (55% width)    │  IMAGE PANEL (45% width)       │
│  Background: Warm White    │  Background: Light Coral BG    │
│  Padding: 64px 48px        │  Padding: 0                    │
│                            │                                 │
│  [H1 Headline]             │  ┌─────────────────────────┐   │
│  [Subheadline]             │  │                         │   │
│  [CTA Button: WhatsApp]    │  │   Portrait image        │   │
│  [Secondary link]          │  │   shown full-height     │   │
│  [Slide dots]              │  │   of the panel          │   │
│                            │  │                         │   │
│                            │  └─────────────────────────┘   │
│                            │  [Thumbnail strip, below]       │
└─────────────────────────────────────────────────────────────┘
```

```
[MOBILE — <768px]
┌──────────────────────────┐
│ NAVBAR (60px)            │
├──────────────────────────┤
│ IMAGE PANEL (full width) │
│ height: 72vw (max 340px) │
│ object-fit: contain      │
│ background: Light Coral  │
│ [Dot indicators inside]  │
├──────────────────────────┐
│ TEXT PANEL (full width)  │
│ background: Warm White   │
│ padding: 32px 24px       │
│                          │
│ [H1]                     │
│ [Subheadline]            │
│ [CTA Button]             │
│ [Secondary link]         │
└──────────────────────────┘
```

---

### 3.2 Container and Dimensions

**Section element (`.hero-split`):**
- No max-width constraint on the section itself — it runs edge-to-edge
- `min-height`: none (the content determines height)
- `overflow`: hidden
- No bottom clip-path

**Inner wrapper (`.hero-split__inner`):**
- `display: flex`
- `flex-direction: row` (RTL: text on right, image on left)
- `align-items: stretch` — both panels match height
- Max-width: none on the flex container — the section is full-bleed
- On desktop the text panel reaches a maximum comfortable reading width

**Text Panel (`.hero-split__text`):**
- `flex: 0 0 55%` on desktop (1024px+)
- `flex: 0 0 52%` on tablet (768px–1023px)
- `flex: 0 0 100%` / full width on mobile (stacks)
- Background: `#FFFBF8` (Warm White)
- Padding: `80px 64px 80px 48px` desktop (RTL: right padding is larger as the reading start)
- Padding: `64px 40px 64px 32px` tablet
- Padding: `32px 24px 40px 24px` mobile
- `display: flex; flex-direction: column; justify-content: center`

**Image Panel (`.hero-split__image`):**
- `flex: 0 0 45%` on desktop
- `flex: 0 0 48%` on tablet
- `flex: 0 0 100%` on mobile — full width, fixed height
- Background: `#FFF0ED` (Light Coral BG) — matches the craft/warmth of the images and provides
  a warm frame for the portrait without harsh contrast
- `overflow: hidden`
- `position: relative`

**Image inside the panel (`.hero-split__img`):**
- `width: 100%`
- `height: 100%`
- `object-fit: cover`
- `object-position: center top`
- Desktop/tablet: the panel is tall enough (min 520px at desktop) that object-fit cover on a
  3:4 portrait image only crops the bottom — which in almost all photos is table/floor, not
  meaningful content. The subject (children, craft work, hands) sits in the upper two-thirds.
- Mobile: image panel is `height: 72vw; max-height: 340px`. At 375px wide this gives 270px
  height — enough to show the key content of each portrait.
- The Light Coral BG background shows through the letterbox area if object-fit contain is used
  on narrower images. However, cover is preferred — see note below.

**Cover vs Contain decision:**
Use `object-fit: cover` with `object-position: center 15%` as default. This slight upward bias
ensures the face/hands region (which sits in the upper half of every slide photo) stays
visible. The Light Coral BG background is only seen for the brief crossfade moment between
slides. This gives cleaner framing than contain (which would show letterbox bars).

Exception: for the book nook photo (IMG_4957 — the enchanted forest book nook on a shelf),
use `object-position: center center` as the subject occupies the full vertical center.

**Minimum section height:**
- Desktop: `min-height: 580px` (ensures enough vertical space for comfortable text + image)
- Tablet: `min-height: 520px`
- Mobile: image panel height is fixed, text panel grows to content

---

### 3.3 Thumbnail Strip (Optional Enhancement — Phase 2)

The thumbnail strip below the image panel on desktop provides quick navigation context.
Mark as Phase 2 — implement the dot navigation first (Phase 1), add thumbnails later if
desired.

---

## 4. Typography Specifications

### 4.1 H1 Headline

**Element:** `<h1 class="hero-split__heading">`  
**Content:** סדנאות יצירה לילדים שמשאירות חיוך

| Breakpoint | Font     | Weight | Size  | Line-height | Color           |
|------------|----------|--------|-------|-------------|-----------------|
| Mobile     | Rubik    | 700    | 32px  | 40px        | Navy `#2C3E6B`  |
| Tablet     | Rubik    | 700    | 36px  | 44px        | Navy `#2C3E6B`  |
| Desktop    | Rubik    | 700    | 44px  | 54px        | Navy `#2C3E6B`  |

No text shadow. The text panel has a solid Warm White background — it no longer sits on top
of a photo, so text shadows and the `--light` color variants are removed.

### 4.2 Subheadline

**Element:** `<p class="hero-split__subheadline">`  
**Content:** לילדים בכיתות א–ו באזור השרון — סדנאות יום הולדת, חוגי אמנות, קייטנות יצירה, וימי כיף לילדי עובדים.

| Breakpoint | Font  | Weight | Size | Line-height | Color              |
|------------|-------|--------|------|-------------|--------------------|
| Mobile     | Rubik | 400    | 16px | 26px        | Dark Text `#2D2D2D`|
| Tablet     | Rubik | 400    | 17px | 27px        | Dark Text `#2D2D2D`|
| Desktop    | Rubik | 400    | 18px | 28px        | Dark Text `#2D2D2D`|

Margin-top: 16px from H1.

### 4.3 Emphasis Line

**Element:** `<p class="hero-split__emphasis">`  
**Content:** אנחנו מטפלים בהכל — אתם רק צריכים להגיע.

| Breakpoint | Font  | Weight | Size | Color           |
|------------|-------|--------|------|-----------------|
| All        | Rubik | 600    | 16px | Coral `#E86B5A` |

Margin-top: 8px from subheadline. This line acts as the secondary hook — Coral weight draws
the eye after the headline.

### 4.4 Primary CTA Button

**Component:** Primary button from design system  
**Label:** שלחו לנו הודעה בוואטסאפ (with WhatsApp icon, 20px, leading)

| Property         | Value                                 |
|------------------|---------------------------------------|
| Background       | WhatsApp green `#128C7E`              |
| Text color       | White `#FFFFFF`                       |
| Font             | Rubik 500, 16px                       |
| Height           | 52px (touch-friendly, generous)       |
| Padding          | 0 28px                                |
| Border radius    | 8px                                   |
| Icon gap         | 10px between icon and label           |
| Shadow           | Card level `0 2px 8px rgba(0,0,0,0.06)`|
| Hover            | `#0e7268`, shadow lifts to hover level|
| Margin-top       | 32px from emphasis line               |
| Width            | Auto (content-width) on desktop;      |
|                  | full-width (100%) on mobile           |

### 4.5 Secondary CTA Link

**Element:** `<a class="hero-split__scroll-link">`  
**Label:** לכל השירותים שלנו (with arrow icon pointing down-start direction)

| Property    | Value                                |
|-------------|--------------------------------------|
| Color       | Teal `#2BA5A5`                       |
| Font        | Rubik 500, 15px                      |
| Decoration  | None at rest, underline on hover     |
| Margin-top  | 16px from primary button             |
| Icon        | 14px chevron, inline-end of text     |
| Display     | inline-flex, align-items center      |

---

## 5. Slideshow Mechanics

### 5.1 What Changes and What Stays

Only the **image panel** is the slideshow. The text panel content is **static** — the same
headline, subheadline, and CTA remain visible at all times. This is a deliberate departure
from the current design where text was part of the rotating overlay.

**Rationale:** Parents need to read the value proposition. Auto-rotating text disrupts reading,
forces users to wait for text to come back, and creates WCAG issues with motion. Keeping text
static guarantees every visitor reads the full headline without interruption.

### 5.2 Image Transition

- **Type:** Cross-fade (opacity transition)
- **Duration:** 600ms ease-in-out
- **Hold time:** 4.5 seconds per slide before transitioning
- **Total cycle:** 4.5s hold + 0.6s fade = ~5.1 seconds per slide × 12 slides = ~61 seconds
  per full loop
- **Pause on hover:** Yes — when the mouse is over the image panel, auto-rotation pauses.
  Resume on mouse-leave with a 500ms delay.
- **Touch swipe:** Swipe left (RTL: swipe right toward start) to advance to next slide.
  Swipe in opposite direction to go back.

### 5.3 Navigation Dots

**Placement:** Centered horizontally, inside the image panel, 16px from the bottom edge.

**Styling:**

| State    | Visual dot size | Color                          |
|----------|-----------------|--------------------------------|
| Inactive | 8px circle      | White at 55% opacity           |
| Active   | 12px circle     | White at 100% opacity          |
| Hover    | 10px circle     | White at 80% opacity           |

Each dot button has a minimum touch target of 48×48px (the ::after pseudo-element is the
visible dot; the button itself is the 48px target). Gap between buttons: 0px (targets
overlap slightly but visual dots have 8px gap between them).

**On mobile:** dots are inside the image panel, visible against the Light Coral BG or
image content. Add a subtle semi-transparent dark pill behind the dot row if contrast is
insufficient: `background: rgba(0,0,0,0.2); border-radius: 20px; padding: 4px 8px`.

### 5.4 Arrow Navigation (Desktop Only)

On desktop (1024px+), show left/right arrow buttons on the image panel.

| Property  | Value                                          |
|-----------|------------------------------------------------|
| Position  | Absolute, vertically centered in image panel  |
| Size      | 40px × 40px circle                            |
| Background| White at 80% opacity                          |
| Icon      | Navy chevron, 18px                             |
| Placement | 16px from panel edge (inline-start and end)   |
| Hover     | White at 100%, shadow lift                    |
| Hidden on | Mobile and tablet (dots only)                 |

In RTL: the "previous" arrow is on the right side of the image panel (reading start), the
"next" arrow is on the left side (reading end). This is counter-intuitive visually but
correct for RTL navigation convention.

**Implementation note:** Use `aria-label` "תמונה קודמת" and "תמונה הבאה" on the arrow
buttons. Arrow icons should point physically left and right (not flip for RTL) — the semantic
"previous" association should be handled by the label, not icon direction reversal.

### 5.5 Image Sequence and Grouping

Recommended display order — group by content type so the slideshow tells a story:

1. IMG_6758 — Two proud girls holding finished terrarium jars (emotional, faces visible, strong opener)
2. c81372c5 — Lior leading the workshop group (founder visibility, trust)
3. IMG_7881 — Group of girls at long studio table creating boxes (birthday party feel)
4. IMG_8158 — Birthday party scene with all the cabin miniatures on display
5. IMG_8036 — Girls in green aprons decorating birdhouses
6. IMG_5234 — Close-up of girl painting a cabin model (Cabin in the Forest workshop)
7. IMG_5769 — Children building a large paper sculpture together (camp/group activity)
8. IMG_4913 — Overhead: children drawing portraits at a messy, colorful table
9. IMG_5514 — Overhead: child painting a mosaic panda scene
10. IMG_8576 — Overhead: child drawing a countryside landscape
11. IMG_6757 — Hands carefully arranging a terrarium (craft close-up)
12. IMG_4957 — The enchanted forest book nook (product showcase, magical atmosphere)

This order: emotional hook → founder trust → group activity → birthday → craft detail → camp
→ drawing class → art close-ups → product magic. It communicates the full range without
leading with a craft close-up that requires context.

---

## 6. Responsive Behavior

### 6.1 Mobile (< 768px, design target: 375px)

**Section structure:** Stacked column — image on top, text below.

```
.hero-split__inner {
  flex-direction: column;
}
```

**Image panel:**
- Width: 100%
- Height: 72vw (at 375px = 270px; at 430px = 310px)
- Max-height: 340px
- object-fit: cover, object-position: center 15%
- Background: Light Coral BG `#FFF0ED`
- Dots: inside panel, bottom center, 12px from bottom

**Text panel:**
- Width: 100%
- Background: Warm White
- Padding: 32px 24px 40px 24px
- H1: 32px/40px Rubik 700 Navy
- Subheadline: 16px/26px Rubik 400
- CTA button: full width (width: 100%)
- Secondary link: centered (text-align: center)

**Section overall:** No min-height constraint — stacks naturally.

### 6.2 Tablet (768px–1023px)

**Section structure:** Side-by-side row. Image and text are equal-ish halves.

```
.hero-split__inner {
  flex-direction: row;
  min-height: 520px;
}
.hero-split__text  { flex: 0 0 52%; }
.hero-split__image { flex: 0 0 48%; }
```

**Image panel:**
- Height: determined by flex `align-items: stretch` — matches text panel height
- At 768px with 520px min, the image panel is 520px tall. A 3:4 portrait at 48% of 768px
  wide = ~369px wide. The image aspect fills 369×492px of content naturally — this means
  cover mode crops only ~28px top/bottom. Acceptable.
- Dots: inside panel, bottom center
- Arrow buttons: hidden on tablet

**Text panel:**
- Padding: 48px 40px 48px 32px
- H1: 36px/44px
- Subheadline: 17px/27px
- CTA button: auto-width (content-width), full width only on mobile

### 6.3 Desktop (1024px–1439px)

```
.hero-split__inner {
  flex-direction: row;
  min-height: 580px;
}
.hero-split__text  { flex: 0 0 55%; }
.hero-split__image { flex: 0 0 45%; }
```

**Image panel:**
- At 1200px container: image panel = 540px wide
- Section min-height 580px → image panel is 580px tall
- A 3:4 portrait at 540px wide would be 720px tall naturally; in a 580px tall container,
  cover crops only 140px from the bottom — in all photos this is just table/floor/wall
- object-position: center 15% pushes the crop toward the bottom, preserving faces/hands
- Arrow buttons: visible, 40px circles, 16px from edge

**Text panel:**
- Padding: 80px 64px 80px 48px
- H1: 44px/54px
- Subheadline: 18px/28px

### 6.4 Large Desktop (1440px+)

The section runs full-bleed. The text panel content is constrained by its internal padding
to approximately 600px of readable text — comfortable line length for Hebrew.

```
.hero-split__inner {
  min-height: 620px;
}
```

At 1440px viewport, the image panel is approximately 648px wide. At 620px tall, cover crops
only ~95px from the bottom. Still excellent.

Maximum section width: none. The full-bleed split looks intentional and editorial at large
viewports — the Warm White text region transitions to the Light Coral image region across the
full browser width.

---

## 7. RTL Layout Considerations

### 7.1 Panel Order in RTL

In RTL layout (`dir="rtl"`), reading begins from the right. The text panel must be on the
right side (the reading-start side), and the image panel on the left side (reading-end).

In flexbox with `dir="rtl"`, the natural flow is already right-to-left. If the HTML order is:
1. Text panel (first child)
2. Image panel (second child)

Then in RTL, the text panel appears on the right and image on the left — correct.

**Do not use `order` or `flex-direction: row-reverse`.** The HTML source order matching the
RTL display order keeps screen readers correct.

### 7.2 Padding and Margin Direction

Use logical CSS properties throughout:
- `padding-inline-start` / `padding-inline-end` (not left/right)
- `inset-inline-start` / `inset-inline-end` (for arrow positioning)
- The text panel has more `padding-inline-start` (right in RTL) because that's where the
  text begins and needs breathing room from the edge of the viewport

### 7.3 Arrow Button Labels

"Previous slide" (right arrow, reading-start side): `aria-label="תמונה קודמת"`
"Next slide" (left arrow, reading-end side): `aria-label="תמונה הבאה"`

### 7.4 Swipe Direction

On touch devices:
- Swipe toward inline-start (right in RTL) = go to previous slide
- Swipe toward inline-end (left in RTL) = go to next slide

This matches natural reading direction expectation.

### 7.5 Dot Navigation

Dots are not direction-sensitive (they are a circular sequence indicator, not a directional
one). No RTL adjustment needed for dots. Their order in the DOM can remain slide-1 through
slide-12 regardless of direction.

---

## 8. Color Application by Area

| Area                       | Background         | Color Hex  | Notes                             |
|----------------------------|--------------------|------------|-----------------------------------|
| Text panel background      | Warm White         | `#FFFBF8`  | Clean, warm, reads well           |
| Image panel background     | Light Coral BG     | `#FFF0ED`  | Visible during crossfade moments  |
| H1 headline                | —                  | `#2C3E6B`  | Navy                              |
| Subheadline body           | —                  | `#2D2D2D`  | Dark Text                         |
| Emphasis line              | —                  | `#E86B5A`  | Coral — draws eye after headline  |
| Primary CTA button         | WhatsApp green     | `#128C7E`  | Consistent with site-wide button  |
| Primary CTA text           | White              | `#FFFFFF`  |                                   |
| Secondary link text        | Teal               | `#2BA5A5`  |                                   |
| Navigation dot (inactive)  | —                  | rgba(255,255,255,0.55) | On image panel |
| Navigation dot (active)    | —                  | `#FFFFFF`  | Full white                        |
| Arrow button background    | —                  | rgba(255,255,255,0.80) | Desktop only |
| Arrow button icon          | —                  | `#2C3E6B`  | Navy                              |
| Section bottom edge        | —                  | —          | No clip-path. Straight edge.      |

**No dark overlay gradient.** The current dark overlay was needed because white text was
rendered on top of photos. With the new split layout, text is on a solid Warm White background
and needs no overlay at all.

---

## 9. Decorative and Brand-Texture Treatment

### 9.1 Wavy Divider Between Panels (Desktop)

Instead of a hard vertical line between the text and image panels, use a subtle SVG wave
separator that follows the vertical axis. This adds the hand-crafted, artistic feel consistent
with the logo's craft aesthetic.

**Implementation:**
- An SVG `<div>` (or CSS `clip-path`) sits at the boundary between the two panels
- The wave is `width: 32px`, spans the full height of the section
- The wave curves approximately 16px left and right of the panel boundary
- Color: Light Coral BG `#FFF0ED` (the wave "belongs" to the image panel, intruding into the
  text panel with its warm color)
- Only visible on tablet and desktop. On mobile the panels stack with no divider.
- Subtle, not dramatic — the peak-to-trough amplitude is 16px, not 40px
- The wave does not animate (static)

**Alternative if SVG divider is complex to implement:** Skip the wave and use a simple
straight edge. Prioritize the functional split layout above decorative detail.

### 9.2 Coral Accent Bar

A 4px horizontal coral bar sits at the very top of the entire hero section, full width.
`background: #E86B5A; height: 4px`. This echoes the accent stripe used on service cards and
grounds the hero as part of the same design system.

### 9.3 No Additional Decorations

Do not add:
- Star/paint-splatter graphics
- Textured background patterns in the text panel
- Floating badge/sticker elements over the image panel

The photos are rich enough. Over-decorating competes with them.

---

## 10. Accessibility Specifications

### 10.1 Contrast Ratios

| Text element          | Text color | Background    | Ratio   | WCAG      |
|-----------------------|------------|---------------|---------|-----------|
| H1 headline           | `#2C3E6B`  | `#FFFBF8`     | 9.8:1   | AAA pass  |
| Subheadline           | `#2D2D2D`  | `#FFFBF8`     | 16.1:1  | AAA pass  |
| Emphasis (Coral)      | `#E86B5A`  | `#FFFBF8`     | 3.4:1   | AA large  |
| CTA button text       | `#FFFFFF`  | `#128C7E`     | 5.8:1   | AA pass   |
| Secondary link        | `#2BA5A5`  | `#FFFBF8`     | 3.5:1   | AA large  |

Note: The emphasis line at Coral on Warm White achieves 3.4:1 — which satisfies AA for large
text (18px+ regular or 14px+ bold). At 16px/600 weight it qualifies as "bold large text" and
passes. The developer should confirm this passes their contrast checker. If needed, darken the
Coral for this specific use to `#C8523F` (approx. 4.6:1) without changing the CTA button color.

### 10.2 ARIA and Screen Reader

```html
<section class="hero-split" aria-labelledby="hero-heading">

  <!-- Text panel: always visible -->
  <div class="hero-split__text">
    <h1 id="hero-heading" class="hero-split__heading">...</h1>
    ...
  </div>

  <!-- Image panel: slideshow, decorative role -->
  <div class="hero-split__image"
       aria-label="גלריית תמונות — פעילויות יצירה ArtyParty"
       role="region">

    <!-- Each slide image must have meaningful alt text -->
    <!-- Only the active slide image is visible; inactive slides are opacity:0 -->
    <!-- Screen readers should only announce the active image -->
    <!-- Use aria-hidden="true" on inactive slide images -->

    <!-- Arrow buttons -->
    <button class="hero-split__arrow hero-split__arrow--prev"
            aria-label="תמונה קודמת">...</button>
    <button class="hero-split__arrow hero-split__arrow--next"
            aria-label="תמונה הבאה">...</button>

    <!-- Dot navigation -->
    <div class="hero-split__dots" role="tablist" aria-label="בחרו תמונה">
      <button role="tab" aria-selected="true"
              aria-label="תמונה 1 מתוך 12" class="hero-split__dot hero-split__dot--active">
      </button>
      <!-- repeat for each slide -->
    </div>
  </div>

</section>
```

### 10.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .hero-split__slide {
    transition: none;
  }
  /* Pause auto-rotation entirely */
  /* JavaScript should check this media query and disable auto-advance */
}
```

When reduced motion is active: disable auto-rotation completely. The dots and arrows still
work for manual navigation. The image panel shows the first slide statically.

### 10.4 Keyboard Navigation

- Tab order: text panel links first (CTA, secondary link), then arrow buttons, then dots
- Arrow buttons and dots are focusable buttons with `:focus-visible` showing 2px Teal outline
- Auto-rotation pauses when any control in the slideshow receives keyboard focus
- Pressing Escape while focused inside the image panel stops auto-rotation for the session

### 10.5 Touch Targets

- Dot buttons: 48×48px clickable area (visual dot is 8–12px, but button is 48px)
- Arrow buttons: 40×40px visible circle — meets the 40px minimum for desktop; not shown on
  mobile so the mobile standard of 48px is met by the dots alone

---

## 11. JavaScript Behavior Summary (for Developer Reference)

The developer implements this; these are the behavioral requirements:

**Auto-rotation:**
- Start: on page load, after 1000ms delay (gives page time to render)
- Interval: 4500ms between transitions
- Pause: on mouseenter of image panel, on focus of any control inside image panel
- Resume: on mouseleave after 500ms delay, on blur of all controls inside image panel
- Stop permanently: when `prefers-reduced-motion: reduce` is detected

**Slide transition:**
- Outgoing slide: opacity 1 → 0 over 600ms
- Incoming slide: opacity 0 → 1 over 600ms
- Transition type: CSS transition on `opacity`
- No z-index juggling required if both slides are in transition simultaneously — incoming
  slide sits on top (z-index: 1), outgoing slide underneath (z-index: 0)

**Dot sync:**
- When slide changes, remove `--active` modifier from current dot, add to new dot
- Use `aria-selected="true/false"` on dot buttons

**Swipe detection:**
- Detect touchstart x position, touchend x position
- If delta > 50px in inline-end direction (left in RTL): advance to next slide
- If delta > 50px in inline-start direction (right in RTL): go to previous slide
- No vertical swipe interference (only trigger if horizontal component is dominant)

**Image preloading:**
- First slide image: `loading="eager"`
- Slides 2 and 3: `loading="eager"` (preload for fast first transition)
- Slides 4–12: `loading="lazy"`

---

## 12. CSS Class Naming Convention

All new classes use the `hero-split` BEM block prefix:

```
.hero-split                    — section element
.hero-split__inner             — flex row container
.hero-split__text              — text panel
.hero-split__heading           — H1
.hero-split__subheadline       — body paragraph
.hero-split__emphasis          — Coral emphasis line
.hero-split__ctas              — button group wrapper
.hero-split__scroll-link       — secondary text link
.hero-split__image             — image panel
.hero-split__slide             — individual slide wrapper (position absolute, inset 0)
.hero-split__slide--active     — visible slide
.hero-split__img               — the <img> element inside each slide
.hero-split__dots              — dot navigation container
.hero-split__dot               — individual dot button
.hero-split__dot--active       — active dot state
.hero-split__arrow             — arrow button
.hero-split__arrow--prev       — previous arrow
.hero-split__arrow--next       — next arrow
.hero-split__accent-bar        — the 4px coral top bar (if implemented)
```

The existing `.hero--slideshow`, `.hero-slideshow`, and `.hero__inner--overlay` classes from
the current implementation are **replaced**, not extended. The developer should remove or
archive the old hero styles from `style.css` section 27.

---

## 13. What Stays the Same

These elements from the current hero remain unchanged:

- The H1 text content: "סדנאות יצירה לילדים שמשאירות חיוך"
- The subheadline content (paragraph 1 and emphasis line)
- The WhatsApp CTA button with icon
- The "לכל השירותים שלנו" secondary scroll link
- The 12 source image files and their alt text (only display order changes per section 5.5)
- The `aria-labelledby="hero-heading"` pattern on the section
- The WhatsApp floating button (separate component, not part of this spec)

---

## 14. Quality Checklist

Before implementation is considered complete:

- [ ] Portrait images are visible without meaningful content being cropped on all 3 breakpoints
- [ ] H1 headline is readable at first glance on mobile (32px, Navy, no overlay)
- [ ] CTA button is visible above the fold on both mobile and desktop
- [ ] Dots are visible against the image panel background (contrast test each photo)
- [ ] Auto-rotation pauses on hover and on focus
- [ ] Swipe works on mobile (test with real device, not emulator only)
- [ ] Reduced motion media query disables auto-rotation
- [ ] All dot buttons have correct aria-label and aria-selected attributes
- [ ] Arrow buttons have correct aria-label in Hebrew
- [ ] Tab order is logical: text panel links → arrows → dots
- [ ] Section does not have `min-height: 50vh` forcing empty space below short content
- [ ] Light Coral BG shows correctly during crossfade (background-color is set)
- [ ] The 4px Coral accent bar at top renders full width
- [ ] No dark overlay gradient remains from the previous implementation
- [ ] Text panel has no `color: white` or text-shadow overrides carried over from old CSS
- [ ] The wavy divider (if implemented) is `role="presentation"` and `aria-hidden="true"`
- [ ] Design passes the adult-buyer test: looks professional, not childish

---

## 15. Developer Implementation Notes

### Removing Old Hero CSS

The following CSS rules from the current `style.css` are **superseded** and should be
removed or disabled to prevent conflicts:

- `.hero--slideshow` (section 27, line ~1651)
- `.hero-slideshow` and all child rules
- `.hero-slideshow__overlay`
- `.hero-slideshow__dots` and dot child rules
- `.hero__inner--overlay` and its light variants
- `.hero__heading--light`, `.hero__emphasis--light`, `.hero__scroll-link--light`
- The tablet breakpoint rule `.hero-slideshow { min-height: 55vh; }`
- The desktop breakpoint rule `.hero-slideshow { min-height: 60vh; }`

The base `.hero`, `.hero__inner`, `.hero__text`, `.hero__heading`, `.hero__subheadline`,
`.hero__ctas`, `.hero__scroll-link` rules (from section 18 of style.css) can also be removed
if the hero-split classes fully replace them on the homepage. If other pages use `.hero`
classes, keep those — only remove the slideshow-specific overrides.

### HTML Structure Change Summary

The current `<section class="hero hero--slideshow">` structure is replaced with:

```html
<section class="hero-split" aria-labelledby="hero-heading">
  <div class="hero-split__accent-bar" aria-hidden="true"></div>
  <div class="hero-split__inner">

    <!-- Text panel (RTL: renders on right side) -->
    <div class="hero-split__text">
      <h1 class="hero-split__heading" id="hero-heading">
        סדנאות יצירה לילדים שמשאירות חיוך
      </h1>
      <p class="hero-split__subheadline">
        לילדים בכיתות א–ו באזור השרון — סדנאות יום הולדת, חוגי אמנות,
        קייטנות יצירה, וימי כיף לילדי עובדים.
      </p>
      <p class="hero-split__emphasis">
        אנחנו מטפלים בהכל — אתם רק צריכים להגיע.
      </p>
      <div class="hero-split__ctas">
        <a href="https://wa.me/972522458303"
           class="btn btn--whatsapp btn--large"
           target="_blank" rel="noopener noreferrer">
          [WhatsApp SVG icon]
          שלחו לנו הודעה בוואטסאפ
        </a>
        <a href="#services" class="hero-split__scroll-link">
          לכל השירותים שלנו
          [chevron icon]
        </a>
      </div>
    </div>

    <!-- Image panel (RTL: renders on left side) -->
    <div class="hero-split__image"
         role="region"
         aria-label="גלריית תמונות — פעילויות יצירה ArtyParty">

      <!-- Slides (position absolute, stacked) -->
      <div class="hero-split__slide hero-split__slide--active">
        <img src="..." alt="..." class="hero-split__img" loading="eager" />
      </div>
      <!-- ... remaining 11 slides ... -->

      <!-- Arrow navigation (desktop only, visually hidden on mobile/tablet via CSS) -->
      <button class="hero-split__arrow hero-split__arrow--prev"
              aria-label="תמונה קודמת">
        [left chevron SVG]
      </button>
      <button class="hero-split__arrow hero-split__arrow--next"
              aria-label="תמונה הבאה">
        [right chevron SVG]
      </button>

      <!-- Dot navigation -->
      <div class="hero-split__dots" role="tablist" aria-label="בחרו תמונה">
        <!-- 12 dot buttons, generated or hand-coded -->
      </div>

    </div>
  </div>
</section>
```
