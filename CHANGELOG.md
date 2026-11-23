# Changelog

## v0.10.2 — 23 Nov 2026 · Tidier prototype panel

- **The panel no longer looks cut off.** It had grown past the window as screens were added (about 1,800px of controls in a 700px window).
  - **Fixed header:** the screen name, version and collapse chevron stay put, and the controls scroll beneath with a soft fade at whichever edge has more.
  - **Foldable sections:** tap Screens, Figma frames, Options or Prototype to fold them. Each shows its count. Prototype starts folded. The browser remembers what you fold.
  - **Screens grouped by flow:** "Finance hub & loans" (8) and "Subsidies" (4). The flow you're in opens, and the other folds to one line.
  - **Quieter rows:** the Figma node IDs are gone from the screen and frame rows. Rows are tighter, and the subtitle line is dropped.
  - "Open frame in Figma" and "Component library" now sit inside Prototype.
  - Figma frames start folded on screens with four or more; Options start folded when there's more than one toggle.
  - Result: with the default folds, every screen's panel fits a 760px-tall window without scrolling (checked on all 12 screens).
  - **The blue ring on the selected screen or frame is drawn inside the row,** so the scrolling panel no longer clips its edges. Keyboard focus rings are inset too.

## v0.10.1 — 23 Nov 2026 · Collapsible prototype panel

- **The prototype panel collapses for presenting.**
  - The chevron in its header (or the **P** key) folds it into a small pill pinned top-right, showing the screen name and version. The phone then centres on its own.
  - Tap the pill or press P to bring the panel back.
  - The browser remembers your choice. A link with `#panel=closed` (or `open`) sets it for whoever opens it.

## v0.10.0 — 23 Nov 2026 · Subsidies: home, details, benefit sheets, Calculate estimate

Merged from `flow/subsidies`. Synced from Figma:
- Subsidies home `524:103425`
- Subsidy details `416:44852` (`416:44853` / `416:45617`)
- Benefit sheets `416:47994`
- Calculate estimate `416:76869` (`416:77107`, `416:76872`, `416:77363`)

**Added**

- **Subsidy details screen** (`subsidy-detail`), for Gujarat Textile Policy 2024. Home's "Top subsidy matches" cards now open it.
  - The hero has a five-layer illustration and the estimate.
  - Policy period widget, computed from today.
  - Policy Benefits 2×2 tiles and "See other benefits" (4 rows).
  - Apply: the expert help card, portal and website links, and How it works (4 steps, "Share these steps with my CA").
  - A sticky Apply Now / Talk to an Expert bar.
- **Benefit sheets** (`416:47994`, 10 frames): Capital (Activity 1 / 2), Interest (Activity 1 / 2), Power tariff, Payroll, SHG job work, Quality certification, Energy and water saving, and Technology acquisition.
  - Each is opened from its tile or row.
  - All ten match their Figma heights exactly.
  - New components: `BenefitSheetBody`, `ActivitySwitch`, `RateRows`, `SheetCondition`, `.btn--ghost`.
- **Presets:** Collapsed, Expanded, and one per benefit sheet. AI Mitra nudge toggle.
- **Subsidies home** (`524:103425`), `subsidies-overview`, reached from Finance Home → "Explore Subsidies".
  - Hero with the count-up amount and benefit-type chips.
  - Top subsidies, with a location pill and filters (Central / State filter live) and the kit's subsidy match cards.
  - The "new unit" promo card with its animated illustration.
  - Listing links show hotspot hints until the listing is designed.
- **Calculate estimate** (`416:76869`): a form (`416:77107` / `416:76872`) with live per-benefit figures, Add more / Remove and validation, and a result (`416:77363`) with a calculated total and breakdown.
  - **The result is a "cash arrives" celebration:**
    - a bundle drops onto the plinth for each benefit, with a thud, gold sparks and the total climbing
    - then confetti cannons and a shine across the total
  - The celebration is a lazy-loaded canvas script.
  - Formulas and flags are in the README.
