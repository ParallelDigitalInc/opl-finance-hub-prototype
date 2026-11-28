/* Approach 3 — copy and figures, verbatim from Figma frame "3" (172:54014) unless marked proposed. */
window.OPL_F1 = {
  header: { title: "Finance Hub" },

  promo: {
    eyebrow: "Get a loan up to",
    amount: 50, unit: "Lakhs",
    cta: "Explore Loans",
    // Pager reads "1 of 3": Citi in front and Bank of Baroda behind, as drawn in frame 3; Axis is the third (proposed).
    // Frame 3's cards are neutral (white, inset #FAFAFA panel), so the tint fields of approach 1 are unused here.
    cards: [
      { id: "citi", name: "Citi Bank", product: "Working Capital Loan", logo: "logo-citi.png" },
      { id: "bob", name: "Bank of Baroda", product: "Working Capital Loan", logo: "logo-bob.png" },
      { id: "axis", name: "Axis Bank", product: "Term Loan", logo: "logo-axis.png" },
    ],
  },

  // Second hero slide, as in the kit's home (Figma 382:33823) — proposed; the frame draws the loans slide only.
  // Cards are the page's own Key Subsidies, tinted the way the lender cards are.
  promoSubs: {
    eyebrow: "Get assistance up to",
    amount: 1, unit: "Crore",
    cta: "Explore Subsidies",
    cards: [
      { id: "mcls", name: "MSME Competitive Lean Scheme", product: "Central Government", logo: "logo-msme.png", ring: true, brand: "217,119,6", wash: "#fdf1dc", soft: "#f4cd8c", softer: "#fcebcb" },
      { id: "gtp", name: "Gujarat Textile Policy 2024", product: "State Government", logo: "logo-gujarat.png", ring: true, brand: "37,99,235", wash: "#dfe8fd", soft: "#a9c2fa", softer: "#dde6fd" },
      { id: "ags", name: "Aatmanirbhar Gujarat Scheme", product: "State Government", logo: "logo-gujarat.png", ring: true, brand: "21,128,61", wash: "#ddf2e4", soft: "#a2d6b3", softer: "#d8efdf" },
    ],
  },

  quick: [
    { id: "cmr", label: "CMR score", icon: "qa-cmr", tile: "amber" },
    { id: "track", label: "Track Loans", icon: "qa-track", tile: "sky" },
    { id: "debt", label: "Debt Snapshot", icon: "qa-debt", tile: "rose" },
    { id: "emi", label: "View EMIs", icon: "qa-emi", tile: "lilac" },
  ],

  loans: {
    title: "Top loan matches",
    cards: [
      { id: "citi", name: "Citi Bank", product: "Working Capital Loan", logo: "logo-citi.png", tag: "", amount: "₹50 Lakhs", rate: "9.45%", tint: "#eef4fc", tintEnd: "36.9%" },
      { id: "bob", name: "Bank of Baroda", product: "Working Capital Loan", logo: "logo-bob.png", tag: "Collateral-free", amount: "₹50 Lakhs", rate: "9.45%", tint: "#fef2ec", tintEnd: "42%" },
    ],
  },

  subsidies: {
    title: "Key Subsidies", total: 8,   // the frame titles this section "Top loan matches" (copy slip)
    cards: [
      { id: "mcls", name: "MSME Competitive Lean Scheme", photo: "subsidy-1.jpg", logo: "logo-msme.png", tag: "Central Government", level: "central", value: "Up to ₹2.4 Lakhs" },
      { id: "gtp", name: "Gujarat Textile Policy 2024", photo: "subsidy-2.jpg", logo: "logo-gujarat.png", tag: "State Government", level: "state", value: "Up to ₹3.9 Lakhs" },
      { id: "ags", name: "Aatmanirbhar Gujarat Scheme", photo: "subsidy-3.jpg", logo: "logo-gujarat.png", tag: "State Government", level: "state", value: "Up to ₹3.9 Lakhs" },
    ],
  },

  help: { title: ["Need help?", "We’re here for you"], cta: "Request a Call" },

  nav: [
    { id: "home", label: "Home", icon: "nav-home" },
    { id: "business", label: "Business", icon: "nav-business" },
    { id: "finance", label: "Finance", icon: "nav-finance-on" },
    { id: "grow", label: "Grow", icon: "nav-grow" },
  ],

  // AI Mitra sheet — proposed copy (the frame shows only the button). Questions carried from the kit.
  mitra: {
    nudge: { lead: "Ask me about", topic: "loans & subsidies" },
    hello: "Hi! I’m AI Mitra",
    sub: "Ask anything about loans, subsidies or your CMR score.",
    prompts: [
      "Which working capital loan should I apply for?",
      "How much of my ₹50 L limit should I borrow?",
      "Which subsidies does my business qualify for?",
      "What would improve my CMR score?",
    ],
    placeholder: "Ask AI Mitra…",
    reply: "In the app I’d answer here, with lenders and schemes matched to your business. Replies aren’t part of this prototype.",
  },

  // Placeholder screens for tabs that aren't built
  tabs: {
    home: { title: "Home", body: "Your business at a glance lives here." },
    business: { title: "Business", body: "Invoices, GST and your shop profile live here." },
    grow: { title: "Grow", body: "Courses, schemes and buyer leads live here." },
  },

  next: {
    bell: "Notifications", help: "Help & support", profile: "Your profile",
    explore: "Explore Loans", exploreSubs: "Explore Subsidies", cmr: "CMR score", track: "Track Loans", debt: "Debt Snapshot", emi: "View EMIs",
    loans: "All loan matches", loan: "Loan details", subsidies: "All subsidies", subsidy: "Subsidy details", call: "Request a call",
  },
};
