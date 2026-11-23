# Changelog

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
