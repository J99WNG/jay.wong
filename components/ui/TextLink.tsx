import Link from 'next/link';
import { ReactNode } from 'react';

interface TextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}

export default function TextLink({ href, children, className = '', external }: TextLinkProps) {
  const isExternal = external || href.startsWith('http');
  
  // Base classes for the link color and transition
  const linkClasses = `group relative inline-flex items-center w-fit text-[var(--butterfly-pea)] hover:!text-[var(--earl-grey)] transition-colors duration-200 tracking-[-0.04rem] ${className}`;

  // The content including the animated underline span
  const content = (
    <>
      {children}
      {/* The Underline - Animated via the 'group-hover' class */}
      <span className="absolute bottom-[-4px] left-0 h-[2px] w-full scale-x-0 bg-current transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-right group-hover:scale-x-100 group-hover:origin-left rounded-full" />
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={linkClasses} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses}>
      {content}
    </Link>
  );
}