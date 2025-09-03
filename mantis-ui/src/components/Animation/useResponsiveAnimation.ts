import { useMemo } from 'react';
import { ResponsiveAnimationConfig, BreakpointConfig, UseResponsiveAnimationReturn } from './Animation.types';
import { useResponsiveContext } from './ResponsiveContext';

export const useResponsiveAnimation = (
  responsive?: ResponsiveAnimationConfig,
  baseConfig?: BreakpointConfig
): UseResponsiveAnimationReturn => {
  // Use the global responsive context instead of individual window listeners
  const { currentBreakpoint } = useResponsiveContext();

  const currentConfig = useMemo((): BreakpointConfig => {
    const breakpointConfig = responsive?.[currentBreakpoint];
    
    return {
      ...baseConfig,
      ...breakpointConfig,
    };
  }, [currentBreakpoint, responsive, baseConfig]);

  return {
    currentConfig,
    breakpoint: currentBreakpoint,
  };
};
