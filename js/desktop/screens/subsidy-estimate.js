/* Desktop · Govt. subsidies › Calculate estimate. No desktop frame exists on "-> Final Desktop";
   this adapts the mobile flow (section 416:76869: form 416:77107 / 416:76872, result 416:77363)
   to the desktop shell and is flagged in the README as designed in code.

   Layout: the benefit cards (the mobile cards, same state, so numbers carry across views) on the
   left; on the right a sticky live summary in the details page's cream estimate card, whose
   total counts and Build-up bar fills as you type. Get Estimate opens the mobile result moment
   (money stack, confetti, build-up) in a 480 modal.

   Motion
   · typing: the card figure ticks, the rail total re-counts, a benefit's bar segment grows in
   · adding: chip lifts away, card drops in and asks for its first number, a new row slides into the rail
   · result: bundles land per benefit while the total climbs; finale confetti from the stack */
(function () {
  const { html, raw } = OPL;
  const D = OPL.d;
  const E = () => OPL.data.subsidyEstimate;
  const K = () => OPL.estimateKit;

  const crumbs = (last) => [
    { label: "Govt. subsidies", goto: "subsidies-overview" },
    { label: OPL.data.subsidyDetail.title, goto: "subsidy-detail" },
    { label: last },
  ];

  const total = (amt) => Object.values(amt).reduce((s, a) => s + (a > 0 ? a : 0), 0);

  /* rail: Build-up bar, one segment per benefit in catalogue order; each lit one grows in */
  const bar = (amt) => html`
    <div class="er-bar d-est__bar" role="img" aria-label="${Object.values(amt).filter((a) => a > 0).length} of ${E().benefits.length} benefits added">
      ${E().benefits.map((b, i) => raw(`${i ? '<span class="er-bar__gap"></span>' : ""}<span class="er-seg${amt[b.id] > 0 ? " is-lit" : ""}" data-seg="${b.id}" style="--c:${b.color}"><i></i></span>`))}
    </div>`;
  const rows = (amt) => {
    const S = K().S, list = E().benefits.filter((b) => S.list.includes(b.id));
    if (!list.length) return html`<p class="d-est__empty">Add a benefit to start your estimate.</p>`;
    return html`${list.map((b) => html`
      <div class="d-est__row ${amt[b.id] > 0 ? "" : "is-pending"}" data-row="${b.id}">
        <span class="er-row__key" style="background:${b.key}"></span>
        <p>${b.short}</p>
        <b data-row-amt="${b.id}">${amt[b.id] > 0 ? E().fmt(amt[b.id]) : "Add numbers"}</b>
      </div>`)}`;
  };

  OPL.dscreens["subsidy-estimate"] = {
    title: "Govt. subsidies · Calculate estimate",
    figma: { mobileForm: "416:77107", mobileResult: "416:77363" },
    timers: [],
    leave() {
      this.timers.forEach(clearTimeout); this.timers = [];
      const m = this.modal; this.modal = null;
      this.leaving = true; m && m.close(); this.leaving = false;     // closing on the way out must not reroute
    },

    render(page, { result = false } = {}) {
      this.leave();
      const kit = K(), d = E(), S = kit.S;
      kit.ensure();
      if (result) this.fillDemo();                 // so the page behind the result shows the same numbers
      const amt = kit.amounts();
      const n = Object.values(amt).filter((a) => a > 0).length;

      page.innerHTML = D.shell({
        nav: "subsidies", title: "", tab: null,
        crumbs: crumbs(d.title),
        body: html`
          <div class="d-est">
            <header class="d-sd__head d-est__head" data-enter>
              <span class="d-sd__emblem">${OPL.ui.Logo({ id: "gujaratGovt", size: 56 })}</span>
              <div><h1 class="d-sd__title">${d.title}</h1><p class="d-sd__dept">Add the benefits you plan to claim and your numbers. The estimate updates as you type.</p></div>
            </header>
            <div class="d-sd__cols d-est__cols">
              <div class="d-est__main">
                <div class="est-list" data-list>${S.list.map((id) => kit.card(d.byId[id], amt[id], S.open.has(id)))}</div>
                <div data-chips>${kit.chips(false)}</div>
              </div>
              <aside class="d-sd__rail d-est__rail" data-enter>
                <section class="d-sd__est d-est__sum">
                  <div class="d-sd__est-in">
                    <p class="d-sd__eyebrow">Your estimate</p>
                    <p class="d-sd__est-amt" aria-live="polite"><span>Up to</span><b data-total>${d.fmt(total(amt))}</b></p>
                    ${bar(amt)}
                    <p class="d-est__count" data-count>${n} of ${d.benefits.length} benefits added</p>
                  </div>
                  <div class="d-est__rows" data-rows>${rows(amt)}</div>
                  <div class="d-est__actions">
                    ${D.btn({ label: d.cta.label, style: "filled", size: "lg", cls: "d-btn--block d-est__go", iconRight: D.icon("btn-arrow-white", 16), attrs: "data-go" })}
                    ${D.btn({ label: d.expert.label, style: "outlined", size: "lg", cls: "d-btn--block d-btn--neutral", icon: OPL.sicon("headset-primary-16", 16), goto: d.expert.goto })}
                  </div>
                </section>
                <p class="d-est__note">${d.result.note}</p>
              </aside>
            </div>
          </div>`,
      });
      D.mountShell(page);
      D.enter(page);
      this.wire(page);
      if (result) this.openResult(page);
    },

    wire(page) {
      const kit = K(), d = E(), S = kit.S, motionOff = D.motionOff();
      const list = page.querySelector("[data-list]");
      const shown = {}; let shownTotal = total(kit.amounts());
      Object.entries(kit.amounts()).forEach(([k, a]) => (shown[k] = a));

      /* every change: card figures tick, rail total counts, segments grow, rows follow */
      const repaint = ({ rowsChanged = false } = {}) => {
        const amt = kit.amounts();
        Object.entries(amt).forEach(([id, a]) => {
          const el = page.querySelector(`[data-amt="${id}"]`);
          if (!el || a === shown[id]) return;
          const from = shown[id] || 0; shown[id] = a;
          if (a == null) { el.textContent = "—"; return; }
          el.classList.remove("is-ticking"); void el.offsetWidth; el.classList.add("is-ticking");
          kit.countMoney(el, from, a, { dur: 420, tight: true, timers: this.timers });
        });
        const t = total(amt), tEl = page.querySelector("[data-total]");
        if (t !== shownTotal) {
          tEl.classList.remove("is-ticking"); void tEl.offsetWidth; tEl.classList.add("is-ticking");
          kit.countMoney(tEl, shownTotal, t, { dur: 480, timers: this.timers }); shownTotal = t;
        }
        page.querySelectorAll("[data-seg]").forEach((s) => s.classList.toggle("is-lit", amt[s.dataset.seg] > 0));
        const n = Object.values(amt).filter((a) => a > 0).length;
        page.querySelector("[data-count]").textContent = `${n} of ${d.benefits.length} benefits added`;
        const box = page.querySelector("[data-rows]");
        if (rowsChanged) {
          const before = new Set([...box.querySelectorAll("[data-row]")].map((r) => r.dataset.row));
          box.innerHTML = String(rows(amt));
          if (!motionOff) box.querySelectorAll("[data-row]").forEach((r) => { if (!before.has(r.dataset.row)) r.classList.add("is-new"); });
        } else {
          box.querySelectorAll("[data-row]").forEach((r) => {
            const a = amt[r.dataset.row];
            r.classList.toggle("is-pending", !(a > 0));
            r.querySelector("b").textContent = a > 0 ? d.fmt(a) : "Add numbers";
          });
        }
        page.querySelector("[data-go]").disabled = !S.list.length;
      };
      const toggle = (sec, open) => {
        const id = sec.dataset.card;
        sec.classList.toggle("is-open", open);
        sec.querySelector(".ecard__head").setAttribute("aria-expanded", open);
        sec.querySelector(".ecard__panel").toggleAttribute("inert", !open);
        open ? S.open.add(id) : S.open.delete(id);
      };
      const repaintChips = (expanded = false) => { page.querySelector("[data-chips]").innerHTML = kit.chips(expanded).toString(); };
      const scrollTo = (el) => this.timers.push(setTimeout(() => el.scrollIntoView({ block: "nearest", behavior: motionOff ? "auto" : "smooth" }), motionOff ? 0 : 320));

      page.addEventListener("click", (e) => {
        const head = e.target.closest(".ecard__head");
        if (head) { const sec = head.closest(".ecard"); toggle(sec, !sec.classList.contains("is-open")); return; }

        const add = e.target.closest("[data-add]");
        if (add) {
          const id = add.dataset.add;
          if (S.list.includes(id)) return;
          S.list.push(id); S.open.add(id);
          add.classList.add("is-taken");
          const go = () => {
            const amt = kit.amounts();
            list.insertAdjacentHTML("beforeend", kit.card(d.byId[id], amt[id], true, !motionOff).toString());
            shown[id] = amt[id];
            repaintChips();
            const sec = list.lastElementChild;
            scrollTo(sec);
            this.timers.push(setTimeout(() => { sec.classList.remove("is-entering"); sec.querySelector(".efield__box")?.focus({ preventScroll: true }); }, motionOff ? 0 : 420));
            repaint({ rowsChanged: true });
          };
          motionOff ? go() : this.timers.push(setTimeout(go, 160));
          return;
        }
        if (e.target.closest("[data-more-all]")) return repaintChips(true);

        const rm = e.target.closest("[data-remove]");
        if (rm) {
          const id = rm.dataset.remove, sec = rm.closest(".ecard");
          S.list = S.list.filter((x) => x !== id); S.open.delete(id); delete shown[id];
          const done = () => { sec.remove(); repaintChips(); repaint({ rowsChanged: true }); };
          if (motionOff) return done();
          sec.style.height = sec.offsetHeight + "px"; void sec.offsetHeight;
          sec.classList.add("is-leaving");
          this.timers.push(setTimeout(done, 300));
          return;
        }

        // a pending row in the rail jumps to its card and asks for the number
        const row = e.target.closest(".d-est__row.is-pending");
        if (row) return this.focusGap(page, row.dataset.row, toggle, scrollTo);

        const go = e.target.closest("[data-go]");
        if (go) {
          const gap = S.list.find((id) => !kit.parse(d.byId[id]).ok);
          if (gap) return this.focusGap(page, gap, toggle, scrollTo);
          if (go.classList.contains("is-loading")) return;
          go.classList.add("is-loading");
          go.querySelector("span").textContent = d.cta.busy;
          this.timers.push(setTimeout(() => {
            go.classList.remove("is-loading"); go.querySelector("span").textContent = d.cta.label;
            this.openResult(page);
          }, motionOff ? 0 : 900));
        }
      });

      page.addEventListener("input", (e) => {
        const inp = e.target.closest(".efield__box");
        if (!inp) return;
        inp.classList.remove("is-error");
        S.values[inp.dataset.ben][inp.dataset.key] = inp.value;
        repaint();
      });
      page.addEventListener("focusout", (e) => {
        const inp = e.target.closest(".efield__box");
        if (!inp || !inp.value) return;
        const k = inp.dataset.kind;
        const tidy = k === "money" ? d.tidyMoney(inp.value, inp.dataset.unit) : k === "count" ? d.tidyCount(inp.value) : inp.value;
        if (tidy !== inp.value) { inp.value = tidy; S.values[inp.dataset.ben][inp.dataset.key] = tidy; }
      });
      this.repaint = repaint;
    },

    // opened straight to the result (panel / deep link): fill the drawn example so it isn't empty
    fillDemo() {
      const kit = K(), d = E(), S = kit.S;
      kit.ensure();
      if (!S.list.some((id) => kit.amounts()[id] > 0) || (S.list.includes("power") && kit.amounts().power == null)) {
        Object.entries(d.demo).forEach(([id, vals]) => Object.assign(S.values[id], vals));
      }
    },

    // open the card, shake the first empty field, focus it
    focusGap(page, id, toggle, scrollTo) {
      const kit = K(), d = E(), S = kit.S, b = d.byId[id];
      const sec = page.querySelector(`[data-card="${id}"]`);
      if (!sec) return;
      if (!sec.classList.contains("is-open")) toggle(sec, true);
      const f = b.fields.find((f) => !f.optional && !((f.kind === "money" ? d.parseMoney(S.values[id][f.key], f.unit) : d.parseNum(S.values[id][f.key])) > 0)) || b.fields[0];
      const input = sec.querySelector(`[data-key="${f.key}"]`);
      input.classList.remove("is-error"); void input.offsetWidth; input.classList.add("is-error");
      scrollTo(sec);
      this.timers.push(setTimeout(() => input.focus({ preventScroll: true }), D.motionOff() ? 0 : 340));
    },

    /* Result (mobile 416:77363) in a 480 modal: the estimate is built, bundle by bundle */
    openResult(page) {
      const kit = K(), d = E(), r = d.result, S = kit.S, motionOff = D.motionOff();
      this.fillDemo();
      const amt = kit.amounts();
      const list = d.benefits.filter((b) => S.list.includes(b.id) && amt[b.id] > 0);
      const sum = list.reduce((s, b) => s + amt[b.id], 0);
      const body = html`
        <div class="er d-er">
          <div class="er-sheet">
            <div class="er-bg" aria-hidden="true"><img src="${OPL.simg("estimate/satin-blue.jpg")}" alt=""></div>
            <img class="er-rays" src="${OPL.simg("estimate/rays.png")}" alt="" aria-hidden="true">
            <header class="er-head d-er__head">
              <button class="d-er__close" aria-label="Close" data-modal-close>${OPL.sicon("sheet-x", 16)}</button>
            </header>
            <div class="er-col">
              ${kit.money(list.length)}
              <div class="er-text">
                <div class="er-copy">
                  <div class="er-copy__lead"><p class="er-title">${r.title}</p><p class="er-sub">${r.sub}</p></div>
                  <p class="er-total" aria-live="polite"><span>${r.lead} </span><span data-total>${d.fmt(sum)}</span></p>
                </div>
                <section class="er-card">
                  <div class="er-bar" role="img" aria-label="${list.length} of ${d.benefits.length} benefits added">
                    ${d.benefits.map((b, i) => {
                      const k = list.findIndex((x) => x.id === b.id);
                      return raw(`${i ? '<span class="er-bar__gap"></span>' : ""}<span class="${k >= 0 ? "er-seg is-on" : "er-seg"}" ${k >= 0 ? `style="--c:${b.color};--k:${k}"` : ""}></span>`);
                    })}
                  </div>
                  <div class="er-caption"><p class="er-caption__count">${list.length} of ${d.benefits.length} benefits added</p>
                    <button class="er-caption__more" data-add-more>${r.addMore}</button></div>
                  <div class="er-break">
                    ${list.map((b, k) => html`
                      <div class="er-row" style="--k:${k}">
                        <span class="er-row__key" style="background:${b.key}"></span>
                        <p class="er-row__label">${b.short}</p>
                        <p class="er-row__amt" data-row-amt="${b.id}">${d.fmt(amt[b.id])}</p>
                      </div>`)}
                  </div>
                </section>
              </div>
            </div>
            <div class="er-note"><p>${r.note}</p></div>
          </div>
          <footer class="est-actions er-actions d-er__actions">
            ${D.btn({ label: r.apply.label, style: "filled", size: "lg", cls: "d-btn--block", iconRight: D.icon("btn-arrow-white", 16), goto: r.apply.goto })}
            ${D.btn({ label: d.expert.label, style: "outlined", size: "lg", cls: "d-btn--block d-btn--neutral", icon: OPL.sicon("headset-primary-16", 16), goto: d.expert.goto })}
          </footer>
        </div>`;
      const timers = [];
      const m = D.openModal(page, String(body), { width: 480, cls: "d-modal--est", onClose: () => {
        timers.forEach(clearTimeout);
        this.modal = null;
        if (!this.leaving && OPL.state.get().screen === "subsidy-estimate-result") OPL.go("subsidy-estimate", {}, { replace: true });
      } });
      this.modal = m;
      const box = m.el.querySelector(".d-modal");
      box.addEventListener("click", (e) => {
        if (e.target.closest("[data-add-more]")) {
          m.close();
          const chips = page.querySelector("[data-more]");
          if (chips) setTimeout(() => { chips.scrollIntoView({ block: "center", behavior: motionOff ? "auto" : "smooth" }); chips.classList.add("is-nudged"); setTimeout(() => chips.classList.remove("is-nudged"), 900); }, 260);
        }
      });
      if (motionOff) return;

      // the build-up, as on mobile: a bundle lands for each benefit and the total climbs by that amount
      kit.loadCelebrate();
      const er = box.querySelector(".er");
      const totalEl = box.querySelector("[data-total]");
      totalEl.textContent = d.fmt(0);
      box.querySelectorAll("[data-row-amt]").forEach((el) => (el.textContent = d.fmt(0)));
      timers.push(setTimeout(() => {
        const party = OPL.celebrate ? OPL.celebrate.run(box, timers) : null;
        er.classList.add("is-celebrating");
        const START = 1250, STEP = 560;
        let running = 0;
        list.forEach((b, k) => timers.push(setTimeout(() => {
          const from = running; running += amt[b.id];
          if (party) party.land(k);
          kit.countMoney(box.querySelector(`[data-row-amt="${b.id}"]`), 0, amt[b.id], { dur: 520, timers });
          kit.countMoney(totalEl, from, running, { dur: 520, timers, onDone: k === list.length - 1 ? () => {
            er.classList.add("is-built");
            if (party) party.finale();
          } : null });
        }, START + k * STEP)));
      }, 260));
    },
  };

  // deep link / panel: the page with the result already open
  OPL.dscreens["subsidy-estimate-result"] = {
    title: "Govt. subsidies · Estimate result",
    figma: { mobileResult: "416:77363" },
    leave() { OPL.dscreens["subsidy-estimate"].leave(); },
    render(page) { OPL.dscreens["subsidy-estimate"].render(page, { result: true }); },
  };
})();
