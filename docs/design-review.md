# ArtyParty Website — Design Review Report

**Date:** 2026-04-04
**Reviewer:** Web Designer Agent (Senior UI/UX)
**Scope:** All 7 pages + CSS stylesheet
**Reference:** CLAUDE.md brand bible + .claude/agents/web-designer.md design system

---

## Executive Summary

The ArtyParty website has a **strong foundation**: the design system is well-defined with CSS custom properties, the brand palette is correctly implemented, typography hierarchy is clear, and the mobile-first approach with RTL is solid. The overall feel is warm, professional, and appeals to adults — which is exactly right.

The issues below are refinements, not rewrites. They fall into: spacing/consistency issues between pages, minor accessibility gaps, inline-style overuse on inner pages, and a few component-level polish items.

---

## HIGH PRIORITY

### H1. Hero slideshow dots fail mobile touch target (48px minimum)

- **Page:** index.html (Homepage)
- **Problem:** `.hero-slideshow__dot` is only 8x8px with no surrounding touch area. The testimonial dots correctly use 48px hit areas with a pseudo-element for the visual dot, but the hero dots don't follow this pattern. On mobile, users cannot reliably tap these.
- **Fix:** Apply the same pattern as `.testimonials__dot`:
```css
.hero-slideshow__dot {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hero-slideshow__dot::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  transition: background-color var(--transition-hover), transform var(--transition-hover);
}

.hero-slideshow__dot--active::after {
  background-color: var(--color-white);
  transform: translate(-50%, -50%) scale(1.3);
}
```
Also update the JS that creates these dots to use button elements with aria-labels.

---

### H2. Inline styles proliferation on inner pages

- **Pages:** our-studio.html, about.html, holiday-camps.html, contact.html
- **Problem:** Multiple sections use inline `style=""` attributes for padding, max-width, font-size, line-height, color, and margin. Examples:
  - `our-studio.html:81` — `style="padding-block: var(--space-8);"`
  - `our-studio.html:107-131` — multiple `<p style="font-size: 17px; line-height: 1.75; ...">` tags
  - `holiday-camps.html:119-131` — same pattern
  - `about.html:102` — `style="padding-block: var(--space-8);"`
  - `contact.html:103-107` — inline text-align and max-width on hero
  - `contact.html:283-297` — service area section inline styles

  This creates visual inconsistency between pages and makes future updates difficult.
- **Fix:** Create reusable CSS classes in style.css:
```css
/* Prose block for readable text sections */
.prose {
  max-width: 680px;
  margin-inline: auto;
}

.prose p {
  font-size: 17px;
  line-height: 1.75;
  color: var(--color-dark-text);
  margin-block-end: 20px;
}

.prose p:last-child {
  margin-block-end: 0;
}

/* Centered narrow content */
.content-narrow {
  max-width: 560px;
  margin-inline: auto;
  text-align: center;
}
```
Replace all inline styles with these classes across the four pages.

---

### H3. Footer link inconsistency across pages

- **Pages:** All pages
- **Problem:** Homepage footer "Quick Links" includes `gallery.html` and `faq.html`. Inner pages (birthday-workshops, art-classes, holiday-camps, our-studio, about, contact) omit these and instead link to `our-studio.html`. Footer content should be identical across all pages for consistency.
- **Fix:** Standardize the footer across all pages. Use the same Quick Links on every page:
```html
<ul class="footer__links" role="list">
  <li><a href="index.html" class="footer__link">דף הבית</a></li>
  <li><a href="about.html" class="footer__link">אודות</a></li>
  <li><a href="our-studio.html" class="footer__link">הסטודיו שלנו</a></li>
  <li><a href="contact.html" class="footer__link">צרו קשר</a></li>
</ul>
```
Note: If `gallery.html` and `faq.html` exist as real pages, add them everywhere. If not, remove them from homepage too.

---

### H4. Missing active nav link on homepage

