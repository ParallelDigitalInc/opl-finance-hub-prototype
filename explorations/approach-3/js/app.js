/* OPL Finance Hub · Explorations · Approach 3 (mobile)
   Markup from Figma frame "3" (172:54014): mint wash, neutral inset hero cards, pastel tiles, lender-tinted loan cards, lilac help banner. Motion carries the kit's grammar (reveal gate, staggered
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
  const heroCard = (c, i) => `
    <div class="hcard" data-pos="${i === 0 ? "front" : i === 1 ? "back" : "queue"}" style="--brand:${c.brand};--wash:${c.wash};--soft:${c.soft};--softer:${c.softer}" data-next="explore">
      <div class="hcard__in">${logo(c.logo, 44)}<span class="hcard__t"><b>${c.name}</b><small>${c.product}</small></span></div>
    </div>`;

  const loanCard = (c, i) => `
    <article class="card loan" style="--tint:${c.tint}" tabindex="0" data-press data-next="loan" data-m-enter="left" aria-label="${c.name}, ${c.product}, loan up to ${c.amount} at ${c.rate} a year">
      <div class="loan__body">
        <div class="loan__top">${logo(c.logo, 40)}<span class="tag tag--green">${c.tag}</span></div>
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
      <div class="sub__body">${logo(c.logo, 40, "logo--ring")}<b class="sub__name">${c.name}</b></div>
      <div class="sub__foot">
        <div class="fig"><small>Estimated assistance</small><b>${c.value}</b></div>
        <span class="round-btn" aria-hidden="true">${ico("chev-ink", 16)}</span>
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
          <section class="promo" aria-label="Loan offer">
            <p class="promo__eyebrow" data-m-enter>${P.eyebrow}</p>
            <p class="promo__amount" data-m-enter aria-label="₹${P.amount} ${P.unit}"><span class="promo__rupee">₹</span><span data-count="${P.amount}">${P.amount}</span> ${P.unit}</p>
            <div class="promo__deck">
              <div class="stack" data-stack data-m-enter="stack" role="group" aria-roledescription="carousel" aria-label="Lenders that match you">
                ${P.cards.map(heroCard).join("")}
              </div>
              <button class="cta" data-press data-next="explore" data-m-enter><span class="cta__shine" aria-hidden="true"></span><span class="cta__t">${P.cta}</span>${ico("chev-white", 16, "cta__chev")}</button>
            </div>
            <div class="pager" data-m-enter role="tablist" aria-label="Lender">
              ${P.cards.map((c, i) => `<button class="pager__dot ${i === 0 ? "is-active" : ""}" role="tab" aria-selected="${i === 0}" aria-label="${c.name}"><i></i></button>`).join("")}
            </div>
          </section>

          <nav class="qa" aria-label="Quick actions">
            ${D.quick.map((q) => `<button class="qa__item" data-press data-next="${q.id}" data-m-enter="pop"><span class="qa__tile qa__tile--${q.tile}">${ico(q.icon, 24)}</span><span class="qa__label">${q.label}</span></button>`).join("")}
          </nav>

          <section class="sec sec--loans" aria-labelledby="h-loans">
            <div class="sec__head" data-m-enter><h2 id="h-loans" class="sec__title">${D.loans.title}</h2>
              <button class="link" data-press data-next="loans">View all${ico("chev-link", 16)}</button></div>
            <div class="rail" data-rail>${D.loans.cards.map(loanCard).join("")}</div>
          </section>

          <section class="sec sec--subs" aria-labelledby="h-subs">
            <div class="sec__head" data-m-enter><h2 id="h-subs" class="sec__title">${D.subsidies.title}</h2>
              <button class="link" data-press data-next="subsidies">View all${ico("chev-link", 16)}</button></div>
            <div class="rail rail--subs" data-rail data-parallax>
              ${D.subsidies.cards.map(subCard).join("")}
            </div>
            <button class="link link--blue link--center" data-press data-next="subsidies">View all ${D.subsidies.total}${ico("chev-blue", 16)}</button>
          </section>

          <section class="help" aria-label="Help">
            <div class="help__banner" data-m-enter>
              <span class="help__grid help__grid--r" aria-hidden="true"><img src="assets/icons/help-grid.svg" alt="" width="195" height="280"></span>
              <div class="help__text">
                <p class="help__title">${D.help.title.join("<br>")}</p>
                <button class="btn-navy" data-press data-next="call">${ico("phone", 14, "ico--phone")}${D.help.cta}</button>
              </div>
              <img class="help__ill" src="${img("help-headset.png")}" alt="" width="84" height="96" loading="lazy">
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

  // Hero stack: front slides under the CTA, back steps forward, the next one fades in behind.
  // Auto-advances every 3.2s (pager fills as progress); tap, swipe or pick a dot to step.
  const heroStack = () => {
    const el = $("[data-stack]"); if (!el) return;
    const items = $$(".hcard", el), dots = $$(".pager__dot"), pager = $(".pager");
    let front = 0, busy = false, held = false, tick = null;
    const paint = () => dots.forEach((d, i) => { d.classList.toggle("is-active", i === front); d.setAttribute("aria-selected", i === front); });
    const go = (to, dir = 1) => {
      if (busy || to === front) return;
      busy = true;
      const n = items.length, leaving = items[front];
      leaving.dataset.pos = dir > 0 ? "leave" : "leave-up";
      front = (to + n) % n;
      items[front].dataset.pos = "front";
      items[(front + 1) % n].dataset.pos = "back";
      paint(); restart();
      setTimeout(() => {
        items.forEach((it, k) => { if (k !== front && k !== (front + 1) % n) { it.classList.add("is-instant"); it.dataset.pos = "queue"; void it.offsetWidth; it.classList.remove("is-instant"); } });
        busy = false;
      }, 820);
    };
    const next = () => go(front + 1, 1);
    const restart = () => { pager.classList.remove("is-auto"); void pager.offsetWidth; if (!motionOff()) pager.classList.add("is-auto"); };
    dots.forEach((d, i) => d.addEventListener("click", () => go(i, i > front ? 1 : -1)));

    // swipe (touch or mouse): horizontal drag tilts the front card; release past 40px steps
    let sx = 0, dx = 0, down = false, moved = false;
    el.addEventListener("pointerdown", (e) => { down = true; moved = false; sx = e.clientX; dx = 0; held = true; pager.classList.add("is-paused"); el.setPointerCapture?.(e.pointerId); });
    el.addEventListener("pointermove", (e) => {
      if (!down) return; dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true;
      items[front].style.setProperty("--drag", `${Math.max(-60, Math.min(60, dx))}px`);
      items[front].classList.add("is-dragging");
    });
    const up = () => {
      if (!down) return; down = false; held = false; pager.classList.remove("is-paused");
      const f = items[front]; f.classList.remove("is-dragging"); f.style.removeProperty("--drag");
      if (Math.abs(dx) > 40) { buzz(); go(front + 1, 1); }
      else if (!moved) toast(`${D.next.explore} isn't built in this prototype yet`);
    };
    el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);

    if (motionOff()) return;
    afterReveal(() => later(() => { restart(); tick = setInterval(() => { if (!held && !document.hidden && !sheetOpen()) next(); }, 3200); timers.push(tick); }, 2200));
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

  const bind = () => {
    document.addEventListener("click", (e) => {
      const nx = e.target.closest("[data-next]");
      if (!nx || nx.closest("[data-stack]")) return;
      toast(`${D.next[nx.dataset.next] || "This"} isn't built in this prototype yet`);
    });
    document.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.matches("article[data-next]")) { e.preventDefault(); e.target.click(); } });
  };

  /* ---- boot ------------------------------------------------------------------ */
  render();
  press(); bind(); enter(); heroStack(); scrollFx(); railFx(); helpFx(); navFx(); mitra();
  $$("[data-count]").forEach((el) => countUp(el, { to: +el.dataset.count, fmt: (v) => `${Math.round(v)}` }));

  const ready = [document.fonts ? document.fonts.ready : Promise.resolve()]
    .concat($$(".promo img, .avatar img").map((im) => (im.complete ? Promise.resolve() : new Promise((r) => { im.onload = im.onerror = r; }))));
  Promise.race([Promise.all(ready), new Promise((r) => setTimeout(r, 3000))]).then(() => {
    document.body.classList.remove("is-booting");
    revealed = true; queue.splice(0).forEach((fn) => fn());
  });
})();
