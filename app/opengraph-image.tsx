import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { heroContent } from '@/app/data/heroContent';

export const alt = 'Jay Wong — Solving digital complexity through design.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'nodejs';
export const dynamic = 'force-static';

const ogColors = {
  backgroundSecondary: '#f4f1ef',
  textPrimary: '#14110f',
  textSecondary: '#433b38',
  textTertiary: '#4e4641',
} as const;

export default async function OpenGraphImage() {
  const [interFont, portrait] = await Promise.all([
    readFile(path.join(process.cwd(), 'app/fonts/Inter-OG.ttf')),
    readFile(
      path.join(process.cwd(), 'public/assets/images/jw-notion-face-transparent.png'),
    ),
  ]);

  const portraitSrc = `data:image/png;base64,${portrait.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          background: ogColors.backgroundSecondary,
          color: ogColors.textPrimary,
          fontFamily: 'Inter',
          padding: '68px 76px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 48,
              lineHeight: 1.08,
              letterSpacing: '-0.045em',
              fontWeight: 500,
            }}
          >
            {heroContent.accessibleHeadline}
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 28,
              color: ogColors.textSecondary,
              fontSize: 22,
              lineHeight: 1.35,
              letterSpacing: '-0.025em',
            }}
          >
            {heroContent.tagline.replace(/^👋\s*/, '')}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 32,
              color: ogColors.textTertiary,
              fontSize: 24,
              letterSpacing: '-0.02em',
            }}
          >
            jaywong.digital
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={portraitSrc}
            alt=""
            width={360}
            height={371}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interFont,
          style: 'normal',
          weight: 500,
        },
      ],
    },
  );
}
