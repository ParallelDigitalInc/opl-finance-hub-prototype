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
     items: [{ icon, state: done|current|action|progress|todo, title, sub, subTone, line, strong, pad }]
     line: "fade" = teal → warning (431:7855), "fade-blue" = teal → primary (435:8157).
     strong: SemiBold title. pad: text top padding as drawn (default 5; 0 = flush with the node). */
  ui.Timeline = ({ items }) => html`
    <div class="tl">${items.map((it, i) => OPL.raw(`
      <div class="tl__item tl__item--${it.state}${it.pad === 0 ? " tl__item--flush" : ""}">
        <div class="tl__rail"><span class="tl__node tl__node--${it.state}" style="--i:${i}">${icon(it.icon, 16)}</span>
          ${i < items.length - 1 ? `<span class="tl__line ${it.line ? `tl__line--${it.line}` : it.state === "done" ? "tl__line--done" : ""}"></span>` : ""}</div>
        <div class="tl__text"${it.pad != null ? ` style="padding-top:${it.pad}px"` : ""}><p class="tl__title${it.strong ? " tl__title--strong" : ""}">${it.title}</p>${it.sub ? `<p class="tl__sub ${it.subTone ? `tl__sub--${it.subTone}` : ""}">${it.sub}</p>` : ""}</div>
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

  /* AprCard — "APR summary" (416:43894 / 431:8556): tinted APR head + 2×2 figures.
     chip: optional success chip on the head ("Same as KFS", 431:8560). */
  ui.AprCard = ({ s, chip, bordered }) => html`
    <div class="${cx("kfs-apr", bordered && "kfs-apr--bordered")}">
      <div class="kfs-apr__head"><img class="kfs-apr__tex" src="${img("hero-texture.jpg")}" alt=""><p>APR</p><p class="kfs-apr__v">${s.apr}</p>
        ${chip ? OPL.raw(`<span class="ok-chip kfs-apr__chip">${icon("check-circle-chip", 14)}<span>${chip}</span></span>`) : ""}</div>
      <div class="kfs-apr__grid">
        <div><span>Loan amount</span><b>${s.loanAmount}</b></div>
        <div><span>Tenure</span><b>${s.tenure}<i> months</i></b></div>
        <div><span>Interest rate</span><b>${s.rate}<i> p.a.</i></b></div>
        <div><span>Monthly EMI</span><b>${s.emi}</b></div>
      </div>
    </div>`;

  /* KeyValueCard — "Sanction details" (431:8578): label left, value right, hairline rows */
  ui.KeyValueCard = ({ rows }) => html`
    <div class="kv-card">${rows.map(([k, v]) => OPL.raw(`<div class="kv-card__row"><span>${k}</span><b>${v}</b></div>`))}</div>`;

  /* KfsSummary — "KFS Summary" (416:43894): APR card, You repay split bar, fact chips */
  ui.KfsSummary = ({ s }) => html`
    <div class="kfs-sum">
      <h3 class="kfs-sum__title">KFS Summary</h3>
      ${ui.AprCard({ s })}
      <div class="kfs-repay">
        <div class="kfs-repay__head"><span>You repay</span><b>${s.repay}</b></div>
        <div class="kfs-repay__bar">${s.split.map((p) => OPL.raw(`<span style="flex:${p.w} 0 0;background:${p.color}"></span>`))}</div>
        <div class="kfs-repay__legend">${s.split.map((p) => OPL.raw(`<div>${icon(p.dot, 8)}<span>${p.label}</span><b>${p.value}</b></div>`))}</div>
      </div>
      <div class="kfs-facts">${s.facts.map((f) => OPL.raw(`<span>${f}</span>`))}</div>
    </div>`;

  /* Confetti — the 16 pieces of the Milestone sheet hero (416:44065 › Confetti), copied
     verbatim. Inlined so each piece can burst from the mark and land on its Figma spot. */
  const CONFETTI = [
    { t: "r", x: 352.367, y: 69.4755, rot: -10, fill: "#3858E5", cx: 354.87, cy: 75.48 },
    { t: "r", x: 330.166, y: 23.7718, rot: 11, fill: "#3858E5", cx: 332.67, cy: 29.77 },
    { t: "r", x: 70.9786, y: 18.4614, rot: -16, fill: "#14B8A6", cx: 73.48, cy: 24.46 },
    { t: "r", x: 67.6425, y: 79.1371, rot: -51, fill: "#A5B4FC", cx: 70.14, cy: 85.14 },
    { t: "c", cx: 334.204, cy: 153.199, r: 3.5, fill: "#14B8A6" },
    { t: "r", x: 19.7542, y: 45.727, rot: -14, fill: "#3858E5", cx: 22.25, cy: 51.73 },
    { t: "c", cx: 103.075, cy: 124.51, r: 3, fill: "#FFBB00" },
    { t: "r", x: 100.188, y: 65.8312, rot: 1, fill: "#14B8A6", cx: 102.69, cy: 71.83 },
    { t: "c", cx: 20.5939, cy: 151.894, r: 2.5, fill: "#A5B4FC" },
    { t: "c", cx: 84.2341, cy: 165.148, r: 3, fill: "#A5B4FC" },
    { t: "c", cx: 95.4787, cy: 97.9172, r: 3.5, fill: "#3858E5" },
    { t: "c", cx: 54.4103, cy: 158.598, r: 4, fill: "#3858E5" },
    { t: "c", cx: 335.002, cy: 147.873, r: 3.5, fill: "#14B8A6" },
    { t: "r", x: 104.861, y: 122.427, rot: 32, fill: "#14B8A6", cx: 107.36, cy: 128.43 },
    { t: "c", cx: 133.229, cy: 163.184, r: 4, fill: "#14B8A6" },
    { t: "r", x: 87.4348, y: 109.234, rot: -7, fill: "#3858E5", cx: 89.93, cy: 115.23 }
  ];
  const ORIGIN = { x: 195, y: 90 };   // centre of the lender mark
  ui.Confetti = () => OPL.raw(`<svg class="ms__confetti" viewBox="0 0 390 176" width="390" height="176" aria-hidden="true">${CONFETTI.map((p, i) => {
    const dx = (ORIGIN.x - p.cx).toFixed(1), dy = (ORIGIN.y - p.cy).toFixed(1);
    const spin = (i % 2 ? 1 : -1) * (180 + (i * 37) % 200);
    const shape = p.t === "r"
      ? `<rect x="${p.x}" y="${p.y}" width="5" height="12" rx="1.5" transform="rotate(${p.rot} ${p.x} ${p.y})" fill="${p.fill}"/>`
      : `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r}" fill="${p.fill}"/>`;
    const fall = 150 + (i * 53) % 90;                      // falls out past the hero's bottom edge
    const drift = ((i * 29) % 40) - 20;                    // a little sideways wander
    return `<g class="cf" style="--dx:${dx}px;--dy:${dy}px;--spin:${spin}deg;--fall:${fall}px;--drift:${drift}px;--i:${i}">${shape}</g>`;
  }).join("")}</svg>`);

  /* MilestoneSheet body — "Loan / Milestone sheet", State=Approved (400:1873 / 416:44065) */
  ui.MilestoneApproved = ({ lender, logo, type, figures, title, body, note }) => html`
    <div class="ms">
      <span class="sheet__grabber" data-sheet-drag></span>
      <div class="ms__hero">
        ${ui.Confetti()}
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

  /* NeslSheetBody — "KFS accepted – Step 2 of 2 (Sign on NeSL)" sheet (433:8060) */
  ui.NeslSheetBody = ({ d }) => html`
    <div class="nesl-sheet">
      <span class="sheet__grabber" data-sheet-drag></span>
      <div class="nesl-sheet__head">
        <div class="nesl-sheet__progress"><span class="ok-chip">${icon("check-circle-green", 14)}<span>${d.chip}</span></span><span class="nesl-sheet__step">${d.step}</span></div>
        <h2 class="nesl-sheet__title">${d.title}</h2>
      </div>
      <ol class="nesl-steps">${d.steps.map((t, i) => OPL.raw(`
        <li class="nesl-steps__item" style="--i:${i}"><span class="nesl-steps__rail"><span class="nesl-steps__no">${i + 1}</span>${i < d.steps.length - 1 ? '<span class="nesl-steps__line"></span>' : ""}</span><span class="nesl-steps__text">${t}</span></li>`))}</ol>
      ${ui.NoteRow({ text: d.note, tone: "warning" })}
      <div class="nesl-sheet__actions">
        ${ui.Button({ label: d.cta, trailing: "arrow-square-out-white", block: true, attrs: "data-nesl-go" })}
        <button class="ms__later" data-nesl-later>${d.later}</button>
      </div>
    </div>`;

  /* MilestoneSigned — "Loan / Milestone sheet", State=Signed (431:8687). Hero inlined (SignedHeroSvg). */
  ui.MilestoneSigned = ({ title, body, rows, cta, done }) => html`
    <div class="ms ms--signed">
      <span class="sheet__grabber" data-sheet-drag></span>
      <div class="ms__hero">${OPL.raw(ui.SignedHeroSvg)}</div>
      <div class="ms__content">
        <div class="ms__msg"><h2>${title}</h2><p>${OPL.raw(body)}</p></div>
        <div class="ms__card ms__card--rows">${rows.map(([k, v]) => OPL.raw(`<div class="ms__row"><span>${k}</span><b>${v}</b></div>`))}</div>
        <div class="ms__actions">
          ${ui.Button({ label: cta, block: true, attrs: "data-ms-view" })}
          <button class="ms__later" data-ms-done>${done}</button>
        </div>
      </div>
    </div>`;

  /* FigureCard — "Disbursal card" (435:8177): tinted amount head + figure cells.
     rows: [[{ l, v, b, r }]] — b/r draw the bottom/right hairline exactly where Figma does. */
  ui.FigureCard = ({ label, value, tex = 0.3, rows }) => html`
    <div class="kfs-apr kfs-apr--bordered fig-card">
      <div class="kfs-apr__head" style="--tex:${tex}"><img class="kfs-apr__tex" src="${img("hero-texture.jpg")}" alt=""><p>${label}</p><p class="kfs-apr__v">${value}</p></div>
      <div class="fig-card__cells">${rows.map((r) => OPL.raw(`<div class="fig-card__row">${r.map((c) =>
        `<div class="${cx(c.b && "is-b", c.r && "is-r")}"><span>${c.l}</span><b>${c.v}</b></div>`).join("")}</div>`))}</div>
    </div>`;

  /* LinkList — "Documents" rows (435:8251): tile + label + chevron */
  ui.LinkList = ({ items }) => OPL.raw(items.map((it) => `
    <button class="link-row" data-press data-goto="${it.goto}"><span class="contact-row__tile">${icon("document-text-20-primary", 20)}</span>
      <span class="link-row__label">${it.label}</span>${icon("alt-arrow-right-muted", 16)}</button>`).join(""));

  /* MilestoneDisbursed — "Loan / Milestone sheet", State=Disbursed (435:8799): full burst, amount as hero */
  ui.MilestoneDisbursed = ({ eyebrow, amount, rows, cta, done }) => html`
    <div class="ms ms--signed ms--disbursed">
      <span class="sheet__grabber" data-sheet-drag></span>
      <div class="ms__hero">${OPL.raw(ui.DisbursedHeroSvg)}</div>
      <div class="ms__content">
        <div class="ms__msg ms__msg--amount"><p>${eyebrow}</p><h2 data-ms-amount="${amount}">${amount}</h2></div>
        <div class="ms__card ms__card--rows">${rows.map(([k, v]) => OPL.raw(`<div class="ms__row"><span>${k}</span><b>${v}</b></div>`))}</div>
        <div class="ms__actions">
          ${ui.Button({ label: cta, block: true, goto: "my-loans" })}
          <button class="ms__later" data-ms-done>${done}</button>
        </div>
      </div>
    </div>`;
})();
