/* ==========================================================================
   Screen · Subsidies home — Figma 524:103425
   Entry: Finance Home → "Explore Subsidies". Gateway to every subsidy: the
   benefit-type chips, "View all" and the filters lead to the listing; a top
   subsidy card opens its details.

   Motion thesis
   · The headline amount counts up while the benefit chips settle in and their
     counts tick up — "this is what's available to you".
   · Central / State filter the Top subsidies rail in place: cards that don't
     match fold away, the rest slide together.
   · The "new unit" card tells its own story when it scrolls in: the ground
     rises, the factory settles, two location pins drop in, smoke drifts up.
   ========================================================================== */
(function () {
  const { html, ui, cx } = OPL;
  OPL.screens = OPL.screens || {};
  const sicon = (n, s, c) => OPL.sicon(n, s, c);
  const simg = (n) => OPL.simg(n);

  const heroChip = (c) => html`
    <button class="sh-chip" data-press data-goto="${c.goto}">
      ${sicon(c.icon, 24)}
      <span class="sh-chip__label">${c.label}</span>
      <span class="sh-chip__count" data-count="${c.count}">${c.count}</span>
      ${OPL.icon("alt-arrow-left", 16, "sh-chip__chev")}
    </button>`;

  /* "Schemes in" sheet: states from the GST registration, radio rows that apply on tap */
  const stateRow = (value, on) => html`
    <button class="${cx("sh-state", on && "is-selected")}" role="radio" aria-checked="${on}" data-place="${value}" data-press>
      <span class="sh-state__name">${value}</span>
      ${on ? OPL.raw(`<img class="ico sh-state__radio" src="assets/icons/radio-selected.svg" width="20" height="20" alt="">`) : OPL.raw(`<span class="sort-opt__radio sh-state__radio"></span>`)}
    </button>`;
  const statesBody = (s, place) => html`
    <div class="sh-states">
      <label class="sh-search">${sicon("search-16", 16)}<input type="search" placeholder="${s.search}" aria-label="${s.search}" data-place-search autocomplete="off" spellcheck="false"></label>
      <p class="sh-states__caption">${s.caption}</p>
      <div class="sh-states__list" role="radiogroup" aria-label="${s.title}" data-place-list>
        ${s.options.map((o) => stateRow(o, o === place))}
      </div>
      <p class="sh-states__empty" data-place-empty hidden></p>
    </div>`;

  OPL.screens["subsidies-overview"] = {
    title: "Subsidies home",
    figma: { default: "524:103425" },
    timers: [],
    filter: null,
    place: null,                                   // "Schemes in" pick; defaults to the GST principal state
    leave() { this.timers.forEach((t) => { clearTimeout(t); clearInterval(t); }); this.timers = []; },

    render(page) {
      this.leave();
      const d = OPL.data.subsidiesHome, t = d.top;
      if (!this.place) this.place = d.states.home;
      const v = OPL.variantValues("subsidies-overview");
      const cards = OPL.data.home.subsidies.cards;

      page.innerHTML = html`
        ${ui.StatusBar()}
        <div class="scroller">
          <main class="sh">
            <section class="sh-hero">
              <div class="sh-hero__bg">
                <img class="sh-hero__ellipse" src="${OPL.img("hero-ellipse.svg")}" alt="">
                <img class="sh-hero__texture" src="${OPL.img("hero-texture.jpg")}" alt="">
              </div>
              <div class="sh-hero__header">${ui.AppHeader({ title: d.header.title, back: true, actions: d.header.actions })}</div>
              <div class="sh-hero__title">
                <p class="sh-hero__eyebrow">${d.hero.eyebrow}</p>
                <p class="sh-hero__amount">${d.hero.prefix}${d.hero.value}${d.hero.suffix}</p>
              </div>
              <div class="sh-hero__chips">${d.hero.chips.map((row) => html`<div class="sh-hero__row">${row.map(heroChip)}</div>`)}</div>
            </section>

            <section class="sh-top">
              ${ui.SectionHeader({ title: t.title, action: t.action, goto: t.goto })}
              <div class="rail rail--chips sh-filters">
                <button class="sh-where" data-press data-open-sheet="states" aria-haspopup="dialog">
                  ${sicon("map-point-16", 16)}<span class="sh-where__label">${t.location.label}</span><span class="sh-where__value" data-place-label>${this.place}</span>${sicon("alt-arrow-right-14", 14, "sh-where__chev")}
                </button>
                <span class="chip-divider"></span>
                ${t.filters.map((f) => ui.Chip({ label: f.label, selected: this.filter === f.match && !!f.match, goto: f.goto, attrs: f.match ? `data-filter="${f.match}"` : "" }))}
              </div>
              <p class="sh-none" data-none hidden></p>
              <div class="rail sh-rail" data-rail>${cards.map((c) => OPL.raw(ui.MatchCard(c).toString().replace("<article ", `<article data-tag="${c.tag}" `)))}</div>
            </section>

            <section class="sh-promo">
              <img class="sh-promo__ground" src="${simg("home/promo-ground.svg")}" alt="" aria-hidden="true">
              <img class="sh-promo__pin sh-promo__pin--lg" src="${simg("home/pin-large.png")}" alt="" aria-hidden="true">
              <div class="sh-promo__factory" aria-hidden="true">
                <img class="sh-promo__smoke sh-promo__smoke--b" src="${simg("home/smoke-b.png")}" alt="">
                <img class="sh-promo__smoke sh-promo__smoke--a" src="${simg("home/smoke-a.png")}" alt="">
                <img class="sh-promo__building" src="${simg("home/factory.png")}" alt="">
              </div>
              <img class="sh-promo__pin sh-promo__pin--sm" src="${simg("home/pin-small.png")}" alt="" aria-hidden="true">
              <h2 class="sh-promo__title">${d.promo.title}</h2>
              <div class="sh-promo__actions">
                <button class="sh-pbtn sh-pbtn--line" data-press data-goto="${d.promo.secondary.goto}">${sicon("phone-calling-rounded-16", 16)}<span>${d.promo.secondary.label}</span></button>
                <button class="sh-pbtn sh-pbtn--tonal" data-press data-goto="${d.promo.primary.goto}"><span>${d.promo.primary.label}</span>${sicon("arrow-right-primary-16", 16, "sh-pbtn__arrow")}</button>
              </div>
            </section>
          </main>
        </div>
        <div class="floating">
          ${ui.AiMitraFab({ nudge: v.nudge === "on" ? d.aiNudge : null })}
        </div>
        ${ui.Sheet({ id: "states", title: d.states.title, body: statesBody(d.states, this.place) })}`;

      this.wire(page, d);
    },

    wire(page, d) {
      const motionOff = OPL.fx.motionOff();
      OPL.fx.statusOnScroll(page);
      OPL.fx.nudge(page, this.timers);
      page.querySelectorAll(".rail").forEach(OPL.fx.mouseDrag);

      /* Central / State and "Schemes in" filter the rail in place. Outside the home (GST principal)
         state only central schemes apply, so state-tagged cards step aside. */
      const rail = page.querySelector("[data-rail]");
      const none = page.querySelector("[data-none]");
      const apply = (match) => {
        this.filter = match;
        const away = this.place !== d.states.home;
        page.querySelectorAll("[data-filter]").forEach((c) => c.classList.toggle("is-selected", c.dataset.filter === match));
        let shown = 0;
        rail.querySelectorAll(".match").forEach((card) => {
          const out = (match && card.dataset.tag !== match) || (away && card.dataset.tag === "State Government");
          card.classList.toggle("is-filtered-out", !!out);
          card.toggleAttribute("inert", !!out);
          if (!out) shown++;
        });
        none.hidden = shown > 0;
        rail.classList.toggle("is-empty", !shown);          // nothing to show: the rail folds away too
        if (!shown) none.textContent = d.states.none(this.place, match && (d.top.filters.find((f) => f.match === match) || {}).label);
        rail.scrollTo({ left: 0, behavior: motionOff ? "auto" : "smooth" });
      };

      const sheets = OPL.fx.sheets(page, { onClose: () => {
        OPL.state.set({ sheet: null }, { silent: true });
        const q = page.querySelector("[data-place-search]");
        if (q && q.value) { q.value = ""; search(""); }
      } });
      const search = (q) => {
        const k = q.trim().toLowerCase();
        let n = 0;
        page.querySelectorAll("[data-place]").forEach((b) => {
          const hit = !k || b.querySelector(".sh-state__name").textContent.toLowerCase().includes(k);
          b.hidden = !hit; if (hit) n++;
        });
        const empty = page.querySelector("[data-place-empty]");
        empty.hidden = n > 0;
        if (!n) empty.textContent = d.states.empty(q.trim());
      };
      const pick = (value) => {
        this.place = value;
        page.querySelectorAll("[data-place]").forEach((b) => { b.outerHTML = stateRow(b.dataset.place, b.dataset.place === value).toString(); });
        const label = page.querySelector("[data-place-label]");
        label.textContent = value;
        label.classList.remove("is-changed"); void label.offsetWidth; label.classList.add("is-changed");
        this.timers.push(setTimeout(() => { sheets.close(); apply(this.filter); }, motionOff ? 0 : 220));   // radio rows apply on tap, no CTA
      };

      page.addEventListener("click", (e) => {
        const f = e.target.closest("[data-filter]");
        if (f) return apply(this.filter === f.dataset.filter ? null : f.dataset.filter);
        const open = e.target.closest("[data-open-sheet]");
        if (open) { OPL.state.set({ sheet: open.dataset.openSheet }, { silent: true }); return sheets.open(open.dataset.openSheet); }
        const p = e.target.closest("[data-place]");
        if (p) return pick(p.dataset.place);
      });
      page.addEventListener("input", (e) => { if (e.target.matches("[data-place-search]")) search(e.target.value); });
      apply(this.filter);
      if (OPL.variantValues("subsidies-overview").sheet === "states") sheets.open("states", { instant: true });

      /* entrance: amount counts up, chips settle and their counts tick */
      OPL.fx.enter(page, [
        page.querySelector(".sh-hero__title"),
        ...page.querySelectorAll(".sh-chip"),
        page.querySelector(".sh-top .section-head"),
        page.querySelector(".sh-filters"),
        ...page.querySelectorAll(".sh-rail .match"),
        page.querySelector(".sh-promo"),
      ]);
      OPL.countUp(page.querySelector(".sh-hero__amount"), { to: d.hero.value, prefix: d.hero.prefix, suffix: d.hero.suffix, duration: 1000, delay: 150 });
      page.querySelectorAll("[data-count]").forEach((el, i) => OPL.countUp(el, { to: +el.dataset.count, duration: 500, delay: 420 + i * 90 }));
      OPL.fx.playInView(page, ".sh-promo");
    },
  };
})();
