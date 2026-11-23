/* Desktop · NeSL signing — Figma section "nesl" 524:105163.
   Over the KFS (read, consent ticked) and a dark overlay, NeSL's own desktop portal opens
   as drawn: Agreement Preview (476:231547, scroll to read) → Agreement Preview, end, I AGREE
   (476:231121) → E-Stamp Details, Next (476:231334) → NSDL eSign OTP, Verify OTP (476:231761)
   → "Confirming your signature" (476:231762) → application Signed + milestone (476:232230).
   Each screen is the third-party screenshot with a hotspot on its real button; clicking
   elsewhere flashes it (Figma-prototype convention). CANCEL → application, left before signing.
   Order: Figma lays the frames out m2 · m3 · 231547 · m4; the reading order used here puts the
   unscrolled agreement first (flagged in the README). */
(function () {
  const { html } = OPL;
  const D = OPL.d;
  // display size in the 1440 frame; hotspots in those display px [x, y, w, h]
  const STEPS = [
    { id: "agreement-top", figma: "476:231547", w: 1055, h: 517, scrollToNext: true, next: [170, 89, 715, 340], cancel: [460, 468, 145, 24] },
    { id: "agreement-end", figma: "476:231121", w: 1055, h: 517, next: [374, 478, 147, 25], cancel: [531, 478, 144, 25] },
    { id: "estamp", figma: "476:231334", w: 1055, h: 497, next: [457, 297, 141, 23] },
    { id: "esign-otp", figma: "476:231761", w: 943, h: 517, next: [488, 330, 62, 26], cancel: [553, 330, 45, 26] },
  ];
  const src = (id) => `assets/lazy/dsk/nesl/${id}.jpg`;
  const box = (s, r) => `left:${(r[0] / s.w) * 100}%;top:${(r[1] / s.h) * 100}%;width:${(r[2] / s.w) * 100}%;height:${(r[3] / s.h) * 100}%`;

  OPL.dscreens.nesl = {
    title: "Loans · Sign on NeSL",
    figma: { portal: "476:231547", confirm: "476:231762" },
    timers: [],
    leave() { this.timers.forEach(clearTimeout); this.timers = []; OPL.dscreens.kfs.leave(); },

    render(page) {
      this.leave();
      const apps = OPL.apps.currentApps();
      this.id = OPL.state.get().app || (apps.find((a) => a.status === "sign" || a.status === "kfs") || {}).id || "pick-citi";
      this.page = page;
      const step = Number(OPL.state.get().step) || 0;
      if (step >= STEPS.length) return this.confirm(true);
      OPL.apps.setStatus(this.id, "sign");
      // backdrop: the KFS, read to the end, consent ticked (as in every NeSL frame)
      OPL.dscreens.kfs.render(page, { read: true });
      const layer = document.createElement("div");
      layer.className = "d-modal-layer d-nesl";
      layer.innerHTML = `<div class="d-scrim"></div><section class="d-nesl__win" role="dialog" aria-label="NeSL Digital Document Execution" data-win></section>`;
      page.querySelector(".d-app").appendChild(layer);
      void layer.offsetWidth; layer.classList.add("is-open");
      this.win = layer.querySelector("[data-win]");
      STEPS.forEach((s) => { const i = new Image(); i.src = src(s.id); });
      this.show(step);
      layer.addEventListener("click", (e) => {
        if (e.target.closest("[data-nesl-next]")) return this.show(this.step + 1);
        if (e.target.closest("[data-nesl-cancel]")) return this.cancel();
        const hit = layer.querySelector(".d-nesl__view:last-child [data-nesl-next]");
        if (hit && document.documentElement.dataset.hotspots !== "off") { hit.classList.remove("hotspot-flash"); void hit.offsetWidth; hit.classList.add("hotspot-flash"); }
      });
      // reading the agreement: a scroll over the document moves to its end (I AGREE)
      layer.addEventListener("wheel", (e) => {
        if (STEPS[this.step] && STEPS[this.step].scrollToNext && e.deltaY > 0) { e.preventDefault(); this.show(this.step + 1); }
      }, { passive: false });
    },

    show(step) {
      this.step = step;
      if (step >= STEPS.length) return this.confirm(false);
      const s = STEPS[step];
      this.win.style.width = `${s.w}px`;
      this.win.style.height = `${s.h}px`;
      const view = document.createElement("div");
      view.className = "d-nesl__view";
      view.innerHTML = `<img src="${src(s.id)}" width="${s.w}" height="${s.h}" alt="NeSL: ${s.id}" draggable="false">
        ${s.next ? `<button class="nesl-hit ${s.scrollToNext ? "nesl-hit--quiet" : ""}" style="${box(s, s.next)}" data-nesl-next aria-label="${s.scrollToNext ? "Read the agreement" : "Continue"}"></button>` : ""}
        ${s.cancel ? `<button class="nesl-hit nesl-hit--quiet" style="${box(s, s.cancel)}" data-nesl-cancel aria-label="Cancel"></button>` : ""}`;
      const old = this.win.firstElementChild;
      this.win.appendChild(view);
      if (old) { old.classList.add("is-out"); setTimeout(() => old.remove(), D.motionOff() ? 0 : 220); }
    },

    cancel() {
      OPL.apps.setStatus(this.id, "sign");
      OPL.go("application", { app: this.id, step: null }, { replace: true });
    },

    // 476:231762 — "Confirming your signature" in the main panel, then Signed + milestone
    confirm(park) {
      const c = OPL.data.nesl.confirm;
      this.page.innerHTML = D.shell({
        nav: "loans", title: "", tab: null,
        body: html`<div class="d-confirm">
          <img class="nesl-confirm__spin" src="assets/icons/spinner.svg" width="64" height="64" alt="">
          <h1>${c.title}</h1><p>${c.sub}</p><small>${c.foot}</small>
        </div>`,
      });
      D.mountShell(this.page);
      if (park) return;
      this.timers.push(setTimeout(() => {
        if (!this.page.isConnected) return;
        OPL.apps.setStatus(this.id, "signed");
        OPL.screens.application.celebrate = true;
        OPL.go("application", { app: this.id, step: null }, { replace: true });
      }, D.motionOff() ? 400 : c.wait));
    },
  };
})();
