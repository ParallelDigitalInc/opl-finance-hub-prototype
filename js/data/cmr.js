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
    factorsSub: "From your CIBIL report, biggest effect first",
    factors: [
      { id: "repay", icon: "repay", name: "Repayment history", value: "No missed EMI in 24 months",
        status: "good", label: "Excellent", impact: "High impact",
        why: "Lenders weigh this the most. One EMI paid 30+ days late can move you down a rank." },
      { id: "usage", icon: "usage", name: "Credit line usage", value: "₹14.70 L of ₹33 L used",
        status: "fair", label: "Fair", impact: "High impact",
        why: "Using most of your limit reads as stretched cash flow. Under 30% reads as headroom.",
        meter: { now: 45, target: 30, nowLabel: "45% used", targetLabel: "Aim for 30%" } },
      { id: "enquiry", icon: "enquiry", name: "New loan enquiries", value: "3 in the last 90 days",
        status: "fair", label: "Fair", impact: "Medium impact",
        why: "Every application adds an enquiry. Several close together can look like urgent need for cash." },
      { id: "age", icon: "age", name: "Credit age", value: "Oldest loan: 6 years",
        status: "good", label: "Good", impact: "Medium impact",
        why: "A long, steady record gives lenders more to go on. Keep older accounts open." },
      { id: "mix", icon: "mix", name: "Credit mix", value: "Term loans + credit line",
        status: "good", label: "Good", impact: "Low impact",
        why: "Handling different kinds of credit well shows you can manage both fixed EMIs and a revolving limit." },
    ],

    pathTitle: "Your path to CMR-1",
    lead: {
      icon: "tip-paydown", tag: "Biggest lift",
      title: "Bring credit line use to 30%",
      body: "Pay ₹4.80 L of the ₹14.70 L you've drawn. Usage falls from 45% to 30% of your ₹33 L limit.",
      from: 45, to: 30,
      link: { label: "View credit line", goto: "my-loans" },
    },
    steps: [
      { icon: "tip-wait", title: "Let Citi decide before you apply again",
        body: "Your Citi application is in progress. A new one now adds a fourth enquiry." },
      { icon: "tip-autopay", title: "Put every EMI on autopay",
        body: "On-time repayment is your strongest factor. Autopay keeps the record clean." },
    ],

    note: "Checking your rank here doesn't change it. CIBIL refreshes it every month.",
    cta: { label: "See loans for CMR-2", goto: "loan-offers" },
  };
})();
