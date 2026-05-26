/**
 * optimize-images.mjs
 * Convert all PNG/JPG images in public/ to WebP with quality presets.
 * Creates .webp siblings next to originals (originals are kept).
 * Run: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";

const DIRS = ["public/heroimages", "public/images/gallery"];
const HERO_QUALITY = 78;      // hero images: balance quality vs size
const GALLERY_QUALITY = 80;
const MAX_WIDTH = 1920;        // cap width for hero images (mobile-first)

async function* walkPngs(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) yield* walkPngs(full);
    else if (/\.(png|jpe?g)$/i.test(e.name)) yield full;
  }
}

let totalSaved = 0;
let count = 0;

for (const dir of DIRS) {
  const isHero = dir.includes("heroimages");
  const quality = isHero ? HERO_QUALITY : GALLERY_QUALITY;

  for await (const file of walkPngs(dir)) {
    const outFile = file.replace(/\.(png|jpe?g)$/i, ".webp");
    const origStat = await stat(file);
    const origKB = origStat.size / 1024;

    try {
      let pipeline = sharp(file);

      // Resize hero images to max width (they don't need to be 4K)
      if (isHero) {
        const meta = await sharp(file).metadata();
        if (meta.width > MAX_WIDTH) {
          pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
        }
      }

      await pipeline
        .webp({ quality, effort: 6 })
        .toFile(outFile);

      const newStat = await stat(outFile);
      const newKB = newStat.size / 1024;
      const saved = origKB - newKB;
      totalSaved += saved;
      count++;

      console.log(
        `✓ ${basename(file)} ${origKB.toFixed(0)}KB → ${newKB.toFixed(0)}KB WebP (−${((saved / origKB) * 100).toFixed(0)}%)`
      );
    } catch (err) {
      console.error(`✗ ${basename(file)}: ${err.message}`);
    }
  }
}

console.log(`\nDone: ${count} images converted, ${(totalSaved / 1024).toFixed(1)}MB saved`);