- **Components** (`js/components-subsidy.js`, `css/components/subsidy.css`; also on `library.html`): `PolicyPeriod`, `BenefitTile`, `ListRow`, `Disclosure`, `HelpCardExpert`, `HowItWorks` / `HowStep`, `SubsidyFoot`, `CountBadge`, `.deadline-chip`, `.btn--line`.
- **Motion:** the benefits landing, period fill, disclosure height and stagger with self-scroll, rail draw, stamp press, and directional press nudges. See README.
- **Assets** in `assets/lazy/subsidy/` (screen-only): the illustration SVGs, the satin texture, the expert photo, the stamp (rasterised from a 139 KB vector to 6 KB), and 23 icons.

**Changed**

- `tools/build.sh` strips comments from the bundles. Sources keep them.
  - CSS: all comments.
  - JS: whole-line comments only, never inside template strings.
  - JS and CSS: leading indentation too, since no template text is whitespace-sensitive.
  - Loading caps raised (agreed 23 Nov 2026): first load **900 KB** (was 700), screen-only assets **1000 KB** (was 600). Per-asset stays 150 KB.
- Lazy SVGs: removed Figma boilerplate and unused ids, and rounded paths to 2 decimals (−34 KB).

## v0.9.4 — 23 Nov 2026 · Footer morph between sections

- **The bottom nav now visibly changes when you move between sections** (Finance hub tabs ↔ Loans tabs). It used to slide away with the page, so the switch went unnoticed.
  - The bar holds still while the page slides underneath (a CSS counter-move synced to the push/pop).
  - The old tabs drop out, the new tabs rise in one after another, the bar gives a soft primary glow, and the active tab's pill pops.
  - Within a section (e.g. Loans overview → Track Loans) the bar simply stays put and only the active tab changes.
  - Pages without a nav are unaffected. Motion off and reduced motion skip it.

## v0.9.3 — 23 Nov 2026 · Compare from anywhere

- **Ticking "Compare" in a Loan details sheet on Home or Loans overview now does something.** It used to add the loan to the compare selection silently, because those screens have no compare tray.
  - The tick pops, the sheet closes, and **Loan offers** opens.
  - The loan's card is ticked, the compare tray slides in ("Comparing 1 of 3 loans"), and the empty slot nudges for another pick.
  - Tick a second loan from anywhere and "Compare" is ready.
  - Unticking stays put.
  - On Loan offers itself nothing changes: the tray is already there.

## v0.9.2 — 23 Nov 2026 · Days-left tag corner

- **The "2 days left" tag on application cards** (Loans overview and Track Loans) is now clipped to the tinted lender block's 13px corner, as in Figma (`416:121716` has overflow clip). Its square top-right corner used to poke out past the curve.

## v0.9.1 — 23 Nov 2026 · Home → Track Loans

- **The "Track Loans" quick action on the Finance hub home** now opens the Track Loan Applications list (`382:41059`). It pointed at an unbuilt `track-loans` id and only showed a hotspot hint. The list shows your submitted applications, or the Figma state if you haven't applied in this session, and Back returns home.

## v0.9.0 — 23 Nov 2026 · Disbursal (group F), loan journey complete

Synced from Figma `435:8001` (Money on its way) and `435:8572` (Money received + Disbursed milestone sheet).

**Added**

- **Application · Money on Its Way** (`435:8001`):
  - "Expected by 30 Nov" under the title.
  - A fourth timeline step, "Money Disbursal", in progress: blue ring node that pings, teal→blue connector.
  - **Disbursal Details**: amount card with Expected by, Monthly EMI and First EMI, plus an info note.
  - Branch Details, a new **Documents** card (Signed sanction letter, Key Fact Statement), WhatsApp, and the nav.
