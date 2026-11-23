/* Desktop · Loans › Applications — Figma 440:134641 (list) + 440:137299 ("Citi Bank
   approved your loan" modal over the list). State is the mobile kit's (OPL.apps), so an
   application submitted or advanced in either view shows the same status here.
   Live demo (as on mobile): a few seconds after submitting, the first lender approves and
   the milestone modal plays its confetti. */
(function () {
  const { html, raw } = OPL;
  const D = OPL.d;
  const A = () => OPL.data.applications;

  const COPY = {                         // verbatim 440:134641
    title: "Your Applications",
    note: "You can accept one KFS this month. When you accept one, your other applications close.",
    verifying: [
      { state: "done", label: "Application Sent", sub: "22 Nov, 11:40 am" },
      { state: "progress", label: "Lender Verification", sub: "In progress · Takes ~5 to 7 working days" },
      { state: "todo", label: "Sign KFS and Sanction", sub: "Final offer, KFS and sanction letter" },
    ],
    kfs: [
      { state: "done", label: "Application Sent", sub: "22 Nov, 11:40 am" },
      { state: "done", label: "Lender Verification", sub: "Verified on 24 Nov" },
      { state: "action", label: "Sign KFS and Sanction", sub: "Sign by 25 Nov" },
    ],
    kfsFigures: [
      { label: "Final offer", value: "₹45 L" },
      { label: "Interest", value: "9.45%", unit: "p.a." },
      { label: "APR", value: "10.54%" },
      { label: "Monthly EMI", value: "₹1,44,043", unit: "/ month" },
    ],
  };
  const LATE = ["kfs", "sign", "signed", "disbursing", "disbursed"];

  const logoFor = (id) => {
    const r = OPL.ddata.compare.records[OPL.ddata.compare.aliases[id] || id];
    return r ? r.logo : OPL.img("logo-sbi.png");
  };

  const card = (a) => {
    const l = OPL.apps.lender(a.id);
    const late = LATE.includes(a.status);
    const figs = late ? COPY.kfsFigures : [{ label: "Loan offer", value: l.amountShort }, { label: "Interest", value: "9.45%", unit: "p.a." }];
    return html`
      <article class="d-appcard" data-app="${a.id}" style="--tint:${l.tint}" tabindex="0">
        <div class="d-appcard__head">
          <div class="d-appcard__id">${D.logo(logoFor(a.id))}<div><p class="d-card__name">${l.name}</p><p class="d-card__sub">${l.type}</p></div></div>
          ${late ? html`<span class="d-appcard__tag">${D.icon("clock-amber", 16)}${A().kfs.daysLeft}</span>` : ""}
        </div>
        <div class="d-appcard__body">
          <div class="d-appcard__row">
            <div class="d-appcard__figs">${figs.map((f) => html`<div class="d-fig"><p class="d-fig__label">${f.label}</p><p class="d-fig__value">${f.value}${f.unit ? html`<small>${f.unit}</small>` : ""}</p></div>`)}</div>
            ${late
              ? D.btn({ label: "Review KFS", style: "filled", size: "lg", iconRight: D.icon("btn-arrow-white", 16), attrs: `data-app-open="${a.id}"` })
              : D.btn({ label: "View details", style: "outlined", size: "lg", cls: "d-btn--neutral", iconRight: D.micon("chevron-right-primary", 16), attrs: `data-app-open="${a.id}"` })}
          </div>
          ${D.hSteps(late ? COPY.kfs : COPY.verifying)}
        </div>
      </article>`;
  };

  OPL.dscreens.applications = {
    title: "Loans · Applications",
    figma: { list: "440:134641", approved: "440:137299" },
    timers: [],
    leave() { this.timers.forEach(clearTimeout); this.timers = []; },

    render(page) {
      this.leave();
      const apps = OPL.apps.currentApps();
      const m = OPL.screens.applications;          // mobile list state (live apps + "fresh" flag)
      page.innerHTML = D.shell({
        nav: "loans", title: "Loans", tab: "applications", counts: { compare: D.compare.get().length || null },
        body: html`
          <section class="d-apps">
            <div class="d-apps__head">
              <h2 class="d-sh__title">${COPY.title}${D.count(apps.length)}</h2>
              ${D.whatsappPill(true)}
            </div>
            <div class="d-apps__list">${apps.map(card)}</div>
            ${D.noteRow(COPY.note)}
          </section>`,
      });
      D.mountShell(page);
      if (!D.motionOff()) {
        page.querySelectorAll(".d-appcard, .d-note").forEach((el, i) => { el.classList.add("d-enter"); el.style.setProperty("--d", `${i * 80}ms`); });
        OPL.afterReveal(() => setTimeout(() => page.querySelectorAll(".d-enter").forEach((el) => el.classList.add("is-in")), 16));
        // steps fill in once their card has arrived
        OPL.afterReveal(() => this.timers.push(setTimeout(() => page.querySelectorAll(".d-steps").forEach((s) => s.classList.add("is-in")), 260)));
      } else page.querySelectorAll(".d-steps").forEach((s) => s.classList.add("is-in"));

      page.addEventListener("click", (e) => {
        const o = e.target.closest("[data-app-open]") || (!e.target.closest("button") && e.target.closest("[data-app]"));
        if (o) return OPL.go("application", { app: o.dataset.appOpen || o.dataset.app });
        const wa = e.target.closest("[data-wa]");
        if (wa) { wa.classList.toggle("is-on"); wa.setAttribute("aria-checked", wa.classList.contains("is-on")); }
      });
      page.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.matches("[data-app]")) OPL.go("application", { app: e.target.dataset.app }); });

      // Figma preset (#ms=on) or the live demo: the approval milestone
      const v = OPL.state.get();
      if (v.ms === "on") OPL.afterReveal(() => this.openApproved(page, "pick-citi"));
      if (m && m.fresh && m.apps && m.apps.length) {
        m.fresh = false;
        OPL.afterReveal(() => this.timers.push(setTimeout(() => {
          if (!page.isConnected) return;
          const first = m.apps[0];
          first.status = "kfs";
          const fresh = OPL.rerender();
          this.timers.push(setTimeout(() => fresh.isConnected && this.openApproved(fresh, first.id), D.motionOff() ? 0 : 500));
        }, D.motionOff() ? 300 : (A().demo && A().demo.toApproved) || 3500)));
      }
    },

    // 440:137299 — the mobile milestone (confetti, ripple, logo + tick) in a 480 modal
    openApproved(page, id) {
      const d = A(), l = OPL.apps.lender(id);
      const body = OPL.ui.MilestoneApproved({
        lender: l.name, logo: l.logo, type: l.type, title: d.kfs.approvedTitle(l.name), body: d.kfs.approvedBody, note: d.kfs.approvedNote,
        figures: [{ label: "Final offer", value: d.kfs.finalOffer }, { label: "Interest", value: "9.45%", unit: "p.a." }, { label: "APR", value: id === "pick-citi" ? d.kfs.summary.apr : l.apr }],
      }).toString();
      const m = D.openModal(page, `<div class="d-ms">${body}</div>`, { width: 480, cls: "d-modal--ms" });
      m.el.addEventListener("click", (e) => {
        if (e.target.closest("[data-ms-review]")) { m.close(); this.timers.push(setTimeout(() => OPL.go("application", { app: id }), 240)); }
      });
    },
  };
})();
