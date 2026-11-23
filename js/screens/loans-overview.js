/* ==========================================================================
   Screen · Loans overview — Figma 382:36150
   Entry: Home → hero CTA "Explore Loans". Back arrow returns to Home.
   ========================================================================== */
(function () {
  const { html, ui } = OPL;
  OPL.screens = OPL.screens || {};

  OPL.screens["loans-overview"] = {
    title: "Loans overview",
    figma: { default: "382:36150" },
    timers: [],

    leave() { this.timers.forEach((t) => { clearTimeout(t); clearInterval(t); }); this.timers = []; },

    render(page) {
      this.leave();
      const d = OPL.data.loansOverview;
      const v = OPL.variantValues("loans-overview");

      page.innerHTML = html`
        ${ui.StatusBar()}
        <div class="scroller">
          <main class="lo">
            <section class="lo-hero">
              <div class="lo-hero__bg">
                <img class="lo-hero__ellipse" src="${OPL.img("hero-ellipse.svg")}" alt="">
                <img class="lo-hero__texture" src="${OPL.img("hero-texture.jpg")}" alt="">
              </div>
              <img class="lo-hero__glow" src="${OPL.img("cmr-glow.svg")}" alt="">
              <div class="lo-hero__header">${ui.AppHeader({ title: d.header.title, back: true, actions: d.header.actions })}</div>
              <div class="lo-hero__title">
                <p class="lo-hero__eyebrow">${d.limit.eyebrow}</p>
                <p class="lo-hero__amount" data-amount="${d.limit.value}">${d.limit.prefix}${d.limit.value}${d.limit.suffix}</p>
              </div>
              ${ui.CmrPill(d.cmr)}
              <div class="rail lo-hero__rail">${d.offers.map((c) => ui.MatchCard({ ...c, size: "lg" }))}</div>
              <div class="lo-hero__cta">${ui.Button({ label: d.offersCta.label, trailing: "chevron-right-white", block: true, goto: d.offersCta.goto })}</div>
            </section>

            <div class="lo-body">
              <section class="lo-section">
                <h2 class="lo-section__title">${d.applications.title}</h2>
                ${ui.ApplicationCard(d.applications.card)}
              </section>
              ${ui.DebtProfile(d.debt)}
              ${ui.HelpCard(d.help)}
            </div>
          </main>
        </div>
        <div class="floating">
          ${ui.AiMitraFab({ nudge: v.nudge === "on" ? d.aiNudge : null })}
          ${ui.BottomNav({ items: d.nav, active: "overview", variant: "section" })}
        </div>`;

      this.wire(page, d);
    },

    wire(page, d) {
      OPL.fx.statusOnScroll(page);
      page.addEventListener("click", (e) => {
        const o = e.target.closest("[data-app-open]");
        if (o) OPL.go("application", { app: o.dataset.appOpen });
      });
      { const sh = OPL.fx.sheets(page, { onClose: (id) => id === "cmr" && OPL.state.get().cmr && OPL.state.set({ cmr: null }, { silent: true }) });
        OPL.fx.applySheet(page, sh); OPL.fx.loanDetail(page, sh);       // offer cards → details → apply
        const cmr = OPL.fx.cmrSheet(page, sh, this.timers);             // "CMR - 2" pill
        if (OPL.variantValues("loans-overview").cmr === "on") cmr.open({ instant: true }); }
      page.querySelectorAll(".rail").forEach(OPL.fx.mouseDrag);
      // Debt Profile: pointing at a row or a bar segment brings that part forward
      const debt = page.querySelector(".debt__card");
      if (debt) {
        const hot = (id) => {
          debt.classList.toggle("is-focus", !!id);
          debt.querySelectorAll("[data-part]").forEach((el) => el.classList.toggle("is-hot", el.dataset.part === id));
        };
        debt.addEventListener("pointerover", (e) => e.pointerType === "mouse" && hot(e.target.closest("[data-part]")?.dataset.part || null));
        debt.addEventListener("pointerleave", () => hot(null));
      }
      OPL.fx.playInView(page, ".tracker, .debt__card");
      OPL.fx.nudge(page, this.timers);
      OPL.fx.aiRotate(page, this.timers);                 // Debt Profile AI question

      const amt = page.querySelector(".lo-hero__amount");
      OPL.fx.enter(page, [
        page.querySelector(".lo-hero__title"),
        page.querySelector(".cmr"),
        ...page.querySelectorAll(".lo-hero__rail .match"),
        page.querySelector(".lo-hero__cta"),
        ...page.querySelectorAll(".lo-section"),
        page.querySelector(".help"),
      ]);
      OPL.countUp(amt, { to: d.limit.value, prefix: d.limit.prefix, suffix: d.limit.suffix, duration: 1000, delay: 150 });
    },
  };
})();
