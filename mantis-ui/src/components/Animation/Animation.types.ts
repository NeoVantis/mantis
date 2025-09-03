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

// More restrictive and type-safe easing functions
export const easingFunctions = [
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'linear',
] as const;

export type StandardEasingFunction = (typeof easingFunctions)[number];

// Helper type for cubic-bezier validation
export type CubicBezierEasing = `cubic-bezier(${number}, ${number}, ${number}, ${number})`;

// More restrictive easing type - no arbitrary strings
export type EasingFunction = StandardEasingFunction | CubicBezierEasing;

export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';

export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';

// More restrictive transform origins
export const transformOrigins = [
  'center',
  'top',
  'bottom',
  'left',
  'right',
  'top left',
  'top right',
  'bottom left',
  'bottom right',
] as const;

export type StandardTransformOrigin = (typeof transformOrigins)[number];

// Allow percentage and pixel values with validation
export type CustomTransformOrigin = `${number}% ${number}%` | `${number}px ${number}px`;

export type TransformOrigin = StandardTransformOrigin | CustomTransformOrigin;

// Runtime validation functions
export const isValidCubicBezier = (value: string): value is CubicBezierEasing => {
  const cubicBezierRegex = /^cubic-bezier\((-?\d*\.?\d+),\s*(-?\d*\.?\d+),\s*(-?\d*\.?\d+),\s*(-?\d*\.?\d+)\)$/;
  return cubicBezierRegex.test(value);
};

export const isValidTransformOrigin = (value: string): value is TransformOrigin => {
  // Check standard values
  if (transformOrigins.includes(value as StandardTransformOrigin)) {
    return true;
  }
  
  // Check percentage format: "50% 75%"
  const percentageRegex = /^(\d{1,3})%\s+(\d{1,3})%$/;
  if (percentageRegex.test(value)) {
    const matches = value.match(percentageRegex);
    if (matches) {
      const [, x, y] = matches;
      return parseInt(x) <= 100 && parseInt(y) <= 100;
    }
  }
  
  // Check pixel format: "20px 30px"
  const pixelRegex = /^(\d+)px\s+(\d+)px$/;
  return pixelRegex.test(value);
};

export const isValidEasing = (value: string): value is EasingFunction => {
  return easingFunctions.includes(value as StandardEasingFunction) || isValidCubicBezier(value);
};

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

// Simplified responsive configuration for common use cases
export interface SimpleResponsiveConfig {
  /** Different animation type per breakpoint */
  type?: {
    mobile?: AnimationType;
    tablet?: AnimationType;
    desktop?: AnimationType;
  };
  /** Different duration per breakpoint */
  duration?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /** Whether to disable animation on specific breakpoints */
  disabled?: ('mobile' | 'tablet' | 'desktop')[];
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

// Centralized default values for consistency
export const ANIMATION_DEFAULTS = {
  type: 'fadeIn' as AnimationType,
  duration: 300,
  delay: 0,
  easing: 'ease-out' as EasingFunction,
  transformOrigin: 'center' as TransformOrigin,
  direction: 'normal' as AnimationDirection,
  fillMode: 'both' as AnimationFillMode,
  iterationCount: 1 as number | 'infinite',
  triggerOnScroll: false,
  repeat: false,
  isActive: true,
  respectMotionPreference: true, // Renamed from reduceMotion for clarity
} as const;

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
  /** 
   * Whether to respect user's motion preferences (prefers-reduced-motion)
   * When true (default), respects system settings
   * When false, forces animation even if user prefers reduced motion
   */
  respectMotionPreference?: boolean;
  /** Advanced animation configuration */
  config?: AdvancedAnimationConfig;
  /** Responsive animation configurations (detailed) */
  responsive?: ResponsiveAnimationConfig;
  /** Simplified responsive configuration for common use cases */
  simpleResponsive?: SimpleResponsiveConfig;
  /** Callbacks */
  onAnimationStart?: (type: AnimationType) => void;
  onAnimationEnd?: (type: AnimationType) => void;
  onAnimationIteration?: (type: AnimationType) => void;
}

// Helper function to convert simple responsive config to full config
export const convertSimpleResponsiveConfig = (
  simpleConfig: SimpleResponsiveConfig
): ResponsiveAnimationConfig => {
  const config: ResponsiveAnimationConfig = {};
  
  // Handle type mappings
  if (simpleConfig.type) {
    if (simpleConfig.type.mobile) {
      config.mobile = { ...config.mobile, type: simpleConfig.type.mobile };
    }
    if (simpleConfig.type.tablet) {
      config.tablet = { ...config.tablet, type: simpleConfig.type.tablet };
    }
    if (simpleConfig.type.desktop) {
      config.desktop = { ...config.desktop, type: simpleConfig.type.desktop };
    }
  }
  
  // Handle duration mappings
  if (simpleConfig.duration) {
    if (simpleConfig.duration.mobile) {
      config.mobile = { ...config.mobile, duration: simpleConfig.duration.mobile };
    }
    if (simpleConfig.duration.tablet) {
      config.tablet = { ...config.tablet, duration: simpleConfig.duration.tablet };
    }
    if (simpleConfig.duration.desktop) {
      config.desktop = { ...config.desktop, duration: simpleConfig.duration.desktop };
    }
  }
  
  // Handle disabled breakpoints
  if (simpleConfig.disabled) {
    simpleConfig.disabled.forEach(breakpoint => {
      config[breakpoint] = { ...config[breakpoint], disabled: true };
    });
  }
  
  return config;
};

export interface UseResponsiveAnimationReturn {
  currentConfig: BreakpointConfig;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
}
