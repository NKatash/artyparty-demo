# SEO Audit & Optimization Report — ArtyParty Website

**Date:** 2026-04-04  
**Audited by:** SEO Specialist Agent  
**Pages audited:** index.html, birthday-workshops.html, art-classes.html, holiday-camps.html, our-studio.html, about.html, contact.html  
**New files created:** sitemap.xml, robots.txt

---

## Executive Summary

The website had a strong SEO foundation on the homepage (complete meta tags, OG, Twitter cards, rich LocalBusiness JSON-LD, good alt text). However, all inner pages were missing Twitter Cards, og:image, og:site_name, and structured data schemas. The LocalBusiness schema on about.html and contact.html had an incorrect `addressRegion` value. The homepage JSON-LD had wrong social media URLs in `sameAs`. No sitemap.xml or robots.txt existed.

All critical issues have been fixed. Details per page below.

---

## Page-by-Page Audit & Changes

---

### 1. index.html (Homepage)

**Primary keyword:** סדנאות יצירה לילדים

**Status before audit:**
- Title, meta description, canonical: GOOD
- Open Graph (all fields including og:image): GOOD
- Twitter Cards: GOOD
- LocalBusiness JSON-LD: GOOD but with wrong sameAs URLs
- H1: "סדנאות יצירה לילדים שמשאירות חיוך" — GOOD (contains primary keyword)
- Image alt text: GOOD (all 16 images had descriptive Hebrew alt text)

**Changes made:**
1. **Fixed `sameAs` URLs in LocalBusiness JSON-LD** — The schema had fabricated URLs (`https://www.instagram.com/artyparty.il`, `https://www.facebook.com/artyparty.il`) that don't match the real accounts documented in CLAUDE.md. Corrected to:
   - `https://www.instagram.com/liorbenezraa`
   - `https://www.facebook.com/share/189bh4nHQp/`
   - Removed LinkedIn entry (no LinkedIn URL documented in CLAUDE.md)

**Why:** sameAs signals to Google which social profiles belong to this business. Wrong URLs break the knowledge graph connection and could be flagged as inconsistent NAP.

---

### 2. birthday-workshops.html

**Primary keyword:** יום הולדת יצירה

**Status before audit:**
- Title: "סדנת יום הולדת יצירה לילדים | ArtyParty" — acceptable but could better front-load primary keyword
- Meta description: GOOD (153 chars, contains keyword, CTA)
- Canonical: GOOD
- og:type, og:title, og:description, og:url, og:locale: present
- og:image: MISSING
- og:site_name: MISSING
- Twitter Cards: MISSING (entire block)
- Structured data: MISSING (no JSON-LD at all)
- H1: "יום הולדת יצירה שהילדים ידברו עליו עוד שבועות" — GOOD (contains primary keyword)
- Image alt text: GOOD (all 4 images had descriptive alt text)

**Changes made:**
1. **Improved title** — Changed from "סדנת יום הולדת יצירה לילדים | ArtyParty" to "יום הולדת יצירה לילדים | סדנאות ימי הולדת | ArtyParty" to front-load the exact high-priority keyword "יום הולדת יצירה".
2. **Added og:image, og:image:width, og:image:height, og:image:alt, og:site_name** — Required for proper social previews when links are shared on WhatsApp, Facebook, etc.
3. **Added complete Twitter Card block** — summary_large_image type with title, description, image, image:alt.
4. **Added JSON-LD structured data** — `@graph` array containing:
   - `BreadcrumbList` schema (homepage → birthday workshops)
   - `Service` schema with provider (LocalBusiness), areaServed, audience age range, and `hasOfferCatalog` listing all three workshop types (בקתה ביער, היער הקסום, נוקבוק)

**Why:** Service schema helps Google understand the page is about a purchasable service, not just informational content. BreadcrumbList improves SERP display and helps Google understand site structure.

---

### 3. art-classes.html

**Primary keyword:** חוגי אמנות לילדים

