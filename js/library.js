/* ==========================================================================
   Component library page — renders tokens, icons and every OPL.ui component
   from the same functions the screens use, so this page can't drift.
   ========================================================================== */
(function () {
  const { ui } = OPL;
  const d = OPL.data.home;
  const lo = OPL.data.loansOverview;
  const of = OPL.data.loanOffers;
  const cl = OPL.data.compareLoans;
  const clCols = cl.figmaDefault.map(({ id, selected }) => ({ id, ...cl.records[id], selected, best: { "pick-citi": ["amount", "interest", "money"], "offer-sidbi": ["amount", "interest", "apr"], sbi: ["fee"] }[id] }));
  const root = document.getElementById("lib");

  const TOKENS = {
    "Text": ["--foreground", "--muted-foreground", "--tertiary-foreground", "--primary-foreground"],
    "Primary / CTA (on-screen)": ["--primary", "--primary-tint"],
    "Surfaces & strokes": ["--surface", "--muted", "--tile", "--border", "--border-subtle", "--neutral-border", "--icon-subtle"],
    "Hero & tints": ["--hero-bg", "--hero-fact-bg", "--tint-blue", "--tint-peach", "--tint-peach-soft", "--help-bg", "--badge-bg"],
    "Status": ["--warning-bg", "--warning-fg"],
    "Trust (proposed)": ["--trust", "--trust-fg"],
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
    "chevron-right-primary", "chevron-right-white", "x", "ai-mitra-logo", "shield-check-bold-duotone"];
  // Logos: citi, bob, msme, gujarat (Figma, Finance Home); axis (Figma, Loan offers); gujaratGovt (Wikimedia Commons)

  const COMPONENTS = [
    {
      name: "Button", node: "2:118", use: "Filled = the one main action. Text = lowest emphasis (View all). Large 44 · Small 32.",
      demos: [
        ["Filled · Large · trailing", ui.Button({ label: "See all loans (7)", trailing: "chevron-right-white" }), `ui.Button({ label, trailing: "chevron-right-white" })`],
        ["Filled · Medium 38", ui.Button({ label: "Review KFS", size: "md", block: true }), `ui.Button({ label, size: "md", block: true })`],
        ["Tonal · Soft · Outlined · White (38)", OPL.raw(`<div style="display:flex;gap:8px;flex-wrap:wrap;background:#f1f6fe;padding:12px;border-radius:12px">${ui.Button({ label: "Apply now", variant: "tonal", size: "md", trailing: "arrow-right-primary" })}${ui.Button({ label: "Selected", variant: "soft", size: "md" })}${ui.Button({ label: "Select", variant: "outlined", size: "md" })}${ui.Button({ label: "Compare", variant: "white", size: "md", trailing: "arrow-right-primary" })}</div>`), `ui.Button({ label, variant: "tonal" | "soft" | "outlined" | "white", size: "md" })`],
        ["Filled · Small · leading", ui.Button({ label: "Request a Call", size: "sm", leading: "phone-calling-bold" }), `ui.Button({ label, size: "sm", leading: "phone-calling-bold" })`],
        ["Text · trailing", ui.Button({ label: "View all", variant: "text", trailing: "chevron-right-primary" }), `ui.Button({ label, variant: "text", trailing: "chevron-right-primary" })`],
      ],
    },
    {
      name: "IconButton · Avatar", node: "382:34257 · 382:34261", bg: "var(--hero-bg)", use: "Header actions on the hero surface.",
      demos: [
        ["AppHeader · sub-page", OPL.raw(`<div style="width:390px">${ui.AppHeader({ title: lo.header.title, back: true, actions: lo.header.actions })}</div>`), `ui.AppHeader({ title, back: true, actions: [{ icon, label }] })`],
        ["", OPL.raw(`<div style="display:flex;gap:8px;align-items:center">${ui.IconButton({ icon: "bell-linear", label: "Notifications" })}${ui.IconButton({ icon: "headphones-round-sound-linear", label: "Support" })}${ui.Avatar()}</div>`), `ui.IconButton({ icon, label }) · ui.Avatar()`],
      ],
    },
    {
      name: "Logo", node: "382:34130", use: "Lender or scheme mark. Layered fills reproduce Figma crops exactly. Add marks to LOGOS in components.js.",
      demos: [["citi · bob · axis · msme · gujarat · gujaratGovt", OPL.raw(`<div style="display:flex;gap:12px">${["citi", "bob", "axis", "msme", "gujarat", "gujaratGovt"].map((id) => ui.Logo({ id, size: 40 })).join("")}</div>`), `ui.Logo({ id: "citi", size: 40 })`]],
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
        ["Loan · stack (cycles in the prototype)", ui.HeroStack({ kind: "loan", cards: d.hero.loans.stack }), `ui.HeroStack({ kind: "loan", cards: [front, back, …queued] })`],
        ["Subsidy · stack", ui.HeroStack({ kind: "subsidy", cards: d.hero.subsidies.stack }), `ui.HeroStack({ kind: "subsidy", cards })`],
        ["Single card · front / back scale", OPL.raw(`<div style="display:grid;gap:16px;justify-items:start">${ui.HeroCard({ kind: "loan", ...d.hero.loans.stack[0] })}${ui.HeroCard({ kind: "loan", ...d.hero.loans.stack[1], scale: 194 / 289 })}</div>`), `ui.HeroCard({ kind, logo, title, subtitle, tint, scale })`],
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
      name: "CmrPill", node: "382:36243", bg: "var(--hero-bg)", use: "Credit score summary on the Loans hero. 2px white stroke drawn inside.",
      demos: [["", ui.CmrPill(lo.cmr), `ui.CmrPill({ label: "CMR - 2", risk: "Low risk" })`]],
    },
    {
      name: "Tracker", node: "416:121737", use: "Flow / Application tracker v2, Style=Icon. Green done, amber needs you, grey upcoming. Plays in when scrolled into view.",
      demos: [["Done · done · action", OPL.raw(`<div style="width:312px">${ui.Tracker({ steps: lo.applications.card.steps })}</div>`), `ui.Tracker({ steps: [{ icon, label, state }] })`]],
    },
    {
      name: "ApplicationCard", node: "416:121715", use: "Your loan applications. Its stroke is in layout (unlike the match cards).",
      demos: [["", OPL.raw(`<div style="width:354px">${ui.ApplicationCard(lo.applications.card)}</div>`), `ui.ApplicationCard({ logo, name, product, tag, figures, steps, cta })`]],
    },
    {
      name: "BorrowingCard", node: "382:36253",
      demos: [["", OPL.raw(`<div style="width:354px">${ui.BorrowingCard(lo.borrowing.card)}</div>`), `ui.BorrowingCard({ total, legend, available })`]],
    },
    {
      name: "OfferCard", node: "pick 382:35360 · offer 382:35473", use: "Loan offers cards. Compare checkbox toggles a 2px primary outline (382:35815); Apply now is a Tonal Medium button.",
      demos: [
        ["Pick (300)", ui.OfferCard({ ...of.picks[1], kind: "pick" }), `ui.OfferCard({ kind: "pick", logo, tint, tags, title, subtitle, figures, details })`],
        ["Offer (350) · selected", ui.OfferCard({ ...of.offers[0], kind: "offer", selected: true }), `ui.OfferCard({ kind: "offer", …, selected: true })`],
      ],
    },
    {
      name: "Chip · bordered + selected", node: "392:490",
      demos: [["Filters · Sort · quick · selected", OPL.raw(`<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">${ui.Chip({ icon: "tuning-2", label: "Filters", bordered: true })}${ui.Chip({ icon: "sort-vertical", label: "Lowest interest", bordered: true, trailing: "chevron-down" })}<span class="chip-divider"></span>${ui.Chip({ label: "Term loan" })}${ui.Chip({ label: "Working capital", bordered: true, selected: true })}</div>`), `ui.Chip({ label, bordered, selected, trailing })`]],
    },
    {
      name: "SortOption · Sheet", node: "393:504 · 393:851", use: "Sort rows apply on tap and close the sheet (no CTA). Sheets close on scrim tap, Escape or a downward drag.",
      demos: [["Sort options", OPL.raw(`<div style="width:350px">${of.sortOptions.map((o, i) => ui.SortOption({ label: o, selected: i === 0 })).join("")}</div>`), `ui.SortOption({ label, selected }) · ui.Sheet({ id, title, action, body, footer })`]],
    },
    {
      name: "CompareTray", node: "382:35966", bg: "#f1f5f8", use: "Replaces the AI Mitra button while loans are selected. Max 3; a 4th shakes the tray.",
      demos: [["2 of 3", OPL.raw(`<div style="width:358px">${ui.CompareTray({ selected: [{ id: "a", logo: "sidbiMark" }, { id: "b", logo: "axis" }] })}</div>`), `ui.CompareTray({ selected: [{ id, logo }], max: 3 })`]],
    },
    {
      name: "Toggle", node: "269:2", use: "Off as drawn; On inferred from the primary colour.",
      demos: [["Off · On", OPL.raw(`<div style="display:flex;gap:16px">${ui.Toggle({})}${ui.Toggle({ on: true })}</div>`), `ui.Toggle({ on })`]],
    },
    {
      name: "CompareTable", node: "382:37840 · pick row 382:37990", use: "Sticky label column, horizontally scrolling lender columns, best values in green.",
      demos: [["", OPL.raw(`<div style="width:390px;overflow:hidden;border-radius:12px;box-shadow:inset 0 0 0 1px var(--border)">${ui.CompareTable({ rows: cl.rows.slice(0, 4), lenders: clCols })}${ui.ComparePick({ label: cl.pickLabel, lenders: clCols })}</div>`), `ui.CompareTable({ rows, lenders }) · ui.ComparePick({ label, lenders })`]],
    },
    {
      name: "PageNote", node: "proposed", use: "Quiet sign-off at the end of a scrolling page. Proposed — not in Figma yet.",
      demos: Object.entries(d.pageNotes).map(([k, n]) => [k, ui.PageNote(n), n.tone === "trust" ? `ui.PageNote({ tone: "trust", icon: "shield-check-bold-duotone", lines })` : `ui.PageNote({ lines: [lead, secondary] })`]),
    },
    {
      name: "NoticeBanner", node: "382:36897", use: "Dismissible reminder that sits above the nav.",
      demos: [["EMI due", OPL.raw(`<div style="width:358px">${ui.NoticeBanner(d.emi)}</div>`), `ui.NoticeBanner({ icon, parts: [{ text, strong }] })`]],
    },
    {
      name: "AiMitraFab · BottomNav", node: "382:34310 · 382:34337", bg: "#f1f5f8",
      demos: [
        ["", OPL.raw(`<div style="width:358px;display:grid;gap:8px;justify-items:end">${ui.AiMitraFab()}${ui.BottomNav({ items: d.nav, active: "finance" })}</div>`), `ui.AiMitraFab() · ui.BottomNav({ items, active })`],
        ["BottomNav · section (Loans)", OPL.raw(`<div style="width:358px">${ui.BottomNav({ items: lo.nav, active: "overview", variant: "section" })}</div>`), `ui.BottomNav({ items, active, variant: "section" })`],
        ["Nudge (shown state)", OPL.raw(`<div style="width:358px;display:flex;justify-content:flex-end" class="lib-nudge">${ui.AiMitraFab({ nudge: d.aiNudge })}</div>`), `ui.AiMitraFab({ nudge: { lead, topic } })`],
      ],
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
        <h2>${c.name} ${(() => { const m = c.node.match(/\d+:\d+/); return m ? `<a href="${OPL.figmaLink(m[0])}" target="_blank" rel="noopener">${c.node} ↗</a>` : `<small>${c.node}</small>`; })()}</h2>
        ${c.use ? `<p class="lib-use">${c.use}</p>` : ""}
        <div class="demos">${c.demos.map(([label, out, code]) => `
          <figure class="demo">
            <div class="demo__stage" style="${c.bg ? `background:${c.bg}` : ""}">${out}</div>
            <figcaption>${label ? `<b>${label}</b>` : ""}<code>${code.replace(/</g, "&lt;")}</code></figcaption>
          </figure>`).join("")}</div>
      </section>`).join("")}
  `;

  root.querySelectorAll(".lib-nudge .fab-wrap").forEach((e) => e.classList.add("is-nudging"));
  OPL.initInteractions(root);
  // On the library page, hotspot taps should not navigate.
  OPL.screens = {};
})();
