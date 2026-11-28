# Explorations · Cleaned up 2 (mobile)

- Figma: `lpZnNP6VNO0xnz5s9lUgPo`, section "Old Cleaned Up" `233:61391`, mobile frame **"2"** `172:55627`
- Built on Approach 3's code (`../approach-3`, itself on Fresh 1), so the motion and interaction carry over: reveal gate, two-slide hero carousel (Loans, Subsidies) with the folding pager, card stacks, rails, liquid nav, hide-on-scroll chrome, AI Mitra sheet, toasts. The frame's look sits in a "CLEANED UP 2" layer at the end of `css/app.css`.

## What's in the frame

Values read from the layer paints and checked side by side at 390px; the page height matches the frame (1765px).

- **Hero panel** (`172:55631`): `#CDEAD4` → `#F1F9F3`, 474px tall with 28px bottom corners. Over it a fading grid (`172:55633`, redrawn as `hero-grid-c2.svg` from the layer render: verticals every 22.38px fading out by ~400px, faint horizontals every 14.35px) and a `#D4EDD9` sheet that covers the grid's top and fades out between 96 and 216px.
- **Header:** 72px, 40px `#F1F4EF` round buttons, avatar with a half-white 2px ring.
- **Hero:** 18px eyebrow, 48px Manrope figure, a `#F1F4EF` rate chip ("Starts" ink, "@9.45% p.a." `#6965E9`). Hero cards are white with a 3px white inner stroke and the lender colour at 10% fading down (Citi `#2470AB`, BoB `#F26522`); the back card is the front at 67.1%, the front sits 30px down and the CTA covers its last 20px. CTA solid `#004852`, 48px, 12px corners.
- **Quick actions:** four 74px `#F5F5F4` tiles (16px corners, 16px gaps), 40px lilac/teal duotone icons from the frame, two-line 14/18 teal labels.
- **Loan cards:** white, `#E6E1D9` hairline, 20px corners, 4px padding. Tinted top panel (Citi `#E9F3F6`, BoB `#F8EDE8`) with a white corner tab ("Collateral-free", `#7450E0`) and two concave fillets; white figures panel, "₹50 L" in Stack Sans 18.
- **Subsidies:** full-bleed band, 24px corners, `rgba(215,214,255,0.3)` → white; Stack Sans Light title; filter chips (white pills, lilac duotone icons, a count on "Quality & Lean"); cards with a 115px photo, lilac corner tab, ringed logo riding up 20px, Manrope 16/22 name, `#F5F5F4` divider, round chevron.
- **Help banner:** `#D5F2E9` with the frame's teal wave picture at 20%, the OPL stamp turned −21.86°, and the advisor photo running past the edges.
- **Nav:** `#FAFAF9` with a `#F5F5F4` hairline, mint `#E2F3E6` active pill, stone labels; frame's own icons. AI Mitra: `#BDBBFF` radial, kept opaque.

## Not from the frame

- The second hero slide (Subsidies), copied from the other approaches; its chip "8 schemes match you" is proposed, so the CTA stays level with the loans slide.
- The pager (the frame has none) and Axis Bank as the third hero card.
- Chips toggle one at a time and toast that filtering isn't built.

## Flags

- The frame's second loan card tab is a stale lilac variant reading "Working Capital Loan"; both cards use the first card's "Collateral-free" tab.
- The frame repeats the MSME scheme three times, all tagged "State Government"; the real three schemes and levels are kept (MSME is Central).
- Subsidies "View all" is `#0F172A` in the frame; it uses the page's teal, as the loans link does.
