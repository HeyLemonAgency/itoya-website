# Itoya — project notes

Redesign proposal for **Itoya, restaurant japonais à Crissier**. Creative direction: **« Sous les fleurs »**.
The live site (https://www.itoya.ch) is untouched; this repository is a private pitch build.

## Run it

Node ≥ 20.9.

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production preview
```

Checks: `npm run typecheck`, `npm run lint`, `npm run build`, `npm run format`.

Maintenance scripts:

- `npm run fonts` copies the woff2 files from `@fontsource` into `src/app/fonts`. They are already committed; run it only after a font package update.
- `npm run images` rebuilds `public/images` from `./media-src` using the crop plan in `scripts/image-plan.mjs`. Fetch the originals first with `NODE_USE_ENV_PROXY=1 node scripts/fetch-originals.mjs` (the env var is only needed behind a proxy).
- `node scripts/process-menu-images.mjs` rebuilds the per-dish photos in `public/images/menu` (and `thumbs/`) and regenerates `src/content/menu-images.ts`. It reads `scripts/menu-image-sources.json`, which `scripts/build-menu.py` writes. Pass `--force` to re-encode from the originals.

The preview is **not indexable**: `robots.txt` disallows everything, every response carries
`X-Robots-Tag: noindex, nofollow` and pages emit `noindex` meta. At launch set
`SITE_INDEXABLE=true` (and `SITE_URL=https://www.itoya.ch` if different).

## Stack

Next.js 16.4 (App Router, TypeScript 6, Turbopack), React 19.3, Tailwind CSS 4.3 (CSS-first tokens in
`src/app/globals.css`), Motion 14 (`motion/react`, via `LazyMotion` + `m` components), Radix Dialog
(mobile menu, lightbox). ESLint is pinned to 9.x because the React lint plugins do not support 10 yet.
Fonts are self-hosted from `@fontsource` (OFL): Cormorant Garamond 500 / 500 italic / 600 and
Manrope variable, latin subset (~95 KB in total). Every page is statically prerendered.

## Where to edit content

| What                                                                 | File                                                      |
| -------------------------------------------------------------------- | --------------------------------------------------------- |
| Address, phones, email, hours, access, social links, booking channel | `src/content/site.ts`                                     |
| Full menu (dishes, prices, labels)                                   | `src/content/menu.ts`                                     |
| Lunch / evening formulas, dish lists, supplements                    | `src/content/formulas.ts`                                 |
| Every photo (path, size, alt text, crop focus)                       | `src/content/media.ts`                                    |
| Dishes featured on the homepage                                      | `src/components/home/FoodSequence.tsx` (`leads`, `trio`)  |
| Dishes shown on the formula panels (`/formules`)                     | `src/components/home/Formulas.tsx` (`formulaDishes`)      |
| Dishes on the homepage dish belt                                     | `src/components/home/DishBelt.tsx` (`rows`)               |
| Venue page: panorama points, spaces, floating details                | `src/app/le-lieu/page.tsx` (`spots`, `spaces`, `details`) |
| Photos in the venue lightbox                                         | `src/content/media.ts` (`venueGallery`)                   |
| Dish photo beside each menu category                                 | `src/content/media.ts` (`categoryPhotos`)                 |
| Photo of each dish (menu thumbnails, desktop stage, belt)            | `src/content/menu-images.ts` (generated, see above)       |

Prices are numbers in CHF; `price: null` displays « Sur demande ». The menu can be fully re-imported
from a fresh snapshot with `scripts/build-menu.py` (see the header of that script).

## Source checks — 8 October 2026

| Fact            | Value used                                                                                    | Source                                                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Address         | Chemin des Lentillières 7A, 1023 Crissier                                                     | itoya.ch footer, contact page, Wix business data. Footer spells « Lentillères » (typo); contact page, Wix location and JSON-LD use « Lentillières ». |
| Telephone       | +41 21 697 88 88 / +41 76 501 18 89                                                           | itoya.ch footer and /contact                                                                                                                         |
| Email           | info@itoya.ch                                                                                 | /contact                                                                                                                                             |
| Hours           | Every day 11:30–15:00 and 18:00–23:00                                                         | itoya.ch footer (Lun–Ven and Sam–Dim listed identically). Public-holiday exceptions unknown.                                                         |
| Lunch formula   | CHF 29 Mon–Fri, CHF 35 Sat/Sun/holidays; 3 × 4 dishes; 15-min interval; « +40 plats à choix » | /buffet-midi                                                                                                                                         |
| Evening formula | CHF 49; 3 × 5 dishes; 15-min interval                                                         | /buffet-soir (dish list truncated by an « En voir plus » control — shown as « une sélection »)                                                       |
| Supplements     | « Hors menu » items +2 to +9 / +2.50                                                          | /buffet-midi, /buffet-soir                                                                                                                           |
| Tablet ordering | « Commander sur place par tablette »                                                          | homepage                                                                                                                                             |
| Tatami rooms    | « Trois salles tatami privées »                                                               | /galerie                                                                                                                                             |
| Access          | Bus 36, arrêt Lentillières; parking public Oassis (zone 1e)                                   | /contact                                                                                                                                             |
| Free parking    | « 4h de parking gratuit »                                                                     | /contact — **hidden** until reconfirmed (`site.access.showParkingConditions`)                                                                        |
| Coordinates     | 46.5516073, 6.5731262                                                                         | Restaurant JSON-LD and Wix business location on itoya.ch (used only in structured data)                                                              |
| Social          | instagram.com/itoya.crissier, facebook.com/Itoya.Crissier, tiktok.com/@itoya.crissier         | itoya.ch footer                                                                                                                                      |
| Menu            | 166 dishes, 5 categories                                                                      | Wix Restaurants data embedded in /la-carte (`docs/sources/official-menu-snapshot-2026-10-08.json`)                                                   |

Deliberately **not** used: « Une première en Suisse » (unverified), any rating, award, chef story,
founding date, ingredient origin or allergen claim.

## Reservation channel

The current site uses **Wix Table Reservations** (`/contact` widget, « Demande de réservation de
table »). It only works inside Wix, so this build uses the verified channels:

- **Primary:** `tel:+41216978888` — « Réserver par téléphone » (every booking CTA leads to `/reservation` or dials directly).
- **Secondary:** a `mailto:info@itoya.ch` link with a pre-filled template. The page states that the
  booking is confirmed only when the team replies.

No form pretends to send or confirm anything. To plug in an online provider later (TheFork, Zenchef,
Resy…), set `site.booking.providerUrl` and add the provider's widget/link on `/reservation`.

## Menu editorial changes (for owner review)

Display names were tidied; the original wording is kept in `sourceName` on each changed item.
Types of change: piece counts moved out of names (« 8ps. » → « 8 pièces »), capitalisation,
typographic apostrophes, and these spelling fixes:

- N°96 Volcan: « Aguilles » → « Anguille », « fait maison » → « faite maison »
- N°93: « KoÐaiko » → « Kodaiko » (小太鼓 = kodaiko)
- N° C92: « PInk Lady/pinkuredi » → « Pink Lady »; N°91 « Jade/Hisui » → « Jade · Hisui »
- N°74 « Temaki au Anguille » → « Temaki à l’anguille »; N°123 « Udon aux végétarien Tempura » → « Udon tempura végétarien »
- « Nouilles sauté(s) » → « Nouilles sautées »; « Rouleux » → « Rouleau »; « Alaka Rolls » → « Alaska rolls »
- « Teriaki » → « teriyaki »; « Banane Splits » → « Banana split »; « Coupe de Lychée » → « Coupe de litchis »; « moca » → « moka »
- N°134/135 « en assiette » + « Frs 12.- en bol » → two prices (assiette / bol)

Questions for the owners:

1. N°65 and N°69 are both « Maki Avocat » (CHF 10 and 13). Is one of them different?
2. Six desserts have no price on the official menu (beignets, croquettes, glaces 1 boule) → shown as « Sur demande ». Are they formula-only?
3. Plateau 11 lists 20 pieces in its composition but « 19ps » in its name.
4. Are formula prices per person? (Not stated on the official pages, so not stated here.)
5. Lunch « Teppan saumon » appears both in the included dishes and as a +6 supplement.
6. Formula dish lists: German names (« Lachs », « Thunfisch », « Suppe », « Salat ») were translated into French.

## 21st.dev

What happened (8 October 2026):

- **Early in the session**, `21st.dev` was blocked by the environment's egress policy. It was reachable once the allowlist was updated.
- **Catalogue survey:** 36 candidates across the requested categories were surveyed through the public catalogue pages (`/community/components/s/<tag>.md`, component `.md` pages):
  - navigation / mobile menu
  - image reveal / parallax
  - tabs / segmented control / accordion
  - gallery / lightbox
  - links / buttons
- **Code download is gated.** The registry (`21st.dev/r/<author>/<slug>`) returns 403 without an account API key, the free plan allows two code retrievals per day, and `cdn.21st.dev` was blocked. No account, key or paid generation was used.
- **Source reviewed:** for the strongest MIT-licensed candidates, the code was read from the authors' public upstream repositories.

What was adopted:

| Component                         | Origin                                                                  | Use                                                                                                                                                                                                               |
| --------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Underline Link** by Théo Balick | 21st.dev `@balick/underline-link`, MIT (source: balick's upstream repo) | Adapted as the `.link-quiet` style in `globals.css`. The underline draws in from the left on hover or focus, leaves to the right, follows the text across line breaks, and does not animate under reduced motion. |

Venue page (9 October 2026). The catalogue was surveyed again for immersive gallery and scroll
components (`/community/components/s/gallery.md`, `parallax.md`, `scroll-animation.md`). Code
downloads are still gated, and GitHub was not reachable from the build environment, so only code
already reviewed from the authors' MIT repositories was adapted; other patterns were rebuilt:

| Component                                                   | Origin                                                           | Use                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Parallax Floating** by Daniel Petho                       | 21st.dev `@danielpetho/parallax-floating`, fancy components, MIT | Adapted as `src/components/motion/ParallaxFloating.tsx` for « Les détails »: elements also drift with the scroll (touch screens get the depth), the loop only runs while something moves, nothing moves under reduced motion. Credit in the file header. |
| **Spotlight** by ibelick                                    | 21st.dev / motion-primitives `spotlight`, MIT                    | Its spring-follows-the-pointer idea drives the lantern light in `LanternLight.tsx`, which reveals a photo through a mask instead of tinting a card. Credit in the file header.                                                                           |
| _Text Scroll Read_ (@youcefbnm)                             | 21st.dev, code not downloaded                                    | Pattern rebuilt with Motion in `ScrollRead.tsx`; unread words stay above 3:1 contrast.                                                                                                                                                                   |
| _Hover Expand_ (@educalvolpz), _Expanding Cards_ (@vaib215) | 21st.dev, code not downloaded                                    | Pattern rebuilt in `Spaces.tsx` with CSS flex transitions, buttons with `aria-expanded`, keyboard and touch support.                                                                                                                                     |

Reviewed and not adopted:

| Candidate                                                   | Why not                                                                       |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------- |
| efferd _Header 2_                                           | No `aria-expanded`, Escape or focus trap.                                     |
| hyperiux _Immersive Full Screen Nav_                        | Excellent accessibility, but GSAP-based, 1,000+ lines, and a custom licence.  |
| motion-primitives _Morphing Dialog_ (lightbox)              | No previous/next navigation, and a generic trigger label.                     |
| moumensoliman _Gallery Grid_                                | No Escape key or focus trap.                                                  |
| balick _Segmented Control_                                  | Radiogroup semantics, while the menu categories are in-page navigation links. |
| efferd _Zoom Parallax_, arunachalam _Scroll Expansion Hero_ | Long pinned scroll sequences; licence not stated on 21st.dev.                 |
| 3D carousels, image spheres, image trails                   | Spectacle over the photographs; poor keyboard and screen-reader support.      |

Instead, the mobile menu and the lightbox are built locally on **Radix Dialog**, the same primitive the shadcn-style 21st.dev components wrap. They follow the accessibility patterns of the best candidates: focus trap, Escape, focus return, explicit labels and a reduced-motion policy. The category rail uses Motion's shared-layout pill, the same technique as balick's control, but on plain links.

## Motion policy

- **Site-wide:** `MotionConfig reducedMotion="user"`, inside `LazyMotion` (`src/components/motion/MotionProvider.tsx`). Motion's feature bundle loads after hydration.
- **Opening scene (`src/components/hero/Opening.tsx`):**
  - As the page scrolls, the full-screen night photo closes into a round window (_marumado_) framed by two brass rings, and the welcome text appears beside it. On desktop the photo stays in place for one screen height (a short `position: sticky` stage) while the welcome section scrolls up normally; on phones the window closes while the photo scrolls away as an ordinary block. Scrolling is never intercepted.
  - Everything is driven by Motion values from `useScroll` (a CSS `clip-path: circle()` and two transforms); nothing updates React state per frame. The geometry is measured with a `ResizeObserver`.
  - Pointer depth (fine pointers only) uses Motion springs.
  - The slow push into the canopy is a compositor-only CSS animation (`.hero-drift`).
  - **Petals:** ten blossom petals (five on phones), pure CSS, falling on the right-hand side, away from the headline and the booking buttons (`src/components/hero/Petals.tsx`).
  - The drift and the petals pause with the visible, keyboard-accessible "Pause" control, when the hero is off screen, or when the tab is hidden.
  - **Reduced motion:** no drift, no petals, no window morph; a static round-window photo is shown beside the welcome text instead.
  - The optional film layer (`media.hero.video`) only loads on desktop, never with Save-Data or reduced motion, and falls back to the still image if autoplay is blocked.
- **Headline entrance** is CSS (`.hero-line`, `.hero-fade`), so the H1 and the booking button never wait for hydration. It is disabled under `prefers-reduced-motion`. It starts partly visible, so Chrome registers the headline as LCP on the first frame.
- **Dish belt (homepage formulas):** two rails of real dishes from the formula lists slide in opposite directions as the section crosses the screen (`DishBelt.tsx`, scroll-linked `translateX` only). Static under reduced motion. The markup is server-rendered; only the two rails are client components.
- **Menu photos (`/la-carte`):**
  - Desktop with a precise pointer: a sticky round window beside the list (`DishStage.tsx`), echoing the opening, shows the dish the pointer rests on, with its card (number, section, name, description, price) below. Cut-outs sit in the window and may overlap its brass rim; the nine full-frame photos fill it.
  - It changes calmly: a 90 ms hover intent (sweeping across rows does not flick through each one), no reaction to rows sliding under a still cursor while scrolling, and every photo is loaded and decoded before the swap. Scrolling into a new category shows that category's signature dish (its first « À l'affiche » dish with a photo); a search shows the first result. The row on show is marked in the list with a sakura name and a thin line in the margin.
  - The list itself never re-renders for this (one delegated listener; the marked row is a scoped CSS rule). Under reduced motion the dishes simply cross-fade.
  - Touch screens and narrow windows: each row starts with a 64 px thumbnail of the dish (full-frame photos cropped round).
  - The photos are decorative (`alt=""`, the stage is `aria-hidden`); every dish's name, description and price are in the list.
- **Brush lettering (booking section):** 伊藤屋, traced from the restaurant's own logo, is drawn from left to right like a stroke of ink when it scrolls into view (`BrushReveal.tsx`, a CSS mask moved by Motion). It is shown complete under reduced motion and without JavaScript. Its tint keeps the eyebrow text above it at ≥ 4.5:1 contrast.
- **Reveals and interactions:**
  - Section reveals travel 12–24 px, once.
  - Images use a clip-path curtain observed on an unclipped wrapper.
  - Dish plates "set down" once.
  - The round platter turns slightly with scroll; it is a top-down photo, so a 2D turn is honest.
  - The mobile menu and the lightbox animate in and out with `AnimatePresence`.
- **Venue page (`/le-lieu`, `src/components/venue/`):**
  - _Noren:_ three indigo noren carrying 伊 · 藤 · 屋 (the logo's own characters) hang over the night canopy. Scrolling draws the side panels aside and lifts the middle one, while the room settles from a slight zoom. Pointer movement and scroll speed make the fabric sway on a soft spring. One extra screen of sticky stage; the headline is visible from the first frame.
  - _Scroll read:_ a sentence whose words deepen from warm grey to ink as it is read.
  - _Panorama:_ the daylight room photo, wider than the screen, travels with the page (no pinning) and can be dragged, swiped or moved with buttons. Five labelled points open captions on hover, focus or tap. A focused point is brought into view and held there.
  - _Spaces:_ five panels that open out on mouse movement, focus or tap. A panel never opens just because the page scrolled it under a still cursor.
  - _Shoji:_ two paper screens on a wooden lattice slide open over the private-room photo as it scrolls into view; the room shows through the paper first.
  - _Details:_ photos float at different depths around the title, following the pointer and the scroll. Each opens the lightbox (all 12 venue photos; focus returns to the photo that opened it).
  - _Lantern light:_ the night canopy in near darkness, revealed by a warm pool of light that follows the pointer or finger; without a pointer it drifts slowly with the scroll.
  - Reduced motion: the noren hang drawn aside and the shoji stand open from the first paint (CSS); no zoom, sway, scroll travel, floating or drifting light; the sentence is fully inked. Dragging, buttons, captions, panels and the lightbox still work.
- **What the site never does:** scroll hijacking, long pinned sequences, a preloader or sound. The only sticky stages are one screen long (home opening, venue noren).
- **Without JavaScript,** a `<noscript>` rule un-hides every `[data-reveal]` element and shows the brush lettering complete.

## Checks performed (8 October 2026, production build)

- **Code checks:** `tsc --noEmit` and `eslint .` are clean. `next build` succeeds, with all routes static.
- **Visual review in Chromium (Playwright):**
  - Widths: 1440, 768, 390 and 360 px.
  - Every route, desktop and phone, full page.
  - No horizontal overflow and no console errors on any route.
- **Interactions:**
  - Mobile menu: opens, moves focus inside, contains the phone link, and Escape closes it and returns focus to the trigger.
  - Menu search: "saumon avocat" finds 10 dishes and the result is announced through a live region.
  - Lightbox: arrow keys navigate and Escape closes it.
  - Keyboard: the first Tab stop is the skip link.
  - Hero pause button: works.
  - Reduced motion: the hero is static and the pause control is hidden.
  - Content: one H1 per page, every image has an alt attribute, and no internal link is broken.
- **Lighthouse 12, mobile, simulated slow 4G** (build before the opening, belt and menu photos):
  - Accessibility 100 and Best practices 100 on every route.
  - SEO 69 is intentional: the preview is set to `noindex`.
  - Performance: menu 90, formulas 95, venue 90, contact 89, reservation 91. Homepage 76–79 (three runs).
  - CLS is 0 everywhere. Total blocking time is 80–330 ms.
  - The homepage's simulated LCP (4.6 s) is a modelling artifact. The LCP element is the server-rendered headline, but because the local server delivers the JavaScript before the first paint, Lighthouse's simulation assumes the paint waits for it.
- **Lighthouse with applied DevTools throttling** (slow 4G and 4× CPU): homepage 84 (FCP = LCP = 2.3 s); menu and venue 88–90 (LCP 2.2 s). CLS 0.
- **Real Chrome LCP with 4× CPU throttling:** 0.48 s on the homepage, equal to first paint.
- **Venue page** (same method, 9 October 2026): Accessibility 100, Best practices 100. Performance 86–90 on mobile (TBT 80–390 ms), 99 with the desktop preset (LCP 0.9 s, TBT 0). CLS 0. Checked at 1440, 1024, 768, 390 and 360 px and with reduced motion: no console errors, no horizontal overflow. Keyboard: points of interest, spaces and lightbox (arrows, Escape, focus return) tested.
- **After the opening / belt / menu-photo pass** (same method):
  - Accessibility 100 and Best practices 100 on home, menu and formulas.
  - Homepage 77–82 over three runs (TBT 140–250 ms). Formulas 91. Menu 84–95 over three warm runs (TBT 110–290 ms); one cold run straight after a rebuild scored 68. Menu with the desktop preset: 100 (LCP 0.8 s, TBT 0).
  - Unthrottled first paint: 0.2–0.3 s on all three pages. CLS 0.
  - A first version rendered the belt's 56 photos with `next/image` on the client and pushed the homepage's TBT to ~960 ms. Server-rendering them (`getImageProps`) and giving the menu rows 128 px static thumbnails fixed it.
  - Interaction checks re-run (menu dialog, search, lightbox, skip link, pause control, reduced motion, headings, alt text, internal links): all pass, no console errors, no horizontal overflow at 1440, 768, 390 and 360 px.
- **Remaining performance headroom:** the homepage's JavaScript (React, Next and Motion features, about 200 KB gzipped) is the main cost on slow phones.

## Launch dependencies

- [ ] Owners approve the use of their photographs on the new site (see `docs/ASSET_MANIFEST.md`).
- [ ] Original vector logo. The current SVG was traced from the 1080 px raster on itoya.ch: good at header sizes, but the master artwork is preferable.
- [ ] Reconfirm hours, holiday exceptions, formula prices and parking conditions.
- [ ] Decide on an online booking provider, or keep telephone + email.
- [ ] DNS / hosting for www.itoya.ch, `SITE_INDEXABLE=true`, redirects from old Wix URLs
      (`/buffet-midi` → `/formules#midi`, `/buffet-soir` → `/formules#soir`, `/galerie` → `/le-lieu`).
- [ ] Optional media upgrades listed in `docs/ASSET_MANIFEST.md` (a high-resolution night shot of the canopy, a short film, styled food photography).
- [ ] Confirm payment methods (the old site shows TWINT, cards, cash and WeChat logos) if they should appear.
- [ ] Hosting: any Node host that runs `next start` (Vercel, Netlify, a Swiss VPS). Image optimisation needs the Next server; a fully static export would need pre-sized images instead.
