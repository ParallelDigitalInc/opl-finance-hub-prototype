/* OPL Finance Hub · Explorations · Cleaned up 2 (mobile)
   Markup from Figma frame "2" (172:55627, "Old Cleaned Up"): mint hero panel with a fading grid and a rounded bottom, a rate chip,
   lender-tinted hero cards, teal CTA, grey tiles with lilac duotone icons, two-panel loan cards with a corner tab, a lilac
   subsidies band with filter chips, and a mint help banner with a person and the OPL stamp. Motion carries the kit's grammar (reveal gate, staggered
   entrance, count-up, hero card stack with progress pager, AI Mitra nudge, press states, toasts) and adds
   an app layer: a liquid nav pill, tab switching, hide-on-scroll chrome, swipeable hero, rail parallax,
   and an AI Mitra sheet with drag-to-dismiss. */
(function () {
  "use strict";
  if (window.__STAGE) return;   // the presenting shell shows this page in an iframe; the outer copy stays idle
  const D = window.OPL_F1;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const motionOff = () => /motion=off/.test(location.hash) || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ico = (n, s = 16, cls = "") => `<img class="ico ${cls}" src="assets/icons/${n}.svg" width="${s}" height="${s}" alt="">`;
  const img = (n) => `assets/img/${n}`;
  const logo = (src, size = 40, cls = "") => `<span class="logo ${cls}" style="--s:${size}px"><img src="${img(src)}" alt="" width="${size}" height="${size}"></span>`;
  const buzz = () => { try { if (navigator.userActivation?.isActive) navigator.vibrate?.(6); } catch (_) {} };

  let revealed = false;
  const queue = [];
  const afterReveal = (fn) => (revealed ? fn() : queue.push(fn));
  const timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));

  /* ---- markup --------------------------------------------------------------- */
  const heroCard = (next) => (c, i) => `
    <div class="hcard" data-pos="${i === 0 ? "front" : i === 1 ? "back" : "queue"}" style="--brand:${c.brand};--wash:${c.wash};--soft:${c.soft};--softer:${c.softer}" data-next="${next}">
      <div class="hcard__in">${logo(c.logo, 44, c.ring ? "logo--ring" : "")}<span class="hcard__t"><b>${c.name}</b><small>${c.product}</small></span></div>
    </div>`;

  // Hero slides, as in the kit's home: Loans first, then Subsidies (kit Figma 382:34093 / 382:33823)
  const SLIDES = [
    { id: "loans", label: "Loans", next: "explore", stack: "Lenders that match you", count: true, ...D.promo },
    { id: "subs", label: "Subsidies", next: "subsidy", cta_next: "exploreSubs", stack: "Schemes that match you", ...D.promoSubs },
  ];
  const heroSlide = (s, si) => `
    <div class="promo promo--${s.id}" data-slide="${si}" role="group" aria-roledescription="slide" aria-label="${si + 1} of ${SLIDES.length}, ${s.label}">
      <p class="promo__eyebrow" ${si ? "" : "data-m-enter"}>${s.eyebrow}</p>
      <p class="promo__amount" ${si ? "" : "data-m-enter"} aria-label="₹${s.amount} ${s.unit}"><span class="promo__rupee">₹</span><span ${s.count ? `data-count="${s.amount}"` : ""}>${s.amount}</span> ${s.unit}</p>
      ${s.fact ? `<p class="promo__fact" ${si ? "" : "data-m-enter"}>${s.fact}</p>` : ""}
      <div class="promo__deck">
        <div class="stack" data-stack ${si ? "" : 'data-m-enter="stack"'} role="group" aria-label="${s.stack}">
          ${s.cards.map(heroCard(s.next)).join("")}
        </div>
        <button class="cta" data-press data-next="${s.cta_next || s.next}" ${si ? "" : "data-m-enter"}><span class="cta__shine" aria-hidden="true"></span><span class="cta__t">${s.cta}</span>${ico("chev-white", 16, "cta__chev")}</button>
      </div>
    </div>`;

  const loanCard = (c, i) => `
    <article class="card loan" style="--tint:${c.tint}" tabindex="0" data-press data-next="loan" data-m-enter="left" aria-label="${c.name}, ${c.product}, ${c.tag}, loan up to ${c.amount} at ${c.rate} a year">
      <div class="loan__body">
        <span class="ctab"><span class="ctab__t">${c.tag}</span></span>
        ${logo(c.logo, 40)}
        <div class="loan__name"><b>${c.name}</b><small>${c.product}</small></div>
      </div>
      <div class="loan__foot">
        <div class="fig"><small>Loan up to</small><b>${c.amount}</b></div>
        <div class="fig"><small>Interest</small><b>${c.rate} <i>p.a.</i></b></div>
      </div>
    </article>`;

  const subCard = (c) => `
    <article class="card sub" tabindex="0" data-press data-next="subsidy" data-m-enter="left" aria-label="${c.name}, ${c.tag}, estimated assistance ${c.value}">
      <div class="sub__photo"><img src="${img(c.photo)}" alt="" loading="lazy" decoding="async"><span class="sub__tag sub__tag--${c.level}">${c.tag}</span></div>
      <div class="sub__body">${logo(c.logo, 40, "logo--ring")}<b class="sub__name">${c.lines ? c.lines.join("<br>") : c.name}</b></div>
      <div class="sub__foot">
        <div class="fig"><small>Estimated assistance</small><b>${c.value}</b></div>
        <span class="round-btn" aria-hidden="true">${ico("chev-round", 16)}</span>
      </div>
    </article>`;

  const statusBar = () => `
    <div class="sbar" aria-hidden="true"><span class="sbar__time">9:41</span>
      <span class="sbar__icons">${ico("sb-signal", 17)}${ico("sb-wifi", 17)}${ico("sb-battery", 22)}</span></div>`;

  const render = () => {
    const P = D.promo;
    $("#app").innerHTML = `
    <div class="app" data-tab="finance">
      <div class="wash" aria-hidden="true"></div>
      <header class="top">
        ${document.documentElement.classList.contains("is-embed") ? statusBar() : ""}
        <div class="top__bar">
          <h1 class="top__title"><span class="top__name" data-title>${D.header.title}</span></h1>
          <div class="top__actions">
            <button class="icon-btn" data-press data-next="bell" aria-label="Notifications">${ico("bell", 20, "ico--bell")}</button>
            <button class="icon-btn" data-press data-next="help" aria-label="Help and support">${ico("headphones", 20)}</button>
            <button class="avatar" data-press data-next="profile" aria-label="Your profile"><img src="${img("avatar.png")}" alt="" width="36" height="36"></button>
          </div>
        </div>
      </header>

      <main class="views">
        <div class="view view--finance" data-view="finance">
          <section class="hero" aria-label="Loans and subsidies" aria-roledescription="carousel">
            <div class="hero__track" data-hero>
              ${SLIDES.map(heroSlide).join("")}
            </div>
            <div class="pager" data-m-enter role="tablist" aria-label="Offers">
              ${SLIDES.map((s, si) => `<button class="pager__dot ${si === 0 ? "is-active" : ""}" role="tab" aria-selected="${si === 0}" aria-label="${s.label}" data-slide="${si}"><i></i></button>`).join("")}
            </div>
          </section>

          <nav class="qa" aria-label="Quick actions">
            ${D.quick.map((q) => `<button class="qa__item" data-press data-next="${q.id}" data-m-enter="pop"><span class="qa__tile qa__tile--${q.tile}">${ico(q.icon, 40)}</span><span class="qa__label">${q.label.replace(" ", "<br>")}</span></button>`).join("")}
          </nav>

          <section class="sec sec--loans" aria-labelledby="h-loans">
            <div class="sec__head" data-m-enter><h2 id="h-loans" class="sec__title">${D.loans.title}</h2>
              <button class="link" data-press data-next="loans">View all${ico("chev-teal", 16)}</button></div>
            <div class="rail" data-rail>${D.loans.cards.map(loanCard).join("")}</div>
          </section>

          <section class="sec sec--subs" aria-labelledby="h-subs">
            <div class="sec__head" data-m-enter><h2 id="h-subs" class="sec__title">${D.subsidies.title}</h2>
              <button class="link" data-press data-next="subsidies">View all${ico("chev-teal", 16)}</button></div>
            <div class="chips" role="group" aria-label="Filter schemes by need" data-m-enter>
              ${D.subsidies.filters.map((f) => `<button class="chip" data-press data-chip="${f.id}" aria-pressed="false">${ico(f.icon, 18)}<span>${f.label}</span>${f.count ? `<i class="chip__n">${f.count}</i>` : ""}</button>`).join("")}
            </div>
            <div class="rail rail--subs" data-rail data-parallax>
              ${D.subsidies.cards.map(subCard).join("")}
            </div>
          </section>

          <section class="help" aria-label="Help">
            <div class="help__banner" data-m-enter>
              <img class="help__waves" src="${img("help-waves.jpg")}" alt="" width="352" height="136" aria-hidden="true">
              <div class="help__text">
                <p class="help__title">${D.help.title.join("<br>")}</p>
                <button class="btn-navy" data-press data-next="call">${ico("phone", 14, "ico--phone")}${D.help.cta}</button>
              </div>
              <span class="help__stamp" aria-hidden="true"><img src="assets/icons/help-stamp.svg" alt="" width="54" height="54" loading="lazy"></span>
              <img class="help__person" src="${img("help-person.png")}" alt="" width="133" height="190" loading="lazy">
            </div>
          </section>
        </div>

        <div class="view view--ph" data-view="ph" hidden>
          <div class="ph">
            <span class="ph__icon" data-ph-icon></span>
            <h2 class="ph__title serif" data-ph-title></h2>
            <p class="ph__body" data-ph-body></p>
            <p class="ph__note">This tab isn’t built in this prototype.</p>
            <button class="btn-navy" data-press data-go="finance">Back to Finance</button>
          </div>
        </div>
      </main>

      <footer class="dock">
        <div class="fab-wrap">
          <span class="fab-nudge" aria-hidden="true"><span class="fab-nudge__t">${D.mitra.nudge.lead} <strong>${D.mitra.nudge.topic}</strong></span></span>
          <button class="fab" data-press data-mitra aria-label="Ask AI Mitra" aria-haspopup="dialog">
            <span class="fab__sheen" aria-hidden="true"></span>
            ${ico("ai-mitra-logo", 24, "fab__logo")}
          </button>
        </div>
        <nav class="bnav" aria-label="Main">
          <span class="bnav__ink" aria-hidden="true"></span>
          ${D.nav.map((n) => `<button class="bnav__item ${n.id === "finance" ? "is-active" : ""}" data-tab="${n.id}" ${n.id === "finance" ? 'aria-current="page"' : ""}>
            <span class="bnav__pill">${ico(n.icon, 24)}</span><span class="bnav__label">${n.label}</span></button>`).join("")}
        </nav>
      </footer>

      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="mitra-h" hidden>
        <div class="sheet__scrim" data-sheet-close></div>
        <div class="sheet__panel">
          <div class="sheet__grab" data-sheet-grab><span></span></div>
          <div class="sheet__head">
            <span class="sheet__mark">${ico("ai-mitra-logo", 28)}</span>
            <div><h2 id="mitra-h" class="serif">${D.mitra.hello}</h2><p>${D.mitra.sub}</p></div>
            <button class="sheet__x" data-sheet-close aria-label="Close">✕</button>
          </div>
          <div class="chat" aria-live="polite"></div>
          <div class="prompts">${D.mitra.prompts.map((q, i) => `<button class="prompt" data-press data-prompt="${i}" style="--i:${i}">${q}</button>`).join("")}</div>
          <form class="ask" data-ask>
            <input class="ask__in" type="text" placeholder="${D.mitra.placeholder}" aria-label="${D.mitra.placeholder}" autocomplete="off">
            <button class="ask__send" data-press aria-label="Send"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </form>
        </div>
      </div>

      <div class="toast" role="status" aria-live="polite"></div>
    </div>`;
  };

  /* ---- behaviours ----------------------------------------------------------- */

  // Press feedback on every [data-press] (kit core.js), plus a tiny haptic where the phone supports it
  const press = () => {
    let active = null;
    const release = () => { active?.classList.remove("is-pressed"); active = null; };
    document.addEventListener("pointerdown", (e) => { const el = e.target.closest("[data-press]"); if (el) { active = el; el.classList.add("is-pressed"); } });
    ["pointerup", "pointercancel", "dragstart"].forEach((t) => document.addEventListener(t, release, true));
    document.addEventListener("scroll", release, { passive: true, capture: true });
  };

  const toast = (text) => {
    const t = $(".toast");
    t.textContent = text;
    t.classList.remove("is-up"); void t.offsetWidth; t.classList.add("is-up");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("is-up"), 2400);
  };

  const countUp = (el, { to, fmt, duration = 1100, delay = 260 }) => {
    if (motionOff()) { el.textContent = fmt(to); return; }
    el.textContent = fmt(0);
    afterReveal(() => setTimeout(() => {
      const t0 = performance.now();
      const step = (now) => { const k = Math.min(1, (now - t0) / duration); el.textContent = fmt(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
      setTimeout(() => (el.textContent = fmt(to)), duration + 80);   // background tabs skip rAF
    }, delay));
  };

  // Entrance — top to bottom, rails slide in from the right, tiles pop
  const enter = () => {
    if (motionOff()) return afterReveal(() => document.body.classList.add("is-ready"));
    $$("[data-m-enter]").forEach((el, i) => { el.classList.add("enter", `enter--${el.dataset.mEnter || "up"}`); el.style.setProperty("--i", Math.min(i, 14)); });
    afterReveal(() => {
      document.body.classList.add("is-entering");
      later(() => { document.body.classList.remove("is-entering"); document.body.classList.add("is-ready"); }, 3600);
    });
  };

  // Hero carousel — two slides, as in the kit's home: Loans, then Subsidies. Native scroll-snap, so a swipe feels like
  // the OS (a mouse drag is wired for presenting on a laptop). Each slide's card stack steps every 3.2s: the front slides
  // under the CTA, the back steps forward, the next fades in behind. After a slide's last card the carousel moves on.
  // The pager has one dot per slide; the current one is a pill that fills a step per card. Tap a dot to switch
  // slides; tap a card to open it.
  const heroCarousel = () => {
    const track = $("[data-hero]"); if (!track) return;
    const slides = $$(".promo", track), dots = $$(".pager__dot"), pager = $(".pager");
    let cur = 0, timer = null, held = false, started = false;

    const stacks = slides.map((sl) => {
      const items = $$(".hcard", sl);
      const s = { front: 0, busy: false, n: items.length };
      const instant = (it, pos) => { it.classList.add("is-instant"); it.dataset.pos = pos; void it.offsetWidth; it.classList.remove("is-instant"); };
      s.go = (to, dir = 1) => {
        if (s.busy || to === s.front) return;
        s.busy = true;
        items[s.front].dataset.pos = dir > 0 ? "leave" : "leave-up";
        s.front = (to + s.n) % s.n;
        items[s.front].dataset.pos = "front";
        items[(s.front + 1) % s.n].dataset.pos = "back";
        setTimeout(() => { items.forEach((it, k) => { if (k !== s.front && k !== (s.front + 1) % s.n) instant(it, "queue"); }); s.busy = false; }, 820);
      };
      s.reset = () => { s.front = 0; items.forEach((it, k) => instant(it, k === 0 ? "front" : k === 1 ? "back" : "queue")); };
      return s;
    });

    // one dot per slide (Loans, Subsidies); the current one is a pill that fills one step per card, so a full
    // pill means the carousel is about to move on to the other slide
    const paint = () => {
      dots.forEach((d, si) => { const on = si === cur; d.classList.toggle("is-active", on); d.setAttribute("aria-selected", on); });
      const s = stacks[cur];
      if (motionOff()) return pager.style.setProperty("--to", "100%");   // no auto-steps: a solid pill
      pager.style.setProperty("--from", `${((s.front / s.n) * 100).toFixed(2)}%`);
      pager.style.setProperty("--to", `${(((s.front + 1) / s.n) * 100).toFixed(2)}%`);
    };
    const stop = () => { clearTimeout(timer); timer = null; pager.classList.remove("is-auto"); };
    const schedule = () => {
      stop(); if (!started || held || motionOff()) return;
      void pager.offsetWidth; pager.classList.add("is-auto");
      timer = setTimeout(step, 3200);
    };
    const toSlide = (i, smooth = true) => track.scrollTo({ left: i * track.clientWidth, behavior: smooth && !motionOff() ? "smooth" : "auto" });
    function step() {
      if (document.hidden || sheetOpen()) return schedule();
      const s = stacks[cur];
      if (s.front === s.n - 1 && slides.length > 1) { const nx = (cur + 1) % slides.length; stacks[nx].reset(); toSlide(nx); }
      else { s.go(s.front + 1, 1); paint(); schedule(); }
    }
    const arrive = (i) => {
      cur = i;
      slides.forEach((s, k) => { s.inert = k !== i; s.setAttribute("aria-hidden", String(k !== i)); });
      paint(); schedule();
    };
    const onScroll = () => {
      const w = track.clientWidth; if (!w) return;
      slides.forEach((s, k) => { const p = (k * w - track.scrollLeft) / w; s.style.setProperty("--p", p.toFixed(3)); s.style.setProperty("--pa", Math.min(1, Math.abs(p)).toFixed(3)); });
      const i = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / w)));
      if (i !== cur) arrive(i);
    };
    track.addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
    addEventListener("resize", () => { track.scrollLeft = cur * track.clientWidth; });
    arrive(0);

    pager.addEventListener("click", (e) => {
      const d = e.target.closest(".pager__dot"); if (!d) return;
      const si = +d.dataset.slide;
      if (si !== cur) { stacks[si].reset(); toSlide(si); }
    });

    // a finger on the hero holds the timer; lifting it restarts the current card's pill
    track.addEventListener("touchstart", () => { held = true; stop(); }, { passive: true });
    ["touchend", "touchcancel"].forEach((t) => track.addEventListener(t, () => { held = false; schedule(); }, { passive: true }));

    // mouse drag: snap is lifted while dragging, then the release settles on the next or previous slide
    let down = false, moved = false, sx = 0, sl = 0;
    track.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse" || e.button !== 0) return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; });
    addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 5) { moved = true; held = true; stop(); track.classList.add("is-grabbing"); }
      if (moved) track.scrollLeft = sl - dx;
    });
    addEventListener("pointerup", (e) => {
      if (!down) return; down = false;
      if (!moved) return;
      const w = track.clientWidth, from = Math.round(sl / w), dx = e.clientX - sx;
      const to = Math.max(0, Math.min(slides.length - 1, dx < -48 ? from + 1 : dx > 48 ? from - 1 : from));
      held = false; if (to !== from) buzz();
      toSlide(to);
      let done = false;
      const unsnap = () => { if (done) return; done = true; track.classList.remove("is-grabbing"); };
      track.addEventListener("scrollend", unsnap, { once: true }); setTimeout(unsnap, 700);
      if (to === cur) schedule();
    });
    track.addEventListener("click", (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);

    if (motionOff()) return;
    afterReveal(() => later(() => { started = true; schedule(); }, 2200));
  };

  // Grid fades and drifts slower than the page (parallax); the top bar frosts once content slides under it
  const scrollFx = () => {
    const wash = $(".wash"), app = $(".app");
    let lastY = scrollY, acc = 0, ticking = false;
    const run = () => {
      ticking = false;
      const y = scrollY;
      document.body.classList.toggle("is-scrolled", y > 4);
      if (!motionOff()) wash.style.opacity = Math.max(0.35, 1 - y / 520).toFixed(3);   // the mint wash eases off as you scroll into the page
      // hide-on-scroll chrome: the nav slips away while reading down, returns on any upward flick
      const d = y - lastY; lastY = y;
      acc = Math.sign(d) === Math.sign(acc) ? acc + d : d;
      const nearEnd = y + innerHeight > document.documentElement.scrollHeight - 40;
      if (acc > 24 && y > 160 && !nearEnd) app.classList.add("is-tucked");
      else if (acc < -12 || y < 160 || nearEnd) app.classList.remove("is-tucked");
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    run();
  };

  // Subsidy photos drift inside their frames as the rail scrolls (depth without a carousel)
  const railFx = () => {
    $$("[data-rail]").forEach((rail) => {
      // mouse drag for presenting on a laptop at phone size
      let down = false, sx = 0, sl = 0, moved = false;
      rail.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft; rail.classList.add("is-grabbing"); });
      addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; rail.scrollLeft = sl - dx; });
      addEventListener("pointerup", () => { if (!down) return; down = false; rail.classList.remove("is-grabbing"); });
      rail.addEventListener("click", (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    });
    const rail = $("[data-parallax]"); if (!rail || motionOff()) return;
    const photos = $$(".sub__photo img", rail);
    const paint = () => {
      const r = rail.getBoundingClientRect();
      photos.forEach((im) => {
        const c = im.parentElement.getBoundingClientRect();
        const off = (c.left + c.width / 2 - (r.left + r.width / 2)) / r.width;   // -1…1
        im.style.transform = `translate3d(${(off * -18).toFixed(1)}px, 0, 0) scale(1.14)`;
      });
    };
    rail.addEventListener("scroll", () => requestAnimationFrame(paint), { passive: true });
    paint();
  };

  // Help banner: headset bobs; the phone glyph rings once when the banner comes into view
  const helpFx = () => {
    const b = $(".help__banner"); if (!b || motionOff()) return;
    new IntersectionObserver((es, io) => { if (es[0].isIntersecting) { b.classList.add("is-seen"); io.disconnect(); } }, { threshold: 0.6 }).observe(b);
  };

  /* ---- bottom nav: liquid pill + tab switching ------------------------------- */
  const navFx = () => {
    const nav = $(".bnav"), ink = $(".bnav__ink"), items = $$(".bnav__item");
    const app = $(".app");
    let cur = items.findIndex((b) => b.classList.contains("is-active"));
    const rect = (el) => ({ x: el.offsetLeft, w: el.offsetWidth });
    const place = (el) => { const r = rect(el); ink.style.transform = `translateX(${r.x}px)`; ink.style.width = `${r.w}px`; };
    place(items[cur]);
    addEventListener("resize", () => place(items[cur]));

    // the pill stretches toward its target, then the tail catches up (a short, springy "liquid" move)
    const slide = (from, to) => {
      const a = rect(items[from]), b = rect(items[to]);
      if (motionOff() || !ink.animate) return place(items[to]);
      const l = Math.min(a.x, b.x), r = Math.max(a.x + a.w, b.x + b.w);
      ink.animate([
        { transform: `translateX(${a.x}px)`, width: `${a.w}px` },
        { transform: `translateX(${b.x > a.x ? a.x + 6 : l}px)`, width: `${r - l - 6}px`, offset: 0.45 },
        { transform: `translateX(${b.x}px)`, width: `${b.w}px` },
      ], { duration: 520, easing: "cubic-bezier(0.3, 1.25, 0.5, 1)" });
      place(items[to]);
    };

    const views = { finance: $(".view--finance"), ph: $(".view--ph") };
    const title = $("[data-title]");
    const show = (id, dir) => {
      const toPh = id !== "finance";
      const inEl = toPh ? views.ph : views.finance, outEl = toPh ? views.finance : views.ph;
      if (toPh) {
        const t = D.tabs[id], n = D.nav.find((x) => x.id === id);
        $("[data-ph-title]").textContent = t.title; $("[data-ph-body]").textContent = t.body;
        $("[data-ph-icon]").innerHTML = ico(n.icon, 28);
      }
      const swapTitle = () => { title.textContent = toPh ? D.tabs[id].title : D.header.title; };
      app.dataset.tab = id;
      if (motionOff()) { outEl.hidden = true; inEl.hidden = false; swapTitle(); scrollTo(0, 0); return; }
      title.classList.add("is-swapping"); setTimeout(() => { swapTitle(); title.classList.remove("is-swapping"); }, 160);
      outEl.style.setProperty("--dir", dir); inEl.style.setProperty("--dir", dir);
      outEl.classList.add("is-leaving");
      setTimeout(() => {
        outEl.hidden = true; outEl.classList.remove("is-leaving");
        scrollTo(0, 0);
        inEl.hidden = false; inEl.classList.add("is-arriving");
        setTimeout(() => inEl.classList.remove("is-arriving"), 460);
      }, 180);
    };

    const select = (i) => {
      if (i === cur) {   // tapping the current tab scrolls to top, like iOS
        if (scrollY > 0) scrollTo({ top: 0, behavior: motionOff() ? "auto" : "smooth" });
        items[i].classList.remove("is-bounce"); void items[i].offsetWidth; items[i].classList.add("is-bounce");
        return;
      }
      buzz();
      const dir = i > cur ? 1 : -1;
      slide(cur, i);
      items[cur].classList.remove("is-active"); items[cur].removeAttribute("aria-current");
      items[i].classList.add("is-active", "is-bounce"); items[i].setAttribute("aria-current", "page");
      setTimeout(() => items[i].classList.remove("is-bounce"), 600);
      const prevId = items[cur].dataset.tab, id = items[i].dataset.tab;
      cur = i;
      if ((prevId === "finance") !== (id === "finance") || id !== "finance") show(id, dir);
      app.classList.remove("is-tucked");
    };
    nav.addEventListener("click", (e) => { const b = e.target.closest(".bnav__item"); if (b) select(items.indexOf(b)); });
    document.addEventListener("click", (e) => { if (e.target.closest("[data-go='finance']")) select(items.findIndex((b) => b.dataset.tab === "finance")); });
  };

  /* ---- AI Mitra: entrance, idle breath, nudge, sheet ---------------------------- */
  const sheetOpen = () => !!$(".sheet") && !$(".sheet").hidden;
  const mitra = () => {
    const wrap = $(".fab-wrap"), fab = $(".fab"), sheet = $(".sheet"), panel = $(".sheet__panel"), chat = $(".chat");
    // nudge — slides out from behind the FAB once, tucks back after ~4s or on scroll
    if (!motionOff()) afterReveal(() => later(() => {
      if (sheetOpen()) return;
      wrap.classList.add("is-nudging");
      const hide = () => wrap.classList.remove("is-nudging");
      later(hide, 4200); addEventListener("scroll", hide, { once: true, passive: true });
    }, 2600));

    let lastFocus = null;
    const open = () => {
      if (sheetOpen()) return;
      buzz(); lastFocus = document.activeElement;
      wrap.classList.remove("is-nudging");
      sheet.hidden = false; document.body.classList.add("has-sheet");
      fab.classList.add("is-launching");
      requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add("is-open")));
      setTimeout(() => fab.classList.remove("is-launching"), 600);
      setTimeout(() => $(".ask__in").focus({ preventScroll: true }), motionOff() ? 0 : 380);
    };
    const close = () => {
      if (!sheetOpen()) return;
      sheet.classList.remove("is-open"); panel.style.removeProperty("--pull");
      document.body.classList.remove("has-sheet");
      setTimeout(() => { sheet.hidden = true; }, motionOff() ? 0 : 360);
      lastFocus?.focus?.({ preventScroll: true });
    };
    fab.addEventListener("click", open);
    sheet.addEventListener("click", (e) => { if (e.target.closest("[data-sheet-close]")) close(); });
    addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    // drag the grab bar down to dismiss
    const grab = $("[data-sheet-grab]");
    let y0 = 0, dy = 0, dragging = false;
    const startDrag = (e) => { dragging = true; y0 = e.clientY; dy = 0; panel.classList.add("is-dragging"); e.target.setPointerCapture?.(e.pointerId); };
    [grab, $(".sheet__head")].forEach((h) => h.addEventListener("pointerdown", (e) => { if (!e.target.closest("button")) startDrag(e); }));
    addEventListener("pointermove", (e) => { if (!dragging) return; dy = Math.max(0, e.clientY - y0); panel.style.setProperty("--pull", `${dy}px`); });
    addEventListener("pointerup", () => {
      if (!dragging) return; dragging = false; panel.classList.remove("is-dragging");
      if (dy > 110) close(); else panel.style.removeProperty("--pull");
    });

    // asking: the question lands as a bubble, AI Mitra "types", then answers with the prototype note
    const bubble = (cls, html) => { const b = document.createElement("div"); b.className = `bubble ${cls}`; b.innerHTML = html; chat.appendChild(b); chat.scrollTop = chat.scrollHeight; return b; };
    let busy = false;
    const ask = (q) => {
      q = q.trim(); if (!q || busy) return;
      busy = true; sheet.classList.add("has-chat");
      bubble("bubble--me", q.replace(/</g, "&lt;"));
      const typing = bubble("bubble--ai is-typing", "<i></i><i></i><i></i>");
      setTimeout(() => { typing.classList.remove("is-typing"); typing.textContent = D.mitra.reply; chat.scrollTop = chat.scrollHeight; busy = false; }, motionOff() ? 0 : 1300);
    };
    sheet.addEventListener("click", (e) => { const p = e.target.closest("[data-prompt]"); if (p) ask(D.mitra.prompts[+p.dataset.prompt]); });
    $("[data-ask]").addEventListener("submit", (e) => { e.preventDefault(); const i = $(".ask__in"); ask(i.value); i.value = ""; });
  };

  // Filter chips: one active at a time; the rail isn't filtered in this prototype, so a toast says so
  const chipsFx = () => {
    const row = $(".chips"); if (!row) return;
    row.addEventListener("click", (e) => {
      const c = e.target.closest(".chip"); if (!c) return;
      const on = c.getAttribute("aria-pressed") !== "true";
      $$(".chip", row).forEach((x) => x.setAttribute("aria-pressed", "false"));
      c.setAttribute("aria-pressed", String(on));
      buzz();
      if (on) toast(`${c.querySelector("span").textContent} schemes · filtering isn't built in this prototype yet`);
    });
  };

  const bind = () => {
    document.addEventListener("click", (e) => {
      const nx = e.target.closest("[data-next]");
      if (!nx) return;
      toast(`${D.next[nx.dataset.next] || "This"} isn't built in this prototype yet`);
    });
    document.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.matches("article[data-next]")) { e.preventDefault(); e.target.click(); } });
  };

  /* ---- boot ------------------------------------------------------------------ */
  render();
  press(); bind(); enter(); heroCarousel(); scrollFx(); railFx(); helpFx(); chipsFx(); navFx(); mitra();
  $$("[data-count]").forEach((el) => countUp(el, { to: +el.dataset.count, fmt: (v) => `${Math.round(v)}` }));

  const ready = [document.fonts ? document.fonts.ready : Promise.resolve()]
    .concat($$(".promo img, .avatar img").map((im) => (im.complete ? Promise.resolve() : new Promise((r) => { im.onload = im.onerror = r; }))));
  Promise.race([Promise.all(ready), new Promise((r) => setTimeout(r, 3000))]).then(() => {
    document.body.classList.remove("is-booting");
    revealed = true; queue.splice(0).forEach((fn) => fn());
  });
})();
