'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Maximize2 } from 'lucide-react';

import { useGallery } from './GalleryContext';

type ExpandableFigureProps = {
  children: ReactNode;
  expandedContent?: ReactNode;
  alt: string;
  caption?: string;
  className?: string;
  buttonClassName?: string;
};

function LatestContent({ contentRef }: { contentRef: { current: ReactNode } }) {
  return contentRef.current;
}

export default function ExpandableFigure({
  children,
  expandedContent,
  alt,
  caption,
  className,
  buttonClassName,
}: ExpandableFigureProps) {
  const id = useId();
  const figureRef = useRef<HTMLElement>(null);
  const { register, open } = useGallery();
  const content = expandedContent ?? children;
  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    const element = figureRef.current;
    if (!element) return;
    return register({
      kind: 'content',
      id,
      alt,
      caption,
      content: <LatestContent contentRef={contentRef} />,
      element,
    });
  }, [alt, caption, id, register]);

  return (
    <figure ref={figureRef} className={className}>
      <div className="group relative">
        {children}
        <button
          type="button"
          onClick={() => open(id)}
          aria-haspopup="dialog"
          aria-label={`Expand figure: ${alt}`}
          className={`absolute inset-0 cursor-zoom-in border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 ${buttonClassName ?? ''}`}
        >
          <span className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-bg-primary/90 px-3 py-2 text-sm text-text-primary shadow-lg backdrop-blur-sm motion-safe:transition-transform motion-safe:group-hover:scale-105">
            <Maximize2 aria-hidden="true" size={16} /> Expand
          </span>
        </button>
      </div>
      {caption && <figcaption className="sr-only">{caption}</figcaption>}
    </figure>
  );
}
