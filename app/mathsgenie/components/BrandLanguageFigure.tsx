import Image from 'next/image';

const brands = [
  { name: 'MathsGenie', logo: '/assets/images/mathsgenie/brands/mathsgenie.svg', width: 329 },
  { name: 'RevisionDojo', logo: '/assets/images/mathsgenie/brands/revisiondojo.svg', width: 256 },
  { name: 'OnePrep', logo: '/assets/images/mathsgenie/brands/oneprep.svg', width: 270 },
] as const;

const principles = [
  { label: 'Character-led', position: 'top-6 left-6' },
  { label: 'Geometric', position: 'top-6 right-6' },
  { label: 'Playful', position: 'top-1/2 right-6' },
  { label: 'Habit-forming', position: 'right-12 bottom-6' },
  { label: 'Springy motion', position: 'bottom-6 left-12' },
] as const;

const logoClass = 'block h-12 w-auto max-w-none object-contain transition duration-200 hover:-translate-y-1 hover:scale-105 hover:drop-shadow-lg';
const pillClass = 'rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg transition duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-xl';

export function BrandLanguageFigure() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-border-muted bg-slate-100 font-sans">
      <figcaption className="sr-only">Three General Learning platforms grouped with shared geometry, character and interaction principles.</figcaption>

      {/* Mobile uses normal flow so the labels and logos cannot collide. */}
      <div className="grid gap-6 p-6 sm:hidden">
        <ul className="m-0 grid list-none gap-5 p-0" aria-label="General Learning product family" role="list">
          {brands.map((brand) => (
            <li key={brand.name} className="flex justify-center">
              <Image className={logoClass} src={brand.logo} alt={`${brand.name} logo`} width={brand.width} height={64} />
            </li>
          ))}
        </ul>
        <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0" aria-label="Shared design language" role="list">
          {principles.map((principle) => <li key={principle.label} className={pillClass}>{principle.label}</li>)}
        </ul>
      </div>

      {/* The first two logos share a row and OnePrep takes the next row, keeping
          the product family close to the centre without overlapping. */}
      <div className="relative hidden min-h-96 sm:block">
        <ul className="absolute inset-x-0 top-20 m-0 flex list-none flex-wrap justify-center gap-x-8 gap-y-12 px-12 py-0" aria-label="General Learning product family" role="list">
          {brands.map((brand, index) => (
            <li key={brand.name} className={index === 2 ? 'flex basis-full justify-center' : ''}>
              <Image className={logoClass} src={brand.logo} alt={`${brand.name} logo`} width={brand.width} height={64} />
            </li>
          ))}
        </ul>
        <ul className="m-0 list-none p-0" aria-label="Shared design language" role="list">
          {principles.map((principle) => <li key={principle.label} className={`absolute ${pillClass} ${principle.position}`}>{principle.label}</li>)}
        </ul>
      </div>
    </figure>
  );
}
