# Itoya — project notes

Redesign proposal for **Itoya, restaurant japonais à Crissier**. Creative direction: **« Sous les fleurs »**.
The live site (https://www.itoya.ch) is untouched; this repository is a private pitch build.

## Run it

```bash
npm install
npm run fonts      # copies the self-hosted woff2 files into src/app/fonts
npm run dev        # http://localhost:3000
npm run build && npm start
```

Checks: `npm run typecheck`, `npm run lint`, `npm run build`.

The preview is **not indexable**: `robots.txt` disallows everything, every response carries
`X-Robots-Tag: noindex, nofollow` and pages emit `noindex` meta. At launch set
`SITE_INDEXABLE=true` (and `SITE_URL=https://www.itoya.ch` if different).

## Stack

Next.js (App Router, TypeScript), Tailwind CSS v4 (CSS-first tokens in `src/app/globals.css`),
Motion for React (`motion/react`), Radix Dialog (mobile menu, lightbox). Fonts are self-hosted
from `@fontsource` (OFL): Cormorant Garamond 500/500 italic/600 + Manrope variable.

## Where to edit content

| What | File |
| --- | --- |
| Address, phones, email, hours, access, social links, booking channel | `src/content/site.ts` |
| Full menu (dishes, prices, labels) | `src/content/menu.ts` |
| Lunch / evening formulas, dish lists, supplements | `src/content/formulas.ts` |
| Every photo (path, size, alt text, crop focus) | `src/content/media.ts` |
| Dishes featured on the homepage | `src/components/home/FoodSequence.tsx` (`features`) |

Prices are numbers in CHF; `price: null` displays « Sur demande ». The menu can be fully re-imported
from a fresh snapshot with `scripts/build-menu.py` (see the header of that script).

## Source checks — 8 October 2026

| Fact | Value used | Source |
| --- | --- | --- |
| Address | Chemin des Lentillières 7A, 1023 Crissier | itoya.ch footer, contact page, Wix business data. Footer spells « Lentillères » (typo); contact page, Wix location and JSON-LD use « Lentillières ». |
| Telephone | +41 21 697 88 88 / +41 76 501 18 89 | itoya.ch footer and /contact |
| Email | info@itoya.ch | /contact |
| Hours | Every day 11:30–15:00 and 18:00–23:00 | itoya.ch footer (Lun–Ven and Sam–Dim listed identically). Public-holiday exceptions unknown. |
| Lunch formula | CHF 29 Mon–Fri, CHF 35 Sat/Sun/holidays; 3 × 4 dishes; 15-min interval; « +40 plats à choix » | /buffet-midi |
| Evening formula | CHF 49; 3 × 5 dishes; 15-min interval | /buffet-soir (dish list truncated by an « En voir plus » control — shown as « une sélection ») |
| Supplements | « Hors menu » items +2 to +9 / +2.50 | /buffet-midi, /buffet-soir |
| Tablet ordering | « Commander sur place par tablette » | homepage |
| Tatami rooms | « Trois salles tatami privées » | /galerie |
| Access | Bus 36, arrêt Lentillières; parking public Oassis (zone 1e) | /contact |
| Free parking | « 4h de parking gratuit » | /contact — **hidden** until reconfirmed (`site.access.showParkingConditions`) |
| Coordinates | 46.5516073, 6.5731262 | Restaurant JSON-LD and Wix business location on itoya.ch (used only in structured data) |
| Social | instagram.com/itoya.crissier, facebook.com/Itoya.Crissier, tiktok.com/@itoya.crissier | itoya.ch footer |
| Menu | 166 dishes, 5 categories | Wix Restaurants data embedded in /la-carte (`docs/sources/official-menu-snapshot-2026-10-08.json`) |

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

The brief asks for 21st.dev components. **21st.dev could not be reached from this build
environment** (egress policy denied `21st.dev`; no 21st.dev MCP server was configured), so no
component was taken from it. The interface was built locally on Radix Dialog (the primitive most
21st.dev / shadcn menus and lightboxes wrap) with bespoke Tailwind + Motion styling.
Integration note: once `21st.dev` is reachable, candidates worth comparing against the local
versions are a full-screen mobile nav, an editorial image-reveal grid and a lightbox; any adopted
component must keep the Itoya tokens, French labels and the reduced-motion policy.

## Motion policy

- `MotionConfig reducedMotion="user"` site-wide (`src/components/motion/MotionProvider.tsx`).
- Hero ambient drift, pointer depth and optional video are explicitly disabled with
  `useReducedMotion()`, pause when the hero is off screen or the tab is hidden, and have a visible,
  keyboard-accessible « Pause » control.
- Hero text entrance is CSS (`.hero-line`, `.hero-fade`) so the H1 and the booking button never
  wait for hydration; disabled under `prefers-reduced-motion`.
- No scroll hijacking, no pinned sequences, no preloader, no sound.
- Without JavaScript, a `<noscript>` rule un-hides every `[data-reveal]` element.

## Launch dependencies

- [ ] Owners approve the use of their photographs on the new site (see `docs/ASSET_MANIFEST.md`).
- [ ] Original vector logo (the current one exists only as a small raster) — a typographic wordmark is used meanwhile.
- [ ] Reconfirm hours, holiday exceptions, formula prices and parking conditions.
- [ ] Decide on an online booking provider, or keep telephone + email.
- [ ] DNS / hosting for www.itoya.ch, `SITE_INDEXABLE=true`, redirects from old Wix URLs
      (`/buffet-midi` → `/formules#midi`, `/buffet-soir` → `/formules#soir`, `/galerie` → `/le-lieu`).
- [ ] Optional media upgrades listed in `docs/ASSET_MANIFEST.md`.
