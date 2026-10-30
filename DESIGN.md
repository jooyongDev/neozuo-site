---
name: NEOZUO
description: A Korean development studio expressed through a monumental wordmark, cobalt fields, and calm functional surfaces.
colors:
  blue: "#254bdf"
  blue-dark: "#1733ad"
  ink: "#182126"
  muted: "#4c575c"
  paper: "#f7f8f7"
  surface: "#e9eeed"
  white: "#fff"
  mint: "#dbe8df"
  light-blue: "#dfe6ff"
  dark: "#172126"
  dark-secondary-text: "#d7e1e5"
  field-background: "#26353d"
  field-border: "#65767f"
  field-placeholder: "#b7c7cf"
  error-text: "#ffd9d1"
  choice-hover: "#dce2e0"
typography:
  display:
    fontFamily: '"Pretendard Subset", "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: "clamp(80px, 23.4vw, 360px)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Pretendard Subset", "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: "clamp(30px, 3.4vw, 52px)"
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"Pretendard Subset", "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: "clamp(23px, 2.2vw, 32px)"
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  introduction:
    fontFamily: '"Pretendard Subset", "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: "clamp(24px, 2.55vw, 36px)"
    fontWeight: 550
    lineHeight: 1.4
    letterSpacing: "-0.03em"
  body:
    fontFamily: '"Pretendard Subset", "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: "clamp(16px, 1.2vw, 18px)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: '"Pretendard Subset", "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: "16px"
    fontWeight: 550
    lineHeight: 1.65
  small:
    fontFamily: '"Pretendard Subset", "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  control: "3px"
spacing:
  compact: "8px"
  small: "12px"
  related: "16px"
  field-gap: "20px"
  control: "24px"
  inset: "28px"
  row: "32px"
  group: "40px"
  section-heading: "64px"
  gutter: "clamp(20px, 3.4vw, 64px)"
  section: "clamp(88px, 10vw, 160px)"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.blue-dark}"
    textColor: "{colors.white}"
  button-small:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "11px 18px"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-ghost-hover:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
  text-link:
    textColor: "inherit"
  field:
    backgroundColor: "{colors.field-background}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  stage-choice:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    padding: "19px 24px"
  stage-choice-selected:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
  project-panel:
    backgroundColor: "{colors.light-blue}"
    textColor: "{colors.ink}"
    padding: "clamp(28px, 4vw, 64px)"
  faq:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "20px 24px"
  faq-open:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  wordmark:
    textColor: "{colors.white}"
    typography: "{typography.display}"
---

# Design System: NEOZUO

## Overview

**Creative North Star: "Name as Monument"**

The name itself supplies the visual identity: large, tightly set NEOZUO lettering anchors broad cobalt and charcoal fields. Korean text stays plain and calm around that scale contrast. The result is confident without requiring decorative imagery or invented product screenshots.

Content surfaces use off-white and cool neutral fills, generous sectional space, and readable text blocks. Controls remain visibly functional, with native radio choices, disclosure rows, and labeled form fields. The document records the built system in styles.css, index.html, and site.js; page sequencing remains in the surface brief.

**Key Characteristics:**

- Monumental brand type with quiet explanatory copy.
- Cobalt identity fields and actions, cool neutral reading surfaces.
- Flat rectangular panels and minimally softened controls.
- Korean-first typography, native semantics, and restrained state motion.

## Colors

A decisive cobalt identity sits against cool paper and low-chroma work surfaces. The frontmatter owns the exact color values; the descriptions below assign their roles.

### Primary

- **Cobalt (`blue`)**: the broad hero field, selected stage choice, primary button, and small functional accents.
- **Deep Cobalt (`blue-dark`)**: primary-button hover state on fine-pointer devices.
- **Pale Cobalt (`light-blue`)**: feature-case and case inquiry panels; a restrained continuation of the identity color.

### Neutral

- **Paper (`paper`)**: main reading canvas and inset content surfaces.
- **Cool Surface (`surface`)**: alternating service/process sections, unselected choices, and open disclosures.
- **Ink (`ink`)** and **Muted Ink (`muted`)**: primary and supporting text on light backgrounds.
- **Charcoal (`dark`)**: dark project, inquiry, and closing fields. It is a distinct source value from Ink.
- **White (`white`)** and **Dark Secondary Text (`dark-secondary-text`)**: primary and supporting content on dark fields.
- **Pale Mint (`mint`)**: a quiet project-panel surface.
- **Field Background, Field Border, Field Placeholder**: dark-form input contrast and boundary roles.
- **Error Text (`error-text`)**: readable form failure feedback on charcoal.
- **Choice Hover (`choice-hover`)**: unselected stage-row hover feedback.

