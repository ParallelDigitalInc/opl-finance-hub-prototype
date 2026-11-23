/* ==========================================================================
   Prototype shell — router (push/pop pages), device scaling, variant panel.
   Navigation: OPL.go(name) pushes a page (slides in from the right) and a
   browser history entry; OPL.back() / the browser back button pops it.
   Variant changes re-render the current page in place.
   ========================================================================== */
(function () {
  const screenEl = document.getElementById("screen");
  if (!screenEl) { OPL.markRevealed && OPL.markRevealed(); return; }   // library page: no router
  const panelEl = document.getElementById("panel");
  const wrap = document.querySelector(".device-wrap");
  let currentPage = null;
  let depth = 0;

  const screenName = () => {
    const st = OPL.state.get();
    return OPL.screens[st.screen] ? st.screen : "home";
  };
  const hashFor = (patch) => {
    const next = { ...OPL.state.get(), ...patch };
    Object.keys(next).forEach((k) => (next[k] == null || (k === "screen" && next[k] === "home")) && delete next[k]);
    return "#" + new URLSearchParams(next).toString();
  };

  // replace: swap the current history entry (hand-offs like NeSL → loader → result,
  // so Back doesn't land on a page that only makes sense once)
  OPL.go = (name, params = {}, { replace = false } = {}) => {
    if (!OPL.screens[name]) return;
    const next = hashFor({ screen: name, ...params });
    if (next === location.hash || (name === screenName() && !Object.keys(params).length)) return;
    if (replace) history.replaceState({ depth }, "", next);
    else { history.pushState({ depth: depth + 1 }, "", next); depth++; }
    render({ dir: "forward" });
  };
  OPL.back = () => {
    if (depth > 0) return history.back();
    history.replaceState({ depth: 0 }, "", hashFor({ screen: null }));
    render({ dir: "back" });
  };

  function render({ dir } = {}) {
    const st = OPL.state.get();
    const name = screenName();
    document.documentElement.dataset.hotspots = st.hotspots || "on";
    document.documentElement.dataset.frame = st.frame || "on";

    // Same screen (variant / panel change): re-render on a fresh element so listeners
    // bound by the previous render are dropped (no double handlers).
    if (currentPage && currentPage.dataset.screen === name && !dir) {
      const fresh = document.createElement("div");
      fresh.className = currentPage.className.replace(/\b(is-push-in|is-pop-in|is-entering)\b/g, "").trim();
      fresh.dataset.screen = name;
      const scroll = currentPage.querySelector(".scroller")?.scrollTop || 0;
      currentPage.replaceWith(fresh);
      currentPage = fresh;
      const s = OPL.screens[name];
      if (s.leave) s.leave();
      s.render(fresh);
      const sc = fresh.querySelector(".scroller"); if (sc) sc.scrollTop = scroll;
      return renderPanel(name);
    }

    // Clean up the outgoing screen BEFORE rendering: when both pages are the same screen
    // (e.g. application → application), a later leave() would cancel the new page's timers.
    const old = currentPage;
    if (old) { const leaving = OPL.screens[old.dataset.screen]; if (leaving && leaving.leave) leaving.leave(); }

    const page = document.createElement("div");
    page.className = "page";
    page.dataset.screen = name;
    screenEl.appendChild(page);
    OPL.screens[name].render(page);

    currentPage = page;
    if (old) {
      if (dir && !OPL.fx.motionOff()) {
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
  function fit() {
    if (window.innerWidth <= 500) { wrap.style.transform = ""; wrap.style.margin = ""; return; }
    wrap.style.transform = ""; wrap.style.margin = "";
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
    const reg = OPL.variants[name];
    const st = OPL.state.get();
    const v = reg ? OPL.variantValues(name) : {};
    const activePreset = reg?.presets.find((p) => Object.entries(p.set).every(([k, val]) => v[k] === val));
    const figmaNode = activePreset?.figma || Object.values(OPL.screens[name].figma || {})[0];

    panelEl.innerHTML = `
      <div class="panel__head">
        <span class="panel__title">${OPL.screens[name].title}</span>
        <span class="panel__ver">v${OPL.VERSION}</span>
      </div>
      <p class="panel__sub">OPL Finance Hub · HTML prototype</p>

      <div class="panel__group">
        <div class="panel__label"><span>Screens</span></div>
        <div class="presets">${Object.entries(OPL.screens)
          .map(([id, s]) => `<button class="preset ${id === name ? "is-on" : ""}" data-screen="${id}">${s.title}<small>${Object.values(s.figma || {})[0] || ""}</small></button>`)
          .join("")}</div>
      </div>

      ${reg && reg.presets.length > 1 ? `
      <div class="panel__group">
        <div class="panel__label"><span>Figma frames</span></div>
        <div class="presets">${reg.presets
          .map((p) => `<button class="preset ${p === activePreset ? "is-on" : ""}" data-preset="${p.id}">${p.label}<small>${p.figma}</small></button>`)
          .join("")}</div>
      </div>` : ""}
      ${reg ? reg.groups
        .filter((g) => g.options.length > 1 && !g.hidden)
        .map((g) => `
        <div class="panel__group">
          <div class="panel__label"><span>${g.label}</span></div>
          ${seg(g.id, g.options, v[g.id])}
          ${g.note ? `<p class="panel__note">${g.note}</p>` : ""}
        </div>`).join("") : ""}

      <div class="panel__group">
        <div class="panel__label"><span>Prototype</span></div>
        <div style="display:grid;gap:8px">
          ${seg("hotspots", [{ value: "on", label: "Hotspot hints" }, { value: "off", label: "No hints" }], st.hotspots || "on")}
          ${seg("frame", [{ value: "on", label: "Device frame" }, { value: "off", label: "Bare screen" }], st.frame || "on")}
          ${seg("motion", [{ value: "on", label: "Motion on" }, { value: "off", label: "Motion off" }], st.motion === "off" ? "off" : "on")}
          <button class="panel__btn" data-replay>Replay entrance <span>↻</span></button>
        </div>
      </div>

      <div class="panel__group panel__links">
        ${figmaNode ? `<a href="${OPL.figmaLink(figmaNode)}" target="_blank" rel="noopener">Open frame in Figma <span>${figmaNode} ↗</span></a>` : ""}
        <a href="library.html" target="_blank">Component library <span>↗</span></a>
      </div>`;
  }

  panelEl?.addEventListener("click", (e) => {
    const scr = e.target.closest("[data-screen]");
    if (scr) {
      const target = scr.dataset.screen;
      if (target === screenName()) return;
      // Going "up" to home reads as a back; anything else pushes.
      if (target === "home") { history.replaceState({ depth: 0 }, "", hashFor({ screen: null })); depth = 0; return render({ dir: "back" }); }
      return OPL.go(target);
    }
    const preset = e.target.closest("[data-preset]");
    if (preset) {
      const p = OPL.variants[OPL.current()].presets.find((x) => x.id === preset.dataset.preset);
      return OPL.state.set(p.set);
    }
    const btn = e.target.closest(".seg button");
    if (btn) {
      const group = btn.parentElement.dataset.group;
      return OPL.state.set({ [group]: group === "motion" && btn.dataset.value === "on" ? null : btn.dataset.value });
    }
    if (e.target.closest("[data-replay]")) {
      currentPage?.querySelector(".scroller")?.scrollTo({ top: 0 });
      return render();
    }
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
  window.addEventListener("resize", fit);

  OPL.initInteractions(screenEl);
  history.replaceState({ depth: 0 }, "", location.hash || "#");

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
