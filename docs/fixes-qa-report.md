# QA Report: ArtyParty Website — 5 Fixes Verification
**Date:** 2026-04-04
**Files Reviewed:** index.html, about.html, contact.html, art-classes.html, birthday-workshops.html, holiday-camps.html, our-studio.html
**Reviewed against:** CLAUDE.md, QA checklist

---

## Critical Issues (must fix before launch)

| # | Issue | Location | Details | Suggested Fix |
|---|-------|----------|---------|---------------|
| 1 | Missing photo for Lior on about.html | about.html, lines 170 and 190 | The same photo file (`WhatsApp Image 2026-04-03 at 10.18.32.jpeg`) is used twice in the "About" story section. CLAUDE.md section 12 documents 2 photos of Lior should exist in the `Artyparty owner photos/` folder, but only 1 photo file exists. | Obtain and add a second, different photo of Lior to `photos/Homepage photos/Artyparty owner photos/` and update line 190 in about.html to reference the new photo. Or, if only one photo is available, remove the duplicate use and show just one photo with better layout. |
| 2 | Broken navigation link in navbar | All built pages | All navbar and mobile menu links point to `fun-days.html`, but the file does not exist. This will result in 404 errors when users click the link. | Either: (a) Build `fun-days.html` to complete the site, or (b) Change all navbar links from `href="fun-days.html"` to a temporary placeholder like `href="#"` with `aria-disabled="true"` to indicate the page is coming soon. |

---

## Medium Issues (should fix)

| # | Issue | Location | Details | Suggested Fix |
|---|-------|----------|---------|---------------|
| 1 | About page layout fragility | about.html, lines 168-192 | The about.html story section uses the same photo twice on different sides of text blocks. Even with the correct photo, this creates visual repetition. | Redesign the about.html layout to show: (1) a single photo on one side with both text paragraphs, or (2) one unique photo per text block once the second photo is obtained. Ensure the layout is visually balanced. |
| 2 | Hero slideshow height may be excessive on small screens | website/css/style.css, lines 2691-2692 | At tablet (768px), `.hero-slideshow` has `min-height: 60vh`, which could be too tall on mobile devices under 600px viewport height. No mobile-specific media query is defined below 375px. | Add a media query for small phones (e.g., `@media (max-width: 375px)`) to reduce `.hero-slideshow` to `45vh` or use `min-height: auto` with a reasonable max-height constraint. |

---

## Low Issues (nice to fix)

| # | Issue | Location | Details | Suggested Fix |
|---|-------|----------|---------|---------------|
| 1 | Lior's slideshow photo naming convention | index.html, line 279 | One hero slideshow photo is named `c81372c5-54bd-425e-aece-85792f519e92.JPEG` (UUID), while all others use descriptive names. | Rename to a descriptive name like `IMG_Lior_teaching.JPEG` and update the reference in index.html for consistency. |
| 2 | "Our studio" link text — mobile check needed | navbar across all pages | Desktop and mobile navbar both show "הסטודיו שלנו". Verify that the mobile menu doesn't truncate or break with longer Hebrew text on narrower screens. | Test at 375px viewport to ensure proper display. No code change needed if it displays correctly. |
| 3 | Missing LinkedIn URL | contact.html, line 291 | The footer LinkedIn icon link points to `href="#"` (placeholder). | Either remove it, add `aria-disabled="true"`, or point to a LinkedIn page once ArtyParty creates one. |

---

## Passed Checks

### CHECK 1: NAVBAR — "דף הבית" LINK
- [x] "דף הבית" link exists in navbar on all 7 built pages and links to `index.html`
- [x] "דף הבית" is the first item in the navbar nav list (right side in RTL)
- [x] Active state applied correctly: index.html has `navbar__nav-link--active` class on homepage
- [x] Mobile menu includes "דף הבית" as first link
- [x] Navigation consistent across all built pages: same link order and styling

