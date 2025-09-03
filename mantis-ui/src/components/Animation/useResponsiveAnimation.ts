import { ResponsiveAnimationConfig, BreakpointConfig, UseResponsiveAnimationReturn } from './Animation.types';
import { useResponsiveContext } from './ResponsiveContext';

export const useResponsiveAnimation = (
  responsive?: ResponsiveAnimationConfig,
  baseConfig?: BreakpointConfig
): UseResponsiveAnimationReturn => {
  // Use the shared context instead of duplicating window resize logic
  const { currentBreakpoint: breakpoint } = useResponsiveContext();
  
  const currentConfig: BreakpointConfig = {
    ...baseConfig,
    ...(responsive?.[breakpoint] || {}),
  };

  return {
    currentConfig,
    breakpoint,
  };
};
