import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Jay Wong — Product Designer in Dubai, United Arab Emirates.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'nodejs';
export const dynamic = 'force-static';

// Keep the OG card as a stable introduction to the portfolio. It intentionally
// no longer follows the animated homepage hero, whose message changes more often.
const profile = {
  name: 'Jay Wong',
  role: 'Product Designer',
  url: 'jaywong.digital',
  location: 'Dubai, United Arab Emirates',
} as const;

// These are static equivalents of the light-theme tokens in styles/global.css.
// Satori cannot resolve the site's light-dark() custom properties at build time.
const colors = {
  background: '#f9f8f8',
  surface: '#f4f1ef',
  textPrimary: '#14110f',
  textSecondary: '#342f2c',
  textTertiary: '#4d4642',
  accent: '#b55e43',
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

export default async function OpenGraphImage() {
  // The renderer cannot parse the site's variable Inter file. This static
  // Inter face is reliable in Satori; lowercase copy stays within its glyph set.
  const interFont = await readFile(
    path.join(process.cwd(), 'app/fonts/Inter-OG.ttf'),
  );

  return new ImageResponse(
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
              top: 0,
              left: 0,
              width: '100%',
              height: 16,
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
                letterSpacing: '-0.04em',
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
                letterSpacing: '-0.025em',
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
                letterSpacing: '-0.015em',
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
          data: interFont,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