**The Cobalt Anchor Rule.** Use cobalt for identity fields, primary actions, and selected choices. Keep long reading passages on paper, neutral, or dark surfaces.

## Typography

**Display Font:** Pretendard Subset, with Pretendard Variable, Pretendard, and the Korean-capable system fallbacks recorded in frontmatter.

**Body Font:** the same family stack. The bundled variable subset declares weights from 45 to 920 and uses font-display: swap. There is no separate mono or ornamental face.

The family unifies Latin identity and Korean prose. Weight, scale, and tracking create the hierarchy; text does not rely on a second font for decoration. Body copy uses word-break: keep-all, headings use balanced wrapping, and paragraphs use pretty wrapping.

### Hierarchy

- **Display:** heavy, tightly set wordmark. At the mobile breakpoint its size changes to 23.1vw; on wide screens it caps at 360px.
- **Headline:** section-level Korean headings, with the fluid size and tight tracking in frontmatter.
- **Title:** the base subheading role. Specific observed patterns include 26px process headings, 24px stage-answer headings, and fluid 30–54px featured-project titles.
- **Introduction:** the quiet statement accompanying the wordmark. Its mobile size is 27px.
- **Body:** fluid 16–18px reading text. Local supporting blocks generally stop around 32–50ch rather than spanning a full wide column.
- **Label:** visible field labels; navigation uses 16px regular text, while button labels use weight 600.
- **Small:** help, captions, and legal supporting text. Some secondary labels use 15px; the mobile footer uses 13px.

**The Name Carries Scale Rule.** Reserve the monumental display treatment for the NEOZUO wordmark; explanatory Korean headings use the smaller headline and title roles.

## Layout

A centered wrapper caps at 1600px with the fluid gutter in frontmatter. Long-form legal and case content uses a 900px maximum wrapper. Wide-screen sections use generous fluid vertical spacing; at 700px and below section padding becomes 80px.

The composition combines broad full-width color fields with asymmetric text columns. Stage content uses a 5:7 grid with a 9% gap; process and contact use equal columns with a 10% gap. Service rows use three columns, 32px padding, and small gaps between flat bands. Project panels use a featured two-column composition followed by two secondary panels. FAQ content is indented 32% on desktop and 23% at the intermediate breakpoint.

At 1000px and below, column gaps tighten, service rows become two columns, and project titles simplify to fixed sizes. At 700px and below, major content grids become single-column, FAQ indentation disappears, form rows stack, and supporting navigation links hide while the inquiry action remains visible. The header reduces from 96px to 76px high. At 1600px and above, the wordmark uses its fixed maximum size.

Use the observed spacing steps as a vocabulary, not a rigid mathematical scale. Inputs have a 10px label separation, form rows a 20px gap, and form groups a 26px gap that becomes 24px on mobile. The stage-answer block reserves vertical space to reduce layout jumps during selection.

## Elevation & Depth

The system uses no box shadows. Depth comes from alternating tonal fields, inset light panels, and the strongly contrasting dark close. Fields alone use a visible thin boundary; large content panels do not need ornamental outlines. Focus outlines indicate interaction rather than elevation.

**The Flat Surface Rule.** Separate content through fill, spacing, and type hierarchy. The built system has no box shadows.

## Shapes

Large content panels, workflow nodes, stage choices, and disclosures are rectangular. Buttons and fields use the small control radius in frontmatter. Native checkboxes retain their recognizable control shape with cobalt accent color. Outline SVGs use rounded caps and joins, a 1.7px stroke, and a normal 24px square footprint; FAQ icons reduce to 20px on mobile.

## Components

### Buttons

Primary buttons are firm, compact rectangles: cobalt with white text, weight 600, a 24px internal gap, and a minimum height of 52px. The compact navigation variant is at least 46px high; form submission is at least 60px high and aligns label and arrow to opposite ends. Fine-pointer hover deepens the blue; active presses scale to 0.98. A disabled submitting button uses a waiting cursor and reduced opacity.

