"use strict";
(() => {
  const header = document.querySelector(".home-page .nav");
  if (header) {
    let previousScrolled;
    const updateHeader = () => {
      const scrolled = window.scrollY > 16;
      if (scrolled === previousScrolled) return;
      header.dataset.scrolled = String(scrolled);
      previousScrolled = scrolled;
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("pageshow", updateHeader);
    updateHeader();
  }

  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine) and (min-width: 701px)");
  const active = new Set();
  const resets = new Set();
  let stopped = media.matches;
  let keyboard = false;
  const canAnimate = () => !stopped && !media.matches && !keyboard && !document.hidden;
  const stop = () => {
    active.forEach((animation) => animation.cancel());
    document.querySelectorAll(".stage-answer, .demo-panel").forEach((element) =>
      element.getAnimations?.().forEach((animation) => animation.cancel()),
    );
    resets.forEach((reset) => reset());
  };
  const animate = (element, frames, options) => {
    if (!canAnimate() || !element?.animate) return;
    const animation = element.animate(frames, {
      easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards", ...options,
    });
    active.add(animation);
    animation.finished.catch(() => {}).finally(() => active.delete(animation));
  };
  // Preserve each diagram's authored rotation/offset, including mobile variants.
  const settle = (element, delay = 0, duration = 480, distance = 8) => {
    if (!element || !canAnimate()) return;
    const transform = getComputedStyle(element).transform;
    const resting = transform === "none" ? "" : transform;
    animate(element, [
      { opacity: .72, transform: `translateY(${distance}px) ${resting}`.trim() },
      { opacity: 1, transform: `translateY(0) ${resting}`.trim() },
    ], { duration, delay });
  };

  const button = document.createElement("button");
  button.className = "motion-control";
  button.type = "button";
  document.querySelector("[data-motion-slot]")?.append(button);
  function setMotion(off) {
    off = off || media.matches;
    stopped = off;
    button.hidden = media.matches;
    document.documentElement.dataset.motion = off ? "off" : "on";
    button.textContent = off ? "모션 켜기" : "모션 끄기";
    button.setAttribute("aria-pressed", String(off));
    if (off) stop();
  }
  button.addEventListener("click", () => setMotion(!stopped));
  media.addEventListener("change", () => setMotion(media.matches));
  setMotion(stopped);
  document.addEventListener("keydown", () => {
    keyboard = true;
    document.documentElement.dataset.input = "keyboard";
    stop();
  });
  document.addEventListener("pointerdown", () => {
    keyboard = false;
    document.documentElement.dataset.input = "pointer";
  }, { passive: true });
  document.addEventListener("pointermove", (event) => {
    if (keyboard && event.pointerType === "mouse" && (event.movementX || event.movementY)) {
      keyboard = false;
      document.documentElement.dataset.input = "pointer";
    }
  }, { passive: true });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });

  // A short opening sequence: the promise first, then context and the next action.
  settle(document.querySelector(".hero h1"), 0, 620, 10);
  settle(document.querySelector(".hero-copy > p, .detail-heading > p"), 50, 540, 6);
  settle(document.querySelector(".hero-actions"), 100, 480, 6);
  const sculpture = document.querySelector(".brand-sculpture");
  const introduceSculpture = () => {
    if (window.scrollY > 100) return;
    if (sculpture) animate(sculpture, [
      { opacity: .4, transform: "rotate(-5deg) translateY(12px) scale(.99)" },
      { opacity: getComputedStyle(sculpture).opacity, transform: getComputedStyle(sculpture).transform },
    ], { duration: 900 });
  };
  if (sculpture?.complete) introduceSculpture();
  else sculpture?.addEventListener("load", introduceSculpture, { once: true });

  // The N has weight: at most 7px of damped movement, with no idle animation loop.
  const hero = document.querySelector(".home-page .hero");
  const frame = hero?.querySelector(".sculpture-frame");
  if (hero && frame) {
    let x = 0, y = 0, vx = 0, vy = 0, targetX = 0, targetY = 0, raf = 0, previousTime = 0;
    const reset = () => {
      cancelAnimationFrame(raf);
      raf = previousTime = x = y = vx = vy = targetX = targetY = 0;
      frame.style.transform = "";
    };
    resets.add(reset);
    const tick = (time) => {
      if (!canAnimate() || !finePointer.matches) return reset();
      const dt = Math.min((time - previousTime) / 1000 || 1 / 60, 1 / 30);
      previousTime = time;
      vx += ((targetX - x) * 220 - vx * 28) * dt;
      vy += ((targetY - y) * 220 - vy * 28) * dt;
      x += vx * dt;
      y += vy * dt;
      frame.style.transform = `translate3d(${x.toFixed(3)}px,${y.toFixed(3)}px,0)`;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(vx) + Math.abs(vy) < .02) {
        frame.style.transform = targetX || targetY ? `translate3d(${targetX}px,${targetY}px,0)` : "";
        raf = previousTime = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const aim = (nextX, nextY) => {
      if (!canAnimate() || !finePointer.matches) return;
      targetX = nextX;
      targetY = nextY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    hero.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse" || !canAnimate() || !finePointer.matches) return;
      const rect = hero.getBoundingClientRect();
      const clamp = (value) => Math.max(-1, Math.min(1, value));
      aim(clamp((event.clientX - rect.left) / rect.width * 2 - 1) * 7,
        clamp((event.clientY - rect.top) / rect.height * 2 - 1) * 5);
    }, { passive: true });
    hero.addEventListener("pointerleave", () => aim(0, 0));
    finePointer.addEventListener("change", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", reset, { passive: true });
  }

  // Input → output, teacher → student: illustrate the relationship once on arrival.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        const parts = target.querySelectorAll(
          ".demo-panel:not([hidden]) > :not(.transfer-line), .lecture-source, .lecture-outputs > div, .course-side",
        );
        parts.forEach((part, index) => settle(part, Math.min(index * 65, 195), 480, 8));
      });
    }, { threshold: .2 });
    document.querySelectorAll(".pmp-demo, .viliv-visual, .allclass-visual").forEach((figure) => observer.observe(figure));
  }
  document.querySelectorAll(".faq details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (details.open && !details.querySelector("summary").matches(":focus-visible"))
        animate(details.querySelector("p"), [{ opacity: .65 }, { opacity: 1 }], { duration: 160 });
    });
  });
})();
