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
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  revealIcon?: boolean;
  revealLabel?: ReactNode;
  iconOnly?: boolean;
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
  const {
    variant = 'primary',
    className,
    children,
    prefixIcon,
    suffixIcon,
    revealIcon = false,
    revealLabel,
    iconOnly = false,
  } = props;

  // 1. Your Base Styles
  const baseStyles = "group inline-flex w-auto h-auto px-6 py-2 items-center justify-center cursor-pointer no-underline overflow-hidden leading-none text-center text-inherit text-[clamp(14px,4vw,16px)] tracking-tighter rounded-2xl motion-safe:transition-[scale,color,background-color,border-color,box-shadow,padding] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)] motion-safe:active:scale-96 motion-safe:focus-visible:scale-96 motion-safe:hover:scale-96";

  // 2. Your Variants
  const variants = {
    primary: "text-text-inverse hover:text-text-inverse bg-inverse-secondary hover:bg-inverse-tertiary",
    secondary: "text-text-secondary bg-bg-secondary hover:bg-bg-primary border border-border-base hover:border-transparent",
    tertiary: "text-text-primary hover:text-text-on-accent bg-transparent hover:bg-accent-interactive border border-border-base hover:border-accent-interactive",
    nav: "text-text-secondary hover:text-text-primary bg-bg-secondary hover:bg-bg-primary border border-border-base hover:border-border-hover sm:py-1 mx-2 sm:m-0 rounded-2xl sm:rounded-xl text-[1.5rem] sm:text-base sm:shrink-0",
  };

  const combinedClasses = cn(
    baseStyles,
    variants[variant],
    iconOnly && 'aspect-square p-0',
    // Preserve symmetrical padding while a reveal icon is hidden. Once visible,
    // pull its outer edge in slightly to compensate for its lower visual mass.
    prefixIcon && (revealIcon ? 'hover:pl-5 focus-visible:pl-5' : 'pl-5'),
    suffixIcon && (revealIcon ? 'hover:pr-5 focus-visible:pr-5' : 'pr-5'),
    className,
  );

  const iconClasses = (position: 'prefix' | 'suffix') => cn(
    'flex shrink-0 items-center justify-center',
    // Product-design intent: text stays stable while the decorative cue rewards
    // hover and keyboard focus—the inverse of our icon-first utility controls.
    revealIcon
      ? `max-w-0 overflow-hidden opacity-0 group-hover:max-w-6 group-hover:opacity-100 group-focus-visible:max-w-6 group-focus-visible:opacity-100 motion-safe:transition-[max-width,margin,opacity] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-standard)] ${position === 'prefix' ? 'group-hover:mr-2 group-focus-visible:mr-2' : 'group-hover:ml-2 group-focus-visible:ml-2'}`
      : position === 'prefix' ? 'mr-2' : 'ml-2',
  );

  // Keep the label mounted for assistive tech; only its visual width and opacity
  // change on hover or keyboard focus. Reduced-motion users get an instant reveal.
  const content = (
    <>
      {/* Adjacent icons reinforce the label visually, so they are deliberately
          excluded from the accessible name to avoid duplicate announcements. */}
      {prefixIcon && <span aria-hidden="true" className={iconClasses('prefix')}>{prefixIcon}</span>}
      {children}
      {suffixIcon && <span aria-hidden="true" className={iconClasses('suffix')}>{suffixIcon}</span>}
      {revealLabel && (
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 font-medium group-hover:max-w-40 group-hover:ml-2 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:ml-2 group-focus-visible:opacity-100 motion-safe:transition-[max-width,margin,opacity] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)]">
          {revealLabel}
        </span>
      )}
    </>
  );

  // If it has an href, render an internal or external link.
  if ('href' in props && props.href) {
    const href = props.href;
    const linkProps: Partial<LinkButtonProps> = { ...props };
    delete linkProps.href;
    delete linkProps.variant;
    delete linkProps.className;
    delete linkProps.children;
    delete linkProps.prefixIcon;
    delete linkProps.suffixIcon;
    delete linkProps.revealIcon;
    delete linkProps.revealLabel;
    delete linkProps.iconOnly;
    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        <a 
          href={href} 
          className={combinedClasses} 
          {...linkProps as AnchorHTMLAttributes<HTMLAnchorElement>}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={combinedClasses}
        {...linkProps as AnchorHTMLAttributes<HTMLAnchorElement>}
      >
        {content}
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
  delete buttonProps.prefixIcon;
  delete buttonProps.suffixIcon;
  delete buttonProps.revealIcon;
  delete buttonProps.revealLabel;
  delete buttonProps.iconOnly;

  return (
    <button
      className={combinedClasses}
      {...buttonProps as ButtonHTMLAttributes<HTMLButtonElement>}
    >
      {content}
    </button>
  );
}
