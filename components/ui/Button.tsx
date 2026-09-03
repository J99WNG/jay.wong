import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

// A tiny helper to merge Tailwind classes safely
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CommonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'nav';
  className?: string;
  children?: ReactNode;
};

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href'> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: never;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

export default function Button(props: ButtonProps) {
  const { variant = 'primary', className, children } = props;
  // 1. Your Base Styles (.btn)
  const baseStyles = "inline-flex items-center justify-center cursor-pointer overflow-hidden w-fit h-auto px-6 py-2 leading-none text-center no-underline text-inherit text-[clamp(14px,4vw,16px)] tracking-tighter rounded-2xl motion-safe:transition-[scale,color,background-color,border-color,box-shadow] motion-safe:duration-400 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:active:scale-96 motion-safe:focus-visible:scale-96 motion-safe:hover:scale-96";

  // 2. Your Variants (.btn-primary, etc.)
  const variants = {
    primary: "text-text-inverse hover:text-text-inverse bg-inverse-secondary hover:bg-inverse-tertiary border border-border-base hover:border-border-hover",
    secondary: "text-text-secondary bg-bg-secondary hover:bg-bg-primary border border-border-muted hover:border-transparent",
    tertiary: "text-text-primary hover:text-text-on-accent bg-transparent hover:bg-accent-interactive border border-border-base hover:border-accent-interactive",
    nav: "text-text-secondary hover:text-text-primary bg-bg-secondary hover:bg-bg-primary border border-border-base hover:border-border-hover w-auto py-1 rounded-2xl text-[1.5rem] md:text-base md:rounded-xl md:shrink-0",
  };

  const combinedClasses = cn(baseStyles, variants[variant], className);

  // If it has an href, render an internal or external link.
  if ('href' in props && props.href) {
    const href = props.href;
    const linkProps: Partial<LinkButtonProps> = { ...props };
    delete linkProps.href;
    delete linkProps.variant;
    delete linkProps.className;
    delete linkProps.children;
    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        <a 
          href={href} 
          className={combinedClasses} 
          {...linkProps as AnchorHTMLAttributes<HTMLAnchorElement>}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={combinedClasses}
        {...linkProps as AnchorHTMLAttributes<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  const buttonProps: Partial<NativeButtonProps> = {
    ...(props as NativeButtonProps),
  };
  delete buttonProps.href;
  delete buttonProps.variant;
  delete buttonProps.className;
  delete buttonProps.children;

  return (
    <button
      className={combinedClasses}
      {...buttonProps as ButtonHTMLAttributes<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}
