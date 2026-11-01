# Case details

## Overview

The reviewed Night case pages are now the canonical `/work/pmp.html`, `/work/viliv.html`, and `/work/allclass.html` routes. They load shared assets from `/assets/` and the root theme. Root `DESIGN.md` governs the visual system.

The user confirmed B as the standalone site on 31 October 2026. Version bars and original/comparison links are removed. Inquiry and all-case links return to `/#contact` and `/#work`; next-case navigation cycles PMP → viliv → allclass → PMP. Search metadata and canonical URLs use these public routes.

Preserve the reviewed case facts and the explanatory figures on viliv and allclass. PMP is store-released and used by the academy; viliv has operated with paid academy customers since November 2025; allclass is in web private beta since September 2026 with mobile apps not yet store-released. Do not invent outcomes or treat diagrams as client screenshots. PMP now uses the scoped, approved product captures described below; the original diagram treatment is historical.

The original detailed research and finish record is retained in `versions/night/work/DESIGN.md` as history. Promotion changes the shell, asset paths and metadata, not those case facts. Deployment and actual inquiry delivery remain separate from local verification.

### PMP workflow direction, corrected 1 November 2026

**MODE:** Persuade, supported by real product evidence. Preserve Night and all released product facts.

**THESIS:** A prospective customer should follow one exam through HWPX registration, student answering, result, wrong-answer review and the teacher's attempt detail. Naming this chain in the headline is insufficient: each stage needs its actual screen, and the same questions, score and review note must connect the screens.

**FIRST VIEWPORT:** Existing project title and facts, followed by a five-step linked overview. The detail page no longer opens on the unrelated dashboard/sentence-order pairing. The homepage retains that pairing.

**TOPOLOGY:** Five-step overview → HWPX upload, with parsed-question review available in a native disclosure → student attempt/result/wrong-answer notebook → teacher attempt detail → secondary sequence, word rotation and OMR → existing release facts and inquiry. Complex question types remain available in a disclosure after the student journey. Sequence/rotation screenshots and the OMR marking/report pair remain visible; the additional OMR grading screen uses a disclosure.

The main example is ‘고1 영어 · 독해와 어법’, six questions, synthetic student 박지민. The student answered four correctly, missed questions 2 and 5, then retried both and wrote ‘과거형을 확인하자’ and ‘비교급을 확인하자’. The teacher attempt capture shows the same 4/6 score and the note under question 2. The synthetic HWPX was processed by the real parser; answers were submitted and reviews completed through the actual student UI. Do not substitute unrelated product screens into this chain.

[The provenance manifest](../docs/pmp-screenshot-provenance.json) owns source commit, capture method, source filenames, dimensions and pixel-equality hashes. New captures are native 3× PNG renders delivered as lossless WebP: 5130×2955 teacher screens and 1170×2532 student screens. These are real interfaces with fictional data, and student images are Flutter web renders, not physical-device screenshots. Keep that disclosure before the main exhibit.

## Layout

- The five-step overview is a horizontal ordered list on desktop and a vertical list on mobile. Each item links directly to its stage. Numbers carry the sequence; they are not decorative section labels.
- HWPX upload and teacher attempt detail bookend the student journey as wide captures. Parsed-question review is optional supporting evidence beneath upload.
- Student attempt, result and review form three aligned columns above 700px. At 700px and below they become three vertically ordered stages, with portraits capped at 300px. Never hide the main stages in horizontal scrolling or disclosures.
- The sticky desktop index uses HWPX, student attempt/review, teacher detail, additional features, release/operations. At 701–1050px it becomes a static row; at 700px and below a sticky, horizontally scrollable row. Preserve 44px targets, active underlines, native page scrolling and anchor clearance.
- Sequence and word rotation share a secondary two-column group, stacking below 700px. OMR follows at a smaller scale: student answer sheet alongside its report, and grading in a disclosure. It must not outweigh the main five-step story.
- The optional question-type gallery retains the previous native horizontal scroll at tablet/mobile sizes, with its hint and headings above the images. All disclosures work with keyboard and without JavaScript.
- Preserve the quiet inquiry row after teacher confirmation, plus the final inquiry and next-case navigation.
- The OMR report uses the existing inline summary crop (534,116,912,869) and complete-sheet viewer crop (534,116,912,1335). Original pixels remain intact and the original-image link remains available.

