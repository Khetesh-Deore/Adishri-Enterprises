// FloatingBlur Component - Animated Gradient Blur Orbs
import { motion } from "framer-motion";
import { useMemo } from "react";

// Solid color variants
const solidColors = {
  blue: "bg-blue-400",
  indigo: "bg-indigo-400",
  purple: "bg-purple-400",
  pink: "bg-pink-400",
  cyan: "bg-cyan-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  rose: "bg-rose-400",
  teal: "bg-teal-400",
  violet: "bg-violet-400"
};

// Gradient color variants
const gradientColors = {
  blueIndigo: "bg-gradient-to-br from-blue-400 to-indigo-500",
  purplePink: "bg-gradient-to-br from-purple-400 to-pink-500",
  cyanBlue: "bg-gradient-to-br from-cyan-400 to-blue-500",
  emeraldTeal: "bg-gradient-to-br from-emerald-400 to-teal-500",
  amberOrange: "bg-gradient-to-br from-amber-400 to-orange-500",
  rosePink: "bg-gradient-to-br from-rose-400 to-pink-500",
  indigoViolet: "bg-gradient-to-br from-indigo-400 to-violet-500"
};

// Movement patterns
const movementPatterns = {
  gentle: {
    x: [0, 20, -15, 0],
    y: [0, -15, 20, 0],
    scale: [1, 1.05, 0.95, 1]
  },
  moderate: {
    x: [0, 40, -30, 0],
    y: [0, -30, 40, 0],
    scale: [1, 1.1, 0.9, 1]
  },
  active: {
    x: [0, 60, -50, 20, 0],
    y: [0, -40, 50, -20, 0],
    scale: [1, 1.15, 0.85, 1.05, 1]
  },
  circular: {
    x: [0, 30, 0, -30, 0],
    y: [0, -30, -60, -30, 0],
    scale: [1, 1.1, 1, 0.9, 1],
    rotate: [0, 90, 180, 270, 360]
  },
  pulse: {
    x: [0, 10, 0, -10, 0],
    y: [0, -10, 0, 10, 0],
    scale: [1, 1.2, 1, 1.2, 1]
  }
};

// Generate random movement for variety
const generateRandomMovement = (intensity = 30) => ({
  x: [0, Math.random() * intensity, -Math.random() * intensity, 0],
  y: [0, -Math.random() * intensity, Math.random() * intensity, 0],
  scale: [1, 1 + Math.random() * 0.15, 1 - Math.random() * 0.1, 1]
});

export default function FloatingBlur({
  color = "blue",
  gradient = null,
  size = "w-96 h-96",
  position = "-top-32 -left-32",
  opacity = "opacity-20",
  blur = "blur-3xl",
  duration = 8,
  delay = 0,
  pattern = "moderate",
  randomize = false,
  className = ""
}) {
  // Determine color class
  const colorClass = gradient 
    ? (gradientColors[gradient] || gradientColors.blueIndigo)
    : (solidColors[color] || solidColors.blue);

  // Get movement animation
  const movement = useMemo(() => {
    if (randomize) return generateRandomMovement();
    return movementPatterns[pattern] || movementPatterns.moderate;
  }, [pattern, randomize]);

  return (
    <motion.div
      className={`
        absolute rounded-full pointer-events-none
        ${colorClass} ${size} ${position} ${opacity} ${blur} ${className}
      `}
      animate={movement}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// Multiple Floating Blurs - Default Layout
export function FloatingBlurs({ variant = "default" }) {
  const presets = {
    default: [
      { color: "blue", position: "-top-32 -left-32", size: "w-96 h-96", duration: 8 },
      { color: "indigo", position: "-bottom-32 -right-32", size: "w-80 h-80", duration: 10 },
      { color: "purple", position: "top-1/2 left-1/2", size: "w-64 h-64", opacity: "opacity-10", duration: 12 }
    ],
    hero: [
      { gradient: "blueIndigo", position: "-top-40 -left-40", size: "w-[500px] h-[500px]", duration: 10, pattern: "gentle" },
      { gradient: "cyanBlue", position: "-bottom-40 -right-40", size: "w-[400px] h-[400px]", duration: 12, pattern: "moderate" },
      { color: "purple", position: "top-1/3 right-1/4", size: "w-72 h-72", opacity: "opacity-15", duration: 14, pattern: "pulse" }
    ],
    minimal: [
      { color: "blue", position: "-top-20 -right-20", size: "w-64 h-64", opacity: "opacity-15", duration: 10 },
      { color: "indigo", position: "-bottom-20 -left-20", size: "w-56 h-56", opacity: "opacity-10", duration: 12 }
    ],
    vibrant: [
      { gradient: "purplePink", position: "-top-32 -left-32", size: "w-96 h-96", duration: 8, pattern: "active" },
      { gradient: "cyanBlue", position: "-bottom-32 -right-32", size: "w-80 h-80", duration: 10, pattern: "circular" },
      { gradient: "amberOrange", position: "top-1/2 left-1/4", size: "w-64 h-64", opacity: "opacity-15", duration: 12 },
      { gradient: "emeraldTeal", position: "bottom-1/4 right-1/3", size: "w-56 h-56", opacity: "opacity-10", duration: 14 }
    ],
    dark: [
      { color: "indigo", position: "-top-32 -left-32", size: "w-96 h-96", opacity: "opacity-30", duration: 10 },
      { color: "violet", position: "-bottom-32 -right-32", size: "w-80 h-80", opacity: "opacity-25", duration: 12 },
      { color: "blue", position: "top-1/2 right-1/4", size: "w-64 h-64", opacity: "opacity-20", duration: 14 }
    ]
  };

  const blurs = presets[variant] || presets.default;

  return (
    <>
      {blurs.map((blur, index) => (
        <FloatingBlur key={index} {...blur} delay={index * 0.5} />
      ))}
    </>
  );
}

// Section Background with Blurs
export function BlurBackground({ children, variant = "default", className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <FloatingBlurs variant={variant} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Single Glow Effect (for images/cards)
export function GlowEffect({
  color = "blue",
  size = "w-full h-full",
  intensity = "opacity-30",
  blur = "blur-2xl",
  className = ""
}) {
  const colorClass = solidColors[color] || solidColors.blue;
  
  return (
    <div
      className={`
        absolute inset-0 rounded-inherit pointer-events-none
        ${colorClass} ${size} ${intensity} ${blur} ${className}
        scale-90
      `}
    />
  );
}
