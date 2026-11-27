# OPL Finance Hub · responsive prototype (teal VD)

A responsive rebuild of the Finance Hub in the new non-blue visual direction.
One page, two layouts: below **1024px** it is the mobile frame; at **1024px and above** it is the desktop frame.
Resize the window to switch between them.

- Figma: `lpZnNP6VNO0xnz5s9lUgPo`, section "light teal gradient" `1:1558`
- Screen 1, **Loans overview**: mobile `1:1559`, desktop `1:1994`
- Next in the section: Lender verification pending (desktop `1:2529`, mobile `1:1817`)

## Run it

It has no build step. Serve the **repo root** so `../assets/fonts` resolves, then open `/responsive/`.
In the Claude preview, the launch config is `finance-hub-responsive` on port 4794.
**Switching views:** use the **View: Desktop | Mobile** switch at the bottom left, or press **M**. On a laptop, Mobile shows the real phone layout in a 390×844 frame. The choice is kept in the URL (`?view=mobile`), so you can share a link that opens in mobile view. On a phone or tablet the page uses the mobile layout by itself, and the switch is hidden on phones.

**Screens built:** 1. Loans overview (mobile + desktop). The other tabs, nav items and buttons show an "isn't built yet" message.

Add `#motion=off` to the URL to see every final state without animation.

## Files

| File | What it holds |
|---|---|
| `css/tokens.css` | The teal VD: every colour, gradient, shadow and motion curve |
| `css/app.css` | Mobile-first layout. The desktop rules sit under `@media (min-width: 1024px)`, and container queries stack rows on narrow content areas |
| `js/data.js` | Copy and figures, verbatim from the frames |
| `js/app.js` | Markup and behaviours |
| `assets/` | Assets exported from these frames. Logos are composited exactly as Figma layers them, at 3× display size. The originals are in `../assets/_source/responsive` |

## Motion and states carried over from the kit

- **Reveal gate:** nothing animates until fonts and above-fold images are ready (3 s cap).
- **Mobile entrance:** the stagger runs title → back card → front card → CTA → dots → tiles → sections. **Desktop entrance:** blocks fade up 60 ms apart.
- **Count-ups** on ₹50 Lakhs (both layouts) and on the Debt Profile tiles when they scroll into view.
- **Hero card stack** (mobile) auto-cycles every 3.2 s. The active dot fills as a progress bar. The cycle pauses while you press, and tapping the cards steps through them.
- **AI Mitra:**
  - The nudge pill slides out from behind the FAB once, then tucks back.
  - The FAB nods on the nudge and ripples on entry.
  - The AI question rows on desktop rotate their questions and pause on hover.
- **CIBIL gauge:** the bars sweep in one by one, the needle springs to the rank, and the rank and chip settle. On hover, only the business's own rank stays lit.
- **Top loan matches** (desktop):
  - Chip filters, with an empty state.
  - A Sort menu that re-orders the cards (FLIP glide).
  - Compare checkboxes raise the compare tray, and the Compare tab shows a count that bumps on each change.
- **Repayment chart:** the bars grow in when seen. Pointing at a bar moves the highlight and the tooltip to it.
- **Shell:**
  - The tab ink leans toward the tab you hover.
  - The top bar frosts on scroll.
  - The sidebar collapses to icons (button or `[`), and ⌘K focuses search.
- **Press states** on everything tappable, plus hover lifts on cards and tiles.
- Taps that lead to screens not built yet show a toast saying so.
- `prefers-reduced-motion` is respected throughout.

## Flags: where this differs from the frames, or needs a decision

1. **Leftover blues on the frames are mapped to teal:**
   - the "Working Capital Loan" and "Central Government" card tags (`#3858E5` → `--primary-ink`);
   - the subsidy chip count badge (`#CBD6F9` → `--primary-line`).
2. **Active icons for Offers, Track Loans, My Loans and the desktop tabs** are teal recolours of the grey icons. Only Overview has an active icon drawn, so these are proposed.
3. **Repayment chart:** only Apr (₹64.7K) has a value on the frame. The other months are scaled from the bar heights, so each tooltip matches its bar.
4. **Debt Profile maths:** ₹4.65 L utilised of ₹7.45 L total is **62%**, but the tag says **68% limit utilised**. Kept as drawn.
5. **"Due on 31 Nov 2026"** (Gold loan) is kept as drawn. November has 30 days.
6. **Mobile loan rail:** Citi and Bank of Baroda are as drawn. Axis and SBI (from the desktop frame) follow, so the rail scrolls.
7. **The mobile status bar (9:41) is not drawn,** because a real phone shows its own. Every vertical spacing below it matches the frame.
8. **Proposed copy carried from the kit:** the AI question rotations, and the tooltips on the CIBIL and repayment info icons.
9. **AI Mitra logo:** the component note says "indigo and teal swirl, colours fixed", but these frames use a white mark on teal. Built as drawn.
