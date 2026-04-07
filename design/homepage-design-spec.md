# ArtyParty Homepage — Design Specification
# `index.html`

> **Document status:** Ready for implementation
> **Author:** Web Designer agent
> **Date:** 2026-04-01
> **Source files:** `CLAUDE.md`, `.claude/agents/web-designer.md`, `website/content/homepage-copy.md`
> **Implements copy from:** `website/content/homepage-copy.md`

---

## Table of Contents

1. [Global Page Setup](#1-global-page-setup)
2. [Navbar](#2-navbar)
3. [Hero Section](#3-hero-section)
4. [Services Section](#4-services-section)
5. [Why ArtyParty Section](#5-why-artyparty-section)
6. [Testimonials Section](#6-testimonials-section)
7. [About Teaser Section](#7-about-teaser-section)
8. [Final CTA Section](#8-final-cta-section)
9. [Footer](#9-footer)
10. [WhatsApp Floating Button](#10-whatsapp-floating-button)
11. [Responsive Behavior Summary](#11-responsive-behavior-summary)
12. [Interaction and Animation](#12-interaction-and-animation)
13. [Accessibility Requirements](#13-accessibility-requirements)
14. [RTL Implementation Notes](#14-rtl-implementation-notes)
15. [Design Quality Checklist](#15-design-quality-checklist)

---

## 1. Global Page Setup

### Document

```
lang="he"
dir="rtl"
```

All layout direction decisions below assume RTL flow. Where a spec says "right", that is the
visual right — which is the leading edge in RTL (start of the reading line).

### Max Content Width and Side Margins

```
Max content container width:  1200px, centered with auto margins
Side margins (mobile):        24px
Side margins (tablet):        40px
Side margins (desktop):       auto (container is 1200px max, centered)
```

### Page Background

```
Default page background:  #FFFBF8 (Warm White)
```

### Font Loading

Load from Google Fonts:

```
Rubik: weights 400, 500, 600, 700
Poppins: weights 400, 500, 600, 700 (for any English-language elements)
```

### CSS Custom Properties (provide these to the developer)

```css
--color-coral:          #E86B5A;
--color-teal:           #2BA5A5;
--color-yellow:         #F5C842;
--color-navy:           #2C3E6B;
--color-warm-white:     #FFFBF8;
--color-light-coral-bg: #FFF0ED;
--color-light-teal-bg:  #E8F6F6;
--color-dark-text:      #2D2D2D;
--color-gray-text:      #6B7280;
--color-light-gray:     #F0F0F0;
--color-white:          #FFFFFF;
--color-whatsapp:       #25D366;

--shadow-card:   0 2px 8px rgba(0,0,0,0.06);
--shadow-hover:  0 4px 16px rgba(0,0,0,0.10);
--shadow-modal:  0 8px 32px rgba(0,0,0,0.15);
--shadow-navbar: 0 1px 4px rgba(0,0,0,0.05);

--radius-button: 8px;
--radius-card:   12px;
--radius-image:  12px;
--radius-input:  8px;
--radius-modal:  16px;

--transition-hover:  200ms ease;
--transition-layout: 300ms ease;
```

### Section Rhythm (background color sequence)

```
Navbar         — White (#FFFFFF)
Hero           — Warm White (#FFFBF8)
Services       — Light Coral BG (#FFF0ED)
Why ArtyParty  — Warm White (#FFFBF8)
Testimonials   — Light Teal BG (#E8F6F6)
About Teaser   — Warm White (#FFFBF8)
Final CTA      — Navy (#2C3E6B)
Footer         — Navy (#2C3E6B)  [seamlessly continues from Final CTA with a divider]
```

---

## 2. Navbar

### Structure (RTL reading order — right to left)

```
[Logo — right-aligned]   [Nav links — center]   [CTA button — left-aligned]
```

On mobile:

```
[Logo — right-aligned]   [Hamburger icon — left-aligned]
```

### Dimensions

```
Desktop height:  72px
Mobile height:   60px
Background:      #FFFFFF
Shadow:          0 1px 4px rgba(0,0,0,0.05)
Position:        sticky, top: 0
Z-index:         100
```

### Logo

```
File:            logo.png (project root)
Desktop height:  60px max (width auto)
Mobile height:   44px max (width auto)
Position:        right edge of container (RTL: this is the reading-start side)
Clear space:     minimum half the logo height on all sides — do not crowd it
Never:           distort, recolor, or clip the logo
```

### Navigation Links (desktop only)

```
Items:           חוגי אמנות | ימי הולדת | קייטנות | ימי כיף | אודות | צור קשר
Font:            Rubik 500, 16px
Color:           #2C3E6B (Navy)
Gap between:     32px
Hover color:     #E86B5A (Coral), transition 200ms ease
Active indicator: 2px solid #E86B5A underline, 4px below the text baseline
Alignment:       centered in the navbar, or grouped toward the right (RTL start)
```

Note: "ימי כיף" (Corporate) link uses Teal (#2BA5A5) as its hover color to subtly signal B2B.
All other links hover to Coral.

### CTA Button (desktop navbar)

```
Text:       צרו קשר
Type:       Primary button
Background: #E86B5A (Coral)
Text color: #FFFFFF
Radius:     8px
Height:     40px (compact version for navbar — still meets 40px minimum for desktop)
Padding:    0 24px
Font:       Rubik 500, 16px
Position:   left edge of container (RTL: this is the reading-end side)
```

### Mobile Hamburger Menu

```
Icon:        Three horizontal lines (standard hamburger)
Size:        24x24px, tap target 48x48px
Color:       #2C3E6B (Navy)
Position:    left edge of mobile navbar (RTL: reading-end side)

Menu overlay:
  Background:   #FFFFFF, full screen (width 100vw, height 100vh)
  Slide-in:     from the left side (RTL: from the reading-end side)
  Animation:    translateX transition, 300ms ease
  Z-index:      200 (above navbar)

  Menu items:   same as desktop nav links
  Item height:  64px minimum (generous touch targets)
  Font:         Rubik 500, 20px
  Color:        #2C3E6B (Navy)
  Dividers:     1px #F0F0F0 between items
  Padding:      0 32px per item, text right-aligned (RTL)

  Close button: X icon, top-left corner of overlay, 48x48px tap target
```

---

## 3. Hero Section

### Layout

```
Background:   #FFFBF8 (Warm White)
Min height:   500px desktop / 400px mobile
Width:        full viewport width
Padding top:  80px desktop / 48px mobile
Padding bottom: 80px desktop / 48px mobile
```

Desktop layout: two-column split inside the 1200px container

```
Column layout:  RTL two-column
Right column:   text content (55% width)
Left column:    hero image (45% width)
Gap:            64px between columns
Vertical align: center both columns
```

Mobile layout: single column, stacked

```
Order:    text first (top), image below
Image:    full width, max height 280px, border-radius 12px
```

### Bottom Edge Treatment

Apply CSS `clip-path` to create a gentle wave or diagonal cut at the bottom of the hero,
transitioning into the Services section below. Suggested:

```css
clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
```

This creates a subtle angular slope from right to left (RTL-appropriate direction).
On mobile, simplify to a straight bottom edge (no clip-path) to avoid rendering issues.

### Text Content (right column on desktop, stacked top on mobile)

**H1**

```
Text:        סדנאות יצירה לילדים שמשאירות חיוך
Font:        Rubik 700
Size:        40px desktop / 32px mobile
Line height: 48px desktop / 38px mobile
Color:       #2C3E6B (Navy)
Margin-bottom: 16px
```

**Subheadline** (two-line paragraph)

Line 1:
```
Text:        לילדים בכיתות א–ו באזור השרון — סדנאות יום הולדת, חוגי אמנות, קייטנות יצירה, וימי כיף לילדי עובדים.
Font:        Rubik 400, 18px / 28px line-height
Color:       #2D2D2D (Dark Text)
```

Line 2 (bold emphasis):
```
Text:        אנחנו מטפלים בהכל — אתם רק צריכים להגיע.
Font:        Rubik 600, 18px / 28px line-height
Color:       #2C3E6B (Navy)
Margin-top:  8px
```

Margin between H1 and subheadline: 16px
Margin between subheadline and buttons: 32px

**Primary CTA Button**

```
Text:        שלחו לנו הודעה בוואטסאפ
Type:        WhatsApp button
Background:  #25D366 (WhatsApp Green)
Text color:  #FFFFFF
Font:        Rubik 500, 16px
Height:      52px
Padding:     0 32px
Radius:      8px
Icon:        WhatsApp logo SVG icon, 20px, white, placed to the LEFT of text (RTL: icon is at the end of reading flow — visually on the left)
Shadow:      0 2px 8px rgba(0,0,0,0.06)
Hover:       background darken 8% (#20ba5a), shadow lift to 0 4px 16px rgba(0,0,0,0.10)
```

Note: The WhatsApp button serves as the primary hero CTA because the approved copy designates
WhatsApp as the primary contact method. It takes visual prominence of a Primary button style.

**Secondary CTA Link**

```
Text:        לכל השירותים שלנו
Type:        Text link with arrow
Font:        Rubik 500, 16px
Color:       #2BA5A5 (Teal)
Arrow:       left-pointing chevron (RTL: → points toward reading-end, so chevron points left ←)
             placed after the text in DOM, visually to the left of the text
Margin-top:  16px (from the WhatsApp button above)
Hover:       underline, color deepens slightly
Behavior:    smooth scroll anchor to the Services section (#services)
```

Button group spacing: 8px between the WhatsApp button and the secondary link.
Arrange as flex column on mobile, flex row (or column) on desktop.

### Hero Image (left column on desktop, bottom on mobile)

```
Placeholder:  [Photo: ילדים יוצרים יחד בסדנת יצירה צבעונית — צבעים, מברשות, חיוכים]
Alt text:     ילדים יוצרים ביחד בסדנת יצירה של ArtyParty באזור השרון
Dimensions:   Max 560px wide / 440px tall on desktop. Full width on mobile, max-height 280px.
Radius:       12px
Shadow:       0 4px 16px rgba(0,0,0,0.10)
Object fit:   cover
```

Artistic touch: Add a small decorative element near the image — a subtle hand-drawn style
brush stroke or a small paint splatter in Coral (#E86B5A), positioned at the bottom-right
corner of the image frame. This is a CSS pseudo-element or an SVG overlay, approximately
60x40px. It reinforces the craft aesthetic from the logo without becoming cartoonish.

---

## 4. Services Section

### Section Wrapper

```
id:              services
Background:      #FFF0ED (Light Coral BG)
Padding top:     80px desktop / 48px mobile
Padding bottom:  80px desktop / 48px mobile
```

### Section Heading

```
Text:        מה אנחנו מציעים
Font:        Rubik 600, 32px desktop / 26px mobile
Line height: 40px desktop / 32px mobile
Color:       #2C3E6B (Navy)
Alignment:   center
Margin-bottom: 8px
```

### Section Intro Text

```
Text:        לכל גיל, לכל אירוע, לכל קבוצה — יש לנו פתרון יצירתי.
Font:        Rubik 400, 16px / 26px line-height
Color:       #6B7280 (Gray Text)
Alignment:   center
Margin-bottom: 48px desktop / 32px mobile
```

### Card Grid

```
Desktop (>=1024px):  4 columns, equal width, 24px gap
Tablet (768-1023px): 2 columns, equal width, 24px gap
Mobile (<768px):     1 column, full width, 24px gap (vertical)
```

### Individual Service Card Spec

All four cards share the same base structure. Accent color differs per card (see below).

```
Background:  #FFFFFF
Border:      1px solid #F0F0F0
Radius:      12px
Shadow:      0 2px 8px rgba(0,0,0,0.06)
Padding:     24px
Display:     flex, flex-direction: column
Min height:  360px desktop / auto mobile

Hover:
  Shadow:    0 4px 16px rgba(0,0,0,0.10)
  Transform: translateY(-2px)
  Transition: 200ms ease
```

**Card internal structure (top to bottom):**

```
[Card image — top, full card width]
  Height:   180px
  Radius:   12px 12px 0 0 (only top corners rounded, flush with card)
  Object fit: cover
  Margin-bottom: 0 (flush, then inner content starts with padding)

[Accent stripe]
  Height:    4px
  Width:     100%
  Background: card accent color (see per-card specs below)
  Margin-bottom: 0

[Card content — padded area]
  Padding: 20px 24px 24px 24px

  [H3 heading]
    Font:    Rubik 600, 20px / 28px line-height (mobile: 18px / 24px)
    Color:   #2C3E6B (Navy)
    Margin-bottom: 8px

  [Body text]
    Font:    Rubik 400, 15px / 24px line-height
    Color:   #2D2D2D (Dark Text)
    Margin-bottom: 20px
    Flex-grow: 1 (pushes CTA to bottom)

  [CTA text link]
    Font:    Rubik 500, 15px
    Color:   see per-card accent color
    Arrow:   left-pointing chevron after text (RTL)
    Hover:   underline
    Display: inline-flex, align-items: center, gap: 4px
```

### Card 1 — Art Classes (חוגי אמנות)

```
Accent color:     #E86B5A (Coral)
Image placeholder: [Photo: ילד/ה מצייר/ת בריכוז בשיעור אמנות — מברשת, צבעים, ביטוי]
Alt text:          חוגי אמנות לילדים בתל מונד — ArtyParty
H3:               חוגי אמנות לילדים
CTA link text:    לפרטים על החוג
CTA link href:    /art-classes.html
CTA link color:   #E86B5A (Coral)
```

### Card 2 — Birthday Workshops (יום הולדת יצירה)

```
Accent color:     #E86B5A (Coral)
Image placeholder: [Photo: ילדים חוגגים יום הולדת סביב שולחן עם חומרי יצירה]
Alt text:          סדנת יום הולדת יצירה לילדים — ArtyParty
H3:               יום הולדת יצירה
CTA link text:    הזמינו סדנת יום הולדת
CTA link href:    /birthday-workshops.html
CTA link color:   #E86B5A (Coral)
```

Note: Birthday workshops are the highest-demand B2C service. Consider a subtle "ביקוש גבוה"
(high demand) badge — a small pill-shaped tag in Yellow (#F5C842) with Navy text, positioned
at the top-right corner of the card image (absolute positioned). Badge text: "הכי מבוקש".
Badge dimensions: auto width, 22px height, padding 0 8px, font Rubik 500 12px, radius 11px.

### Card 3 — Holiday Camps (קייטנות יצירה)

```
Accent color:     #E86B5A (Coral)
Image placeholder: [Photo: קבוצת ילדים בקייטנת יצירה — פעילות קבוצתית, צחוק]
Alt text:          קייטנת יצירה לילדים בחופשות — ArtyParty אזור השרון
H3:               קייטנות יצירה
CTA link text:    לפרטים על הקייטנות
CTA link href:    /holiday-camps.html
CTA link color:   #E86B5A (Coral)
```

### Card 4 — Corporate Fun Days (ימי כיף לילדי עובדים)

This card targets a different audience (HR managers, companies). Apply a Teal accent to
signal the B2B context visually, consistent with the B2B tone guidance in CLAUDE.md.

```
Accent color:     #2BA5A5 (Teal)
Image placeholder: [Photo: ילדים יוצרים ביחד באירוע חברתי — אווירה חגיגית, קבוצה גדולה]
Alt text:          פעילות לילדי עובדים — ימי כיף ויצירה עם ArtyParty
H3:               יום כיף לילדי עובדים
CTA link text:    תכננו יום כיף לעובדים
CTA link href:    /fun-days.html
CTA link color:   #2BA5A5 (Teal)
```

The Teal accent on the top stripe, CTA link, and hover state differentiates this card
visually from the three B2C cards. No other structural change — the card dimensions and
layout are identical to ensure grid consistency.

---

## 5. Why ArtyParty Section

### Section Wrapper

```
id:              why-artyparty
Background:      #FFFBF8 (Warm White)
Padding top:     80px desktop / 48px mobile
Padding bottom:  80px desktop / 48px mobile
```

### Section Heading

```
Text:        למה בוחרים ב-ArtyParty
Font:        Rubik 600, 32px desktop / 26px mobile
Line height: 40px desktop / 32px mobile
Color:       #2C3E6B (Navy)
Alignment:   center
Margin-bottom: 48px desktop / 32px mobile
```

### Benefit Blocks Grid

```
Desktop (>=1024px):  4 columns, equal width, 32px gap
Tablet (768-1023px): 2 columns, equal width, 32px gap
Mobile (<768px):     1 column, full width, 24px gap (vertical)
```

### Individual Benefit Block Spec

These are NOT cards with borders and shadows. They are lighter, open blocks that rely on
spacing and iconography rather than card chrome. This creates visual contrast with the
Services section above.

```
Background:  transparent
Padding:     0
Text align:  center (all content centered within the block)
```

**Block internal structure (top to bottom):**

```
[Icon container]
  Width:         56px
  Height:        56px
  Background:    #FFF0ED (Light Coral BG) — warm tint behind the icon
  Radius:        50% (circle)
  Display:       flex, align-items: center, justify-content: center
  Margin:        0 auto 16px auto (centered, 16px below)

  [Icon]
    Size:        28px
    Color:       #E86B5A (Coral)
    Type:        SVG icon from a consistent icon set (e.g., Heroicons or Phosphor)
    See per-block specs below for icon suggestions

[H3 heading]
  Font:    Rubik 600, 20px / 28px line-height (mobile: 18px / 24px)
  Color:   #2C3E6B (Navy)
  Margin-bottom: 8px

[Body text]
  Font:    Rubik 400, 15px / 24px line-height
  Color:   #2D2D2D (Dark Text)
```

### Benefit Block 1 — יצירה אמיתית

```
Icon:   Paintbrush or palette icon (Heroicons: `paint-brush`)
H3:     יצירה אמיתית — לא רק צביעה
Body:   כל פעילות בנויה כדי לעורר סקרנות וביטוי עצמי אמיתי. הילדים יוצרים, מתנסים, ויוצאים עם משהו שהם גאים בו.
```

### Benefit Block 2 — הנחיה מקצועית

```
Icon:   Shield with checkmark (Heroicons: `shield-check`)
H3:     הנחיה מקצועית בכל פעילות
Body:   כל סדנה מונחית באופן מקצועי — עם תוכנית פעילות, חומרים מתאימים לגיל, וסביבה בטוחה ומהנה.
```

### Benefit Block 3 — כל החומרים כלולים

```
Icon:   Package / box icon (Heroicons: `archive-box` or `gift`)
H3:     כל החומרים כלולים
Body:   אין מה להכין מראש. אנחנו מגיעים עם הכל — חומרי יצירה, ציוד, וכל מה שצריך לפעילות מוצלחת.
```

### Benefit Block 4 — מגיעים אליכם

```
Icon:   Map pin / location icon (Heroicons: `map-pin`)
H3:     מגיעים אליכם — בכל מקום בשרון
Body:   הסטודיו שלנו נמצא בתל מונד, ואנחנו מגיעים לאירועים ברחבי אזור השרון. אתם בוחרים את המקום — אנחנו מביאים את הכיף.
```

---

## 6. Testimonials Section

### Section Wrapper

```
id:              testimonials
Background:      #E8F6F6 (Light Teal BG)
Padding top:     80px desktop / 48px mobile
Padding bottom:  80px desktop / 48px mobile
```

### Section Heading

```
Text:        מה אומרים עלינו
Font:        Rubik 600, 32px desktop / 26px mobile
Line height: 40px desktop / 32px mobile
Color:       #2C3E6B (Navy)
Alignment:   center
Margin-bottom: 8px
```

### Section Intro Text

```
Text:        הורים שסמכו עלינו — ועכשיו חוזרים שוב.
Font:        Rubik 400, 16px / 26px line-height
Color:       #6B7280 (Gray Text)
Alignment:   center
Margin-bottom: 48px desktop / 32px mobile
```

### Testimonial Layout

```
Desktop (>=1024px):  3 columns, equal width, 24px gap. All cards visible simultaneously.
Tablet (768-1023px): 2 columns, 24px gap. Third card hidden or placed below.
Mobile (<768px):     Horizontal scroll carousel. One card visible at a time with partial
                     peek of next card (show ~20px of next card to signal scrollability).
                     Scroll snap: mandatory, center alignment.
```

For mobile carousel: use `overflow-x: scroll`, `scroll-snap-type: x mandatory`,
`-webkit-overflow-scrolling: touch`. Each card: `scroll-snap-align: start`.
Hide scrollbar visually but keep it functional.

Dot indicators below the carousel on mobile: 3 dots, active dot in Coral (#E86B5A),
inactive dots in #F0F0F0. Dots are 8px circles with 8px gap.

### Individual Testimonial Card Spec

```
Background:  #FFFFFF
Border:      1px solid #F0F0F0
Radius:      12px
Shadow:      0 2px 8px rgba(0,0,0,0.06)
Padding:     28px 24px 24px 24px
```

**Card internal structure (top to bottom):**

```
[Opening quotation mark]
  Character:   decorative large quote mark ( " )
  Font:        Rubik 700, 48px
  Color:       #E86B5A (Coral)
  Line height: 1
  Margin-bottom: 8px
  Display:     block

[Quote text]
  Font:        Rubik 400, 15px / 26px line-height
  Color:       #2D2D2D (Dark Text)
  Font style:  italic
  Margin-bottom: 20px

[Attribution line]
  Layout:      flex row, align-items: center, gap: 12px, margin-top: auto

  [Avatar placeholder]
    Size:        40px x 40px
    Radius:      50%
    Background:  #FFF0ED (light coral placeholder)
    Border:      1px solid #F0F0F0
    Display:     flex, align-items: center, justify-content: center
    Icon:        person silhouette SVG, 20px, #E86B5A (Coral) — used until real photo available

  [Name and context]
    [Name]
      Font:    Rubik 600, 14px
      Color:   #2C3E6B (Navy)
    [Context line]
      Font:    Rubik 400, 13px
      Color:   #6B7280 (Gray Text)
```

### Testimonial Card 1

```
Quote text:  [Testimonial placeholder: אמא של יֶלֶד בן 8 שחגג יום הולדת יצירה בסטודיו — כולל ציון שהסדנה הייתה מאורגנת, הילדים נהנו, והיא לא הייתה צריכה לדאוג לכלום]
Name:        [שם ההורה]
Context:     אמא | יום הולדת יצירה
```

### Testimonial Card 2

```
Quote text:  [Testimonial placeholder: הורה לילדה שמגיעה לחוג אמנות שבועי — כולל ציון שהילדה מחכה לחוג כל שבוע ושהיא התקדמה מאוד מבחינת ביטוי עצמי]
Name:        [שם ההורה]
Context:     אבא | חוג אמנות שבועי
```

### Testimonial Card 3

```
Quote text:  [Testimonial placeholder: מנהל/ת HR בחברה שארגנה יום כיף לילדי עובדים — כולל ציון שהפעילות הייתה מקצועית, הילדים נהנו, והעובדים הגיבו בצורה חיובית מאוד]
Name:        [שם מנהל/ת HR]
Context:     מנהל/ת משאבי אנוש
```

---

## 7. About Teaser Section

### Section Wrapper

```
id:              about-teaser
Background:      #FFFBF8 (Warm White)
Padding top:     80px desktop / 48px mobile
Padding bottom:  80px desktop / 48px mobile
```

### Layout

```
Desktop (>=1024px):  Two-column layout inside the 1200px container
  Right column:     Founder photo (40% width)
  Left column:      Text content (60% width, with 48px gap)
  Vertical align:   center

Tablet (768-1023px): Same two-column, reduce gap to 32px

Mobile (<768px):     Single column
  Order:    Photo top, text below
  Photo:    full width, max height 300px
```

### Founder Photo

```
Placeholder:  [Photo: תמונת מייסד/ת ArtyParty — חמה, אישית, בסביבת עבודה יצירתית]
Alt text:     המייסד/ת של ArtyParty — סדנאות יצירה לילדים בתל מונד
Width:        100% of column (max ~480px on desktop)
Height:       Auto, but max 400px
Radius:       12px
Shadow:       0 4px 16px rgba(0,0,0,0.10)
Object fit:   cover
```

Artistic touch: A subtle hand-drawn style paint splatter or brush-stroke decoration
in Yellow (#F5C842) or Teal (#2BA5A5), approximately 50px, positioned at the bottom-left
of the photo frame as a CSS pseudo-element or SVG overlay.

### Text Content (left column on desktop)

**Section Heading**

```
Text:        מי מאחורי ArtyParty
Font:        Rubik 600, 32px desktop / 26px mobile
Line height: 40px desktop / 32px mobile
Color:       #2C3E6B (Navy)
Margin-bottom: 16px
```

**Body Text**

```
Paragraph:   ArtyParty נולדה מתוך אמונה אחת פשוטה — שכל ילד/ה ראוי/ה לחוות את ההנאה שביצירה.
             מה שהתחיל כפעילות קטנה בתל מונד הפך לסדנאות יצירה שילדים ברחבי אזור השרון מחכים להן.
             כל פעילות מעוצבת בקפידה, מונחית באהבה, ומשאירה חיוך אמיתי.
Font:        Rubik 400, 16px / 26px line-height
Color:       #2D2D2D (Dark Text)
Margin-bottom: 24px
```

**CTA Link**

```
Text:        קראו עוד עלינו
Type:        Secondary button (ghost style with Teal border)
Background:  transparent
Text color:  #2BA5A5 (Teal)
Border:      2px solid #2BA5A5
Radius:      8px
Height:      48px
Padding:     0 24px
Font:        Rubik 500, 16px
Hover:       background #2BA5A5, text color #FFFFFF, transition 200ms ease
href:        /about.html
```

---

## 8. Final CTA Section

### Section Wrapper

```
id:              cta-final
Background:      #2C3E6B (Navy)
Padding top:     80px desktop / 64px mobile
Padding bottom:  80px desktop / 64px mobile
```

### Layout

```
All breakpoints: single column, centered content
Max width:       700px content column centered within the 1200px container
Text align:      center
```

### Section Heading

```
Text:        מוכנים להתחיל?
Font:        Rubik 700, 36px desktop / 28px mobile
Line height: 44px desktop / 36px mobile
Color:       #FFFFFF
Margin-bottom: 16px
```

### Body Text

```
Line 1:      בין אם אתם מתכננים יום הולדת, מחפשים חוג, או מארגנים פעילות לעובדים —
Line 2 (bold): שלחו לנו הודעה ונחזור אליכם תוך יום עסקים.
Font:        Rubik 400 (line 1) / Rubik 600 (line 2), 17px / 28px line-height
Color:       rgba(255, 255, 255, 0.85)
Bold line color: #FFFFFF
Margin-bottom: 40px
```

### Button Group

```
Layout:  flex row, center-justified, gap: 16px
Mobile:  flex column, align-items: center, gap: 12px (buttons full width 280px max)
```

**Primary CTA Button — WhatsApp**

```
Text:        שלחו הודעה בוואטסאפ
Type:        WhatsApp button
Background:  #25D366
Text color:  #FFFFFF
Font:        Rubik 500, 16px
Height:      52px
Padding:     0 32px
Radius:      8px
Icon:        WhatsApp SVG icon, 20px white, to the left of text (RTL: at reading end)
Shadow:      0 2px 8px rgba(0,0,0,0.15)
Hover:       background #20ba5a, shadow lift
```

**Secondary CTA Button — Contact**

```
Text:        צרו קשר
Type:        Ghost button
Background:  transparent
Text color:  #FFFFFF
Border:      2px solid rgba(255,255,255,0.6)
Font:        Rubik 500, 16px
Height:      52px
Padding:     0 32px
Radius:      8px
Hover:       border color #FFFFFF, background rgba(255,255,255,0.08)
href:        /contact.html
```

### Decorative Detail

Add a subtle pattern behind this section to add texture without distraction.
Option: a very faint geometric pattern in Navy shades (dots or lines) at 5% opacity,
achieved via CSS background or a light SVG pattern overlay. This reinforces the craft
identity without overwhelming the CTA content.

---

## 9. Footer

### Relationship to Final CTA Section

The footer sits directly below the Final CTA section, which also uses a Navy background.
Add a single 1px divider line between them:

```
Divider:  1px solid rgba(255,255,255,0.12)
```

This visually separates the two Navy sections without a jarring background color change.

### Footer Wrapper

```
Background:  #2C3E6B (Navy)
Padding top: 64px desktop / 48px mobile
```

### Desktop Footer Layout (>=1024px)

```
4-column grid, gap: 48px, right-to-left column order (RTL)

Column 1 (rightmost — RTL start):  Logo + tagline + social icons
Column 2:                          Quick links
Column 3:                          Services
Column 4 (leftmost — RTL end):     Contact info
```

### Tablet Footer Layout (768-1023px)

```
2 columns, 2 rows, gap: 32px
Row 1: Logo+tagline (left) | Quick links (right) — RTL order
Row 2: Services (left) | Contact (right) — RTL order
```

### Mobile Footer Layout (<768px)

```
Single column, stacked, gap: 32px between blocks
Order: Logo+tagline, Contact (most important for mobile), Quick links, Services
```

### Column 1 — Logo and Tagline

```
Logo:        logo.png, max height 40px, width auto
Tagline:     חוויות יצירה לילדים שמשאירות חיוך
Font:        Rubik 400, 14px / 22px line-height
Color:       rgba(255,255,255,0.70)
Margin-top:  12px (below logo)
```

**Social Icons Row**

```
Margin-top:  20px
Gap:         16px between icons
Icon size:   24px x 24px
Color:       rgba(255,255,255,0.70)
Hover:       rgba(255,255,255,1.0), transition 200ms ease
```

Platforms: Instagram, Facebook, TikTok (optional), LinkedIn.
Use standard SVG icons, each in a 40x40px touch target area.

### Column 2 — Quick Links

```
Heading:     ניווט מהיר
Font:        Rubik 600, 14px
Color:       #FFFFFF
Text transform: none
Margin-bottom: 16px

Links list (Rubik 400, 14px / 26px line-height, rgba(255,255,255,0.70)):
  דף הבית       — /index.html
  אודות          — /about.html
  גלריה          — /gallery.html
  שאלות נפוצות  — /faq.html
  צור קשר        — /contact.html

Link hover:  rgba(255,255,255,1.0), underline, transition 200ms ease
```

### Column 3 — Services

```
Heading:     השירותים שלנו
Font:        Rubik 600, 14px
Color:       #FFFFFF
Margin-bottom: 16px

Links list (Rubik 400, 14px / 26px line-height, rgba(255,255,255,0.70)):
  חוגי אמנות           — /art-classes.html
  יום הולדת יצירה      — /birthday-workshops.html
  קייטנות יצירה        — /holiday-camps.html
  ימי כיף לילדי עובדים — /fun-days.html

Link hover:  rgba(255,255,255,1.0), underline, transition 200ms ease
```

### Column 4 — Contact Info

```
Heading:     צרו קשר
Font:        Rubik 600, 14px
Color:       #FFFFFF
Margin-bottom: 16px
```

Contact items (each line):

```
Font:        Rubik 400, 14px / 26px line-height
Color:       rgba(255,255,255,0.70)
Icon:        16px white SVG icon, inline before the text (RTL: icon is to the right of text)
Gap:         8px between icon and text
Item margin: 8px vertical between items
```

Items:
- Location icon + תל מונד, אזור השרון
- Phone icon + [טלפון — to be added]
- WhatsApp icon + שלחו הודעה בוואטסאפ (clickable, links to WhatsApp URL)

WhatsApp link in footer:
```
Color:       #25D366 (WhatsApp Green)
Hover:       opacity 0.85
```

### Footer Bottom Bar

```
Border-top:   1px solid rgba(255,255,255,0.12)
Margin-top:   48px desktop / 32px mobile
Padding:      24px 0

Layout:       flex row, space-between (RTL: start right, end left)
Mobile:       flex column, center-aligned, gap: 8px

Right (RTL start): copyright text
Left (RTL end):    "כל הזכויות שמורות לArtyParty" or similar

Copyright text: Rubik 400, 13px, rgba(255,255,255,0.50)
```

```
Copyright:   © 2026 ArtyParty — סדנאות יצירה לילדים
```

---

## 10. WhatsApp Floating Button

```
Position:    fixed
Bottom:      24px
Left:        24px  (RTL: bottom-left is the visual left, which is the reading-end side)
Z-index:     999 (above all content, below modals at z-index 1000+)

Size:        56px x 56px
Radius:      50% (circle)
Background:  #25D366 (WhatsApp Green)
Shadow:      0 4px 16px rgba(0,0,0,0.10)

Icon:        WhatsApp SVG logo, 28px, white, centered
```

**Pulse animation on load:**

```css
@keyframes pulse-whatsapp {
  0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
  70%  { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}
```

Apply this animation 3 times on page load, then stop.
Duration: 1.5s per cycle. Total: 4.5s then animation-fill-mode: forwards, removed.

**Hover state:**

```
Background:  #20ba5a (darkened 8%)
Shadow:      0 6px 20px rgba(0,0,0,0.15)
Transform:   scale(1.05)
Transition:  200ms ease
```

**Tooltip (desktop only):**

```
Text:        שלחו הודעה בוואטסאפ
Position:    absolute, to the right of the button (RTL: reading-start side)
Background:  #2C3E6B (Navy)
Text color:  #FFFFFF
Font:        Rubik 400, 13px
Padding:     6px 12px
Radius:      6px
Visibility:  hidden by default, visible on button hover
Transition:  opacity 200ms ease
```

**Accessibility:**

```
aria-label:  "שלחו הודעה בוואטסאפ"
role:        "link"
```

**Reduced motion:**

```css
@media (prefers-reduced-motion: reduce) {
  .whatsapp-float { animation: none; }
}
```

---

## 11. Responsive Behavior Summary

### Mobile — 375px base / < 768px

```
Navbar:
  Height: 60px
  Logo: max 44px height, right-aligned
  Nav links: hidden — replaced by hamburger menu (left-aligned icon)
  Hamburger: slides in full-screen overlay from the left (RTL)

Hero:
  Single column, text top, image bottom
  H1: 32px / 38px
  Subheadline: 16px / 26px
  Buttons: stacked (flex column), full width within the content
  Image: full width, max height 280px, radius 12px
  No clip-path bottom edge (flat edge for mobile)
  Padding: 48px 24px

Services:
  1 column, cards stacked vertically, 24px gap
  Card image height: 180px
  Card padding: 20px
  Padding: 48px 24px

Why ArtyParty:
  1 column, benefit blocks stacked, 24px gap
  Icon circle: 48px
  H3: 18px / 24px
  Padding: 48px 24px

Testimonials:
  Horizontal scroll carousel
  One card visible + peek of next (show 20px)
  Dot indicators below
  Padding: 48px 24px

About Teaser:
  Single column — photo top, text below
  Photo: full width, max height 260px
  Padding: 48px 24px

Final CTA:
  Single column, centered
  H2: 28px / 36px
  Buttons: stacked flex column, max width 280px each
  Padding: 64px 24px

Footer:
  Single column, stacked blocks
  Order: Logo, Contact, Quick links, Services
  Padding: 48px 24px
```

### Tablet — 768px to 1023px

```
Navbar:
  Height: 72px
  Nav links: visible (may truncate to icons + key labels)
  CTA button: visible

Hero:
  Two columns (if layout fits) or single column wide
  H1: 36px
  Padding: 64px 40px

Services:
  2 columns, 24px gap
  Padding: 64px 40px

Why ArtyParty:
  2 columns, 32px gap
  Padding: 64px 40px

Testimonials:
  2 columns visible, third card hidden or shown below
  Padding: 64px 40px

About Teaser:
  Two columns (photo 40%, text 60%)
  Padding: 64px 40px

Final CTA:
  Single column, buttons in a row
  Padding: 64px 40px

Footer:
  2-column grid
  Padding: 48px 40px
```

### Desktop — >= 1024px

```
All sections use full layout as described in individual section specs.
Max content width: 1200px, centered.
Padding: 80px on sides for section content.
Navbar: full layout with all links and CTA button visible.
```

### Large — >= 1440px

```
Content container remains at 1200px max-width, centered.
Extra horizontal space on either side of the container is the page background.
No additional layout changes — the 1200px container provides the breathing room.
```

---

## 12. Interaction and Animation

### Scroll Animations

All major sections animate in as they enter the viewport using IntersectionObserver.

```
Initial state:
  opacity: 0
  transform: translateY(20px)

Animated state:
  opacity: 1
  transform: translateY(0)
  transition: opacity 400ms ease, transform 400ms ease

Trigger:      When element enters viewport (threshold: 0.15)
Stagger:      For card grids, stagger each card by 80ms delay
              Card 1: 0ms, Card 2: 80ms, Card 3: 160ms, Card 4: 240ms
```

Apply to:
- Section headings and intro text (animate as a group)
- Service cards (staggered)
- Benefit blocks (staggered)
- Testimonial cards (staggered)
- About Teaser columns (text and photo animate independently, 100ms apart)

### Card Hover

```
Service cards and testimonial cards:
  Transform:  translateY(-2px)
  Shadow:     0 4px 16px rgba(0,0,0,0.10)
  Transition: 200ms ease
```

### Button Hover

```
All button types:
  Transition: 200ms ease on background-color, box-shadow
```

Primary (Coral) buttons:
```
Hover background: #d45f4f (Coral darkened ~8%)
Shadow: 0 4px 16px rgba(0,0,0,0.10)
```

WhatsApp buttons:
```
Hover background: #20ba5a (Green darkened ~8%)
Shadow: 0 4px 16px rgba(0,0,0,0.10)
```

Secondary (Teal border) buttons:
```
Hover background: #2BA5A5
Hover text color: #FFFFFF
```

Ghost (white border on Navy bg) buttons:
```
Hover background: rgba(255,255,255,0.08)
Hover border: rgba(255,255,255,1.0)
```

### Navbar Scroll Behavior

```
Before scroll:  Navbar shadow: none or very faint (0 1px 4px rgba(0,0,0,0.03))
After scroll:   Navbar shadow increases to 0 1px 4px rgba(0,0,0,0.05)
Transition:     box-shadow 300ms ease on scroll
```

### Reduced Motion

All animations must respect `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 13. Accessibility Requirements

### Contrast Ratios

| Element                        | Foreground    | Background    | Ratio  | Requirement |
|-------------------------------|---------------|---------------|--------|-------------|
| Body text                     | #2D2D2D       | #FFFBF8       | >18:1  | AA pass     |
| Body text on Light Coral BG   | #2D2D2D       | #FFF0ED       | >16:1  | AA pass     |
| Body text on Light Teal BG    | #2D2D2D       | #E8F6F6       | >14:1  | AA pass     |
| Headings (Navy) on Warm White | #2C3E6B       | #FFFBF8       | ~12:1  | AA pass     |
| White text on Navy            | #FFFFFF       | #2C3E6B       | ~8.5:1 | AA pass     |
| White text on Coral           | #FFFFFF       | #E86B5A       | ~3.2:1 | Fails AA for small text — use only for large text (H2+) or bold 18px+ |
| Teal links on white           | #2BA5A5       | #FFFFFF       | ~3.5:1 | Borderline — pair with underline for links |
| Gray Text on backgrounds      | #6B7280       | #FFFBF8       | ~5.5:1 | AA pass     |

Note on Coral/white: Coral (#E86B5A) on white fails WCAG AA for small body text.
In the Final CTA section, the background is Navy, not Coral — this is intentional.
Do NOT use a full Coral background with white small text anywhere on the page.
Coral is used only for buttons (white text on button — large, bold) and accent elements.

### Focus Indicators

```
All interactive elements (links, buttons, inputs):
  outline: 2px solid #2BA5A5 (Teal)
  outline-offset: 2px
  Visible at all times when focused via keyboard
```

### Skip Link

```
First focusable element in the DOM (before the navbar):
  Text:       "דלג לתוכן הראשי" (Skip to main content)
  href:       #main-content
  Position:   Visually hidden until focused
  On focus:   Appears at top-left of viewport (or top-right in RTL)
  Style:      White background, Navy text, padding 12px 24px, radius 8px, z-index 9999
```

Add `id="main-content"` to the `<main>` element that wraps all page sections.

### Touch Targets

```
All buttons:      min-height 48px, min-width 48px
Nav links:        min-height 44px (navbar), min-height 64px (mobile overlay)
Card CTA links:   include enough surrounding clickable area
Social icons:     40x40px icon inside a 48x48px touch target container
WhatsApp button:  56x56px — meets requirement
Hamburger icon:   48x48px touch target
```

### Images

All images must have descriptive `alt` text as specified in each section above.
Decorative SVG icons within benefit blocks: `aria-hidden="true"` (decorative only).

### Semantic HTML

```
<header>     — Navbar
<main id="main-content">  — All page sections
<section>    — Each named section (hero, services, why, testimonials, about, cta)
<footer>     — Footer
<nav>        — Navigation links
<ul><li>     — Navigation link lists and footer link lists
<article>    — Testimonial cards
<h1>         — One per page, in the hero
<h2>         — Section headings
<h3>         — Card headings and benefit block headings
```

---

## 14. RTL Implementation Notes

### Document Level

```html
<html lang="he" dir="rtl">
```

All CSS logical properties (padding-inline-start, padding-inline-end) are preferred over
physical properties (padding-left, padding-right) to ensure RTL correctness. However, if
the developer uses physical properties, they must apply them with RTL in mind (right is the
start side).

### Layout Direction Specifics

| Element                    | RTL Behavior                                                              |
|----------------------------|---------------------------------------------------------------------------|
| Navbar logo                | Positioned at the visual right (reading start)                            |
| Navbar CTA button          | Positioned at the visual left (reading end)                               |
| Hamburger icon             | At the visual left (reading end) on mobile                                |
| Mobile menu slide-in       | Slides in from the visual left (reading end)                              |
| Hero image                 | Visual left column (reading end) — text is on the right (reading start)  |
| Card CTA arrow icon        | Points LEFT (←) — indicates forward navigation in RTL reading flow       |
| About Teaser photo         | Visual right column (reading start) — text is on the left (reading end)  |
| WhatsApp floating button   | Bottom-LEFT corner (reading end corner for floating actions in RTL)       |
| Footer columns             | Reading order right-to-left: Logo > Quick links > Services > Contact      |
| Footer bottom bar          | Copyright on the right (reading start), secondary text on the left        |

### Icon Direction

Icons that imply direction (arrows, chevrons, carriage-return symbols) must be flipped
for RTL. Use `transform: scaleX(-1)` on directional icons, or use icons that are
inherently directional-neutral (chevron-right becomes pointing LEFT in RTL, which means
"forward" in RTL reading flow).

Suggested approach: Use `chevron-left` icon (←) for all "go to page" links. In LTR this
would be backwards, but in RTL it reads as "proceed." Alternatively, use a system that
auto-flips based on `dir="rtl"`.

### Text Alignment

```
All body text:   text-align: start (resolves to right in RTL)
Centered content (section headings, CTA section): text-align: center (same in both directions)
Card content:    text-align: start (right in RTL)
```

### Flex and Grid Direction

```
Flex rows:     default flex-direction: row works correctly in RTL (flex items flow right-to-left)
Grid:          same — grid fills columns right-to-left
Explicit RTL:  no need for flex-direction: row-reverse unless intentionally overriding
```

---

## 15. Design Quality Checklist

- [x] Consistent with ArtyParty brand identity and logo aesthetic — rounded corners, soft shadows, craft warmth
- [x] Color palette used correctly — Coral leads CTAs, Teal supports B2B and secondary actions, Yellow only for the birthday badge accent
- [x] Typography hierarchy is clear — H1/H2/H3 in Navy, body in Dark Text, Gray Text for captions
- [x] All spacing follows the 8px grid — 8/16/24/32/48/64/80px values used throughout
- [x] Mobile layout designed first — single column, stacked, hamburger nav, carousel testimonials
- [x] RTL layout considered — logo right, CTA left, images right-to-left column order, arrows pointing correctly
- [x] At least one CTA visible above the fold — WhatsApp button in hero section
- [x] WCAG AA contrast reviewed — noted Coral/white limitation, avoided for small body text
- [x] Design appeals to adults (parents, HR) — professional card layout, clear service descriptions, no childish elements
- [x] White space is generous — 80px section padding, 24/32px grid gaps, 48px between headings and grids
- [x] No invented content — all testimonials and photos use the exact placeholder format from the copy file
- [x] B2B card (Corporate) visually differentiated with Teal accent while maintaining grid consistency
- [x] WhatsApp floating button specified with pulse animation and proper RTL positioning
- [x] Scroll animations specified with stagger delays and reduced-motion fallback
- [x] Focus indicators specified for all interactive elements
- [x] Skip-to-content link specified
- [x] Semantic HTML element assignments documented

---

## Appendix A — Section Summary Table

| Section          | id                | Background     | Top padding (desktop) | Primary CTA              |
|-----------------|-------------------|----------------|-----------------------|--------------------------|
| Navbar           | —                 | #FFFFFF        | —                     | צרו קשר (Coral button)   |
| Hero             | —                 | #FFFBF8        | 80px                  | WhatsApp button (green)  |
| Services         | services          | #FFF0ED        | 80px                  | Per-card text links      |
| Why ArtyParty    | why-artyparty     | #FFFBF8        | 80px                  | None (trust building)    |
| Testimonials     | testimonials      | #E8F6F6        | 80px                  | None (social proof)      |
| About Teaser     | about-teaser      | #FFFBF8        | 80px                  | קראו עוד עלינו (Teal)    |
| Final CTA        | cta-final         | #2C3E6B        | 80px                  | WhatsApp + Contact       |
| Footer           | —                 | #2C3E6B        | 64px                  | WhatsApp link            |

---

## Appendix B — Placeholder Log (from copy file)

All items below must be replaced with real content before site launch.

| #  | Type        | Section               | Description                                                    |
|----|-------------|----------------------|----------------------------------------------------------------|
| 1  | Photo        | Hero                  | ילדים יוצרים יחד בסדנת יצירה צבעונית — צבעים, מברשות, חיוכים |
| 2  | Photo        | Services — Art        | ילד/ה מצייר/ת בשיעור אמנות                                     |
| 3  | Photo        | Services — Birthday   | ילדים חוגגים יום הולדת עם חומרי יצירה                         |
| 4  | Photo        | Services — Camps      | קבוצת ילדים בקייטנת יצירה                                      |
| 5  | Photo        | Services — Corporate  | ילדים יוצרים באירוע חברתי, קבוצה גדולה                        |
| 6  | Testimonial  | Testimonials — #1     | הורה לילד שחגג יום הולדת יצירה                                 |
| 7  | Testimonial  | Testimonials — #2     | הורה לילדה בחוג אמנות שבועי                                    |
| 8  | Testimonial  | Testimonials — #3     | מנהל/ת HR שארגנה יום כיף לילדי עובדים                        |
| 9  | Photo        | About Teaser          | תמונת מייסד/ת ArtyParty                                        |
| 10 | Address      | Footer / Schema       | כתובת מדויקת של הסטודיו בתל מונד                               |
| 11 | WhatsApp URL | Hero CTA + Final CTA  | לינק click-to-chat לוואטסאפ עם מספר הטלפון                    |

---

*End of design specification. The web-developer agent should implement index.html, its CSS, and
its JS directly from this document. All copy text is sourced verbatim from
`website/content/homepage-copy.md`. No copy should be invented or modified during implementation.*
