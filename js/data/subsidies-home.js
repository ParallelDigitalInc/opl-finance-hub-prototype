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
      location: { label: "Schemes in", value: "Gujarat", goto: "subsidy-location" },
      // Central / State filter the rail by each card's tag; the others need the listing
      filters: [
        { label: "Central", match: "Central Government" },
        { label: "State", match: "State Government" },
        { label: "Sector", goto: "subsidy-list" },
        { label: "Import & Export", goto: "subsidy-list" },
      ],
    },
    promo: {
      title: "Planning a new unit in another state, or a new product line?",
      secondary: { label: "Call an Expert", goto: "expert" },
      primary: { label: "Explore Now", goto: "subsidy-list" },
    },
    aiNudge: { lead: "Ask anything about", topic: "subsidies" },   // same pattern as Home (proposed copy)
  };
})();
