# OPL Finance Hub · HTML prototype

The source of truth for the Finance Hub flows as a clickable HTML prototype. It also
starts the HTML component kit that later mobile flows reuse.

- **Live (team link):** https://paralleldigitalinc.github.io/opl-finance-hub-prototype/ · library: https://paralleldigitalinc.github.io/opl-finance-hub-prototype/library.html
- **Repo:** https://github.com/ParallelDigitalInc/opl-finance-hub-prototype. GitHub Pages redeploys from `main` on every push, usually within a minute or two.
- **Prototype:** `index.html` (a device frame plus a variant panel; full-screen on a phone)
- **Component library:** `library.html` (tokens, icons and every component, rendered by the same functions)
- **Figma:** `GHuBkYGEQZvQppv3v55EaA`, section *Finance Home* `416:82748`

**Screens (v0.8.0):**
- **Home:** frames `382:34093`, `382:33823`, `382:36681`
- **Loans overview:** `382:36150`. Home → "Explore Loans" pushes it; the back arrow or browser back pops it.
- **Loan offers:** list `382:35324`, comparing `382:35666`, Sort sheet `393:505`, Filters sheet `393:869`. Reached from:
  - Loans overview → "See all loans (7)" or the Offers tab
  - Home → "View all" on Top loan matches
- **Compare loans:** `382:37839`. Loan offers → tray "Compare" (2+ loans selected).
- **Loan applications** (section `416:122660`), v0.6.0 builds groups A–C:
  - **Apply sheet** ("Proceed applying", `382:40870` / `382:41357`): from "Apply to N lenders" on Compare loans, or "Apply now" on any offer card or Loan details sheet.
  - **Track Loan Applications** (`382:41059`): reached from Submit or the Loans "Track Loans" tab.
  - **Application detail:** verifying (`382:42423`) or KFS ready (`382:42689`).
  - **"{Lender} approved your loan"** milestone sheet (`416:43921`).
  - **KFS reader** (group D, v0.7.0; `416:43474` → `416:43604`): from "Review Full KFS & Accept". Read to the last page, tick consent, then Accept KFS.
  - **NeSL signing** (group E, v0.8.0):
    - Accept KFS opens the Step 2 sheet (`433:7980`).
    - The NeSL portal follows (six screenshots, `433:8115` … `416:83101`), then Confirming (`416:82947`), then Application · Signed with its milestone sheet (`431:8486`).
    - "I'll come back later" or Cancel on NeSL leads to Application · Sign letter (`431:7803`).
  - Group F (disbursal: `435:8001`, `435:8572`) comes next.
- **Subsidies home** (`524:103425`), screen `subsidies-overview`: Finance Home → "Explore Subsidies". It's the gateway to every subsidy.
  - The "Top subsidies" cards are Home's subsidy match cards and open Subsidy details.
  - Central and State filter the rail live.
  - The benefit-type chips, View all, Sector, Import & Export, "Schemes in Gujarat" and Explore Now lead to the subsidy listing (`subsidy-list`), which isn't designed yet, so they show a hotspot hint.
- **Subsidy details** (branch `flow/subsidies`; section "Subsidy Home - First Cut" `416:44852`):
  - Gujarat Textile Policy 2024, collapsed `416:44853` and expanded `416:45617` (panel presets).
  - Reached from any Home "Top subsidy matches" card.
  - "See other benefits" and "How it works" open and close in place.
  - **Benefit sheets** (section `416:47994`): any Policy Benefits tile or "See other benefits" row opens its sheet.
    - Capital and Interest have an Activity 1 / 2 switch.
    - Each Figma frame is a panel preset, e.g. "Sheet · Capital · Activity 2".
- **Calculate estimate** (section `416:76869`), opened from "Calculate Estimate" on the policy page:
  - **Form** `subsidy-estimate` (`416:77107`; preset "All benefits open" = `416:76872`): one card per benefit, live figures, Add more / Remove.
  - **Result** `subsidy-estimate-result` (`416:77363`): replaces the form, so ✕ and Back return to the policy page. "Add more" swaps back to the form.
  - Hotspots for later: Talk to an Expert, Apply Now / Apply Online and the two links.

