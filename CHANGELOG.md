# Changelog

## v0.16.0 — 23 Nov 2026 · Explore subsidies, desktop + mobile

Synced from Shreya's revised frames.

**Desktop — expansion results rebuilt to `558:101968`** (replaces `524:99743`)

- Title **"Explore government subsidies"**, then a **brief card** with your four answers: State · Industry · Activity · Enterprise size ("Medium").
  - Each answer is a dropdown that re-runs the search in place. The value ticks and the cards re-deal.
  - The new-unit illustration sits on the right. The ground rises, the factory settles, the pins drop and smoke puffs.
  - Answers sit on Figma's 176px pitch; longer values can widen a column.
- **"6 subsidies found"** with **State / Sector** chips (State narrows to state schemes) and a working **Sort** (Alphabetical / Highest benefit). Cards are three across with a 24 gap.
- The old answer pills and "Edit" button are gone; the dropdowns replace them.

**Mobile — new Explore subsidies screen (`556:128366`)**

- Open it from Subsidies home → "Planning a new unit…" → **Explore Now**, which used to lead to an unbuilt screen.
- Hero with **"Showing subsidies for"**: Maharashtra · Manufacturing · Textiles · Medium, beside a small factory that puffs smoke.
  - The **pen** (or a tap anywhere on the card) opens **Edit answers**: the desktop modal's four questions as a sheet, then Find Subsidies. There's no mobile frame for it, so it's designed in code and flagged.
- "6 subsidies found", **Sort** (radio sheet, applies on tap) and **Filter** (Central / State, Clear all, Show subsidies; the pill shows a count). Cards are full width with one-line titles.
- Values read "Assistance up to · ₹2.4L", keeping the earlier fix for the doubled "Up to" that Figma still draws.
- Panel presets: *Explore results*, *Edit answers sheet*.

**Changed**

- **Dropdown checkmarks are blue** (`#3858E5`) in every desktop menu: sort, state and answers. They used to be a navy circle with a green tick. Shreya asked for it.

## v0.15.9 — 23 Nov 2026 · Desktop state picker matches mobile

- **The desktop "Schemes in" picker has no "All" row**, like the mobile sheet: only the states on the GST registration. Figma `524:99394` draws "All". It's dropped at Shreya's request.
- The picker already had no row subcopy and no caption icon, so the two views now match.

## v0.15.8 — 23 Nov 2026 · Simpler "Schemes in" sheet

Shreya's edits to the state sheet:

- **No "All states" row.** The list is only the states on the GST registration.
- **No row subcopy.** "Principal / Additional place of business" is gone. Rows are just the state name at the Sort sheet's 52px height.
- **No GST icon** beside "States fetched from your GST registration".
- All seven states now fit without scrolling. Picking still applies on tap, and outside Gujarat only central schemes show.

## v0.15.7 — 23 Nov 2026 · "Schemes in" state sheet (mobile) + subsidy card fixes

**Added**

- **"Schemes in" bottom sheet** on the mobile Subsidies home. Shreya asked for it. The pill used to lead to an unbuilt `subsidy-location` screen.
  - The list is the states on the business's **GST registration**: "States fetched from your GST registration". Each row says why it's there: Gujarat is the *Principal place of business*, the others are *Additional place of business*. All states sits first.
  - "Search a state" filters the list. No match reads "No state on your GST registration matches …".
  - Rows apply on tap (radio pops, sheet closes), like the Sort sheet. Drag, scrim or Escape dismisses it.
  - The pill updates with a tick. Outside Gujarat only central schemes apply, so state-tagged cards step aside, as on desktop. If nothing is left, a note says so ("Central schemes apply in every state") and the rail folds away.
  - States and copy come from the desktop picker `524:99394`. There is no mobile frame, so it's designed in code and flagged. Panel preset: *Schemes in · state sheet*.

**Fixed**

- **Subsidy cards stretched tall when Central or State was on.** The folding card squeezed to 0 wide, its text reflowed into a 376px column, and the rail stretched every card to match. Cards now keep their own height, and a folding card keeps its content width while it collapses.
- **"Assistance up to · Up to ₹2.4L" said "up to" twice.** The value now reads ₹2.4L / ₹1.2Cr, on Home too.

