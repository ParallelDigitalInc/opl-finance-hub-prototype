/* Desktop · Loans › Overview — Figma 476:200124.
   Behaviour layer (prototype): count-up limit, CMR gauge sweep, chip filters with an
   empty state, a Sort menu and live re-ordering (FLIP), Compare selection with a
   counter on the Compare tab, chart draw-in, hover/focus states throughout. */
(function () {
  const { html, raw } = OPL;
  const D = OPL.d;
  const data = () => OPL.ddata.loansOverview;

  const SORTS = {
    "Lowest interest": (a, b) => a.meta.rate - b.meta.rate,
    "Highest loan amount": (a, b) => b.meta.amount - a.meta.amount,
    "Lowest EMI": (a, b) => a.meta.emi - b.meta.emi,
    "Lowest processing fee": (a, b) => a.meta.fee - b.meta.fee,
  };
  const CHIP_TEST = {
    "Collateral-free": (m) => m.collateralFree,
    "Working Capital": (m) => m.workingCapital,
    "Term loan": (m) => m.term,
    "Fee under 1%": (m) => m.fee < 1,
  };

  const hero = (h) => html`
    <section class="d-hero" data-enter>
      <div class="d-hero__copy">
        <p class="d-hero__eyebrow">${h.eyebrow}</p>
        <p class="d-hero__amount" data-countup>${h.amount}</p>
      </div>
      <div class="d-hero__glass">
        <div class="d-hero__picks">
          ${h.picks.map((p) => html`
            <div class="d-pick">
              <span class="d-pick__icon">${D.icon(p.icon, 20)}</span>
              <div><p class="d-pick__label">${p.label}</p><p class="d-pick__value">${p.value}</p></div>
            </div>`)}
        </div>
        ${D.aiRow(h.ai, { cls: "d-ai--glass" })}
      </div>
    </section>`;

  const matchesHead = (m, st) => html`
    <div class="d-matches__head">
      ${D.sectionHead({ title: m.title, count: m.count, link: m.link, goto: "loan-offers" })}
      <div class="d-toolbar">
        <div class="d-toolbar__chips">${m.chips.map((c) => D.chip(c, { selected: st.chips.includes(c), attrs: `data-chip="${c}"` }))}</div>
        <div class="d-toolbar__right">
          <div class="d-menu-anchor">
            <button class="d-pill d-pill--sort" data-menu="sort" aria-haspopup="menu" aria-expanded="false">
              ${D.icon("list-arrow-down", 16)}<span class="d-pill__muted">${m.sort.label}</span><b>${st.sort}</b>${D.icon("chevron-muted", 14, "d-pill__chev")}
            </button>
            <div class="d-menu" role="menu" data-menu-for="sort">
              ${m.sortOptions.map((o) => html`<button class="d-menu__item ${o === st.sort ? "is-on" : ""}" role="menuitemradio" aria-checked="${o === st.sort}" data-sort="${o}">${o}${o === st.sort ? D.micon("check-circle-chip", 16) : ""}</button>`)}
            </div>
          </div>
          <button class="d-pill" data-goto="loan-offers" data-filters>${D.icon("filter", 16)}<span>Filters</span>${D.icon("chevron-muted", 14, "d-pill__chev")}</button>
        </div>
      </div>
    </div>`;

  const cardsFor = (m, st) => {
    const cmp = D.compare.get();
    // Order as drawn until the user picks a sort (the frame lists Citi · Axis · SBI under "Lowest interest")
    const list = m.cards.filter((c) => st.chips.every((ch) => CHIP_TEST[ch](c.meta)));
    if (st.sorted) list.sort(SORTS[st.sort]);
    if (!list.length) return html`
      <div class="d-empty">
        <p class="d-empty__title">${m.empty.title}</p>
        <p class="d-empty__body">${m.empty.body}</p>
        ${D.btn({ label: m.empty.cta, style: "outlined", size: "sm", attrs: "data-clear-chips" })}
      </div>`;
    return list.map((c) => D.offerCard(c, { compared: cmp.includes(c.compareId) }));
  };

  const debt = (d) => html`
    <section class="d-debt" data-enter>
      ${D.sectionHead({ title: d.title, link: d.link, goto: "my-loans" })}
      <div class="d-debt__tiles">
        ${d.tiles.map((t) => html`
          <div class="d-stat">
            ${t.tag ? html`<span class="d-stat__tag">${t.tag}</span>` : ""}
            <span class="d-stat__icon">${D.icon(t.icon, 20)}</span>
            <p class="d-stat__value">${t.value}</p>
            <p class="d-stat__label">${t.label}</p>
          </div>`)}
      </div>
      <div class="d-debt__row">
        <article class="d-panel d-trend">
          <div class="d-panel__title">${d.trend.title}<span class="d-cmr__info" tabindex="0">${D.icon("info-circle-duo", 20)}${D.tip(d.trend.info)}</span></div>
          <div class="d-trend__figure">
            <p class="d-trend__amount">${d.trend.amount}</p>
            <p class="d-trend__sub">${d.trend.sub}</p>
          </div>
          <div class="d-trend__chart">
            <div class="d-trend__graph" data-graph></div>
            <span class="d-trend__dot">${D.icon("graph-dot", 11)}</span>
          </div>
          <div class="d-trend__tip"><b>${d.trend.tip.value}</b><span>${d.trend.tip.month}</span></div>
        </article>
        <article class="d-panel d-emis">
          <div class="d-emis__head">
            <div class="d-panel__title">${d.termLoans.title}${D.count(d.termLoans.count)}</div>
            ${D.link(d.termLoans.link, "my-loans")}
          </div>
          <div class="d-emis__rows">
            ${d.termLoans.rows.map((r) => html`
              <button class="d-emi" data-goto="my-loans">
                <span class="d-emi__icon">${D.icon(r.icon, 20)}</span>
                <span class="d-emi__name"><b>${r.name}</b><small>${r.due}</small></span>
                <span class="d-emi__amt">${r.amount}</span>
              </button>`)}
          </div>
        </article>
      </div>
    </section>`;

  OPL.dscreens["loans-overview"] = {
    title: "Loans · Overview",
    figma: { frame: "476:200124" },
    st: { chips: [], sort: "Lowest interest" },

    render(page) {
      const d = data();
      const st = this.st;
      const cmpCount = D.compare.get().length;
      page.innerHTML = D.shell({
        nav: "loans", title: "Loans", tab: "overview", counts: { compare: cmpCount || null },
        body: html`
          <div class="d-ov">
            <div class="d-ov__top">
              ${hero(d.hero)}
              <div data-enter>${D.cmrCard(d.cmr)}</div>
            </div>
            <section class="d-matches" data-enter>
              ${matchesHead(d.matches, st)}
              <div class="d-cards" data-cards>${cardsFor(d.matches, st)}</div>
            </section>
            ${debt(d.debt)}
          </div>`,
      });
      D.mountShell(page);
      D.mountGauge(page);
      D.enter(page);
      const amt = page.querySelector("[data-countup]");
      if (amt && !D.motionOff()) D.countUp(amt);
      this.mountGraph(page);
      this.bind(page);
    },

    // Repayment chart: inline the Figma line graph and draw it in left → right
    mountGraph(page) {
      const host = page.querySelector("[data-graph]");
      if (!host) return;
      D.inlineSvg("line-graph").then((svg) => {
        host.innerHTML = svg;
        const chart = host.closest(".d-trend");
        if (D.motionOff()) return chart.classList.add("is-drawn");
        const io = new IntersectionObserver((es) => {
          if (es.some((e) => e.isIntersecting)) { chart.classList.add("is-drawn"); io.disconnect(); }
        }, { threshold: 0.4 });
        OPL.afterReveal(() => io.observe(chart));
      });
    },

    // Re-render only the cards (FLIP: cards glide to their new slots)
    refreshCards(page) {
      const box = page.querySelector("[data-cards]");
      const before = new Map([...box.querySelectorAll("[data-offer]")].map((el) => [el.dataset.offer, el.getBoundingClientRect()]));
      box.innerHTML = cardsFor(data().matches, this.st);
      if (D.motionOff()) return;
      box.querySelectorAll("[data-offer]").forEach((el, i) => {
        const b = before.get(el.dataset.offer);
        if (b) {
          const a = el.getBoundingClientRect();
          const s = parseFloat(getComputedStyle(page.closest(".device-wrap") || document.body).transform.split(",")[0]?.replace("matrix(", "")) || 1;
          const dx = (b.left - a.left) / s;
          if (dx) el.animate([{ transform: `translateX(${dx}px)` }, { transform: "none" }], { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
        } else {
          el.animate([{ opacity: 0, transform: "translateY(8px) scale(0.98)" }, { opacity: 1, transform: "none" }], { duration: 320, delay: i * 40, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" });
        }
      });
    },

    bind(page) {
      const st = this.st;
      const closeMenus = () => page.querySelectorAll(".d-menu.is-open").forEach((m) => {
        m.classList.remove("is-open");
        page.querySelector(`[data-menu="${m.dataset.menuFor}"]`)?.setAttribute("aria-expanded", "false");
      });

      page.addEventListener("click", (e) => {
        const chip = e.target.closest("[data-chip]");
        if (chip) {
          const c = chip.dataset.chip;
          st.chips = st.chips.includes(c) ? st.chips.filter((x) => x !== c) : [...st.chips, c];
          chip.classList.toggle("is-selected");
          chip.setAttribute("aria-pressed", st.chips.includes(c));
          return this.refreshCards(page);
        }
        if (e.target.closest("[data-clear-chips]")) {
          st.chips = [];
          page.querySelectorAll("[data-chip].is-selected").forEach((c) => { c.classList.remove("is-selected"); c.setAttribute("aria-pressed", "false"); });
          return this.refreshCards(page);
        }
        const menuBtn = e.target.closest("[data-menu]");
        if (menuBtn) {
          const menu = page.querySelector(`[data-menu-for="${menuBtn.dataset.menu}"]`);
          const open = !menu.classList.contains("is-open");
          closeMenus();
          menu.classList.toggle("is-open", open);
          menuBtn.setAttribute("aria-expanded", open);
          if (open) menu.querySelector(".is-on")?.focus({ preventScroll: true });
          return;
        }
        const sort = e.target.closest("[data-sort]");
        if (sort) {
          st.sort = sort.dataset.sort;
          st.sorted = true;
          page.querySelector(".d-pill--sort b").textContent = st.sort;
          page.querySelectorAll("[data-sort]").forEach((b) => {
            const on = b.dataset.sort === st.sort;
            b.classList.toggle("is-on", on);
            b.setAttribute("aria-checked", on);
            b.querySelector(".ico")?.remove();
            if (on) b.insertAdjacentHTML("beforeend", String(D.micon("check-circle-chip", 16)));
          });
          closeMenus();
          return this.refreshCards(page);
        }
        if (!e.target.closest(".d-menu")) closeMenus();

        const cmp = e.target.closest("[data-compare]");
        if (cmp) {
          const card = data().matches.cards.find((c) => c.compareId === cmp.dataset.compare);
          return D.toggleCompare(page, card.compareId, card.name);
        }
        const apply = e.target.closest("[data-apply]");
        if (apply) {
          if (OPL.hasScreen("d-apply")) { e.stopPropagation(); return OPL.go("d-apply", { lender: apply.dataset.apply }); }
          return;                                   // not built yet: core flashes the hotspot
        }
      });
      page.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenus(); });
    }
  };
})();
