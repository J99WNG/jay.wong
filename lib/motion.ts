/* Framer Motion uses seconds and numeric curves, so this tiny adapter mirrors
 * the CSS motion tokens in styles/motion.css for animated React components. */
export const motionDuration = {
  instant: 0.005,
  fast: 0.2,
  standard: 0.4,
  slow: 0.7,
} as const;

export const motionDelay = {
  short: 0.075,
  standard: 0.2,
} as const;

export const motionEase = {
  standard: [0.22, 1, 0.36, 1],
  spring: [0.34, 1.42, 0.64, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

/* Blur is part of the motion amplitude, not the static backdrop treatment. */
export const motionBlur = {
  none: 'blur(0px)',
  base: 'blur(2px)',
  standard: 'blur(4px)',
  strong: 'blur(8px)',
} as const;

export const motionStagger = {
  characters: 0.03,
  words: 0.05,
  items: 0.25,
} as const;

/* Shared rolling-slot motion used by the clock and rotating hero keyword. */
export const tickerTransition = {
  type: 'spring',
  visualDuration: 0.55,
  bounce: 0.18,
} as const;

export const tickerMask = `linear-gradient(to bottom,
  transparent 0%,
  black 24%,
  black 76%,
  transparent 100%)`;
