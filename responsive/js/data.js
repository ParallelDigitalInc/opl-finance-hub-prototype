/* Loans overview — copy and figures verbatim from Figma lpZnNP6VNO0xnz5s9lUgPo
   (mobile 1:1559, desktop 1:1994). Lines marked "proposed" are not on the frames. */
window.LO = {
  header: { title: "Loans" },

  /* ---- mobile hero (1:1594) ---- */
  hero: {
    eyebrow: "Get a loan up to",
    amount: 50, prefix: "₹", suffix: " Lakhs",
    facts: [{ lead: "From", value: "9.45% p.a." }, { value: "7 offers" }],
    cta: "Explore Loans",
    // front first; the stack cycles (kit HeroStack behaviour)
    stack: [
      { logo: "logo-citi.png", name: "Citi Bank", sub: "Working Capital Loan" },
      { logo: "logo-bob.png", name: "Bank of Baroda", sub: "Working Capital Loan" },
    ],
  },
  quick: [                                    // 1:1760
    { icon: "qa-cmr", label: "CMR<br>score", to: "cmr" },
    { icon: "qa-track", label: "Track<br>Loans", to: "applications" },
    { icon: "qa-debt", label: "Debt<br>Snapshot", to: "debt" },
    { icon: "qa-emi", label: "View<br>EMIs", to: "emis" },
  ],

  /* ---- desktop limit card (KPI 1:2074) ---- */
  limit: {
    eyebrow: "Safe Borrowing Limit",
    amount: 50, prefix: "Up to ₹", suffix: " Lakhs",
    picks: [
      { icon: "banknote", label: "Charges & Fee", value: "Less than 1%" },
      { icon: "sale-square", label: "Lowest interest", value: "From 9.45%" },
      { icon: "stopwatch", label: "Fastest money", value: "In ~2 days" },
    ],
    // first as drawn; the rest rotate in (proposed, carried from the kit)
    ai: ["Which working capital loan should I apply for?", "How much of my ₹50 L limit should I borrow?",
      "Which lender can pay out in about 2 days?", "Can I get a rate below 9.45%?"],
  },
  cibil: {
    title: "CIBIL MSME Rank", updated: "Updated 25 Sep 2026", rank: 2, angle: 31.8, risk: "Low Risk",
    info: "CIBIL MSME Rank runs from 1 (lowest risk) to 10 (highest risk). Lenders use it to price your loan.",   // proposed copy
    ai: ["How do I maintain this rank", "What would move me to rank 1?",
      "Will applying again lower my rank?", "Why do lenders see me as low risk?"],
  },

  /* ---- Top loan matches ---- */
  matches: {
    title: "Top loan matches", count: 7,
    chips: ["Collateral-free", "Working Capital", "Term loan", "Fee under 1%"],
    sorts: ["Lowest interest", "Highest loan amount", "Lowest EMI", "Lowest processing fee"],
    empty: { title: "No loans match these filters", body: "Try removing a filter to see more offers.", cta: "Clear filters" },
    cards: [
      { id: "citi", logo: "logo-citi.png", tag: "Collateral-free", name: "Citi Bank", sub: "Working Capital Loan",
        amount: "₹50 Lakhs", rate: "9.45%", details: [["Tenure", "3 years"], ["Est. EMI", "₹1,60,048 / month"], ["Fee", "1.5%"]],
        meta: { collateralFree: true, workingCapital: true, term: false, fee: 1.5, amt: 50, rate: 9.45, emi: 160048 } },
      // mobile rail card 2 (1:1664); not on the desktop frame
      { id: "bob", only: "m", logo: "logo-bob.png", tag: "Working Capital Loan", tagTone: "primary", name: "Bank of Baroda", sub: "Working Capital Loan",
        amount: "₹50 Lakhs", rate: "9.45%", details: [], meta: { workingCapital: true, fee: 1, amt: 50, rate: 9.45, emi: 160048 } },
      { id: "axis", logo: "logo-axis.png", tag: "Low Interest", name: "Axis Bank", sub: "ECGLS 5.0 Cash Credit Limit",
        amount: "₹50 Lakhs", rate: "9.45%", details: [["Tenure", "3 years"], ["Est. EMI", "₹1,60,048 / month"], ["Fee", "1.5%"]],
        meta: { collateralFree: false, workingCapital: true, term: false, fee: 1.5, amt: 50, rate: 9.45, emi: 160048 } },
      { id: "sbi", logo: "logo-sbi.png", tag: "Low Interest", name: "SBI Bank", sub: "Cash Credit Limit",
        amount: "₹20 Lakhs", rate: "9.25%", details: [["Tenure", "Renews yearly"], ["Est. EMI", "₹1,60,048 / month"], ["Fee", "0.65%"]],
        meta: { collateralFree: false, workingCapital: true, term: false, fee: 0.65, amt: 20, rate: 9.25, emi: 160048 } },
    ],
  },

  /* ---- mobile: Top subsidy matches (1:1690) ---- */
  subsidies: {
    title: "Top subsidy matches",
    chips: [{ icon: "chip-machinery", label: "Machinery" }, { icon: "chip-cpu", label: "Technology" }, { icon: "chip-verified", label: "Quality & Lean", count: 3 }],
    cards: [
      { logo: "logo-cht.png", ring: 1, tag: "State Government", name: "MSME Competitive<br>Lean Scheme", sub: "MSME Champions Scheme", label: "Assistance up to", value: "Up to ₹24,00,000" },
      { logo: "logo-gsem.png", ring: 2, tag: "Central Government", tagTone: "primary", name: "Gujarat Electronics Policy<br>(2022 - 28)", sub: "Science and Technology Department", label: "Assistance up to", value: "Up to ₹24,00,000" },
    ],
  },
  help: { title: "Need help? We're here for you!", sub: "Get help with loans and subsidies", cta: "Request a Call" },

  /* ---- desktop: Debt Profile (1:2426) ---- */
  debt: {
    tiles: [
      { value: 5, fmt: (v) => String(Math.round(v)).padStart(2, "0"), label: "Total sanctioned", img: "ill-sanctioned.png", pos: "a" },
      { value: 4.65, fmt: (v) => `₹${v.toFixed(2)} Lakhs`, label: "Total utilised limit", img: "ill-utilised.png", pos: "b" },
      { value: 2.8, fmt: (v) => `₹${v.toFixed(2)} Lakhs`, label: "Total available limit", img: "ill-available.png", pos: "c", tag: "68% limit utilised" },
    ],
    trend: {
      title: "Monthly Repayment Trend",
      info: "What you repay across all loans each month.",   // proposed copy
      // bar heights as drawn (top offsets 50/12.5/0/37.5/62.5/25 %); only Apr's ₹64.7K is on the frame,
      // the other values are scaled from it so each label matches its bar — flagged in the README
      bars: [["Jan", 51.8], ["Feb", 90.6], ["Mar", 103.5], ["Apr", 64.7], ["May", 38.8], ["Jun", 77.6]],
      active: 3, max: 103.5,
    },
    term: {
      title: "Term Loans", count: 5, link: "View All EMIs",
      rows: [
        { icon: "emi-banknote", name: "Loan against property", due: "Due on 21 Nov 2026", amount: "₹65,171" },
        { icon: "emi-banknote", name: "Commercial vehicle loan", due: "Due on 23 Nov 2026", amount: "₹49,843" },
        { icon: "emi-card", name: "Gold loan", due: "Due on 31 Nov 2026", amount: "₹1.20 L" },   // "31 Nov" as drawn — flagged
      ],
    },
  },

  /* ---- navigation ---- */
  nav: [                                      // mobile floating nav 1:1801
    { id: "overview", label: "Overview", icon: "nav-overview" },
    { id: "offers", label: "Offers", icon: "nav-offers" },
    { id: "applications", label: "Track Loans", icon: "nav-track" },
    { id: "myloans", label: "My Loans", icon: "nav-myloans" },
  ],
  tabs: [                                     // desktop tabs
    { id: "overview", label: "Overview", icon: "tab-overview" },
    { id: "offers", label: "Loan Offers", icon: "tab-offers" },
    { id: "compare", label: "Compare", icon: "tab-compare" },
    { id: "applications", label: "Applications", icon: "tab-applications" },
    { id: "myloans", label: "My Loans", icon: "tab-myloans" },
  ],
  side: [                                     // sidebar 1:1995
    { heading: "Know your business", items: [["dashboard", "Dashboard"], ["bmr", "BMR insights"], ["gst", "GST"], ["taxes", "Taxes"], ["bank", "Bank"]] },
    { heading: "Get financing", items: [["loans", "Loans"], ["subsidies", "Govt. subsidies"], ["equity", "Equity"], ["insurance", "Insurance"]] },
    { heading: "Grow business", items: [["discovery", "Discovery Hub"], ["news", "News"]] },
  ],
  business: { initials: "RF", name: "Ratan Fabrics Pvt. Ltd." },
  nudge: { lead: "Ask anything about", topic: "loans & subsidies" },

  // destinations that are not built yet in this prototype → a toast says so
  next: {
    offers: "Loan offers", compare: "Compare loans", applications: "Track loans", myloans: "My loans",
    cmr: "CMR score", debt: "Debt snapshot", emis: "EMIs", "all-loans": "All loan offers", "all-subsidies": "All subsidies",
    apply: "Apply", call: "Request a call", mitra: "AI Mitra", subsidy: "Subsidy details", loan: "Loan details", side: "This section",
  },
};
