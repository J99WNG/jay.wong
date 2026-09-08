# Iconography

## Principles

- Import interface icons directly from `lucide-react` using Lucide's PascalCase component names.
- Import only the glyphs a component renders; do not maintain a parallel icon registry.
- Use `BrandMark` for company marks. Tool and client logos are content, not interface icons.
- Prefer visible text. An icon-only control needs an accessible name on the button or link.
- Icons beside visible text are decorative and hidden from assistive technology by default.
- Do not paste raw SVG into product components or load an icon font.

Use Lucide's `size` prop directly; omit it when the 24px default is appropriate. The visual target should remain at least 3:1 against adjacent colors where the icon conveys meaning. Interactive hit targets are controlled by the parent: aim for 44×44px and never go below the WCAG 2.2 AA 24×24px minimum unless a documented exception applies.

## Examples

```tsx
import { ArrowRight, X } from 'lucide-react';

<ArrowRight aria-hidden="true" size={16} className="motion-icon-right" />

<button aria-label="Close gallery">
  <X aria-hidden="true" />
</button>

<BrandMark src="/assets/logos/bp-helios-colour.svg" />
```

## Adding an icon

Import the Lucide component directly where it is used. Reuse an existing glyph before introducing a near-duplicate, and keep accessible product language on the parent control rather than deriving it from the component name. Brand-specific artwork belongs in `BrandMark`, not Lucide.
