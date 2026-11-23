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
    <button class="benefit" data-press data-benefit="${id}" aria-haspopup="dialog" aria-label="${title}, ${value} ${label}">
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

  /* ========================================================================
     Benefit sheets (section 416:47994). Built from the sheet components:
     Sheet / Header 148:188 · Benefit hero 154:1166 · Fact row 154:1174 ·
     Activity switch 149:197 · Rate row 149:190 · Condition 160:1390.
     The layer/scrim/drag shell is the kit's (.sheet-layer + OPL.fx.sheets).
     ======================================================================== */
  ui.RateRows = ({ rows }) => OPL.raw(rows.map(([label, value, sub], i) => `
    <div class="rrow" style="--i:${i}">
      <p class="rrow__label">${OPL.html`${label}`}</p>
      <p class="rrow__fig"><span class="rrow__value">${OPL.html`${value}`}</span><span class="rrow__sub">${OPL.html`${sub}`}</span></p>
    </div>`).join(""));

  ui.ActivitySwitch = ({ options, selected = 0 }) => html`
    <div class="aswitch" role="tablist" style="--sel:${selected}">
      <span class="aswitch__thumb" aria-hidden="true"></span>
      ${options.map((o, i) => html`<button class="${cx("aswitch__opt", i === selected && "is-on")}" role="tab" aria-selected="${i === selected}" data-activity="${i}">${o}</button>`)}
    </div>`;

  ui.SheetCondition = ({ text, exclude = false }, i = 0) => html`
    <div class="${cx("cond", exclude && "cond--exclude")}" style="--i:${i}">
      <span class="cond__tile">${sicon(exclude ? "cond-exclude" : "cond-check", 16)}</span>
      <p class="cond__text">${text}</p>
    </div>`;

  ui.BenefitSheetBody = ({ s, activity = 0, actions }) => {
    const r = s.rates;
    const act = r && r.activities ? r.activities[Math.min(activity, r.activities.length - 1)] : null;
    return html`
      <div class="bsheet__grip" data-sheet-drag>
        <span class="bsheet__grabber"></span>
        <div class="bsheet__head">
          <h2 class="bsheet__title">${s.title}</h2>
          <button class="bsheet__close" aria-label="Close" data-press data-sheet-close>${sicon("sheet-x", 16)}</button>
        </div>
      </div>
      <div class="bsheet__body">
        <div class="bsheet__sec bsheet__hero-block" style="--s:0">
          <div class="bhero">
            <span class="bhero__tile">${sicon(s.hero.icon, 28)}</span>
            <div class="bhero__fig"><p class="bhero__value">${s.hero.value}</p><p class="bhero__label">${s.hero.label}</p></div>
          </div>
          ${s.note ? html`<p class="bsheet__note">${s.note}</p>` : ""}
        </div>
        <div class="bsheet__sec bsheet__facts" style="--s:1">
          ${s.facts.map((f) => html`
            <div class="sfact">
              <span class="sfact__tile">${sicon(f.icon, 22)}</span>
              <div class="sfact__text"><p class="sfact__label">${f.label}</p><p class="sfact__value">${f.value}</p></div>
            </div>`)}
        </div>
        ${r ? html`
          <div class="bsheet__sec bsheet__rates" style="--s:2">
            <p class="bsheet__h">Rates</p>
            ${act ? html`
              <div class="bsheet__rates-content">
                <div class="bsheet__picker">
                  ${ui.ActivitySwitch({ options: r.activities.map((a) => a.label), selected: activity })}
                  <p class="bsheet__act-note" data-act-note>${act.note}</p>
                </div>
                <div class="rlist" data-rate-list>${ui.RateRows({ rows: act.rows })}</div>
              </div>` : html`
              <div class="bsheet__groups">
                ${r.groups.map((g) => html`<div class="rlist"><p class="rlist__group">${g.title}</p>${ui.RateRows({ rows: g.rows })}</div>`)}
              </div>`}
          </div>` : ""}
        <div class="bsheet__sec bsheet__conds" style="--s:${r ? 3 : 2}">
          <p class="bsheet__h">Conditions</p>
          <div class="clist">${s.conditions.map((c, i) => ui.SheetCondition(c, i))}</div>
        </div>
      </div>
      <div class="bsheet__foot" data-sheet-foot>
        <button class="btn btn--lg btn--filled btn--strong btn--block" data-press ${goto(actions.expert.goto)}>${sicon("sheet-headset-white", 16)}<span class="btn__label">${actions.expert.label}</span></button>
        ${s.apply ? html`<button class="btn btn--md btn--ghost btn--block" data-press ${goto(actions.apply.goto)}><span class="btn__label">${actions.apply.label}</span>${sicon("arrow-right-up-primary", 16)}</button>` : ""}
      </div>`;
  };

  /* One shared layer per screen; the body is re-rendered for each benefit. */
  /* RefineBanner — "Refine your matches" inside a subsidy list (mobile twin of desktop 524:98833,
     3D art 558:104693). Copy left, art right inside the card, a text CTA. */
  ui.RefineBanner = ({ title, body, cta, goto: to, done = false }) => html`
    <article class="${cx("refine", done && "refine--done")}" data-press ${goto(to)} role="link" tabindex="0" aria-label="${title}. ${body}">
      <span class="refine__glow" aria-hidden="true"></span>
      <div class="refine__copy">
        <h3 class="refine__title">${done ? sicon("rq-done", 20, "refine__done") : ""}${title}</h3>
        <p class="refine__body">${body}</p>
        ${ui.Button({ label: cta, size: "sm", trailing: "chevron-right-white", attrs: "tabindex=\"-1\"" })}
      </div>
      <img class="refine__art" src="assets/lazy/dsk/refine-art.png" width="118" height="62" alt="" draggable="false">
    </article>`;

  /* Refine your matches — mobile: one question per step in a bottom sheet, skippable.
     Shell = the benefit sheet's .bsheet. The stage is repainted per step (RefineStep). */
  ui.RefineSheet = (r) => html`
    <div class="sheet-layer" data-sheet="refine" hidden>
      <div class="sheet-scrim" data-sheet-close></div>
      <section class="sheet bsheet rq" role="dialog" aria-modal="true" aria-label="${r.title}">
        <div class="bsheet__grip" data-sheet-drag>
          <span class="bsheet__grabber"></span>
          <div class="bsheet__head">
            <h2 class="bsheet__title">${r.title}</h2>
            <button class="bsheet__close" aria-label="Close" data-press data-sheet-close>${sicon("sheet-x", 16)}</button>
          </div>
        </div>
        <div class="rq__body">
          <div class="rq__prog"><span class="rq__track"><span class="rq__fill" data-rq-fill></span></span><span class="rq__count" data-rq-count></span></div>
          <div class="rq__stage" data-rq-stage aria-live="polite"></div>
        </div>
        <div class="rq__foot">
          <button class="rq__link" data-press data-rq-back>${OPL.icon("alt-arrow-left", 16)}${r.back}</button>
          <button class="rq__link rq__link--skip" data-press data-rq-skip>${r.skip}</button>
        </div>
      </section>
    </div>`;
  ui.RefineStep = (q, picked, choices) => html`
    <div class="rq__pane">
      <p class="rq__q">${q.q}</p>
      <p class="rq__why">${sicon("rq-why", 16)}<span>${q.why}</span></p>
      <div class="rq__opts" role="radiogroup" aria-label="${q.q}">
        ${choices.map((c) => html`<button class="${cx("rq__opt", picked === c && "is-on")}" role="radio" aria-checked="${picked === c}" data-press data-rq-choice="${c}"><span>${c}</span>${sicon("rq-check", 16, "rq__tick")}</button>`)}
      </div>
    </div>`;

  ui.BenefitSheetLayer = () => html`
    <div class="sheet-layer" data-sheet="benefit" hidden>
      <div class="sheet-scrim" data-sheet-close></div>
      <section class="sheet bsheet" role="dialog" aria-modal="true" aria-label="Benefit details" data-bsheet></section>
    </div>`;
})();
