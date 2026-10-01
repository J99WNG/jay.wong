import localFont from 'next/font/local';

// Route-local display face for MathsGenie specimens. Importing this generated
// class keeps Geom out of the site-wide Tailwind theme and case-study headings.
export const mathsGenieDisplay = localFont({
  src: '../fonts/Geom-Variable.woff2',
  variable: '--font-geom',
  weight: '300 900',
  display: 'swap',
});
