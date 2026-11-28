# Changelog

## v0.24.1 — 28 Nov 2026 · Explorations: hero card fixes, lighter card type

- **Hero card stroke (Vanilla Sprinkles, Sky):** the lender-tinted stroke was see-through, so the lettering of the card behind showed through it as dark dots. It now sits on a white base: same colour, opaque.
- **Subsidies slide (Vanilla Sprinkles, Sky, Mint Grid):** the card behind peeks 30px, as on the Loans slide, with its name on one line, so the front card never slices it. The CTA stays level across slides, with 12px between the front card's subtitle and the CTA.
- **Card type (Vanilla Sprinkles):** loan and subsidy names and figures use Stack Sans Text Light.

## v0.24.0 — 28 Nov 2026 · Explorations: five named approaches, Figma finesse, Recoleta, full-screen switcher

`/explorations/` now holds five mobile approaches in two groups, named by Shreya:
- **New approaches:** 1 Vanilla Sprinkles (`fresh-1/`), 2 Sky (`approach-2/`), 3 Fresh Mint (`approach-3/`).
- **Clean up · old:** Gradient (`cleaned-1/`) and Mint Grid (`cleaned-2/`), built from Figma "Old Cleaned Up" (`233:61391`), frames "1" (`172:56049`) and "2" (`172:55627`).

