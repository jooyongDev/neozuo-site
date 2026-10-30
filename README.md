# neozuo.com

NEOZUO의 웹·앱 개발 문의 홈페이지. Static HTML/CSS/JavaScript와 Firebase Hosting을 사용합니다.

## 로컬 실행

저장소 루트에서 `python3 -m http.server 4173 --bind 127.0.0.1`을 실행하고 http://127.0.0.1:4173 에 접속합니다. 빌드 과정과 npm 설치는 필요하지 않습니다.

- `index.html`: 서비스, 사례, 진행 방식, FAQ, 문의
- `styles.css`: 공통 디자인과 반응형 레이아웃
- `site.js`: 시작 상황 선택, 문의 초안, 전송 상태 처리
- `work/`: 기존 공개 사례 상세 페이지
- `PRODUCT.md`: 공개 가능한 제품 맥락과 콘텐츠 제약
- `DESIGN.md`: 구현된 디자인 기준

## 검증

`node --test tests/inquiry.test.cjs`로 문의 성공/실패·중복 방지·입력 보존·상황별 안내를 검증합니다. 테스트는 가짜 DOM과 응답을 사용하며 실제 고객 문의를 보내지 않습니다. Node 20 이상을 권장합니다.

브라우저에서는 좁은 화면의 줄바꿈, 가로 넘침, 라디오의 방향키 조작, FAQ, 필수 입력, 기존 경로를 확인합니다. 실제 전송 및 메일 수신은 출시 전 별도로 검증해야 합니다.

## 출시 전 확인

- 기존 사례의 이름·텍스트 및 새로 추가할 이미지의 공개 허용 범위를 확인합니다. 기존 사이트에 있던 사례를 유지했으며 새 성과 수치나 후기를 만들지 않았습니다.
- 문의 수신 담당자, Web3Forms 실제 수신, 카카오 문의 링크, 사업자 표시와 개인정보 처리방침을 확인합니다.
- 견적·범위·보고·변경·출시 후 지원의 구체적 조건은 프로젝트별 합의 사항입니다. 미확정 가격·기간·SLA를 홈페이지에 약속하지 않습니다.
- Firebase 프로젝트와 배포 대상 확인 후 `firebase deploy --only hosting --project <project-id>`를 실행합니다. 이 리뉴얼 작업은 운영 배포를 포함하지 않습니다.

## 글꼴과 공유 이미지

Pretendard v1.3.9를 사용합니다. `fonts/pretendard-subset.woff2`는 사이트의 한국어 글자를 포함하는 부분 글꼴이며 CDN은 새 글자를 위한 대체 경로입니다. 원본과 라이선스는 [Pretendard 공식 저장소](https://github.com/orioncactus/pretendard)를 참고합니다.

카피를 바꾸면 모든 HTML의 글자를 모아 fontTools로 부분 글꼴을 다시 생성합니다. `og-source.html`은 공유 이미지 원본이며, 1200×630 브라우저 화면으로 캡처하여 `og.png`에 저장합니다.
