/* Desktop · NeSL signing — section "Loan - Signing Sanction letter & Money disbursal"
   (471:24999 … 471:26002, confirming 440:135654). The NeSL portal opens as a window over
   the application (dimmed), stepping through the same portal screens as mobile with a
   hotspot on each real button; then "Confirming your signature" fills the main panel and the
   application returns Signed with its milestone. Cancel → application, left before signing. */
(function () {
  const { html } = OPL;
  const D = OPL.d;
  const N = () => OPL.data.nesl;
  const IMG_W = 390, IMG_H = 723;
  const src = (id) => `assets/lazy/nesl/${id}.jpg`;
  const rect = (r) => `left:${(r[0] / IMG_W) * 100}%;top:${(r[1] / IMG_H) * 100}%;width:${(r[2] / IMG_W) * 100}%;height:${(r[3] / IMG_H) * 100}%`;

  OPL.dscreens.nesl = {
    title: "Loans · Sign on NeSL",
    figma: { portal: "471:24999", confirm: "440:135654" },
    timers: [],
    leave() { this.timers.forEach(clearTimeout); this.timers = []; OPL.dscreens.application.leave(); },

    render(page) {
      this.leave();
      const apps = OPL.apps.currentApps();
      this.id = OPL.state.get().app || (apps.find((a) => a.status === "sign" || a.status === "kfs") || {}).id || "pick-citi";
      this.page = page;
      const step = Number(OPL.state.get().step) || 0;
      if (step >= N().portal.length) return this.confirm(true);
      // the application (KFS accepted, not yet signed) sits underneath
      OPL.apps.setStatus(this.id, "sign");
      OPL.dscreens.application.render(page);
      const layer = document.createElement("div");
      layer.className = "d-modal-layer d-nesl";
      layer.innerHTML = html`
        <div class="d-scrim"></div>
        <section class="d-nesl__win" role="dialog" aria-label="NeSL">
          <div class="d-nesl__chrome"><span class="browser-bar__dots"><i></i><i></i><i></i></span><span class="d-nesl__url">${OPL.icon("shield-check-bold-duotone", 14)} NeSL · Digital Document Execution</span></div>
          <div class="d-nesl__shot" data-shot></div>
        </section>`.toString();
      page.querySelector(".d-app").appendChild(layer);
      void layer.offsetWidth; layer.classList.add("is-open");
      this.shotEl = layer.querySelector("[data-shot]");
      N().portal.forEach((p) => { const i = new Image(); i.src = src(p.id); });
      this.show(step);
      layer.addEventListener("click", (e) => {
        if (e.target.closest("[data-nesl-next]")) return this.show(this.step + 1);
        if (e.target.closest("[data-nesl-cancel]")) return this.cancel();
        const hit = layer.querySelector("[data-nesl-next]");
        if (hit && document.documentElement.dataset.hotspots !== "off") { hit.classList.remove("hotspot-flash"); void hit.offsetWidth; hit.classList.add("hotspot-flash"); }
      });
    },

    show(step) {
      this.timers.forEach(clearTimeout); this.timers = [];
      this.step = step;
      const portal = N().portal;
      if (step >= portal.length) return this.confirm(false);
      const p = portal[step];
      const view = document.createElement("div");
      view.className = "d-nesl__view";
      view.innerHTML = `<img src="${src(p.id)}" width="390" height="723" alt="NeSL portal: ${p.id}" draggable="false">
        ${p.next ? `<button class="nesl-hit" style="${rect(p.next)}" data-nesl-next aria-label="Continue"></button>` : ""}
        ${p.cancel ? `<button class="nesl-hit nesl-hit--quiet" style="${rect(p.cancel)}" data-nesl-cancel aria-label="Cancel"></button>` : ""}`;
      const old = this.shotEl.firstElementChild;
      this.shotEl.appendChild(view);
      if (old) { old.classList.add("is-out"); setTimeout(() => old.remove(), D.motionOff() ? 0 : 220); }
      if (p.auto) this.timers.push(setTimeout(() => this.page.isConnected && this.show(this.step + 1), D.motionOff() ? 300 : p.auto));
    },

    cancel() {
      OPL.apps.setStatus(this.id, "sign");
      OPL.go("application", { app: this.id, step: null }, { replace: true });
    },

    // 440:135654 — "Confirming your signature" in the main panel, then Signed + milestone
    confirm(park) {
      const c = N().confirm;
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