Figma finesse (Section 2, `172:56553`):
- **Vanilla Sprinkles:** the CMR score tile is green (#E7FBE4, icon #089D43) and Track Loans indigo (#EBEFFF, icon #2F52E0). The page ends 182px below the help banner, as in the frame.
- **Sky:** a flatter 42px schemes arch, a new slate "Need help" banner before the trust band, and no disclaimer line under it.
- **Fresh Mint:**
  - **Top:** the wash runs #C9E8DD to white, with two soft ornament shapes; the CTA is 48px, 12px corners, #07181A.
  - **Links and buttons:** "View all" and the help button use the same #07181A.
  - **Sections:** split by 0.5px #E2E8F0 rules instead of the mint band; card dividers are #F1F5F9.
  - **Cards:** "View all 8" is removed. Every loan card keeps its "Collateral-free" tag and every subsidy photo its government tab (the frame had lost them on the first cards).
  - **Help banner:** white, with a lilac ornament, the green OPL stamp and an advisor photo.
  - **Nav:** the active pill is #F1F5F9.

All five:
- **Hero pager:** two dots, Loans and Subsidies. The current one is a pill that fills a step per card, then the carousel moves on.
- **Recoleta (Vanilla Sprinkles titles):** now loads for everyone under Shreya's Fontspring webfont licence. The WOFF2 is served from her Vercel project `opl-webfonts`, not from this repo, and only this Pages site may load it; localhost falls back to Fraunces.

Presenting:
- **Panel:** two labelled groups, one-line rows with a small thumbnail of each frame (`explorations/assets/thumbs/`) and its number key. Keys 1–5 switch approaches.
- **Full screen:** a hairline handle on the right edge opens a slim tray of thumbnails; 1–5 jump to an approach and [ ] step through.

## v0.23.0 — 28 Nov 2026 · Explorations: Subsidies hero slide + Approach 3 polish

All three approaches (`/explorations/`) now have a hero carousel like the kit home's: Loans, then Subsidies.

- **Subsidies slide:** "Get assistance up to ₹1 Crore", a cycling stack of the page's three Key Subsidies, and "Explore Subsidies". It is proposed, since the frames draw only the loans slide.
- **Card layout:** taller subsidy cards with the logo top-aligned and two-line names at 16/21, following the kit's subsidy card.
  - The stack rises into the gap under the amount, so the CTA stays level across slides.
- **Motion:**
  - the stack auto-steps through its cards, then moves to the other slide;
  - native swipe, mouse drag and parallax;
  - card taps open the usual toast.
- **Pager:** one dot group per slide, and the inactive group folds to a single dot.

Approach 3 (Shreya):
- **Footer:** the dock fades to white instead of the frame's warm grey (#E8E5DD).
- **Card type:** names and figures on the hero, loan and subsidy cards use Stack Sans Text Light.
- **From the Figma frame:**
  - the mint wash starts at #CDEADF;
  - subsidy names are #0F1517.
- **Help banner grid:** redrawn upright (`help-grid-a3.svg`), so the lines are as soft and even as in Figma instead of rendering grey and uneven.

## v0.22.0 — 28 Nov 2026 · Explorations: Approach 3 (mobile) + quieter panel

`/explorations/approach-3/`, built from Figma Section 2, mobile frame "3" (`172:54014`). It sits on Approach 1's code, with an "Approach 3" layer on top. The values come from the Figma paints, and the page height matches the frame (1595px).

- **Hero:**
  - a mint wash at the top;
  - neutral inset hero cards with names in Geist (Citi in front, BoB behind);
  - a solid `#001D21` CTA in sentence case.
- **Cards and tiles:**
  - pastel tiles with rounded corners;
  - loan cards tinted by lender (Citi blue, BoB peach) with a solid divider;
  - a mint subsidy band.
- **Help banner:** lilac, with a green grid.
- **Nav and AI Mitra:** the nav has a warm-grey fade, and AI Mitra is in warm grey, kept opaque.
- **Copy:** the frame's "Top loan matches" over the subsidy cards reads "Key Subsidies" here (flagged).

Panel (Shreya), for all three approaches:
- The "Finance Hub · Explorations" title and the version pill are removed.
- The View · Mobile/Desktop switch moves into the head row, beside the collapse button.

## v0.21.0 — 28 Nov 2026 · Explorations: Approach 2 (mobile)

`/explorations/approach-2/`, built from Figma Section 2, mobile frame "2" (`172:52770`). It sits on Approach 1's code, so all the motion carries over, with an "Approach 2" layer on top. The values come from the Figma paints, and the page height matches the frame (1860px).

- **Look:**
  - a sky gradient with hard-light clouds that drift and part as you scroll;
  - white outlined header buttons and quick-action circles;
  - ₹50 Lakhs in Stack Sans Light and a navy gradient CTA;
  - loan cards with a dashed divider.
- **Schemes:** a mint arch with an illustration that hops on, and "3 Key Schemes Matched".
- **Trust band:** the OPL Verified seal stamps in, followed by "Built for the MSMEs of Bharat." and the legal line.
- **Panel:** lists Approach 1, Approach 2 and Approach 3 (in progress).

Fixes in both approaches (Shreya):
- The stray "View all 12" at the end of the subsidy card rail is removed.
- The AI Mitra button is now opaque, with a stronger blue glow, a thin ring and a deeper shadow. It was getting lost over the sky band and the cards.

## v0.20.0 — 28 Nov 2026 · Explorations: Fresh 1 (mobile)

A third link, `/explorations/`, for the new and compiled approaches. **Fresh 1** is built from scratch from Figma Section 2 `172:56553`, mobile frame "1" `172:52419`. It is mobile only for now; desktop is next.

- **Fidelity:** the patterns, fades and gradients are read from Figma's actual paints:
  - the hero grid and the help-banner grids are SVGs built from the layer values;
  - the hero card strokes are the lender colour at 20%, fading downward;
  - the AI Mitra fill and the shadows match.
- **Type:**
  - Recoleta for titles and ₹50 Lakhs, loaded from the viewer's machine with `local()` (demo licence, not uploaded), with Fraunces as the fallback;
  - Stack Sans Text for names and figures;
  - Manrope for body text.
- **App-like motion:**
  - a liquid nav pill and tab switching;
  - hide-on-scroll chrome;
  - a swipeable hero stack (the front card slides behind the CTA);
  - parallax on the rail photos;
  - AI Mitra springs in, breathes, nudges, and opens a draggable sheet with suggested questions.
- **Kept from the kit:** the motion, press states, toasts and reduced-motion support.
- **Presenting panel:** the kit-style "Finance Hub · Explorations" panel, with Compiled A and B listed as in progress.

## v0.19.2 — 27 Nov 2026 · Approach 3 fidelity pass

(Tag `v0.19.1` points at the v0.19.0 commit because of a mis-tag; this release supersedes it.)

Shreya: the OPL Verified marker in the bottom banner was misaligned, and some things didn't match Figma.

- **Help banner:** the badge is at Figma's spot (195, 27) at −21.86°, with the dark badge in 3B. The man photo is 125.7×144.4 at (222, 14), and the grid decoration is in.
- **Hero:**
  - 3A uses Figma's grid with its fades;
  - ₹50 Lakhs is 48px Light;
  - in the fact pills, only "9.45% p.a." and the "7" are violet;
  - the stack cards carry their tints and borders;
  - the button is flat.
- **Cards:**
  - 20px corners with the `#E6E1D9` stroke and the exact head tints;
  - tag shapes and colours;
  - the Check Details style;
  - the overlay on the subsidy photos, with the logo overlapping;
  - the grid on the subsidy panel.

## v0.19.0 — 27 Nov 2026 · Responsive approach 3: 3A light hero + 3B dark hero

`/responsive/approach-3/` (`?theme=b` gives 3B), from Figma Section 1 `1:4534`:
- **3A:** mobile `12:14030` + desktop 1A `34:2114`.
- **3B:** mobile `1:3729` + desktop 1B `17:29741`.

What's new:
- **Type:** Stack Sans Text for titles and numbers (₹50 Lakhs in Light), Manrope for body. Both are self-hosted.
- **Mobile cards:** "Check Details" buttons, subsidy cards with photo headers, and a violet help card with a photo and the OPL Verified badge.
- **3B:** a dark teal gradient hero with faint stripes and a white sheet below it, plus lavender accents.
- **AI Mitra button:** as drawn (lavender radial, mint inner shadow).
- **Panel:** 3A and 3B are now switchable in the Look list.
- **Cache-busting:** the asset versions were bumped, so viewers get the new files.
- **Flags:** in `responsive/approach-3/README.md`, including that the violet/lavender comes back in this direction.

## v0.18.1 — 27 Nov 2026 · Prototype panel: bigger screen when collapsed

Shreya: when the panel is minimised the screen should get bigger, so viewers don't need "Open full screen".

- Collapsing the panel shrinks it to one round button in the corner, and the device takes the whole window with equal margins. On a 1440×900 laptop the desktop mock grows from 1068px to 1312px wide.
- With the panel open, the device now shares the panel's top edge.
- 3A / 3B (approach 3) are listed as "In progress" until they're built.

## v0.18.0 — 27 Nov 2026 · Responsive approach 2 + prototype panel

**Approach 2, "Light wash"** (`/responsive/approach-2/`), from Figma Section 5 `21:6331`:
- Frames: mobile Finance home `21:6332` (green) / `21:6768` (orange), desktop Loans overview `21:7403`.
- Look: white and airy with a teal-and-peach wash, General Sans (self-hosted), stone neutrals and deep teal `#064651`.
- Motion and states are the same as approach 1. New: the repayments area chart draws in when it scrolls into view, the Nov'26 point pings, and the amount counts up.
- Flags are in `responsive/approach-2/README.md`.

**Prototype panel, like the kit's** (both approaches):
- On a laptop the page opens inside a device mock (a 1440×900 browser window or a 390×844 phone), with a side panel: View Mobile / Desktop (**M**), Look 1 · Teal / 2 · Light wash, Icons Green / Orange, and Screens.
- Switches swap the page in place, and the URL keeps the choice.
- `?bare=1` (or opening on a phone) shows the page full screen and responsive.

## v0.17.1 — 27 Nov 2026 · Responsive page: Desktop | Mobile switch

Shreya asked how to see the mobile screens on a laptop.

- A **View: Desktop | Mobile** switch sits at the bottom left; **M** toggles it.
- **Mobile** loads the same page in a 390×844 phone frame, so it shows the real mobile layout.
- The choice is kept in the URL (`/responsive/?view=mobile`).

## v0.17.0 — 27 Nov 2026 · Responsive prototype in the teal look: Loans overview

The client asked to drop the blue. This adds a **new, separate page**, `responsive/`, built in the teal look. The prototype at the root is unchanged.

- **Figma:** `lpZnNP6VNO0xnz5s9lUgPo`, section "light teal gradient" `1:1558`. Loans overview: mobile `1:1559`, desktop `1:1994`.
- **One page, two layouts:** the mobile frame below 1024px, the desktop frame from 1024px. Container queries stack rows when the content area is narrow.
- **Motion and states** carry over from the kit: the entrance, count-ups, hero card stack, AI Mitra nudge, rotating AI questions, CIBIL gauge sweep, chip filters, sort, compare tray, tab ink, and press and hover states.
- **No build step.** Its own tokens, CSS, JS and assets; it shares only the Geist fonts.
- **Flags** are in `responsive/README.md`: leftover blues mapped to teal, the Debt Profile tag says 68% but the maths gives 62%, chart months derived from bar heights, and proposed active icons.

## v0.16.17 — 23 Nov 2026 · Money on its way: working days, not a date

Shreya: we can't promise when the money arrives, so show "5–8 working days", not a date.

- **Mobile:** the status line reads "Expected in 5–8 working days", and the disbursal card reads "Expected in · 5–8 working days". Both were "Expected by 30 Nov".
- **Desktop:** the same line, plus "Expected in your account in 5–8 working days."
- **README flag:** Figma `435:8001` still draws the date.

## v0.16.16 — 23 Nov 2026 · Subsidy lists follow the state · All subsidies · Refine your matches

Shreya asked for four things:
- a Refine banner in the subsidy lists, using the latest illustration;
- the refine flow: desktop from OPL Reviews `2289:330535` with cleaner colours, fewer questions and better copy; mobile one question at a time in a sheet, skippable;
- no Gujarat schemes for a Maharashtra expansion;
- a list for "View all subsidies", with State / Sector / Central filters outside and a GST-state dropdown.

**What changed:**
- **The lists follow the state.**
  - Explore (mobile and desktop) lists the chosen state's own schemes first, with the one for the chosen activity on top, then central ones. Before, it showed the drawn Gujarat set twice.
  - The catalogue is `OPL.data.schemes`. Names are real; amounts, notes and benefits are sample.
  - States without a seal in the kit get a monogram (`ui.Logo` `mono:MH`).
- **All Subsidies (`subsidy-list`, mobile):** "View all" and the benefit chips now lead here instead of a dead link.
  - It lists every scheme in the business's state, plus central ones.
  - A state pill opens the Subsidies home picker (GST-registered states only).
  - State · Sector · Central chips sit outside and combine.
- **Refine banner** after the 3rd card, with the 3D art `558:104693`.
  - Mobile: the Home help card's surface and a small filled button.
  - Desktop: a full-width grid row.
  - After refining it reads "Matches refined · Edit answers".
- **Refine flow:**
  - **Questions:** 4 instead of 6, one per benefit (term loan, machinery, hiring, export), each with a one-line "why".
  - **Desktop:** the panel on the kit drawer, in `#3858E5` and Geist, with a live "n of 4 answered" bar and a toast when done.
  - **Mobile:** a sheet, one question per step. Picking an answer moves on; Skip and Back are in the footer.
  - **Result:** the list re-ranks by the answers (sample logic). Answers are shared by both views for the session.
- Back from All Subsidies goes to Subsidies home, or Home.

## v0.16.15 — 23 Nov 2026 · "Track Loans" everywhere

Shreya: some places say "Track Loans", others "Applications"; stick to Track Loans.

- **Mobile Loans footer:** the third tab now reads **Track Loans** on Loans overview, Offers and the money-received states too. The `overviewLabel` override is gone.
- **Desktop:** the Loans tab and the breadcrumbs on loan details and KFS read **Track Loans**; the panel title is "Loans · Track Loans".
- **Unchanged:** the page headings "Track Loan Applications (n)" (mobile) and "Your Applications" (desktop).
- **README flag:** Figma still draws "Applications" on Loans overview (`382:36150`) and the disbursal frames (`435:*`).

## v0.16.14 — 23 Nov 2026 · Thinner phone frame, no blurry edges

Shreya: why are there dark, blurry edges round the phone? Make the frame slightly thinner.

- **Thinner bezel:** 8px instead of 12, with the corner radius 54 to match (screen 46 + 8). The critical CSS in `index.html` matches, so the frame doesn't jump on load.
- **No dark halo:** the drop shadow was wide and dark (40px offset, 80px blur, 35%) and read as a smudge round the phone. It's now a light, tight lift.
- **The screen is a backdrop root** (`clip-path` on `.screen`), so frosted layers inside it (the Home hero, the scrolled status bar) can never sample the dark bezel at their edges. A 2× capture showed no bleed before either; this guards it.

## v0.16.13 — 23 Nov 2026 · Debt Profile, as designed, with the maths fixed

Shreya: improve the Debt Profile (was "Your Borrowing", Figma `570:105880`); the data viz and maths need correcting. Keep changing the questions in the AI widget.

- **Built as designed:** "Debt Profile" with View Debt Profile, total outstanding beside an 80px donut, four legend rows, and the Ask AI Mitra question row with its texture.
- **The maths now reconciles:**
  - Term Loans (2) ₹36.50 L + Working Capital Loan (1) ₹13.72 L + Cash Credit Lines (1) ₹14.70 L = ₹64.92 L. Figma repeated ₹50.22 L, so its rows summed to ₹1.15 Cr.
  - Free Credit Limit = ₹33 L − ₹14.70 L = ₹18.30 L (Figma: ₹8.5L), matching the CMR sheet.
  - Every figure is computed from the parts in `ui.DebtProfile`.
- **The donut** now has four slices in the legend colours: the three owed parts, then the free limit in pale blue. Figma still had the old two-part donut. Geometry is as drawn, with rounded corners and even ~3px gaps. Slices pop in clockwise; with a mouse, pointing at a row or slice highlights it.
- **Rotating AI question** (`fx.aiRotate`): after the drawn "Can I take another term loan?", it cycles to "Which loan should I repay first?", "Should I draw my free ₹18.30 L?" and "Is ₹64.92 L too much to owe?". It holds while pressed, off-screen or under reduced motion.
- `ui.BorrowingCard` is replaced by `ui.DebtProfile` (library updated). README → Loans overview flags lists what changed from Figma.
## v0.16.12 — 23 Nov 2026 · Calculate estimate is a modal, and the page remembers the result

Shreya asked for a modal for more delight when the estimate is calculated, and for the result to show outside once closed.

- **Calculate estimate opens as a 560 modal** over Subsidy details, replacing the side drawer. The box keeps one height for form and result, so the calculated moment swaps in place with no jump:
  - Form: the mobile cards scroll between a fixed header and a footer with the live "Your estimate", Build-up bar, Get Estimate and Talk to an Expert.
  - Result: satin and rays bloom, a bundle lands per benefit while the total climbs, confetti bursts from the stack, and the whole modal gives a small bounce at the end.
- **Closing the modal updates the page.** The estimate card (both details versions) counts from its old figure to yours, **"Up to ₹1.01Cr"**, glows once, and adds **"Based on your 3 benefits"**. Its button becomes **Recalculate**. Re-renders keep it.
- **Mobile too.** The result is saved to the shared estimate state from either view, so the mobile Subsidy details hero shows your number, the note and Recalculate as well. Mobile's own result screen now saves it too.
- The URL still follows the modal (`subsidy-estimate` / `subsidy-estimate-result`).

## v0.16.11 — 23 Nov 2026 · Desktop AI questions change with context

Shreya: on desktop, wherever there's AI, the questions should change subtly in context.

- **Each AI row cycles through four questions** taken from what sits around it, starting with the one drawn in Figma:
  - Loans hero: borrowing limit, payout speed, rate.
  - CIBIL MSME Rank card: rank 1, applying again, low risk.
  - Subsidies hero: which subsidy first, the ₹50 L capital subsidy, combining schemes, documents. It was drawn with the Loans question, so it now asks subsidy questions instead.
- **The swap:** every ~4.6s the question lifts away with a slight blur as the next rises into the same spot, with no layout shift. Rows on one page are out of step, so they never change together.
- **When it holds:** on hover or focus, while the row is off-screen or the tab is hidden, and under reduced motion.
- **Code:** `D.aiRow` takes one question or a list; `D.mountAi` runs from `D.mountShell`, so any future AI row with a list rotates too.

## v0.16.10 — 23 Nov 2026 · Estimate card stacks like the mobile hero

Shreya asked for the illustration on top, with "Up to" given the same treatment as the amount.

- **The desktop Subsidy details estimate card** (cover-photo version, right rail) is now a centred stack, the same order as the mobile hero (`558:103930`): the 3D notes-and-coins illustration on top, 16 below it **Estimated benefits ⓘ**, then **Up to ₹1.2Cr**, then Calculate Estimate and Apply Now at full width.
- "Up to" is the same 40/52 medium as the amount. It used to be 20px grey.

## v0.16.9 — 23 Nov 2026 · Loan offers gets the Loans footer

Shreya: the footer on "See all loan offers" / "View all" should match the Loans page, with Offers selected.

- **Loan offers footer:** it used the Finance hub tabs (Home · Business · Finance · Grow). It now uses the Loans tabs (Overview · Offers · Applications · My Loans), with Offers active and the same labels as Loans overview.
- **Moving between Overview and Offers:** the footer holds still and only the active pill moves.
- **New active icon:** Solar Banknote 2 Bold in `#3858E5` (`assets/icons/banknote-2-active.svg`), the same family as the other active tabs.
- **Figma flag:** Loan offers is still drawn with the Finance hub tabs (README → Loan offers flow, flag 4).

## v0.16.8 — 23 Nov 2026 · Desktop frame fits short windows · no repeated "Open till"

- **The desktop frame now fits the window's height as well as its width.** In a short window the frame (760px minimum) used to run past the bottom and get cropped. That cut off the Calculate estimate drawer's footer (live estimate, Get Estimate) and anything else at the bottom: apply bars, modal actions. It now scales down to fit instead. Shreya: "getting cut".
- **Subsidy details (cover photo) no longer says "Open till 30 Sep 2029" twice.** The pill beside the department now reads **"Open for applications"**, and the date stays in the policy period card right below. This is adapted copy, flagged.

## v0.16.7 — 23 Nov 2026 · CMR sheet: CRED-style factor tiles

Shreya: the factor cards are hard to scan and don't look great; she likes what CRED does. Remove the subtitle and the two quieter steps.

- **Factors are now tiles, one figure each**, in a two-column grid paired by impact:
  - High impact: 100% EMIs paid on time, and 45% of the credit line in use (with a bar against the 30% mark).
  - Medium impact: 3 enquiries in 90 days, and 6 yrs for the oldest loan.
  - Low impact, full width: 2 types of credit.
- **Each tile:** a status dot beside the figure, with the impact and the coloured status along a dashed footer. Figures count up as the tiles rise in.
- **Tap a tile and it flips** to say why the factor matters, in the business's numbers. "Tap a card to see why" sits beside the heading.
- **Removed:** the subtitle "From your CIBIL report, biggest effect first", and the two steps under "Your path to CMR-1" (wait for Citi, autopay).
## v0.16.6 — 23 Nov 2026 · Tooltips never get cut off · more room under breadcrumbs

- **Desktop info tooltips can't be clipped any more.** Shreya: "still getting cut in many places", e.g. Estimated benefits on Subsidy details. Every tip now opens in one floating layer above the app, positioned from its icon, instead of inside the card. Rounded cards that hide their overflow, scrolling panels, drawers and modals can no longer crop it.
  - It opens above and flips below when it would run under the top bar. It slides sideways to stay 12px inside the window, with the arrow kept on the icon.
  - It closes on scroll or click, and works on keyboard focus too.
  - The inline tip markup stays as the source text, so every existing tip (CMR rank, trend, estimate, Compare APR) moved over with no changes.
- **Breadcrumbs have 20px under them**, up from 8, before the title or hero on Subsidy details, the application page and KFS.

## v0.16.5 — 23 Nov 2026 · Back goes up, not to the last page seen

Shreya: back on mobile isn't logical; it takes me to random screens.

Every Back and ✕ used to replay browser history, including bottom-nav tab switches and panel jumps. Now each screen has a parent (`OPL.parents`, README → Structure), and Back returns to the nearest parent on the path you took, or to the usual one if you jumped in.

- **Offers / Applications tabs** → Loans overview → Home, whichever tabs you went through.
- **Subsidy details** → Explore, Subsidies home or Home, whichever you came from.
- **Estimate result ✕** → Subsidy details.
- **KFS deep link** → Application (same loan) → Applications → Loans overview.
- Desktop follows the same map, with Loans overview as its top level.

## v0.16.4 — 23 Nov 2026 · 3D factory and pins for the new-unit art

The illustration I missed in v0.16.2 (Illustrations `558:103493`).

- **"Planning a new unit…" factory and pins are the new 3D set**, everywhere the art appears: the desktop Subsidies home promo, the mobile Subsidies home promo, and both Explore subsidies brief cards (desktop and mobile).
- Desktop promo placement is as drawn: factory 164 at (801, 10), pins 50 × 66 and 33 × 44. Mobile and the brief cards keep their sizes.
- **The smoke still drifts.** In Figma the two puffs are crops of the factory art, laid back over it. I cut them out of the base factory and animate them on top, placed relative to the factory so they scale with it in every box.
- Rebuilt at 2× from the transparent sources and palette-compressed (2–9 KB each). The old flat SVGs are removed. The green ground ellipse is unchanged.

## v0.16.3 — 23 Nov 2026 · CMR score sheet

Shreya: build a bottom sheet for CMR score, using the desktop asset for the score, with what affects it and how to improve it for this business.

- **New sheet, opened from Home's "CMR score" tile and the Loans "CMR - 2" pill.** Both were hotspots before.
- **Score:** the desktop CIBIL MSME Rank gauge, at full colour and with no card behind it. The needle swings down from 10 to rank 2 as the number counts down.
- **What shapes your rank:** five factors (repayment, credit line usage, enquiries, credit age, credit mix), each with a status. Each opens to explain why it matters.
- **Your path to CMR-1:** a lead move with the business's own numbers (pay ₹4.80 L to bring usage from 45% to 30%), plus two quieter steps.
- **Sticky footer:** "See loans for CMR-2".
- Proposed, not in Figma; sample values are listed in README → CMR score sheet.
## v0.16.2 — 23 Nov 2026 · New illustrations (Figma "Illustrations" 558:102537 + 558:104693)

Shreya's improved 3D illustrations, mobile and desktop:

- **Subsidy details hero:** notes and coins on a cream plinth (131 × 94), replacing the five flat SVG layers. Used on the mobile hero and in the desktop cover rail's estimate card. It drops onto its plinth and settles.
- **Estimate result:** a blue 3D plinth with one money bundle per benefit, built from the loose layers so each benefit still lands its own bundle (148 × 110, as drawn in `558:103771`). This covers the mobile result and the desktop estimate drawer. More than three benefits stack further bundles on top.
- **Refine your matches** (desktop Subsidies home): new document art (`558:104693`, 165 × 87).
- Assets are rebuilt at 2× from the transparent source images (Figma only exports them at 1×) and palette-compressed to about 10 KB each. The old SVG layers are removed, so lazy assets dropped from 612 to 598 KB.
- **Not used yet:** the Aatmanirbhar Gujarat building art and the loose coin stack. The prototype has no Aatmanirbhar details screen.

## v0.16.1 — 23 Nov 2026 · 14px inner radius everywhere

Shreya: a tinted card inside a 16px white card should be 14px.

I audited every mobile and desktop screen in the browser, flagging any filled element sat inset inside a 16px parent. Four were still 16px; all are now 14px:

- **Match card heads** (the tinted top of loan and subsidy cards): Home, Loans overview, Subsidies home, Explore subsidies, and the loan details sheet.
- **Benefit tiles** on Subsidy details (mobile, and the desktop page behind the estimate drawer).
- **The open benefit card** in Calculate estimate. A closed card keeps 16 because its head fills the card. The radius now animates with the padding.
- **The expert help card** inside the desktop Subsidy details rail.

Desktop offer cards, compare columns, subsidy cards and the cream estimate card were already 14. Re-running the audit finds nothing on either view.

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
