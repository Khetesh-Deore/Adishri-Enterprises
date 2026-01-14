// Button Component - Reusable Button with Variants
// Uses semantic color tokens from index.css - change colors there!
import { motion } from "framer-motion";

const variants = {
  primary: `
    bg-primary text-primary-foreground
    hover:bg-primary-hover
    shadow-md hover:shadow-lg
  `,
  secondary: `
    bg-transparent text-primary
    border-2 border-primary
    hover:bg-primary hover:text-primary-foreground
  `,
  ghost: `
    bg-transparent text-foreground
    hover:bg-muted
  `,
  gradient: `
    bg-gradient-to-r from-gradient-from to-gradient-to text-white
    hover:from-gradient-from-hover hover:to-gradient-to-hover
    shadow-md hover:shadow-lg
  `,
  accent: `
    bg-accent text-accent-foreground
    hover:bg-accent-hover
    shadow-md hover:shadow-lg
  `
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg"
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  icon: Icon,
  iconPosition = "left"
}) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-xl
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
    </motion.button>
  );
}
