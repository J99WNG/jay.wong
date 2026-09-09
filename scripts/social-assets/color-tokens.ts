import { readFile } from 'node:fs/promises';
import path from 'node:path';

type Oklch = {
  lightness: number;
  chroma: number;
  hue: number;
};

const tokenFile = path.join(process.cwd(), 'styles/global.css');

function readOklchValue(css: string, tokenName: string): Oklch {
  const escapedName = tokenName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(
    new RegExp(`${escapedName}:\\s*oklch\\(\\s*([\\d.]+)\\s+([\\d.]+)\\s+([\\d.]+)\\s*\\)`),
  );

  if (!match) {
    throw new Error(`Social asset generation failed: ${tokenName} must use oklch(L C H).`);
  }

  return {
    lightness: Number(match[1]),
    chroma: Number(match[2]),
    hue: Number(match[3]),
  };
}

// PNG, ICO and next/og need sRGB values. This converts the OKLCH source tokens
// at build time, so generated assets remain visually aligned with the website.
function oklchToHex({ lightness, chroma, hue }: Oklch) {
  const radians = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(radians);
  const b = chroma * Math.sin(radians);

  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;

  const linearRgb = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];

  const toSrgb = (channel: number) => {
    const value = channel <= 0.0031308
      ? 12.92 * channel
      : 1.055 * channel ** (1 / 2.4) - 0.055;

    return Math.round(Math.min(1, Math.max(0, value)) * 255);
  };

  return `#${linearRgb
    .map(toSrgb)
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('')}`;
}

export async function readColorTokens<const Names extends readonly string[]>(
  tokenNames: Names,
): Promise<Record<Names[number], string>> {
  const css = await readFile(tokenFile, 'utf8');

  return Object.fromEntries(
    tokenNames.map((tokenName) => [tokenName, oklchToHex(readOklchValue(css, tokenName))]),
  ) as Record<Names[number], string>;
}