Ghost buttons use the cool surface with ink text at rest and pale mint with ink text on fine-pointer hover.

Buttons transition color and transform over 160ms with ease-out. Keyboard focus on buttons, links, and summaries uses a 3px current-color outline offset by 6px. Text links provide a 44px minimum target, underline on hover, and move an accompanying SVG by 4px over 180ms using the source ease curve.

### Stage Choices

Native radio inputs are visually hidden inside large clickable rectangular labels. Selection switches from a cool neutral fill to cobalt/white and reveals an SVG check. The focus ring surrounds the whole label. An adjacent polite live region updates the matching next step. The continue action seeds an empty inquiry message and preserves existing user text. Without JavaScript, the fieldset remains disabled and fallback explanatory text remains available.

### Cards / Containers

These are broad, flat project panels rather than floating cards. Pale cobalt, charcoal, and pale mint differentiate the existing project stories. Default internal padding is fluid; mobile uses 28px. The workflow illustration is built from rectangular text nodes, narrow connectors, and a caption explaining its schematic status. Do not treat it as a product screenshot.

### Inputs / Fields

Dark form fields use a lighter charcoal fill, thin visible border, white text and caret, and the small control radius. Text inputs are at least 50px high; the textarea is at least 160px high and resizes vertically. Focus adds a 2px white outline offset by 3px. Labels remain visible, optional/required hints remain explicit, and the native checkbox carries consent.

The form uses native validity checks, an announced sending state, a disabled submit button while sending, and a visible alert on failure that retains the entered content. A successful response redirects to the existing thank-you route. Do not infer any extra validation color system from the single error-text role.

### Navigation

An ordinary light header pairs a lowercase heavy wordmark with three text destinations and a compact cobalt inquiry action. The small blue dot is part of the built wordmark treatment. Text destinations underline on hover. The mobile header keeps the wordmark and inquiry action without adding a drawer.

### FAQ

Native details/summary elements form generously padded rows. An opened disclosure gains the cool surface fill and rotates its SVG chevron by 180 degrees. The answer uses muted text and a readable maximum line length. Focus styling and keyboard interaction follow the native summary element.

### Monument Wordmark

The NEOZUO name appears as large, unbroken type on cobalt and again as a top-of-page link in the dark footer. Tight tracking, compact line height, and a small optical left offset create its solid silhouette. Its display treatment belongs to the identity, not to a reusable generic marketing headline.

### Motion and Accessibility

Motion is limited to interaction feedback and smooth anchor scrolling. The reduced-motion query disables transitions and animations, changes anchor scrolling to auto, and removes hover arrow translation. The page provides a focusable skip link, semantic landmarks, headings, native form labels, and state announcements. Preserve these behaviors when extending the visual patterns.

## Do's and Don'ts

### Do:

- Do keep Korean words together and use balanced heading wraps with readable explanatory line lengths.
- Do use the existing cobalt, paper, neutral, and dark surface relationships.
- Do preserve native labels, radio selection, disclosure behavior, visible focus, and reduced-motion support.
- Do keep project imagery factual; use clearly captioned schematic diagrams when demonstrating a workflow.
- Do retain the display wordmark as a brand signature while scaling functional text independently.

### Don't:

- Don't introduce decorative gradients, floating card shadows, or pill-shaped versions of these rectangular surfaces.
- Don't turn every heading into monumental display type.
- Don't replace visible form labels or native controls with decorative approximations.
- Don't use stock photography, fabricated screenshots, client logos, testimonials, or result metrics as proof without approved source material.


## Korean copy conventions

- Headings, navigation labels, and buttons have no terminal full stop. Questions keep a question mark; explanatory sentences use full stops.
- Use familiar section labels: 개발 분야, 개발 사례, 진행 절차, 자주 묻는 질문, 프로젝트 문의.
- Company explanations use 합니다체; questions and input guidance use polite conversational Korean.
- Name concrete work and outcomes. Avoid vague metaphors such as “다음 단계를 만들다”, “일을 연결하다”, or “코드를 이어가다”.
- Distinguish opening an inquiry from sending one: 프로젝트 문의하기 → 문의 내용 작성하기 → 문의 보내기.
- Write natural Korean first, then adjust layout and line breaks. Do not omit grammar to fit a visual line.
- Keep unconfirmed prices, report schedules, support periods, and SLAs out of public promises.