## Run it

The working copy lives in `~/Code/opl-finance-hub-prototype`, outside iCloud. iCloud's "Optimize Mac Storage" offloads files under ~/Documents and stalls git, so don't keep a repo there.

Open `index.html` directly, or serve the folder. After editing anything in `css/` or `js/`, run `tools/build.sh`: pages load the `dist/` bundles. The pre-commit hook also runs it.

```bash
cd ~/Code/opl-finance-hub-prototype && npx serve .
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
   - Max **150 KB per asset** and **900 KB total** (raised from 700 on 23 Nov 2026 as flows were added), enforced by `tools/check.sh`.
   - Full-resolution originals live in `assets/_source/` for re-export and are never loaded.
5. **Screen-only images live in `assets/lazy/`** (for example the NeSL portal shots). They're fetched only by the screen that shows them, and never referenced from `index.html`. They have their own cap (150 KB each, 1000 KB total; raised from 600 on 23 Nov 2026) and don't count against the first-load total.
6. **Every image has a fixed CSS size**, so nothing shifts as it loads.
7. **First paint is the boot layer.**
   - Inline critical CSS in `index.html` paints the device and a neutral placeholder at first byte.
   - The first screen renders hidden (`.is-booting` pauses its CSS animations at frame 0) and reveals once fonts and above-the-fold images are ready, capped at 3 s.
8. **Motion meant to be seen waits for the reveal.** Use `OPL.afterReveal(fn)` for entrance timers, auto-cycles and nudges. `OPL.countUp` and `OPL.fx.enter` / `fx.nudge` already do this. Never start visible motion on render.
9. **Count-ups render their start value**, so there's no full→0 flash. They're timer-stepped so they finish in background tabs.
10. **The pre-commit hook** (`tools/hooks`, enabled via `git config core.hooksPath tools/hooks`) rebuilds the bundles and runs the budget check; a failing budget blocks the commit.

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
   - **v0.5.2:** the same sheet (`OPL.fx.loanDetail`) opens from Home's "Top loan matches" and the Loans overview offer cards.
   - Compare is one shared selection: ticking on Home shows up on Loan offers.
   - Bank of Baroda isn't in the Loan offers list, so its sheet has no Compare, and its APR, EMI, fee, collateral and Money in are **assumed placeholders** (`match-bob`).

## Figma flags · Loan applications (`416:122660`)

1. **Copy is driven by the selection.** The single-lender sheet (`382:41357`) reuses the 2-lender copy ("Submit 2 applications", consent naming Citi Bank and SIDBI). I used "Submit application" and the actual lender names. Its note "A separate application goes to each lender…" is kept as drawn; consider dropping it for a single lender.
2. **Lender rows don't match Compare.** The sheet shows SIDBI as "Term loan · Up to ₹48 Lakhs"; Compare says "Working capital term loan · Up to ₹50 L". Rows follow the shared loan data.
3. **Two tracker styles on one screen.** The verifying card uses solid green, a blue in-progress step and 3px lines; the KFS card uses light tints and 2px lines. Reproduced as drawn.
4. **The third Loans tab has two labels.** It reads "Track Loans" on the application screens (nav `440:132239`) and "Applications" on Loans overview (`382:36150`), each as drawn (Shreya, 23 Nov). Pick one name for both.
5. **The DS Toggle "On" is indigo `#4338CA`** (old primary), not `#3858E5`. Used as drawn.
6. **Lender-specific content exists only for SIDBI (verifying) and Citi (KFS ready).** Other lenders reuse those templates with their own name; this is **assumed**:
   - phone, address, documents and application number
   - KFS figures (₹45 L etc.)
   - `ringroad.surat@<lender>.example`
