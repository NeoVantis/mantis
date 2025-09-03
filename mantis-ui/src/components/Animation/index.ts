// Main Animation component
export { Animation } from './Animation';

// Animation types
export type { 
  AnimationProps, 
  AnimationType, 
  EasingFunction,
  AnimationDirection,
  AnimationFillMode,
  TransformOrigin,
  BreakpointConfig,
  ResponsiveAnimationConfig,
  AdvancedAnimationConfig,
  UseResponsiveAnimationReturn 
} from './Animation.types';
export { animationTypes } from './Animation.types';

// Hooks
export { useInView } from './useInView';
export { useResponsiveAnimation } from './useResponsiveAnimation';

// Individual animation components
export { FadeIn } from './animations/FadeIn';
export { FadeOut } from './animations/FadeOut';
export { SlideInRight } from './animations/SlideInRight';
export { SlideInLeft } from './animations/SlideInLeft';
export { SlideInUp } from './animations/SlideInUp';
export { SlideInDown } from './animations/SlideInDown';
export { ScaleIn } from './animations/ScaleIn';
export { Bounce } from './animations/Bounce';
export { Pulse } from './animations/Pulse';
export { Spin } from './animations/Spin';
