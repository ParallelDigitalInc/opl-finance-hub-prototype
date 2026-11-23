/* ==========================================================================
   Estimate result celebration (screen-only, lazy-loaded by subsidy-estimate-result)
   Gold sparks as each bundle lands; canvas confetti from the stack and both sides, a warm glow, sparkles
   around the stack, a letter-by-letter "Congratulations", and a shine across the
   final total with a second little burst. Everything runs once and cleans up.
   Palette: OPL indigo + the benefit colours + OPL Yellow #FFBB00.
   ========================================================================== */
(function () {
  const OPL = window.OPL;
  if (!OPL || OPL.celebrate) return;

  const CSS = `
.er-glow{position:absolute;left:50%;top:50%;width:300px;height:300px;margin:-150px 0 0 -150px;border-radius:50%;pointer-events:none;z-index:-1;
  background:radial-gradient(circle,rgba(255,187,0,.42) 0%,rgba(255,214,102,.22) 26%,rgba(102,126,235,.16) 46%,rgba(102,126,235,0) 68%);opacity:0;transform:scale(.3)}
.er.is-party .er-glow{animation:er-glow 1500ms cubic-bezier(.22,1,.36,1) forwards}
@keyframes er-glow{0%{opacity:0;transform:scale(.3)}35%{opacity:1;transform:scale(1.18)}100%{opacity:.7;transform:scale(1)}}
.er.is-party .er-rays{opacity:.95!important;animation:er-rays-in 1100ms cubic-bezier(.22,1,.36,1) both,rays-spin 40s linear 1100ms infinite!important}
@keyframes er-rays-in{from{opacity:0;transform:scale(.4) rotate(-60deg)}to{opacity:.95;transform:scale(1) rotate(0)}}
.er-spark{position:absolute;width:var(--s);height:var(--s);pointer-events:none;opacity:0;z-index:3}
.er.is-party .er-spark{animation:er-twinkle 900ms cubic-bezier(.34,1.56,.64,1) both;animation-delay:var(--d)}
@keyframes er-twinkle{0%{opacity:0;transform:scale(0) rotate(-45deg)}40%{opacity:1;transform:scale(1.15) rotate(10deg)}70%{opacity:1;transform:scale(.9) rotate(0)}100%{opacity:0;transform:scale(0) rotate(30deg)}}
.er-title .ch{display:inline-block;white-space:pre}
.er.is-party .er-title .ch{animation:er-letter 620ms cubic-bezier(.34,1.56,.64,1) both;animation-delay:calc(var(--i)*32ms + 520ms)}
@keyframes er-letter{0%{opacity:0;transform:translateY(18px) scale(.5) rotate(-8deg)}100%{opacity:1;transform:none}}
.er.is-party .er-copy__lead{animation:none!important}
.er.is-party .er-sub{animation:enter-up 480ms cubic-bezier(.22,1,.36,1) 900ms both}
.er-total.is-shining [data-total]{background:linear-gradient(100deg,#0f172a 0%,#0f172a 38%,#3858e5 46%,#ffbb00 50%,#3858e5 54%,#0f172a 62%,#0f172a 100%);
  background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:er-shine 1100ms cubic-bezier(.4,0,.2,1) both,total-pop 620ms cubic-bezier(.34,1.56,.64,1)}
@keyframes er-shine{from{background-position:100% 0}to{background-position:0 0}}
.er-canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:40}
.er-money__plinth.is-thud{animation:er-thud 300ms cubic-bezier(.22,1,.36,1)!important;transform-origin:50% 90%}
@keyframes er-thud{35%{transform:scaleY(.94) scaleX(1.02) translateY(2px)}}
`;
  const COLORS = ["#3858E5", "#667EEB", "#14B8A6", "#FFBB00", "#FFD666", "#66B814", "#148FB8", "#A5B4FC", "#F472B6"];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = (a) => a[(Math.random() * a.length) | 0];

  /* ---- confetti -------------------------------------------------------- */
  function confetti(page) {
    const cv = document.createElement("canvas");
    cv.className = "er-canvas";
    page.appendChild(cv);
    const ctx = cv.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = page.clientWidth, H = page.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.scale(dpr, dpr);
    const parts = [];
    let raf = 0, last = 0;
    const GOLD = ["#FFBB00", "#FFD666", "#F59E0B"];
    // kind: "confetti" (mixed) · "coin" (small gold discs)
    const add = (n, x, y, ang, spread, sp0, sp1, kind = "confetti") => {
      for (let i = 0; i < n; i++) {
        const a = (ang + rnd(-spread, spread)) * Math.PI / 180, s = rnd(sp0, sp1);
        const shape = kind === "note" ? "note" : kind === "coin" ? "coin"
          : Math.random() < 0.18 ? "ribbon" : Math.random() < 0.3 ? "dot" : "rect";
        const px = typeof x === "function" ? x() : x;
        parts.push({ x: px, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, rot: rnd(0, 6.28), vr: rnd(-0.25, 0.25) * (shape === "note" ? 0.35 : 1),
          w: shape === "note" ? rnd(26, 32) : shape === "ribbon" ? rnd(3, 4) : rnd(6, 10),
          h: shape === "note" ? rnd(13, 15) : shape === "ribbon" ? rnd(14, 22) : rnd(4, 7),
          c: shape === "coin" ? pick(GOLD) : pick(COLORS), shape, tilt: rnd(0, 6.28), vt: rnd(0.06, 0.16), wob: rnd(0, 6.28), life: 0,
          max: shape === "note" ? rnd(260, 330) : shape === "coin" ? rnd(50, 80) : rnd(150, 230),
          g: shape === "note" ? 0.05 : shape === "coin" ? 0.32 : 0.24, drag: shape === "note" ? 0.97 : 0.985 });
      }
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
    };
    function tick(now) {
      const dt = Math.min(2.5, (now - last) / 16.67); last = now;
      ctx.clearRect(0, 0, W, H);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life += dt;
        p.vy += p.g * dt; p.vx *= Math.pow(p.drag, dt); p.vy *= Math.pow(p.shape === "note" ? 0.97 : 0.99, dt);
        p.wob += 0.1 * dt; p.x += (p.vx + Math.sin(p.wob) * (p.shape === "note" ? 1.4 : 0.6)) * dt; p.y += p.vy * dt;
        p.rot += p.vr * dt; p.tilt += p.vt * dt;
        if (p.life > p.max || p.y > H + 40) { parts.splice(i, 1); continue; }
        const fade = Math.min(1, (p.max - p.life) / 40);
        ctx.save(); ctx.globalAlpha = fade; ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.scale(1, Math.cos(p.tilt)); ctx.fillStyle = p.c;
        if (p.shape === "coin") { ctx.beginPath(); ctx.arc(0, 0, 3.2, 0, 6.28); ctx.fill(); ctx.fillStyle = "rgba(255,255,255,.7)"; ctx.fillRect(-1.6, -2.2, 1.2, 1.4); }
        else if (p.shape === "dot") { ctx.beginPath(); ctx.arc(0, 0, p.h * 0.55, 0, 6.28); ctx.fill(); }
        else if (p.shape === "ribbon") {
          ctx.beginPath(); ctx.moveTo(-p.w / 2, -p.h / 2);
          ctx.quadraticCurveTo(p.w * 2, 0, -p.w / 2, p.h / 2); ctx.lineTo(p.w / 2, p.h / 2);
          ctx.quadraticCurveTo(p.w * 3, 0, p.w / 2, -p.h / 2); ctx.closePath(); ctx.fill();
        } else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (parts.length && cv.isConnected) raf = requestAnimationFrame(tick);
      else { raf = 0; ctx.clearRect(0, 0, W, H); }
    }
    return {
      cannons() {                                   // from both bottom corners, up and in
        add(70, -8, H * 0.72, -62, 14, 13, 21);
        add(70, W + 8, H * 0.72, -118, 14, 13, 21);
      },
      burst(x, y, n = 46, sp = [5, 12]) { add(n, x, y, -90, 120, sp[0], sp[1]); },
      coins(x, y) { add(16, x, y, -90, 70, 3, 7, "coin"); },          // a puff of gold where a bundle lands
      stop() { parts.length = 0; cancelAnimationFrame(raf); cv.remove(); },
    };
  }

  /* ---- sparkles around the money stack ---------------------------------- */
  const STAR = (c) => `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="${c}" d="M12 0c.6 5.6 3.3 9.1 12 12-8.7 2.9-11.4 6.4-12 12-.6-5.6-3.3-9.1-12-12C8.7 9.1 11.4 5.6 12 0z"/></svg>`;
  const SPARKS = [ // x, y relative to the 145×111 stack; size; delay; colour
    [-22, 8, 18, 620, "#FFBB00"], [150, 14, 14, 760, "#FFBB00"], [128, -14, 10, 900, "#667EEB"],
    [-6, 62, 11, 980, "#14B8A6"], [156, 70, 16, 1120, "#FFBB00"], [40, -22, 12, 1260, "#FFD666"],
    [-28, 40, 9, 1500, "#667EEB"], [100, -26, 14, 1640, "#FFBB00"],
  ];

  OPL.celebrate = {
    run(page, timers) {
      if (!document.getElementById("er-celebrate-css")) {
        const st = document.createElement("style"); st.id = "er-celebrate-css"; st.textContent = CSS; document.head.appendChild(st);
      }
      const er = page.querySelector(".er");
      const money = page.querySelector(".er-money");
      // the kit confetti becomes redundant once the canvas runs
      page.querySelector(".er-confetti")?.remove();
      // glow + sparkles live with the money stack
      money.insertAdjacentHTML("afterbegin", `<span class="er-glow" aria-hidden="true"></span>`);
      money.insertAdjacentHTML("beforeend", SPARKS.map(([x, y, s, d, c]) =>
        `<span class="er-spark" aria-hidden="true" style="left:${x}px;top:${y}px;--s:${s}px;--d:${d}ms">${STAR(c)}</span>`).join(""));
      // letter-by-letter title (screen readers keep the word)
      const t = page.querySelector(".er-title");
      if (t && !t.dataset.split) {
        const word = t.textContent; t.dataset.split = "1"; t.setAttribute("aria-label", word);
        t.innerHTML = [...word].map((ch, i) => `<span class="ch" aria-hidden="true" style="--i:${i}">${ch}</span>`).join("");
      }
      er.classList.add("is-party");

      const fx = confetti(page);
      const pr = page.getBoundingClientRect();
      const plinth = page.querySelector(".er-money__plinth");
      return {
        /* a bundle has just landed: the plinth takes the weight, gold sparks off the top */
        land(k) {
          const b = page.querySelector(`.er-money__stack[data-k="${k}"]`);
          plinth.classList.remove("is-thud"); void plinth.offsetWidth; plinth.classList.add("is-thud");
          if (b) { const r = b.getBoundingClientRect(); fx.coins(r.left - pr.left + r.width / 2, r.top - pr.top + r.height * 0.3); }
          if (navigator.vibrate) navigator.vibrate(k === 0 ? 14 : 10);
        },
        /* the total is built: confetti from the stack and both sides, the total shines */
        finale() {
          const tot = page.querySelector(".er-total");
          const mr = money.getBoundingClientRect();
          fx.burst(mr.left - pr.left + mr.width / 2, mr.top - pr.top + mr.height * 0.4, 50, [6, 13]);
          timers.push(setTimeout(() => fx.cannons(), 120));
          if (tot) {
            tot.classList.remove("is-shining"); void tot.offsetWidth; tot.classList.add("is-shining");
            timers.push(setTimeout(() => tot.classList.remove("is-shining"), 1200));
          }
          if (navigator.vibrate) navigator.vibrate([16, 60, 24, 60, 30]);
        },
        stop: fx.stop,
      };
    },
  };
})();
