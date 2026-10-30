"use strict";
// The page is visible without JavaScript. Animate only elements as they arrive.
if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("chapter-reveal");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(
      ".section h2, .project-art, .project-story, .stage-choices, .stage-answer, .service-list > div, .process-list li, .faq details, .contact-intro, .form",
    )
    .forEach((element) => observer.observe(element));
}