## Components

**SIGNATURE:** Original product captures that can be inspected at full size. `assets/pmp-evidence.css` supplies the scoped framing; `assets/image-viewer.js` progressively enhances ordinary image links with a native dialog. This replaces PMP's former diagram tabs on the public pages.

The native dialog has a title, close button, image alternative text and a persistent original-image link. Its scrollable canvas opens larger than the inline image, preserving an optional validated source crop. A validated optional `data-image-focus` point sets the initial scroll position when the viewer is narrower than 700px without cropping the source. OMR submissions uses 548,650 layout pixels to open on student results, while fit-to-screen still restores the full image. Portrait captures fit the mobile viewport width initially and scroll vertically. Provide explicit zoom controls (up to 300%), a percentage readout and an optional fit-to-screen action; fitting the entire image must not be the default when that makes the image less readable. Support keyboard activation, native focus containment, Escape, close-button and backdrop dismissal, then restore focus to the opening link without scrolling. Modified clicks and the no-JavaScript or unsupported-dialog paths retain normal original-image navigation. During loading, disable zoom controls and expose status; on failure, retain the original link and offer retry.

**MOTION:** Pointer activation may fade the dialog from half to full opacity over 180ms. Keyboard activation, OS reduced motion and the site's motion-off state open it immediately. Keyboard input, reduced-motion changes and a hidden document cancel the fade. Do not add carousel autoplay, scroll interception or decorative image movement.

Screens use the existing Night surface, ink, muted, accent and border tokens, with the incumbent softened control and figure corners. Keep visible focus outlines and 44px minimum dialog controls. The exhibit does not add global token primitives or regenerate `.impeccable/design.json`.

## Do's and Don'ts

- Do preserve the five-step main workflow and keep sequence, word rotation, varied inputs and OMR as supporting evidence.
- Do keep original pixels, source attribution and the synthetic-data and Flutter-web disclosures together with the exhibit.
- Do preserve the existing case outcomes without adding unsupported metrics or implying that web captures verify native-device behavior.
- Don't recolour the product UI to match Night, fabricate product screens or present explanatory diagrams as captures.
- Don't promote the PMP gallery or report crop into a rule for unrelated cases.

### Verification and release record

The final review disposition was **ship**. The two material review findings were resolved: the homepage explicitly identifies Flutter web rendering, and the question gallery remains horizontally scrollable through 900px with readable 68%-wide tablet panels while retaining three desktop columns.

Builder verification covered widths 360, 390, 768 and 1710px, 18 passing tests, keyboard and pointer enlargement, Escape and focus restoration, original-link fallback, and absence of page overflow. Saved visual evidence is in `.impeccable/review/pmp-screenshots/`. The documentation pass checked the finished HTML/CSS/JavaScript, inspected the saved desktop and tablet gallery captures, and independently matched all eight image hashes to the provenance manifest. The automated Impeccable detector was attempted once but could not run because its engine/cache was unavailable; this is not a detector pass.

The release owner recorded Firebase Hosting deployment to `neozuo-homepage`, version `be935c34e5bdb489`, release `1793461640305000`, at 00:47 KST on 1 November 2026. Live verification matched all 32 public files to source, confirmed nine internal paths return 404, and exercised the mobile report viewer with closing and focus restoration. Inquiry delivery remains outside these checks.

The finished exhibit preserves the root Night palette, Pretendard hierarchy, wrapper, shell and motion preferences. Root frontmatter tokens and `.impeccable/design.json` remain unchanged by this scoped documentation merge. Pre-existing sidecar samples differ from the current desktop navigation and FAQ sizing: the navigation sample uses 56px height and 14px/23px padding while the live CSS specifies 48px and 11px/18px, and the FAQ sample uses 16px text while the current desktop summary is 18px. These existing sample differences are recorded without changing the system or unrelated code.

### Critique follow-up, 1 November 2026

The user approved all three subsequent critique findings: enlargement readability, development-focused narrative, and section/inquiry access. The component and layout guidance above now reflects that implementation. At a 390px viewport, the report opens as a 912px-wide focus crop instead of shrinking the 322px inline crop; the student portrait opens at 348px instead of the 280px inline image. At 1710px, the report opens at 1368px within a 1390px viewport, larger than the 1097px inline crop. Zoom, fit, native scrolling and the full-original link let visitors inspect the remaining content.

