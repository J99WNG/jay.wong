import Image from 'next/image';

// Desktop positions create a compact triangular cluster. The shared mobile
// classes below replace every item with normal document flow at 640px.
const brands = [
  {
    name: 'MathsGenie',
    logo: '/assets/images/mathsgenie/brands/mathsgenie.svg',
    width: 329,
    position: 'top-0 left-0 w-[46%]',
    delay: '0s',
  },
  {
    name: 'RevisionDojo',
    logo: '/assets/images/mathsgenie/brands/revisiondojo.svg',
    width: 256,
    position: 'top-2.5 right-0 w-[42%]',
    delay: '-1.8s',
  },
  {
    name: 'OnePrep',
    logo: '/assets/images/mathsgenie/brands/oneprep.svg',
    width: 270,
    position: 'bottom-0 left-1/2 w-[43%] -translate-x-1/2',
    delay: '-3.6s',
  },
] as const;

// Each principle owns its canvas position. Keeping these values beside the
// copy makes future diagram edits possible without tracing CSS selectors.
const principles = [
  { label: 'Character-led', position: 'top-[13%] left-[8%]', delay: '0s' },
  { label: 'Geometric', position: 'top-[13%] right-[8%]', delay: '-.8s' },
  { label: 'Playful', position: 'top-[49%] right-[4%]', delay: '-1.6s' },
  { label: 'Habit-forming', position: 'right-[14%] bottom-[10%]', delay: '-2.4s' },
  { label: 'Springy motion', position: 'bottom-[11%] left-[10%]', delay: '-3.2s' },
] as const;

export function BrandLanguageFigure() {
  return (
    <figure
      className="my-2 overflow-hidden rounded-[20px] border border-[var(--color-border-muted)]"
      style={{
        // A light workshop grid belongs only to this figure, so it stays here.
        backgroundColor: 'var(--mg-neutral-100)',
        backgroundImage: [
          'linear-gradient(color-mix(in srgb, var(--mg-primary-500) 13%, transparent) 1px, transparent 1px)',
          'linear-gradient(90deg, color-mix(in srgb, var(--mg-primary-500) 13%, transparent) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '32px 32px',
      }}
    >
      <figcaption className="sr-only">
        Three General Learning platforms grouped with shared geometry, character and interaction principles.
      </figcaption>

      <div className="relative isolate min-h-[520px] max-[640px]:grid max-[640px]:min-h-0 max-[640px]:gap-5 max-[640px]:p-6">
        {/* Logos cluster on desktop and return to a simple stack on mobile. */}
        <ul
          className="absolute top-1/2 left-1/2 z-[1] m-0 h-44 w-[min(58%,480px)] -translate-x-1/2 -translate-y-1/2 list-none p-0 max-[640px]:relative max-[640px]:top-auto max-[640px]:left-auto max-[640px]:mx-auto max-[640px]:my-5 max-[640px]:h-auto max-[640px]:w-[min(72%,260px)] max-[640px]:translate-x-0 max-[640px]:translate-y-0"
          aria-label="General Learning product family"
          role="list"
        >
          {brands.map((brand) => (
            <li
              key={brand.name}
              className={`absolute min-w-0 max-[640px]:static max-[640px]:w-full max-[640px]:translate-x-0 max-[640px]:[&+li]:mt-5 ${brand.position}`}
            >
              <Image
                className="block h-auto max-h-16 w-full object-contain motion-safe:animate-[mathsgenie-brand-logo-float_5.4s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
                style={{ animationDelay: brand.delay }}
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={brand.width}
                height={64}
              />
            </li>
          ))}
        </ul>

        {/* Principle pills are spatial labels; their list order remains logical for assistive technology. */}
        <ul
          className="m-0 list-none p-0 max-[640px]:flex max-[640px]:flex-wrap max-[640px]:justify-center max-[640px]:gap-2"
          aria-label="Shared design language"
          role="list"
        >
          {principles.map((principle) => (
            <li
              key={principle.label}
              className={`absolute z-[2] grid min-h-[42px] place-items-center whitespace-nowrap rounded-full border px-3.5 py-[9px] text-[13px] font-semibold motion-safe:animate-[mathsgenie-brand-node-float_4.8s_ease-in-out_infinite_alternate] motion-reduce:animate-none max-[640px]:static max-[640px]:animate-none ${principle.position}`}
              style={{
                animationDelay: principle.delay,
                backgroundColor: 'var(--mg-neutral-50)',
                borderColor: 'var(--mg-neutral-300)',
                boxShadow: '0 8px 24px color-mix(in srgb, var(--mg-neutral-900) 12%, transparent)',
                color: 'var(--mg-neutral-800)',
              }}
            >
              {principle.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Keyframes are intentionally local to this one-off case-study figure. */}
      <style>{`
        @keyframes mathsgenie-brand-node-float {
          from { transform: translateY(-3px); }
          to { transform: translateY(4px); }
        }

        @keyframes mathsgenie-brand-logo-float {
          from { transform: translateY(-2px) rotate(-0.35deg); }
          to { transform: translateY(3px) rotate(0.35deg); }
        }
      `}</style>
    </figure>
  );
}
