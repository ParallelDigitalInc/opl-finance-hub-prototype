# Approach 2: white and airy (teal + peach wash)

This is the second direction for the same screen, kept as its own page so the two approaches can be compared side by side.
Below **1024px** it shows the mobile frame; at **1024px and above**, the desktop frame.

- Figma: `lpZnNP6VNO0xnz5s9lUgPo`, "Section 5" `21:6331`
- Mobile, Finance home: `21:6332` (green icons) and `21:6768` (orange icons)
- Desktop, loans overview: `21:7403`
- Not built yet: Loan application (mobile `21:6598`; desktop `21:7035` and `21:7219`)

## Prototype controls (bottom left)

| Control | What it does |
|---|---|
| **Look 1 / 2** | Switches between approach 1 (`/responsive/`) and this page. |
| **View Desktop / Mobile** | Mobile shows the real phone layout in a 390×844 frame. **M** also switches. |
| **Icons Green / Orange** | Switches between the two Figma colourways. Orange recolours the quick-action icons and the mobile card headers. |

Every choice is kept in the URL (`?view=mobile&icons=orange`), so a shared link opens the same way.

## How it differs from approach 1

**Type and colour**
- **Typeface:** General Sans (Fontshare, ITF Free Font License), self-hosted in `assets/fonts`. Geist is only the fallback.
- **Palette:** stone neutrals, with deep teal `#064651` as the primary and `#16736A` for links, tags and counts.

**Mobile**
- The top-level header is "Get Financing" with notifications, help and a profile photo.
- The bottom nav covers the app's sections (Home, Business, Finance, Grow), not the Loans sub-tabs.
- The Explore Loans button has a gradient.
- The hero is a white card with a teal-and-peach wash.

**Desktop**
- The limit card is white over a peach wash.
- Apply Now is a tonal button, and the "Term loan" chip carries a "New" badge.
- The Debt Profile uses icon tiles.
- Repayments are an area chart: it draws in when it scrolls into view, the Nov'26 point pings, and the amount counts up.

**Kept from approach 1:** the layout and motion. The staggered entrance, count-ups, hero card stack, AI Mitra hint and rotating questions, CIBIL gauge sweep, chip filters with an empty state, the sort menu (cards glide to their new order), the compare tray with the tab count, the tab underline, the collapsible sidebar, and press and hover states.

## Files

- `css/tokens.css`: this look's colours, gradients, type and shadows.
- `css/app.css`: approach 1's layout, motion and states, with the approach 2 look layered on at the end.
- `js/data.js`: the copy and figures from the frames.
- `js/app.js`: approach 1's behaviours, with this page's markup and its area chart.
- The presenting controls live in `../js/present.js` and `../css/present.css`, shared with approach 1.

## Flags

1. **Leftover blue:** "9.45% p.a." in the mobile hero is `#3858E5` on the frame. It's teal here.
2. **Mixed fonts on the frames:** a few text layers are still Geist or Manrope (the Bank of Baroda card figures, the desktop chart and EMI text). Everything here is set in General Sans.
3. **Contrast:** "Amount due today" is `rgba(0,0,0,.4)` on the frame (2.9:1). It's raised to `#737373` here to pass 4.5:1.
4. **Desktop AI Mitra button:** not drawn on the desktop frame. It's kept from approach 1 for consistency.
5. **Inherited from approach 1:**
   - the Debt Profile tag says 68%, but ₹4.65 L of ₹7.45 L is 62%;
   - the Gold loan is due "31 Nov".
6. **Proposed copy carried from the kit:** the rotating AI questions, and the tooltips on the info icons.
7. **Status bar:** the 9:41 status bar is left out (a real phone shows its own). All spacing below it matches the frame.
