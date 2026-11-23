/* Desktop fallback — a mobile screen with no desktop design yet. Keeps the desktop
   shell (so the switch never dead-ends) and offers the mobile view of the same state.
   Prototype chrome, not product UI. */
(function () {
  const { html } = OPL;
  const D = OPL.d;
  // Which Loans tab / sidebar item a mobile screen belongs to
  const TAB = { "loan-offers": "offers", "compare-loans": "compare", applications: "applications", application: "applications", kfs: "applications", nesl: "applications" };

  OPL.dscreens.__missing = {
    title: "Not on desktop yet",
    figma: {},
    render(page) {
      const name = OPL.current();
      const mobile = OPL.screens[name];
      page.innerHTML = D.shell({
        nav: "loans", title: "Loans", tab: TAB[name] || "overview",
        body: html`
          <div class="d-missing">
            <p class="d-missing__eyebrow">Prototype</p>
            <p class="d-missing__title">${mobile ? mobile.title : "This screen"} isn't designed for desktop yet</p>
            <p class="d-missing__body">The same state is available in the mobile view.</p>
            <div class="d-missing__actions">
              ${D.btn({ label: "Open in mobile view", style: "filled", size: "md", attrs: "data-to-mobile" })}
              ${D.btn({ label: "Back to Overview", style: "outlined", size: "md", goto: "loans-overview" })}
            </div>
          </div>`,
      });
      D.mountShell(page);
      page.querySelector("[data-to-mobile]").addEventListener("click", () => OPL.setDevice("mobile"));
    },
  };
})();
