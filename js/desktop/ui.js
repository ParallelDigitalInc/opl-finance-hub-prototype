/* ==========================================================================
   Desktop kit — OPL.d.* (pure functions: props in, HTML out) + shared desktop
   behaviours. Shell and card language from Figma "loans overview" 476:200124
   (Desktop Loans page): 230 sidebar, white main panel, pill top bar, underline
   tabs, tinted-head cards (r16 shell, p4, r14 inner). Assets: assets/lazy/dsk.
   Colours follow the mobile kit (tokens.css): CTA/links #3858E5, not the
   indigo #4338CA/#3730A3 still on the desktop frame (README → Desktop flags).
   ========================================================================== */
(function () {
  const { html, raw, cx } = OPL;
  const D = (OPL.d = OPL.d || {});

  // Icons are inlined into dist/desktop.js by tools/build.sh (OPL.dIcons); file fallback otherwise
  const iconUri = {};
  const iconSrc = (name) => {
    const svg = OPL.dIcons && OPL.dIcons[name];
    if (!svg) return `assets/lazy/dsk/${name}.svg`;
    return (iconUri[name] ||= "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
  };
  D.iconSrc = (name) => iconSrc(name);
  D.icon = (name, size = 16, cls = "") =>
    raw(`<img class="ico ${cls}" src="${iconSrc(name)}" width="${size}" height="${size}" alt="" draggable="false">`);
  // icons shared with the mobile kit (assets/icons)
  D.micon = (name, size = 16, cls = "") => OPL.icon(name, size, cls);

  /* ---- Sidebar (476:200125) ------------------------------------------------ */
  const NAV = [
    { label: "Know your business", items: [
      { id: "dashboard", label: "Dashboard", icon: "nav-home" },
      { id: "bmr", label: "BMR insights", icon: "nav-round-graph" },
      { id: "gst", label: "GST", icon: "nav-gst", size: 14 },
      { id: "taxes", label: "Taxes", icon: "nav-bill" },
      { id: "bank", label: "Bank", icon: "nav-buildings" },
    ] },
    { label: "Get financing", items: [
      { id: "loans", label: "Loans", icon: "nav-banknote-active", goto: "loans-overview" },
      { id: "subsidies", label: "Govt. subsidies", icon: "nav-hand-stars", goto: "subsidies-overview" },
      { id: "equity", label: "Equity", icon: "nav-pie" },
      { id: "insurance", label: "Insurance", icon: "nav-shield-star" },
    ] },
    { label: "Grow business", items: [
      { id: "discovery", label: "Discovery Hub", icon: "nav-shop" },
      { id: "news", label: "News", icon: "nav-feed" },
    ] },
  ];
  const navItem = (it, active) => html`
    <button class="d-nav__item ${it.id === active ? "is-active" : ""}" data-goto="${it.goto || "d-" + it.id}" data-label="${it.label}" ${it.id === active ? raw('aria-current="page"') : ""}>
      <span class="d-nav__icon">${D.icon(it.icon, it.size || 16)}</span>
      <span class="d-nav__label">${it.label}</span>
      <span class="d-rail-tip" aria-hidden="true">${it.label}</span>
    </button>`;
  D.sidebar = (active = "loans") => html`
    <aside class="d-side" aria-label="Main navigation">
      <button class="d-switcher" data-goto="d-business-switcher" aria-label="Switch business">
        <span class="d-switcher__avatar">RF</span>
        <span class="d-switcher__name">Ratan Fabrics Pvt. Ltd.</span>
        ${D.icon("switcher-chevron", 16, "d-switcher__chev")}
        <span class="d-rail-tip" aria-hidden="true">Ratan Fabrics Pvt. Ltd.</span>
      </button>
      ${NAV.map((g) => html`
        <nav class="d-nav__group">
          <p class="d-nav__heading">${g.label}</p>
          <div class="d-nav__items">${g.items.map((it) => navItem(it, active))}</div>
        </nav>`)}
      <div class="d-side__spacer"></div>
      <div class="d-nav__footer">
        <span class="d-nav__divider"></span>
        ${navItem({ id: "help", label: "Help & Support", icon: "nav-headphones" }, active)}
        ${navItem({ id: "settings", label: "Settings", icon: "nav-settings" }, active)}
      </div>
    </aside>`;

  /* ---- Top bar (476:200177) ----------------------------------------------- */
  D.topbar = () => html`
    <header class="d-top">
      <button class="d-top__toggle" data-side-toggle aria-label="${D.sideCollapsed ? "Expand" : "Collapse"} sidebar" aria-expanded="${!D.sideCollapsed}">${D.icon("top-sidebar-toggle", 40)}<span class="d-rail-tip d-rail-tip--below" aria-hidden="true"><span data-side-tip>${D.sideCollapsed ? "Expand" : "Collapse"} sidebar</span><kbd>[</kbd></span></button>
      <label class="d-search">
        ${D.icon("top-search", 14)}
        <input class="d-search__input" type="search" placeholder="Search everything..." aria-label="Search everything">
        <kbd class="d-search__kbd">⌘K</kbd>
      </label>
      <div class="d-top__actions">
        <button class="d-top__btn d-top__btn--plain" data-goto="d-support" aria-label="Support">${D.icon("top-headphones", 20)}</button>
        <button class="d-top__btn d-top__btn--baked" data-goto="d-notifications" aria-label="Notifications"><span class="d-top__baked">${D.icon("top-bell", 42)}</span><i class="d-top__ping"></i></button>
        <button class="d-top__btn d-top__btn--baked" data-goto="d-messages" aria-label="Messages"><span class="d-top__baked">${D.icon("top-chat", 42)}</span><i class="d-top__ping"></i></button>
        <div class="d-lang" role="group" aria-label="Language">
          <button class="d-lang__opt is-on">EN</button>
          <button class="d-lang__opt d-lang__opt--hi" data-goto="d-hindi">हिं</button>
        </div>
      </div>
    </header>`;

  /* ---- Loans tabs (476:200199) --------------------------------------------- */
  const TABS = [
    { id: "overview", label: "Overview", icon: "tab-widget-outline", iconOn: "tab-widget-active", goto: "loans-overview" },
    { id: "offers", label: "Loan Offers", icon: "tab-banknote-2", iconOn: "nav-banknote-active", goto: "loan-offers" },
    { id: "compare", label: "Compare", icon: "tab-mirror-left", iconOn: "tab-mirror-bold", goto: "compare-loans" },
    { id: "applications", label: "Applications", icon: "tab-document-text", iconOn: "tab-doc-bold", goto: "applications" },
    { id: "myloans", label: "My Loans", icon: "tab-notes", goto: "my-loans" },
  ];
  D.tabs = (active = "overview", counts = {}) => html`
    <div class="d-tabs" role="tablist" data-active="${active}">
      ${TABS.map((t) => html`
        <button class="d-tab ${t.id === active ? "is-active" : ""}" role="tab" aria-selected="${t.id === active}" data-tab="${t.id}" data-goto="${t.goto}">
          ${D.icon(t.id === active && t.iconOn ? t.iconOn : t.icon, 14)}<span>${t.label}</span>${counts[t.id] ? html`<span class="d-tab__count">${counts[t.id]}</span>` : ""}
        </button>`)}
      <span class="d-tabs__rest"></span>
      <span class="d-tabs__ink" aria-hidden="true"></span>
    </div>`;

  /* ---- Page shell ----------------------------------------------------------- */
  // nav: sidebar item · title: page heading (Regular 30/40) · tab: Loans tab (null = none)
  // Sidebar collapse (top-bar toggle): remembered for the session and in this browser
  D.sideCollapsed = (() => { try { return localStorage.getItem("opl.dside") === "1"; } catch (_) { return false; } })();
  D.shell = ({ nav = "loans", title = "Loans", tab = "overview", counts, body, crumbs, after = "" }) => html`
    <div class="d-app ${D.sideCollapsed ? "is-side-collapsed" : ""}">
      ${D.sidebar(nav)}
      <main class="d-main">
        <div class="d-main__scroll scroller">
          <div class="d-main__inner">
            ${D.topbar()}
            <div class="d-content">
              ${crumbs ? D.crumbs(crumbs) : ""}
              ${title ? html`<h1 class="d-title">${title}</h1>` : ""}
              ${tab ? D.tabs(tab, counts) : ""}
              ${body}
            </div>
          </div>
        </div>
        ${D.mitraFab()}
      </main>
      ${raw(after)}
    </div>`;

  D.crumbs = (items) => html`
    <nav class="d-crumbs" aria-label="Breadcrumb">${items.map((c, i) => html`${i ? html`${D.micon("alt-arrow-right", 14, "d-crumbs__sep")}` : ""}${c.goto ? html`<button class="d-crumbs__link" data-goto="${c.goto}">${c.label}</button>` : html`<span class="d-crumbs__here">${c.label}</span>`}`)}</nav>`;

  /* ---- AI Mitra FAB (476:200642) + one-time nudge (mobile parity) ----------- */
  D.mitraFab = (nudge = { lead: "Ask anything about", topic: "loans & subsidies" }) => html`
    <div class="d-fab-wrap">
      <span class="d-fab-nudge" aria-hidden="true">${nudge.lead} <b>${nudge.topic}</b></span>
      <button class="d-fab" data-goto="ai-mitra" aria-label="Ask AI Mitra">${D.icon("mitra-logo-fab", 24)}</button>
    </div>`;

  /* ---- Primitives ----------------------------------------------------------- */
  D.count = (n) => html`<span class="d-count">${n}</span>`;
  D.link = (label, goto) => html`<button class="d-link" data-goto="${goto}">${label}${D.micon("chevron-right-primary", 14, "d-link__arrow")}</button>`;   // #3858E5 to match the label (frame arrow is indigo)
  D.sectionHead = ({ title, count, link, goto, size = "h4" }) => html`
    <div class="d-sh d-sh--${size}">
      <h2 class="d-sh__title">${title}${count != null ? D.count(count) : ""}</h2>
      ${link ? D.link(link, goto) : ""}
    </div>`;
  // style: filled | tonal | outlined | text · size: lg 44 | md 38 | sm 32
  D.btn = ({ label, style = "tonal", size = "md", goto, attrs = "", icon, iconRight, cls = "" }) => html`
    <button class="${cx("d-btn", `d-btn--${style}`, `d-btn--${size}`, cls)}" ${goto ? raw(`data-goto="${goto}"`) : ""} ${raw(attrs)}>
      ${icon ? icon : ""}<span>${label}</span>${iconRight ? iconRight : ""}
    </button>`;
  D.chip = (label, { selected = false, attrs = "" } = {}) => html`
    <button class="d-chip ${selected ? "is-selected" : ""}" aria-pressed="${selected}" ${raw(attrs)}>${label}</button>`;
  D.checkbox = ({ label, checked = false, attrs = "" }) => html`
    <button class="d-check ${checked ? "is-checked" : ""}" role="checkbox" aria-checked="${checked}" ${raw(attrs)}>
      <span class="d-check__box">${D.icon("check-square", 20, "d-check__off")}${D.micon("check-square-checked", 20, "d-check__on")}</span>
      <span class="d-check__label">${label}</span>
    </button>`;
  D.mitraMark = () => html`<span class="d-mitra-mark">${D.icon("mitra-logo-white", 12)}</span>`;
  D.aiRow = (text, { goto = "ai-mitra", cls = "" } = {}) => html`
    <button class="d-ai ${cls}" data-goto="${goto}">
      ${D.mitraMark()}<span class="d-ai__text">${text}</span>${D.icon("alt-arrow-right", 14, "d-ai__arrow")}
    </button>`;
  // src: an image path, or { src, crop, bg } where crop positions an oversized source
  // inside the circle exactly as the Figma image fill does (e.g. Citi, 476:200444)
  D.logo = (src, { size = 40, cls = "" } = {}) => {
    const l = typeof src === "string" ? { src } : src;
    return html`<span class="d-logo ${cls} ${l.crop ? "d-logo--crop" : ""}" style="--sz:${size}px;${l.bg ? `background:${l.bg}` : ""}"><img src="${l.src}" alt="" ${l.crop ? raw(`style="${l.crop}"`) : raw(`width="${size}" height="${size}"`)}></span>`;
  };
  D.tip = (text) => html`<span class="d-tip" role="tooltip">${text}</span>`;

  /* ---- Offer card · vertical (476:200437) ----------------------------------- */
  D.offerCard = (o, { compared = false } = {}) => html`
    <article class="d-card d-offer" data-offer="${o.id}" tabindex="0" style="--tint:${o.tint}">
      <div class="d-card__head">
        <span class="d-card__tag">${o.tag}</span>
        <div class="d-card__id">
          ${D.logo(o.logo)}
          <div><p class="d-card__name">${o.name}</p><p class="d-card__sub">${o.sub}</p></div>
        </div>
      </div>
      <div class="d-card__body">
        <div class="d-figs">
          ${o.figures.map((f) => html`<div class="d-fig"><p class="d-fig__label">${f.label}</p><p class="d-fig__value">${f.value}${f.unit ? html`<small>${f.unit}</small>` : ""}</p></div>`)}
        </div>
        <dl class="d-rows">${o.details.map(([k, v]) => html`<div class="d-row"><dt>${k}</dt><dd>${v}</dd></div>`)}</dl>
        <div class="d-card__foot">
          ${D.checkbox({ label: "Compare", checked: compared, attrs: `data-compare="${o.compareId || o.id}"` })}
          ${D.btn({ label: "Apply Now", style: "tonal", size: "md", goto: "d-apply", attrs: `data-apply="${o.compareId || o.id}"` })}
        </div>
      </div>
    </article>`;

  /* ---- CIBIL MSME Rank (476:200254) — semicircle gauge, the desktop hero of CMR -- */
  // Bars are inlined from cmr-bars.svg (Figma 476:200271, 10 ranks × 2) so each one
  // can sweep in; the pointer rotates about the gauge centre to the rank.
  D.cmrCard = (c) => html`
    <section class="d-card d-cmr" aria-label="${c.title}">
      <div class="d-cmr__head">
        <p class="d-cmr__title">${c.title}
          <span class="d-cmr__info" tabindex="0">${D.icon("info-circle", 16)}${D.tip(c.info)}</span>
        </p>
        <p class="d-cmr__updated">${c.updated}</p>
      </div>
      <div class="d-cmr__body">
        <div class="d-gauge" data-rank="${c.rank}" style="--rank-angle:${c.angle != null ? c.angle : (c.rank - 0.5) * 18}deg">
          <div class="d-gauge__bars" data-cmr-bars></div>
          <span class="d-gauge__min">01</span><span class="d-gauge__max">10</span>
          <span class="d-gauge__needle" aria-hidden="true"><span class="d-gauge__tri">${D.icon("cmr-pointer", 12)}</span></span>
          <div class="d-gauge__read">
            <p class="d-gauge__rank">${c.rank}</p>
            <span class="d-gauge__chip">${c.risk}</span>
          </div>
        </div>
      </div>
      ${D.aiRow(c.ai, { cls: "d-ai--card" })}
    </section>`;

  /* ---- Behaviours ------------------------------------------------------------ */
  const motionOff = () => OPL.reducedMotion() || OPL.state.get().motion === "off";
  D.motionOff = motionOff;

  // Fetch an SVG once and inline it (for per-path animation)
  const svgCache = {};
  D.inlineSvg = (name) => (svgCache[name] ||= OPL.dIcons && OPL.dIcons[name]
    ? Promise.resolve(OPL.dIcons[name])
    : fetch(`assets/lazy/dsk/${name}.svg`).then((r) => r.text()));

  D.mountGauge = (root) => {
    root.querySelectorAll(".d-gauge").forEach((g) => {
      const host = g.querySelector("[data-cmr-bars]");
      const rank = +g.dataset.rank;
      D.inlineSvg("cmr-bars").then((svg) => {
        host.innerHTML = svg;
        const paths = [...host.querySelectorAll("path")];
        paths.forEach((p, i) => {
          const r = Math.floor(i / 2) + 1;
          p.dataset.rank = r;
          if (r === rank) p.classList.add("is-rank");
          p.style.setProperty("--i", i);
        });
        if (motionOff()) { g.classList.add("is-in", "is-settled"); return; }
        OPL.afterReveal(() => setTimeout(() => {
          g.classList.add("is-in");
          setTimeout(() => g.classList.add("is-settled"), 20 * 34 + 600);
        }, 16));
      });
    });
  };

  // Tab underline glides from the previous tab to the new one
  let lastTab = null;
  D.mountTabs = (root) => {
    const tabs = root.querySelector(".d-tabs");
    if (!tabs) return;
    const ink = tabs.querySelector(".d-tabs__ink");
    const place = (el, animate) => {
      ink.style.transition = animate ? "" : "none";
      ink.style.width = `${el.offsetWidth}px`;
      ink.style.transform = `translateX(${el.offsetLeft}px)`;
    };
    const active = tabs.querySelector(".d-tab.is-active");
    if (!active) { ink.style.opacity = 0; return; }
    const prev = lastTab && tabs.querySelector(`.d-tab[data-tab="${lastTab}"]`);
    {
      if (prev && prev !== active && !motionOff()) {
        place(prev, false);
        void ink.offsetWidth;
        place(active, true);
      } else place(active, false);
    }
    // first paint can happen before Geist loads: re-measure once fonts are in
    if (document.fonts && document.fonts.status !== "loaded") document.fonts.ready.then(() => active.isConnected && place(active, false));
    lastTab = active.dataset.tab;
    // hover preview: the ink leans toward the hovered tab
    tabs.addEventListener("pointerover", (e) => {
      const t = e.target.closest(".d-tab");
      if (t && t !== active) t.classList.add("is-hover");
    });
    tabs.addEventListener("pointerout", (e) => {
      const t = e.target.closest(".d-tab");
      if (t) t.classList.remove("is-hover");
    });
  };

  // Top bar gains a frosted surface once content scrolls beneath it; ⌘K focuses search
  D.mountTopbar = (root) => {
    const sc = root.querySelector(".d-main__scroll");
    const top = root.querySelector(".d-top");
    if (sc && top) sc.addEventListener("scroll", () => top.classList.toggle("is-stuck", sc.scrollTop > 4), { passive: true });
  };
  window.addEventListener("keydown", (e) => {
    if (!OPL.isDesktop || !OPL.isDesktop()) return;
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      const input = document.querySelector('.page:last-child .d-search__input');
      if (input) { e.preventDefault(); input.focus(); }
    }
    if (e.key === "Escape" && document.activeElement?.classList.contains("d-search__input")) document.activeElement.blur();
  });

  // AI Mitra nudge — once per load, like mobile
  let nudged = false;
  D.mountFab = (root) => {
    const wrap = root.querySelector(".d-fab-wrap");
    if (!wrap || nudged || motionOff()) return;
    nudged = true;
    OPL.afterReveal(() => {
      setTimeout(() => wrap.classList.add("is-nudging"), 1800);
      setTimeout(() => wrap.classList.remove("is-nudging"), 6000);
    });
    root.querySelector(".d-main__scroll")?.addEventListener("scroll", () => wrap.classList.remove("is-nudging"), { once: true, passive: true });
  };

  // Staggered entrance for [data-enter] blocks (respects reveal + reduced motion)
  D.enter = (root) => {
    const els = [...root.querySelectorAll("[data-enter]")];
    if (motionOff()) return;
    els.forEach((el, i) => { el.classList.add("d-enter"); el.style.setProperty("--d", `${i * 60}ms`); });
    OPL.afterReveal(() => setTimeout(() => els.forEach((el) => el.classList.add("is-in")), 16));
  };

  // Count-up for figures like "₹50 Lakhs" (keeps prefix/suffix)
  D.countUp = (el) => {
    const m = el.textContent.match(/^(\D*)([\d.,]+)(.*)$/);
    if (!m) return;
    const to = parseFloat(m[2].replace(/,/g, ""));
    OPL.countUp(el, { to, prefix: m[1], suffix: m[3], duration: 900, delay: 120 });
  };

  // Tooltips stay inside the main panel: on hover/focus, measure the bubble against the
  // scroll area and nudge it sideways (or flip it below) before it fades in.
  /* Tooltips float in one layer at the top of the app, positioned from the icon. Inline .d-tip
     markup stays as the source text, but nothing that clips (rounded cards with overflow:hidden,
     scrolling panels, drawers) can cut the bubble off. Opens above; flips below near the top bar;
     slides sideways to stay 12px inside the window, with the arrow kept on the icon. */
  D.fitTips = (page) => {
    const app = page.querySelector(".d-app");
    if (!app) return;
    let layer = null, host = null, hideT = 0;
    const scale = () => { const r = app.getBoundingClientRect(); return r.width / (app.offsetWidth || r.width) || 1; };
    const show = (h) => {
      const src = h.querySelector(":scope > .d-tip");
      if (!src || h === host) return;
      clearTimeout(hideT);
      host = h;
      if (!layer) { layer = document.createElement("div"); layer.className = "d-tip d-tip--float"; layer.setAttribute("role", "tooltip"); app.appendChild(layer); }
      layer.textContent = src.textContent;
      layer.classList.remove("is-below", "is-on");
      const sc = scale(), a = app.getBoundingClientRect(), r = h.getBoundingClientRect();
      const cx = (r.left + r.width / 2 - a.left) / sc, top = (r.top - a.top) / sc, bottom = (r.bottom - a.top) / sc;
      const w = layer.offsetWidth, ht = layer.offsetHeight, pad = 12, gap = 10;
      const below = top - gap - ht < 64;                                   // no room under the top bar: open below
      let left = cx - w / 2;
      left = Math.max(pad, Math.min(left, app.offsetWidth - pad - w));
      layer.style.left = `${Math.round(left)}px`;
      layer.style.top = `${Math.round(below ? bottom + gap : top - gap - ht)}px`;
      layer.style.setProperty("--arrow-x", `${Math.round(cx - left)}px`);
      layer.classList.toggle("is-below", below);
      void layer.offsetWidth; layer.classList.add("is-on");
    };
    const hide = () => { host = null; if (layer) layer.classList.remove("is-on"); };
    const hostOf = (el) => el && (el.closest(".d-tip")?.parentElement || el.closest(":has(> .d-tip)"));
    page.addEventListener("pointerover", (e) => { const h = hostOf(e.target); if (h) show(h); });
    page.addEventListener("pointerout", (e) => { if (host && !host.contains(e.relatedTarget)) { clearTimeout(hideT); hideT = setTimeout(hide, 60); } });
    page.addEventListener("focusin", (e) => { if (e.target.querySelector?.(":scope > .d-tip")) show(e.target); });
    page.addEventListener("focusout", () => hide());
    page.addEventListener("scroll", hide, true);
    page.addEventListener("pointerdown", hide);
  };

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-side-toggle]");
    if (!t) return;
    const app = t.closest(".d-app");
    D.sideCollapsed = !app.classList.contains("is-side-collapsed");
    try { localStorage.setItem("opl.dside", D.sideCollapsed ? "1" : "0"); } catch (_) {}
    app.classList.toggle("is-side-collapsed", D.sideCollapsed);
    const label = `${D.sideCollapsed ? "Expand" : "Collapse"} sidebar`;
    app.querySelectorAll("[data-side-toggle]").forEach((b) => { b.setAttribute("aria-expanded", !D.sideCollapsed); b.setAttribute("aria-label", label); });
    app.querySelectorAll("[data-side-tip]").forEach((x) => { x.textContent = label; });
  });
  // "[" toggles the sidebar too (desktop apps' convention), ignored while typing
  window.addEventListener("keydown", (e) => {
    if (e.key !== "[" || e.metaKey || e.ctrlKey || !OPL.isDesktop || !OPL.isDesktop()) return;
    if (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
    document.querySelector(".page:last-child [data-side-toggle]")?.click();
  });

  // Every desktop page: shell behaviours
  D.mountShell = (page) => {
    D.fitTips(page);
    D.mountTabs(page);
    D.mountTopbar(page);
    D.mountFab(page);
  };

  /* Compare selection shared across desktop tabs (seeded from the mobile Loan offers
     selection so switching views keeps it) */
  D.compare = {
    get() { return (OPL.screens["loan-offers"] && OPL.screens["loan-offers"].sel) || (D._cmp ||= []); },
    set(ids) {
      D._cmp = ids;
      if (OPL.screens["loan-offers"]) OPL.screens["loan-offers"].sel = ids;
    },
    toggle(id, max = 3) {
      const cur = D.compare.get().slice();
      const i = cur.indexOf(id);
      if (i >= 0) cur.splice(i, 1);
      else if (cur.length < max) cur.push(id);
      else return false;
      D.compare.set(cur);
      return true;
    },
  };

  /* Toast (desktop feedback for quiet actions such as "Added to compare") */
  D.toast = (page, text, { action, goto } = {}) => {
    const host = page.querySelector(".d-main");
    if (!host) return;
    host.querySelector(".d-toast")?.remove();
    const t = document.createElement("div");
    t.className = "d-toast";
    t.innerHTML = `<span>${text}</span>${action ? `<button class="d-toast__act" data-goto="${goto}">${action}</button>` : ""}`;
    host.appendChild(t);
    void t.offsetWidth; t.classList.add("is-in");
    clearTimeout(D._toastT);
    D._toastT = setTimeout(() => { t.classList.remove("is-in"); setTimeout(() => t.remove(), 300); }, 3200);
  };
})();

