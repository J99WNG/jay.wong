import Image from 'next/image';

type BrandMarkProps = {
  src: string;
  alt?: string;
  size?: 'sm' | 'md';
  className?: string;
};

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
  const pixels = size === 'sm' ? 16 : 24;

  return (
    <span className={`brand-mark brand-mark-${size}${className ? ` ${className}` : ''}`}>
      <Image src={src} alt={alt} width={pixels} height={pixels} />
    </span>
  );
}
