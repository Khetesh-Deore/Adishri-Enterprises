// LazyImage Component - Optimized image loading with lazy loading and blur placeholder
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholderSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E',
  onLoad,
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  // Load actual image when in view
  useEffect(() => {
    if (!isInView || !src) return;

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
      if (onLoad) onLoad();
    };

    img.onerror = () => {
      // Fallback to placeholder on error
      setImageLoaded(true);
    };
  }, [isInView, src, onLoad]);

  return (
    <div ref={imgRef} className="relative overflow-hidden">
      <motion.img
        src={imageSrc}
        alt={alt}
        className={`${className} ${!imageLoaded ? 'blur-sm' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        loading="lazy"
        {...props}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}
    </div>
  );
}
