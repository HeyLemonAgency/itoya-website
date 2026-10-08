/**
 * Image manifest — every photograph used on the site, in one place.
 *
 * Files live in /public/images and are produced from the official Itoya
 * originals by scripts/process-images.mjs (crop + resize; Next/Image then
 * serves AVIF/WebP at the right width). Provenance and approval status for
 * each file: docs/ASSET_MANIFEST.md.
 *
 * To replace a photo: drop the new file in /public/images with the same name
 * (or update `src`), then correct width/height below.
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position for art direction inside cropped frames. */
  position?: string;
};

const p = (src: string, width: number, height: number, alt: string, position?: string): Photo => ({
  src: `/images/${src}`,
  width,
  height,
  alt,
  position,
});

export const media = {
  hero: {
    desktop: p(
      "hero-canopy-desktop.jpg",
      2400,
      1500,
      "La salle d’Itoya sous une canopée de fleurs de cerisier roses, éclairée par des lanternes.",
      "50% 40%",
    ),
    mobile: p(
      "hero-canopy-mobile.jpg",
      1080,
      1620,
      "La salle d’Itoya sous une canopée de fleurs de cerisier roses, éclairée par des lanternes.",
      "50% 35%",
    ),
    /** Optional ambient film. Leave null to use the still image only. */
    video: null as null | { mp4: string; width: number; height: number },
  },
  intro: p("intro-sashimi.jpg", 1200, 1500, "Assortiment de sashimis de saumon, thon, crevettes et loup de mer."),
  introDetail: p("intro-detail.jpg", 900, 900, "Détail de la salle d’Itoya."),
  dishes: {
    sashimi: p("dish-sashimi.jpg", 1165, 1194, "Sashimis : saumon, thon, crevettes et loup de mer, 18 pièces."),
    plateau: p("dish-plateau.jpg", 1195, 1195, "Plateau de sushis et maki mixtes de 53 pièces."),
    volcan: p("dish-volcan.jpg", 500, 500, "Le Volcan, maki à l’anguille et aux crevettes."),
    teppan: p("dish-teppan.jpg", 500, 500, "Teppan de bœuf."),
    dessert: p("dish-dessert.jpg", 500, 500, "Coupe de glace Itoya."),
  },
  formulas: {
    midi: p("formule-midi.jpg", 1600, 1200, "Plats japonais servis pour le menu du midi."),
    soir: p("formule-soir.jpg", 1600, 1200, "La salle d’Itoya le soir, sous les lanternes."),
  },
  room: {
    wide: p("room-canopy-wide.jpg", 2400, 1350, "Les fleurs de cerisier et les lanternes au-dessus des tables d’Itoya."),
    gallery: [] as Photo[],
    tatami: p("room-tatami.jpg", 1200, 1600, "Une des trois salles tatami privées d’Itoya."),
  },
  share: p("og-itoya.jpg", 1200, 630, "Itoya, restaurant japonais à Crissier."),
};