## v0.15.6 — 23 Nov 2026 · Apply modal spacing

Shreya: "Looks a bit crammed."

- **The desktop Apply modal now has Final Desktop's spacing** (`507:131176`). It had been using the mobile sheet's tighter spacing.
  - The title has 44px under it. The header is padded 20.
  - Notes, consent and buttons are inset 40, so the lender card at 20 stands proud.
  - 32px at the bottom.
  - Two lenders measure as Figma: title 28, card 100, notes 40 in.
- Hover states on the consent row and Cancel.
- **Applying to one lender, mobile too:** the notes no longer say "each lender" or "a separate application goes to each lender". They now read "SBI runs a full credit check and verification" and "You can accept the KFS of only one loan this month." This is adapted copy, flagged.

## v0.15.5 — 23 Nov 2026 · Sidebar and top bar cleanup

Shreya's feedback on the collapsed sidebar:

- **Removed the edge arrow** on the sidebar border; it didn't work out. The top-bar button is the toggle (and **[** still works). Hovering it shows "Collapse/Expand sidebar [".
- **Rail icons are bigger when collapsed.** They grow from 16 to 20px in a 48 × 40 slot, because 16px is sized to sit beside a label. The business avatar grows to 28. Both animate with the rail.
- **Tighter top bar:** 56 tall with 16px sides, down from the frame's 72 / 32. It now spans the whole panel, so the toggle stays 16px from the sidebar even when the sidebar is collapsed and the page column centres. The sticky right rails (application page, Subsidy details) and the tooltip flip point follow the new height.

## v0.15.4 — 23 Nov 2026 · Calculate estimate becomes a side drawer

Shreya asked for the estimate as a side drawer, with the mobile design as inspiration. It replaces the v0.15.3 full page.

- **"Calculate Estimate"** on either Subsidy details version now opens a **520 drawer over the policy page**. It's modelled on the mobile sheet (`416:76869`):
  - The mobile benefit cards and "Add more benefits" chips scroll in the drawer.
  - The footer is the mobile action bar: **Get Estimate**, then **Talk to an Expert**. One desktop addition sits above it: a live **"Your estimate"** line and Build-up bar that re-count as you type.
  - Get Estimate still opens the first card with a gap, shakes the empty field and focuses it.
- **The result plays in place in the drawer** (mobile `416:77363`, mobile spacing). Satin and rays bloom behind the header, a bundle lands for each benefit while the total climbs, and confetti bursts from the stack. "Add more" crossfades back to the form. Apply Online and Talk to an Expert close the drawer and go on.
- The URL follows the drawer (`#screen=subsidy-estimate` / `subsidy-estimate-result`), so a reload or panel link reopens it over Subsidy details. Closing it returns the URL to `subsidy-detail`, and leaving the page closes it.

## v0.15.3 — 23 Nov 2026 · Desktop Calculate estimate

Shreya asked for it. There's no desktop frame on *-> Final Desktop*, so this adapts the mobile flow (`416:76869` form, `416:77363` result). It's flagged in the README.

- **Calculate estimate page.** Open it from "Calculate Estimate" on either Subsidy details version.
  - Left: the mobile benefit cards, with fields side by side on desktop, plus the "Add more benefits" chips. State is shared with mobile, so your numbers carry across views.
  - Right: a sticky **live summary** in the details page's cream estimate card. As you type, the total re-counts, each benefit's Build-up segment grows in, and the rows follow.
  - A row with missing numbers reads "Add numbers". Click it to jump to that field.
  - **Get Estimate** checks every added benefit first. It opens the first card with a gap, shakes the empty field and focuses it.
- **Result as a 480 modal**: the mobile celebration. A bundle lands on the plinth for each benefit while the total climbs, then confetti bursts from the stack. "Add more" closes it and nudges the chips. `#screen=subsidy-estimate-result` opens the page with the result already up.
- Hover states on cards, fields, chips, Remove and the close button.
- **Fixed, mobile too:**
  - A ₹1.005 Cr total showed as "₹1 Cr" because of a rounding slip in the money formatter. It now reads ₹1.01 Cr.
  - On a scaled stage, celebration sparks and confetti now land on the money stack.

