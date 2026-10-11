import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

const shapeClasses = {
  text: 'rounded-md',
  media: 'rounded-xl',
  surface: 'rounded-2xl',
  circle: 'rounded-full',
} as const;

export type SkeletonShape = keyof typeof shapeClasses;

export type SkeletonProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'aria-hidden' | 'role' | 'tabIndex'
> & {
  animated?: boolean;
  shape?: SkeletonShape;
};

/**
 * A decorative placeholder that preserves the shape of content while it loads.
 * Announce loading state once on the surrounding region rather than per shape.
 */
export default function Skeleton({
  animated = true,
  shape = 'text',
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="skeleton"
      className={cn(
        'relative isolate overflow-hidden bg-skeleton-base',
        shapeClasses[shape],
        animated && 'skeleton-shimmer',
        className,
      )}
    />
  );
}
