# Explorations · Approach 3 (mobile)

- Figma: `lpZnNP6VNO0xnz5s9lUgPo`, "Section 2" `172:56553`, mobile frame **"3"** `172:54014`
- Built on Approach 1's code (`../fresh-1`), so all of its motion and interaction carries over. The frame's differences sit in an "APPROACH 3" layer at the end of `css/app.css`.

## What's different

These values were read from the Figma paints and checked side by side; the page height matches the frame (1595px).

- **Mint wash** (`172:54015`): `#CDEAD4` → `#E6F4EA` at 45% → white over the top 398px. It eases off as you scroll.
- **Header:** 56px tall, with 40px white round buttons. The avatar has a `#E8E6E1` hairline.
- **Hero:**
  - "Get a loan up to" is 15px, and ₹50 Lakhs is 32px Stack Sans Light.
  - The cards are neutral: white, a `#E2E8F0` hairline, and a 3px inset `#FAFAFA` panel, with names in Geist.
  - The back card is the front at 67.1%. Citi is in front and Bank of Baroda behind, as drawn.
  - The CTA is solid `#001D21`, 54px tall with 16px corners, in sentence case.
- **Quick actions:** 56px tiles with 18px corners, in mint, lilac, peach and blue-grey. The icons are frame 3's own.
- **Loan cards:**
  - the lender's tint at the top fades to white by 42% (Citi `#E7F0FB`, BoB `#FDEBE3`);
  - a `#E8E6E1` hairline with 22px corners;
  - a solid divider;
  - "View all" in `#004852`.
- **Subsidies:** a mint band at 80%, with "View all 8" under the cards.
- **Help banner:** lilac (`#FBFAFF` → `#EEEAFD`), with one green grid (`#52A87B`, 172:54897) and a dark button with 12px corners.
- **Nav:**
  - a warm-grey fade (`#E8E5DD`);
  - a white nav with a `#F1F1EE` active pill;
  - AI Mitra in warm grey, kept opaque so it stays visible.

## Flags

1. **The subsidy section's title says "Top loan matches"** in the frame, which looks like a copy slip. It reads "Key Subsidies" here.
2. **The rail-end "View all 12" is dropped,** as in the other approaches. The section keeps "View all" in its header and "View all 8" below. Both are as drawn, but it may be worth keeping just one.
3. **"View all 8" is blue** (`#2F7FE0`); the rest of this approach is teal and ink.
4. **Fonts:** the hero card names are in Geist while the rest of the page is Stack Sans and Manrope, as drawn.
5. **The flags from approach 1 apply too:** the MSME scheme logo, Axis as the third hero card, and the AI Mitra sheet copy.
