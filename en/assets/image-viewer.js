"use strict";
(() => {
  const links = [...document.querySelectorAll("[data-image-view]")];
  if (!links.length || typeof HTMLDialogElement === "undefined") return;
  const dialog = document.createElement("dialog");
  dialog.className = "image-viewer";
  dialog.setAttribute("aria-labelledby", "image-viewer-title");
  dialog.innerHTML = `
    <div class="image-viewer-header"><h2 class="image-viewer-title" id="image-viewer-title">View product screen</h2><button class="image-viewer-close" type="button" autofocus>Close</button></div>
    <div class="image-viewer-toolbar" role="group" aria-label="Image zoom">
      <button type="button" data-zoom="out" aria-label="Zoom out" disabled>Zoom out</button>
      <output aria-live="polite" aria-label="Zoom level">100%</output>
      <button type="button" data-zoom="in" aria-label="Zoom in" disabled>Zoom in</button>
      <button type="button" data-zoom="fit" disabled>Fit to screen</button>
    </div>
    <p class="image-viewer-hint" id="image-viewer-hint">Scroll or pan to inspect the screen.</p>
    <div class="image-viewer-viewport" tabindex="0" role="region" aria-label="Enlarged product screen" aria-describedby="image-viewer-hint" aria-busy="true">
      <div class="image-viewer-canvas" hidden><img class="image-viewer-image" alt=""></div>
      <div class="image-viewer-status"><p role="status">Loading screen…</p><button class="image-viewer-retry" type="button" hidden>Try again</button></div>
    </div>
    <div class="image-viewer-footer"><p>Actual product screen · sample data</p><a target="_blank" rel="noopener">Open original<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></a></div>`;
  document.body.append(dialog);
  const title = dialog.querySelector("h2");
  const image = dialog.querySelector("img");
  const original = dialog.querySelector("a");
  const viewport = dialog.querySelector(".image-viewer-viewport");
  const canvas = dialog.querySelector(".image-viewer-canvas");
  const status = dialog.querySelector(".image-viewer-status");
  const message = status.querySelector("p");
  const retry = dialog.querySelector(".image-viewer-retry");
  const zoomOut = dialog.querySelector('[data-zoom="out"]');
  const zoomIn = dialog.querySelector('[data-zoom="in"]');
  const fit = dialog.querySelector('[data-zoom="fit"]');
  const ratio = dialog.querySelector("output");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let opener, animation, area, sourceHref, sourceWidth, sourceHeight;
  let scale = 1, ready = false, fitted = false;
  const stop = () => animation?.cancel();

  function setScale(next, preservePosition = true) {
    const oldWidth = area.width * scale;
    const oldHeight = area.height * scale;
    const centerX = (viewport.scrollLeft + viewport.clientWidth / 2 - Math.max(0, (viewport.clientWidth - oldWidth) / 2)) / oldWidth;
    const centerY = (viewport.scrollTop + viewport.clientHeight / 2) / oldHeight;
    scale = Math.max(.1, Math.min(3, next));
    canvas.style.width = `${area.width * scale}px`;
    canvas.style.height = `${area.height * scale}px`;
    image.style.width = `${sourceWidth * scale}px`;
    image.style.height = `${sourceHeight * scale}px`;
    image.style.left = `${-area.x * scale}px`;
    image.style.top = `${-area.y * scale}px`;
    ratio.textContent = `${Math.round(scale * 100)}%`;
    zoomOut.disabled = scale <= .25;
    zoomIn.disabled = scale >= 3;
    fit.disabled = false;
    if (preservePosition) {
      viewport.scrollLeft = centerX * area.width * scale - viewport.clientWidth / 2 + Math.max(0, (viewport.clientWidth - area.width * scale) / 2);
      viewport.scrollTop = centerY * area.height * scale - viewport.clientHeight / 2;
    } else {
      viewport.scrollTop = 0;
      viewport.scrollLeft = 0;
    }
  }

  function fitImage() {
    if (!ready) return;
    fitted = true;
    setScale(Math.min(1, viewport.clientWidth / area.width, viewport.clientHeight / area.height), false);
  }

  function loaded() {
    if (!dialog.open || ready || !image.naturalWidth) return;
    const requestedDensity = Number(opener.dataset.imageDensity);
    const density = Number.isFinite(requestedDensity) && requestedDensity >= 1 && requestedDensity <= 4 ? requestedDensity : 1;
    // Zoom and crop coordinates use layout pixels; high-density originals retain their detail.
    sourceWidth = image.naturalWidth / density;
    sourceHeight = image.naturalHeight / density;
    const crop = (opener.dataset.imageCrop || "").split(",").map(Number);
    const [x, y, width, height] = crop;
    const valid = crop.length === 4 && crop.every(Number.isFinite) && x >= 0 && y >= 0 && width > 0 && height > 0 && x + width <= sourceWidth && y + height <= sourceHeight;
    area = valid ? { x, y, width, height } : { x:0, y:0, width:sourceWidth, height:sourceHeight };
    ready = true;
    canvas.hidden = false;
    status.hidden = true;
    viewport.setAttribute("aria-busy", "false");
    // Opening must reveal more detail than the inline image, including its focus crop.
    const inline = opener.querySelector(".report-focus") || opener.querySelector("img");
    const desired = Math.ceil(Math.max(1, inline.getBoundingClientRect().width / area.width * 1.15) * 4) / 4;
    const initial = !valid && area.height > area.width && viewport.clientWidth < area.width
      ? Math.min(desired, viewport.clientWidth / area.width)
      : desired;
    setScale(initial, false);
    // Keep the complete image available, but begin at its useful content on narrow screens.
    const focus = (opener.dataset.imageFocus || "").split(",").map(Number);
    if (viewport.clientWidth < 700 && focus.length === 2 && focus.every(Number.isFinite)
      && focus[0] >= area.x && focus[0] <= area.x + area.width
      && focus[1] >= area.y && focus[1] <= area.y + area.height) {
      viewport.scrollLeft = Math.max(0, (focus[0] - area.x) * scale - viewport.clientWidth / 2);
      viewport.scrollTop = Math.max(0, (focus[1] - area.y) * scale - viewport.clientHeight / 2);
    }
  }

  function loadImage() {
    ready = false;
    fitted = false;
    canvas.hidden = true;
    status.hidden = false;
    retry.hidden = true;
    message.textContent = "Loading screen…";
    viewport.setAttribute("aria-busy", "true");
    [zoomIn, zoomOut, fit].forEach(button => { button.disabled = true; });
    image.removeAttribute("src");
    image.src = sourceHref;
    if (image.complete && image.naturalWidth) loaded();
  }

  image.addEventListener("load", loaded);
  image.addEventListener("error", () => {
    if (!dialog.open) return;
    ready = false;
    canvas.hidden = true;
    status.hidden = false;
    viewport.setAttribute("aria-busy", "false");
    message.textContent = "Could not load the screen. Try again or open the original.";
    retry.hidden = false;
  });
  retry.addEventListener("click", loadImage);
  zoomOut.addEventListener("click", () => { fitted = false; setScale(Math.max(.25, Math.ceil(scale * 4 - 1) / 4)); });
  zoomIn.addEventListener("click", () => { fitted = false; setScale(Math.floor(scale * 4 + 1) / 4); });
  fit.addEventListener("click", fitImage);

  links.forEach(link => link.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button) return;
    event.preventDefault();
    opener = link;
    const source = link.querySelector("img");
    title.textContent = link.dataset.imageTitle || source.alt;
    image.alt = source.alt;
    sourceHref = link.href;
    original.href = sourceHref;
    dialog.classList.toggle("image-viewer--portrait", Number(source.getAttribute("height")) > Number(source.getAttribute("width")));
    dialog.showModal();
    document.documentElement.classList.add("image-viewer-open");
    loadImage();
    if (event.detail && !reduce.matches && document.documentElement.dataset.motion !== "off") {
      animation = dialog.animate([{ opacity:.5 }, { opacity:1 }], { duration:180, easing:"cubic-bezier(.16,1,.3,1)" });
    }
  }));
  dialog.querySelector(".image-viewer-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener("close", () => {
    stop();
    document.documentElement.classList.remove("image-viewer-open");
    opener?.focus({ preventScroll:true });
  });
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(() => { if (dialog.open && fitted) fitImage(); }).observe(viewport);
  document.addEventListener("keydown", stop);
  reduce.addEventListener("change", stop);
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });
})();
