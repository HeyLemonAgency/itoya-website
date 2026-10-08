// Downloads the original, full-resolution photographs from the official
// itoya.ch media library into ./media-src (git-ignored). The IDs and their
// intended use are listed in docs/ASSET_MANIFEST.md.
//   node scripts/fetch-originals.mjs
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { sources } from "./image-plan.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "media-src");
mkdirSync(dir, { recursive: true });

for (const id of new Set(Object.values(sources))) {
  const file = join(dir, id.replace(/~/g, "_"));
  if (existsSync(file)) continue;
  const url = id.startsWith("video/")
    ? `https://video.wixstatic.com/${id}`
    : `https://static.wixstatic.com/media/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  console.log(`fetched ${id}`);
}
