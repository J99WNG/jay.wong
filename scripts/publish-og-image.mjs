import { copyFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const renderedImage = path.join(projectRoot, 'out/og-image-source');
const publicImage = path.join(projectRoot, 'public/opengraph-image.png');
const exportedImage = path.join(projectRoot, 'out/opengraph-image.png');

// Next renders the editable source route during its normal static build. This
// tiny post-build step gives those same PNG bytes a real .png filename, which
// lets GitHub Pages send the image/png MIME type expected by messaging apps.
const png = await readFile(renderedImage);
const pngSignature = '89504e470d0a1a0a';
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);

// Fail loudly instead of publishing an unreadable or accidentally resized card.
if (png.subarray(0, 8).toString('hex') !== pngSignature) {
  throw new Error('OG generation failed: the source route did not render a PNG.');
}

if (width !== 1200 || height !== 630) {
  throw new Error(`OG generation failed: expected 1200×630, received ${width}×${height}.`);
}

// Update both places: public/ keeps the generated artwork for the next local
// run, while out/ is the exact file uploaded by the GitHub Pages workflow.
await Promise.all([
  copyFile(renderedImage, publicImage),
  copyFile(renderedImage, exportedImage),
]);

console.log('Published public/opengraph-image.png (1200×630).');
