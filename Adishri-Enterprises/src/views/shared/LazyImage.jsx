// LazyImage Component - Optimized image loading with Cloudinary transformations
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Cloudinary URL transformation helper
const getOptimizedCloudinaryUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  const {
    width = 'auto',
    quality = 'auto',
    format = 'auto',
    blur = false
  } = options;
  
  // Insert transformations before /upload/
  const transformations = [
    `w_${width}`,
    `q_${quality}`,
    `f_${format}`,
    'c_limit', // Don't upscale
    'dpr_auto' // Auto device pixel ratio
  ];
  
  if (blur) {
    transformations.push('e_blur:1000', 'q_1'); // Heavy blur, low quality for placeholder
  }
  
  const transformString = transformations.join(',');
  return url.replace('/upload/', `/upload/${transformString}/`);
};

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  placeholderSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E',
  onLoad,
  onError,
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Generate optimized URLs
  const blurredPlaceholder = src?.includes('cloudinary.com') 
    ? getOptimizedCloudinaryUrl(src, { width: 50, blur: true })
    : placeholderSrc;
    
  const optimizedSrc = src?.includes('cloudinary.com')
    ? getOptimizedCloudinaryUrl(src, { width: width || 800, quality: 'auto', format: 'auto' })
    : src;

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
        rootMargin: '100px', // Start loading 100px before image enters viewport
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

  // Load blurred placeholder first
  useEffect(() => {
    if (!isInView || !src) return;
    
    // Set blurred placeholder immediately
    if (src.includes('cloudinary.com')) {
      setImageSrc(blurredPlaceholder);
    }
  }, [isInView, src, blurredPlaceholder]);

  // Load actual image when in view
  useEffect(() => {
    if (!isInView || !optimizedSrc) return;

    const img = new Image();
    img.src = optimizedSrc;
    
    img.onload = () => {
      setImageSrc(optimizedSrc);
      setImageLoaded(true);
      if (onLoad) onLoad();
    };

    img.onerror = () => {
      setHasError(true);
      setImageLoaded(true);
      if (onError) onError();
    };
  }, [isInView, optimizedSrc, onLoad, onError]);

  return (
    <div ref={imgRef} className="relative overflow-hidden bg-gray-100">
      <motion.img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${!imageLoaded && !hasError ? 'blur-sm scale-110' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded || hasError ? 1 : 0.7 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        loading="lazy"
        decoding="async"
        {...props}
      />
      {!imageLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}
    </div>
  );
}

// Export the helper for use in other components
export { getOptimizedCloudinaryUrl };