Verification covered Chrome viewport widths 320, 360, 390, 768 and 1710px, image-load failure and successful retry, zoom and fit, Escape/close/focus restoration, current-section navigation, inquiry destination and the homepage viewer. Temporary error fixtures were removed. All 18 existing automated tests passed and the subset font covers the revised Korean copy. Physical iOS/Android touch was not tested. This follow-up is implementation verification, not a new independent critique score or automated Impeccable detector pass.

Firebase Hosting version `fcf794e1a606a22c`, release `1793467282655000`, was published at 02:21 KST. Live verification matched all 33 public files to source and confirmed nine internal paths remain excluded with the custom 404. Live mobile report enlargement and section navigation were also exercised. Evidence and verification records are retained in the task's `outputs/pmp-refinement/` and `work/pmp-refinement/` directories.

### Screenshot density and lossless delivery, 1 November 2026

The original 1× JPEG captures were insufficient for Retina displays and enlarged inspection. Replace every published PMP capture with a fresh 3× browser render: student screens use a 390×844 CSS viewport / 1170×2532 PNG, dashboard and submissions use 1710×985 / 5130×2955, and the complete report uses 1710×1507 / 5130×4521. The report chart itself renders at 2538×720 pixels for its 846×240 CSS area. Wait for chart resize and entrance animations to finish before capturing; a full-page screenshot that changes viewport size can otherwise capture empty bars.

PNG masters remain in the task outputs. The website serves lossless WebP with decoded RGB pixels verified identical to each PNG, totaling 659,874 bytes for eight images. No upscaling, sharpening or generated screen content is used. The report keeps its 534,116,912,869 CSS-pixel inline focus crop while the full original now includes all question results.

Each screenshot link declares `data-image-density="3"`. The viewer divides natural dimensions by this density so crop coordinates and zoom behavior remain in CSS pixels. Existing links without density retain 1× behavior. Keep display size separate from source pixel dimensions; do not let a high-resolution replacement open at three times its intended size.

Local verification passed 18 tests and browser checks at 320, 390, 768 and 1710 CSS pixels: eight image loads, no page overflow, report crop, zoom/fit, Escape, focus restoration and homepage enlargement. These checks do not claim physical iOS/Android-device testing.

Released to Firebase Hosting at 2026-11-01 03:59 KST, version `36d9451d3407d407`, release `1793473185233000`. All 33 public files match the checked source; nine internal paths remain excluded. Live desktop report and mobile portrait viewers were checked. The capture-only clone, dependency caches, Python environment, servers, browser profile and two Docker containers were removed; the existing development environment was preserved.

### Second critique implementation, 1 November 2026

The owner approved all four recommendations from the independent critique: initial mobile focus on the OMR results table, full report-sheet inspection, question titles and swipe guidance before the images, and an opening promise centered on exam creation, grading and reports. The Night identity, original image pixels and factual release statements are retained. Mobile opening spacing is tighter, the overview portrait is capped at 220px, tablet portrait width is 220px, and PMP footer links have 44px minimum hit areas. Split-screen automatic submission is described with its previously published anti-cheating purpose; this is not a new product claim.

Local verification covered Chromium at 320, 390, 768, 1440 and 1710 CSS pixels, report full-sheet bounds and bottom scrolling, table-focused opening, zoom/fit/close/focus restoration, four section anchors, homepage enlargement and no document overflow. Synthesized Chromium touch verified horizontal gallery swiping and vertical page scrolling across the gallery; physical devices were not tested. At 390px the section index begins at 1567px (previous critique: about 1741px); at 768px the overview portrait is 220px wide (previous: about 157px). Eighteen existing automated tests passed, and all revised Korean text is covered by the bundled font. The Impeccable layout detector remains unavailable (engine 0.1.18 missing, exit 127), not a passing scan. Browser evidence is retained in the task outputs/pmp-critique-fixes directory.

Published to the existing Firebase Hosting project `neozuo-homepage`; live verification at 2026-11-01T13:27:13.369489+09:00 matched all 33 public files to source and confirmed all nine excluded routes return the custom 404. Live Chromium at 1440px and 390px passed the report/table viewers, gallery labels, section anchors, focus restoration and homepage viewer checks. Horizontal gallery and vertical-page synthesized touch also passed on the live page. Temporary Playwright browsers closed in finally blocks; the existing development server was preserved.

