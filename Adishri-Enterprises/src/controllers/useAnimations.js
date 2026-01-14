// Animation Controller - Framer Motion Variants & Hooks
import { useInView } from "framer-motion";
import { useRef } from "react";

// Animation Variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Navbar Animation
export const navbarVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Mobile Menu Animation
export const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

// Hamburger Icon Animation
export const hamburgerLine = {
  closed: { rotate: 0, y: 0 },
  open: (custom) => ({
    rotate: custom.rotate,
    y: custom.y,
    transition: { duration: 0.3 }
  })
};

// Float Animation for Images
export const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Glow Pulse Animation
export const glowPulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Custom Hook for Scroll-Triggered Animations
export function useScrollAnimation(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  return { ref, isInView };
}

// Custom Hook for Viewport Observer
export function useViewportObserver(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options.once ?? true,
    amount: options.amount ?? 0.3,
    margin: options.margin ?? "0px"
  });

  return { ref, isInView };
}

export default {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  navbarVariants,
  mobileMenuVariants,
  floatAnimation,
  glowPulse
};
