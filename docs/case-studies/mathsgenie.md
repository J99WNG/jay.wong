# MathsGenie design-system handoff

This document records the contract between the MathsGenie Figma library and the case-study implementation. It is written for designers and engineers reviewing component or token changes.

## System model

The case-study demo uses Tailwind's standard scales directly. This keeps the implementation legible and avoids a second component API inside the CSS module.

1. **Foundation** — The original MathsGenie OKLCH primary, neutral and status scales remain the source palette. Route-scoped aliases let conventional Tailwind colour utilities consume those values without replacing the brand system. Geist Sans is the body face; the route-local Geom class is reserved for component headings, strong titles and large CTAs at `text-xl` or above.
2. **Scale** — Layout favours spacing steps `2`, `3`, `4`, `5`, `6` and `8`; radius steps `lg`, `xl`, `2xl` and `full`; and Tailwind's named type sizes.
3. **Component** — buttons, inputs, cards, badges, alerts, segmented controls, navigation and sidebars compose those utilities in JSX.
4. **Pattern** — components combine into revision cards, next-step prompts, onboarding and reward flows.

Arbitrary-value utilities are excluded from the MathsGenie components. Add a named Tailwind theme utility when a repeated value is genuinely missing from the standard scale.

## Figma-to-code naming

Figma properties map directly to code-facing concepts:

| Figma property | Production concept | Values |
| --- | --- | --- |
| Mode | Theme | `light`, `dark` |
| Variant | Action hierarchy | `primary`, `secondary`, `tertiary`, `quaternary` |
| Size | Component size | `sm`, `md`, `lg`, `xl` |
| State | Interaction state | `rest`, `hover`, `focus`, `active`, `invalid`, `disabled` |

The original Figma button collection defines primary, secondary and tertiary variants. Quaternary remains the quietest role for low-priority actions. Each variant is a small Tailwind class composition rather than a CSS-module selector.

## Interaction and border roles

- Resting borders separate controls from their surface without competing with their label.
- Hover borders increase contrast together with the surface or text change.
- Focus uses a visible outline outside the component boundary and never relies on colour alone.
- Invalid fields pair the negative border with text or an icon that names the problem.
- Disabled controls keep their label readable, reduce emphasis and remove interactive affordances.
- Buttons and cards retain keyboard focus styles. Decorative icons use `aria-hidden`; icon-only controls require an accessible name.

## Feedback and validation

Positive, information, warning and negative feedback each have background, text and border roles. Static examples are ordinary list content. Live product feedback should use `role="status"` for non-urgent updates and `role="alert"` only when immediate interruption is justified.

## Motion

Interface feedback uses Tailwind's `duration-200`, `ease-out`, translate and scale utilities. Mascot playback still respects `prefers-reduced-motion`, viewport visibility and document visibility. Controls remain usable without animation, and motion is never the only state signal.

## Brand boundaries

MathsGenie, RevisionDojo and OnePrep share component anatomy, geometry, motion rhythm and interaction behavior. Each product keeps its own accent colour, curriculum language and mascot personality. Shared foundations reduce drift; local roles preserve the context students recognise.

## Review checklist

- Figma variant and production state names match.
- Component styles use named Tailwind utilities.
- Components do not introduce arbitrary-value utilities.
- Spacing, radius, type and motion stay on the reduced scale above.
- Hover, focus, active, invalid and disabled states are covered where relevant.
- Text and controls retain sufficient contrast in both themes.
- Keyboard order, accessible names and reduced-motion behavior are verified.
