# Explorations · Fresh 1 (mobile)

This is a new approach for the Finance Hub home, built from scratch. It lives under `/explorations/`, the third link next to the kit and `/responsive/`. The compiled approaches will join it here.

- Figma: `lpZnNP6VNO0xnz5s9lUgPo`, "Section 2" `172:56553`, mobile frame **"1"** `172:52419`
- Next: desktop ("Desktop · 1 (white grid)" `214:1097`), then frames 2 and 3 as the compiled approaches

## Fidelity

These are taken exactly from the Figma layer values, read through the plugin API:
- **Hero grid:** `assets/icons/hero-grid.svg` is the Figma layer itself: 26px pitch, each line on a white→#D3DCE9→clear gradient, group opacity 55%.
- **Help-banner grids:** the two 195×280 grids, turned −90° (one mirrored), opacity 50%, with the first rows faded as drawn.
- **Hero cards:**
  - The front card's stroke is the lender colour at 20%, fading downward, and its fill turns white at 64.5%.
  - The back card's stroke runs from soft to softer, and its fill turns white at 70.5%.
- **The rest:** the AI Mitra fill (Figma's own radial), the button and nav shadows, the help banner's gradient fill and stroke, and the subsidy section wash.

## Motion and interaction

**Kept from the kit:** the reveal gate, the staggered entrance, the ₹50 Lakhs count-up, the hero card stack with a progress pager, the AI Mitra nudge, press states, toasts for screens that aren't built, and `prefers-reduced-motion` (or `#motion=off`).

**New: the app layer**
- **Hero cards:**
  - The front card slides solid down behind Explore Loans, the next rises a beat later, and the third fades in behind.
  - Swipe the cards, tap a dot, or press and hold to pause.
- **Bottom nav:** a "liquid" pill stretches toward the tab you tap, then settles. The icon bounces. Tabs that aren't built cross-fade to a placeholder screen. Tapping Finance again scrolls to the top.
- **Hide on scroll:** the nav slips away while you read down, and AI Mitra drops into its place. Any upward flick brings the nav back.
- **AI Mitra:**
  - It springs in with its mark turning, and breathes softly every few seconds.
  - A faint light circles its rim.
  - Tapping it opens a bottom sheet with suggested questions and a typing indicator. Drag the sheet down to dismiss it.
- **Scroll and rails:** the grid drifts and fades as you scroll. The top bar frosts. Subsidy photos drift inside their frames as the rail scrolls.
- **Small touches:** the CTA shine sweeps once and its chevron nudges, the tiles squish, the bell rings once, the help headset bobs and its phone glyph rings, and a light haptic fires on Android.

## Flags

1. **Recoleta:** only demo cuts are installed (Fontspring/fonnts demo, with no web licence). So it is loaded with `local()`, never uploaded, and renders wherever it is installed. Everywhere else, Fraunces (soft) stands in. A Recoleta web licence would let it ship for everyone. ₹ is drawn in Fraunces, as in Figma.
2. **Blue is back in this direction:** the navy primary `#0F1E5A`, the sky nav pill, the "State Government" tag `#2F7FE0`, and "View all 12".
3. **The MSME Competitive Lean Scheme card** uses a Karnataka handlooms logo. It is kept as drawn.
4. **Third hero card (Axis):** the pager shows 3, but only 2 cards are drawn. Axis follows the same tint recipe.
5. **AI Mitra sheet:** its copy and reply are proposed. The frame shows only the button.
6. **Not built:**
   - The trust footer (hidden in the frame).
   - Home, Business and Grow, which show placeholders.
