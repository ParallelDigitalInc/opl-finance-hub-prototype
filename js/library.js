/* ==========================================================================
   Component library page — renders tokens, icons and every OPL.ui component
   from the same functions the screens use, so this page can't drift.
   ========================================================================== */
(function () {
  const { ui } = OPL;
  const d = OPL.data.home;
  const root = document.getElementById("lib");

  const TOKENS = {
    "Text": ["--foreground", "--muted-foreground", "--tertiary-foreground", "--primary-foreground"],
    "Primary / CTA (on-screen)": ["--primary", "--primary-tint"],
    "Surfaces & strokes": ["--surface", "--muted", "--tile", "--border", "--border-subtle", "--neutral-border", "--icon-subtle"],
    "Hero & tints": ["--hero-bg", "--hero-fact-bg", "--tint-blue", "--tint-peach", "--tint-peach-soft", "--help-bg", "--badge-bg"],
    "Status": ["--warning-bg", "--warning-fg"],
  };
  const TYPE = [
    ["h2 · hero amount", "600 30/36 −0.4", "font:600 30px/36px var(--font);letter-spacing:-0.4px", "₹72 Lakhs"],
    ["h4 · section title, key figure", "500 20/28", "font:500 20px/28px var(--font)", "Top loan matches"],
    ["large · app header", "600 18/28", "font:600 18px/28px var(--font)", "Get Financing"],
    ["bodyLarge · hero eyebrow", "500 16/28", "font:500 16px/28px var(--font)", "Get a loan up to"],
    ["title · card title", "500 16/21", "font:500 16px/21px var(--font)", "Citi Bank"],
    ["small · button, chip", "500 14/20", "font:500 14px/20px var(--font)", "See all loans (7)"],
    ["label · fact pill", "600 13/18", "font:600 13px/18px var(--font)", "7 offers"],
    ["caption · label, nav", "400 12/16", "font:400 12px/16px var(--font);color:var(--muted-foreground)", "Loan up to"],
    ["meta · card subtitle", "400 12/18", "font:400 12px/18px var(--font);color:var(--muted-foreground)", "Working Capital Loan"],
  ];
  const SPACING = [1, 2, 4, 6, 8, 12, 16, 20, 32, 40];
  const RADII = [["tag", 12], ["inner", 14], ["large", 16], ["extraLarge", 28], ["full", 999]];
  const ICONS = ["round-graph-bold-duotone", "bill-list-bold-duotone", "diploma-verified-bold-duotone", "calendar-bold-duotone",
    "settings-bold-duotone", "cpu-bold-duotone", "verified-check-bold-duotone", "money-bag-bold-duotone", "calendar-mark-bold",
    "phone-calling-bold", "bell-linear", "headphones-round-sound-linear", "home-angle-linear", "shop-linear", "course-up-linear",
    "chevron-right-primary", "chevron-right-white", "x", "ai-mitra-logo"];

  const COMPONENTS = [
    {
      name: "Button", node: "2:118", use: "Filled = the one main action. Text = lowest emphasis (View all). Large 44 · Small 32.",
      demos: [
        ["Filled · Large · trailing", ui.Button({ label: "See all loans (7)", trailing: "chevron-right-white" }), `ui.Button({ label, trailing: "chevron-right-white" })`],
        ["Filled · Small · leading", ui.Button({ label: "Request a Call", size: "sm", leading: "phone-calling-bold" }), `ui.Button({ label, size: "sm", leading: "phone-calling-bold" })`],
        ["Text · trailing", ui.Button({ label: "View all", variant: "text", trailing: "chevron-right-primary" }), `ui.Button({ label, variant: "text", trailing: "chevron-right-primary" })`],
      ],
    },
    {
      name: "IconButton · Avatar", node: "382:34257 · 382:34261", bg: "var(--hero-bg)", use: "Header actions on the hero surface.",
      demos: [["", OPL.raw(`<div style="display:flex;gap:8px;align-items:center">${ui.IconButton({ icon: "bell-linear", label: "Notifications" })}${ui.IconButton({ icon: "headphones-round-sound-linear", label: "Support" })}${ui.Avatar()}</div>`), `ui.IconButton({ icon, label }) · ui.Avatar()`]],
    },
    {
      name: "Logo", node: "382:34130", use: "Lender or scheme mark. Layered fills reproduce Figma crops exactly. Add marks to LOGOS in components.js.",
      demos: [["citi · bob · msme · gujarat", OPL.raw(`<div style="display:flex;gap:12px">${["citi", "bob", "msme", "gujarat"].map((id) => ui.Logo({ id, size: 40 })).join("")}</div>`), `ui.Logo({ id: "citi", size: 40 })`]],
    },
    {
      name: "FactPill · CarouselDots", node: "382:34270 · 382:34097", bg: "var(--hero-bg)",
      demos: [
        ["Fact pills", OPL.raw(`<div style="display:flex;gap:8px">${d.hero.loans.facts.map((parts) => ui.FactPill({ parts })).join("")}</div>`), `ui.FactPill({ parts: [{ text, strong, accent }] })`],
        ["Dots — slide 1 / slide 2", OPL.raw(`<div style="display:grid;gap:12px">${ui.CarouselDots({ count: 2, active: 0 })}${ui.CarouselDots({ count: 2, active: 1 })}</div>`), `ui.CarouselDots({ count: 2, active: 0 })`],
      ],
    },
    {
      name: "Chip", node: "382:34182 · selected 392:490", use: "Filter-by-need. Count badge optional. Selected state is from the Loan offers chip component in the same file.",
      demos: [
        ["Default", OPL.raw(`<div style="display:flex;gap:8px;flex-wrap:wrap">${d.subsidies.chips.map((c) => ui.Chip(c)).join("")}</div>`), `ui.Chip({ icon, label, count })`],
        ["Selected", ui.Chip({ ...d.subsidies.chips[0], selected: true }), `ui.Chip({ icon, label, selected: true })`],
      ],
    },
    {
      name: "QuickAction", node: "382:34102",
      demos: [["4-up row", OPL.raw(`<div class="quick" style="margin:0;padding:0;width:350px">${d.quickActions.map((q) => ui.QuickAction(q)).join("")}</div>`), `ui.QuickAction({ icon, label: "CMR<br>score" })`]],
    },
    {
      name: "SectionHeader", node: "382:34119",
      demos: [["", OPL.raw(`<div style="width:390px">${ui.SectionHeader({ title: "Top loan matches" })}</div>`), `ui.SectionHeader({ title, action: "View all" })`]],
    },
    {
      name: "HeroCard", node: "front 382:34286 · back 382:34276", bg: "var(--hero-bg)", use: "Stacked offer in the hero. One component scaled by --s (back = 194/289).",
      demos: [
        ["Loan · front / back", OPL.raw(`<div style="display:grid;gap:16px;justify-items:start">${ui.HeroCard(d.hero.loans.front)}${ui.HeroCard({ ...d.hero.loans.back, scale: 194 / 289 })}</div>`), `ui.HeroCard({ kind: "loan", logo, title, subtitle, tint, scale })`],
        ["Subsidy · front / back", OPL.raw(`<div style="display:grid;gap:16px;justify-items:start">${ui.HeroCard(d.hero.subsidies.front)}${ui.HeroCard({ ...d.hero.subsidies.back, scale: 194 / 289 })}</div>`), `ui.HeroCard({ kind: "subsidy", … })`],
      ],
    },
    {
      name: "MatchCard", node: "loan 382:34123 · subsidy 382:34197", use: "Top-matches rail card. Loan uses box shadow; subsidy uses a drop-shadow filter (as in Figma).",
      demos: [
        ["Loan", ui.MatchCard(d.loans.cards[0]), `ui.MatchCard({ kind: "loan", tag, tint, logo, title, subtitle, figures })`],
        ["Subsidy", ui.MatchCard(d.subsidies.cards[0]), `ui.MatchCard({ kind: "subsidy", … })`],
      ],
    },
    {
      name: "HelpCard", node: "382:34297",
      demos: [["", OPL.raw(`<div style="width:350px">${ui.HelpCard(d.help)}</div>`), `ui.HelpCard({ title, subtitle, cta })`]],
    },
    {
      name: "NoticeBanner", node: "382:36897", use: "Dismissible reminder that sits above the nav.",
      demos: [["EMI due", OPL.raw(`<div style="width:358px">${ui.NoticeBanner(d.emi)}</div>`), `ui.NoticeBanner({ icon, parts: [{ text, strong }] })`]],
    },
    {
      name: "AiMitraFab · BottomNav", node: "382:34310 · 382:34337", bg: "#f1f5f8",
      demos: [["", OPL.raw(`<div style="width:358px;display:grid;gap:8px;justify-items:end">${ui.AiMitraFab()}${ui.BottomNav({ items: d.nav, active: "finance" })}</div>`), `ui.AiMitraFab() · ui.BottomNav({ items, active })`]],
    },
  ];

  const cs = getComputedStyle(document.documentElement);
  const val = (v) => cs.getPropertyValue(v).trim();
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  root.innerHTML = `
    <header class="lib-head">
      <div>
        <p class="lib-eyebrow">OPL HTML kit · v${OPL.VERSION}</p>
        <h1>Finance Hub components</h1>
        <p class="lib-lede">Every component on this page is rendered by the same function the prototype uses. Measured from Figma <a href="${OPL.figmaLink("416:82748")}" target="_blank" rel="noopener">Finance Home 416:82748</a>. Geist only, Solar icons, primary <code>#3858E5</code> as drawn on screen.</p>
      </div>
      <a class="lib-back" href="index.html">← Prototype</a>
    </header>
    <nav class="lib-toc">${["Colour", "Type", "Spacing & shape", "Icons", ...COMPONENTS.map((c) => c.name)].map((n) => `<a href="#${slug(n)}">${n}</a>`).join("")}</nav>

    <section class="lib-sec" id="colour"><h2>Colour</h2>
      ${Object.entries(TOKENS).map(([g, vars]) => `
        <h3>${g}</h3>
        <div class="swatches">${vars.map((v) => `<div class="swatch"><span style="background:var(${v})"></span><code>${v}</code><small>${val(v)}</small></div>`).join("")}</div>`).join("")}
    </section>

    <section class="lib-sec" id="type"><h2>Type</h2>
      <div class="type-list">${TYPE.map(([n, spec, style, sample]) => `<div class="type-row"><div><b>${n}</b><small>${spec}</small></div><p style="${style}">${sample}</p></div>`).join("")}</div>
    </section>

    <section class="lib-sec" id="spacing-shape"><h2>Spacing & shape</h2>
      <div class="spacing">${SPACING.map((s) => `<div><span style="width:${s}px"></span><small>${s}</small></div>`).join("")}</div>
      <div class="radii">${RADII.map(([n, r]) => `<div><span style="border-radius:${Math.min(r, 32)}px"></span><small>${n} · ${r}</small></div>`).join("")}</div>
      <div class="radii">${[["Shadow/s", "var(--shadow-s)"], ["Shadow/m", "var(--shadow-m)"]].map(([n, s]) => `<div><span style="box-shadow:${s};background:#fff;border-radius:16px"></span><small>${n}</small></div>`).join("")}</div>
    </section>

    <section class="lib-sec" id="icons"><h2>Icons <small>Solar · exported from Figma</small></h2>
      <div class="icons">${ICONS.map((i) => `<div>${OPL.icon(i, 24)}<small>${i}</small></div>`).join("")}</div>
    </section>

    ${COMPONENTS.map((c) => `
      <section class="lib-sec" id="${slug(c.name)}">
        <h2>${c.name} <a href="${OPL.figmaLink(c.node.match(/\d+:\d+/)[0])}" target="_blank" rel="noopener">${c.node} ↗</a></h2>
        ${c.use ? `<p class="lib-use">${c.use}</p>` : ""}
        <div class="demos">${c.demos.map(([label, out, code]) => `
          <figure class="demo">
            <div class="demo__stage" style="${c.bg ? `background:${c.bg}` : ""}">${out}</div>
            <figcaption>${label ? `<b>${label}</b>` : ""}<code>${code.replace(/</g, "&lt;")}</code></figcaption>
          </figure>`).join("")}</div>
      </section>`).join("")}
  `;

  OPL.initInteractions(root);
  // On the library page, hotspot taps should not navigate.
  OPL.screens = {};
})();
