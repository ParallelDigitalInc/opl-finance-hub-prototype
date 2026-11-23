/* ==========================================================================
   Shared screen behaviours (prototype layer). Screens call these from wire().
   Each returns nothing; timers go into the screen's own `timers` array so the
   screen can clear them when it re-renders or is navigated away from.
   ========================================================================== */
(function () {
  const fx = (OPL.fx = {});
  const motionOff = () => OPL.state.get().motion === "off" || OPL.reducedMotion();
  fx.motionOff = motionOff;

  /* Status bar gains a surface once content scrolls under it. */
  fx.statusOnScroll = (page) => {
    const sc = page.querySelector(".scroller");
    sc.addEventListener("scroll", () => page.classList.toggle("is-scrolled", sc.scrollTop > 8), { passive: true });
  };

  /* AI Mitra nudge: slides out once after the entrance, tucks back after ~4s
     or as soon as the user scrolls. */
  fx.nudge = (page, timers, { delay = 1900, hold = 4200 } = {}) => {
    const wrap = page.querySelector(".fab-wrap");
    if (!wrap || !wrap.querySelector(".fab-nudge") || motionOff()) return;
    const hide = () => wrap.classList.remove("is-nudging");
    OPL.afterReveal(() => timers.push(setTimeout(() => {
      wrap.classList.add("is-nudging");
      timers.push(setTimeout(hide, hold));
      page.querySelector(".scroller").addEventListener("scroll", hide, { once: true, passive: true });
    }, delay)));
  };

  /* Play a one-shot animation (adds .is-playing) when an element scrolls into view. */
  fx.playInView = (page, selector) => {
    if (motionOff()) return;
    const els = page.querySelectorAll(selector);
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("is-playing"));
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-playing"); io.unobserve(en.target); }
    }), { root: page.querySelector(".scroller"), threshold: 0.4 });
    els.forEach((e) => io.observe(e));
  };

  /* Staggered entrance for a list of elements. */
  fx.enter = (page, els, { holdMs = 4400 } = {}) => {
    if (motionOff()) return;
    els.filter(Boolean).forEach((el, i) => { el.classList.add("enter"); el.style.setProperty("--i", Math.min(i, 16)); });
    page.classList.remove("is-entering"); void page.offsetWidth; page.classList.add("is-entering");
    OPL.afterReveal(() => setTimeout(() => page.classList.remove("is-entering"), holdMs));
  };

  /* Rotating AI questions (mobile twin of desktop D.mountAi). Any [data-ai-qs] holding an
     .ai-q cell swaps its question every ~4.6s: the old one lifts away as the next rises into
     the same cell (no layout shift). Holds while pressed or hovered, while off-screen or the
     tab is hidden; still under reduced motion. Stops when the page is gone. */
  fx.aiRotate = (page, timers = []) => {
    if (motionOff()) return;
    page.querySelectorAll("[data-ai-qs]").forEach((row, k) => {
      const qs = JSON.parse(decodeURIComponent(row.dataset.aiQs));
      const cell = row.querySelector(".ai-q");
      let i = 0, hold = false, seen = false;
      ["pointerenter", "pointerdown", "focus"].forEach((ev) => row.addEventListener(ev, () => { hold = true; }));
      ["pointerleave", "pointercancel", "blur"].forEach((ev) => row.addEventListener(ev, () => { hold = false; }));
      if ("IntersectionObserver" in window) new IntersectionObserver((es) => { seen = es[0].isIntersecting; },
        { root: page.querySelector(".scroller"), threshold: 0.8 }).observe(row);
      else seen = true;
      const swap = () => {
        i = (i + 1) % qs.length;
        const old = cell.querySelector(".ai-q__t:not(.is-out)");
        const next = document.createElement("span");
        next.className = "ai-q__t is-in";
        next.textContent = qs[i];
        cell.appendChild(next);
        old?.classList.add("is-out");
        setTimeout(() => { old?.remove(); next.classList.remove("is-in"); }, 520);
        row.setAttribute("aria-label", `Ask AI Mitra: ${qs[i]}`);
      };
      const tick = () => {
        if (!row.isConnected) return;
        if (!hold && seen && !document.hidden) swap();
        timers.push(setTimeout(tick, 4600));
      };
      // first swap ~2.4s after the row comes into view, so the drawn question is read first
      const start = () => timers.push(setTimeout(tick, 2400 + k * 1700));
      if ("IntersectionObserver" in window) {
        const once = new IntersectionObserver((es) => { if (es[0].isIntersecting) { once.disconnect(); start(); } },
          { root: page.querySelector(".scroller"), threshold: 0.8 });
        once.observe(row);
      } else start();
    });
  };

  /* Bottom sheets: open(id) / close(). Scrim tap, Escape and a downward drag on
     the grip close it. onClose fires after the sheet has animated away. */
  fx.sheets = (page, { onClose } = {}) => {
    let current = null;
    const open = (id, { instant = false } = {}) => {
      const layer = page.querySelector(`[data-sheet="${id}"]`);
      if (!layer) return;
      if (current && current !== layer) close({ silent: true });
      current = layer;
      layer.hidden = false;
      layer.style.setProperty("--drag", "0px");
      if (instant || motionOff()) { layer.classList.add("is-open"); return; }
      requestAnimationFrame(() => requestAnimationFrame(() => layer.classList.add("is-open")));
      setTimeout(() => layer.classList.add("is-open"), 40);
    };
    const close = ({ silent = false } = {}) => {
      const layer = current;
      if (!layer) return;
      current = null;
      layer.classList.remove("is-open", "is-dragging");
      layer.style.setProperty("--drag", "0px");
      setTimeout(() => { layer.hidden = true; if (!silent && onClose) onClose(layer.dataset.sheet); }, motionOff() ? 0 : 420);
    };
    page.addEventListener("click", (e) => { if (e.target.closest("[data-sheet-close]")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && current && page.isConnected) close(); });
    // drag to dismiss
    let startY = 0, dy = 0, dragging = false, t0 = 0;
    page.addEventListener("pointerdown", (e) => {
      const grip = e.target.closest("[data-sheet-drag]");
      // buttons inside the grip (e.g. "Clear all") keep their tap: capturing the pointer would retarget the click
      if (!grip || !current || e.target.closest("button")) return;
      dragging = true; startY = e.clientY; dy = 0; t0 = performance.now();
      current.classList.add("is-dragging");
      grip.setPointerCapture?.(e.pointerId);
    });
    page.addEventListener("pointermove", (e) => {
      if (!dragging || !current) return;
      dy = Math.max(0, e.clientY - startY);
      current.style.setProperty("--drag", dy + "px");
    });
    const end = () => {
      if (!dragging || !current) return;
      dragging = false;
      current.classList.remove("is-dragging");
      const v = dy / Math.max(1, performance.now() - t0);
      if (dy > 90 || v > 0.6) close(); else current.style.setProperty("--drag", "0px");
    };
    page.addEventListener("pointerup", end);
    page.addEventListener("pointercancel", end);
    return { open, close, isOpen: () => !!current };
  };

  /* Loan details sheet (proposed), shared by Home, Loans overview and Loan offers.
     Any [data-detail="<catalog id>"] opens it. Compare state is the Loan offers
     selection, so ticking here shows up there. onCompare(id, btn) lets a screen
     handle the toggle itself (Loan offers repaints its cards + tray); it returns
     true if the selection changed. */
  fx.loanDetail = (page, sheets, { onCompare } = {}) => {
    const { ui } = OPL;
    page.insertAdjacentHTML("beforeend", ui.Sheet({
      id: "detail", title: "Loan details",
      body: OPL.raw(`<div class="sheet-detail" data-detail-body></div>`),
      footer: OPL.raw(`<div data-detail-foot></div>`),
    }).toString());
    const list = () => { const d = OPL.data.loanOffers; return [...d.picks, ...d.offers]; };
    const lo = () => OPL.screens["loan-offers"];
    let current = null;
    const paintFoot = () => {
      if (!current) return;
      page.querySelector("[data-detail-foot]").innerHTML = ui.LoanDetailFoot({
        id: current, selected: lo().sel.includes(current), compare: list().some((c) => c.id === current),
      }).toString();
    };
    const defaultToggle = (id, btn) => {
      const s = lo();
      if (s.sel.includes(id)) { s.sel = s.sel.filter((x) => x !== id); return true; }
      if (s.sel.length >= OPL.data.loanOffers.compareMax) { btn.classList.remove("is-shake"); void btn.offsetWidth; btn.classList.add("is-shake"); return false; }
      s.sel = [...s.sel, id]; return true;
    };
    const open = (id) => {
      const offer = OPL.data.loanCatalog[id];
      if (!offer) return;
      const cl = OPL.data.compareLoans;
      const body = page.querySelector("[data-detail-body]");
      body.innerHTML = ui.LoanDetail({ offer, record: cl.records[cl.aliases[id] || id] }).toString();
      body.scrollTop = 0;
      current = id;
      paintFoot();
      sheets.open("detail");
    };
    page.addEventListener("click", (e) => {
      const det = e.target.closest("[data-detail]");
      if (det) return open(det.dataset.detail);
      const dc = e.target.closest("[data-detail-compare]");
      if (dc) {
        const id = dc.dataset.detailCompare, was = lo().sel.includes(id);
        const changed = (onCompare || defaultToggle)(id, dc);
        if (changed) { paintFoot(); page.querySelector("[data-detail-compare]")?.classList.add("is-popping"); }
        // Outside Loan offers there's nothing on screen to compare against: ticking takes you to
        // Loan offers, where the compare tray holds this loan and asks for another (382:35666).
        if (changed && !onCompare && !was) {
          lo().arriveWithTray = true;
          setTimeout(() => { sheets.close(); setTimeout(() => OPL.go("loan-offers", { compare: null, sheet: null }), motionOff() ? 0 : 260); }, motionOff() ? 0 : 380);
        }
      }
    });
    return { open, paintFoot };
  };

  /* Footer morph on page push/pop. Each page carries its own nav, so a section change
     (Finance hub tabs ↔ Loans tabs) used to slide away with the page and go unnoticed.
     Now the footer holds still (counter-moves against the page slide) and swaps its tabs
     in place: old tabs drop out, new ones rise in one by one, the active pill pops.
     Same tab set → it just holds still, so only the active tab changes. */
  fx.navMorph = (oldPage, newPage, dir) => {
    const oldNav = oldPage.querySelector(".nav"), newNav = newPage.querySelector(".nav");
    if (!oldNav || !newNav || motionOff() || !newNav.animate) return;
    const ease = "cubic-bezier(0.22, 1, 0.36, 1)", spring = "cubic-bezier(0.34, 1.56, 0.64, 1)";
    const W = newPage.offsetWidth;
    // counter the page keyframes (push-in from 100%, pop-in from -28%) so the bar stays put.
    // A CSS animation started in the same style pass as the page's keeps the two in lockstep.
    newNav.style.setProperty("--hold-from", `${dir === "back" ? 0.28 * W : -W}px`);
    newNav.classList.add(dir === "back" ? "is-hold-pop" : "is-hold-push");
    setTimeout(() => newNav.classList.remove("is-hold-pop", "is-hold-push"), 460);
    oldNav.style.visibility = "hidden";

    const labels = (n) => [...n.querySelectorAll(".nav__label")].map((l) => l.textContent).join("|");
    if (labels(oldNav) === labels(newNav)) {
      const pill = newNav.querySelector(".nav__item.is-active");
      pill?.animate([{ backgroundColor: "rgba(56, 88, 229, 0)" }, {}], { duration: 260, easing: ease });
      return;
    }
    const ghost = oldNav.cloneNode(true);
    ghost.classList.add("nav--ghost");
    ghost.setAttribute("aria-hidden", "true");
    ghost.style.visibility = "visible";
    newNav.appendChild(ghost);
    const out = [...ghost.querySelectorAll(".nav__item")], inc = [...newNav.querySelectorAll(":scope > .nav__item")];
    out.forEach((it, i) => it.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(12px)" }],
      { duration: 200, delay: i * 30, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" }));
    inc.forEach((it, i) => it.animate([{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }],
      { duration: 380, delay: 170 + i * 50, easing: ease, fill: "backwards" }));
    const active = newNav.querySelector(":scope > .nav__item.is-active .nav__pill");
    active?.animate([{ transform: "scale(1)" }, { transform: "scale(1.18)" }, { transform: "none" }],
      { duration: 460, delay: 170 + inc.length * 50 + 80, easing: spring });
    newNav.animate([{ boxShadow: "0 4px 12px rgba(0,0,0,.04), 0 0 0 0 rgba(56,88,229,0)" }, { boxShadow: "0 4px 12px rgba(0,0,0,.04), 0 0 0 4px rgba(56,88,229,.14)" }, { boxShadow: "0 4px 12px rgba(0,0,0,.04), 0 0 0 0 rgba(56,88,229,0)" }],
      { duration: 700, delay: 140, easing: "ease-out" });
    setTimeout(() => ghost.remove(), 800);
  };

  /* Bare sheet shell (custom layout, e.g. Apply / Milestone). Returns the body element. */
  fx.bareSheet = (page, id) => {
    page.insertAdjacentHTML("beforeend", `<div class="sheet-layer" data-sheet="${id}" hidden>
      <div class="sheet-scrim" data-sheet-close></div>
      <section class="sheet sheet--bare" role="dialog"><div class="sheet__bare-body" data-${id}-body></div></section></div>`);
    return page.querySelector(`[data-${id}-body]`);
  };

  /* Short "Up to ₹50 L" → long "Up to ₹50 Lakhs" (as written on the apply sheet / details) */
  fx.longAmount = (v) => String(v || "").replace(/₹([\d.]+)\s*L$/, "₹$1 Lakhs");

  /* Apply sheet ("Proceed applying", 382:41022). open(ids) for one or many offers.
     Submit → applications are created as "verifying" and the Applications list opens. */
  fx.applySheet = (page, sheets) => {
    const { ui } = OPL;
    const body = fx.bareSheet(page, "apply");
    let ids = [];
    const lenderOf = (id) => {
      const cl = OPL.data.compareLoans;
      const rec = cl.records[cl.aliases[id] || id];
      const card = OPL.data.loanCatalog[id];
      return { id, name: rec ? rec.name : card.title, logo: rec ? rec.logo : card.logo,
        type: rec ? rec.values.type : card.subtitle, amount: fx.longAmount(rec ? rec.values.amount : `Up to ${card.figures[0].value}`) };
    };
    const open = (list) => {
      ids = list.filter(Boolean);
      if (!ids.length) return;
      body.innerHTML = ui.ApplySheetBody({ lenders: ids.map(lenderOf) }).toString();
      sheets.open("apply");
    };
    page.addEventListener("click", (e) => {
      const one = e.target.closest("[data-apply]");
      if (one) { e.stopPropagation(); return open([one.dataset.apply]); }
      const c = e.target.closest("[data-consent]");
      if (c) {
        const on = c.getAttribute("aria-pressed") !== "true";
        c.setAttribute("aria-pressed", on);
        c.querySelector("img").src = `assets/icons/${on ? "check-square-22" : "check-square"}.svg`;
        c.classList.remove("is-popping"); void c.offsetWidth; c.classList.add("is-popping");
        body.querySelector("[data-apply-submit]").disabled = !on;
        return;
      }
      const sub = e.target.closest("[data-apply-submit]");
      if (sub) {
        sub.classList.add("is-loading");
        setTimeout(() => {
          const apps = OPL.screens.applications;
          apps.apps = ids.map((id) => ({ id, status: "verifying" }));
          apps.fresh = true;                       // lets the list play the approval moment
          sheets.close();
          setTimeout(() => OPL.go("applications"), motionOff() ? 0 : 260);
        }, motionOff() ? 0 : 900);
      }
    });
    return { open };
  };

  /* Drag-to-scroll with a mouse (presenting on a laptop). */
  fx.mouseDrag = (el) => {
    let down = false, sx = 0, sl = 0, moved = false;
    el.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse") return;
      down = true; moved = false; sx = e.clientX; sl = el.scrollLeft;
      el.style.scrollSnapType = "none";
    });
    window.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = sl - dx;
    });
    window.addEventListener("pointerup", () => {
      if (!down) return;
      down = false;
      el.style.scrollSnapType = "";
      if (moved) el.addEventListener("click", (e) => { e.stopPropagation(); e.preventDefault(); }, { capture: true, once: true });
    });
  };
})();
