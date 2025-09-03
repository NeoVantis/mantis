import { useEffect, useState, RefObject } from 'react';

export function useInView(ref: RefObject<HTMLElement>, threshold = 0.1) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, [ref, threshold]);

  return inView;
}
