/* Desktop · Loans › Loan Offers — Figma 357:102436 (tags from 507:84666).
   Top 3 matches (the Overview cards) + All loan matches (horizontal cards) with chip
   filters, Sort (FLIP re-order), shared Compare selection. */
(function () {
  const { html } = OPL;
  const D = OPL.d;

  const allFor = (st) => {
    const lo = OPL.ddata.loanOffers;
    const cmp = D.compare.get();
    const list = lo.offers.filter((o) => st.chips.every((c) => D.CHIP_TEST[c](o.meta)));
    if (st.sorted) list.sort(D.SORTS[st.sort]);
    if (!list.length) {
      const e = OPL.ddata.loansOverview.matches.empty;
      return String(html`<div class="d-empty"><p class="d-empty__title">${e.title}</p><p class="d-empty__body">${e.body}</p>${D.btn({ label: e.cta, style: "outlined", size: "sm", attrs: "data-clear-chips" })}</div>`);
    }
    return list.map((o) => String(D.offerRow(o, { compared: cmp.includes(o.id) }))).join("");
  };

  OPL.dscreens["loan-offers"] = {
    title: "Loans · Loan Offers",
    figma: { frame: "357:102436" },
    st: { chips: [], sort: "Lowest interest", sorted: false },

    render(page) {
      const lo = OPL.ddata.loanOffers;
      const top = OPL.ddata.loansOverview.matches.cards;
      const cmp = D.compare.get();
      const st = this.st;
      page.innerHTML = D.shell({
        nav: "loans", title: "Loans", tab: "offers", counts: { compare: cmp.length || null },
        body: html`
          <div class="d-offers">
            <section class="d-offers__top" data-enter>
              <div class="d-sh"><h2 class="d-sh__title">${lo.topTitle}</h2></div>
              <div class="d-cards">${top.map((c) => D.offerCard(c, { compared: cmp.includes(c.compareId) }))}</div>
            </section>
            <section class="d-offers__all" data-enter>
              <div class="d-matches__head">
                <div class="d-sh"><h2 class="d-sh__title">${lo.allTitle}</h2></div>
                <div class="d-toolbar">
                  <div class="d-toolbar__chips">${lo.chips.map((c) => D.chipX(c, { selected: st.chips.includes(c.label) }))}</div>
                  ${D.sortFilter(st.sort)}
                </div>
              </div>
              <div class="d-rows-list" data-list>${OPL.raw(allFor(st))}</div>
            </section>
          </div>`,
      });
      D.mountShell(page);
      D.enter(page);
      D.bindListControls(page, st, () => D.flip(page.querySelector("[data-list]"), allFor(st), page));
      page.addEventListener("click", (e) => {
        const cmpBox = e.target.closest("[data-compare]");
        if (cmpBox) {
          const id = cmpBox.dataset.compare;
          const o = lo.offers.find((x) => x.id === id) || top.find((c) => c.compareId === id);
          return D.toggleCompare(page, id, o.name);
        }
        const apply = e.target.closest("[data-apply]");
        if (apply) { e.stopPropagation(); return D.apply(page, [apply.dataset.apply]); }
      });
    },
  };
})();