- **Application · Money Received** (`435:8572`):
  - Every step done ("Money in Account · Received on 27 Nov").
  - The card shows Into account, Received on, First EMI and Monthly EMI.
  - Documents comes before Branch Details, as drawn.
- **"Disbursed" milestone sheet**: the hero is inlined (a full burst of 26 confetti pieces, ripple, and the wallet mark popping), and the amount counts up from ₹0 to ₹44,32,500. "View my loan" leads to My Loans (a hotspot for now), and "Done" closes the sheet.
- **The whole loan journey now plays end to end.** When you close the "Sanction letter signed" sheet, Money on its way follows after 3.5 s, then Money received and the Disbursed sheet after 6 s more. This is prototype timing; the presets jump straight to each state.
- **Components:** `FigureCard` (amount head plus cells, with borders exactly where Figma draws them) and `LinkList` (document rows). The Timeline gets a `progress` state, `line: "fade-blue"` and a `pad` option.

**Fixed (precision)**

- **Timelines:** steps whose node Figma names "current" sit flush with their text and tuck their connector 1px (a 73px rail), and the last step no longer tucks.
  - KFS ready went from 249 to **252** (as drawn).
  - Signed and Money on its way are exact too (266 and 374).
- **APR and amount cards** draw their stroke inside the layout (header at 5,5), so the KFS Summary card is now 253 tall, as drawn.
- **Body padding** is 16/24 in the signed and disbursal states, as drawn.

## v0.8.0 — 23 Nov 2026 · NeSL signing (group E)

Synced from Figma: `433:7980`, the six NeSL-Redirection frames, `416:82947`, `431:8486` and `431:7803`.

**Added**

- **Accept KFS opens the Step 2 sheet** ("Sign your sanction letter on NeSL", `433:7980`).
  - It has the "KFS accepted" chip, the four numbered steps, the deadline note, "Continue to NeSL" and "I'll come back later".
  - The chip pops and the steps stagger in.
  - Accepting moves the application to *sign*.
- **NeSL portal** (`nesl`): six screenshots of the real portal (redirect, OTP, agreement, e-stamp, signing method, Aadhaar eSign).
  - Each step has a hotspot on its own button. Tapping elsewhere flashes the hotspot.
  - The redirect advances by itself after 1.8 s. Steps cross-fade like page loads.
  - Cancel on OTP or the agreement returns to the application.
- **Confirming your signature** (`416:82947`): a spinner for 2.4 s, then the application opens in **Signed**.
- **Application · Signed** (`431:8486`):
  - The timeline is all done ("Signed on NeSL, 24 Nov").
  - New Sanction Summary: the APR card with a "Same as KFS" chip, and sanction details rows.
  - Only AI Mitra floats; there's no nav.
  - The **"Sanction letter signed" milestone sheet** opens on arrival. Its hero is inlined from Figma, so the pen mark and badge pop, the teal ripple pulses, and the confetti bursts then falls away.
- **Application · Sign letter (resume)** (`431:7803`): the third step is in action ("KFS accepted on 24 Nov · Sign by 25 Nov") with a fading connector, and a sticky "Sign on NeSL ↗" button leads back into the portal.
- **Presets:**
  - KFS: "Accepted → NeSL sheet"
  - NeSL: one per step, plus "Confirming signature"
  - Application: "Sign letter (resume)" and "Letter signed + sheet"
- **Components:** `AprCard` (shared with KFS Summary), `KeyValueCard`, `NeslSheetBody`, `MilestoneSigned`, `.ok-chip`. The Timeline gets `line: "fade"` and `strong`.
- **Router:** `OPL.go(name, params, { replace: true })`, so the NeSL steps and loader don't stack up behind Back.

**Fixed**

- **Same-screen navigation** (e.g. one application to another) cleaned up the outgoing page *after* the new one rendered, which cancelled the new page's timers. Cleanup now runs first.
- **Bare sheets** now span the full width. Their body used to shrink to its content.

**Loading guardrail**

