/* ==========================================================================
   OPL HTML kit — components
   Each component is a pure function: props in, HTML string out. Styles live
   in css/components/*.css under the same class name. The Figma node noted
   on each is the instance it was measured from.
   ========================================================================== */
(function () {
  const { html, icon, img, cx } = OPL;
  const ui = (OPL.ui = {});

  /* ------------------------------------------------------------------------
     Button — Figma "Button" 2:118 / 9:19
     variant: "filled" | "text" | "tonal" (#F5F7FA, Apply now) | "soft" (#EEF2FE, Selected)
              | "outlined" (Select) | "white" (tray Compare)
     size: "lg" (44) | "md" (38) | "sm" (32)   strong: SemiBold label (Compare loans CTA)
     ------------------------------------------------------------------------ */
  ui.Button = ({ label, variant = "filled", size = "lg", leading, trailing, block = false, strong = false, goto, attrs = "" }) => html`
    <button class="${cx("btn", `btn--${variant}`, `btn--${size}`, block && "btn--block", strong && "btn--strong")}" data-press
      ${goto ? OPL.raw(`data-goto="${goto}"`) : ""} ${OPL.raw(attrs)}>
      ${leading ? icon(leading, size === "sm" ? 14 : 16) : ""}
      <span class="btn__label">${label}</span>
      ${trailing ? icon(trailing, 16) : ""}
    </button>`;

  /* IconButton — header 40px translucent circle (382:34257) */
  ui.IconButton = ({ icon: name, label, goto }) => html`
    <button class="icon-btn" aria-label="${label}" data-press ${goto ? OPL.raw(`data-goto="${goto}"`) : ""}>
      ${icon(name, 20)}
    </button>`;

  /* Avatar — user photo, 36px with 2px translucent ring (382:34261).
     Two stacked images exactly as in Figma. */
  ui.Avatar = ({ goto } = {}) => html`
    <button class="avatar" aria-label="Profile" data-press ${goto ? OPL.raw(`data-goto="${goto}"`) : ""}>
      <img class="avatar__bg" src="${img("avatar-bg.jpg")}" alt="">
      <img class="avatar__fg" src="${img("avatar-person.jpg")}" alt="">
    </button>`;

  /* ------------------------------------------------------------------------
     Logo — lender / scheme mark. Layers replicate the Figma image fills
     (crops and stacking) so the result is pixel-identical.
     ------------------------------------------------------------------------ */
  const LOGOS = {
    citi: { layers: [{ src: "logo-citi.png", crop: "width:270.83%;height:202.08%;left:-86.72%;top:-55.28%" }] },
    // Same mark, the slightly different crop used on the Loans overview application card (416:121717)
    citiApp: { layers: [{ src: "logo-citi.png", crop: "width:270.83%;height:202.08%;left:-85.42%;top:-51.04%" }] },
    bob: { layers: [{ src: "logo-bob.png", cover: true }] },
    // Axis Bank — logo from Figma Loan offers 382:35369
    axis: { bg: "#fff", layers: [{ src: "logo-axis.png", cover: true }] },
    // Loan offers marks (382:35481 SIDBI, 382:35579 HDFC) on white
    sidbiMark: { bg: "#fff", layers: [{ src: "mark-sidbi.svg", crop: "width:21.767px;height:26px;left:calc(50% - 11px);top:calc(50% - 13px)" }] },
    hdfcMark: { bg: "#fff", layers: [{ src: "mark-hdfc.svg", crop: "left:22.5%;top:22.5%;width:53.06%;height:52.5%" }] },
    // Compare loans logos (382:37905, 382:37933) — contained on white
    sidbi: { bg: "#fff", layers: [{ src: "logo-sidbi.png", contain: true }] },
    sbi: { bg: "#fff", layers: [{ src: "logo-sbi.png", contain: true }] },
    // Govt. of Gujarat seal — Wikimedia Commons "Seal of Gujarat.svg", cropped to the emblem
    gujaratGovt: { ring: 1, bg: "#fff", layers: [{ src: "logo-gujarat-govt.png", crop: "width:74%;height:auto;left:13%;top:9%" }] },
    msme: {
      ring: 1,
      layers: [
        { src: "logo-scheme-base.png", cover: true },
        { src: "logo-msme-champions.png", crop: "width:120.66%;height:120.66%;left:-8.11%;top:-7.76%" },
      ],
    },
    gujarat: {
      ring: 2,
      layers: [
        { src: "logo-scheme-base.png", cover: true },
        { src: "logo-msme-champions.png", crop: "width:120.66%;height:120.66%;left:-8.11%;top:-7.76%" },
        { src: "logo-gujarat.png", crop: "width:77.46%;height:77.46%;left:11.27%;top:13.1%" },
      ],
    },
  };
  ui.Logo = ({ id, size = 40, ring }) => {
    const def = LOGOS[id];
    const r = ring ?? def.ring ?? 0;
    return html`<span class="logo" style="--logo:${size}px;--ring:${r}px${def.bg ? `;--logo-bg:${def.bg}` : ""}">
      <span class="logo__fill">${def.layers.map((l) =>
        l.contain
          ? OPL.raw(`<img class="logo__cover" style="object-fit:contain" src="${img(l.src)}" alt="">`)
          : l.cover
          ? OPL.raw(`<img class="logo__cover" src="${img(l.src)}" alt="">`)
          : OPL.raw(`<img class="logo__crop" style="${l.crop}" src="${img(l.src)}" alt="">`)
      )}</span></span>`;
  };

  /* ------------------------------------------------------------------------
     FactPill — hero facts (382:34270). parts: [{text, strong?, accent?}]
     ------------------------------------------------------------------------ */
  ui.FactPill = ({ parts }) => html`
    <span class="fact">${parts.map((p) =>
      OPL.raw(`<span class="${cx(p.strong && "fact__strong", p.accent && "fact__accent")}">${p.text}</span>`)
    )}</span>`;

  /* CarouselDots — 8px dots; active = 24px track with progress fill (382:34097) */
  ui.CarouselDots = ({ count, active }) => html`
    <div class="dots" role="tablist">
      ${Array.from({ length: count }, (_, i) =>
        OPL.raw(`<button class="dot ${i === active ? "is-active" : ""}" role="tab" aria-label="Slide ${i + 1}" data-dot="${i}"><span class="dot__fill"></span></button>`)
      )}
    </div>`;

  /* ------------------------------------------------------------------------
     HeroCard — stacked offer card in the hero (front 382:34286, back 382:34276).
     scale: 1 for front, 0.6713 for the peeking back card (194/289).
     ------------------------------------------------------------------------ */
  ui.HeroCard = ({ kind, logo, title, subtitle, tint, scale = 1, ring }) => html`
    <div class="${cx("hero-card", `hero-card--${kind}`, scale < 1 && "hero-card--back")}" style="--s:${scale};--tint:${tint}">
      <div class="hero-card__inner">
        <div class="hero-card__row">
          ${ui.Logo({ id: logo, size: 44 * scale, ring: ring != null ? ring * scale : undefined })}
          <div class="hero-card__text">
            <p class="hero-card__title">${OPL.raw(title)}</p>
            <p class="hero-card__sub">${subtitle}</p>
          </div>
        </div>
      </div>
    </div>`;

  /* ------------------------------------------------------------------------
     HeroStack — the hero's offer cards, cycling. Figma shows the rest state
     (front + peeking back card); the cycle promotes the back card to the
     front and tucks the old front card under the CTA.
     kind: "loan" | "subsidy"; cards: HeroCard props (first = front).
     ------------------------------------------------------------------------ */
  ui.HeroStack = ({ kind, cards }) => html`
    <div class="${cx("hero-stack", `hero-stack--${kind}`)}" data-stack>
      ${cards.map((c, i) => OPL.raw(
        `<div class="stack-item" data-pos="${i === 0 ? "front" : i === 1 ? "back" : "queue"}">${ui.HeroCard({ ...c, kind })}</div>`
      ))}
    </div>`;

  /* ------------------------------------------------------------------------
     QuickAction — 74px tile + two-line label (382:34102)
     ------------------------------------------------------------------------ */
  ui.QuickAction = ({ icon: name, label, goto }) => html`
    <button class="qa" data-press ${goto ? OPL.raw(`data-goto="${goto}"`) : ""}>
      <span class="qa__tile">${icon(name, 40)}</span>
      <span class="qa__label">${OPL.raw(label)}</span>
    </button>`;

  /* SectionHeader — title + "View all" text button (382:34119) */
  ui.SectionHeader = ({ title, action = "View all", goto }) => html`
    <div class="section-head">
      <h2 class="section-head__title">${title}</h2>
      ${ui.Button({ label: action, variant: "text", trailing: "chevron-right-primary", goto })}
    </div>`;

  /* Chip — filter-by-need chip with optional count badge (382:34182) */
  /* bordered: Filters/Sort chips (392:490). trailing: e.g. chevron-down. attrs: data hooks. */
  ui.Chip = ({ icon: name, label, count, selected = false, bordered = false, trailing, goto, attrs = "" }) => html`
    <button class="${cx("chip", selected && "is-selected", bordered && "chip--bordered")}" data-press ${goto ? OPL.raw(`data-goto="${goto}"`) : ""} ${OPL.raw(attrs)}>
      ${name ? icon(name, 18) : ""}
      <span class="chip__label">${label}</span>
      ${count != null ? OPL.raw(`<span class="badge">${count}</span>`) : ""}
      ${trailing ? icon(trailing, 16) : ""}
    </button>`;

  /* ------------------------------------------------------------------------
     MatchCard — "Top loan/subsidy matches" card (loan 382:34123, subsidy 382:34197)
     figures: [{label, value, unit?}]   size: "md" (Home, 16px title) | "lg" (Loans overview, 18px)
     ------------------------------------------------------------------------ */
  ui.MatchCard = ({ kind, tag, tint, logo, title, subtitle, figures, goto, size = "md" }) => html`
    <article class="${cx("match", `match--${kind}`, size === "lg" && "match--lg")}" style="--tint:${tint}" data-press ${goto ? OPL.raw(`data-goto="${goto}"`) : ""}>
      <div class="match__head">
        <span class="match__tag">${tag}</span>
        <div class="match__id">
          ${ui.Logo({ id: logo, size: 40 })}
          <div class="match__text">
            <p class="match__title">${OPL.raw(title)}</p>
            <p class="match__sub">${subtitle}</p>
          </div>
        </div>
      </div>
      <div class="match__body">
        ${figures.map((f) => OPL.raw(`
          <div class="figure">
            <span class="figure__label">${f.label}</span>
            <span class="figure__value">${f.value}${f.unit ? `<span class="figure__unit">${f.unit}</span>` : ""}</span>
          </div>`))}
      </div>
    </article>`;

  /* HelpCard — "Talk to an expert" (382:34297) */
  ui.HelpCard = ({ title, subtitle, cta, goto }) => html`
    <section class="help">
      <div class="help__text">
        <div class="help__copy">
          <p class="help__title">${title}</p>
          <p class="help__sub">${subtitle}</p>
        </div>
        ${ui.Button({ label: cta, size: "sm", leading: "phone-calling-bold", goto })}
      </div>
      <img class="help__art" src="${img("expert-illustration.png")}" alt="">
    </section>`;

  /* NoticeBanner — dismissible due reminder (382:36897) */
  ui.NoticeBanner = ({ icon: name = "calendar-mark-bold", parts, goto }) => html`
    <div class="notice" data-press ${goto ? OPL.raw(`data-goto="${goto}"`) : ""}>
      <div class="notice__lead">
        <span class="notice__icon">${icon(name, 16)}</span>
        <p class="notice__text">${parts.map((p) => OPL.raw(p.strong ? `<strong>${p.text}</strong>` : p.text))}</p>
      </div>
      <button class="notice__close" aria-label="Dismiss" data-dismiss>${icon("x", 16)}</button>
    </div>`;

  /* ------------------------------------------------------------------------
     CmrPill — credit score summary in the Loans hero (382:36243)
     ------------------------------------------------------------------------ */
  ui.CmrPill = ({ label, risk, goto }) => html`
    <button class="cmr" data-press ${goto ? OPL.raw(`data-goto="${goto}"`) : ""}>
      <span class="cmr__lead"><span class="cmr__gauge">${icon("cmr-gauge", 24)}</span><span class="cmr__label">${label}</span></span>
      <span class="cmr__trail"><span class="cmr__risk">${risk}</span><span class="cmr__chev">${icon("alt-arrow-left", 16)}</span></span>
    </button>`;

  /* Tracker — "Flow / Application tracker v2", Style=Icon (416:121737).
     steps: [{ icon, label, state: "done" | "action" | "upcoming" }] */
  ui.Tracker = ({ steps }) => html`
    <div class="tracker">
      <div class="tracker__track">${steps.map((s, i) => OPL.raw(
        (i ? `<span class="tracker__line tracker__line--${steps[i - 1].state === "done" ? "done" : "todo"}" style="--i:${i}"></span>` : "") +
        `<span class="tracker__step tracker__step--${s.state}" style="--i:${i}">${icon(s.icon, 16)}</span>`
      ))}</div>
      <div class="tracker__labels">${steps.map((s) => OPL.raw(`<p class="tracker__label tracker__label--${s.state}">${s.label}</p>`))}</div>
    </div>`;

  /* ApplicationCard — "Your loan applications" card (416:121715) */
  ui.ApplicationCard = ({ logo, name, product, tag, figures, steps, cta, goto }) => html`
    <article class="app-card">
      <div class="app-card__lender">
        ${ui.Logo({ id: logo, size: 40 })}
        <div class="app-card__name"><p class="app-card__title">${name}</p><p class="app-card__sub">${product}</p></div>
        ${tag ? OPL.raw(`<span class="app-card__tag">${tag}</span>`) : ""}
      </div>
      <div class="app-card__body">
        <div class="app-card__main">
          <div class="app-card__figures">${figures.map((f) => OPL.raw(`
            <div class="figure figure--app"><span class="figure__label">${f.label}</span>
              <span class="figure__value">${f.value}${f.unit ? `<span class="figure__unit">${f.unit}</span>` : ""}</span></div>`))}</div>
          ${ui.Tracker({ steps })}
        </div>
        ${ui.Button({ label: cta, size: "md", block: true, goto })}
      </div>
    </article>`;

  /* BorrowingCard — "Your Borrowing" summary (382:36253) */
  ui.BorrowingCard = ({ total, legend, available, goto }) => html`
    <article class="borrow" data-press ${goto ? OPL.raw(`data-goto="${goto}"`) : ""}>
      <div class="borrow__total"><span class="figure__label">${total.label}</span><span class="borrow__amount">${total.value}</span></div>
      <div class="borrow__row">
        <img class="borrow__donut" src="${img("donut-borrowing.svg")}" width="103" height="103" alt="">
        <div class="borrow__side">
          <div class="borrow__legend">${legend.map((l) => OPL.raw(`
            <div class="borrow__item">${icon(l.dot, 8)}<span class="borrow__item-label">${l.label}</span><span class="borrow__item-value">${l.value}</span></div>`))}</div>
          <div class="figure figure--avail"><span class="figure__label">${available.label}</span>
            <span class="figure__value">${available.value}<span class="figure__unit">${available.unit}</span></span></div>
        </div>
      </div>
    </article>`;

  /* ------------------------------------------------------------------------
     OfferCard — Loan offers cards. kind "pick" (300w, 382:35360) | "offer" (350w, 382:35473)
     tags: [{ text, tone: "blue" | "green" | "amber" }]   details: [[label, value]]
     ------------------------------------------------------------------------ */
  ui.OfferCard = ({ id, kind = "offer", logo, tint, tags = [], title, subtitle, figures, details, selected = false }) => html`
    <article class="${cx("offer", `offer--${kind}`, selected && "is-selected")}" style="--tint:${tint}" data-offer="${id}">
      <div class="offer__head" data-press data-detail="${id}">
        <div class="offer__tags">${tags.map((t) => OPL.raw(`<span class="offer__tag offer__tag--${t.tone}">${t.text}</span>`))}</div>
        <div class="offer__id">
          ${ui.Logo({ id: logo, size: 40 })}
          <div class="offer__text"><p class="offer__title">${title}</p><p class="offer__sub">${subtitle}</p></div>
        </div>
      </div>
      <div class="offer__figs">
        <div class="offer__figrow">${figures.map((f) => OPL.raw(`
          <div class="figure"><span class="figure__label">${f.label}</span>
            <span class="figure__value">${f.value}${f.unit ? `<span class="figure__unit">${f.unit}</span>` : ""}</span></div>`))}</div>
        <span class="offer__divider"></span>
      </div>
      <div class="offer__details">${details.map(([l, v]) => OPL.raw(`<div class="offer__row"><span>${l}</span><span>${v}</span></div>`))}</div>
      <div class="offer__foot">
        <button class="offer__compare" data-compare="${id}" aria-pressed="${selected}">
          <img class="ico offer__check" src="assets/icons/${selected ? "check-square-checked" : "check-square"}.svg" width="24" height="24" alt="">
          <span>Compare</span>
        </button>
        ${ui.Button({ label: "Apply now", variant: "tonal", size: "md", trailing: "arrow-right-primary", goto: "apply-loan" })}
      </div>
    </article>`;

  /* LoanDetail — body of the "Loan details" sheet (proposed; not in Figma).
     Built from existing parts: the card's tinted head, a 2×2 figures panel (as on the
     Sanction summary), and the card's detail-row style. */
  ui.LoanDetail = ({ offer, record }) => {
    const r = (record && record.values) || {};
    const card = Object.fromEntries(offer.details);
    const coll = Array.isArray(r.collateral) ? r.collateral : [];
    const rows = [
      ["Loan type", r.type],
      ["Tenure", card["Tenure"] || r.tenure],
      card["Pay on"] && ["Pay on", card["Pay on"]],
      ["Processing fee", card["Fee"] || r.fee],
      coll.length && ["Collateral", coll[1] ? `${coll[0]} · ${coll[1]}` : coll[0]],
      ["Money in", r.money],
    ].filter((x) => x && x[1]);
    const figs = [
      offer.figures[0],
      offer.figures[1],
      { label: "APR", value: r.apr },
      { label: "Est. EMI", value: r.emi || card["Est. EMI"] },
    ].filter((f) => f && f.value);
    return html`
      <div class="detail" style="--tint:${offer.tint}">
        <div class="offer__head detail__head">
          <div class="offer__tags">${offer.tags.map((t) => OPL.raw(`<span class="offer__tag offer__tag--${t.tone}">${t.text}</span>`))}</div>
          <div class="offer__id detail__id">
            ${ui.Logo({ id: offer.logo, size: 44 })}
            <div class="offer__text"><p class="offer__title">${offer.title}</p><p class="offer__sub">${offer.subtitle}</p></div>
          </div>
        </div>
        <div class="detail__figs">${figs.map((f) => OPL.raw(`
          <div class="figure"><span class="figure__label">${f.label}</span>
            <span class="figure__value">${f.value}${f.unit ? `<span class="figure__unit">${f.unit}</span>` : ""}</span></div>`))}</div>
        <div class="detail__rows">${rows.map(([l, v]) => OPL.raw(`<div class="offer__row"><span>${l}</span><span>${v}</span></div>`))}</div>
      </div>`;
  };
  ui.LoanDetailFoot = ({ id, selected }) => html`
    <div class="detail__foot">
      <button class="offer__compare" data-detail-compare="${id}" aria-pressed="${selected}">
        <img class="ico offer__check" src="assets/icons/${selected ? "check-square-checked" : "check-square"}.svg" width="24" height="24" alt="">
        <span>Compare</span>
      </button>
      ${ui.Button({ label: "Apply now", trailing: "chevron-right-white", goto: "apply-loan", attrs: 'style="flex:1"' })}
    </div>`;

  /* SortOption — "Loan offers / Sort option" 393:504 */
  ui.SortOption = ({ label, selected = false }) => html`
    <button class="${cx("sort-opt", selected && "is-selected")}" data-sort="${label}" data-press>
      <span class="sort-opt__label">${label}</span>
      ${selected ? OPL.raw(`<img class="ico" src="assets/icons/radio-selected.svg" width="20" height="20" alt="">`) : OPL.raw(`<span class="sort-opt__radio"></span>`)}
    </button>`;

  /* Sheet — bottom sheet (393:851 / 393:869). Opened/closed with OPL.fx.sheet. */
  ui.Sheet = ({ id, title, action, body, footer }) => html`
    <div class="sheet-layer" data-sheet="${id}" hidden>
      <div class="sheet-scrim" data-sheet-close></div>
      <section class="sheet" role="dialog" aria-label="${title}">
        <div class="sheet__grip" data-sheet-drag><span class="sheet__grabber"></span>
          <div class="sheet__head"><h2 class="sheet__title">${title}</h2>${action ? OPL.raw(`<button class="sheet__action" data-sheet-action>${action}</button>`) : ""}</div>
        </div>
        ${OPL.raw(String(body))}
        ${footer ? OPL.raw(`<div class="sheet__foot">${footer}</div>`) : ""}
      </section>
    </div>`;

  /* CompareTray — floating compare bar (382:35963). selected: [{ id, logo }] */
  ui.CompareTray = ({ selected, max = 3 }) => html`
    <div class="tray">
      <img class="tray__texture" src="${img("hero-texture.jpg")}" alt="">
      <span class="tray__blur"></span>
      <div class="tray__head">
        <p class="tray__title">Comparing ${selected.length} of ${max} loans</p>
        <button class="tray__clear" data-compare-clear>Clear all</button>
      </div>
      <div class="tray__row">
        <div class="tray__logos">
          ${selected.map((s) => OPL.raw(`<span class="tray__slot" data-slot="${s.id}">${ui.Logo({ id: s.logo, size: 44 })}
            <button class="tray__remove" data-compare-remove="${s.id}" aria-label="Remove">${icon("close-circle", 20)}</button></span>`))}
          ${Array.from({ length: Math.max(0, max - selected.length) }, () => OPL.raw(`<button class="tray__add" data-compare-add aria-label="Add a loan">${icon("add-circle", 44)}</button>`))}
        </div>
        ${ui.Button({ label: "Compare", variant: "white", size: "md", trailing: "arrow-right-primary", attrs: "data-compare-go" })}
      </div>
    </div>`;

  /* Toggle — DS Toggle 269:2 (Off as drawn; On state inferred: primary track) */
  ui.Toggle = ({ on = false, attrs = "" }) => html`
    <button class="${cx("toggle", on && "is-on")}" role="switch" aria-checked="${on}" ${OPL.raw(attrs)}><span class="toggle__knob"></span></button>`;

  /* CompareTable — Compare loans grid (382:37840) + pick row (382:37990).
     addSlot: trailing "Add loan" column when a slot is free (uses the tray's add icon). */
  ui.CompareAddCol = ({ rows, label = "Add loan" }) =>
    OPL.raw(`<div class="ct-col ct-col--add" data-col="add">
      <div class="ct-head"><button class="ct-add" data-compare-more data-press>${icon("add-circle", 28)}<span>${label}</span></button></div>
      ${rows.map((r) => `<div class="ct-cell ct-value" data-row="${r.id}" style="--h:${r.h}px"></div>`).join("")}
    </div>`);
  ui.CompareTable = ({ rows, lenders, addSlot = false, addLabel }) => {
    const label = (r) => `<div class="ct-cell ct-label" data-row="${r.id}" style="--h:${r.h}px">
      <div class="ct-label__main" style="gap:${r.gap || 4}px"><span>${r.label}</span>${r.info ? icon("info-circle", 14) : ""}</div>
      ${r.sub ? `<span class="ct-sub">${r.sub}</span>` : ""}</div>`;
    const value = (l, r) => {
      const v = l.values[r.id];
      const best = (l.best || []).includes(r.id);
      return `<div class="${cx("ct-cell ct-value", r.small && "ct-value--small", best && "is-best", v === "—" && "is-na")}" data-row="${r.id}" style="--h:${r.h}px">
        ${Array.isArray(v) ? `<span>${v[0]}</span><span class="ct-sub">${v[1]}</span>` : `<span>${v}</span>`}</div>`;
    };
    return html`
      <div class="ct">
        <div class="ct-labels">
          <div class="ct-cell ct-label ct-label--lender"><span>Lender</span></div>
          ${rows.map((r) => OPL.raw(label(r)))}
        </div>
        <div class="ct-scroll" data-ct-scroll>
          ${lenders.map((l) => OPL.raw(`<div class="ct-col" data-col="${l.id}">
            <div class="ct-head"><div class="ct-card"><div class="ct-card__inner" style="background:${l.tint}">
              <div class="ct-card__top">${ui.Logo({ id: l.logo, size: 28 })}<button class="ct-card__x" data-col-remove="${l.id}" aria-label="Remove ${l.name}">${icon("x-16", 16)}</button></div>
              <p class="ct-card__name">${l.name}</p></div></div></div>
            ${rows.map((r) => value(l, r)).join("")}
          </div>`))}
          ${addSlot ? ui.CompareAddCol({ rows, label: addLabel }) : ""}
        </div>
      </div>`;
  };
  ui.ComparePick = ({ label, lenders, addSlot = false }) => html`
    <div class="ct-pick">
      <div class="ct-pick__label">${label}</div>
      <div class="ct-pick__scroll" data-ct-pick>
        ${lenders.map((l) => OPL.raw(`<div class="ct-pick__cell" data-col="${l.id}">
          ${ui.Button({ label: l.selected ? "Selected" : "Select", variant: l.selected ? "soft" : "outlined", size: "md", block: true, attrs: `data-pick="${l.id}"` })}</div>`))}
        ${addSlot ? OPL.raw(`<div class="ct-pick__cell" data-col="add"></div>`) : ""}
      </div>
    </div>`;

  /* ------------------------------------------------------------------------
     Chrome
     ------------------------------------------------------------------------ */
  ui.StatusBar = () => html`
    <div class="status-bar">
      <span class="status-bar__time">9:41</span>
      <span class="status-bar__icons">${icon("status-signal", 17)}${icon("status-wifi", 17)}${icon("status-battery", 22)}</span>
    </div>`;

  /* AppHeader — home (382:34252): title + bell, support, avatar.
     Sub-page (382:36173): back arrow + title, custom actions. */
  ui.AppHeader = ({ title, back = false, backIcon = "arrow-left", compact = false, actions }) => html`
    <header class="${cx("app-header", compact && "app-header--compact")}">
      <div class="app-header__lead">
        ${back ? OPL.raw(`<button class="app-header__back" aria-label="Back" data-press data-back>${icon(backIcon, 24)}</button>`) : ""}
        <h1 class="app-header__title">${title}</h1>
      </div>
      <div class="app-header__actions">
        ${actions
          ? actions.map((a) => ui.IconButton(a))
          : [ui.IconButton({ icon: "bell-linear", label: "Notifications", goto: "notifications" }),
             ui.IconButton({ icon: "headphones-round-sound-linear", label: "Support", goto: "support" }),
             ui.Avatar({ goto: "profile" })]}
      </div>
    </header>`;

  /* AiMitraFab — 60px assistant button (382:34310) */
  /* nudge: { lead, topic } — a momentary line that slides out from behind the
     button to say what AI Mitra can help with on this page. */
  ui.AiMitraFab = ({ nudge } = {}) => html`
    <div class="fab-wrap">
      ${nudge ? OPL.raw(`<button class="fab-nudge" data-goto="ai-mitra" tabindex="-1" aria-hidden="true">
        <span class="fab-nudge__text">${nudge.lead} <strong>${nudge.topic}</strong></span></button>`) : ""}
      <button class="fab" aria-label="Ask AI Mitra${nudge ? ` — ${nudge.lead} ${nudge.topic}` : ""}" data-press data-goto="ai-mitra">
        ${icon("ai-mitra-logo", 24)}
      </button>
    </div>`;

  /* PageNote — quiet sign-off at the end of a scrolling page.
     tone: "neutral" | "trust" (green lead line); icon: optional, sits before the lead line. */
  ui.PageNote = ({ lines, icon: name, tone = "neutral" }) => html`
    <footer class="page-note page-note--${tone}">
      <p class="page-note__lead">${name ? icon(name, 16) : ""}<span>${lines[0]}</span></p>
      ${lines.slice(1).map((l) => OPL.raw(`<p>${l}</p>`))}
    </footer>`;

  /* BottomNav — floating pill nav (382:34337) */
  /* variant: "main" (Finance hub tabs, 382:34337) | "section" (Loans tabs, 382:36322 —
     tighter inactive items, tertiary labels, no icon pill on the active tab) */
  ui.BottomNav = ({ items, active, variant = "main" }) => html`
    <nav class="nav nav--${variant}">
      ${items.map((it) => OPL.raw(`
        <button class="nav__item ${it.id === active ? "is-active" : ""}" data-press ${it.id === active ? "" : `data-goto="${it.id}"`}>
          <span class="nav__pill">${icon(it.id === active ? it.iconActive : it.icon, 24)}</span>
          <span class="nav__label">${it.label}</span>
        </button>`))}
    </nav>`;
})();
