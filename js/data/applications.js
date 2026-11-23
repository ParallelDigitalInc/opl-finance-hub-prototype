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

  /* KFS reader — Figma 416:43474 (page 1, locked) + 416:43604 (page 4, read to end).
     Pages 1, 2 and 4 are verbatim. Page 3 (Annex A) is NOT drawn in Figma: rows 13–17 on
     page 2 point to it, so it is ASSUMED here (flagged in README). Lender text other than
     Citi reuses the Citi template with the lender's name — ASSUMED. */
  OPL.data.kfsDoc = {
    step: "Step 1 of 2 · Accept KFS",
    end: "End of Key Fact Statement",
    consent: "I have read and understood the<br>Key Fact Statement",
    hint: "Read to the last page to accept",
    cta: "Accept KFS",
    letterhead: { "pick-citi": "Citi Bank N.A. · Commercial Bank" },
    pages: (l) => [
      {
        title: "Key Fact Statement",
        meta: "Loan no. LA-2026-11-2231 · Issued 22 Nov 2026 · Valid till 25 Nov 2026",
        part: "Part 1 · Interest rate and fees/charges",
        rows: [
          [1, "Loan proposal / account no.", "LA-2026-11-2231"],
          [2, "Type of loan", "Working capital term loan"],
          [3, "Sanctioned loan amount", "₹45,00,000"],
          [4, "Disbursal schedule", "100% upfront"],
          [5, "Loan term", "36 months"],
          [6, "Instalments", "36 EMIs of ₹1,44,043"],
          [7, "First instalment due", "5 Jan 2027"],
          [8, "Interest rate (floating)", "9.45% p.a."],
          [9, "Reference benchmark", "RBLR"],
          [10, "Processing fee", "₹67,500 (incl. GST)"],
          [11, "Annual Percentage Rate (APR)", "10.54%"],
          [12, "Total interest payable", "₹6,85,548"],
        ],
        note: "APR is the yearly cost of credit to the borrower, including the interest rate and all fees and charges. Figures are computed on the sanctioned amount.",
      },
      {
        part: "Part 1 (continued) · Contingent charges",
        rows: [
          [13, "Penal charges, if any", "See Annex A"],
          [14, "Cheque / NACH bounce", "See Annex A"],
          [15, "Foreclosure / prepayment", "See Annex A"],
          [16, "Switch from floating to fixed rate", "See Annex A"],
          [17, "Other charges", "See Annex A"],
        ],
      },
      {
        assumed: true,   // not in Figma
        part: "Annex A · Contingent charges",
        rows: [
          [13, "Penal charges, if any", "2% p.a. on the overdue instalment"],
          [14, "Cheque / NACH bounce", "₹500 per instance + GST"],
          [15, "Foreclosure / prepayment", "Nil (floating rate)"],
          [16, "Switch from floating to fixed rate", "0.5% of principal outstanding"],
          [17, "Other charges", "Stamp duty as per state law"],
        ],
      },
      {
        part: "Part 2 · Other qualitative information",
        rows: [
          [1, "Recovery agents", "Engaged only as per RBI guidelines. List on the lender’s website."],
          [2, "Grievance redressal officer", `Nodal Officer, ${l.name}, Mumbai · nodal.officer@${l.slug}.example`],
          [3, "Cooling-off / look-up period", "3 days from disbursal, no penalty"],
          [4, "Loan servicing agent", `${l.name} (no LSP)`],
        ],
        ack: {
          title: "Borrower acknowledgement",
          text: "I confirm that I have read and understood this Key Fact Statement, and that its contents were explained to me in a language I understand.",
          lines: ["Borrower signature", "Date"],
          foot: "To be signed electronically through OPL.",
        },
      },
    ],
  };

  /* Group E · NeSL signing (Figma 433:7980 → NeSL-Redirection ×6 → 416:82947 → 431:8486; resume 431:7803).
     The six NeSL frames are screenshots of the third-party portal (assets/lazy/nesl). Hotspot
     rects are in image px (390 × 723 image, placed under the 47px status bar). Frame fill is
     #F7FBFB behind every step except OTP (dim). */
  OPL.data.nesl = {
    sheet: {
      chip: "KFS accepted", step: "Step 2 of 2", title: "Sign your sanction letter on NeSL",
      steps: ["Verify OTP", "Read the Sanction Letter", "Confirm e-stamp", "eSign with Aadhaar"],
      note: "Sign sanction letter before 25 Nov 2026",
      cta: "Continue to NeSL", later: "I’ll come back later",
    },
    portal: [
      { id: "redirect", figma: "433:8115", auto: 1800 },
      { id: "otp", figma: "416:83009", dim: true, next: [138, 464, 52, 34], cancel: [202, 464, 54, 34] },   // frame fill #676D8E, white status bar
      { id: "agreement", figma: "416:83028", next: [8, 16, 374, 488], cancel: [176, 591, 56, 32] },
      { id: "estamp", figma: "416:83058", next: [166, 443, 58, 70] },
      { id: "method", figma: "416:83077", next: [164, 700, 62, 23] },
      { id: "aadhaar", figma: "416:83101", next: [198, 321, 183, 46] },
    ],
    confirm: {
      figma: "416:82947", wait: 2400,
      title: "Confirming your signature",
      sub: "Checking with NeSL. This takes a few seconds.",
      foot: "Do not press back, or close the application",
    },
  };

  // Application states after the KFS (sign = left before signing 431:7803, signed = 431:8486)
  Object.assign(OPL.data.applications, {
    sign: {
      title: "Sign Sanction Letter",
      step3: "Review KFS and Sanction Letter",
      step3Sub: "KFS accepted on 24 Nov · Sign by 25 Nov",
      cta: "Sign on NeSL",
    },
    signed: {
      title: "Sanction Letter Signed",
      step3: "Review KFS and Sanction Letter",
      step3Sub: "Signed on NeSL, 24 Nov",
      summaryTitle: "Sanction Summary",
      aprChip: "Same as KFS",
      rows: [
        ["Sanction letter no.", "SL/SRT/2026/1187"],
        ["Sanction date", "24 Nov 2026"],
        ["Final Loan Amount", "₹44,32,500"],
        ["Security", "Collateral-free · CGTMSE cover"],
        ["Money in", "3–4 working days after KYC"],
      ],
      sheet: {
        title: "Sanction letter signed",
        body: (name) => `${name} will reach out to you for<br>next steps on money disbursal.`,
        rows: [["Final Loan Amount", "₹44,32,500"], ["Into account", "•••• 4521"], ["Money in", "3–4 working days"]],
        cta: "View application", done: "Done",
      },
    },
  });

  // Group F · disbursal (Figma 435:8001 waiting, 435:8572 received + "Disbursed" milestone sheet)
  Object.assign(OPL.data.applications, {
    disbursing: {
      title: "Money on Its Way",
      sub: "Expected by 30 Nov",
      step4: "Money Disbursal",
      step4Sub: (name) => `${name} is processing the disbursal`,
      note: (name) => `${name} may call you to confirm details before disbursal of final loan amount.`,
      // cell borders exactly as drawn: b = bottom, r = right (435:8181)
      card: { label: "Final Loan Amount", value: "₹44,32,500", tex: 0.2,
        rows: [[{ l: "Expected by", v: "30 Nov", b: 1 }], [{ l: "Monthly EMI", v: "₹1,44,043" }, { l: "First EMI", v: "5 Jan 2027", r: 1 }]] },
    },
    disbursed: {
      title: "Money Received",
      step4: "Money in Account",
      step4Sub: "Received on 27 Nov",
      note: (name) => `${name} may call you to confirm details before sending the money.`,
      card: { label: "Final Loan Amount", value: "₹44,32,500", tex: 0.3,
        rows: [[{ l: "Into account", v: "•••• 4521", b: 1, r: 1 }, { l: "Received on", v: "27 Nov", b: 1 }], [{ l: "First EMI", v: "5 Jan 2027", r: 1 }, { l: "Monthly EMI", v: "₹1,44,043" }]] },
      sheet: {
        eyebrow: "Money disbursed to your account", amount: "₹44,32,500",
        rows: [["Monthly EMI", "₹1,44,043"], ["First EMI", "5 Jan 2027"], ["Number of EMIs", "36"]],
        cta: "View my loan", done: "Done",
      },
    },
    disbursalTitle: "Disbursal Details",
    docs: [{ label: "Signed sanction letter", goto: "sanction-letter" }, { label: "Key Fact Statement", goto: "kfs-document" }],
    // live demo after the signed sheet closes (prototype timing): → Money on its way → Money received
    demo: { toDisbursing: 3500, toDisbursed: 6000 },
  });
})();