/* ==========================================================================
   Offer lists, drawers, toggles — Loan Offers (357:102436 / 507:84666) and
   Compare (507:87387, drawer 507:86111).
   ========================================================================== */
(function () {
  const { html, raw } = OPL;
  const D = OPL.d;

  // Chip filters + sorts shared by Overview, Loan Offers and the Compare drawer
  D.CHIP_TEST = {
    "Collateral-free": (m) => m.collateralFree,
    "Working Capital": (m) => m.workingCapital,
    "Term loan": (m) => m.term,
    "Fee under 1%": (m) => m.fee < 1,
  };
  D.SORTS = {
    "Lowest interest": (a, b) => a.meta.rate - b.meta.rate,
    "Highest loan amount": (a, b) => b.meta.amount - a.meta.amount,
    "Lowest EMI": (a, b) => a.meta.emi - b.meta.emi,
    "Lowest processing fee": (a, b) => a.meta.fee - b.meta.fee,
  };
  D.SORT_OPTIONS = Object.keys(D.SORTS);

  // Tag group on a tinted head: icon + text, divided by a 14px slate-300 rule (507:84710)
  D.tags = (tags) => html`
    <span class="d-tags">${tags.map((t, i) => html`${i ? D.icon("tag-divider", 14, "d-tags__rule") : ""}<span class="d-tag d-tag--${t.tone}">${D.icon(t.icon, 14)}${t.text}</span>`)}</span>`;

  // Chip with an optional "New" badge (507:84681)
  D.chipX = (c, { selected = false } = {}) => html`
    <button class="d-chip ${selected ? "is-selected" : ""}" aria-pressed="${selected}" data-chip="${c.label}">${c.label}${c.badge ? html`<span class="d-chip__badge">${c.badge}</span>` : ""}</button>`;

  // Sort pill + menu and Filters pill (476:200427 · 476:200432)
  D.sortFilter = (sort, { filtersGoto = "" } = {}) => html`
    <div class="d-toolbar__right">
      <div class="d-menu-anchor">
        <button class="d-pill d-pill--sort" data-menu="sort" aria-haspopup="menu" aria-expanded="false">
          ${D.icon("list-arrow-down", 16)}<span class="d-pill__muted">Sort by</span><b>${sort}</b>${D.icon("chevron-muted", 14, "d-pill__chev")}
        </button>
        <div class="d-menu" role="menu" data-menu-for="sort">
          ${D.SORT_OPTIONS.map((o) => html`<button class="d-menu__item ${o === sort ? "is-on" : ""}" role="menuitemradio" aria-checked="${o === sort}" data-sort="${o}">${o}${o === sort ? D.micon("check-circle-primary", 16) : ""}</button>`)}
        </div>
      </div>
      <button class="d-pill" ${filtersGoto ? raw(`data-goto="${filtersGoto}"`) : ""} data-filters>${D.icon("filter", 16)}<span>Filters</span>${D.icon("chevron-muted", 14, "d-pill__chev")}</button>
    </div>`;

  // Offer card · horizontal (507:84700): grey head with logo + tags, figures row + footer
  D.offerRow = (o, { compared = false, selectable = false, selected = false } = {}) => html`
    <article class="d-row-card ${selectable ? "d-row-card--pick" : ""} ${selected ? "is-picked" : ""}" data-offer="${o.id}" tabindex="0" ${selectable ? raw(`role="checkbox" aria-checked="${selected}"`) : ""}>
      <div class="d-row-card__head">
        <div class="d-row-card__id">
          ${selectable ? html`<span class="d-row-card__check">${D.icon("check-square", 20, "d-check__off")}${D.icon("check-square-bold", 20, "d-check__on")}</span>` : ""}
          ${D.logo(o.logo)}
          <div><p class="d-card__name">${o.name}</p><p class="d-card__sub">${o.sub}</p></div>
        </div>
        ${D.tags(o.tags)}
      </div>
      <div class="d-row-card__figs">
        ${o.figures.map((f) => html`<div class="d-fig"><p class="d-fig__label">${f.label}</p><p class="d-fig__value">${f.value}${f.unit ? html`<small>${f.unit}</small>` : ""}</p></div>`)}
        <div class="d-fig d-fig--fee"><p class="d-fig__label">Processing fee</p><p class="d-fig__value">${o.fee}</p></div>
        ${selectable ? "" : html`
          <span class="d-row-card__spacer"></span>
          <div class="d-row-card__foot">
            ${D.checkbox({ label: "Compare", checked: compared, attrs: `data-compare="${o.id}"` })}
            ${D.btn({ label: "Apply Now", style: "tonal", size: "md", goto: "d-apply", attrs: `data-apply="${o.id}"` })}
          </div>`}
      </div>
    </article>`;

  // Toggle (DS 269:2): 36×20 track, slate-300 off / primary on
  D.toggle = ({ on = false, label, attrs = "" }) => html`
    <button class="d-toggle ${on ? "is-on" : ""}" role="switch" aria-checked="${on}" ${raw(attrs)}>
      <span class="d-toggle__label">${label}</span><span class="d-toggle__track"><span class="d-toggle__knob"></span></span>
    </button>`;

  // Right drawer (507:86111): 591 wide, r16 on the left, scrim, Esc / scrim / close to dismiss
  D.openDrawer = (page, { title, body, footer, width = 591, onClose }) => {
    const host = page.querySelector(".d-app");
    const el = document.createElement("div");
    el.className = "d-drawer-layer";
    el.innerHTML = String(html`
      <div class="d-scrim" data-drawer-close></div>
      <aside class="d-drawer" role="dialog" aria-modal="true" aria-label="${title}" style="width:${width}px">
        <div class="d-drawer__head"><p class="d-drawer__title">${title}</p><button class="d-drawer__x" data-drawer-close aria-label="Close">${D.icon("close-circle-drawer", 24)}</button></div>
        <div class="d-drawer__body">${raw(body)}</div>
        ${footer ? html`<div class="d-drawer__foot">${raw(footer)}</div>` : ""}
      </aside>`);
    host.appendChild(el);
    const close = () => {
      el.classList.remove("is-open");
      document.removeEventListener("keydown", onKey, true);
      setTimeout(() => el.remove(), 320);
      onClose && onClose();
    };
    const onKey = (e) => { if (e.key === "Escape") { e.stopPropagation(); close(); } };
    document.addEventListener("keydown", onKey, true);
    el.addEventListener("click", (e) => { if (e.target.closest("[data-drawer-close]")) close(); });
    void el.offsetWidth; el.classList.add("is-open");
    setTimeout(() => el.querySelector("input, button:not([data-drawer-close])")?.focus({ preventScroll: true }), 340);
    return { el, close };
  };

  // Sort menu + chip clicks for a list (shared by Overview + Loan Offers)
  D.bindListControls = (page, st, refresh) => {
    const closeMenus = () => page.querySelectorAll(".d-menu.is-open").forEach((m) => {
      m.classList.remove("is-open");
      page.querySelector(`[data-menu="${m.dataset.menuFor}"]`)?.setAttribute("aria-expanded", "false");
    });
    page.addEventListener("click", (e) => {
      const chip = e.target.closest(".d-toolbar [data-chip]");
      if (chip) {
        const c = chip.dataset.chip;
        st.chips = st.chips.includes(c) ? st.chips.filter((x) => x !== c) : [...st.chips, c];
        chip.classList.toggle("is-selected");
        chip.setAttribute("aria-pressed", st.chips.includes(c));
        return refresh();
      }
      if (e.target.closest("[data-clear-chips]")) {
        st.chips = [];
        page.querySelectorAll(".d-toolbar [data-chip].is-selected").forEach((c) => { c.classList.remove("is-selected"); c.setAttribute("aria-pressed", "false"); });
        return refresh();
      }
      const menuBtn = e.target.closest("[data-menu]");
      if (menuBtn) {
        const menu = page.querySelector(`[data-menu-for="${menuBtn.dataset.menu}"]`);
        const open = !menu.classList.contains("is-open");
        closeMenus();
        menu.classList.toggle("is-open", open);
        menuBtn.setAttribute("aria-expanded", open);
        if (open) menu.querySelector(".is-on")?.focus({ preventScroll: true });
        return;
      }
      const sort = e.target.closest("[data-sort]");
      if (sort) {
        st.sort = sort.dataset.sort;
        st.sorted = true;
        page.querySelector(".d-pill--sort b").textContent = st.sort;
        page.querySelectorAll("[data-sort]").forEach((b) => {
          const on = b.dataset.sort === st.sort;
          b.classList.toggle("is-on", on);
          b.setAttribute("aria-checked", on);
          b.querySelector(".ico")?.remove();
          if (on) b.insertAdjacentHTML("beforeend", String(D.micon("check-circle-primary", 16)));
        });
        closeMenus();
        return refresh();
      }
      if (!e.target.closest(".d-menu")) closeMenus();
    });
    page.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenus(); });
  };

  // FLIP: re-render a list and let items glide to their new slots
  D.flip = (box, html, page, axis = "y") => {
    const before = new Map([...box.querySelectorAll("[data-offer]")].map((el) => [el.dataset.offer, el.getBoundingClientRect()]));
    box.innerHTML = html;
    if (D.motionOff()) return;
    const wrap = page.closest(".device-wrap");
    const m = wrap && getComputedStyle(wrap).transform;
    const s = m && m !== "none" ? parseFloat(m.split("(")[1]) : 1;
    box.querySelectorAll("[data-offer]").forEach((el, i) => {
      const b = before.get(el.dataset.offer);
      const a = el.getBoundingClientRect();
      if (b) {
        const dx = (b.left - a.left) / s, dy = (b.top - a.top) / s;
        if (dx || dy) el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
      } else {
        el.animate([{ opacity: 0, transform: "translateY(8px) scale(0.98)" }, { opacity: 1, transform: "none" }], { duration: 320, delay: i * 40, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" });
      }
    });
  };

  // Compare checkbox on any card → shared selection, tab counter, toast
  D.toggleCompare = (page, id, name) => {
    const ok = D.compare.toggle(id);
    if (!ok) { D.toast(page, "You can compare up to 3 loans", { action: "Compare", goto: "compare-loans" }); return null; }
    const on = D.compare.get().includes(id);
    page.querySelectorAll(`[data-compare="${id}"]`).forEach((c) => { c.classList.toggle("is-checked", on); c.setAttribute("aria-checked", on); });
    D.updateCompareCount(page);
    if (on) D.toast(page, `${name} added to compare`, { action: "Compare now", goto: "compare-loans" });
    return on;
  };
  D.updateCompareCount = (page) => {
    const n = D.compare.get().length;
    const tab = page.querySelector('.d-tab[data-tab="compare"]');
    if (!tab) return;
    let badge = tab.querySelector(".d-tab__count");
    if (!n) { badge?.remove(); return; }
    if (!badge) { badge = document.createElement("span"); badge.className = "d-tab__count"; tab.appendChild(badge); }
    badge.textContent = n;
    badge.classList.remove("is-bump"); void badge.offsetWidth; badge.classList.add("is-bump");
  };
})();

