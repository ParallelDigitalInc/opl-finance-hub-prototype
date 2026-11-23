/* Desktop · Application page — Figma section "final-loan applications" 440:134259:
   verifying 440:136328 · KFS ready 440:136512 · money on its way 440:136901 ·
   money in account 440:137099 · sanction signed 440:136706.
   Layout as drawn: breadcrumbs → main column (summary card, status story card with the
   timeline, repayment card) + 340 rail (Branch details, Documents / documents to keep
   ready, WhatsApp, Withdraw). The timeline, info cards and milestone sheets are the mobile
   kit's, so status, copy and delight match mobile one-to-one. Status = OPL.apps (shared). */
(function () {
  const { html, raw, ui } = OPL;
  const D = OPL.d;
  const A = () => OPL.data.applications;

  const COPY = {                                   // desktop-only copy, verbatim from the frames
    appId: "LA-2026-10-6101",
    beforeTitle: "Before you sign",
    before: [
      { text: "Accept the KFS and sign the sanction letter by 25 Nov 2026.", tone: "warning" },
      { text: "You can accept one KFS this month. Other ongoing loan applications close once you accept this.", tone: "info" },
    ],
    expectTitle: "What to expect",
    expectVerifying: (name) => [`${name} will call you on +91 ******6789.`, "They may visit your unit on Ring Road, Surat."],
    expectMoney: (name) => ["Expected in your account in 5–8 working days.", `${name} may call you to confirm details before disbursal of the final loan amount.`],
    repayTitle: "Total Repayment Amount",
    docsReady: "Keep these documents ready",
    withdraw: "Withdraw application",
  };
  const logoFor = (id) => {
    const c = OPL.ddata.compare;
    const r = c.records[c.aliases[id] || id];
    return r ? r.logo : OPL.img("logo-sbi.png");
  };

  const timelineFor = (st, l, d) => {
    const money = st === "disbursing" || st === "disbursed";
    if (money) return [
      { icon: "plain-2", state: "done", title: `Sent to ${l.name}`, sub: d.sentAt },
      { icon: "buildings", state: "done", title: "Lender Verification", sub: d.verifiedOn, pad: 0 },
      { icon: "document-text-done", state: "done", title: d.signed.step3, sub: d.signed.step3Sub, pad: 0, line: st === "disbursing" ? "fade-blue" : "" },
      st === "disbursing"
        ? { icon: "wallet-money", state: "progress", title: d.disbursing.step4, sub: d.disbursing.step4Sub(l.name), pad: 6 }
        : { icon: "wallet-money", state: "done", strong: true, title: d.disbursed.step4, sub: d.disbursed.step4Sub, pad: 6 },
    ];
    if (st === "sign" || st === "signed") return [
      { icon: "plain-2", state: "done", title: `Sent to ${l.name}`, sub: d.sentAt },
      { icon: "buildings", state: "done", title: "Lender Verification", sub: d.verifiedOn, line: st === "sign" ? "fade" : "", pad: 0 },
      st === "signed"
        ? { icon: "document-text-done", state: "done", strong: true, title: d.signed.step3, sub: d.signed.step3Sub, pad: 6 }
        : { icon: "document-text", state: "action", title: d.sign.step3, sub: d.sign.step3Sub, pad: 6 },
    ];
    if (st === "kfs") return [
      { icon: "plain-2", state: "done", title: `Sent to ${l.name}`, sub: d.sentAt },
      { icon: "buildings", state: "done", title: "Lender Verification", sub: d.verifiedOn, pad: 0 },
      { icon: "document-text", state: "action", title: d.kfs.title, pad: 6 },
    ];
    return [
      { icon: "plain-2", state: "done", title: `Sent to ${l.name}`, sub: d.sentAt },
      { icon: "buildings-primary", state: "current", title: "Lender Verification", sub: d.verifying.progress, subTone: "primary" },
      { icon: "document-text-muted", state: "todo", title: d.verifying.todo },
    ];
  };

  const repayCard = (s) => html`
    <section class="d-panel d-repay" data-enter>
      <div class="d-repay__head"><p>${COPY.repayTitle}</p><b>${s.repay}</b></div>
      <div class="kfs-repay__bar d-repay__bar">${s.split.map((p) => raw(`<span style="flex:${p.w} 0 0;background:${p.color}"></span>`))}</div>
      <div class="kfs-repay__legend">${s.split.map((p) => raw(`<div>${OPL.icon(p.dot, 8)}<span>${p.label}</span><b>${p.value}</b></div>`))}</div>
    </section>`;

  OPL.dscreens.application = {
    title: "Loans · Application",
    figma: { verifying: "440:136328", kfs: "440:136512", disbursing: "440:136901", disbursed: "440:137099", signed: "440:136706" },
    timers: [],
    leave() { this.timers.forEach(clearTimeout); this.timers = []; },

    render(page) {
      this.leave();
      const d = A();
      const apps = OPL.apps.currentApps();
      const q = OPL.state.get();
      const id = q.app || apps[0].id;
      const st = q.st || OPL.apps.statusOf(id);
      const l = OPL.apps.lender(id);
      const verifying = !["kfs", "sign", "signed", "disbursing", "disbursed"].includes(st);
      const money = st === "disbursing" || st === "disbursed";
      const s = d.kfs.summary;

      const figures = verifying
        ? [{ label: "Loan offer", value: l.amountShort }, { label: "Interest rate", value: "9.45%", unit: "p.a. floating" }, { label: "Loan type", value: "Term loan" }, { label: "Decision expected", value: "5–7 working days" }]
        : [{ label: "Final offer", value: d.kfs.finalOffer }, { label: "Interest rate", value: "9.45%", unit: "p.a. floating" }, { label: "APR", value: s.apr }, { label: "Monthly EMI", value: s.emi }];

      const title = { kfs: d.kfs.title, sign: d.sign.title, signed: d.signed.title, disbursing: d.disbursing.title, disbursed: d.disbursed.title }[st] || d.verifying.title(l.name);
      const cta = st === "kfs" ? D.btn({ label: "Review KFS & Accept", style: "filled", size: "lg", iconRight: D.icon("btn-arrow-white", 16), attrs: "data-review-kfs" })
        : st === "sign" ? D.btn({ label: d.sign.cta, style: "filled", size: "lg", iconRight: OPL.icon("arrow-square-out-white", 16), attrs: "data-sign-nesl" }) : "";
      const notes = st === "kfs" || st === "sign"
        ? html`<div class="d-story__sub"><p class="d-story__h">${COPY.beforeTitle}</p>${COPY.before.map((n) => ui.NoteRow(n))}</div>`
        : verifying || money
        ? html`<div class="d-story__sub"><p class="d-story__h">${COPY.expectTitle}</p>${(verifying ? COPY.expectVerifying(l.name) : COPY.expectMoney(l.name)).map((t) => ui.NoteRow({ text: t, tone: "info" }))}</div>`
        : "";
      const branch = ui.InfoCard({ title: "Branch Details", body: ui.ContactList(d.branch(l.slug)) });
      const docs = ui.InfoCard({ title: "Documents", body: ui.LinkList({ items: d.docs }) });
      const ready = ui.InfoCard({ title: COPY.docsReady, body: ui.DocList({ items: d.verifying.docs }) });

      page.innerHTML = D.shell({
        nav: "loans", title: "", tab: null,
        crumbs: [{ label: "Loans", goto: "loans-overview" }, { label: "Track Loans", goto: "applications" }, { label: `Loan details - ${l.name}` }],
        body: html`
          <div class="d-appd" style="--tint:${l.tint}">
            <div class="d-appd__main">
              <section class="d-appd__summary" data-enter>
                <div class="d-appd__head">
                  <span class="d-appd__id-tag">Application ID: <b>${COPY.appId}</b></span>
                  <div class="d-appd__who">${D.logo(logoFor(id))}<div><h1>${l.name}</h1><p>${l.type}</p></div></div>
                </div>
                <div class="d-appd__figs">${figures.map((f) => html`<div class="d-appd__fig"><p>${f.label}</p><b>${f.value}${f.unit ? html`<small>${f.unit}</small>` : ""}</b></div>`)}</div>
              </section>
              <section class="d-panel d-story" data-enter>
                <div class="d-story__top"><h2>${title}</h2>${cta}</div>
                ${st === "disbursing" ? html`<p class="d-story__eta">${d.disbursing.sub}</p>` : ""}
                ${ui.Timeline({ items: timelineFor(st, l, d) })}
                ${notes}
              </section>
              ${verifying ? "" : repayCard(s)}
            </div>
            <aside class="d-appd__rail" data-enter>
              ${branch}
              ${verifying ? ready : money || st === "signed" ? docs : ""}
              ${ui.WhatsAppRow({ label: d.whatsapp })}
              ${money && st === "disbursed" ? "" : html`<button class="d-withdraw" data-goto="withdraw">${COPY.withdraw}</button>`}
            </aside>
          </div>`,
      });
      page.querySelectorAll(".d-appd__rail .info-card").forEach((c) => c.classList.add("is-open"));
      D.mountShell(page);
      D.enter(page);
      OPL.fx.playInView(page, ".tl, .d-repay");
      this.bind(page, { id, l, st });

      // Milestones (as on mobile): arriving from NeSL → Signed; the live demo then moves to
      // Money on its way → Money received with the Disbursed moment.
      const m = OPL.screens.application;           // shared flags (mobile NeSL sets .celebrate)
      if (st === "signed" && (m.celebrate || q.ms === "on")) {
        const live = m.celebrate; m.celebrate = false;
        OPL.afterReveal(() => this.timers.push(setTimeout(() => page.isConnected && this.openSigned(page, l, id, live), live && !D.motionOff() ? 460 : 0)));
      }
      if (st === "disbursing" && m.progressNext) {
        m.progressNext = false;
        this.timers.push(setTimeout(() => {
          if (!page.isConnected) return;
          OPL.apps.setStatus(id, "disbursed"); m.celebrateMoney = true; OPL.rerender();
        }, D.motionOff() ? 300 : d.demo.toDisbursed));
      }
      if (st === "disbursed" && (m.celebrateMoney || q.ms === "on")) {
        const live = m.celebrateMoney; m.celebrateMoney = false;
        OPL.afterReveal(() => this.timers.push(setTimeout(() => page.isConnected && this.openDisbursed(page), live && !D.motionOff() ? 700 : 0)));
      }
    },

    bind(page, { id }) {
      page.addEventListener("click", (e) => {
        const acc = e.target.closest("[data-accordion]");
        if (acc) return acc.closest(".info-card").classList.toggle("is-open");
        const cp = e.target.closest("[data-copy]");
        if (cp) {
          navigator.clipboard?.writeText(cp.dataset.copy).catch(() => {});
          cp.classList.remove("is-copied"); void cp.offsetWidth; cp.classList.add("is-copied");
          return D.toast(page, "Copied");
        }
        const wa = e.target.closest("[data-wa]");
        if (wa) { wa.classList.toggle("is-on"); wa.setAttribute("aria-checked", wa.classList.contains("is-on")); return; }
        if (e.target.closest("[data-review-kfs]")) return OPL.go("kfs", { app: id });
        if (e.target.closest("[data-sign-nesl]")) return OPL.go("nesl", { app: id, step: null });
      });
    },

    // 440:136706 — "Sanction letter signed" (mobile MilestoneSigned) in a 480 modal
    openSigned(page, l, id, live) {
      const d = A().signed.sheet;
      let advanced = false;
      const body = ui.MilestoneSigned({ ...d, body: d.body(l.name) }).toString();
      const m = D.openModal(page, `<div class="d-ms">${body}</div>`, { width: 480, cls: "sheet-layer d-modal--ms", onClose: () => {
        if (!live || advanced) return; advanced = true;
        this.timers.push(setTimeout(() => {
          if (!page.isConnected) return;
          OPL.apps.setStatus(id, "disbursing"); OPL.screens.application.progressNext = true; OPL.rerender();
        }, D.motionOff() ? 300 : A().demo.toDisbursing));
      } });
      m.el.addEventListener("click", (e) => { if (e.target.closest("[data-ms-view], [data-ms-done]")) m.close(); });
    },

    // 440:137099 — "Money disbursed" (mobile MilestoneDisbursed): full burst, amount counts up
    openDisbursed(page) {
      const d = A().disbursed.sheet;
      const m = D.openModal(page, `<div class="d-ms">${ui.MilestoneDisbursed(d)}</div>`, { width: 480, cls: "sheet-layer d-modal--ms" });
      m.el.addEventListener("click", (e) => {
        if (e.target.closest("[data-ms-done]")) m.close();
        if (e.target.closest("[data-ms-view]")) { m.close(); this.timers.push(setTimeout(() => OPL.go("my-loans"), 240)); }
      });
      const el = m.el.querySelector("[data-ms-amount]");
      const to = Number(d.amount.replace(/[^\d]/g, ""));
      if (el && !D.motionOff()) {
        const t0 = Date.now() + 260, dur = 1100;
        const tick = () => {
          const k = Math.max(0, Math.min(1, (Date.now() - t0) / dur)), e = 1 - Math.pow(1 - k, 3);
          el.textContent = "₹" + Math.round(to * e).toLocaleString("en-IN");
          if (k < 1 && el.isConnected) this.timers.push(setTimeout(tick, 16));
        };
        el.textContent = "₹0"; tick();
      }
    },
  };
})();
