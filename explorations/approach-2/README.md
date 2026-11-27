# Explorations · Approach 2 (mobile)

- Figma: `lpZnNP6VNO0xnz5s9lUgPo`, "Section 2" `172:56553`, mobile frame **"2"** `172:52770`
- Built on Approach 1's code (`../fresh-1`), so all of its motion and interaction carries over. The frame's differences sit in an "APPROACH 2" layer at the end of `css/app.css`.

## What's different from approach 1

These values were read from the Figma paints and checked side by side; the page height matches the frame (1860px).

- **Sky** (`172:52771`): `#98C0FB` → `#E6F0FF` at 189px → white at 384px. Two clouds sit on it, blended in hard-light.
- **Header:** white round buttons with a `#E3E6EA` hairline and a soft lift.
- **Hero:**
  - ₹50 Lakhs is set in Stack Sans Text Light. Frame 2 uses no Recoleta.
  - Explore Loans is a `#263A59` → `#10151E` gradient with a light inner top edge, 342px wide.
  - The pager is ink.
- **Quick actions:** white circles with a hairline. The labels are SemiBold ink.
- **Loan cards:**
  - 20px side padding, 48px logos;
  - a dashed divider in place of the grey footer;
  - "View all 12" in blue.
- **Schemes:**
  - a mint arch (`#D3E8DA` → `#EEF6F1`) with the scheme illustration on its crest;
  - the mint → white body;
  - "3 Key Schemes Matched" with a navy → green gradient;
  - "View all 8" below the cards.
- **Trust band** ("Trust footer · v2"):
  - the band runs white → `#EDF4FF` → `#C9DEFD`, with clouds;
  - the OPL Verified seal is tilted 6°;
  - "Built for the MSMEs of Bharat." uses a `#5F86C4` → `#8EAEE0` gradient;
  - the legal line sits below.
- **Help banner:** hidden in the frame, so it isn't built here.

## Motion added for this approach

- The clouds drift slowly, slide in on entrance, and part at different depths as you scroll.
- The scheme illustration hops onto the arch when the section comes into view.
- The trust seal stamps down and settles at its 6° tilt, while the band's clouds part and the lines fade up.

## Flags

1. **"View all" counts disagree, as drawn:** the loans link says 12, the schemes rail ends with "View all 12", and the link below says "View all 8", even though the title says 3 matched.
2. **The trust footer's placeholder note** asks for OPL to confirm its copy. The legal line is used as drawn.
3. **Blue again:** the "View all" links (`#2F7FE0`), the sky, and the AI Mitra glow.
4. **The flags from approach 1 apply too:** the MSME scheme logo, Axis as the third hero card, and the AI Mitra sheet copy.
