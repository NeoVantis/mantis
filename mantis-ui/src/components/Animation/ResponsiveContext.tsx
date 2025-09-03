import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';

type BreakpointName = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveContextValue {
  currentBreakpoint: BreakpointName;
  windowWidth: number;
}

const ResponsiveContext = createContext<ResponsiveContextValue | undefined>(undefined);

const defaultBreakpoints = {
  mobile: 768,
  tablet: 1024,
} as const;

const getBreakpoint = (width: number): BreakpointName => {
  if (width < defaultBreakpoints.mobile) return 'mobile';
  if (width < defaultBreakpoints.tablet) return 'tablet';
  return 'desktop';
};

export const ResponsiveProvider: React.FC<{ 
  children: ReactNode;
}> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    // SSR-safe initialization
    if (typeof window === 'undefined') return 1024; // Default to desktop
    return window.innerWidth;
  });

  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointName>(() => {
    if (typeof window === 'undefined') return 'desktop'; // SSR default
    return getBreakpoint(window.innerWidth);
  });

  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      // Throttle resize events for better performance
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = window.setTimeout(() => {
        const newWidth = window.innerWidth;
        const newBreakpoint = getBreakpoint(newWidth);
        
        setWindowWidth(newWidth);
        setCurrentBreakpoint(newBreakpoint);
      }, 100); // 100ms throttle
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={{ currentBreakpoint, windowWidth }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsiveContext = (): ResponsiveContextValue => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    // Fallback for when provider is not used
    const [windowWidth] = useState(() => 
      typeof window !== 'undefined' ? window.innerWidth : 1024
    );
    return {
      currentBreakpoint: getBreakpoint(windowWidth),
      windowWidth,
    };
  }
  return context;
};
