// Re-encode the imported photos for the web.
// Full-bleed backgrounds keep more pixels than gallery thumbnails, because a
// 100dvh section upscales anything narrower than the viewport and the result
// looks visibly soft. Run with: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { resolve, join } from "node:path";

const DIR = resolve(process.cwd(), "src/assets");

// Files used as full-viewport backgrounds.
const FULL_BLEED = new Set(["eg-02.jpg", "eg-05.jpg", "eg-12.jpg", "eg-09.jpg"]);
const CAP_FULL_BLEED = 2400;
const CAP_THUMB = 1200;
const QUALITY = 82;

const files = (await readdir(DIR)).filter((f) => /^eg-\d+\.jpg$/.test(f));

for (const file of files) {
  const path = join(DIR, file);
  const before = (await stat(path)).size;
  const cap = FULL_BLEED.has(file) ? CAP_FULL_BLEED : CAP_THUMB;
  const tmp = path + ".tmp";

  await sharp(path)
    .rotate()
    .resize({ width: cap, height: cap, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(tmp);

  const after = (await stat(tmp)).size;
  if (after < before) {
    await unlink(path);
    await rename(tmp, path);
  } else {
    await unlink(tmp);
  }

  const meta = await sharp(path).metadata();
  const finalSize = (await stat(path)).size;
  console.log(
    `${file}  ${meta.width}x${meta.height}  ${(finalSize / 1024).toFixed(0)}KB  ` +
      `(cap ${cap}${after < before ? "" : ", kept original"})`,
  );
}
