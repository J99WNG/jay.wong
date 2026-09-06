"use client";

import { useRef } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Icon, { type IconName } from './Icon';

const strengths = [
  {
    icon: "ear",
    title: "Listen before solving",
    text: "I pay attention to what people say, what they leave unsaid, and the small frictions that point to the real problem.",
    skills: ["UX research", "Research synthesis", "Usability testing","Web analytics"],
  },
  {
    icon: "waypoints",
    title: "Make sense of the messy middle",
    text: "I connect research, product goals, and technical realities into a direction people can understand and act on.",
    skills: ["Product management","Product strategy", "Journey mapping", "Information architecture"],
  },
  {
    icon: "users-round",
    title: "Build with people, not around them",
    text: "I work openly with product, engineering, and stakeholders—sharing the thinking early and shaping the answer together.",
    skills: ["Design systems", "Token architecture","WCAG Accessibility", "Cross-functional delivery"],
  },
  {
    icon: "bot",
    title: "Let the tools do the busywork",
    text: "I use AI and code to speed up repetitive work, leaving more room for judgement, craft, and conversations that move the product forward.",
    skills: ["Agentic workflows","MCP Framework", "SKILL.md", "Rapid prototyping", "Front-end development"],
  },
] as const satisfies ReadonlyArray<{
  icon: IconName;
  title: string;
  text: string;
  skills: readonly string[];
}>;

const mutedDash =
  "repeating-linear-gradient(to bottom, var(--color-border-muted) 0 6px, transparent 6px 12px)";

function TimelineStep({
  item,
  index,
  progress,
  reduceMotion,
}: {
  item: (typeof strengths)[number];
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const stepStart = index / strengths.length;
  const stepEnd = (index + 0.56) / strengths.length;
  const nextStep = (index + 1) / strengths.length;
  const activeOpacity = useTransform(progress, [stepStart, stepEnd], [0, 1], {
    clamp: true,
  });
  const textOpacity = useTransform(
    progress,
    [stepStart, stepEnd],
    [0.3, 1],
    { clamp: true },
  );
  const iconScale = useTransform(progress, [stepStart, stepEnd], [0.9, 1], {
    clamp: true,
  });
  const lineProgress = useTransform(
    progress,
    [stepEnd, nextStep],
    [0, 1],
    { clamp: true },
  );

  return (
    <li className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-5">
      <div className="relative flex justify-center">
        <motion.span
          aria-hidden="true"
          style={{ scale: reduceMotion ? 1 : iconScale }}
          className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-3xl bg-bg-tertiary text-text-tertiary sm:size-16"
        >
          <Icon name={item.icon} size="lg" />

          <motion.span
            style={{ opacity: reduceMotion ? 1 : activeOpacity }}
            className="absolute inset-0 flex items-center justify-center rounded-3xl bg-accent-interactive text-text-on-accent"
          >
            <Icon name={item.icon} size="lg" />
          </motion.span>
        </motion.span>

        {index < strengths.length - 1 && (
          <span
            aria-hidden="true"
            style={{ backgroundImage: mutedDash }}
            className="absolute top-14 bottom-0 left-1/2 w-1 -translate-x-1/2 sm:top-16"
          >
            <motion.span
              style={{ scaleY: reduceMotion ? 1 : lineProgress }}
              className="absolute inset-0 origin-top bg-accent-interactive"
            />
          </span>
        )}
      </div>

      <motion.div
        style={{
          opacity: reduceMotion ? 1 : textOpacity
        }}
        className="flex flex-col gap-3 pb-10 sm:pb-12"
      >
        <div className="flex flex-col gap-2">
          <h4 className="text-text-primary">{item.title}</h4>
          <p className="text-text-secondary">{item.text}</p>
        </div>

        <ul
          className="flex flex-wrap gap-2 list-none p-0"
          aria-label={`${item.title} capabilities`}
        >
          {item.skills.map((skill) => (
            <li key={skill} className="badge">
              {skill}
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
}

export default function StrengthsTimeline() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 50%"],
  });

  return (
    <ol
      ref={timelineRef}
      className="flex flex-col list-none p-0"
      aria-label="How I approach product design"
    >
      {strengths.map((item, index) => (
        <TimelineStep
          key={item.title}
          item={item}
          index={index}
          progress={scrollYProgress}
          reduceMotion={Boolean(shouldReduceMotion)}
        />
      ))}
    </ol>
  );
}
