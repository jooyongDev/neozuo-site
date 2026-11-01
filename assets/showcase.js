"use strict";
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll("[data-pmp-demo]").forEach((demo) => {
    const buttons = [...demo.querySelectorAll("[data-scene]")];
    const panels = [...demo.querySelectorAll(".demo-panel")];
    let activeAnimation;
    buttons.forEach((button) => {
      button.disabled = false;
      button.addEventListener("click", (event) => {
        if (button.getAttribute("aria-pressed") === "true") return;
        activeAnimation?.cancel();
        const panel = panels.find((item) => item.id === button.dataset.scene);
        buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        panels.forEach((item) => { item.hidden = item !== panel; });
        if (event.detail && !reduce.matches && document.documentElement.dataset.motion !== "off") {
          activeAnimation = panel.animate([
            { opacity: .4, transform: "translateY(6px)" },
            { opacity: 1, transform: "translateY(0)" },
          ], { duration: 220, easing: "cubic-bezier(.16,1,.3,1)" });
        }
      });
    });
    const stop = () => activeAnimation?.cancel();
    reduce.addEventListener("change", stop);
    document.querySelector(".motion-control")?.addEventListener("click", stop);
    document.addEventListener("keydown", (event) => { if (event.key === "Tab") stop(); });
  });
})();
