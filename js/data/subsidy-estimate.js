/* ==========================================================================
   Data · Calculate estimate — Figma section 416:76869
   Form 416:76872 (all open) / 416:77107 (one open) → result 416:77363.

   The estimate is calculated, not drawn: Figma's figures are placeholders
   (every header reads ₹87.5L and the breakdown doesn't add up to the total).
   Rates come from the Textile Policy benefit sheets (416:47994) at the
   "Up to" end: Category 1 / PM MITRA Park, Activity 1.
   Fields marked `proposed` are not in Figma; they exist so "Add more" works.
   ========================================================================== */
(function () {
  OPL.data = OPL.data || {};
  const CR = 1e7, L = 1e5;

  /* ---- money in / out ---------------------------------------------------- */
  // "₹20 Cr", "20cr", "1.5 crore", "8 L", "8 lakh", "50,000" → rupees.
  // A bare number uses the field's unit (Cr for loan / project cost).
  const parseMoney = (raw, unit = "inr") => {
    const s = String(raw || "").toLowerCase().replace(/[₹,\s]/g, "");
    const m = s.match(/^(\d*\.?\d+)(cr|crore|crores|l|lakh|lakhs|lac|k)?$/);
    if (!m) return NaN;
    const n = parseFloat(m[1]);
    const u = m[2] || unit;
    return n * (/^cr/.test(u) ? CR : /^(l|lakh|lac)/.test(u) ? L : u === "k" ? 1e3 : 1);
  };
  const parseNum = (raw) => {
    const s = String(raw || "").replace(/[,\s%]/g, "");
    return /^\d*\.?\d+$/.test(s) ? parseFloat(s) : NaN;
  };
  const trim = (n, d) => n.toFixed(d).replace(/\.?0+$/, "");
  const indian = (n) => Math.round(n).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  // ₹1.01 Cr · ₹52.5 L · ₹45,000. `tight` drops the space before the unit (card headers: "₹87.5L").
  const fmt = (r, { tight = false } = {}) => {
    const sp = tight ? "" : " ";
    if (!(r > 0)) return "₹0";
    if (r >= CR) return `₹${trim(Math.round(r / CR * 100 + 1e-9) / 100, 2)}${sp}Cr`;   // +ε: 1.005 Cr is ₹1.01 Cr, not ₹1 Cr
    if (r >= L) return `₹${trim(Math.round(r / L * 10 + 1e-9) / 10, 1)}${sp}L`;
    return `₹${indian(r)}`;
  };
  // tidy what was typed into a money field, on blur
  const tidyMoney = (raw, unit) => {
    const r = parseMoney(raw, unit);
    if (!(r > 0)) return raw;
    if (r >= CR) return `₹${trim(r / CR, 2)} Cr`;
    if (r >= L) return `₹${trim(r / L, 2)} L`;
    return `₹${indian(r)}`;
  };
  const tidyCount = (raw) => { const n = parseNum(raw); return n > 0 ? indian(n) : raw; };

  /* ---- interest subsidy on a reducing balance -----------------------------
     Subvention = min(7%, rate − 2%) ("you bear at least 2%"), for up to 8 years,
     on each year's opening balance of an annual-instalment loan; capped at
     3% of eFCI a year when the project cost is known. */
  const interestSubsidy = ({ loan, rate, tenure }, efci) => {
    const sv = Math.max(0, Math.min(7, rate - 2)) / 100;
    if (!(sv > 0) || !(tenure > 0)) return 0;
    const i = rate / 100, n = Math.round(tenure);
    const emi = loan * i / (1 - Math.pow(1 + i, -n));
    let bal = loan, total = 0;
    for (let y = 1; y <= Math.min(8, n); y++) {
      let year = sv * bal;
      if (efci > 0) year = Math.min(year, 0.03 * efci);
      total += year;
      bal = bal * (1 + i) - emi;
    }
    return total;
  };

  /* ---- the eight benefits ------------------------------------------------- */
  // color: Build-up bar segment + breakdown key (capital/interest/power from 416:77578;
  // the other five are proposed, taken from each benefit's own icon colours).
  const B = [
    {
      id: "capital", title: "Capital Subsidy", short: "Capital subsidy", chip: "Capital subsidy",
      icon: "settings-duotone-benefit", color: "linear-gradient(90deg, #3858E5, #667EEB)", key: "#3858E5",
      fields: [{ key: "cost", label: "Project Cost", kind: "money", unit: "cr", value: "₹1.5 Cr" }],
      calc: (v) => Math.min(0.35 * v.cost, 100 * CR),
    },
    {
      id: "interest", title: "Interest Subsidy", short: "Interest subsidy", chip: "Interest subsidy",
      icon: "sale-duotone", color: "#148FB8", key: "#148FB8",
      fields: [
        { key: "loan", label: "Term Loan Amount", kind: "money", unit: "cr", value: "₹20 Cr" },
        { key: "rate", label: "Interest Rate (%)", kind: "pct", value: "9.45" },
        { key: "tenure", label: "Tenure (yrs)", kind: "years", value: "15" },
      ],
      calc: (v, all) => interestSubsidy(v, all.capital && all.capital.cost),
    },
    {
      id: "power", title: "Power Tariff", short: "Power tariff subsidy", chip: "Power tariff",
      icon: "bolt-circle-24", color: "#66B814", key: "#66B814",
      fields: [{ key: "kwh", label: "Annual power consumption", kind: "count", placeholder: "Enter units consumed per year (kWh)", value: "" }],
      calc: (v) => v.kwh * 1 * 5,                           // ₹1/kWh for 5 years
    },
    {
      id: "payroll", title: "Payroll Assistance", short: "Payroll assistance", chip: "Payroll Assistance",
      icon: "wallet-money-duotone", color: "#C2410C", key: "#C2410C", proposed: true,
      fields: [
        { key: "female", label: "Women employed", kind: "count", placeholder: "Number of women workers", value: "" },
        { key: "male", label: "Men employed", kind: "count", placeholder: "Number of men workers", value: "", optional: true },
      ],
      calc: (v) => ((v.female || 0) * 5000 + (v.male || 0) * 4000) * 12 * 5,
    },
    {
      id: "shg", title: "SHG Job Work", short: "SHG job work assistance", chip: "SHG job work",
      icon: "case-round-duotone", color: "#CA8A04", key: "#CA8A04", proposed: true,
      fields: [{ key: "members", label: "SHG members", kind: "count", placeholder: "Women doing job work for you", value: "" }],
      calc: (v) => v.members * (5000 * 3 + 5000 * 12 * 5),  // training 3 months + payroll 5 years, at the cap
    },
    {
      id: "quality", title: "Quality Certification", short: "Quality certification", chip: "Quality certification",
      icon: "diploma-duotone", color: "#0D9488", key: "#0D9488", proposed: true,
      fields: [{ key: "cost", label: "Certification and testing cost", kind: "money", unit: "l", placeholder: "e.g. ₹8 L", value: "" }],
      calc: (v) => Math.min(0.5 * v.cost, 10 * L),
    },
    {
      id: "energy", title: "Energy and Water Saving", short: "Energy and water saving", chip: "Energy and water saving",
      icon: "waterdrops-duotone", color: "#0EA5E9", key: "#0EA5E9", proposed: true,
      fields: [
        { key: "audit", label: "Audit cost", kind: "money", unit: "inr", placeholder: "e.g. ₹60,000", value: "" },
        { key: "equipment", label: "Saving equipment cost", kind: "money", unit: "l", placeholder: "e.g. ₹40 L", value: "", optional: true },
      ],
      calc: (v) => Math.min(0.75 * v.audit, 50000) + Math.min(0.25 * (v.equipment || 0), 20 * L),
    },
    {
      id: "tech", title: "Technology Acquisition", short: "Technology acquisition", chip: "Technology acquisition",
      icon: "cpu-duotone", color: "#64748B", key: "#64748B", proposed: true,
      fields: [{ key: "cost", label: "Technology cost", kind: "money", unit: "l", placeholder: "e.g. ₹60 L", value: "" }],
      calc: (v) => Math.min(0.65 * v.cost, 50 * L),
    },
  ];

  OPL.data.subsidyEstimate = {
    title: "Calculate estimate",                    // 416:77107 (416:76872 reads "Calculate Estimate")
    benefits: B,
    byId: Object.fromEntries(B.map((b) => [b.id, b])),
    start: ["interest", "capital", "power"],        // the list as drawn
    demo: { power: { kwh: "2,40,000" } },           // result preset only (416:77363 shows power ₹12 L)
    addMore: "Add more benefits",
    cta: { label: "Get Estimate", busy: "Calculating" },
    remove: "Remove Benefit",
    result: {
      title: "Congratulations",
      sub: "Your business is applicable for an estimate subsidy amount of",   // Figma has a double space after "is"
      lead: "Up to",
      addMore: "Add more",
      apply: { label: "Apply Online", goto: "application-portal" },
      note: "Estimates are indicative. The final amount depends on policy terms and department procedures.",
    },
    expert: { label: "Talk to an Expert", goto: "expert" },
    parseMoney, parseNum, fmt, tidyMoney, tidyCount,
  };
})();
