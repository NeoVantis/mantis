import React, { useEffect, useState, useRef } from 'react';
import './Animation.css';

export interface AnimationProps {
  /** Animation children */
  children: React.ReactNode;
  /** Animation type */
  type?: 'fadeIn' | 'fadeOut' | 'slideInRight' | 'slideInLeft' | 'slideInUp' | 'slideInDown' | 'scaleIn' | 'bounce' | 'pulse' | 'spin';
  /** Animation duration in ms */
  duration?: number;
  /** Animation delay in ms */
  delay?: number;
  /** Whether animation should trigger on scroll into view */
  triggerOnScroll?: boolean;
  /** Whether animation should repeat */
  repeat?: boolean;
  /** Animation easing function */
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  /** Whether animation is currently active */
  isActive?: boolean;
  /** Callback when animation starts */
  onAnimationStart?: () => void;
  /** Callback when animation ends */
  onAnimationEnd?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export const Animation: React.FC<AnimationProps> = ({
  children,
  type = 'fadeIn',
  duration = 300,
  delay = 0,
  triggerOnScroll = false,
  repeat = false,
  easing = 'ease-out',
  isActive = true,
  onAnimationStart,
  onAnimationEnd,
  className = '',
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(!triggerOnScroll);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerOnScroll) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setShouldAnimate(true);
        } else if (!entry.isIntersecting && repeat) {
          setIsVisible(false);
          setShouldAnimate(false);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnScroll, repeat, isVisible]);

  useEffect(() => {
    if (shouldAnimate && isActive) {
      onAnimationStart?.();
    }
  }, [shouldAnimate, isActive, onAnimationStart]);

  const handleAnimationEnd = () => {
    onAnimationEnd?.();
    if (repeat && !triggerOnScroll) {
      // Add small delay before restarting animation
      setTimeout(() => {
        setShouldAnimate(false);
        setTimeout(() => setShouldAnimate(true), 50);
      }, 100);
    }
  };

  const animationClass = `mantis-animate-${type.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
  
  const animationStyle: React.CSSProperties = {
    animationDuration: `${duration}ms`,
    animationDelay: `${delay}ms`,
    animationTimingFunction: easing,
    animationFillMode: 'both',
    animationIterationCount: repeat && !triggerOnScroll ? 'infinite' : 1,
  };

  const containerClasses = [
    'mantis-animation-container',
    shouldAnimate && isActive ? animationClass : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={elementRef}
      className={containerClasses}
      style={shouldAnimate && isActive ? animationStyle : undefined}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};
