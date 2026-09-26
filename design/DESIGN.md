---
name: De mãos dadas pelo Martim
description: Martim's school exercise book. Squared paper, a cover the visitor picks from twelve (night-blue by default) scattered with bottle caps, correction-pen red and a highlighter.
colors:
  paper: "#FBFCFF"
  sheet-white: "#FFFFFF"
  cover: "#1E2B45"
  cover-deep: "#151E30"
  on-cover: "#F4F1EA"
  on-cover-soft: "#D6D5D3"
  hl: "#FFB86B"
  hl-soft: "#FFEAD3"
  hl-on-cover: "#FFB86B"
  pen: "#1E2B45"
  grid: "rgba(30,43,69,.07)"
  rule: "#DFE1E6"
  ring: "rgba(30,43,69,.26)"
  tape: "rgba(255,255,255,.6)"
  action: "#F2784B"
  action-ink: "#1B1D2A"
  logo-1: "#DF6E45"
  logo-2: "#A14F32"
  logo-3: "#592C1C"
  cap1: "#FF9A4D"
  cap2: "#F28AB3"
  cap3: "#6EC1EA"
  cap4: "#79C98A"
  red: "#E0301E"
  red-ink: "#C21F0E"
  ink: "#1B1D2A"
  pencil: "#474C5E"
  correction-wash: "#FFF4F2"
  diploma-paper: "#FFFDF7"
  green: "#12884A"
  cap-orange: "#FF7A1A"
  cap-sky: "#2AA7E8"
  cap-pink: "#F0508C"
  cork: "#C9955E"
  metal: "#C3C8D2"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6.4vw, 5.9rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 84"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5.2vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 84"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 84"
  figure:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 2.8vw, 2.3rem)"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "'tnum', 'lnum'"
  body:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
  button:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1
  hand:
    fontFamily: "Gochi Hand, cursive"
    fontSize: "clamp(1.55rem, 2.35vw, 2.2rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0"
  hand-note:
    fontFamily: "Gochi Hand, cursive"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.1
rounded:
  sm: "8px"
  md: "10px"
  lg: "14px"
  card: "18px"
  sheet: "20px"
  pill: "999px"
spacing:
  cell: "24px"
  margin: "clamp(20px, 6vw, 88px)"
  section-y: "clamp(72px, 10vw, 136px)"
  gutter: "clamp(24px, 4vw, 56px)"
  card-pad: "clamp(22px, 3vw, 36px)"
  slide-gap: "26px"
  measure: "1180px"
components:
  button-primary:
    backgroundColor: "{colors.hl}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "1em 1.4em"
  button-action:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "1em 1.4em"
  button-line:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "1em 1.4em"
  button-line-hover:
    backgroundColor: "{colors.hl}"
  button-ghost:
    textColor: "{colors.on-cover}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "1em 1.4em"
  button-round:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "52px"
  button-round-hover:
    backgroundColor: "{colors.hl}"
  video-play:
    backgroundColor: "{colors.hl}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "78px"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.1em"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet-white}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
  card:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  cover-panel:
    backgroundColor: "{colors.cover}"
    textColor: "{colors.on-cover}"
    rounded: "{rounded.card}"
    padding: "26px 24px"
  slide:
    backgroundColor: "{colors.sheet-white}"
    padding: "10px 10px 0"
    height: "clamp(330px, 40vw, 470px)"
  headline-mark-dark:
    backgroundColor: "{colors.hl}"
    textColor: "{colors.ink}"
    rounded: "4px"
  cover-picker-toggle:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.pen}"
    rounded: "{rounded.pill}"
    padding: "6px 8px 6px 16px"
  cover-picker-panel:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "16px"
    width: "min(92vw, 392px)"
  cover-option-selected:
    backgroundColor: "{colors.paper}"
    rounded: "12px"
  logo-chip:
    backgroundColor: "{colors.sheet-white}"
    rounded: "{rounded.md}"
    padding: "6px 10px"
  logo-chip-lg:
    backgroundColor: "{colors.sheet-white}"
    rounded: "{rounded.md}"
    padding: "7px 9px"
    width: "120px"
    height: "56px"
  logo-chip-sm:
    backgroundColor: "{colors.sheet-white}"
    rounded: "7px"
    padding: "4px 7px"
    height: "30px"
  logo-chip-xs:
    backgroundColor: "{colors.sheet-white}"
    rounded: "5px"
    padding: "2px 4px"
    width: "56px"
    height: "24px"
  logo-chip-mini:
    backgroundColor: "{colors.sheet-white}"
    rounded: "{rounded.sm}"
    padding: "5px 8px"
    width: "96px"
    height: "58px"
  faq-toggle:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "34px"
  faq-toggle-open:
    backgroundColor: "{colors.hl}"
  event-row-hover:
    backgroundColor: "{colors.hl-soft}"
  challenge-card:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "20px 26px 16px"
  challenge-bin:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ink}"
    rounded: "16px"
    padding: "14px 14px 12px"
  challenge-bin-hover:
    backgroundColor: "{colors.hl-soft}"
  diploma:
    backgroundColor: "{colors.diploma-paper}"
    textColor: "{colors.ink}"
    padding: "clamp(28px, 5vw, 52px) clamp(20px, 5vw, 56px) clamp(24px, 4vw, 40px)"
    width: "min(100%, 760px)"
  share-button:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.7em 1em"
  share-button-hover:
    backgroundColor: "{colors.hl}"
---

# Design System: De mãos dadas pelo Martim

## Overview

**Creative North Star: "Martim's Exercise Book"**

