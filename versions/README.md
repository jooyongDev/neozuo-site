# NEOZUO design alternatives

Two complete homepage previews remain after the 31 October feedback. The original `/` and all of its source files are unchanged. The rejected Index route, preview image and navigation links have been removed; its previous implementation remains recoverable in Git.

- `/versions/` — side-by-side comparison
- `/versions/editorial/` — aligned editorial introduction and the original-style full-width cobalt wordmark
- `/versions/night/` — dark studio with a corrected transparent metallic N and project exhibition

## Refinement decisions

| Before                                                                                  | After                                                                                                                               | Why                                                                |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| A: oversized headline, displaced supporting text, detached CTA, separate N illustration | Title and supporting text share a top-aligned grid; CTA stays with the explanation; one full-width NEOZUO wordmark anchors the hero | Recover the original's identity and improve the reading order      |
| A: case illustration before the story; progressively indented process steps             | Featured case story on the left and diagram on the right; process rows use one alignment                                            | Carry the original's stable layout into the editorial concept      |
| A: cobalt inquiry and footer repeat the hero color                                      | Charcoal inquiry and footer return to the original's closing treatment                                                              | Give the bright hero a distinct role                               |
| B: bent ribbon joint, rectangular dark image background, rotated image plane            | Rigid straight-stroke N with clean joins and genuine PNG alpha; transparent unrotated wrapper                                       | Correct the geometry and eliminate the rectangular background seam |
| Three competing directions and unused scene code                                        | Only A and B, with obsolete Index/N-mark styles and motion removed                                                                  | Keep the comparison focused on the accepted concepts               |

## Shared behavior

Both routes preserve the approved Korean copy, company facts, published case routes, privacy notice and inquiry fields. `/site.js` remains the shared source for stage selection, preserving drafts, validation and submission. The live form endpoint has not changed; do not submit a test inquiry.

Both routes are `noindex,nofollow`. No production deployment, framework, tracking or scroll interception was added.

## Motion

A has one finite wordmark entrance and subtle native-scroll displacement. B has a finite sculpture entrance and subtle native-scroll displacement. Project artwork enters once; body copy is always visible. The Night project index follows the visible case. Controls stay short and responsive; keyboard actions skip decorative animation.

`prefers-reduced-motion` and the preview toolbar's motion toggle stop decorative movement. The sculpture entrance ends at its actual responsive CSS transform to avoid a mobile scale jump. Scroll work is scheduled only on events and skips scenes outside the viewport.

## Artwork

`night/brand-sculpture-v2.png` is a 1254 × 1254 generated conceptual brand asset with genuine alpha transparency. It is not a client artifact or product screenshot. The corrected geometry uses straight metal strokes rather than the rejected curled ribbon. The image wrapper has no background, border, rotation, shadow or simulated edge mask. The former JPEG was removed.

Project diagrams use the published descriptions of PMP, viliv and allclass. No client screenshots or performance claims were invented.

## Skill application

The user's accepted concepts and latest layout feedback govern these changes; no new direction draw was required. Taste's alignment, content density and visual-review principles were applied within A/B; Impeccable's polish/craft-floor pass addressed hierarchy, geometry, imagery and dead-code cleanup; Emil's motion guidance preserved responsive controls, interruption and reduced-motion behavior. The unavailable Impeccable engine was not represented as a completed automated audit.

## Local preview

From the repository root: `python3 -m http.server 4173 --bind 127.0.0.1`.

Open `http://127.0.0.1:4173/versions/`. Inquiry regression checks: `node --test tests/inquiry.test.cjs`.

## Verification for this revision

- Browser review at 1440, 768 and 390 px: both hero headings stay on two lines; no page or form overflow; the N has no rectangular background.
- Inquiry preparation and focus, native keyboard FAQ, motion stop, reduced-motion logic and the existing eight inquiry regression checks pass. No real inquiry was sent.
- Taste source lint: zero failures, one intentional warning for the outlined navigation CTA. This is a functional secondary control, not a decorative content container; the filled hero CTA remains primary.
- The original files are byte-identical to commit `736f2a8`. All changes are contained in `versions/`.
