/* Content for the Loan offers flow — verbatim from Figma section "Loans" 416:121835:
   list 382:35324 · compare selection 382:35666 · Sort 393:505 · Filters 393:869
   · Compare loans 382:37839. */
(function () {
  OPL.data = OPL.data || {};

  const fig = (amount = "₹50 L", rate = "9.45%") => [
    { label: "Loan up to", value: amount },
    { label: "Interest", value: rate, unit: "p.a." },
  ];

  OPL.data.loanOffers = {
    header: {
      title: "Loan offers",
      actions: [
        { icon: "magnifer-zoom-in-linear", label: "Search", goto: "loan-search" },
        { icon: "headphones-round-sound-linear", label: "Support", goto: "support" },
      ],
    },

    picksTitle: "Top 3 picks",
    picks: [
      {
        id: "pick-axis", logo: "axis", tint: "var(--tint-pink)",
        tags: [{ text: "Collateral-free", tone: "blue" }],
        title: "Axis Bank", subtitle: "Working Capital Loan", figures: fig(),
        details: [["Tenure", "Renews yearly"], ["Pay on", "Used amount"], ["Fee", "0.75%"]],
      },
      {
        id: "pick-citi", logo: "citi", tint: "var(--tint-blue)",
        tags: [{ text: "Lowest interest", tone: "green" }, { text: "Collateral-free", tone: "blue" }],
        title: "Citi Bank", subtitle: "Working Capital Loan", figures: fig(),
        details: [["Tenure", "Renews yearly"], ["Pay on", "Used amount"], ["Fee", "0.75%"]],
      },
      {
        // Third pick (Figma draws 2 under "Top 3 picks"). Every value is from Figma:
        // SIDBI's All-offers card (382:35473) + its processing fee on Compare loans (382:37921).
        id: "pick-sidbi", logo: "sidbiMark", tint: "var(--tint-olive)",
        tags: [{ text: "Lowest interest", tone: "green" }],
        title: "SIDBI", subtitle: "Cash credit limit", figures: fig(),
        details: [["Tenure", "Renews yearly"], ["Est. EMI", "₹1,50,690 /month"], ["Fee", "0.5%"]],
      },
    ],

    allTitle: "All offers (6)",
    offers: [
      {
        id: "offer-sidbi", logo: "sidbiMark", tint: "var(--tint-olive)",
        tags: [{ text: "Lowest interest", tone: "green" }],
        title: "SIDBI", subtitle: "Cash credit limit", figures: fig(),
        details: [["Tenure", "Renews yearly"], ["Est. EMI", "₹1,50,690 /month"]],
      },
      {
        id: "offer-axis", logo: "axis", tint: "var(--tint-pink)",
        tags: [{ text: "Needs collateral", tone: "amber" }],
        title: "Axis Bank", subtitle: "Cash credit limit", figures: fig(),
        details: [["Tenure", "Renews yearly"], ["Est. EMI", "₹1,50,690 /month"]],
      },
      {
        id: "offer-hdfc", logo: "hdfcMark", tint: "var(--tint-blue)",
        tags: [{ text: "Needs collateral", tone: "amber" }],
        title: "HDFC Bank", subtitle: "Cash credit limit", figures: fig(),
        details: [["Tenure", "Renews yearly"], ["Est. EMI", "₹1,50,690 /month"]],
      },
    ],

    // Chip row 382:35458 — Filters, Sort, divider, quick filters
    quickFilters: ["Working capital", "Term loan", "Collateral-free"],

    sortOptions: ["Lowest interest", "Highest loan amount", "Lowest EMI", "Lowest processing fee"],

    filterGroups: [
      { label: "Loan type", options: ["Working capital", "Term loan", "Cash credit limit"] },
      { label: "Collateral", options: ["Collateral-free", "Needs collateral"] },
      { label: "Loan amount", options: ["Up to ₹10 L", "₹10 L – ₹50 L", "Above ₹50 L"] },
      { label: "Lender type", options: ["Bank", "NBFC", "Government"] },
    ],
    filtersFigmaSelected: ["Working capital"],
    filtersCta: "Show 4 offers",

    compareMax: 3,
    compareFigmaSelected: ["offer-sidbi", "offer-axis"],

    aiNudge: { lead: "Ask anything about", topic: "these loan offers" },
  };

  /* Compare loans 382:37839. Columns as drawn. The third column is labelled
     "SIDBI" in Figma but carries the SBI logo — shown as SBI (flagged). */
  OPL.data.compareLoans = {
    title: "Compare loans",
    diffLabel: "Show differences only",
    rows: [
      { id: "type", label: "Loan type", h: 64, small: true },
      { id: "amount", label: "Loan amount", h: 52 },
      { id: "interest", label: "Interest", sub: "Floating · RBLR-linked", info: true, h: 68 },
      { id: "apr", label: "APR", sub: "yearly cost incl. fees", info: true, h: 68, gap: 6 },
      { id: "tenure", label: "Tenure", h: 52 },
      { id: "emi", label: "Estimated EMI", h: 52 },
      { id: "fee", label: "Processing fee", sub: "one time, incl. GST", h: 68 },
      { id: "collateral", label: "Collateral", h: 68 },
      { id: "money", label: "Money in", sub: "estimate, after signing", h: 68 },
    ],
    // best: values drawn in green (#15803D) in Figma
    lenders: [
      {
        id: "citi", name: "Citi Bank", logo: "citiApp", tint: "var(--tint-blue)", selected: true,
        values: { type: "Working capital loan", amount: "Up to ₹50 L", interest: "9.45% p.a.", apr: "10.54%", tenure: "3 years",
          emi: "₹1.60 L/mo", fee: "1.5%", collateral: ["Not needed", "CGTMSE"], money: "~3-4 days" },
        best: ["amount", "interest", "money"],
      },
      {
        id: "sidbi", name: "SIDBI", logo: "sidbi", tint: "#f6f8e2", selected: true,
        values: { type: "Working capital term loan", amount: "Up to ₹50 L", interest: "9.45% p.a.", apr: "9.81%", tenure: "3 years",
          emi: "₹1.60 L/mo", fee: "0.5%", collateral: ["Not needed", "CGTMSE"], money: "~5-7 days" },
        best: ["amount", "interest", "apr"],
      },
      {
        id: "sbi", name: "SBI", logo: "sbi", tint: "#eceefc", selected: false,
        values: { type: "Term loan · CGTMSE", amount: "Up to ₹45 L", interest: "9.75% p.a.", apr: "10.07%", tenure: "3 years",
          emi: "₹1.45 L/mo", fee: "0.44%", collateral: ["Not needed", "CGTMSE"], money: "~7-10 days" },
        best: ["fee"],
      },
    ],
    pickLabel: "Pick your loan",
    cta: (n) => `Apply to ${n} lender${n === 1 ? "" : "s"}`,
  };
})();
