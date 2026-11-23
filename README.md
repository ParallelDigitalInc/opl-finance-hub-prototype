# OPL Finance Hub · HTML prototype

The source of truth for the Finance Hub flows as a clickable HTML prototype. It also
starts the HTML component kit that later mobile flows reuse.

- **Prototype:** `index.html` (a device frame plus a variant panel; full-screen on a phone)
- **Component library:** `library.html` (tokens, icons and every component, rendered by the same functions)
- **Figma:** `GHuBkYGEQZvQppv3v55EaA`, section *Finance Home* `416:82748`

**Screens (v0.3.0):**
- **Home:** frames `382:34093`, `382:33823`, `382:36681`
- **Loans overview:** `382:36150`. Home → "Explore Loans" pushes it; the back arrow or browser back pops it.

## Run it

There is no build step. Open `index.html` directly, or serve the folder:

```bash
cd ~/Documents/OPL/finance-hub-html && npx serve .
```

On a phone (≤ 500px wide) the prototype goes full-bleed with no shell and no panel, and
uses the real status bar and safe areas. Any state can be linked through the URL hash, for example:

`index.html#order=subsidies&emi=on` · `#autoplay=on` · `#frame=off` · `#hotspots=off` · `#motion=off`

## Structure

```
css/
  tokens.css               design tokens; names mirror the Figma variables
  base.css                 reset, stage, device shell, prototype panel (chrome, not product UI)
  components/
    primitives.css         Button, IconButton, Avatar, Logo, FactPill, Dots, Chip, Badge
    cards.css              HeroCard, MatchCard, QuickAction, SectionHeader, HelpCard, NoticeBanner
    chrome.css             StatusBar, AppHeader, FloatingBottom, AiMitraFab, BottomNav
  screens/home.css         layout only: rhythm and positions for this screen
js/
  core.js                  OPL namespace, templating, URL state, press feedback, hotspots, count-up
  fx.js                    shared behaviours: status-bar scroll, nudge, entrance, play-in-view, mouse drag
  components.js            OPL.ui.* (pure functions: props in, HTML out)
  variants.js              toggle registry per screen (presets = Figma frames)
  data/home.js             screen content, verbatim from Figma
  screens/home.js          screen render and behaviour
  app.js                   router (push/pop pages + history), device scaling, panel
  library.js               component library page
assets/icons               Solar icons exported from Figma (colours baked in, as drawn)
assets/img                 logos, avatar, hero texture, illustration
```

**Adding a screen:**
1. Put its content in `js/data/<screen>.js`.
2. Compose it from `OPL.ui` in `js/screens/<screen>.js` and register it in `OPL.screens`.
3. Put layout-only CSS in `css/screens/<screen>.css`.
4. Add its presets and toggles to `js/variants.js`.
5. If a pattern is new, add it to `components.js`, the matching CSS file and `library.js`, with its Figma node ID.

Screens expose `render(page)` and `leave()`; `leave()` clears timers when the page is popped or replaced.
`data-goto="<screen>"` on any element links it, and `data-back` pops the current page. Until that screen exists, tapping it flashes a hotspot hint.

## Fidelity rules

- Figma is the source of truth. Nothing visual is added that isn't in the frames.
- Strokes are drawn **inside** (`outline-offset: -1px`), because Figma strokes on these frames don't take layout space. A CSS `border` makes every card 2px too tall.
- Figma "normal" line-height for Geist 16 is **21px**. It is set explicitly.
- CTA colour is `#3858E5` as drawn on screen; the DS CTA token isn't updated yet. Text colours follow the updated DS.
- Geist only. Icons are Solar, exported from Figma.

Geometry was checked against Figma on 23 Nov 2026:
- frame height 1662
- hero card 95 / back 63.77
- match cards 232 / 252
- sections at y 615 and 931
- help card 1319 / 118
- floating bottom 172, or 246 with the EMI banner
- nav items 56 / 57

## Motion and behaviour (prototype layer)

All of this is behaviour on existing elements. None of it adds UI:

- **Entrance:** hero copy → back card → front card → CTA → dots → quick actions → sections, staggered 55ms apart. The ₹ amount counts up once.
- **Hero offer cards (cycling):** every 3.2s on the visible slide, the front card tucks under the CTA, the peeking card grows into the front, and the next offer slides into the peek. It pauses while you touch the hero. The rest state is exactly Figma's. Loans cycle Citi → BoB → Axis; subsidies cycle MSME Competitive → Gujarat Electronics → Aatmanirbhar Gujarat. "Static (Figma)" in the panel turns it off.
- **AI Mitra nudge:** about 2s after load, "Ask anything about **loans & subsidies**" slides out from behind the button. It tucks back after about 4s, or as soon as you scroll. It shows once per load; the topic is set per page in the screen data (`aiNudge`).
- **Hero carousel:** native swipe with snap. The back card has parallax (it moves more than the front card) and the copy fades as it slides. The dots stay in sync, and tapping a dot changes slide. Optional auto-advance turns the active dot's fill into a 5s progress bar; touching pauses it.
- **Press states:**
  - cards scale to 0.98
  - tiles scale to 0.94, with a small icon pop
  - buttons and chips scale to 0.96–0.97
  - text links fade, and the chevron nudges
  - Android adds a haptic tick
