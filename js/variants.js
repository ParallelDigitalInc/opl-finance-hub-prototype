/* ==========================================================================
   Variant toggles — one registry per screen.
   Every option should trace to a Figma frame (the `figma` field). To add an
   alternative later (e.g. a new hero background), add an option here; the
   panel picks it up. Groups with a single option stay hidden until a second
   one is added.
   ========================================================================== */
(function () {
  OPL.variants = {
    home: {
      // Presets = the exact frames in Figma. Picking one sets every group.
      presets: [
        { id: "loans", label: "Loans first", figma: "382:34093", set: { order: "loans", emi: "off" } },
        { id: "subsidies", label: "Subsidies first", figma: "382:33823", set: { order: "subsidies", emi: "off" } },
        { id: "subsidies-emi", label: "Subsidies + EMI due", figma: "382:36681", set: { order: "subsidies", emi: "on" } },
      ],
      groups: [
        {
          id: "order",
          label: "Section order",
          default: "loans",
          options: [
            { value: "loans", label: "Loans first" },
            { value: "subsidies", label: "Subsidies first" },
          ],
        },
        {
          id: "emi",
          label: "EMI due banner",
          default: "off",
          options: [
            { value: "off", label: "Hidden" },
            { value: "on", label: "Shown" },
          ],
        },
        {
          id: "autoplay",
          label: "Hero carousel",
          default: "off",
          options: [
            { value: "off", label: "Manual swipe" },
            { value: "on", label: "Auto-advance" },
          ],
          note: "Prototype behaviour. Off matches Figma's static dot.",
        },
        {
          id: "stack",
          label: "Hero offer cards",
          default: "cycle",
          options: [
            { value: "cycle", label: "Cycling" },
            { value: "static", label: "Static (Figma)" },
          ],
        },
        {
          id: "nudge",
          label: "AI Mitra nudge",
          default: "on",
          options: [
            { value: "on", label: "Shows once" },
            { value: "off", label: "Off" },
          ],
        },
        {
          id: "note",
          label: "Page-end note",
          default: "trust",
          options: [
            { value: "trust", label: "Trust" },
            { value: "indicative", label: "Indicative" },
            { value: "caughtup", label: "Caught up" },
            { value: "off", label: "None" },
          ],
          note: "Proposed — not in Figma yet. Trust claims need OPL sign-off.",
        },
        {
          id: "heroBg",
          label: "Hero background",
          default: "ice",
          // Add alternatives here, e.g. { value: "white", label: "White", css: { "--hero-bg": "#fff" } }
          options: [{ value: "ice", label: "Ice blue #EBF3FF", css: { "--hero-bg": "#ebf3ff" } }],
        },
      ],
    },
  };

  OPL.variants["loans-overview"] = {
    presets: [{ id: "default", label: "Loans overview", figma: "382:36150", set: {} }],
    groups: [
      {
        id: "nudge",
        label: "AI Mitra nudge",
        default: "on",
        options: [
          { value: "on", label: "Shows once" },
          { value: "off", label: "Off" },
        ],
      },
    ],
  };

  /* Subsidy details (416:44852). Presets set the starting state of the two
     disclosures; tapping them in the prototype toggles them live. */
  OPL.variants["subsidy-detail"] = {
    presets: [
      { id: "collapsed", label: "Collapsed", figma: "416:44853", set: { others: "closed", steps: "closed", sheet: "none" } },
      { id: "expanded", label: "Expanded", figma: "416:45617", set: { others: "open", steps: "open", sheet: "none" } },
      // Benefit sheets (416:47994), each over the collapsed screen
      ...[
        ["capital-1", "Capital · Activity 1", "416:47995"], ["capital-2", "Capital · Activity 2", "416:48787"],
        ["interest-1", "Interest · Activity 1", "416:49579"], ["interest-2", "Interest · Activity 2", "416:50370"],
        ["power", "Power tariff", "416:51161"], ["payroll", "Payroll assistance", "416:51939"],
        ["shg", "SHG job work", "416:52730"], ["quality", "Quality certification", "416:53511"],
        ["energy", "Energy & water saving", "416:54292"], ["tech", "Technology acquisition", "416:55073"],
      ].map(([sheet, label, figma]) => ({ id: `sheet-${sheet}`, label: `Sheet · ${label}`, figma, set: { others: "closed", steps: "closed", sheet } })),
    ],
    groups: [
      { id: "sheet", hidden: true, default: "none", options: ["none", "capital-1", "capital-2", "interest-1", "interest-2", "power", "payroll", "shg", "quality", "energy", "tech"].map((value) => ({ value })) },
      { id: "others", hidden: true, default: "closed", options: [{ value: "closed" }, { value: "open" }] },
      { id: "steps", hidden: true, default: "closed", options: [{ value: "closed" }, { value: "open" }] },
      {
        id: "nudge", label: "AI Mitra nudge", default: "on",
        options: [{ value: "on", label: "Shows once" }, { value: "off", label: "Off" }],
        note: "Proposed line: “Ask anything about this policy”. Not in Figma.",
      },
    ],
  };

  OPL.variants["loan-offers"] = {
    presets: [
      { id: "list", label: "Offers list", figma: "382:35324", set: { compare: "none", sheet: "none" } },
      { id: "compare", label: "Comparing 2 loans", figma: "382:35666", set: { compare: "figma", sheet: "none" } },
      { id: "sort", label: "Sort sheet", figma: "393:505", set: { compare: "none", sheet: "sort" } },
      { id: "filters", label: "Filters sheet", figma: "393:869", set: { compare: "none", sheet: "filters" } },
    ],
    groups: [
      { id: "compare", hidden: true, default: "none", options: [{ value: "none" }, { value: "figma" }] },
      { id: "sheet", hidden: true, default: "none", options: [{ value: "none" }, { value: "sort" }, { value: "filters" }] },
      {
        id: "nudge", label: "AI Mitra nudge", default: "on",
        options: [{ value: "on", label: "Shows once" }, { value: "off", label: "Off" }],
      },
    ],
  };

  OPL.variants["compare-loans"] = {
    presets: [{ id: "default", label: "Compare loans", figma: "382:37839", set: {} }],
    groups: [],
  };

  OPL.variants.applications = {
    presets: [
      { id: "figma", label: "Figma state", figma: "382:41059", set: { apps: "figma", ms: "off" } },
      { id: "approved", label: "Approved sheet", figma: "416:43921", set: { apps: "figma", ms: "on" } },
      { id: "live", label: "My submitted applications", figma: "382:41059", set: { apps: "live", ms: "off" } },
    ],
    groups: [
      { id: "apps", hidden: true, default: "live", options: [{ value: "live" }, { value: "figma" }] },
      { id: "ms", hidden: true, default: "off", options: [{ value: "off" }, { value: "on" }] },
    ],
  };
  OPL.variants.application = {
    presets: [
      { id: "verifying", label: "Verifying (SIDBI)", figma: "382:42423", set: { app: "offer-sidbi", apps: "figma", st: "", ms: "off" } },
      { id: "kfs", label: "KFS ready (Citi)", figma: "382:42689", set: { app: "pick-citi", apps: "figma", st: "", ms: "off" } },
      { id: "sign", label: "Sign letter (resume)", figma: "431:7803", set: { app: "pick-citi", apps: "figma", st: "sign", ms: "off" } },
      { id: "signed", label: "Letter signed + sheet", figma: "431:8486", set: { app: "pick-citi", apps: "figma", st: "signed", ms: "on" } },
    ],
    groups: [
      { id: "app", hidden: true, default: "", options: [{ value: "" }, { value: "offer-sidbi" }, { value: "pick-citi" }] },
      { id: "st", hidden: true, default: "", options: [{ value: "" }, { value: "sign" }, { value: "signed" }] },
      { id: "ms", hidden: true, default: "off", options: [{ value: "off" }, { value: "on" }] },
      { id: "apps", hidden: true, default: "live", options: [{ value: "live" }, { value: "figma" }] },
    ],
  };

  OPL.variants.kfs = {
    presets: [
      { id: "start", label: "Reading (page 1)", figma: "416:43474", set: { read: "start", sheet: "off" } },
      { id: "end", label: "Read to the end", figma: "416:43604", set: { read: "end", sheet: "off" } },
      { id: "accepted", label: "Accepted → NeSL sheet", figma: "433:7980", set: { read: "end", sheet: "nesl" } },
    ],
    groups: [
      { id: "read", hidden: true, default: "start", options: [{ value: "start" }, { value: "end" }] },
      { id: "sheet", hidden: true, default: "off", options: [{ value: "off" }, { value: "nesl" }] },
    ],
  };

  OPL.variants.nesl = {
    presets: [
      { id: "redirect", label: "1 · Redirecting", figma: "433:8115", set: { step: "0" } },
      { id: "otp", label: "2 · OTP", figma: "416:83009", set: { step: "1" } },
      { id: "agreement", label: "3 · Agreement", figma: "416:83028", set: { step: "2" } },
      { id: "estamp", label: "4 · E-stamp", figma: "416:83058", set: { step: "3" } },
      { id: "method", label: "5 · Signing method", figma: "416:83077", set: { step: "4" } },
      { id: "aadhaar", label: "6 · Aadhaar eSign", figma: "416:83101", set: { step: "5" } },
      { id: "confirm", label: "Confirming signature", figma: "416:82947", set: { step: "6" } },
    ],
    groups: [
      { id: "step", hidden: true, default: "0", options: ["0", "1", "2", "3", "4", "5", "6"].map((value) => ({ value })) },
    ],
  };

  /** Resolve the current value of every group for a screen (URL → default). */
  OPL.variantValues = (screen) => {
    const reg = OPL.variants[screen];
    const st = OPL.state.get();
    const out = {};
    reg.groups.forEach((g) => {
      const v = st[g.id];
      out[g.id] = g.options.some((o) => o.value === v) ? v : g.default;
    });
    return out;
  };
})();
