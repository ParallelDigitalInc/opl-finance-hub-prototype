/* ==========================================================================
   Screen · Loan offers — Figma 382:35324 (+ compare state 382:35666,
   Sort sheet 393:505, Filters sheet 393:869).
   Entry: Loans overview → "See all loans (7)" / Offers tab; Home → "View all".
   ========================================================================== */
(function () {
  const { html, ui } = OPL;
  OPL.screens = OPL.screens || {};

  OPL.screens["loan-offers"] = {
    title: "Loan offers",
    figma: { list: "382:35324" },
    timers: [],
    sel: [],
    sort: null,
    filters: null,
    quick: [],
    _lastPreset: null,

    leave() { this.timers.forEach((t) => { clearTimeout(t); clearInterval(t); }); this.timers = []; (this._ro || {}).disconnect?.(); },

    allCards() { const d = OPL.data.loanOffers; return [...d.picks, ...d.offers]; },

    render(page) {
      this.leave();
      const d = OPL.data.loanOffers;
      const v = OPL.variantValues("loan-offers");

      // Presets reset the interactive state only when the preset itself changes.
      const presetKey = `${v.compare}|${v.sheet}`;
      if (presetKey !== this._lastPreset) {
        this.sel = v.compare === "figma" ? [...d.compareFigmaSelected] : [];
        this.sort = this.sort || d.sortOptions[0];
        this.filters = new Set(d.filtersFigmaSelected);
        this._lastPreset = presetKey;
      }

      page.innerHTML = html`
        ${ui.StatusBar()}
        <div class="scroller">
          <main class="lof">
            <div class="lof-bg">
              <img class="lof-bg__ellipse" src="${OPL.img("hero-ellipse.svg")}" alt="">
              <img class="lof-bg__texture" src="${OPL.img("hero-texture.png")}" alt="">
            </div>
            <div class="lof-header">${ui.AppHeader({ title: d.header.title, back: true, actions: d.header.actions })}</div>

            <section class="lof-picks">
              <h2 class="lof-title">${d.picksTitle}</h2>
              <div class="rail lof-rail">${d.picks.map((c) => ui.OfferCard({ ...c, kind: "pick", selected: this.sel.includes(c.id) }))}</div>
            </section>

            <section class="lof-all">
              <h2 class="lof-title" data-all-title>${d.allTitle}</h2>
              <div class="rail rail--chips lof-chips">
                ${ui.Chip({ icon: "tuning-2", label: "Filters", bordered: true, attrs: 'data-open-sheet="filters"' })}
                ${ui.Chip({ icon: "sort-vertical", label: this.sort, bordered: true, trailing: "chevron-down", attrs: 'data-open-sheet="sort" data-sort-chip' })}
                <span class="chip-divider"></span>
                ${d.quickFilters.map((q) => ui.Chip({ label: q, selected: this.quick.includes(q), attrs: `data-quick="${q}"` }))}
              </div>
              <div class="lof-list">${d.offers.map((c) => ui.OfferCard({ ...c, kind: "offer", selected: this.sel.includes(c.id) }))}</div>
            </section>
          </main>
        </div>

        <div class="floating">
          ${ui.AiMitraFab({ nudge: v.nudge === "on" ? d.aiNudge : null })}
          <div class="floating__tray" data-tray></div>
          ${ui.BottomNav({ items: OPL.data.home.nav, active: "finance" })}
        </div>

        ${ui.Sheet({ id: "sort", title: "Sort by", body: html`<div class="sheet-sort" data-sort-list>${d.sortOptions.map((o) => ui.SortOption({ label: o, selected: o === this.sort }))}</div>` })}
        ${ui.Sheet({
          id: "filters", title: "Filters", action: "Clear all",
          body: html`<div class="sheet-filters">${d.filterGroups.map((g) => OPL.raw(`
            <div class="filter-group"><p class="filter-group__label">${g.label}</p>
              <div class="filter-group__chips">${g.options.map((o) => ui.Chip({ label: o, bordered: true, selected: this.filters.has(o), attrs: `data-filter="${o}"` })).join("")}</div></div>`))}</div>`,
          footer: ui.Button({ label: d.filtersCta, block: true, attrs: "data-sheet-done" }),
        })}
        ${ui.Sheet({ id: "detail", title: "Loan details", body: OPL.raw(`<div class="sheet-detail" data-detail-body></div>`), footer: OPL.raw(`<div data-detail-foot></div>`) })}`;

      this.wire(page, d, v);
    },

    wire(page, d, v) {
      OPL.fx.statusOnScroll(page);
      page.querySelectorAll(".rail").forEach(OPL.fx.mouseDrag);
      OPL.fx.nudge(page, this.timers);

      const sheets = OPL.fx.sheets(page, { onClose: () => OPL.state.set({ sheet: null }, { silent: true }) });
      if (v.sheet !== "none") sheets.open(v.sheet, { instant: true });

      // keep the list clear of the floating bottom (172 → 167 as drawn; tray → +10)
      const floating = page.querySelector(".floating");
      const main = page.querySelector(".lof");
      const sync = () => { const h = floating.offsetHeight; main.style.setProperty("--lof-pad", (h <= 172 ? h - 5 : h + 10) + "px"); };
      if (window.ResizeObserver) { this._ro = new ResizeObserver(sync); this._ro.observe(floating); }
      sync();

      this.paintCompare(page, false);

      page.addEventListener("click", (e) => {
        const t = e.target;
        const det = t.closest("[data-detail]");
        if (det) return this.openDetail(page, det.dataset.detail, sheets);
        const dc = t.closest("[data-detail-compare]");
        if (dc) {
          const id = dc.dataset.detailCompare, was = this.sel.includes(id);
          this.toggleCompare(page, id, dc);          // full → shakes this button + the tray
          if (this.sel.includes(id) !== was) {
            this.paintDetailFoot(page);
            page.querySelector("[data-detail-compare]").classList.add("is-popping");
          }
          return;
        }
        const cmp = t.closest("[data-compare]");
        if (cmp) return this.toggleCompare(page, cmp.dataset.compare, cmp);
        const rm = t.closest("[data-compare-remove]");
        if (rm) { this.sel = this.sel.filter((x) => x !== rm.dataset.compareRemove); return this.paintCompare(page); }
        if (t.closest("[data-compare-clear]")) { this.sel = []; return this.paintCompare(page); }
        if (t.closest("[data-compare-add]")) {
          return page.querySelector(".scroller").scrollTo({ top: page.querySelector("[data-all-title]").offsetTop - 120, behavior: "smooth" });
        }
        if (t.closest("[data-compare-go]")) {
          if (this.sel.length >= 2) return OPL.go("compare-loans");
          const add = page.querySelector(".tray__add");
          if (add) { add.classList.remove("is-nudge"); void add.offsetWidth; add.classList.add("is-nudge"); }
          return;
        }
        const open = t.closest("[data-open-sheet]");
        if (open) return sheets.open(open.dataset.openSheet);
        const so = t.closest("[data-sort]");
        if (so) {
          this.sort = so.dataset.sort;
          page.querySelectorAll("[data-sort]").forEach((b) => (b.outerHTML = ui.SortOption({ label: b.dataset.sort, selected: b.dataset.sort === this.sort }).toString()));
          page.querySelector("[data-sort-chip] .chip__label").textContent = this.sort;
          return this.timers.push(setTimeout(() => sheets.close(), 220));   // radio rows apply on tap, no CTA
        }
        const f = t.closest("[data-filter]");
        if (f) { const k = f.dataset.filter; this.filters.has(k) ? this.filters.delete(k) : this.filters.add(k); return f.classList.toggle("is-selected", this.filters.has(k)); }
        if (t.closest("[data-sheet-action]")) { this.filters.clear(); return page.querySelectorAll("[data-filter]").forEach((c) => c.classList.remove("is-selected")); }
        if (t.closest("[data-sheet-done]")) return sheets.close();
        const q = t.closest("[data-quick]");
        if (q) { const k = q.dataset.quick; this.quick = this.quick.includes(k) ? this.quick.filter((x) => x !== k) : [...this.quick, k]; return q.classList.toggle("is-selected"); }
      });

      OPL.fx.enter(page, [
        page.querySelector(".lof-picks .lof-title"),
        ...[...page.querySelectorAll(".lof-rail .offer")].slice(0, 2),
        page.querySelector("[data-all-title]"),
        page.querySelector(".lof-chips"),
        ...[...page.querySelectorAll(".lof-list .offer")].slice(0, 2),
      ]);
    },

    /* Loan details sheet (proposed): the tapped card, expanded. */
    openDetail(page, id, sheets) {
      const offer = this.allCards().find((c) => c.id === id);
      const cl = OPL.data.compareLoans;
      const record = cl.records[cl.aliases[id] || id];
      page.querySelector("[data-detail-body]").innerHTML = ui.LoanDetail({ offer, record }).toString();
      page.querySelector("[data-detail-body]").scrollTop = 0;
      this.detailId = id;
      this.paintDetailFoot(page);
      sheets.open("detail");
    },
    paintDetailFoot(page) {
      if (!this.detailId) return;
      page.querySelector("[data-detail-foot]").innerHTML = ui.LoanDetailFoot({ id: this.detailId, selected: this.sel.includes(this.detailId) }).toString();
    },

    toggleCompare(page, id, btn) {
      const d = OPL.data.loanOffers;
      if (this.sel.includes(id)) this.sel = this.sel.filter((x) => x !== id);
      else if (this.sel.length >= d.compareMax) {
        // full: shake the tray and the card instead of adding a fourth
        const tray = page.querySelector(".tray"), card = btn.closest(".offer") || btn;
        [tray, card].forEach((el) => { if (!el) return; el.classList.remove("is-shake"); void el.offsetWidth; el.classList.add("is-shake"); });
        if (navigator.vibrate) navigator.vibrate([8, 40, 8]);
        return;
      } else this.sel = [...this.sel, id];
      btn.classList.remove("is-popping"); void btn.offsetWidth; btn.classList.add("is-popping");
      this.paintCompare(page);
    },

    /* Reflect the selection: card outlines + checkboxes, and the tray in place of the FAB. */
    paintCompare(page, animate = true) {
      const d = OPL.data.loanOffers;
      const byId = Object.fromEntries(this.allCards().map((c) => [c.id, c]));
      page.querySelectorAll("[data-offer]").forEach((card) => {
        const on = this.sel.includes(card.dataset.offer);
        card.classList.toggle("is-selected", on);
        const b = card.querySelector("[data-compare]");
        b.setAttribute("aria-pressed", on);
        b.querySelector("img").src = `assets/icons/${on ? "check-square-checked" : "check-square"}.svg`;
      });
      const floating = page.querySelector(".floating");
      const slot = page.querySelector("[data-tray]");
      const had = new Set([...slot.querySelectorAll("[data-slot]")].map((s) => s.dataset.slot));
      const wasOpen = floating.classList.contains("has-tray");
      if (this.sel.length) {
        slot.innerHTML = ui.CompareTray({ selected: this.sel.map((id) => ({ id, logo: byId[id].logo })), max: d.compareMax }).toString();
        slot.querySelectorAll("[data-slot]").forEach((s) => { if (had.has(s.dataset.slot) || !animate) s.style.animation = "none"; });
        floating.classList.add("has-tray");
        if (!wasOpen && animate && !OPL.fx.motionOff()) { slot.classList.remove("is-in"); void slot.offsetWidth; slot.classList.add("is-in"); }
      } else {
        floating.classList.remove("has-tray");
        slot.innerHTML = "";
      }
    },
  };
})();
