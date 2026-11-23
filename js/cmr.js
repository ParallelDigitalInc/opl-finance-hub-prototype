/* ==========================================================================
   CIBIL MSME Rank sheet (proposed). Shared by Home and Loans overview: any
   [data-goto="cmr-score"] on the page opens it instead of flashing a hotspot.
   The gauge is the desktop card's asset (476:200254, assets/lazy/dsk/cmr-bars.svg):
   bars sweep in, the needle swings down from 10 to the rank while the number
   counts down with it, then the rank's bars pulse once.
   Icons: Solar bold-duotone, in assets/lazy/cmr/.
   ========================================================================== */
(function () {
  const { html, cx, raw, ui, fx } = OPL;
  const LAZY = "assets/lazy/cmr/";
  const cicon = (name, size = 20, cls = "") =>
    raw(`<img class="ico ${cls}" src="${LAZY}${name}.svg" width="${size}" height="${size}" alt="" draggable="false">`);

  ui.CmrGauge = (d) => html`
    <div class="cmrg-wrap">
      <div class="cmrg" style="--rank-angle:${d.angle}deg" role="img" aria-label="Rank ${d.rank} of 10, ${d.risk}">
        <div class="cmrg__bars" data-cmr-bars></div>
        <span class="cmrg__min">01</span><span class="cmrg__max">10</span>
        <span class="cmrg__needle" aria-hidden="true"><span class="cmrg__tri"><img src="assets/lazy/dsk/cmr-pointer.svg" alt=""></span></span>
        <div class="cmrg__read">
          <p class="cmrg__rank" data-cmr-rank>${d.rank}</p>
          <span class="cmrg__chip">${d.risk}</span>
        </div>
      </div>
    </div>`;

  /* Factor tile: front = the figure, back = why it matters. Tap flips. */
  ui.CmrFactor = (f, i) => html`
    <li class="${cx("cmrf", f.wide && "cmrf--wide")}" data-status="${f.status}" style="--i:${i}">
      <button class="cmrf__tile" aria-pressed="false" aria-label="${f.caption}: ${f.to}${f.suffix}, ${f.label}, ${f.impact}" data-cmr-factor>
        <span class="cmrf__card">
          <span class="cmrf__face cmrf__front">
            <span class="cmrf__top">${cicon(f.icon, 22)}${cicon("info", 16, "cmrf__hint")}</span>
            <span class="cmrf__main">
              <span class="cmrf__fig"><span class="cmrf__num" data-to="${f.to}" data-suffix="${f.suffix}">${f.to}${f.suffix}</span><span class="cmrf__dot"></span></span>
              <span class="cmrf__cap">${f.caption}</span>
              ${f.meter ? raw(`<span class="cmrf__meter" style="--now:${f.to}%;--target:${f.meter.target}%"><span class="cmrf__mfill"></span><span class="cmrf__mtick"></span></span>`) : ""}
            </span>
            <span class="cmrf__foot"><span class="cmrf__impact">${f.impact}</span><span class="cmrf__status">${f.label}</span></span>
          </span>
          <span class="cmrf__face cmrf__back" aria-hidden="true">
            <span class="cmrf__top"><span class="cmrf__bimpact">${f.impact}</span>${cicon("flip", 16, "cmrf__hint")}</span>
            <span class="cmrf__detail">${f.detail}</span>
          </span>
        </span>
      </button>
    </li>`;

  ui.CmrSheet = (d) => html`
    <div class="sheet-layer" data-sheet="cmr" hidden>
      <div class="sheet-scrim" data-sheet-close></div>
      <section class="sheet bsheet cmrs" role="dialog" aria-modal="true" aria-label="${d.title}" data-cmr-sheet>
        <div class="bsheet__grip" data-sheet-drag>
          <span class="bsheet__grabber"></span>
          <div class="bsheet__head">
            <div class="cmrs__titles"><h2 class="bsheet__title">${d.title}</h2><p class="cmrs__updated">${d.updated}</p></div>
            <button class="bsheet__close" aria-label="Close" data-press data-sheet-close>${OPL.sicon("sheet-x", 16)}</button>
          </div>
        </div>
        <div class="bsheet__body cmrs__body">
          <section class="cmrs__hero">
            ${ui.CmrGauge(d)}
            <p class="cmrs__verdict">${d.verdict}</p>
          </section>

          <section class="cmrs__sec">
            <div class="cmrs__h"><h3 class="bsheet__h">${d.factorsTitle}</h3><span class="cmrs__hint">${d.factorsHint}</span></div>
            <ul class="cmrs__factors">${d.factors.map((f, i) => ui.CmrFactor(f, i))}</ul>
          </section>

          <section class="cmrs__sec">
            <h3 class="bsheet__h">${d.pathTitle}</h3>
            <article class="cmrp" style="--from:${d.lead.from}%;--to:${d.lead.to}%">
              <div class="cmrp__top">
                <span class="cmrp__ico">${cicon(d.lead.icon, 22)}</span>
                <span class="cmrp__tag">${cicon("stars", 14)}${d.lead.tag}</span>
              </div>
              <h4 class="cmrp__title">${d.lead.title}</h4>
              <p class="cmrp__body">${d.lead.body}</p>
              <div class="cmrp__shift" aria-hidden="true">
                <div class="cmrp__track"><span class="cmrp__fill"></span><span class="cmrp__mark"></span></div>
                <div class="cmrp__nums"><span class="cmrp__num"><span data-cmr-shift>${d.lead.from}%</span> used</span><span class="cmrp__goal">down from ${d.lead.from}%</span></div>
              </div>
              <button class="cmrp__link" data-press data-goto="${d.lead.link.goto}">${d.lead.link.label}${cicon("arrow", 16)}</button>
            </article>
          </section>

          <p class="cmrs__note">${cicon("shield", 18)}<span>${d.note}</span></p>
        </div>
        <div class="bsheet__foot" data-sheet-foot>
          <button class="btn btn--lg btn--filled btn--strong btn--block" data-press data-goto="${d.cta.goto}"><span class="btn__label">${d.cta.label}</span>${cicon("arrow-white", 16)}</button>
        </div>
      </section>
    </div>`;

  /* Behaviour. Call with the page's fx.sheets() instance. */
  fx.cmrSheet = (page, sheets, timers = []) => {
    const d = OPL.data.cmr;
    page.insertAdjacentHTML("beforeend", ui.CmrSheet(d).toString());
    const el = page.querySelector("[data-cmr-sheet]");
    const body = el.querySelector(".bsheet__body");
    const foot = el.querySelector("[data-sheet-foot]");
    const gauge = el.querySelector(".cmrg");
    const rankEl = el.querySelector("[data-cmr-rank]");
    const lead = el.querySelector(".cmrp");
    const shiftNum = el.querySelector("[data-cmr-shift]");
    const t = (fn, ms) => timers.push(setTimeout(fn, ms));

    let barsReady = null;
    const loadBars = () => (barsReady ||= fetch("assets/lazy/dsk/cmr-bars.svg").then((r) => r.text()).then((svg) => {
      const host = el.querySelector("[data-cmr-bars]");
      host.innerHTML = svg;
      // 10 ranks × 2 bars, drawn rank 1 → 10
      host.querySelectorAll("path").forEach((p, i) => {
        const r = Math.floor(i / 2) + 1;
        if (r === d.rank) p.classList.add("is-rank");
        p.style.setProperty("--i", i);
      });
    }).catch(() => {}));

    // The rank counts down 10 → rank while the needle swings, eased to match it
    const countDown = () => {
      const from = 10, to = d.rank, dur = 1150, t0 = performance.now();
      const ease = (x) => 1 - Math.pow(1 - x, 3);
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        rankEl.textContent = Math.round(from - (from - to) * ease(p));
        if (p < 1 && el.isConnected) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      t(() => { rankEl.textContent = to; }, dur + 80);      // lands even where frames are throttled
    };

    // Lead card: usage bar slides from 45% to 30% the first time it's in view
    const playShift = () => {
      if (lead.classList.contains("is-on")) return;
      lead.classList.add("is-on");
      if (fx.motionOff()) { shiftNum.textContent = `${d.lead.to}%`; return; }
      const t0 = performance.now(), dur = 900;
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        shiftNum.textContent = `${Math.round(d.lead.from - (d.lead.from - d.lead.to) * e)}%`;
        if (p < 1 && el.isConnected) requestAnimationFrame(step);
      };
      setTimeout(() => requestAnimationFrame(step), 250);
      t(() => { shiftNum.textContent = `${d.lead.to}%`; }, 250 + dur + 80);
    };
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && playShift()), { root: body, threshold: 0.6 })
      : null;

    // Tile figures count up as the tiles rise in
    const countFigures = () => el.querySelectorAll(".cmrf__num").forEach((n, i) => {
      const to = +n.dataset.to, suf = n.dataset.suffix, dur = 800, delay = 520 + i * 70;
      n.textContent = `0${suf}`;
      t(() => {
        const t0 = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - t0) / dur);
          n.textContent = `${Math.round(to * (1 - Math.pow(1 - p, 3)))}${suf}`;
          if (p < 1 && el.isConnected) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        t(() => { n.textContent = `${to}${suf}`; }, dur + 60);
      }, delay);
    });

    const lift = () => foot.classList.toggle("is-raised", body.scrollTop + body.clientHeight < body.scrollHeight - 2);
    body.addEventListener("scroll", lift, { passive: true });

    const open = ({ instant = false } = {}) => {
      const still = instant || fx.motionOff();
      gauge.classList.remove("is-in", "is-settled");
      lead.classList.remove("is-on");
      shiftNum.textContent = `${d.lead.from}%`;
      el.querySelectorAll(".cmrf.is-flipped").forEach((f) => { f.classList.remove("is-flipped"); f.querySelector("[data-cmr-factor]").setAttribute("aria-pressed", "false"); });
      if (!still) countFigures();
      body.scrollTop = 0;
      rankEl.textContent = still ? d.rank : 10;
      el.classList.remove("is-presenting"); void el.offsetWidth;
      if (!still) el.classList.add("is-presenting");
      sheets.open("cmr", { instant });
      loadBars().then(() => {
        if (still) { gauge.classList.add("is-in", "is-settled"); return; }
        t(() => { gauge.classList.add("is-in"); t(countDown, 420); }, 200);
        t(() => gauge.classList.add("is-settled"), 2000);
      });
      if (io) { io.disconnect(); t(() => io.observe(lead), 600); } else playShift();
      t(lift, 60); t(lift, 480);
      t(() => el.querySelector(".bsheet__close")?.focus({ preventScroll: true }), still ? 0 : 440);
    };

    page.addEventListener("click", (e) => {
      const trig = e.target.closest('[data-goto="cmr-score"]');
      if (trig && !trig.closest("[data-cmr-sheet]")) { e.stopPropagation(); open(); return; }
      const tile = e.target.closest("[data-cmr-factor]");
      if (tile) {
        const li = tile.closest(".cmrf"), on = !li.classList.contains("is-flipped");
        li.classList.toggle("is-flipped", on);
        tile.setAttribute("aria-pressed", on);
        li.querySelector(".cmrf__back").setAttribute("aria-hidden", !on);
      }
    });
    return { open };
  };
})();
