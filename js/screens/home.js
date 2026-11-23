/* ==========================================================================
   Screen · Finance Hub Home
   Figma: loans-first 382:34093 · subsidies-first 382:33823 · + EMI 382:36681
   ========================================================================== */
(function () {
  const { html, ui } = OPL;
  OPL.screens = OPL.screens || {};

  const heroSlide = (key, d) => html`
    <div class="hero__slide hero__slide--${key}" data-slide="${key}">
      <div class="hero__content">
        <div class="hero__titleblock">
          <div>
            <p class="hero__eyebrow">${d.eyebrow}</p>
            <p class="hero__amount" data-amount="${d.amount.value}" data-prefix="${d.amount.prefix}" data-suffix="${d.amount.suffix}"
               ${d.amount.static ? OPL.raw("data-static") : ""}>${d.amount.prefix}${d.amount.value}${d.amount.suffix}</p>
          </div>
          ${d.facts ? OPL.raw(`<div class="hero__facts">${d.facts.map((parts) => ui.FactPill({ parts })).join("")}</div>`) : ""}
        </div>
        <div class="hero__stack">
          ${ui.HeroStack({ kind: key === "loans" ? "loan" : "subsidy", cards: d.stack })}
          ${ui.Button({ label: d.cta, trailing: "chevron-right-white", block: true, goto: d.goto })}
        </div>
      </div>
    </div>`;

  const loansSection = (d) => html`
    <section class="home-section" data-section="loans">
      ${ui.SectionHeader({ title: d.title, goto: d.goto })}
      <div class="rail">${d.cards.map((c) => ui.MatchCard(c))}</div>
    </section>`;

  const subsidiesSection = (d) => html`
    <section class="home-section" data-section="subsidies">
      ${ui.SectionHeader({ title: d.title, goto: d.goto })}
      <div class="home-section__body">
        <div class="rail rail--chips">${d.chips.map((c) => ui.Chip({ ...c, goto: "subsidy-list" }))}</div>
        <div class="rail">${d.cards.map((c) => ui.MatchCard(c))}</div>
      </div>
    </section>`;

  OPL.screens.home = {
    title: "Finance Hub · Home",
    figma: { loans: "382:34093", subsidies: "382:33823", "subsidies-emi": "382:36681" },

    render(screen) {
      const d = OPL.data.home;
      const v = OPL.variantValues("home");
      const reg = OPL.variants.home;
      const cssVars = reg.groups
        .flatMap((g) => g.options.filter((o) => o.value === v[g.id] && o.css).map((o) => Object.entries(o.css)))
        .flat()
        .map(([k, val]) => `${k}:${val}`)
        .join(";");
      const sections = v.order === "subsidies"
        ? [subsidiesSection(d.subsidies), loansSection(d.loans)]
        : [loansSection(d.loans), subsidiesSection(d.subsidies)];

      screen.innerHTML = html`
        ${ui.StatusBar()}
        <div class="scroller">
          <main class="${OPL.cx("home", v.note !== "off" && "has-note")}" style="${cssVars}">
            <section class="hero">
              <div class="hero__bg">
                <img class="hero__ellipse" src="${OPL.img("hero-ellipse.svg")}" alt="">
                <img class="hero__texture" src="${OPL.img("hero-texture.png")}" alt="">
              </div>
              <div class="hero__blur"></div>
              ${ui.AppHeader(d.header)}
              <div class="hero__track">
                ${heroSlide("loans", d.hero.loans)}
                ${heroSlide("subsidies", d.hero.subsidies)}
              </div>
            </section>
            ${ui.CarouselDots({ count: 2, active: v.order === "subsidies" ? 1 : 0 })}
            <div class="quick">${d.quickActions.map((q) => ui.QuickAction(q))}</div>
            ${sections}
            ${ui.HelpCard(d.help)}
            ${v.note !== "off" ? ui.PageNote({ lines: d.pageNotes[v.note] }) : ""}
          </main>
        </div>
        <div class="floating">
          ${ui.AiMitraFab({ nudge: v.nudge === "on" ? d.aiNudge : null })}
          ${v.emi === "on"
            ? OPL.raw(`<div class="floating__slot"><div><div class="floating__slot-inner">${ui.NoticeBanner(d.emi)}</div></div></div>`)
            : ""}
          ${ui.BottomNav({ items: d.nav, active: "finance" })}
        </div>`;

      this.wire(screen, v);
    },

    _timers: [],
    _clearTimers() { this._timers.forEach((t) => { clearTimeout(t); clearInterval(t); }); this._timers = []; },

    wire(screen, v) {
      this._clearTimers();
      const motionOff = OPL.state.get().motion === "off" || OPL.reducedMotion();
      const scroller = screen.querySelector(".scroller");
      const track = screen.querySelector(".hero__track");
      const slides = [...track.children];
      const dots = screen.querySelector(".dots");
      const startIndex = v.order === "subsidies" ? 1 : 0;
      let index = startIndex;
      const counted = new Set();

      /* status bar surface on scroll */
      scroller.addEventListener("scroll", () => screen.classList.toggle("is-scrolled", scroller.scrollTop > 8), { passive: true });

      /* hero carousel: native scroll-snap + parallax + dots */
      const setDots = (i) => {
        dots.querySelectorAll(".dot").forEach((d, k) => d.classList.toggle("is-active", k === i));
      };
      const countHero = (i) => {
        const amt = slides[i] && slides[i].querySelector(".hero__amount");
        if (!amt || counted.has(i) || amt.hasAttribute("data-static")) return;
        counted.add(i);
        OPL.countUp(amt, { to: +amt.dataset.amount, prefix: amt.dataset.prefix, suffix: amt.dataset.suffix, duration: 1000 });
      };
      const onTrackScroll = () => {
        const w = track.clientWidth;
        if (!w) return;
        slides.forEach((s, k) => s.style.setProperty("--p", ((k * w - track.scrollLeft) / w).toFixed(3)));
        const i = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / w)));
        if (i !== index) { index = i; setDots(i); restartAuto(); countHero(i); }
      };
      track.addEventListener("scroll", onTrackScroll, { passive: true });
      const goTo = (i, smooth = true) => track.scrollTo({ left: i * track.clientWidth, behavior: smooth && !OPL.reducedMotion() ? "smooth" : "auto" });
      dots.addEventListener("click", (e) => { const d = e.target.closest("[data-dot]"); if (d) goTo(+d.dataset.dot); });

      /* auto-advance (variant): active dot becomes a 5s progress bar */
      const auto = v.autoplay === "on";
      dots.classList.toggle("is-auto", auto);
      function restartAuto() {
        if (!auto) return;
        const f = dots.querySelector(".dot.is-active .dot__fill");
        if (!f) return;
        f.style.animation = "none"; void f.offsetWidth; f.style.animation = "";
      }
      // Only the progress fill advances slides (the dots' own entrance animation also bubbles here).
      dots.addEventListener("animationend", (e) => {
        if (auto && e.animationName === "dot-progress") goTo((index + 1) % slides.length);
      });
      track.addEventListener("pointerdown", () => dots.classList.add("is-paused"));
      ["pointerup", "pointercancel", "pointerleave"].forEach((t) => track.addEventListener(t, () => dots.classList.remove("is-paused")));

      // Position on the start slide synchronously (rAF doesn't run in hidden tabs).
      track.scrollLeft = startIndex * track.clientWidth;
      onTrackScroll();

      /* EMI banner dismiss: slide away, then the slot collapses and the FAB settles */
      const slot = screen.querySelector(".floating__slot");
      if (slot) {
        slot.querySelector("[data-dismiss]").addEventListener("click", (e) => {
          e.stopPropagation();
          slot.classList.add("is-leaving");
          setTimeout(() => slot.classList.add("is-gone"), 180);
        });
      }

      /* hero offer cards: cycle the stack on the visible slide */
      let heroHeld = false;
      track.addEventListener("pointerdown", () => (heroHeld = true));
      ["pointerup", "pointercancel", "pointerleave"].forEach((t) => track.addEventListener(t, () => (heroHeld = false)));
      if (v.stack === "cycle" && !motionOff) {
        slides.forEach((slide, k) => {
          const el = slide.querySelector("[data-stack]");
          const cycle = makeStack(el);
          const tick = () => { if (index === k && !heroHeld && !document.hidden) cycle(); };
          this._timers.push(setTimeout(() => this._timers.push(setInterval(tick, 3200)), 2200));
        });
      }

      /* AI Mitra nudge: slides out once after the entrance, tucks back after ~4s
         (or as soon as the user starts scrolling) */
      const fabWrap = screen.querySelector(".fab-wrap");
      if (fabWrap && fabWrap.querySelector(".fab-nudge") && !motionOff) {
        const hide = () => fabWrap.classList.remove("is-nudging");
        this._timers.push(setTimeout(() => {
          fabWrap.classList.add("is-nudging");
          this._timers.push(setTimeout(hide, 4200));
          scroller.addEventListener("scroll", hide, { once: true, passive: true });
        }, 1900));
      }

      /* drag-to-scroll for rails with a mouse (presenting on a laptop) */
      screen.querySelectorAll(".rail, .hero__track").forEach(enableMouseDrag);

      this.enter(screen, startIndex, countHero);
    },

    /* Entrance choreography: hero copy → back card → front card → CTA → dots
       → quick actions → sections. Re-runnable from the panel. */
    enter(screen, startIndex = 0, countHero) {
      if (OPL.state.get().motion === "off") return;
      const home = screen.querySelector(".home");
      const slide = screen.querySelectorAll(".hero__slide")[startIndex];
      const order = [
        slide.querySelector(".hero__titleblock"),
        slide.querySelector('.stack-item[data-pos="back"] > .hero-card'),
        slide.querySelector('.stack-item[data-pos="front"] > .hero-card'),
        slide.querySelector(".btn"),
        screen.querySelector(".dots"),
        ...screen.querySelectorAll(".qa"),
        ...[...screen.querySelectorAll(".home-section")].flatMap((s) => [
          s.querySelector(".section-head"),
          ...s.querySelectorAll(".chip"),
          ...[...s.querySelectorAll(".match")].slice(0, 2),
        ]),
        screen.querySelector(".help"),
      ].filter(Boolean);
      order.forEach((el, i) => { el.classList.add("enter"); el.style.setProperty("--i", Math.min(i, 16)); });
      screen.classList.remove("is-entering"); home.classList.remove("is-entering");
      void home.offsetWidth;
      screen.classList.add("is-entering"); home.classList.add("is-entering");
      setTimeout(() => { screen.classList.remove("is-entering"); home.classList.remove("is-entering"); }, 4400);
      if (countHero) setTimeout(() => countHero(startIndex), 150);
    },
  };

  /* Stack cycle: front → tucks under the CTA; back → front; next queued → back.
     With two cards the old front re-enters as the back card. */
  function makeStack(el) {
    const items = [...el.querySelectorAll(".stack-item")];
    const order = items.map((_, i) => i);
    const assign = () => items.forEach((it, k) => {
      const r = order.indexOf(k);
      it.dataset.pos = r === 0 ? "front" : r === 1 ? "back" : "queue";
    });
    let busy = false;
    return function step() {
      if (busy || items.length < 2) return;
      busy = true;
      const leaving = items[order[0]];
      leaving.dataset.pos = "leave";
      order.push(order.shift());
      items[order[0]].dataset.pos = "front";
      if (items.length > 2) items[order[1]].dataset.pos = "back";
      setTimeout(() => {
        leaving.classList.add("is-instant");
        leaving.dataset.pos = "queue";
        void leaving.offsetWidth;
        leaving.classList.remove("is-instant");
        assign();
        busy = false;
      }, 700);
    };
  }

  function enableMouseDrag(el) {
    let down = false, sx = 0, sl = 0, moved = false;
    el.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse") return;
      down = true; moved = false; sx = e.clientX; sl = el.scrollLeft;
      el.style.scrollSnapType = "none";
    });
    window.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = sl - dx;
    });
    window.addEventListener("pointerup", () => {
      if (!down) return;
      down = false;
      el.style.scrollSnapType = "";
      // let snap settle, and swallow the click that ends a drag
      if (moved) el.addEventListener("click", (e) => { e.stopPropagation(); e.preventDefault(); }, { capture: true, once: true });
    });
  }
})();
