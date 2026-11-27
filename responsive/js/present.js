/* Presenting control (outside the product UI), shared by both approaches:
   - Look: 1 | 2         switches between /responsive/ and /responsive/approach-2/
   - View: Desktop | Mobile  (M key) — Mobile on a wide window loads this same page in a
     390×844 frame, so the mobile layout is the real one, not a squeezed copy
   - Icons: Green | Orange   (approach 2 only; the two Figma colourways)
   Every choice lives in the URL (?view=mobile&icons=orange), so a shared link opens the same way. */
(function () {
  const qs = new URLSearchParams(location.search);
  if (qs.get("embed") === "1") { document.documentElement.classList.add("is-embed"); return; }
  const view = qs.get("view") === "mobile" ? "mobile" : "desktop";
  const look = /\/approach-2\//.test(location.pathname) ? "2" : "1";
  const icons = qs.get("icons") === "orange" ? "orange" : "green";
  const root = location.pathname.replace(/approach-2\/.*$/, "").replace(/[^/]*$/, "");

  const go = (patch) => {
    const u = new URL(location.href);
    if (patch.look) u.pathname = patch.look === "2" ? root + "approach-2/" : root;
    if (patch.view) { if (patch.view === "mobile") u.searchParams.set("view", "mobile"); else u.searchParams.delete("view"); }
    if (patch.icons) { if (patch.icons === "orange") u.searchParams.set("icons", "orange"); else u.searchParams.delete("icons"); }
    if ((patch.look || look) === "1") u.searchParams.delete("icons");
    location.replace(u.toString());
  };

  const seg = (name, label, opts, cur) => `
    <div class="present__row" role="radiogroup" aria-label="${label}">
      <span class="present__label">${label}</span>
      ${opts.map(([v, t]) => `<button role="radio" aria-checked="${v === cur}" class="${v === cur ? "is-on" : ""}" data-${name}="${v}">${t}</button>`).join("")}
    </div>`;

  const mount = () => {
    if (view === "mobile") {
      document.documentElement.classList.add("is-stage");
      const src = new URL(location.href);
      src.searchParams.delete("view"); src.searchParams.set("embed", "1");
      document.body.className = "";
      document.body.innerHTML = `<div class="stage"><div class="stage__phone"><iframe title="Mobile view" src="${src.toString()}" width="390" height="844"></iframe></div></div>`;
      const phone = document.querySelector(".stage__phone");
      const fit = () => phone.style.setProperty("--fit", Math.min(1, (innerHeight - 150) / 844, (innerWidth - 32) / 390).toFixed(3));
      fit(); addEventListener("resize", fit);
    }
    const bar = document.createElement("div");
    bar.className = "present";
    bar.title = "Prototype controls. M switches view.";
    bar.innerHTML = `<span class="present__chip" aria-hidden="true">View</span>
      ${seg("look", "Look", [["1", "1"], ["2", "2"]], look)}
      ${seg("view", "View", [["desktop", "Desktop"], ["mobile", "Mobile"]], view)}
      ${look === "2" ? seg("icons", "Icons", [["green", "Green"], ["orange", "Orange"]], icons) : ""}`;
    document.body.appendChild(bar);
    document.documentElement.style.setProperty("--present-h", `${bar.offsetHeight}px`);
    bar.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b || b.classList.contains("is-on")) return;
      if (b.dataset.look) go({ look: b.dataset.look });
      if (b.dataset.view) go({ view: b.dataset.view });
      if (b.dataset.icons) go({ icons: b.dataset.icons });
    });
    addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() !== "m" || e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA/.test(document.activeElement?.tagName)) return;
      go({ view: view === "mobile" ? "desktop" : "mobile" });
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
