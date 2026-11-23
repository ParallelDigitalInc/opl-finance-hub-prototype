# Changelog

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