- New `assets/lazy/` folder for images that only one screen loads (the NeSL screenshots, 408 KB as 2× JPEGs).
- `tools/check.sh` caps it separately: 150 KB per file and 600 KB in total. It also fails if `index.html` references a lazy asset.
- First load stays at 663 KB.

## v0.7.1 — 23 Nov 2026 · Loans overview fixes

- **"Review KFS" on the Loans overview application card now works.** It used to point at an unbuilt `kfs-summary` screen. It now opens the Citi application in its KFS-ready state (`382:42689`), the same place the Track Loans list goes.
- If an application isn't in your live submitted list, its detail now falls back to its Figma status (Citi → KFS ready) instead of "verifying".
- **Loans overview footer:** the third tab reads "Applications", as frame `382:36150` draws it. The application screens keep "Track Loans" (`440:132239`).

## v0.7.0 — 23 Nov 2026 · KFS reader (group D)

Synced from Figma `416:43474` (KFS, page 1) and `416:43604` (KFS Page 4).

**Added**

- **Key Fact Statement reader** (`kfs`). Reached from "Review Full KFS & Accept" on the KFS-ready application detail.
  - The header has the lender's title, "Step 1 of 2 · Accept KFS" and a Download icon (hotspot, since there's no PDF yet).
  - Four PDF pages (342×484) sit on the slate canvas, with letterhead, rule, numbered tables and the borrower acknowledgement, at Figma's exact type sizes (6.5–13px).
  - The page counter pill and the 3px read-progress bar follow the scroll. Progress only moves forward.
  - Reaching the last page unlocks consent: the row turns ink, "Read to the last page to accept" collapses, and the footer shrinks from 172 to 144.
  - Ticking consent pops the checkbox and turns the disabled slate "Accept KFS" button primary. Accept goes to Step 2 (NeSL), which is a hotspot until group E is built.
- **Presets:** "Reading (page 1)" for `416:43474`, and "Read to the end" for `416:43604` (scrolled to the end, ticked, enabled).
- **Mobile:** on phones narrower than 390, pages scale to fit (fit-to-width); there's no sideways scroll.
- Icon `download.svg` (Figma `416:43504`).

**Assumed (flagged in README)**

- Page 3 (Annex A) isn't drawn, so its charges are placeholders.
- The unlocked-but-unticked consent state isn't drawn.

## v0.6.2 — 23 Nov 2026 · Confetti exit + heading fix

- **Confetti** now leaves after the burst: each piece hangs a beat, then falls 150–240 px with a little drift and spin and fades out, staggered 45 ms apart. The sheet ends clean.
- **Application detail:** removed the duplicate "Loan Application Details" heading above the card of the same name.

## v0.6.1 — 23 Nov 2026 · Confetti that moves

- **The approval sheet's confetti is now animated.** Its 16 pieces are inlined from Figma (`416:44065` › Confetti), so each one moves on its own:
  - each piece bursts out of the lender mark, overshoots with a spin, and lands exactly on its Figma position (staggered 22 ms apart)
  - then the pieces drift gently while the sheet is open
- **Reduced-motion users** see the pieces at rest.
- The static confetti SVG moved to `assets/_source`.

## v0.6.0 — 23 Nov 2026 · Loan applications (A–C)

Synced from Figma section "Loan Applications" `416:122660`: groups A (apply to 2–3), B (apply to one) and C (track applications).

**Added**

- **Apply sheet:**
  - opens from "Apply now" on offer cards and the Loan details sheet, and from "Apply to N lenders" on Compare loans
  - lender rows, notes, consent (unticking disables Submit), and Submit with a loading state
- **Track Loan Applications list:**
  - a verifying card (solid tracker, partial progress line, outlined "View details", note)
  - a KFS-ready card ("2 days left", "Review KFS", amber note strip)
  - the bottom note and the Loans tab bar with "Track Loans" active
