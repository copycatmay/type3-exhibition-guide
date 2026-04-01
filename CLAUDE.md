# TYPE3 2024: AI/AS24 — Exhibition Guide Website

## Project Overview
A website serving as an exhibition guide for the TYPE3 2024: AI/AS24 exhibition at aftermodern.gallery. All copy lives in `Guide Copy.txt` (or `Guide Copy.docx`/`Guide Copy.rtf`).

**Build order (as instructed):**
1. [DONE] Exhibitions by the Numbers → `exhibitions-by-the-numbers.html`
2. [HTML DONE] Art in the Exhibition → `just-plain-stupid.html`
3. [HTML DONE] Exhibition Intro → `exhibition-intro.html`
4. [HTML DONE] Staff/Credits → `staff-credits.html`
5. [HTML DONE] Sponsor listings → `sponsors.html`
6. [HTML DONE] Donation Card → `donation-card.html`
7. [HTML DONE] "Coding with Character" article → `coding-with-character.html`
8. [HTML DONE] Thank You page → `thank-you.html`
9. [DONE] Main Menu → `index.html`

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
| Role | Typeface | Source |
|------|----------|--------|
| Display | **Young Serif** | Self-hosted — `/fonts/*.otf` via `@font-face` in `style.css` |
| Body | **Akzidenz Grotesk Next** | Adobe Fonts (Typekit) |

**Akzidenz Grotesk Next kit:**
```html
<link rel="stylesheet" href="https://use.typekit.net/tlc1wya.css">
```
CSS font-family name: `akzidenz-grotesk-next-conden, sans-serif` ✓ confirmed (condensed variant)

**Young Serif:**
Self-hosted from `/fonts/` — downloaded from https://github.com/noirblancrouge/YoungSerif
Files: `YoungSerif-Light.otf`, `YoungSerif-LightItalic.otf`, `YoungSerif-Regular.otf`, `YoungSerif-RegularItalic.otf`, `YoungSerif-Medium.otf`, `YoungSerif-MediumItalic.otf`, `YoungSerif-Bold.otf`, `YoungSerif-BoldItalic.otf`
CSS font-family name: `"YoungSerif"` — loaded via `@font-face` in `style.css`

### Type Scale
`pt` is used directly in CSS (valid CSS unit; browsers render 1pt = 1.333px). No conversion needed — CSS values match the print spec exactly.

**Rule: only these sizes may be used. Not every size needs to be used, but no sizes outside this list are permitted.**

| Font | Size | Notes |
|------|------|-------|
| Young Serif | 600pt | Largest display — e.g. main title |
| Young Serif | 240pt | Large display — e.g. major section headings |
| Akzidenz | 92pt | Large display — originally wall/didactic text; use sparingly on screen |
| Young Serif | 40pt | Sub-section headings |
| Akzidenz | 36pt | Mid-level headings |
| Akzidenz | 24pt | Minor headings / emphasis |
| Akzidenz | 16pt | Body text, table data |
| Akzidenz | 9.5pt | Supporting/contextual text, captions |
| Akzidenz | 7pt | Footnotes |

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
| Token | Hex | Description |
|-------|-----|-------------|
| `--color-1` | `#000000` | Black |
| `--color-2` | `#73748F` | Muted slate |
| `--color-6` | `#FFFFFF` | White |

### Exhibition Accent Colours
There is no single "main accent." Each exhibition has its own accent colour. Use the appropriate accent on the exhibition's own page and wherever that exhibition is referenced.

| Token | Hex | Exhibition |
|-------|-----|------------|
| `--accent-living-paintings` | `#BF79B3` | Living pAIntings |
| `--accent-doug` | `#5A75FA` | D.O.U.G. |
| `--accent-norilla` | `#EB1E16` | NoRILLA |
| `--accent-just-plain-stupid` | `#EBE117` | Just plAIn stupid |

Define in `:root` at the top of each stylesheet:
```css
:root {
    --color-1: #000000;
    --color-2: #73748F;
    --color-6: #FFFFFF;

    --accent-living-paintings: #BF79B3;
    --accent-doug: #5A75FA;
    --accent-norilla: #EB1E16;
    --accent-just-plain-stupid: #EBE117;
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
All copy lives in: `Guide Copy.txt`

### Section reference (line numbers in Guide Copy.txt):
- Staff/Credits: lines 2–8
- Exhibition Sponsors (Tiers 1–6): lines 12–26
- Exhibition Intro: lines 30–33
- Art in the Exhibition: lines 37–86
  - Just plAIn stupid: lines 38–44
  - DOUG: lines 46–63
  - NoRILLA: lines 65–73
  - Living pAIntings: lines 75–86
- Exhibitions by the Numbers: lines 88–156
  - Statement of Operations: lines 89–131
  - Balance Sheet: lines 134–157
- Donation Card: lines 160–173
- Coding with Character article: lines 177–351
- Thank You page: lines 355–360

---

## Files
| File | Description |
|------|-------------|
| `index.html` | Main menu — links to all sections |
| `exhibition-intro.html` | Exhibition intro copy |
| `just-plain-stupid.html` | Just plAIn stupid artwork page |
| `doug.html` | D.O.U.G. artwork page |
| `norilla.html` | NoRILLA artwork page |
| `living-paintings.html` | Living pAIntings artwork page |
| `exhibitions-by-the-numbers.html` | Financial statements — HTML + CSS applied, expand modal |
| `staff-credits.html` | Staff and credits |
| `sponsors.html` | Sponsor listings (Tiers 1–6), 2-column swipe layout |
| `donation-card.html` | Donation form |
| `coding-with-character.html` | Coding with Character article |
| `thank-you.html` | Thank you page with sponsor logos |
| `css/style.css` | Shared base stylesheet |
| `css/art.css` | Art pages stylesheet |
| `css/numbers.css` | Exhibitions by the Numbers stylesheet |
| `css/sponsors.css` | Sponsors page stylesheet |
| `css/header.css` | Shared header + menu overlay styles |
| `js/header.js` | Header scroll behaviour + menu toggle |
| `js/numbers.js` | Numbers page swipe/interaction logic |
| `js/sponsors.js` | Sponsors page swipe/interaction logic |
| `fonts/` | Young Serif OTF files (Light, Regular, Medium, Bold + italics) |
| `img/` | Background images (`bg1–4.png`), sponsor logo lockup (`lockup.svg`) |
| `src/` | Source copy (`Guide Copy.txt`, `Guide Copy.docx`, `hierarchy.txt`) |
| `CLAUDE.md` | This file |

## Current Status
- `exhibitions-by-the-numbers.html` — HTML + CSS complete, expand modal working
- `sponsors.html` — HTML + CSS complete, 2-column swipe layout with logo lockup
- All other section HTML pages — structure complete, sharing `style.css`, no section-specific CSS yet
- `index.html` — main menu with links to all sections
