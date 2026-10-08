/**
 * Image manifest — every photograph used on the site, in one place.
 *
 * Files in /public/images are produced from the official itoya.ch originals
 * by scripts/process-images.mjs (crop plan: scripts/image-plan.mjs).
 * Next/Image serves AVIF/WebP at the widths each layout requests.
 * Provenance and approval status: docs/ASSET_MANIFEST.md.
 *
 * To replace a photo: drop the new file in /public/images (same name, or
 * update `src`), then correct width/height and the alt text below.
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

/** One alt text for both hero crops (a <picture> has a single <img>). */
const canopyAlt =
  "La salle d’Itoya sous une canopée de fleurs de cerisier, avec des lanternes en bambou et des claustras de bois.";

export const media = {
  hero: {
    desktop: p("hero-canopy-desktop.jpg", 2048, 1152, canopyAlt, "50% 30%"),
    mobile: p("hero-canopy-mobile.jpg", 1226, 1840, canopyAlt, "50% 20%"),
    /**
     * Optional ambient film. The film on the current site (a fried roll in
     * front of flames) reads as stock footage and suggests a theatrical
     * presentation, so it is deliberately not used. See ASSET_MANIFEST.md.
     */
    video: null as null | { mp4: string; width: number; height: number },
  },

  intro: {
    canopy: p(
      "intro-canopy.jpg",
      1440,
      1800,
      "Lanternes en bambou suspendues dans les fleurs de cerisier, au-dessus des claustras de la salle.",
      "50% 40%",
    ),
    sign: p(
      "intro-sign.jpg",
      968,
      1152,
      "L’enseigne d’Itoya, 伊藤屋, en lettres sculptées sur un mur éclairé de bleu.",
      "40% 50%",
    ),
  },

  /** Dish cut-outs from the official menu photography (transparent PNG). */
  dishes: {
    sashimis: p(
      "dish-sashimis.png",
      1164,
      1194,
      "Sashimis de saumon, thon, crevettes et loup de mer dressés sur glace dans un bol laqué.",
    ),
    plateau9: p(
      "dish-plateau9.png",
      1195,
      1195,
      "Plateau rond de sushis et maki mixtes, vu du dessus.",
    ),
    dragon: p(
      "dish-dragon.png",
      494,
      306,
      "Le Dragon Itoya, roll aux gambas et à l’avocat sur feuille de bananier.",
    ),
    teppanBoeuf: p(
      "dish-teppanBoeuf.png",
      500,
      382,
      "Teppan de bœuf en sauce, dans une assiette au logo d’Itoya.",
    ),
    teppanStJacques: p(
      "dish-teppanStJacques.png",
      500,
      417,
      "Noix de Saint-Jacques au teppan, dans une assiette au logo d’Itoya.",
    ),
    tempura: p(
      "dish-tempura.png",
      775,
      741,
      "Tempura de légumes et de crevettes dans un panier en bambou.",
    ),
    chawanmushi: p(
      "dish-chawanmushi.png",
      500,
      351,
      "Chawanmushi servi dans sa tasse en porcelaine.",
    ),
    coupeItoya: p("dish-coupeItoya.png", 341, 500, "La coupe de glace Itoya."),
    bento7: p(
      "dish-bento7.png",
      500,
      332,
      "Bento 7 : salade d’algues, nigiris, California et sashimis dans un coffret laqué.",
    ),
    nigiriEbi: p("dish-nigiriEbi.png", 597, 237, "Deux nigiris ebi à la crevette."),
    nigiriOmelette: p("dish-nigiriOmelette.png", 489, 215, "Deux nigiris à l’omelette."),
    gunkanThonCuit: p("dish-gunkanThonCuit.png", 500, 345, "Deux gunkan au thon cuit."),
    nigiriSaumon: p("dish-nigiriSaumon.png", 495, 256, "Deux nigiris au saumon."),
    spicyTunaGunkan: p("dish-spicyTunaGunkan.png", 497, 367, "Deux gunkan spicy tuna."),
    temakiCalifornia: p(
      "dish-temakiCalifornia.png",
      500,
      498,
      "Temaki California sur son support en bois.",
    ),
  },

  room: {
    canopyWide: p(
      "room-canopy-wide.jpg",
      2400,
      1294,
      "La canopée de fleurs de cerisier et les lanternes au-dessus des claustras de bois d’Itoya.",
      "50% 30%",
    ),
    wide: p(
      "room-wide.jpg",
      2400,
      1500,
      "Vue de la salle d’Itoya : plafond de fleurs de cerisier, lanternes, tables en bois et claustras.",
      "55% 40%",
    ),
    noren: p(
      "room-noren.jpg",
      1200,
      1600,
      "Rideaux noren illustrés et cloison en bois ajouré devant une table.",
    ),
    privateRoom: p(
      "room-private.jpg",
      1200,
      1600,
      "Une salle privée d’Itoya, boiseries chaudes et table basse.",
      "50% 60%",
    ),
    privateRoomLong: p(
      "room-private-long.jpg",
      1200,
      1600,
      "Une salle privée avec une longue table basse et des sièges sans pieds.",
    ),
    entrance: p(
      "room-entrance.jpg",
      1200,
      1600,
      "L’entrée d’Itoya, avec sa fontaine et son enseigne.",
    ),
    sign: p(
      "room-sign.jpg",
      1600,
      900,
      "L’enseigne 伊藤屋 · いとうや · ITOYA dans l’entrée du restaurant.",
    ),
    counter: p(
      "room-counter.jpg",
      1200,
      1600,
      "Le comptoir sushi et teppanyaki, derrière des branches de cerisier.",
    ),
    kokeshi: p(
      "detail-kokeshi.jpg",
      1200,
      1600,
      "Poupées kokeshi en bois exposées dans une niche.",
    ),
    doll: p(
      "detail-doll.jpg",
      1200,
      1600,
      "Poupée traditionnelle japonaise exposée dans la salle.",
    ),
  },

  share: p(
    "og-itoya.jpg",
    1200,
    630,
    "Itoya, restaurant japonais à Crissier, sous une canopée de fleurs de cerisier.",
  ),
};

/** One real dish per menu category, shown beside the category title. */
export const categoryPhotos: Record<string, Photo> = {
  sushi: media.dishes.sashimis,
  "plats-principaux": media.dishes.teppanBoeuf,
  "salades-entrees": media.dishes.chawanmushi,
  bento: media.dishes.bento7,
  desserts: media.dishes.coupeItoya,
};

/** The venue gallery, in reading order. */
export const venueGallery: Photo[] = [
  media.room.wide,
  media.room.noren,
  media.room.counter,
  media.intro.canopy,
  media.room.sign,
  media.room.kokeshi,
  media.room.privateRoomLong,
  media.room.entrance,
  media.room.doll,
];
