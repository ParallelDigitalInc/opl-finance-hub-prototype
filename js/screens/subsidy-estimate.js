/* ==========================================================================
   Screens · Calculate estimate (Figma section 416:76869)
   subsidy-estimate         form   416:77107 (one open) · 416:76872 (all open)
   subsidy-estimate-result  result 416:77363
   Entry: Subsidy details → "Calculate Estimate". Get Estimate replaces the form
   with the result (so Back / ✕ on the result returns to the policy page);
   "Add more" on the result swaps back to the form.

   Motion thesis
   · Form: the money is live. Each card's figure re-counts as you type; cards
     open by height; an added benefit drops in from its chip and asks for its
     first number; a removed one folds away and its chip comes back.
   · Result: the estimate is *built*. Money stacks land on the plinth with a
     confetti burst, then each benefit's segment fills the Build-up bar in turn
     while the headline total climbs by that amount, its row slides in and
     counts up. It ends on a settle-pop of the total and a shimmer over the
     benefits still to add ("Add more").
   ========================================================================== */
(function () {
  const { html, ui, cx } = OPL;
  OPL.screens = OPL.screens || {};
  const D = () => OPL.data.subsidyEstimate;
  const sicon = (n, s, c) => OPL.sicon(n, s, c);
  const simg = (n) => OPL.simg(n);

  /* ---- session state (survives form ↔ result) ---------------------------- */
  const S = (OPL.estimate = OPL.estimate || { list: null, values: {}, open: null });
  const ensure = () => {
    if (S.list) return;
    S.list = [...D().start];
    D().benefits.forEach((b) => { S.values[b.id] = Object.fromEntries(b.fields.map((f) => [f.key, f.value || ""])); });
    S.open = new Set([S.list[0]]);
  };
  const parse = (b) => {
    const d = D(), raw = S.values[b.id], out = {}; let ok = true;
    b.fields.forEach((f) => {
      const v = f.kind === "money" ? d.parseMoney(raw[f.key], f.unit) : d.parseNum(raw[f.key]);
      out[f.key] = v > 0 ? v : 0;
      if (!(v > 0) && !f.optional) ok = false;
    });
    return { ok, v: out };
  };
  const amounts = () => {
    const all = {}; S.list.forEach((id) => { all[id] = parse(D().byId[id]).v; });
    return Object.fromEntries(S.list.map((id) => {
      const b = D().byId[id], p = parse(b);
      return [id, p.ok ? Math.max(0, b.calc(p.v, all)) : null];
    }));
  };

  /* ---- shared: count a money figure from → to ----------------------------- */
  const countMoney = (el, from, to, { dur = 700, tight = false, prefix = "", timers, onDone } = {}) => {
    const f = D().fmt;
    if (OPL.fx.motionOff() || dur <= 0) { el.textContent = prefix + f(to, { tight }); return onDone && onDone(); }
    const t0 = Date.now();
    const step = () => {
      const k = Math.min(1, (Date.now() - t0) / dur);
      el.textContent = prefix + f(from + (to - from) * (1 - Math.pow(1 - k, 3)), { tight });
      if (k < 1) timers.push(setTimeout(step, 16)); else onDone && onDone();
    };
    step();
  };

  /* ==========================================================================
     Form
     ========================================================================== */
  const field = (b, f, i) => html`
    <label class="${cx("efield", i === 0 && "efield--first")}">
      <span class="efield__label">${f.label}</span>
      <input class="efield__box" type="text" inputmode="${f.kind === "pct" ? "decimal" : f.kind === "money" ? "text" : "numeric"}"
        autocomplete="off" spellcheck="false" data-ben="${b.id}" data-key="${f.key}" data-kind="${f.kind}" data-unit="${f.unit || ""}"
        value="${S.values[b.id][f.key]}" placeholder="${f.placeholder || ""}">
    </label>`;

  const card = (b, amt, open, entering = false) => html`
    <section class="${cx("ecard", open && "is-open", entering && "is-entering")}" data-card="${b.id}">
      <button class="ecard__head" data-press aria-expanded="${open}" aria-controls="ec-${b.id}">
        <span class="ecard__name">${sicon(b.icon, 24, "ecard__icon")}<span>${b.title}</span></span>
        <span class="ecard__right"><span class="ecard__amt" data-amt="${b.id}">${amt == null ? "—" : D().fmt(amt, { tight: true })}</span>${sicon("est-chev", 19.2, "ecard__chev")}</span>
      </button>
      <div class="ecard__panel" id="ec-${b.id}" ${open ? "" : OPL.raw("inert")}><div class="ecard__inner">
        <div class="ecard__fields">${b.fields.map((f, i) => field(b, f, i))}</div>
        <div class="ecard__remove-row"><button class="ecard__remove" data-press data-remove="${b.id}">${D().remove}</button></div>
      </div></div>
    </section>`;

  const chips = (expanded) => {
    const rest = D().benefits.filter((b) => !S.list.includes(b.id));
    if (!rest.length) return "";
    const shown = expanded || rest.length <= 3 ? rest : rest.slice(0, 2);
    return html`
      <div class="est-more" data-more>
        <p class="est-more__label">${D().addMore}</p>
        <div class="est-more__chips">
          ${shown.map((b) => html`<button class="est-chip" data-press data-add="${b.id}">+ ${b.chip}</button>`)}
          ${shown.length < rest.length ? html`<button class="est-chip" data-press data-more-all>+ ${rest.length - shown.length} more</button>` : ""}
        </div>
      </div>`;
  };

  OPL.screens["subsidy-estimate"] = {
    title: "Calculate estimate",
    figma: { one: "416:77107", all: "416:76872" },
    timers: [],
    leave() { this.timers.forEach(clearTimeout); this.timers = []; },

    render(page) {
      this.leave();
      ensure();
      const d = D(), v = OPL.variantValues("subsidy-estimate");
      if (v.open !== S.preset) {                         // a panel preset was picked: apply its open state
        S.open = new Set(v.open === "all" ? S.list : [S.list[0]]);
        S.preset = v.open;
      }
      const amt = amounts();
      page.innerHTML = html`
        ${ui.StatusBar()}
        <header class="est-head">
          <h1 class="est-head__title">${d.title}</h1>
          <button class="est-close" aria-label="Close" data-press data-back>${sicon("sheet-x", 16)}</button>
        </header>
        <div class="scroller est-scroller">
          <main class="est-body">
            <div class="est-list" data-list>${S.list.map((id) => card(d.byId[id], amt[id], S.open.has(id)))}</div>
            <div data-chips>${chips(false)}</div>
          </main>
        </div>
        <footer class="est-actions">
          <button class="btn btn--lg btn--filled btn--strong btn--block est-go" data-press data-go>
            <span class="btn__label">${d.cta.label}</span>${OPL.icon("chevron-right-white", 16)}
          </button>
          <button class="btn btn--md btn--ghost btn--block" data-press data-goto="${d.expert.goto}">${sicon("headset-primary-16", 16)}<span class="btn__label">${d.expert.label}</span></button>
        </footer>`;
      this.wire(page);
    },

    wire(page) {
      const d = D(), motionOff = OPL.fx.motionOff();
      const sc = page.querySelector(".scroller");
      const list = page.querySelector("[data-list]");
      OPL.fx.statusOnScroll(page);
      const shown = {};                                   // last figure painted per card
      Object.entries(amounts()).forEach(([k, a]) => (shown[k] = a));

      /* live figures: re-count the header amount whenever it changes */
      const repaint = () => {
        const amt = amounts();
        Object.entries(amt).forEach(([id, a]) => {
          const el = page.querySelector(`[data-amt="${id}"]`);
          if (!el || a === shown[id]) return;
          const from = shown[id] || 0; shown[id] = a;
          if (a == null) { el.textContent = "—"; return; }
          el.classList.remove("is-ticking"); void el.offsetWidth; el.classList.add("is-ticking");
          countMoney(el, from, a, { dur: 420, tight: true, timers: this.timers });
        });
        page.querySelector("[data-go]").disabled = !S.list.length;
      };
      const toggle = (sec, open) => {
        const id = sec.dataset.card;
        sec.classList.toggle("is-open", open);
        sec.querySelector(".ecard__head").setAttribute("aria-expanded", open);
        sec.querySelector(".ecard__panel").toggleAttribute("inert", !open);
        open ? S.open.add(id) : S.open.delete(id);
      };
      const reveal = (el) => this.timers.push(setTimeout(() => {
        const v = sc.getBoundingClientRect(), b = el.getBoundingClientRect();
        const footTop = page.querySelector(".est-actions").getBoundingClientRect().top;
        const over = b.bottom - (footTop - 16);
        if (over > 0) sc.scrollBy({ top: Math.min(over, b.top - v.top - 12), behavior: motionOff ? "auto" : "smooth" });
      }, motionOff ? 0 : 340));
      const repaintChips = (expanded = false) => { page.querySelector("[data-chips]").innerHTML = chips(expanded).toString(); };

      page.addEventListener("click", (e) => {
        const head = e.target.closest(".ecard__head");
        if (head) { const sec = head.closest(".ecard"); const open = !sec.classList.contains("is-open"); toggle(sec, open); if (open) reveal(sec); return; }

        const add = e.target.closest("[data-add]");
        if (add) {
          const id = add.dataset.add;
          if (S.list.includes(id)) return;
          S.list.push(id); S.open.add(id);
          add.classList.add("is-taken");
          const amt = amounts();
          const go = () => {
            list.insertAdjacentHTML("beforeend", card(d.byId[id], amt[id], true, !motionOff).toString());
            shown[id] = amt[id];
            repaintChips();
            const sec = list.lastElementChild;
            reveal(sec);
            this.timers.push(setTimeout(() => { sec.classList.remove("is-entering"); sec.querySelector(".efield__box")?.focus({ preventScroll: true }); }, motionOff ? 0 : 420));
            repaint();
          };
          motionOff ? go() : this.timers.push(setTimeout(go, 160));
          return;
        }
        if (e.target.closest("[data-more-all]")) return repaintChips(true);

        const rm = e.target.closest("[data-remove]");
        if (rm) {
          const id = rm.dataset.remove, sec = rm.closest(".ecard");
          S.list = S.list.filter((x) => x !== id); S.open.delete(id); delete shown[id];
          const done = () => { sec.remove(); repaintChips(); repaint(); };
          if (motionOff) return done();
          sec.style.height = sec.offsetHeight + "px"; void sec.offsetHeight;
          sec.classList.add("is-leaving");
          this.timers.push(setTimeout(done, 300));
          return;
        }

        if (e.target.closest("[data-go]")) {
          // every added benefit needs its numbers; point at the first gap
          for (const id of S.list) {
            const b = d.byId[id];
            if (parse(b).ok) continue;
            const sec = list.querySelector(`[data-card="${id}"]`);
            if (!sec.classList.contains("is-open")) toggle(sec, true);
            const f = b.fields.find((f) => !f.optional && !((f.kind === "money" ? d.parseMoney(S.values[id][f.key], f.unit) : d.parseNum(S.values[id][f.key])) > 0));
            const input = sec.querySelector(`[data-key="${f.key}"]`);
            input.classList.remove("is-error"); void input.offsetWidth; input.classList.add("is-error");
            reveal(sec);
            this.timers.push(setTimeout(() => input.focus({ preventScroll: true }), motionOff ? 0 : 360));
            if (navigator.vibrate) navigator.vibrate([12, 40, 12]);
            return;
          }
          const btn = e.target.closest("[data-go]");
          if (btn.classList.contains("is-loading")) return;
          btn.classList.add("is-loading");
          btn.querySelector(".btn__label").textContent = d.cta.busy;
          this.timers.push(setTimeout(() => OPL.go("subsidy-estimate-result", {}, { replace: true }), motionOff ? 0 : 900));
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

      OPL.fx.enter(page, [...page.querySelectorAll(".ecard"), page.querySelector(".est-more")]);
    },
  };

  /* ==========================================================================
     Result
     ========================================================================== */
  /* Money illustration — Illustrations 558:102537 (result 558:103771, 148 × 110): a blue 3D
     plinth and one bundle per benefit, bottom to top. Positions are the loose layers' (plinth
     307 × 130, bundles 201 × 88) at 0.482. With three benefits it ends exactly as drawn; more
     benefits stack more bundles on top, nudged left/right so the pile reads as handled cash. */
  const money = (n) => {
    const S = 0.482, BW = 201 * S, BH = 88 * S;
    const SLOT = [[50, 59], [64, 32], [42, 0]];                      // k0 (on the plinth), k1, k2
    const at = (k) => {
      if (k < 3) return SLOT[k];
      const up = (k - 2) * 27, dx = k % 2 ? 58 : 46;                  // further bundles: 27 up each
      return [dx, -up];
    };
    const bundle = (k) => { const [x, y] = at(k); return `<img class="er-l er-money__stack" data-k="${k}" style="--k:${k};left:${(x * S).toFixed(1)}px;top:${(y * S).toFixed(1)}px;width:${BW.toFixed(1)}px;height:${BH.toFixed(1)}px" src="${simg("estimate/bundle.png")}" alt="">`; };
    return OPL.raw(`<div class="er-money" aria-hidden="true">
      <div class="er-money__plinth"><img class="er-l" style="left:0;top:${(87 * S).toFixed(1)}px;width:${(307 * S).toFixed(1)}px;height:${(130 * S).toFixed(1)}px" src="${simg("estimate/plinth-blue.png")}" alt=""></div>
      ${Array.from({ length: Math.min(n, 8) }, (_, k) => bundle(k)).join("")}
    </div>`);
  };

  /* the celebration lives in a screen-only script (outside the first-load budget) */
  const loadCelebrate = () => OPL.celebrate ? Promise.resolve() : (OPL._celebrateP = OPL._celebrateP || new Promise((res) => {
    const s = document.createElement("script");
    s.src = simg("estimate/celebrate.js"); s.onload = res; s.onerror = res;
    document.head.appendChild(s);
  }));

  // shared with the desktop page (js/desktop/screens/subsidy-estimate.js): same state, cards, maths, art
  OPL.estimateKit = { S, ensure, parse, amounts, countMoney, card, chips, money, loadCelebrate };

  OPL.screens["subsidy-estimate-result"] = {
    title: "Estimate result",
    figma: { result: "416:77363" },
    timers: [],
    leave() { this.timers.forEach(clearTimeout); this.timers = []; },

    render(page) {
      this.leave();
      ensure();
      const d = D(), r = d.result;
      // Opened straight from the panel: fill the drawn example so the result isn't empty
      if (!S.list.some((id) => amounts()[id] > 0) || (S.list.includes("power") && amounts().power == null)) {
        Object.entries(d.demo).forEach(([id, vals]) => Object.assign(S.values[id], vals));
      }
      const amt = amounts();
      const rows = d.benefits.filter((b) => S.list.includes(b.id) && amt[b.id] > 0);   // bar order = catalogue order
      const total = rows.reduce((s, b) => s + amt[b.id], 0);
      this.rows = rows.map((b) => ({ id: b.id, amount: amt[b.id] }));
      this.total = total;
      S.result = { total, count: rows.length };           // the policy page (mobile hero, desktop card) shows it

      page.innerHTML = html`
        ${ui.StatusBar()}
        <div class="er">
          <div class="er-sheet">
            <div class="er-bg" aria-hidden="true"><img src="${simg("estimate/satin-blue.jpg")}" alt=""></div>
            <img class="er-rays" src="${simg("estimate/rays.png")}" alt="" aria-hidden="true">
            <span class="er-confetti-wrap" hidden></span>
            <header class="er-head">
              <h1 class="er-head__title">${d.title}</h1>
              <button class="est-close" aria-label="Close" data-press data-back>${sicon("sheet-x", 16)}</button>
            </header>
            <div class="er-col">
              ${money(rows.length)}
              <div class="er-text">
                <div class="er-copy">
                  <div class="er-copy__lead"><p class="er-title">${r.title}</p><p class="er-sub">${r.sub}</p></div>
                  <p class="er-total" aria-live="polite"><span>${r.lead} </span><span data-total>${d.fmt(total)}</span></p>
                </div>
                <section class="er-card">
                  <div class="er-bar" role="img" aria-label="${rows.length} of ${d.benefits.length} benefits added">
                    ${d.benefits.map((b, i) => {
                      const on = rows.find((x) => x.id === b.id);
                      return OPL.raw(`${i ? '<span class="er-bar__gap"></span>' : ""}<span class="${on ? "er-seg is-on" : "er-seg"}" ${on ? `style="--c:${b.color};--k:${rows.indexOf(on)}"` : ""}></span>`);
                    })}
                  </div>
                  <div class="er-caption"><p class="er-caption__count">${rows.length} of ${d.benefits.length} benefits added</p>
                    <button class="er-caption__more" data-press data-add-more>${r.addMore}</button></div>
                  <div class="er-break">
                    ${rows.map((b, k) => html`
                      <div class="er-row" style="--k:${k}">
                        <span class="er-row__key" style="background:${b.color}"></span>
                        <p class="er-row__label">${b.short}</p>
                        <p class="er-row__amt" data-row-amt="${b.id}">${d.fmt(amt[b.id])}</p>
                      </div>`)}
                  </div>
                </section>
              </div>
            </div>
            <div class="er-note"><p>${r.note}</p></div>
          </div>
          <footer class="est-actions er-actions">
            <button class="btn btn--lg btn--filled btn--strong btn--block" data-press data-goto="${r.apply.goto}"><span class="btn__label">${r.apply.label}</span>${OPL.icon("chevron-right-white", 16)}</button>
            <button class="btn btn--md btn--ghost btn--block" data-press data-goto="${d.expert.goto}">${sicon("headset-primary-16", 16)}<span class="btn__label">${d.expert.label}</span></button>
          </footer>
        </div>`;
      this.wire(page);
    },

    wire(page) {
      const d = D(), motionOff = OPL.fx.motionOff();
      page.addEventListener("click", (e) => {
        if (e.target.closest("[data-add-more]")) OPL.go("subsidy-estimate", {}, { replace: true });
      });
      if (motionOff) return;

      loadCelebrate();
      const er = page.querySelector(".er");
      const totalEl = page.querySelector("[data-total]");
      const rows = this.rows;
      totalEl.textContent = d.fmt(0);
      page.querySelectorAll("[data-row-amt]").forEach((el) => (el.textContent = d.fmt(0)));

      OPL.afterReveal(() => this.timers.push(setTimeout(() => {
        // the celebration script normally arrives with the page; if it didn't, the kit confetti stands in
        const party = OPL.celebrate ? OPL.celebrate.run(page, this.timers) : null;
        if (!party) page.querySelector(".er-confetti-wrap").outerHTML = ui.Confetti().toString().replace('class="ms__confetti"', 'class="ms__confetti er-confetti"');
        er.classList.add("is-celebrating");
        // the build-up: a bundle lands for each benefit, and the total climbs by that amount
        const START = 1250, STEP = 560;
        let running = 0;
        rows.forEach((row, k) => this.timers.push(setTimeout(() => {
          const from = running; running += row.amount;
          if (party) party.land(k);
          countMoney(page.querySelector(`[data-row-amt="${row.id}"]`), 0, row.amount, { dur: 520, timers: this.timers });
          countMoney(totalEl, from, running, { dur: 520, timers: this.timers, onDone: k === rows.length - 1 ? () => {
            er.classList.add("is-built");
            if (party) party.finale(); else if (navigator.vibrate) navigator.vibrate(14);
          } : null });
        }, START + k * STEP)));
      }, 380)));
    },
  };
})();