- **Application detail:**
  - lender-tinted header and status card with a vertical timeline that plays in
  - collapsible cards (What to expect, Documents, Branch with copy, Application details)
  - WhatsApp toggle and Withdraw
  - in the KFS-ready variant: KFS summary (APR card, repay split bar that plays in, fact chips), sticky "Review Full KFS & Accept" and the AI Mitra button above it
- **Milestone sheet "{Lender} approved your loan":** confetti, ripple ring, mark and badge pop. It auto-plays about 5 s after Submit for the first lender and opens from the panel preset.
- **New components:** NoteRow, ApplySheetBody, Timeline, InfoCard, DocList, ContactList, DetailRows, WhatsAppRow, KfsSummary, MilestoneApproved. ApplicationCard gains tint, solid tracker, outlined CTA, note and footnote; Tracker gains the `solid` style and `progress` state. New helpers: `fx.applySheet`, `fx.bareSheet`.
- **Router:** `OPL.go(name, params)` for screen params (`#app=…`); `OPL.rerender()` for self re-renders.

**Fixed**

- **Duplicate click handlers:** re-rendering a screen in place (any panel variant change) piled up click handlers. Pages are now swapped for a fresh element.

## v0.5.2 — 23 Nov 2026 · Loan cards clickable everywhere

- **"Top loan matches" cards on Home and the Loans overview offer cards** now open the Loan details sheet instead of a hotspot hint.
- **The sheet is now one shared helper** (`OPL.fx.loanDetail`) used by Home, Loans overview and Loan offers. `OPL.data.loanCatalog` maps card ids to their data; `MatchCard` takes a `detail` id.
- **Compare in the sheet uses the Loan offers selection,** so a tick on Home appears on Loan offers (cards plus tray). Loans not in the Loan offers list hide Compare (`LoanDetailFoot({ compare: false })`).
- **Bank of Baroda** has a detail record built from assumed placeholder values.

## v0.5.1 — 23 Nov 2026 · Loading guardrail

Measured in the preview pane:

| | Before | After |
|---|---|---|
| First paint | 6.7 s | 0.2 s |
| Interactive | 10.9 s | 0.08 s |
| Requests | 62 | 23 |
| Payload | ~1.9 MB | ~300 KB |
| External requests | yes | none |
| Layout shift | 0 | 0 |

- **Bundles:** `dist/app.css` + `dist/app.js` replace 21 separate files. `tools/build.sh` builds them and stamps `?v=` for cache-busting.
- **Geist is self-hosted** (variable, latin + latin-ext for ₹) and preloaded. The prototype no longer depends on Google Fonts.
- **Images are resized to ≤3× display size;** photos and the texture are now JPEG. Biggest wins: illustration 640 → 119 KB, avatar 580 → 15 KB. Originals moved to `assets/_source/`.
- **Boot layer:** inline critical CSS paints the device plus a placeholder instantly. The first screen reveals when fonts and above-the-fold images are ready (3 s cap), and the entrance, count-up, nudge and hero cycle start only then (`OPL.afterReveal`).
- **Count-up** shows its start value immediately (no flash) and is timer-stepped, so it completes in background tabs.
- **`tools/check.sh` enforces the budget** (150 KB per asset, 700 KB total, self-hosted fonts, 2 bundles). The versioned pre-commit hook in `tools/hooks` runs build and check.

## v0.5.0 — 23 Nov 2026 · Loan details sheet (proposed)

- **Tapping an offer card on Loan offers** (Top picks or All offers) now opens a "Loan details" bottom sheet instead of a hotspot hint. The sheet:
  - expands the card's tinted head
  - shows a 2×2 figures panel and detail rows
  - has a Compare checkbox synced with the card and tray (a 4th pick shakes it), plus "Apply now"
- **Built from existing components** (`ui.LoanDetail`, `ui.LoanDetailFoot`, `ui.Sheet`); new token `--slate-50`. Not in Figma, so it's marked as proposed in the README and the library.

