/* CIBIL MSME Rank sheet (proposed, not in Figma). Opens from Home → "CMR score" and
   Loans overview → "CMR - 2". Rank, date and needle angle come from the desktop card
   (476:200254). Credit-line numbers are the Loans overview "Your Borrowing" card
   (₹14.70 L used of ₹33 L). Repayment months, enquiry count and credit age are sample
   values: swap in the business's CIBIL report fields when OPL wires the data. */
(function () {
  OPL.data = OPL.data || {};

  OPL.data.cmr = {
    title: "CIBIL MSME Rank",
    updated: "Updated 25 Sep 2026",
    rank: 2,
    angle: 31.8,                     // needle as drawn on desktop, degrees up from rank 1
    risk: "Low risk",
    verdict: "Lenders read ranks 1 to 3 as low risk. You're one rank from the best.",

    factorsTitle: "What shapes your rank",
    factorsHint: "Tap a card to see why",
    // Tiles, CRED-style: one figure each. Paired by impact (high · medium · low, full width).
    // to/suffix drive the count-up; detail is the back of the card.
    factors: [
      { id: "repay", icon: "repay", to: 100, suffix: "%", caption: "EMIs paid on time",
        status: "good", label: "Excellent", impact: "High impact",
        detail: "No missed EMI in 24 months. Lenders weigh this the most: one EMI paid 30+ days late can cost you a rank." },
      { id: "usage", icon: "usage", to: 45, suffix: "%", caption: "Credit line in use",
        status: "fair", label: "Fair", impact: "High impact", meter: { target: 30 },
        detail: "₹14.70 L of your ₹33 L limit. Under 30% reads as headroom; near the limit reads as stretched cash flow." },
      { id: "enquiry", icon: "enquiry", to: 3, suffix: "", caption: "Loan enquiries in 90 days",
        status: "fair", label: "Fair", impact: "Medium impact",
        detail: "Every application adds one. Several close together can look like urgent need for cash." },
      { id: "age", icon: "age", to: 6, suffix: " yrs", caption: "Age of your oldest loan",
        status: "good", label: "Good", impact: "Medium impact",
        detail: "A long, steady record gives lenders more to go on. Keep older accounts open." },
      { id: "mix", icon: "mix", to: 2, suffix: " types", caption: "Term loans and a credit line",
        status: "good", label: "Good", impact: "Low impact", wide: true,
        detail: "Handling both fixed EMIs and a revolving limit well shows you can manage different kinds of credit." },
    ],

    pathTitle: "Your path to CMR-1",
    lead: {
      icon: "tip-paydown", tag: "Biggest lift",
      title: "Bring credit line use to 30%",
      body: "Pay ₹4.80 L of the ₹14.70 L you've drawn. Usage falls from 45% to 30% of your ₹33 L limit.",
      from: 45, to: 30,
      link: { label: "View credit line", goto: "my-loans" },
    },

    note: "Checking your rank here doesn't change it. CIBIL refreshes it every month.",
    cta: { label: "See loans for CMR-2", goto: "loan-offers" },
  };
})();
