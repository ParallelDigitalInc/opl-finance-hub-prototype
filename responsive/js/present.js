/* Presenting control: Desktop | Mobile view switch (also the M key).
   Mobile on a wide window loads this same page in a 390×844 frame, so the
   mobile layout is the real one, not a squeezed copy. The choice lives in the
   URL (?view=mobile), so a shared link opens in the same view. */
(function () {
  const qs = new URLSearchParams(location.search);
  if (qs.get("embed") === "1") { document.documentElement.classList.add("is-embed"); return; }
  const view = qs.get("view") === "mobile" ? "mobile" : "desktop";
  const go = (v) => {
    const u = new URL(location.href);
    if (v === "mobile") u.searchParams.set("view", "mobile"); else u.searchParams.delete("view");
    location.replace(u.toString());
  };

  const mount = () => {
    if (view === "mobile") {
      document.documentElement.classList.add("is-stage");
      const src = new URL(location.href);
      src.searchParams.delete("view"); src.searchParams.set("embed", "1");
      document.body.className = "";
      document.body.innerHTML = `<div class="stage"><div class="stage__phone"><iframe title="Mobile view" src="${src.toString()}" width="390" height="844"></iframe></div></div>`;
      const phone = document.querySelector(".stage__phone");
      const fit = () => phone.style.setProperty("--fit", Math.min(1, (innerHeight - 112) / 844, (innerWidth - 32) / 390).toFixed(3));
      fit(); addEventListener("resize", fit);
    }
    const bar = document.createElement("div");
    bar.className = "present";
    bar.setAttribute("role", "radiogroup");
    bar.setAttribute("aria-label", "View");
    bar.innerHTML = `<span class="present__label">View</span>${["desktop", "mobile"].map((v) => `<button role="radio" aria-checked="${v === view}" class="${v === view ? "is-on" : ""}" data-view="${v}">${v === "desktop" ? "Desktop" : "Mobile"}</button>`).join("")}`;
    bar.title = "Switch view: press M";
    document.body.appendChild(bar);
    bar.addEventListener("click", (e) => { const b = e.target.closest("[data-view]"); if (b && b.dataset.view !== view) go(b.dataset.view); });
    addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() !== "m" || e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA/.test(document.activeElement?.tagName)) return;
      go(view === "mobile" ? "desktop" : "mobile");
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
