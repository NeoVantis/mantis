import { useState, useEffect } from 'react';
import { ResponsiveAnimationConfig, BreakpointConfig, UseResponsiveAnimationReturn } from './Animation.types';

const getBreakpoint = (width: number): 'mobile' | 'tablet' | 'desktop' => {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const useResponsiveAnimation = (
  responsive?: ResponsiveAnimationConfig,
  baseConfig?: BreakpointConfig
): UseResponsiveAnimationReturn => {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breakpoint = getBreakpoint(windowWidth);
  
  const currentConfig: BreakpointConfig = {
    ...baseConfig,
    ...(responsive?.[breakpoint] || {}),
  };

  return {
    currentConfig,
    breakpoint,
  };
};
