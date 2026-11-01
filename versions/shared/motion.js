"use strict";
(() => {
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  let stopped = media.matches;
  let active = new Set();
  const animate = (element, frames, options) => {
    if (stopped || !element?.animate) return;
    const animation = element.animate(frames, {
      easing: "cubic-bezier(.16,1,.3,1)",
      ...options,
    });
    active.add(animation);
    animation.finished.catch(() => {}).finally(() => active.delete(animation));
  };
  const button = document.createElement("button");
  button.className = "motion-control";
  button.type = "button";
  button.textContent = "모션 끄기";
  button.setAttribute("aria-pressed", "false");
  document.querySelector(".version-bar nav")?.prepend(button);
  function setMotion(off) {
    stopped = off;
    document.documentElement.dataset.motion = off ? "off" : "on";
    button.textContent = off ? "모션 켜기" : "모션 끄기";
    button.setAttribute("aria-pressed", String(off));
    if (off) active.forEach((animation) => animation.cancel());
  }
  button.addEventListener("click", () => setMotion(!stopped));
  media.addEventListener("change", () => setMotion(media.matches));
  setMotion(stopped);
  // A finite, authored entrance. All content is visible before/without JavaScript.
  const hero = document.querySelector(".hero h1");
  animate(
    hero,
    [
      { transform: "translateY(18px)", clipPath: "inset(0 0 28% 0)" },
      { transform: "translateY(0)", clipPath: "inset(0 0 0% 0)" },
    ],
    { duration: 850 },
  );
  const wordmark = document.querySelector(".hero-wordmark");
  animate(
    wordmark,
    [
      { transform: "translateY(30px)", clipPath: "inset(0 0 12% 0)" },
      { transform: "translateY(0)", clipPath: "inset(0 0 0% 0)" },
    ],
    { duration: 1000 },
  );
  const sculpture = document.querySelector(".brand-sculpture");
  if (sculpture)
    animate(
      sculpture,
      [
        { transform: "scale(1.06) translateY(12px)", opacity: 0.65 },
        { transform: getComputedStyle(sculpture).transform, opacity: 1 },
      ],
      { duration: 1300 },
    );
  // Scroll only updates the signature brand composition, on demand and in view.
  // Native scrolling remains untouched; no continuous idle loop or scroll hijack.
  const scene = document.querySelector(".brand-stage, .night-object");
  let scheduled = false;
  const updateScene = () => {
    scheduled = false;
    if (!scene) return;
    const rect = scene.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    const progress = Math.max(
      -1,
      Math.min(
        1,
        (innerHeight * 0.5 - (rect.top + rect.height * 0.5)) / innerHeight,
      ),
    );
    if (stopped) {
      scene.style.removeProperty("--travel");
      return;
    }
    scene.style.setProperty("--travel", `${progress * 70}px`);
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateScene);
  };
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  button.addEventListener("click", schedule);
  media.addEventListener("change", schedule);
  schedule();
  // Only project artwork receives scroll entrance, rather than every text block.
  const artObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(
          entry.target,
          [
            { transform: "translateY(28px)", clipPath: "inset(0 0 5% 0)" },
            { transform: "translateY(0)", clipPath: "inset(0 0 0% 0)" },
          ],
          { duration: 800 },
        );
        artObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16 },
  );
  document
    .querySelectorAll(".case-art")
    .forEach((art) => artObserver.observe(art));
  const caseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".work-index a").forEach((link) => {
          const current = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("active", current);
          if (current) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-15% 0px -45% 0px", threshold: 0 },
  );
  document
    .querySelectorAll(".case")
    .forEach((item) => caseObserver.observe(item));
  // Native details retains keyboard behavior; pointer opening gets one short settling cue.
  document.querySelectorAll(".faq details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (
        details.open &&
        !details.querySelector("summary").matches(":focus-visible")
      )
        animate(
          details.querySelector("p"),
          [
            { opacity: 0.55, transform: "translateY(-5px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 200 },
        );
    });
  });
  // Keyboard navigation cancels decorative entrances immediately.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab") active.forEach((animation) => animation.cancel());
  });
  // User's explicit stop also cancels the original selector's brief WAAPI animation.
  document.querySelectorAll("input[name=stage]").forEach((input) =>
    input.addEventListener("change", () => {
      if (stopped)
        document
          .querySelector(".stage-answer")
          ?.getAnimations()
          .forEach((animation) => animation.cancel());
    }),
  );
})();
