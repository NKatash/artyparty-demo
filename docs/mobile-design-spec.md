# ArtyParty — Mobile Design Specification
## Responsive Fixes for 25 Audit Issues

**Document version:** 1.0  
**Date:** April 7, 2026  
**Author:** Web Designer Agent  
**Intended reader:** Web Developer Agent  
**Target file:** `website/css/style.css` — append as new section 56  

---

## Overview

This specification resolves all 25 issues found in the mobile audit. The fixes are organized as a single new CSS block to append at the end of `style.css`. Every rule here is additive — nothing removes or overrides intentional desktop behavior.

The CSS architecture uses three tiers of mobile targeting:

| Breakpoint label | Media query | Covers |
|---|---|---|
| XS (small phones) | `@media (max-width: 479px)` | iPhone SE, Galaxy A-series, 375–479px viewports |
| SM (large phones) | `@media (min-width: 480px) and (max-width: 767px)` | Large phones, small tablets held portrait, 480–767px viewports |
| MD (tablet) | `@media (min-width: 768px)` | Already defined in style.css — only referenced here for context |

All values follow the existing 8px grid using the existing CSS custom properties (`--space-1` through `--space-10`). Hard-coded pixel values are used only where a CSS variable does not exist at the required size.

---

## Section 1: Global Mobile Rules

### 1.1 Container Padding — Issue #11

**Problem:** `.container` uses `padding-inline: var(--space-3)` (24px) as the base. On 375px this consumes 48px total, leaving only 327px for content. This cascades into every section.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .container {
    padding-inline: var(--space-2); /* 16px each side = 32px total, leaving 343px on 375px */
  }
}
```

**Visual result:** 16px side gutters on small phones. Matches common iOS/Android native app gutter convention. Restores to 24px at 480px+ automatically (no SM rule needed — the base rule covers it).

### 1.2 Section Heading Typography — Issue #12

**Problem:** `.section-heading` is 26px at mobile base. On 375px with a 327px content width, long Hebrew headings like "למה לבחור בארטי פארטי?" wrap into 3 lines and dominate the viewport.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .section-heading {
    font-size: 22px;
    line-height: 28px;
  }
}
```

**Rationale:** 22px / 28px maps directly to the H3 mobile scale from the design system (`H3: mobile 20px/28px`). At 22px a typical 6–8 word Hebrew heading wraps to at most 2 lines on 327px. Font weight stays 600 (no change needed — already defined on the base class).

### 1.3 Body Font — No Change

Body text is 16px with 1.6 line-height. This is the minimum acceptable body size per WCAG and the brand guidelines. Do not reduce on mobile.

### 1.4 Section Vertical Padding — Section rhythm on small phones

**Problem:** `.section` uses `padding-block: var(--space-6)` (48px). On a 375px phone this is fine, but combined with oversized headings and images it compounds the scrolling problem. Reducing to 40px on XS creates breathing room without cramping.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .section {
    padding-block: var(--space-5); /* 40px — one step down from 48px */
  }
  .services,
  .why-us,
  .testimonials,
  .about-teaser {
    padding-block: var(--space-5); /* 40px */
  }
  .page-hero {
    padding-block: var(--space-5); /* 40px — reduced from 64px (--space-8) */
  }
}
```

**Tablet (480–767px):** No change — `--space-6` (48px) remains appropriate.

### 1.5 Touch Active Feedback — Issue #25

**Problem:** No `:active` style defined. On mobile, finger taps have no visual confirmation, which degrades perceived responsiveness.

**Fix (global — no breakpoint needed):**

```css
/* Applied globally — no breakpoint wrapper */
.btn:active,
a.btn:active {
  opacity: 0.85;
  transform: scale(0.98);
}

a:active:not(.btn):not(.navbar__nav-link):not(.footer__link) {
  opacity: 0.7;
}
```

**Rationale:** Scale + opacity together are more perceptible than opacity alone on small touch targets. 200ms ease transition (already defined as `--transition-hover`) handles the snap back.

---

## Section 2: Navbar (Mobile)

### 2.1 Navbar Height on Small Phones — Issue #6

**Problem:** The navbar inner height is 60px and the logo is also 60px. On a 375px screen this leaves no visual breathing room above and below the logo — the logo sits flush with the navbar edges.

**Current values:**
- `.navbar__inner` height: `60px`
- `.navbar__logo-img` height: `60px`

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .navbar__inner {
    height: 56px;
  }
  .navbar__logo-img {
    height: 44px; /* 8px clear space above and below within 56px navbar */
  }
}
```

**Visual result:** 56px navbar, 44px logo, 6px breathing room above and below the logo. The hamburger button is already 48x48px (passes touch target check). No change to hamburger sizing.

