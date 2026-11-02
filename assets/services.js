"use strict";
(() => {
  const scenes = [...document.querySelectorAll("[data-scene]")];
  if (!scenes.length) return;
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const visible = new Set();
  const introduced = new WeakSet();
  let phoneAnimations = [];
  function sync() {
    const motionAllowed = !media.matches && document.documentElement.dataset.motion !== "off" && document.documentElement.dataset.input !== "keyboard" && !document.hidden;
    scenes.forEach(scene => scene.classList.toggle("scene-playing", visible.has(scene) && motionAllowed));
    const app = scenes.find(scene => scene.dataset.scene === "app");
    if (!motionAllowed) {
      phoneAnimations.forEach(animation => animation.cancel());
      phoneAnimations = [];
    } else if (app && visible.has(app) && !introduced.has(app)) {
      introduced.add(app);
      phoneAnimations = [...app.querySelectorAll(".sample-phone")].map((phone, index) => phone.animate(
        [{ opacity: .82, transform: `translateY(${index ? 14 : 10}px)` }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 760, delay: index ? 90 : 0, easing: "cubic-bezier(.16,1,.3,1)" }
      ));
    }
  }
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => isIntersecting ? visible.add(target) : visible.delete(target));
      sync();
    }, { threshold: .12 });
    scenes.forEach(scene => observer.observe(scene));
  } else {
    scenes.forEach(scene => visible.add(scene));
  }
  media.addEventListener?.("change", sync);
  document.addEventListener("visibilitychange", sync);
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion", "data-input"] });
  sync();
})();
