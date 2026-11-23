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
    // desktop picker 524:99394; no mobile frame). Picking one applies on tap, like the Sort sheet.
    // Other states: only central schemes apply, so state-tagged cards step aside (as desktop).
    states: {
      title: "Schemes in",
      search: "Search a state",
      caption: "States fetched from your GST registration",
      all: { value: "All", label: "All states", sub: "Central schemes, and each state's own" },
      options: [
        { value: "Gujarat", sub: "Principal place of business" },
        { value: "Andhra Pradesh", sub: "Additional place of business" },
        { value: "Karnataka", sub: "Additional place of business" },
        { value: "Madhya Pradesh", sub: "Additional place of business" },
        { value: "Maharashtra", sub: "Additional place of business" },
        { value: "Rajasthan", sub: "Additional place of business" },
        { value: "Tamil Nadu", sub: "Additional place of business" },
      ],
      home: "Gujarat",                                      // the state whose schemes the cards are
      empty: (q) => `No state on your GST registration matches “${q}”.`,
      none: (state, filter) => `No ${filter ? filter.toLowerCase() + " " : ""}schemes to show for ${state} yet. Central schemes apply in every state.`,
    },
    promo: {
      title: "Planning a new unit in another state, or a new product line?",
      secondary: { label: "Call an Expert", goto: "expert" },
      primary: { label: "Explore Now", goto: "subsidy-list" },
    },
    aiNudge: { lead: "Ask anything about", topic: "subsidies" },   // same pattern as Home (proposed copy)
  };
})();
