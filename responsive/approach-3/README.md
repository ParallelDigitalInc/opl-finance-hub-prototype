# Approach 3: 3A (light hero) and 3B (dark hero)

The same screen in a third direction, with two hero variants. Pick them as **3A** / **3B** in the prototype panel. Direct links: `?theme=b` gives 3B; add `view=mobile` for the phone.

- Figma: `lpZnNP6VNO0xnz5s9lUgPo`, "Section 1" `1:4534`
- **3A, light mint grid hero:** mobile `12:14030`, desktop "1A" `34:2114`
- **3B, dark teal hero:** mobile `1:3729`, desktop "1B" `17:29741`

## Look

- **Type:** Stack Sans Text for titles and numbers; Manrope for body. Both are self-hosted from Google Fonts in `assets/fonts`.
- **Colour:**
  - deep teal `#004852`;
  - lavender accents (`#BDBBFF`, tag ink `#6D5CE7`);
  - a violet help card `#5C57FF`.

## What changes on mobile

- Each loan and subsidy card gets a "Check Details" button.
- Subsidy cards have a photo header, with the scheme logo overlapping it.
- The subsidy section sits on a tinted panel.
- The help card is violet, with a photo and the OPL Verified badge.

## 3B differences

- **Mobile:**
  - a dark striped hero with a white sheet below it;
  - a lavender amount and Explore Loans button;
  - a lavender subsidy panel and lavender active nav item.
- **Desktop:** the dark teal limit card.

## Kept from approach 1

Motion and states: the entrance, count-ups, card stack, gauge sweep, filters with an empty state, the sort menu, the compare tray, the interactive bar chart, and hover and press states.

## Flags

1. **Violet / lavender are back** in tags, icons, the help card and 3B's button. This is close to the blue the client wanted removed, so worth raising.
2. **Built against the deadline from frame screenshots plus Figma assets.** Spacing is close but not pixel-measured like approaches 1 and 2. A fidelity pass is the next step.
3. **Inherited from approach 1:**
   - bar values other than April are scaled from the bar heights;
   - the Debt Profile tag says 68%, but the maths gives 62%;
   - the Gold loan is due "31 Nov".
