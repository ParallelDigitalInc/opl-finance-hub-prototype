/* ==========================================================================
   Data · Subsidy details — Gujarat Textile Policy 2024
   Figma GHuBkYGEQZvQppv3v55EaA, section "Subsidy Home - First Cut" 416:44852:
   collapsed 416:44853 · expanded 416:45617. Copy is verbatim from the frames.
   ========================================================================== */
(function () {
  OPL.data = OPL.data || {};

  OPL.data.subsidyDetail = {
    title: "Gujarat Textile Policy 2024",

    hero: {
      eyebrow: "Estimated benefits",
      prefix: "Up to ₹", value: 1.2, suffix: "Cr",
      cta: { label: "Calculate Estimate", goto: "subsidy-estimate" },   // flow 416:76869, not built yet
    },

    // Policy period / Widget 238:4515 — "compute it from today's date. Chip turns
    // to the warning style in the last 6 months."
    period: { start: "2024-10-01", end: "2029-09-30", warnMonths: 6 },

    benefits: {
      title: "Policy Benefits",
      count: 8,
      tiles: [
        { id: "capital", icon: "settings-duotone-benefit", title: "Capital Subsidy", value: "10–35%", label: "on eFCI" },
        { id: "interest", icon: "sale-duotone", title: "Interest Subsidy", value: "5–7%", label: "on term loan" },
        { id: "power", icon: "bolt-circle-duotone", title: "Power Tariff Subsidy", value: "₹1/kWh", label: "per unit" },
        { id: "payroll", icon: "wallet-money-duotone", title: "Payroll Assistance", value: "~₹5,000", label: "per worker a month" },
      ],
      others: {
        label: "See other benefits",
        count: 4,
        rows: [
          { id: "shg", icon: "case-round-duotone", title: "SHG job work assistance", sub: "₹5,000 per member a month" },
          { id: "quality", icon: "diploma-duotone", title: "Quality Certification", sub: "50% of fee and testing<br>equipment cost" },
          { id: "energy", icon: "waterdrops-duotone", title: "Energy and Water Saving", sub: "75% of audit cost" },
          { id: "tech", icon: "cpu-duotone", title: "Technology Acquisition", sub: "65% of technology cost" },
        ],
      },
    },

    apply: {
      title: "Apply",
      help: { title: ["Get help from", "our subsidy expert"], cta: "Talk to an Expert", goto: "expert" },
      links: [
        { icon: "document-add-duotone", title: "Application portal", sub: "Apply online", goto: "application-portal" },
        { icon: "global-duotone", title: "Official policy website", sub: "Read the full policy", goto: "policy-website" },
      ],
    },

    // How it works / Accordion 141:21242 + How it works / Step 137:21194
    steps: {
      title: "How it works",
      headerDeadline: "Apply within 1 year of production",       // collapsed header chip (416:45566)
      items: [
        { title: "Start commercial production", deadline: "Apply within 1yr of production" },
        {
          title: "Apply for an eligibility certificate",
          body: "Your CA and a Chartered Engineer certify your investment.",
          inset: {
            title: "Apply at",
            rows: [
              { value: "District Industries Centre (DIC)", label: "If you invest up to ₹10 Cr" },
              { value: "MSME Commissioner", label: "If you invest ₹10 Cr to ₹50 Cr" },
            ],
          },
        },
        { title: "Get your investment verified", body: "Officials check the assets you invested in." },
        { title: "Receive your sanction", body: "You get an eligibility certificate for the approved amount." },
      ],
      share: "Share these steps with my CA",
    },

    foot: {
      secondary: { label: "Apply Now", goto: "application-portal" },
      primary: { label: "Talk to an Expert", goto: "expert" },
      note: "Estimates are indicative. The final amount depends on policy terms and department procedures.",
    },

    aiNudge: { lead: "Ask anything about", topic: "this policy" },   // proposed, same pattern as Home
  };
})();
