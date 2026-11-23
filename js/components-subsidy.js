/* ==========================================================================
   OPL HTML kit — subsidy components (Subsidy details, 416:44852)
   Pure functions, same contract as components.js. Icons and images for these
   live in assets/lazy/subsidy/ (screen-only, outside the first-load budget).
   ========================================================================== */
(function () {
  const { html, cx, raw } = OPL;
  const ui = OPL.ui;

  const LAZY = "assets/lazy/subsidy/";
  /* Screen-only icon: same markup as OPL.icon, served from the lazy folder. */
  const sicon = (OPL.sicon = (name, size = 24, cls = "") =>
    raw(`<img class="ico ${cls}" src="${LAZY}icons/${name}.svg" width="${size}" height="${size}" alt="" draggable="false">`));
  OPL.simg = (name) => LAZY + name;
  const goto = (g) => (g ? raw(`data-goto="${g}"`) : "");

  /* CountBadge — 24px slate-100 circle beside a section title (416:45781) */
  ui.CountBadge = ({ n }) => html`<span class="count-badge">${n}</span>`;

  /* ------------------------------------------------------------------------
     PolicyPeriod — "Policy period / Widget" 238:4515
     Title leads with the end date; the bar shows how much of the period has
     passed; the chip shows time left, computed from today. Warning style in
     the last `warnMonths` months.
     ------------------------------------------------------------------------ */
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmt = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
  OPL.policyPeriod = ({ start, end, warnMonths = 6 }, today = new Date()) => {
    const s = new Date(start + "T00:00:00"), e = new Date(end + "T00:00:00");
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let months = (e.getFullYear() - t.getFullYear()) * 12 + (e.getMonth() - t.getMonth());
    if (e.getDate() < t.getDate()) months -= 1;
    months = Math.max(0, months);
    const y = Math.floor(months / 12), m = months % 12;
    const left = t >= e ? "Closed" : months === 0 ? "Less than a month left"
      : [y && plural(y, "year"), m && plural(m, "month")].filter(Boolean).join(" ") + " left";
    const elapsed = Math.min(1, Math.max(0, (t - s) / (e - s)));
    return { endLabel: fmt(e), startLabel: fmt(s), left, elapsed, warn: months < warnMonths };
  };

  ui.PolicyPeriod = ({ period }) => {
    const p = OPL.policyPeriod(period);
    return html`
      <section class="period" style="--elapsed:${p.elapsed.toFixed(4)}">
        <div class="period__head">
          <span class="icon-tile">${sicon("calendar-widget", 24)}</span>
          <div class="period__text">
            <p class="period__title">Open till ${p.endLabel}</p>
            <p class="period__sub">Operative period started ${p.startLabel}</p>
          </div>
        </div>
        <div class="period__meter">
          <div class="period__track" role="progressbar" aria-label="Policy period elapsed"
            aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(p.elapsed * 100)}"><span class="period__fill"></span></div>
          <span class="${cx("period__left", p.warn && "is-warn")}">${sicon(p.warn ? "clock-circle-amber" : "clock-circle-14", 14)}<span>${p.left}</span></span>
        </div>
      </section>`;
  };

  /* ------------------------------------------------------------------------
     BenefitTile — policy benefit card (416:45785). Tinted top panel with the
     benefit's two-tone icon and an arrow corner; white key-figure panel below.
     Stroke is inside (doesn't take layout): 4 + 106 + 78 + 4 = 192.
     ------------------------------------------------------------------------ */
  ui.BenefitTile = ({ id, icon, title, value, label }) => html`
    <button class="benefit" data-press data-goto="benefit-sheet" data-benefit="${id}" aria-label="${title}, ${value} ${label}">
      <span class="benefit__top">
        ${sicon(icon, 24)}
        <span class="benefit__title">${title}</span>
        <span class="benefit__corner" aria-hidden="true">${sicon("alt-arrow-corner", 19.2)}</span>
      </span>
      <span class="benefit__figure">
        <span class="benefit__value">${value}</span>
        <span class="benefit__label">${label}</span>
      </span>
    </button>`;

  /* ListRow — icon tile + title/sub + trailing icon (416:45883, 416:46352).
     trailing: "chevron" (benefit rows) | "external" (outbound links) */
  ui.ListRow = ({ icon, title, sub, trailing = "chevron", goto: g, attrs = "" }) => html`
    <button class="${cx("lrow", `lrow--${trailing}`)}" data-press ${goto(g)} ${raw(attrs)}>
      <span class="icon-tile">${sicon(icon, 24)}</span>
      <span class="lrow__text">
        <span class="lrow__title">${title}</span>
        <span class="lrow__sub">${raw(sub)}</span>
      </span>
      ${trailing === "external" ? sicon("arrow-right-up-20", 20, "lrow__trail") : sicon("chevron-down-20", 20, "lrow__trail lrow__chev")}
    </button>`;

  /* Disclosure — "See other benefits" (416:45873). Header button + collapsible rows.
     Uses grid-template-rows 0fr → 1fr so height animates without measuring. */
  ui.Disclosure = ({ id, label, count, open = false, body }) => html`
    <section class="${cx("disclosure", open && "is-open")}" data-disclosure="${id}">
      <button class="disclosure__head" data-press aria-expanded="${open}" aria-controls="dz-${id}">
        <span class="disclosure__label">${label}</span>
        ${ui.CountBadge({ n: count })}
        ${sicon("chevron-down-20", 20, "disclosure__chev")}
      </button>
      <div class="disclosure__panel" id="dz-${id}" ${open ? "" : raw("inert")}><div class="disclosure__inner">${body}</div></div>
    </section>`;

  /* HelpCardExpert — "Get help from our subsidy expert" (416:45923).
     Indigo fill under a luminosity-blended satin texture; photo bleeds off the top;
     the OPL Verified stamp sits outside the card's clip. */
  ui.HelpCardExpert = ({ title, cta, goto: g }) => html`
    <div class="xhelp">
      <section class="xhelp__card">
        <img class="xhelp__texture" src="${OPL.simg("satin-texture.jpg")}" alt="">
        <div class="xhelp__copy">
          <p class="xhelp__title">${title[0]}<br>${title[1]}</p>
          <button class="btn btn--md btn--line" data-press ${goto(g)}>${sicon("headset-primary", 16)}<span class="btn__label">${cta}</span></button>
        </div>
        <img class="xhelp__photo" src="${OPL.simg("expert-photo.png")}" alt="">
      </section>
      <img class="xhelp__stamp" src="${OPL.simg("opl-verified-stamp.png")}" alt="OPL Verified">
    </div>`;

  /* HowStep — "How it works / Step" 137:21194. Rail (number + connector) and content
     with an optional deadline chip and a 2-row inset. */
  ui.HowStep = ({ n, title, body, deadline, inset, last = false }) => html`
    <li class="${cx("hstep", last && "hstep--last")}" style="--n:${n - 1}">
      <span class="hstep__rail"><span class="hstep__num">${n}</span>${last ? "" : raw(`<span class="hstep__line"></span>`)}</span>
      <div class="hstep__content">
        <div class="hstep__head">
          <p class="hstep__title">${title}</p>
          ${body ? raw(`<p class="hstep__body">${body}</p>`) : ""}
        </div>
        ${deadline ? html`<span class="deadline-chip">${sicon("clock-circle-amber", 14)}<span>${deadline}</span></span>` : ""}
        ${inset ? html`
          <div class="hstep__inset">
            <p class="hstep__inset-head">${inset.title}</p>
            ${inset.rows.map((r) => html`<div class="hstep__inset-row"><p class="hstep__inset-value">${r.value}</p><p class="hstep__inset-label">${r.label}</p></div>`)}
          </div>` : ""}
      </div>
    </li>`;

  /* HowItWorks — "How it works / Accordion" 141:21242. Collapsed shows the deadline
     chip in the header; expanded hides it (step 1 carries the same deadline). */
  ui.HowItWorks = ({ title, headerDeadline, items, share, open = false }) => html`
    <section class="${cx("how", open && "is-open")}" data-disclosure="how">
      <button class="how__head" data-press aria-expanded="${open}" aria-controls="dz-how">
        <span class="how__head-text">
          <span class="how__title">${title}</span>
          <span class="how__chip-slot"><span><span class="deadline-chip">${sicon("clock-circle-amber", 14)}<span>${headerDeadline}</span></span></span></span>
        </span>
        ${sicon("chevron-down-20", 20, "disclosure__chev")}
      </button>
      <div class="disclosure__panel" id="dz-how" ${open ? "" : raw("inert")}><div class="disclosure__inner">
        <div class="how__steps">
          <ol class="how__list">${items.map((s, i) => ui.HowStep({ n: i + 1, ...s, last: i === items.length - 1 }))}</ol>
          <button class="how__share" data-press data-share-steps>${sicon("share-primary", 18)}<span class="how__share-label">${share}</span></button>
        </div>
      </div></div>
    </section>`;

  /* SubsidyFoot — sticky action bar (416:46431): two buttons + indicative note */
  ui.SubsidyFoot = ({ secondary, primary, note }) => html`
    <footer class="sfoot">
      <div class="sfoot__row">
        <button class="btn btn--lg btn--line btn--strong" data-press ${goto(secondary.goto)}><span class="btn__label">${secondary.label}</span>${sicon("arrow-right-up-primary", 16)}</button>
        <button class="btn btn--lg btn--filled btn--strong" data-press ${goto(primary.goto)}>${sicon("headset-white", 16)}<span class="btn__label">${primary.label}</span></button>
      </div>
      <p class="sfoot__note">${note}</p>
    </footer>`;
})();
