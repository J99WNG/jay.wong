import type { HTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, BookOpenText,
  BriefcaseBusiness, ChartNoAxesCombined, Check, ChevronLeft, ChevronRight,
  Compass, Copy, Ear, GitBranch, Headset, Linkedin, Mail, MapPin, Maximize2,
  Menu, Monitor, Moon, Sparkles, Sun, UsersRound, Video,
  Waypoints, Workflow, X, Bot,
} from 'lucide-react';

/*
 * Keep this registry private and import glyphs individually: it preserves tree shaking
 * while exposing one predictable convention: Lucide names converted to kebab-case.
 * Before adding an entry, check whether the glyph already exists in this subset.
 */
const icons = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-up-right': ArrowUpRight,
  'book-open-text': BookOpenText,
  'briefcase-business': BriefcaseBusiness,
  'chart-no-axes-combined': ChartNoAxesCombined,
  check: Check,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  compass: Compass,
  copy: Copy,
  ear: Ear,
  'git-branch': GitBranch,
  headset: Headset,
  linkedin: Linkedin,
  mail: Mail,
  'map-pin': MapPin,
  'maximize-2': Maximize2,
  menu: Menu,
  monitor: Monitor,
  moon: Moon,
  sparkles: Sparkles,
  sun: Sun,
  'users-round': UsersRound,
  video: Video,
  waypoints: Waypoints,
  workflow: Workflow,
  x: X,
  bot: Bot,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';
export type IconMotion = 'left' | 'right' | 'up-right';

type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  name: IconName;
  size?: IconSize;
  /** Required only when the icon communicates information without visible text. */
  label?: string;
  motion?: IconMotion;
  strokeWidth?: number;
};

/**
 * The single entry point for interface icons.
 * Icons are decorative by default; interactive controls should be named by their
 * parent button or link. Add `label` only for a meaningful standalone icon.
 */
export default function Icon({
  name,
  size = 'md',
  label,
  motion,
  strokeWidth = 2,
  className = '',
  ...props
}: IconProps) {
  // A missing key is a compile-time error through IconName; do not add a runtime fallback
  // that could hide an incomplete migration or a misspelled semantic name.
  const Glyph = icons[name];

  // Decorative is the safe default. Icon-only controls must name the parent control;
  // use `label` here only when the icon itself is meaningful standalone content.
  return (
    <span
      className={`icon icon-${size}${motion ? ` icon-motion-${motion}` : ''}${className ? ` ${className}` : ''}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    >
      <Glyph aria-hidden="true" focusable="false" strokeWidth={strokeWidth} />
    </span>
  );
}
