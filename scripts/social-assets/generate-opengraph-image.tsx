import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

import { readColorTokens } from './color-tokens';

// DESIGNER EDITING GUIDE
// This file is the editable source for the social preview artwork. Change the
// profile copy, type sizes, spacing, or SVG below, then run `npm run generate:og`
// to preview it. A normal `npm run build` also regenerates it automatically.

const size = { width: 1200, height: 630 };

// Keep the OG card as a stable introduction to the portfolio. It intentionally
// no longer follows the animated homepage hero, whose message changes more often.
const profile = {
  name: 'Jay Wong',
  role: 'Product Designer',
  url: 'jaywong.digital',
  location: 'Dubai, United Arab Emirates',
} as const;

// next/og cannot resolve the site's light-dark() CSS properties. Read the light
// theme primitives at generation time instead, keeping this PNG aligned whenever
// a designer tweaks the OKLCH system in global.css.
const colorTokenNames = {
  background: '--color-neutral-100',
  surface: '--color-neutral-300',
  textPrimary: '--color-steep-900',
  textSecondary: '--color-steep-300',
  textTertiary: '--color-steep-100',
  accent: '--color-orange-500',
} as const;

async function generateOpenGraphImage() {
  const tokenColors = await readColorTokens(Object.values(colorTokenNames));
  const colors = {
    background: tokenColors[colorTokenNames.background],
    surface: tokenColors[colorTokenNames.surface],
    textPrimary: tokenColors[colorTokenNames.textPrimary],
    textSecondary: tokenColors[colorTokenNames.textSecondary],
    textTertiary: tokenColors[colorTokenNames.textTertiary],
    accent: tokenColors[colorTokenNames.accent],
  } as const;
  
  function Monogram() {
    return (
      <svg
        viewBox="0 0 945 426"
        width="256"
        aria-hidden="true"
        style={{ color: colors.textPrimary }}
      >
        {/* The exact four paths used by the header brand mark. Embedding them
            avoids an external asset fetch while Next renders the social image. */}
        <g fill="currentColor">
          <path d="M249.1 425.2H179.6L347.3 65.5C365.9 25.5 406 0 450.1 0H519.6L351.8 359.7C333.2 399.7 293.1 425.2 249.1 425.2Z" />
          <path d="M461.6 425.2H392.1L559.9 65.5C578.5 25.5 618.6 0 662.7 0H732.2L564.4 359.7C545.8 399.7 505.7 425.2 461.6 425.2Z" />
          <path d="M674.2 425.2H604.7L772.5 65.5C791.1 25.5 831.2 0 875.3 0H944.8L777 359.7C758.4 399.7 718.3 425.2 674.2 425.2Z" />
          <path d="M70.9 425.2C110.057 425.2 141.8 393.457 141.8 354.3C141.8 315.143 110.057 283.4 70.9 283.4C31.743 283.4 0 315.143 0 354.3C0 393.457 31.743 425.2 70.9 425.2Z" />
        </g>
      </svg>
    );
  }
  
  async function renderOpenGraphImage() {
    // next/og needs static font files rather than the variable font used by the
    // website. Both are still Inter, so the artwork matches the site's typography.
    const [interRegular, interMedium] = await Promise.all([
      readFile(path.join(process.cwd(), 'app/fonts/Inter-OG-Regular.ttf')),
      readFile(path.join(process.cwd(), 'app/fonts/Inter-OG-Medium.ttf')),
    ]);
  
    const response = new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            background: colors.background,
            color: colors.textPrimary,
            fontFamily: 'Inter',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: colors.surface,
              overflow: 'hidden',
              padding: '80px',
            }}
          >
            {/* Border-top borrows the reference's strongest framing gesture,
                recolored with the portfolio's light-theme accent. */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: 14,
                background: colors.accent,
              }}
            />
  
            <Monogram />
  
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 'auto',
                gap: '20',
              }}
            >
              {/* 64 / 32 / 20px mirror Tailwind's 4px-rooted type rhythm and
                  create three clear levels, with metadata split by color below. */}
              <div
                style={{
                  display: 'flex',
                  fontSize: 72,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  fontWeight: 500,
                }}
              >
                {profile.name}
              </div>
  
              <div
                style={{
                  display: 'flex',
                  color: colors.textTertiary,
                  fontSize: 40,
                  lineHeight: 1.25,
                  letterSpacing: '-0.04em',
                }}
              >
                {profile.role}
              </div>
  
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 64,
                  color: colors.textSecondary,
                  fontSize: 32,
                  lineHeight: 1.4,
                  letterSpacing: '-0.03em',
                }}
              >
                <span style={{ color: colors.accent, fontWeight: 500 }}>{profile.url}</span>
                <span style={{ margin: '0px 12px' }}>•</span>
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: 'Inter',
            data: interRegular,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: interMedium,
            style: 'normal',
            weight: 500,
          },
        ],
      },
    );
  
    return Buffer.from(await response.arrayBuffer());
  }
  
  const png = await renderOpenGraphImage();
  const pngSignature = '89504e470d0a1a0a';
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  
  // Fail the build instead of silently publishing a missing or malformed preview.
  if (png.subarray(0, 8).toString('hex') !== pngSignature) {
    throw new Error('OG generation failed: next/og did not return a PNG.');
  }
  
  if (width !== size.width || height !== size.height) {
    throw new Error(
      `OG generation failed: expected ${size.width}×${size.height}, received ${width}×${height}.`,
    );
  }
  
  await writeFile(path.join(process.cwd(), 'public/opengraph-image.png'), png);
  
  console.log(
    `Generated public/opengraph-image.png (${width}×${height}) from current design tokens.`,
  );
}

generateOpenGraphImage().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
