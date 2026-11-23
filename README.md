# OPL Finance Hub · HTML prototype

The source of truth for the Finance Hub flows as a clickable HTML prototype. It also
starts the HTML component kit that later mobile flows reuse.

- **Prototype:** `index.html` (a device frame plus a variant panel; full-screen on a phone)
- **Component library:** `library.html` (tokens, icons and every component, rendered by the same functions)
- **Figma:** `GHuBkYGEQZvQppv3v55EaA`, section *Finance Home* `416:82748`

**Screens (v0.4.0):**
- **Home:** frames `382:34093`, `382:33823`, `382:36681`
- **Loans overview:** `382:36150`. Home → "Explore Loans" pushes it; the back arrow or browser back pops it.
- **Loan offers:** list `382:35324`, comparing `382:35666`, Sort sheet `393:505`, Filters sheet `393:869`. Reached from:
  - Loans overview → "See all loans (7)" or the Offers tab
  - Home → "View all" on Top loan matches
- **Compare loans:** `382:37839`. Loan offers → tray "Compare" (2+ loans selected).

## Run it

Open `index.html` directly, or serve the folder. After editing anything in `css/` or `js/`, run `tools/build.sh`: pages load the `dist/` bundles. The pre-commit hook also runs it.

```bash
cd ~/Documents/OPL/finance-hub-html && npx serve .
```

On a phone (≤ 500px wide) the prototype goes full-bleed with no shell and no panel, and
uses the real status bar and safe areas. Any state can be linked through the URL hash, for example:

`index.html#order=subsidies&emi=on` · `#autoplay=on` · `#frame=off` · `#hotspots=off` · `#motion=off`

## Structure

```
css/
  tokens.css               design tokens; names mirror the Figma variables
  base.css                 reset, stage, device shell, prototype panel (chrome, not product UI)
  components/
    primitives.css         Button, IconButton, Avatar, Logo, FactPill, Dots, Chip, Badge
    cards.css              HeroCard, MatchCard, QuickAction, SectionHeader, HelpCard, NoticeBanner
    chrome.css             StatusBar, AppHeader, FloatingBottom, AiMitraFab, BottomNav
  screens/home.css         layout only: rhythm and positions for this screen
js/
  core.js                  OPL namespace, templating, URL state, press feedback, hotspots, count-up
  fx.js                    shared behaviours: status-bar scroll, nudge, entrance, play-in-view, mouse drag
  components.js            OPL.ui.* (pure functions: props in, HTML out)
  variants.js              toggle registry per screen (presets = Figma frames)
  data/home.js             screen content, verbatim from Figma
  screens/home.js          screen render and behaviour
  app.js                   router (push/pop pages + history), device scaling, panel
  library.js               component library page
assets/icons               Solar icons exported from Figma (colours baked in, as drawn)
assets/img                 logos, avatar, hero texture, illustration (≤3× display size)
assets/_source             full-res originals for re-export (never loaded)
assets/fonts               Geist woff2, self-hosted
dist/                      GENERATED bundles: app.css + app.js (don't edit)
tools/build.sh             bundle + version-stamp · tools/check.sh: loading budget
tools/hooks/pre-commit     runs both before every commit
```

**Adding a screen:**
1. Put its content in `js/data/<screen>.js`.
2. Compose it from `OPL.ui` in `js/screens/<screen>.js` and register it in `OPL.screens`.
3. Put layout-only CSS in `css/screens/<screen>.css`.
4. Add its presets and toggles to `js/variants.js`.
5. If a pattern is new, add it to `components.js`, the matching CSS file and `library.js`, with its Figma node ID.

Screens expose `render(page)` and `leave()`; `leave()` clears timers when the page is popped or replaced.
`data-goto="<screen>"` on any element links it, and `data-back` pops the current page. Until that screen exists, tapping it flashes a hotspot hint.

## Loading (guardrail)

Measured 23 Nov 2026 in the in-app preview. Before: first paint 6.7 s, interactive 10.9 s, 62 requests, ~1.9 MB. After: **first paint 0.2 s, interactive 0.08 s, 23 requests, ~300 KB, no external requests, zero layout shift.**

Rules for every new screen and asset:
1. **Two requests for code.** Pages load only `dist/app.css` and `dist/app.js`, built by `tools/build.sh` from the ordered lists in that script. Add new source files to the lists there.
2. **Cache-busting.** The build stamps `?v=<OPL.VERSION>` on both bundle URLs, so a deployed link or a phone never runs stale code. Bump `OPL.VERSION` with every release.
3. **Fonts are self-hosted** (`assets/fonts`, Geist variable latin + latin-ext, which carries ₹) and preloaded. No Google Fonts in the prototype, so it works offline in a meeting room.
4. **Images are ≤3× their displayed size.**
   - Opaque photos and textures are JPEG; transparent art is PNG; icons are SVG.
   - Max **150 KB per asset** and **700 KB total**, enforced by `tools/check.sh`.
   - Full-resolution originals live in `assets/_source/` for re-export and are never loaded.
