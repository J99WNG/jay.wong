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

Static assets can be maintained with:

```bash
npm run assets:check
npm run assets:optimize
```

The check enforces lowercase file extensions, rejects OS metadata, and keeps individual assets below 5 MiB. The optimizer losslessly recompresses PNGs and applies an 85-quality MozJPEG pass to JPEGs.

## Project structure

- `app/` contains route entry points and route-private `_components/` folders.
- `components/layout/` contains the site shell and layout primitives.
- `components/home/` contains homepage-specific features.
- `components/case-study/` contains shared case-study navigation, metrics, media, and lightbox components.
- `components/ui/` contains reusable interface primitives and controls.
- `content/` contains site metadata and editorial content shared across routes.
- `public/assets/case-studies/` contains project-specific media; `brands/`, `profile/`, `about/`, `runtime/`, and `tools/` contain shared assets by role.
- `styles/global.css` is the active design-token source; `styles/motion.css` contains shared motion tokens.
- `docs/` contains shared iconography guidance, case-study handoff notes, and archived explorations. Files under `docs/archive/` are not production sources.

Pushes to `main` run asset checks, linting, type checking, and a production build before the GitHub Pages deployment in `.github/workflows/deploy.yml`.
