/* ==========================================================================
   Prototype shell — router, device scaling, variant panel.
   ========================================================================== */
(function () {
  const screenEl = document.getElementById("screen");
  const panelEl = document.getElementById("panel");
  const wrap = document.querySelector(".device-wrap");

  OPL.current = null;
  OPL.go = (name) => {
    OPL.state.set({ screen: name });
  };

  function render() {
    const st = OPL.state.get();
    const name = OPL.screens[st.screen] ? st.screen : "home";
    OPL.current = name;
    document.documentElement.dataset.hotspots = st.hotspots || "on";
    document.documentElement.dataset.frame = st.frame || "on";
    OPL.screens[name].render(screenEl);
    renderPanel(name);
  }

  /* ---- fit the device to the viewport on a laptop/projector ------------- */
  function fit() {
    if (window.innerWidth <= 500) { wrap.style.transform = ""; return; }
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

      ${reg ? `
      <div class="panel__group">
        <div class="panel__label"><span>Figma frames</span></div>
        <div class="presets">${reg.presets
          .map((p) => `<button class="preset ${p === activePreset ? "is-on" : ""}" data-preset="${p.id}">${p.label}<small>${p.figma}</small></button>`)
          .join("")}</div>
      </div>
      ${reg.groups
        .filter((g) => g.options.length > 1)
        .map((g) => `
        <div class="panel__group">
          <div class="panel__label"><span>${g.label}</span></div>
          ${seg(g.id, g.options, v[g.id])}
          ${g.note ? `<p class="panel__note">${g.note}</p>` : ""}
        </div>`).join("")}` : ""}

      <div class="panel__group">
        <div class="panel__label"><span>Prototype</span></div>
        <div style="display:grid;gap:8px">
          ${seg("hotspots", [{ value: "on", label: "Hotspot hints" }, { value: "off", label: "No hints" }], st.hotspots || "on")}
          ${seg("frame", [{ value: "on", label: "Device frame" }, { value: "off", label: "Bare screen" }], st.frame || "on")}
          <button class="panel__btn" data-replay>Replay entrance <span>↻</span></button>
        </div>
      </div>

      <div class="panel__group panel__links">
        ${figmaNode ? `<a href="${OPL.figmaLink(figmaNode)}" target="_blank" rel="noopener">Open frame in Figma <span>${figmaNode} ↗</span></a>` : ""}
        <a href="library.html" target="_blank">Component library <span>↗</span></a>
      </div>`;
  }

  panelEl?.addEventListener("click", (e) => {
    const preset = e.target.closest("[data-preset]");
    if (preset) {
      const p = OPL.variants[OPL.current].presets.find((x) => x.id === preset.dataset.preset);
      return OPL.state.set(p.set);
    }
    const btn = e.target.closest(".seg button");
    if (btn) return OPL.state.set({ [btn.parentElement.dataset.group]: btn.dataset.value });
    if (e.target.closest("[data-replay]")) {
      screenEl.querySelector(".scroller")?.scrollTo({ top: 0 });
      return render();
    }
  });

  window.addEventListener("opl:state", render);
  window.addEventListener("hashchange", render);
  window.addEventListener("resize", fit);

  OPL.initInteractions(screenEl);
  render();
  if (document.fonts) document.fonts.ready.then(fit); else fit();
  fit();
})();
