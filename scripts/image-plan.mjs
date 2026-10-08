// Image plan: which official Itoya original feeds which file in /public/images,
// with the crop used. Crops are in source pixels after EXIF orientation.
// Provenance and approval status: docs/ASSET_MANIFEST.md.
//
//   NODE_USE_ENV_PROXY=1 node scripts/fetch-originals.mjs   # → ./media-src
//   npm run images                                         # → ./public/images

/** Short name → Wix media id on itoya.ch (static.wixstatic.com/media/<id>). */
export const sources = {
  // Interior — gallery / homepage of itoya.ch
  canopyNight: "394bef_e4219eca5e0841e7a1c1b6a61bb3ef41~mv2.jpg", // 2048×1152
  canopyRoom: "394bef_38f8eb8be8c8464fb27161cfdfee53a1~mv2.jpg", // 3264×2448 (guests bottom-left: always cropped out)
  roomWide: "394bef_dbecaa4a10a543d89ec10a323d36fdeb~mv2.jpg", // 3264×2448
  noren: "394bef_7d900c7305594e50ab189b9b555607bd~mv2.jpg", // 2448×3264
  privateRoom: "394bef_510a8a772f10409991121b9fbf1cfc71~mv2.jpg", // 2448×3264
  privateRoomLong: "394bef_292e6c41a5c541319355d783cd1f8ff1~mv2.jpg", // 2448×3264
  entrance: "394bef_885a83547d8946e1b8ba758e27de3935~mv2.jpg", // 2448×3264
  lobbySign: "394bef_40a129de28fc4c74bf988c5a81e33793~mv2.jpg", // 2048×1152
  counter: "394bef_ef36b5089a924a63b90eb70623f5d007~mv2.jpg", // 2448×3264
  kokeshi: "394bef_3c8ed3ce1bfb4e5194d0d0c076abef16~mv2.jpg", // 4032×3024 (rotated)
  doll: "394bef_f555a733443e44b6b3c6ebf1379aee7a~mv2.jpg", // 4032×3024 (rotated)
  logo: "394bef_feceee6ea7f94ae0b75760eba3bf6293~mv2.jpg", // 1080×635 (traced to SVG by hand)
  // Dishes — transparent cut-outs from the official menu (itoya.ch/la-carte)
  sashimis: "394bef_afacc7ba867949d59d708428719e8dfb~mv2.png", // N°41, 1165×1194
  plateau9: "394bef_f9def7c65bfc444cbcfb7a3799d5d02b~mv2.png", // Plateau 9, 1195×1195
  dragon: "b5c608_666e5f16da9946edaa8dab1e21e7e666~mv2.png", // N°95
  teppanBoeuf: "394bef_c7eaefda8ba54cf59faa9e5c7cd196f5~mv2.png", // N°100
  teppanStJacques: "394bef_61bebb7edac44f9da93426f6ae2594e0~mv2.png", // N°108
  tempura: "394bef_d8447f18ed7147be995d7221cddf597d~mv2.png", // N°29, 777×741
  udonOlives: "394bef_5a4debe02188490eaeb1f6a6eb096290~mv2.png", // N°121
  chawanmushi: "394bef_4ea472b20def44acb58f432c54a9c188~mv2.png", // N°25
  coupeItoya: "394bef_dea06ee2d22b4a5da754172dce35d6e5~mv2.png", // Coupe de glace Itoya
  nigiriEbi: "394bef_bcb069de827a4837bd4e9935df2b84a8~mv2.png", // N°53
  nigiriOmelette: "394bef_cecb8c0360114cb298ad0fae81212e02~mv2.png", // N°58
  gunkanThonCuit: "394bef_3f2e143e0f3f4fe48fd7bec4a26eb88f~mv2.png", // N°31
  nigiriSaumon: "394bef_b11d9e0fb24c46b9976fa471a1dc4fbb~mv2.png", // N°51
  spicyTunaGunkan: "394bef_34d8d44cdcc3496ea9b4cdf5dbd26994~mv2.png", // N°35
  temakiCalifornia: "394bef_aae6c490f74c4cb687161146d0a70994~mv2.png", // N°71
};

/**
 * Outputs. `crop` = { left, top, width, height } in source pixels.
 * `width` = output width (never larger than the crop: no upscaling).
 * `grade` = light colour correction for the night scene (calms the blue LED).
 * `cutout` = keep transparency, trim empty margins, export PNG.
 */
export const outputs = [
  // Hero — night canopy. Desktop: full frame. Phone: 2:3 crop on the large lantern.
  { out: "hero-canopy-desktop.jpg", from: "canopyNight", width: 2048, grade: "night" },
  // Phone: the night frame is too small for a sharp portrait crop, so phones get
  // the high-resolution canopy photo, cropped above the guests' heads.
  { out: "hero-canopy-mobile.jpg", from: "canopyRoom", crop: { left: 980, top: 0, width: 1226, height: 1840 }, width: 1226 },

  // Homepage intro — looking up into the blossoms (guests excluded).
  { out: "intro-canopy.jpg", from: "canopyRoom", crop: { left: 340, top: 0, width: 1440, height: 1800 }, width: 1440 },
  { out: "intro-sign.jpg", from: "lobbySign", crop: { left: 1080, top: 0, width: 968, height: 1152 }, width: 968 },

  // Room — wide canopy over the lattice (stops above the guests' heads).
  { out: "room-canopy-wide.jpg", from: "canopyRoom", crop: { left: 0, top: 0, width: 3264, height: 1760 }, width: 2400 },
  { out: "room-wide.jpg", from: "roomWide", crop: { left: 0, top: 220, width: 3264, height: 2040 }, width: 2400 },
  { out: "room-noren.jpg", from: "noren", width: 1200 },
  { out: "room-private.jpg", from: "privateRoom", width: 1200 },
  { out: "room-private-long.jpg", from: "privateRoomLong", width: 1200 },
  { out: "room-entrance.jpg", from: "entrance", width: 1200 },
  { out: "room-entrance-wide.jpg", from: "entrance", crop: { left: 0, top: 320, width: 2448, height: 1530 }, width: 2400 },
  { out: "room-sign.jpg", from: "lobbySign", width: 1600 },
  { out: "room-counter.jpg", from: "counter", width: 1200 },
  { out: "detail-kokeshi.jpg", from: "kokeshi", width: 1200 },
  { out: "detail-doll.jpg", from: "doll", width: 1200 },

  // Dishes (cut-outs).
  ...[
    "sashimis",
    "plateau9",
    "dragon",
    "teppanBoeuf",
    "teppanStJacques",
    "tempura",
    "udonOlives",
    "chawanmushi",
    "coupeItoya",
    "nigiriEbi",
    "nigiriOmelette",
    "gunkanThonCuit",
    "nigiriSaumon",
    "spicyTunaGunkan",
    "temakiCalifornia",
  ].map((key) => ({ out: `dish-${key}.png`, from: key, cutout: true })),
];
