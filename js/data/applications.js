/* Content for the Loan Applications flow — Figma section "Loan Applications" 416:122660.
   A Apply to 2–3: 382:40705 (compare) + 382:40870 (sheet) · B Apply to one: 382:41357
   C Track: list 382:41059/382:41602 · verifying detail 382:42423 · approved sheet 416:43921
   · KFS-ready detail 382:42689.
   Copy is verbatim. Lender-specific details exist in Figma for SIDBI (verifying) and Citi
   (KFS ready); other lenders reuse those templates with their name — ASSUMED, flagged. */
(function () {
  OPL.data = OPL.data || {};

  OPL.data.apply = {
    titleMany: (n) => `Proceed applying to ${n} lenders?`,
    titleOne: (name) => `Proceed applying to ${name} loan?`,
    notes: [
      "Each lender runs a full credit check and verification",
      "A separate application goes to each lender at the same time. You can accept the KFS of only one of them this month.",
    ],
    consent: (names) => `I agree to share my business, GST, bank and bureau details with ${names} for this application.`,
    submit: (n) => (n === 1 ? "Submit application" : `Submit ${n} applications`),   // Figma's single sheet says "Submit 2 applications" — adapted
    cancel: "Cancel",
  };

  OPL.data.applications = {
    title: (n) => `Track Loan Applications (${n})`,
    note: "You can accept one KFS this month.<br>The other application closes when you do.",
    // Figma state of the list (382:41059): SIDBI verifying, Citi KFS ready
    figmaPreset: [{ id: "offer-sidbi", status: "verifying" }, { id: "pick-citi", status: "kfs" }],
    sentAt: "22 Nov, 11:40 am",
    verifiedOn: "Verified on 24 Nov",

    // Tints of the lender band on these screens (SIDBI #F4F7E4 is new here)
    tints: { "offer-sidbi": "#f4f7e4", "pick-sidbi": "#f4f7e4", "pick-citi": "var(--tint-blue)" },

    // Verifying template (SIDBI, 382:42423)
    verifying: {
      title: (name) => `${name} is verifying your application`,
      cardNote: (name) => `${name} may call you and visit your unit. This usually takes 5 to 7 working days. We will notify you.`,
      progress: "In progress · Takes ~5 to 7 working days",
      todo: "Final offer & KFS Signing",
      expect: (name) => [`${name} will call you on ••••6789.`, "They may visit your unit on Ring Road, Surat."],
      docs: ["Latest stock statement", "Partner KYC (Aadhaar, PAN)", "Factory rent agreement"],
      appNo: "LA-2026-11-2232",
    },

    // KFS-ready template (Citi, 382:42689 + list card 382:41093 + sheet 416:44065)
    kfs: {
      title: "Review KFS and Sanction Letter",
      daysLeft: "2 days left",
      cardNote: "Sign the KFS and sanction letter before 25 Nov ‘26",
      approvedTitle: (name) => `${name} approved your loan`,
      approvedBody: "Your final offer is ready. Read the Key Fact Statement, then accept the offer to sign.",
      approvedNote: "Accept and sign before 25 Nov 2026.",
      finalOffer: "₹45 L",
      summary: {
        apr: "10.54%",
        loanAmount: "₹45,00,000", tenure: "36", rate: "9.45%", emi: "₹1,44,043",
        repay: "₹51,85,548",
        split: [
          { label: "Final Loan Amount", value: "₹44,32,500", w: 268.401, color: "#3858e5", dot: "dot-primary" },
          { label: "Interest", value: "₹6,85,548", w: 41.512, color: "#14b8a6", dot: "dot-teal" },
          { label: "Processing fee", value: "₹67,500", w: 4.087, color: "#ffbb00", dot: "dot-yellow" },
        ],
        facts: ["Floating rate", "No collateral", "3-day cooling-off"],
      },
      cta: "Review Full KFS & Accept",
    },

    branch: (lenderSlug) => ({ phone: "0261 2345 678", email: `ringroad.surat@${lenderSlug}.example` }),
    whatsapp: "Get WhatsApp updates",
    withdraw: "Withdraw application",
    aiNudge: { lead: "Ask anything about", topic: "your application" },
  };
})();
