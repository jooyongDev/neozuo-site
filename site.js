"use strict";
const stageCopy = {
  idea: [
    "기획부터 함께 정리합니다.",
    "누가 쓰는 서비스인지, 어떤 문제를 풀고 싶은지부터 이야기해주세요. 필요한 기능과 우선순위를 구체화하는 기획을 도와드립니다.",
    "아이디어 메모, 참고 서비스",
    "아이디어 단계입니다.\n만들고 싶은 서비스: \n해결하고 싶은 문제: ",
  ],
  build: [
    "필요한 기능과 개발 범위를 맞춥니다.",
    "기획서나 기능 목록을 바탕으로 필요한 개발을 검토합니다. 우선 만들 기능과 산출물, 일정과 견적을 함께 정합니다.",
    "기획서, 기능 목록, 희망 일정",
    "만들 기능이 정해져 있습니다.\n필요한 기능: \n희망 일정: ",
  ],
  existing: [
    "기존 코드에서 다음 단계를 찾습니다.",
    "현재 구현된 기능과 코드 상태를 확인하고 이어서 개발할 범위를 정합니다. 우선 현재 상황과 가장 시급한 문제를 알려주세요.",
    "현재 서비스 설명, 기술 스택, 필요한 변경",
    "기존 코드가 있는 프로젝트입니다.\n현재 서비스와 기술 스택: \n도움이 필요한 부분: ",
  ],
  operate: [
    "운영하면서 필요한 개선을 정리합니다.",
    "반복되는 불편, 오류, 새로 필요한 기능을 함께 살펴봅니다. 운영 관리와 추가 개발 중 필요한 범위를 나누어 협의합니다.",
    "서비스 주소, 불편한 점, 우선순위",
    "운영 중인 서비스를 개선하고 싶습니다.\n현재 서비스: \n개선하고 싶은 점: ",
  ],
};
document.querySelector(".stage-choices")?.removeAttribute("disabled");
const choices = document.querySelectorAll('input[name="stage"]');
const message = document.querySelector("#contact-message");
let selectedStage = "idea";
choices.forEach((input) =>
  input.addEventListener("change", () => {
    if (!input.checked || !stageCopy[input.value]) return;
    selectedStage = input.value;
    const [title, description, preparation] = stageCopy[selectedStage];
    document.querySelector("#stage-title").textContent = title;
    document.querySelector("#stage-description").textContent = description;
    document.querySelector("#stage-preparation").textContent =
      `준비하면 좋은 것: ${preparation}`;
  }),
);
document.querySelector(".stage-continue")?.addEventListener("click", () => {
  if (!message) return;
  const status = document.querySelector("#stage-status");
  if (!message.value.trim()) {
    message.value = stageCopy[selectedStage][3];
    status.textContent =
      "선택하신 상황에 맞는 질문을 넣었습니다. 편하게 수정해주세요.";
  } else {
    status.textContent = "작성 중인 문의 내용을 그대로 유지했습니다.";
  }
  status.hidden = false;
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
