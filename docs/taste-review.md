# Current revision: editorial monochrome

The coloured-field version below is historical and was superseded after user review. The current design uses white, paper and charcoal with one blue action colour. Images are displayed in grayscale via CSS; no original assets were destructively edited. See DESIGN.md for current tokens.

---

# NEOZUO 디자인 변경 검토

2026-10-30 · Taste `Colour chapters` · seed `785908472`

NEOZUO 이름을 두 층의 입체 글자로 만들고, 세 프로젝트의 학습 흐름을 종이 오브제로 표현했습니다. 주황은 소개·진행 절차, 하늘색은 개발 사례, 라임은 업무 선택·문의를 구분합니다. 오른쪽 메뉴도 같은 색으로 연결됩니다.

주소 중심으로 제안된 문의 영역은 실제 문의 폼을 담도록 바꿨습니다. 겹쳐지는 서비스 카드는 긴 한국어 설명을 가리므로, 고정된 제목 옆에 설명이 흐르는 구성으로 바꿨습니다. 그림 위에 한국어를 겹치지 않고 제목과 그림을 나눴습니다.

## 검증

- 1440·768·390px에서 실제 브라우저 화면과 전체 페이지 캡처 확인.
- 세 폭에서 가로 넘침 없음. 모든 h1–h3가 두 줄 이내. 자체 호스팅 글꼴 로드 확인.
- 기존 문의 기능 테스트 **8개 통과**. 문의 양식 HTML도 기존 버전과 동일함을 확인.
- 브라우저에서 업무 선택, 안내 변경, 문의 템플릿 입력, 기존 초안 보존 확인. FAQ Enter 키 조작, 사례 상세 이동 확인.
- 내부 페이지·자산 경로 18개가 로컬 파일로 존재함을 확인. HTTP 일괄 검사는 셸 네트워크 제한으로 실행하지 않았으며, 브라우저에서 실제 페이지와 이미지를 확인함.
- Taste 소스 lint: **0 FAIL / 0 WARN** (`index.html`, `chapters.css`, `chapters.js`).
- `inspect.mjs`는 직접 브라우저를 구동하므로 이 환경의 CUA 전용 브라우저 규칙에 따라 실행하지 않음. CUA의 DOM 치수와 스크린샷으로 대체 검증. 자동 inspector 통과를 주장하지 않음.
- 브라우저 오류 로그 없음. reduced-motion 분기는 소스에서 확인했으며 OS 설정 전환 시험은 하지 않음.
- 원본 PNG 약 9MB를 JPEG 약 1.5MB로 인코딩. 첫 이미지만 우선 로드, 사례 이미지는 lazy-load.
- 실제 문의를 전송하거나 운영 사이트를 배포하지 않음.

## 시각 검토

ROUND 1
Seen in one second: 주황 바탕의 한국어 제목과 NEO/ZUO 입체 글자
Idea (one sentence): NEOZUO의 이름과 세 학습 서비스의 흐름을 색상별 편집 화면과 종이 오브제로 표현한다
Live thing: 필요한 업무를 고르면 안내와 문의 작성 템플릿이 바뀐다
Layout words by section: hero=swatch / work=uneven-wall / start=selector / services=pinned-list / process=rising-tiles / faq=bands / contact=coupon / footer=wordmark
Scores: design 6.0 · usability 7.0 · creativity 7.0 · content 8.0 → overall 6.7
Caps applied: 실제 프로젝트 화면 대신 생성 이미지 사용. 고유한 이름을 사용했지만 구성 아이디어 자체는 다른 스튜디오에도 적용 가능하므로 creativity 상한 7
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. 데스크톱 전체 화면에서 viliv 설명이 이전 흰색을 물려받음 → 검정 본문으로 수정
2. 태블릿 첫 화면에서 NEO/ZUO 가장자리가 잘림 → 원본 3:2 비율 유지
3. 큰 PNG 네 장이 로딩 비용을 높임 → 동일 구도를 유지한 JPEG 전달본으로 교체

ROUND 2
Seen in one second: 강한 주황색과 NEOZUO 입체 글자, 바로 읽히는 웹·앱 개발 제안
Idea (one sentence): NEOZUO의 이름과 세 학습 서비스의 흐름을 색상별 편집 화면과 종이 오브제로 표현한다
Live thing: 필요한 업무 선택부터 기존 초안을 보존하는 문의 작성까지 연결된다
Layout words by section: hero=swatch / work=uneven-wall / start=selector / services=pinned-list / process=rising-tiles / faq=bands / contact=coupon / footer=wordmark
Scores: design 6.5 · usability 8.2 · creativity 7.0 · content 8.0 → overall 7.3
Caps applied: 스킬 본문의 raster-art 기준은 충족하지만, critique의 더 엄격한 실제 사진 기준에 따라 design 상한 6.5를 적용. 이름을 바꾸어 응용 가능한 아이디어이므로 creativity 상한 7
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. 사례 이미지가 실제 제품 화면을 증명하지는 않음 (개발 사례 캡처) → 공개 허가를 받은 실제 화면이 확보되면 사례 상세 또는 이미지 일부에 추가하는 것이 다음 개선점
2. 모바일 전체 페이지가 약 9천 px로 길음 → 정보와 양식을 보존한 결과. 주요 메뉴와 첫 화면 CTA로 필요한 곳에 바로 이동 가능하나 실제 사용자 반응을 보고 축약 검토
3. 개발 분야는 다른 영역보다 텍스트 중심임 (데스크톱 전체 화면) → 배경 변화와 고정 제목으로 구분했으며, 검증된 작업 자료가 확보되면 더 구체화 가능

점수는 외부 심사 결과가 아닌 자체 검토입니다.

## 이미지와 내용

내장 이미지 도구로 원본 네 장을 생성했습니다. NEOZUO 입체 글자, 시험지와 복습 루프, 강의에서 펼쳐지는 노트, 강의 콘텐츠를 표현한 책입니다. 실제 고객의 제품 사진·스크린샷이 아니며, 새로운 성과 수치·고객 후기·가격·지원 기한은 추가하지 않았습니다. 외부 스톡 사진이나 영상은 사용하지 않았습니다. 상세 생성 프롬프트는 `docs/art-prompts.md`에 있습니다.