## v0.15.2 — 23 Nov 2026 · Desktop: "Applications sent" moment + clearer sidebar rail

Matched the remaining Compare frames on *-> Final Desktop*.

- **"Applications sent to N lenders"** (`507:131209`, modal `507:131481`). Submitting from Compare turns the apply modal into the success moment in place. It matches Figma to the pixel: 480 × 537, card 133, rows 38.
  - Hero art inlined from Figma so it can move: the glows pop and breathe, the plane flies in, the tick lands, and each "Sent" chip pops in turn.
  - **Track applications** opens Applications, where the approval moment still plays. **Done** keeps you on Compare.
- **Apply modal is 480 wide**, as in "proceed with 2 offers" (`507:130904`). It was 520.
- "Comparing" (`524:105408`) and "show differences" (`507:131530`) already matched.
- **Collapsed sidebar, reworked** (Shreya: "messy, needs to be more visible"):
  - Icons and the business avatar now sit dead-centre in the 72px rail. Hidden labels used to keep their flex space and push everything left.
  - A round **edge handle** straddles the sidebar border in both states and shows "Collapse/Expand sidebar [" on hover. The top-bar button and **[** still work.
  - **Hovering any rail icon names the section** in a dark label with a pointer, drawn above the main panel. Before, it was hidden underneath. The avatar shows the business name.
  - In the rail, group headings become short rules, so the three groups still read as groups.
  - When expanding, labels fade in only once there's room, so nothing wraps mid-animation.

## v0.15.1 — 23 Nov 2026 · Sticky actions in benefit sheets

- **"Talk to an Expert" and "Apply Now" stay pinned to the bottom of every subsidy benefit sheet.** On a phone, the long sheets (Capital, Interest, Payroll) used to scroll them out of view.
  - While there's more to read, the bar sits above the content with a hairline and a soft lift. It settles flat at the end.
  - When a sheet fits, spacing is exactly as Figma: all ten sheets still match their Figma heights.
  - The bar pads for the iPhone home indicator.
## v0.15.0 — 23 Nov 2026 · Desktop Govt. subsidies + collapsible sidebar

Synced from Figma page *-> Final Desktop* `476:199974`.

**Added**

- **Govt. subsidies home** (`524:98724`):
  - "Up to ₹72 Lakhs" hero with Capital / Interest / Other benefits
  - **Refine your matches** card
  - Top subsidies: Central / State / Sector / Import & Export chips; **Schemes in Gujarat** state picker (`524:99394`) with search, "States fetched from your GST registration" and a tick on the current state; Sort menu
  - three subsidy cards with Call an Expert and Check Details
  - the "Planning a new unit…" promo, with the mobile illustration and its motion (ground rises, factory settles, pins drop, smoke drifts)
- **Explore subsidies for your new unit** modal (`524:99050`): state, sector, activity and size, then Find Subsidies, which opens **Subsidies for your expansion** (`524:99743`): back link, your picks as chips, Edit (reopens the modal pre-filled), six cards.
- **Subsidy details, both Figma versions**, switchable in the panel under *Figma frames* (`#dhero=cover|blue`):
  - **Cover photo** (`524:101843`): loom cover with emblem and "Open till 30 Sep 2029" status. The rail holds the cream estimate spotlight, where the mobile money stack lands, and the expert help card.
  - **Blue estimate hero** (`524:101144`): emblem header and a blue estimate hero holding the policy period. The rail holds the expert help card, Application portal and Official policy website.
  - Shared: Policy Benefits 2×2, Other benefits 2×2 and How to apply. **Benefit tiles open the mobile benefit sheets in a side drawer**, with the Activity switch live.
- **Collapsible sidebar.** The top-bar sidebar button (or **[**) collapses the nav to a 72px icon rail; labels show as tooltips on hover, and the choice is remembered. Shreya asked for it.

**Not built** (opens the mobile-view fallback): Calculate Estimate and Refine your matches. There are no desktop frames for them yet.

## v0.14.2 — 23 Nov 2026 · Overview cards stay in their grid

**Fixed**

- **Desktop Overview:** after a chip filter or a sort, the match cards scattered into a staggered layout with stray commas. Shreya spotted it. The re-render wrote the card list as an array, which turns into text with a "," between items, and each comma took a grid cell. The list is now joined properly. The sidebar link for Govt. subsidies points at `subsidies-overview`.
## v0.14.1 — 23 Nov 2026 · Tidier prototype panel

- **The panel no longer looks cut off.** It had grown past the window as screens were added (about 1,800px of controls in a 700px window).
  - **Fixed header:** the screen name, version and collapse chevron stay put, and the controls scroll beneath with a soft fade at whichever edge has more.
  - **Foldable sections:** tap Screens, Figma frames, Options or Prototype to fold them. Each shows its count. Prototype starts folded. The browser remembers what you fold.
  - **Screens grouped by flow:** "Finance hub & loans" (8) and "Subsidies" (4). The flow you're in opens, and the other folds to one line.
  - **Quieter rows:** the Figma node IDs are gone from the screen and frame rows. Rows are tighter, and the subtitle line is dropped.
  - "Open frame in Figma" and "Component library" now sit inside Prototype.
  - Figma frames start folded on screens with four or more; Options start folded when there's more than one toggle.
  - Result: with the default folds, every screen's panel fits a 760px-tall window without scrolling (checked on all 12 screens).
  - **The blue ring on the selected screen or frame is drawn inside the row,** so the scrolling panel no longer clips its edges. Keyboard focus rings are inset too.
  - Merged with the desktop view (v0.14.0). The **View: Mobile / Desktop** switch stays at the top, always open. In desktop view the Screens section lists only desktop-built screens, grouped by flow the same way.

## v0.14.0 — 23 Nov 2026 · Desktop view lands on main

Merges branch `flow/desktop` into main (which now has the subsidies flow, v0.10.0–v0.10.2). Its own version numbers (0.10.0–0.13.6) overlapped main's, so they're kept below as **flow/desktop** history, and this release is v0.14.0.

**Added**

- **Mobile ⇄ Desktop switch.** "View" in the panel, the **D** key, or `#device=desktop`. The current screen, the Compare picks and applications carry over between views.
- **Desktop view of the loan journey**, built from the desktop Figma frames (page *Finance Hub - Desktop Loans* `357:54674`, shell and cards from `476:200124`):
  - Overview (CIBIL MSME Rank gauge), Loan Offers with the sticky Compare tray, and Compare with the Add-offers drawer
  - Apply, then Applications, then the Application page in every status
  - KFS reader (two-pane), NeSL signing (desktop portal `524:105163`), then Confirming → Signed → Money on its way → Money received
  - the same milestone delight as mobile
- **Desktop loads on demand.** It's a separate bundle (`dist/desktop.*`), so the mobile first load is unchanged. Budgets in `tools/check.sh`: desktop 600 KB, desktop screen-only images 600 KB.
- **Subsidies on desktop:** the subsidy screens from main open on desktop as "not designed for desktop yet", with a one-click switch to mobile. Desktop subsidy screens are not built.

## v0.10.2 — 23 Nov 2026 · Bottom sheets close on phones

- **The X on subsidy benefit sheets now closes them on touch.** The X sits inside the draggable header, so on a touchscreen, pressing it started drag-to-dismiss, which captures the pointer and retargets the tap to the header, and the close never fired. Buttons inside a sheet's grip no longer start a drag. This also fixes Filters "Clear all". Dragging the header still dismisses.
- **Bottom buttons in sheets now work on iPhones.** The page uses `viewport-fit=cover`, but sheets didn't pad for the home-indicator area, so Cancel, Later, Done and "I'll come back later" sat where iOS treats a touch as the home gesture. Sheets now add `env(safe-area-inset-bottom)`. Nothing changes where there's no inset.
- **Tapping the dimmed area closes sheets on iOS:** the scrim gets `cursor: pointer`, which iOS needs before it fires taps on a plain element.

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

## flow/desktop history (merged in v0.14.0)

### flow/desktop 0.13.6 — 23 Nov 2026 · Icons with masks render fully again

**Fixed**

- **Faint or missing strokes on 27 desktop icons**, including the Selected check, button arrows, the external-link arrow, the compare tray arrow, the tag icons, the notification and chat buttons and the sidebar toggle. Shreya spotted it on the Selected check and the arrows. Since v0.11.0, the build's SVG minifier stripped every `id`, including the ones those icons' masks, `<use>` and clip paths point to, so parts of each icon didn't draw.
  - The inliner is now `tools/inline-icons.py`. It keeps referenced ids, and the build fails if any icon is left with a dangling reference.
- **Compare tray arrow** was exported from the disabled button, so 50% opacity was baked in. It looked faded even when Compare was enabled. It now uses a full-strength copy (`bar-arrow-on`); the disabled state fades it in CSS.

### flow/desktop 0.13.5 — 23 Nov 2026 · Quieter "Selected"

- **Compare's Select → Selected** no longer bounces; Shreya found the 0.6 → 1.2 → 1 spring too dramatic. The button now settles in 240ms (slight fade and 98.5% scale to full) while the check slides in. The selected column's blue glow is softer too, at rest and on hover.

### flow/desktop 0.13.4 — 23 Nov 2026 · Compare that actually compares; tooltips stay in view

**Changed**

- **Compare data.** Each lender now has distinct, coherent terms. Shreya: three identical columns are "not practical". The terms are consistent with each lender's cards and with mobile:
  - **Citi:** 1.5% fee, fastest money.
  - **SIDBI:** low fee and APR.
  - **Axis:** ECGLS cash credit, needs property collateral.
  - **SBI:** ₹20 L at 9.25%, cash credit.
  - **HDFC:** lowest fee, collateral-free.

  EMIs are real amortisation, and cash credit limits show the monthly interest if fully drawn. These are sample terms, flagged in the README.
- **Best-value chips** are computed per row among the offers added: Loan Amount "Highest"; Interest, APR and Processing fee "Lowest"; Money in "Fastest". They appear only when the values differ.
- **"Show differences only"** now folds away the rows that are the same for every offer (label and cells animate closed) instead of dimming everything.
- Empty Compare slots match the height of the filled columns, so there's no gap above Select.

**Fixed**

- **Tooltips** near the panel edge (e.g. the APR info on Compare) ran off the left and were clipped. Tooltips now measure themselves on hover and focus, nudge sideways to stay inside the panel with the arrow still on the icon, and open below when there's no room under the top bar.

### flow/desktop 0.13.3 — 23 Nov 2026 · Desktop polish from a rendered audit (radii, strokes, shadows, hovers)

An audit script ran on every desktop screen. It measured nested radii, icons clipped by their containers, shadows cut by `overflow: hidden`, and clickable elements with no `:hover` rule.

**Fixed**

- **Nested radii.** Tinted inner boxes inside a 16px card are now **14px** everywhere (Shreya's rule): the CIBIL MSME Rank head, the horizontal offer head, the Compare column head and the Application card head (all were 16). The hero's glass panel stays 12px at its 6px inset, as drawn.
- **Strokes cut off.** Card strokes were inset box-shadows, so any child touching the edge painted over them: the repayment chart fill, row hover backgrounds, the compare tray texture. They're now `outline` with a negative offset, drawn above children, as in the mobile kit. This covers cards, panels, Compare columns and slots, offer rows, application cards, the summary card, rail cards, the KFS document pane and the compare tray.
- **Corner tags.** Tags poked out past the rounded head with a square corner ("Collateral-free", "Low Interest", Application ID). The heads now clip them, as mobile does since v0.9.2.
- **Main panel right stroke.** It's drawn at the window edge, as in Figma.
- **Shadows.** Compare columns and empty slots get a subtle shadow (Shreya). The KFS document pane and the summary card's shadow is now a real box-shadow, so nothing clips it. The Add-offers list has top room, so a hovered card's shadow isn't sliced.
- **Hover states:**
  - Compare rows light up across the label and every column, instead of one cell covering the column stroke.
  - Every hover keeps selected states (outline colour changes, not a box-shadow swap).
  - New hovers: rail accordion headers, copy buttons, WhatsApp toggle, KFS consent checkbox, Compare info icon.

### flow/desktop 0.13.2 — 23 Nov 2026 · Compare tray + selection hovers

**Added**

- **Compare tray** (`524:106147`). Once you tick Compare on any card (Overview or Loan Offers), a tray sticks to the bottom of the main panel:
  - "n of 3 picked" with a hint
  - picked lenders as logo chips (each removable)
  - dashed "Slot 2 / Slot 3" placeholders
  - Clear all
  - **Compare**, disabled until two are picked, which opens the Compare tab

  It springs up on the first pick, each new chip pops in, and a fourth pick shakes the tray. The AI Mitra button and the page padding make room for it. It replaces the "added to compare" toast.

**Fixed**

- Hovering a **selected** Compare column or a **picked** offer in the Add-offers drawer swapped the blue selected outline for the grey hover one. Selected states now keep their outline, and hover only deepens it. Selected chips and checked checkboxes get their own hover too.

### flow/desktop 0.13.1 — 23 Nov 2026 · Desktop NeSL as drawn

Synced from Figma section "nesl" `524:105163`. Shreya: the desktop NeSL screens were wrong; they reused the mobile portal.

**Fixed**

- **"Sign your sanction letter on NeSL"** (`476:230861`) is now the desktop modal: a "KFS accepted" chip, Step 2 of 2, the four numbered steps, the deadline warning, Continue to NeSL and I'll come back later. It opens over the KFS, which shows as read with consent ticked (`476:230649`). It replaces the mobile sheet.
- **NeSL portal** now uses the four desktop NeSL screens, in this order:
  1. Agreement Preview (`476:231547`; a scroll or a click on the document reads it)
  2. Agreement Preview at the end, with I AGREE (`476:231121`)
  3. E-Stamp Details, with Next (`476:231334`)
  4. NSDL eSign OTP, with Verify OTP (`476:231761`)

  Each shows at its drawn size (1055 or 943 wide, r16) over the KFS and a dark overlay, with a hotspot on its real button. CANCEL returns to "Sign Sanction Letter".
- Then Confirming (`476:231762`), then Signed with its milestone (`476:232230`), as before.

**Changed**

- Desktop screen-only images go in `assets/lazy/dsk/<screen>/`, with their own 600 KB cap in `tools/check.sh`. They load only on that screen. The NeSL shots are 1.5× JPEGs, 418 KB in total.

### flow/desktop 0.13.0 — 23 Nov 2026 · Desktop loan journey complete: application page, KFS, NeSL, signed + disbursed

Branch `flow/desktop`. Synced from section *final-loan applications* `440:134259`: application page `440:136328` (verifying) / `440:136512` (KFS ready) / `440:136901` (money on its way) / `440:137099` (money in account), sanction signed `440:136706`, KFS reader `440:134934`, NeSL `471:24999`… and confirming `440:135654`.

**Added**

- **Application page.** One screen covers every status:
  - breadcrumbs
  - summary card: tinted head with the Application ID tag, then a 4-figure strip with dividers
  - status card: title and CTA, the mobile timeline, then "Before you sign" or "What to expect"
  - Total Repayment card
  - sticky 340 rail: Branch Details (copy buttons), Documents or documents to keep ready, WhatsApp, Withdraw
- **KFS reader** (two-pane; the approved desktop merge of summary and PDF):
  - left: the KFS pages with a file bar, a read-progress line and a floating page counter
  - right: the APR card, You repay, fact chips and the consent card
  - reading to the last page unlocks consent; the hint scrolls to the end
  - Accept KFS opens the mobile "Sign on NeSL" Step 2 sheet in a modal
- **NeSL signing.** The NeSL portal opens as a window over the dimmed application. It steps through the same portal screens as mobile, each with a hotspot on its real button, and Cancel returns to "Sign Sanction Letter". Then **Confirming your signature** shows, and the application returns Signed.
- **Delight, same as mobile:**
  - the **Sanction letter signed** milestone
  - closing it starts the live demo: Money on its way, then Money received with the **Money disbursed** milestone (full confetti burst, amount counts up)
  - `#ms=on` opens these directly
- **The whole desktop journey now plays end to end:** Overview → Offers → Compare → Apply → Applications (approved) → Application → KFS → NeSL → Signed → Money on its way → Money received.

**Fixed**

- "View All", "View details" and other link arrows were indigo `#4338CA` (from the frame) next to `#3858E5` labels; they now use the primary chevron. Breadcrumb separators use the grey chevron.

### flow/desktop 0.12.0 — 23 Nov 2026 · Desktop Applications + Apply, with the approval moment

Branch `flow/desktop`. Synced from Figma `440:134641` (Your Applications) and `440:137299` ("Citi Bank approved your loan" over the list), in section *final-loan applications* `440:134259`.

**Added**

- **Loans › Applications** (`440:134641`):
  - "Your Applications" header with its count and the **WhatsApp updates** pill (toggle).
  - One card per application: tinted head, "2 days left" tag on KFS-ready cards, and figures with the CTA on one row. Verifying shows Loan offer and Interest with View details; KFS ready shows Final offer, Interest, APR and Monthly EMI with Review KFS.
  - **Horizontal steps**: done (green), in progress (blue ring, part-filled connector), action (amber ring), to do (grey).
  - The one-KFS-a-month note.
- **Apply modal**: the mobile "Proceed applying" body in a 520 modal, opened by every Apply Now (Overview, Loan Offers) and by "Apply to selected lenders" on Compare. Submit creates the applications exactly as mobile does.
- **Delight, as on mobile.** A few seconds after you submit, the first lender approves. Its card flips to KFS ready and the **approval milestone** opens in a 480 modal. It's the mobile `Loan / Milestone sheet` (confetti burst that falls away, ripple, breathing glow, logo and tick popping), so the moment is identical in both views. `#ms=on` opens it directly, as on mobile. "Review KFS" leads to the application page.
- **Shared state.** Applications come from the mobile kit (`OPL.apps`), so an application submitted or advanced in one view shows the same status in the other.

**Interaction layer**

- Steps grow in one after another. The in-progress ring breathes and its connector inches forward; the action ring pings twice.
- Cards lift on hover. View details and Review KFS nudge their chevron or arrow.
- Modals spring in over a scrim and close on Esc or a scrim click.
- Overlays now open with a reflow instead of `requestAnimationFrame`, so they also open in a background tab or a hidden preview pane.

**Not on desktop yet** (opens the "isn't designed for desktop yet" page, with a one-click switch to mobile): Application page (`440:136328`, `440:136512`, `440:136901`, `440:137099`), KFS reader (`440:134934`), NeSL signing (`471:24999`…), and the Signed / Disbursed milestones (`440:136706`, `440:137099`).

### flow/desktop 0.11.0 — 23 Nov 2026 · Desktop Loan Offers + Compare

Branch `flow/desktop`. Synced from Figma `357:102436` (Loan Offers tab), `507:84666` (tagged offer rows), `507:85604` (Compare, empty), `507:86537` / `507:87387` (three added, Selected and the Apply bar) and `507:86111` / `507:85929` (Add offers drawer).

**Added**

- **Loans › Loan Offers**:
  - **Top 3 matches**: the Overview cards.
  - **All loan matches**: horizontal cards with a grey head, tag groups (Collateral-free · Lowest Fee · Needs Collateral · Subsidy-linked · Lowest Interest, using the Figma icons), and Loan up to · Interest · Renewal · Processing fee. Each card has Compare and Apply Now.
  - Chip filters, including "Term loan" with its **New** badge, the Sort menu (FLIP re-order) and the empty state.
- **Loans › Compare**:
  - **Empty** (0 of 3): three "Add an offer" slots, each with "Browse all 7 offers".
  - **Added**: lender columns with a tinted head, a remove button, and Interest / APR / Tenure / Monthly cost / Processing fee / Collateral / Money in rows. The "Lowest" chip is computed on Interest. "Show differences only" dims rows that are the same everywhere.
  - **Select → Selected** per lender. The **Apply bar** rises with one or more selected, and the AI Mitra button lifts above it, as in `507:87387`.
  - **Add offers to compare** drawer: search (live), chips, selectable offer rows (2px primary stroke and a bold check when picked, max 3 with a shake at the limit) and **Select**.
- **One shared Compare selection.** The Compare checkboxes on Overview, Loan Offers (Top 3 and the list) and the mobile Loan offers screen all feed it. The Compare tab shows the count.
- Tab icons switch to their Bold version on the active tab (Compare frame `507:85679`).

**Changed**

- `tools/build.sh` minifies the inlined desktop SVGs. `tools/check.sh` no longer counts those SVG files twice. Desktop is 277 KB on demand.

### flow/desktop 0.10.0 — 23 Nov 2026 · Desktop view + Loans overview (desktop)

Branch `flow/desktop`. Synced from Figma `476:200124` "loans overview" (page *Finance Hub - Desktop Loans* `357:54674`).

**Added**

- **Mobile ⇄ Desktop switch.** "View" in the panel, the `D` key, or `#device=desktop`. The screen and its params carry over, so the same state opens in either view. Desktop shows a 1440-wide browser window scaled to the space next to the panel; its height grows to fill the stage. On a phone (≤500px) it's always mobile.
- **Desktop loads on demand.** It's a separate bundle (`dist/desktop.css` + `dist/desktop.js`, with icons inlined), fetched the first time you switch. Mobile first load is unchanged. `tools/check.sh` gives desktop its own budget (600 KB).
- **Desktop shell** (`476:200125`, `476:200177`, `476:200199`): sidebar with business switcher and nav groups, sticky pill top bar (search, support, notifications, messages, EN/हिं), underline tabs (Overview · Loan Offers · Compare · Applications · My Loans), and the AI Mitra FAB.
- **Loans › Overview** (`476:200124`):
  - Safe Borrowing Limit hero with 3 quick picks and an AI row.
  - **CIBIL MSME Rank** gauge, built from Figma's 20 bars (`476:200271`) so each bar can animate.
  - Top loan matches: chips, Sort, Filters, and 3 tinted-head offer cards.
  - Debt Profile: 3 stat tiles, Monthly Repayment Trend chart, and Term Loans.
- **Desktop with no design yet**: a mobile screen without a desktop version keeps the desktop shell and offers "Open in mobile view", so the switch never dead-ends.

**Interaction layer (prototype, behaviour on drawn elements)**

- Hover, focus-visible and active states on every control:
  - nav rows tint and their icon nudges
  - tabs preview their underline
  - cards lift 2px with a deeper shadow and a slate-300 stroke
  - buttons, chips and pills darken and press to 0.97
  - AI rows: the arrow slides and the Mitra mark turns
  - quick-pick and stat icons pop
- The tab underline glides from the previous tab to the new one. The content fades up between pages while the shell stays put.
- The top bar frosts once content scrolls under it. ⌘K focuses search, which widens.
- CMR gauge: the bars sweep in, the needle springs to rank 2, then the rank and the "Low Risk" chip settle. Hovering the gauge keeps your rank lit and dims the rest. The info icon shows a tooltip.
- Chips filter the cards (AND), with an empty state and "Clear filters". The Sort menu re-orders the cards with a FLIP glide. Cards keep Figma's order until you pick a sort.
- Compare checkboxes add to a shared selection (the same one mobile Loan offers uses), show a counter on the Compare tab, and raise a toast with "Compare now" (max 3).
- The ₹50 Lakhs limit counts up. The repayment chart draws in left → right, then the point pings and its tooltip appears.
- The unread dots ping twice, and the bell rings on hover. The AI Mitra nudge slides out once, as on mobile.

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
