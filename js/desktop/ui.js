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
      { id: "subsidies", label: "Govt. subsidies", icon: "nav-hand-stars", goto: "subsidy-detail" },
      { id: "equity", label: "Equity", icon: "nav-pie" },
      { id: "insurance", label: "Insurance", icon: "nav-shield-star" },
    ] },
    { label: "Grow business", items: [
      { id: "discovery", label: "Discovery Hub", icon: "nav-shop" },
      { id: "news", label: "News", icon: "nav-feed" },
    ] },
  ];
  const navItem = (it, active) => html`
    <button class="d-nav__item ${it.id === active ? "is-active" : ""}" data-goto="${it.goto || "d-" + it.id}" ${it.id === active ? raw('aria-current="page"') : ""}>
      <span class="d-nav__icon">${D.icon(it.icon, it.size || 16)}</span>
      <span class="d-nav__label">${it.label}</span>
    </button>`;
  D.sidebar = (active = "loans") => html`
    <aside class="d-side" aria-label="Main navigation">
      <button class="d-switcher" data-goto="d-business-switcher" aria-label="Switch business">
        <span class="d-switcher__avatar">RF</span>
        <span class="d-switcher__name">Ratan Fabrics Pvt. Ltd.</span>
        ${D.icon("switcher-chevron", 16, "d-switcher__chev")}
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
      <button class="d-top__toggle" data-goto="d-sidebar-toggle" aria-label="Collapse sidebar">${D.icon("top-sidebar-toggle", 40)}</button>
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
    { id: "overview", label: "Overview", icon: "tab-widget-active", goto: "loans-overview" },
    { id: "offers", label: "Loan Offers", icon: "tab-banknote-2", goto: "loan-offers" },
    { id: "compare", label: "Compare", icon: "tab-mirror-left", goto: "compare-loans" },
    { id: "applications", label: "Applications", icon: "tab-document-text", goto: "applications" },
    { id: "myloans", label: "My Loans", icon: "tab-notes", goto: "my-loans" },
  ];
  D.tabs = (active = "overview", counts = {}) => html`
    <div class="d-tabs" role="tablist" data-active="${active}">
      ${TABS.map((t) => html`
        <button class="d-tab ${t.id === active ? "is-active" : ""}" role="tab" aria-selected="${t.id === active}" data-tab="${t.id}" data-goto="${t.goto}">
          ${D.icon(t.icon, 14)}<span>${t.label}</span>${counts[t.id] ? html`<span class="d-tab__count">${counts[t.id]}</span>` : ""}
        </button>`)}
      <span class="d-tabs__rest"></span>
      <span class="d-tabs__ink" aria-hidden="true"></span>
    </div>`;

  /* ---- Page shell ----------------------------------------------------------- */
  // nav: sidebar item · title: page heading (Regular 30/40) · tab: Loans tab (null = none)
  D.shell = ({ nav = "loans", title = "Loans", tab = "overview", counts, body, crumbs, after = "" }) => html`
    <div class="d-app">
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
    <nav class="d-crumbs" aria-label="Breadcrumb">${items.map((c, i) => html`${i ? html`${D.icon("link-arrow-right", 12, "d-crumbs__sep")}` : ""}${c.goto ? html`<button class="d-crumbs__link" data-goto="${c.goto}">${c.label}</button>` : html`<span class="d-crumbs__here">${c.label}</span>`}`)}</nav>`;

  /* ---- AI Mitra FAB (476:200642) + one-time nudge (mobile parity) ----------- */
  D.mitraFab = (nudge = { lead: "Ask anything about", topic: "loans & subsidies" }) => html`
    <div class="d-fab-wrap">
      <span class="d-fab-nudge" aria-hidden="true">${nudge.lead} <b>${nudge.topic}</b></span>
      <button class="d-fab" data-goto="ai-mitra" aria-label="Ask AI Mitra">${D.icon("mitra-logo-fab", 24)}</button>
    </div>`;

  /* ---- Primitives ----------------------------------------------------------- */
  D.count = (n) => html`<span class="d-count">${n}</span>`;
  D.link = (label, goto) => html`<button class="d-link" data-goto="${goto}">${label}${D.icon("link-arrow-right", 14, "d-link__arrow")}</button>`;
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
          ${D.checkbox({ label: "Compare", checked: compared, attrs: `data-compare="${o.id}"` })}
          ${D.btn({ label: "Apply Now", style: "tonal", size: "md", goto: "d-apply", attrs: `data-apply="${o.id}"` })}
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
        OPL.afterReveal(() => requestAnimationFrame(() => {
          g.classList.add("is-in");
          setTimeout(() => g.classList.add("is-settled"), 20 * 34 + 600);
        }));
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
    requestAnimationFrame(() => {
      if (prev && prev !== active && !motionOff()) {
        place(prev, false);
        void ink.offsetWidth;
        place(active, true);
      } else place(active, false);
    });
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
    OPL.afterReveal(() => requestAnimationFrame(() => els.forEach((el) => el.classList.add("is-in"))));
  };

  // Count-up for figures like "₹50 Lakhs" (keeps prefix/suffix)
  D.countUp = (el) => {
    const m = el.textContent.match(/^(\D*)([\d.,]+)(.*)$/);
    if (!m) return;
    const to = parseFloat(m[2].replace(/,/g, ""));
    OPL.countUp(el, { to, prefix: m[1], suffix: m[3], duration: 900, delay: 120 });
  };

  // Every desktop page: shell behaviours
  D.mountShell = (page) => {
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
    requestAnimationFrame(() => t.classList.add("is-in"));
    clearTimeout(D._toastT);
    D._toastT = setTimeout(() => { t.classList.remove("is-in"); setTimeout(() => t.remove(), 300); }, 3200);
  };
})();
