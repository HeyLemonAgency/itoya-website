/**
 * Lunch and evening tasting formulas ("Buffet Midi" / "Buffet Soir").
 * Source pages, checked 8 October 2026:
 *   https://www.itoya.ch/buffet-midi
 *   https://www.itoya.ch/buffet-soir
 *
 * The official pages describe a fixed number of rounds and dishes with a
 * 15-minute interval: never present this as unlimited dining.
 * Dish names were translated where the source mixed in German
 * ("Lachs" → saumon, "Thunfisch" → thon) and obvious typos were fixed; see
 * docs/PROJECT_NOTES.md.
 */

export type Supplement = { name: string; amount: number };
export type DishGroup = { title: string; dishes: string[] };

export type Formula = {
  id: "midi" | "soir";
  title: string;
  service: string;
  hours: string;
  prices: { label: string; amount: number }[];
  rounds: number;
  dishesPerRound: number;
  intervalMinutes: number;
  /** Extra line published on the official page. */
  highlight?: string;
  groups: DishGroup[];
  /** True when the official page itself only shows part of the list. */
  partialList: boolean;
  supplements: Supplement[];
};

export const formulas: Formula[] = [
  {
    id: "midi",
    title: "Le midi",
    service: "Menu dégustation du midi",
    hours: "11:30 – 15:00",
    prices: [
      { label: "Du lundi au vendredi", amount: 29 },
      { label: "Samedi, dimanche et jours fériés", amount: 35 },
    ],
    rounds: 3,
    dishesPerRound: 4,
    intervalMinutes: 15,
    highlight: "Plus de 40 plats au choix",
    partialList: false,
    groups: [
      {
        title: "Sushi & maki",
        dishes: [
          "Maki concombre",
          "Maki avocat",
          "Maki shinko",
          "Maki saumon",
          "Roll végétarien",
          "Roll poulet",
          "California thon cuit avocat",
          "Surimi deluxe",
          "Sushi aux algues",
          "Gunkan surimi",
          "Gunkan thon cuit",
          "Nigiri crabe (surimi)",
          "Nigiri omelette (tamago)",
          "Nigiri ebi",
          "Nigiri avocat",
          "Nigiri tofu (inari)",
        ],
      },
      {
        title: "Soupes, salades & entrées",
        dishes: [
          "Soupe miso",
          "Chawanmushi",
          "Kimchi",
          "Salade d’avocat",
          "Salade d’algues",
          "Edamame",
          "Salade de tofu",
          "Rouleaux de printemps",
          "Raviolis frits (3 pièces)",
          "Raviolis grillés (3 pièces)",
          "Pinces de crabe",
          "Beignets de calmars frits (3 pièces)",
          "Kimchi au lard",
        ],
      },
      {
        title: "Plats chauds",
        dishes: [
          "Udon au poulet",
          "Teppanyaki poulet",
          "Ebi yaki",
          "Teppanyaki porc",
          "Yaki mushroom",
          "Légumes divers",
          "Tempura yasai",
          "Canard laqué",
          "Teppan saumon",
          "Riz sauté au bœuf",
          "Riz sauté au poulet",
          "Ailes de poulet au coca",
          "Riz",
        ],
      },
      {
        title: "Desserts",
        dishes: [
          "Croquettes à la banane (2 pièces)",
          "Croquettes au chocolat",
          "Beignet d’ananas (1 pièce)",
          "Beignet de banane (1 pièce)",
          "Glace citron (1 boule)",
          "Glace fraise (1 boule)",
        ],
      },
    ],
    supplements: [
      { name: "California saumon cheese", amount: 5 },
      { name: "Maguro roll (2 pièces)", amount: 3 },
      { name: "Sashimi thon", amount: 6 },
      { name: "Sashimi saumon", amount: 5 },
      { name: "Tataki saumon", amount: 5 },
      { name: "Tataki thon", amount: 6 },
      { name: "Ebi maki (3 pièces)", amount: 4 },
      { name: "Roll poulet mangue (2 pièces)", amount: 4 },
      { name: "Roll anguille (2 pièces)", amount: 4 },
      { name: "Noix de Saint-Jacques grillées (2 pièces)", amount: 5 },
      { name: "Teppan saumon", amount: 6 },
      { name: "Côtelettes d’agneau", amount: 9 },
      { name: "Mochi vanille", amount: 2.5 },
      { name: "Mochi mangue", amount: 2.5 },
      { name: "Mochi thé vert", amount: 2.5 },
    ],
  },
  {
    id: "soir",
    title: "Le soir",
    service: "Menu dégustation du soir",
    hours: "18:00 – 23:00",
    prices: [{ label: "Tous les soirs", amount: 49 }],
    rounds: 3,
    dishesPerRound: 5,
    intervalMinutes: 15,
    partialList: true,
    groups: [
      {
        title: "Sushi & maki",
        dishes: [
          "Maki saumon avocat",
          "Maki thon",
          "Maki saumon",
          "Maki shinko",
          "Kappa maki",
          "Maki avocat",
          "Roll poulet",
          "Tuna roll",
          "Alaska deluxe",
          "California thon cuit avocat",
          "Futo maki",
          "Surimi deluxe",
          "Temaki saumon avocat",
          "Temaki California",
          "Spicy tuna gunkan",
          "Spicy sake gunkan",
          "Gunkan tobiko",
          "Gunkan thon cuit",
          "Gunkan wakame",
          "Nigiri saumon",
          "Nigiri tamago",
          "Nigiri inari",
          "Nigiri surimi",
          "Nigiri avocat",
          "Nigiri hokki",
          "Nigiri ebi",
          "Nigiri ama ebi",
          "Nigiri tako",
        ],
      },
      {
        title: "Soupes, salades & entrées",
        dishes: [
          "Salade wakame",
          "Edamame",
          "Soupe miso",
          "Kimchi",
          "Salade de bœuf",
          "Salade de saumon",
          "Salade d’avocat",
          "Pinces de crabe",
          "Rouleaux de printemps",
          "Tempura de tofu",
          "Salade de tofu",
          "Chawanmushi",
          "Ebi frits (2 pièces)",
          "Beignets de calmars frits (3 pièces)",
          "Raviolis frits (3 pièces)",
          "Raviolis grillés (3 pièces)",
          "Kimchi au lard",
        ],
      },
      {
        title: "Plats chauds",
        dishes: [
          "Nouilles sautées au poulet",
          "Nouilles sautées au bœuf",
          "Riz sauté au poulet",
          "Riz sauté au bœuf",
          "Udon au bœuf",
          "Udon au poulet",
          "Boulettes de poisson grillées",
          "Cuisse de poulet frite",
          "Canard laqué",
          "Ailes de poulet au coca",
          "Teppanyaki bœuf",
          "Teppanyaki poulet",
          "Brochettes de poulet (2 pièces)",
          "Sake yaki",
          "Riz",
        ],
      },
    ],
    supplements: [
      { name: "Tataki thon", amount: 6 },
      { name: "Sashimi thon", amount: 6 },
      { name: "Tataki saumon", amount: 5 },
      { name: "Sashimi saumon", amount: 5 },
      { name: "Nigiri maguro", amount: 3 },
      { name: "Gunkan crabe", amount: 2 },
      { name: "Roll saumon cheese", amount: 5 },
      { name: "Ebi maki", amount: 4 },
      { name: "Roll anguille (2 pièces)", amount: 4 },
      { name: "Roll poulet mangue (2 pièces)", amount: 4 },
      { name: "Coquille Saint-Jacques", amount: 4 },
      { name: "Noix de Saint-Jacques grillées (2 pièces)", amount: 5 },
      { name: "Côtelettes d’agneau", amount: 9 },
      { name: "Mochi mangue", amount: 2.5 },
      { name: "Mochi thé vert", amount: 2.5 },
      { name: "Mochi vanille", amount: 2.5 },
    ],
  },
];

export const formulaById = (id: Formula["id"]) => formulas.find((f) => f.id === id)!;

/** Lowest and highest supplement, for compact summaries. */
export const supplementRange = (f: Formula) => {
  const amounts = f.supplements.map((s) => s.amount);
  return { min: Math.min(...amounts), max: Math.max(...amounts) };
};