/* ==========================================================================
   Applications — list (440:134641), horizontal step tracker, centred modal for
   milestone moments (440:137299). The milestone content is the mobile kit's
   "Loan / Milestone sheet" (ui.Milestone*), so the delight is identical in both views.
   ========================================================================== */
(function () {
  const { html, raw } = OPL;
  const D = OPL.d;

  // Horizontal steps (440:134792): 30px indicator, 3px connector, label 14 + sub 12
  // state: done (green) | progress (blue ring, part-filled connector) | action (amber ring) | todo (grey)
  const IND = {
    done: (i) => (i === 0 ? "step-plain-white" : i === 1 ? "step-buildings-white" : "step-doc-amber"),
    progress: () => "step-buildings-blue",
    action: () => "step-doc-amber",
    todo: () => "step-doc-grey",
  };
  D.hSteps = (steps) => html`
    <div class="d-steps">${steps.map((s, i) => html`
      <div class="d-step d-step--${s.state}" style="--i:${i}">
        <div class="d-step__rail">
          <span class="d-step__ind">${D.icon(s.icon || IND[s.state](i), 16)}</span>
          ${i < steps.length - 1 ? html`<span class="d-step__line"><i></i></span>` : ""}
          <span class="d-step__gap"></span>
        </div>
        <div class="d-step__text"><p>${s.label}</p><small>${s.sub}</small></div>
      </div>`)}
    </div>`;

  // Centred modal (desktop counterpart of the bottom sheet): scrim, spring pop, Esc / scrim to close
  D.openModal = (page, body, { width = 480, cls = "", onClose } = {}) => {
    const host = page.querySelector(".d-app");
    const el = document.createElement("div");
    el.className = `d-modal-layer ${cls}`;
    el.innerHTML = `<div class="d-scrim" data-modal-close></div><section class="d-modal" role="dialog" aria-modal="true" style="width:${width}px">${body}</section>`;
    host.appendChild(el);
    let closed = false;
    const close = () => {
      if (closed) return; closed = true;
      el.classList.remove("is-open");
      document.removeEventListener("keydown", onKey, true);
      setTimeout(() => el.remove(), 320);
      onClose && onClose();
    };
    const onKey = (e) => { if (e.key === "Escape") { e.stopPropagation(); close(); } };
    document.addEventListener("keydown", onKey, true);
    el.addEventListener("click", (e) => { if (e.target.closest("[data-modal-close], [data-sheet-close]")) close(); });
    void el.offsetWidth; el.classList.add("is-open");     // reflow, not rAF: also opens in a background tab
    return { el, close };
  };

  // WhatsApp updates pill (440:134742)
  D.whatsappPill = (on = true) => html`
    <button class="d-wa ${on ? "is-on" : ""}" role="switch" aria-checked="${on}" data-wa>
      ${D.icon("whatsapp", 20)}<span>WhatsApp updates</span><span class="d-toggle__track"><span class="d-toggle__knob"></span></span>
    </button>`;

  D.noteRow = (text) => html`<div class="d-note">${D.icon("info-circle-note", 24)}<span>${text}</span></div>`;
})();

