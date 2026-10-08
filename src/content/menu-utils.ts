import { menu } from "./menu";
import type { MenuCategory, MenuItem, MenuSection } from "./types";

type Located = { item: MenuItem; section: MenuSection; category: MenuCategory };

const index = new Map<string, Located>();
for (const category of menu) {
  for (const section of category.sections) {
    for (const item of section.items) index.set(item.id, { item, section, category });
  }
}

/** Look up a dish by id; throws at build time if a featured dish disappears. */
export function getDish(id: string): Located {
  const found = index.get(id);
  if (!found) throw new Error(`Unknown menu item "${id}" — check src/content/menu.ts`);
  return found;
}

export const menuItemCount = index.size;