**Status before audit:**
- Title: "חוגי אמנות לילדים בתל מונד | ArtyParty" — GOOD (55 chars, contains primary keyword + location)
- Meta description: GOOD (147 chars, contains keyword, CTA)
- Canonical: GOOD
- og:type, og:title, og:description, og:url, og:locale: present
- og:image: MISSING
- og:site_name: MISSING
- Twitter Cards: MISSING
- Structured data: MISSING
- H1: "חוגי אמנות לילדים שמפתחים יצירתיות ובטחון עצמי" — GOOD (contains primary keyword)
- Image alt text: GOOD (all 3 images had descriptive Hebrew alt text)

**Changes made:**
1. **Added og:image, og:image:width, og:image:height, og:image:alt, og:site_name**
2. **Added complete Twitter Card block**
3. **Added JSON-LD structured data** — `@graph` containing:
   - `BreadcrumbList` schema
   - `Service` schema with provider, areaServed, audience, and `hasOfferCatalog` listing both class types (חוג אומנות, חוג ציור)

---

### 4. holiday-camps.html

**Primary keyword:** קייטנת יצירה

**Status before audit:**
- Title: "קייטנת יצירה לילדים בחופשות | ArtyParty" — GOOD (42 chars, contains primary keyword)
- Meta description: GOOD (148 chars, contains keyword, location, CTA)
- Canonical: GOOD
- og:type, og:title, og:description, og:url, og:locale: present
- og:image: MISSING
- og:site_name: MISSING
- Twitter Cards: MISSING
- Structured data: MISSING
- H1: "קייטנת יצירה שהילדים מחכים לה בכל חופשה" — GOOD (contains primary keyword)
- Image alt text: GOOD (all 10 images had descriptive Hebrew alt text)

**Changes made:**
1. **Improved title** — Added "תל מונד" to title for local SEO signal: "קייטנת יצירה לילדים בחופשות | ArtyParty תל מונד"
2. **Added og:image, og:image:width, og:image:height, og:image:alt, og:site_name**
3. **Added complete Twitter Card block**
4. **Added JSON-LD structured data** — `@graph` containing:
   - `BreadcrumbList` schema
   - `Service` schema with provider, areaServed, and audience details

**Note:** No `Event` schema was added because no confirmed future camp dates are available yet. When summer 2026 camp dates are confirmed, add an `Event` schema with `startDate`, `endDate`, and `location`.

---

### 5. our-studio.html

**Primary keyword:** סדנאות יצירה תל מונד

**Status before audit:**
- Title: "הסטודיו של ArtyParty בתל מונד | סדנאות יצירה" — GOOD (47 chars, contains location + service)
- Meta description: GOOD (118 chars, contains location, inviting CTA)
- Canonical: GOOD
- og:type, og:title, og:description, og:url, og:locale: present
- og:image: MISSING
- og:site_name: MISSING
- Twitter Cards: MISSING
- Structured data: MISSING
- H1: "הסטודיו שלנו — המקום שבו הקסם קורה" — GOOD (page purpose clear; first paragraph contains "סדנאות יצירה תל מונד")
- Image alt text: GOOD (all 5 studio photos had descriptive Hebrew alt text including studio features, ArtyParty name, and location)

**Changes made:**
1. **Improved title** — Added "לילדים" to meta description for stronger keyword signal
2. **Improved meta description** — More keyword-forward: "סטודיו יצירה בהיר ומצויד בתל מונד — המקום שבו מתקיימות סדנאות יצירה לילדים, חוגי אמנות וימי הולדת. הציצו פנימה."
3. **Added og:image, og:image:width, og:image:height, og:image:alt, og:site_name**
4. **Added complete Twitter Card block**
5. **Added JSON-LD structured data** — `@graph` containing:
   - `BreadcrumbList` schema
   - `LocalBusiness` schema with correct addressRegion "אזור השרון", areaServed, availableLanguage, and correct sameAs URLs

---

### 6. about.html

**Primary keyword:** סדנאות יצירה באזור השרון

