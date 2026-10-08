// Crops, grades and resizes the official originals (./media-src) into
// ./public/images according to scripts/image-plan.mjs. Next/Image then serves
// AVIF/WebP variants at the widths each layout asks for.
import { mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { outputs, sources } from "./image-plan.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "media-src");
const outDir = join(root, "public/images");
mkdirSync(outDir, { recursive: true });

const results = [];
for (const job of outputs) {
  const file = join(srcDir, sources[job.from].replace(/~/g, "_"));
  if (!existsSync(file))
    throw new Error(`Missing original for ${job.from}: run scripts/fetch-originals.mjs`);
  let img = sharp(file).rotate(); // apply EXIF orientation

  if (job.cutout) {
    img = img.ensureAlpha().trim({ threshold: 1 });
    // High-quality WebP keeps the alpha channel at a fraction of PNG weight;
    // Next/Image re-encodes it for visitors anyway.
    const buf = await img.webp({ quality: 92, alphaQuality: 100, effort: 6 }).toBuffer();
    const { width, height } = await sharp(buf).metadata();
    await sharp(buf).toFile(join(outDir, job.out));
    results.push({ out: job.out, width, height });
    continue;
  }

  if (job.crop) img = img.extract(job.crop);
  if (job.width) img = img.resize({ width: job.width, withoutEnlargement: true });
  if (job.grade === "night") {
    // Gentle grade: slightly lower saturation (tames the blue LED strip),
    // a touch warmer and a little lift in the shadows. No content change.
    img = img.modulate({ saturation: 0.9, brightness: 1.02 }).linear([1.04, 1.0, 0.93], [3, 0, -3]);
  }
  img = img
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" });
  const info = await img.toFile(join(outDir, job.out));
  results.push({ out: job.out, width: info.width, height: info.height });
}

for (const r of results) console.log(`${r.out.padEnd(32)} ${r.width}×${r.height}`);
