# Explorations · Cleaned up 1 (mobile)

- Figma: `lpZnNP6VNO0xnz5s9lUgPo`, section "Old Cleaned Up" `233:61391`, mobile frame **"1"** `172:56049`
- Built on Approach 3's code (`../approach-3`, itself on Approach 1), so the motion and interaction carry over: entrance, the two-slide hero carousel (loans, then subsidies) with the folding pager, card stacks, rails, liquid nav, hide-on-scroll, AI Mitra sheet, toasts. The frame's look sits in a "CLEANED 1" layer at the end of `css/app.css`.

## What's in it

Values were read from the Figma paints and checked side by side at 390px; section tops match the frame to the pixel (tiles 460, loans 609, subsidy band 917, help 1469) and the page ends 151px below the help banner, as drawn (1756px).

- **Header:** a Loans module page: back arrow, "Loans" in Geist SemiBold 18/28, search and headset in 40px `#F7F7F7` circles.
- **Hero panel** (`172:56050`): 428px from the top, rounded 28 at the bottom with a `#E2E8F0` inner hairline. `#ADE8D6` → white along a 0.7-scaled axis, a 190px white glow blurred 114px, and the wave photo at 20% softened 5px.
- **Hero:** Geist 16/28 eyebrow, ₹50 Lakhs in Geist Medium 32/36; two fact chips ("From **9.45% p.a.**", "**7 offers**", values `#2E8380`); inset neutral cards (back at 67.1%, front 17px down, the CTA covers its last 20px); a `#004852` 44px pill CTA; 8px dots with a 24px `#2B5143` pill.
- **Quick actions:** 76×74 `#F7F7F7` tiles (r16), the frame's 40px duotone teal icons, two-line Geist Medium 14/18 labels.
- **Loan cards** (`172:56146`): 289 wide, `#F5F5F5` hairline, shadow/s; an olive `#F4F5EA` top panel with a white corner tab "Collateral-free", then a white figures panel. "View all" in `#195C57`.
- **Subsidies** (`172:56257`): a mint `#E7F8F3` → white band (r24), "Top subsidy matches" in Stack Sans Text Light; filter chips (Machinery, Technology, Quality & Lean with a count of 3) that toggle; cards with a 115px photo under a 20% shade, a lilac `#DEDDFF` corner tag, the logo overlapping by 20px, and a "Check Details" button on `#F1F4EF`.
- **Help banner** (`232:58596`): `#F4F5EA`, the wave turned over at 20%, the teal OPL stamp at −21.86° (it gives a small thump when the banner comes into view) and the advisor cut-out, clipped by the banner.
- **Dock:** `#F1F5F8` fade, dark-teal `#104842` AI Mitra with a white swirl, and the Loans nav (Overview, Offers, Track Loans, My Loans) with an olive `#F2F4E6` active pill. The other three tabs open placeholders.

## Flags

1. **Second loan card's tab** reads "Working Capital Loan" in blue (`#3858E5`) in the frame, repeating the product line. Both tabs read "Collateral-free" here.
2. **The frame repeats one subsidy card three times** (MSME scheme, machinery photo, "State Government"). The first card keeps the frame's photo; the other two are Gujarat Textile Policy and Aatmanirbhar Gujarat. Tags follow each scheme's real level, so MSME reads "Central Government".
3. **Hero:** two lenders, as the frame's pager shows. The subsidies slide and its chips ("8 schemes", "Central & State") are proposed, carried from the other approaches.
4. **Fonts:** the loans half is in Geist and the subsidy half in Stack Sans Text Light + Manrope, as drawn.
5. **Hidden layers skipped:** the "All" chip, the hidden "Ask AI Mitra" instance, the home indicator, card "Tag 2" badges and the "CENTRAL"/"Sector" labels.
