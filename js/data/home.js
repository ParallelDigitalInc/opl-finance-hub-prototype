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
        amount: { prefix: "₹", value: 72, suffix: " Lakhs" },
        facts: [
          [{ text: "From", strong: false }, { text: " " }, { text: "9.45% p.a.", strong: true, accent: true }],
          [{ text: "7 offers", strong: true, accent: true }],
        ],
        back: { kind: "loan", logo: "bob", title: "Bank of Baroda", subtitle: "Working Capital Loan", tint: "var(--tint-peach-soft)" },
        front: { kind: "loan", logo: "citi", title: "Citi Bank", subtitle: "Working Capital Loan", tint: "var(--tint-blue)" },
        cta: "See all loans (7)",
        goto: "loan-offers",
      },
      subsidies: {
        eyebrow: "Get assistance up to",
        amount: { prefix: "₹", value: 1, suffix: " Crore", static: true },
        facts: null,
        // Back card: Figma shows the Gujarat mark with MSME Competitive copy (382:34005).
        back: { kind: "subsidy", logo: "gujarat", ring: 2, title: "MSME Competitive<br>Lean Scheme", subtitle: "MSME Champions Scheme", tint: "var(--tint-blue)" },
        front: { kind: "subsidy", logo: "msme", ring: 1, title: "MSME Competitive<br>Lean Scheme", subtitle: "MSME Champions Scheme", tint: "var(--tint-peach)" },
        cta: "See all subsidies (3)",
        goto: "subsidy-list",
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
          goto: "loan-detail",
        },
        {
          kind: "loan", tag: "Working Capital Loan", tint: "var(--tint-peach)", logo: "bob",
          title: "Bank of Baroda", subtitle: "Working Capital Loan",
          figures: [{ label: "Loan up to", value: "₹50 L" }, { label: "Interest", value: "9.45%", unit: "p.a." }],
          goto: "loan-detail",
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
      ],
    },

    help: {
      title: "Need help? We're here for you!",
      subtitle: "Get help with loans and subsidies",
      cta: "Request a Call",
      goto: "request-call",
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
