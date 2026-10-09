# Asset manifest

Every photograph and graphic used by the site, where it came from and its approval status.
All sources were downloaded from the official itoya.ch media library on **8 October 2026**
(`https://static.wixstatic.com/media/<id>`). Originals live in `./media-src` (git-ignored); crops
and output sizes are defined in `scripts/image-plan.mjs` and produced by
`npm run images` (`scripts/process-images.mjs`). Next/Image serves AVIF/WebP at the width each
layout needs.

**Permission status for every item: _owner approval required before public launch._** The files
are published by the restaurant on its own site, which makes them strong pitch material, but public
availability does not by itself establish the right to republish them in a new site.

## Interior photography

| Local file                | Source id                  | Original            | Output    | Placement                                            | Notes                                                                                      |
| ------------------------- | -------------------------- | ------------------- | --------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `hero-canopy-desktop.jpg` | `394bef_e4219eca…~mv2.jpg` | 2048×1152           | 2048×1152 | Home hero (≥768 px), reservation hero, sharing image | Night view of the canopy and lanterns. Light grade: −10 % saturation, slightly warmer.     |
| `hero-canopy-mobile.jpg`  | `394bef_38f8eb8b…~mv2.jpg` | 3264×2448           | 1226×1840 | Home hero on phones                                  | Portrait crop, cut **above** two guests at the bottom left of the original.                |
| `intro-canopy.jpg`        | `394bef_38f8eb8b…~mv2.jpg` | 3264×2448           | 1440×1800 | Home intro, venue page, gallery                      | Same original, guests excluded.                                                            |
| `room-canopy-wide.jpg`    | `394bef_38f8eb8b…~mv2.jpg` | 3264×2448           | 2400×1294 | Home "Prenez place sous les fleurs"                  | Wide crop ending above the guests.                                                         |
| `room-wide.jpg`           | `394bef_dbecaa4a…~mv2.jpg` | 3264×2448           | 2400×1500 | Venue hero, gallery                                  | Daylight view of the room.                                                                 |
| `intro-sign.jpg`          | `394bef_40a129de…~mv2.jpg` | 2048×1152           | 968×1152  | Home intro (overlapping detail)                      | 伊藤屋 · いとうや · ITOYA sign.                                                            |
| `room-sign.jpg`           | `394bef_40a129de…~mv2.jpg` | 2048×1152           | 1600×900  | Gallery                                              |                                                                                            |
| `room-noren.jpg`          | `394bef_7d900c73…~mv2.jpg` | 2448×3264           | 1200×1600 | Home room details, gallery                           |                                                                                            |
| `room-private.jpg`        | `394bef_510a8a77…~mv2.jpg` | 2448×3264           | 1200×1600 | Home room details, venue "Trois salles tatami"       | Captioned "salle privée" (the photo itself does not show tatami mats).                     |
| `room-private-long.jpg`   | `394bef_292e6c41…~mv2.jpg` | 2448×3264           | 1200×1600 | Gallery                                              |                                                                                            |
| `room-counter.jpg`        | `394bef_ef36b508…~mv2.jpg` | 2448×3264           | 1200×1600 | Home room details, gallery                           | Shows the sushi / teppanyaki counter. A staff member is visible, small, in the background. |
| `room-entrance.jpg`       | `394bef_885a8354…~mv2.jpg` | 2448×3264           | 1200×1600 | Contact location card, gallery                       |                                                                                            |
| `detail-kokeshi.jpg`      | `394bef_3c8ed3ce…~mv2.jpg` | 4032×3024 (rotated) | 1200×1600 | Gallery                                              |                                                                                            |
| `detail-doll.jpg`         | `394bef_f555a733…~mv2.jpg` | 4032×3024 (rotated) | 1200×1600 | Gallery                                              |                                                                                            |

## Dish photography (official menu, transparent cut-outs)

From the Wix Restaurants menu data on `/la-carte`. Most are 500 px squares, so they are only shown at
moderate sizes. They are never stretched into backgrounds.