/* Apply ("Proceed applying", mobile 382:41022) as a desktop modal — the mobile sheet body
   (ui.ApplySheetBody) and the same submit: applications start as "verifying", the list
   opens and plays the approval moment. */
(function () {
  const D = OPL.d;
  // "Applications sent to N lenders" (Final Desktop 507:131481): the apply modal turns into the
  // success moment in place. Hero inlined from Figma so its parts can move: glows breathe, the
  // core pops, the plane flies in, the tick lands.
  D.applySent = (m, lenders) => {
    const box = m.el.querySelector(".d-applym");
    const names = lenders.map((l) => l.name);
    const who = names.length > 1 ? names.slice(0, -1).join(", ") + " and " + names[names.length - 1] : names[0];
    const n = lenders.length;
    box.classList.add("is-leaving");
    setTimeout(() => {
      box.className = "d-sent";
      box.innerHTML = String(OPL.html`
        <div class="d-sent__hero" data-sent-hero aria-hidden="true"></div>
        <div class="d-sent__msg">
          <h2>Applications sent to ${n} lender${n === 1 ? "" : "s"}</h2>
          <p>${who} ${n === 1 ? "is" : "are"} now checking your details. <b>Lenders usually reply in 5 to 7 working days.</b></p>
        </div>
        <div class="d-sent__card">${lenders.map((l, i) => OPL.html`${i ? OPL.raw('<span class="d-sent__div"></span>') : ""}
          <div class="d-sent__row" style="--i:${i}">${OPL.ui.Logo({ id: l.logo, size: 36 })}<div><p>${l.name}</p><small>${l.type}</small></div><span class="d-sent__chip">Sent</span></div>`)}
        </div>
        <div class="d-sent__actions">
          ${D.btn({ label: "Track applications", style: "filled", size: "lg", cls: "d-btn--block", attrs: "data-sent-track" })}
          <button class="d-sent__done" data-sent-done>Done</button>
        </div>`);
      D.inlineSvg("sent-hero").then((svg) => {
        const host = box.querySelector("[data-sent-hero]");
        host.innerHTML = svg;
        void host.offsetWidth;
        if (!D.motionOff()) host.classList.add("is-in"); else host.classList.add("is-static");
      });
    }, D.motionOff() ? 0 : 180);
  };

  D.apply = (page, ids) => {
    ids = (ids || []).filter(Boolean);
    if (!ids.length) return;
    const cl = OPL.data.compareLoans;
    const lenderOf = (id) => {
      const rec = cl.records[cl.aliases[id] || id];
      const card = OPL.data.loanCatalog[id];
      return { id, name: rec ? rec.name : card.title, logo: rec ? rec.logo : card.logo,
        type: rec ? rec.values.type : card.subtitle, amount: OPL.fx.longAmount(rec ? rec.values.amount : `Up to ${card.figures[0].value}`) };
    };
    const body = OPL.ui.ApplySheetBody({ lenders: ids.map(lenderOf) }).toString();
    const m = D.openModal(page, `<div class="d-applym">${body}</div>`, { width: 480, cls: "d-modal--apply" });
    m.el.addEventListener("click", (e) => {
      const c = e.target.closest("[data-consent]");
      if (c) {
        const on = c.getAttribute("aria-pressed") !== "true";
        c.setAttribute("aria-pressed", on);
        c.querySelector("img").src = `assets/icons/${on ? "check-square-22" : "check-square"}.svg`;
        c.classList.remove("is-popping"); void c.offsetWidth; c.classList.add("is-popping");
        m.el.querySelector("[data-apply-submit]").disabled = !on;
        return;
      }
      const sub = e.target.closest("[data-apply-submit]");
      if (e.target.closest("[data-sent-track]")) { m.close(); return setTimeout(() => OPL.go("applications"), D.motionOff() ? 0 : 220); }
      if (e.target.closest("[data-sent-done]")) return m.close();
      if (sub) {
        sub.classList.add("is-loading");
        setTimeout(() => {
          const apps = OPL.screens.applications;
          apps.apps = ids.map((id) => ({ id, status: "verifying" }));
          apps.fresh = true;                       // the list still plays the approval moment
          D.applySent(m, ids.map(lenderOf));
        }, D.motionOff() ? 0 : 900);
      }
    });
  };
})();

