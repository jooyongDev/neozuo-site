---
name: NEOZUO
description: The selected Night design, promoted to the standalone website.
colors:
  paper: "#111317"
  ink: "#f2f4ef"
  muted: "#adb4bb"
  surface: "#22262e"
  accent: "#aabaff"
  on-accent: "#111832"
  field: "#191d24"
  line: "#616976"
  rule: "#3e4652"
  action: "#e0e6fa"
  action-ink: "#1b263c"
  error: "#ffc6bb"
typography:
  display:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, \"Apple SD Gothic Neo\", \"Malgun Gothic\", sans-serif"
    fontSize: "clamp(42px, 4.65vw, 72px)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, \"Apple SD Gothic Neo\", \"Malgun Gothic\", sans-serif"
    fontSize: "clamp(32px, 3.6vw, 54px)"
    fontWeight: 500
    lineHeight: 1.24
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, \"Apple SD Gothic Neo\", \"Malgun Gothic\", sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, \"Apple SD Gothic Neo\", \"Malgun Gothic\", sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.7
rounded:
  control: "6px"
  figure: "8px"
spacing:
  gutter: "clamp(22px, 4.2vw, 80px)"
  related: "16px"
  group: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.control}"
    padding: "14px 23px"
  button-hero:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.control}"
    padding: "14px 23px"
  field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 15px"
---

# Design System: NEOZUO

## Overview

**Creative North Star: "Night"**

The selected Night direction is the standalone NEOZUO website. A charcoal field, pale typography and restrained lavender frame the metallic N and concrete project stories. The identity comes from composition and service-specific detail, not competing colours.

Confirmed as the standalone site on 31 October 2026. Root `index.html`, `styles.css`, `assets/`, and `work/` are the implementation authority. Historical snapshots in `versions/` and `archive/` are excluded from deployment. Product claims remain governed by `PRODUCT.md`.

**Key Characteristics:**
- Integrated metallic N, restrained palette, Korean-first typography.
- Large product exhibits and explanatory scenes followed by concrete development responsibility.
- Native forms, quiet rules and finite motion.

## Colors

Charcoal is the page surface; pale text and lavender provide hierarchy and controls. Primary hero and case-inquiry actions use the lighter action surface. Fields and separators remain legible against dark surfaces. Project diagrams retain their lighter explanatory surfaces and approved product captures retain their original interface colours; neither adds a company brand palette.

## Typography

Self-hosted Pretendard is the common face. The subset contains current homepage, cases, utility pages, and dynamic Korean control copy. Header sizes recompose on mobile; do not shrink body text to fit a desktop diagram. Case names use a light 56–92px display scale and 54–60px on narrow screens; narrative copy is 16–18px with a 72ch maximum measure. Controls retain explicit labels.

## Layout

The shared wrapper has a 1600px maximum width and fluid gutters. Homepage hero and case stories retain the confirmed B composition. Case pages use a two-column opening, a large service exhibit, and a sticky desktop section index; mobile stacks the title, facts, exhibit and narrative. PMP uses approved teacher/student captures; the other cases retain explanatory diagrams. PMP's exhibit sequence and responsive behavior are recorded in `work/DESIGN.md`. Utility pages use a readable central column. Key breakpoints are 1100, 1000, 900, 700 and 380px depending on the component.

## Elevation & Depth

The site relies on tonal surfaces and fine rules. The metallic N provides the main spatial image. Shadows are confined to explanatory device/document scenes, not generic marketing cards. Preserve the transparent sculpture edge.

## Shapes

Controls use subtly softened corners. Explanatory scenes retain their existing 8px outer corners and document/device geometry. Browser selection, caret, focus and scrollbar colours belong to the same palette.

## Components

