/* Desktop · Subsidy details — Gujarat Textile Policy 2024. Two Figma versions, switchable in
   the panel (#dhero=cover|blue):
     cover 524:101843 — loom cover photo with emblem + identity; rail: cream estimate spotlight
                        (the mobile money-stack illustration lands) and the expert help card.
     blue  524:101144 — emblem + title header; blue estimate hero holding the policy period;
                        rail: expert help card + Application portal + Official policy website.
   Shared main column: policy period (cover only, inline), Policy Benefits 2×2 tiles, Other
   benefits 2×2 rows, How to apply. Content and benefit sheets are the mobile kit's
   (OPL.data.subsidyDetail, ui.BenefitTile / ListRow / HowItWorks / BenefitSheetBody). */
(function () {
  const { html, raw, ui } = OPL;
  const D = OPL.d;

  OPL.dvariants = OPL.dvariants || {};
  OPL.dvariants["subsidy-detail"] = {
    presets: [
      { id: "cover", label: "Cover photo", figma: "524:101843", set: { dhero: "cover" } },
      { id: "blue", label: "Blue estimate hero", figma: "524:101144", set: { dhero: "blue" } },
    ],
    groups: [{ id: "dhero", label: "Hero", default: "cover", hidden: true, options: [{ value: "cover", label: "Cover photo" }, { value: "blue", label: "Blue hero" }] }],
  };
  OPL.dvariantValues = OPL.dvariantValues || ((name) => {
    const reg = OPL.dvariants[name], st = OPL.state.get(), out = {};
    reg.groups.forEach((g) => { out[g.id] = g.options.some((o) => o.value === st[g.id]) ? st[g.id] : g.default; });
    return out;
  });

  const money = () => html`
    <div class="sd-illus d-sd__illus" aria-hidden="true">
      <img class="sd-illus__l sd-illus__base" src="${OPL.simg("hero-plinth-base.svg")}" alt="">
      <img class="sd-illus__l sd-illus__top" src="${OPL.simg("hero-plinth-top.svg")}" alt="">
      <img class="sd-illus__l sd-illus__notes" src="${OPL.simg("hero-notes.svg")}" alt="">
      <img class="sd-illus__l sd-illus__coins-a" src="${OPL.simg("hero-coins-a.svg")}" alt="">
      <img class="sd-illus__l sd-illus__coins-b" src="${OPL.simg("hero-coins-b.svg")}" alt="">
    </div>`;

  const info = (text) => html`<span class="d-cmr__info" tabindex="0">${D.icon("info-circle-est", 16)}${D.tip(text)}</span>`;

  OPL.dscreens["subsidy-detail"] = {
    title: "Govt. subsidies · Subsidy details",
    figma: { cover: "524:101843", blue: "524:101144" },
    timers: [],
    leave() { this.timers.forEach(clearTimeout); this.timers = []; },

    render(page) {
      this.leave();
      const d = OPL.data.subsidyDetail;
      const s = OPL.ddata.subsidies.detail;
      const b = d.benefits;
      const v = OPL.dvariantValues("subsidy-detail");
      const cover = v.dhero !== "blue";
      const est = s.estimate;

      const tiles = html`
        <section class="d-sd__sec">
          <h2 class="d-sh__title">${b.title}${D.count(b.count)}</h2>
          <div class="d-sd__tiles">${b.tiles.map((t) => html`<div class="d-sd__tile" data-benefit="${t.id}" role="button" tabindex="0" aria-haspopup="dialog">${ui.BenefitTile(t)}</div>`)}</div>
        </section>
        <section class="d-sd__sec d-sd__sec--tight">
          <h3 class="d-sd__h3">${s.otherTitle}${D.count(b.others.count)}</h3>
          <div class="d-sd__others">${b.others.rows.map((r) => html`<div class="d-sd__other">${ui.ListRow({ ...r, attrs: `data-benefit="${r.id}" aria-haspopup="dialog"` })}</div>`)}</div>
        </section>`;
      const how = html`
        <section class="d-panel d-sd__how" data-enter>
          <div class="d-sd__how-head"><h2>${s.howTitle}</h2><button class="d-sd__share" data-goto="share-ca">${OPL.sicon("share-primary", 16)}${d.steps.share}</button></div>
          <div class="d-sd__steps">${d.steps.items.map((it, i) => ui.HowStep({ n: i + 1, ...it, last: i === d.steps.items.length - 1 }))}</div>
        </section>`;
      const help = (links) => html`
        <section class="d-sd__help" data-enter>
          ${ui.HelpCardExpert(d.apply.help)}
          ${links.map((l) => ui.ListRow({ ...l, trailing: "external" }))}
        </section>`;

      const head = cover
        ? html`
          <section class="d-sd__hero" data-enter>
            <div class="d-sd__cover"><img src="assets/lazy/dsk/subsidy/cover-loom.jpg" alt=""></div>
            <span class="d-sd__emblem d-sd__emblem--lg">${ui.Logo({ id: "gujaratGovt", size: 74 })}</span>
            <div class="d-sd__identity">
              <h1>${d.title}</h1>
              <div class="d-sd__meta"><span>${s.department}</span><span class="d-sd__open"><i></i>${s.status}</span></div>
            </div>
          </section>`
        : html`
          <section class="d-sd__head" data-enter>
            <span class="d-sd__emblem">${ui.Logo({ id: "gujaratGovt", size: 56 })}</span>
            <div><h1 class="d-sd__title">${d.title}</h1><p class="d-sd__dept">${s.department}</p></div>
          </section>`;

      page.innerHTML = D.shell({
        nav: "subsidies", title: "", tab: null,
        crumbs: [{ label: s.crumbs, goto: "subsidies-overview" }, { label: d.title }],
        body: html`
          <div class="d-sd ${cover ? "d-sd--cover" : "d-sd--blue"}">
            ${head}
            <div class="d-sd__cols">
              <div class="d-sd__main">
                ${cover
                  ? html`<div class="d-panel d-sd__period" data-enter>${ui.PolicyPeriod({ period: d.period })}</div>`
                  : html`
                    <section class="d-sd__blue" data-enter>
                      <div class="d-sd__blue-top">
                        <div><p class="d-sd__eyebrow">${est.eyebrow}${info(s.info)}</p><p class="d-sd__amount">${est.prefix}${est.amount}</p></div>
                        ${D.btn({ label: est.cta, style: "outlined", size: "md", cls: "d-sd__calc", iconRight: OPL.icon("chevron-right-primary", 16), goto: "subsidy-estimate" })}
                      </div>
                      <div class="d-sd__blue-panel">${ui.PolicyPeriod({ period: d.period })}</div>
                    </section>`}
                ${tiles}
                ${how}
                <p class="d-sd__note">${d.foot.note}</p>
              </div>
              <aside class="d-sd__rail">
                ${cover ? html`
                  <section class="d-sd__est" data-enter>
                    <div class="d-sd__est-in">
                      ${money()}
                      <p class="d-sd__eyebrow">${est.eyebrow}${info(s.info)}</p>
                      <p class="d-sd__est-amt"><span>${est.prefix}</span>${est.amount}</p>
                      <div class="d-sd__est-actions">
                        ${D.btn({ label: est.cta, style: "filled", size: "lg", cls: "d-btn--block", iconRight: D.icon("btn-arrow-white", 16), goto: "subsidy-estimate" })}
                        ${D.btn({ label: est.apply, style: "outlined", size: "lg", cls: "d-btn--block d-btn--neutral", iconRight: D.icon("arrow-up-right-primary", 16), goto: "application-portal" })}
                      </div>
                    </div>
                  </section>
                  ${help(d.apply.links.slice(1))}` : html`${help(d.apply.links)}<p class="d-sd__trusted">${s.trusted}</p>`}
              </aside>
            </div>
          </div>`,
      });
      D.mountShell(page);
      D.enter(page);
      OPL.fx.playInView && OPL.fx.playInView(page, ".how-step, .d-sd__steps");
      // the money lands once the estimate is in view (mobile motion)
      const illus = page.querySelector(".d-sd__illus");
      if (illus && !D.motionOff()) OPL.afterReveal(() => this.timers.push(setTimeout(() => illus.classList.add("is-landing"), 380)));
      this.bind(page, d);
    },

    bind(page, d) {
      page.addEventListener("click", (e) => {
        const t = e.target.closest("[data-benefit]");
        if (t) return this.openBenefit(page, d, t.dataset.benefit);
      });
      page.addEventListener("keydown", (e) => {
        if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-benefit]")) { e.preventDefault(); this.openBenefit(page, d, e.target.dataset.benefit); }
      });
    },

    // Benefit sheets (416:47994) as a desktop drawer: the mobile sheet body, Activity switch live
    openBenefit(page, d, id) {
      const s = d.sheets && d.sheets[id];
      if (!s) return;
      let activity = 0;
      const bodyHtml = () => String(ui.BenefitSheetBody({ s, activity, actions: d.sheetActions }));
      const dr = D.openDrawer(page, { title: s.title, body: `<div class="d-bsheet">${bodyHtml()}</div>`, width: 520 });
      const host = dr.el.querySelector(".d-bsheet");
      host.addEventListener("click", (e) => {
        if (e.target.closest("[data-sheet-close]")) return dr.close();
        const a = e.target.closest("[data-activity]");
        if (a) { activity = +a.dataset.activity; host.innerHTML = bodyHtml(); }
      });
    },
  };
})();
