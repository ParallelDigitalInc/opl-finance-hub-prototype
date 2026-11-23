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

  /* Compare (507:87387). Figma draws Citi · SIDBI · Axis with identical terms, which makes the
     comparison meaningless (Shreya: "not practical"). Each lender now has coherent terms of its
     own, consistent with its cards (Overview 476:200124, Loan Offers 507:84666) and mobile:
     - EMIs are real amortisation on the loan amount over 36 months.
     - Cash credit limits show the monthly interest if the full limit is drawn.
     - Fees are % of the loan amount; n = numbers used to pick the best value per row.
     All of these are ASSUMED sample terms (flagged in the README). */
  const v = (o) => o;
  dd.compare = {
    title: "Compare offers",
    max: 3,
    added: (n) => `${n} of 3 added`,
    diffLabel: "Show differences only",
    rows: [
      { id: "lender", label: "Lender" },
      { id: "amount", label: "Loan Amount" },
      { id: "interest", label: "Interest" },
      { id: "apr", label: "APR", info: "Annual Percentage Rate: the yearly cost of the loan including interest and fees." },
      { id: "tenure", label: "Tenure" },
      { id: "emi", label: "Monthly cost" },
      { id: "fee", label: "Processing fee" },
      { id: "collateral", label: "Collateral", inline: true },
      { id: "money", label: "Money in" },
    ],
    bestLabel: "Lowest",
    records: {
      "pick-citi": { name: "Citi Bank", sub: "Working Capital Loan", tint: "#e9f1fb", logo: LOGO["pick-citi"], v: v({
        amount: "₹50 L", interest: ["9.45% p.a.", "Floating · RBLR-linked"], apr: ["10.54%", "yearly cost incl. fees"], tenure: ["3 years"],
        emi: ["₹1,60,048 / month", "Est. EMI"], fee: ["₹75,000", "1.5% · one time, incl. GST"], collateral: ["Collateral-free", "CGTMSE"],
        money: ["≈ 3–4 working days", "Estimate, after signing"] }),
        n: { amount: 50, interest: 9.45, apr: 10.54, fee: 75000, money: 3 } },
      "offer-sidbi": { name: "SIDBI", sub: "Working Capital Loan", tint: "#f4f7e4", logo: LOGO["offer-sidbi"], v: v({
        amount: "₹50 L", interest: ["9.45% p.a.", "Floating · RBLR-linked"], apr: ["9.81%", "yearly cost incl. fees"], tenure: ["3 years"],
        emi: ["₹1,60,048 / month", "Est. EMI"], fee: ["₹25,000", "0.5% · one time, incl. GST"], collateral: ["Collateral-free", "CGTMSE"],
        money: ["≈ 5–7 working days", "Estimate, after signing"] }),
        n: { amount: 50, interest: 9.45, apr: 9.81, fee: 25000, money: 5 } },
      "offer-axis": { name: "Axis Bank", sub: "ECGLS 5.0 Cash Credit Limit", tint: "#f7e9ef", logo: LOGO["offer-axis"], v: v({
        amount: "₹50 L", interest: ["9.85% p.a.", "Floating · Repo-linked"], apr: ["10.95%", "yearly cost incl. fees"], tenure: ["Renews yearly"],
        emi: ["₹41,042 / month", "Interest if fully drawn"], fee: ["₹50,000", "1% · one time, incl. GST"], collateral: ["Needs collateral", "Property"],
        money: ["≈ 6–8 working days", "Estimate, after signing"] }),
        n: { amount: 50, interest: 9.85, apr: 10.95, fee: 50000, money: 6 } },
      sbi: { name: "State Bank of India", sub: "Cash Credit Limit", tint: "#e4f2fa", logo: LOGO.sbi, v: v({
        amount: "₹20 L", interest: ["9.25% p.a.", "Floating · EBLR-linked"], apr: ["9.71%", "yearly cost incl. fees"], tenure: ["Renews yearly"],
        emi: ["₹15,417 / month", "Interest if fully drawn"], fee: ["₹13,000", "0.65% · one time, incl. GST"], collateral: ["Needs collateral", "Stock & receivables"],
        money: ["≈ 7–10 working days", "Estimate, after signing"] }),
        n: { amount: 20, interest: 9.25, apr: 9.71, fee: 13000, money: 7 } },
      "offer-hdfc": { name: "HDFC Bank", sub: "Working Capital Loan", tint: "#e9f1fb", logo: LOGO["offer-hdfc"], v: v({
        amount: "₹50 L", interest: ["9.60% p.a.", "Floating · RBLR-linked"], apr: ["10.12%", "yearly cost incl. fees"], tenure: ["3 years"],
        emi: ["₹1,60,400 / month", "Est. EMI"], fee: ["₹20,000", "0.4% · one time, incl. GST"], collateral: ["Collateral-free", "CGTMSE"],
        money: ["≈ 4–5 working days", "Estimate, after signing"] }),
        n: { amount: 50, interest: 9.6, apr: 10.12, fee: 20000, money: 4 } },
    },
    // Best value per row (green chip): which way wins, and its label
    best: { amount: ["max", "Highest"], interest: ["min", "Lowest"], apr: ["min", "Lowest"], fee: ["min", "Lowest"], money: ["min", "Fastest"] },
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
