# jaywong.digital

Jay Wong's portfolio, built with Next.js, React, Tailwind CSS, and Framer Motion. The site is statically exported and deployed to GitHub Pages.

## Requirements

- Node.js 20.9 or newer
- npm

## Local development

```bash
npm ci
npm run dev
```

The development server listens on all local interfaces. Set `ALLOWED_DEV_ORIGINS` to a comma-separated list when testing from additional devices on the local network.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

The static production export is written to `out/`. Generated output, dependency folders, local environment files, and editor files are excluded from version control.

## Project structure

- `app/` contains routes, metadata, local fonts, and content data.
- `components/layout/` contains site-wide navigation and footer components.
- `components/sections/` contains page-level sections.
- `components/ui/` contains reusable interface components.
- `public/assets/` contains images, logos, Rive files, and its runtime.
- `styles/` contains the global design system and icon styles.

Pushes to `main` run the GitHub Pages deployment workflow in `.github/workflows/deploy.yml`.
