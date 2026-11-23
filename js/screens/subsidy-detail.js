/* ==========================================================================
   Screen · Subsidy details — Gujarat Textile Policy 2024
   Figma: collapsed 416:44853 · expanded 416:45617 (section 416:44852)
   Entry: Home → any "Top subsidy matches" card (data-goto="subsidy-detail").

   Motion thesis (prototype layer, behaviour on drawn elements only):
   · Focal: the benefits land. The plinth settles, the note bundle drops onto it,
     the coin stacks clink down, and the estimate counts up as they land.
   · Continuity: disclosures open by height (no jump); revealed rows stagger in
     and the list scrolls itself into view if it opened below the fold.
   · Feedback: the period bar fills to today; the How-it-works rail draws step
     by step; the expert card's "OPL Verified" stamp presses on once.
   Reduced motion / Motion off: everything renders at rest, nothing hidden.
   ========================================================================== */
(function () {
  const { html, ui } = OPL;
  OPL.screens = OPL.screens || {};

  /* "Up to ₹1.2Cr" — one-decimal count-up (OPL.countUp is integer-only). */
  const countUpDecimal = (el, { to, prefix, suffix, duration = 900, delay = 0, timers }) => {
    const set = (v) => { el.textContent = prefix + v.toFixed(1) + suffix; };
    if (OPL.fx.motionOff()) return set(to);
    set(0);
    OPL.afterReveal(() => timers.push(setTimeout(() => {
      const t0 = Date.now();
      const step = () => {
        const k = Math.min(1, (Date.now() - t0) / duration);
        set(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) timers.push(setTimeout(step, 16));
      };
      step();
    }, delay)));
  };

  OPL.screens["subsidy-detail"] = {
    title: "Subsidy details",
    figma: { collapsed: "416:44853", expanded: "416:45617" },
    timers: [],

    leave() { this.timers.forEach((t) => { clearTimeout(t); clearInterval(t); }); this.timers = []; },

    render(page) {
      this.leave();
      const d = OPL.data.subsidyDetail;
      const v = OPL.variantValues("subsidy-detail");
      const b = d.benefits;

      page.innerHTML = html`
        ${ui.StatusBar()}
        <div class="scroller">
          <main class="sd">
            <section class="sd-hero">
              <div class="sd-hero__bg"><img class="sd-hero__texture" src="${OPL.simg("satin-texture.jpg")}" alt=""></div>
              <header class="sd-head">
                <div class="sd-head__lead">
                  <button class="sd-head__btn sd-head__back" aria-label="Back" data-press data-back>${OPL.sicon("alt-arrow-left-19", 19.2)}</button>
                  <h1 class="sd-head__title">${d.title}</h1>
                </div>
                <button class="sd-head__btn" aria-label="Support" data-press data-goto="support">${OPL.sicon("headphones-16", 16)}</button>
              </header>
              <div class="sd-hero__body">
                <div class="sd-illus" aria-hidden="true">
                  <img class="sd-illus__l sd-illus__base" src="${OPL.simg("hero-plinth-base.svg")}" alt="">
                  <img class="sd-illus__l sd-illus__top" src="${OPL.simg("hero-plinth-top.svg")}" alt="">
                  <img class="sd-illus__l sd-illus__notes" src="${OPL.simg("hero-notes.svg")}" alt="">
                  <img class="sd-illus__l sd-illus__coins-a" src="${OPL.simg("hero-coins-a.svg")}" alt="">
                  <img class="sd-illus__l sd-illus__coins-b" src="${OPL.simg("hero-coins-b.svg")}" alt="">
                </div>
                <div class="sd-hero__copy">
                  <p class="sd-hero__eyebrow"><span>${d.hero.eyebrow}</span>
                    <button class="sd-hero__info" aria-label="How we estimate this" data-press data-goto="estimate-info">${OPL.sicon("info-circle-ink", 16)}</button></p>
                  <p class="sd-hero__amount">${d.hero.prefix}${d.hero.value}${d.hero.suffix}</p>
                </div>
                <div class="sd-hero__cta">${ui.Button({ label: d.hero.cta.label, trailing: "chevron-right-white", block: true, strong: true, goto: d.hero.cta.goto })}</div>
              </div>
            </section>

            <div class="sd-body">
              ${ui.PolicyPeriod({ period: d.period })}

              <section class="sd-section sd-benefits">
                <h2 class="sd-section__title">${b.title} ${ui.CountBadge({ n: b.count })}</h2>
                <div class="sd-benefits__grid">${b.tiles.map((t) => ui.BenefitTile(t))}</div>
                ${ui.Disclosure({
                  id: "others", label: b.others.label, count: b.others.count, open: v.others === "open",
                  body: OPL.raw(b.others.rows.map((r, i) => ui.ListRow({ ...r, goto: "benefit-sheet", attrs: `data-benefit="${r.id}" style="--i:${i}"` })).join("")),
                })}
              </section>

              <section class="sd-section sd-apply">
                <h2 class="sd-section__title">${d.apply.title}</h2>
                ${ui.HelpCardExpert(d.apply.help)}
                <div class="sd-links">${d.apply.links.map((l) => ui.ListRow({ ...l, trailing: "external" }))}</div>
                ${ui.HowItWorks({ ...d.steps, open: v.steps === "open" })}
              </section>
            </div>
          </main>
        </div>
        <div class="floating floating--sd">
          ${ui.AiMitraFab({ nudge: v.nudge === "on" ? d.aiNudge : null })}
        </div>
        ${ui.SubsidyFoot(d.foot)}`;

      this.wire(page, d);
    },

    wire(page, d) {
      const sc = page.querySelector(".scroller");
      const motionOff = OPL.fx.motionOff();
      OPL.fx.statusOnScroll(page);
      OPL.fx.nudge(page, this.timers);

      /* ---- disclosures: See other benefits · How it works ---------------- */
      const foot = page.querySelector(".sfoot");
      const reveal = (panel) => {
        // After the height animation, bring the newly opened content into view
        // if it opened below the fold (keeps its header on screen).
        this.timers.push(setTimeout(() => {
          const view = sc.getBoundingClientRect();
          const box = panel.getBoundingClientRect();
          const bottomLimit = view.bottom - foot.offsetHeight - 16;
          const head = panel.parentElement.getBoundingClientRect().top;
          const over = Math.min(box.bottom - bottomLimit, head - view.top - 72);
          if (over > 24) sc.scrollBy({ top: over, behavior: motionOff ? "auto" : "smooth" });
        }, motionOff ? 0 : 380));
      };
      page.addEventListener("click", (e) => {
        const head = e.target.closest(".disclosure__head, .how__head");
        if (!head) return;
        const sec = head.closest("[data-disclosure]");
        const panel = sec.querySelector(".disclosure__panel");
        const open = !sec.classList.contains("is-open");
        sec.classList.toggle("is-open", open);
        head.setAttribute("aria-expanded", open);
        panel.toggleAttribute("inert", !open);
        const badge = sec.querySelector(".count-badge");
        if (badge && !motionOff) { badge.classList.remove("is-popping"); void badge.offsetWidth; badge.classList.add("is-popping"); }
        if (open) {
          if (sec.classList.contains("how")) { sec.classList.remove("is-playing"); void sec.offsetWidth; if (!motionOff) sec.classList.add("is-playing"); }
          reveal(panel);
        }
      });

      /* ---- Share these steps with my CA ---------------------------------- */
      page.addEventListener("click", async (e) => {
        const btn = e.target.closest("[data-share-steps]");
        if (!btn) return;
        const s = d.steps;
        const text = `${d.title} — ${s.title}\n` + s.items.map((it, i) => `${i + 1}. ${it.title}${it.body ? ` — ${it.body}` : ""}${it.deadline ? ` (${it.deadline})` : ""}${it.inset ? "\n   " + it.inset.title + ": " + it.inset.rows.map((r) => `${r.value} (${r.label.charAt(0).toLowerCase() + r.label.slice(1)})`).join("; ") : ""}`).join("\n");
        try {
          if (navigator.share) { await navigator.share({ title: d.title, text }); return; }
          await navigator.clipboard.writeText(text);
        } catch (_) { return; }
        const label = btn.querySelector(".how__share-label");
        btn.classList.add("is-done");
        label.textContent = "Steps copied";
        this.timers.push(setTimeout(() => { btn.classList.remove("is-done"); label.textContent = s.share; }, 2200));
      });

      /* ---- entrance + in-view moments ------------------------------------ */
      OPL.fx.enter(page, [
        page.querySelector(".sd-hero__copy"),
        page.querySelector(".sd-hero__cta"),
        page.querySelector(".period"),
        page.querySelector(".sd-benefits .sd-section__title"),
        ...page.querySelectorAll(".benefit"),
        page.querySelector(".disclosure"),
      ]);
      if (!motionOff) page.querySelector(".sd-illus").classList.add("is-landing");
      countUpDecimal(page.querySelector(".sd-hero__amount"), {
        to: d.hero.value, prefix: d.hero.prefix, suffix: d.hero.suffix, duration: 900, delay: 420, timers: this.timers,
      });
      OPL.fx.playInView(page, ".period, .xhelp, .how.is-open");
    },
  };
})();
