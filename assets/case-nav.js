"use strict";
(() => {
  const nav = document.querySelector("[data-case-nav]");
  if (!nav) return;
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = [...document.querySelectorAll(".pmp-story .story-section[id]")];
  const narrow = matchMedia("(max-width:700px)");
  let queued = false, active;
  function update() {
    queued = false;
    const threshold = narrow.matches ? Math.max(96, nav.offsetHeight + 32) : 96;
    let section;
    for (const candidate of sections) {
      if (candidate.getBoundingClientRect().top <= threshold) section = candidate;
    }
    const id = section ? (section.dataset.navSection || section.id) : null;
    if (id === active) return;
    active = id;
    links.forEach(link => {
      if (link.getAttribute("href") === `#${id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  addEventListener("scroll", schedule, { passive:true });
  addEventListener("resize", schedule);
  addEventListener("hashchange", schedule);
  addEventListener("load", schedule);
  schedule();
})();
