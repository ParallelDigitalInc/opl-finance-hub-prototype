/* ==========================================================================
   OPL Finance Hub · responsive prototype — Loans overview
   One page, two layouts: < 1024px is the mobile frame (1:1559), ≥ 1024px the
   desktop frame (1:1994). Motion and states are carried over from the kit
   (~/Code/opl-finance-hub-prototype): reveal gate, staggered entrance,
   count-up, hero card stack, AI Mitra nudge, rotating AI questions, CMR gauge
   sweep, chip filters + sort with FLIP, compare tray, tab ink, press states.
   ========================================================================== */
(function () {
  const D = window.LO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const motionOff = () => /motion=off/.test(location.hash) || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesk = () => matchMedia("(min-width: 1024px)").matches;
  const ico = (n, s = 16, cls = "") => `<img class="ico ${cls}" src="assets/icons/${n}.svg" width="${s}" height="${s}" alt="">`;
  const img = (n) => `assets/img/${n}`;
  const logo = (src, size = 40, cls = "") => `<span class="logo ${cls}" style="--s:${size}px"><img src="${img(src)}" alt="" width="${size}" height="${size}"></span>`;
  const mitra = (size = 24) => `<span class="mitra-mark" style="--s:${size}px">${ico("mitra-mini", Math.round(size * 0.4))}</span>`;

  /* ---- reveal gate (kit: OPL.afterReveal) ---------------------------------- */
  let revealed = false; const queue = [];
  const afterReveal = (fn) => (revealed ? fn() : queue.push(fn));

  /* ---- markup ------------------------------------------------------------- */
  const aiRow = (qs, cls = "") => `
    <button class="ai ${cls}" data-press data-next="mitra" data-ai-qs="${encodeURIComponent(JSON.stringify(qs))}" aria-label="Ask AI Mitra: ${qs[0]}">
      ${mitra(24)}<span class="ai__q"><span class="ai__t">${qs[0]}</span></span>${ico("arrow-ai", 14, "ai__arrow")}
    </button>`;

  const sectionHead = ({ title, count, to, mLabel = "View all", dLabel = "View All" }) => `
    <div class="sh">
      <h2 class="sh__title">${title}${count ? `<span class="count only-d">${count}</span>` : ""}</h2>
      <button class="link" data-press data-next="${to}"><span class="only-m">${mLabel}</span><span class="only-d">${dLabel}</span>${ico("chev-primary", 16, "only-m link__arrow")}${ico("arrow-primary", 14, "only-d link__arrow")}</button>
    </div>`;

  const loanCard = (c) => `
    <article class="match ${c.only === "m" ? "only-m" : ""}" data-card="${c.id}" data-press data-next="loan" tabindex="0">
      <div class="match__head">
        <span class="tag ${c.tagTone === "primary" ? "tag--primary" : ""}">${c.tag}</span>
        ${logo(c.logo, 40)}
        <p class="match__title">${c.name}</p>
        <p class="match__sub">${c.sub}</p>
      </div>
      <div class="match__body">
        <div class="figs">
          <div class="fig"><span class="fig__l">Loan up to</span><span class="fig__v">${c.amount}</span></div>
          <div class="fig"><span class="fig__l">Interest</span><span class="fig__v">${c.rate}<small>p.a.</small></span></div>
        </div>
        ${c.details.length ? `
        <dl class="details only-d">${c.details.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
        <div class="match__foot only-d">
          <button class="check" role="checkbox" aria-checked="false" data-compare="${c.id}">
            <span class="check__box"><span class="check__on"></span></span><span class="check__label">Compare</span>
          </button>
          <button class="btn btn--outline" data-press data-next="apply">Apply Now</button>
        </div>` : ""}
      </div>
    </article>`;

  const render = () => {
    const h = D.hero, L = D.limit, C = D.cibil, M = D.matches, S = D.subsidies, T = D.debt;
    $("#app").innerHTML = `
    <aside class="side" aria-label="Main navigation">
      <button class="biz" data-press data-next="side">
        <span class="biz__avatar">${D.business.initials}</span><span class="biz__name">${D.business.name}</span>${ico("side-chevrons", 16)}
      </button>
      ${D.side.map((g) => `
        <div class="side__group">
          <p class="side__heading">${g.heading}</p>
          ${g.items.map(([id, label]) => `
            <button class="side__item ${id === "loans" ? "is-active" : ""}" data-press ${id === "loans" ? 'aria-current="page"' : 'data-next="side"'} data-tip="${label}">
              ${ico(id === "gst" ? "side-gst" : "side-" + id, id === "gst" ? 14 : 16, "side__icon")}<span class="side__label">${label}</span>
            </button>`).join("")}
        </div>`).join("")}
      <div class="side__spacer"></div>
      <div class="side__foot">
        <div class="side__divider"></div>
        <button class="side__item" data-press data-next="side" data-tip="Help & Support">${ico("side-help", 16, "side__icon")}<span class="side__label">Help &amp; Support</span></button>
        <button class="side__item" data-press data-next="side" data-tip="Settings">${ico("side-settings", 16, "side__icon")}<span class="side__label">Settings</span></button>
      </div>
    </aside>

    <div class="main">
      <header class="top">
        <button class="top__toggle" data-side-toggle aria-label="Collapse sidebar" title="Collapse sidebar  [">${ico("side-toggle", 40)}</button>
        <label class="search">${ico("top-search", 14)}<input class="search__input" placeholder="Search everything..." aria-label="Search"><kbd>⌘K</kbd></label>
        <div class="top__actions">
          <button class="round" data-press data-next="call" aria-label="Help">${ico("headphones", 20)}</button>
          <button class="round round--bare" data-press data-next="side" aria-label="Notifications">${ico("top-bell", 42, "ring-on-hover")}</button>
          <button class="round round--bare" data-press data-next="side" aria-label="Messages">${ico("top-chat", 42)}</button>
          <div class="lang" role="radiogroup" aria-label="Language"><span class="lang__ink"></span><button class="is-on" role="radio" aria-checked="true">EN</button><button role="radio" aria-checked="false" data-lang>हिं</button></div>
        </div>
      </header>

      <main class="lo">
        <!-- ===== mobile hero (1:1560–1:1631) ===== -->
        <section class="m-hero only-m">
          <div class="m-hero__bg"><img class="m-hero__tex" src="${img("hero-texture.jpg")}" alt=""><img class="m-hero__glow" src="assets/icons/hero-ellipse.svg" alt=""></div>
          <div class="m-head">
            <button class="m-head__back" data-press data-next="side" aria-label="Back">${ico("back", 24)}</button>
            <h1 class="m-head__title">${D.header.title}</h1>
            <button class="round round--tile" data-press aria-label="Search">${ico("search", 20)}</button>
            <button class="round round--tile" data-press data-next="call" aria-label="Help">${ico("headphones", 20)}</button>
          </div>
          <div class="m-hero__content">
            <div class="m-hero__title" data-m-enter>
              <p class="m-hero__eyebrow">${h.eyebrow}</p>
              <p class="m-hero__amount" data-count="${h.amount}" data-prefix="${h.prefix}" data-suffix="${h.suffix}">${h.prefix}${h.amount}${h.suffix}</p>
              <div class="facts">${h.facts.map((f) => `<span class="fact">${f.lead ? `${f.lead} ` : ""}<b>${f.value}</b></span>`).join("")}</div>
            </div>
            <div class="stack" data-stack>
              ${h.stack.map((c, i) => `
                <div class="stack__item" data-pos="${i === 0 ? "front" : i === 1 ? "back" : "queue"}" data-i="${i}">
                  <div class="hcard" data-m-enter="${i === 0 ? "front" : "back"}"><div class="hcard__inner">${logo(c.logo, 44)}<div><p class="hcard__title">${c.name}</p><p class="hcard__sub">${c.sub}</p></div></div></div>
                </div>`).join("")}
            </div>
            <button class="btn btn--filled btn--block btn--lg" data-press data-next="all-loans" data-m-enter>${h.cta}${ico("chev-white", 16, "btn__arrow")}</button>
            <div class="dots" data-m-enter role="tablist" aria-label="Featured offers">${h.stack.map((_, i) => `<button class="dot ${i === 0 ? "is-active" : ""}" data-dot="${i}" aria-label="Offer ${i + 1}"><span class="dot__fill"></span></button>`).join("")}</div>
          </div>
        </section>

        <section class="qa-row only-m">
          ${D.quick.map((q) => `<button class="qa" data-press data-next="${q.to}" data-m-enter><span class="qa__tile">${ico(q.icon, 40)}</span><span class="qa__label">${q.label}</span></button>`).join("")}
        </section>

        <!-- ===== desktop page head + tabs ===== -->
        <div class="d-head only-d" data-d-enter>
          <h1 class="d-head__title">Loans</h1>
          <nav class="tabs" role="tablist">
            ${D.tabs.map((t) => `<button class="tab ${t.id === "overview" ? "is-active" : ""}" role="tab" aria-selected="${t.id === "overview"}" data-tab="${t.id}">
              <span class="tab__icons">${ico(t.id === "overview" ? "tab-overview-off" : t.icon, 14, "tab__off")}${ico(t.id === "overview" ? t.icon : t.icon + "-on", 14, "tab__on")}</span>${t.label}</button>`).join("")}
            <span class="tabs__fill"></span><span class="tabs__ink"></span>
          </nav>
        </div>

        <!-- ===== desktop hero row ===== -->
        <div class="d-top only-d">
          <section class="limit" data-d-enter>
            <img class="limit__tex" src="${img("hero-texture.jpg")}" alt="">
            <div class="limit__copy">
              <p class="limit__eyebrow">${L.eyebrow}</p>
              <p class="limit__amount" data-count="${L.amount}" data-prefix="${L.prefix}" data-suffix="${L.suffix}">${L.prefix}${L.amount}${L.suffix}</p>
            </div>
            <div class="glass">
              <div class="picks">${L.picks.map((p) => `<div class="pick"><span class="pick__icon">${ico(p.icon, 20)}</span><div><p class="pick__label">${p.label}</p><p class="pick__value">${p.value}</p></div></div>`).join("")}</div>
              ${aiRow(L.ai, "ai--glass")}
            </div>
          </section>
          <section class="cibil" data-d-enter>
            <div class="cibil__head">
              <p class="cibil__title">${C.title}<span class="info" tabindex="0">${ico("info-circle", 16)}<span class="tip" role="tooltip">${C.info}</span></span></p>
              <p class="cibil__updated">${C.updated}</p>
            </div>
            <div class="cibil__gauge">
              <div class="gauge" data-rank="${C.rank}" style="--rank-angle:${C.angle}deg">
                <div class="gauge__bars" data-bars><img src="assets/icons/cmr-bars.svg" width="180" height="90" alt=""></div>
                <span class="gauge__min">01</span><span class="gauge__max">10</span>
                <span class="gauge__needle"><span class="gauge__tri">${ico("cmr-pointer", 12)}</span></span>
                <div class="gauge__read"><p class="gauge__rank">${C.rank}</p><span class="gauge__chip">${C.risk}</span></div>
              </div>
            </div>
            ${aiRow(C.ai, "ai--card")}
          </section>
        </div>

        <!-- ===== Top loan matches (shared) ===== -->
        <section class="sec sec--loans" data-d-enter>
          <div data-m-enter>${sectionHead({ title: M.title, count: M.count, to: "all-loans" })}</div>
          <div class="toolbar only-d">
            <div class="toolbar__chips">${M.chips.map((c) => `<button class="chip" data-press data-chip="${c}" aria-pressed="false">${c}</button>`).join("")}</div>
            <div class="toolbar__right">
              <div class="menu-anchor">
                <button class="chip chip--sort" data-press data-menu aria-haspopup="menu" aria-expanded="false">${ico("sort", 16)}<span class="muted">Sort by</span><b data-sort-label>${M.sorts[0]}</b>${ico("arrow-muted", 14, "chev")}</button>
                <div class="menu" role="menu">${M.sorts.map((s, i) => `<button class="menu__item ${i === 0 ? "is-on" : ""}" role="menuitemradio" aria-checked="${i === 0}" data-sort="${s}">${s}<span class="menu__tick"></span></button>`).join("")}</div>
              </div>
              <button class="chip" data-press data-next="all-loans">${ico("filter", 16)}<span class="muted-m">Filters</span>${ico("arrow-muted", 14, "chev")}</button>
            </div>
          </div>
          <div class="cards rail" data-cards>${M.cards.map(loanCard).join("")}</div>
        </section>

        <!-- ===== mobile: Top subsidy matches ===== -->
        <section class="sec only-m">
          <div data-m-enter>${sectionHead({ title: S.title, to: "all-subsidies" })}</div>
          <div class="chips rail" data-m-enter>${S.chips.map((c) => `<button class="chip" data-press data-next="all-subsidies">${ico(c.icon, 18)}${c.label}${c.count ? `<span class="count">${c.count}</span>` : ""}</button>`).join("")}</div>
          <div class="rail">${S.cards.map((c) => `
            <article class="match match--subsidy" data-press data-next="subsidy" tabindex="0" data-m-enter="left">
              <div class="match__head">
                <span class="tag ${c.tagTone === "primary" ? "tag--primary" : ""}">${c.tag}</span>
                ${logo(c.logo, 40, `logo--ring${c.ring}`)}
                <p class="match__title match__title--2">${c.name}</p>
                <p class="match__sub match__sub--cap">${c.sub}</p>
              </div>
              <div class="match__body"><div class="fig"><span class="fig__l">${c.label}</span><span class="fig__v">${c.value}</span></div></div>
            </article>`).join("")}</div>
        </section>

        <!-- ===== desktop: Debt Profile ===== -->
        <section class="debt only-d" data-d-enter>
          <div class="sh"><h2 class="sh__title">Debt Profile</h2><button class="link" data-press data-next="debt">View Details${ico("arrow-primary", 14, "link__arrow")}</button></div>
          <div class="tiles">${T.tiles.map((t, i) => `
            <div class="tile tile--${t.pos}" data-press data-next="debt">
              ${t.tag ? `<span class="tag tag--warn">${t.tag}</span>` : ""}
              <div class="tile__copy"><p class="tile__value" data-tile="${i}">${t.fmt(t.value)}</p><p class="tile__label">${t.label}</p></div>
              <img class="tile__ill" src="${img(t.img)}" alt="">
            </div>`).join("")}</div>
          <div class="debt__row">
            <article class="panel trend" data-trend>
              <div class="panel__title">${T.trend.title}<span class="info" tabindex="0">${ico("info-duo", 20)}<span class="tip" role="tooltip">${T.trend.info}</span></span></div>
              <div class="chart">
                <div class="chart__bars">${T.trend.bars.map(([m, v], i) => `
                  <button class="bar ${i === T.trend.active ? "is-active" : ""}" data-bar="${i}" style="--h:${(v / T.trend.max) * 100}%;--i:${i}" aria-label="${m}: ₹${v}K"><span class="bar__fill"></span></button>`).join("")}</div>
                <div class="chart__labels">${T.trend.bars.map(([m]) => `<span>${m}</span>`).join("")}</div>
                <span class="chart__tip" aria-live="polite">₹${T.trend.bars[T.trend.active][1]}K</span>
              </div>
            </article>
            <article class="panel emis">
              <div class="emis__head"><div class="panel__title">${T.term.title}<span class="count count--grey">${T.term.count}</span></div><button class="link" data-press data-next="emis">${T.term.link}${ico("arrow-primary", 14, "link__arrow")}</button></div>
              ${T.term.rows.map((r) => `<button class="emi" data-press data-next="emis"><span class="emi__icon">${ico(r.icon, 24)}</span><span class="emi__name"><b>${r.name}</b><small>${r.due}</small></span><span class="emi__amt">${r.amount}</span></button>`).join("")}
            </article>
          </div>
        </section>

        <!-- ===== mobile: help card ===== -->
        <section class="help only-m" data-m-enter>
          <div class="help__copy"><p class="help__title">${D.help.title}</p><p class="help__sub">${D.help.sub}</p></div>
          <button class="btn btn--filled btn--sm" data-press data-next="call">${ico("phone-calling", 14)}${D.help.cta}</button>
          <img class="help__ill" src="${img("help-headset.png")}" alt="">
        </section>
      </main>

      <div class="floating">
        <div class="fab-wrap">
          <span class="fab-nudge" aria-hidden="true"><span class="fab-nudge__text">${D.nudge.lead} <strong>${D.nudge.topic}</strong></span></span>
          <button class="fab" data-press data-next="mitra" aria-label="Ask AI Mitra">${ico("mitra-fab", 24)}</button>
        </div>
        <nav class="bnav only-m" aria-label="Loans">
          ${D.nav.map((n) => `<button class="bnav__item ${n.id === "overview" ? "is-active" : ""}" data-press ${n.id === "overview" ? 'aria-current="page"' : `data-next="${n.id}"`}><span class="bnav__pill">${ico(n.id === "overview" ? n.icon : n.icon, 24)}</span><span class="bnav__label">${n.label}</span></button>`).join("")}
        </nav>
      </div>
      <div class="cbar only-d" role="region" aria-label="Compare loans"></div>
      <div class="toast" role="status" aria-live="polite"></div>
    </div>`;
  };

  /* ---- behaviours --------------------------------------------------------- */
  const timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));

  // Press feedback on every [data-press] (kit core.js)
  const press = () => {
    let active = null;
    const release = () => { active?.classList.remove("is-pressed"); active = null; };
    document.addEventListener("pointerdown", (e) => { const el = e.target.closest("[data-press]"); if (el) { active = el; el.classList.add("is-pressed"); } });
    ["pointerup", "pointercancel", "pointerleave", "dragstart"].forEach((t) => document.addEventListener(t, release, true));
    document.addEventListener("scroll", release, { passive: true, capture: true });
  };

  // Toast — for destinations not built yet
  const toast = (text) => {
    const t = $(".toast");
    t.textContent = text;
    t.classList.remove("is-up"); void t.offsetWidth; t.classList.add("is-up");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("is-up"), 2400);
  };

  // Count-up (kit OPL.countUp: start value shown at once, ease-out cubic, timer-stepped)
  const countUp = (el, { to, fmt, duration = 1000, delay = 150 }) => {
    if (motionOff()) { el.textContent = fmt(to); return; }
    el.textContent = fmt(0);
    afterReveal(() => setTimeout(() => {
      const t0 = Date.now();
      const step = () => { const k = Math.min(1, (Date.now() - t0) / duration); el.textContent = fmt(to * (1 - Math.pow(1 - k, 3))); if (k < 1) setTimeout(step, 16); };
      step();
    }, delay));
  };

  // Entrance: mobile = kit Home order (title → back card → front card → CTA → dots → tiles → sections);
  // desktop = kit D.enter (blocks fade up 60ms apart)
  const enter = () => {
    if (motionOff()) return;
    $$("[data-m-enter]").forEach((el, i) => { el.classList.add("enter", `enter--${el.dataset.mEnter || "up"}`); el.style.setProperty("--i", Math.min(i, 16)); });
    $$("[data-d-enter]").forEach((el, i) => { el.classList.add("d-enter"); el.style.setProperty("--d", `${i * 60}ms`); });
    afterReveal(() => {
      document.body.classList.add("is-entering");
      requestAnimationFrame(() => $$("[data-d-enter]").forEach((el) => el.classList.add("is-in")));
      setTimeout(() => $$("[data-d-enter]").forEach((el) => el.classList.add("is-in")), 40);   // background tabs skip rAF
      later(() => document.body.classList.remove("is-entering"), 4400);
    });
  };

  // Hero stack: front tucks under the CTA, back comes forward (kit makeStack); dots fill as progress
  const heroStack = () => {
    const el = $("[data-stack]"); if (!el) return;
    const items = $$(".stack__item", el), dots = $$(".dot");
    const order = items.map((_, i) => i);
    let busy = false, held = false;
    const paintDots = () => dots.forEach((d, i) => d.classList.toggle("is-active", i === order[0]));
    const assign = () => items.forEach((it, k) => { const r = order.indexOf(k); it.dataset.pos = r === 0 ? "front" : r === 1 ? "back" : "queue"; });
    const step = () => {
      if (busy || items.length < 2) return;
      busy = true;
      const leaving = items[order[0]];
      leaving.dataset.pos = "leave";
      order.push(order.shift());
      items[order[0]].dataset.pos = "front";
      if (items.length > 2) items[order[1]].dataset.pos = "back";
      paintDots(); restartDot();
      setTimeout(() => { leaving.classList.add("is-instant"); leaving.dataset.pos = "queue"; void leaving.offsetWidth; leaving.classList.remove("is-instant"); assign(); busy = false; }, 700);
    };
    const dotsEl = $(".dots");
    const restartDot = () => { dotsEl.classList.remove("is-auto"); void dotsEl.offsetWidth; if (!motionOff()) dotsEl.classList.add("is-auto"); };
    const hero = $(".m-hero");
    hero.addEventListener("pointerdown", () => { held = true; dotsEl.classList.add("is-paused"); });
    ["pointerup", "pointercancel", "pointerleave"].forEach((t) => hero.addEventListener(t, () => { held = false; dotsEl.classList.remove("is-paused"); }));
    dots.forEach((d, i) => d.addEventListener("click", () => { if (order[0] !== i) step(); }));
    el.addEventListener("click", () => step());   // tap the cards to flip through them
    if (motionOff()) return;
    afterReveal(() => later(() => { restartDot(); timers.push(setInterval(() => { if (!held && !document.hidden && !isDesk()) step(); }, 3200)); }, 2200));
  };

  // AI Mitra nudge — slides out from behind the FAB once, tucks back after ~4s or on scroll
  const nudge = () => {
    const wrap = $(".fab-wrap"); if (!wrap || motionOff()) return;
    const hide = () => wrap.classList.remove("is-nudging");
    afterReveal(() => later(() => { wrap.classList.add("is-nudging"); later(hide, 4200); addEventListener("scroll", hide, { once: true, passive: true }); }, 1900));
  };

  // Rotating AI questions — old lifts away as the next rises into the same cell
  const aiRotate = () => {
    if (motionOff()) return;
    $$("[data-ai-qs]").forEach((row, k) => {
      const qs = JSON.parse(decodeURIComponent(row.dataset.aiQs));
      const cell = $(".ai__q", row);
      let i = 0, hold = false, seen = true;
      ["pointerenter", "focus"].forEach((ev) => row.addEventListener(ev, () => (hold = true)));
      ["pointerleave", "blur"].forEach((ev) => row.addEventListener(ev, () => (hold = false)));
      new IntersectionObserver((es) => (seen = es[0].isIntersecting), { threshold: 0.6 }).observe(row);
      const swap = () => {
        i = (i + 1) % qs.length;
        const old = $(".ai__t:not(.is-out)", cell);
        const next = document.createElement("span"); next.className = "ai__t is-in"; next.textContent = qs[i];
        cell.appendChild(next); old?.classList.add("is-out");
        setTimeout(() => { old?.remove(); next.classList.remove("is-in"); }, 520);
        row.setAttribute("aria-label", `Ask AI Mitra: ${qs[i]}`);
      };
      const tick = () => { if (!hold && seen && !document.hidden && isDesk()) swap(); later(tick, 4600); };
      afterReveal(() => later(tick, 3400 + k * 1700));
    });
  };

  // CMR gauge: bars sweep in one by one, needle swings to the rank, rank + chip settle (kit D.mountGauge)
  const gauge = async () => {
    const g = $(".gauge"); if (!g) return;
    const host = $("[data-bars]", g), rank = +g.dataset.rank;
    try {
      const svg = await (await fetch("assets/icons/cmr-bars.svg")).text();
      host.innerHTML = svg;
      $$("path", host).forEach((p, i) => { const r = Math.floor(i / 2) + 1; if (r === rank) p.classList.add("is-rank"); p.style.setProperty("--i", i); });
    } catch (_) { /* file:// — keep the <img>, skip the sweep */ g.classList.add("is-in", "is-settled"); return; }
    if (motionOff()) return g.classList.add("is-in", "is-settled");
    afterReveal(() => later(() => { g.classList.add("is-in"); later(() => g.classList.add("is-settled"), 20 * 34 + 600); }, 300));
  };

  // Tabs: ink sits under the active tab; on hover it leans toward the hovered one
  const tabs = () => {
    const bar = $(".tabs"), ink = $(".tabs__ink"); if (!bar) return;
    const place = (el, animate) => { ink.style.transition = animate ? "" : "none"; ink.style.width = `${el.offsetWidth}px`; ink.style.transform = `translateX(${el.offsetLeft}px)`; };
    const home = $(".tab.is-active", bar);
    const settle = () => place(home, false);
    settle(); document.fonts?.ready.then(settle); addEventListener("resize", settle);
    bar.addEventListener("pointerover", (e) => { const t = e.target.closest(".tab"); if (t && t !== home && matchMedia("(hover: hover)").matches) { ink.classList.add("is-lean"); place(t, true); } });
    bar.addEventListener("pointerleave", () => { ink.classList.remove("is-lean"); place(home, true); });
    bar.addEventListener("click", (e) => { const t = e.target.closest(".tab"); if (t && t !== home) toast(`${D.next[t.dataset.tab]} isn't built in this prototype yet`); });
  };

  // Chips filter, Sort menu, FLIP reorder (kit desktop Loans overview)
  const SORTS = {
    "Lowest interest": (a, b) => a.meta.rate - b.meta.rate,
    "Highest loan amount": (a, b) => b.meta.amt - a.meta.amt,
    "Lowest EMI": (a, b) => a.meta.emi - b.meta.emi,
    "Lowest processing fee": (a, b) => a.meta.fee - b.meta.fee,
  };
  const TEST = {
    "Collateral-free": (m) => m.collateralFree, "Working Capital": (m) => m.workingCapital,
    "Term loan": (m) => m.term, "Fee under 1%": (m) => m.fee < 1,
  };
  const st = { chips: [], sort: "Lowest interest", sorted: false };
  const refreshCards = () => {
    const box = $("[data-cards]");
    const before = new Map($$("[data-card]", box).filter((el) => el.offsetParent).map((el) => [el.dataset.card, el.getBoundingClientRect()]));
    let list = D.matches.cards.filter((c) => st.chips.every((ch) => TEST[ch](c.meta)));
    if (st.sorted) list = list.slice().sort(SORTS[st.sort]);
    const keep = new Set(list.map((c) => c.id));
    $$("[data-card]", box).forEach((el) => { el.hidden = !keep.has(el.dataset.card); });
    list.forEach((c) => box.appendChild($(`[data-card="${c.id}"]`, box)));
    $(".empty", box)?.remove();
    if (!$$("[data-card]", box).some((el) => !el.hidden && el.offsetParent)) {
      box.insertAdjacentHTML("beforeend", `<div class="empty"><p class="empty__title">${D.matches.empty.title}</p><p class="empty__body">${D.matches.empty.body}</p><button class="btn btn--outline" data-press data-clear>${D.matches.empty.cta}</button></div>`);
    }
    if (motionOff()) return;
    $$("[data-card]", box).filter((el) => !el.hidden && el.offsetParent).forEach((el, i) => {
      const b = before.get(el.dataset.card), a = el.getBoundingClientRect();
      if (b) { const dx = b.left - a.left, dy = b.top - a.top; if (dx || dy) el.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: "none" }], { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }); }
      else el.animate([{ opacity: 0, transform: "translateY(8px) scale(0.98)" }, { opacity: 1, transform: "none" }], { duration: 320, delay: i * 40, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" });
    });
  };

  // Compare: checkbox → tray slides up with picked lenders; count bumps on the Compare tab
  const cmp = [];
  const paintTray = (bump) => {
    const bar = $(".cbar"), n = cmp.length;
    const sub = n < 2 ? "Pick at least one more" : n < 3 ? "Add one more, or compare now" : "Ready to compare";
    bar.innerHTML = `
      <div class="cbar__picked">
        <div class="cbar__status"><p>${n} of 3 picked</p><small>${sub}</small></div>
        <div class="cbar__slots">
          ${cmp.map((id) => { const c = D.matches.cards.find((x) => x.id === id); return `<span class="cbar__chip ${id === bump ? "is-new" : ""}">${logo(c.logo, 36)}<b>${c.name}</b><button class="cbar__x" data-cbar-x="${id}" aria-label="Remove ${c.name}">×</button></span>`; }).join("")}
          ${[...Array(3 - n)].map((_, i) => `<span class="cbar__slot">Slot ${n + i + 1}</span>`).join("")}
        </div>
      </div>
      <div class="cbar__actions"><button class="cbar__clear" data-cbar-clear>Clear all</button><button class="cbar__go" data-next="compare" ${n < 2 ? "disabled" : ""}>Compare${ico("arrow-primary", 14, "cbar__arrow")}</button></div>`;
    bar.classList.toggle("is-up", n > 0);
    document.body.classList.toggle("has-cbar", n > 0);
    const tab = $('.tab[data-tab="compare"]');
    let badge = $(".tab__count", tab);
    if (!n) badge?.remove();
    else { if (!badge) { badge = document.createElement("span"); badge.className = "tab__count"; tab.appendChild(badge); } badge.textContent = n; badge.classList.remove("is-bump"); void badge.offsetWidth; badge.classList.add("is-bump"); }
  };
  const setCompare = (id, on) => { $$(`[data-compare="${id}"]`).forEach((c) => { c.classList.toggle("is-checked", on); c.setAttribute("aria-checked", on); }); };
  const toggleCompare = (id) => {
    const i = cmp.indexOf(id);
    if (i >= 0) cmp.splice(i, 1);
    else if (cmp.length < 3) cmp.push(id);
    else { $(".cbar").animate([{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "none" }], { duration: 260 }); return; }
    setCompare(id, cmp.includes(id));
    paintTray(cmp.includes(id) ? id : null);
  };

  // Repayment chart: bars grow in when seen; pointing at a bar moves the highlight + tooltip there
  const chart = () => {
    const box = $("[data-trend]"); if (!box) return;
    const tip = $(".chart__tip", box), bars = $$(".bar", box), V = D.debt.trend.bars;
    const focus = (i) => {
      bars.forEach((b, k) => b.classList.toggle("is-active", k === i));
      const b = bars[i], r = b.getBoundingClientRect(), c = $(".chart", box).getBoundingClientRect();
      const fill = $(".bar__fill", b).getBoundingClientRect();
      tip.textContent = `₹${V[i][1]}K`;
      tip.style.transform = `translate(${r.left - c.left + r.width / 2}px, ${fill.top - c.top - 8}px) translate(-50%, -100%)`;
    };
    const home = D.debt.trend.active;
    const settle = () => focus(bars.findIndex((b) => b.classList.contains("is-active")));
    bars.forEach((b, i) => { b.addEventListener("pointerenter", () => focus(i)); b.addEventListener("focus", () => focus(i)); b.addEventListener("click", () => focus(i)); });
    $(".chart__bars", box).addEventListener("pointerleave", () => focus(home));
    addEventListener("resize", settle);
    const show = () => { box.classList.add("is-drawn"); later(settle, 40); later(settle, 700); };
    if (motionOff()) return show();
    afterReveal(() => new IntersectionObserver((es, io) => { if (es.some((e) => e.isIntersecting)) { show(); io.disconnect(); } }, { threshold: 0.4 }).observe(box));
  };

  // Debt tiles count up when they come into view
  const tiles = () => {
    const els = $$("[data-tile]"); if (!els.length) return;
    const run = () => els.forEach((el) => { const t = D.debt.tiles[+el.dataset.tile]; countUp(el, { to: t.value, fmt: t.fmt, duration: 900, delay: 80 }); });
    if (motionOff()) return;
    afterReveal(() => new IntersectionObserver((es, io) => { if (es.some((e) => e.isIntersecting)) { run(); io.disconnect(); } }, { threshold: 0.5 }).observe($(".tiles")));
  };

  // Mouse drag for rails (presenting on a laptop at phone width)
  const railDrag = (el) => {
    let down = false, sx = 0, sl = 0, moved = false;
    el.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse" || isDesk()) return; down = true; moved = false; sx = e.clientX; sl = el.scrollLeft; el.style.scrollSnapType = "none"; });
    addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; el.scrollLeft = sl - dx; });
    addEventListener("pointerup", () => { if (!down) return; down = false; el.style.scrollSnapType = ""; });
    el.addEventListener("click", (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  };

  // Sidebar collapse (top-bar button or "["), remembered per viewer
  const sidebar = () => {
    const key = "opl.responsive.side";
    let pref = null; try { pref = localStorage.getItem(key); } catch (_) {}
    const set = (collapsed, save) => {
      document.body.classList.toggle("side-collapsed", collapsed);
      $("[data-side-toggle]").setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
      if (save) try { localStorage.setItem(key, collapsed ? "1" : "0"); } catch (_) {}
      setTimeout(() => dispatchEvent(new Event("resize")), 320);
    };
    set(pref ? pref === "1" : innerWidth < 1200, false);
    $("[data-side-toggle]").addEventListener("click", () => set(!document.body.classList.contains("side-collapsed"), true));
    addEventListener("keydown", (e) => {
      if (e.key === "[" && !/INPUT|TEXTAREA/.test(document.activeElement.tagName) && isDesk()) set(!document.body.classList.contains("side-collapsed"), true);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && isDesk()) { e.preventDefault(); $(".search__input").focus(); }
      if (e.key === "Escape") { closeMenu(); document.activeElement?.blur?.(); }
    });
  };

  const closeMenu = () => { $(".menu")?.classList.remove("is-open"); $("[data-menu]")?.setAttribute("aria-expanded", "false"); };

  const bind = () => {
    document.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-chip]");
      if (chip) {
        const c = chip.dataset.chip;
        st.chips = st.chips.includes(c) ? st.chips.filter((x) => x !== c) : [...st.chips, c];
        chip.classList.toggle("is-selected"); chip.setAttribute("aria-pressed", st.chips.includes(c));
        return refreshCards();
      }
      if (e.target.closest("[data-clear]")) { st.chips = []; $$("[data-chip]").forEach((c) => { c.classList.remove("is-selected"); c.setAttribute("aria-pressed", "false"); }); return refreshCards(); }
      if (e.target.closest("[data-menu]")) {
        const m = $(".menu"), open = !m.classList.contains("is-open");
        m.classList.toggle("is-open", open); $("[data-menu]").setAttribute("aria-expanded", open);
        if (open) $(".menu__item.is-on", m)?.focus({ preventScroll: true });
        return;
      }
      const sort = e.target.closest("[data-sort]");
      if (sort) {
        st.sort = sort.dataset.sort; st.sorted = true;
        $("[data-sort-label]").textContent = st.sort;
        $$("[data-sort]").forEach((b) => { const on = b === sort; b.classList.toggle("is-on", on); b.setAttribute("aria-checked", on); });
        closeMenu(); return refreshCards();
      }
      if (!e.target.closest(".menu")) closeMenu();
      const c = e.target.closest("[data-compare]");
      if (c) { e.stopPropagation(); return toggleCompare(c.dataset.compare); }
      const x = e.target.closest("[data-cbar-x]");
      if (x) { cmp.splice(cmp.indexOf(x.dataset.cbarX), 1); setCompare(x.dataset.cbarX, false); return paintTray(); }
      if (e.target.closest("[data-cbar-clear]")) { cmp.splice(0).forEach((id) => setCompare(id, false)); return paintTray(); }
      if (e.target.closest("[data-lang]")) return toast("Hindi isn't in this prototype yet");
      const nx = e.target.closest("[data-next]");
      if (nx && !nx.disabled) {
        if (nx.closest("[data-stack]")) return;
        toast(`${D.next[nx.dataset.next] || "This"} isn't built in this prototype yet`);
      }
    });
    // keyboard: Enter/Space on focusable cards
    document.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.matches("article[data-next]")) { e.preventDefault(); e.target.click(); } });
    // top bar frosts once content scrolls under it
    addEventListener("scroll", () => document.body.classList.toggle("is-scrolled", scrollY > 4), { passive: true });
    $$(".rail").forEach(railDrag);
  };

  /* ---- boot --------------------------------------------------------------- */
  render();
  press(); bind(); sidebar(); enter(); tabs(); heroStack(); nudge(); aiRotate(); gauge(); chart(); tiles(); paintTray();
  $$("[data-count]").forEach((el) => countUp(el, { to: +el.dataset.count, fmt: (v) => `${el.dataset.prefix}${Math.round(v)}${el.dataset.suffix}` }));

  // Reveal once fonts and above-the-fold images are ready (3s cap), like the kit's boot layer
  const ready = [document.fonts ? document.fonts.ready : Promise.resolve()]
    .concat($$(".m-hero img, .hcard img, .limit img").map((im) => (im.complete ? Promise.resolve() : new Promise((r) => { im.onload = im.onerror = r; }))));
  Promise.race([Promise.all(ready), new Promise((r) => setTimeout(r, 3000))]).then(() => {
    document.body.classList.remove("is-booting");
    revealed = true; queue.splice(0).forEach((fn) => fn());
  });
})();
