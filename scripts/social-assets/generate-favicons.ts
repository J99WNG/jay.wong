import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

import { readColorTokens } from './color-tokens';

const projectRoot = process.cwd();
const publicDirectory = path.join(projectRoot, 'public');

// DESIGNER EDITING GUIDE
// The favicon palette follows these two existing design tokens. Tweak their
// OKLCH values in global.css, then run `npm run generate:favicons` (or build).
// Every SVG, PNG and ICO below is regenerated from the same colors and geometry.
const lightToken = '--color-neutral-100';
const darkToken = '--color-steep-900';
// This single value controls both the visible tile and its clipping boundary.
const faviconRadius = 72;

async function generateFavicons() {
  const tokenColors = await readColorTokens([lightToken, darkToken] as const);
  const lightColor = tokenColors[lightToken];
  const darkColor = tokenColors[darkToken];
  
  type FaviconOptions = {
    background: string;
    foreground: string;
    adaptive?: boolean;
  };
  
  function createFaviconSvg({ background, foreground, adaptive = false }: FaviconOptions) {
    const themeStyles = adaptive
      ? `
        /* Favicons are separate documents, so they cannot see the website's
           .light/.dark class. The operating-system preference is the reliable
           standards-based signal available inside an external SVG favicon. */
        @media (prefers-color-scheme: light) {
          .background { fill: ${lightColor}; }
          .monogram { fill: ${darkColor}; }
        }
      `
      : '';
  
    return `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="favicon-title">
    <!-- Browsers do not expose link icons in the accessibility tree. The title
         still gives the SVG a useful name if it is opened or embedded directly. -->
    <title id="favicon-title">Jay Wong monogram</title>
    <defs>
      <style>${themeStyles}</style>
      <clipPath id="favicon-frame">
        <rect width="512" height="512" rx="${faviconRadius}" />
      </clipPath>
      <clipPath id="monogram-frame">
        <rect width="320" height="144" transform="translate(96 184)" />
      </clipPath>
    </defs>
    <g clip-path="url(#favicon-frame)">
      <!-- Explicit fills keep raster generators and legacy SVG viewers aligned.
           The adaptive SVG's media query overrides these dark-theme defaults. -->
      <rect class="background" width="512" height="512" rx="${faviconRadius}" fill="${background}" />
      <g class="monogram" clip-path="url(#monogram-frame)" fill="${foreground}">
        <path d="M180.369 328H156.83L213.629 206.183C219.929 192.636 233.511 184 248.447 184H271.986L215.153 305.817C208.854 319.364 195.272 328 180.369 328Z" />
        <path d="M252.342 328H228.803L285.636 206.183C291.936 192.636 305.517 184 320.454 184H343.993L287.16 305.817C280.86 319.364 267.279 328 252.342 328Z" />
        <path d="M324.349 328H300.81L357.643 206.183C363.942 192.636 377.524 184 392.461 184H416L359.167 305.817C352.867 319.364 339.285 328 324.349 328Z" />
        <path d="M120.014 328C133.276 328 144.027 317.25 144.027 303.989C144.027 290.728 133.276 279.978 120.014 279.978C106.751 279.978 96 290.728 96 303.989C96 317.25 106.751 328 120.014 328Z" />
      </g>
    </g>
  </svg>`;
  }
  
  const adaptiveSvg = createFaviconSvg({
    background: darkColor,
    foreground: lightColor,
    adaptive: true,
  });
  const lightSvg = createFaviconSvg({
    background: lightColor,
    foreground: darkColor,
  });
  const darkSvg = createFaviconSvg({
    background: darkColor,
    foreground: lightColor,
  });
  
  const [lightPng, darkPng] = await Promise.all([
    sharp(Buffer.from(lightSvg)).png().toBuffer(),
    sharp(Buffer.from(darkSvg)).png().toBuffer(),
  ]);
  
  // ICO has no light/dark media-query support. Use the dark, high-contrast tile as
  // the predictable legacy fallback, while modern clients receive themed assets.
  const icoPng = await sharp(darkPng).resize(256, 256).png().toBuffer();
  const icoHeader = Buffer.alloc(22);
  icoHeader.writeUInt16LE(0, 0);
  icoHeader.writeUInt16LE(1, 2);
  icoHeader.writeUInt16LE(1, 4);
  icoHeader.writeUInt16LE(1, 10);
  icoHeader.writeUInt16LE(32, 12);
  icoHeader.writeUInt32LE(icoPng.length, 14);
  icoHeader.writeUInt32LE(22, 18);
  
  await Promise.all([
    writeFile(path.join(publicDirectory, 'favicon.svg'), adaptiveSvg),
    writeFile(path.join(publicDirectory, 'favicon-light.png'), lightPng),
    writeFile(path.join(publicDirectory, 'favicon-dark.png'), darkPng),
    // Apple touch icons do not support light/dark media switching, so use the
    // same high-contrast fallback as older messaging clients.
    writeFile(path.join(publicDirectory, 'apple-touch-icon.png'), darkPng),
    writeFile(path.join(publicDirectory, 'favicon.ico'), Buffer.concat([icoHeader, icoPng])),
  ]);
  
  console.log(`Generated favicon family from ${lightToken} ${lightColor} and ${darkToken} ${darkColor}.`);
}

generateFavicons().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
