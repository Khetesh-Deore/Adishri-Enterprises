// AnimatedCounter Component - Count-up Animation on Scroll
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

// Easing functions
const easingFunctions = {
  linear: (t) => t,
  easeOut: (t) => 1 - Math.pow(1 - t, 3),
  easeIn: (t) => Math.pow(t, 3),
  easeInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  bounce: (t) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
};

// Format number with commas (e.g., 1,000,000)
const formatNumber = (num, useCommas = false) => {
  if (!useCommas) return num.toString();
  return num.toLocaleString("en-IN");
};

// Format with K/M suffix (e.g., 1K, 1M)
const formatWithSuffix = (num, autoFormat = false) => {
  if (!autoFormat) return { value: num, suffix: "" };
  
  if (num >= 1000000) {
    return { value: Math.floor(num / 1000000), suffix: "M+" };
  }
  if (num >= 1000) {
    return { value: Math.floor(num / 1000), suffix: "K+" };
  }
  return { value: num, suffix: "" };
};

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  delay = 0,
  easing = "easeOut",
  useCommas = false,
  autoFormat = false,
  decimals = 0,
  className = "",
  onComplete
}) {
  const [count, setCount] = useState(0);
  const [displaySuffix, setDisplaySuffix] = useState(suffix);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);
  const animationRef = useRef(null);

  // Get the easing function
  const easeFn = easingFunctions[easing] || easingFunctions.easeOut;

  // Parse the target value
  const getTargetValue = useCallback(() => {
    if (autoFormat) {
      const formatted = formatWithSuffix(parseInt(value, 10), true);
      setDisplaySuffix(formatted.suffix || suffix);
      return formatted.value;
    }
    return parseFloat(value);
  }, [value, autoFormat, suffix]);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const targetValue = getTargetValue();
      const startTime = Date.now() + delay * 1000;
      
      const animate = () => {
        const now = Date.now();
        
        // Handle delay
        if (now < startTime) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
        
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        // Apply easing
        const easedProgress = easeFn(progress);
        const currentValue = decimals > 0
          ? parseFloat((easedProgress * targetValue).toFixed(decimals))
          : Math.floor(easedProgress * targetValue);
        
        setCount(currentValue);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setCount(targetValue);
          onComplete?.();
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, duration, delay, decimals, easeFn, getTargetValue, onComplete]);

  // Format the display value
  const displayValue = useCommas ? formatNumber(count, true) : count;

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay: delay }}
    >
      {prefix}
      {displayValue}
      {displaySuffix}
    </motion.span>
  );
}

// Variant: Counter with Label
export function CounterWithLabel({
  value,
  label,
  suffix = "+",
  prefix = "",
  duration = 2,
  className = "",
  labelClassName = "",
  valueClassName = ""
}) {
  return (
    <div className={`text-center ${className}`}>
      <div className={`text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 ${valueClassName}`}>
        <AnimatedCounter
          value={value}
          suffix={suffix}
          prefix={prefix}
          duration={duration}
        />
      </div>
      <div className={`text-sm text-gray-600 dark:text-gray-400 mt-1 ${labelClassName}`}>
        {label}
      </div>
    </div>
  );
}

// Variant: Gradient Counter
export function GradientCounter({
  value,
  suffix = "+",
  duration = 2,
  className = "",
  gradient = "from-blue-600 to-indigo-600"
}) {
  return (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent font-bold ${className}`}>
      <AnimatedCounter value={value} suffix={suffix} duration={duration} />
    </span>
  );
}
