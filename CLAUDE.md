# TYPE3 2026: AI/AS26 — Exhibition Guide Website

## Project Overview

A website serving as an exhibition guide for the TYPE3 2026: AI/AS26 exhibition at aftermodern.gallery. All copy lives in `Guide Copy.txt` (or `Guide Copy.docx`/`Guide Copy.rtf`).

---

## HTML Structure Conventions

- Each major section is a `<section id="...">` with an `<h2>` heading
- Sub-sections use `<article id="...">` with `<h3>` headings
- Financial tables use multiple `<tbody>` blocks to separate row groups (Revenue, Expenses, Assets, Liabilities)
- Row group headers use `<th scope="rowgroup" colspan="3">`
- Total rows use `<tr class="row-total">` with `<th scope="row">` for the label
- Notes are `<ol class="notes">` placed after each table
- Director signature line uses `<p class="director-signature">`

---

## Typographic Hierarchy

> **WORKING — sizes may change.** Do not alter font sizes without instruction.
> These were designed for print/in-exhibition didactic wall text and are carried over to web as-is.

### Fonts

| Role    | Typeface                  | Source                                                       |
| ------- | ------------------------- | ------------------------------------------------------------ |
| Display | **Young Serif**           | Self-hosted — `/fonts/*.otf` via `@font-face` in `style.css` |
| Body    | **Akzidenz Grotesk Next** | Adobe Fonts (Typekit)                                        |

**Akzidenz Grotesk Next kit:**

```html
<link rel="stylesheet" href="https://use.typekit.net/tlc1wya.css" />
```

CSS font-family name: `akzidenz-grotesk-next-conden, sans-serif` ✓ confirmed (condensed variant)

**Young Serif:**
Self-hosted from `/fonts/` — downloaded from https://github.com/noirblancrouge/YoungSerif
Files: `YoungSerif-Light.otf`, `YoungSerif-LightItalic.otf`, `YoungSerif-Regular.otf`, `YoungSerif-RegularItalic.otf`, `YoungSerif-Medium.otf`, `YoungSerif-MediumItalic.otf`, `YoungSerif-Bold.otf`, `YoungSerif-BoldItalic.otf`
CSS font-family name: `"YoungSerif"` — loaded via `@font-face` in `style.css`

### Type Scale

`pt` is used directly in CSS (valid CSS unit; browsers render 1pt = 1.333px). No conversion needed — CSS values match the print spec exactly.

**Rule: only these sizes may be used. Not every size needs to be used, but no sizes outside this list are permitted.**

| Font        | Size  | Notes                                                                  |
| ----------- | ----- | ---------------------------------------------------------------------- |
| Young Serif | 600pt | Largest display — e.g. main title                                      |
| Young Serif | 240pt | Large display — e.g. major section headings                            |
| Akzidenz    | 92pt  | Large display — originally wall/didactic text; use sparingly on screen |
| Young Serif | 40pt  | Sub-section headings                                                   |
| Akzidenz    | 36pt  | Mid-level headings                                                     |
| Akzidenz    | 24pt  | Minor headings / emphasis                                              |
| Akzidenz    | 16pt  | Body text, table data — **deprecated in favour of 12pt**               |
| Akzidenz    | 12pt  | Body text, table data — **exception, approved 2026-04-07**             |
| Akzidenz    | 9.5pt | Supporting/contextual text, captions                                   |
| Akzidenz    | 7pt   | Footnotes                                                              |

> Element-to-size mapping is determined per section as styling is applied. Ask user when uncertain.

### Weights

Free to choose — will be refined iteratively. No restrictions.

### Spacing / Leading

> To be specified

---

## Responsive Design

- **Mobile-first** — this is an exhibition guide, primarily viewed on phones
- Write CSS for mobile by default; use `min-width` media queries to scale up for desktop
- Must function on desktop but mobile experience takes priority when trade-offs are needed

---

## Colour Palette

> **WORKING — subject to change.** Use CSS custom properties exclusively so colours can be swapped globally.

### Neutrals

| Token       | Hex       | Description |
| ----------- | --------- | ----------- |
| `--color-1` | `#000000` | Black       |
| `--color-2` | `#73748F` | Muted slate |
| `--color-6` | `#FFFFFF` | White       |

### Exhibition Accent Colours

There is no single "main accent." Each exhibition has its own accent colour. Use the appropriate accent on the exhibition's own page and wherever that exhibition is referenced.