**RTL note:** Logo sits at `inset-inline-start` (right side in RTL). Hamburger sits at `inset-inline-end` (left side in RTL). This is already handled by the existing flex layout — no additional RTL rule needed.

### 2.2 Mobile Menu Link Height and Font — Issue #7

**Problem:** `.mobile-menu__link` has `min-height: 64px` and `font-size: 20px`. With 8 nav items plus the header row, the total menu height exceeds 375px, requiring the user to scroll inside the overlay.

**Current values:**
- `min-height: 64px`
- `font-size: 20px`
- `padding-inline: 32px`

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .mobile-menu__link {
    min-height: 56px; /* still well above 48px minimum touch target */
    font-size: 18px;
    padding-inline: var(--space-3); /* 24px — tighter but still readable */
  }
}
```

**Calculation:** 8 links x 56px = 448px. Plus menu header (60px) = 508px. This still slightly exceeds 375px but by only ~133px, meaning the user only needs a short scroll to reach the bottom item. The alternative — 48px per link — would feel cramped. 56px is the right balance.

**Large phone (SM) — no change needed:** At 480px the full 64px height fits comfortably with room to spare.

### 2.3 Mobile Menu Panel Width

**Current value:** `max-width: 320px`. On a 375px screen this is fine (leaves 55px exposed for the backdrop tap-to-close zone). No change needed.

### 2.4 Mobile Menu Slide Direction — RTL Confirmation

The current CSS uses `transform: translateX(-100%)` to hide the panel and `translateX(0)` to open. In RTL the menu is positioned at `inset-inline-start: auto` (left in RTL becomes visually right, meaning `inset-inline-end: auto`). 

**Design intent confirmation:** The mobile menu slides in from the left side in RTL (the reading-end side, where the hamburger button is). This is correct RTL behavior — do not change it.

---

## Section 3: Hero Section (Mobile)

### 3.1 Hero Image Panel Height — Issue #1 (Critical)

**Problem:** `.hero-split__image` has `height: 72vw; max-height: 340px; min-height: 260px`. On a 375px phone: `72vw = 270px`. The text panel below adds another ~280px minimum. Total hero = ~550px, which means the user must scroll before seeing any page content below the fold.

**Target:** Image panel should be no taller than 50% of the viewport height so at least the heading and CTA are visible without scrolling on a 375px phone (667px tall = standard iPhone 6/7/8).

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .hero-split__image {
    height: 50vw;       /* 375px x 0.50 = 188px */
    max-height: 220px;  /* hard cap prevents oversizing on wider XS screens */
    min-height: 160px;  /* ensures image is never too small to show photo */
  }
}
```

**Calculation check:** Image panel 220px + text panel (heading ~80px + subheadline ~60px + CTAs ~80px + padding 32px top + 40px bottom = ~292px) = total ~512px on a 667px phone. This means the CTA button is visible above the fold. On a 568px (iPhone 5) phone it will require a small scroll — acceptable.

**Large phones (SM):**

```css
@media (min-width: 480px) and (max-width: 767px) {
  .hero-split__image {
    height: 60vw;
    max-height: 300px;
    min-height: 200px;
  }
}
```

### 3.2 Hero Heading Size — Issue #13

**Problem:** `.hero-split__heading` is 32px on mobile base. On 327px content width this causes 2-line wrapping even for short headings, making the text panel very tall.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .hero-split__heading {
    font-size: 26px;
    line-height: 34px;
  }
}
```

**Large phones (SM):**

```css
@media (min-width: 480px) and (max-width: 767px) {
  .hero-split__heading {
    font-size: 28px;
    line-height: 36px;
  }
}
```

**Rationale:** 26px on XS maps between the H2 mobile (26px) and H3 mobile (20px) values. It keeps the heading prominent without dominating the entire text panel. At 480px+ returning to 28px is comfortable since the content area is wider.

### 3.3 Hero Text Panel Horizontal Padding — Issue #22

**Problem:** `.hero-split__text` has `padding: 32px 24px 40px 24px`. Combined with the container's 24px gutters, horizontal padding is eating too much horizontal space. Since the text panel already lives inside `.hero-split__inner` which does not use the `.container` wrapper, the padding must be handled directly on the text element.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .hero-split__text {
    padding: 24px 16px 32px 16px;
  }
}
```

**Visual result:** 16px horizontal padding inside the hero text panel on small phones. This gives 343px of usable text width on a 375px phone.

### 3.4 Hero CTA Buttons — Full Width on Mobile — Issue #15

