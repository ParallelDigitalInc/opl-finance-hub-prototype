/* ==========================================================================
   Prototype shell — router (push/pop pages), device scaling, variant panel.
   Navigation: OPL.go(name) pushes a page (slides in from the right) and a
   browser history entry. OPL.back() (every in-app Back / Close) goes UP, not to
   the last page seen: see OPL.parents. The browser's own back button still pops history.
   Variant changes re-render the current page in place.
   Device: #device=desktop swaps the phone for a 1440-wide browser window and renders
   OPL.dscreens (js/desktop/*, a separate bundle fetched on first switch). The screen
   name and its params carry over, so the same state opens in either view.
   ========================================================================== */
(function () {
  const screenEl = document.getElementById("screen");
  if (!screenEl) { OPL.markRevealed && OPL.markRevealed(); return; }   // library page: no router
  const panelEl = document.getElementById("panel");
  const wrap = document.querySelector(".device-wrap");
  let currentPage = null;
  let depth = 0;

  /* ---- device ------------------------------------------------------------ */
  OPL.dscreens = OPL.dscreens || {};
  // Mobile screens whose desktop home is another screen (desktop has no Finance Home:
  // the sidebar opens straight on Loans).
  OPL.dalias = { home: "loans-overview" };
  const isDesktop = () => OPL.state.get().device === "desktop" && window.innerWidth > 500;
  OPL.isDesktop = isDesktop;
  const dName = (name) => (OPL.dscreens[name] ? name : OPL.dscreens[OPL.dalias[name]] ? OPL.dalias[name] : null);
  // On desktop a mobile-only screen still opens: it lands on the "not designed for desktop yet"
  // page (OPL.dscreens.__missing) with a one-click switch to mobile, instead of a dead link.
  OPL.hasScreen = (name) => (isDesktop() ? !!dName(name) || !!OPL.screens[name] : !!OPL.screens[name]);

  let dLoading = null;
  function loadDesktop() {
    if (OPL.dReady) return Promise.resolve();
    if (dLoading) return dLoading;
    dLoading = new Promise((resolve, reject) => {
      const v = OPL.VERSION;
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = `dist/desktop.css?v=${v}`;
      const cssReady = new Promise((r) => { css.onload = css.onerror = r; });
      document.head.appendChild(css);
      const js = document.createElement("script");
      js.src = `dist/desktop.js?v=${v}`;
      js.onload = () => cssReady.then(() => { OPL.dReady = true; resolve(); });
      js.onerror = reject;
      document.head.appendChild(js);
    });
    return dLoading;
  }

  const screenName = () => {
    const st = OPL.state.get();
    return OPL.screens[st.screen] || OPL.dscreens[st.screen] ? st.screen : "home";
  };
  // The implementation that renders `name` in the current device
  const impl = (name) => {
    if (isDesktop()) return OPL.dscreens[dName(name)] || OPL.dscreens.__missing;
    return OPL.screens[name] || OPL.screens.home;
  };
  const hashFor = (patch) => {
    const next = { ...OPL.state.get(), ...patch };
    Object.keys(next).forEach((k) => (next[k] == null || (k === "screen" && next[k] === "home")) && delete next[k]);
    return "#" + new URLSearchParams(next).toString();
  };

  // replace: swap the current history entry (hand-offs like NeSL → loader → result,
  // so Back doesn't land on a page that only makes sense once)
  OPL.go = (name, params = {}, { replace = false } = {}) => {
    if (!OPL.hasScreen(name)) return;
    const next = hashFor({ screen: name, ...params });
    if (next === location.hash || (name === screenName() && !Object.keys(params).length)) return;
    const trail = trailNow().slice(0, depth);
    if (replace) history.replaceState({ depth, trail: [...trail, name] }, "", next);
    else { history.pushState({ depth: depth + 1, trail: [...trail, screenName(), name] }, "", next); depth++; }
    render({ dir: "forward" });
  };
  /* Back = up. Each screen lists the screens it sits under, most usual first. Back returns
     to the nearest of those on the path you took (so Subsidy details goes back to Explore
     if you came from Explore, to Home if you came from Home), skipping tab switches, panel
     jumps and one-off hand-offs in between. If none is on the path (opened from the panel
     or a link), it lands on the first one. Bottom-nav tabs sit under the section's Overview. */
  OPL.parents = {
    "loans-overview": ["home"],
    "loan-offers": ["loans-overview", "home"],
    applications: ["loans-overview", "home"],
    "compare-loans": ["loan-offers"],
    application: ["applications", "loans-overview", "home"],
    kfs: ["application"],
    nesl: ["kfs", "application"],
    "subsidies-overview": ["home"],
    "subsidies-explore": ["subsidies-overview"],
    "subsidy-detail": ["subsidies-explore", "subsidies-overview", "home"],
    "subsidy-estimate": ["subsidy-detail"],
    "subsidy-estimate-result": ["subsidy-detail"],
  };
  // Prototype-wide params that survive a jump up; screen state (sheets, steps, presets) doesn't
  const KEEP = ["app", "device", "panel", "motion", "hotspots", "frame"];
  const trailNow = () => (history.state && history.state.trail) || [];
  OPL.back = () => {
    const cur = screenName();
    // Desktop has no Finance Home: its root is Loans overview
    const ups = (OPL.parents[cur] || ["home"]).map((n) => (isDesktop() && n === "home" ? "loans-overview" : n));
    if (cur === "home" || (isDesktop() && cur === "loans-overview")) return;
    const trail = trailNow();
    for (let i = depth - 1; i >= 0; i--) if (ups.includes(trail[i])) return history.go(i - depth);
    const parent = ups[0];
    const st = OPL.state.get(), next = { screen: parent === "home" ? null : parent };
    KEEP.forEach((k) => st[k] != null && (next[k] = st[k]));
    const hash = "#" + new URLSearchParams(Object.entries(next).filter(([, v]) => v != null)).toString();
    history.replaceState({ depth, trail: [...trail.slice(0, depth), parent] }, "", hash);
    render({ dir: "back" });
  };

  function render({ dir } = {}) {
    const st = OPL.state.get();
    const name = screenName();
    const device = isDesktop() ? "desktop" : "mobile";
    const root = document.documentElement;
    root.dataset.hotspots = st.hotspots || "on";
    root.dataset.frame = st.frame || "on";
    if (root.dataset.device !== device) { root.dataset.device = device; fit(); }
    if (device === "desktop" && !OPL.dReady) {
      loadDesktop().then(() => { render({ dir }); fit(); }, () => OPL.state.set({ device: null }));
      return;
    }
    const s = impl(name);

    // Same screen (variant / panel change): re-render on a fresh element so listeners
    // bound by the previous render are dropped (no double handlers).
    if (currentPage && currentPage.dataset.screen === name && currentPage.dataset.device === device && !dir) {
      const fresh = document.createElement("div");
      fresh.className = currentPage.className.replace(/\b(is-push-in|is-pop-in|is-entering)\b/g, "").trim();
      fresh.dataset.screen = name;
      fresh.dataset.device = device;
      const scroll = currentPage.querySelector(".scroller")?.scrollTop || 0;
      currentPage.replaceWith(fresh);
      currentPage = fresh;
      if (s.leave) s.leave();
      s.render(fresh);
      const sc = fresh.querySelector(".scroller"); if (sc) sc.scrollTop = scroll;
      return renderPanel(name);
    }

    // Clean up the outgoing screen BEFORE rendering: when both pages are the same screen
    // (e.g. application → application), a later leave() would cancel the new page's timers.
    const old = currentPage;
    if (old) {
      const reg = old.dataset.device === "desktop" ? OPL.dscreens : OPL.screens;
      const leaving = reg[old.dataset.screen] || (old.dataset.device === "desktop" && OPL.dscreens[OPL.dalias[old.dataset.screen]]);
      if (leaving && leaving.leave) leaving.leave();
    }

    const page = document.createElement("div");
    page.className = "page";
    page.dataset.screen = name;
    page.dataset.device = device;
    screenEl.appendChild(page);
    s.render(page);

    currentPage = page;
    if (old) {
      // Desktop: the shell (sidebar, top bar, tabs) is identical on every page, so swap
      // instantly and let only the content area fade up (css/desktop/shell.css).
      if (device === "desktop" || old.dataset.device !== device) {
        old.remove();
        if (dir && old.dataset.device === device && !OPL.fx.motionOff()) page.classList.add("is-d-in");
      } else if (dir && !OPL.fx.motionOff()) {
        const [inC, outC] = dir === "back" ? ["is-pop-in", "is-pop-out"] : ["is-push-in", "is-push-out"];
        page.classList.add(inC);
        old.classList.add(outC);
        OPL.fx.navMorph(old, page, dir);
        old.style.pointerEvents = "none";
        setTimeout(() => { old.remove(); page.classList.remove(inC); }, 440);
      } else {
        old.remove();
      }
    }
    renderPanel(name);
  }

  /* ---- fit the device to the viewport on a laptop/projector ------------- */
  // Desktop: a 1440-wide browser window, scaled to the space left of the panel; its
  // height grows to fill the stage so it reads as a real window, not a fixed artboard.
  const D_W = 1440, D_MIN_H = 760;
  function fit() {
    wrap.style.transform = ""; wrap.style.margin = ""; wrap.style.width = ""; wrap.style.height = "";
    screenEl.style.height = "";
    if (window.innerWidth <= 500) return;
    if (document.documentElement.dataset.device === "desktop") {
      // the collapsed panel is a pinned pill (position: fixed), so it takes no room
      const panelW = panelEl && getComputedStyle(panelEl).display !== "none" && !panelEl.classList.contains("is-collapsed") && window.innerWidth > 1000 ? panelEl.offsetWidth + 32 : 0;
      const chrome = wrap.offsetHeight - screenEl.offsetHeight;          // browser bar
      const availW = window.innerWidth - 48 - panelW;
      const availH = window.innerHeight - 48;
      const s = Math.min(1, availW / D_W);
      const h = Math.max(D_MIN_H, Math.floor((availH - chrome * s) / s));
      screenEl.style.height = `${h}px`;
      const fullH = h + chrome;
      // Reserve the scaled box in layout so the panel sits right next to it.
      wrap.style.width = `${D_W * s}px`;
      wrap.style.height = `${fullH * s}px`;
      wrap.style.transform = s < 1 ? `scale(${s})` : "";
      wrap.style.transformOrigin = "top left";
      wrap.style.visibility = "visible";
      return;
    }
    wrap.style.transformOrigin = "";
    wrap.style.visibility = "visible";
    const h = wrap.offsetHeight, avail = window.innerHeight - 48;
    const s = Math.min(1, avail / h);
    wrap.style.transform = s < 1 ? `scale(${s})` : "";
    wrap.style.margin = s < 1 ? `${(-h * (1 - s)) / 2}px 0` : "";
  }

  /* ---- panel ------------------------------------------------------------ */
  function seg(groupId, options, current) {
    return `<div class="seg" data-group="${groupId}">${options
      .map((o) => `<button data-value="${o.value}" class="${o.value === current ? "is-on" : ""}">${o.label}</button>`)
      .join("")}</div>`;
  }

  function renderPanel(name) {
    if (!panelEl) return;
    const desk = isDesktop();
    const reg = desk ? OPL.dvariants?.[dName(name)] : OPL.variants[name];
    const st = OPL.state.get();
    const v = reg ? (desk ? OPL.dvariantValues(dName(name)) : OPL.variantValues(name)) : {};
    const activePreset = reg?.presets.find((p) => Object.entries(p.set).every(([k, val]) => v[k] === val));
    const scr = impl(name);
    const figmaNode = activePreset?.figma || Object.values(scr.figma || {})[0];
    const list = desk ? Object.entries(OPL.dscreens).filter(([id]) => !id.startsWith("__")) : Object.entries(OPL.screens);
    const active = desk ? dName(name) : name;

    const closed = panelClosed();
    panelEl.classList.toggle("is-collapsed", closed);

    // Screens, grouped by flow; the flow you're in stays open
    const flowOf = (id) => (/^subsid/.test(id) ? "subsidies" : "loans");
    const FLOWS = [["loans", "Finance hub & loans"], ["subsidies", "Subsidies"]];
    const screens = list;                               // desktop view lists only the screens built for desktop
    const flows = FLOWS.map(([fid, flabel]) => {
      const fl = screens.filter(([id]) => flowOf(id) === fid);
      if (!fl.length) return "";
      const open = groupOpen(`flow-${fid}`, fid === flowOf(active));
      return `
        <div class="panel__flow ${open ? "" : "is-shut"}" data-pg="flow-${fid}">
          <button class="panel__flow-head" data-pg-toggle aria-expanded="${open}"><span>${flabel}</span><small>${fl.length}</small>${CHEV}</button>
          <div class="panel__gbody"><div class="panel__ginner"><div class="presets">${fl
            .map(([id, sc]) => `<button class="preset ${id === active ? "is-on" : ""}" data-screen="${id}">${sc.title}</button>`)
            .join("")}</div></div></div>
        </div>`;
    }).join("");
    const toggles = reg ? reg.groups.filter((g) => g.options.length > 1 && !g.hidden) : [];

    panelEl.innerHTML = `
      <div class="panel__head">
        <span class="panel__title">${scr.title}</span>
        <span class="panel__ver">v${OPL.VERSION}</span>
        <button class="panel__toggle" data-panel-toggle aria-expanded="${!closed}" aria-controls="panel-body"
          title="${closed ? "Show" : "Hide"} controls (P)" aria-label="${closed ? "Show" : "Hide"} prototype controls">
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 10l4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
      <div class="panel__body" id="panel-body" ${closed ? "inert" : ""}><div class="panel__inner">

      <div class="panel__group panel__group--device">
        <div class="panel__label"><span>View</span><span class="panel__kbd">D</span></div>
        ${seg("device", [{ value: "mobile", label: "Mobile" }, { value: "desktop", label: "Desktop" }], desk ? "desktop" : "mobile")}
      </div>

      ${pgroup("screens", desk ? "Desktop screens" : "Screens", `<div class="panel__flows">${flows}</div>`, { count: screens.length })}

      ${reg && reg.presets.length > 1 ? pgroup("frames", "Figma frames", `<div class="presets">${reg.presets
          .map((p) => `<button class="preset ${p === activePreset ? "is-on" : ""}" data-preset="${p.id}">${p.label}</button>`)
          .join("")}</div>`, { count: reg.presets.length, open: reg.presets.length <= 3 }) : ""}

      ${toggles.length ? pgroup("options", "Options", toggles.map((g) => `
          <div class="panel__opt">
            <div class="panel__sublabel">${g.label}</div>
            ${seg(g.id, g.options, v[g.id])}
            ${g.note ? `<p class="panel__note">${g.note}</p>` : ""}
          </div>`).join(""), { count: toggles.length, open: toggles.length <= 1 }) : ""}

      ${pgroup("prototype", "Prototype", `<div style="display:grid;gap:8px">
          ${seg("hotspots", [{ value: "on", label: "Hotspot hints" }, { value: "off", label: "No hints" }], st.hotspots || "on")}
          ${seg("frame", [{ value: "on", label: "Device frame" }, { value: "off", label: "Bare screen" }], st.frame || "on")}
          ${seg("motion", [{ value: "on", label: "Motion on" }, { value: "off", label: "Motion off" }], st.motion === "off" ? "off" : "on")}
          <button class="panel__btn" data-replay>Replay entrance <span>↻</span></button>
          <div class="panel__links">
            ${figmaNode ? `<a href="${OPL.figmaLink(figmaNode)}" target="_blank" rel="noopener">Open frame in Figma <span>↗</span></a>` : ""}
            <a href="library.html" target="_blank">Component library <span>↗</span></a>
          </div>
        </div>`, { open: false })}
      </div></div>`;
    panelEl.querySelector(".panel__body").addEventListener("scroll", panelFade, { passive: true });
    panelFade();
  }

  /* ---- foldable panel sections (remembered per browser) ------------------ */
  const CHEV = `<svg class="panel__chev" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const GROUPS_KEY = "opl.panel.groups";
  const groupMem = (() => { try { return JSON.parse(localStorage.getItem(GROUPS_KEY)) || {}; } catch (_) { return {}; } })();
  const groupOpen = (id, dflt = true) => (id in groupMem ? groupMem[id] : dflt);
  function pgroup(id, label, content, { open = true, count } = {}) {
    const o = groupOpen(id, open);
    return `
      <div class="panel__group ${o ? "" : "is-shut"}" data-pg="${id}">
        <button class="panel__label panel__label--btn" data-pg-toggle aria-expanded="${o}"><span>${label}</span>${count ? `<small>${count}</small>` : ""}${CHEV}</button>
        <div class="panel__gbody"><div class="panel__ginner">${content}</div></div>
      </div>`;
  }
  function panelFade() {
    const b = panelEl && panelEl.querySelector(".panel__body");
    if (!b) return;
    panelEl.classList.toggle("has-above", b.scrollTop > 4);
    panelEl.classList.toggle("has-below", b.scrollTop + b.clientHeight < b.scrollHeight - 4);
  }

  /* ---- collapsible panel (for presenting) --------------------------------
     #panel=closed|open in the URL wins (shareable); otherwise the viewer's
     last choice, remembered in this browser. "P" toggles it. */
  const PANEL_KEY = "opl.panel";
  function panelClosed() {
    const st = OPL.state.get();
    if (st.panel === "closed" || st.panel === "open") return st.panel === "closed";
    try { return localStorage.getItem(PANEL_KEY) === "closed"; } catch (_) { return false; }
  }
  function togglePanel() {
    const closed = !panelEl.classList.contains("is-collapsed");
    try { localStorage.setItem(PANEL_KEY, closed ? "closed" : "open"); } catch (_) {}
    if (OPL.state.get().panel) OPL.state.set({ panel: closed ? "closed" : "open" }, { silent: true });
    panelEl.classList.toggle("is-collapsed", closed);
    const btn = panelEl.querySelector("[data-panel-toggle]");
    btn.setAttribute("aria-expanded", !closed);
    btn.title = `${closed ? "Show" : "Hide"} controls (P)`;
    btn.setAttribute("aria-label", `${closed ? "Show" : "Hide"} prototype controls`);
    panelEl.querySelector(".panel__body").toggleAttribute("inert", closed);
    setTimeout(fit, 320);
  }
  document.addEventListener("keydown", (e) => {
    if (!panelEl || e.metaKey || e.ctrlKey || e.altKey || e.key.toLowerCase() !== "p") return;
    if (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
    togglePanel();
  });

  panelEl?.addEventListener("click", (e) => {
    if (e.target.closest("[data-panel-toggle]")) return togglePanel();
    const pg = e.target.closest("[data-pg-toggle]");
    if (pg) {
      const box = pg.closest("[data-pg]"), open = box.classList.contains("is-shut");
      box.classList.toggle("is-shut", !open);
      pg.setAttribute("aria-expanded", open);
      groupMem[box.dataset.pg] = open;
      try { localStorage.setItem(GROUPS_KEY, JSON.stringify(groupMem)); } catch (_) {}
      setTimeout(panelFade, 300);
      return;
    }
    // the collapsed pill expands when tapped anywhere
    if (panelEl.classList.contains("is-collapsed") && e.target.closest(".panel__head")) return togglePanel();
    const scr = e.target.closest("[data-screen]");
    if (scr) {
      const target = scr.dataset.screen;
      if (target === screenName() || (isDesktop() && target === dName(screenName()))) return;
      // Going "up" to home reads as a back; anything else pushes.
      if (target === "home" || (isDesktop() && target === "loans-overview" && depth === 0)) { history.replaceState({ depth: 0, trail: ["home"] }, "", hashFor({ screen: null })); depth = 0; return render({ dir: "back" }); }
      return OPL.go(target);
    }
    const preset = e.target.closest("[data-preset]");
    if (preset) {
      const reg = isDesktop() ? OPL.dvariants[dName(OPL.current())] : OPL.variants[OPL.current()];
      const p = reg.presets.find((x) => x.id === preset.dataset.preset);
      return OPL.state.set(p.set);
    }
    const btn = e.target.closest(".seg button");
    if (btn) {
      const group = btn.parentElement.dataset.group;
      if (group === "device") return setDevice(btn.dataset.value);
      return OPL.state.set({ [group]: group === "motion" && btn.dataset.value === "on" ? null : btn.dataset.value });
    }
    if (e.target.closest("[data-replay]")) {
      currentPage?.querySelector(".scroller")?.scrollTo({ top: 0 });
      return render();
    }
  });

  function setDevice(d) {
    if ((d === "desktop") === isDesktop()) return;
    if (d === "desktop" && window.innerWidth <= 500) return;
    OPL.state.set({ device: d === "desktop" ? "desktop" : null });
  }
  OPL.setDevice = setDevice;
  // "D" flips the view (ignored while typing)
  window.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.key.toLowerCase() !== "d") return;
    if (e.target.closest && e.target.closest("input, textarea, [contenteditable]")) return;
    setDevice(isDesktop() ? "mobile" : "desktop");
  });

  OPL.current = () => screenName();
  /* A screen that needs to re-render itself (e.g. a status change) asks the router,
     so the page element is swapped cleanly and stays tracked. */
  OPL.rerender = () => { render(); return currentPage; };

  window.addEventListener("opl:state", () => render());
  window.addEventListener("popstate", (e) => {
    depth = (e.state && e.state.depth) || 0;
    render({ dir: "back" });
  });
  window.addEventListener("resize", () => {
    fit();
    // crossed the phone breakpoint while in desktop view → re-render for the new device
    if ((isDesktop() ? "desktop" : "mobile") !== document.documentElement.dataset.device) render();
  });

  OPL.initInteractions(screenEl);
  history.replaceState({ depth: 0, trail: [screenName()] }, "", location.hash || "#");

  /* ---- boot: render hidden, reveal when fonts + first-screen images are ready ---- */
  const timeout = (ms) => new Promise((r) => setTimeout(r, ms));
  const imagesReady = (root) => Promise.all([...root.querySelectorAll("img")]
    .filter((img) => img.getBoundingClientRect().top < window.innerHeight + 200)
    .map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }))));
  function reveal() {
    const boot = document.getElementById("boot");
    currentPage && currentPage.classList.remove("is-booting");
    document.documentElement.classList.remove("is-booting");
    OPL.markRevealed();
    if (boot) { boot.classList.add("is-leaving"); setTimeout(() => boot.remove(), 360); }
  }
  render();
  currentPage && currentPage.classList.add("is-booting");
  fit();
  Promise.race([
    Promise.all([document.fonts ? document.fonts.ready : null, imagesReady(screenEl)]),
    timeout(3000),
  ]).then(() => { fit(); reveal(); });
})();
