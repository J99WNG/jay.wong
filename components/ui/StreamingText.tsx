'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { motionDelay, motionDuration, motionEase, motionStagger } from '@/lib/motion';

type StreamingTextProps = ComponentPropsWithoutRef<'p'> & {
  children: ReactNode;
};

const wordVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(1px)' },
  visible: (index: number) => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: motionDelay.short + index * motionStagger.words,
      duration: motionDuration.standard,
      ease: motionEase.standard,
    },
  }),
};

const isWhitespace = (value: string) => /^\s+$/.test(value);

function renderStreamingNode(
  node: ReactNode,
  nextWord: { current: number },
  isVisible: boolean,
  shouldReduceMotion: boolean,
): ReactNode {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node).split(/(\s+)/).map((part) => {
      if (!part || isWhitespace(part)) return part;

      const index = nextWord.current++;
      return (
        <motion.span
          key={`stream-word-${index}`}
          data-stream-word
          className="inline-block"
          custom={index}
          variants={wordVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {part}
        </motion.span>
      );
    });
  }

  if (!isValidElement(node)) return node;

  // Recurse through inline markup so emphasis and links keep their styling.
  const element = node as ReactElement<{ children?: ReactNode }>;
  if (element.props.children === undefined) return element;

  return cloneElement(
    element,
    undefined,
    Children.map(element.props.children, (child) =>
      renderStreamingNode(child, nextWord, isVisible, shouldReduceMotion),
    ),
  );
}

export default function StreamingText({
  children,
  className,
  ...paragraphProps
}: StreamingTextProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const isInView = useInView(paragraphRef, { once: true, amount: 0.35 });
  const isVisible = shouldReduceMotion || isInView;
  const nextWord = { current: 0 };

  return (
    <p ref={paragraphRef} className={className} {...paragraphProps}>
      {/* Assistive technology receives one natural paragraph, not 30 fragments. */}
      <span className="sr-only">{children}</span>

      <span aria-hidden="true">
        {Children.map(children, (child) =>
          renderStreamingNode(child, nextWord, isVisible, shouldReduceMotion),
        )}
      </span>
    </p>
  );
}
