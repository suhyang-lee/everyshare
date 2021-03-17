import { useEffect } from 'react';

const useMouseLock = () => {
  useEffect(() => {
    const lockScroll = (e) => e.preventDefault();
    const body = document.querySelector('body');

    body.addEventListener('touchmove', lockScroll, { passive: false });
    body.style.overflow = 'hidden';
    return () => {
      body.removeEventListener('touchmove', lockScroll, { passive: false });
      body.style.removeProperty('overflow');
    };
  }, []);
};

export default useMouseLock;
