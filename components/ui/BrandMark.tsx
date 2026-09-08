import Image from 'next/image';

type BrandMarkProps = {
  src: string;
  alt?: string;
  size?: 'sm' | 'md';
  className?: string;
};

const sizes = {
  sm: { pixels: 16, className: 'size-6' },
  md: { pixels: 24, className: 'size-8' },
} as const;

/**
 * Brand artwork is kept separate from the monochrome interface icon system.
 * Leave `alt` empty beside a visible company name; provide it only when the mark
 * is the sole content carrying that identity.
 */
export default function BrandMark({
  src,
  alt = '',
  size = 'md',
  className = '',
}: BrandMarkProps) {
  const { pixels, className: sizeClassName } = sizes[size];

  return (
    <span
      className={`inline-flex ${sizeClassName} shrink-0 items-center justify-center rounded-lg bg-bg-secondary p-1 align-middle${className ? ` ${className}` : ''}`}
    >
      <Image
        src={src}
        alt={alt}
        width={pixels}
        height={pixels}
        className="size-full object-contain"
      />
    </span>
  );
}
