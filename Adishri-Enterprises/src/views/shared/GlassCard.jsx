// GlassCard Component - Reusable Glassmorphism Card
import { motion } from "framer-motion";

// Gradient presets for border
const gradientPresets = {
  blue: "from-blue-500 to-indigo-500",
  purple: "from-purple-500 to-pink-500",
  green: "from-green-400 to-emerald-500",
  orange: "from-amber-400 to-orange-500",
  cyan: "from-cyan-400 to-blue-500",
  rainbow: "from-blue-500 via-purple-500 to-pink-500"
};

// Glass intensity presets
const glassIntensity = {
  light: "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm",
  medium: "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md",
  heavy: "bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg"
};

export default function GlassCard({
  children,
  className = "",
  hover = true,
  gradient = false,
  gradientColor = "blue",
  intensity = "medium",
  rounded = "2xl",
  padding = "",
  shadow = "lg",
  onClick,
  as = "div"
}) {
  const Component = motion[as] || motion.div;

  // Base glassmorphism styles
  const baseStyles = `
    relative overflow-hidden
    rounded-${rounded}
    ${glassIntensity[intensity] || glassIntensity.medium}
    border border-white/20 dark:border-gray-700/50
    shadow-${shadow}
    ${padding}
  `;

  // Gradient border effect using pseudo-element
  const gradientBorderStyles = gradient ? `
    before:absolute before:inset-0 before:-z-10
    before:rounded-${rounded} before:p-[1.5px]
    before:bg-gradient-to-r before:${gradientPresets[gradientColor] || gradientPresets.blue}
    before:content-['']
    after:absolute after:inset-[1.5px] after:-z-10
    after:rounded-${rounded} after:bg-white dark:after:bg-gray-800
    after:content-['']
  ` : "";

  // Hover animation styles
  const hoverStyles = hover ? `
    transition-all duration-300 ease-out
    hover:shadow-xl hover:-translate-y-2
    hover:border-blue-200/50 dark:hover:border-blue-600/50
    hover:bg-white/80 dark:hover:bg-gray-800/80
  ` : "";

  // Framer Motion hover animation
  const hoverAnimation = hover ? {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" }
  } : {};

  const tapAnimation = onClick ? { scale: 0.98 } : {};

  return (
    <Component
      className={`${baseStyles} ${gradientBorderStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      {/* Inner glow effect on hover */}
      {hover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-inherit" />
        </div>
      )}
      {children}
    </Component>
  );
}

// Variant: Feature Card with Icon
export function FeatureCard({ icon: Icon, title, description, gradient = false, className = "" }) {
  return (
    <GlassCard gradient={gradient} className={`p-6 group ${className}`}>
      {Icon && (
        <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-white" />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
    </GlassCard>
  );
}

// Variant: Stats Card
export function StatsCard({ value, label, suffix = "", className = "" }) {
  return (
    <GlassCard className={`p-5 text-center ${className}`} intensity="light">
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {value}{suffix}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{label}</div>
    </GlassCard>
  );
}