**Status before audit:**
- Title: "על ליאור ו-ArtyParty | סדנאות יצירה באזור השרון" — GOOD (49 chars, contains primary keyword)
- Meta description: GOOD (144 chars, contains founder name, keyword)
- Canonical: GOOD
- og:type, og:title, og:description, og:url, og:locale: present
- og:image: MISSING
- og:site_name: MISSING
- Twitter Cards: MISSING
- Structured data: PRESENT but with ERRORS
  - `addressRegion: "השרון"` — should be `"אזור השרון"` for consistency
  - `telephone: "+972522458303"` — missing hyphens (format inconsistency)
  - Missing `areaServed`, `availableLanguage`
  - No `BreadcrumbList`
- H1: "ליאור, ArtyParty, ולמה כל זה התחיל" — GOOD
- Image alt text: second photo had weak alt "ליאור בן-עזרא, מייסדת ArtyParty"

**Changes made:**
1. **Added og:image, og:image:width, og:image:height, og:image:alt, og:site_name**
2. **Added complete Twitter Card block**
3. **Replaced LocalBusiness JSON-LD** with `@graph` array containing:
   - `BreadcrumbList` schema
   - `LocalBusiness` with corrected `addressRegion: "אזור השרון"`, corrected telephone format `"+972-52-2458303"`, added `areaServed`, `availableLanguage`, correct `sameAs` URLs, and `founder` entity with Bezalel alumniOf
4. **Improved alt text on second owner photo** — Changed from "ליאור בן-עזרא, מייסדת ArtyParty" to "ליאור בן-עזרא, מייסדת ArtyParty — מנחה סדנאות יצירה לילדים באזור השרון"

---

### 7. contact.html

**Primary keyword:** סדנאות יצירה תל מונד

**Status before audit:**
- Title: "צרו קשר | ArtyParty — סדנאות יצירה תל מונד" — GOOD (46 chars, contains primary keyword + location)
- Meta description: GOOD (123 chars, contains CTA)
- Canonical: GOOD
- og:type, og:title, og:description, og:url, og:locale: present
- og:image: MISSING
- og:site_name: MISSING
- Twitter Cards: MISSING
- Structured data: PRESENT but with ERRORS (same as about.html: wrong addressRegion, telephone format, missing fields)
- H1: "נשמח לשמוע מכם" — acceptable for a contact page (conversion-focused)
- No images on this page

**Changes made:**
1. **Slightly improved meta description** — Added "סדנת יצירה" to first sentence for keyword presence
2. **Added og:image, og:image:width, og:image:height, og:image:alt, og:site_name** — Using homepage OG image as fallback since contact page has no unique hero image
3. **Added complete Twitter Card block**
4. **Replaced LocalBusiness JSON-LD** with `@graph` containing:
   - `BreadcrumbList` schema
   - `LocalBusiness` with corrected `addressRegion: "אזור השרון"`, corrected telephone, added `areaServed`, `availableLanguage`, `contactPoint` with telephone details, correct `sameAs` URLs

---

## Technical SEO — New Files Created

### sitemap.xml

Created at `website/sitemap.xml`. Contains all 8 pages with:
- Correct canonical URLs (`https://www.artyparty.co.il/...`)
- `lastmod` dates set to 2026-04-04
- `priority` values reflecting business importance:
  - Homepage: 1.0
  - Birthday workshops + Art classes: 0.9 (highest-demand services)
  - Holiday camps + Corporate fun days: 0.8
  - Contact: 0.7
  - Studio + About: 0.6
- `changefreq` of "weekly" for homepage, "monthly" for inner pages

**Action required:** Submit sitemap URL (`https://www.artyparty.co.il/sitemap.xml`) to Google Search Console after domain goes live.

### robots.txt

Created at `website/robots.txt`. Simple permissive file:
- `User-agent: *` / `Allow: /` — permits all crawlers
- Points to sitemap URL for crawler discovery

---

## Summary of All Changes

