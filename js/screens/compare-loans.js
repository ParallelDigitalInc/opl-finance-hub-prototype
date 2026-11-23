/* ==========================================================================
   Screen · Compare loans — Figma 382:37839
   Entry: Loan offers → tray "Compare" (2+ selected). Back returns to the list.
   ========================================================================== */
(function () {
  const { html, ui } = OPL;
  OPL.screens = OPL.screens || {};

  OPL.screens["compare-loans"] = {
    title: "Compare loans",
    figma: { default: "382:37839" },
    timers: [],
    leave() { this.timers.forEach((t) => clearTimeout(t)); this.timers = []; },

    render(page) {
      this.leave();
      const d = OPL.data.compareLoans;
      // Columns follow the Loan offers selection (in the order picked). Opened without
      // one (panel / direct link), it shows the Figma frame as drawn.
      const sel = (OPL.screens["loan-offers"] && OPL.screens["loan-offers"].sel) || [];
      const picks = sel.length ? sel.map((id) => ({ id, selected: true })) : d.figmaDefault;
      this.cols = picks.map(({ id, selected }) => {
        const key = d.aliases[id] || id;
        return { id, ...d.records[key], selected };
      });
      this.computeBest(d);
      this.diff = false;

      page.innerHTML = html`
        ${ui.StatusBar()}
        <div class="scroller">
          <main class="cl">
            <div class="cl-head">
              ${ui.AppHeader({ title: d.title, back: true, backIcon: "arrow-left-b", compact: true,
                actions: [{ icon: "headphones-round-sound-linear", label: "Support", goto: "support" }] })}
              <div class="cl-diff"><span>${d.diffLabel}</span>${ui.Toggle({ on: false, attrs: "data-diff" })}</div>
            </div>
            <div class="cl-table">${ui.CompareTable({ rows: d.rows, lenders: this.cols, addSlot: this.cols.length < d.max, addLabel: d.addLabel })}</div>
          </main>
        </div>
        <div class="cl-foot">
          ${ui.ComparePick({ label: d.pickLabel, lenders: this.cols, addSlot: this.cols.length < d.max })}
          <div class="cl-cta">${ui.Button({ label: d.cta(this.selectedCount()), block: true, strong: true, goto: "apply-lenders", attrs: "data-cta" })}</div>
        </div>`;

      this.wire(page, d);
    },

    selectedCount() { return this.cols.filter((c) => c.selected).length; },

    /* Green = best in the row among the lenders on screen (needs 2+ known values that differ). */
    computeBest(d) {
      const num = (v) => { const m = String(Array.isArray(v) ? v[0] : v).match(/[\d.]+/); return m ? parseFloat(m[0]) : null; };
      this.cols.forEach((c) => (c.best = []));
      Object.entries(d.bestRules).forEach(([row, dir]) => {
        const vals = this.cols.map((c) => num(c.values[row]));
        const known = vals.filter((x) => x != null);
        if (known.length < 2 || known.every((x) => x === known[0])) return;
        const target = dir === "max" ? Math.max(...known) : Math.min(...known);
        this.cols.forEach((c, i) => { if (vals[i] === target) c.best.push(row); });
      });
    },

    wire(page, d) {
      OPL.fx.statusOnScroll(page);
      const scroll = page.querySelector("[data-ct-scroll]");
      const pick = page.querySelector("[data-ct-pick]");
      scroll.addEventListener("scroll", () => { pick.scrollLeft = scroll.scrollLeft; }, { passive: true });
      OPL.fx.mouseDrag(scroll);

      page.addEventListener("click", (e) => {
        const t = e.target;
        if (t.closest("[data-compare-more]")) return OPL.back();   // back to the list to tick another
        if (t.closest("[data-diff]")) {
          this.diff = !this.diff;
          const tg = t.closest("[data-diff]");
          tg.classList.toggle("is-on", this.diff); tg.setAttribute("aria-checked", this.diff);
          return this.paintDiff(page, d);
        }
        const p = t.closest("[data-pick]");
        if (p) {
          const col = this.cols.find((c) => c.id === p.dataset.pick);
          col.selected = !col.selected;
          p.outerHTML = ui.Button({ label: col.selected ? "Selected" : "Select", variant: col.selected ? "soft" : "outlined", size: "md", block: true, attrs: `data-pick="${col.id}"` }).toString();
          return this.paintCta(page, d);
        }
        const x = t.closest("[data-col-remove]");
        if (x) {
          if (this.cols.length <= 1) return;
          const id = x.dataset.colRemove;
          page.querySelectorAll(`[data-col="${id}"]`).forEach((el) => el.classList.add("is-removing"));
          this.cols = this.cols.filter((c) => c.id !== id);
          // keep the list in step: removing here un-ticks it there
          const lo = OPL.screens["loan-offers"];
          if (lo && lo.sel) lo.sel = lo.sel.filter((x) => x !== id);
          this.timers.push(setTimeout(() => {
            page.querySelectorAll(`[data-col="${id}"]`).forEach((el) => el.remove());
            this.computeBest(d); this.paintBest(page);
            // a slot just freed up → offer it at the end
            if (this.cols.length < d.max && !page.querySelector(".ct-col--add")) {
              const scrollEl = page.querySelector("[data-ct-scroll]"), pickEl = page.querySelector("[data-ct-pick]");
              scrollEl.insertAdjacentHTML("beforeend", ui.CompareAddCol({ rows: d.rows, label: d.addLabel }).toString());
              pickEl.insertAdjacentHTML("beforeend", `<div class="ct-pick__cell" data-col="add"></div>`);
              page.querySelectorAll('[data-col="add"]').forEach((el) => el.classList.add("is-adding"));
              if (this.diff) this.paintDiff(page, d);
            }
            this.paintCta(page, d); this.paintDiff(page, d);
            if (this.cols.length <= 1) page.querySelectorAll(".ct-card__x").forEach((b) => (b.style.visibility = "hidden"));
          }, OPL.fx.motionOff() ? 0 : 320));
        }
      });

      OPL.fx.enter(page, [...page.querySelectorAll(".ct-col")], { holdMs: 2000 });
    },

    paintBest(page) {
      this.cols.forEach((c) => page.querySelectorAll(`.ct-col[data-col="${c.id}"] .ct-value`).forEach((cell) =>
        cell.classList.toggle("is-best", c.best.includes(cell.dataset.row))));
    },

    paintCta(page, d) {
      const n = this.selectedCount();
      const btn = page.querySelector("[data-cta]");
      btn.querySelector(".btn__label").textContent = d.cta(n);
      btn.disabled = n === 0;
    },

    /* "Show differences only": collapse rows where every remaining column matches. */
    paintDiff(page, d) {
      d.rows.forEach((r) => {
        const vals = this.cols.map((c) => JSON.stringify(c.values[r.id]));
        const same = vals.every((x) => x === vals[0]);
        page.querySelectorAll(`[data-row="${r.id}"]`).forEach((cell) => cell.classList.toggle("is-hidden", this.diff && same));
      });
    },
  };
})();
