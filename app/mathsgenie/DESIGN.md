# MathsGenie design-system handoff

This document records the contract between the MathsGenie Figma library and the case-study implementation. It is written for designers and engineers reviewing component or token changes.

## System model

The system follows four layers:

1. **Primitive** — palette, type, spacing, radius and motion values. Colour primitives use OKLCH so lightness and chroma can be adjusted predictably.
2. **Semantic** — stable roles such as `action.primary.background`, `text.secondary`, `surface.raised` and `border.validation.negative`.
3. **Component** — buttons, inputs, cards, badges, alerts, segmented controls, navigation and sidebars.
4. **Pattern** — assembled learning experiences such as revision cards, next-step prompts, onboarding and reward flows.

Components must consume semantic roles. A raw palette value should appear only in the primitive declaration block.

## Figma-to-code naming

Figma properties map directly to code-facing concepts:

| Figma property | Production concept | Values |
| --- | --- | --- |
| Mode | Theme | `light`, `dark` |
| Variant | Action hierarchy | `primary`, `secondary`, `tertiary`, `quaternary` |
| Size | Component size | `sm`, `md`, `lg`, `xl` |
| State | Interaction state | `rest`, `hover`, `focus`, `active`, `invalid`, `disabled` |

The original Figma button collection defines primary, secondary and tertiary variants. Quaternary is the quietest production role for low-priority actions and uses a muted border and text treatment.

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

Mascot and interface motion use shared duration and easing tokens. Spring-like movement should acknowledge an action, reinforce progress or connect two states. Respect `prefers-reduced-motion`, keep controls usable when animation is absent, and avoid making motion the only signal of a state change.

## Brand boundaries

MathsGenie, RevisionDojo and OnePrep share component anatomy, geometry, motion rhythm and interaction behavior. Each product keeps its own accent colour, curriculum language and mascot personality. Shared foundations reduce drift; local roles preserve the context students recognise.

## Review checklist

- Figma variant and production state names match.
- Component styles use semantic tokens.
- New palette values are expressed in OKLCH and documented as primitives.
- Hover, focus, active, invalid and disabled states are covered where relevant.
- Text and controls retain sufficient contrast in both themes.
- Keyboard order, accessible names and reduced-motion behavior are verified.
