import { useEffect } from 'react';

const useInfiniteScroll = ({
  root = null,
  target,
  onIntersect,
  threshold = 0.2,
  rootMargin = '10px',
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    if (!target) {
      return;
    }
    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [target, root, rootMargin, onIntersect, threshold]);
};

export default useInfiniteScroll;