The site is a Portuguese primary-school squared exercise book that Martim filled in himself. The page is bright white paper with a fine 24px grid tinted by the pen colour, and a red margin line. A cover takes over whole regions (the hero's left half, the VOLTA panel, the next-event card, the footer), with a handful of bottle caps scattered on it. The visitor chooses that cover from twelve, the way a child picks a notebook at the stationery shop. The default is night blue. His story reads as a composition. The BigBag money reads as a worked sum. Sorting caps is a challenge on a worksheet he corrects in red pen, and finishing it earns a friendship diploma. The events live in a photo album. Every visual device comes from the stationery of a Portuguese school desk: taped-in photos and polaroids, a name label on the cover, a spiral binding, highlighter marks, red ticks and circles, and a round "Muito bem!" stamp.

Density is generous and phone-first. Body type is large (18px) in a face built for low vision. Contrast is high: dark ink on white paper, and the cover's own text colour on each cover. Heavy compressed grotesque headings give the book a confident voice. Martim's own handwriting, in a dark pen, runs through the page as marginalia. The mood is cheerful, soft and not pitying: a child showing his homework and his team's photos, fist in the air.

The world rejects the charity default (full-bleed hero photo, progress bar and a lone Donate button). It also rejects the cream-paper-and-serif "warm family" look: the paper is cool white, and the type is sans and handwriting. After review it also rejects a single brand-primary cover, because a blue, yellow and red trio read as supermarket branding. The identity lives in the book's structure and the caps, not in one colour.

**Key Characteristics:**
- Squared paper ground (24px grid tinted by the pen colour) with a red margin line on every paper section.
- A visitor-chosen cover (12 options, night blue by default) as a region-owning surface, carrying its own text colour.
- Bottle caps in four colours per cover, scattered on the cover and used as the nav tab underlines.
- Stationery accents with fixed jobs: red pen marks, the highlighter for actions and marks, dark-pen handwriting.
- One cover slot that everything themed reads from, derived in code from seven values per cover.
- 2px ink outlines on every card, table, chip and field, as if drawn with a ruler.
- Objects laid on the page (photos, polaroid slides, label, stamp, caps) sit at slight angles and cast soft shadows.
- Hand-drawn SVG pictograms with 2.5px ink strokes.
- The family's original logo, recoloured per cover from the action colour; partner and supporter logos always sit on white chips.
- The book also leaves the screen: an A4 poster with container labels and an 8-page booklet are drawn in the same world and print exactly as previewed, in the chosen cover.

## Colors

The palette is a school pencil case: cool white paper, a notebook cover with loose caps on it, a correction pen, a highlighter and a dark pen, plus the real colours of bottle caps. The frontmatter holds the default cover (noite), which is also the `:root` fallback when JavaScript is off.

### Primary
- **Night-Blue Cover** (cover): the exercise-book cover. It fills entire regions: the hero cover, the VOLTA explainer, the next-event card and the footer. The same colour is used for the subpage cover band, the album scrollbar and the focused-field border. The darker cover-deep shade is the spiral binding strip and the name label's border.
- **Cover Text** (on-cover) and **Soft Cover Text** (on-cover-soft): all text on the cover. On-cover is for headings, labels, links and ghost buttons (12.52:1 on noite). On-cover-soft is for lede and body copy (9.63:1). In the CSS, `--cover-ink` is an alias for on-cover-soft. Light covers use a dark on-cover; dark covers use a light one.
- **Apricot Highlighter** (hl): the primary button fill with ink text and a 2px ink border (9.81:1). It also marks the hero headline's key phrase: a swipe on light covers, a solid block with ink text on dark ones. It is also the video play disc, checked chips, the diploma's corner studs and earned stars, round-button and share-button hover states, and text selection. In the CSS, `--yellow` is a legacy alias of `--hl`.
- **Highlighter Wash** (hl-soft): the pale fill of hovered challenge bins, focused handwritten name fields, agenda-row hover and checklist boxes.
- **Highlighter Ink** (hl-on-cover): handwritten accents on the cover (the VOLTA note and the next-event date). On dark covers it is the highlighter itself (8.29:1 on noite). On light covers it is derived as a dark brown.

### Secondary
- **Action** (action) and **Action Text** (action-ink): the solid button (header "Onde entregar", "Ver pontos de recolha", "Doar" in the mobile action bar). On noite it is a coral fill with ink text (6.02:1). Most light covers use a dark or saturated fill with white text.
- **Correction-Pen Red** (red): marks only. Ticks, crosses, the answer circle, the margin line, the stamp ring, step-number dots, the draft-text underline and focus rings.
- **Red Ink** (red-ink): the text version of red on paper. Links, handwritten corrections, "who" notes and `details` summaries (5.85:1 on paper).

### Tertiary
- **Dark Pen** (pen): Martim's handwriting ink on paper. Use it for the worked sum and its underline, filled-in label entries, handwritten table values, challenge feedback and the typed name, the team note, the album counter, the cover-picker text, the signature, agenda dates, timeline times and the legal contents heading. It also tints the grid, rules and focus ring.
- **Cover Caps** (cap1–cap4): the loose caps on the cover and the nav tab underlines. They change with the cover.

### Neutral
- **Squared Paper** (paper): the page background, table header bands, chip and field fills, the selected cover option.
- **Grid** (grid): the 24px square grid drawn over the paper, at 7% pen so the ground stays a whisper under text.
- **Sheet White** (sheet-white): cards, tables, the worksheet, round buttons, the cover picker and photo and slide frames.
- **School Ink** (ink): all body text, 2px outlines, the primary button border, selected chips, the mobile action bar, the play-disc ring.
- **Pencil Grey** (pencil): secondary copy, table and slide-caption labels, section intros (8.31:1 on paper).
- **Ruled Line** (rule): 1.5px row dividers, name label rows, the lined textarea, and the cover-option hover border.
- **Focus Ring** (ring): the 4px halo around focused fields.
- **Tape** (tape): translucent white strips over taped photos and slides.
- **Correction Wash** (correction-wash): the tint behind the warning box and the "Não aceite" bin.
- **Diploma Paper** (diploma-paper): the warm certificate stock of the friendship diploma, and nothing else.
- **Stamp Green** (green): confirmation only (the "copiado" state on the IBAN copy button, white text 4.52:1).

### Pictogram Data Colours
- **cap-orange, cap-sky, cap-pink, cork, metal**: the real colours of the objects in the challenge cards, rates and bin pictograms and in the timetable category dots. They are the same on every cover.

### Logo
The family's logo, renamed in September 2026 to **"De mãos dadas pelo Martim"** (source files in `img/marca/`, pre-rename originals in `media-originais/marca/`). The icon (the "m" with two smiling caps) and the large "Martim" are the family's original drawing; the small line "De mãos dadas pelo" replaces "Vamos ajudar o", set in DIN Condensed Bold converted to outlines, compressed to 85% width, on the old baseline (y 43.3) and exactly the width of "Martim" (x 147.3–308.6 in the 318.33 × 113.92 viewBox), so the two lines read as one block. It is inlined twice as SVG symbols and recoloured by the cover:
- **Full-colour mark** (`#marca`, header): three layers. `--logo-1` is the front shape and the lettering, the cover's action colour, darkened in JS (`readable()`) until it reaches at least 3:1 on the paper. `--logo-2` is 72% action mixed with black. `--logo-3` is the pen colour on light covers, or 40% action mixed with black on dark covers. The eyes stay white. The frontmatter values are the noite set.
- **One-colour mark** (`#marca-branco`, footer on the cover): drawn in on-cover, with shading layers at 68%, 88% and 94% on-cover mixed with the cover. It is pure off-white on dark covers and a single dark colour on light covers.
- **Favicon:** `setFavicon()` rebuilds `favicon.svg` per cover (a pale highlighter disc with the mark in the action layers). The static `favicon.svg` is the no-JS fallback.
- The lettering stays in Portuguese in both languages; in English copy the name is "Hand in Hand for Martim".
- **Header size:** 56px tall on desktop, 48px between 521px and 1180px, 46px on phones, so the small line stays legible without pushing the nav past the viewport.
- **Domain:** every link, QR code, share URL and Open Graph tag points to https://demaosdadaspelomartim.pt/ (share card `img/og.jpg`, 1200×630, white logo on the cover with the headline and the fist photo).

### Covers
All twelve covers ship, in this picker order. Each cover is defined by seven values in the `PALETTES` object: cover, on (on-cover), hl, pen, act (action), ai (action-ink) and four caps. Dark covers also set hoc (hl-on-cover). `applyPal()` writes these as inline custom properties on `<html>` and derives the rest with `color-mix(in srgb)`:
- cover-deep: cover mixed with black, 70% cover on dark covers, 80% on light.
- on-cover-soft: 86% on-cover, 14% cover.
- hl-soft: 26% hl, 74% white.
- hl-on-cover: hoc on dark covers; 55% on-cover and 45% #7A3412 on light.
- grid: pen at 7% opacity.
- rule: 13% pen, 87% white.
- ring: pen at 26% opacity.
- tape: always rgba(255,255,255,.6).

A cover with an `hoc` value is a dark cover. It sets `html[data-dark]`.

| id | Name | Mode | cover | on-cover | hl | action / action-ink | pen | caps 1–4 | on-cover on cover | on-cover-soft on cover | hl-on-cover on cover | action-ink on action | ink on hl |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `menta` | Menta e tangerina | light | #BFE6D6 | #173A2E | #FFB066 | #B3471A / #FFFFFF | #1F4A3E | #FF8A3D #F27BA5 #4FA8D8 #2FA36B | 9.22 | 6.42 | 8.55 | 5.48 | 9.28 |
| `ceu` | Céu e marinho | light | #C3DFF4 | #14304A | #FFD27A | #1C4F80 / #FFFFFF | #1B3F66 | #F29A4A #EE8AB0 #1C4F80 #5DBB8A | 9.79 | 6.87 | 8.76 | 8.47 | 11.75 |
| `pessego` | Pêssego e azul | light | #FFD4BC | #3A1F12 | #9FD4F2 | #1F5E8C / #FFFFFF | #264466 | #F07F45 #E97BA3 #4B9ED6 #6DBB7C | 11.12 | 7.72 | 8.96 | 6.91 | 10.49 |
| `limao` | Limão e grafite | light | #F3E98F | #22221E | #A3E2C9 | #2B2D33 / #FFFFFF | #2F3440 | #FF8A3D #EE7FA8 #4FA8D8 #2FA36B | 12.82 | 8.69 | 10.31 | 13.76 | 11.37 |
| `rosa` | Rosa e verde | light | #F6C7D4 | #3A1623 | #BFE8A9 | #2F7A4F / #FFFFFF | #2E4A3A | #F28A3B #D94F84 #5FAEDB #3E9E5E | 10.64 | 7.59 | 8.39 | 5.23 | 12.21 |
| `noite` | Azul-noite e tampinhas (default) | dark | #1E2B45 | #F4F1EA | #FFB86B | #F2784B / #1B1D2A | #1E2B45 | #FF9A4D #F28AB3 #6EC1EA #79C98A | 12.52 | 9.63 | 8.29 | 6.02 | 9.81 |
| `oceano` | Oceano e areia | dark | #226873 | #FFFFFF | #F5D7A6 | #E3703F / #1B1D2A | #1D4F57 | #F5A25D #F29BB8 #BFE6F0 #F5D7A6 | 6.37 | 5.20 | 4.60 | 5.30 | 12.07 |
| `alperce` | Alperce e ameixa | light | #F7B774 | #2D1A2E | #D8C6F1 | #6A3B8C / #FFFFFF | #4A2C5E | #E0602A #D96A9A #5A8FD0 #7A5AA6 | 9.22 | 6.79 | 7.30 | 8.02 | 10.57 |
| `algodao` | Algodão-doce | light | #CFE3F7 | #1E2F45 | #FFC4E1 | #B8336F / #FFFFFF | #2B3F66 | #FF9C6B #F07AB2 #6BA7E8 #8AD1B0 | 10.33 | 7.10 | 9.15 | 5.61 | 11.34 |
| `reciclado` | Papel reciclado e laranja | light | #D8D5CE | #262626 | #FFA25F | #B24612 / #FFFFFF | #2F3A45 | #FF8A3D #EE7FA8 #4FA8D8 #2FA36B | 10.33 | 7.27 | 8.50 | 5.56 | 8.43 |
| `festa` | Festa das tampinhas | light | #FFF3D6 | #1B1D2A | #FFD166 | #C02A55 / #FFFFFF | #1A3E5C | #EF476F #FFD166 #06D6A0 #118AB2 | 15.16 | 10.07 | 12.13 | 5.67 | 11.60 |
| `lavanda` | Lavanda e lima | light | #D8CCF2 | #241A40 | #D4EE6A | #5B3DA6 / #FFFFFF | #34295E | #FF8A3D #F27BA5 #4FA8D8 #2FA36B | 10.67 | 7.62 | 8.59 | 7.89 | 12.93 |

Every pair in the table reaches 4.5:1 or better. Menta, reciclado, festa and oceano were darkened (oceano also switched its action text to ink) to get there. Across all twelve covers, ink on hl is at least 8.43:1 and pen on white at least 9.1:1, so paper-side and highlighter pairs never fail.

### Named Rules
**The Cover Text Rule.** All text on a cover uses that cover's on-cover (headings, links, ghost buttons) or on-cover-soft (copy). Never hard-code white or ink on a cover. Red and red-ink never set text on a cover (3.1:1 and 2.35:1 on noite).

**The Highlighter Mark Rule.** On light covers and on paper, the highlighter is a background only: button fill, swipe, selection, play disc. It is never text (1.0–1.4:1 against light covers). On dark covers it doubles as hl-on-cover text. On dark covers the headline's marked phrase becomes a solid highlighter block with ink text.

**The Action Pair Rule.** Solid buttons use `--action` with `--action-ink`, never a fixed white. Any cover added to or edited in `PALETTES` must reach 4.5:1 for action-ink on action and for on-cover-soft and hl-on-cover on the cover. Red stays a marking colour and is never a button fill.

**The One Slot Rule.** Themed colour is always referenced through the cover variables, including inline SVG fills such as the brand mark and the loose caps, so any cover swaps the whole book at once. New themed tokens are derived in `applyPal()` from the seven cover values, never hard-coded per component.

**The Caps Are Caps Rule.** Cap colours (cap1–cap4 and the pictogram colours) only ever appear as caps or cap-shaped marks: the loose caps on the cover, pictograms, the 4px nav tab underlines, timetable dots and the dots on picker swatches. They never fill surfaces or set text.

**The Logo Follows the Action Rule.** The family's logo takes its colours only from `--logo-1/2/3`, which `applyPal()` derives from the cover's action and pen colours. Never recolour it by hand or give it a fixed brand colour.

**The Dark Lettering Rule.** On a light cover the logo's lettering is never white. The footer mark uses on-cover, so it goes dark on light covers and off-white only on dark ones.

**The White Chip Rule.** Partner and supporter logos always sit on a white chip (sheet white, 1.5px rule border, 5–10px radius), whether on paper, in a table or on a cover. They are never placed on the cover colour or the grid directly, and never recoloured, except for single-colour marks re-inked dark for legibility.

**The Diploma Paper Rule.** The diploma is the only cream surface in the system (#FFFDF7). It is a certificate handed out of the book, not a page in it. Everywhere else the paper stays cool white.

**The Two Reds Rule.** Red (#E0301E) is for strokes, fills and large display marks. Red-ink (#C21F0E) is for any text at body size, on paper. Don't swap them.

## Typography

**Display Font:** Bricolage Grotesque (with system-ui), weight 800 at font-stretch 84%
**Body Font:** Atkinson Hyperlegible (with system-ui)
**Handwriting Font:** Gochi Hand (with cursive)

**Character:** A heavy, slightly compressed grotesque gives the book a loud, cheerful title voice. Atkinson Hyperlegible keeps every instruction readable for older neighbours and low-vision readers. Gochi Hand is the child's pen, the only thing that looks written by hand.

### Hierarchy
- **Display** (800, 84% width, clamp 3–5.9rem, line-height 1.02, -0.025em): the hero headline on the cover in on-cover. It is set as three fixed lines with `<br>`: "Cada tampinha / é um passo / meu." The marked phrase "um passo" never wraps (`white-space: nowrap`).
- **Headline** (800, 84% width, clamp 2.25–4.25rem, 1.02): section titles written as short sentences ("O álbum da minha equipa."), with balanced wrapping. The thanks band runs up to 5rem and the footer is smaller.
- **Title** (800, 84% width, clamp 1.4–1.75rem, 1.1, -0.015em): card and panel titles.
- **Figure** (800, clamp 1.6–2.3rem, tabular lining numerals): euro rates, the facts strip, report totals, event dates.
- **Body** (400, 1.125rem, 1.6, max 62ch): all running copy. Story essays run at 1.14rem/1.75. Section intro paragraphs are in pencil grey.
- **Body small** (400, 1rem, 1.45): step descriptions, card secondary text, FAQ answers, album notes, and nothing smaller for reading copy.
- **Label** (700, 0.72–0.8rem, 0.06–0.08em tracking, uppercase): table column headers, footer column heads, the field labels on the cover name label, and slide-caption labels. Use it only as a structural label on a form, table or caption. Cover names in the picker use the same 0.78rem 700 size in sentence case.
- **Button** (700, 1.0625rem, line-height 1): buttons, chips, tabs.
- **Hand** (Gochi Hand 400, clamp 1.55–2.2rem, 1.3): the worked sum. The team note runs at clamp 1.35–1.7rem/1.25. **Hand note** (about 1.15–1.3rem, 1.1): captions, marginalia, handwritten values, feedback, the album counter, the picker prompt and the signature.

### Named Rules
**The Martim's Pen Rule.** Gochi Hand appears only where Martim is writing: his notes, captions, the sum, filled-in values, corrections, feedback, the thank-you line, his signature, and short first-person prompts beside a control ("Quero ajudar com…", "Onde vai isto?", "Escolhe a capa", "Desafia os teus amigos:"), and names the visitor writes into the book (the challenge name field, the diploma name). It never sets headings, buttons' own labels, navigation, form labels or any instruction a reader must parse at length.

**The Heavy Compressed Rule.** Every heading, h1 to h3, and every display figure is Bricolage 800 at 84% width with negative tracking. There is no light or regular display weight in this world.

**The Tabular Sums Rule.** Numbers in sums, rates, totals and the album counter use tabular lining numerals, so columns line up like homework.

## Layout

The ground is squared paper: a 24px cell drawn as two 1px linear gradients over the body. Each content section is a "page" with a dashed red margin line (2px, 10px dash / 8px gap, 60% opacity) set in by a fluid margin of clamp(20px, 6vw, 88px). Content starts past the line, and the inner measure caps at 1180px. Vertical padding for a section runs clamp(72px, 10vw, 136px).

The margin line is identical everywhere (see Margin Line); it does not react to the chosen help path.

The hero is a split spread: the cover (46fr), a 28px spiral binding strip in cover-deep, and a squared sheet (54fr) with its own red margin line. Below 900px it stacks into cover, then a horizontal spiral, then the sheet. The loose caps sit at the cover's top right on desktop and shrink into its bottom-right corner on mobile, behind the buttons. The notebook label is 340px wide, and the taped fist photo sits at the cover's top right. They never overlap at any width, including 901–1180px, where the label rows stack. Below 900px the label shrinks to leave room for a 118px photo, and the Dê uma Tampa logo on the label is hidden. The headline must never sit under the taped photo: from 1181px, where "Cada tampinha" fits on one line, it gets a clamp(40px, 3.6vw, 64px) top margin; between 901px and 1180px the label narrows and the photo shrinks to 150px instead. The right-hand sheet is a two-slide panel: handwritten tabs "A conta" / "Próximo evento" (active tab underlined in red over a highlighter wash) switch between the worked sum and the next event (relative date in red handwriting, e.g. "Amanhã! Sábado, 26 set", title, time/place/fee table, "Ver detalhes" and "Todos os eventos", and the taped event poster on wide screens). It advances by itself (9s on the sum, 7s on the event) with a fade and 28px slide, pauses on hover, focus, off-screen and hidden tab, supports arrow keys, and never auto-advances under reduced motion; slides are top-aligned in one grid cell. The sheet's left padding is tighter (44–72px, margin line at 26–42px) so the right column sits closer to the cover.

Section heads are a two-column grid: headline on the left, pencil-grey intro paragraph on the right, bottom-aligned. They stack below 900px. Content grids are asymmetric pairs (1.35fr/1fr, 1.1fr/0.9fr, 1fr plus a 340px aside) with a gutter of clamp(24px, 4vw, 56px). All collapse to one column between 900px and 980px.

The album breaks the measure on the right only. Its track bleeds to the viewport edge while its left edge stays aligned with the content, so the next polaroid peeks in as a cue to scroll sideways.

The partners section (`#parceiros`) is a two-column ruled list: a 120px logo column beside name, handwritten location, copy and link. It becomes one column below 900px, with logos above the text below 520px. A community-supporters strip follows under a dashed rule.

Secondary pages (generated by `tools/build_pages.py`) swap the split hero for a **subhero**: a full-width cover band with breadcrumbs, a clamp(2.6–5rem) headline, a lede, the notebook label at the bottom right and the loose caps. A horizontal spiral strip (`.spiral-h`) sits beneath it. Page sections use tighter padding (clamp 56–96px). Two-column templates (event, story, legal) collapse at 900px.

Language: a full English mirror lives in `/en/`, generated from the Portuguese pages. The PT/EN switch links to the same page in the other language, pages declare hreflang alternates, and `<html lang>` drives the JS strings (cover names, dates, copy labels). English numbers use a € prefix and English separators. Everything visual is identical in both languages.

The thanks band is the one full-bleed photograph. It closes the page just before the footer, never opens it.

Mobile: nav tabs hide below 1020px. Below 760px the header keeps only the brand and PT/EN, and a fixed ink action bar appears at the bottom with two slots: the highlighter "Onde entregar" and the action "Doar". The cover picker moves up to sit 84px from the bottom, above the bar. Below 760px its toggle collapses to the swatch alone (the label stays for screen readers), and the panel shrinks to 92vw. The timetable turns into stacked rows below 640px. Album slides become fixed-width cards (min(80vw, 330px)) and the filter chips scroll sideways in a single row. Nothing may overflow the viewport: grid children take min-width 0, and long emails and addresses wrap anywhere. At 560px and below, rotated photos on event, story and gallery pages shrink to 92% width with a gentler -1.2° tilt, and community logos stack one per row.

"Quero ajudar com" chips behave by width. At 900px and below they filter: only the chosen way card shows (`.filtered-out` hides the rest, and the team row hides for money and time), and the page scrolls to it. On desktop they highlight the card and scroll only if it is off screen. Either way the card gets a one-off pulse ring in the action colour. Links to `#doar` select the donation card.

Images load lazily. Revealed album slides, the thanks band and the padel photo load eagerly, and after page load any remaining lazy images switch to eager in idle time (an iOS Safari fix).

## Elevation & Depth

The page is flat paper. Depth comes only from objects placed onto it. Taped photos, polaroid slides, the cover's name label, the loose caps, solid buttons, the lit path card, hovered challenge bins, the challenge card, the diploma and the floating action bar and cover picker cast soft downward shadows with negative spread, like paper resting on paper. Cards otherwise rely on their 2px ink outline, not shadow. The cover gets a subtle top-left sheen and a faint diagonal fibre texture from gradients. The only scrim in the system is the ink gradient over the thanks photo, there to carry white type.

### Shadow Vocabulary
- **Button rest** (`box-shadow: 0 6px 14px -8px rgba(15,17,28,.45)`): the highlighter and action buttons. On hover it grows to `0 12px 20px -10px rgba(15,17,28,.5)` and the button lifts 2px.
- **Taped photo** (`box-shadow: 0 18px 30px -18px rgba(10,20,50,.55), 0 2px 6px rgba(10,20,50,.12)`): polaroid-style photos taped at -4° to +5°.
- **Slide** (`box-shadow: 0 18px 30px -20px rgba(10,20,50,.55), 0 2px 6px rgba(10,20,50,.1)`): album polaroids, tilted -1.2° and +1° alternately.
- **Loose cap** (`filter: drop-shadow(0 3px 3px rgba(40,25,10,.25))`): caps lying on the cover.
- **Label** (`box-shadow: 0 10px 22px -12px rgba(8,10,20,.55)`): the name label on the cover.
- **Lifted item** (`box-shadow: 0 10px 18px -12px rgba(20,30,80,.6)`): a hovered challenge bin.
- **Challenge card** (`box-shadow: 0 14px 24px -16px rgba(20,30,80,.55)`): the item card being sorted.
- **Diploma** (`box-shadow: 0 26px 40px -26px rgba(20,30,80,.55), 0 2px 6px rgba(20,30,80,.12)`): the certificate lying on the page, tilted -0.6° (flat on mobile).
- **Lit card** (`box-shadow: 0 18px 40px -26px rgba(20,30,80,.55)`): the path card that matches the visitor's choice.
- **Floating control** (`box-shadow: 0 12px 30px -10px rgba(0,0,0,.5)` for the action bar, `0 10px 24px -14px rgba(8,10,20,.6)` for the picker toggle, `0 22px 40px -20px rgba(8,10,20,.6)` for the open picker panel).

### Named Rules
**The Taped-In Rule.** Only an object lying on or floating over the page casts a shadow, and it is always soft, low and warm or blue-black. No hard offset shadows, no glows, no shadow on flat panels or tables.

## Shapes

Shapes are soft-cornered stationery outlined in ink. Cards, panels and the picker panel round at 18–20px (sheet). Trays, tables, labels and people cards use 14px (lg). Buttons, fields and cover options use 10–12px (md). Tabs, the language switch, small controls and the swatch strips use 8px (sm). Chips, tags, round album controls, the play disc, the picker toggle and its swatch are full circles or pills. Outlines are 2px ink (3px on the play disc). Inner dividers are 1.5px rule lines. Optional or inactive containers switch to a dashed border: the IBAN box, the "no point near you" note, the host box, the dimmed path card and ready bins.

Photos sit in square-cornered white frames with a deeper bottom edge, rotated a few degrees. They carry a strip of translucent tape everywhere except in event contexts (see Event Frames). Album slides come in four fixed shapes: landscape (l, 4:3.55), wide (w, 16:10.6), portrait (p, 3:4.4) and vertical video (v, 9:15.6). Caps are the recurring round silhouette: on the cover, in pictograms and as dots on the picker swatches. Pictograms are drawn in SVG with 2.5px ink strokes and rounded joins, flat fills and no gradients.

## Components

### Buttons
Chunky, friendly and obviously tappable.
- **Shape:** gently rounded (10px), 2px border slot, 20px SVG icon with a 0.6em gap.
- **Primary (highlighter):** hl fill, ink text, 2px ink border, padding 1em 1.4em, button-rest shadow. Used for the main delivery action on the cover and in the action bar. The CSS class is still `.btn-yellow`.
- **Action:** action fill with action-ink text, same shadow. The solid action on paper (header "Onde entregar", "Ver pontos de recolha") and "Doar" in the action bar. The CSS class is still `.btn-red`.
- **Line:** paper fill, 2px ink border, ink text. Hover fills with the highlighter. Used for tertiary actions such as "Ganha o teu diploma de amigo do Martim" and "Jogar outra vez".
- **Ghost:** transparent with a 2px on-cover border and on-cover text, on the cover only. Hover adds a 35% white wash. Used for "Doar por IBAN".
- **Round:** 52px white circle (46px on mobile) with a 2px ink ring and a 22px arrow. Hover fills with the highlighter and lifts 1px. Disabled drops to 35% opacity. Used for album previous and next.
- **Hover / Focus:** lift on the cubic-bezier(.16,1,.3,1) ease over .2–.25s. Focus is always a 3px red outline, offset 3px.

### Chips
- **Style:** pill, 2px ink border, paper fill, Atkinson 700 at 1rem. Choice chips carry a small square checkbox drawn in the text colour.
- **State:** pressed chips invert to ink with white text, and the checkbox tick turns highlighter. Filter chips (timetable and album) carry a red-ink handwritten count, which turns highlighter when pressed. Checkbox chips in forms fill with the highlighter when checked.

### Cards / Containers
- **Corner Style:** 18px (path cards, report, VOLTA) or 20px (worksheet, form, next event).
- **Background:** sheet white on paper, or the cover colour for panels that belong to the cover (with on-cover text and hl-on-cover handwriting).
- **Shadow Strategy:** none at rest. Only the lit path card lifts (see Elevation).
- **Border:** 2px ink, dashed #8C92A6 when dimmed.
- **Internal Padding:** clamp(22px, 3vw, 36px).

### Inputs / Fields
- **Style:** paper fill, 2px ink border, 10px radius, 12px 14px padding, Atkinson 1.05rem. The textarea is ruled with 28px rule lines.
- **Focus:** the border turns the cover colour with a 4px ring halo.
- **Checks:** native checkboxes with red accent colour, 18–20px.

### Navigation
- **Style:** sticky header on 94% paper with a 6px backdrop blur and a 2px ink bottom rule. The brand is the family's full-colour logo (48px high, 40px at 520px and below) with no extra wordmark or tagline.
- **Tabs:** Atkinson 700. Each tab carries a cap-coloured underline (cap1–cap4), resting at 35% width and growing to full width on hover or when current.
- **Language:** a PT/EN segmented control with a 2px ink border. The current language is in ink with white text.
- **Mobile:** tabs hide, and the fixed ink action bar at the bottom carries the two actions.

### Cover Picker ("Escolhe a capa")
A shipped visitor feature: Martim lets you choose his notebook's cover.
- **Toggle:** a fixed white pill at the bottom right (14px inset; 84px from the bottom on mobile, above the action bar) with a 2px ink border and the floating-control shadow. It shows the handwritten "Escolhe a capa" in pen and a 30px round swatch of the current cover (cover colour with a highlighter dot). It carries `aria-expanded` and `aria-controls`, and its accessible name includes the current cover ("Escolhe a capa (atual: …)").
- **Panel:** a popover opening above the toggle from the bottom right. It is a white card (18px radius, 16px padding, 2px ink border, min(92vw, 392px) wide), with a handwritten heading "Escolhe a capa do meu caderno" and a 3-column grid of the twelve covers (10px gap). Opening and closing is a .2s fade plus a scale from .96 and 6px lift.
- **Option:** a 40px-high swatch strip (8px radius, 2px ink border, cover colour with a highlighter dot and two cap dots) above the cover's name in Atkinson 700 at 0.78rem. Hover adds a paper fill and a rule border. The current cover has an ink border, a paper fill and `aria-pressed="true"`.
- **Behaviour:** choosing a cover applies it at once and saves it in localStorage. Opening the panel moves focus to the current cover. Escape closes it and returns focus to the toggle, and an outside click closes it too. A `?paleta=` URL parameter overrides the saved choice. Unknown values fall back to noite.

### Loose Caps (cover signature)
Seven cap pictograms (34–56px, tinted cap1–cap4, rotated -25° to +30°) lie scattered on the cover's top right with a soft drop shadow. They are decorative (`aria-hidden`), never interactive, and shrink to 70% in a corner cluster on mobile.

### Headline Mark
The hero's "um passo" is highlighted. On light covers it is a swipe behind on-cover text (a band covering 58%–92% of the line height). On dark covers (`html[data-dark]`) it becomes a solid highlighter block with ink text and a 4px radius. The phrase sits on one line and never breaks.

### Worked Sum (signature)
The hero's right sheet is a maths problem. The question is in Atkinson (pencil grey, bold "Problema:"). The working is in pen-colour Gochi Hand, with red-ink operators, a pen underline rule and the answer circled in red pen. The key intermediate result gets a highlighter swipe. The "R:" answer line has the payoff in red ink. Motion: lines ink in one after another (.7s fade-and-rise), the rule draws across, and the red circle strokes in last. Everything is disabled under reduced motion.

### Bottle-Cap Challenge (signature)
"O desafio das tampinhas" (EN "The bottle-cap challenge"): a one-item-at-a-time sorting game on a white worksheet (20px radius). Each round draws from a pool of 26 real-rule items (12 plastic, 3 metal caps, 1 cork, 10 not accepted), always at least one per bin. Rotation favours freshness: the browser remembers which items the player has seen (`ficha-vistos`) and each round picks the ones seen longest ago or never, so consecutive rounds share at most the single cork item and every item appears within three rounds. Every item carries a level (`lv` 1 obvious, 2 everyday, 3 tricky).
- **Highlight:** the worksheet is tinted with the chosen cover so the challenge stands out on the page: 50% cover mixed with white on light covers, 12% cover over a pale blue (#E9F0FF) on dark covers; a soft cover-coloured glow and ring around it; the item card, bins and unselected level pills stay white on top.
- **Head:** a handwritten "Nome:" with an underlined name field in pen-colour Gochi Hand at 1.5rem. On focus the underline turns the action colour over the highlighter wash. The name is saved in localStorage (`ficha-nome`). On the right sits the "Pontos: n / 8" score.
- **Order, top to bottom:** name, level (both above the ruled line of the head), "Onde vai isto?" with the item card, the instruction, the four bins, then one centred row with the progress dots and "Pontos: x / 10" (Bricolage label, handwritten red-ink number), then the feedback line.
- **Levels:** under the head, a handwritten "Nível:" and three ink-ringed pills: Fácil (6 items, obvious ones only), Normal (10 items, any) and Difícil (10 items, at least six tricky ones). The pressed level is ink-filled; the choice is saved in the browser and changing it restarts the round. On phones the pills sit in a 3-column grid with the item count under the name. The diploma sentence and the PNG name the level ("nível difícil").
- **Progress:** a row of 14px dots with ink rings, white until answered, then filled green for right or red for wrong; it sits under the bins, centred, beside the score.
- **Stage:** a handwritten prompt "Onde vai isto?" above a large item card: white, 2px ink, 18px radius, an 84px pictogram (70px on mobile), the name in 1.35rem Bricolage and a handwritten hint. Motion:
  - in: drops in from -14px and -4°;
  - fly: falls away and shrinks after a right answer;
  - shake: shakes after a wrong one.
- **Streak:** from three right in a row, a handwritten note ("3 seguidas!") appears in confirmation green, rotated 6°, at the stage's right edge. Every "right" state in the challenge (progress dot, correct bin, copied share button) uses confirmation green, never a cover cap, so right always reads the same on every cover.
- **Instruction:** above the bins, a centred handwritten pen line (1.5rem) "Clica na categoria que achas correta:"; no arrow; it hides when the round ends.
- **Bins:** four large buttons (Plástico, Caricas, Cortiça, Não aceite) in a 4-column grid (2 columns at 900px and below). Each has a white fill, 2px ink, 16px radius, a 44px bag pictogram, a Bricolage label, a pencil hint and a handwritten per-bin counter in a dashed pen circle. Hover lifts 2px onto the highlighter wash. "Não aceite" sits on the correction wash. A wrong choice turns the bin red-bordered and shakes it, and the right bin is shown with a correction. Feedback is handwritten below, in pen when right and red ink when wrong, with a red tick or cross.
- **End:** bins and dots fade to 55%. At 75% or more right, the "Muito bem!" stamp lands. The diploma is revealed and scrolled into view. The result (first name, score, round size, level, date, cover) is saved in the browser as `mural-meu` for the friends wall.
- **Result reveal:** the diploma stays hidden (`.diploma[hidden]` must win over its grid display) until the last answer. Then it drops onto the page (from -60px and -7°, a slight overshoot, settling at -0.6°), the score counts up, the stars pop one by one (0.18s apart), the red seal stamps in from scale 2.2, the actions fade in, and bottle caps in the cover colours rain over it (34 at 75% or more right, 14 otherwise). Everything is skipped under reduced motion.
- All card and bin motion is disabled under reduced motion.

### Friendship Diploma (signature)
"Diploma de Amigo do Martim", the challenge's reward and the only cream surface.
- **Colour follows the cover:** the frame, studs, guilloche, logo and name all take the chosen cover's colours, and so does the saved PNG. A handwritten tip under the actions ("Dica: o diploma muda de cor com a capa. Escolhe outra capa e guarda-o na tua cor preferida.") has an inline highlighter-underlined button that opens the cover picker, so each visitor can save the diploma in their favourite colour.
- **Paper:** #FFFDF7, up to 760px wide, a 6px double border plus a 2px inner outline inset 16px, both in the cover colour. Four 26px highlighter corner studs with ink rings. A faint 45° guilloche in 4% cover and a highlighter glow at the top. Tilted -0.6° with the diploma shadow.
- **Letterhead:** the full-colour logo (46px) over "Processo nº 167 · Boliqueime" in tracked uppercase pen.
- **Body:**
  - The Bricolage title (clamp 1.8–3rem).
  - A handwritten "Certifica-se que".
  - An editable name in Gochi Hand (clamp 2.2–3.4rem) in `--logo-1` on a 2px pen rule. It shares its value with the challenge name field.
  - A 1.08rem sentence with the score.
  - One to three highlighter stars (unearned ones white) with a handwritten verdict.
- **Foot:** a handwritten "Martim" signature and a handwritten date, each on an ink line with an uppercase caption. Between them sits a red 118px seal rotated -12°: a 4px ring plus a dashed inner ring, reading "Amigo do Martim 167" in Bricolage. On mobile the seal moves above the signatures.
- **Save:** "Guardar diploma" (action button) redraws the same design on a 1600×1130 canvas in the live cover colours and exports a PNG named after the person ("Diploma Amigo do Martim - Nelson.png"). Where the browser can share files it opens the native share sheet with the image; otherwise it downloads. "Jogar outra vez" (line button) restarts the game.
- **Wall link:** a third, ink-outlined action "Pôr o diploma no mural →" leads to the friends wall.

### Share
A row of pill buttons for sharing the diploma and events.
- **Label:** a handwritten prompt in pen ("Desafia os teus amigos:", "Partilha este evento:").
- **Native share:** an action button with the share icon, shown only when `navigator.share` exists, so on phones it leads. On the compact next-event cover cards it is a white pill like the others, but still first in the row.
- **Networks:** WhatsApp, Facebook, X, TikTok and copy link. TikTok has no web share link, so its button copies the text and link, then opens tiktok.com/upload; on the diploma it first hands the diploma PNG to the phone's share sheet (where TikTok appears) or downloads it, with a caption and hashtags copied. Each is a white pill with a 2px ink border, Atkinson 700 at 0.95rem and an 18px monochrome ink icon drawn as an SVG symbol (i-wa, i-fb, i-xs, i-link, i-share). Hover fills with the highlighter. Copy confirms with "Copiado".
- **Where:** the diploma (with the player's score in the text), every event page (in the actions row, with event-specific text in `data-share-text`, translated for EN), and a compact on-cover version (0.85rem, WhatsApp and Facebook) on the next-event cards.

### Stamp (signature)
A round red stamp (132px, 4px ring plus a dashed inner ring, Bricolage 800 uppercase, a handwritten signature line) rotated -14°. It lands once: from scale 1.6 and transparent down to scale 1 at 92% opacity over .5s. It also sits static on the event report.

### Taped Photo
A white frame (10px sides, 38px bottom; 8px and 32px on the smaller overlapping print) with a handwritten caption, rotated between -4° and +5°. A translucent tape strip sits across the top edge, and the taped-photo shadow falls beneath. Photos can overlap a larger image as a second print tucked at its corner (the BigBag photo), or run full column width at a slight -1.5° tilt above a list (the school drop-off). Tape is for keepsakes in the book, never for event posters, event thumbnails or event pages.

### Photo Album (signature)
Event memories as a horizontal strip of taped polaroids.
- **Head:** filter chips on the left (Tudo, Vídeos and one per event); on the right, round previous and next buttons around a handwritten "1 / 20" counter in pen.
- **Track:** a horizontal scroll-snap row (start alignment, 26px gap, 18px on mobile) with a thin scrollbar in the cover colour. It bleeds to the right viewport edge.
- **Slide:** a white polaroid (10px frame, open bottom) at clamp(330px, 40vw, 470px) tall, with a tape strip and alternating tilt. Its width comes from its shape key (l, w, p or v). Captions pair a handwritten line in ink with an uppercase pencil label.
- **Video card:** the poster image with an ink gradient on the bottom 45%, a 78px highlighter play disc with a 3px ink ring and an ink triangle (it scales to 1.08 on hover), and a duration tag at the bottom right (ink at 70% opacity, white 700 text, 6px radius).
- **Note:** a pencil-grey body-small line under the strip invites people to send photos.

### Team Row
A taped portrait (4:5, rotated -3°, 250px wide, 170px on mobile) beside a short handwritten note in pen (max 18ch), with one phrase highlighted. It sits under the main path card and makes the family's roles concrete.

### Thanks Band
The closing full-bleed photograph before the footer, clamp(360px, 42vw, 560px) tall, with a 2px ink top rule. An ink scrim darkens from 30% at the top to 82% at the bottom. A white headline (up to 5rem) and a white handwritten thank-you signed by Martim sit bottom-left, inside the 1180px measure. This is the one place white type sits on imagery.

### Logo Chips
The white card every partner and supporter logo sits on (`.logo-chip`): white fill, 1.5px rule border, the logo fitted with `object-fit: contain` and never cropped or recoloured. Sizes:
- **lg:** 120×56px, 10px radius. Partners section.
- **sm:** 30px high, 7px radius. Inline next to a partner's name in copy, the story page and the contact card.
- **xs:** 56×24px, 5px radius. Rates table rows.
- **Footer:** 58×30px, borderless, in the footer partner list.
- **mini:** 96×58px, 8px radius. Community supporters and event fact sheets.

The "Dê uma Tampa" mark also appears at 20px on the cover's name label, and a Kinésio chip sits in the contact card.

### Partners and Community
- **Partner row:** logo column, then a title-size name, a handwritten location in pen, a short paragraph and a bold link. Rows are separated by 1.5px rules with a vertical rule between the two columns.
- **Community strip:** a dashed rule above, an uppercase pencil label, then a wrapping list of supporters. Each is a mini chip with a 14px gap to its name in pencil at 0.95rem. The same chips appear as `.ficha-logos` in event fact sheets.

### Event Frames
Event imagery is framed but never taped: an event is a poster or a print pinned to a board, not a keepsake stuck in the book.
- **Next-event poster** (`.next-photo`): a white-framed square print (10px sides, 36px bottom, handwritten caption) rotated -3° inside the cover-coloured next-event card. It carries no tape.
- **Mini photo** (`.mini-photo`): an 84px white-framed thumbnail (5px sides, 14px bottom) beside each past event, tilting +3° and -3° alternately and straightening with a 1.05 scale on hover. It is 130px in agenda rows, 56–64px on small screens, and hidden in agenda rows below 700px. The same frame holds the BFF bulletin photos (4:3, ±2°).
- **Event pages** are generated without any tape markup.

### FAQ
A plain ruled list (max 880px, 2px ink top rule, 1.5px rule rows). Each question is a `details` summary in Atkinson 700 at 1.12rem, with a 34px round +/− toggle on the right: white with a 2px ink ring, drawn as two 2.5px ink bars. When open, the vertical bar rotates flat to make a minus and the circle fills with the highlighter. Answers run at 1.05rem, max 68ch. Hovering a question turns it pen colour.

### Agenda (secondary page)
- **Next-event card:** a larger version of the home card.
- **Event list:** ruled rows, each a whole-row link with a date column, a text column and a mini photo. The date is a handwritten weekday in pen over a 2.2rem Bricolage day number. The text column has an uppercase pencil kind label, a 1.45rem Bricolage title, a pencil line, and an optional highlighter pill with a 1.5px ink border for reservations. Hovering fills the row with the highlighter wash and underlines the title in the action colour.
- **Relative dates:** elements with `data-quando` are rewritten by JS as "Hoje!", "Amanhã!", "Faltam N dias:" or "Já foi:" followed by the date. Past events get a `passado` class.

### Event Page (secondary page)
- **Layout:** a two-column grid (0.85fr/1.15fr or reversed) with a framed poster, or two posters at -2° and +2.5°.
- **Fact sheet** (`.ficha`): a definition list with uppercase pencil terms and 1.06rem values on 1.5px rules.
- **Timeline:** a 3px action-colour line with ring dots, handwritten times in pen and 1.08rem entries.
- **How-to box:** a white 18px card with a checklist of 18px ink-outlined boxes filled with the highlighter wash.
- **Actions:** buttons for add-to-calendar (`.ics` download) and copy link ("Link copiado").
- **Results:** a two-column `.tally` of Bricolage figures.
- **Media:** a video row of 9:16 slides and a three-column framed gallery with tall and wide spans and small alternating tilts.
- **Navigation:** previous / all events / next, with uppercase labels over Bricolage titles and a pill "all events" button.

### Story Page (secondary page)
The full composition essay (1.16rem/1.8) beside a column of framed photos and a slide, alternating ±2°.

### Legal Pages (secondary page)
- **Layout:** a sticky 230px contents list with a handwritten heading, beside a body of up to 70ch with 1.5–1.9rem headings.
- **Draft banner:** marked text that is still a draft sits on a white note with a pencil dashed border, and `.todo` spans carry the highlighter wash with a dashed red underline. They mark unfinished legal text and must be resolved before launch.
- **Cookies page:** a scrollable table with code in highlighter-wash chips, and a "forget my cover" button that clears the saved choice.

### 404
A subhero with a 6–14rem Bricolage "404" in the cover text colour over a highlighter swipe (aria-hidden), so it reads on light and dark covers, plus the usual crumbs and lede.

### Collection Map (secondary page, `mapa.html`)
The 14 points on a Leaflet map (cdnjs) over OpenStreetMap tiles, slightly desaturated, in an ink-bordered 18px frame with the diploma shadow. Markers are cap-shaped discs in the point-type colour (school orange, community green, health red, sport blue, business purple) with a white ring, an ink outline and a dashed inner ring. Beside the map (below it at 900px), a white ink-bordered list with a small disc, the name, the type and town, and a handwritten distance column. Town chips filter both list and markers; "Mais perto de mim" (action button with a locate icon) asks for the location only on tap, sorts the list by distance and opens the closest point. Every popup links to Google Maps directions. Points with an approximate location carry an asterisk and a footnote. If the map library fails, the list still opens each point in Google Maps. All points come from `js/pontos.js`, the single source also used by the home table.

### Collection Guide (secondary page, `organiza.html`)
Four numbered white cards ("Em quatro passos") with a 44px highlighter disc holding the Bricolage numeral; a four-card rule grid (plastic, metal caps, cork and a red-bordered "Não aceite" card on #FFF6F4), each a bullet list, never a sentence: a handwritten green "✓" for what goes in and a red-ink "✗" for what stays out, one item per line at 1rem ink (the cork card mixes both: ✓ 100% cork, ✗ plastic or wooden tops); a school section with handwritten green ticks and the taped school photo; and a full-width cover-colour band "Tens carrinha? Precisamos de ti." (`#transporte`) with a white fact table and a van pictogram button. CTAs preselect the contact form through `?quero=ponto` or `?quero=transporte`.

### Printable Poster (secondary page, `cartaz.html`)
A white control card (place name, print poster, print labels, ink-saver toggle, "Escolhe outra cor" opens the cover picker) above two A4 sheets drawn with container-query units (`cqw`) so the preview and the print match.
- **Poster, top to bottom:** a cover-colour band with the logo on a white tab, the case number, "Aqui juntamos tampas para o Martim." (7.8cqw, highlighter mark) and the handwritten place name; the plea "Separa, por favor. É o que mais me ajuda!"; three ink-bordered bins (pictogram, Bricolage name, 3cqw ink examples); a dashed red "Não aceite" strip at 3.9cqw with a 6cqw no-entry icon; and a single footer row: Martim's taped photo (21cqw), the handwritten "Cada tampinha é um passo meu." with "conhece a minha história / demaosdadaspelomartim.pt", and a 19cqw QR code (qrcode-generator, cdnjs) to the official domain.
- **Labels sheet:** three dashed cut-out labels (Plástico, Caricas, Cortiça) with a 17cqw pictogram, a 9cqw Bricolage name, 4.8cqw ink examples and "Martim · nº 167".
- **Type floor:** poster and label body text is ink, never pencil grey, and never below 3cqw (about 6.3 mm on A4), so it reads from a metre away. Any size increase must be re-checked so the poster still fits one A4 page with nothing clipped.
- **Print:** print CSS hides everything but the chosen sheet at 210×297 mm with exact colours; the ink-saver turns the cover band white. The photo loses its shadow in print (a thin grey border instead), because some PDF viewers flatten shadows into a grey block.
- **File names:** while printing, the page title becomes the PDF name: "Cartaz tampas Martim - <local>" or "Etiquetas garrafões Martim - <local>" ("Martim bottle-cap poster" / "Martim container labels" in English), without characters that file systems reject; the title is restored after printing. The saved diploma follows the same rule: "Diploma Amigo do Martim - <nome>.png".

### Friends Wall (secondary page, `mural.html`)
A top 10 per level. Three folder tabs (Fácil, Normal, Difícil; ink-bordered, 14px top radius, the selected one white with a 5px highlighter top edge; arrow keys move between them) sit on a white ink-bordered board. Each row: a 40px ink-ringed rank disc (1st gold #F6C343, 2nd silver #D5DAE3, 3rd bronze #E3A06A, 44px with a double ring), the first name in Gochi Hand in `--logo-1`, the town in pencil, a highlighter "tu" pill on the visitor's own row (row washed in hl-soft), highlighter stars, the score in Bricolage, the time in pen and the date. Empty places show dashed discs and "o teu nome aqui". On phones the row folds into two lines and the date hides. Ranking: most right answers, then fastest time, then earliest date; each person (first name + town) counts once per level with their best result. Below the board, a note says whether the list is live, and a share row challenges friends. The visitor's own latest diploma follows as a mini diploma (cream, 5px double cover border, tape), with an optional town field and "Pôr no mural" when it is not on the wall yet.
- **Entry is automatic but opt-in:** the diploma carries a checkbox "Pôr o meu primeiro nome no top 10 do mural quando guardar ou partilhar o diploma" (unticked by default; pre-ticked boxes are not valid consent under GDPR; the choice is remembered). With it ticked, "Guardar diploma" or any share button sends the result once and a green status line reports the place ("Estás em 3.º lugar no nível difícil!").
- **Data:** `js/mural-api.js` talks to `api/mural.php` on the live domain, which stores results in SQLite at `~/dados/site.sqlite` on DreamHost (outside the web root and the deploy sync); each new top-10 name emails `ajudar@` a one-click hide link. Earlier plan (Google Sheet, `backend/mural-apps-script.gs`) is retired. Until its URL is set, the wall shows `js/mural.js` (pinned by hand) plus the visitor's own result, and says so. Names are cut to the first name, stripped of symbols and checked against a word block-list on both sides; parents hide a row with an "x" in the sheet.
- **Timer:** the challenge times each round from the first card to the last answer; the time appears in the diploma sentence and PNG and breaks ties.

### Booklet (secondary page, `brochura.html`)
An eight-page A4 book built with the same sheet system as the poster (each figure is the `cqw` container, so preview and print match): cover and back cover in the cover colour, six white inner pages. Each inner page has a handwritten pen kicker, a 7.4cqw Bricolage headline, 2.25cqw ink body text, taped photos (polaroid with tape strip, tilted ±2°) and an uppercase folio ("De mãos dadas pelo Martim · 3"). Pages: cover (logo tab, "Cada tampinha é um passo meu.", large taped photo); story; treatments (two figure tiles, ✓ list); the numbers (rates table, the worked sum with the circled 55 BigBags); sorting (four ✓/✗ rule cards and the VOLTA tip); drop-off points grouped by town with a QR to the map; ways to help (full-width donation card with the IBAN on one line, three help cards, the BFF 2026 result); back cover (contacts on white cards, QR, partner logos in one row). Above the book: "Descarregar PDF" (pre-generated `docs/brochura-martim.pdf` and `docs/martim-booklet.pdf`, rebuilt with headless Chrome from `brochura.html?pdf=1`), "Imprimir" (prints in the visitor's cover colour and names the file "Brochura Martim") and a share row. Shown as two-page spreads on desktop, one column on phones. Every page must end with its folio visible: re-measure after any copy change.

### Latest Result Box (home)
Under the separation warning in the value section: a white ink-bordered box with the last known result in large Bricolage ("576 €"), a bold title, the kilos per material, and a pencil footnote saying it is updated by hand, linking to the event report. Stacks to one column on phones. Never a live counter.

### Contact Form (home)
On the live domain the form posts to `api/contacto.php`, which emails the message from `ajudar@demaosdadaspelomartim.pt` to the recipient set in `api/config.php` (`DESTINO`, currently the father's personal email, which stays visible on the site; change only that line to hand over). Nothing is stored except a 24-hour hashed-IP rate limit (5 messages per hour). A hidden honeypot field traps bots. The status line confirms "Mensagem enviada". If the server is unreachable, or on the GitHub Pages preview, it falls back to opening the visitor's email app with the message filled in. `?quero=` in the URL pre-ticks a help type.


### Printable Sheets (poster, labels, booklet)
Rules shared by every A4 sheet (`.a4`):
- **Sizing:** everything inside a sheet is sized in `cqw`. The sheet's `<figure>` is the size container (`container-type:inline-size`), never the sheet itself: an element cannot measure itself, and a sheet that does falls back to the viewport and blows up on wide screens.
- **Print scope:** print rules only apply to the page that owns the sheets (`body:has(.cartaz-page)`, `body.print-book`). Global print rules are banned: they blanked every other page when printed.
- **Margins:** zero margins come from a named page (`@page sheet{size:A4;margin:0}` with `.a4{page:sheet}`), so ordinary pages keep the browser's default print margins.
- **Fit:** one sheet is one A4 page. After any copy or size change, check that nothing overflows (the booklet's folio and the poster's footer must stay visible) in both languages and in a real PDF.
- **Shadows:** photos lose their drop shadow in print (thin grey border instead), because some PDF viewers flatten shadows into grey blocks.
- **File names:** the page title becomes the PDF name while printing ("Cartaz tampas Martim - <local>", "Etiquetas garrafões Martim - <local>", "Brochura Martim"), restored afterwards.

### Footer
A full-width cover region with three columns (brand, partners, shortcuts; one column below 820px).
- **Brand column:** the one-colour logo, "Obrigado por cada tampinha." and "De mãos dadas pelo Martim · Boliqueime, Algarve".
- **Shortcuts:** Onde entregar, Mapa dos pontos, Organiza uma recolha, Cartaz para imprimir, Mural dos amigos, Brochura para descarregar, Doar por IBAN, Todos os eventos, Dúvidas frequentes.
- **Fine line:** "© <year> De Mãos Dadas pelo Martim. Todos os direitos reservados." then a line break and "By nelsonjeronimo.pt" on the left (the name links to the site root, the credit to https://nelsonjeronimo.pt); "Política de privacidade · Cookies · English" on the right. The year is filled in by `site.js` from the visitor's clock (`[data-year]`), with the build year as the no-JS fallback. English: "Hand in Hand for Martim. All rights reserved."
- **Links:** every footer link is on-cover text with no underline at rest; the underline (2px, offset 4px) appears only on hover and on keyboard focus.

### Photo Stack (contacts)
Six taped polaroids of the team (padel team, padel tournament, sorting at BFF, the community, the cake sale, the crowd at the church) piled in one grid cell, each at its own tilt (±2–5°). Every 3.6s the back photo slides out to the side (34% of its width on phones, 46% on desktop) with a 12° swing, jumps to the top of the pile and settles back with a small overshoot. Tapping a photo or "toca para ver a próxima foto" (handwritten, with a "3 / 6" counter) advances it. It pauses on hover, focus, when off-screen and when the tab is hidden; under reduced motion it only changes on tap, with no movement. Only the front photo is exposed to screen readers.

### Motion System
Purposeful and quiet, all off under `prefers-reduced-motion`:
- **Page open:** the hero headline, lede and buttons rise 16px in sequence (0, .15s, .28s); the taped hero photo drops in like a pinned print.
- **Scroll:** section heads, cards, bins, rule cards, event rows, logo chips and FAQ items rise 22px as they enter; taped photos, album slides and mini photos drop in from above with a small tilt; siblings stagger by 70ms (at most 6 steps). Everything is visible by default and anything already on screen at load stays still (the observer skips its first batch), so nothing can be left hidden and thumbnails are complete.
- **Photos develop:** every photo in the content (polaroids, album slides and posters, mini photos, story and event images; not logos, icons, the hero, the photo stack or printable sheets) reveals like an instant photo as it enters: a top-to-bottom wipe (clip-path, .9s, .12s delay) while it develops from washed-out to full colour (saturate .2, brightness 1.35, contrast .85 → none over 1.6s). It waits for the image to load, skips images under 120px and anything on screen at load, and never leaves an image hidden.
- **Numbers:** the latest-result figure and booklet figures count up to their value over 1.1s when they come into view.
- **Ambient:** the loose caps on the cover float and turn slowly (6–8.5s loops, offset).
- **Touch:** buttons, chips, bins and level pills sink 1px and scale to .98 when pressed.
- **Smooth scroll:** Lenis 1.3.26 (self-hosted in `js/vendor/`, lerp .1) gives wheel and trackpad scrolling a soft inertial glide on devices with a fine pointer; touch devices keep native scrolling and reduced motion keeps plain scrolling. In-page anchors and the site's own smooth `scrollIntoView` calls go through Lenis with an offset of the sticky nav height + 12px. Areas with their own scroll (map list, map, cover picker, album track, tables, textareas) carry `data-lenis-prevent`.
- **Between pages:** cross-document view transitions fade and lift the page (the nav stays put) in browsers that support them.

### Margin Line
The red margin line that runs down every paper section (and the hero sheet) is always the same: 2px, dashed (10px red, 8px gap), at 60% opacity. It no longer thickens or switches between solid and dashed as sections scroll into view.

### Tables (rates, timetable, report)
White, 2px ink outline, paper header band with uppercase labels, 1.5px rule rows. Money is set in figure type. Handwritten quantities are in pen-colour Gochi Hand. Timetable categories are 10px pictogram-colour dots.

## Do's and Don'ts

### Do:
- **Do** publish with `sh tools/publish.sh`, then commit and push `site/` (repository `nvjeronimo/demaosdadaspelomartim.pt`): the site sits at the repository root (GitHub Pages preview at https://nvjeronimo.github.io/demaosdadaspelomartim.pt/), the proposal at `/proposta/`, and every push is sent by GitHub Actions (rsync over SSH, deploy key) to DreamHost at https://demaosdadaspelomartim.pt. The DreamHost `.htaccess` forces https without www, serves `404.html` (which carries `<base href="/">` so it works from any folder), and caches assets; `favicon.ico` and `favicon.gif` sit at the root for browsers that ask for them directly.
- **Do** keep collection points in `js/pontos.js` and wall entries in `js/mural.js`, and run `sh tools/build.sh` after any change: it bumps asset versions, rebuilds the secondary pages and the English copy.
- **Do** compress new videos to H.264 around 1 Mbps and 960px on the long side, and photos to JPEG quality 78 at most 1600px; originals go in `media-originais/`, which is never published.
- **Do** keep every paper section on the 24px grid, with the red margin line set at clamp(20px, 6vw, 88px).
- **Do** set all cover text in on-cover or on-cover-soft, whichever cover is active.
- **Do** use the highlighter with ink text and an ink border for the primary action, and `--action` with `--action-ink` for solid buttons.
- **Do** reference every themed colour through the cover variables, and derive new themed tokens in `applyPal()`.
- **Do** check any cover added to or edited in `PALETTES` against 4.5:1 for on-cover-soft and hl-on-cover on the cover, action-ink on action and ink on hl before it enters the picker.
- **Do** set every heading in Bricolage Grotesque 800 at font-stretch 84% with negative tracking.
- **Do** keep reading copy at 1rem or larger in Atkinson Hyperlegible, and body copy at 1.125rem/1.6 with a 62ch measure.
- **Do** outline cards, tables, chips and fields in 2px ink. Switch to a dashed border for optional or inactive states.
- **Do** use red-ink (#C21F0E) for any red text at body size, on paper only.
- **Do** frame photos as white-bordered prints with handwritten captions. Tape them in the book, but never in event contexts.
- **Do** put every partner or supporter logo on a white logo chip at one of the defined sizes.
- **Do** let the family's logo take its colours from `--logo-1/2/3`, and keep its lettering in Portuguese in both languages.
- **Do** draw icons and objects as inline SVG with 2.5px ink strokes, and keep cap colours on caps.
- **Do** gate every draw-in, stamp, card and pulse animation behind prefers-reduced-motion.
- **Do** lead with the native share button where `navigator.share` exists, then WhatsApp, Facebook, X and copy link as white ink-outlined pills.
- **Do** keep the saved diploma PNG in step with the on-screen diploma: same layout, live cover colours, the same fonts.

### Don't:
- **Don't** write print CSS that is not scoped to its own page, and don't size a sheet in `cqw` relative to itself.
- **Don't** hard-code white, ink or red text on a cover.
- **Don't** use the highlighter or cap colours as text on paper or light covers. The pressed-chip count on ink and hl-on-cover on dark covers are the only highlighter text.
- **Don't** use red as a button fill, or a fixed white as button text. Red marks; the action pair acts.
- **Don't** make one saturated primary colour the brand. A blue, yellow and red trio reads as supermarket branding.
- **Don't** set headings, button labels, nav or instructions in Gochi Hand. It is Martim's pen only.
- **Don't** use hard offset shadows, glows or drop shadows on flat panels. Only objects taped or laid on the page cast soft shadows.
- **Don't** use cream or ivory paper or serif display type. The paper is cool white and the voice is grotesque plus handwriting. The diploma's certificate stock is the single exception.
- **Don't** build the charity default of a full-bleed hero photo, a fundraising progress bar and a lone Donate button. The only full-bleed photo closes the page.
- **Don't** use the cover colour for text or decorative accents on paper. It owns whole regions.
- **Don't** use icon fonts or emoji as icons.
- **Don't** give the logo white lettering on a light cover, or fix it to one brand colour.
- **Don't** place partner logos directly on the cover colour, the grid or a photo.
- **Don't** put tape on event posters, event thumbnails, bulletin photos or event pages.
- **Don't** give share buttons brand colours (WhatsApp green, Facebook blue). Icons are monochrome ink, and the pills are white with ink outlines.
- **Don't** use the diploma's cream paper, double frame or seal anywhere else.
