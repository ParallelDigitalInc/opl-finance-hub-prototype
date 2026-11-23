/* Desktop · Govt. subsidies › Calculate estimate, as a modal over Subsidy details (v0.16.12;
   it was a side drawer — a centred stage makes the calculated moment land harder).
   No desktop frame on "-> Final Desktop"; the mobile sheet is the model (section 416:76869:
   form 416:77107 / 416:76872 → result 416:77363), flagged in the README as designed in code.

   Form   the mobile benefit cards and "Add more benefits" chips scroll; the footer is the mobile
          action bar (Get Estimate + Talk to an Expert) with one desktop addition: a live
          "Your estimate" line and Build-up bar that re-count as you type.
   Result Get Estimate turns the modal into the mobile result in place: satin + rays behind the
          header, a bundle lands per benefit while the total climbs, confetti from the stack.
          "Add more" turns it back into the form.
   State is the mobile kit's (OPL.estimateKit), so numbers carry across views and reopenings.
   Routes: #screen=subsidy-estimate / subsidy-estimate-result open Subsidy details with the
   modal up; the URL follows the modal (silently) so a reload restores it. Closing hands the result
   (S.result) back, and the page counts its estimate card to it. */
(function () {
  const { html, raw } = OPL;
  const D = OPL.d;
  const E = () => OPL.data.subsidyEstimate;
  const K = () => OPL.estimateKit;
  const total = (amt) => Object.values(amt).reduce((s, a) => s + (a > 0 ? a : 0), 0);
  const lit = (amt) => Object.values(amt).filter((a) => a > 0).length;

  /* ---- form ---------------------------------------------------------------------------- */
  const formBody = () => {
    const kit = K(), d = E(), S = kit.S, amt = kit.amounts();
    return html`
      <div class="d-estd__scroll" data-estd-scroll>
        <p class="d-estd__lead">${OPL.data.subsidyDetail.title} · Add the benefits you plan to claim. Each card works out its amount as you type.</p>
        <div class="est-list" data-list>${S.list.map((id) => kit.card(d.byId[id], amt[id], S.open.has(id)))}</div>
        <div data-chips>${kit.chips(false)}</div>
      </div>`;
  };
  const formFoot = () => {
    const kit = K(), d = E(), amt = kit.amounts();
    return html`
      <div class="d-estd__live">
        <div class="d-estd__live-top">
          <p>Your estimate</p>
          <p class="d-estd__live-amt" aria-live="polite"><span>Up to</span> <b data-total>${d.fmt(total(amt))}</b></p>
        </div>
        <div class="er-bar d-estd__bar" aria-hidden="true">
          ${d.benefits.map((b, i) => raw(`${i ? '<span class="er-bar__gap"></span>' : ""}<span class="er-seg${amt[b.id] > 0 ? " is-lit" : ""}" data-seg="${b.id}" style="--c:${b.color}"><i></i></span>`))}
        </div>
        <p class="d-estd__count" data-count>${lit(amt)} of ${d.benefits.length} benefits added</p>
      </div>
      <div class="d-estd__actions">
        ${D.btn({ label: d.cta.label, style: "filled", size: "lg", cls: "d-btn--block d-estd__go", iconRight: D.icon("btn-arrow-white", 16), attrs: "data-go" })}
        ${D.btn({ label: d.expert.label, style: "text", size: "md", cls: "d-btn--block", icon: OPL.sicon("headset-primary-16", 16), goto: d.expert.goto })}
      </div>`;
  };

  /* ---- result (mobile 416:77363) ------------------------------------------------------- */
  const resultBody = (list, amt) => {
    const kit = K(), d = E(), r = d.result;
    const sum = list.reduce((s, b) => s + amt[b.id], 0);
    return html`
      <div class="d-estd__scroll d-estd__scroll--result" data-estd-scroll>
        <div class="er d-er">
          <span class="er-confetti-wrap" hidden></span>
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
      </div>`;
  };
  const resultFoot = () => {
    const d = E(), r = d.result;
    return html`
      <div class="d-estd__actions er-actions">
        ${D.btn({ label: r.apply.label, style: "filled", size: "lg", cls: "d-btn--block", iconRight: D.icon("btn-arrow-white", 16), goto: r.apply.goto })}
        ${D.btn({ label: d.expert.label, style: "text", size: "md", cls: "d-btn--block", icon: OPL.sicon("headset-primary-16", 16), goto: d.expert.goto })}
      </div>`;
  };

  /* opened straight to the result (panel / deep link): fill the drawn example so it isn't empty */
  const fillDemo = () => {
    const kit = K(), d = E(), S = kit.S;
    if (!S.list.some((id) => kit.amounts()[id] > 0) || (S.list.includes("power") && kit.amounts().power == null)) {
      Object.entries(d.demo).forEach(([id, vals]) => Object.assign(S.values[id], vals));
    }
  };

  /* ==========================================================================================
     D.openEstimate(page, { result, onClose }) — the modal
     ========================================================================================== */
  D.openEstimate = (page, { result = false, onClose } = {}) => {
    const kit = K(), d = E(), S = kit.S, motionOff = D.motionOff();
    kit.ensure();
    if (result) fillDemo();
    const timers = [];
    let shown = {}, shownTotal = 0, mode = "form", closed = false;

    const dr = D.openModal(page, `
      <div class="d-estm__head"><h2 class="d-estm__title">${d.title}</h2><button class="d-estm__x" data-modal-close aria-label="Close">${D.icon("close-circle-drawer", 24)}</button></div>
      <div class="d-estd" data-estd></div>
      <div class="d-estm__foot"><div class="d-estd__foot" data-estd-foot></div></div>`, {
      width: 560, cls: "d-estm-layer",
      onClose: () => {
        closed = true;
        timers.forEach(clearTimeout);
        if (/^subsidy-estimate/.test(OPL.state.get().screen || "")) OPL.state.set({ screen: "subsidy-detail" }, { silent: true });
        onClose && onClose(S.result || null);           // the page reflects what was calculated
      },
    });
    const layer = dr.el, drawer = layer.querySelector(".d-modal");
    // satin + rays sit behind the header in the result state
    drawer.insertAdjacentHTML("afterbegin", `<div class="d-estd__bg" aria-hidden="true"><img src="${OPL.simg("estimate/satin-blue.jpg")}" alt=""></div><img class="d-estd__rays" src="${OPL.simg("estimate/rays.png")}" alt="" aria-hidden="true">`);
    const body = drawer.querySelector("[data-estd]"), foot = drawer.querySelector("[data-estd-foot]");
    const route = (screen) => OPL.state.set({ screen }, { silent: true });

    /* ---- form ---- */
    const showForm = ({ fromResult = false } = {}) => {
      mode = "form";
      timers.forEach(clearTimeout); timers.length = 0;
      layer.classList.remove("is-result", "is-built");
      drawer.querySelectorAll(".er-canvas").forEach((c) => c.remove());
      body.innerHTML = String(formBody());
      foot.innerHTML = String(formFoot());
      const amt = kit.amounts();
      shown = { ...amt }; shownTotal = total(amt);
      route("subsidy-estimate");
      if (!motionOff) {
        const items = [...body.querySelectorAll(".ecard, .est-more")];
        items.forEach((el, i) => el.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 320, delay: (fromResult ? 0 : 140) + i * 50, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" }));
      }
    };

    const repaint = () => {
      const amt = kit.amounts();
      Object.entries(amt).forEach(([id, a]) => {
        const el = body.querySelector(`[data-amt="${id}"]`);
        if (!el || a === shown[id]) return;
        const from = shown[id] || 0; shown[id] = a;
        if (a == null) { el.textContent = "—"; return; }
        el.classList.remove("is-ticking"); void el.offsetWidth; el.classList.add("is-ticking");
        kit.countMoney(el, from, a, { dur: 420, tight: true, timers });
      });
      const t = total(amt), tEl = foot.querySelector("[data-total]");
      if (tEl && t !== shownTotal) {
        tEl.classList.remove("is-ticking"); void tEl.offsetWidth; tEl.classList.add("is-ticking");
        kit.countMoney(tEl, shownTotal, t, { dur: 480, timers }); shownTotal = t;
      }
      foot.querySelectorAll("[data-seg]").forEach((s) => s.classList.toggle("is-lit", amt[s.dataset.seg] > 0));
      const c = foot.querySelector("[data-count]"); if (c) c.textContent = `${lit(amt)} of ${d.benefits.length} benefits added`;
      const go = foot.querySelector("[data-go]"); if (go) go.disabled = !S.list.length;
    };
    const toggle = (sec, open) => {
      const id = sec.dataset.card;
      sec.classList.toggle("is-open", open);
      sec.querySelector(".ecard__head").setAttribute("aria-expanded", open);
      sec.querySelector(".ecard__panel").toggleAttribute("inert", !open);
      open ? S.open.add(id) : S.open.delete(id);
    };
    const reveal = (el) => timers.push(setTimeout(() => el.scrollIntoView({ block: "nearest", behavior: motionOff ? "auto" : "smooth" }), motionOff ? 0 : 320));
    const repaintChips = (expanded = false) => { body.querySelector("[data-chips]").innerHTML = kit.chips(expanded).toString(); };
    const focusGap = (id) => {
      const b = d.byId[id], sec = body.querySelector(`[data-card="${id}"]`);
      if (!sec) return;
      if (!sec.classList.contains("is-open")) toggle(sec, true);
      const f = b.fields.find((f) => !f.optional && !((f.kind === "money" ? d.parseMoney(S.values[id][f.key], f.unit) : d.parseNum(S.values[id][f.key])) > 0)) || b.fields[0];
      const input = sec.querySelector(`[data-key="${f.key}"]`);
      input.classList.remove("is-error"); void input.offsetWidth; input.classList.add("is-error");
      reveal(sec);
      timers.push(setTimeout(() => input.focus({ preventScroll: true }), motionOff ? 0 : 340));
    };

    /* ---- result: the estimate is built ---- */
    const showResult = () => {
      mode = "result";
      timers.forEach(clearTimeout); timers.length = 0;
      const amt = kit.amounts();
      const list = d.benefits.filter((b) => S.list.includes(b.id) && amt[b.id] > 0);
      S.result = { total: list.reduce((t, b) => t + amt[b.id], 0), count: list.length };   // shared: the page (and mobile) show it
      body.innerHTML = String(resultBody(list, amt));
      foot.innerHTML = String(resultFoot());
      layer.classList.remove("is-built");
      void layer.offsetWidth; layer.classList.add("is-result");
      route("subsidy-estimate-result");
      // keep focus off "Add more" when the result opens; there's nothing to type into
      timers.push(setTimeout(() => { if (document.activeElement && document.activeElement.matches("[data-add-more]")) document.activeElement.blur(); }, 360));
      if (motionOff) return;
      kit.loadCelebrate();
      const er = body.querySelector(".er");
      const totalEl = body.querySelector("[data-total]");
      totalEl.textContent = d.fmt(0);
      body.querySelectorAll("[data-row-amt]").forEach((el) => (el.textContent = d.fmt(0)));
      timers.push(setTimeout(() => {
        if (closed || mode !== "result") return;
        const party = OPL.celebrate ? OPL.celebrate.run(drawer, timers) : null;
        if (!party) body.querySelector(".er-confetti-wrap").outerHTML = OPL.ui.Confetti().toString().replace('class="ms__confetti"', 'class="ms__confetti er-confetti"');
        er.classList.add("is-celebrating");
        const START = 1250, STEP = 560;
        let running = 0;
        list.forEach((b, k) => timers.push(setTimeout(() => {
          const from = running; running += amt[b.id];
          if (party) party.land(k);
          kit.countMoney(body.querySelector(`[data-row-amt="${b.id}"]`), 0, amt[b.id], { dur: 520, timers });
          kit.countMoney(totalEl, from, running, { dur: 520, timers, onDone: k === list.length - 1 ? () => {
            er.classList.add("is-built"); layer.classList.add("is-built");
            drawer.animate([{ transform: "scale(1)" }, { transform: "scale(1.015)" }, { transform: "scale(1)" }], { duration: 520, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" });
            if (party) party.finale();
          } : null });
        }, START + k * STEP)));
      }, 120));
    };
    // form ⇄ result crossfade inside the modal
    const swap = (fn) => {
      if (motionOff) return fn();
      body.classList.add("is-swapping"); foot.classList.add("is-swapping");
      timers.push(setTimeout(() => { fn(); body.classList.remove("is-swapping"); foot.classList.remove("is-swapping"); }, 170));
    };

    /* ---- events ---- */
    drawer.addEventListener("click", (e) => {
      if (e.target.closest("[data-goto]")) return dr.close();       // Apply Online / Talk to an Expert leave the modal
      if (e.target.closest("[data-add-more]")) return swap(() => showForm({ fromResult: true }));
      if (mode !== "form") return;

      const head = e.target.closest(".ecard__head");
      if (head) { const sec = head.closest(".ecard"); const open = !sec.classList.contains("is-open"); toggle(sec, open); if (open) reveal(sec); return; }

      const add = e.target.closest("[data-add]");
      if (add) {
        const id = add.dataset.add;
        if (S.list.includes(id)) return;
        S.list.push(id); S.open.add(id);
        add.classList.add("is-taken");
        const go = () => {
          const amt = kit.amounts();
          body.querySelector("[data-list]").insertAdjacentHTML("beforeend", kit.card(d.byId[id], amt[id], true, !motionOff).toString());
          shown[id] = amt[id];
          repaintChips();
          const sec = body.querySelector("[data-list]").lastElementChild;
          reveal(sec);
          timers.push(setTimeout(() => { sec.classList.remove("is-entering"); sec.querySelector(".efield__box")?.focus({ preventScroll: true }); }, motionOff ? 0 : 420));
          repaint();
        };
        motionOff ? go() : timers.push(setTimeout(go, 160));
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
        timers.push(setTimeout(done, 300));
        return;
      }

      const go = e.target.closest("[data-go]");
      if (go) {
        const gap = S.list.find((id) => !kit.parse(d.byId[id]).ok);
        if (gap) return focusGap(gap);
        if (go.classList.contains("is-loading")) return;
        go.classList.add("is-loading");
        go.querySelector("span").textContent = d.cta.busy;
        timers.push(setTimeout(() => swap(showResult), motionOff ? 0 : 900));
      }
    });
    drawer.addEventListener("input", (e) => {
      const inp = e.target.closest(".efield__box");
      if (!inp) return;
      inp.classList.remove("is-error");
      S.values[inp.dataset.ben][inp.dataset.key] = inp.value;
      repaint();
    });
    drawer.addEventListener("focusout", (e) => {
      const inp = e.target.closest(".efield__box");
      if (!inp || !inp.value) return;
      const k = inp.dataset.kind;
      const tidy = k === "money" ? d.tidyMoney(inp.value, inp.dataset.unit) : k === "count" ? d.tidyCount(inp.value) : inp.value;
      if (tidy !== inp.value) { inp.value = tidy; S.values[inp.dataset.ben][inp.dataset.key] = tidy; }
    });

    result ? showResult() : showForm();
    return dr;
  };

  /* routes: Subsidy details with the modal already up */
  const withDrawer = (result) => ({
    title: `Govt. subsidies · ${result ? "Estimate result" : "Calculate estimate"}`,
    figma: { mobile: result ? "416:77363" : "416:77107" },
    leave() { OPL.dscreens["subsidy-detail"].leave(); },
    render(page) {
      OPL.dscreens["subsidy-detail"].render(page);
      OPL.dscreens["subsidy-detail"].openEstimate(page, { result });
    },
  });
  OPL.dscreens["subsidy-estimate"] = withDrawer(false);
  OPL.dscreens["subsidy-estimate-result"] = withDrawer(true);
})();