**Problem:** `.hero-split__ctas .btn--whatsapp` is already set to `width: 100%` on mobile. The primary button (`.btn--primary`) is not. On XS phones, the buttons look disconnected when they are different widths.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .hero-split__ctas .btn {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
}
```

**Rationale:** Full-width buttons are standard mobile pattern for primary CTAs. They maximize tap target area and create visual consistency within the CTA group.

### 3.5 Slideshow Dots — Navigation on Mobile

**Current state:** Dots are 48px touch targets (as confirmed in the audit passing checks). No change needed to dot sizes.

**Dot bar position on XS:** The dots bar sits at `inset-block-end: 12px` inside the image panel. With the image panel shrinking to 220px on XS, 12px from the bottom remains correct — dots stay visible within the image. No change needed.

**Arrow buttons:** Already hidden on mobile and tablet (`display: none` below 1024px). No change needed.

---

## Section 4: Homepage Sections (Mobile)

### 4.1 Services Grid Spacing — Issue #4

**Problem:** `.services__grid` uses `gap: var(--space-3)` (24px). On XS phones with full-width single-column cards, 24px between cards feels cramped because the cards themselves already have inner shadow and padding creating visual density.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .services__grid {
    gap: var(--space-4); /* 32px — more breathing room between stacked cards */
    margin-block-start: var(--space-3); /* 24px — slightly tighter top margin */
  }
}
```

**Rationale:** Counter-intuitively, increasing gap on small phones gives the eye more rest between cards, which makes the content feel less overwhelming. Each card is already full-width so the extra gap doesn't waste column space.

**Layout at each breakpoint:**
- XS (< 480px): 1 column, `gap: 32px`
- SM (480–767px): 1 column, `gap: 24px` (base rule applies)
- MD (768px+): 2 columns (existing rule), `gap: 24px`
- Desktop (1024px+): 4 columns (existing rule)

### 4.2 Benefits Section (Why ArtyParty) — Issue #18

**Problem:** `.benefit` has `padding-block: var(--space-2)` (16px) and `.benefit__icon-wrap` is 56px. On XS with 4 stacked benefit items, this creates excessive vertical scroll distance.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .benefit {
    padding-block: var(--space-1); /* 8px — reduces vertical spread per item */
  }
  .benefit__body {
    font-size: 15px; /* already 15px — no change, confirmed readable */
  }
}
```

**Icon wrap:** The 56px icon circle remains. Reducing it would weaken the visual rhythm. The icon size is already the minimum comfortable size for this design.

### 4.3 Testimonials Carousel Overflow — Issue #8

**Problem:** `.testimonials__track` uses `margin-inline: calc(-1 * var(--space-3))` (-24px) to create a bleed effect that allows the next card to peek. On 375px this creates a visible horizontal scrollbar and layout shift because the `-24px` combined with the container's `24px` padding cancels out but the scroll container still visually overflows the screen edge.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .testimonials__track {
    margin-inline: calc(-1 * var(--space-2)); /* -16px instead of -24px */
    padding-inline: var(--space-2);           /* 16px — matches container at XS */
    scroll-padding-inline-start: var(--space-2);
  }
}
```

**Calculation:** On XS the container has `padding-inline: 16px`. The negative margin matches this exactly, so the track bleeds precisely to the screen edge without overflow. The next-card peek effect is preserved.

### 4.4 About Teaser Section — Founder Photo Height — Issue #20

**Problem:** `.about-story__photo-float img` has `height: 280px` on mobile. On a stacked single-column layout on XS this makes the photo section extremely tall relative to the viewport.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .about-story__photo-float img {
    height: 220px; /* 60px reduction from 280px */
  }
  .about-teaser__photo {
    /* aspect-ratio: 3/4 already set — override with constrained max-height */
    max-height: 260px;
  }
}
```

**Visual result:** The founder photo remains tall enough to show face and shoulders (220px at full width = a pleasing portrait proportion). At 280px the photo was dominating the entire viewport.

### 4.5 Final CTA Section — WhatsApp Button Overlap — Issue #10

**Problem:** The fixed WhatsApp float button (`inset-block-end: 24px`) overlaps the CTA buttons at the bottom of each page on mobile. Users tapping the primary CTA may accidentally hit the WhatsApp button.

**Fix (XS and SM — all mobile):**

```css
@media (max-width: 767px) {
  .whatsapp-float {
    inset-block-end: 90px; /* raise above typical bottom browser chrome */
  }
  .cta-final {
    padding-block-end: calc(var(--space-10) + 24px); /* 80px + 24px = 104px — ensures CTA buttons clear the float */
  }
}
```

**Rationale:** 90px from the bottom places the WhatsApp button above both the iOS Safari bottom toolbar (49px) and the Android Chrome bottom bar (~56px). The CTA section's extra bottom padding creates a safe zone so no page content sits under the float button when scrolled to the bottom.

**Touch target:** The WhatsApp float is 56x56px circle — this remains unchanged and passes the 48px minimum.

---

## Section 5: Birthday Workshops and Art Classes Pages (Mobile)

### 5.1 Workshop Card Image Height — Issue #3

**Problem:** `.workshop-card__img` has `height: 220px`. On a 375px phone, a full-width card with a 220px image is disproportionately tall and feels like a banner, not a card. The image dominates 67% of the card's visible height.

**Fix with breakpoint cascade:**

```css
@media (max-width: 479px) {
  .workshop-card__img {
    height: 160px; /* ~43% reduction — balanced card proportion on small phone */
  }
}

