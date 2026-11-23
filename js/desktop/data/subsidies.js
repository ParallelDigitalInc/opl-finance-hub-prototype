/* Desktop · Govt. subsidies — verbatim from Figma page "-> Final Desktop" 476:199974:
   home 524:98724 · Explore modal 524:99050 · state picker 524:99394 · expansion results
   524:99743 · details: cover photo 524:101843 / blue estimate hero 524:101144.
   Policy content (benefits, sheets, steps) is the mobile kit's OPL.data.subsidyDetail. */
(function () {
  const dd = OPL.ddata;

  // Subsidy cards (524:98881 …). Logos are the mobile kit's ui.Logo ids.
  const CARDS = {
    msme: { id: "msme", tag: "Central", tint: "#fbf0e9", logo: "msme", name: "MSME Competitive Lean Scheme", sub: "MSME Champions Scheme",
      value: "Up to ₹2.4L", note: "90% of lean consultant fees", kind: "Central" },
    electronics: { id: "electronics", tag: "State", tint: "#ebf1f8", logo: "gujarat", name: "Gujarat Electronics Policy (2022–28)", sub: "Sector specific scheme",
      value: "Up to ₹2.4L", note: "90% of lean consultant fees", kind: "State" },          // note as drawn (copied from the MSME card) — flagged
    textile: { id: "textile", tag: "State", tint: "#fcf4ee", logo: "gujaratGovt", name: "Gujarat Textile Policy 2024", sub: "Sector specific scheme",
      value: "Up to 35%", note: "capital subsidy on eligible investment", kind: "State" },
  };

  dd.subsidies = {
    title: "Government Subsidies",
    hero: {                                                    // 524:98800
      eyebrow: "Get assistance",
      amount: "Up to ₹72 Lakhs",
      picks: [
        { icon: "sub-settings", label: "Capital subsides", value: "Up to ₹50 L" },      // "subsides" as drawn — flagged
        { icon: "hero-sale-square", label: "Interest subsidies", value: "Up to ₹20 L" },
        { icon: "sub-gift", label: "Other benefits", value: "Up to ₹2 L" },
      ],
      ai: "Which working capital loan should I apply for?",   // as drawn on the subsidies hero — flagged
    },
    refine: {                                                  // 524:98833
      title: "Refine your matches",
      body: "Answer a few questions to get more accurate subsidy matches",
      cta: "Try Now",
    },
    top: {
      title: "Top subsidies", count: 3, link: "View All",
      chips: ["Central", "State", "Sector", "Import & Export"],
      location: { label: "Schemes in", value: "Gujarat" },
      sort: { label: "Sort by", value: "Alphabetical", options: ["Alphabetical", "Highest benefit"] },  // options proposed
      cards: [CARDS.msme, CARDS.electronics, CARDS.textile],
    },
    states: {                                                  // 524:99394, minus its "All" row (Shreya: GST states only)
      search: "Search a state",
      caption: "States fetched from your GST registration",
      options: ["Gujarat", "Andhra Pradesh", "Karnataka", "Madhya Pradesh", "Maharashtra", "Rajasthan", "Tamil Nadu"],
    },
    promo: {                                                   // 524:98971
      title: ["Planning a new unit in another state,", "or a new product line?"],
      secondary: "Call an Expert",
      primary: "Explore Now",
    },
    explore: {                                                 // 524:99050
      title: "Explore subsidies for your new unit",
      body: "Tell us a little about your planned business expansion to find relevant subsidies.",
      fields: [
        { id: "state", label: "Where will the new unit be?", placeholder: "Select state",
          options: ["Andhra Pradesh", "Gujarat", "Karnataka", "Madhya Pradesh", "Maharashtra", "Rajasthan", "Tamil Nadu"] },
        { id: "sector", label: "Industry Sector", placeholder: "Select industry sector", options: ["Manufacturing", "Services", "Trading"] },
        { id: "activity", label: "Activity", placeholder: "Select activity", options: ["Textiles", "Electronics", "Food processing", "Chemicals"] },
        { id: "size", label: "Enterprise size", placeholder: "Select enterprise size", options: ["Micro enterprise", "Small enterprise", "Medium enterprise"] },
      ],
      // used when the form is submitted untouched: the values drawn on the results frame (524:99743)
      figmaPick: { state: "Maharashtra", sector: "Manufacturing", activity: "Textiles", size: "Small enterprise" },
      cancel: "Cancel",
      cta: "Find Subsidies",
    },
    results: {                                                 // 524:99743
      back: "Government Subsidies",
      title: "Subsidies for your expansion",
      edit: "Edit",
      available: "Subsidies available",
      chips: ["State", "Sector"],
      // six cards as drawn (the three schemes, twice in a different order) — placeholder set, flagged
      cards: [CARDS.msme, CARDS.electronics, CARDS.textile, CARDS.electronics, CARDS.textile, CARDS.msme],
    },
    detail: {
      crumbs: "Govt. subsidies",
      department: "Industries and Mines Department · State Government",
      status: "Open till 30 Sep 2029",
      estimate: { eyebrow: "Estimated benefits", prefix: "Up to ", amount: "₹1.2Cr", cta: "Calculate Estimate", apply: "Apply Now" },
      info: "An estimate for a unit like yours, from the policy's rates. Calculate it for your own investment.",   // proposed tooltip
      howTitle: "How to apply",
      otherTitle: "Other benefits",
      trusted: "Trusted by 2,000+ users",
    },
  };
})();
