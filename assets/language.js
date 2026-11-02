"use strict";
(() => {
  const key = "neozuo-language-choice";
  let choice;
  try { choice = localStorage.getItem(key); } catch {}
  document.querySelectorAll(".language-link").forEach(link => {
    link.addEventListener("click", () => {
      try { localStorage.setItem(key, link.hreflang); } catch {}
    });
  });
  // Keep explicit language choices and direct English URLs authoritative.
  if (location.pathname.startsWith("/en/") || choice === "ko") return;
  const routes = { "/": "/en/", "/index.html": "/en/", "/work/pmp.html": "/en/work/pmp.html", "/work/viliv.html": "/en/work/viliv.html", "/work/allclass.html": "/en/work/allclass.html", "/privacy.html": "/en/privacy.html" };
  const destination = routes[location.pathname];
  if (!destination) return;
  if (choice === "en") {
    location.replace(destination + location.search + location.hash);
    return;
  }
  fetch("/geo-country.json", { cache: "no-store" })
    .then(response => response.ok ? response.json() : null)
    .then(data => {
      if (data?.overseas === true) {
        // The visitor may have chosen a language while the request was pending.
        try { if (localStorage.getItem(key)) return; } catch {}
        location.replace(destination + location.search + location.hash);
      }
    }).catch(() => {});
})();