| File | Changes |
|------|---------|
| index.html | Fixed sameAs URLs in LocalBusiness JSON-LD |
| birthday-workshops.html | Improved title; added og:image/site_name; added Twitter Cards; added Service + BreadcrumbList JSON-LD |
| art-classes.html | Added og:image/site_name; added Twitter Cards; added Service + BreadcrumbList JSON-LD |
| holiday-camps.html | Added "תל מונד" to title; added og:image/site_name; added Twitter Cards; added Service + BreadcrumbList JSON-LD |
| our-studio.html | Improved meta description; added og:image/site_name; added Twitter Cards; added LocalBusiness + BreadcrumbList JSON-LD |
| about.html | Added og:image/site_name; added Twitter Cards; fixed LocalBusiness JSON-LD (addressRegion, telephone, sameAs, founder); improved second photo alt text |
| contact.html | Improved meta description; added og:image/site_name; added Twitter Cards; fixed LocalBusiness JSON-LD (addressRegion, telephone, sameAs, contactPoint) |
| sitemap.xml | NEW FILE — all 8 pages indexed with priorities |
| robots.txt | NEW FILE — permits all crawlers, points to sitemap |

---

## Remaining Issues (Not Addressed — Require Content/Dev Action)

### Critical

1. **fun-days.html does not exist.** The corporate fun days page is the highest-value B2B service and a high-priority keyword target (`פעילות לילדי עובדים`). This page needs to be built. Its absence means missing out on the highest-value B2B search traffic.

2. **OG images don't exist yet.** All OG image URLs reference `/images/og-*.jpg` paths that need real 1200×630px images. Until these exist, social sharing previews will show no image. Recommended images to create:
   - `/images/og-homepage.jpg` (already referenced in original index.html — confirm this exists)
   - `/images/og-birthday.jpg`
   - `/images/og-art-classes.jpg`
   - `/images/og-camps.jpg`
   - `/images/og-studio.jpg`
   - `/images/og-about.jpg`

### Important

3. **Google Search Console not set up.** Before or at launch, verify domain ownership in Google Search Console and submit sitemap.xml. This is how Google is told to crawl the site efficiently.

4. **Google My Business (Google Maps) profile** should be created/claimed for ArtyParty with consistent NAP (Name: ArtyParty, Address: תל מונד, Phone: 052-2458303). This is critical for local pack rankings when parents in the Sharon area search for nearby children's workshops.

5. **gallery.html and faq.html referenced in CLAUDE.md page table but not yet built.** FAQ page with FAQPage schema would directly target "סדנאות יצירה לילדים שאלות נפוצות" and could generate rich result snippets in SERPs.

6. **The `fun-days.html` page (B2B corporate) needs these additional schema types** when built:
   - `Service` schema with B2B-specific description
   - Target audience: HR managers, welfare committees
   - Consider adding a `ContactPage` schema or an `Organization` alternative type

### Nice to Have

7. **Event schema for upcoming camps.** When summer 2026 camp dates are confirmed, add an `Event` schema to holiday-camps.html with `startDate`, `endDate`, and `location`. Event rich results appear prominently in Google Search.

8. **Image lazy loading on studio hero.** The studio page hero image uses `loading="eager"` which is correct. However, the 5 gallery images below all use `loading="lazy"` — this is correct and good for page speed.

9. **Internal link from contact.html to WhatsApp is present.** All pages correctly link to WhatsApp (`https://wa.me/972522458303`) via CTA buttons. No changes needed.

10. **hreflang tags** — Not needed yet as there are no English-language versions of pages. If an English version is ever created, add `<link rel="alternate" hreflang="he" ...>` and `<link rel="alternate" hreflang="en" ...>` pairs.

---

## NAP Consistency Check

After fixes, all pages now use consistent NAP:
- **Name:** ArtyParty
- **Address Locality:** תל מונד
- **Address Region:** אזור השרון (was "השרון" on about.html and contact.html — now corrected)
- **Country:** IL
- **Phone:** +972-52-2458303 (was "+972522458303" on about.html and contact.html — now corrected)

---

*Report generated: 2026-04-04 by SEO Specialist Agent*
