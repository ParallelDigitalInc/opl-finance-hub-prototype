/* ==========================================================================
   Screen · Explore subsidies — Figma 556:128366 (mobile twin of desktop 558:101968)
   Entry: Subsidies home → "Planning a new unit…" → Explore Now.
   The brief card says what the list is for (state · industry · activity · size); its pen
   opens "Edit answers" (the desktop modal's four questions, as a sheet). Sort and Filter
   are the kit's sheets; cards are the Home subsidy match cards at full width.

   Motion
   · the brief card settles while the little factory rises and puffs smoke
   · answers changed: the values tick, the list re-deals card by card
   · filter: cards that don't match fold away, the count follows
   ========================================================================== */
(function () {
  const { html, ui, cx } = OPL;
  OPL.screens = OPL.screens || {};
  const sicon = (n, s, c) => OPL.sicon(n, s, c);
  const D = () => OPL.data.subsidyExplore;

  const shortOf = (f, v) => (f.short ? f.short(v) : v);
  // joined here, so it renders the same inside a template and on its own (innerHTML) — no stray commas
  const briefValues = (pick) => OPL.raw(D().fields.map((f, i) => String(html`${i ? OPL.raw('<i class="sx-brief__dot" aria-hidden="true"></i>') : ""}<span>${shortOf(f, pick[f.id])}</span>`)).join(""));

  OPL.screens["subsidies-explore"] = {
    title: "Explore subsidies",
    figma: { results: "556:128366" },
    timers: [],
    pick: null,
    sort: "Alphabetical",
    filters: new Set(),
    leave() { this.timers.forEach(clearTimeout); this.timers = []; },

    // explore: the expansion answers decide the list; view all: the business's own state
    home() { const h = OPL.screens["subsidies-overview"]; return (h && h.place) || OPL.data.subsidiesHome.states.home; },
    source() { return this.mode === "all" ? OPL.data.schemes.forState(this.place || this.home()) : D().cards(this.pick); },
    list() {
      let list = OPL.data.subsidyRefine.rank(this.source().map((c, i) => ({ ...c, key: i })));
      if (this.filters.size) list = list.filter((c) => this.filters.has(c.tag));
      // All subsidies: State / Central pick the issuer, Sector keeps sector-specific schemes
      if (this.mode === "all" && this.chips.size) {
        const kinds = ["State", "Central"].filter((k) => this.chips.has(k));
        list = list.filter((c) => (!kinds.length || kinds.some((k) => c.tag.startsWith(k))) && (!this.chips.has("Sector") || c.activity));
      }
      if (this.sort === "Highest benefit") list = list.slice().sort((a, b) => (b.figures[0].value.includes("Cr") ? 1 : 0) - (a.figures[0].value.includes("Cr") ? 1 : 0));
      return list;
    },
    cardsHtml() {
      const list = this.list();
      const R = OPL.data.subsidyRefine, n = R.count();
      const refine = ui.RefineBanner(OPL.refine.done ? { ...D().refine, title: R.doneTitle, body: R.doneBody(n), cta: R.doneCta, done: true } : D().refine).toString();
      if (!list.length) return `<p class="sh-none">No subsidies match this filter. Clear it to see all ${this.source().length}.</p>` + refine;
      const cards = list.map((c) => ui.MatchCard({ ...c, size: "lg", title: c.title.replace(/<br>/g, " ") }).toString());   // full width: one line, as drawn
      cards.splice(Math.min(D().refine.after, cards.length), 0, refine);   // "Refine your matches" mid-list
      return cards.join("");
    },

    render(page) {
      this.leave();
      const d = D();
      this.pick = this.pick || { ...d.pick };
      const v = OPL.variantValues(this.mode === "all" ? "subsidy-list" : "subsidies-explore");
      const all = this.mode === "all";
      if (all && !this.place) this.place = this.home();   // GST principal state, or the Subsidies home pick

      page.innerHTML = html`
        ${ui.StatusBar()}
        <div class="scroller">
          <main class="sx">
            <section class="${cx("sx-hero", all && "sx-hero--all")}">
              <div class="sh-hero__bg sx-hero__bg">
                <img class="sh-hero__ellipse" src="${OPL.img("hero-ellipse.svg")}" alt="">
                <img class="sh-hero__texture" src="${OPL.img("hero-texture.jpg")}" alt="">
              </div>
              <div class="sx-hero__header">${ui.AppHeader({ title: all ? d.all.title : d.title, back: true, actions: [] })}</div>
              ${all ? "" : html`
              <button class="sx-brief" data-press data-open-sheet="edit" aria-haspopup="dialog">
                <span class="sx-brief__art" aria-hidden="true">
                  <img class="sx-brief__ground" src="${OPL.simg("home/promo-ground.svg")}" alt="">
                  <span class="sx-brief__factory">
                    <img class="sx-brief__smoke sx-brief__smoke--b" src="${OPL.simg("home/smoke-b.png")}" alt="">
                    <img class="sx-brief__smoke sx-brief__smoke--a" src="${OPL.simg("home/smoke-a.png")}" alt="">
                    <img src="${OPL.simg("home/factory.png")}" alt="">
                  </span>
                </span>
                <span class="sx-brief__text">
                  <span class="sx-brief__top"><span class="sx-brief__label">${d.brief}</span>${sicon("pen-16", 16, "sx-brief__pen")}</span>
                  <span class="sx-brief__values" data-brief>${briefValues(this.pick)}</span>
                </span>
              </button>`}
            </section>

            <section class="sx-results">
              ${all ? html`
              <div class="sx-bar sx-bar--all">
                <div class="sx-row">
                  <p class="sx-found" data-found>${d.found(this.list().length)}</p>
                  <button class="sx-pill" data-press data-open-sheet="sort">${sicon("list-arrow-down-16", 16)}<span class="sx-pill__muted">${d.sort.label}</span><b data-sort-label>${this.sort}</b>${sicon("alt-arrow-right-14", 14, "sx-pill__chev")}</button>
                </div>
                <div class="rail rail--chips sx-chips">
                  <button class="sh-where" data-press data-open-sheet="states" aria-haspopup="dialog" aria-label="Schemes in ${this.place}. Change state">
                    ${sicon("map-point-16", 16)}<span class="sh-where__value" data-place-label>${this.place}</span>${sicon("alt-arrow-right-14", 14, "sh-where__chev")}
                  </button>
                  <span class="chip-divider"></span>
                  ${d.all.chips.map((c) => ui.Chip({ label: c, selected: this.chips.has(c), attrs: `data-sxchip="${c}" aria-pressed="${this.chips.has(c)}"` }))}</div>
              </div>` : html`
              <div class="sx-bar">
                <p class="sx-found" data-found>${d.found(this.list().length)}</p>
                <div class="sx-pills">
                  <button class="sx-pill" data-press data-open-sheet="sort">${sicon("list-arrow-down-16", 16)}<span class="sx-pill__muted">${d.sort.label}</span><b data-sort-label>${this.sort}</b>${sicon("alt-arrow-right-14", 14, "sx-pill__chev")}</button>
                  <button class="${cx("sx-pill", this.filters.size && "is-on")}" data-press data-open-sheet="filter" data-filter-pill>${sicon("list-arrow-down-16", 16)}<span class="sx-pill__muted">${d.filter.label}</span><b class="sx-pill__count" data-filter-count ${this.filters.size ? "" : OPL.raw("hidden")}>${this.filters.size}</b>${sicon("alt-arrow-right-14", 14, "sx-pill__chev")}</button>
                </div>
              </div>`}
              <div class="sx-list" data-list>${OPL.raw(this.cardsHtml())}</div>
            </section>
          </main>
        </div>

        ${ui.Sheet({
          id: "edit", title: d.edit.title,
          body: html`<div class="sx-edit">${d.fields.map((f) => html`
            <label class="sx-field"><span class="sx-field__label">${f.label}</span>
              <span class="sx-select"><select data-answer="${f.id}">${f.options.map((o) => html`<option ${o === this.pick[f.id] ? OPL.raw("selected") : ""}>${o}</option>`)}</select>${OPL.icon("chevron-down", 16, "sx-select__chev")}</span>
            </label>`)}</div>`,
          footer: ui.Button({ label: d.edit.cta, block: true, attrs: "data-answers-done" }),
        })}
        ${ui.Sheet({ id: "sort", title: d.sort.label, body: html`<div class="sheet-sort">${d.sort.options.map((o) => ui.SortOption({ label: o, selected: o === this.sort }))}</div>` })}
        ${ui.Sheet({
          id: "filter", title: d.filter.title, action: d.filter.clear,
          body: html`<div class="sheet-filters"><div class="filter-group__chips">${d.filter.options.map((o) => ui.Chip({ label: o.label, bordered: true, selected: this.filters.has(o.match), attrs: `data-sxfilter="${o.match}"` }))}</div></div>`,
          footer: ui.Button({ label: d.filter.cta, block: true, attrs: "data-sheet-done" }),
        })}
        ${ui.RefineSheet(OPL.data.subsidyRefine)}
        ${all ? ui.Sheet({ id: "states", title: OPL.data.subsidiesHome.states.title, body: ui.StatesSheetBody(OPL.data.subsidiesHome.states, this.place) }) : ""}`;

      this.wire(page, v);
    },

    deal(page, delay = 0) {
      if (OPL.fx.motionOff()) return;
      page.querySelectorAll("[data-list] .match, [data-list] .refine").forEach((c, i) => c.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], { duration: 340, delay: delay + i * 60, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" }));
    },
    refresh(page) {
      page.querySelector("[data-list]").innerHTML = this.cardsHtml();
      page.querySelector("[data-found]").textContent = D().found(this.list().length);
      const n = this.filters.size, pill = page.querySelector("[data-filter-pill]"), cnt = page.querySelector("[data-filter-count]");
      if (pill) { pill.classList.toggle("is-on", !!n); cnt.hidden = !n; cnt.textContent = n; }
      this.deal(page);
    },

    wire(page, v) {
      const d = D(), motionOff = OPL.fx.motionOff();
      OPL.fx.statusOnScroll(page);
      const sheets = OPL.fx.sheets(page, { onClose: () => OPL.state.set({ sheet: null }, { silent: true }) });
      let draft = new Set(this.filters);

      /* Refine: one question at a time. A choice moves on by itself; Skip moves on blank;
         the last step closes the sheet and the list re-ranks. */
      const R = OPL.data.subsidyRefine, Q = R.questions;
      let step = 0;
      const paint = (dir) => {
        const q = Q[step], stage = page.querySelector("[data-rq-stage]");
        stage.innerHTML = String(ui.RefineStep(q, OPL.refine.answers[q.id], R.choices));
        page.querySelector("[data-rq-count]").textContent = R.progress(step + 1, Q.length);
        page.querySelector("[data-rq-fill]").style.width = `${((step + 1) / Q.length) * 100}%`;
        page.querySelector("[data-rq-back]").hidden = step === 0;
        page.querySelector("[data-rq-skip]").textContent = step === Q.length - 1 ? R.cta : R.skip;
        const pane = stage.firstElementChild;
        if (dir && !motionOff) pane.classList.add(dir === "back" ? "is-from-left" : "is-from-right");
      };
      const finish = () => {
        OPL.refine.done = true;
        sheets.close();
        this.timers.push(setTimeout(() => this.refresh(page), motionOff ? 0 : 260));
      };
      const go = (to) => {
        if (to >= Q.length) return finish();
        const dir = to < step ? "back" : "next";
        step = Math.max(0, to);
        paint(dir);
      };
      const openRefine = () => {
        const first = Q.findIndex((q) => !OPL.refine.answers[q.id]);
        step = OPL.refine.done || first < 0 ? 0 : first;
        paint();
        sheets.open("refine");
      };

      page.addEventListener("input", (e) => {
        const q = e.target.closest("[data-place-search]");
        if (!q) return;
        const k = q.value.trim().toLowerCase(); let n = 0;
        page.querySelectorAll("[data-place]").forEach((b) => { const hit = !k || b.dataset.place.toLowerCase().includes(k); b.hidden = !hit; if (hit) n++; });
        const empty = page.querySelector("[data-place-empty]");
        empty.hidden = n > 0; if (!n) empty.textContent = OPL.data.subsidiesHome.states.empty(q.value.trim());
      });

      page.addEventListener("click", (e) => {
        const t = e.target;
        if (t.closest('[data-goto="subsidy-refine"]')) { e.stopPropagation(); return openRefine(); }
        const ch = t.closest("[data-rq-choice]");
        if (ch) {
          OPL.refine.answers[Q[step].id] = ch.dataset.rqChoice;
          page.querySelectorAll("[data-rq-choice]").forEach((b) => { const on = b === ch; b.classList.toggle("is-on", on); b.setAttribute("aria-checked", on); });
          return this.timers.push(setTimeout(() => go(step + 1), motionOff ? 0 : 280));
        }
        // All subsidies · state picker: only states on the GST registration; rows apply on tap
        const pl = t.closest("[data-place]");
        if (pl) {
          const value = pl.dataset.place;
          this.place = value;
          const home = OPL.screens["subsidies-overview"]; if (home) home.place = value;   // one choice across the subsidy screens
          page.querySelectorAll("[data-place]").forEach((b) => { b.outerHTML = ui.StateRow(b.dataset.place, b.dataset.place === value).toString(); });
          const label = page.querySelector("[data-place-label]");
          label.textContent = value; label.classList.remove("is-changed"); void label.offsetWidth; label.classList.add("is-changed");
          return this.timers.push(setTimeout(() => { sheets.close(); this.refresh(page); }, motionOff ? 0 : 220));
        }
        const chip = t.closest("[data-sxchip]");
        if (chip) {
          const c = chip.dataset.sxchip;
          this.chips.has(c) ? this.chips.delete(c) : this.chips.add(c);
          chip.classList.toggle("is-selected", this.chips.has(c)); chip.setAttribute("aria-pressed", this.chips.has(c));
          return this.refresh(page);
        }
        if (t.closest("[data-rq-skip]")) return go(step + 1);
        if (t.closest("[data-rq-back]")) return go(step - 1);
        const open = t.closest("[data-open-sheet]");
        if (open) {
          const id = open.dataset.openSheet;
          if (id === "filter") { draft = new Set(this.filters); page.querySelectorAll("[data-sxfilter]").forEach((c) => c.classList.toggle("is-selected", draft.has(c.dataset.sxfilter))); }
          OPL.state.set({ sheet: id }, { silent: true });
          return sheets.open(id);
        }
        // sort: radio rows apply on tap
        const so = t.closest("[data-sort]");
        if (so) {
          this.sort = so.dataset.sort;
          page.querySelectorAll("[data-sort]").forEach((b) => (b.outerHTML = ui.SortOption({ label: b.dataset.sort, selected: b.dataset.sort === this.sort }).toString()));
          page.querySelector("[data-sort-label]").textContent = this.sort;
          return this.timers.push(setTimeout(() => { sheets.close(); this.refresh(page); }, motionOff ? 0 : 220));
        }
        // filter: chips toggle a draft, "Show subsidies" applies it
        const f = t.closest("[data-sxfilter]");
        if (f) { const k = f.dataset.sxfilter; draft.has(k) ? draft.delete(k) : draft.add(k); return f.classList.toggle("is-selected", draft.has(k)); }
        if (t.closest("[data-sheet-action]")) { draft.clear(); return page.querySelectorAll("[data-sxfilter]").forEach((c) => c.classList.remove("is-selected")); }
        if (t.closest("[data-sheet-done]")) { this.filters = new Set(draft); sheets.close(); return this.timers.push(setTimeout(() => this.refresh(page), motionOff ? 0 : 200)); }
        // answers: the brief ticks, the list re-deals
        if (t.closest("[data-answers-done]")) {
          page.querySelectorAll("[data-answer]").forEach((s) => (this.pick[s.dataset.answer] = s.value));
          sheets.close();
          return this.timers.push(setTimeout(() => {
            const b = page.querySelector("[data-brief]");
            b.innerHTML = String(briefValues(this.pick));
            b.classList.remove("is-changed"); void b.offsetWidth; b.classList.add("is-changed");
            this.refresh(page);
          }, motionOff ? 0 : 240));
        }
      });

      OPL.fx.enter(page, [page.querySelector(".sx-brief"), page.querySelector(".sx-bar"), ...page.querySelectorAll("[data-list] .match, [data-list] .refine")]);
      if (!motionOff) OPL.afterReveal(() => this.timers.push(setTimeout(() => page.querySelector(".sx-brief")?.classList.add("is-playing"), 200)));
      if (v.sheet === "refine") { openRefine(); }
      else if (v.sheet !== "none") sheets.open(v.sheet, { instant: true });
    },
  };

  /* "View all subsidies" (Home, Subsidies home): the same list screen without the expansion
     answers — every scheme for the business's state, plus central ones. */
  OPL.screens["subsidy-list"] = Object.assign(Object.create(OPL.screens["subsidies-explore"]), {
    title: "All subsidies", figma: { results: "556:128366" }, mode: "all", timers: [], pick: null, place: null, sort: "Alphabetical", filters: new Set(), chips: new Set(),
  });
})();
