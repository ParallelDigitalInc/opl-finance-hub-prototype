/* Content for Finance Hub · Home — copied verbatim from Figma 416:82748.
   Where Figma shows a placeholder or duplicated content it is kept as-is
   and listed under "Figma flags" in README.md. */
(function () {
  OPL.data = OPL.data || {};

  OPL.data.home = {
    header: { title: "Get Financing" },

    hero: {
      loans: {
        eyebrow: "Get a loan up to",
        amount: { prefix: "₹", value: 50, suffix: " Lakhs" },
        facts: [
          [{ text: "From", strong: false }, { text: " " }, { text: "9.45% p.a.", strong: true, accent: true }],
          [{ text: "7 offers", strong: true, accent: true }],
        ],
        // Cycle order — first two are the Figma rest state (front Citi, back BoB).
        // Axis from Loan offers 382:35360.
        stack: [
          { logo: "citi", title: "Citi Bank", subtitle: "Working Capital Loan", tint: "var(--tint-blue)" },
          { logo: "bob", title: "Bank of Baroda", subtitle: "Working Capital Loan", tint: "var(--tint-peach-soft)" },
          { logo: "axis", title: "Axis Bank", subtitle: "Working Capital Loan", tint: "var(--tint-pink)" },
        ],
        cta: "Explore Loans",          // Figma updated 23 Nov (was "See all loans (7)")
        goto: "loans-overview",
      },
      subsidies: {
        eyebrow: "Get assistance up to",
        amount: { prefix: "₹", value: 1, suffix: " Crore", static: true },
        facts: null,
        // Figma's back card (382:34005) shows the Gujarat mark with MSME copy;
        // now that it cycles to the front it carries its own scheme copy.
        stack: [
          { logo: "msme", ring: 1, title: "MSME Competitive<br>Lean Scheme", subtitle: "MSME Champions Scheme", tint: "var(--tint-peach)" },
          { logo: "gujarat", ring: 2, title: "Gujarat Electronics Policy<br>(2022 - 28)", subtitle: "Science and Technology Department", tint: "var(--tint-blue)" },
          { logo: "gujaratGovt", ring: 1, title: "Aatmanirbhar<br>Gujarat 2022", subtitle: "Industries and Mines Department", tint: "var(--tint-peach)" },
        ],
        cta: "Explore Subsidies",      // 382:33823; 382:36681 still reads "See all subsidies (3)"
        goto: "subsidies-overview",
      },
    },

    quickActions: [
      { icon: "round-graph-bold-duotone", label: "CMR<br>score", goto: "cmr-score" },
      { icon: "bill-list-bold-duotone", label: "Track<br>Loans", goto: "track-loans" },
      { icon: "diploma-verified-bold-duotone", label: "Debt<br>Snapshot", goto: "debt-snapshot" },
      { icon: "calendar-bold-duotone", label: "View<br>EMIs", goto: "view-emis" },
    ],

    loans: {
      title: "Top loan matches",
      goto: "loan-offers",
      cards: [
        {
          kind: "loan", tag: "Collateral-free", tint: "var(--tint-blue)", logo: "citi",
          title: "Citi Bank", subtitle: "Working Capital Loan",
          figures: [{ label: "Loan up to", value: "₹50 L" }, { label: "Interest", value: "9.45%", unit: "p.a." }],
          detail: "pick-citi",
        },
        {
          kind: "loan", tag: "Working Capital Loan", tint: "var(--tint-peach)", logo: "bob",
          title: "Bank of Baroda", subtitle: "Working Capital Loan",
          figures: [{ label: "Loan up to", value: "₹50 L" }, { label: "Interest", value: "9.45%", unit: "p.a." }],
          detail: "match-bob",
        },
        {
          // Loan offers "Top 3 picks" 382:35360
          kind: "loan", tag: "Collateral-free", tint: "var(--tint-pink)", logo: "axis",
          title: "Axis Bank", subtitle: "Working Capital Loan",
          figures: [{ label: "Loan up to", value: "₹50 L" }, { label: "Interest", value: "9.45%", unit: "p.a." }],
          detail: "pick-axis",
        },
      ],
    },

    subsidies: {
      title: "Top subsidy matches",
      goto: "subsidy-list",
      chips: [
        { icon: "settings-bold-duotone", label: "Machinery" },
        { icon: "cpu-bold-duotone", label: "Technology" },
        { icon: "verified-check-bold-duotone", label: "Quality & Lean", count: 3 },
      ],
      cards: [
        {
          kind: "subsidy", tag: "State Government", tint: "var(--tint-peach)", logo: "msme",
          title: "MSME Competitive<br>Lean Scheme", subtitle: "MSME Champions Scheme",
          figures: [{ label: "Assistance up to", value: "Up to ₹2.4L" }],
          goto: "subsidy-detail",
        },
        {
          kind: "subsidy", tag: "Central Government", tint: "var(--tint-blue)", logo: "gujarat",
          title: "Gujarat Electronics Policy<br>(2022 - 28)", subtitle: "Science and Technology Department",
          figures: [{ label: "Assistance up to", value: "Up to ₹2.4L" }],
          goto: "subsidy-detail",
        },
        {
          // Aatmanirbhar Gujarat 2022 — subsidy screens 164:1434 ("Up to ₹1.2Cr")
          kind: "subsidy", tag: "State Government", tint: "var(--tint-peach)", logo: "gujaratGovt",
          title: "Aatmanirbhar<br>Gujarat 2022", subtitle: "Industries and Mines Department",
          figures: [{ label: "Assistance up to", value: "Up to ₹1.2Cr" }],
          goto: "subsidy-detail",
        },
      ],
    },

    help: {
      title: "Need help? We're here for you!",
      subtitle: "Get help with loans and subsidies",
      cta: "Request a Call",
      goto: "request-call",
    },

    // AI Mitra nudge — page-aware topic
    aiNudge: { lead: "Ask anything about", topic: "loans & subsidies" },

    // Page-end note options (picked in the panel; see variants.js)
    pageNotes: {
      trust: { tone: "trust", icon: "shield-check-bold-duotone", lines: ["Offers from RBI-regulated banks and NBFCs", "Your data is shared only with your consent"] },
      indicative: { lines: ["Rates and amounts are indicative", "Final terms are set by the lender after review"] },
      caughtup: { lines: ["You're all caught up", "New matches appear as your business profile grows"] },
    },

    emi: {
      parts: [{ text: "EMI of " }, { text: "₹45,899", strong: true }, { text: " due on " }, { text: "12 Nov", strong: true }],
      goto: "view-emis",
    },

    nav: [
      { id: "home", label: "Home", icon: "home-angle-linear" },
      { id: "business", label: "Business", icon: "shop-linear" },
      { id: "finance", label: "Finance", icon: "money-bag-bold-duotone", iconActive: "money-bag-bold-duotone" },
      { id: "grow", label: "Grow", icon: "course-up-linear" },
    ],
  };
})();
