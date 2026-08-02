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
  const baseStyles = "inline-flex items-center justify-center cursor-pointer overflow-hidden w-fit h-auto px-6 py-2 leading-none text-center no-underline text-inherit text-[clamp(14px,4vw,16px)] tracking-tighter rounded-2xl transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-96 focus-visible:scale-96 hover:scale-96 focus-visible:outline-none focus-visible:ring-2";

  // 2. Your Variants (.btn-primary, etc.)
  const variants = {
    primary: "text-text-inverse hover:text-text-inverse bg-inverse-secondary hover:bg-inverse-tertiary border border-(--color-steep-900) hover:border-(--color-steep-300)",
    secondary: "text-text-secondary bg-bg-secondary hover:bg-(--color-neutral-100) border border-(--color-neutral-300) hover:border-transparent",
    tertiary: "text-text-primary hover:text-(--color-neutral-100) bg-transparent hover:bg-accent-primary border border-border-base hover:border-(--color-orange-300)",
    nav: "text-text-secondary hover:text-text-primary bg-bg-secondary hover:bg-bg-primary border border-border-base hover:border-border-hover w-auto py-1 rounded-2xl text-[1.5rem] md:text-base md:rounded-xl md:shrink-0",
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