# Skeleton

Skeleton is a decorative loading placeholder for content whose final layout is predictable. It preserves space while data arrives, reducing layout shift and giving sighted users a preview of the incoming content structure.

## API

```tsx
import Skeleton from '@/components/ui/Skeleton';

<Skeleton className="h-5 w-48" />
```

`Skeleton` accepts standard non-interactive `div` attributes plus these properties:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `shape` | `'text' \| 'media' \| 'surface' \| 'circle'` | `'text'` | Selects a semantic radius that matches the content being represented. |
| `animated` | `boolean` | `true` | Enables the continuous shimmer. Set to `false` for a static placeholder. |
| `className` | `string` | — | Sets dimensions and layout or adds other presentation classes. |

The component always renders as a non-focusable, `aria-hidden` `div`. It does not accept `role`, `tabIndex`, or an `aria-hidden` override because individual placeholder shapes should not appear in the accessibility tree.

## Shape and radius

Choose the shape that represents the final component, then give the skeleton the same dimensions as that component.

| Shape | Radius | Use when representing |
| --- | --- | --- |
| `text` | `rounded-md` | Headings, labels, and text lines |
| `media` | `rounded-xl` | Images, thumbnails, and embedded media |
| `surface` | `rounded-2xl` | Cards and larger containers |
| `circle` | `rounded-full` | Avatars, icons, and circular controls |

```tsx
<div className="flex items-center gap-3">
  <Skeleton shape="circle" className="size-11 shrink-0" />
  <div className="grid flex-1 gap-2">
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-4 w-1/2" />
  </div>
</div>
```

## Themes and motion

The base and shimmer colors use semantic tokens, so they follow system, light, and dark themes automatically. The shimmer loops continuously by default. It is removed when the operating system requests reduced motion, and consumers can disable it for a specific composition with `animated={false}`.

Continuous automatic motion lasting longer than five seconds can require a pause, stop, or hide mechanism under [WCAG 2.2.2: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG20/Understanding/pause-stop-hide.html). For stricter compliance requirements, use static skeletons or provide a loading-level motion control.

## Accessible loading regions

Skeletons are decorative. Announce the loading state once, outside the busy region, and mark the region itself with `aria-busy`. Do not add a status or label to every placeholder.

```tsx
<>
  <p id="projects-loading-status" className="sr-only" role="status">
    {isLoading ? 'Loading projects' : 'Projects loaded'}
  </p>

  <section
    aria-busy={isLoading}
    aria-describedby={isLoading ? 'projects-loading-status' : undefined}
  >
    {isLoading ? (
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="grid gap-4">
            <Skeleton shape="media" className="aspect-[4/3] w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    ) : (
      <ProjectGrid projects={projects} />
    )}
  </section>
</>
```

The loading message uses `role="status"`, which provides a polite live-region announcement without moving focus. `aria-busy="true"` tells assistive technology that the region is still being updated. See the [WAI-ARIA `status` and `aria-busy` definitions](https://www.w3.org/TR/wai-aria/states_and_properties) for the underlying behavior.

Skeleton colors do not need to meet text contrast ratios because the shapes carry no semantic information. They should still remain visibly distinct from the page background in both themes.

## Choosing the right indicator

- Use a skeleton when the final content structure and dimensions are known.
- Use a spinner for an indeterminate action whose result has no predictable layout.
- Use progress when completion is measurable or the operation may take a long time.
- Delay skeleton display briefly for very fast requests so the interface does not flash between states.
- Keep placeholder and final-content dimensions aligned to avoid layout shift.
