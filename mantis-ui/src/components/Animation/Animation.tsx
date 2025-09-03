import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import './Animation.css';
import { AnimationProps } from './Animation.types';
import { useInView } from './useInView';
import { useResponsiveAnimation } from './useResponsiveAnimation';

export const Animation: React.FC<AnimationProps> = ({
  children,
  type = 'fadeIn',
  duration = 300,
  delay = 0,
  triggerOnScroll = false,
  repeat = false,
  easing = 'ease-out',
  isActive = true,
  reduceMotion = false,
  config,
  responsive,
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

  // Get responsive configuration
  const { currentConfig } = useResponsiveAnimation(responsive, {
    type,
    duration,
    delay,
    easing,
    transformOrigin: config?.transformOrigin,
    direction: config?.direction,
    fillMode: config?.fillMode,
    iterationCount: config?.iterationCount,
  });

  // Use responsive config values or fallback to props
  const finalType = currentConfig.type || type;
  const finalDuration = currentConfig.duration || duration;
  const finalDelay = currentConfig.delay || delay;
  const finalEasing = currentConfig.easing || easing;
  const finalTransformOrigin = currentConfig.transformOrigin || config?.transformOrigin || 'center';
  const finalDirection = currentConfig.direction || config?.direction || 'normal';
  const finalFillMode = currentConfig.fillMode || config?.fillMode || 'both';
  const finalIterationCount = currentConfig.iterationCount || config?.iterationCount || (repeat ? 'infinite' : 1);
  
  // Skip animation if disabled at current breakpoint
  const isDisabled = currentConfig.disabled || reduceMotion;

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
  const animationClass = useMemo(
    () => `mantis-animate-${finalType.replace(/([A-Z])/g, '-$1').toLowerCase()}`,
    [finalType]
  );

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
    const baseClasses = ['mantis-animation-container'];
    
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
