import Image from 'next/image';
import styles from '../mathsgenie.module.css';

const brands = [
  {
    name: 'MathsGenie',
    context: 'GCSE and A-level',
    logo: '/assets/images/mathsgenie/brands/mathsgenie.svg',
    width: 329,
    accent: 'mathsGenie',
  },
  {
    name: 'RevisionDojo',
    context: 'IB and MYP',
    logo: '/assets/images/mathsgenie/brands/revisiondojo.svg',
    width: 256,
    accent: 'revisionDojo',
  },
  {
    name: 'OnePrep',
    context: 'SAT, ACT and AP',
    logo: '/assets/images/mathsgenie/brands/oneprep.svg',
    width: 270,
    accent: 'onePrep',
  },
] as const;

export function BrandLanguageFigure() {
  return (
    <figure className={styles.brandSystemPanel}>
      <figcaption className="sr-only">
        Three General Learning platforms connected by shared geometry, character and interaction principles.
      </figcaption>
      <div className={styles.brandCanvas}>
        {/* These paths are decorative; the two lists preserve the relationships for assistive technology. */}
        <svg
          className={styles.brandConnections}
          viewBox="0 0 800 520"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M400 260 L132 92" />
          <path d="M400 260 L668 92" />
          <path d="M400 260 L704 278" />
          <path d="M400 260 L610 446" />
          <path d="M400 260 L174 438" />
          <circle cx="400" cy="260" r="7" />
        </svg>

        <ul className={styles.brandFamily} aria-label="General Learning product family">
          {brands.map((brand) => (
            <li key={brand.name} className={`${styles.brandLogoNode} ${styles[brand.accent]}`}>
              <Image src={brand.logo} alt={`${brand.name} logo`} width={brand.width} height={60} />
              <span>{brand.context}</span>
            </li>
          ))}
        </ul>

        <ul className={styles.sharedGrammar} aria-label="Shared design language">
          <li className={styles.nodeCharacter}>Character-led</li>
          <li className={styles.nodeGeometric}>Geometric</li>
          <li className={styles.nodePlayful}>Playful</li>
          <li className={styles.nodeHabit}>Habit-forming</li>
          <li className={styles.nodeMotion}>Springy motion</li>
        </ul>
      </div>
    </figure>
  );
}
