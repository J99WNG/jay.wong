import { readdir, rename, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const assetRoot = path.join(process.cwd(), 'public', 'assets');
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png']);
let bytesSaved = 0;
let imagesOptimized = 0;

async function optimizeDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await optimizeDirectory(entryPath);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (!supportedExtensions.has(extension)) continue;

    const temporaryPath = `${entryPath}.optimized`;
    const pipeline = sharp(entryPath).rotate();

    if (extension === '.png') {
      await pipeline.png({ compressionLevel: 9, effort: 10 }).toFile(temporaryPath);
    } else {
      await pipeline.jpeg({ quality: 85, mozjpeg: true }).toFile(temporaryPath);
    }

    const [originalStats, optimizedStats] = await Promise.all([
      stat(entryPath),
      stat(temporaryPath),
    ]);

    if (optimizedStats.size < originalStats.size) {
      await rename(temporaryPath, entryPath);
      bytesSaved += originalStats.size - optimizedStats.size;
      imagesOptimized += 1;
    } else {
      await unlink(temporaryPath);
    }
  }
}

await optimizeDirectory(assetRoot);
console.log(`Optimized ${imagesOptimized} images and saved ${(bytesSaved / 1024 / 1024).toFixed(2)} MiB.`);