@media (min-width: 480px) and (max-width: 767px) {
  .workshop-card__img {
    height: 200px; /* intermediate value for large phones */
  }
}

/* Desktop (1024px+) already has height: 260px in style.css section 43 */
```

**Card layout at each breakpoint:**
- XS (< 480px): 1 column, image 160px
- SM (480–767px): 1 column, image 200px
- MD (768px+): 2 columns (existing), image 220px
- Desktop (1024px+): 3 columns (existing), image 260px

### 5.2 Workshop Card Content Padding

**Current value:** `.workshop-card__content` has `padding: 20px 24px 24px`. On XS with the container having only 16px gutters, 24px horizontal padding inside the card content creates a dense, padded look. Slightly reducing improves consistency.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .workshop-card__content {
    padding: 16px 20px 20px;
  }
}
```

### 5.3 Page Hero Image — Issue #2

**Problem:** `.page-hero__image img` has `height: 240px` on the mobile base. On XS with the container at 16px gutters (343px usable), a 240px tall image takes up 70% of a 375px viewport height immediately below the navbar.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .page-hero__image img {
    height: 200px; /* 40px reduction — proportionally appropriate for content area width */
  }
}
```

**Visual result:** On XS the page hero has a 200px image, a heading (22px), and a subheadline (2-3 lines) visible together. This creates a readable, complete above-the-fold unit.

### 5.4 Page Hero Heading — Issue #14

**Problem:** `.page-hero__heading` is 28px on the mobile base. Combined with long Hebrew service names this wraps aggressively on 375px.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .page-hero__heading {
    font-size: 22px;
    line-height: 28px;
  }
}
```

**Rationale:** Matches the `.section-heading` adjustment (issue #12) for visual consistency across all page headings.

### 5.5 Gallery Lightbox on Mobile — Issue #21

**Problem:** `.lightbox__inner` has `padding: 48px 16px 64px`. The top 48px (reserved for the close button) and bottom 64px (counter zone) reduce the usable image area to approximately `100vh - 112px`. On a 667px phone that is only 555px tall for the image. Tighter padding gives the image more room.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .lightbox__inner {
    padding: 40px 8px 56px;
  }
  .lightbox__image-wrap {
    max-width: calc(100% - 96px); /* leaves 48px on each side for nav arrows */
  }
}
```

**Swipe behavior:** Touch swipe support is already confirmed passing in the audit. No new behavior needed.

**Close button:** Already 48x48px at `inset-block-start: 12px; inset-inline-end: 12px`. With the tighter padding the close button still clears the image area. No change needed.

**Nav arrows:** Already 48x48px. In the lightbox they are inside `.lightbox__inner`, not the image wrap, so they remain accessible on the sides. No change needed.

---

## Section 6: All Other Pages (Mobile)

### 6.1 Gallery Grid — Forced 2 Columns on Small Phones — Issue #9

**Problem:** `.gallery-grid` has `grid-template-columns: repeat(2, 1fr)` as the base rule with no mobile override. On 375px with 16px gutters (343px wide), each column is only 157px wide — thumbnails are too small to see clearly and the tap target becomes too narrow. 

**Fix:**

```css
@media (max-width: 479px) {
  .gallery-grid {
    grid-template-columns: 1fr; /* single column on small phones */
    gap: var(--space-2);        /* 16px gap in single-column layout */
  }
  .gallery-grid--studio {
    grid-template-columns: 1fr; /* also single column for studio variant */
  }
  /* Remove the centered half-width effect on XS — not meaningful at single column */
  .gallery-item--centered-half {
    max-width: 100%;
    grid-column: auto;
  }
}

@media (min-width: 480px) and (max-width: 767px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on large phones */
    gap: var(--space-2);
  }
}
```

**Gallery image sizing:** The existing rule in section 49 of `style.css` uses `aspect-ratio: 4/3` with `height: auto` on mobile base — this already handles responsive image sizing. In single-column layout on XS, the image will be ~343px wide x ~257px tall, which is a proper showcase size. This is correct.

**Columns by breakpoint:**
- XS (< 480px): 1 column, aspect-ratio images
- SM (480–767px): 2 columns, aspect-ratio images
- MD (768px+): 3 columns, 200px explicit height (existing rule)
- Desktop (1024px+): 3 columns, 220px (existing rule)

### 6.2 About Page — Story Photo Height — Issue #20 (duplicate for .story-photo)

**Problem:** `.story-photo img` has `height: 320px` on the mobile base (section 38 of `style.css`). On XS this is a full-page-height image when stacked, making the section very tall.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .story-photo img {
    height: 220px;
  }
}
```

