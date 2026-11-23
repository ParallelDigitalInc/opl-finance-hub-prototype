/* ==========================================================================
   OPL HTML kit — loan application flow components (Figma 416:122660)
   ========================================================================== */
(function () {
  const { html, icon, img, cx, ui } = OPL;

  /* NoteRow — "Flow / Note row" 319:802. tone: neutral | info | warning */
  const NOTE_ICON = { neutral: "info-circle-neutral", info: "info-circle-primary", warning: "danger-circle" };
  ui.NoteRow = ({ text, tone = "neutral" }) => html`
    <div class="note-row note-row--${tone}">
      <span class="note-row__tile">${icon(NOTE_ICON[tone], 18)}</span>
      <p class="note-row__text">${OPL.raw(text)}</p>
    </div>`;

  /* ApplySheet body — "Proceed applying" sheet (382:41022). lenders: [{ id, name, logo, type, amount }] */
  ui.ApplySheetBody = ({ lenders }) => {
    const a = OPL.data.apply;
    const names = lenders.map((l) => l.name).join(" and ");
    return html`
      <div class="apply">
        <div class="apply__top">
          <img class="apply__texture" src="${img("hero-texture.jpg")}" alt="">
          <span class="sheet__grabber apply__grabber" data-sheet-drag></span>
          <h2 class="apply__title">${lenders.length === 1 ? a.titleOne(lenders[0].name) : a.titleMany(lenders.length)}</h2>
          <div class="apply__lenders">${lenders.map((l) => OPL.raw(`
            <div class="apply__lender">${ui.Logo({ id: l.logo, size: 32 })}
              <div class="apply__lender-text"><p>${l.name}</p><span>${l.type}</span></div>
              <p class="apply__amount">${l.amount}</p></div>`))}</div>
        </div>
        <div class="apply__notes">${a.notes.map((n) => ui.NoteRow({ text: n }))}</div>
        <div class="apply__consent-wrap">
          <button class="apply__consent" data-consent aria-pressed="true">
            <img class="ico" src="assets/icons/check-square-22.svg" width="22" height="22" alt="">
            <span>${a.consent(names)}</span>
          </button>
        </div>
        <div class="apply__actions">
          ${ui.Button({ label: a.submit(lenders.length), block: true, strong: true, attrs: "data-apply-submit" })}
          <button class="apply__cancel" data-sheet-close>${a.cancel}</button>
        </div>
      </div>`;
  };

  /* Timeline — vertical status timeline (382:42462).
     items: [{ icon, state: done|current|action|todo, title, sub, subTone }] */
  ui.Timeline = ({ items }) => html`
    <div class="tl">${items.map((it, i) => OPL.raw(`
      <div class="tl__item tl__item--${it.state}">
        <div class="tl__rail"><span class="tl__node tl__node--${it.state}" style="--i:${i}">${icon(it.icon, 16)}</span>
          ${i < items.length - 1 ? `<span class="tl__line ${it.state === "done" ? "tl__line--done" : ""}"></span>` : ""}</div>
        <div class="tl__text"><p class="tl__title">${it.title}</p>${it.sub ? `<p class="tl__sub ${it.subTone ? `tl__sub--${it.subTone}` : ""}">${it.sub}</p>` : ""}</div>
      </div>`))}</div>`;

  /* InfoCard — collapsible card (382:42487 family). body: HTML */
  ui.InfoCard = ({ title, body }) => html`
    <section class="info-card is-open">
      <button class="info-card__head" data-accordion><span>${title}</span>${icon("alt-arrow-right", 16, "info-card__chev")}</button>
      <div class="info-card__body"><div class="info-card__inner">${OPL.raw(String(body))}</div></div>
    </section>`;
  ui.DocList = ({ items }) => OPL.raw(items.map((t) => `<div class="doc-row">${icon("document-text-20", 20)}<span>${t}</span></div>`).join(""));
  ui.ContactList = ({ phone, email }) => OPL.raw(`
    <div class="contact-row"><span class="contact-row__tile">${icon("phone-rounded", 20)}</span><span class="contact-row__value">${phone}</span>
      <button class="copy-btn" data-copy="${phone}" aria-label="Copy">${icon("copy", 16)}</button></div>
    <div class="contact-row"><span class="contact-row__tile">${icon("letter", 20)}</span><span class="contact-row__value">${email}</span>
      <button class="copy-btn" data-copy="${email}" aria-label="Copy">${icon("copy", 16)}</button></div>`);
  ui.DetailRows = ({ rows }) => OPL.raw(rows.map(([l, v, copy]) => `
    <div class="detail-row"><span>${l}</span><span class="detail-row__v">${v}${copy ? `<button class="copy-btn" data-copy="${v}" aria-label="Copy">${icon("copy", 16)}</button>` : ""}</span></div>`).join(""));

  /* WhatsAppRow — "WhatsApp updates" (382:42556) with DS Toggle */
  ui.WhatsAppRow = ({ label, on = true }) => html`
    <div class="wa-row"><img class="wa-row__logo" src="${img("whatsapp.png")}" width="24" height="24" alt=""><span>${label}</span>
      ${ui.Toggle({ on, attrs: "data-wa" })}</div>`;

  /* KfsSummary — "KFS Summary" (416:43894): APR card, You repay split bar, fact chips */
  ui.KfsSummary = ({ s }) => html`
    <div class="kfs-sum">
      <h3 class="kfs-sum__title">KFS Summary</h3>
      <div class="kfs-apr">
        <div class="kfs-apr__head"><img class="kfs-apr__tex" src="${img("hero-texture.jpg")}" alt=""><p>APR</p><p class="kfs-apr__v">${s.apr}</p></div>
        <div class="kfs-apr__grid">
          <div><span>Loan amount</span><b>${s.loanAmount}</b></div>
          <div><span>Tenure</span><b>${s.tenure}<i> months</i></b></div>
          <div><span>Interest rate</span><b>${s.rate}<i> p.a.</i></b></div>
          <div><span>Monthly EMI</span><b>${s.emi}</b></div>
        </div>
      </div>
      <div class="kfs-repay">
        <div class="kfs-repay__head"><span>You repay</span><b>${s.repay}</b></div>
        <div class="kfs-repay__bar">${s.split.map((p) => OPL.raw(`<span style="flex:${p.w} 0 0;background:${p.color}"></span>`))}</div>
        <div class="kfs-repay__legend">${s.split.map((p) => OPL.raw(`<div>${icon(p.dot, 8)}<span>${p.label}</span><b>${p.value}</b></div>`))}</div>
      </div>
      <div class="kfs-facts">${s.facts.map((f) => OPL.raw(`<span>${f}</span>`))}</div>
    </div>`;

  /* MilestoneSheet body — "Loan / Milestone sheet", State=Approved (400:1873 / 416:44065) */
  ui.MilestoneApproved = ({ lender, logo, type, figures, title, body, note }) => html`
    <div class="ms">
      <span class="sheet__grabber" data-sheet-drag></span>
      <div class="ms__hero">
        <img class="ms__confetti" src="${img("milestone-confetti.svg")}" alt="">
        <img class="ms__ripple" src="${img("milestone-ripple.svg")}" alt="">
        <img class="ms__glow1" src="${img("milestone-glow-1.svg")}" alt="">
        <img class="ms__glow2" src="${img("milestone-glow-2.svg")}" alt="">
        <span class="ms__core"><img src="${img("milestone-core.svg")}" alt=""></span>
        <span class="ms__mark">${ui.Logo({ id: logo, size: 52 })}</span>
        <img class="ms__badge-bg" src="${img("milestone-badge-bg.svg")}" alt="">
        <img class="ms__badge" src="${img("milestone-badge.svg")}" alt="">
      </div>
      <div class="ms__content">
        <div class="ms__msg"><h2>${title}</h2><p>${body}</p></div>
        <div class="ms__card">
          <div class="ms__lender">${ui.Logo({ id: logo, size: 36 })}<div><p>${lender}</p><span>${type}</span></div></div>
          <span class="ms__divider"></span>
          <div class="ms__figs">${figures.map((f) => OPL.raw(`<div><span>${f.label}</span><b>${f.value}${f.unit ? `<i> ${f.unit}</i>` : ""}</b></div>`))}</div>
        </div>
        ${ui.NoteRow({ text: note, tone: "warning" })}
        <div class="ms__actions">
          ${ui.Button({ label: "Review KFS", block: true, attrs: "data-ms-review" })}
          <button class="ms__later" data-sheet-close>Later</button>
        </div>
      </div>
    </div>`;
})();
