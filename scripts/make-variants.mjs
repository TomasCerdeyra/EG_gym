// Produce a small variant of every photograph, so a phone downloads and
// decodes a fraction of what a desktop does. The originals stay as the large
// source; these are referenced through srcset.
// Run with: node scripts/make-variants.mjs
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { resolve, join } from "node:path";

const DIR = resolve(process.cwd(), "src/assets");
const QUALITY = 78;

// Full-bleed photographs need a middle step: a 414px viewport at devicePixel
// Ratio 3 asks for 1242px, and a browser picks the smallest candidate at or
// above that. With only 800 and 2400 to choose from it would take the 2400.
const FULL_BLEED = new Set(["eg-02.jpg", "eg-05.jpg"]);

const files = (await readdir(DIR)).filter((f) => /^eg-\d+\.jpg$/.test(f));

for (const file of files) {
  const src = join(DIR, file);
  const widths = FULL_BLEED.has(file) ? [800, 1400] : [800];

  for (const w of widths) {
    await sharp(src)
      .resize({ width: w, height: w, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(join(DIR, file.replace(/\.jpg$/, `-${w}.jpg`)));
  }

  const out = join(DIR, file.replace(/\.jpg$/, "-800.jpg"));

  const before = (await stat(src)).size;
  const after = (await stat(out)).size;
  const meta = await sharp(out).metadata();
  console.log(
    `${file}  ${(before / 1024).toFixed(0)}KB -> ${meta.width}x${meta.height} ` +
      `${(after / 1024).toFixed(0)}KB  (-${Math.round((1 - after / before) * 100)}%)`,
  );
}
