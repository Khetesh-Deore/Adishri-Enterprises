// Spinner Components - Beautiful loading indicators
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Default Spinner - Simple rotating circle
export default function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <Loader2 className={`${sizes[size]} animate-spin text-primary ${className}`} />
  );
}

// Page Loader - Full screen with branding
export function PageLoader({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="relative w-20 h-20 mx-auto">
            {/* Outer Ring */}
            <motion.div
              className="absolute inset-0 border-4 border-primary/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner Ring */}
            <motion.div
              className="absolute inset-2 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Center Dot */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="w-3 h-3 bg-primary rounded-full" />
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground font-medium"
        >
          {message}
        </motion.p>

        {/* Animated Dots */}
        <motion.div
          className="flex justify-center gap-1 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Inline Spinner - For buttons and inline content
export function InlineSpinner({ size = 'sm', className = '' }) {
  return (
    <Spinner size={size} className={`inline-block ${className}`} />
  );
}

// Overlay Spinner - Semi-transparent overlay
export function OverlaySpinner({ message = 'Loading...' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-foreground font-medium">{message}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Dots Spinner - Three bouncing dots
export function DotsSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${sizes[size]} bg-primary rounded-full`}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15
          }}
        />
      ))}
    </div>
  );
}

// Pulse Spinner - Pulsing circle
export function PulseSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <motion.div
        className="absolute inset-0 bg-primary rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 bg-primary rounded-full"
        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      <div className="absolute inset-0 bg-primary rounded-full opacity-80" />
    </div>
  );
}

// Gradient Spinner - Colorful rotating gradient
export function GradientSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.div
      className={`${sizes[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-r from-gradient-from via-gradient-to to-purple-600 p-1">
        <div className="w-full h-full rounded-full bg-background" />
      </div>
    </motion.div>
  );
}

// Card Loader - For loading cards/sections
export function CardLoader({ className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <GradientSpinner size="lg" className="mb-4" />
      <p className="text-muted-foreground text-sm">Loading content...</p>
    </div>
  );
}

// Button Spinner - Specifically for buttons
export function ButtonSpinner({ className = '' }) {
  return (
    <svg
      className={`animate-spin h-5 w-5 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Skeleton Loader with Spinner
export function SkeletonWithSpinner({ rows = 3, className = '' }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-center mb-6">
        <DotsSpinner />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse" style={{ width: `${100 - i * 10}%` }} />
          <div className="h-4 bg-muted rounded animate-pulse" style={{ width: `${90 - i * 10}%` }} />
        </div>
      ))}
    </div>
  );
}
