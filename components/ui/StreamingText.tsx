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
import { motionBlur, motionDelay, motionDuration, motionEase, motionStagger } from '@/lib/motion';

type StreamingTextProps = ComponentPropsWithoutRef<'p'> & {
  children: ReactNode;
  startWhen?: boolean;
  /** Keep the component semantic when the streamed copy is a page heading. */
  as?: 'p' | 'h1';
  /** Give screen readers one natural phrase when the visual content is animated. */
  accessibleText?: ReactNode;
  /** Offset the first streamed word so nearby content can reveal in sequence. */
  startDelay?: number;
};

const wordVariants: Variants = {
  hidden: { opacity: 0, filter: motionBlur.base },
  visible: ({ index, startDelay }: { index: number; startDelay: number }) => ({
    opacity: 1,
    filter: motionBlur.none,
    transition: {
      delay: startDelay + motionDelay.short + index * motionStagger.words,
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
  startDelay: number,
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
          custom={{ index, startDelay }}
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
  const element = node as ReactElement<{
    children?: ReactNode;
    'data-stream-static'?: string;
  }>;

  // Leave interactive or independently animated content intact while the
  // surrounding sentence streams. This is used by the hero keyword ticker.
  if (element.props['data-stream-static'] !== undefined) return element;
  if (element.props.children === undefined) return element;

  return cloneElement(
    element,
    undefined,
    Children.map(element.props.children, (child) =>
      renderStreamingNode(
        child,
        nextWord,
        isVisible,
        shouldReduceMotion,
        startDelay,
      ),
    ),
  );
}

export default function StreamingText({
  children,
  className,
  startWhen = true,
  as = 'p',
  accessibleText,
  startDelay = 0,
  ...textProps
}: StreamingTextProps) {
  const textRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const isInView = useInView(textRef, { once: true, amount: 0.35 });

  // Optional gating lets above-the-fold copy wait for a loader or route transition
  // while every existing in-view usage keeps its original behaviour by default.
  const isVisible = shouldReduceMotion || (startWhen && isInView);
  const nextWord = { current: 0 };
  const TextElement = as;

  return (
    <TextElement
      ref={(node) => {
        textRef.current = node;
      }}
      className={className}
      {...textProps}
    >
      {/* Assistive technology receives one natural phrase, not many animated words. */}
      <span className="sr-only">{accessibleText ?? children}</span>

      <span aria-hidden="true">
        {Children.map(children, (child) =>
          renderStreamingNode(
            child,
            nextWord,
            isVisible,
            shouldReduceMotion,
            startDelay,
          ),
        )}
      </span>
    </TextElement>
  );
}
