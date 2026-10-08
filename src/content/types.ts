export type DietLabel = "Végétarien" | "Végétalien";

export type MenuItem = {
  id: string;
  /** Number printed on the restaurant's menu (e.g. "31", "J60", "C92"). */
  number?: string;
  name: string;
  /** Japanese name exactly as printed on the official menu. */
  japanese?: string;
  description?: string;
  /** Composition lines for platters and bentos. */
  lines?: string[];
  pieces?: number;
  portion?: string;
  /** Price in CHF. `null` when the official menu publishes no price. */
  price?: number | null;
  /** Used instead of `price` when a dish has several formats. */
  prices?: { label: string; amount: number }[];
  /** Only labels published by the restaurant itself. */
  labels?: DietLabel[];
  /** Marked "À l'affiche" on the official menu. */
  featured?: boolean;
  /** Original wording on the official menu, kept for owner review. */
  sourceName?: string;
};

export type MenuSection = {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
};

export type MenuCategory = {
  id: string;
  title: string;
  intro: string;
  sections: MenuSection[];
};