### 6.3 Contact Page — Contact Method Cards — Issue #17

**Problem:** `.contact-method` is a flex row with a 52px icon + 24px gap + text. On 375px with 16px gutters (343px content), the text area is only `343 - 52 - 24 = 267px`. For phone numbers and WhatsApp links this is adequate, but for longer descriptions it wraps poorly and the layout feels cramped.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .contact-method {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--space-3); /* 24px all around */
    gap: var(--space-2);     /* 16px between icon and text */
  }
  .contact-method__body {
    text-align: center;
  }
  .contact-method__action {
    align-self: center;
  }
}
```

**RTL note:** In RTL, `text-align: center` is direction-neutral. Using `text-align: start` would align to the right in RTL; center aligns symmetrically, which works for the stacked card layout.

### 6.4 Contact Form Padding — Issue #5

**Problem:** `.contact-form` has `padding: var(--space-5)` (40px). On XS with 16px gutters, the form card is `375 - 32 = 343px` wide. Inside the form `padding: 40px` leaves only `343 - 80 = 263px` for input fields. Input fields become so narrow that Hebrew text in them wraps mid-word and the tap targets feel cramped.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .contact-form {
    padding: var(--space-3); /* 24px — leaves 343 - 48 = 295px for inputs */
  }
  .form-success {
    padding: var(--space-3);
  }
}
```

**Input field height:** Already 48px (`padding: 10px 14px` with 16px font = ~38px content + ~20px padding = 48px effective). Passes touch target minimum. No change needed.

### 6.5 Info Cards Padding — Issue #19

**Problem:** `.info-card` has `padding: var(--space-4)` (32px). On XS with 16px gutters and 32px internal padding on each side, the content area is `343 - 64 = 279px`. This is borderline for a list of service details.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .info-card {
    padding: var(--space-3); /* 24px — leaves 343 - 48 = 295px for content */
  }
}
```

### 6.6 Steps Component — Issue #16

**Problem:** `.step` is a flex row: `44px number circle + 24px gap + text`. On XS the text area is `343 - 44 - 24 = 275px`. The issue is not width — it is that the step number sits at the top of the flex item while the content text may span several lines, creating a visual disconnect between the large number and its associated text.

Additionally for `.steps--horizontal` (used on holiday-camps and fun-days), this class is already overridden at 768px to go horizontal. The problem is only on XS where it must be vertical.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .step {
    flex-direction: column;   /* stack number above text */
    align-items: flex-start;
    gap: var(--space-2);      /* 16px between number and content */
  }
  .step__number {
    /* number circle stays 44px — meets touch target as visual anchor */
    flex-shrink: 0;
  }
  .step__content {
    padding-block-start: 0; /* remove the 8px top offset — not needed in column layout */
  }
}
```

**RTL note:** In RTL `align-items: flex-start` aligns the number circle to the right (reading start). This is correct — the number appears at the top-right of its step cell, which flows naturally in RTL reading order.

### 6.7 Fun Days Page — B2B Sections

The fun days page uses the same components as other service pages (`.page-hero`, `.section`, `.workshop-card`, `.info-card`, `.step`, `.cta-final`). All the fixes in sections 4, 5, and 6 above apply equally. The Teal color accent on this page is preserved — no color overrides are introduced for mobile.

**B2B-specific note:** The benefits grid on fun-days uses `.benefits-grid` (1 column mobile, 2 column at 768px+). This is already correct mobile behavior. No change needed.

### 6.8 Placeholder Images — Aspect Ratio — Issue #24

**Problem:** `.placeholder-img--hero` has a fixed `height: 260px` and `.placeholder-img--card` has `height: 180px`. These do not adapt to screen width.

**Fix (XS only):**

```css
@media (max-width: 479px) {
  .placeholder-img--hero {
    height: auto;
    aspect-ratio: 16 / 9; /* ~343 x 193px on 375px phone — compact but clear */
  }
  .placeholder-img--card {
    height: auto;
    aspect-ratio: 16 / 9;
  }
  .placeholder-img--about {
    height: auto;
    aspect-ratio: 4 / 3;
  }
}
```

**Rationale:** `aspect-ratio` is the correct approach for responsive images as noted in the audit. At 343px wide, `16/9` produces 193px, and `4/3` produces 257px. These are proportionally correct without being oversized.

---

## Section 7: Touch Targets — Comprehensive Audit

### 7.1 Minimum Size Guarantee

All interactive elements must be a minimum of 48x48px. Status at XS:

| Element | Current size | Passes 48px? | Action |
|---|---|---|---|
| `.btn` (primary) | `min-height: 48px`, horizontal padding 24px | Yes — width on XS will be 100% (section 3.4) | No change |
| `.btn--large` | `min-height: 52px` | Yes | No change |
| `.navbar__hamburger` | `48px x 48px` | Yes | No change |
| `.mobile-menu__close` | `48px x 48px` | Yes | No change |
| `.mobile-menu__link` | Reduced to `min-height: 56px` on XS | Yes | Fixed in section 2.2 |
| `.hero-split__dot` | `48px x 48px` | Yes | No change |
| `.testimonials__dot` | `48px x 48px` (visual 8px via `::after`) | Yes | No change |
| `.lightbox__close` | `48px x 48px` | Yes | No change |
| `.lightbox__nav` | `48px x 48px` | Yes | No change |
| `.whatsapp-float` | `56px x 56px` circle | Yes | No change |
| `.footer__social-link` | `40px x 40px` | No — below 48px | Fix below |
| `.gallery-item` | Variable — on XS single column: full width x aspect-ratio height | Yes (width is 100%, height ~200px+) | No change |
| `.workshop-card__image-wrap` (gallery trigger) | Full-width card, min 48px easily | Yes | No change |

**Footer social icon fix:**

```css
/* Global — no breakpoint needed */
.footer__social-link {
  width: 44px;  /* increase from 40px to 44px */
  height: 44px; /* increase from 40px to 44px */
}
```

Note: 44px is Apple HIG minimum and close to 48px. Given the footer is at the end of the page and social icons are secondary actions, 44px is an acceptable compromise vs. expanding to 48px which would create visual imbalance in the footer social row. A `padding: 2px` could be added to create a 48px effective tap target if strict WCAG adherence is required.

### 7.2 Spacing Between Touch Targets

WCAG 2.5.8 (AAA) recommends at least 24px spacing between adjacent touch targets. Review:

| Adjacent targets | Spacing | Status |
|---|---|---|
| Mobile menu links | Separated by 1px border only — but each link is 56px tall, so centers are 56px apart | Pass |
| Hero slideshow dots | `gap: 0` between 48px targets — centers are 48px apart | Pass |
| Testimonial dots | `gap: 8px` between 48px targets — centers are 56px apart | Pass |
| Navbar hamburger vs logo | Logo is not interactive; only the hamburger is. Gap > 24px | Pass |
| WhatsApp float vs page CTAs | Fixed at `bottom: 90px` after fix — CTAs in `.cta-final` have `padding-block-end: 104px` | Pass |
| Footer social links | `gap: 16px` between 44px targets — centers are 60px apart | Pass |

---

## Section 8: Missing Intermediate Breakpoint (480–767px) — Issue #23

This is the systemic gap in the CSS architecture. The site currently jumps from mobile (< 768px) to tablet (768px+) with no intermediate rules. The fixes below create the new `@media (min-width: 480px) and (max-width: 767px)` block.

**New SM breakpoint rules:**

In addition to the per-component SM rules already specified in sections above, add these general rules:

```css
@media (min-width: 480px) and (max-width: 767px) {
  /* Container padding: stay at 24px (the base rule covers this) */

  /* Section heading: at 480px+ the base 26px is acceptable */

  /* Workshop cards: still 1 column but image is 200px (section 5.1) */

  /* Gallery: 2 columns at 480px+ (section 6.1) */

  /* Hero image panel: 60vw / max 300px (section 3.1) */

  /* Hero heading: 28px (section 3.2) */

  /* Mobile menu links: stay at base 64px / 20px font — room available */
}
```

Most SM rules are already specified inline above. This block documents that the developer should NOT apply XS-only rules at 480–767px, letting the base mobile rules apply naturally.

---

## Section 9: Complete Implementation Block

The developer should append the following as a new section 56 in `style.css`. All rules are ordered: global > component > page-specific. XS rules come before SM rules within each component.