## v0.4.3 — 23 Nov 2026 · Compare: assumed data + add slot

- **Every "—" in Compare loans is replaced with assumed placeholder figures** for Axis and HDFC (APR, fee, collateral detail, Money in). Each record lists them in `assumed: [...]`; the README has the full set.
- **"Add loan" column:** shown at the end of Compare loans while a 3rd slot is free. It appears when you remove a column, and tapping it goes back to Loan offers. The pick row gets a matching blank cell.

## v0.4.2 — 23 Nov 2026 · Compare tray polish

- **Tray corners:** the compare tray clips to its 16px radius. The backdrop-blur layer had been breaking the rounded clipping, so the clip is now explicit with `clip-path`, and the shadow moved to the wrapper.
- **Tray pattern:** lightened from Figma's 45% to 20%, per Shreya.

## v0.4.1 — 23 Nov 2026 · Compare follows selection

- **Compare loans columns now follow the Loan offers selection,** in tick order. Without a selection it falls back to the Figma frame (Citi, SIDBI, SBI; 2 of 3 picked).
- **Per-offer compare records** are built from Figma sources only, with "—" where Figma has no figure (Axis and HDFC APR, fee, Money in). Unknown values are muted.
- **Green "best" values are computed per row** on screen and recomputed when a column is removed. The Figma set renders exactly as drawn.
- **Removing a column un-ticks that offer on the list.** The tray and outlines update when you go back.

## v0.4.0 — 23 Nov 2026 · Loan offers + Compare loans

Synced from Figma section "Loans" `416:121835`:
- list `382:35324`
- compare state `382:35666`
- Sort sheet `393:505`
- Filters sheet `393:869`
- Compare loans `382:37839`

**Added**

- **Loan offers screen:**
  - Top 3 picks rail (Axis, Citi, plus SIDBI added from Figma values)
  - "All offers (6)" with the Filters chip, Sort chip, divider and quick filters
  - offer cards: SIDBI, Axis, HDFC
- **Compare selection:** the checkbox toggles a 2px primary outline. The compare tray replaces the AI Mitra button: "Comparing N of 3 loans", logos with remove buttons, + slots and "Compare". A 4th pick shakes the tray, the + scrolls to All offers, and Compare with one loan nudges the + slot.
- **Sort sheet:** radio rows apply on tap and auto-close; the chip label updates.
- **Filters sheet:** multi-select chips, "Clear all", "Show 4 offers". Sheets close on scrim tap, Escape or drag-down.
- **Compare loans screen:**
  - sticky header with "Show differences only" (collapses rows where every lender matches)
  - sticky label column with horizontally scrolling lender columns and best values in green
  - removable columns
  - a Selected/Select pick row synced to the scroll
  - "Apply to N lenders"
- **New components:** OfferCard, SortOption, Sheet, CompareTray, Toggle, CompareTable, ComparePick. Button variants `tonal`, `soft`, `outlined` and `white`, plus `strong`. Chip `bordered`/trailing/icon-less. AppHeader `compact`/`backIcon`. Logos: SIDBI and HDFC marks, plus the SIDBI and SBI logos.
- **Panel presets** for the four Loan offers frames. `OPL.state.set(…, { silent })` keeps the URL in sync without re-rendering.

**Fixed**

- The Logo component is now block-level, so it renders inside non-flex parents.

## v0.3.1 — 23 Nov 2026 · Loans overview tweaks

- The offer cards in the Loans overview's first fold use **18px titles**, as drawn in `382:36202` (`MatchCard size: "lg"`). Home stays at 16px.
- The first fold has **3 offer cards**; Axis Bank is added, the same offer as on Home.

## v0.3.0 — 23 Nov 2026 · Loans overview

Synced from Figma `382:36150` (Loans overview). Home hero re-synced: "₹50 Lakhs", "Explore Loans" and "Explore Subsidies".

**Added**

