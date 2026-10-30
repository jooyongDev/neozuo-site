---
name: NEOZUO
version: 2
description: Colour chapters, original paper-object art, and large Korean typography
---

# NEOZUO design system

The live source of truth is `chapters.css`, loaded after the shared `styles.css` on the homepage, case pages, and thank-you page. `styles.css` retains shared form, legal, and case-page rules; the homepage uses the more specific chapter rules.

## Direction

Taste: **Colour chapters**, seed **785908472**. NEOZUO's six-letter name becomes a tangible two-storey construction. Its three educational service workflows become a coherent family of paper-object illustrations.

The home page follows: offer → development cases → work selector → development fields → process → FAQ → inquiry. Original Korean descriptions, project facts, legal consent, form endpoint, and stage-selection behaviour remain intact. Titles, buttons, and navigation have no terminal periods.

## Tokens

| Role | Value |
| --- | --- |
| Primary text | `#111111` |
| Secondary text | `#3a3a36` |
| Paper | `#f2f2ed` |
| Tonal surface | `#e4e4dd` |
| Introduction / process | `#ff8126` |
| Development cases | `#4db3ff` |
| Work selector / inquiry | `#c5f53d` |
| Development fields / footer | `#161615` |
| Primary action | `#bc123b` with white text |
| Action hover | `#94102f` |
| Corners | Square |
| Outer gutter | `clamp(20px, 2.8vw, 48px)` |

Pretendard is the only family. Use 400 for text and 650 for headings, with the existing heavier wordmark. Homepage body is 16–19px, headings scale by layout, and all h1–h3 fit within two lines at 390, 768 and 1440px. Small form/legal notes retain 14px. The Korean font subset is self-hosted with the existing fallback.

## Components and layouts

- Hero: large Korean headline, NEOZUO artwork, offer description and primary inquiry button. Five coloured navigation blocks match their destination chapters. On mobile, supporting text and CTA come before the image, followed by full-width navigation rows.
- Cases: one large split feature and two unequal, staggered art plates. Images are conceptual illustrations, not actual client screenshots or product photographs. Existing text and case links provide the factual evidence.
- Work selector: native radio rows and a live answer. The selected workflow supplies a writing prompt to the real inquiry form; existing text is never overwritten.
- Capabilities: large fixed-position heading while four complete text rows pass alongside it; normal flow on mobile.
- Process: four tiles rising in height across the desktop. Two columns on tablet, readable vertical sequence on mobile.
- FAQ: native details/summary on alternating broad bands. Keyboard operation is retained.
- Inquiry: paper form on lime ground, square fields, crimson submit action, existing consent and error states.
- Footer: full-width lime wordmark on near-black and verified business information.

## Motion and access

Elements remain visible by default. IntersectionObserver animates headings, images, case stories and content rows once on arrival using opacity and transform. The hero image gently settles on load; link arrows and image crops respond on hover. All travel is disabled by `prefers-reduced-motion`. No scroll hijacking, pinned multi-screen narrative, autoplay video, or form submission during QA.

## Asset provenance

`assets/hero-art.jpg`, `pmp-art.jpg`, `viliv-art.jpg`, and `allclass-art.jpg` were generated with the built-in image tool for this concept. They are original editorial imagery, not client-supplied evidence. Original PNGs remain in the generated-images workspace; JPEG copies are used on the site. No third-party stock image credits or invented client metrics were introduced.

## Blueprint adjustments

1. Contact changed from address rows to the coupon form: a physical address treatment cannot hold the required inquiry form.
2. Features changed from overlapping cards to pinned heading and complete rows: the original fan would obscure the long Korean descriptions.
3. Hero preserves the swatch column but separates text and art because the typographic artwork has no quiet area for readable overlaid copy.
4. Original crimson was darkened for white button-text contrast.

## Verification

See `docs/taste-review.md` for the visual critique and validation limits. The earlier Impeccable sidecar has been archived under `docs/archive/`; it describes the superseded cobalt design and is not the current component specification.
