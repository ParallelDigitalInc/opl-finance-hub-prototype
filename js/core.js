/* ==========================================================================
   OPL HTML kit — core helpers
   Plain scripts (no build, no modules) so the prototype opens from file://,
   any static host, or a phone. Everything hangs off window.OPL.
   ========================================================================== */
(function () {
  const OPL = (window.OPL = window.OPL || {});

  OPL.VERSION = "0.20.0";
  OPL.FIGMA_FILE = "https://www.figma.com/design/GHuBkYGEQZvQppv3v55EaA/OPL----Internal-Playground--5-";
  OPL.figmaLink = (nodeId) => `${OPL.FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

  /* ---- tiny templating ---------------------------------------------------- */
  // Escapes text; pass OPL.raw(html) to opt out for trusted component output.
  const esc = (v) =>
    String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  class Raw { constructor(s) { this.s = s; } toString() { return this.s; } }
  OPL.raw = (s) => new Raw(s);
  OPL.html = (strings, ...vals) =>
    OPL.raw(
      strings.reduce((out, str, i) => {
        if (i === 0) return str;
        const v = vals[i - 1];
        const s = v == null || v === false ? "" : Array.isArray(v) ? v.join("") : v instanceof Raw ? v.s : esc(v);
        return out + s + str;
      }, "")
    );
  OPL.cx = (...c) => c.filter(Boolean).join(" ");

  /* ---- assets ------------------------------------------------------------- */
  OPL.icon = (name, size = 24, cls = "") =>
    OPL.raw(`<img class="ico ${cls}" src="assets/icons/${name}.svg" width="${size}" height="${size}" alt="" draggable="false">`);
  OPL.img = (name) => `assets/img/${name}`;

  /* ---- state (URL-backed so any state is linkable for a presentation) ----- */
  OPL.state = {
    get() {
      const p = new URLSearchParams(location.hash.replace(/^#\??/, ""));
      return Object.fromEntries(p.entries());
    },
    set(patch, { silent = false } = {}) {
      const next = { ...OPL.state.get(), ...patch };
      Object.keys(next).forEach((k) => next[k] == null && delete next[k]);
      history.replaceState(history.state, "", "#" + new URLSearchParams(next).toString());
      if (!silent) window.dispatchEvent(new CustomEvent("opl:state", { detail: next }));
    },
  };

  /* ---- reduced motion ----------------------------------------------------- */
  OPL.reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- press feedback (all [data-press] elements) ------------------------- */
  // Mobile-style: scale on touch-down, release on up/cancel/scroll. A light
  // haptic tick on Android (navigator.vibrate); iOS Safari ignores it.
  function initPress(root = document) {
    let active = null, startX = 0, startY = 0;
    const release = () => { if (active) active.classList.remove("is-pressed"); active = null; };
    root.addEventListener("pointerdown", (e) => {
      const el = e.target.closest("[data-press]");
      if (!el) return;
      active = el; startX = e.clientX; startY = e.clientY;
      el.classList.add("is-pressed");
      if (navigator.vibrate && e.pointerType === "touch") navigator.vibrate(6);
    });
    root.addEventListener("pointermove", (e) => {
      if (active && Math.hypot(e.clientX - startX, e.clientY - startY) > 8) release();
    });
    ["pointerup", "pointercancel", "pointerleave", "dragstart"].forEach((t) => root.addEventListener(t, release));
    root.addEventListener("scroll", release, true);
  }

  /* ---- hotspot hints (Figma-prototype convention, not product UI) --------- */
  // Elements with data-goto="<screen>" that aren't built yet flash a blue
  // outline on tap, so the presenter can show "this goes somewhere next".
  function initHotspots(root = document) {
    root.addEventListener("click", (e) => {
      if (e.target.closest("[data-back]")) return OPL.back && OPL.back();
      const el = e.target.closest("[data-goto]");
      if (el) {
        const target = el.getAttribute("data-goto");
        if (OPL.hasScreen ? OPL.hasScreen(target) : OPL.screens && OPL.screens[target]) return OPL.go(target);
        flash([el]);
        return;
      }
      // Tapping a non-interactive area reveals every hotspot, like Figma.
      const screen = e.target.closest(".screen");
      if (screen && !e.target.closest("[data-press],button,a,input")) {
        flash(screen.querySelectorAll("[data-goto]"));
      }
    });
  }
  function flash(els) {
    if (document.documentElement.dataset.hotspots === "off") return;
    els.forEach((el) => {
      el.classList.remove("hotspot-flash");
      void el.offsetWidth;
      el.classList.add("hotspot-flash");
      setTimeout(() => el.classList.remove("hotspot-flash"), 700);
    });
  }

  /* ---- reveal gate ---------------------------------------------------------
     The first screen renders hidden behind the boot layer; motion that should be
     *seen* (entrance, count-up, nudge, auto-cycles) waits for the reveal. */
  OPL._revealed = false;
  const revealQueue = [];
  OPL.afterReveal = (fn) => { if (OPL._revealed) fn(); else revealQueue.push(fn); };
  OPL.markRevealed = () => { OPL._revealed = true; revealQueue.splice(0).forEach((fn) => fn()); };

  /* ---- count-up for hero amounts -----------------------------------------
     Shows the start value immediately (no full→0 flash), animates after the
     reveal. setTimeout-stepped so it also completes in background tabs. */
  OPL.countUp = (el, { to, prefix = "", suffix = "", duration = 900, delay = 0 } = {}) => {
    if (OPL.reducedMotion() || OPL.state.get().motion === "off") { el.textContent = prefix + to + suffix; return; }
    el.textContent = prefix + 0 + suffix;
    OPL.afterReveal(() => setTimeout(() => {
      const t0 = Date.now();
      const step = () => {
        const k = Math.min(1, (Date.now() - t0) / duration);
        el.textContent = prefix + Math.round(to * (1 - Math.pow(1 - k, 3))) + suffix;
        if (k < 1) setTimeout(step, 16);
      };
      step();
    }, delay));
  };

  OPL.initInteractions = (root) => { initPress(root); initHotspots(root); };
})();
