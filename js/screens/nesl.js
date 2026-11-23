/* ==========================================================================
   Screen · NeSL signing hand-off — Figma group E.
   Steps 0–5 are the NeSL portal as drawn: screenshots of the third-party site
   (433:8115 redirect → 416:83009 OTP → 416:83028 agreement → 416:83058 e-stamp →
   416:83077 signing method → 416:83101 Aadhaar eSign). Each has a hotspot on its
   real button; tapping elsewhere flashes it (Figma-prototype convention).
   Step 6 is ours: "Confirming your signature" (416:82947), then the application
   opens in the Signed state with the milestone sheet (431:8486).
   Cancel on NeSL returns to the application, left before signing (431:7803).
   The portal steps live inside one page: Back leaves NeSL, it doesn't step back.
   ========================================================================== */
(function () {
  const { html, ui } = OPL;
  OPL.screens = OPL.screens || {};
  const N = () => OPL.data.nesl;
  const IMG_W = 390, IMG_H = 723;
  const src = (id) => `assets/lazy/nesl/${id}.jpg`;
  const rect = (r) => `left:${(r[0] / IMG_W) * 100}%;top:${(r[1] / IMG_H) * 100}%;width:${(r[2] / IMG_W) * 100}%;height:${(r[3] / IMG_H) * 100}%`;

  OPL.screens.nesl = {
    title: "NeSL signing",
    figma: { redirect: "433:8115", confirm: "416:82947" },
    timers: [],
    leave() { this.timers.forEach((t) => clearTimeout(t)); this.timers = []; },

    render(page) {
      this.leave();
      const v = OPL.variantValues("nesl");
      const apps = OPL.apps.currentApps();
      this.id = OPL.state.get().app || (apps.find((a) => a.status === "sign" || a.status === "kfs") || {}).id || "pick-citi";
      page.innerHTML = html`<div class="nesl" data-nesl></div>`;
      this.root = page.querySelector("[data-nesl]");
      this.page = page;
      // warm the cache so each portal step swaps in without a blank frame
      N().portal.forEach((p) => { const i = new Image(); i.src = src(p.id); });
      this.show(Number(v.step) || 0, true);

      page.addEventListener("click", (e) => {
        if (e.target.closest("[data-nesl-next]")) return this.advance();
        if (e.target.closest("[data-nesl-cancel]")) return this.cancel();
        const hit = this.root.querySelector("[data-nesl-next]");
        if (hit && document.documentElement.dataset.hotspots !== "off") {
          hit.classList.remove("hotspot-flash"); void hit.offsetWidth; hit.classList.add("hotspot-flash");
        }
      });
    },

    show(step, first) {
      this.timers.forEach((t) => clearTimeout(t)); this.timers = [];
      this.step = step;
      const portal = N().portal;
      if (step >= portal.length) return this.confirm(first);   // opened on the Confirming preset: park there
      const p = portal[step];
      const view = document.createElement("div");
      view.className = "nesl-view" + (p.dim ? " nesl-view--dim" : "") + (first ? "" : " is-in");
      view.innerHTML = html`
        ${ui.StatusBar()}
        <div class="nesl-shot">
          <img src="${src(p.id)}" width="390" height="723" alt="NeSL portal: ${p.id}" draggable="false">
          ${p.next ? OPL.raw(`<button class="nesl-hit" style="${rect(p.next)}" data-nesl-next aria-label="Continue"></button>`) : ""}
          ${p.cancel ? OPL.raw(`<button class="nesl-hit nesl-hit--quiet" style="${rect(p.cancel)}" data-nesl-cancel aria-label="Cancel"></button>`) : ""}
        </div>`.toString();
      const old = this.root.firstElementChild;
      this.root.appendChild(view);
      if (old) setTimeout(() => old.remove(), OPL.fx.motionOff() ? 0 : 220);
      if (p.auto) this.timers.push(setTimeout(() => this.page.isConnected && this.advance(), OPL.fx.motionOff() ? 300 : p.auto));
    },

    advance() { this.show(this.step + 1); },

    // NeSL Cancel → back to the application, KFS accepted but not signed (431:7803)
    cancel() {
      OPL.apps.setStatus(this.id, "sign");
      OPL.go("application", { app: this.id, st: null, ms: null, step: null }, { replace: true });
    },

    /* "Confirming your signature" (416:82947) → Signed (431:8486) */
    confirm(park) {
      const c = N().confirm;
      const view = document.createElement("div");
      view.className = "nesl-view nesl-confirm is-in";
      view.innerHTML = html`
        ${ui.StatusBar()}
        <div class="nesl-confirm__loader">
          <img class="nesl-confirm__spin" src="assets/icons/spinner.svg" width="64" height="64" alt="">
          <div class="nesl-confirm__msg"><h1>${c.title}</h1><p>${c.sub}</p></div>
        </div>
        <p class="nesl-confirm__foot">${c.foot}</p>`.toString();
      const old = this.root.firstElementChild;
      this.root.appendChild(view);
      if (old) setTimeout(() => old.remove(), OPL.fx.motionOff() ? 0 : 220);
      if (park) return;   // Figma preset 416:82947; the live flow carries on to the signed application
      this.timers.push(setTimeout(() => {
        if (!this.page.isConnected) return;
        OPL.apps.setStatus(this.id, "signed");
        OPL.screens.application.celebrate = true;
        OPL.go("application", { app: this.id, st: null, ms: null, step: null }, { replace: true });
      }, OPL.fx.motionOff() ? 400 : c.wait));
    },
  };
})();
