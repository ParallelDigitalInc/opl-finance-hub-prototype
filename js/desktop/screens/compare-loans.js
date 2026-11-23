/* Desktop · Loans › Compare — Figma 507:85604 (empty, 0 of 3), 507:86537 (3 added),
   507:87387 (Selected + Apply bar), drawer 507:86111 (Add offers to compare).
   The added offers are the shared Compare selection (Overview / Loan Offers checkboxes,
   mobile Loan offers). Selected = lenders to apply to; the Apply bar rises with ≥1. */
(function () {
  const { html, raw } = OPL;
  const D = OPL.d;
  const C = () => OPL.ddata.compare;

  const resolve = (id) => {
    const c = C();
    if (c.records[id]) return id;
    const a = c.aliases[id];
    return a && c.records[a] ? a : null;
  };
  const addedIds = () => [...new Set(D.compare.get().map(resolve).filter(Boolean))].slice(0, 3);

  const valueCell = (row, rec, best) => {
    const v = rec.v[row.id];
    if (row.id === "collateral") return html`<div class="d-cmp__cell d-cmp__cell--inline">${v.map((x) => html`<span>${x}</span>`)}</div>`;
    const [main, sub] = Array.isArray(v) ? v : [v];
    return html`<div class="d-cmp__cell">
      <div class="d-cmp__val"><p>${main}</p>${sub ? html`<small>${sub}</small>` : ""}</div>
      ${best ? html`<span class="d-cmp__best">${best}</span>` : ""}
    </div>`;
  };

  const column = (id, sel, i) => {
    const c = C();
    const rec = c.records[id];
    const ids = addedIds();
    // best value per row among the added offers (only when they actually differ)
    const bestLabel = (rowId) => {
      const rule = c.best[rowId];
      if (!rule || ids.length < 2) return "";
      const vals = ids.map((x) => c.records[x].n[rowId]);
      if (vals.every((x) => x === vals[0])) return "";
      const win = rule[0] === "max" ? Math.max(...vals) : Math.min(...vals);
      return rec.n[rowId] === win ? rule[1] : "";
    };
    const on = sel.includes(id);
    return html`
      <div class="d-cmp__col ${on ? "is-selected" : ""}" data-col="${id}" style="--tint:${rec.tint};--i:${i}">
        <div class="d-cmp__head">
          <div class="d-cmp__id">
            ${D.logo(rec.logo)}
            <div class="d-cmp__name"><p class="d-card__name">${rec.name}</p><p class="d-card__sub">${rec.sub}</p></div>
            <button class="d-cmp__x" data-remove="${id}" aria-label="Remove ${rec.name}">${D.icon("close-circle-duo", 24)}</button>
          </div>
          <div class="d-cmp__amount"><p>Loan up to</p><b>${rec.v.amount}${bestLabel("amount") ? html`<span class="d-cmp__best">${bestLabel("amount")}</span>` : ""}</b></div>
        </div>
        ${c.rows.slice(2).map((row) => html`<div class="d-cmp__row" data-row="${row.id}">${valueCell(row, rec, bestLabel(row.id))}</div>`)}
        <div class="d-cmp__foot">
          ${on
            ? D.btn({ label: c.selected, style: "tonal", size: "md", cls: "d-btn--block", icon: D.icon("check-leading", 16), attrs: `data-select="${id}" aria-pressed="true"` })
            : D.btn({ label: c.select, style: "outlined", size: "md", cls: "d-btn--block", attrs: `data-select="${id}" aria-pressed="false"` })}
        </div>
      </div>`;
  };

  const emptySlot = (i) => {
    const e = C().empty;
    return html`
      <div class="d-cmp__slot" style="--i:${i}">
        <button class="d-cmp__add" data-browse aria-label="${e.title}">${D.icon("add-circle", 48)}</button>
        <div class="d-cmp__slot-copy"><p>${e.title}</p><small>${e.body}</small></div>
        <button class="d-cmp__browse" data-browse>${e.cta}${D.icon("caret-right-primary", 14)}</button>
      </div>`;
  };

  // Rows whose values are the same across every added offer (for "Show differences only")
  const sameRows = (ids) => {
    const c = C();
    if (ids.length < 2) return [];
    return c.rows.slice(1).filter((r) => {
      const vals = ids.map((id) => JSON.stringify(c.records[id].v[r.id]));
      return vals.every((v) => v === vals[0]);
    }).map((r) => r.id);
  };

  OPL.dscreens["compare-loans"] = {
    title: "Loans · Compare",
    figma: { frame: "507:87387" },
    sel: [],            // lenders picked to apply to
    diff: false,

    render(page) {
      const c = C();
      const ids = addedIds();
      this.sel = this.sel.filter((x) => ids.includes(x));
      const same = this.diff ? sameRows(ids) : [];
      page.innerHTML = D.shell({
        nav: "loans", title: "Loans", tab: "compare", counts: { compare: ids.length || null },
        body: html`
          <section class="d-cmp ${this.sel.length ? "has-bar" : ""}">
            <div class="d-cmp__bar">
              <div class="d-cmp__title"><h2>${c.title}</h2><span data-added>${c.added(ids.length)}</span></div>
              ${ids.length > 1 ? D.toggle({ on: this.diff, label: c.diffLabel, attrs: "data-diff" }) : ""}
            </div>
            <div class="d-cmp__grid ${this.diff ? "is-diff" : ""}">
              <div class="d-cmp__labels">
                ${c.rows.map((r) => html`<div class="d-cmp__label ${same.includes(r.id) ? "is-same" : ""}" data-row="${r.id}">${r.label}${r.info ? html`<span class="d-cmp__info" tabindex="0">${D.icon("info-glyph", 14)}${D.tip(r.info)}</span>` : ""}</div>`)}
              </div>
              ${[0, 1, 2].map((i) => (ids[i] ? column(ids[i], this.sel, i) : emptySlot(i)))}
            </div>
          </section>`,
        after: String(html`
          <div class="d-applybar ${this.sel.length ? "is-up" : ""}" data-applybar>
            ${D.btn({ label: c.apply, style: "filled", size: "lg", goto: "d-apply", attrs: "data-apply-selected" })}
          </div>`),
      });
      // the apply bar lives over the main panel (Figma: absolute, left 230, bottom 0)
      const bar = page.querySelector("[data-applybar]");
      page.querySelector(".d-main").appendChild(bar);
      page.querySelector(".d-main").classList.toggle("has-bar", this.sel.length > 0);
      if (same.length) same.forEach((r) => page.querySelectorAll(`.d-cmp__col [data-row="${r}"]`).forEach((el) => el.classList.add("is-same")));
      D.mountShell(page);
      D.enter(page);
      this.bind(page);
    },

    bind(page) {
      // row hover lights the label and every column's cell for that row
      const grid = page.querySelector(".d-cmp__grid");
      let hoverRow = null;
      const setRow = (r) => {
        if (r === hoverRow) return;
        if (hoverRow) grid.querySelectorAll(`[data-row="${hoverRow}"]`).forEach((el) => el.classList.remove("is-hover"));
        hoverRow = r;
        if (r && r !== "lender" && r !== "amount") grid.querySelectorAll(`[data-row="${r}"]`).forEach((el) => el.classList.add("is-hover"));
        if (r) grid.dataset.hoverRow = r; else delete grid.dataset.hoverRow;
      };
      grid?.addEventListener("pointerover", (e) => setRow(e.target.closest("[data-row]")?.dataset.row || null));
      grid?.addEventListener("pointerleave", () => setRow(null));
      page.addEventListener("click", (e) => {
        const rm = e.target.closest("[data-remove]");
        if (rm) {
          const id = rm.dataset.remove;
          const col = rm.closest(".d-cmp__col");
          const done = () => {
            D.compare.set(D.compare.get().filter((x) => resolve(x) !== id));
            this.sel = this.sel.filter((x) => x !== id);
            OPL.rerender();
          };
          if (D.motionOff()) return done();
          col.classList.add("is-leaving");
          return setTimeout(done, 240);
        }
        const pick = e.target.closest("[data-select]");
        if (pick) {
          const id = pick.dataset.select;
          this.sel = this.sel.includes(id) ? this.sel.filter((x) => x !== id) : [...this.sel, id];
          return this.updateSelection(page);
        }
        if (e.target.closest("[data-diff]")) {
          this.diff = !this.diff;
          const t = page.querySelector("[data-diff]");
          t.classList.toggle("is-on", this.diff);
          t.setAttribute("aria-checked", this.diff);
          const same = this.diff ? sameRows(addedIds()) : [];
          page.querySelector(".d-cmp__grid").classList.toggle("is-diff", this.diff);
          page.querySelectorAll(".d-cmp [data-row]").forEach((el) => el.classList.toggle("is-same", same.includes(el.dataset.row)));
          return;
        }
        if (e.target.closest("[data-browse]")) return this.openDrawer(page);
        const apply = e.target.closest("[data-apply-selected]");
        if (apply) { e.stopPropagation(); return D.apply(page, this.sel.slice()); }
      });
    },

    // Swap Select ↔ Selected in place and raise / lower the Apply bar
    updateSelection(page) {
      const c = C();
      page.querySelectorAll(".d-cmp__col").forEach((col) => {
        const id = col.dataset.col;
        const on = this.sel.includes(id);
        if (col.classList.contains("is-selected") === on) return;
        col.classList.toggle("is-selected", on);
        col.querySelector(".d-cmp__foot").innerHTML = String(on
          ? D.btn({ label: c.selected, style: "tonal", size: "md", cls: "d-btn--block is-popping", icon: D.icon("check-leading", 16), attrs: `data-select="${id}" aria-pressed="true"` })
          : D.btn({ label: c.select, style: "outlined", size: "md", cls: "d-btn--block", attrs: `data-select="${id}" aria-pressed="false"` }));
      });
      const up = this.sel.length > 0;
      page.querySelector("[data-applybar]").classList.toggle("is-up", up);
      page.querySelector(".d-main").classList.toggle("has-bar", up);
    },

    openDrawer(page) {
      const c = C();
      const lo = OPL.ddata.loanOffers;
      const byId = Object.fromEntries(lo.offers.map((o) => [o.id, o]));
      let picked = addedIds();
      const st = { chips: [], q: "" };
      const list = () => c.drawer.order
        .map((id) => byId[id])
        .filter((o) => st.chips.every((ch) => D.CHIP_TEST[ch](o.meta)))
        .filter((o) => !st.q || (o.name + " " + o.sub).toLowerCase().includes(st.q))
        .map((o) => String(D.offerRow(o, { selectable: true, selected: picked.includes(o.id) }))).join("")
        || `<p class="d-drawer__none">No offers match “${st.q}”</p>`;
      const body = String(html`
        <label class="d-dsearch">${D.icon("drawer-search", 16)}<input type="search" placeholder="${c.drawer.search}" aria-label="${c.drawer.search}" data-dsearch></label>
        <div class="d-toolbar__chips d-drawer__chips">${c.drawer.chips.map((ch) => html`<button class="d-chip" aria-pressed="false" data-dchip="${ch}">${ch}</button>`)}</div>
        <div class="d-drawer__list" data-dlist>${raw(list())}</div>`);
      const footer = String(html`<span class="d-drawer__count" data-dcount>${picked.length} of 3 selected</span>${D.btn({ label: c.drawer.cta, style: "filled", size: "md", cls: "d-drawer__cta", attrs: "data-dselect" })}`);
      const dr = D.openDrawer(page, { title: c.drawer.title, body, footer });
      const listEl = dr.el.querySelector("[data-dlist]");
      const refresh = () => { listEl.innerHTML = list(); };
      dr.el.querySelector("[data-dsearch]").addEventListener("input", (e) => { st.q = e.target.value.trim().toLowerCase(); refresh(); });
      dr.el.addEventListener("click", (e) => {
        const chip = e.target.closest("[data-dchip]");
        if (chip) {
          const ch = chip.dataset.dchip;
          st.chips = st.chips.includes(ch) ? st.chips.filter((x) => x !== ch) : [...st.chips, ch];
          chip.classList.toggle("is-selected"); chip.setAttribute("aria-pressed", st.chips.includes(ch));
          return refresh();
        }
        const row = e.target.closest(".d-row-card--pick");
        if (row) {
          const id = row.dataset.offer;
          if (picked.includes(id)) picked = picked.filter((x) => x !== id);
          else if (picked.length < 3) picked = [...picked, id];
          else {
            row.animate([{ transform: "translateX(0)" }, { transform: "translateX(-4px)" }, { transform: "translateX(4px)" }, { transform: "none" }], { duration: 240 });
            dr.el.querySelector("[data-dcount]").classList.add("is-max");
            return;
          }
          const on = picked.includes(id);
          row.classList.toggle("is-picked", on);
          row.setAttribute("aria-checked", on);
          const count = dr.el.querySelector("[data-dcount]");
          count.textContent = `${picked.length} of 3 selected`;
          count.classList.remove("is-max");
          return;
        }
        if (e.target.closest("[data-dselect]")) {
          D.compare.set(picked.slice());
          dr.close();
          setTimeout(() => OPL.rerender(), 120);
        }
      });
      dr.el.addEventListener("keydown", (e) => {
        if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("d-row-card--pick")) { e.preventDefault(); e.target.click(); }
      });
    },
  };
})();