### Main workflow correction and capture verification, 1 November 2026

The previous title-only workflow description was inadequate. The detail page now exposes all five real stages, with eight additional captures from an isolated clone and separate PostgreSQL/Redis containers. The same synthetic exam produced 4/6 correct with wrong questions 2 and 5; review notes submitted by the student UI appear in teacher attempt detail. Main stage screenshots are never hidden in disclosures. Secondary sequence and word rotation are shown with real teacher-console captures, and OMR retains its own report. The homepage's visual exhibit is unchanged.

The eight new PNG masters total 674,590 bytes as lossless WebP, with decoded pixel equality verified for each file. Added Korean glyphs were included in the existing Pretendard subset, preserving all prior characters. Existing 18 automated tests pass. Browser checks cover 320, 390, 768, 1024, 1440 and 1710px, the five-stage reading order, image loading, native disclosures with Enter/Space, active navigation, viewer fit/Escape/focus return, and the homepage viewer. No page overflow or JavaScript errors were observed. The Impeccable binary remains unavailable, so this does not claim a detector pass.

New wide viewer focus points favor the relevant content: teacher attempt 750,400; HWPX upload 490,560; sequence 500,400; rotation 500,360 (CSS coordinates). Original images remain intact. Physical-device touch was not tested.

The temporary capture server, student build server and teacher server were stopped; the two task-specific containers and volumes, fresh clone, virtual environment and package caches were removed. Existing development containers and the website preview server on 4173 were preserved. PNG originals and verification captures remain under the task outputs.

After the owner refreshed Firebase authentication through the phone SSH session, this workflow was published to the existing Firebase Hosting project `neozuo-homepage`. Live verification at 2026-11-01T15:39:52.092657+09:00 matched all 41 public files to source and confirmed nine internal routes return the custom 404. Live Chromium at 1440px and 390px passed the five-stage order, image loading, section navigation, native disclosures, viewer fit/Escape/focus restoration and homepage viewer checks, with no document overflow or JavaScript errors. The desktop student workflow and mobile teacher-attempt viewer captures were visually inspected. Verification artifacts are retained under the task outputs/pmp-flow-verification directory. Physical-device testing and actual inquiry delivery are not claimed.

### PMP presentation frames, 1 November 2026

The owner requested a cleaner UI illustration treatment for the homepage thumbnail and case-detail captures. The new shared `capture-mount` / `capture-frame` components distinguish teacher web windows, student app viewports, and OMR report sheets. Graphite mattes, a compact neutral window rail, thin silver/black app edges and restrained offset shadows create depth within Night's palette. The chrome is decorative and accessibility-hidden; it does not add product controls or cover the source UI.

The homepage retains the real dashboard / sentence-order pair, composed as an overlapping web window and foreground app screen. Captions sit on the matte, clear of both images; the same composition stays compact on mobile. Only the homepage overlap hides part of the rear preview; both original captures remain independently available in the viewer. The detail page keeps each evidence image unobstructed. Its student journey uses one continuous surface for three equal app frames; on mobile all three stages remain vertically visible. HWPX, teacher attempt, sequence, rotation and optional detail screenshots use the same web treatment. OMR retains its existing report crop and full-sheet viewer.

All 16 screenshot SHA-256 values match the provenance manifest; no image pixels, resolution, image attributes, viewer behavior, case copy or source evidence changed. No new images, fonts, scripts or animation were added. Local Chromium checks passed at 320, 390, 768, 1024, 1440 and 1710px: all five steps, decoded images, no horizontal overflow, section navigation, viewer zoom/fit/Escape/focus restoration, native disclosures and homepage viewer. All 18 existing tests passed. Before/after desktop, tablet and mobile renders are saved in the task's `outputs/pmp-presentation/`. The Impeccable context launcher was unavailable, so the existing design documents and craft guidance were read directly; no automated detector pass is claimed.

Published to the existing Firebase Hosting project `neozuo-homepage`. Live verification at 2026-11-01T17:19:57.525898+09:00 matched all 41 public files to source and confirmed nine excluded paths return the custom 404. Live Chromium checks at 1440 and 390px passed navigation, five-stage visibility, image loading, all tested viewers, keyboard focus restoration and disclosures with no page errors. No physical-device testing or real inquiry submission was performed.
