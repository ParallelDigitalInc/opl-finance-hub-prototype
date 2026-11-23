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