| Token                       | Hex       | Exhibition       |
| --------------------------- | --------- | ---------------- |
| `--accent-living-paintings` | `#BF79B3` | Living pAIntings |
| `--accent-doug`             | `#5A75FA` | D.O.U.G.         |
| `--accent-norilla`          | `#EB1E16` | NoRILLA          |

Define in `:root` at the top of each stylesheet:

```css
:root {
  --color-1: #000000;
  --color-2: #73748f;
  --color-6: #ffffff;

  --accent-living-paintings: #bf79b3;
  --accent-doug: #5a75fa;
  --accent-norilla: #eb1e16;
}
```

> `--color-3` through `--color-5` are **deprecated** — migrate any remaining references to the per-exhibition accent tokens above.

---

## CSS Approach

- `style.css` exists and is linked in `exhibitions-by-the-numbers.html` — rudimentary first-pass styling applied
- All future sections share `style.css`
- Use CSS custom properties (variables) for all colours, fonts, and spacing
- No inline styles
- Mobile-first: default styles target mobile, `min-width` breakpoints for desktop
- Single desktop breakpoint currently at `min-width: 768px`

---

## Content Source

All copy lives in: `Guide Copy.txt` (under `src/Guide Copy.txt` in this repo).

### Web vs source copy

- **`*CN*` in Guide Copy** — On `doug.html`, replace with **愫君** (Sougwen Chung’s name as used on the site).
- **David Carson (Tier 2)** — On `sponsors.html`, list **$45,000** so the amount stays within the Tier 2 band ($10,000–$49,999). If `Guide Copy.txt` shows a different figure, the site amount takes precedence unless the copy file is corrected.

### Section reference (line numbers in `src/Guide Copy.txt`)

- Staff/Credits: lines 3–8
- Exhibition Sponsors (Tiers 1–6): lines 11–25
- Exhibition Intro: lines 28–31
- Art in the Exhibition: lines 34–82
  - DOUG: lines 43–59
  - NoRILLA: lines 62–69
  - Living pAIntings: lines 72–82
- Exhibitions by the Numbers: lines 84–152
  - Statement of Operations: lines 85–127
  - Balance Sheet: lines 130–152
- Donation Card: lines 155–168
- Coding with Character article: lines 171–289
- Thank You page: lines 308–312

---

## Files

| File                              | Description                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `index.html`                      | Main menu — links to all sections                                                                                              |
| `exhibition-intro.html`           | Exhibition intro copy                                                                                                          |
| `doug.html`                       | D.O.U.G. artwork page                                                                                                          |
| `norilla.html`                    | NoRILLA artwork page                                                                                                           |
| `living-paintings.html`           | Living pAIntings artwork page                                                                                                  |
| `exhibitions-by-the-numbers.html` | Financial statements — HTML + CSS applied, expand modal                                                                        |
| `staff-credits.html`              | Staff and credits                                                                                                              |
| `sponsors.html`                   | Sponsor listings (Tiers 1–6), 2-column swipe layout                                                                            |
| `donation-card.html`              | Donation form                                                                                                                  |
| `coding-with-character.html`      | Coding with Character article                                                                                                  |
| `thank-you.html`                  | Thank you page with sponsor logos                                                                                              |
| `css/style.css`                   | Shared base stylesheet                                                                                                         |
| `css/art.css`                     | Art pages stylesheet                                                                                                           |
| `css/numbers.css`                 | Exhibitions by the Numbers stylesheet                                                                                          |
| `css/sponsors.css`                | Sponsors page stylesheet                                                                                                       |
| `css/header.css`                  | Shared header + menu overlay styles                                                                                            |
| `js/menu-include.js`              | Single source of truth for header + menu overlay markup (injected via JS)                                                      |
| `js/header.js`                    | Header scroll behaviour + menu toggle                                                                                          |
| `js/numbers.js`                   | Numbers page swipe/interaction logic                                                                                           |
| `js/coding-with-character.js`     | Coding with Character page swipe/interaction logic                                                                             |
| `js/sponsors.js`                  | Sponsors page swipe/interaction logic                                                                                          |
| `fonts/`                          | Young Serif OTF files (Light, Regular, Medium, Bold + italics)                                                                 |
| `img/`                            | Background images (`bg1–4.png`), sponsor logo lockup (`lockup.svg`)                                                            |
| `src/`                            | Source copy (`Guide Copy.txt`, `Guide Copy.docx`, `hierarchy.txt`); authoritative line references are for `src/Guide Copy.txt` |
| `CLAUDE.md`                       | This file                                                                                                                      |
