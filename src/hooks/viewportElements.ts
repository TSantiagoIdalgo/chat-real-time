import { useEffect, useState, useRef } from 'react';

interface IntersectionObserverHookOptions extends IntersectionObserverInit {}

const useIntersectionObserver = (options: IntersectionObserverHookOptions) => {
  const [observedElements, setObservedElements] = useState<Element[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      const visibleElements = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => entry.target);
      setObservedElements(visibleElements);
    }, options);

    return () => {
      observer.current && observer.current.disconnect();
    };
  }, [options]);

  const observe = (element: Element | null) => {
    if (element && observer.current) {
      observer.current.observe(element);
    }
  };

  const unobserve = (element: Element | null) => {
    if (element && observer.current) {
      observer.current.unobserve(element);
    }
  };

  return [observedElements, observe, unobserve] as const;
};

export default useIntersectionObserver;
