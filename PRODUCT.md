# Product

**Current baseline — rollback requested 1 November 2026:** The owner rejected the later homepage refinements and requested the exact site immediately after the PMP UI-illustration presentation. The active public files now match all 41 SHA-256 hashes recorded at 2026-11-01T17:19:57+09:00. Later homepage layout, type, color, motion, fitted-viewer and session-draft changes have been reverted. Do not reapply them based on historical critique notes. See `docs/homepage-design.md`.

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Korean business owners and product leads who need a web or mobile service, planning help, or improvements to an existing codebase. Education is proven experience, not an exclusive customer category.

## Product Purpose

Help a prospective customer understand NEOZUO's capabilities and start a useful project conversation. The owner reconfirmed this positioning without changes during Impeccable init on 30 October 2026.

## Stack

Existing static HTML, CSS and JavaScript, Firebase Hosting. Preserve existing routes and the Web3Forms inquiry integration. No framework migration.

## Capabilities and Constraints

Planning assistance exists; inquiries without specifications are welcome. Existing code projects are accepted. Web, mobile, backend/API and evidenced AI work are relevant. Prices, fixed durations, report cadence, warranty duration, payment ratios and response SLAs remain undecided. Explain that these are agreed per project; do not invent universal promises.

## Brand Commitments

The owner confirmed the project’s full name on 2 November 2026: **PMP 영어학원 E-Learning 플랫폼**. Use this name in project titles and summaries; PMP remains the short name. This correction is incorporated in the current private illustration previews.

NEOZUO / 네오주오. Korean plain-language copy. No team headcount or employee biographies in marketing copy. Existing legal footer information is retained as current repository content; this is not a new verification of that information.

On 31 October 2026, the owner confirmed **B / Night as the standalone website**. The canonical homepage is now `/`, and renewed cases are `/work/pmp.html`, `/work/viliv.html`, and `/work/allclass.html`. Root `DESIGN.md` and `.impeccable/design.json` now document this selected system. This supersedes the earlier instruction to preserve the old root as the active homepage.

The original site is retained in `archive/pre-night/`; A/B previews remain in `versions/` as historical records. Both are excluded from Firebase Hosting. Their documents are historical, not the active implementation authority.

On 31 October 2026, the owner explicitly authorized deploying the current renewal and subsequent website changes to the existing Firebase Hosting project `neozuo-homepage`. Verify each change, deploy Hosting only, and check the live website before reporting completion. Do not ask for deployment approval again within that scope. The owner identified `dev@neozuo.com` as the managing account after the earlier account lacked access; specify that account in CLI commands without changing the default account used by other projects. Authentication consent, if required, is a separate step. Never publish preview files, archives, internal documents or CLI logs.

The earlier Taste redesign was rejected for excessive competing colours. Preserve Night's charcoal, white, silver and restrained lavender, and do not restart theme exploration from a skill's defaults.

The durable decision, research reports, copy conventions, and next priorities are recorded in [NEOZUO 홈페이지 디자인 기준과 조사 기록](https://chatgpt.com/space/page_6b5f32c32eb081919546b3b2f92daabf), linked from the main neozuo Page.

Use natural Korean rather than translated slogans or unusual phrases. Prefer familiar labels such as 개발 분야, 개발 사례, 진행 절차, 자주 묻는 질문 and 프로젝트 문의. Headings, navigation and button labels have no terminal full stop; questions retain question marks and explanatory sentences retain full stops. Write grammatically complete Korean before adjusting layout.

## Evidence on Hand

The existing /work/pmp.html, /work/allclass.html and /work/viliv.html contain published case text. Preserve these routes, but do not expand client claims or add unsupported metrics. Repository README refers to older editorial clearance; the current company context requires confirmation of client assets before new publication. Do not fabricate screenshots, client logos, testimonials or results.

On 1 November 2026, the owner approved curating, copying and publishing eight PMP product captures on the homepage and `/work/pmp.html`, emphasizing complex question types, the student/teacher OMR workflow and its attached report. This approval is scoped to the captures in `assets/pmp/`; it does not authorize unrelated client assets. [The provenance manifest](docs/pmp-screenshot-provenance.json) records source repository `jooyongDev/pmp-quiz`, commit `c3d4512b70641c81557ba3552defc55fc1e2655b`, original filenames and SHA-256 hashes.

The owner subsequently clarified the main case narrative on 1 November 2026: **HWPX registration → student attempt → result → wrong-answer notebook → teacher attempt detail**. The same example exam and student must connect all five stages. Sequence, word rotation and OMR are secondary. The owner explicitly authorized additional captures needed for that flow. Eight additional 3× captures now document HWPX upload/review, student attempt/result/review, teacher attempt detail, sequence and word rotation. The original homepage pairing remains in place.

These are actual Vue teacher-console and Flutter student-app interfaces captured from an isolated local clone with a synthetic database. Names, questions and scores are fictional; no production student data was used. Student captures are Flutter web renders at 390 × 844, not native device screenshots. Both public pages disclose the web rendering and example data. Images remain unchanged; a CSS crop highlights the OMR report in the page while the full original remains available. The captures demonstrate implemented interfaces and workflows, not measured learning outcomes, operating volume or native-device verification. Existing release and usage statements retain their prior evidentiary limits.

## Operating Context

Visitors may be at idea, specification, existing-code, or operations stages. The inquiry form should accept incomplete plans and use the existing collection fields and privacy policy. An optional stage selector can guide the message without collecting additional data categories. On the current homepage it is a visible standalone ‘어떤 도움이 필요하세요?’ section (`#start`), separate from the inquiry form (`#contact`). The owner explicitly requested this separation on 1 November 2026 after the critique.

Selecting a service must not overwrite an inquiry the visitor has already started. Distinguish opening the inquiry section, preparing its contents, and actually submitting it.

## Product Principles

- Help the visitor describe their current problem.
- Make scope and next steps understandable without development jargon.
- Keep factual proof separate from illustrative interface examples.
- Prefer reliable, accessible behavior and a fast static page.
- Refine the confirmed baseline and carry forward user corrections instead of treating a design skill's defaults as brand decisions.

On 1 November 2026, the owner clarified that a richer homepage means a stronger **layout and composition**, not added generated illustrations. The generated-image experiment was rolled back before deployment. The subsequent layout revision reuses the existing approved assets and retains all factual content and inquiry behavior.

The restored baseline preserves an already-written message when selecting a service. It does not persist inquiry drafts across page reloads; the later sessionStorage feature was removed by the requested exact rollback.
