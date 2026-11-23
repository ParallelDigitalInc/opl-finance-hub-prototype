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
     variant: "filled" | "text"   size: "lg" (44) | "sm" (32)
     ------------------------------------------------------------------------ */
  ui.Button = ({ label, variant = "filled", size = "lg", leading, trailing, block = false, goto, attrs = "" }) => html`
    <button class="${cx("btn", `btn--${variant}`, `btn--${size}`, block && "btn--block")}" data-press
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
      <img class="avatar__bg" src="${img("avatar-bg.png")}" alt="">
      <img class="avatar__fg" src="${img("avatar-person.png")}" alt="">
    </button>`;

  /* ------------------------------------------------------------------------
     Logo — lender / scheme mark. Layers replicate the Figma image fills
     (crops and stacking) so the result is pixel-identical.
     ------------------------------------------------------------------------ */
  const LOGOS = {
    citi: { layers: [{ src: "logo-citi.png", crop: "width:270.83%;height:202.08%;left:-86.72%;top:-55.28%" }] },
    bob: { layers: [{ src: "logo-bob.png", cover: true }] },
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
    return html`<span class="logo" style="--logo:${size}px;--ring:${r}px">
      <span class="logo__fill">${def.layers.map((l) =>
        l.cover
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
  ui.Chip = ({ icon: name, label, count, selected = false, goto }) => html`
    <button class="${cx("chip", selected && "is-selected")}" data-press ${goto ? OPL.raw(`data-goto="${goto}"`) : ""}>
      ${icon(name, 18)}
      <span class="chip__label">${label}</span>
      ${count != null ? OPL.raw(`<span class="badge">${count}</span>`) : ""}
    </button>`;

  /* ------------------------------------------------------------------------
     MatchCard — "Top loan/subsidy matches" card (loan 382:34123, subsidy 382:34197)
     figures: [{label, value, unit?}]
     ------------------------------------------------------------------------ */
  ui.MatchCard = ({ kind, tag, tint, logo, title, subtitle, figures, goto }) => html`
    <article class="${cx("match", `match--${kind}`)}" style="--tint:${tint}" data-press ${goto ? OPL.raw(`data-goto="${goto}"`) : ""}>
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
     Chrome
     ------------------------------------------------------------------------ */
  ui.StatusBar = () => html`
    <div class="status-bar">
      <span class="status-bar__time">9:41</span>
      <span class="status-bar__icons">${icon("status-signal", 17)}${icon("status-wifi", 17)}${icon("status-battery", 22)}</span>
    </div>`;

  ui.AppHeader = ({ title }) => html`
    <header class="app-header">
      <h1 class="app-header__title">${title}</h1>
      <div class="app-header__actions">
        ${ui.IconButton({ icon: "bell-linear", label: "Notifications", goto: "notifications" })}
        ${ui.IconButton({ icon: "headphones-round-sound-linear", label: "Support", goto: "support" })}
        ${ui.Avatar({ goto: "profile" })}
      </div>
    </header>`;

  /* AiMitraFab — 60px assistant button (382:34310) */
  ui.AiMitraFab = () => html`
    <button class="fab" aria-label="Ask AI Mitra" data-press data-goto="ai-mitra">
      ${icon("ai-mitra-logo", 24)}
    </button>`;

  /* BottomNav — floating pill nav (382:34337) */
  ui.BottomNav = ({ items, active }) => html`
    <nav class="nav">
      ${items.map((it) => OPL.raw(`
        <button class="nav__item ${it.id === active ? "is-active" : ""}" data-press ${it.id === active ? "" : `data-goto="${it.id}"`}>
          <span class="nav__pill">${icon(it.id === active ? it.iconActive : it.icon, 24)}</span>
          <span class="nav__label">${it.label}</span>
        </button>`))}
    </nav>`;
})();