```css
/* =============================================================================
   56. Mobile Responsiveness Fixes
   Resolves 25 issues from mobile audit (April 2026).
   XS = max-width: 479px (small phones, 375–479px)
   SM = min-width: 480px AND max-width: 767px (large phones)
   See: website/docs/mobile-design-spec.md
============================================================================= */

/* --- Active touch feedback (global) --- */
.btn:active,
a.btn:active {
  opacity: 0.85;
  transform: scale(0.98);
}

/* --- Footer social links: enlarge touch target --- */
.footer__social-link {
  width: 44px;
  height: 44px;
}

/* ======================================================
   XS BREAKPOINT — max-width: 479px
====================================================== */
@media (max-width: 479px) {

  /* Container */
  .container {
    padding-inline: var(--space-2); /* 16px */
  }

  /* Section vertical padding */
  .section {
    padding-block: var(--space-5); /* 40px */
  }
  .services,
  .why-us,
  .testimonials,
  .about-teaser {
    padding-block: var(--space-5); /* 40px */
  }
  .page-hero {
    padding-block: var(--space-5); /* 40px */
  }

  /* Section heading typography */
  .section-heading {
    font-size: 22px;
    line-height: 28px;
  }

  /* ---- Navbar ---- */
  .navbar__inner {
    height: 56px;
  }
  .navbar__logo-img {
    height: 44px;
  }

  /* ---- Mobile menu ---- */
  .mobile-menu__link {
    min-height: 56px;
    font-size: 18px;
    padding-inline: var(--space-3); /* 24px */
  }

  /* ---- Hero split ---- */
  .hero-split__image {
    height: 50vw;
    max-height: 220px;
    min-height: 160px;
  }
  .hero-split__text {
    padding: 24px 16px 32px 16px;
  }
  .hero-split__heading {
    font-size: 26px;
    line-height: 34px;
  }
  .hero-split__ctas .btn {
    width: 100%;
    text-align: center;
    justify-content: center;
  }

  /* ---- Services grid ---- */
  .services__grid {
    gap: var(--space-4); /* 32px */
    margin-block-start: var(--space-3); /* 24px */
  }

  /* ---- Benefits ---- */
  .benefit {
    padding-block: var(--space-1); /* 8px */
  }

  /* ---- Testimonials ---- */
  .testimonials__track {
    margin-inline: calc(-1 * var(--space-2)); /* -16px */
    padding-inline: var(--space-2);           /* 16px */
    scroll-padding-inline-start: var(--space-2);
  }

  /* ---- About teaser / founder photo ---- */
  .about-story__photo-float img {
    height: 220px;
  }
  .about-teaser__photo {
    max-height: 260px;
  }

  /* ---- Final CTA + WhatsApp float ---- */
  .whatsapp-float {
    inset-block-end: 90px;
  }
  .cta-final {
    padding-block-end: calc(var(--space-10) + 24px); /* 104px */
  }

  /* ---- Page hero ---- */
  .page-hero__image img {
    height: 200px;
  }
  .page-hero__heading {
    font-size: 22px;
    line-height: 28px;
  }

  /* ---- Workshop cards ---- */
  .workshop-card__img {
    height: 160px;
  }
  .workshop-card__content {
    padding: 16px 20px 20px;
  }

  /* ---- Gallery lightbox ---- */
  .lightbox__inner {
    padding: 40px 8px 56px;
  }
  .lightbox__image-wrap {
    max-width: calc(100% - 96px);
  }

  /* ---- Gallery grid ---- */
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: var(--space-2); /* 16px */
  }
  .gallery-grid--studio {
    grid-template-columns: 1fr;
  }
  .gallery-item--centered-half {
    max-width: 100%;
    grid-column: auto;
  }

  /* ---- About story photo ---- */
  .story-photo img {
    height: 220px;
  }

  /* ---- Contact method cards ---- */
  .contact-method {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--space-3); /* 24px */
    gap: var(--space-2);     /* 16px */
  }
  .contact-method__body {
    text-align: center;
  }
  .contact-method__action {
    align-self: center;
  }

  /* ---- Contact form ---- */
  .contact-form {
    padding: var(--space-3); /* 24px */
  }
  .form-success {
    padding: var(--space-3);
  }

  /* ---- Info cards ---- */
  .info-card {
    padding: var(--space-3); /* 24px */
  }

  /* ---- Steps ---- */
  .step {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2); /* 16px */
  }
  .step__content {
    padding-block-start: 0;
  }

  /* ---- Placeholder images ---- */
  .placeholder-img--hero {
    height: auto;
    aspect-ratio: 16 / 9;
  }
  .placeholder-img--card {
    height: auto;
    aspect-ratio: 16 / 9;
  }
  .placeholder-img--about {
    height: auto;
    aspect-ratio: 4 / 3;
  }
}

/* ======================================================
   SM BREAKPOINT — 480px to 767px
====================================================== */
@media (min-width: 480px) and (max-width: 767px) {

  /* Hero split image panel */
  .hero-split__image {
    height: 60vw;
    max-height: 300px;
    min-height: 200px;
  }
  .hero-split__heading {
    font-size: 28px;
    line-height: 36px;
  }

  /* Workshop card image */
  .workshop-card__img {
    height: 200px;
  }

  /* Gallery grid: 2 columns on large phones */
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-2); /* 16px */
  }
}
```

---

## Section 10: Design Decisions and Rationale

### Why not reduce font sizes further on XS?

Body text (16px) and small text (14px) are not reduced because the WCAG minimum and the brand style guide both require 14px as the floor. Hebrew text in Rubik at 14px on a 375px screen is readable but only just. The audit did not flag any body text sizing issues — only heading sizes. Heading reductions are scoped to sizes that would still pass the `H2 mobile: 26px` design system spec.

### Why does the WhatsApp float move up so far (90px)?

