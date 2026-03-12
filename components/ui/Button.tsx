import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// A tiny helper to merge Tailwind classes safely
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'nav';
  href?: string; // If provided, it renders a Next.js Link instead
}

export default function Button({ variant = 'primary', href, className, children, ...props }: ButtonProps) {
  
  // 1. Your Base Styles (.btn)
  const baseStyles = "inline-flex items-center justify-center cursor-pointer overflow-hidden w-fit h-auto px-6 py-2 leading-none text-center no-underline text-inherit text-[clamp(14px,4vw,16px)] tracking-tighter rounded-2xl transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-96 focus-visible:scale-96 hover:scale-96";

  // 2. Your Variants (.btn-primary, etc.)
  const variants = {
    primary: "text-[var(--silver-needle)] bg-[var(--ceylon-leaf)] border border-[var(--aged-pu-erh)] hover:text-[var(--white-pekoe)] hover:bg-[var(--aged-pu-erh)] hover:border-[var(--ceylon-leaf)]",
    secondary: "text-[var(--ceylon-leaf)] bg-[var(--silver-needle)] border border-[var(--dried-clay)] hover:bg-[var(--steamed-vapor)] hover:border-transparent",
    tertiary: "text-[var(--ceylon-leaf)] bg-transparent border border-[var(--ceylon-leaf)] hover:text-[var(--white-pekoe)] hover:bg-[var(--masala-chai)] hover:border-[var(--milk-tea)]",
    nav: "text-[var(--ceylon-leaf)] bg-[var(--silver-needle)] border border-[var(--dried-clay)] hover:bg-[var(--steamed-vapor)] hover:border-transparent w-auto py-1 rounded-2xl text-[1.5rem] md:text-base md:rounded-xl md:shrink-0"
  };

  const combinedClasses = cn(baseStyles, variants[variant], className);

// If it's a link (internal or external)
  if (href) {
    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        <a 
          href={href} 
          className={combinedClasses} 
          {...props} // <--- This spreads target="_blank" and rel="..."
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  // If it's just a regular button
  return (
    <button className={combinedClasses} {...props as React.ButtonHTMLAttributes<HTMLButtonElement>}>
      {children}
    </button>
  );
}