- **Page:** index.html
- **Problem:** Inner pages correctly add `navbar__nav-link--active` to their respective nav link, giving a coral underline indicator. The homepage doesn't mark any link as active. While technically correct (homepage isn't in the nav), it means no visual "you are here" signal when on the homepage.
- **Fix:** Add `aria-current="page"` to the logo on the homepage (it's the "home" link). Or, add a "דף הבית" nav item and mark it active. The simplest approach is to do nothing extra (the logo serves as the home indicator), but ensure the mobile menu also doesn't highlight any link on homepage — which is currently correct.

---

### H5. Card body text below 16px minimum

- **Pages:** index.html (service cards), birthday-workshops.html, art-classes.html (workshop cards)
- **Problem:** `.card__body` is set to `font-size: 15px` (style.css:735). `.workshop-card__body` is also 15px (around line 2023). The brand spec (CLAUDE.md section 4.4) says: "Minimum body size: 16px". The design system (web-designer.md) says "Never go below 14px for any readable text" — so 15px isn't technically a violation of that rule, but it does violate the CLAUDE.md 16px minimum.
- **Fix:**
```css
.card__body {
  font-size: 16px;
  line-height: 26px;  /* maintain readability */
}

.workshop-card__body {
  font-size: 16px;
  line-height: 26px;
}
```

---

### H6. Section padding not scaling up on tablet/desktop for inner pages

- **Pages:** birthday-workshops.html, art-classes.html, holiday-camps.html, our-studio.html, about.html, contact.html
- **Problem:** The `.section` base class has `padding-block: var(--space-6)` (48px) at all breakpoints. The homepage sections (services, why-us, testimonials, about-teaser) correctly scale to `--space-8` (64px) at 768px and `--space-10` (80px) at 1024px. But `.section` doesn't have these responsive overrides, so inner page sections stay at 48px padding even on large screens, making them feel tighter than the homepage.
- **Fix:** Add responsive scaling to the `.section` base class:
```css
@media (min-width: 768px) {
  .section {
    padding-block: var(--space-8); /* 64px */
  }
}

@media (min-width: 1024px) {
  .section {
    padding-block: var(--space-10); /* 80px */
  }
}
```

---

## MEDIUM PRIORITY

### M1. section-intro-text bottom margin too tight

- **Pages:** birthday-workshops.html, art-classes.html, holiday-camps.html
- **Problem:** `.section-intro-text` has `margin-block-end: var(--space-2)` (16px), while `.section-intro` (used on homepage) has `margin-block-end: 32px` (and 48px on tablet). This means section intros on inner pages have much less breathing room before the content below.
- **Fix:**
```css
.section-intro-text {
  margin-block-end: 32px;
}

@media (min-width: 768px) {
  .section-intro-text {
    margin-block-end: 48px;
  }
}
```

---

### M2. Logo area uses magic padding value

- **Page:** All pages (navbar)
- **Problem:** `.navbar__logo` has `padding-inline-end: 150px` (style.css:366). This hardcoded value creates an awkward gap between logo and nav links on some viewport widths. On narrow desktop screens (1024-1100px), this pushes nav links uncomfortably to the left.
- **Fix:** Replace the magic padding with `margin-inline-end: auto` on the logo (which already exists on `.navbar__nav`) or use a flex gap:
```css
.navbar__logo {
  padding-inline-end: 0; /* remove magic value */
}

.navbar__inner {
  gap: var(--space-4); /* 32px between logo and nav */
}

.navbar__nav {
  margin-inline-start: auto;
  margin-inline-end: var(--space-3); /* space before CTA button */
}
```

---

### M3. Workshop card CTA is a `<button>` with no visible button styling

- **Pages:** birthday-workshops.html, art-classes.html
- **Problem:** The "לתמונות מהסדנה" CTAs are `<button>` elements styled as text links (`.workshop-card__cta`). While functional, users may not recognize clickable buttons that look like plain text links. Additionally, the `<button>` default browser styles (font resets) need to be explicitly handled.
- **Fix:** Either:
  1. Keep as `<button>` but add `cursor: pointer` and ensure `font-family: inherit` (already handled by the reset), or
  2. Make them more visually distinct — add an underline on default state or use the secondary button style.

  Recommended: add a subtle underline by default:
```css
.workshop-card__cta {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.workshop-card__cta:hover {
  text-decoration-thickness: 2px;
}
```

---

### M4. Gallery grid has no aspect-ratio constraint

- **Pages:** holiday-camps.html, our-studio.html
- **Problem:** `.gallery-item img` uses `object-fit: cover` but the height is set only at tablet (280px) and desktop (320px). On mobile, the height is not constrained, which means images with different aspect ratios will create uneven grid rows and potential layout shift (CLS).
- **Fix:**
```css
.gallery-item img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: var(--radius-image);
}
```
Or better, use `aspect-ratio` for modern browsers:
```css
.gallery-item img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius-image);
}
```

---

### M5. Homepage About Teaser photo has fixed height

- **Page:** index.html
- **Problem:** `.about-teaser__photo` has `height: 320px` with `object-fit: cover`. On mobile, this crops Lior's photo significantly. On desktop, the photo is constrained to 400px max. Consider using `aspect-ratio` instead to maintain proportions.
- **Fix:**
```css
.about-teaser__photo {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  object-position: top center;
  border-radius: var(--radius-image);
  max-height: 440px;
}
```

---

### M6. Contact page hero is centered (breaks consistency with other inner pages)

- **Page:** contact.html
- **Problem:** Contact hero text is centered (`text-align: center` inline), while all other inner page heroes have right-aligned (RTL start-aligned) text with a photo on the left. This inconsistency is intentional (no hero photo for contact), but the centered layout with inline styles feels different from the rest of the site.
- **Fix:** Create a variant class instead of inline styles:
```css
.page-hero--centered .page-hero__text {
  max-width: 600px;
  margin-inline: auto;
  text-align: center;
}
```
Then in HTML: `<section class="page-hero page-hero--centered">`

---

### M7. Our Studio page hero has no image

- **Page:** our-studio.html
- **Problem:** Unlike other service pages (birthday, art-classes, holiday-camps) that feature a hero photo alongside the text, the studio page has text-only hero. Given that this page is about the physical space, a hero image would be very impactful. One of the studio photos could serve as the hero.
- **Fix:** Add a hero image using the same `page-hero__inner` + `page-hero__image` structure used on other inner pages. Use one of the best studio photos (e.g., the full-room shot `50c950e7...JPEG`) as the hero image.

---

### M8. About page story layout uses inline heading margin

- **Page:** about.html
- **Problem:** The "הסיפור שלי" heading has `style="margin-block-end: var(--space-5);"` inline. The `section-heading--start` class should handle the alignment, but spacing is done inline.
- **Fix:** Add a variant or override in CSS:
```css
.section-heading--with-gap {
  margin-block-end: var(--space-5);
}
```
Or simply increase the default bottom margin of `.section-heading--start`.

---

### M9. WhatsApp color (#128C7E) differs from brand spec (#25D366)

- **Pages:** All pages
- **Problem:** CSS variable `--color-whatsapp` is `#128C7E` (darker teal-green), but the design system specifies `#25D366` for WhatsApp buttons. The darker shade was likely chosen for WCAG AA contrast on white text (which is correct — `#25D366` on white text only achieves ~2.09:1 ratio, failing AA).
- **Fix:** This is actually the **correct** accessibility decision — keep `#128C7E`. However, document this choice as a comment in the CSS:
```css
/* WhatsApp green — darker than official #25D366 for WCAG AA white-text contrast */
--color-whatsapp: #128C7E;
```

---

### M10. Testimonial section has placeholder content

- **Page:** index.html
- **Problem:** All three testimonials are placeholders. While this is expected pre-launch, the placeholder text is Hebrew-language brackets that look unfinished. This section is in the above-the-fold scroll path and is prominent.
- **Fix:** Either:
  1. Replace with real testimonials before launch (ideal)
  2. Hide the section entirely until real testimonials exist
  3. Mark more clearly as placeholder with a subtle banner

---

## LOW PRIORITY

### L1. No `prefers-color-scheme` support

- **Pages:** All
- **Problem:** The site doesn't offer a dark mode. While not required, users with dark mode preferences see a bright white site in all conditions.
- **Fix:** Low priority. The warm-white background is part of brand identity. No action needed now, but consider a future enhancement.

---

### L2. LinkedIn link is a placeholder (#)

- **Pages:** All (footer)
- **Problem:** The LinkedIn social link in the footer points to `#`. If clicked, it scrolls to page top.
- **Fix:** Either remove the LinkedIn icon until a real URL exists, or add `aria-disabled="true"` and `tabindex="-1"` to prevent confusion:
```html
<a href="#" class="footer__social-link footer__social-link--disabled" 
   aria-label="LinkedIn — בקרוב" aria-disabled="true" tabindex="-1">
```

---

### L3. `card__cta` link has small touch target

- **Page:** index.html (service cards)
- **Problem:** `.card__cta` links ("לפרטים על החוג", "הזמינו סדנת יום הולדת") are inline text links with no explicit min-height. On mobile, the tap target may be below 48px.
- **Fix:**
```css
.card__cta {
  min-height: 48px;
  display: inline-flex;
  align-items: center;
}
```

---

### L4. No favicon defined

- **Pages:** All
- **Problem:** No `<link rel="icon">` in any `<head>`. The design spec says to use the "A" letterform from the logo in Coral on transparent background.
- **Fix:** Create a favicon and add to all pages:
```html
<link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png">
```

---

### L5. About teaser brush accent may be clipped

- **Page:** index.html
- **Problem:** `.about-teaser__brush-accent` uses negative positioning (`inset-block-end: -10px; inset-inline-start: -8px`) which may be clipped by `overflow: hidden` on parent containers in some browsers.
- **Fix:** Verify visually. If clipped, add `overflow: visible` to `.about-teaser__photo-wrap`.

---

### L6. Hero slideshow RTL dot positioning

- **Page:** index.html
- **Problem:** `.hero-slideshow__dots` uses `transform: translateX(-50%)` which doesn't use logical properties. In RTL, this technically works because it's centering, but for consistency with the rest of the codebase that uses logical properties, consider:
- **Fix:**
```css
.hero-slideshow__dots {
  inset-inline-start: 50%;
  transform: translateX(50%); /* RTL: positive = towards start */
}
```
Or use flexbox centering instead:
```css
.hero-slideshow__dots {
  position: absolute;
  inset-block-end: 16px;
  inset-inline: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 3;
}
```

---

### L7. Studio gallery 5th image uses inline `grid-column` override

- **Page:** our-studio.html
- **Problem:** The 5th gallery item has `style="grid-column: 1 / -1; max-width: 50%; margin-inline: auto; width: 100%;"` inline. This centers the odd last image but uses inline styles.
- **Fix:** Create a CSS class:
```css
.gallery-item--centered-last {
  grid-column: 1 / -1;
  max-width: 50%;
  margin-inline: auto;
}
```

---

### L8. art-classes.html workshop-cards uses inline CSS custom property

- **Page:** art-classes.html
- **Problem:** `<div class="workshop-cards" style="--max-cols: 2">` sets a custom property inline. The CSS should handle the 2-column variant.
- **Fix:** Check if `--max-cols` is actually used in CSS. If not, this is dead code. If it is, create a variant class:
```css
.workshop-cards--two-col {
  /* Override grid at desktop to max 2 cols */
}

@media (min-width: 1024px) {
  .workshop-cards--two-col {
    grid-template-columns: repeat(2, 1fr);
    max-width: 800px;
    margin-inline: auto;
  }
}
```

---

### L9. No `loading="eager"` consistency for hero images

- **Pages:** All inner pages
- **Problem:** Most hero images correctly use `loading="eager"` but it's good to verify all above-the-fold images are eager and below-fold are lazy. Currently correct across pages.
- **Fix:** No action needed — just maintain this pattern going forward.

---

### L10. Mobile menu slide direction comment/code mismatch

- **Pages:** All (CSS)
- **Problem:** style.css:480 comment says "slide in from left (RTL reading-end side)" but the transform is `translateX(-100%)`. In RTL, `translateX(-100%)` moves the element to the physical left, which is the logical "end" side. The behavior is correct but the comment could be clearer.
- **Fix:** Clarify the comment:
```css
/* In RTL: translateX(-100%) hides to physical-left (logical-end). 
   Menu appears to slide in from the left. */
```

---

## CROSS-CUTTING OBSERVATIONS

### Overall Feel: Strong

The site successfully achieves the "warm, creative, professional" brand feel. The color palette is used correctly — Coral leads for energy, Teal supports for trust, Yellow is used sparingly (only on badges), Navy anchors headings. The design appeals to adults, not children. The rounded corners, soft shadows, and generous spacing create a calm, inviting atmosphere.

### Typography: Good

Rubik is used consistently for all Hebrew text. Font weights follow the hierarchy (700 for H1, 600 for H2/H3, 500 for nav/buttons, 400 for body). The only issue is the 15px body text on cards (see H5).

### RTL: Well-implemented

Logical properties are used throughout (`inset-inline-start`, `margin-inline`, `padding-inline`). Navigation reads correctly right-to-left. Hamburger menu slides from the correct side. The only minor issue is L6 (translateX on dots).

### Mobile Design: Good

Mobile-first CSS is correct. Touch targets are mostly 48px+ (except H1 hero dots). The mobile menu has large tap areas (64px links). The hamburger button is 48x48px.

### Accessibility: Solid foundation

Skip link, focus indicators, ARIA labels, semantic HTML, and `prefers-reduced-motion` support are all present. The main gaps are H1 (hero dot touch targets) and L3 (card CTA touch targets).

---

## Recommended Implementation Order

1. **H1** — Hero dots touch target (accessibility)
2. **H5** — Card body text to 16px (brand compliance)
3. **H6** — Section padding responsive scaling (visual consistency)
4. **H2** — Refactor inline styles to CSS classes (maintainability)
5. **H3** — Standardize footer links (consistency)
6. **M1** — Section intro text margin (spacing)
7. **M2** — Logo padding magic number (robustness)
8. **M4** — Gallery image aspect ratio (CLS prevention)
9. **L4** — Add favicon (brand completeness)
10. **L2** — Fix LinkedIn placeholder link (UX)
11. Remaining medium and low items as time allows

---

*This report evaluates design against CLAUDE.md and the web-designer design system. All CSS values reference the existing custom property system. Fixes are intended to be implemented by the web-developer agent.*
