import { useEffect, useState, RefObject } from 'react';

export function useInView(ref: RefObject<HTMLElement>, threshold = 0.1) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
      observer.disconnect();
    };
  }, [ref, threshold]);

  return inView;
}
