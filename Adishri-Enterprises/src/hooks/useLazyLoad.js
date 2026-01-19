// useLazyLoad Hook - Detect when element enters viewport
import { useState, useEffect, useRef } from 'react';

export function useLazyLoad(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options;

  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (triggerOnce) {
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            setIsInView(false);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [elementRef, isInView];
}

// Hook for lazy loading images
export function useLazyImage(src) {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [elementRef, isInView] = useLazyLoad();

  useEffect(() => {
    if (!isInView || !src) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };

    img.onerror = () => {
      setImageLoaded(true);
    };
  }, [isInView, src]);

  return { elementRef, imageSrc, imageLoaded };
}