7. **Strokes are in layout** on this section's info cards, status card, WhatsApp row and apply lenders card (unlike earlier match and offer cards).
9. **Duplicate heading.** "Loan Application Details" appears twice in `382:42526` (section heading and card title). On Shreya's call (23 Nov) only the card title is kept.
10. **Confetti exits.** Figma shows it resting around the mark. In the prototype it bursts to those spots, then falls away and fades (Shreya, 23 Nov).
11. **KFS page 3 isn't drawn.** The KFS reads "Page n of 4", and rows 13–17 on page 2 say "See Annex A". Only pages 1, 2 (`416:43474`) and 4 (`416:43604`) exist. Page 3 is **assumed** as "Annex A · Contingent charges" (data `kfsDoc.pages[2]`, `assumed: true`) with placeholder values:
    - 2% p.a. penal interest
    - ₹500 per bounce
    - Nil foreclosure on floating rate
    - 0.5% to switch to fixed
    - stamp duty
    These need real copy from the lender or legal.
12. **KFS consent states.** Figma draws *locked* (grey text, 50% checkbox, hint shown, disabled button) and *read to end* (ticked, enabled). Between them, the prototype adds *unlocked, not ticked*: ink text, full checkbox, button still disabled. You tick it yourself, as a consent should work.
13. **Consent line break.** Page 4 breaks "…understood the / Key Fact Statement"; page 1 wraps after "Key Fact". Page 4's break is used in both states.
14. **The KFS disabled button** is drawn as slate-200 fill with a #94A3B8 label at 50%. The DS's generic disabled state (45% opacity) isn't used here.
15. **KFS for other lenders** reuses Citi's template with the lender's name: the letterhead name, grievance officer and LSP rows. Loan numbers and figures stay Citi's. This is **assumed**.

## Figma flags · NeSL signing (group E)

1. **The NeSL portal is screenshots.** The six "NeSL-Redirection" frames are recordings of NeSL's real site, shown as images with hotspots.
   - The agreement frame has no visible "I AGREE" button (its note says to scroll to the bottom), so the whole document area advances.
   - Cancel on OTP or the agreement returns to Application · Sign letter. Figma doesn't draw that link.
2. **The sheet's note-row warning tile is `#FFEDD5`**, while the kit's Note row warning is `#FEF3C7`. This sheet uses its drawn colour; the kit is unchanged. Align them.
3. **"Same as KFS" check icon:** its outer circle is Solar navy `#1C274C`, not green like the "KFS accepted" chip. Used as drawn; it looks unintended.
4. **"Done" on the signed sheet** has no destination in Figma, so it closes the sheet, as "View application" does.
5. **The Track Loans list has no card for sign or signed.** Those applications keep the KFS-ready card until a design exists.
6. **Back after signing** returns to the KFS reader. The NeSL steps and loader don't stay in history (they use `replace`), but the KFS page does.
7. **Timing is a prototype choice:** redirect 1.8 s, confirming 2.4 s.
8. **Prototype behaviour:** about 5 s after Submit, the first lender "approves" and the milestone sheet plays. This simulates the async lender response so the full flow can be demoed.

## Figma flags · Subsidy details (`416:44852`)

1. **Every Home subsidy card opens the Textile Policy page.** The three Home cards are other schemes (MSME Competitive, Gujarat Electronics, Aatmanirbhar Gujarat), and only Textile Policy has a details design.
2. **Strokes differ between the two frames.**
   - "See other benefits" is 52 tall with the stroke inside when closed. It is 1 + 56 + rows + 1, with the stroke in layout, when open.
   - The closed label sits 14 from the top with no gap before the count badge. The open one sits 16 down with an 8 gap.
   - The closed header is 13 + the 1px border, so the label still lands at 14. The 8 gap is used in both states.
