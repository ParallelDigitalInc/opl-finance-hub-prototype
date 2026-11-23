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

  /* ------------------------------------------------------------------------
     Benefit sheets — section "Benefit sheets" 416:47994 (each sheet over the
     collapsed screen with the 45% scrim). Copy verbatim from the frames.
     rates.activities → Activity switch (149:197); rates.groups → grouped rate
     lists (Payroll). conditions: { text, exclude } → Sheet / Condition 160:1390.
     ------------------------------------------------------------------------ */
  const ACT1 = "Activity 1: garments, apparel, made-ups and technical textiles.";
  const ACT2 = "Activity 2: weaving, knitting, dyeing and processing, texturising, twisting, embroidery and MMF spinning.";
  const CAT1 = "Category 1 and PM MITRA Park";

  OPL.data.subsidyDetail.sheets = {
    capital: {
      figma: { 1: "416:47995", 2: "416:48787" },
      title: "Capital subsidy",
      hero: { icon: "hero-settings", value: "10–35%", label: "of eFCI" },
      note: "eFCI is Eligible Fixed Capital Investment: new building, plant and machinery. Land is not counted.",
      facts: [
        { icon: "fact-safe-square", label: "Limit", value: "₹40 Cr to ₹100 Cr" },
        { icon: "fact-calendar", label: "Paid in", value: "5 equal annual instalments" },
      ],
      rates: {
        activities: [
          { label: "Activity 1", note: ACT1, rows: [[CAT1, "35%", "up to ₹100 Cr"], ["Category 2", "30%", "up to ₹100 Cr"], ["Category 3", "20%", "up to ₹50 Cr"]] },
          { label: "Activity 2", note: ACT2, rows: [[CAT1, "20%", "up to ₹50 Cr"], ["Category 2", "18%", "up to ₹50 Cr"], ["Category 3", "10%", "up to ₹40 Cr"]] },
        ],
      },
      conditions: [
        { text: "Only for units with a term loan from a bank or financial institution." },
        { text: "Paid after commercial production starts." },
      ],
      apply: true,
    },
    interest: {
      figma: { 1: "416:49579", 2: "416:50370" },
      title: "Interest subsidy",
      hero: { icon: "hero-sale", value: "5–7%", label: "on term loan" },
      facts: [
        { icon: "fact-safe-square", label: "Limit", value: "2% to 3% of eFCI a year" },
        { icon: "fact-calendar", label: "Period", value: "5 to 8 years" },
      ],
      rates: {
        activities: [
          { label: "Activity 1", note: ACT1, rows: [[CAT1, "7% for 8 years", "up to 3% of eFCI a year"], ["Category 2", "7% for 8 years", "up to 2.5% of eFCI a year"], ["Category 3", "5% for 6 years", "up to 2% of eFCI a year"]] },
          { label: "Activity 2", note: ACT2, rows: [[CAT1, "7% for 7 years", "up to 2% of eFCI a year"], ["Category 2", "7% for 7 years", "up to 2% of eFCI a year"], ["Category 3", "5% for 5 years", "up to 2% of eFCI a year"]] },
        ],
      },
      conditions: [
        { text: "You bear at least 2% interest." },
        { text: "Paid back on the interest you have paid to the lender." },
      ],
      apply: true,
    },
    power: {
      figma: { 1: "416:51161" },
      title: "Power tariff subsidy",
      hero: { icon: "hero-bolt", value: "₹1/kWh", label: "per unit" },
      facts: [{ icon: "fact-calendar", label: "Period", value: "5 years from commercial production" }],
      conditions: [
        { text: "For power from the DISCOM, or renewable power through open access." },
        { text: "Power from your own captive plant is not covered.", exclude: true },
      ],
      apply: false,
    },
    payroll: {
      figma: { 1: "416:51939" },
      title: "Payroll assistance",
      hero: { icon: "hero-wallet", value: "Up to ₹5,000", label: "per worker a month" },
      facts: [
        { icon: "fact-users", label: "For", value: "Garment, apparel, made-ups and technical textile units" },
        { icon: "fact-calendar", label: "Period", value: "5 years from commercial production" },
      ],
      rates: {
        groups: [
          { title: "Garment, apparel and made-ups", rows: [["Female worker", "₹5,000", "a month"], ["Male worker", "₹4,000", "a month"]] },
          { title: "Technical textile", rows: [["Female worker", "₹3,000", "a month"], ["Male worker", "₹2,000", "a month"]] },
        ],
      },
      conditions: [{ text: "For workers domiciled in Gujarat and registered under EPF." }],
      apply: false,
    },
    shg: {
      figma: { 1: "416:52730" },
      title: "SHG job work assistance",
      hero: { icon: "hero-case", value: "₹5,000", label: "per member a month" },
      facts: [
        { icon: "fact-academic-cap", label: "Training", value: "₹5,000 per member a month, for 3 months" },
        { icon: "fact-wallet", label: "Payroll", value: "25% of job work value, up to ₹5,000 per member a month, for 5 years" },
      ],
      conditions: [
        { text: "For SHGs with 25 or more women who do job work for the unit." },
        { text: "The unit pays the SHG and claims it back." },
      ],
      apply: true,
    },
    quality: {
      figma: { 1: "416:53511" },
      title: "Quality certification",
      hero: { icon: "hero-diploma", value: "50%", label: "of fee and testing equipment cost" },
      facts: [
        { icon: "fact-safe-square", label: "Limit", value: "₹10 L" },
        { icon: "fact-calendar", label: "Period", value: "During the policy period" },
      ],
      conditions: [
        { text: "For national and international certifications such as BIS, ISI, WHO-GMP and Hallmark." },
        { text: "Renewals are not covered.", exclude: true },
      ],
      apply: true,
    },
    energy: {
      figma: { 1: "416:54292" },
      title: "Energy and water saving",
      hero: { icon: "hero-waterdrops", value: "75%", label: "of audit cost" },
      facts: [
        { icon: "fact-clipboard-check", label: "Audit", value: "75% of cost, up to ₹50,000 an audit, once" },
        { icon: "fact-box", label: "Equipment", value: "25% of cost, up to ₹20 L, once" },
      ],
      conditions: [
        { text: "The audit has to come from a recognised institution or consultant." },
        { text: "Equipment support needs a 10% saving in energy or water use." },
      ],
      apply: true,
    },
    tech: {
      figma: { 1: "416:55073" },
      title: "Technology acquisition",
      hero: { icon: "hero-cpu", value: "65%", label: "of technology cost" },
      facts: [
        { icon: "fact-safe-square", label: "Limit", value: "₹50 L, including royalty for the first 2 years" },
        { icon: "fact-calendar", label: "Period", value: "During the policy period" },
      ],
      conditions: [
        { text: "Needs prior approval from the Industries Commissionerate." },
        { text: "Plant, machinery and equipment purchases are not covered.", exclude: true },
      ],
      apply: true,
    },
  };
  OPL.data.subsidyDetail.sheetActions = {
    expert: { label: "Talk to an Expert", goto: "expert" },
    apply: { label: "Apply Now", goto: "application-portal" },
  };
})();
