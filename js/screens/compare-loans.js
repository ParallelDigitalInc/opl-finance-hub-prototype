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
      // working copy so removing columns / picking doesn't mutate the data
      this.cols = d.lenders.map((l) => ({ ...l }));
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
            <div class="cl-table">${ui.CompareTable({ rows: d.rows, lenders: this.cols })}</div>
          </main>
        </div>
        <div class="cl-foot">
          ${ui.ComparePick({ label: d.pickLabel, lenders: this.cols })}
          <div class="cl-cta">${ui.Button({ label: d.cta(this.selectedCount()), block: true, strong: true, goto: "apply-lenders", attrs: "data-cta" })}</div>
        </div>`;

      this.wire(page, d);
    },

    selectedCount() { return this.cols.filter((c) => c.selected).length; },

    wire(page, d) {
      OPL.fx.statusOnScroll(page);
      const scroll = page.querySelector("[data-ct-scroll]");
      const pick = page.querySelector("[data-ct-pick]");
      scroll.addEventListener("scroll", () => { pick.scrollLeft = scroll.scrollLeft; }, { passive: true });
      OPL.fx.mouseDrag(scroll);

      page.addEventListener("click", (e) => {
        const t = e.target;
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
          this.timers.push(setTimeout(() => {
            page.querySelectorAll(`[data-col="${id}"]`).forEach((el) => el.remove());
            this.paintCta(page, d); this.paintDiff(page, d);
            if (this.cols.length <= 1) page.querySelectorAll(".ct-card__x").forEach((b) => (b.style.visibility = "hidden"));
          }, OPL.fx.motionOff() ? 0 : 320));
        }
      });

      OPL.fx.enter(page, [...page.querySelectorAll(".ct-col")], { holdMs: 2000 });
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