- **Rails:** horizontal scroll-snap; mouse drag works on a laptop.
- **Status bar:** gains a frosted surface once content scrolls under it.
- **EMI banner:** dismissing slides it off. The slot then collapses and the AI Mitra button settles into the loans-frame position.
- **AI Mitra:** a one-time attention ripple after the entrance. On press, the mark rotates.
- Reduced-motion users get no entrance or parallax.

## Figma flags (kept as drawn; to confirm)

1. The "View all" chevron differs: the loans frame uses a heavier CaretRight than the subsidies frame. One is used everywhere (the loans frame's).
2. The hero back card on the subsidy slide shows the Gujarat mark with the *MSME Competitive Lean Scheme* copy, the same as the front card.
3. *Gujarat Electronics Policy* is tagged "Central Government", but it is a state policy (Science and Technology Department).
4. The second loan card's tag "Working Capital Loan" repeats its subtitle.
5. The help card in `382:36681` has 17px padding and is 120 tall; the other frames use 16 / 118. 16 is used.
6. The tile and chip fill `#F5F7FA` is off-palette.
7. The fact pill's text style is "label/medium" (Figtree) but renders in Geist. Geist is used.
8. The EMI banner reads "due on 12 Nov", which is in the past relative to today's demo date.
9. Inactive nav items are 57 tall while the active one is 56, so labels sit 1.5px higher. This is reproduced.
10. Not in Figma, added on request (v0.2.0):
    - the third rail cards
    - the cycling stack
    - the AI Mitra nudge
    - the page-end note (off by default)

    Sources: the Axis card copies Loan offers "Top 3 picks" `382:35360`, with its logo and `#FCF3F6` tint. Aatmanirbhar Gujarat 2022 ("Up to ₹1.2Cr") comes from the subsidy screens `164:1434`. Its department, "Industries and Mines Department", is real-world, but OPL should confirm it. The Govt. of Gujarat seal is from Wikimedia Commons ("Seal of Gujarat.svg"), cropped in CSS.
11. Once cycling, the subsidy back card carries its own copy (Gujarat Electronics Policy) instead of Figma's duplicated MSME copy.

## Figma flags · Loans overview (`382:36150`)

1. **The offer cards drift from Home.** Titles are 18px, subtitles Figtree Medium, and the BoB labels use "Prodigy Sans". **Decided 23 Nov: 18px titles here** (`MatchCard size: "lg"`); Home stays 16px as drawn. Subtitles and labels are mapped to Geist.
2. Fonts mapped to Geist: the status-bar time (Figtree) and the "See all loans (7)" label (Instrument Sans SemiBold → DS Button Medium 14).
3. The visible hero layer (`416:121651`) rounds only the **bottom-left** corner, so the bottom-right is square. This is reproduced; confirm it's intended.
4. The content column is 354 wide (application and borrowing cards), while the help card is 350 and the screen gutter is 20/16. Reproduced as drawn.
5. The header icons and CMR chevron are Solar `#1C274C`, not ink.
6. Home now matches the updated Figma: "₹50 Lakhs" and the "Explore Loans" / "Explore Subsidies" CTAs. `382:36681` still reads "See all subsidies (3)"; I used "Explore Subsidies" for both, since the hero carousel is shared. The Subsidies overview isn't designed yet, so that CTA shows a hotspot hint.

## Versioning

| | |
|---|---|
| Scheme | `0.MINOR.PATCH` until hand-off, then `1.0.0` |
| MINOR | a new screen, flow or component/behaviour is added |
| PATCH | fidelity fixes or a Figma re-sync of existing screens |
| Tag | every version is a git tag `vX.Y.Z`; the CHANGELOG lists the Figma nodes synced and the date |
| Single source | `OPL.VERSION` in `js/core.js` (shown in the panel) |
| Branches | `main` is always presentable. Work happens on `flow/<name>` and is merged when reviewed |
| Deploys | each tag gets an immutable deploy URL, used in decks so the audience link never changes. A stable alias points to the latest |

Release: bump `OPL.VERSION`, add a CHANGELOG entry, commit, `git tag vX.Y.Z`.
