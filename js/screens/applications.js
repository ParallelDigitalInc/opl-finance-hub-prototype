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
    title: "Track Loans",
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
        return ["kfs", "sign", "signed", "disbursing", "disbursed"].includes(a.status)   // later states reuse the KFS card (no list design yet)
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
      const disbursing = status === "disbursing", disbursed = status === "disbursed", money = disbursing || disbursed;
      const footCta = kfs ? d.kfs.cta : sign ? d.sign.cta : "";
      const branch = d.branch(l.slug);

      // pads as drawn: step 1 text 5, middle steps flush with their node, last step 6 (431/435 frames)
      const timeline = money
        ? [
            { icon: "plain-2", state: "done", title: `Sent to ${l.name}`, sub: d.sentAt },
            { icon: "buildings", state: "done", title: "Lender Verification", sub: d.verifiedOn, pad: 0 },
            { icon: "document-text-done", state: "done", title: d.signed.step3, sub: d.signed.step3Sub, pad: 0, line: disbursing ? "fade-blue" : "" },
            disbursing
              ? { icon: "wallet-money", state: "progress", title: d.disbursing.step4, sub: d.disbursing.step4Sub(l.name), pad: 6 }
              : { icon: "wallet-money", state: "done", strong: true, title: d.disbursed.step4, sub: d.disbursed.step4Sub, pad: 6 },
          ]
        : sign || signed
        ? [
            { icon: "plain-2", state: "done", title: `Sent to ${l.name}`, sub: d.sentAt },
            { icon: "buildings", state: "done", title: "Lender Verification", sub: d.verifiedOn, line: sign ? "fade" : "", pad: 0 },
            signed
              ? { icon: "document-text-done", state: "done", strong: true, title: d.signed.step3, sub: d.signed.step3Sub, pad: 6 }
              : { icon: "document-text", state: "action", title: d.sign.step3, sub: d.sign.step3Sub, pad: 6 },
          ]
        : kfs
        ? [
            { icon: "plain-2", state: "done", title: `Sent to ${l.name}`, sub: d.sentAt },
            { icon: "buildings", state: "done", title: "Lender Verification", sub: d.verifiedOn, pad: 0 },   // 382:42737 flush, rail 73
            { icon: "document-text", state: "action", title: d.kfs.title, pad: 6 },
          ]
        : [
            { icon: "plain-2", state: "done", title: `Sent to ${l.name}`, sub: d.sentAt },
            { icon: "buildings-primary", state: "current", title: "Lender Verification", sub: d.verifying.progress, subTone: "primary" },
            { icon: "document-text-muted", state: "todo", title: d.verifying.todo },
          ];

      const disbursal = money && (disbursing ? d.disbursing : d.disbursed);
      const branchCard = ui.InfoCard({ title: "Branch Details", body: ui.ContactList(branch) });
      const docsCard = ui.InfoCard({ title: "Documents", body: ui.LinkList({ items: d.docs }) });
      const body = money
        ? html`
            <section class="appd-group">
              <h3 class="appd-group__title">${d.disbursalTitle}</h3>
              ${ui.FigureCard(disbursal.card)}
              ${ui.NoteRow({ text: disbursal.note(l.name), tone: "info" })}
            </section>
            ${disbursing ? html`${branchCard}${docsCard}` : html`${docsCard}${branchCard}`}
            ${ui.WhatsAppRow({ label: d.whatsapp })}`
        : signed
        ? html`
            <section class="appd-group">
              <h3 class="appd-group__title">${d.signed.summaryTitle}</h3>
              ${ui.AprCard({ s: d.kfs.summary, chip: d.signed.aprChip, bordered: true })}
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
          <main class="${OPL.cx("appd", footCta && "appd--kfs", signed && "appd--signed", money && "appd--money")}" style="--app-tint:${l.tint}">
            <section class="appd-top">
              <header class="appd-header">
                <button class="app-header__back" aria-label="Back" data-press data-back>${OPL.icon("arrow-left-b", 24)}</button>
                <div class="appd-header__id">${ui.Logo({ id: l.logo, size: 40 })}<div><p>${l.name}</p><span>${l.type}</span></div></div>
                ${ui.IconButton({ icon: "headphones-round-sound-linear", label: "Support", goto: "support" })}
              </header>
              <div class="appd-status">
                <h2 class="appd-status__title">${disbursed ? d.disbursed.title : disbursing ? d.disbursing.title : signed ? d.signed.title : sign ? d.sign.title : kfs ? d.kfs.title : d.verifying.title(l.name)}</h2>
                ${disbursing ? OPL.raw(`<p class="appd-status__sub">${d.disbursing.sub}</p>`) : ""}
                ${ui.Timeline({ items: timeline })}
              </div>
            </section>
            <div class="appd-body">${body}</div>
            <div class="appd-withdraw"><button class="appd-withdraw__btn" data-goto="withdraw-application" data-press>${d.withdraw}</button></div>
          </main>
        </div>
        <div class="${OPL.cx("floating", footCta && "floating--above-foot", signed && "floating--fab-only")}">
          ${ui.AiMitraFab({ nudge: d.aiNudge })}
          ${kfs || sign || signed ? "" : ui.BottomNav({
            // "Track Loans" everywhere (Shreya, 23 Nov); the disbursal frames (435:*) draw "Applications" — flagged
            items: OPL.data.loansOverview.nav,
            active: "applications", variant: "section" })}
        </div>
        ${kfs ? OPL.raw(`<div class="appd-foot">${ui.Button({ label: d.kfs.cta, block: true, goto: "kfs" })}</div>`) : ""}
        ${sign ? OPL.raw(`<div class="appd-foot">${ui.Button({ label: d.sign.cta, trailing: "arrow-square-out-white", block: true, attrs: 'data-sign-nesl' })}</div>`) : ""}`;

      this.wire(page, { id, l, signed, disbursing, disbursed, v });
    },

    /* "Sanction letter signed" milestone (431:8687) over the signed detail */
    openSigned(page, l, { live, id } = {}) {
      const d = A().signed.sheet;
      let advanced = false;
      // live flow: once the sheet is dismissed, time "passes" → Money on its way (prototype timing)
      const sheets = OPL.fx.sheets(page, { onClose: () => {
        if (!live || advanced) return; advanced = true;
        this.timers.push(setTimeout(() => {
          if (!page.isConnected) return;
          OPL.apps.setStatus(id, "disbursing"); this.progressNext = true; OPL.rerender();
        }, OPL.fx.motionOff() ? 300 : A().demo.toDisbursing));
      } });
      const body = OPL.fx.bareSheet(page, "signed");
      body.innerHTML = ui.MilestoneSigned({ ...d, body: d.body(l.name) }).toString();
      page.addEventListener("click", (e) => { if (e.target.closest("[data-ms-view], [data-ms-done]")) sheets.close(); });
      sheets.open("signed");
    },

    /* "Disbursed" milestone (435:8799): full burst, amount counts up as the hero */
    openDisbursed(page) {
      const d = A().disbursed.sheet;
      const sheets = OPL.fx.sheets(page);
      const body = OPL.fx.bareSheet(page, "disbursed");
      body.innerHTML = ui.MilestoneDisbursed(d).toString();
      page.addEventListener("click", (e) => { if (e.target.closest("[data-ms-done]")) sheets.close(); });
      sheets.open("disbursed");
      const el = body.querySelector("[data-ms-amount]");
      const to = Number(d.amount.replace(/[^\d]/g, ""));
      if (!OPL.fx.motionOff() && !OPL.reducedMotion()) {
        const t0 = Date.now() + 260, dur = 1100;
        const tick = () => {
          const k = Math.max(0, Math.min(1, (Date.now() - t0) / dur)), e = 1 - Math.pow(1 - k, 3);
          el.textContent = "₹" + Math.round(to * e).toLocaleString("en-IN");
          if (k < 1 && el.isConnected) this.timers.push(setTimeout(tick, 16));
        };
        el.textContent = "₹0"; tick();
      }
    },

    wire(page, { id, l, signed, disbursing, disbursed, v }) {
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
        OPL.afterReveal(() => this.timers.push(setTimeout(() => page.isConnected && this.openSigned(page, l, { live: fresh, id }), fresh && !OPL.fx.motionOff() ? 460 : 0)));
      }
      // Live demo continues: Money on its way → (a few seconds) → Money received + Disbursed sheet
      if (disbursing && this.progressNext) {
        this.progressNext = false;
        this.timers.push(setTimeout(() => {
          if (!page.isConnected) return;
          OPL.apps.setStatus(id, "disbursed"); this.celebrateMoney = true; OPL.rerender();
        }, OPL.fx.motionOff() ? 300 : A().demo.toDisbursed));
      }
      if (disbursed && (this.celebrateMoney || v.ms === "on")) {
        const fresh = this.celebrateMoney; this.celebrateMoney = false;
        OPL.afterReveal(() => this.timers.push(setTimeout(() => page.isConnected && this.openDisbursed(page), fresh && !OPL.fx.motionOff() ? 700 : 0)));
      }
    },
  };
})();
