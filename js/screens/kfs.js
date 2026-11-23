/* ==========================================================================
   Screen · KFS reader — Figma 416:43474 (page 1, accept locked) and
   416:43604 (page 4, read to the end, consent ticked, Accept enabled).
   Entry: Application detail (KFS ready) → "Review Full KFS & Accept".
   Behaviour: the page counter and read-progress bar follow the scroll; reaching
   the last page unlocks the consent row (the hint collapses); ticking it enables
   Accept KFS → Step 2 (NeSL signing, not built yet: hotspot "nesl").
   ========================================================================== */
(function () {
  const { html, ui } = OPL;
  OPL.screens = OPL.screens || {};
  const D = () => OPL.data.kfsDoc;

  const row = ([n, label, value], i) =>
    `<div class="kfs-row${i % 2 ? " kfs-row--alt" : ""}"><span class="kfs-row__n">${n}</span><span class="kfs-row__l">${label}</span><span class="kfs-row__v">${value}</span></div>`;

  const ack = (a) => `
    <div class="kfs-ack">
      <p class="kfs-ack__title">${a.title}</p>
      <p class="kfs-ack__text">${a.text}</p>
      <div class="kfs-ack__sign">${a.lines.map((t) => `<div><span></span><p>${t}</p></div>`).join("")}</div>
      <p class="kfs-ack__foot">${a.foot}</p>
    </div>`;

  const pageEl = (p, i, total, head) => OPL.raw(`
    <article class="kfs-page" data-kfs-page="${i}">
      <div class="kfs-page__lh">${ui.Logo({ id: head.logo, size: 16 })}<span class="kfs-page__org">${head.name}</span><span class="kfs-page__no">Page ${i + 1} of ${total}</span></div>
      <span class="kfs-page__rule"></span>
      ${p.title ? `<h3 class="kfs-page__title">${p.title}</h3>` : ""}
      ${p.meta ? `<p class="kfs-page__meta">${p.meta}</p>` : ""}
      <h4 class="kfs-page__part">${p.part}</h4>
      <div class="kfs-table">${p.rows.map(row).join("")}</div>
      ${p.note ? `<p class="kfs-page__note">${p.note}</p>` : ""}
      ${p.ack ? ack(p.ack) : ""}
    </article>`);

  OPL.screens.kfs = {
    title: "Key Fact Statement",
    figma: { start: "416:43474", end: "416:43604" },
    timers: [],
    leave() { this.timers.forEach((t) => clearTimeout(t)); this.timers = []; (this._ro || {}).disconnect?.(); },

    render(page) {
      this.leave();
      const d = D();
      const v = OPL.variantValues("kfs");
      const apps = OPL.apps.currentApps();
      const id = OPL.state.get().app || (apps.find((a) => a.status === "kfs") || {}).id || "pick-citi";
      const l = OPL.apps.lender(id);
      const head = { logo: l.logo, name: d.letterhead[id] || l.name };
      const pages = d.pages(l);

      page.innerHTML = html`
        <div class="kfs">
          <div class="kfs-top">
            ${ui.StatusBar()}
            <header class="kfs-head">
              <button class="app-header__back" aria-label="Back" data-press data-back>${OPL.icon("arrow-left-b", 24)}</button>
              <div class="kfs-head__title"><h1>${l.name} Key Fact Statement</h1><p>${d.step}</p></div>
              <button class="kfs-head__dl" aria-label="Download KFS" data-press data-goto="kfs-download">${OPL.icon("download", 24)}</button>
            </header>
          </div>
          <div class="kfs-canvas scroller">
            <div class="kfs-pages">${pages.map((p, i) => pageEl(p, i, pages.length, head))}</div>
            <p class="kfs-end">${d.end}</p>
          </div>
          <span class="kfs-counter" aria-live="polite"><b data-kfs-n>1</b> / ${pages.length}</span>
          <div class="kfs-foot" data-kfs-foot>
            <span class="kfs-progress"><i data-kfs-bar style="width:${100 / pages.length}%"></i></span>
            <button class="kfs-consent" data-kfs-consent aria-pressed="false" disabled>
              ${OPL.icon("check-square", 24)}<span>${OPL.raw(d.consent)}</span>
            </button>
            <div class="kfs-hint"><p>${d.hint}</p></div>
            ${ui.Button({ label: d.cta, block: true, goto: "nesl", attrs: "disabled data-kfs-accept" })}
          </div>
        </div>`;

      this.wire(page, v);
    },

    wire(page, v) {
      const root = page.querySelector(".kfs");
      const sc = page.querySelector(".kfs-canvas");
      const pages = [...page.querySelectorAll("[data-kfs-page]")];
      const num = page.querySelector("[data-kfs-n]");
      const counter = page.querySelector(".kfs-counter");
      const bar = page.querySelector("[data-kfs-bar]");
      const foot = page.querySelector("[data-kfs-foot]");
      const consent = page.querySelector("[data-kfs-consent]");
      const accept = page.querySelector("[data-kfs-accept]");
      const last = pages.length - 1;
      let cur = 0, seen = 0, unlocked = false, checked = false, raf = 0;

      // The footer is 172 while locked and 144 once the hint collapses; the canvas,
      // counter and progress bar follow its height.
      // On phones narrower than 390 the 342 pages scale to fit the 24px margins (fit-to-width).
      const syncFoot = () => {
        root.style.setProperty("--kfs-foot", foot.offsetHeight + "px");
        root.style.setProperty("--kfs-zoom", Math.min(1, (root.clientWidth - 48) / 342).toFixed(4));
      };
      if (window.ResizeObserver) { this._ro = new ResizeObserver(syncFoot); this._ro.observe(foot); this._ro.observe(root); }
      syncFoot();

      const pop = (el) => { el.classList.remove("is-popping"); void el.offsetWidth; el.classList.add("is-popping"); };

      const unlock = (quiet) => {
        if (unlocked) return;
        unlocked = true;
        consent.disabled = false;
        root.classList.add("is-unlocked");
        if (!quiet && navigator.vibrate && navigator.userActivation?.hasBeenActive) navigator.vibrate(6);
      };
      const setChecked = (on) => {
        checked = on;
        consent.setAttribute("aria-pressed", on);
        consent.querySelector("img").src = `assets/icons/${on ? "check-square-checked" : "check-square"}.svg`;
        accept.disabled = !on;
      };

      // Current page = the last one whose top has passed the middle of the canvas;
      // the bottom of the scroll always counts as the last page.
      const update = () => {
        raf = 0;
        const top0 = sc.getBoundingClientRect().top;
        const mid = sc.clientHeight / 2;
        const atEnd = sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 8;
        let i = 0;
        pages.forEach((p, k) => { if (p.getBoundingClientRect().top - top0 <= mid) i = k; });
        if (atEnd) i = last;
        if (i !== cur) { cur = i; num.textContent = i + 1; pop(counter); }
        if (i > seen) { seen = i; bar.style.width = ((seen + 1) / pages.length) * 100 + "%"; }
        if (seen === last) unlock();
      };
      sc.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });

      consent.addEventListener("click", () => {
        if (!unlocked) return;
        setChecked(!checked);
        pop(consent);
        if (navigator.vibrate) navigator.vibrate(6);
      });

      // Figma 416:43604: scrolled to the end, consent ticked, Accept enabled.
      if (v.read === "end") {
        root.classList.add("is-instant");
        requestAnimationFrame(() => {
          if (!page.isConnected) return;
          sc.scrollTop = sc.scrollHeight;
          update(); unlock(true); setChecked(true); syncFoot();
          this.timers.push(setTimeout(() => root.classList.remove("is-instant"), 60));
        });
      }

      OPL.fx.enter(page, pages.slice(0, 2));
    },
  };
})();
