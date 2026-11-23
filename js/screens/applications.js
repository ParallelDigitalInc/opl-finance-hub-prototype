/* ==========================================================================
   Screens · Loan applications — Figma 416:122660
   "applications"  Track Loan Applications list (382:41059 / 382:41602)
                   + approved milestone sheet (416:43921)
   "application"   one application: verifying (382:42423) or KFS ready (382:42689)
   Entry: Apply sheet → Submit; Loans tabs → Applications.
   ========================================================================== */
(function () {
  const { html, ui } = OPL;
  OPL.screens = OPL.screens || {};
  const A = () => OPL.data.applications;
  const cl = () => OPL.data.compareLoans;
  const titleCase = (s) => String(s).replace(/\b\w/g, (c) => c.toUpperCase());
  const record = (id) => cl().records[cl().aliases[id] || id];
  const card = (id) => OPL.data.loanCatalog[id];
  const lender = (id) => {
    const r = record(id), c = card(id);
    return {
      id, name: r ? r.name : c.title, logo: r ? r.logo : c.logo,
      type: r ? r.values.type : c.subtitle,
      amountShort: r ? r.values.amount : `Up to ${c.figures[0].value}`,
      apr: r ? r.values.apr : "",
      tint: A().tints[id] || (c && c.tint) || "var(--tint-blue)",
      slug: (r ? r.name : c.title).split(" ")[0].toLowerCase(),
    };
  };
  const rate = { label: "Interest", value: "9.45%", unit: "p.a." };

  /* Status changes made in the flow (KFS accepted → "sign", NeSL done → "signed") sit on top
     of whichever list is showing, so they survive the Figma preset as well as live apps. */
  const overrides = {};
  const withOverride = (a) => (overrides[a.id] ? { ...a, status: overrides[a.id] } : a);

  /* Current application list: what was submitted, or the Figma state. */
  const currentApps = () => {
    const s = OPL.screens.applications;
    const v = OPL.variantValues("applications");
    return (v.apps === "figma" || !s.apps ? A().figmaPreset.map((a) => ({ ...a })) : s.apps).map(withOverride);
  };

  const verifyingSteps = [
    { icon: "plain-2-white", label: "Application<br>Sent", state: "done" },
    { icon: "buildings-primary", label: "Lender Verification", state: "progress" },
    { icon: "document-text-muted", label: "Sign KFS<br>and Sanction", state: "todo" },
  ];
  const kfsSteps = OPL.data.loansOverview.applications.card.steps;
  // shared with the KFS reader and NeSL hand-off (screens/kfs.js, screens/nesl.js)
  OPL.apps = {
    lender, currentApps,
    setStatus(id, status) { overrides[id] = status; },
    statusOf(id) {
      const a = currentApps().find((x) => x.id === id) || A().figmaPreset.find((x) => x.id === id);
      return overrides[id] || (a && a.status) || "verifying";
    },
  };

  /* ---- List --------------------------------------------------------------- */
  OPL.screens.applications = {
    title: "Applications",
    figma: { list: "382:41059" },
    apps: null,
    fresh: false,
    timers: [],
    leave() { this.timers.forEach((t) => clearTimeout(t)); this.timers = []; },

    render(page) {
      this.leave();
      const d = A();
      const apps = currentApps();
      const v = OPL.variantValues("applications");

      const cards = apps.map((a) => {
        const l = lender(a.id);
        return a.status === "kfs" || a.status === "sign" || a.status === "signed"   // later states reuse the KFS card (no list design yet)
          ? ui.ApplicationCard({
              id: a.id, logo: l.logo, name: l.name, product: l.type, tint: l.tint, tag: d.kfs.daysLeft,
              figures: [{ label: "Final offer", value: d.kfs.finalOffer }, rate], steps: kfsSteps,
              cta: "Review KFS", ctaAttrs: `data-app-open="${a.id}"`, footnote: d.kfs.cardNote,
            })
          : ui.ApplicationCard({
              id: a.id, logo: l.logo, name: l.name, product: l.type, tint: l.tint,
              figures: [{ label: "Loan offer", value: l.amountShort }, rate], steps: verifyingSteps, trackerStyle: "solid",
              cta: "View details", ctaVariant: "outlined", ctaAttrs: `data-app-open="${a.id}"`, note: d.verifying.cardNote(l.name),
            });
      });

      page.innerHTML = html`
        ${ui.StatusBar()}
        <div class="scroller">
          <main class="apps">
            <div class="apps-bg"><img class="apps-bg__ellipse" src="${OPL.img("hero-ellipse.svg")}" alt=""><img class="apps-bg__texture" src="${OPL.img("hero-texture.jpg")}" alt=""></div>
            <div class="apps-header">${ui.AppHeader({ title: d.title(apps.length), back: true, backIcon: "arrow-left-b", actions: [{ icon: "headphones-round-sound-linear", label: "Support", goto: "support" }] })}</div>
            <div class="apps-list">${cards}</div>
            <div class="apps-note">${ui.NoteRow({ text: d.note })}</div>
          </main>
        </div>
        <div class="floating">
          ${ui.AiMitraFab({ nudge: d.aiNudge })}
          ${ui.BottomNav({ items: OPL.data.loansOverview.nav, active: "applications", variant: "section" })}
        </div>`;

      const sheets = OPL.fx.sheets(page);
      const msBody = OPL.fx.bareSheet(page, "ms");
      this._sheets = sheets; this._ms = msBody;
      this.wire(page, sheets, msBody, v);
    },

    openMilestone(page, sheets, msBody, id) {
      const d = A(), l = lender(id);
      msBody.innerHTML = ui.MilestoneApproved({
        lender: l.name, logo: l.logo, type: l.type, title: d.kfs.approvedTitle(l.name), body: d.kfs.approvedBody, note: d.kfs.approvedNote,
        figures: [{ label: "Final offer", value: d.kfs.finalOffer }, rate, { label: "APR", value: id === "pick-citi" ? d.kfs.summary.apr : l.apr }],
      }).toString();
      msBody.dataset.app = id;
      sheets.open("ms");
    },

    wire(page, sheets, msBody, v) {
      OPL.fx.statusOnScroll(page);
      OPL.fx.playInView(page, ".tracker");
      OPL.fx.nudge(page, this.timers);
      OPL.fx.enter(page, [...page.querySelectorAll(".app-card"), page.querySelector(".apps-note")]);

      page.addEventListener("click", (e) => {
        const o = e.target.closest("[data-app-open]");
        if (o) return OPL.go("application", { app: o.dataset.appOpen });
        if (e.target.closest("[data-ms-review]")) { const id = msBody.dataset.app; sheets.close(); return this.timers.push(setTimeout(() => OPL.go("application", { app: id }), 280)); }
      });

      // Figma preset: the approved sheet open over the list
      if (v.ms === "on") this.openMilestone(page, sheets, msBody, "pick-citi");

      // Live demo: a few seconds after submitting, the first lender approves
      if (this.fresh && this.apps && this.apps.length) {
        this.fresh = false;
        OPL.afterReveal(() => this.timers.push(setTimeout(() => {
          if (!page.isConnected) return;
          const first = this.apps[0];
          first.status = "kfs";
          const fresh = OPL.rerender();
          this.openMilestone(fresh, this._sheets, this._ms, first.id);
        }, OPL.fx.motionOff() ? 0 : 5000)));
      }
    },
  };

  /* ---- Detail ------------------------------------------------------------- */
  OPL.screens.application = {
    title: "Application",
    figma: { verifying: "382:42423", kfs: "382:42689" },
    timers: [],
    leave() { this.timers.forEach((t) => clearTimeout(t)); this.timers = []; },

    render(page) {
      this.leave();
      const d = A();
      const apps = currentApps();
      const id = OPL.state.get().app || apps[0].id;
      const v = OPL.variantValues("application");
      // preset (st) > flow status > live list > Figma status (e.g. opened from the Loans overview card)
      const status = v.st || OPL.apps.statusOf(id);
      const l = lender(id);
      const kfs = status === "kfs", sign = status === "sign", signed = status === "signed";
      const footCta = kfs ? d.kfs.cta : sign ? d.sign.cta : "";
      const branch = d.branch(l.slug);

      const timeline = sign || signed
        ? [
            { icon: "plain-2", state: "done", title: `Sent to ${l.name}`, sub: d.sentAt },
            { icon: "buildings", state: "done", title: "Lender Verification", sub: d.verifiedOn, line: sign ? "fade" : "" },
            signed
              ? { icon: "document-text-done", state: "done", strong: true, title: d.signed.step3, sub: d.signed.step3Sub }
              : { icon: "document-text", state: "action", title: d.sign.step3, sub: d.sign.step3Sub },
          ]
        : kfs
        ? [
            { icon: "plain-2", state: "done", title: `Sent to ${l.name}`, sub: d.sentAt },
            { icon: "buildings", state: "done", title: "Lender Verification", sub: d.verifiedOn },
            { icon: "document-text", state: "action", title: d.kfs.title },
          ]
        : [
            { icon: "plain-2", state: "done", title: `Sent to ${l.name}`, sub: d.sentAt },
            { icon: "buildings-primary", state: "current", title: "Lender Verification", sub: d.verifying.progress, subTone: "primary" },
            { icon: "document-text-muted", state: "todo", title: d.verifying.todo },
          ];

      const body = signed
        ? html`
            <section class="appd-group">
              <h3 class="appd-group__title">${d.signed.summaryTitle}</h3>
              ${ui.AprCard({ s: d.kfs.summary, chip: d.signed.aprChip })}
              ${ui.KeyValueCard({ rows: d.signed.rows })}
            </section>
            ${ui.InfoCard({ title: "Branch Details", body: ui.ContactList(branch) })}
            ${ui.WhatsAppRow({ label: d.whatsapp })}`
        : sign
        ? html`
            ${ui.InfoCard({ title: "Branch Details", body: ui.ContactList(branch) })}
            ${ui.WhatsAppRow({ label: d.whatsapp })}`
        : kfs
        ? html`
            ${ui.KfsSummary({ s: d.kfs.summary })}
            ${ui.InfoCard({ title: "Branch Details", body: ui.ContactList(branch) })}
            ${ui.WhatsAppRow({ label: d.whatsapp })}`
        : html`
            ${ui.InfoCard({ title: "What to expect", body: d.verifying.expect(l.name).map((t) => ui.NoteRow({ text: t, tone: "info" })).join("") })}
            ${ui.InfoCard({ title: "Keep these documents ready", body: ui.DocList({ items: d.verifying.docs }) })}
            ${ui.InfoCard({ title: "Branch Details", body: ui.ContactList(branch) })}
            ${ui.InfoCard({ title: "Loan Application Details", body: ui.DetailRows({ rows: [
                ["Application No.", d.verifying.appNo, true],
                ["Loan Amount", OPL.fx.longAmount(l.amountShort)],
                ["Interest Rate", "Floating • 9.45%"],
                ["Loan Type", titleCase(l.type)],
              ] }) })}
            ${ui.WhatsAppRow({ label: d.whatsapp })}`;

      page.innerHTML = html`
        ${ui.StatusBar()}
        <div class="scroller">
          <main class="${OPL.cx("appd", footCta && "appd--kfs", signed && "appd--signed")}" style="--app-tint:${l.tint}">
            <section class="appd-top">
              <header class="appd-header">
                <button class="app-header__back" aria-label="Back" data-press data-back>${OPL.icon("arrow-left-b", 24)}</button>
                <div class="appd-header__id">${ui.Logo({ id: l.logo, size: 40 })}<div><p>${l.name}</p><span>${l.type}</span></div></div>
                ${ui.IconButton({ icon: "headphones-round-sound-linear", label: "Support", goto: "support" })}
              </header>
              <div class="appd-status">
                <h2 class="appd-status__title">${signed ? d.signed.title : sign ? d.sign.title : kfs ? d.kfs.title : d.verifying.title(l.name)}</h2>
                ${ui.Timeline({ items: timeline })}
              </div>
            </section>
            <div class="appd-body">${body}</div>
            <div class="appd-withdraw"><button class="appd-withdraw__btn" data-goto="withdraw-application" data-press>${d.withdraw}</button></div>
          </main>
        </div>
        <div class="${OPL.cx("floating", footCta && "floating--above-foot", signed && "floating--fab-only")}">
          ${ui.AiMitraFab({ nudge: d.aiNudge })}
          ${kfs || sign || signed ? "" : ui.BottomNav({ items: OPL.data.loansOverview.nav, active: "applications", variant: "section" })}
        </div>
        ${kfs ? OPL.raw(`<div class="appd-foot">${ui.Button({ label: d.kfs.cta, block: true, goto: "kfs" })}</div>`) : ""}
        ${sign ? OPL.raw(`<div class="appd-foot">${ui.Button({ label: d.sign.cta, trailing: "arrow-square-out-white", block: true, attrs: 'data-sign-nesl' })}</div>`) : ""}`;

      this.wire(page, { id, l, signed, v });
    },

    /* "Sanction letter signed" milestone (431:8687) over the signed detail */
    openSigned(page, l) {
      const d = A().signed.sheet;
      const sheets = OPL.fx.sheets(page);
      const body = OPL.fx.bareSheet(page, "signed");
      body.innerHTML = ui.MilestoneSigned({ ...d, body: d.body(l.name) }).toString();
      page.addEventListener("click", (e) => { if (e.target.closest("[data-ms-view], [data-ms-done]")) sheets.close(); });
      sheets.open("signed");
    },

    wire(page, { id, l, signed, v }) {
      OPL.fx.statusOnScroll(page);
      OPL.fx.playInView(page, ".tl, .kfs-repay");
      OPL.fx.nudge(page, this.timers);
      OPL.fx.enter(page, [page.querySelector(".appd-status"), ...page.querySelectorAll(".appd-body > *")]);
      page.addEventListener("click", (e) => {
        const acc = e.target.closest("[data-accordion]");
        if (acc) return acc.closest(".info-card").classList.toggle("is-open");
        const cp = e.target.closest("[data-copy]");
        if (cp) {
          navigator.clipboard?.writeText(cp.dataset.copy).catch(() => {});
          cp.classList.remove("is-copied"); void cp.offsetWidth; cp.classList.add("is-copied");
          if (navigator.vibrate) navigator.vibrate(6);
          return;
        }
        const wa = e.target.closest("[data-wa]");
        if (wa) { wa.classList.toggle("is-on"); wa.setAttribute("aria-checked", wa.classList.contains("is-on")); }
        if (e.target.closest("[data-sign-nesl]")) return OPL.go("nesl", { app: id, step: null });
      });

      // Arriving from NeSL (celebrate) or the Figma preset: the signed milestone sheet
      if (signed && (this.celebrate || v.ms === "on")) {
        const fresh = this.celebrate; this.celebrate = false;
        OPL.afterReveal(() => this.timers.push(setTimeout(() => page.isConnected && this.openSigned(page, l), fresh && !OPL.fx.motionOff() ? 460 : 0)));
      }
    },
  };
})();