| Local file                                                                            | Source id                              | Dish                                 | Placement                                     |
| ------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------ | --------------------------------------------- |
| `dish-sashimis.webp`                                                                  | `394bef_afacc7ba…~mv2.png` (1165×1194) | N°41 Sashimis                        | Home selection, menu category                 |
| `dish-plateau9.webp`                                                                  | `394bef_f9def7c6…~mv2.png` (1195×1195) | Plateau 9                            | Home selection (turns with scroll), menu hero |
| `dish-dragon.webp`                                                                    | `b5c608_666e5f16…~mv2.png`             | N°95 Dragon Itoya                    | Home selection                                |
| `dish-teppanStJacques.webp`                                                           | `394bef_61bebb7e…~mv2.png`             | N°108 Teppan noix de Saint-Jacques   | Home selection                                |
| `dish-tempura.webp`                                                                   | `394bef_d8447f18…~mv2.png` (777×741)   | N°29 Tempura mixte                   | Home selection                                |
| `dish-teppanBoeuf.webp`                                                               | `394bef_c7eaefda…~mv2.png`             | N°100 Teppan bœuf                    | Menu category "Plats principaux"              |
| `dish-chawanmushi.webp`                                                               | `394bef_4ea472b2…~mv2.png`             | N°25 Chawanmushi                     | Menu category "Salades & entrées"             |
| `dish-bento7.webp`                                                                    | `394bef_563e96af…~mv2.png`             | Bento 7                              | Menu category "Bento"                         |
| `dish-coupeItoya.webp`                                                                | `394bef_dea06ee2…~mv2.png`             | Coupe de glace Itoya                 | Menu category "Desserts"                      |
| `dish-nigiriEbi.webp` / `dish-nigiriOmelette.webp` / `dish-gunkanThonCuit.webp`       | menu N°53 / N°58 / N°31                | Dishes listed in the lunch formula   | Lunch formula panel                           |
| `dish-nigiriSaumon.webp` / `dish-temakiCalifornia.webp` / `dish-spicyTunaGunkan.webp` | menu N°51 / N°71 / N°35                | Dishes listed in the evening formula | Evening formula panel, formulas hero          |

## Per-dish photos (official menu)

Every dish photo published on the official menu (`/la-carte`, Wix Restaurants data, snapshot of
8 October 2026), mapped to its dish by `scripts/build-menu.py` → `scripts/menu-image-sources.json`
and processed by `scripts/process-menu-images.mjs`:

- **`public/images/menu/<dish-id>.webp`** (157 files, ≤ 640 px, transparent, ~5 MB in total). Used for the homepage
  dish belt (dishes from the formula lists only) and the desktop dish stage on `/la-carte`, both through
  `next/image`.
- **`public/images/menu/thumbs/<dish-id>.webp`** (157 files, ≤ 128 px, ~0.8 MB in total). The 64 px thumbnails in the menu rows on phones and tablets,
  served as they are.
- **Excluded (9):** banana split, coupe Danemark, glace citron, glace fraise, glace noix de coco and the four mochi. They look like
  supplier stock photography. These dishes are listed without a photo.
- Nine photos (bentos 10–15, plateaux 1, 2 and 4) are full-frame shots on a dark backdrop rather than cut-outs (`cutout: false`). They fill the round window on desktop and are cropped round in the phone thumbnails.

## Brand

| File                                             | Source                                            | Notes                                                                                                                                                                                                                         |
| ------------------------------------------------ | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/brand/itoya-logo-ivory.svg`, `…-ink.svg` | `394bef_feceee6e…~mv2.jpg` (1080×635 raster logo) | Traced to vector (potrace) at 1.5× from the official raster. Faithful at header sizes; **ask the owners for the original vector artwork**. Lettering: 伊藤屋 / いとうや / ITOYA, as on the restaurant's own logo and signage. |
| `public/brand/itoya-kanji.svg`                   | Kanji subpaths of the traced logo above           | 伊藤屋 only (the brush lettering of the logo, without いとうや and ITOYA). Used as a mask for the brush reveal in the booking section.                                                                                        |
| `src/app/icon.png`, `apple-icon.png`             | Generated from the logo                           |                                                                                                                                                                                                                               |
| `public/images/og-itoya.jpg`                     | Hero image + logo                                 | 1200×630 sharing image.                                                                                                                                                                                                       |

## Considered and not used

| Asset                                                              | Why                                                                                                                                |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Homepage film `video/394bef_ef8bff03…` (1080p, 5 s)                | A fried roll in front of flames. It reads as stock footage and suggests a theatrical presentation; it is not footage of the venue. |
| `394bef_c45bd8ff…~mv2.jpg` (slate plate and chopsticks, 5760×3840) | Generic, likely stock; it shows no Itoya food or room.                                                                             |
| `394bef_f63088fa…~mv2.jpg` (tatami room)                           | Soft toys on the tatami and a street view; not flattering for a launch.                                                            |
| Payment logos (TWINT, Visa/Mastercard, cash, WeChat)               | Payment methods are not confirmed for the new site. Add them only if the owners confirm.                                           |
| Mochi and scoop dessert images                                     | Look like supplier stock photography (see the per-dish exclusions above).                                                          |

## Media wish-list for a shoot

1. A wide shot and a portrait-friendly shot under the canopy **at night**, at ≥ 4000 px, with clean space for text. The current night photo is 2048 px.
2. A 6–10 s stabilised camera drift through the same scene with warm lantern light (no text, no soundtrack, loopable). Slot it into `media.hero.video` — the hero already supports it (desktop only, never with Save-Data or reduced motion, pausable).
3. Close, carefully lit sashimi and platter shots on dark ceramic or timber: real Itoya dishes, cold food without steam.
4. A genuine teppanyaki preparation detail.
5. One tatami-room photo showing the mats, and one dining-room photo with no identifiable guests.
