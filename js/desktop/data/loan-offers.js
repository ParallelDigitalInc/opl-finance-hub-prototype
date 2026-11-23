/* Desktop · Loans › Loan Offers + Compare — verbatim from Figma (page 357:54674):
   Loan Offers tab "loans offers" 357:102436 (Top 3 matches + All loan matches; the
   tagged list is the newer 507:84666) · Compare: empty 507:85604, three added +
   Apply bar 507:87387, Add-offers drawer 507:86111 / 507:85929.
   Offer ids are the mobile kit ids, so the Compare selection is shared across views. */
(function () {
  const dd = OPL.ddata;
  const img = OPL.img;
  const citiLogo = { src: img("logo-citi.png"), bg: "#f1f5f9", crop: "width:270.83%;height:202.08%;left:-86.72%;top:-55.28%" };
  const LOGO = {
    "pick-citi": citiLogo,
    "offer-axis": img("logo-axis.png"),
    sbi: img("logo-sbi.png"),
    "offer-hdfc": img("mark-hdfc.svg"),
    "offer-sidbi": img("logo-sidbi.png"),
  };

  // Tags on the tinted head (icon colours are baked into the Figma icons)
  const T = {
    collateralFree: { icon: "tag-safe-blue", text: "Collateral-free", tone: "blue" },
    lowestFee: { icon: "tag-banknote-green", text: "Lowest Fee", tone: "green" },
    needsCollateral: { icon: "tag-safe-amber", text: "Needs Collateral", tone: "amber" },
    subsidyLinked: { icon: "tag-link-blue", text: "Subsidy-linked", tone: "blue" },
    lowestInterest: { icon: "tag-sale-green", text: "Lowest Interest", tone: "green" },
  };
  const figs = [
    { label: "Loan up to", value: "₹50 L" },
    { label: "Interest", value: "9.45%", unit: "p.a." },
    { label: "Renewal", value: "Yearly" },
  ];

  dd.loanOffers = {
    topTitle: "Top 3 matches",
    allTitle: "All loan matches",
    chips: [
      { label: "Collateral-free" },
      { label: "Working Capital" },
      { label: "Term loan", badge: "New" },
      { label: "Fee under 1%" },
    ],
    // All five rows carry the same figures in Figma (₹50 L · 9.45% · Yearly · 0.75%) — flagged
    offers: [
      { id: "pick-citi", logo: LOGO["pick-citi"], name: "Citi Bank", sub: "Working Capital Loan", tags: [T.collateralFree, T.lowestFee],
        figures: figs, fee: "0.75%", meta: { collateralFree: true, workingCapital: true, term: false, fee: 0.75, amount: 50, rate: 9.45, emi: 160048 } },
      { id: "offer-axis", logo: LOGO["offer-axis"], name: "Axis Bank", sub: "ECGLS 5.0 Cash Credit Limit", tags: [T.needsCollateral, T.subsidyLinked],
        figures: figs, fee: "0.75%", meta: { collateralFree: false, workingCapital: true, term: false, fee: 0.75, amount: 50, rate: 9.45, emi: 160048 } },
      { id: "sbi", logo: LOGO.sbi, name: "State Bank of India", sub: "Cash Credit Limit", tags: [T.lowestInterest],
        figures: figs, fee: "0.75%", meta: { collateralFree: false, workingCapital: true, term: false, fee: 0.75, amount: 50, rate: 9.45, emi: 160048 } },
      { id: "offer-hdfc", logo: LOGO["offer-hdfc"], name: "HDFC Bank", sub: "Working Capital Loan", tags: [T.collateralFree, T.lowestFee],
        figures: figs, fee: "0.75%", meta: { collateralFree: true, workingCapital: true, term: false, fee: 0.75, amount: 50, rate: 9.45, emi: 160048 } },
      { id: "offer-sidbi", logo: LOGO["offer-sidbi"], name: "SIDBI", sub: "Working capital term loan", tags: [T.needsCollateral, T.subsidyLinked],
        figures: figs, fee: "0.75%", meta: { collateralFree: false, workingCapital: true, term: true, fee: 0.75, amount: 50, rate: 9.45, emi: 160048 } },
    ],
  };

  /* Compare (507:87387). Citi · SIDBI · Axis are drawn with identical terms; SBI and HDFC
     have no desktop compare column in Figma, so they reuse the drawn values (flagged). */
  const drawn = {
    amount: "₹50 L",
    interest: ["9.45% p.a.", "Floating · RBLR-linked"],
    apr: ["10.54%", "yearly cost incl. fees"],
    tenure: ["3 years"],
    emi: ["₹1,60,048 / month", "Est. EMI"],
    fee: ["₹29,500", "One time, incl. GST"],
    collateral: ["Collateral-free", "CGTMSE"],
    money: ["≈ 3–4 working days", "Estimate, after signing"],
  };
  dd.compare = {
    title: "Compare offers",
    max: 3,
    added: (n) => `${n} of 3 added`,
    diffLabel: "Show differences only",
    rows: [
      { id: "lender", label: "Lender" },
      { id: "amount", label: "Loan Amount" },
      { id: "interest", label: "Interest", best: true },
      { id: "apr", label: "APR", info: "Annual Percentage Rate: the yearly cost of the loan including interest and fees." },
      { id: "tenure", label: "Tenure" },
      { id: "emi", label: "Monthly cost" },
      { id: "fee", label: "Processing fee" },
      { id: "collateral", label: "Collateral", inline: true },
      { id: "money", label: "Money in" },
    ],
    bestLabel: "Lowest",
    records: {
      "pick-citi": { name: "Citi Bank", sub: "Working Capital Loan", tint: "#e9f1fb", logo: LOGO["pick-citi"], v: drawn },
      "offer-sidbi": { name: "SIDBI", sub: "Working Capital Loan", tint: "#f4f7e4", logo: LOGO["offer-sidbi"], v: drawn },
      "offer-axis": { name: "Axis Bank", sub: "ECGLS 5.0 Cash Credit Limit", tint: "#f7e9ef", logo: LOGO["offer-axis"], v: drawn },
      sbi: { name: "State Bank of India", sub: "Cash Credit Limit", tint: "#e4f2fa", logo: LOGO.sbi, v: drawn, assumed: true },
      "offer-hdfc": { name: "HDFC Bank", sub: "Working Capital Loan", tint: "#e9f1fb", logo: LOGO["offer-hdfc"], v: drawn, assumed: true },
    },
    aliases: { "pick-sidbi": "offer-sidbi", "pick-axis": "offer-axis", "match-bob": null },
    // 507:87387 as drawn: Citi · SIDBI · Axis added, Citi selected
    figmaThree: { added: ["pick-citi", "offer-sidbi", "offer-axis"], selected: ["pick-citi"] },
    select: "Select",
    selected: "Selected",
    empty: { title: "Add an offer", body: "Compare up to 3 side by side", cta: "Browse all 7 offers" },
    apply: "Apply to selected lenders",
    drawer: {
      title: "Add offers to compare",
      search: "Search lender or loan type",
      chips: ["Collateral-free", "Working Capital", "Term loan", "Fee under 1%"],
      order: ["offer-sidbi", "offer-axis", "pick-citi", "sbi", "offer-hdfc"],
      cta: "Select",
    },
  };
})();