Mobile browsers have bottom UI chrome:
- iOS Safari: 49px bottom toolbar when not scrolled, 0px when scrolled
- Android Chrome: ~56px bottom bar

Setting `inset-block-end: 90px` means the button clears the tallest browser chrome (56px) with 34px of additional clearance. The alternative — `inset-block-end: 70px` — would still overlap iOS Safari's toolbar on short pages. 90px is the safe universal value.

### Why switch steps to column layout on XS?

The audit flagged that the horizontal step (number + text side-by-side) leaves only ~275px for text. While this is technically workable, the real problem is when a step has 2–3 lines of Hebrew text: the number circle floats mid-height, disconnected from the text block. Stacking number above text creates a clear visual relationship: "this number owns this text." The numbered steps in Hebrew read naturally top-to-bottom in column format.

### RTL implications of flex-direction changes

When `flex-direction: column` is applied to RTL elements:
- `align-items: flex-start` in RTL aligns to the right (reading start). This is correct for steps and contact method icons.
- `align-items: center` is direction-neutral — used for contact method cards in column layout.
- `text-align: center` is used for the stacked contact method text — not `text-align: start` — because a centered icon above centered text creates a coherent card feel.

### Testimonials: why not hide dots on XS?

The carousel scroll-snap behavior is the primary navigation on mobile. Dots provide a visual indicator of position (how many testimonials remain). Hiding them on XS would remove the only visual cue that more testimonials are scrollable. Dots stay visible on XS.

---

## Section 11: Testing Instructions for Developer

After implementing the CSS block from section 9:

1. **375px test (XS):** Open DevTools, set viewport to 375px. Verify:
   - Navbar: 56px tall, logo 44px, hamburger visible and not overlapping logo
   - Hero: image panel ~188–220px, heading 26px, CTAs full-width
   - Services section: cards full-width, 32px gap between cards
   - Testimonials: carousel scroll works, no horizontal scrollbar on body
   - All body content: no horizontal overflow
   - WhatsApp float: visible at 90px from bottom, not overlapping page CTAs
   - Gallery grid: 1 column
   - Contact form: 24px padding, inputs comfortably wide

2. **390px test (standard phone):** Verify no layout breakage at standard iPhone size.

3. **480px test (SM boundary):** Verify no abrupt layout jumps when crossing 480px. Gallery should switch from 1 to 2 columns at this point.

4. **768px test (tablet boundary):** Verify existing desktop-up rules still apply. No regressions.

5. **RTL check:** All stacked layouts (steps, contact methods) should align to the right in RTL. No LTR-leaked `left`/`right` physical properties should appear.

6. **Reduced motion:** With `prefers-reduced-motion` enabled, the WhatsApp pulse animation, hero slide transitions, and `.btn:active` transform should all be suppressed (handled by existing section 23 in `style.css`).

---

## Summary of Issues Resolved

| # | Issue | Solution section | Priority |
|---|---|---|---|
| 1 | Hero image panel height excessive scrolling | 3.1 | Critical |
| 2 | Page hero image sizing on small phones | 5.3 | Critical |
| 3 | Workshop card images not responsive | 5.1 | Critical |
| 4 | Service cards insufficient spacing | 4.1 | Critical |
| 5 | Contact form padding excessive | 6.4 | Critical |
| 6 | Navbar cramped on small phones | 2.1 | Critical |
| 7 | Mobile menu links too tall | 2.2 | Critical |
| 8 | Testimonial carousel overflow | 4.3 | Critical |
| 9 | Gallery grid forced 2 columns on 375px | 6.1 | Critical |
| 10 | WhatsApp float covers CTAs | 4.5 | Critical |
| 11 | Container padding too wide on 375px | 1.1 | Medium |
| 12 | Section heading font too large on mobile | 1.2 | Medium |
| 13 | Hero heading size excessive on mobile | 3.2 | Medium |
| 14 | Page hero heading too large on mobile | 5.4 | Medium |
| 15 | CTA buttons not full width on mobile | 3.4 | Medium |
| 16 | Steps layout cramped on mobile | 6.6 | Medium |
| 17 | Contact method cards cramped | 6.3 | Medium |
| 18 | Benefit cards not optimized for mobile | 4.2 | Medium |
| 19 | Info cards padding excessive | 6.5 | Medium |
| 20 | About story photo too tall | 4.4, 6.2 | Medium |
| 21 | Lightbox padding on mobile | 5.5 | Low |
| 22 | Hero text panel padding excessive | 3.3 | Low |
| 23 | Missing intermediate breakpoint (480–767px) | 3.1, 3.2, 5.1, 6.1, Sec. 8 | Low |
| 24 | Placeholder images don't scale responsively | 6.8 | Low |
| 25 | No tap/active feedback on mobile | 1.5 | Low |
