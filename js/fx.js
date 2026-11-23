/* ==========================================================================
   Shared screen behaviours (prototype layer). Screens call these from wire().
   Each returns nothing; timers go into the screen's own `timers` array so the
   screen can clear them when it re-renders or is navigated away from.
   ========================================================================== */
(function () {
  const fx = (OPL.fx = {});
  const motionOff = () => OPL.state.get().motion === "off" || OPL.reducedMotion();
  fx.motionOff = motionOff;

  /* Status bar gains a surface once content scrolls under it. */
  fx.statusOnScroll = (page) => {
    const sc = page.querySelector(".scroller");
    sc.addEventListener("scroll", () => page.classList.toggle("is-scrolled", sc.scrollTop > 8), { passive: true });
  };

  /* AI Mitra nudge: slides out once after the entrance, tucks back after ~4s
     or as soon as the user scrolls. */
  fx.nudge = (page, timers, { delay = 1900, hold = 4200 } = {}) => {
    const wrap = page.querySelector(".fab-wrap");
    if (!wrap || !wrap.querySelector(".fab-nudge") || motionOff()) return;
    const hide = () => wrap.classList.remove("is-nudging");
    timers.push(setTimeout(() => {
      wrap.classList.add("is-nudging");
      timers.push(setTimeout(hide, hold));
      page.querySelector(".scroller").addEventListener("scroll", hide, { once: true, passive: true });
    }, delay));
  };

  /* Play a one-shot animation (adds .is-playing) when an element scrolls into view. */
  fx.playInView = (page, selector) => {
    if (motionOff()) return;
    const els = page.querySelectorAll(selector);
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("is-playing"));
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-playing"); io.unobserve(en.target); }
    }), { root: page.querySelector(".scroller"), threshold: 0.4 });
    els.forEach((e) => io.observe(e));
  };

  /* Staggered entrance for a list of elements. */
  fx.enter = (page, els, { holdMs = 4400 } = {}) => {
    if (motionOff()) return;
    els.filter(Boolean).forEach((el, i) => { el.classList.add("enter"); el.style.setProperty("--i", Math.min(i, 16)); });
    page.classList.remove("is-entering"); void page.offsetWidth; page.classList.add("is-entering");
    setTimeout(() => page.classList.remove("is-entering"), holdMs);
  };

  /* Drag-to-scroll with a mouse (presenting on a laptop). */
  fx.mouseDrag = (el) => {
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
      if (moved) el.addEventListener("click", (e) => { e.stopPropagation(); e.preventDefault(); }, { capture: true, once: true });
    });
  };
})();