3. **The How it works chevron points down in both frames.** "See other benefits" flips to up when open. Both use the flip here, for consistency.
4. **The deadline chip copy differs:** "Apply within 1 year of production" (accordion header) vs "Apply within 1yr of production" (step 1). Both are used as drawn.
5. **"See other benefits" is 351 wide**, 1px wider than the 350 column. 350 is used.
6. **The Steps frame has a 1px drop shadow on a frame with no fill**, so it would shadow the text. Not used.
7. **Step 2's inset labels are ink (`#0F172A`)**, while the component default is `#64748B`. Used as drawn.
8. **Buttons are drawn in Instrument Sans** (Calculate Estimate, Apply Now, Talk to an Expert). Geist SemiBold is used, per the Geist-only rule.
9. **Policy period is computed from today,** per the widget's description. Today, 23 Nov 2026, gives "2 years 10 months left" and a 43% bar, the same as the frame (137 of 316). It moves with the date, and the chip turns amber in the last 6 months.
10. **Proposed, not in Figma:**
    - the AI Mitra nudge line "Ask anything about this policy" (panel toggle)
    - the "Steps copied" confirmation when sharing steps without a native share sheet
11. **Illustration:** the five vector layers (plinth ×2, notes, two coin stacks) are composed from Figma's own SVGs at their offsets, so the entrance can land them. The two clip-path groups inside the coins came through empty from Figma, so check the coin rims against the frame.
12. **Sheets: the exclusion row tint differs.** Power tariff has white at 50% over `#FFEDD5`; Quality and Technology have 40%. 40% is used for all three.
13. **Sheets: Power tariff and Payroll have no "Apply Now" link**, only Talk to an Expert. Kept as drawn.
14. **Sheets: Apply Now is drawn in Figtree** (label/medium) and the primary button in Instrument Sans. Geist is used.
15. **Sheets on a phone:** a sheet taller than the screen stops 12 below the status bar and its body scrolls. Capital, Interest and Payroll are 914–993 tall in Figma.

## Figma flags · Subsidies home (`524:103425`)

1. **Two hero layers:** `524:103429` fully covers `524:103426`, which has a stroke. The visible one is built, as on Loans overview.
2. **"Up to ₹72 Lakhs" and the chip counts are as drawn.** They don't come from the cards (Capital 2 + Interest 1 + Other 6 = 9 schemes, while three cards are shown).
3. **Gujarat Electronics Policy is tagged "Central Government"** here and on Home, but it's a state policy. The Central filter follows the tag, so it shows that card.
4. **Sector and Import & Export** need the listing, as do "Schemes in Gujarat" and the benefit chips, so they lead there.
5. **No filter-chip selected state is drawn.** The kit's selected chip (Loan offers `392:490`) is used.
6. **Proposed, not in Figma:** the AI Mitra nudge "Ask anything about subsidies" (panel toggle).
7. **Promo illustration:** the factory is composed from Figma's own vectors (building plus two smoke layers), with the ground and two pins, so the card can tell its story.

**Motion (Subsidies home):**
- "Up to ₹72 Lakhs" counts up, the benefit chips settle in and their counts tick up, and the cards slide in from the right.
- Central / State filter the rail in place: non-matching cards fold away and the rest slide together. Tap again to clear.
- When the "new unit" card scrolls in, the ground rises, the factory settles, both map pins drop in with a bounce, and the smoke drifts up twice.
- Press states: chips dip and their icons tilt, chevrons and arrows nudge the way they lead, and the phone icon rings.

## Figma flags · Calculate estimate (`416:76869`)

1. **The estimate is calculated, not copied.**
   - Figma's figures are placeholders: every card reads ₹87.5L, and the breakdown (87.5 + 36.5 + 12) doesn't add up to "Up to ₹87.5 L".
   - The formulas use the benefit-sheet rates at the "Up to" end: Category 1 / PM MITRA Park, Activity 1.
     - **Capital:** 35% of project cost, capped at ₹100 Cr.
     - **Interest:** min(7%, rate − 2%) on each year's opening balance (annual instalments), for up to 8 years, capped at 3% of project cost a year when a project cost is entered.
     - **Power:** ₹1/kWh × annual units × 5 years.
     - **Payroll:** ₹5,000 per woman and ₹4,000 per man a month, for 5 years.
     - **SHG:** ₹5,000 a member for 3 months of training, plus ₹5,000 a month for 5 years.
     - **Quality:** 50%, up to ₹10 L.
     - **Energy:** 75% of the audit, up to ₹50,000, plus 25% of equipment, up to ₹20 L.
     - **Technology:** 65%, up to ₹50 L.
   - With the drawn inputs (₹20 Cr loan at 9.45% over 15 years, ₹1.5 Cr project) plus 2,40,000 kWh, the result reads Capital ₹52.5 L, Interest ₹36 L, Power ₹12 L, Up to ₹1 Cr.
   - **These formulas need a policy owner's check.**
