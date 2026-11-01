"use strict";
const stageCopy = {
  idea: [
    "서비스 기획",
    "만들고 싶은 서비스와 예상 사용자를 알려주세요. 어떤 기능이 필요한지, 무엇부터 만들지 함께 정리합니다.",
    "아이디어 메모, 참고 서비스",
    "아이디어 단계입니다.\n만들고 싶은 서비스: \n해결하고 싶은 문제: ",
  ],
  build: [
    "신규 웹·앱 개발",
    "기획서나 기능 목록을 검토한 뒤 개발할 기능과 납품할 결과물, 비용과 일정을 정합니다.",
    "기획서, 기능 목록, 희망 일정",
    "만들 기능이 정해져 있습니다.\n필요한 기능: \n희망 일정: ",
  ],
  existing: [
    "기존 프로젝트 추가 개발",
    "현재 코드와 개발 진행 상황을 확인한 뒤 이어서 맡을 업무를 정합니다. 지금까지 개발한 내용과 도움이 필요한 부분을 알려주세요.",
    "현재 서비스 설명, 사용한 기술, 추가·수정할 기능",
    "기존 코드가 있는 프로젝트입니다.\n현재 서비스와 사용한 기술: \n도움이 필요한 부분: ",
  ],
  operate: [
    "서비스 운영·개선",
    "운영 중인 서비스의 오류나 불편한 점, 추가할 기능을 알려주세요. 필요한 작업과 지원 조건을 협의합니다.",
    "서비스 주소, 불편한 점, 우선순위",
    "운영 중인 서비스를 개선하고 싶습니다.\n현재 서비스: \n개선하고 싶은 점: ",
  ],
};
document.querySelector(".stage-choices")?.removeAttribute("disabled");
const choices = document.querySelectorAll('input[name="stage"]');
const message = document.querySelector("#contact-message");
let selectedStage = "idea";
let stageAnimation;
choices.forEach((input) =>
  input.addEventListener("change", () => {
    if (!input.checked || !stageCopy[input.value]) return;
    selectedStage = input.value;
    const [title, description, preparation] = stageCopy[selectedStage];
    document.querySelector("#stage-title").textContent = title;
    document.querySelector("#stage-description").textContent = description;
    document.querySelector("#stage-preparation").textContent =
      `참고 자료: ${preparation}`;
    // Keep arrow-key selection instant; pointer changes receive one short cue.
    const answer = document.querySelector(".stage-answer");
    stageAnimation?.cancel();
    if (
      answer?.animate &&
      !input.matches(":focus-visible") &&
      document.documentElement?.dataset.motion !== "off" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      stageAnimation = answer.animate(
        [
          { opacity: 0.65, transform: "translateY(4px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 160, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    }
  }),
);
const stageContinue = document.querySelector(".stage-continue");
stageContinue?.addEventListener("click", (event) => {
  if (!message) return;
  const status = document.querySelector("#stage-status");
  if (!message.value.trim()) {
    message.value = stageCopy[selectedStage][3];
    status.textContent =
      "선택한 항목에 맞춰 작성할 내용을 넣었습니다. 필요한 내용을 채워 주세요.";
  } else {
    status.textContent = "이미 작성한 문의 내용은 그대로 두었습니다.";
  }
  status.hidden = false;
  // Night enters the form at the first incomplete contact field, not past it.
  if (stageContinue.dataset?.entry === "contact") {
    event.preventDefault();
    const target =
      document.querySelector('.form input[required]:not([type="checkbox"]):invalid') ||
      message;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "center", behavior: "auto" });
    return;
  }
  message.focus({ preventScroll: true });
});
const form = document.querySelector(".form");
form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  if (button.disabled || !form.reportValidity()) return;
  const error = form.querySelector(".form-error");
  const progress = form.querySelector(".form-progress");
  const originalLabel = button.innerHTML;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  button.disabled = true;
  button.textContent = "전송 중…";
  form.setAttribute("aria-busy", "true");
  error.hidden = true;
  progress.hidden = false;
  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
      signal: controller.signal,
    });
    const result = await response.json();
    if (!response.ok || result.success !== true)
      throw new Error("Submission failed");
    window.location.assign("/thanks.html");
  } catch {
    error.hidden = false;
    button.disabled = false;
    button.innerHTML = originalLabel;
  } finally {
    clearTimeout(timeout);
    progress.hidden = true;
    form.removeAttribute("aria-busy");
  }
});