5. **Every image has a fixed CSS size**, so nothing shifts as it loads.
6. **First paint is the boot layer.**
   - Inline critical CSS in `index.html` paints the device and a neutral placeholder at first byte.
   - The first screen renders hidden (`.is-booting` pauses its CSS animations at frame 0) and reveals once fonts and above-the-fold images are ready, capped at 3 s.
7. **Motion meant to be seen waits for the reveal.** Use `OPL.afterReveal(fn)` for entrance timers, auto-cycles and nudges. `OPL.countUp` and `OPL.fx.enter` / `fx.nudge` already do this. Never start visible motion on render.
8. **Count-ups render their start value**, so there's no full→0 flash. They're timer-stepped so they finish in background tabs.
9. **The pre-commit hook** (`tools/hooks`, enabled via `git config core.hooksPath tools/hooks`) rebuilds the bundles and runs the budget check; a failing budget blocks the commit.

## Fidelity rules

- Figma is the source of truth. Nothing visual is added that isn't in the frames.
- Strokes are drawn **inside** (`outline-offset: -1px`), because Figma strokes on these frames don't take layout space. A CSS `border` makes every card 2px too tall.
- Figma "normal" line-height for Geist 16 is **21px**. It is set explicitly.
- CTA colour is `#3858E5` as drawn on screen; the DS CTA token isn't updated yet. Text colours follow the updated DS.
- Geist only. Icons are Solar, exported from Figma.

Geometry was checked against Figma on 23 Nov 2026:
- frame height 1662
- hero card 95 / back 63.77
- match cards 232 / 252
- sections at y 615 and 931
- help card 1319 / 118
- floating bottom 172, or 246 with the EMI banner
- nav items 56 / 57

## Motion and behaviour (prototype layer)

All of this is behaviour on existing elements. None of it adds UI:

- **Entrance:** hero copy → back card → front card → CTA → dots → quick actions → sections, staggered 55ms apart. The ₹ amount counts up once.
- **Hero offer cards (cycling):** every 3.2s on the visible slide, the front card tucks under the CTA, the peeking card grows into the front, and the next offer slides into the peek. It pauses while you touch the hero. The rest state is exactly Figma's. Loans cycle Citi → BoB → Axis; subsidies cycle MSME Competitive → Gujarat Electronics → Aatmanirbhar Gujarat. "Static (Figma)" in the panel turns it off.
- **AI Mitra nudge:** about 2s after load, "Ask anything about **loans & subsidies**" slides out from behind the button. It tucks back after about 4s, or as soon as you scroll. It shows once per load; the topic is set per page in the screen data (`aiNudge`).
- **Hero carousel:** native swipe with snap. The back card has parallax (it moves more than the front card) and the copy fades as it slides. The dots stay in sync, and tapping a dot changes slide. Optional auto-advance turns the active dot's fill into a 5s progress bar; touching pauses it.
- **Press states:**
  - cards scale to 0.98
  - tiles scale to 0.94, with a small icon pop
  - buttons and chips scale to 0.96–0.97
  - text links fade, and the chevron nudges
  - Android adds a haptic tick
- **Rails:** horizontal scroll-snap; mouse drag works on a laptop.
- **Status bar:** gains a frosted surface once content scrolls under it.
- **EMI banner:** dismissing slides it off. The slot then collapses and the AI Mitra button settles into the loans-frame position.
- **AI Mitra:** a one-time attention ripple after the entrance. On press, the mark rotates.
- Reduced-motion users get no entrance or parallax.

## Figma flags (kept as drawn; to confirm)

