import React from 'react';

export const animationTypes = [
  'fadeIn',
  'fadeOut',
  'slideInRight',
  'slideInLeft',
  'slideInUp',
  'slideInDown',
  'scaleIn',
  'bounce',
  'pulse',
  'spin',
] as const;

export type AnimationType = (typeof animationTypes)[number];

export type EasingFunction = 
  | 'ease' 
  | 'ease-in' 
  | 'ease-out' 
  | 'ease-in-out' 
  | 'linear'
  | `cubic-bezier(${number}, ${number}, ${number}, ${number})`
  | string; // Allow other custom values

export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';

export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';

export type TransformOrigin = 
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
  | string; // Allow custom values like "50% 20px"

export type BreakpointConfig = {
  /** Animation type for this breakpoint */
  type?: AnimationType;
  /** Duration in ms */
  duration?: number;
  /** Delay in ms */
  delay?: number;
  /** Easing function */
  easing?: EasingFunction;
  /** Transform origin */
  transformOrigin?: TransformOrigin;
  /** Animation direction */
  direction?: AnimationDirection;
  /** Animation fill mode */
  fillMode?: AnimationFillMode;
  /** Number of iterations (number or 'infinite') */
  iterationCount?: number | 'infinite';
  /** Whether animation is disabled at this breakpoint */
  disabled?: boolean;
};

export interface ResponsiveAnimationConfig {
  /** Mobile configuration (up to 767px) */
  mobile?: BreakpointConfig;
  /** Tablet configuration (768px to 1023px) */
  tablet?: BreakpointConfig;
  /** Desktop configuration (1024px and above) */
  desktop?: BreakpointConfig;
}

export interface AdvancedAnimationConfig {
  /** Custom CSS transform origin */
  transformOrigin?: TransformOrigin;
  /** Animation direction */
  direction?: AnimationDirection;
  /** Animation fill mode */
  fillMode?: AnimationFillMode;
  /** Number of iterations (number or 'infinite') */
  iterationCount?: number | 'infinite';
}

export interface AnimationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'className' | 'style'> {
  /** Children to animate */
  children: React.ReactNode;
  /** Type of animation */
  type?: AnimationType;
  /** Duration in ms */
  duration?: number;
  /** Delay in ms */
  delay?: number;
  /** Trigger animation when scrolled into view */
  triggerOnScroll?: boolean;
  /** Whether to repeat animation */
  repeat?: boolean;
  /** Easing function */
  easing?: EasingFunction;
  /** Whether the animation is active */
  isActive?: boolean;
  /** Reduce motion for accessibility */
  reduceMotion?: boolean;
  /** Advanced animation configuration */
  config?: AdvancedAnimationConfig;
  /** Responsive animation configurations */
  responsive?: ResponsiveAnimationConfig;
  /** Callbacks */
  onAnimationStart?: (type: AnimationType) => void;
  onAnimationEnd?: (type: AnimationType) => void;
  onAnimationIteration?: (type: AnimationType) => void;
}

export interface UseResponsiveAnimationReturn {
  currentConfig: BreakpointConfig;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
}
