/* Desktop · KFS reader — Figma 440:134934 (two-pane, unread) → read + consent → Accept KFS.
   Approved desktop decision: the KFS summary and the PDF are one screen (one step fewer
   than mobile). Left: the document (same pages as mobile, OPL.data.kfsDoc) with a file
   bar, read-progress line and a floating page counter. Right (380): APR card, You repay,
   fact chips and the consent card. Reading to the last page unlocks consent → Accept KFS
   → "Sign on NeSL" (the mobile Step 2 sheet, 433:7980) in a modal. */
(function () {
  const { html, raw, ui } = OPL;
  const D = OPL.d;
  const K = () => OPL.data.kfsDoc;

  const row = ([n, label, value], i) =>
    `<div class="kfs-row${i % 2 ? " kfs-row--alt" : ""}"><span class="kfs-row__n">${n}</span><span class="kfs-row__l">${label}</span><span class="kfs-row__v">${value}</span></div>`;
  const ack = (a) => `<div class="kfs-ack"><p class="kfs-ack__title">${a.title}</p><p class="kfs-ack__text">${a.text}</p>
    <div class="kfs-ack__sign">${a.lines.map((t) => `<div><span></span><p>${t}</p></div>`).join("")}</div><p class="kfs-ack__foot">${a.foot}</p></div>`;
  const pageEl = (p, i, total, head) => `
    <article class="kfs-page d-kfs__page" data-kfs-page="${i}">
      <div class="kfs-page__lh">${ui.Logo({ id: head.logo, size: 16 })}<span class="kfs-page__org">${head.name}</span><span class="kfs-page__no">Page ${i + 1} of ${total}</span></div>
      <span class="kfs-page__rule"></span>
      ${p.title ? `<h3 class="kfs-page__title">${p.title}</h3>` : ""}
      ${p.meta ? `<p class="kfs-page__meta">${p.meta}</p>` : ""}
      <h4 class="kfs-page__part">${p.part}</h4>
      <div class="kfs-table">${p.rows.map(row).join("")}</div>
      ${p.note ? `<p class="kfs-page__note">${p.note}</p>` : ""}
      ${p.ack ? ack(p.ack) : ""}
    </article>`;

  OPL.dscreens.kfs = {
    title: "Loans · Key Fact Statement",
    figma: { reader: "440:134934" },
    timers: [],
    leave() { this.timers.forEach(clearTimeout); this.timers = []; },

    render(page, { read = false } = {}) {
      this.leave();
      const d = K();
      const a = OPL.data.applications;
      const apps = OPL.apps.currentApps();
      const id = OPL.state.get().app || (apps.find((x) => x.status === "kfs") || {}).id || "pick-citi";
      const l = OPL.apps.lender(id);
      const head = { logo: l.logo, name: d.letterhead[id] || l.name };
      const pages = d.pages(l);
      const s = a.kfs.summary;

      page.innerHTML = D.shell({
        nav: "loans", title: "", tab: null,
        crumbs: [{ label: "Loans", goto: "loans-overview" }, { label: "Applications", goto: "applications" }, { label: `Loan detail - ${l.name}`, goto: "application" }, { label: "Sign KFS and Sanction Letter" }],
        body: html`
          <div class="d-kfs">
            <div class="d-kfs__bar">
              <h1 class="d-kfs__title"><button class="d-kfs__back" data-back aria-label="Back">${OPL.icon("arrow-left", 24)}</button>${l.name} Key Fact Statement</h1>
              ${D.btn({ label: "Download PDF", style: "outlined", size: "sm", cls: "d-btn--neutral", iconRight: OPL.icon("download", 16), goto: "kfs-download" })}
            </div>
            <div class="d-kfs__steps">
              <span class="d-kfs__step is-on"><i>${OPL.icon("document-text", 16)}</i>Step 1 · Accept KFS</span>
              <span class="d-kfs__step"><i>${OPL.icon("document-text-muted", 16)}</i>Step 2 · Sign sanction letter on NeSL</span>
            </div>
            <div class="d-kfs__grid">
              <section class="d-kfs__doc">
                <div class="d-kfs__file"><span>${l.name.split(" ")[0]}_Bank_KFS_LA-2026-11-2231.pdf</span><span><b data-kfs-n>1</b> of ${pages.length} · 100%</span></div>
                <span class="d-kfs__read"><i data-kfs-bar style="width:${100 / pages.length}%"></i></span>
                <div class="d-kfs__scroll" data-kfs-scroll>${raw(pages.map((p, i) => pageEl(p, i, pages.length, head)).join(""))}<p class="kfs-end">${d.end}</p></div>
                <span class="d-kfs__counter"><b data-kfs-n2>1</b> / ${pages.length}</span>
              </section>
              <aside class="d-kfs__rail">
                ${ui.AprCard({ s, bordered: true })}
                <div class="d-panel d-kfs__repay">
                  <div class="d-repay__head"><p>You repay</p><b>${s.repay}</b></div>
                  <div class="kfs-repay__bar d-repay__bar">${s.split.map((p) => raw(`<span style="flex:${p.w} 0 0;background:${p.color}"></span>`))}</div>
                  <div class="kfs-repay__legend">${s.split.map((p) => raw(`<div>${OPL.icon(p.dot, 8)}<span>${p.label}</span><b>${p.value}</b></div>`))}</div>
                </div>
                <div class="kfs-facts d-kfs__facts">${s.facts.map((f) => raw(`<span>${f}</span>`))}</div>
                <div class="d-panel d-kfs__consent">
                  <button class="d-kfs__check" data-kfs-consent aria-pressed="false" disabled>${OPL.icon("check-square", 24)}<span>I have read and understood the Key Fact Statement</span></button>
                  ${D.btn({ label: d.cta, style: "filled", size: "lg", cls: "d-btn--block", attrs: "disabled data-kfs-accept" })}
                  <p class="d-kfs__hint" data-kfs-hint>${d.hint}</p>
                </div>
              </aside>
            </div>
          </div>`,
      });
      D.mountShell(page);
      this.bind(page, id, pages.length);
      if (read || OPL.state.get().read === "on") this.markRead(page);
    },

    // 476:230861 — "Sign your sanction letter on NeSL" (Step 2 of 2), over the read KFS
    openSignModal(page, id) {
      OPL.apps.setStatus(id, "sign");
      const steps = ["Verify OTP", "Read the Sanction Letter", "Confirm e-stamp", "eSign with Aadhaar"];
      const body = String(html`
        <div class="d-signm">
          <div class="d-signm__head">
            <div class="d-signm__progress"><span class="d-signm__ok">${D.icon("check-circle-green", 14)}KFS accepted</span><span>Step 2 of 2</span></div>
            <h2>Sign your sanction letter on NeSL</h2>
          </div>
          <ol class="d-signm__steps">${steps.map((t, i) => html`<li style="--i:${i}"><span class="d-signm__rail"><b>${i + 1}</b>${i < steps.length - 1 ? html`<i></i>` : ""}</span><span class="d-signm__t">${t}</span></li>`)}</ol>
          ${ui.NoteRow({ text: "Sign sanction letter before 25 Nov 2026", tone: "warning" })}
          <div class="d-signm__actions">
            ${D.btn({ label: "Continue to NeSL", style: "filled", size: "lg", cls: "d-btn--block d-signm__go", iconRight: D.icon("external-white", 16), attrs: "data-nesl-go" })}
            <button class="d-signm__later" data-nesl-later>I’ll come back later</button>
          </div>
        </div>`);
      const m = D.openModal(page, body, { width: 520, cls: "d-modal--sign" });
      m.el.addEventListener("click", (e) => {
        if (e.target.closest("[data-nesl-go]")) { m.close(); this.timers.push(setTimeout(() => OPL.go("nesl", { app: id, step: null }), 200)); }
        if (e.target.closest("[data-nesl-later]")) { m.close(); this.timers.push(setTimeout(() => OPL.go("application", { app: id }, { replace: true }), 200)); }
      });
    },

    // KFS read to the end with consent ticked (476:230649 backdrop)
    markRead(page) {
      const sc = page.querySelector("[data-kfs-scroll]");
      sc.scrollTop = sc.scrollHeight;
      sc.dispatchEvent(new Event("scroll"));
      const c = page.querySelector("[data-kfs-consent]");
      c.disabled = false; c.setAttribute("aria-pressed", "true");
      c.querySelector("img").src = "assets/icons/check-square-checked.svg";
      page.querySelector("[data-kfs-accept]").disabled = false;
      page.querySelector("[data-kfs-hint]").classList.add("is-done");
    },

    bind(page, id, total) {
      const sc = page.querySelector("[data-kfs-scroll]");
      const n = page.querySelector("[data-kfs-n]"), n2 = page.querySelector("[data-kfs-n2]");
      const bar = page.querySelector("[data-kfs-bar]");
      const consent = page.querySelector("[data-kfs-consent]");
      const accept = page.querySelector("[data-kfs-accept]");
      const hint = page.querySelector("[data-kfs-hint]");
      const pagesEls = [...sc.querySelectorAll("[data-kfs-page]")];
      let unlocked = false;
      const onScroll = () => {
        const max = sc.scrollHeight - sc.clientHeight;
        const k = max > 0 ? sc.scrollTop / max : 1;
        bar.style.width = `${Math.max(100 / total, k * 100)}%`;
        const mid = sc.scrollTop + sc.clientHeight * 0.4;
        let cur = 0;
        pagesEls.forEach((p, i) => { if (p.offsetTop <= mid) cur = i; });
        n.textContent = n2.textContent = cur + 1;
        if (!unlocked && k > 0.97) {
          unlocked = true;
          consent.disabled = false;
          consent.classList.add("is-ready");
          hint.classList.add("is-done");
        }
      };
      sc.addEventListener("scroll", onScroll, { passive: true });
      consent.addEventListener("click", () => {
        const on = consent.getAttribute("aria-pressed") !== "true";
        consent.setAttribute("aria-pressed", on);
        consent.querySelector("img").src = `assets/icons/${on ? "check-square-checked" : "check-square"}.svg`;
        consent.classList.remove("is-popping"); void consent.offsetWidth; consent.classList.add("is-popping");
        accept.disabled = !on;
      });
      // the hint itself scrolls to the end (a desktop shortcut for presenting)
      hint.addEventListener("click", () => sc.scrollTo({ top: sc.scrollHeight, behavior: D.motionOff() ? "auto" : "smooth" }));
      accept.addEventListener("click", () => this.openSignModal(page, id));
    },
  };
})();