- Navigation connects the homepage, cases and inquiry; no comparison bar appears on canonical pages.
- On the desktop homepage, the metallic N continues behind the navigation without a clipped top edge. The sticky header uses a fading scrim at the top, then a dark translucent backdrop after scrolling; reduced motion disables the transition. Mobile and detail-page navigation retain their existing composition.
- Primary actions have a visible focus ring and restrained press feedback. Header inquiry uses an outlined treatment.
- Native radio options prepare inquiry text without overwriting a draft. The continuation enters at the first incomplete contact field.
- Native FAQ disclosure keeps keyboard behavior. Forms retain success, failure, loading and duplicate-submit protection.
- PMP product images open in a native dialog with keyboard dismissal and focus restoration. Direct original-image links remain usable without JavaScript; the scoped exhibit behavior is recorded in `work/DESIGN.md`.
- Motion follows the Emil design engineering principles. The restored homepage retains the earlier short hero opening and once-only exhibit entrances. The later PMP-only focal sequence was rolled back. Detail pages retain their quiet text/diagram entrances. Keep 140–220ms control feedback and do not reveal every body section.
- On desktop with a mouse, the N responds with a damped movement of at most 7px horizontally and 5px vertically. Its frame loop stops when settled and resets on scroll, lost focus, a hidden tab, keyboard input or motion opt-out. Mobile has no pointer-follow effect. No idle sculpture animation or scroll interception.
- A motion control is available in the footer; OS reduced-motion preference is respected. Keyboard input cancels decorative motion and keeps state changes immediate. Use transform and opacity; no animation dependency is needed.
- Privacy, confirmation and error pages share the site's typography, navigation and palette. Policy wording is preserved.

## Do's and Don'ts

- Keep Korean headings natural and free of terminal full stops.
- Keep inquiry and case exploration clear, keyboard accessible and responsive.
- Label explanatory diagrams and disclose example data and capture method for approved product images; use only established project facts.
- Respect reduced motion and keep scene changes immediate for keyboard input.
- Do not add competing accent colours or start a new theme exploration.
- Do not invent screenshots, testimonials, metrics, prices or service promises.
- Do not publish comparison routes or show version-switching controls in the canonical site.

### Homepage PMP exhibit, 1 November 2026

The PMP exhibit now composes its unchanged dashboard and sentence-order captures into one graphite scene: a large web window behind a thin app frame. Keep the palette restrained, the source screenshots sharp and independently zoomable, and labels outside the device silhouettes. The composition stays compact on mobile. Matching detail-page treatments and verification are recorded in `work/DESIGN.md`; source imagery and factual copy are unchanged.

### Superseded homepage experiments — historical record

**Rollback requested 1 November 2026:** The active site is the UI-illustration snapshot verified at 17:19:57 KST, before every experiment below. All 41 public file hashes match that snapshot. The subsequent refinements below are history, not instructions for the active site. The latest authority is `docs/homepage-design.md`.

### Homepage refinement, 1 November 2026

The owner requested animate, colorize, typeset and distill together. [The homepage surface brief](docs/homepage-design.md) records its current scoped type roles, restrained lavender action colors, optional writing helper within the inquiry section, removed repetition and one PMP composition sequence. This refinement keeps the Night identity and shared detail-page typography. Homepage CSS variables override the older shared role examples above; the design sidecar and unrelated detector configuration were not repaired as a side effect.

Published to Firebase Hosting `neozuo-homepage`. Live verification at 2026-11-01T17:43:53.567161+09:00 matched all 41 public files and confirmed nine internal routes remain excluded. Live desktop/mobile helper, draft preservation, mocked form failure/retry/success, image viewer, type reflow and motion checks passed with no page errors. A fresh 768px live render also confirmed the tablet composition. No real inquiry was sent.

### Homepage layout revision, 1 November 2026

The owner rejected adding generated imagery as the response to a plain layout. That unpublished experiment was rolled back. The homepage now changes composition using existing assets: a lead PMP feature, an open asymmetric secondary-case spread, a two-level capability surface, a connected process path and FAQ groups. `assets/home-layout.css` is homepage-only; [the surface brief](docs/homepage-design.md) records its reading order, breakpoints and verification. Hero, actual source images, case pages, form behavior and motion are preserved.

### Homepage critique follow-up, 1 November 2026

The accepted critique restores a visible standalone project-stage selector, separate from contact. A restrained silver response pane carries the selected service guidance; technical capabilities below have equal tonal weight. Cases lead into a concise inquiry bridge, secondary descriptions no longer enumerate the diagrams, and the process uses a continuous aligned path. Homepage image viewers start fitted and expose enlargement links outside the devices. Same-tab inquiry drafts expire after one hour and clear on successful submission. The current details and verification supersede earlier helper-disclosure and capability-surface notes in [the surface brief](docs/homepage-design.md).

### Development-case simplification, 1 November 2026

The homepage now uses an ordinary section heading above one lead PMP text/exhibit pair and two compact aligned viliv/allclass summaries. Remove the earlier sticky section rail, asymmetric secondary offset and homepage-only diagrams. Full diagrams remain on case detail routes. Preserve actual screenshot sources, fitted enlargement, capture disclosures, case anchors and inquiry navigation. The [homepage brief](docs/homepage-design.md) records current structure and checks. All four process steps retain their owner-approved uniform background.
