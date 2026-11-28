/* Presenting shell for /explorations/ — the kit-style prototype panel, like /responsive/'s.
   On a wide window the page is shown inside a device mock (a 390×844 phone, or a 1440×900 browser
   window once a desktop exists) with a side panel to switch:
     Approach  F1, A2, A3 · Fresh | C1, C2 · Older directions, cleaned up
     View      Mobile | Desktop        (M key; desktop only where it is built)
   The device is this same page in an iframe (?embed=1), so each layout is the real one.
   On a phone (or with ?bare=1) the page renders on its own, full screen, with no shell.
   Choices live in the URL (?view=desktop), so a shared link opens the same way. */
(function () {
  const qs = new URLSearchParams(location.search);
  if (qs.get("embed") === "1") { document.documentElement.classList.add("is-embed"); return; }

  const APPROACHES = [
    // id, folder, name, sub, built views — Figma Section 2 (172:56553), mobile frames "1", "2", "3"
    { id: "f1", group: "new", dir: "fresh-1/", name: "Vanilla Sprinkles", sub: "White grid, navy CTA, Recoleta titles", views: ["mobile"] },
    { id: "a2", group: "new", dir: "approach-2/", name: "Sky", sub: "Sky and clouds, mint schemes arch, trust band", views: ["mobile"] },
    { id: "a3", group: "new", dir: "approach-3/", name: "Fresh Mint", sub: "Mint wash, dark CTA, tinted loan cards", views: ["mobile"] },
    // Figma "Old Cleaned Up" (233:61391): the earlier directions, cleaned up — frames "1" (172:56049) and "2" (172:55627)
    { id: "c1", group: "old", dir: "cleaned-1/", name: "Gradient", sub: "Loans page, mint gradient panel, teal CTA", views: ["mobile"] },
    { id: "c2", group: "old", dir: "cleaned-2/", name: "Mint Grid", sub: "Mint grid hero, lilac icons and subsidies", views: ["mobile"] },
  ];
  // Shreya's labels: the three new approaches, then the two older ones, cleaned up
  const GROUPS = [{ id: "new", label: "New approaches" }, { id: "old", label: "Clean up · old" }];
  const root = location.pathname.replace(/[^/]+\/[^/]*$/, "");   // …/explorations/
  const current = APPROACHES.find((a) => a.dir && location.pathname.includes("/" + a.dir)) || APPROACHES[0];
  const thumb = (x) => `${root}assets/thumbs/${x.id}.webp`;   // top of each frame (status bar, hero, tiles), 40x54 @3x

  /* Full screen (?bare=1, or a phone): no panel, the page runs edge to edge. A hairline handle on the right edge
     opens a slim tray of the approaches; on a keyboard, 1-5 jump straight to one and [ ] step through. The handle
     shows for a moment on load, then only when the pointer moves (on touch screens it stays faintly visible). */
  /* Phones (narrower than 900px, so no panel): a small menu icon just before the page title opens a compact
     dropdown of the approaches, grouped as in the panel. Nothing floats over the design; the icon sits in the header
     row like a native control. (Laptops in full screen keep the right-edge handle and the number keys.) */
  const phoneMenu = () => {
    const href = (x) => `${root}${x.dir}?bare=1${location.hash}`;
    const title = document.querySelector(".top__title");
    if (!title) return quick();
    document.documentElement.classList.add("has-qm");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "qm__btn";
    btn.setAttribute("aria-label", "Switch approach");
    btn.setAttribute("aria-haspopup", "menu");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5.5h14M3 10h14M3 14.5h14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    btn.style.color = getComputedStyle(title).color;
    const back = document.querySelector(".top__back");   // Gradient: the menu takes the (inert) back arrow's place
    if (back) back.before(btn);
    else {
      const lead = document.createElement("div");
      lead.className = "qm__lead";
      title.before(lead); lead.append(btn, title);
    }
    const menu = document.createElement("div");
    menu.className = "qm";
    menu.hidden = true;
    menu.innerHTML = `
      <div class="qm__scrim" data-qm-close></div>
      <div class="qm__panel" role="menu" aria-label="Approaches">
        ${GROUPS.map((g) => `<p class="qm__label">${g.label}</p>
        ${APPROACHES.filter((x) => x.group === g.id).map((x) => `<a class="qm__item ${x === current ? "is-on" : ""}" role="menuitem" href="${href(x)}" ${x === current ? 'aria-current="page"' : ""} data-i="${APPROACHES.indexOf(x)}">
          <img src="${thumb(x)}" alt="" width="28" height="36"><span>${x.name}</span>${x === current ? '<svg class="qm__check" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ""}</a>`).join("")}`).join("")}
      </div>`;
    document.body.appendChild(menu);
    const panel = menu.querySelector(".qm__panel");
    let open = false;
    const set = (on) => {
      if (on === open) return;
      open = on; btn.setAttribute("aria-expanded", on);
      if (on) {
        const r = btn.getBoundingClientRect();
        panel.style.top = `${Math.round(r.bottom + 6)}px`;
        panel.style.left = `${Math.max(8, Math.round(r.left - 6))}px`;
        menu.hidden = false;
        requestAnimationFrame(() => menu.classList.add("is-open"));
      } else {
        menu.classList.remove("is-open");
        setTimeout(() => { if (!open) menu.hidden = true; }, 200);
      }
    };
    btn.addEventListener("click", (e) => { e.stopPropagation(); set(!open); });
    menu.addEventListener("click", (e) => {
      if (e.target.closest("[data-qm-close]")) return set(false);
      const a = e.target.closest(".qm__item"); if (!a) return;
      e.preventDefault();
      const x = APPROACHES[+a.dataset.i];
      if (x === current) return set(false);
      document.documentElement.classList.add("qs-leaving");
      setTimeout(() => { location.href = href(x); }, 160);
    });
    addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
    addEventListener("scroll", () => set(false), { passive: true });
    addEventListener("pageshow", () => document.documentElement.classList.remove("qs-leaving"));
  };

  const quick = () => {
    const href = (x) => `${root}${x.dir}?bare=1${location.hash}`;
    const el = document.createElement("div");
    el.className = "qs is-awake";
    el.innerHTML = `
      <button class="qs__handle" type="button" aria-label="Switch approach" aria-expanded="false"><i></i></button>
      <nav class="qs__tray" aria-label="Approaches">
        ${APPROACHES.map((x, i) => `${i && x.group !== APPROACHES[i - 1].group ? '<hr class="qs__sep">' : ""}<a class="qs__item ${x === current ? "is-on" : ""}" href="${href(x)}" ${x === current ? 'aria-current="page"' : ""} data-i="${i}">
          <img src="${thumb(x)}" alt="" width="32" height="41"><kbd aria-hidden="true">${i + 1}</kbd>
          <span class="qs__tip"><small>${GROUPS.find((g) => g.id === x.group).label}</small><b>${x.name}</b></span></a>`).join("")}
      </nav>`;
    document.body.appendChild(el);
    const handle = el.querySelector(".qs__handle");
    let sleep = null;
    const wake = (ms = 2500) => { el.classList.add("is-awake"); clearTimeout(sleep); sleep = setTimeout(() => el.classList.remove("is-awake"), ms); };
    const open = (on) => { el.classList.toggle("is-open", on); handle.setAttribute("aria-expanded", on); if (on) wake(); };
    const go = (x) => {
      if (!x || x === current) return open(false);
      document.documentElement.classList.add("qs-leaving");
      setTimeout(() => { location.href = href(x); }, 160);
    };
    wake(3200);
    handle.addEventListener("click", (e) => { e.stopPropagation(); open(!el.classList.contains("is-open")); });
    el.querySelector(".qs__tray").addEventListener("click", (e) => {
      const a = e.target.closest(".qs__item"); if (!a) return;
      e.preventDefault(); go(APPROACHES[+a.dataset.i]);
    });
    document.addEventListener("click", (e) => { if (!el.contains(e.target)) open(false); });
    addEventListener("mousemove", (e) => { if (e.clientX > innerWidth - 120) wake(); }, { passive: true });
    addEventListener("keydown", (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName || "") || e.target.isContentEditable) return;
      const i = APPROACHES.indexOf(current);
      if (/^[1-9]$/.test(e.key)) go(APPROACHES[+e.key - 1]);
      else if (e.key === "]") go(APPROACHES[(i + 1) % APPROACHES.length]);
      else if (e.key === "[") go(APPROACHES[(i - 1 + APPROACHES.length) % APPROACHES.length]);
      else if (e.key === "Escape") open(false);
    });
    addEventListener("pageshow", () => document.documentElement.classList.remove("qs-leaving"));   // back/forward cache
  };
  if (!window.__STAGE) {
    const start = () => (matchMedia("(max-width: 899px)").matches ? phoneMenu() : quick());
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
    return;
  }
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
      ${GROUPS.map((g) => `
      <div class="pp__sec">
        <p class="pp__label">${g.label}</p>
        <div class="pp__list" role="radiogroup" aria-label="${g.label}">
          ${APPROACHES.filter((x) => x.group === g.id).map((x) => `<button role="radio" aria-checked="${st.look === x.id}" class="pp__item pp__item--approach ${st.look === x.id ? "is-on" : ""}" data-look="${x.id}" title="${x.sub}" ${x.dir ? "" : "disabled"}>
            <img class="pp__thumb" src="${thumb(x)}" alt="" width="28" height="36"><b>${x.name}</b><kbd class="pp__key" aria-hidden="true">${APPROACHES.indexOf(x) + 1}</kbd></button>`).join("")}
        </div>
      </div>`).join("")}
      <div class="pp__sec">
        <p class="pp__label">Screens <span class="pp__count">1</span></p>
        <div class="pp__list">
          <button class="pp__item is-on" aria-current="page"><span><b>Finance Hub · Home</b><small>Loans, subsidies, help</small></span></button>
        </div>
      </div>
      <a class="pp__out" href="${(() => { const u = new URL(pagePath(), location.origin); u.searchParams.set("bare", "1"); return u.pathname + u.search; })()}" target="_blank" rel="noopener">Open full screen<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 2.5h5v5M9.5 2.5l-7 7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></a>
      <p class="pp__note">Number keys switch approaches. Full screen keeps a switcher on the right edge.</p>
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
      if (/^[1-9]$/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey && !/INPUT|TEXTAREA/.test(e.target.tagName || "")) {
        const x = APPROACHES[+e.key - 1]; if (x) set({ look: x.id }); return;
      }
      if (e.key.toLowerCase() !== "m" || e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA/.test(e.target.tagName || "")) return;
      if (ap().views.includes("desktop")) set({ view: st.view === "mobile" ? "desktop" : "mobile" });
    };
    addEventListener("keydown", key);
    frame.addEventListener("load", () => { try { frame.contentWindow.addEventListener("keydown", key); } catch (_) {} });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
