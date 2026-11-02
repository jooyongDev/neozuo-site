"use strict";
const stageCopy = {
  idea: [
    "Product planning",
    "Tell us about your idea and its users. We’ll help define the features and priorities.",
    "Idea notes and reference products",
    "I have an early idea.\nService: \nProblem to solve: ",
  ],
  build: [
    "New web or app development",
    "We review your brief or feature list, then agree on deliverables, cost and timing.",
    "Project brief, feature list and target timeline",
    "I have defined the features.\nFeatures needed: \nTarget timeline: ",
  ],
  existing: [
    "Continue an existing project",
    "We review the current code and progress, then agree on the work to continue. Tell us what is built and where you need help.",
    "Product description, technology and features to change",
    "I have an existing codebase.\nProduct and technology: \nWhere I need help: ",
  ],
  operate: [
    "Service improvements",
    "Tell us about bugs, usability issues or features you would like to add. We’ll discuss the work and support.",
    "Product URL, issues and priorities",
    "I want to improve an existing service.\nCurrent service: \nImprovements needed: ",
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
      `Useful materials: ${preparation}`;
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
      "We added a starting point based on your selection. Please fill in the details.";
  } else {
    status.textContent = "Your existing message has been kept.";
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
  button.textContent = "Sending…";
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
    window.location.assign("/en/thanks.html");
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