- **Loans overview screen:**
  - safe-borrowing hero with the CMR pill and its glow
  - offers rail and "See all loans (7)"
  - "Your loan applications" card with the tracker
  - "Your Borrowing" card with the donut
  - help card
  - Loans section tab bar
- **Router:** OPL.go pushes a page (slides in from the right, old page parallaxes and dims); back arrow, browser back and OPL.back pop it. History and URL are kept in sync, and the panel has a Screens switcher.
- **New components:** CmrPill, Tracker (Application tracker v2 · Icon), ApplicationCard, BorrowingCard, Button size "md" (38), AppHeader sub-page (back + custom actions), BottomNav `variant: "section"`.
- **fx.js:** shared screen behaviours.
- **Motion:**
  - the tracker steps pop in and the lines fill in sequence
  - the action step pings twice
  - the donut sweeps in on view
  - the ₹50 L limit counts up
  - the AI Mitra nudge reads "Ask anything about your loans"

**Fixed**

- The floating bar's 2px blur now applies only under its visible gradient, so content beneath the clear top stays crisp, as in Figma.

## v0.2.2 — 23 Nov 2026

- The panel has a visible **Motion on / off** switch. Before this, `#motion=off` was a hidden URL flag that silently stopped the card cycle, the nudge and the entrance.

## v0.2.1 — 23 Nov 2026 · Trust footer

- The page-end note defaults to **Trust**: "Offers from RBI-regulated banks and NBFCs" · "Your data is shared only with your consent".
- It uses the Solar *Shield Check* icon (Bold Duotone, from Iconify `solar:shield-check-bold-duotone`), with the back layer at 0.3 like the screen's other duotones.
- New proposed tokens: `--trust #16A34A` (icon) and `--trust-fg #15803D` (lead line). The second line stays tertiary slate.
- `PageNote` gains `tone` and `icon` props.
- The footer's bottom spacing follows the floating bottom's height, so it clears the nav with or without the EMI banner.

## v0.2.0 — 23 Nov 2026 · Home: motion and content

**Added**

- **Hero offer cards cycle** (`OPL.ui.HeroStack`): the back card is promoted to the front and the old front card tucks under the CTA. The rest state is unchanged from Figma. Panel toggle: Cycling / Static (Figma).
- **AI Mitra nudge** (`AiMitraFab({ nudge })`): "Ask anything about loans & subsidies" shows once after load. Panel toggle.
- **Third card in each rail:**
  - Axis Bank, from Loan offers `382:35360`; Figma logo, tint `--tint-pink #FCF3F6`
  - Aatmanirbhar Gujarat 2022, from `164:1434`; Govt. of Gujarat seal from Wikimedia Commons
- **Page-end note** (`OPL.ui.PageNote`), proposed copy in three options. Panel toggle, off by default.

**Fixed**

- The library page now renders components that have no Figma node yet.

## v0.1.0 — 23 Nov 2026 · Finance Hub Home

Synced from Figma `GHuBkYGEQZvQppv3v55EaA` → *Finance Home* `416:82748`:

- `382:34093` Finance home – loans first
- `382:33823` Finance home – subsidies first
- `382:36681` Finance home – subsidies first + EMI due banner

**Added**

- Home screen. Its variant panel has presets for the three frames plus these toggles:
  - section order
  - EMI banner
  - hero auto-advance
  - a hero background slot, hidden until a second option exists
- HTML kit:
  - tokens
  - 15 components: Button, IconButton, Avatar, Logo, FactPill, CarouselDots, Chip/Badge, HeroCard, QuickAction, SectionHeader, MatchCard, HelpCard, NoticeBanner, AiMitraFab, BottomNav, plus StatusBar and AppHeader
  - `library.html`
- Prototype layer:
  - entrance choreography and the hero carousel (swipe, parallax, dots)
  - press states and the banner dismiss
  - hotspot hints and URL-linkable state
  - full-bleed phone mode