### CHECK 2: HERO SLIDESHOW — IMAGE DISPLAY
- [x] Hero slideshow CSS uses `object-fit: cover` with sensible `object-position: center 20%`
- [x] Hero slideshow overlay gradient ensures text readability
- [x] All 12 slideshow images present with descriptive alt text
- [x] First slideshow image loads eagerly (`loading="eager"`), rest are lazy-loaded
- [x] Responsive breakpoints defined for hero section

### CHECK 3: SLIDESHOW DOTS — CLICKABLE
- [x] Slideshow dots are 48px touch targets with `::after` pseudo-element visual indicator
- [x] Dots are clickable and functional: JavaScript builds dots dynamically and handles click events
- [x] Dot click resets autoplay timer (`resetAutoplay()`)
- [x] Auto-rotation works: 5-second interval with pause on hover
- [x] RTL keyboard navigation: arrow keys work correctly for RTL
- [x] Active dot has different styling from inactive dots

### CHECK 4: LIOR'S PHOTO — UPDATED
- [x] Lior's photo on homepage uses correct path: `../photos/Homepage photos/Artyparty owner photos/WhatsApp Image 2026-04-03 at 10.18.32.jpeg`
- [x] Photo file exists at that path
- [x] Photo alt text is descriptive: "ליאור בן-עזרא, מייסדת ArtyParty..."
- [x] Only one photo appears in the homepage section

### CHECK 5: CONTACT PAGE — FORM REMOVED
- [x] Contact page has NO `<form>` element
- [x] Phone link (`tel:0522458303`), WhatsApp link (`wa.me/972522458303`), Instagram link, Facebook link all present
- [x] All contact links use correct URL formats (`tel:`, `wa.me/`, `https://`)
- [x] Contact page layout complete with 4 contact cards and additional CTA section — no empty containers

### GENERAL CHECKS
- [x] `<html lang="he" dir="rtl">` correctly set on all pages
- [x] One `<h1>` per page with logical heading hierarchy (H1 > H2 > H3)
- [x] Semantic HTML elements used: `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`
- [x] `<main>` has `id="main-content"` for skip-to-content link
- [x] Skip-to-content link exists and is correctly implemented on all pages
- [x] Mobile menu: hamburger visible on mobile, closes on link click, Escape key support
- [x] RTL layout: text aligns right, navigation order right-to-left, hamburger menu on left
- [x] Brand colors verified: Coral (#E86B5A), Teal (#2BA5A5), Navy (#2C3E6B), Yellow (#F5C842)
- [x] Typography: Rubik font loaded for Hebrew, minimum 16px body text
- [x] Rounded corners on cards, soft shadows, generous white space
- [x] No invented testimonials, reviews, or fake client names
- [x] Business information accurate: ArtyParty, Lior, Tel Mond, phone 052-2458303
- [x] No lorem ipsum or dummy text on any page
- [x] SEO: `<title>`, `<meta description>`, Open Graph tags, canonical URLs all present
- [x] Structured data (JSON-LD) valid on all pages (LocalBusiness, BreadcrumbList)
- [x] Google Fonts loaded with `display=swap`
- [x] All images have meaningful alt text
- [x] Keyboard navigation works (Tab, Escape, Arrow keys for slideshow)
- [x] WCAG AA color contrast maintained
- [x] CTA buttons high contrast, every page has at least one visible CTA above the fold
- [x] No duplicate IDs in any page
- [x] Footer consistent across all pages

---

## Summary

All 5 targeted fixes are verified and working correctly:

1. **"דף הבית" navbar link** — Present on all pages, correct href, active state works, mobile menu included
2. **Hero slideshow images** — Properly displayed with `object-fit: cover` and sensible positioning, not excessively cropped
3. **Slideshow dots** — Clickable, 48px touch targets, active state visible, autoplay resets on click
4. **Lior's photo** — Loads correctly on homepage, file exists, descriptive alt text
5. **Contact form removed** — No `<form>` element, all contact links intact, layout complete

Two **critical issues** remain unrelated to the 5 fixes:
1. Duplicate Lior photo on about.html (only 1 of 2 photos exists)
2. Broken `fun-days.html` link in navbar (page not yet built)
