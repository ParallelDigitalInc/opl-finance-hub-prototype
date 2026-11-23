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

    borrowing: {
      title: "Your Borrowing",
      card: {
        total: { label: "Total outstanding", value: "₹64.92 L" },
        legend: [
          { dot: "dot-indigo", label: "Loans on EMI", value: "₹50.22 L" },
          { dot: "dot-green", label: "Credit line used", value: "₹14.70 L" },
        ],
        available: { label: "Credit line available", value: "₹18.30 L", unit: "of ₹33 L" },
        goto: "my-loans",
      },
    },

    help: OPL.data.home.help,
    aiNudge: { lead: "Ask anything about", topic: "your loans" },

    nav: [
      { id: "overview", label: "Overview", icon: "widget", iconActive: "widget-active", goto: "loans-overview" },
      { id: "loan-offers", label: "Offers", icon: "banknote-2" },
      // "Track Loans" on the application screens (nav 440:132239); this frame (382:36150)
      // still says "Applications", so Loans overview overrides the label (overviewLabel).
      { id: "applications", label: "Track Loans", overviewLabel: "Applications", icon: "clipboard-list", iconActive: "clipboard-list-active" },
      { id: "my-loans", label: "My Loans", icon: "wallet-2" },
    ],
  };
})();
