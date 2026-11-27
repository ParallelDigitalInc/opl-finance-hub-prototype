/* Presenting shell for /explorations/ — the kit-style prototype panel, like /responsive/'s.
   On a wide window the page is shown inside a device mock (a 390×844 phone, or a 1440×900 browser
   window once a desktop exists) with a side panel to switch:
     Approach  F1 · Fresh (built) | C1, C2 · Compiled (next)
     View      Mobile | Desktop        (M key; desktop only where it is built)
   The device is this same page in an iframe (?embed=1), so each layout is the real one.
   On a phone (or with ?bare=1) the page renders on its own, full screen, with no shell.
   Choices live in the URL (?view=desktop), so a shared link opens the same way. */
(function () {
  const qs = new URLSearchParams(location.search);
  if (qs.get("embed") === "1") { document.documentElement.classList.add("is-embed"); return; }
  if (!window.__STAGE) return;


  const APPROACHES = [
    // id, folder, name, sub, built views — Figma Section 2 (172:56553), mobile frames "1", "2", "3"
    { id: "f1", dir: "fresh-1/", name: "Approach 1", sub: "White grid, navy CTA, Recoleta titles", views: ["mobile"] },
    { id: "a2", dir: "approach-2/", name: "Approach 2", sub: "Sky + clouds, mint schemes arch, trust band", views: ["mobile"] },
    { id: "a3", dir: "approach-3/", name: "Approach 3", sub: "Mint wash, dark CTA, tinted loan cards", views: ["mobile"] },
  ];
  const root = location.pathname.replace(/[^/]+\/[^/]*$/, "");   // …/explorations/
  const current = APPROACHES.find((a) => a.dir && location.pathname.includes("/" + a.dir)) || APPROACHES[0];
  const st = { look: current.id, view: qs.get("view") === "desktop" && current.views.includes("desktop") ? "desktop" : "mobile" };
  let collapsed = false; try { collapsed = localStorage.getItem("opl.explorations.panel") === "1"; } catch (_) {}

  const ap = () => APPROACHES.find((a) => a.id === st.look);
  const pagePath = () => root + ap().dir;
  const frameSrc = () => { const u = new URL(pagePath(), location.origin); u.searchParams.set("embed", "1"); return u.toString(); };
  const syncUrl = () => { const u = new URL(pagePath(), location.origin); if (st.view === "desktop") u.searchParams.set("view", "desktop"); history.replaceState(null, "", u.pathname + u.search); };

  const panelHtml = () => {
    const a = ap(), canDesk = a.views.includes("desktop");
    return `
    <div class="pp__head">
      <span class="pp__label pp__headlabel">View <kbd>M</kbd></span>
      <div class="seg pp__headseg" role="radiogroup" aria-label="View">
        <button role="radio" aria-checked="${st.view === "mobile"}" class="${st.view === "mobile" ? "is-on" : ""}" data-view="mobile">Mobile</button>
        <button role="radio" aria-checked="${st.view === "desktop"}" class="${st.view === "desktop" ? "is-on" : ""}" data-view="desktop" ${canDesk ? "" : 'disabled title="Desktop is next"'}>Desktop</button>
      </div>
      <button class="pp__toggle" data-collapse aria-label="${collapsed ? "Show" : "Hide"} prototype panel" aria-expanded="${!collapsed}">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 10l4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
    <div class="pp__body">
      ${canDesk ? "" : `<p class="pp__soon">Desktop for ${a.name} comes next.</p>`}
      <div class="pp__sec">
        <p class="pp__label">Approach <span class="pp__hint">light mode</span></p>
        <div class="pp__list" role="radiogroup" aria-label="Approach">
          ${APPROACHES.map((x) => `<button role="radio" aria-checked="${st.look === x.id}" class="pp__item ${st.look === x.id ? "is-on" : ""}" data-look="${x.id}" ${x.dir ? "" : "disabled"}>
            <span class="pp__swatch pp__swatch--${x.id}" aria-hidden="true"></span><span><b>${x.name}</b><small>${x.dir ? x.sub : "In progress"}</small></span></button>`).join("")}
        </div>
      </div>
      <div class="pp__sec">
        <p class="pp__label">Screens <span class="pp__count">1</span></p>
        <div class="pp__list">
          <button class="pp__item is-on" aria-current="page"><span><b>Finance Hub · Home</b><small>Loans, subsidies, help</small></span></button>
        </div>
      </div>
      <a class="pp__out" href="${(() => { const u = new URL(pagePath(), location.origin); u.searchParams.set("bare", "1"); return u.pathname + u.search; })()}" target="_blank" rel="noopener">Open full screen, responsive<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 2.5h5v5M9.5 2.5l-7 7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></a>
    </div>`;
  };

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
    const stage = document.querySelector(".stage"), area = document.querySelector(".stage__area");
    const frame = document.createElement("iframe");
    frame.title = "Prototype";
    const fit = () => {
      const r = area.getBoundingClientRect();
      const W = st.view === "mobile" ? 406 : 1440, H = st.view === "mobile" ? 860 : 936;
      stage.style.setProperty("--fit", Math.min(1, r.width / W, r.height / H).toFixed(4));
    };
    const place = () => {
      const host = document.querySelector(`.device--${st.view === "mobile" ? "phone" : "desktop"} .device__screen`);
      if (frame.parentNode !== host) host.appendChild(frame);
      frame.width = st.view === "mobile" ? 390 : 1440;
      frame.height = st.view === "mobile" ? 844 : 900;
      fit();
    };
    const load = () => { frame.src = frameSrc(); };
    const repaint = () => { document.querySelector(".pp").innerHTML = panelHtml(); };
    const set = (patch) => {
      const changed = Object.keys(patch).some((k) => patch[k] !== st[k]);
      if (!changed) return;
      Object.assign(st, patch);
      if (!ap().views.includes(st.view)) st.view = "mobile";
      stage.dataset.view = st.view;
      stage.classList.add("is-switching"); setTimeout(() => stage.classList.remove("is-switching"), 420);
      syncUrl(); repaint(); place(); load();
    };
    place(); load();
    addEventListener("resize", fit);
    new ResizeObserver(fit).observe(area);

    document.querySelector(".pp").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b || b.disabled) return;
      if (b.dataset.collapse !== undefined) {
        collapsed = !collapsed; stage.classList.toggle("is-collapsed", collapsed);
        fit(); setTimeout(fit, 340);
        try { localStorage.setItem("opl.explorations.panel", collapsed ? "1" : "0"); } catch (_) {}
        return repaint();
      }
      if (b.dataset.view) set({ view: b.dataset.view });
      if (b.dataset.look) set({ look: b.dataset.look });
    });
    const key = (e) => {
      if (e.key.toLowerCase() !== "m" || e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA/.test(e.target.tagName || "")) return;
      if (ap().views.includes("desktop")) set({ view: st.view === "mobile" ? "desktop" : "mobile" });
    };
    addEventListener("keydown", key);
    frame.addEventListener("load", () => { try { frame.contentWindow.addEventListener("keydown", key); } catch (_) {} });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
