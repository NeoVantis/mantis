import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  AnimationProps,
  ANIMATION_DEFAULTS,
  isValidEasing,
  isValidTransformOrigin,
  convertSimpleResponsiveConfig
} from './Animation.types';
import { useInView } from './useInView';
import { useResponsiveAnimation } from './useResponsiveAnimation';

export const Animation: React.FC<AnimationProps> = ({
  children,
  type = ANIMATION_DEFAULTS.type,
  duration = ANIMATION_DEFAULTS.duration,
  delay = ANIMATION_DEFAULTS.delay,
  triggerOnScroll = ANIMATION_DEFAULTS.triggerOnScroll,
  repeat = ANIMATION_DEFAULTS.repeat,
  easing = ANIMATION_DEFAULTS.easing,
  isActive = ANIMATION_DEFAULTS.isActive,
  respectMotionPreference = ANIMATION_DEFAULTS.respectMotionPreference,
  config,
  responsive,
  simpleResponsive,
  onAnimationStart,
  onAnimationEnd,
  onAnimationIteration,
  ...htmlProps
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const animationEndTimeoutRef = useRef<number>();
  const [shouldAnimate, setShouldAnimate] = useState(!triggerOnScroll);
  const [animationKey, setAnimationKey] = useState(0);

  const inView = useInView(ref);

  // Runtime validation with fallbacks
  const validatedEasing = useMemo(() => {
    if (!isValidEasing(easing)) {
      console.warn(`Invalid easing value: "${easing}". Falling back to "${ANIMATION_DEFAULTS.easing}".`);
      return ANIMATION_DEFAULTS.easing;
    }
    return easing;
  }, [easing]);

  const validatedTransformOrigin = useMemo(() => {
    const origin = config?.transformOrigin || ANIMATION_DEFAULTS.transformOrigin;
    if (!isValidTransformOrigin(origin)) {
      console.warn(`Invalid transformOrigin value: "${origin}". Falling back to "${ANIMATION_DEFAULTS.transformOrigin}".`);
      return ANIMATION_DEFAULTS.transformOrigin;
    }
    return origin;
  }, [config?.transformOrigin]);

  // Convert simple responsive config to full config if provided
  const finalResponsiveConfig = useMemo(() => {
    if (simpleResponsive) {
      if (responsive) {
        console.warn('Both responsive and simpleResponsive props provided. Using simpleResponsive.');
      }
      return convertSimpleResponsiveConfig(simpleResponsive);
    }
    return responsive;
  }, [responsive, simpleResponsive]);

  // Get responsive configuration
  const { currentConfig } = useResponsiveAnimation(finalResponsiveConfig, {
    type,
    duration,
    delay,
    easing: validatedEasing,
    transformOrigin: validatedTransformOrigin,
    direction: config?.direction,
    fillMode: config?.fillMode,
    iterationCount: config?.iterationCount,
  });

  // Use responsive config values or fallback to props/defaults
  const finalType = currentConfig.type || type;
  const finalDuration = currentConfig.duration || duration;
  const finalDelay = currentConfig.delay || delay;
  const finalEasing = currentConfig.easing || validatedEasing;

  // Set sensible defaults for specific animation types
  let defaultTransformOrigin = validatedTransformOrigin;
  let defaultIterationCount = repeat ? 'infinite' : ANIMATION_DEFAULTS.iterationCount;

  if (finalType === 'scaleIn') {
    defaultTransformOrigin = 'center'; // Always center for scale animations
  }

  if (finalType === 'spin') {
    defaultIterationCount = 'infinite'; // Always infinite for spin animations
  }

  const finalTransformOrigin = currentConfig.transformOrigin || defaultTransformOrigin;
  const finalDirection = currentConfig.direction || config?.direction || ANIMATION_DEFAULTS.direction;
  const finalFillMode = currentConfig.fillMode || config?.fillMode || ANIMATION_DEFAULTS.fillMode;
  const finalIterationCount = currentConfig.iterationCount || config?.iterationCount || defaultIterationCount;

  // Check for reduced motion preference - respect system settings by default
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isDisabled = currentConfig.disabled ||
    (respectMotionPreference && prefersReducedMotion);

  // Handle scroll-triggered animations
  useEffect(() => {
    if (triggerOnScroll && inView && !isDisabled) {
      setShouldAnimate(true);
    } else if (triggerOnScroll && !inView && repeat) {
      setShouldAnimate(false);
    }
  }, [triggerOnScroll, inView, repeat, isDisabled]);

  // Handle repeat animations with optimized cleanup
  const handleRepeatAnimation = useCallback(() => {
    if (repeat && isActive && !triggerOnScroll && !isDisabled) {
      // Force re-render with new animation key to restart animation
      setAnimationKey(prev => prev + 1);
    }
  }, [repeat, isActive, triggerOnScroll, isDisabled]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (animationEndTimeoutRef.current) {
        clearTimeout(animationEndTimeoutRef.current);
      }
    };
  }, []);

  // Generate animation class name
  const animationClass = useMemo(() => {
    const typeMap: Record<string, string> = {
      'fadeIn': 'animate-mantis-fade-in',
      'fadeOut': 'animate-mantis-fade-out',
      'slideInRight': 'animate-mantis-slide-in-right',
      'slideInLeft': 'animate-mantis-slide-in-left',
      'slideInUp': 'animate-mantis-slide-in-up',
      'slideInDown': 'animate-mantis-slide-in-down',
      'scaleIn': 'animate-mantis-scale-in',
      'bounce': 'animate-mantis-bounce',
      'pulse': 'animate-mantis-pulse',
      'spin': 'animate-mantis-spin',
    };

    return typeMap[finalType] || `animate-mantis-${finalType.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
  }, [finalType]);

  // Build optimized inline styles
  const style = useMemo(() => {
    if (isDisabled) return {};

    const baseStyles: React.CSSProperties = {
      transformOrigin: finalTransformOrigin,
      animationDuration: `${finalDuration}ms`,
      animationDelay: `${finalDelay}ms`,
      animationTimingFunction: finalEasing,
      animationDirection: finalDirection,
      animationFillMode: finalFillMode,
      animationIterationCount: finalIterationCount,
      // Performance optimizations
      backfaceVisibility: 'hidden',
      perspective: '1000px',
    };

    return baseStyles;
  }, [
    isDisabled,
    finalTransformOrigin,
    finalDuration,
    finalDelay,
    finalEasing,
    finalDirection,
    finalFillMode,
    finalIterationCount,
  ]);

  // Handle animation events with proper cleanup
  const handleAnimationStart = useCallback((event: React.AnimationEvent<HTMLDivElement>) => {
    // Only trigger for our animations, not child animations
    if (event.target === event.currentTarget) {
      onAnimationStart?.(finalType);
    }
  }, [onAnimationStart, finalType]);

  const handleAnimationEnd = useCallback((event: React.AnimationEvent<HTMLDivElement>) => {
    // Only trigger for our animations, not child animations
    if (event.target === event.currentTarget) {
      onAnimationEnd?.(finalType);

      // Handle repeat with timeout to avoid memory leaks
      if (repeat && !triggerOnScroll && isActive && !isDisabled) {
        // Clear any existing timeout to prevent race condition
        if (animationEndTimeoutRef.current) {
          clearTimeout(animationEndTimeoutRef.current);
        }
        animationEndTimeoutRef.current = window.setTimeout(handleRepeatAnimation, 50);
      }
    }
  }, [onAnimationEnd, finalType, repeat, triggerOnScroll, isActive, isDisabled, handleRepeatAnimation]);

  const handleAnimationIteration = useCallback((event: React.AnimationEvent<HTMLDivElement>) => {
    // Only trigger for our animations, not child animations
    if (event.target === event.currentTarget) {
      onAnimationIteration?.(finalType);
    }
  }, [onAnimationIteration, finalType]);

  // Build CSS classes
  const classes = useMemo(() => {
    const baseClasses = [
      // Performance optimizations using inline styles since Tailwind doesn't have all these utilities
    ];

    if (shouldAnimate && isActive && !isDisabled) {
      baseClasses.push(animationClass);
    }

    return baseClasses.join(' ');
  }, [shouldAnimate, isActive, isDisabled, animationClass]);

  return (
    <div
      ref={ref}
      key={animationKey} // Force re-render for repeat animations
      className={classes}
      style={style}
      onAnimationStart={handleAnimationStart}
      onAnimationEnd={handleAnimationEnd}
      onAnimationIteration={handleAnimationIteration}
      {...htmlProps}
    >
      {children}
    </div>
  );
};
