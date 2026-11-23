/* Desktop Loans · Overview — verbatim from Figma "loans overview" 476:200124
   (page "-> Finance Hub - Desktop Loans" 357:54674). */
(function () {
  OPL.ddata = OPL.ddata || {};
  const img = OPL.img;
  const figs = (amount, rate) => [
    { label: "Loan up to", value: amount },
    { label: "Interest", value: rate, unit: "p.a." },
  ];

  OPL.ddata.loansOverview = {
    hero: {                                   // 476:200221
      eyebrow: "Safe Borrowing Limit",
      amount: "Up to ₹50 Lakhs",
      picks: [
        { icon: "hero-banknote", label: "Charges & Fee", value: "Less than 1%" },
        { icon: "hero-sale-square", label: "Lowest interest", value: "From 9.45%" },
        { icon: "hero-stopwatch", label: "Fastest money", value: "In ~2 days" },
      ],
      ai: "Which working capital loan should I apply for?",
    },
    cmr: {                                    // 476:200254
      title: "CIBIL MSME Rank",
      updated: "Updated 25 Sep 2026",
      rank: 2,
      angle: 31.8,                            // needle position as drawn (476:200302), degrees up from rank 1
      risk: "Low Risk",
      // Info tooltip (proposed copy — the frame has the icon, no tooltip drawn)
      info: "CIBIL MSME Rank runs from 1 (lowest risk) to 10 (highest risk). Lenders use it to price your loan.",
      ai: "How do I maintain this rank",
    },
    matches: {                                // 476:200396
      title: "Top loan matches",
      count: 7,
      link: "View All",
      chips: ["Collateral-free", "Working Capital", "Term loan", "Fee under 1%"],
      sort: { label: "Sort by", value: "Lowest interest" },
      sortOptions: ["Lowest interest", "Highest loan amount", "Lowest EMI", "Lowest processing fee"],
      cards: [
        { id: "d-citi", logo: { src: img("logo-citi.png"), bg: "#f1f5f9", crop: "width:270.83%;height:202.08%;left:-86.72%;top:-55.28%" }, tint: "#e9f1fb", tag: "Collateral-free", name: "Citi Bank", sub: "Working Capital Loan",
          figures: figs("₹50 L", "9.45%"), details: [["Tenure", "3 years"], ["Est. EMI", "₹1,60,048 / month"], ["Fee", "1.5%"]],
          // for chip filters + sort (read off the card itself)
          meta: { collateralFree: true, workingCapital: true, term: false, fee: 1.5, amount: 50, rate: 9.45, emi: 160048 }, compareId: "pick-citi" },
        { id: "d-axis", logo: img("logo-axis.png"), tint: "#f7e9ef", tag: "Low Interest", name: "Axis Bank", sub: "ECGLS 5.0 Cash Credit Limit",
          figures: figs("₹50 L", "9.45%"), details: [["Tenure", "3 years"], ["Est. EMI", "₹1,60,048 / month"], ["Fee", "1.5%"]],
          meta: { collateralFree: false, workingCapital: true, term: false, fee: 1.5, amount: 50, rate: 9.45, emi: 160048 }, compareId: "offer-axis" },
        { id: "d-sbi", logo: img("logo-sbi.png"), tint: "#e4f2fa", tag: "Low Interest", name: "SBI Bank", sub: "Cash Credit Limit",
          figures: figs("₹20 L", "9.25%"), details: [["Tenure", "Renews yearly"], ["Est. EMI", "₹1,60,048 / month"], ["Fee", "0.65%"]],
          meta: { collateralFree: false, workingCapital: true, term: false, fee: 0.65, amount: 20, rate: 9.25, emi: 160048 }, compareId: "sbi" },
      ],
      empty: { title: "No loans match these filters", body: "Try removing a filter to see more offers.", cta: "Clear filters" },
    },
    debt: {                                   // 476:200548
      title: "Debt Profile",
      link: "View details",
      tiles: [
        { icon: "bill-list-duo", value: "05", label: "Total sanctioned" },
        { icon: "wad-of-money", value: "₹4.65 L", label: "Total utilised limit" },
        { icon: "wallet-2-duo", value: "₹2.80 L", label: "Total available limit", tag: "68% limit utilised" },
      ],
      trend: { title: "Monthly Repayment Trend", amount: "₹65,171", sub: "Amount due today", tip: { value: "₹65,171", month: "Nov’26" },
        info: "What you repay across all loans each month. The marked point is this month's total." },
      termLoans: {
        title: "Term Loans", count: 5, link: "View All EMIs",
        rows: [
          { icon: "banknote-2-outline", name: "Loan against property", due: "Due on 21 Nov 2026", amount: "₹65,171" },
          { icon: "banknote-2-outline", name: "Commercial vehicle loan", due: "Due on 23 Nov 2026", amount: "₹49,843" },
          { icon: "money-card", name: "Gold loan", due: "Due on 31 Nov 2026", amount: "₹1.20 L" },   // "31 Nov" as drawn — flagged
        ],
      },
    },
  };
})();
