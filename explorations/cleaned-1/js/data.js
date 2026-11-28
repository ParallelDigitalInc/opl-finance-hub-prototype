/* Cleaned up 1 — copy and figures, verbatim from Figma frame "1" in "Old Cleaned Up" (172:56049) unless marked proposed. */
window.OPL_F1 = {
  header: { title: "Loans" },

  promo: {
    eyebrow: "Get a loan up to",
    amount: 50, unit: "Lakhs",
    facts: [["From", "9.45% p.a."], ["", "7 offers"]],   // the frame's two chips under the figure: dark lead-in, teal value
    cta: "Explore Loans",
    // The frame's pager shows two dots: Citi in front, Bank of Baroda behind.
    cards: [
      { id: "citi", name: "Citi Bank", product: "Working Capital Loan", logo: "logo-citi.png" },
      { id: "bob", name: "Bank of Baroda", product: "Working Capital Loan", logo: "logo-bob.png" },
    ],
  },

  // Second hero slide, as in the kit's home (Figma 382:33823) — proposed; the frame draws the loans slide only.
  // Cards are the page's own Key Subsidies, tinted the way the lender cards are.
  promoSubs: {
    eyebrow: "Get assistance up to",
    amount: 1, unit: "Crore",
    facts: [["", "8 schemes"], ["", "Central & State"]],   // proposed: the frame draws the loans slide only
    cta: "Explore Subsidies",
    cards: [
      { id: "mcls", name: "MSME Competitive Lean Scheme", product: "Central Government", logo: "logo-msme.png", ring: true, brand: "217,119,6", wash: "#fdf1dc", soft: "#f4cd8c", softer: "#fcebcb" },
      { id: "gtp", name: "Gujarat Textile Policy 2024", product: "State Government", logo: "logo-gujarat.png", ring: true, brand: "37,99,235", wash: "#dfe8fd", soft: "#a9c2fa", softer: "#dde6fd" },
      { id: "ags", name: "Aatmanirbhar Gujarat Scheme", product: "State Government", logo: "logo-gujarat.png", ring: true, brand: "21,128,61", wash: "#ddf2e4", soft: "#a2d6b3", softer: "#d8efdf" },
    ],
  },

  // two-line labels, broken where the frame breaks them
  quick: [
    { id: "cmr", label: "CMR<br>score", icon: "qa-cmr" },
    { id: "track", label: "Track<br>Loans", icon: "qa-track" },
    { id: "debt", label: "Debt<br>Snapshot", icon: "qa-debt" },
    { id: "emi", label: "View<br>EMIs", icon: "qa-emi" },
  ],

  loans: {
    title: "Top loan matches",
    // The frame's second card tab reads "Working Capital Loan" in blue, repeating the product line (copy slip); both read Collateral-free here.
    cards: [
      { id: "citi", name: "Citi Bank", product: "Working Capital Loan", logo: "logo-citi.png", tag: "Collateral-free", amount: "₹50 Lakhs", rate: "9.45%", tint: "#e7f0fb" },
      { id: "bob", name: "Bank of Baroda", product: "Working Capital Loan", logo: "logo-bob.png", tag: "Collateral-free", amount: "₹50 Lakhs", rate: "9.45%", tint: "#fdebe3" },
    ],
  },

  subsidies: {
    title: "Top subsidy matches", total: 8,
    // filter chips, as in the frame (its hidden "All" chip is left out); Quality & Lean carries a count of 3
    chips: [
      { id: "machinery", label: "Machinery", icon: "chip-machinery" },
      { id: "tech", label: "Technology", icon: "chip-tech" },
      { id: "quality", label: "Quality & Lean", icon: "chip-quality", count: 3 },
    ],
    // The frame repeats one card three times (MSME scheme, machinery photo, "State Government"). The first card keeps the
    // frame's photo; the other two are the page's other schemes. Tags follow each scheme's real level, so MSME reads Central.
    cards: [
      { id: "mcls", name: "MSME Competitive Lean Scheme", lines: "MSME Competitive<br>Lean Scheme", photo: "subsidy-mach.jpg", logo: "logo-msme.png", tag: "Central Government", level: "central", value: "Up to ₹2.4 Lakhs" },
      { id: "gtp", name: "Gujarat Textile Policy 2024", photo: "subsidy-2.jpg", logo: "logo-gujarat.png", tag: "State Government", level: "state", value: "Up to ₹3.9 Lakhs" },
      { id: "ags", name: "Aatmanirbhar Gujarat Scheme", photo: "subsidy-3.jpg", logo: "logo-gujarat.png", tag: "State Government", level: "state", value: "Up to ₹3.9 Lakhs" },
    ],
    cta: "Check Details",
  },

  help: { title: ["Need help?", "We’re here for you"], cta: "Request a Call" },

  // Loans module nav, as in the frame. "finance" is this page (Overview), so the shared tab logic keeps working.
  nav: [
    { id: "finance", label: "Overview", icon: "nav-overview" },
    { id: "offers", label: "Offers", icon: "nav-offers" },
    { id: "track", label: "Track Loans", icon: "nav-track" },
    { id: "myloans", label: "My Loans", icon: "nav-myloans" },
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
    offers: { title: "Offers", body: "Every loan offer matched to your business lives here." },
    track: { title: "Track Loans", body: "Your applications and where each one stands live here." },
    myloans: { title: "My Loans", body: "Active loans, EMIs and repayments live here." },
  },

  next: {
    back: "Back", search: "Search", help: "Help & support", chip: "Filtering subsidies",
    explore: "Explore Loans", exploreSubs: "Explore Subsidies", cmr: "CMR score", track: "Track Loans", debt: "Debt Snapshot", emi: "View EMIs",
    loans: "All loan matches", loan: "Loan details", subsidies: "All subsidies", subsidy: "Subsidy details", call: "Request a call",
  },
};
