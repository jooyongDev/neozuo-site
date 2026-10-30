# NEOZUO design alternatives

These are three complete, separate homepage previews. The original `/` and all of its source files remain unchanged.

- `/versions/` — visual comparison and route selector
- `/versions/editorial/` — bright editorial hierarchy, large Korean statement, cobalt brand composition
- `/versions/night/` — dark studio, generated silver brand sculpture, sticky project navigation
- `/versions/index/` — paper-toned portfolio, desktop side navigation, project folios

## Scope and shared behavior

All three preserve the existing company facts, Korean copy conventions, published project routes, privacy notice and inquiry form fields. The original `/site.js` handles stage selection, draft preservation and submission. No duplicate submission logic was introduced. The forms use the existing live endpoint; do not submit a test inquiry.

The alternatives use only their own CSS and motion script. They are marked `noindex,nofollow`; no production deployment was performed. No framework, runtime dependency, external font request, tracking or scroll interception was added.

## Motion

Each route has a finite hero entrance and one native-scroll-driven brand composition. Project artwork unfolds once in view; body copy remains visible at all times. The dark route's project index follows the currently visible case. Pointer FAQ opening receives a short settling transition; keyboard interaction is immediate.

`prefers-reduced-motion` disables decorative motion. The desktop version toolbar also exposes a motion toggle. Animations cancel on keyboard navigation and explicit stop. Scroll updates use one scheduled frame and stop doing visual work offscreen. No endless animation loop or forced scrolling.

## Artwork and design decisions

The Night sculpture is a generated conceptual NEOZUO brand image, not a product, client artifact or case-study screenshot. The 1254px JPEG is approximately 292 KiB. All case diagrams use existing published project descriptions.

Taste supplied sentence-as-layout, dark-room and editorial-report directions. Photograph-dependent slots were translated to factual diagrams and brand typography because there are no approved client screenshots or photography. We deliberately did not add unrelated stock imagery to meet a picture-count heuristic. The prior multicolor chapters direction was not reused.

The original PRODUCT.md and DESIGN.md remain unchanged; the user's latest permission to explore different themes applies to these preview routes only. The local Impeccable engine was unavailable, so the existing product/design context and its craft guidance were applied directly.

## Comparison

| Before                                             | After                                                                                             | Why                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| One homepage, conservative state-only motion       | Three independent routes with complete content and distinct composition                           | Compare substantive alternatives without replacing the original            |
| The wordmark supplies most of the visual hierarchy | A prioritizes the Korean statement; B prioritizes material/space; C prioritizes the project index | Explore different first impressions with the same company facts            |
| No authored scroll moment                          | One brand scene per route; short project entrances                                                | Add visible motion without a page-wide reveal template or scroll hijacking |

## Run locally

From the repository root: `python3 -m http.server 4173 --bind 127.0.0.1`.

Open `http://127.0.0.1:4173/versions/`. Existing inquiry tests run with `node --test tests/inquiry.test.cjs`.
