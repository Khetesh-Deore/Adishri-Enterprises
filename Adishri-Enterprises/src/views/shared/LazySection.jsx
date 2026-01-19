// LazySection Component - Lazy load text content with animations
import { motion } from 'framer-motion';
import { useLazyLoad } from '../../hooks/useLazyLoad';

export default function LazySection({ 
  children, 
  className = '',
  animation = 'fadeUp',
  delay = 0,
  threshold = 0.1,
  ...props 
}) {
  const [elementRef, isInView] = useLazyLoad({ 
    threshold,
    rootMargin: '200px', // Start loading 200px before viewport for faster appearance
    triggerOnce: true 
  });

  // Animation variants
  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.4, 
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration: 0.3, 
          delay 
        }
      }
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -30 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          duration: 0.4, 
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }
    },
    fadeRight: {
      hidden: { opacity: 0, x: 30 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          duration: 0.4, 
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.3, 
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }
    }
  };

  const selectedAnimation = animations[animation] || animations.fadeUp;

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedAnimation}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation wrapper
export function LazyStaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  threshold = 0.1,
  ...props 
}) {
  const [elementRef, isInView] = useLazyLoad({ 
    threshold,
    rootMargin: '200px', // Start loading 200px before viewport for faster appearance
    triggerOnce: true 
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0
      }
    }
  };

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger item
export function LazyStaggerItem({ 
  children, 
  className = '',
  ...props 
}) {
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
