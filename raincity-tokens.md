# RainCity Property Maintenance — Design System v1.0 (LOCKED 2026-08-28)

Approved Pass 1. Do not change tokens without the user's sign-off.
Visual spec page: `RainCity Design System.dc.html` (project root).

## Colour

| Token | Hex | Role |
|---|---|---|
| RainCity Blue | `#1A5FA8` | Primary. Logo mark, rules, links, labels, form focus. |
| Harbour Navy | `#0C2740` | Dark base. Headlines, header bar, footer, photo overlays. Never pure black. |
| Pacific Blue | `#3D8FD4` | Highlight. Hover, active nav, icons on navy, squeegee hairline. |
| Hi-Vis Amber | `#F5A314` | CTA accent ONLY. Quote buttons, award badge, slider handle. |
| Fog Grey | `#EEF2F6` | Cool light surface. Alternating bands, form fields, cards. |
| Steel | `#5D6E7E` | Body copy, captions, dividers (20% opacity), disabled. |

Support values: border `#DDE4EB`, muted meta `#9AA9B6`, amber-on-white text `#B8760A`, blue-on-white small text `#2F7CBD`.
Contrast: navy/white 13.4:1 · white/blue 5.2:1 · navy/amber 8.9:1.

## Typeface system (two faces)

- **Display — Chivo**. Uppercase, weights 700/800, tight tracking. Squared signage grotesk. This is the only display face — no alternates.
- **Body/UI — IBM Plex Sans**. Weights 400/500/600/700.
- IBM Plex Mono is spec-document only — NOT part of the site system.

## Type scale

| Token | Face | Size | Line | Tracking | Case |
|---|---|---|---|---|---|
| display-xl | Chivo 800 | clamp(40px,7vw,76px) | 0.94 | -0.025em | upper |
| display-l | Chivo 800 | clamp(30px,5vw,52px) | 0.98 | -0.02em | upper |
| display-m | Chivo 700 | clamp(24px,3.4vw,34px) | 1.05 | -0.01em | upper |
| display-s | Chivo 700 | 20px | 1.15 | -0.005em | upper |
| overline | Plex Sans 600 | 13px | 1.4 | 0.18em | upper |
| body-l | Plex Sans 400 | 19px | 1.6 | 0 | sentence |
| body | Plex Sans 400 | 17px | 1.65 | 0 | sentence |
| body-s | Plex Sans 400 | 15px | 1.6 | 0 | sentence |
| meta | Plex Sans 500 | 13px | 1.5 | 0.1em | upper |

## Spacing (4px base)

`space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `space-5` 24 · `space-6` 32 · `space-7` 48 · `space-8` 64 · `space-9` 96 · `space-10` 128

Grid: 12 col, max 1440px, 24px gutters, edge padding clamp(20px, 5vw, 64px).
Section padding: 96–128px desktop → 56–64px mobile.

## Signature element — The Squeegee Edge

A 12° diagonal cut with a 3px Pacific Blue hairline (amber on interactive instances). Used in exactly four places:
1. Hero — cuts the photo away to reveal the headline block.
2. Before/After — the draggable slider handle.
3. Section transitions — navy and white bands meet on the same angle.
4. Logo mark — the same cut at 34px.

No other decorative geometry. No gradients as decoration.

## Photography rules

Photography is the design. Real crews, real jobs, overcast Vancouver light. No stock studio shots, no illustration, no icon-only sections.

| Slot | Ratio | Direction |
|---|---|---|
| Hero | 16:9 full bleed | Right-weighted subject; left third quiet for the headline. |
| About | 4:5 portrait | Technician at a gutter line. Face visible. |
| Before/After | 3:2 paired | Identical camera position and light. Never mix jobs. |
| Why Choose Us | 1:1 square | Truck + signage in a strata driveway. |
| Service card | 16:10 | One per service, subject centred. |

Placeholders until real photos land: `repeating-linear-gradient(135deg,#E4EAF0 0 9px,#EEF2F6 9px 18px)` with an IBM Plex Mono 11px/0.12em Steel caption naming the shot, and a navy ratio tag top-right.

## Components

- **Primary CTA**: amber bg, navy text, Chivo 700 15px upper, 17px/26px pad (52px tall; 44px min mobile). Hover → navy bg, amber text.
- **Secondary CTA**: RainCity Blue bg, white text. Hover → Pacific Blue.
- **Tertiary/phone**: 2px navy outline. Hover → navy fill, white text.
- **Service card**: 1px `#DDE4EB` border, 16:10 photo with a blue corner cut, 20px pad, display-s title, body-s blurb, mono `VIEW SERVICE →` in RainCity Blue. Hover → border RainCity Blue.
- **Section label**: 28×3px amber bar + overline in RainCity Blue.
- **Award badge**: 2px navy outline, amber numeral block, mono kicker + display title.

## Locked decisions (final)
- Display face: **Chivo**. Saira Condensed and Archivo were rejected.
- CTA accent: **Hi-Vis Amber `#F5A314`**. Safety Orange and Cedar Red were rejected.
- No tweakable palette or face options remain in the spec page.
- **Form field**: Fog Grey fill, 1px `#DDE4EB` border, 16px Plex Sans, 14/16 pad, mono 11px/0.14em label above.