1. The "View all" chevron differs: the loans frame uses a heavier CaretRight than the subsidies frame. One is used everywhere (the loans frame's).
2. The hero back card on the subsidy slide shows the Gujarat mark with the *MSME Competitive Lean Scheme* copy, the same as the front card.
3. *Gujarat Electronics Policy* is tagged "Central Government", but it is a state policy (Science and Technology Department).
4. The second loan card's tag "Working Capital Loan" repeats its subtitle.
5. The help card in `382:36681` has 17px padding and is 120 tall; the other frames use 16 / 118. 16 is used.
6. The tile and chip fill `#F5F7FA` is off-palette.
7. The fact pill's text style is "label/medium" (Figtree) but renders in Geist. Geist is used.
8. The EMI banner reads "due on 12 Nov", which is in the past relative to today's demo date.
9. Inactive nav items are 57 tall while the active one is 56, so labels sit 1.5px higher. This is reproduced.
10. Not in Figma, added on request (v0.2.0):
    - the third rail cards
    - the cycling stack
    - the AI Mitra nudge
    - the page-end note (off by default)

    Sources: the Axis card copies Loan offers "Top 3 picks" `382:35360`, with its logo and `#FCF3F6` tint. Aatmanirbhar Gujarat 2022 ("Up to ₹1.2Cr") comes from the subsidy screens `164:1434`. Its department, "Industries and Mines Department", is real-world, but OPL should confirm it. The Govt. of Gujarat seal is from Wikimedia Commons ("Seal of Gujarat.svg"), cropped in CSS.
11. Once cycling, the subsidy back card carries its own copy (Gujarat Electronics Policy) instead of Figma's duplicated MSME copy.

## Figma flags · Loans overview (`382:36150`)

1. **The offer cards drift from Home.** Titles are 18px, subtitles Figtree Medium, and the BoB labels use "Prodigy Sans". **Decided 23 Nov: 18px titles here** (`MatchCard size: "lg"`); Home stays 16px as drawn. Subtitles and labels are mapped to Geist.
2. Fonts mapped to Geist: the status-bar time (Figtree) and the "See all loans (7)" label (Instrument Sans SemiBold → DS Button Medium 14).
3. The visible hero layer (`416:121651`) rounds only the **bottom-left** corner, so the bottom-right is square. This is reproduced; confirm it's intended.
4. The content column is 354 wide (application and borrowing cards), while the help card is 350 and the screen gutter is 20/16. Reproduced as drawn.
5. The header icons and CMR chevron are Solar `#1C274C`, not ink.
6. Home now matches the updated Figma: "₹50 Lakhs" and the "Explore Loans" / "Explore Subsidies" CTAs. `382:36681` still reads "See all subsidies (3)"; I used "Explore Subsidies" for both, since the hero carousel is shared. The Subsidies overview isn't designed yet, so that CTA shows a hotspot hint.

## Figma flags · Loan offers flow (`416:121835`)

1. **Compare loans follows the selection** (decided 23 Nov). Columns are the ticked offers, in the order they were ticked; opened directly, it shows the Figma set (Citi, SIDBI, SBI). Removing a column un-ticks it on the list.
   - Green means the best value in the row among the lenders on screen: max loan amount, min interest, APR, fee and Money in. It needs 2+ known values that differ. EMI isn't coloured, as in Figma. This rule reproduces Figma's greens for the drawn set.
   - **Assumed data (placeholders, replace with OPL's):** Figma has no Compare figures for Axis or HDFC, so these are made-up but plausible. They're tagged `assumed: [...]` in `js/data/loan-offers.js`.
     - Axis pick: APR 10.62%, EMI ₹1.58 L/mo, Money in ~4-6 days, CGTMSE
     - Axis offer: APR 11.20%, fee 1%, collateral "Property", Money in ~6-8 days
     - HDFC offer: APR 10.95%, fee 0.9%, collateral "Property / FD", Money in ~5-7 days
   - **Add loan column:** with fewer than 3 loans, a trailing "Add loan" column (the tray's + icon) returns to the list to tick another.
   - Derived values:
     - "Needed" collateral, from the "Needs collateral" tag
     - EMI ₹1,50,690 → "₹1.51 L/mo"
   - **Figma conflict:** Citi's card says Tenure "Renews yearly", Fee 0.75%, while its Compare column says 3 years, 1.5%. Compare uses the Compare column.
2. **The third Compare column** is labelled "SIDBI" but carries the SBI logo and different figures. It's shown as **SBI**.
3. **"Top 3 picks" draws only 2 cards.** I added SIDBI as the third, using only Figma values: its All-offers card, plus the 0.5% processing fee from Compare loans.
4. **Nav doesn't match.** Loan offers uses the Finance hub tabs (Home · Business · Finance · Grow), while Loans overview uses the Loans tabs, whose Offers tab leads here. Kept as drawn.
5. **Hero texture.** It's 50% in the compare state and 30% in the list; I used 30%.
6. **Toggle On state.** The DS Toggle is drawn Off only, so "On" (primary track) is inferred.
7. **Sort and filters change state only.** All three All-offers cards share the same figures, so sort updates the chip but doesn't reorder; quick and sheet filters toggle without filtering. "Show 4 offers" is static.
8. **Not built yet:** Apply now and "Apply to N lenders" show hotspot hints.
9. **Loan details sheet (proposed, v0.5.0; not in Figma).** Tapping an offer card's head opens a bottom sheet built only from existing parts:
   - the card's tinted head (tags, logo, name)
   - a 2×2 figures panel on slate-50, the Sanction summary pattern: Loan up to, Interest, APR, Est. EMI
   - detail rows in the card's style: Loan type, Tenure, Pay on, Processing fee, Collateral, Money in
   - a footer with Compare (synced with the card and tray) and "Apply now"

   Card values win where card and Compare data differ. Needs a Figma frame to become source of truth.

## Versioning

| | |
|---|---|
| Scheme | `0.MINOR.PATCH` until hand-off, then `1.0.0` |
| MINOR | a new screen, flow or component/behaviour is added |
| PATCH | fidelity fixes or a Figma re-sync of existing screens |
| Tag | every version is a git tag `vX.Y.Z`; the CHANGELOG lists the Figma nodes synced and the date |
| Single source | `OPL.VERSION` in `js/core.js` (shown in the panel) |
| Branches | `main` is always presentable. Work happens on `flow/<name>` and is merged when reviewed |
| Deploys | each tag gets an immutable deploy URL, used in decks so the audience link never changes. A stable alias points to the latest |

Release: bump `OPL.VERSION`, add a CHANGELOG entry, commit, `git tag vX.Y.Z`.
