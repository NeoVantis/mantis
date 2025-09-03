// Main Animation component
export { Animation } from './Animation';

// Animation types
export type { 
  AnimationProps, 
  AnimationType, 
  EasingFunction,
  StandardEasingFunction,
  CubicBezierEasing,
  AnimationDirection,
  AnimationFillMode,
  TransformOrigin,
  StandardTransformOrigin,
  CustomTransformOrigin,
  BreakpointConfig,
  ResponsiveAnimationConfig,
  SimpleResponsiveConfig,
  AdvancedAnimationConfig,
  UseResponsiveAnimationReturn 
} from './Animation.types';
export { 
  animationTypes,
  easingFunctions,
  transformOrigins,
  ANIMATION_DEFAULTS,
  isValidCubicBezier,
  isValidTransformOrigin,
  isValidEasing,
  convertSimpleResponsiveConfig
} from './Animation.types';

// Hooks
export { useInView } from './useInView';
export { useResponsiveAnimation } from './useResponsiveAnimation';

// Responsive Context Provider - use this at your app root level for efficient breakpoint detection
export { ResponsiveProvider, useResponsiveContext } from './ResponsiveContext';

// Note: Individual animation components removed to reduce bundle size
// Use <Animation type="fadeIn" /> instead of <FadeIn />
// All animation types available: fadeIn, fadeOut, slideInRight, slideInLeft, 
// slideInUp, slideInDown, scaleIn, bounce, pulse, spin
