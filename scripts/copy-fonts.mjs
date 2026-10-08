// Copies the self-hosted font files from @fontsource into src/app/fonts so
// next/font/local can subset-free preload them. Run after `npm install`
// whenever the font packages are updated: `npm run fonts`.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "src/app/fonts");
mkdirSync(out, { recursive: true });

const files = [
  [
    "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2",
    "cormorant-garamond-latin-500-normal.woff2",
  ],
  [
    "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2",
    "cormorant-garamond-latin-500-italic.woff2",
  ],
  [
    "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2",
    "cormorant-garamond-latin-600-normal.woff2",
  ],
  [
    "@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
    "manrope-latin-wght-normal.woff2",
  ],
];

for (const [from, to] of files) {
  copyFileSync(join(root, "node_modules", from), join(out, to));
  console.log(`fonts: ${to}`);
}
