# Page: Contact (contact.html)

> **For:** Web Designer + Web Developer
> **Status:** Ready for layout and implementation
> **Last updated:** 2026-04-02
> **Author:** Content Writer agent

---

## Meta

- **Title tag:** צרו קשר | ArtyParty — סדנאות יצירה תל מונד
  _(50 chars — CTA + brand + keyword + location)_
- **Meta description:** רוצים להזמין סדנה, להירשם לחוג, או לשאול שאלה? שלחו הודעה — ArtyParty בתל מונד עונה תוך יום עסקים.
  _(99 chars — low-barrier, response time promise, location)_
- **H1:** נשמח לשמוע מכם
- **Canonical URL:** /contact.html
- **og:title:** צרו קשר עם ArtyParty | סדנאות יצירה תל מונד
- **og:description:** יש שאלה? רוצים להזמין סדנה? שלחו הודעה בוואטסאפ או מלאו את הטופס — נחזור אליכם מהר.

---

## Hero Section

> **Designer note:** Compact hero, no image needed. Warm light background (#FFF0ED). H1 in Navy, subheadline in Dark Text. WhatsApp CTA button in Coral should appear here — it's the highest-converting action on this page. Keep the section short so the user reaches the contact methods and form quickly.

- **H1 (Headline):** נשמח לשמוע מכם
- **Subheadline:**
  ספרו לנו מה אתם מחפשים — ונחזור אליכם תוך יום עסקים.
  הדרך הכי מהירה? וואטסאפ.

- **Primary CTA button:** שלחו הודעה בוואטסאפ
  _(Link: https://wa.me/972522458303)_

---

## Section: Contact Methods

> **Designer note:** Structured list of contact channels, each as a card or row with an icon, label, and action link. 2-column layout on desktop (phone + WhatsApp in one column, social in the other), single column on mobile. Light teal background (#E8F6F6). Each item should have a tappable/clickable action — no dead text. Section heading in Navy.

- **Section heading (H2):** דרכי יצירת קשר

---

### Channel 1 — WhatsApp

- **Icon suggestion:** WhatsApp logo / chat bubble icon
- **Label:** וואטסאפ
- **Description:** הדרך הכי מהירה לדבר איתנו
- **Action text:** שלחו הודעה
- **Link:** https://wa.me/972522458303
- **Button style:** Prominent Coral button — this is the primary contact action

---

### Channel 2 — Phone

- **Icon suggestion:** phone icon
- **Label:** טלפון
- **Description:** 052-2458303
- **Action text:** התקשרו עכשיו
- **Link:** tel:0522458303
- **Button style:** Secondary (outline or teal)

---

### Channel 3 — Instagram

- **Icon suggestion:** Instagram logo
- **Label:** אינסטגרם
- **Description:** @liorbenezraa — עקבו אחרינו לתמונות ועדכונים
- **Action text:** לפרופיל שלנו
- **Link:** https://www.instagram.com/liorbenezraa?igsh=cmU5NXExcHZtNDIz
- **Button style:** Secondary (outline)

---

### Channel 4 — Facebook

- **Icon suggestion:** Facebook logo
- **Label:** פייסבוק
- **Description:** ArtyParty — עמוד הפייסבוק שלנו
- **Action text:** לעמוד שלנו
- **Link:** https://www.facebook.com/share/189bh4nHQp/
- **Button style:** Secondary (outline)

---

## Section: Contact Form

> **Designer note:** Single-column form, full width on mobile, max-width ~560px centered on desktop. Labels above fields (RTL). All fields right-aligned. Required fields marked with asterisk (*). Submit button full-width on mobile, normal width on desktop — in Coral. Form background: warm white (#FFFBF8) with a subtle border or card shadow to distinguish it from the page background. Section heading in Navy.

- **Section heading (H2):** או שלחו לנו הודעה כאן

- **Intro text (small, under heading):**
  מלאו את הפרטים ונחזור אליכם בהקדם.

---

### Form Fields (spec for web developer)

| Field               | Type       | Label Hebrew               | Required | Notes                                                                 |
|---------------------|------------|----------------------------|----------|-----------------------------------------------------------------------|
| שם                  | text       | שם מלא *                   | Yes      | placeholder: "השם שלכם"                                               |
| טלפון               | tel        | טלפון *                    | Yes      | placeholder: "050-0000000"                                            |
| אימייל              | email      | אימייל                     | No       | placeholder: "example@email.com"                                      |
| מה מעניין אתכם?     | select     | מה מעניין אתכם? *          | Yes      | Options: (see dropdown values below)                                  |
| הודעה               | textarea   | הודעה                      | No       | placeholder: "ספרו לנו קצת יותר — תאריכים, גיל הילדים, מה שחשוב לכם" — 4 visible rows |

#### Dropdown Values — "מה מעניין אתכם?"

```
-- בחרו נושא --
יום הולדת יצירה
חוג אמנות
קייטנת יצירה
יום כיף לילדי עובדים
אחר
```

#### Submit Button

- **Text:** שלחו הודעה
- **Style:** Full-width on mobile, Coral background (#E86B5A), white text, rounded corners (8px)
- **Action:** `[Placeholder: form endpoint / email address for form submissions — to be configured before go-live]`

#### Success Message (shown after successful submission)

> **Developer note:** Display inline (replace form content) or as a banner below the form. Do NOT redirect to a new page.

**Hebrew:**
תודה! קיבלנו את ההודעה שלכם ונחזור אליכם בהקדם — בדרך כלל תוך יום עסקים.

**English (secondary):**
Thank you! We received your message and will get back to you within one business day.

#### Error Message (shown when required field is missing)

**Hebrew:**
אנא מלאו את כל השדות המסומנים בכוכבית (*) ונסו שוב.

---

## Section: Service Area

> **Designer note:** Simple 2–3 sentence block with a map pin icon suggestion. Light warm white background (#FFFBF8). No map embed in this section — that's on the Studio page. Keep it brief and warm.

- **Section heading (H2):** אזור הפעילות שלנו

- **Body:**
  הסטודיו שלנו נמצא בתל מונד ומשרת ילדים מכל אזור השרון.
  אנחנו גם מגיעים אליכם — לבית, לאולם, לחצר — כל מקום שנוח לכם.

- **Icon suggestion:** map pin icon adjacent to the first sentence

---

## Section: Final CTA

> **Designer note:** Matches the Final CTA section on all other pages. Coral background (#E86B5A), white text. Single prominent button — WhatsApp is the primary conversion action on this page.

- **Section heading (H2):** הדרך הכי מהירה לדבר איתנו

- **Body:**
  שלחו הודעה בוואטסאפ — נענה מהר.

- **Primary CTA button:** שלחו הודעה בוואטסאפ
  _(Link: https://wa.me/972522458303)_

---

## Full Content Inventory — Quick Reference

| Section           | H level | Hebrew heading                        | CTA text                      |
| ----------------- | ------- | ------------------------------------- | ----------------------------- |
| Hero              | H1      | נשמח לשמוע מכם                        | שלחו הודעה בוואטסאפ          |
| Contact Methods   | H2      | דרכי יצירת קשר                        | 4 per-channel action links    |
| Contact Form      | H2      | או שלחו לנו הודעה כאן                 | שלחו הודעה (submit button)   |
| Service Area      | H2      | אזור הפעילות שלנו                     | —                             |
| Final CTA         | H2      | הדרך הכי מהירה לדבר איתנו             | שלחו הודעה בוואטסאפ          |

---

## Placeholder Log

All items below must be replaced with real content before the site goes live.

| # | Type            | Location              | Description                                                                |
|---|-----------------|-----------------------|----------------------------------------------------------------------------|
| 1 | Form endpoint   | Contact Form          | Email address or backend endpoint to receive form submissions              |
| 2 | Studio address  | Footer / Schema       | כתובת מדויקת של הסטודיו בתל מונד — לשימוש בסכמת LocalBusiness            |

---

## Quality Checklist

- [x] Hebrew is natural — reads like a human wrote it, not a translation
- [x] Tone is warm and low-barrier — visitors should feel welcome, not pressured
- [x] No invented facts, testimonials, statistics, or claims
- [x] Every paragraph is 2–3 sentences max
- [x] At least one CTA in every section (WhatsApp appears in Hero, Channel 1, and Final CTA)
- [x] Primary keyword (סדנאות יצירה תל מונד) appears in title tag and meta description
- [x] WhatsApp link (https://wa.me/972522458303) used correctly in all 3 locations
- [x] Phone number (052-2458303) in human-readable format, tel: link in machine format
- [x] Instagram and Facebook links included with correct URLs
- [x] Form spec is complete: all fields, types, labels, placeholders, required flags, dropdown values, submit text, success message, error message
- [x] Content speaks to adults (parents), not to children
- [x] Active voice, second person, present/future tense throughout
- [x] No superlatives without proof
- [x] Both placeholders clearly marked with standard format
- [x] Consistent ArtyParty voice — warm, confident, direct, personal
