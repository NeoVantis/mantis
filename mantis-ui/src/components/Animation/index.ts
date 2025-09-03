// Main Animation component
export { Animation } from './Animation';

// Responsive context for performance optimization
export { ResponsiveProvider, useResponsiveContext } from './ResponsiveContext';

// Animation types and constants
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
