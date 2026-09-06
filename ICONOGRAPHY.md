# Iconography

## Principles

- Use `Icon` for interface actions, statuses, and supporting concepts.
- Use Lucide's canonical names in kebab-case, such as `arrow-up-right` or `users-round`.
- Use `BrandMark` for company marks. Tool and client logos are content, not interface icons.
- Prefer visible text. An icon-only control needs an accessible name on the button or link.
- Icons beside visible text are decorative and hidden from assistive technology by default.
- Do not paste raw SVG into product components or load an icon font.

## Sizes

| Token | Size | Use |
| --- | ---: | --- |
| `sm` | 16px | Inline arrows and compact controls |
| `md` | 24px | Default controls and status icons |
| `lg` | 32px | Prominent actions |
| `xl` | 48px | Editorial or feature illustration only |

The visual target should remain at least 3:1 against adjacent colors where the icon conveys meaning. Interactive hit targets are controlled by the parent: aim for 44×44px and never go below the WCAG 2.2 AA 24×24px minimum unless a documented exception applies.

## Examples

```tsx
<Icon name="arrow-right" size="sm" motion="right" />

<button aria-label="Close gallery">
  <Icon name="x" />
</button>

<Icon name="check" label="Complete" />

<BrandMark src="/assets/logos/bp-helios-colour.svg" />
```

## Adding an icon

Add it to the private registry in `components/ui/Icon.tsx` using the Lucide component name converted to kebab-case. Reuse an existing glyph before adding a near-duplicate. Brand-specific artwork does not belong in this registry.