2. **The two form frames differ.**
   - `416:76872`: "Calculate Estimate" in title case, Medium 44px inputs with Geist 14 labels, and the typo "Power Tariff Sabusidy".
   - `416:77107`: sentence case, Small 38px inputs.
   - Both presets use `416:77107`; the "All benefits open" preset only opens every card.
3. **The chips list "Power tariff" even though Power is already added.** Here the chips are always the benefits not yet added: two are shown, plus "+ N more", which expands them all.
4. **Copy:** the result line has a double space ("business is  applicable"); one space is used.
5. **Proposed, not in Figma:**
   - input fields for Payroll, SHG, Quality, Energy and Technology, so "Add more" works
   - segment colours for those five, taken from their icons
   - the "Calculating…" state
   - the error state when an added benefit has no number (DS Input has an Error state)
   - the result preset fills 2,40,000 kWh so Power shows, as in `416:77363`
6. **The hatched "not added" segments** are drawn as CSS stripes, because the pattern fill didn't export.
7. **Strokes on the cards and action bar are inside** (cards 336 / 56, bar 126).

**Motion (Calculate estimate):**
- **Form:**
  - Each card's figure re-counts as you type, with a blue tick.
  - Cards open by height.
  - An added benefit drops in from its chip, its icon pops, and its first field takes focus.
  - A removed card folds away and its chip returns.
  - Get Estimate shows "Calculating…" before the result.
- **Result: the cash arrives.** One bundle of cash falls onto the plinth for each benefit. With the three drawn benefits it ends as Figma's three-bundle stack; more benefits stack it higher.
  - **Each landing:**
    - the plinth takes the weight
    - gold coins spark off the bundle
    - that benefit's segment fills the Build-up bar, its row counts in, and the headline total climbs by its amount
  - **Around it:** a warm OPL Yellow glow blooms behind the stack, the rays turn, sparkles twinkle, and "Congratulations" springs in letter by letter.
  - **Finale (total complete):**
    - a confetti burst from the stack, plus cannons from both sides
    - an indigo-and-gold shine sweeps the total
    - a nudge on "Add more"
  - Android gets haptics on every landing and the finale.
  - The celebration is `assets/lazy/subsidy/estimate/celebrate.js` (canvas, one-shot, about 9 KB). It loads only on this screen, outside the first-load budget. If it fails to load, the kit's milestone confetti plays instead.
  - Reduced motion shows the final state.

**Motion (prototype layer):**
- **The benefits land:** the plinth settles, the notes drop onto it, the coins clink down, and "Up to ₹1.2Cr" counts up as they land.
- The period bar fills to today, then the time-left chip appears.
- Disclosures open by height. Their rows stagger in, and the list scrolls into view if it opened below the fold.
- The How it works rail draws step by step.
- The OPL Verified stamp presses onto the expert card once.
- **Sheets:**
  - The sheet slides up and its sections rise in.
  - The benefit's icon pops into its tile, and the condition marks tick in one by one.
  - On Activity 1 / 2, the white thumb slides across and the rate figures slide out and back in the same direction.
  - Close turns its ✕. Drag down, tap the scrim or press Esc to dismiss, and focus returns to the tile you came from.
- Tiles, rows and buttons have press states, with their arrows nudging in the direction they lead.
- Reduced motion and "Motion off" render everything at rest.

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
