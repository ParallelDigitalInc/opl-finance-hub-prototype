/* Presenting shell (outside the product UI), shared by both approaches — modelled on the kit's
   prototype panel. On a wide window the page is shown inside a device mock (a 1440×900 browser
   window, or a 390×844 phone) with a side panel to switch:
     Look   1 · Teal | 2 · Light wash | 3A · Mint grid | 3B · Dark teal
          (/responsive/, /responsive/approach-2/, /responsive/approach-3/ [?theme=b])
     View   Desktop | Mobile            (M key)
     Icons  Green | Orange              (approach 2 only; the two Figma colourways)
   The device is this same page in an iframe (?embed=1), so each layout is the real one.
   On a phone (or with ?bare=1) the page renders on its own, full screen, with no shell.
   Choices live in the URL (?view=mobile&icons=orange), so a shared link opens the same way. */
(function () {
  const qs = new URLSearchParams(location.search);
  if (qs.get("embed") === "1") { document.documentElement.classList.add("is-embed"); return; }
  if (!window.__STAGE) return;

  const VERSION = "v0.18.0";
  const root = location.pathname.replace(/approach-\d\/.*$/, "").replace(/[^/]*$/, "");
  const st = {
    look: /\/approach-3\//.test(location.pathname) ? (qs.get("theme") === "b" ? "3b" : "3a") : /\/approach-2\//.test(location.pathname) ? "2" : "1",
    view: qs.get("view") === "mobile" ? "mobile" : "desktop",
    icons: qs.get("icons") === "orange" ? "orange" : "green",
  };
  let collapsed = false; try { collapsed = localStorage.getItem("opl.responsive.panel") === "1"; } catch (_) {}

  const pagePath = () => (st.look === "2" ? root + "approach-2/" : st.look.startsWith("3") ? root + "approach-3/" : root);
  const lookParams = (u) => {
    if (st.look === "2" && st.icons === "orange") u.searchParams.set("icons", "orange");
    if (st.look === "3b") u.searchParams.set("theme", "b");
    return u;
  };
  const frameSrc = () => {
    const u = new URL(pagePath(), location.origin);
    u.searchParams.set("embed", "1");
    return lookParams(u).toString();
  };
  const syncUrl = () => {
    const u = new URL(pagePath(), location.origin);
    if (st.view === "mobile") u.searchParams.set("view", "mobile");
    lookParams(u);
    history.replaceState(null, "", u.pathname + u.search);
  };

  const seg = (name, opts) => `<div class="seg" role="radiogroup" aria-label="${name}">${opts.map(([v, t]) =>
    `<button role="radio" aria-checked="${st[name] === v}" class="${st[name] === v ? "is-on" : ""}" data-${name}="${v}">${t}</button>`).join("")}</div>`;
  const looks = [
    ["1", "Teal", "Deep teal hero, sage cards"],
    ["2", "Light wash", "White, teal + peach wash"],
    ["3a", "Mint grid", "Mint grid hero, lavender accents"],
    ["3b", "Dark teal", "Dark teal hero, lavender button"],
  ];
  const READY = { "1": true, "2": true, "3a": false, "3b": false };   // flip when approach-3/ ships

  const panelHtml = () => `
    <div class="pp__head">
      <p class="pp__title">Loans · Overview</p>
      <span class="pp__ver">${VERSION}</span>
      <button class="pp__toggle" data-collapse aria-label="${collapsed ? "Show" : "Hide"} prototype panel" aria-expanded="${!collapsed}">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 10l4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
    <div class="pp__body">
      <div class="pp__row"><span class="pp__label">View <kbd>M</kbd></span>${seg("view", [["mobile", "Mobile"], ["desktop", "Desktop"]])}</div>
      <div class="pp__sec">
        <p class="pp__label">Look <span class="pp__hint">light mode</span></p>
        <div class="pp__list" role="radiogroup" aria-label="Look">
          ${looks.map(([v, name, sub]) => `<button role="radio" aria-checked="${st.look === v}" class="pp__item ${st.look === v ? "is-on" : ""}" data-look="${v}" ${READY[v] ? "" : "disabled"}>
            <span class="pp__swatch pp__swatch--${v}" aria-hidden="true"></span><span><b>${v.toUpperCase()} · ${name}</b><small>${READY[v] ? sub : "In progress"}</small></span></button>`).join("")}
        </div>
      </div>
      ${st.look === "2" ? `<div class="pp__row"><span class="pp__label">Icons</span>${seg("icons", [["green", "Green"], ["orange", "Orange"]])}</div>` : ""}
      <div class="pp__sec">
        <p class="pp__label">Screens <span class="pp__count">1 of 2</span></p>
        <div class="pp__list">
          <button class="pp__item is-on" aria-current="page"><span><b>Loans · Overview</b><small>${st.look === "1" ? "Mobile + desktop" : "Finance home on mobile"}</small></span></button>
          <button class="pp__item" disabled><span><b>Loan application</b><small>Lender verification · next</small></span></button>
        </div>
      </div>
      <a class="pp__out" href="${(() => { const u = lookParams(new URL(pagePath(), location.origin)); u.searchParams.set("bare", "1"); return u.pathname + u.search; })()}" target="_blank" rel="noopener">Open full screen, responsive<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 2.5h5v5M9.5 2.5l-7 7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></a>
    </div>`;

  const mount = () => {
    document.documentElement.classList.add("is-stage");
    document.body.className = "";
    document.body.innerHTML = `
      <div class="stage ${collapsed ? "is-collapsed" : ""}" data-view="${st.view}">
        <div class="stage__area">
          <div class="device device--desktop"><div class="device__inner">
            <div class="device__bar"><span class="device__dots"><i></i><i></i><i></i></span><span class="device__url">OPL Finance Hub</span></div>
            <div class="device__screen"></div>
          </div></div>
          <div class="device device--phone"><div class="device__inner"><div class="device__screen"></div></div></div>
        </div>
        <aside class="pp" aria-label="Prototype controls">${panelHtml()}</aside>
      </div>`;
    const stage = document.querySelector(".stage");
    const area = document.querySelector(".stage__area");
    const frame = document.createElement("iframe");
    frame.title = "Prototype";
    const place = () => {
      const host = document.querySelector(`.device--${st.view === "mobile" ? "phone" : "desktop"} .device__screen`);
      if (frame.parentNode !== host) host.appendChild(frame);
      frame.width = st.view === "mobile" ? 390 : 1440;
      frame.height = st.view === "mobile" ? 844 : 900;
      fit();
    };
    const load = () => { frame.src = frameSrc(); };
    const fit = () => {
      const r = area.getBoundingClientRect();
      const W = st.view === "mobile" ? 390 + 16 : 1440, H = st.view === "mobile" ? 844 + 16 : 900 + 36;
      stage.style.setProperty("--fit", Math.min(1, r.width / W, r.height / H).toFixed(4));
    };
    const repaint = () => { document.querySelector(".pp").innerHTML = panelHtml(); };
    const set = (patch) => {
      const lookChanged = patch.look && patch.look !== st.look, iconsChanged = patch.icons && patch.icons !== st.icons;
      const viewChanged = patch.view && patch.view !== st.view;
      Object.assign(st, patch);
      stage.dataset.view = st.view;
      if (viewChanged) { stage.classList.add("is-switching"); setTimeout(() => stage.classList.remove("is-switching"), 420); }
      syncUrl(); repaint(); place();
      if (lookChanged || iconsChanged || viewChanged) load();
    };
    place(); load();
    addEventListener("resize", fit);
    new ResizeObserver(fit).observe(area);

    document.querySelector(".pp").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b || b.disabled) return;
      if (b.dataset.collapse !== undefined) {
        collapsed = !collapsed; stage.classList.toggle("is-collapsed", collapsed);
        fit(); setTimeout(fit, 340);
        try { localStorage.setItem("opl.responsive.panel", collapsed ? "1" : "0"); } catch (_) {}
        return repaint();
      }
      if (b.dataset.view) set({ view: b.dataset.view });
      if (b.dataset.look) set({ look: b.dataset.look });
      if (b.dataset.icons) set({ icons: b.dataset.icons });
    });
    const key = (e) => {
      if (e.key.toLowerCase() !== "m" || e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA/.test((e.target.tagName || ""))) return;
      set({ view: st.view === "mobile" ? "desktop" : "mobile" });
    };
    addEventListener("keydown", key);
    frame.addEventListener("load", () => { try { frame.contentWindow.addEventListener("keydown", key); } catch (_) {} });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
