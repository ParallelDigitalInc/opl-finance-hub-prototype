/* Content for Loans overview — verbatim from Figma 382:36150 ("Loans overview").
   Reached from Home → hero "Explore Loans". */
(function () {
  OPL.data = OPL.data || {};

  OPL.data.loansOverview = {
    header: {
      title: "Loans",
      actions: [
        { icon: "magnifer-zoom-in-linear", label: "Search", goto: "loan-search" },
        { icon: "headphones-round-sound-linear", label: "Support", goto: "support" },
      ],
    },

    limit: { eyebrow: "Safe borrowing limit", prefix: "Up to ₹", value: 50, suffix: " Lakhs" },
    cmr: { label: "CMR - 2", risk: "Low risk", goto: "cmr-score" },

    // Same lenders as Home's "Top loan matches" (382:36191, 382:36217)
    offers: [
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
        // Third card on request (23 Nov) — same Axis offer as Home / Loan offers 382:35360
        kind: "loan", tag: "Collateral-free", tint: "var(--tint-pink)", logo: "axis",
        title: "Axis Bank", subtitle: "Working Capital Loan",
        figures: [{ label: "Loan up to", value: "₹50 L" }, { label: "Interest", value: "9.45%", unit: "p.a." }],
        detail: "pick-axis",
      },
    ],
    offersCta: { label: "See all loans (7)", goto: "loan-offers" },

    applications: {
      title: "Your loan applications",
      card: {
        logo: "citiApp", name: "Citi Bank", product: "Working capital loan", tag: "2 days left",
        figures: [{ label: "Final offer", value: "₹45 L" }, { label: "Interest", value: "9.45%", unit: "p.a." }],
        steps: [
          { icon: "plain-2", label: "Application<br>Sent", state: "done" },
          { icon: "buildings", label: "Lender Verification", state: "done" },
          { icon: "document-text", label: "Sign KFS<br>and Sanction", state: "action" },
        ],
        cta: "Review KFS",
        ctaAttrs: 'data-app-open="pick-citi"',   // → Application detail, KFS ready (382:42689)
      },
    },

    /* Debt Profile (570:105880, was "Your Borrowing") — Shreya's design, numbers corrected.
       Figma's rows didn't reconcile (Working Capital repeated ₹50.22 L, so rows summed to
       ₹1.15 Cr against ₹64.92 L; Free Credit Limit read ₹8.5 L; the donut was the old 2-part
       one). Now, in lakh: loans on EMI ₹50.22 L = term ₹36.50 L + working capital ₹13.72 L;
       cash credit ₹14.70 L drawn of a ₹33 L limit (as in the CMR sheet), so ₹18.30 L is free.
       Total outstanding = the three owed parts. The donut is all your credit: the owed parts
       in colour, the free limit in pale blue. Colours = the Figma legend dots. */
    debt: {
      title: "Debt Profile",
      link: { label: "View Debt Profile", goto: "my-loans" },
      totalLabel: "Total outstanding",
      parts: [
        { id: "term", label: "Term Loans (2)", lakh: 36.5, color: "#4340d6" },
        { id: "wc", label: "Working Capital Loan (1)", lakh: 13.72, color: "#55c4da" },
        { id: "cc", label: "Cash Credit Lines (1)", lakh: 14.7, color: "#af78d9" },
      ],
      free: { id: "free", label: "Free Credit Limit", of: "cc", limit: 33, color: "#c4d9f3" },
      // First as drawn; the rest rotate in (proposed), built from this card's own figures
      ai: ["Can I take another term loan?", "Which loan should I repay first?",
        "Should I draw my free ₹18.30 L?", "Is ₹64.92 L too much to owe?"],
    },

    help: OPL.data.home.help,
    aiNudge: { lead: "Ask anything about", topic: "your loans" },

    nav: [
      { id: "overview", label: "Overview", icon: "widget", iconActive: "widget-active", goto: "loans-overview" },
      { id: "loan-offers", label: "Offers", icon: "banknote-2", iconActive: "banknote-2-active" },   // active: Solar Banknote 2 Bold (same family as the other active tabs)
      // "Track Loans" on the application screens (nav 440:132239); this frame (382:36150)
      // still says "Applications", so Loans overview overrides the label (overviewLabel).
      { id: "applications", label: "Track Loans", overviewLabel: "Applications", icon: "clipboard-list", iconActive: "clipboard-list-active" },
      { id: "my-loans", label: "My Loans", icon: "wallet-2" },
    ],
  };
})();
