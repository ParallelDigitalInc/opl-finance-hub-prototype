/* ==========================================================================
   Data · Subsidies home — Figma 524:103425 ("subsidies home")
   Entry: Finance Home → hero "Explore Subsidies" (data-goto="subsidies-overview").
   Copy verbatim from the frame. Top subsidies reuse Home's subsidy match cards.
   ========================================================================== */
(function () {
  OPL.data = OPL.data || {};

  OPL.data.subsidiesHome = {
    header: {
      title: "Subsidies",
      actions: [
        { icon: "magnifer-zoom-in-linear", label: "Search subsidies", goto: "subsidy-search" },
        { icon: "headphones-round-sound-linear", label: "Support", goto: "support" },
      ],
    },
    hero: {
      eyebrow: "Get assistance",
      prefix: "Up to ₹", value: 72, suffix: " Lakhs",
      // benefit-type chips → the listing, filtered by type (listing not designed yet)
      chips: [
        [{ icon: "settings-duotone-benefit", label: "Capital", count: 2, goto: "subsidy-list" },
         { icon: "sale-duotone", label: "Interest", count: 1, goto: "subsidy-list" }],
        [{ icon: "gift-duotone", label: "Other benefits", count: 6, goto: "subsidy-list" }],
      ],
    },
    top: {
      title: "Top subsidies",
      action: "View all",
      goto: "subsidy-list",
      location: { label: "Schemes in", value: "Gujarat", sheet: "states" },
      // Central / State filter the rail by each card's tag; the others need the listing
      filters: [
        { label: "Central", match: "Central Government" },
        { label: "State", match: "State Government" },
        { label: "Sector", goto: "subsidy-list" },
        { label: "Import & Export", goto: "subsidy-list" },
      ],
    },
    // "Schemes in" sheet — the states on the business's GST registration (copy and states from the
    // desktop picker 524:99394, without its "All"; no mobile frame). Picking one applies on tap, like the Sort sheet.
    // Other states: only central schemes apply, so state-tagged cards step aside (as desktop).
    states: {
      title: "Schemes in",
      search: "Search a state",
      caption: "States fetched from your GST registration",
      options: ["Gujarat", "Andhra Pradesh", "Karnataka", "Madhya Pradesh", "Maharashtra", "Rajasthan", "Tamil Nadu"],
      home: "Gujarat",                                      // the state whose schemes the cards are
      empty: (q) => `No state on your GST registration matches “${q}”.`,
      none: (state, filter) => `No ${filter ? filter.toLowerCase() + " " : ""}schemes to show for ${state} yet. Central schemes apply in every state.`,
    },
    promo: {
      title: "Planning a new unit in another state, or a new product line?",
      secondary: { label: "Call an Expert", goto: "expert" },
      primary: { label: "Explore Now", goto: "subsidies-explore" },
    },
    aiNudge: { lead: "Ask anything about", topic: "subsidies" },   // same pattern as Home (proposed copy)
  };

  /* Explore results — Figma 556:128366 ("Explore subsidies"). Same answers as desktop (modal 524:99050,
     results 558:101968); the pen opens them in a sheet (no mobile form frame — designed in code). */
  OPL.data.subsidyExplore = {
    title: "Explore Government Subsidies",
    brief: "Showing subsidies for",
    found: (n) => `${n} subsidies found`,
    // "Refine your matches" (desktop 524:98833, art 558:104693), dealt into the list after the
    // 3rd card (or after the last if fewer). Leads to the refine flow (subsidy-refine).
    refine: { title: "Refine your matches", body: "Answer a few questions to get more accurate subsidy matches", cta: "Try Now", goto: "subsidy-refine", after: 3 },
    fields: [
      { id: "state", label: "Where will the new unit be?", options: ["Andhra Pradesh", "Gujarat", "Karnataka", "Madhya Pradesh", "Maharashtra", "Rajasthan", "Tamil Nadu"] },
      { id: "sector", label: "Industry Sector", options: ["Manufacturing", "Services", "Trading"] },
      { id: "activity", label: "Activity", options: ["Textiles", "Electronics", "Food processing", "Chemicals"] },
      { id: "size", label: "Enterprise size", options: ["Micro enterprise", "Small enterprise", "Medium enterprise"], short: (v) => v.replace(/ enterprise$/i, "") },
    ],
    pick: { state: "Maharashtra", sector: "Manufacturing", activity: "Textiles", size: "Medium enterprise" },   // as drawn
    edit: { title: "Edit answers", cta: "Find Subsidies" },
    sort: { label: "Sort by", options: ["Alphabetical", "Highest benefit"] },
    filter: { label: "Filter", title: "Filter", clear: "Clear all", cta: "Show subsidies",
      options: [{ label: "Central", match: "Central Government" }, { label: "State", match: "State Government" }] },
    // The list follows the answers: central schemes always, plus the chosen state's own schemes
    // (state-wide ones, and the one for the chosen activity). Was the drawn Gujarat set ×2,
    // which showed Gujarat schemes for a Maharashtra unit.
    cards: (pick) => OPL.data.schemes.forPlace(pick.state, pick.activity),
    // "View all subsidies" (Home, Subsidies home): no expansion answers, so every scheme for
    // the business's own state (the GST state picked on Subsidies home) plus central ones.
    // Filters sit outside (no sheet): State and Central pick the issuer, Sector keeps sector-specific schemes
    all: { title: "All Subsidies", chips: ["State", "Sector", "Central"] },
  };

  /* Scheme catalogue (sample). Names are real schemes; amounts and which benefits each pays
     (pays: interest / capital / payroll / export, used by Refine) are sample values.
     Seals: Gujarat has one in the kit; other states get a monogram until a seal is supplied. */
  const card = (o) => ({ kind: "subsidy", goto: "subsidy-detail", pays: [], ...o, figures: [{ label: "Assistance up to", value: o.value }] });
  const central = (o) => card({ tag: "Central Government", tint: "var(--tint-blue)", ...o });
  const state = (o) => card({ tag: "State Government", tint: "var(--tint-peach)", ...o });
  const MONO = { "Andhra Pradesh": "AP", Karnataka: "KA", "Madhya Pradesh": "MP", Maharashtra: "MH", Rajasthan: "RJ", "Tamil Nadu": "TN" };
  OPL.data.schemes = {
    central: [
      central({ logo: "msme", title: "MSME Competitive<br>Lean Scheme", subtitle: "MSME Champions Scheme", value: "₹2.4L", note: "90% of lean consultant fees" }),
      central({ logo: "msme", title: "ZED Certification<br>Scheme", subtitle: "MSME Champions Scheme", value: "₹5L", note: "on ZED certification costs", pays: ["export"] }),
    ],
    // state schemes: activity = null means state-wide
    states: {
      Gujarat: [
        state({ logo: "gujaratGovt", title: "Aatmanirbhar<br>Gujarat 2022", subtitle: "Industries and Mines Department", value: "₹1.2Cr", note: "capital and interest subsidy", activity: null, pays: ["capital", "interest", "payroll"] }),
        state({ logo: "gujaratGovt", title: "Gujarat Textile<br>Policy 2024", subtitle: "Industries and Mines Department", value: "₹1Cr", note: "capital subsidy on eligible investment", activity: "Textiles", pays: ["capital", "interest", "payroll", "export"] }),
        state({ logo: "gujarat", title: "Gujarat Electronics Policy<br>(2022 - 28)", subtitle: "Science and Technology Department", value: "₹2.4L", note: "capital subsidy for electronics units", activity: "Electronics", pays: ["capital", "interest"] }),
      ],
      Maharashtra: [
        state({ logo: "mono:MH", title: "Package Scheme of<br>Incentives 2019", subtitle: "Industries Department", value: "₹1Cr", note: "capital and interest subsidy", activity: null, pays: ["capital", "interest", "payroll"] }),
        state({ logo: "mono:MH", title: "Maharashtra Textile<br>Policy 2023 - 28", subtitle: "Textiles Department", value: "₹80L", note: "capital subsidy on eligible investment", activity: "Textiles", pays: ["capital", "interest", "export"] }),
        state({ logo: "mono:MH", title: "Maharashtra Electronics<br>Policy 2016", subtitle: "Industries Department", value: "₹50L", note: "capital subsidy for electronics units", activity: "Electronics", pays: ["capital", "interest"] }),
      ],
    },
    // any other state: its industrial policy (state-wide) and its MSME policy
    generic: (s) => [
      state({ logo: `mono:${MONO[s] || s.slice(0, 2).toUpperCase()}`, title: `${s}<br>Industrial Policy`, subtitle: "Industries Department", value: "₹75L", note: "capital and interest subsidy", activity: null, pays: ["capital", "interest"] }),
      state({ logo: `mono:${MONO[s] || s.slice(0, 2).toUpperCase()}`, title: `${s}<br>MSME Policy`, subtitle: "MSME Department", value: "₹25L", note: "for micro and small units", activity: null, pays: ["capital", "payroll"] }),
    ],
    ofState(s) { return this.states[s] || this.generic(s); },
    // explore: the chosen state's state-wide schemes + its scheme for the activity, then central
    forPlace(s, activity) {
      const own = this.ofState(s).filter((c) => !c.activity || c.activity === activity);
      return [...own.sort((a, b) => (b.activity === activity) - (a.activity === activity)), ...this.central];
    },
    // view all: every scheme in the state, then central
    forState(s) { return [...this.ofState(s), ...this.central]; },
  };
})();
