/* Desktop · Govt. subsidies — home (524:98724) with the state picker (524:99394) and the
   "Explore subsidies for your new unit" modal (524:99050), and the expansion results
   (524:99743). Hero, chips and pills reuse the Loans language; the promo illustration and its
   motion are the mobile kit's (ground rises, factory settles, pins drop, smoke drifts). */
(function () {
  const { html, raw, ui } = OPL;
  const D = OPL.d;
  const S = () => OPL.ddata.subsidies;

  D.subsidyCard = (c) => html`
    <article class="d-scard" data-scard="${c.id}" style="--tint:${c.tint}" tabindex="0">
      <div class="d-scard__head">
        <span class="d-card__tag">${c.tag}</span>
        <div class="d-card__id">${ui.Logo({ id: c.logo, size: 40 })}<div><p class="d-card__name">${c.name}</p><p class="d-card__sub">${c.sub}</p></div></div>
      </div>
      <div class="d-scard__body">
        <div class="d-scard__fig"><b>${c.value}</b><small>${c.note}</small></div>
        <div class="d-scard__actions">
          ${D.btn({ label: "Call an Expert", style: "outlined", size: "lg", cls: "d-btn--neutral d-btn--grow", icon: D.icon("phone-primary", 16), goto: "expert" })}
          ${D.btn({ label: "Check Details", style: "tonal", size: "lg", cls: "d-btn--grow", iconRight: D.icon("arrow-primary-16", 16), goto: "subsidy-detail" })}
        </div>
      </div>
    </article>`;

  const limitHero = (h) => html`
    <section class="d-hero" data-enter>
      <div class="d-hero__copy"><p class="d-hero__eyebrow">${h.eyebrow}</p><p class="d-hero__amount" data-countup>${h.amount}</p></div>
      <div class="d-hero__glass">
        <div class="d-hero__picks">${h.picks.map((p) => html`
          <div class="d-pick"><span class="d-pick__icon">${D.icon(p.icon, 20)}</span><div><p class="d-pick__label">${p.label}</p><p class="d-pick__value">${p.value}</p></div></div>`)}
        </div>
        ${D.aiRow(h.ai, { cls: "d-ai--glass" })}
      </div>
    </section>`;

  const promo = (p) => html`
    <section class="d-promo" data-promo>
      <h3 class="d-promo__title">${p.title[0]}<br>${p.title[1]}</h3>
      <div class="d-promo__actions">
        ${D.btn({ label: p.secondary, style: "outlined", size: "lg", cls: "d-btn--neutral d-btn--grow", icon: D.icon("phone-primary", 16), goto: "expert" })}
        ${D.btn({ label: p.primary, style: "tonal", size: "lg", cls: "d-btn--grow", iconRight: D.icon("arrow-primary-16", 16), attrs: "data-explore" })}
      </div>
      <div class="d-promo__art" aria-hidden="true">
        <img class="d-promo__ground" src="${OPL.simg("home/promo-ground.svg")}" alt="">
        <img class="d-promo__pin d-promo__pin--lg" src="${OPL.simg("home/pin-large.png")}" alt="">
        <div class="d-promo__factory">
          <img class="d-promo__smoke d-promo__smoke--b" src="${OPL.simg("home/smoke-b.png")}" alt="">
          <img class="d-promo__smoke d-promo__smoke--a" src="${OPL.simg("home/smoke-a.png")}" alt="">
          <img class="d-promo__building" src="${OPL.simg("home/factory.png")}" alt="">
        </div>
        <img class="d-promo__pin d-promo__pin--sm" src="${OPL.simg("home/pin-small.png")}" alt="">
      </div>
    </section>`;

  const statePicker = (s, current) => html`
    <div class="d-menu d-menu--states" role="dialog" aria-label="Choose a state" data-menu-for="state">
      <label class="d-dsearch d-dsearch--sm">${D.icon("drawer-search", 16)}<input type="search" placeholder="${s.search}" data-state-search aria-label="${s.search}"></label>
      <p class="d-menu__caption">${s.caption}</p>
      <div class="d-menu__list" data-state-list>
        ${s.options.map((o) => html`<button class="d-menu__item ${o === current ? "is-on" : ""}" role="menuitemradio" aria-checked="${o === current}" data-state="${o}">${o}${o === current ? D.micon("check-circle-primary", 16) : ""}</button>`)}
      </div>
    </div>`;

  // Explore modal (524:99050) → results
  D.openExplore = (page, prefill = {}) => {
    const e = S().explore;
    const body = String(html`
      <form class="d-explore" data-explore-form>
        <div class="d-explore__head"><h2>${e.title}</h2><button type="button" class="d-explore__x" data-modal-close aria-label="Close">${D.icon("close-circle-drawer", 24)}</button></div>
        <p class="d-explore__body">${e.body}</p>
        <div class="d-explore__grid">${e.fields.map((f) => html`
          <label class="d-field"><span class="d-field__label">${f.label}</span>
            <span class="d-select"><select name="${f.id}" class="${prefill[f.id] ? "" : "is-empty"}">
              <option value="">${f.placeholder}</option>${f.options.map((o) => html`<option ${o === prefill[f.id] ? raw("selected") : ""}>${o}</option>`)}
            </select>${D.icon("chevron-muted", 16, "d-select__chev")}</span></label>`)}
        </div>
        <div class="d-explore__actions">
          <button type="button" class="d-explore__cancel" data-modal-close>${e.cancel}</button>
          ${D.btn({ label: e.cta, style: "filled", size: "lg", cls: "d-explore__go", iconRight: D.icon("arrow-white-16", 16), attrs: 'type="submit"' })}
        </div>
      </form>`);
    const m = D.openModal(page, body, { width: 520, cls: "d-modal--explore" });
    const form = m.el.querySelector("form");
    form.addEventListener("change", (ev) => ev.target.classList.toggle("is-empty", !ev.target.value));
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const fd = new FormData(form), pick = {};
      e.fields.forEach((f) => { pick[f.id] = fd.get(f.id) || e.figmaPick[f.id]; });
      OPL.dscreens["subsidies-explore"].pick = pick;
      m.close();
      setTimeout(() => OPL.go("subsidies-explore"), D.motionOff() ? 0 : 200);
    });
  };

  OPL.dscreens["subsidies-overview"] = {
    title: "Govt. subsidies · Home",
    figma: { home: "524:98724" },
    st: { chips: [], state: "Gujarat", sort: "Alphabetical" },

    cards() {
      const st = this.st, t = S().top;
      let list = t.cards.filter((c) => !st.chips.length || st.chips.some((ch) => ch === c.kind || ch === "Sector" || ch === "Import & Export"));
      if (st.state !== "Gujarat") list = list.filter((c) => c.kind === "Central");   // other states: only central schemes apply
      if (st.sort === "Highest benefit") list = list.slice().sort((a, b) => (b.value.includes("%") ? 1 : 0) - (a.value.includes("%") ? 1 : 0));
      if (!list.length) return `<div class="d-empty"><p class="d-empty__title">No subsidies match these filters</p><p class="d-empty__body">Try another state or remove a filter.</p></div>`;
      return list.map((c) => String(D.subsidyCard(c))).join("");
    },

    render(page) {
      const s = S(), t = s.top, st = this.st;
      page.innerHTML = D.shell({
        nav: "subsidies", title: s.title, tab: null,
        body: html`
          <div class="d-sub">
            <div class="d-ov__top d-sub__top">
              ${limitHero(s.hero)}
              <section class="d-refine" data-enter>
                <img class="d-refine__art" src="assets/lazy/dsk/refine-art.png" width="165" height="87" alt="">   <!-- 558:104693 -->
                <div class="d-refine__copy"><h3>${s.refine.title}</h3><p>${s.refine.body}</p></div>
                ${D.btn({ label: s.refine.cta, style: "filled", size: "lg", cls: "d-btn--block", iconRight: D.icon("arrow-white-16", 16), goto: "subsidy-refine" })}
              </section>
            </div>
            <section class="d-matches" data-enter>
              <div class="d-matches__head">
                ${D.sectionHead({ title: t.title, count: t.count, link: t.link, goto: "subsidies-explore" })}
                <div class="d-toolbar">
                  <div class="d-toolbar__chips">${t.chips.map((c) => D.chip(c, { selected: st.chips.includes(c), attrs: `data-schip="${c}"` }))}</div>
                  <div class="d-toolbar__right">
                    <div class="d-menu-anchor">
                      <button class="d-pill d-pill--sort" data-menu="state" aria-haspopup="dialog" aria-expanded="false">${D.icon("map-point", 16)}<span class="d-pill__muted">${t.location.label}</span><b data-state-label>${st.state}</b>${D.icon("chevron-muted", 14, "d-pill__chev")}</button>
                      ${statePicker(s.states, st.state)}
                    </div>
                    <div class="d-menu-anchor">
                      <button class="d-pill d-pill--sort" data-menu="ssort" aria-haspopup="menu" aria-expanded="false">${D.icon("list-arrow-down", 16)}<span class="d-pill__muted">${t.sort.label}</span><b data-sort-label>${st.sort}</b>${D.icon("chevron-muted", 14, "d-pill__chev")}</button>
                      <div class="d-menu" role="menu" data-menu-for="ssort">${t.sort.options.map((o) => html`<button class="d-menu__item ${o === st.sort ? "is-on" : ""}" role="menuitemradio" aria-checked="${o === st.sort}" data-ssort="${o}">${o}${o === st.sort ? D.micon("check-circle-primary", 16) : ""}</button>`)}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-cards d-sub__cards" data-scards>${raw(this.cards())}</div>
            </section>
            ${promo(s.promo)}
          </div>`,
      });
      D.mountShell(page);
      D.enter(page);
      const amt = page.querySelector("[data-countup]");
      if (amt && !D.motionOff()) D.countUp(amt);
      this.playPromo(page);
      this.bind(page);
    },

    playPromo(page) {
      const el = page.querySelector("[data-promo]");
      if (!el || D.motionOff()) return;
      const io = new IntersectionObserver((es) => { if (es.some((x) => x.isIntersecting)) { el.classList.add("is-playing"); io.disconnect(); } }, { threshold: 0.5 });
      OPL.afterReveal(() => io.observe(el));
    },

    refresh(page) {
      const box = page.querySelector("[data-scards]");
      box.innerHTML = this.cards();
      if (!D.motionOff()) box.querySelectorAll(".d-scard").forEach((c, i) => c.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 320, delay: i * 50, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" }));
    },

    bind(page) {
      const st = this.st;
      const closeMenus = () => page.querySelectorAll(".d-menu.is-open").forEach((m) => { m.classList.remove("is-open"); page.querySelector(`[data-menu="${m.dataset.menuFor}"]`)?.setAttribute("aria-expanded", "false"); });
      page.addEventListener("click", (e) => {
        const chip = e.target.closest("[data-schip]");
        if (chip) {
          const c = chip.dataset.schip;
          st.chips = st.chips.includes(c) ? st.chips.filter((x) => x !== c) : [...st.chips, c];
          chip.classList.toggle("is-selected"); chip.setAttribute("aria-pressed", st.chips.includes(c));
          return this.refresh(page);
        }
        const mb = e.target.closest("[data-menu]");
        if (mb) {
          const menu = page.querySelector(`[data-menu-for="${mb.dataset.menu}"]`);
          const open = !menu.classList.contains("is-open");
          closeMenus(); menu.classList.toggle("is-open", open); mb.setAttribute("aria-expanded", open);
          if (open) setTimeout(() => (menu.querySelector("input") || menu.querySelector(".is-on"))?.focus({ preventScroll: true }), 60);
          return;
        }
        const pickState = e.target.closest("[data-state]");
        if (pickState) {
          st.state = pickState.dataset.state;
          page.querySelector("[data-state-label]").textContent = st.state;
          page.querySelectorAll("[data-state]").forEach((b) => { const on = b.dataset.state === st.state; b.classList.toggle("is-on", on); b.setAttribute("aria-checked", on); b.querySelector(".ico")?.remove(); if (on) b.insertAdjacentHTML("beforeend", String(D.micon("check-circle-primary", 16))); });
          closeMenus();
          return this.refresh(page);
        }
        const so = e.target.closest("[data-ssort]");
        if (so) {
          st.sort = so.dataset.ssort;
          page.querySelector("[data-sort-label]").textContent = st.sort;
          page.querySelectorAll("[data-ssort]").forEach((b) => { const on = b.dataset.ssort === st.sort; b.classList.toggle("is-on", on); b.querySelector(".ico")?.remove(); if (on) b.insertAdjacentHTML("beforeend", String(D.micon("check-circle-primary", 16))); });
          closeMenus();
          return this.refresh(page);
        }
        if (e.target.closest("[data-explore]")) { e.stopPropagation(); return D.openExplore(page); }
        if (!e.target.closest(".d-menu")) closeMenus();
        const card = e.target.closest("[data-scard]");
        if (card && !e.target.closest("button")) return OPL.go("subsidy-detail");
      });
      page.addEventListener("input", (e) => {
        if (!e.target.matches("[data-state-search]")) return;
        const q = e.target.value.trim().toLowerCase();
        page.querySelectorAll("[data-state]").forEach((b) => { b.hidden = q && !b.dataset.state.toLowerCase().includes(q); });
      });
      page.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenus(); if (e.key === "Enter" && e.target.matches("[data-scard]")) OPL.go("subsidy-detail"); });
    },
  };

  /* Expansion results — "Exlplore" 558:101968. The four answers sit in a brief card (each one a
     dropdown that re-runs the search in place) beside the new-unit art; then "N subsidies found",
     State / Sector chips, Sort, and the cards three across. */
  OPL.dscreens["subsidies-explore"] = {
    title: "Govt. subsidies · Explore",
    figma: { results: "558:101968" },
    pick: null,
    st: { chips: [], sort: "Alphabetical" },

    list() {
      const r = S().results, st = this.st;
      let list = r.cards.map((c, i) => ({ ...c, id: c.id + "-" + i }));
      if (st.chips.includes("State")) list = list.filter((c) => c.kind === "State");
      if (st.sort === "Highest benefit") list = list.slice().sort((a, b) => (b.value.includes("%") ? 1 : 0) - (a.value.includes("%") ? 1 : 0));
      return list;
    },
    cardsHtml() {
      const list = this.list();
      if (!list.length) return `<div class="d-empty"><p class="d-empty__title">No subsidies match these filters</p><p class="d-empty__body">Remove a filter or change an answer above.</p></div>`;
      return list.map((c) => String(D.subsidyCard(c))).join("");
    },

    render(page) {
      const s = S(), r = s.results, st = this.st;
      const pick = (this.pick = this.pick || { ...s.explore.figmaPick });
      const field = (id) => s.explore.fields.find((f) => f.id === id);
      const show = (q) => (q.short ? q.short(pick[q.id]) : pick[q.id]);
      page.innerHTML = D.shell({
        nav: "subsidies", title: "", tab: null,
        body: html`
          <div class="d-subx">
            <button class="d-subx__back" data-goto="subsidies-overview">${D.icon("back-arrow", 16)}<span>${r.back}</span></button>
            <div class="d-subx__head" data-enter>
              <h1 class="d-title">${r.title}</h1>
              <section class="d-subx__brief" aria-label="Your answers">
                <div class="d-subx__qs">${r.picks.map((q, i) => html`
                  ${i ? raw('<span class="d-subx__rule" aria-hidden="true"></span>') : ""}
                  <div class="d-menu-anchor">
                    <button class="d-subx__q" data-menu="q-${q.id}" aria-haspopup="menu" aria-expanded="false">
                      <span class="d-subx__q-label">${q.label}</span>
                      <span class="d-subx__q-value"><b data-q-value="${q.id}">${show(q)}</b>${D.icon("switcher-chevron", 16, "d-subx__q-chev")}</span>
                    </button>
                    <div class="d-menu d-menu--q" role="menu" data-menu-for="q-${q.id}">${field(q.id).options.map((o) => html`
                      <button class="d-menu__item ${o === pick[q.id] ? "is-on" : ""}" role="menuitemradio" aria-checked="${o === pick[q.id]}" data-q="${q.id}" data-q-opt="${o}">${o}${o === pick[q.id] ? D.micon("check-circle-primary", 16) : ""}</button>`)}
                    </div>
                  </div>`)}
                </div>
                <div class="d-subx__art" aria-hidden="true">
                  <img class="d-subx__ground" src="${OPL.simg("home/promo-ground.svg")}" alt="">
                  <img class="d-subx__pin d-subx__pin--lg" src="${OPL.simg("home/pin-large.png")}" alt="">
                  <div class="d-subx__factory">
                    <img class="d-promo__smoke d-promo__smoke--b" src="${OPL.simg("home/smoke-b.png")}" alt="">
                    <img class="d-promo__smoke d-promo__smoke--a" src="${OPL.simg("home/smoke-a.png")}" alt="">
                    <img class="d-promo__building" src="${OPL.simg("home/factory.png")}" alt="">
                  </div>
                  <img class="d-subx__pin d-subx__pin--sm" src="${OPL.simg("home/pin-small.png")}" alt="">
                </div>
              </section>
            </div>
            <section class="d-subx__results">
              <div class="d-subx__bar">
                <p class="d-subx__found" data-found>${r.found(this.list().length)}</p>
                <div class="d-toolbar">
                  <div class="d-toolbar__chips">${r.chips.map((c) => D.chip(c, { selected: st.chips.includes(c), attrs: `data-xchip="${c}"` }))}</div>
                  <div class="d-toolbar__right">
                    <div class="d-menu-anchor">
                      <button class="d-pill d-pill--sort" data-menu="xsort" aria-haspopup="menu" aria-expanded="false">${D.icon("list-arrow-down", 16)}<span class="d-pill__muted">${r.sort.label}</span><b data-xsort-label>${st.sort}</b>${D.icon("chevron-muted", 14, "d-pill__chev")}</button>
                      <div class="d-menu" role="menu" data-menu-for="xsort">${r.sort.options.map((o) => html`<button class="d-menu__item ${o === st.sort ? "is-on" : ""}" role="menuitemradio" aria-checked="${o === st.sort}" data-xsort="${o}">${o}${o === st.sort ? D.micon("check-circle-primary", 16) : ""}</button>`)}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-cards d-sub__cards d-subx__cards" data-xcards>${raw(this.cardsHtml())}</div>
            </section>
          </div>`,
      });
      D.mountShell(page);
      D.enter(page);
      const brief = page.querySelector(".d-subx__brief");
      if (!D.motionOff()) {
        OPL.afterReveal(() => brief.classList.add("is-playing"));          // ground rises, factory settles, pins drop, smoke
        this.animateCards(page, 120);
      }
      this.bind(page);
    },

    animateCards(page, delay = 0) {
      if (D.motionOff()) return;
      page.querySelectorAll("[data-xcards] .d-scard").forEach((c, i) => c.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], { duration: 360, delay: delay + i * 55, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" }));
    },
    refresh(page) {
      page.querySelector("[data-xcards]").innerHTML = this.cardsHtml();
      page.querySelector("[data-found]").textContent = S().results.found(this.list().length);
      this.animateCards(page);
    },

    bind(page) {
      const r = S().results, st = this.st;
      const tick = (sel, on) => page.querySelectorAll(sel).forEach((b) => { const yes = on(b); b.classList.toggle("is-on", yes); b.setAttribute("aria-checked", yes); b.querySelector(".ico")?.remove(); if (yes) b.insertAdjacentHTML("beforeend", String(D.micon("check-circle-primary", 16))); });
      const closeMenus = () => page.querySelectorAll(".d-menu.is-open").forEach((m) => { m.classList.remove("is-open"); page.querySelector(`[data-menu="${m.dataset.menuFor}"]`)?.setAttribute("aria-expanded", "false"); });
      page.addEventListener("click", (e) => {
        const mb = e.target.closest("[data-menu]");
        if (mb) {
          const menu = page.querySelector(`[data-menu-for="${mb.dataset.menu}"]`);
          const open = !menu.classList.contains("is-open");
          closeMenus(); menu.classList.toggle("is-open", open); mb.setAttribute("aria-expanded", open);
          if (open) setTimeout(() => menu.querySelector(".is-on")?.focus({ preventScroll: true }), 60);
          return;
        }
        // an answer changed: the search re-runs in place
        const q = e.target.closest("[data-q-opt]");
        if (q) {
          const id = q.dataset.q, v = q.dataset.qOpt, def = r.picks.find((x) => x.id === id);
          this.pick[id] = v;
          const val = page.querySelector(`[data-q-value="${id}"]`);
          val.textContent = def.short ? def.short(v) : v;
          val.classList.remove("is-changed"); void val.offsetWidth; val.classList.add("is-changed");
          tick(`[data-q="${id}"]`, (b) => b.dataset.qOpt === v);
          closeMenus();
          return this.refresh(page);
        }
        const chip = e.target.closest("[data-xchip]");
        if (chip) {
          const c = chip.dataset.xchip;
          st.chips = st.chips.includes(c) ? st.chips.filter((x) => x !== c) : [...st.chips, c];
          chip.classList.toggle("is-selected"); chip.setAttribute("aria-pressed", st.chips.includes(c));
          return this.refresh(page);
        }
        const so = e.target.closest("[data-xsort]");
        if (so) {
          st.sort = so.dataset.xsort;
          page.querySelector("[data-xsort-label]").textContent = st.sort;
          tick("[data-xsort]", (b) => b.dataset.xsort === st.sort);
          closeMenus();
          return this.refresh(page);
        }
        if (!e.target.closest(".d-menu")) closeMenus();
        const card = e.target.closest("[data-scard]");
        if (card && !e.target.closest("button")) return OPL.go("subsidy-detail");
      });
      page.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenus(); if (e.key === "Enter" && e.target.matches("[data-scard]")) OPL.go("subsidy-detail"); });
    },
  };
})();