/* Compare tray (524:106147) — sticks to the bottom of the main panel once an offer is
   ticked for comparison (Overview, Loan Offers). Picked lenders as chips, dashed empty
   slots, Clear all, and Compare (enabled from 2 picks). Replaces the "added" toast. */
(function () {
  const { html } = OPL;
  const D = OPL.d;
  const info = (id) => {
    const c = OPL.ddata.compare;
    const r = c.records[c.aliases[id] || id];
    return r ? { name: r.name, logo: r.logo } : null;
  };
  const inner = () => {
    const ids = D.compare.get().filter((id) => info(id)).slice(0, 3);
    const n = ids.length;
    const sub = n < 2 ? "Pick at least one more" : n < 3 ? "Add one more, or compare now" : "Ready to compare";
    return String(html`
      <div class="d-cbar__picked">
        <div class="d-cbar__status"><p>${n} of 3 picked</p><small>${sub}</small></div>
        <div class="d-cbar__slots">
          ${ids.map((id) => { const l = info(id); return html`<span class="d-cbar__chip" data-chip-id="${id}">${D.logo(l.logo, { size: 36 })}<b>${l.name}</b><button class="d-cbar__x" data-cbar-remove="${id}" aria-label="Remove ${l.name}">${D.icon("bar-close", 20)}</button></span>`; })}
          ${[...Array(3 - n)].map((_, i) => html`<span class="d-cbar__slot">Slot ${n + i + 1}</span>`)}
        </div>
      </div>
      <div class="d-cbar__actions">
        <button class="d-cbar__clear" data-cbar-clear>Clear all</button>
        <button class="d-cbar__go" data-cbar-go ${n < 2 ? "disabled" : ""}>Compare${D.icon("bar-arrow-on", 16)}</button>
      </div>`);
  };
  D.mountCompareBar = (page) => {
    const main = page.querySelector(".d-main");
    if (!main) return;
    const bar = document.createElement("div");
    bar.className = "d-cbar";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Compare loans");
    main.appendChild(bar);
    const paint = (bump) => {
      const n = D.compare.get().filter((id) => info(id)).length;
      bar.innerHTML = inner();
      bar.classList.toggle("is-up", n > 0);
      main.classList.toggle("has-cbar", n > 0);
      if (bump) { const chip = bar.querySelector(`[data-chip-id="${bump}"]`); chip && chip.classList.add("is-new"); }
    };
    paint();
    if (D.compare.get().length) bar.classList.add("is-instant");
    bar.addEventListener("click", (e) => {
      const rm = e.target.closest("[data-cbar-remove]");
      if (rm) {
        D.compare.set(D.compare.get().filter((x) => x !== rm.dataset.cbarRemove));
        page.querySelectorAll(`[data-compare="${rm.dataset.cbarRemove}"]`).forEach((c) => { c.classList.remove("is-checked"); c.setAttribute("aria-checked", "false"); });
        D.updateCompareCount(page);
        return paint();
      }
      if (e.target.closest("[data-cbar-clear]")) {
        D.compare.get().forEach((id) => page.querySelectorAll(`[data-compare="${id}"]`).forEach((c) => { c.classList.remove("is-checked"); c.setAttribute("aria-checked", "false"); }));
        D.compare.set([]);
        D.updateCompareCount(page);
        return paint();
      }
      if (e.target.closest("[data-cbar-go]")) return OPL.go("compare-loans");
    });
    D._cbar = { paint, bar };
    return paint;
  };
  // the compare checkbox now updates the tray instead of raising a toast
  D.toggleCompare = (page, id) => {
    const ok = D.compare.toggle(id);
    const bar = page.querySelector(".d-cbar");
    if (!ok) { bar && bar.animate([{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "none" }], { duration: 260 }); return null; }
    const on = D.compare.get().includes(id);
    page.querySelectorAll(`[data-compare="${id}"]`).forEach((c) => { c.classList.toggle("is-checked", on); c.setAttribute("aria-checked", on); });
    D.updateCompareCount(page);
    if (bar && D._cbar && D._cbar.bar === bar) D._cbar.paint(on ? id : null);
    return on;
  };
})();
